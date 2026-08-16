'use client';

import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { invoiceService, clientService, productService, teamService } from '@/lib/services/supabaseService';
import { toast } from 'react-hot-toast';
import { geoService } from '@/lib/services/geoService';
import { useInvoiceCreatorStore } from '@/store/useInvoiceCreatorStore';

const InvoiceCreatorContext = createContext<any>(undefined);

export const InvoiceCreatorProvider = ({ children }: { children: ReactNode }) => {
    const { user } = useAuth();
    const searchParams = useSearchParams();
    const store = useInvoiceCreatorStore();

    const draftId = searchParams?.get('draftId');
    const initialType = searchParams?.get('type');
    const newClientId = searchParams?.get('newClientId');
    const source = searchParams?.get('source');

    useEffect(() => {
        if (initialType) {
            store.setInvoiceType(initialType);
            store.setStep('form');
        }
    }, [initialType, store]);

    useEffect(() => {
        if (newClientId) {
            store.setSelectedClientId(newClientId);
            store.setStep('form');
            store.setCurrentWizardStep(0);
        }
    }, [newClientId, store]);

    useEffect(() => {
        if (!user) {
            store.setLoading(false);
            return;
        }

        const fetchData = async () => {
            try {
                const tData = await teamService.getTeamByUserId(user.id);
                if (tData) {
                    const td = tData as any;
                    store.setTeamData(tData);
                    
                    if (td.preferred_currency) {
                        store.setCurrencyCode(td.preferred_currency);
                    } else {
                        // Auto-detect currency via IP location if team hasn't set one
                        geoService.getClientGeo().then(geo => {
                            if (geo && geo.currency) {
                                store.setCurrencyCode(geo.currency);
                            }
                        }).catch(() => {}); // Fallback to NGN which is store default
                    }
                    
                    store.setBankName(td.bank_name || '');
                    store.setAccountName(td.account_name || '');
                    store.setAccountNumber(td.account_number || '');
                    store.setSignatureUrl(td.brand_signature_url || null);

                    const teamId = tData.id || user.id;

                    const [clientsData, productsData] = await Promise.all([
                        clientService.getClients(teamId).catch(() => []),
                        productService.getProducts(teamId).catch(() => []),
                    ]);
                    store.setClients(clientsData || []);
                    store.setProducts(productsData || []);
                }

                if (draftId) {
                    try {
                        const existingInvoice = await invoiceService.getInvoiceById(draftId);
                        if (existingInvoice) {
                            if (existingInvoice.invoice_type) store.setInvoiceType(existingInvoice.invoice_type);
                            if (existingInvoice.client_id) store.setSelectedClientId(String(existingInvoice.client_id));
                            if (existingInvoice.invoice_number) store.setInvoiceNumber(existingInvoice.invoice_number);
                            if (existingInvoice.due_date) store.setDueDate(existingInvoice.due_date);
                            if (existingInvoice.currency_code) store.setCurrencyCode(existingInvoice.currency_code);
                            if (existingInvoice.tax_rate !== undefined && existingInvoice.tax_rate !== null) store.setTaxRate(Number(existingInvoice.tax_rate));
                            if (existingInvoice.tax_type) store.setTaxType(existingInvoice.tax_type as 'exclusive' | 'inclusive');
                            if (existingInvoice.discount_type) store.setDiscountType(existingInvoice.discount_type as 'none' | 'flat' | 'percentage');
                            if (existingInvoice.discount_value !== undefined && existingInvoice.discount_value !== null) store.setDiscountValue(Number(existingInvoice.discount_value));
                            if (existingInvoice.notes) store.setNotes(existingInvoice.notes);
                            
                            if (existingInvoice.metadata) {
                                if (existingInvoice.metadata.bank_name) store.setBankName(existingInvoice.metadata.bank_name);
                                if (existingInvoice.metadata.account_name) store.setAccountName(existingInvoice.metadata.account_name);
                                if (existingInvoice.metadata.account_number) store.setAccountNumber(existingInvoice.metadata.account_number);
                                if (existingInvoice.metadata.signature_url) store.setSignatureUrl(existingInvoice.metadata.signature_url);
                            }

                            if (existingInvoice.invoice_items && existingInvoice.invoice_items.length > 0) {
                                const loadedItems = existingInvoice.invoice_items.map((item: any) => ({
                                    id: item.id || Date.now() + Math.random(),
                                    name: item.description || '',
                                    quantity: parseInt(item.quantity) || 1,
                                    price: parseFloat(item.unit_price) || 0,
                                    product_id: item.product_id || null
                                }));
                                store.setItems(loadedItems);
                            } else {
                                store.setItems([{ id: Date.now(), name: '', quantity: 1, price: 0 }]);
                            }

                            store.setStep('form');
                            store.setCurrentWizardStep(0);
                        }
                    } catch (draftErr: any) {
                        toast.error('Failed to load draft details');
                    }
                }
            } catch (err: any) {
                console.error('Data fetch failed:', err);
            } finally {
                store.setLoading(false);
            }
        };

        fetchData();
    }, [user, draftId]);

    useEffect(() => {
        if (store.loading) return;
        if (source === 'ai') {
            try {
                const rawDraft = localStorage.getItem('noble_ai_draft_invoice');
                if (rawDraft) {
                    const parsed = JSON.parse(rawDraft);
                    const invoice = parsed.invoice || {};
                    const itemsData = invoice.items || [];

                    if (invoice.currency_code) store.setCurrencyCode(invoice.currency_code);
                    if (parsed.invoice_type || invoice.invoice_type) store.setInvoiceType(parsed.invoice_type || invoice.invoice_type);
                    if (invoice.notes || parsed.notes) store.setNotes(invoice.notes || parsed.notes);

                    if (itemsData.length > 0) {
                        store.setItems(itemsData.map((it: any) => ({
                            id: Date.now() + Math.random(),
                            name: it.description || '',
                            quantity: it.quantity || 1,                            
                            price: it.unit_price || 0
                        })));
                    }

                    store.setStep('form');
                    store.setCurrentWizardStep(0);
                    localStorage.removeItem('noble_ai_draft_invoice');
                    toast.success("AI invoice draft loaded successfully!");
                }
            } catch (err) {}
        }
    }, [source, store.loading]);

    // Provide the store methods through the context so existing components don't break immediately
    const contextValue = {
        ...store,
        subtotal: store.getSubtotal(),
        taxTotal: store.getTaxTotal(),
        discountTotal: store.getDiscountTotal(),
        total: store.getTotal(),
        currencySymbol: store.getCurrencySymbol(),
        handleSave: (status: 'draft' | 'pending' = 'pending') => store.handleSave(user, draftId, status),
        createAndSelectClient: (clientData: any) => store.createAndSelectClient(user, clientData),
        resetStore: store.resetStore
    };

    return (
        <InvoiceCreatorContext.Provider value={contextValue}>
            {children}
        </InvoiceCreatorContext.Provider>
    );
};

export const useInvoiceCreator = () => {
    const context = useContext(InvoiceCreatorContext);
    if (context === undefined) throw new Error('useInvoiceCreator must be used within InvoiceCreatorProvider');
    return context;
};
