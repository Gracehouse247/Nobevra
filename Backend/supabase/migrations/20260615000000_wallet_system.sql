-- =============================================================================
-- Migration: Wallet System
-- Creates the wallets, wallet_transactions tables and RPC functions for
-- atomic, race-condition-safe balance operations.
-- =============================================================================

-- 1. Wallets Table — one row per user per currency
CREATE TABLE IF NOT EXISTS public.wallets (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id         UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    currency_code   VARCHAR(3) NOT NULL DEFAULT 'NGN',
    balance         DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, currency_code)
);

ALTER TABLE public.wallets ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own wallet" ON public.wallets;
CREATE POLICY "Users can view their own wallet"
    ON public.wallets FOR SELECT
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Service role can manage all wallets" ON public.wallets;
CREATE POLICY "Service role can manage all wallets"
    ON public.wallets FOR ALL
    TO service_role
    USING (TRUE)
    WITH CHECK (TRUE);

-- 2. Wallet Transactions — full audit trail
CREATE TABLE IF NOT EXISTS public.wallet_transactions (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    wallet_id       UUID NOT NULL REFERENCES public.wallets(id) ON DELETE CASCADE,
    user_id         UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    type            VARCHAR(30) NOT NULL,   -- 'INVOICE_PAYMENT' | 'WITHDRAWAL' | 'REFUND'
    amount          DECIMAL(15, 2) NOT NULL, -- Always positive
    fee             DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    net_amount      DECIMAL(15, 2) NOT NULL, -- amount - fee (what user actually receives/loses)
    currency_code   VARCHAR(3) NOT NULL,
    status          VARCHAR(20) NOT NULL DEFAULT 'completed', -- 'completed' | 'pending' | 'failed'
    reference       VARCHAR(200),           -- FLW tx_ref or transfer reference
    description     TEXT,
    metadata        JSONB DEFAULT '{}',
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.wallet_transactions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own wallet transactions" ON public.wallet_transactions;
CREATE POLICY "Users can view their own wallet transactions"
    ON public.wallet_transactions FOR SELECT
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Service role can manage all wallet transactions" ON public.wallet_transactions;
CREATE POLICY "Service role can manage all wallet transactions"
    ON public.wallet_transactions FOR ALL
    TO service_role
    USING (TRUE)
    WITH CHECK (TRUE);

-- 3. Indexes for performance
CREATE INDEX IF NOT EXISTS idx_wallets_user_id ON public.wallets(user_id);
CREATE INDEX IF NOT EXISTS idx_wallet_transactions_wallet_id ON public.wallet_transactions(wallet_id);
CREATE INDEX IF NOT EXISTS idx_wallet_transactions_user_id ON public.wallet_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_wallet_transactions_reference ON public.wallet_transactions(reference);

-- 4. RPC: credit_wallet — Atomically credit a user's wallet and log the transaction.
--    Called by the flw-webhook edge function when an invoice payment is confirmed.
CREATE OR REPLACE FUNCTION public.credit_wallet(
    p_user_id       UUID,
    p_currency_code VARCHAR(3),
    p_gross_amount  DECIMAL(15, 2),  -- The amount FLW received (invoice total + gateway fee)
    p_gateway_fee   DECIMAL(15, 2),  -- FLW's cut (1.4% local / 3.8% international)
    p_platform_fee  DECIMAL(15, 2),  -- NobleInvoice's 1% commission
    p_reference     VARCHAR(200),
    p_description   TEXT DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_wallet_id     UUID;
    v_net_amount    DECIMAL(15, 2);
    v_total_fee     DECIMAL(15, 2);
BEGIN
    v_total_fee  := p_gateway_fee + p_platform_fee;
    v_net_amount := p_gross_amount - v_total_fee;

    IF v_net_amount < 0 THEN
        RAISE EXCEPTION 'Net amount cannot be negative: gross=%, fees=%', p_gross_amount, v_total_fee;
    END IF;

    -- Upsert the wallet (create if it doesn't exist)
    INSERT INTO public.wallets (user_id, currency_code, balance)
    VALUES (p_user_id, p_currency_code, 0.00)
    ON CONFLICT (user_id, currency_code) DO NOTHING;

    -- Atomic balance increment — avoids JS read-then-write race conditions
    UPDATE public.wallets
    SET balance    = balance + v_net_amount,
        updated_at = NOW()
    WHERE user_id = p_user_id AND currency_code = p_currency_code
    RETURNING id INTO v_wallet_id;

    -- Insert audit trail
    INSERT INTO public.wallet_transactions (
        wallet_id, user_id, type, amount, fee, net_amount,
        currency_code, status, reference, description, metadata
    )
    VALUES (
        v_wallet_id, p_user_id, 'INVOICE_PAYMENT',
        p_gross_amount, v_total_fee, v_net_amount,
        p_currency_code, 'completed', p_reference, p_description,
        jsonb_build_object(
            'gateway_fee',  p_gateway_fee,
            'platform_fee', p_platform_fee
        )
    );

    RETURN jsonb_build_object(
        'success',     TRUE,
        'wallet_id',   v_wallet_id,
        'net_credited', v_net_amount
    );
END;
$$;

-- 5. RPC: debit_wallet — Atomically debit a user's wallet for a withdrawal.
--    Returns error if balance is insufficient.
CREATE OR REPLACE FUNCTION public.debit_wallet(
    p_user_id       UUID,
    p_currency_code VARCHAR(3),
    p_amount        DECIMAL(15, 2),   -- Amount the user wants to withdraw
    p_transfer_fee  DECIMAL(15, 2),   -- FLW transfer fee deducted from the amount
    p_reference     VARCHAR(200),
    p_description   TEXT DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_wallet_id     UUID;
    v_current_bal   DECIMAL(15, 2);
    v_net_amount    DECIMAL(15, 2);
BEGIN
    v_net_amount := p_amount - p_transfer_fee;

    -- Lock wallet row to prevent concurrent withdrawals
    SELECT id, balance INTO v_wallet_id, v_current_bal
    FROM public.wallets
    WHERE user_id = p_user_id AND currency_code = p_currency_code
    FOR UPDATE;

    IF v_wallet_id IS NULL THEN
        RETURN jsonb_build_object('success', FALSE, 'error', 'Wallet not found');
    END IF;

    IF v_current_bal < p_amount THEN
        RETURN jsonb_build_object(
            'success', FALSE,
            'error',   'Insufficient balance',
            'balance', v_current_bal
        );
    END IF;

    -- Atomic debit
    UPDATE public.wallets
    SET balance    = balance - p_amount,
        updated_at = NOW()
    WHERE id = v_wallet_id;

    -- Insert audit trail
    INSERT INTO public.wallet_transactions (
        wallet_id, user_id, type, amount, fee, net_amount,
        currency_code, status, reference, description, metadata
    )
    VALUES (
        v_wallet_id, p_user_id, 'WITHDRAWAL',
        p_amount, p_transfer_fee, v_net_amount,
        p_currency_code, 'pending', p_reference, p_description,
        jsonb_build_object('transfer_fee', p_transfer_fee)
    );

    RETURN jsonb_build_object(
        'success',       TRUE,
        'wallet_id',     v_wallet_id,
        'amount_debited', p_amount,
        'net_received',  v_net_amount
    );
END;
$$;

-- 6. RPC: confirm_withdrawal — Called by the transfer webhook to mark a withdrawal as completed or failed.
CREATE OR REPLACE FUNCTION public.confirm_withdrawal(
    p_reference  VARCHAR(200),
    p_status     VARCHAR(20)   -- 'completed' or 'failed'
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_tx    public.wallet_transactions%ROWTYPE;
BEGIN
    SELECT * INTO v_tx
    FROM public.wallet_transactions
    WHERE reference = p_reference AND type = 'WITHDRAWAL'
    LIMIT 1;

    IF v_tx.id IS NULL THEN
        RETURN jsonb_build_object('success', FALSE, 'error', 'Withdrawal transaction not found');
    END IF;

    IF v_tx.status != 'pending' THEN
        RETURN jsonb_build_object('success', FALSE, 'error', 'Transaction already resolved: ' || v_tx.status);
    END IF;

    UPDATE public.wallet_transactions
    SET status = p_status
    WHERE id = v_tx.id;

    -- If the transfer FAILED, refund the balance
    IF p_status = 'failed' THEN
        UPDATE public.wallets
        SET balance    = balance + v_tx.amount,
            updated_at = NOW()
        WHERE id = v_tx.wallet_id;
    END IF;

    RETURN jsonb_build_object('success', TRUE, 'status', p_status);
END;
$$;
