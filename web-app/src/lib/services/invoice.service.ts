import { supabase } from '../supabase';

export interface InvoiceItemPayload {
    product_id?: number | null;
    name?: string;
    description?: string;
    quantity: number | string;
    price?: number | string;
    unit_price?: number | string;
}

export interface InvoicePayload {
    team_id?: string;
    user_id?: string;
    client_id?: number | string | null;
    invoice_number: string;
    invoice_type?: string;
    issue_date?: string;
    due_date?: string;
    status?: string;
    currency_code?: string;
    tax_rate?: number | string;
    tax_type?: string;
    tax_amount?: number | string;
    tax_total?: number | string;
    discount_type?: string;
    discount_value?: number | string;
    discount_amount?: number | string;
    subtotal?: number | string;
    total_amount?: number | string;
    notes?: string | null;
    metadata?: Record<string, any>;
    bank_name?: string | null;
    account_name?: string | null;
    account_number?: string | null;
    signature_url?: string | null;
    items?: InvoiceItemPayload[];
}

/** Matches the `invoices` table columns for INSERT/UPDATE operations. */
export interface DbInvoicePayload {
    team_id?: string;
    client_id: number | null;
    invoice_number: string;
    invoice_type: string;
    issue_date: string;
    due_date: string;
    status: string;
    currency_code: string;
    tax_rate: number;
    tax_type: string;
    tax_amount: number;
    discount_type: string;
    discount_value: number;
    discount_amount: number;
    subtotal: number;
    total_amount: number;
    notes: string | null;
    metadata: Record<string, any>;
    user_id?: string;
    updated_at?: string;
}

