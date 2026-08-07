import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { teamService, invoiceService } from '@/lib/services/supabaseService';
import { currencyService } from '@/lib/services/currencyService';
import { toast } from 'react-hot-toast';
import { useCurrency } from '@/context/CurrencyContext';

// Module-level exchange rate cache with a 1-hour TTL.
// Using module-level vars is fine here — they survive page navigation but not a full reload.
let globalCachedRates: any = null;
let globalCachedRatesCurrency: string = '';
let globalCachedRatesTimestamp: number = 0;
const RATES_TTL_MS = 60 * 60 * 1000; // 1 hour

export function useInvoices(page: number, pageSize: number = 50) {
    const { user } = useAuth();
    const { currencyCode } = useCurrency();
    const [invoices, setInvoices] = useState<Record<string, any>[]>([]);
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [baseCurrency, setBaseCurrency] = useState(currencyCode);
    const [exchangeRates, setExchangeRates] = useState<any>(null);

    // Cache team data in a ref so it is only fetched once per mount, not on every page change.
    const teamRef = useRef<{ id: string; currency: string } | null>(null);

    useEffect(() => {
        if (!user) return;
        
        const fetchInvoices = async (currentPage: number) => {
            try {
                setLoading(true);

                // Only fetch team data if we haven't cached it yet
                if (!teamRef.current) {
                    const tData = await teamService.getTeamByUserId(user.id);
                    teamRef.current = {
                        id: tData?.id || user.id,
                        currency: (tData as any)?.preferred_currency || currencyCode,
                    };
                }

                const { id: teamId, currency: preferredCurrency } = teamRef.current;
                setBaseCurrency(preferredCurrency);
                
                // Fetch pageSize+1 items to reliably detect whether a next page exists
                const offset = (currentPage - 1) * pageSize;
                const data = await invoiceService.getInvoices(teamId, pageSize + 1, offset);
                const hasNextPage = data.length > pageSize;
                setHasMore(hasNextPage);
                // Only show pageSize items to the user
                setInvoices((data || []).slice(0, pageSize));

                // Re-fetch exchange rates only if currency changed or cache has expired
                const now = Date.now();
                const ratesStale = now - globalCachedRatesTimestamp > RATES_TTL_MS;
                if (!globalCachedRates || globalCachedRatesCurrency !== preferredCurrency || ratesStale) {
                    globalCachedRates = await currencyService.getExchangeRates(preferredCurrency);
                    globalCachedRatesCurrency = preferredCurrency;
                    globalCachedRatesTimestamp = now;
                }
                setExchangeRates(globalCachedRates);
            } catch (err) {
                console.error('Error fetching invoices:', err);
                toast.error('Failed to load ledger');
            } finally {
                setLoading(false);
            }
        };

        fetchInvoices(page);
    }, [user, page, pageSize]);

    const handleMarkAsPaid = async (invoiceId: string) => {
        try {
            await invoiceService.updateInvoiceStatus(invoiceId, 'paid');
            setInvoices(prev => prev.map(inv => inv.id === invoiceId ? { ...inv, status: 'paid' } : inv));
            toast.success('Invoice marked as paid');
        } catch (err) {
            console.error('Failed to update status:', err);
            toast.error('Failed to mark invoice as paid');
        }
    };

    return { 
        invoices, 
        loading, 
        hasMore, 
        baseCurrency, 
        exchangeRates, 
        handleMarkAsPaid 
    };
}