export const invoiceService = {
    async getInvoices(teamId: string, limit = 50, offset = 0) {
        const { data, error } = await supabase
            .from('invoices')
            .select('*, clients(name, email, phone)')
            .eq('team_id', teamId)
            .order('created_at', { ascending: false })
            .range(offset, offset + limit - 1);
        
        if (error) {
            console.warn('[invoiceService.getInvoices]', error.message, { teamId, code: error.code });
            return [];
        }
        return data ?? [];
    },

    async getInvoicesByClient(clientId: string) {
        const { data, error } = await supabase
            .from('invoices')
            .select('*')
            .eq('client_id', clientId)
            .order('created_at', { ascending: false });
            
        if (error) throw error;
        return data || [];
    },

    async getInvoiceById(invoiceId: string) {
        const { data, error } = await supabase
            .from('invoices')
            .select('*, clients(*), invoice_items(*)')
            .eq('id', invoiceId)
            .single();
            
        if (error) throw error;
        return data;
    },

    async createInvoice(invoiceData: InvoicePayload) {
        // All business logic (subscription limits, fee injection, ledger updates,
        // inventory deduction, audit logs, domain events) is handled securely
        // by the `create-invoice` Edge Function. The web app simply sends the
        // raw payload and receives a structured response.
        const { items, ...rawInvoice } = invoiceData;

        const edgePayload = {
            client_id:      rawInvoice.client_id ? Number(rawInvoice.client_id) : null,
            due_date:       rawInvoice.due_date ?? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            issue_date:     rawInvoice.issue_date ?? new Date().toISOString().split('T')[0],
            status:         rawInvoice.status ?? 'draft',
            invoice_type:   rawInvoice.invoice_type ?? 'standard',
            currency_code:  rawInvoice.currency_code ?? 'NGN',
            notes:          rawInvoice.notes ?? null,
            tax_rate:       parseFloat(String(rawInvoice.tax_rate ?? 0)) || 0,
            tax_type:       rawInvoice.tax_type ?? 'exclusive',
            discount_type:  rawInvoice.discount_type ?? 'none',
            discount_value: parseFloat(String(rawInvoice.discount_value ?? 0)) || 0,
            metadata: {
                bank_name:              rawInvoice.bank_name ?? null,
                account_name:           rawInvoice.account_name ?? null,
                account_number:         rawInvoice.account_number ?? null,
                signature_url:          rawInvoice.signature_url ?? null,
                payment_terms:          rawInvoice.metadata?.payment_terms ?? null,
                accept_online_payments: rawInvoice.metadata?.accept_online_payments ?? false,
                ...(rawInvoice.metadata ?? {}),
            },
            items: (items ?? []).map((item) => ({
                description: item.name ?? item.description ?? 'Line Item',
                quantity:    parseFloat(String(item.quantity ?? 1)) || 1,
                unit_price:  parseFloat(String(item.price ?? 0)) || parseFloat(String(item.unit_price ?? 0)) || 0,
                product_id:  item.product_id ?? null,
            })),
        };

        const { data, error } = await supabase.functions.invoke('create-invoice', {
            body: edgePayload,
        });

        if (error) {
            console.error('[invoiceService.createInvoice] Edge function error:', error);
            throw new Error(error.message ?? 'Failed to create invoice');
        }

        if (!data?.success) {
            console.error('[invoiceService.createInvoice] Business logic error:', data?.error);
            throw new Error(data?.error ?? 'Failed to create invoice');
        }

        return data as {
            success:        boolean;
            invoice_id:     number;
            invoice_number: string;
            status:         string;
            total_amount:   number;
            currency_code:  string;
            payment_link:   string | null;
        };
    },


    async updateInvoice(invoiceId: string, invoiceData: InvoicePayload, lastUpdatedAt?: string) {
        const { items, ...rawInvoice } = invoiceData;

        // Map items to Edge Function shape
        const edgeItems = (items ?? []).map((item: InvoiceItemPayload) => ({
            product_id:  item.product_id || null,
            description: item.name || item.description || 'Line Item',
            quantity:    parseFloat(String(item.quantity ?? 1)) || 1,
            unit_price:  parseFloat(String(item.price ?? 0)) || parseFloat(String(item.unit_price ?? 0)) || 0,
            total: (parseFloat(String(item.quantity ?? 1)) || 1) *
                   (parseFloat(String(item.price ?? 0)) || parseFloat(String(item.unit_price ?? 0)) || 0),
        }));

        // Merge bank / signature fields into metadata so Edge Function sees them
        const mergedMetadata: Record<string, any> = {
            ...(rawInvoice.metadata || {}),
            ...(rawInvoice.bank_name     ? { bank_name:      rawInvoice.bank_name }     : {}),
            ...(rawInvoice.account_name  ? { account_name:   rawInvoice.account_name }  : {}),
            ...(rawInvoice.account_number? { account_number: rawInvoice.account_number }: {}),
            ...(rawInvoice.signature_url ? { signature_url:  rawInvoice.signature_url } : {}),
            payment_terms:          rawInvoice.metadata?.payment_terms ?? null,
            accept_online_payments: rawInvoice.metadata?.accept_online_payments ?? false,
        };

        const payload = {
            invoice_id:      invoiceId, // FIX: UUIDs are strings, Number() makes it NaN
            client_id:       rawInvoice.client_id ? Number(rawInvoice.client_id) : null,
            invoice_number:  rawInvoice.invoice_number,
            invoice_type:    rawInvoice.invoice_type  || 'standard',
            issue_date:      rawInvoice.issue_date    || new Date().toISOString().split('T')[0],
            due_date:        rawInvoice.due_date
                                ? new Date(rawInvoice.due_date).toISOString().split('T')[0]
                                : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            status:          rawInvoice.status        || 'draft',
            currency_code:   rawInvoice.currency_code || 'NGN',
            tax_rate:        parseFloat(String(rawInvoice.tax_rate ?? 0)) || 0,
            tax_type:        rawInvoice.tax_type      || 'exclusive',
            discount_type:   rawInvoice.discount_type || 'none',
            discount_value:  parseFloat(String(rawInvoice.discount_value ?? 0)) || 0,
            notes:           rawInvoice.notes || null,
            metadata:        mergedMetadata,
            items:           edgeItems,
            ...(lastUpdatedAt ? { last_updated_at: lastUpdatedAt } : {}),
        };

        const { data, error } = await supabase.functions.invoke('update-invoice', {
            body: payload,
        });

        if (error) {
            console.error('[invoiceService.updateInvoice] Edge Function error:', error);
            // Surface the structured error message from the Edge Function if available
            const message = (error as any)?.context?.error || error.message || 'Failed to update invoice';
            throw new Error(message);
        }

        if (!data?.success) {
            throw new Error(data?.error || 'Update invoice failed');
        }

        return data.invoice;
    },

    async updateInvoiceStatus(invoiceId: string, status: string, lastUpdatedAt?: string) {
        let query = supabase
            .from('invoices')
            .update({ status, updated_at: new Date().toISOString() })
            .eq('id', invoiceId);
        
        if (lastUpdatedAt) {
            query = query.lte('updated_at', lastUpdatedAt);
        }

        const { data, error } = await query.select().single();
        
        if (error) {
            if (error.code === 'PGRST116') {
                throw new Error('Conflict: Data was modified by another device since last sync.');
            }
            throw error;
        }

        // Gamification is now handled securely via Supabase database triggers (see 20260706010000_gamification_triggers.sql)
    },

    async getInvoiceByToken(token: string) {
        // Calls the Next.js API route that uses the Service Role key
        const response = await fetch(`/api/portal/invoice/${token}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            // Don't cache so we always get the latest invoice status
            cache: 'no-store'
        });

        if (!response.ok) {
            const errData = await response.json().catch(() => null);
            throw new Error(errData?.error || 'Failed to fetch invoice');
        }

        const data = await response.json();
        return data.invoice;
    }
};
