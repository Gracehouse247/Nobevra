import { create } from 'zustand';
import { TEMPLATES, TemplateDefinition } from '@/lib/templates/templateRegistry';
import { invoiceService, clientService } from '@/lib/services/supabaseService';
import { toast } from 'react-hot-toast';
import { calcSubtotal, calcDiscountTotal, calcTaxTotal, calcTotal } from '@/lib/financialUtils';

export interface InvoiceItem {
    id: number;
    name: string;
    quantity: number;
    price: number;
}

export interface InvoiceCreatorState {
    step: 'select-type' | 'form' | 'success';
    setStep: (step: 'select-type' | 'form' | 'success') => void;
    currentWizardStep: number;
    setCurrentWizardStep: (step: number) => void;
    
    invoiceType: string;
    setInvoiceType: (type: string) => void;
    
    selectedTemplate: TemplateDefinition;
    setSelectedTemplate: (t: TemplateDefinition) => void;
    customAccentColor: string | null;
    setCustomAccentColor: (c: string | null) => void;
    
    clients: any[];
    setClients: (clients: any[] | ((prev: any[]) => any[])) => void;
    products: any[];
    setProducts: (products: any[]) => void;
    teamData: any;
    setTeamData: (data: any) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    
    // Form Data
    selectedClientId: string;
    setSelectedClientId: (id: string) => void;
    invoiceNumber: string;
    setInvoiceNumber: (num: string) => void;
    dueDate: string;
    setDueDate: (date: string) => void;
    invoiceDate: string;
    setInvoiceDate: (date: string) => void;
    paymentTerms: string;
    setPaymentTerms: (terms: string) => void;
    items: InvoiceItem[];
    setItems: (items: InvoiceItem[]) => void;
    taxRate: number;
    setTaxRate: (rate: number) => void;
    taxType: 'exclusive' | 'inclusive';
    setTaxType: (type: 'exclusive' | 'inclusive') => void;
    discountType: 'none' | 'flat' | 'percentage';
    setDiscountType: (type: 'none' | 'flat' | 'percentage') => void;
    discountValue: number;
    setDiscountValue: (val: number) => void;
    currencyCode: string;
    setCurrencyCode: (code: string) => void;
    notes: string;
    setNotes: (notes: string) => void;
    
    bankName: string;
    setBankName: (name: string) => void;
    accountName: string;
    setAccountName: (name: string) => void;
    accountNumber: string;
    setAccountNumber: (num: string) => void;
    acceptOnlinePayments: boolean;
    setAcceptOnlinePayments: (accept: boolean) => void;
    
    signatureUrl: string | null;
    setSignatureUrl: (url: string | null) => void;
    
    issuedInvoiceData: any;
    setIssuedInvoiceData: (data: any) => void;

    // Derived Financials (Getters)
    getSubtotal: () => number;
    getTaxTotal: () => number;
    getDiscountTotal: () => number;
    getTotal: () => number;
    getCurrencySymbol: () => string;
    
    // Actions
    addItem: () => void;
    removeItem: (id: number) => void;
    updateItem: (id: number, field: keyof InvoiceItem, value: any) => void;
    handleSave: (user: any, draftId?: string | null, status?: 'draft' | 'pending') => Promise<void>;
    createAndSelectClient: (user: any, clientData: { name: string; email: string; company?: string; phone?: string; address?: string }) => Promise<void>;
    resetStore: () => void;
}

export const useInvoiceCreatorStore = create<InvoiceCreatorState>((set, get) => ({
    step: 'select-type',
    setStep: (step) => set({ step }),
    currentWizardStep: 0,
    setCurrentWizardStep: (step) => set({ currentWizardStep: step }),
    
    invoiceType: 'standard',
    setInvoiceType: (type) => set({ invoiceType: type }),
    
    selectedTemplate: TEMPLATES[0],
    setSelectedTemplate: (t) => set({ selectedTemplate: t }),
    customAccentColor: null,
    setCustomAccentColor: (c) => set({ customAccentColor: c }),
    
    clients: [],
    setClients: (update) => set((state) => ({ 
        clients: typeof update === 'function' ? update(state.clients) : update 
    })),
    products: [],
    setProducts: (products) => set({ products }),
    teamData: null,
    setTeamData: (data) => set({ teamData: data }),
    loading: true,
    setLoading: (loading) => set({ loading }),
    
    selectedClientId: '',
    setSelectedClientId: (id) => set({ selectedClientId: id }),
    invoiceNumber: `INV-${typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID().split('-')[0].toUpperCase() : String(Math.floor(Math.random() * 100000)).padStart(5, '0')}`,
    setInvoiceNumber: (num) => set({ invoiceNumber: num }),
    dueDate: '',
    setDueDate: (date) => set({ dueDate: date }),
    invoiceDate: new Date().toISOString().split('T')[0],
    setInvoiceDate: (date) => set({ invoiceDate: date }),
    paymentTerms: 'On Receipt',
    setPaymentTerms: (terms) => set({ paymentTerms: terms }),
    items: [{ id: Date.now(), name: '', quantity: 1, price: 0 }],
    setItems: (items) => set({ items }),
    taxRate: 0,
    setTaxRate: (rate) => set({ taxRate: rate }),
    taxType: 'exclusive',
    setTaxType: (type) => set({ taxType: type }),
    discountType: 'none',
    setDiscountType: (type) => set({ discountType: type }),
    discountValue: 0,
    setDiscountValue: (val) => set({ discountValue: val }),
    currencyCode: 'NGN',
    setCurrencyCode: (code) => set({ currencyCode: code }),
    notes: '',
    setNotes: (notes) => set({ notes }),
    
    bankName: '',
    setBankName: (name) => set({ bankName: name }),
    accountName: '',
    setAccountName: (name) => set({ accountName: name }),
    accountNumber: '',
    setAccountNumber: (num) => set({ accountNumber: num }),
    acceptOnlinePayments: false,
    setAcceptOnlinePayments: (accept) => set({ acceptOnlinePayments: accept }),
    
    signatureUrl: null,
    setSignatureUrl: (url) => set({ signatureUrl: url }),
    
    issuedInvoiceData: null,
    setIssuedInvoiceData: (data) => set({ issuedInvoiceData: data }),

    getSubtotal: () => {
        const { items } = get();
        return calcSubtotal(items);
    },
    getDiscountTotal: () => {
        const { discountType, discountValue, getSubtotal } = get();
        const subtotal = getSubtotal();
        return calcDiscountTotal(subtotal, discountType, discountValue);
    },
    getTaxTotal: () => {
        const { getSubtotal, getDiscountTotal, taxType, taxRate } = get();
        const subtotal = getSubtotal();
        const discountTotal = getDiscountTotal();
        return calcTaxTotal(subtotal, discountTotal, taxRate, taxType);
    },
    getTotal: () => {
        const { getSubtotal, getDiscountTotal, getTaxTotal, taxType } = get();
        const subtotal = getSubtotal();
        const discountTotal = getDiscountTotal();
        const taxTotal = getTaxTotal();
        return calcTotal(subtotal, discountTotal, taxTotal, taxType);
    },
    getCurrencySymbol: () => {
        const { currencyCode } = get();
        try {
            return new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyCode }).formatToParts(0).find(x => x.type === 'currency')?.value || currencyCode;
        } catch {
            return currencyCode === 'NGN' ? '₦' : currencyCode;
        }
    },

    addItem: () => set((state) => ({ items: [...state.items, { id: Date.now(), name: '', quantity: 1, price: 0 }] })),
    removeItem: (id) => set((state) => ({ items: state.items.length > 1 ? state.items.filter(i => i.id !== id) : state.items })),
    updateItem: (id, field, value) => set((state) => ({ items: state.items.map(item => item.id === id ? { ...item, [field]: value } : item) })),
    
    createAndSelectClient: async (user, clientData) => {
        if (!user) return;
        const state = get();
        const teamId = state.teamData?.id || user.id;
        const newClient = await clientService.createClient({ ...clientData, team_id: teamId, user_id: user.id, lead_status: 'active' });
        if (newClient) {
            set((state) => ({ 
                clients: [...state.clients, newClient],
                selectedClientId: String(newClient.id) 
            }));
        }
    },

    handleSave: async (user, draftId, status = 'pending') => {
        const state = get();
        if (!state.selectedClientId && status !== 'draft') {
            toast.error('Please select a client');
            return;
        }
        if (state.items.some(item => !item.name?.trim() || item.price <= 0 || item.quantity <= 0)) {
            toast.error('Please complete all line items with valid quantities and prices');
            return;
        }

        // Calculate actual due date if a relative term was chosen and due date was not manually set
        let finalDueDate = state.dueDate;
        if (!finalDueDate) {
            const issue = new Date(state.invoiceDate || Date.now());
            if (state.paymentTerms === 'Net 15') issue.setDate(issue.getDate() + 15);
            else if (state.paymentTerms === 'Net 30') issue.setDate(issue.getDate() + 30);
            else if (state.paymentTerms === 'Net 60') issue.setDate(issue.getDate() + 60);
            // Default to 'On Receipt' i.e. today
            finalDueDate = issue.toISOString().split('T')[0];
        }

        if (finalDueDate) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const due = new Date(finalDueDate);
            if (due < today && status !== 'draft') {
                toast.error('Due date cannot be in the past');
                return;
            }
        }
        try {
            toast.loading(draftId ? 'Updating draft invoice...' : 'Generating invoice...', { id: 'save-inv' });
            const invoiceData = {
                team_id: state.teamData?.id || user?.id,
                user_id: user?.id,
                client_id: state.selectedClientId || null,
                invoice_number: state.invoiceNumber,
                invoice_type: state.invoiceType,
                issue_date: state.invoiceDate,
                due_date: finalDueDate,
                items: state.items,
                subtotal: state.getSubtotal(),
                discount_type: state.discountType,
                discount_value: state.discountValue,
                discount_amount: state.getDiscountTotal(),
                tax_type: state.taxType,
                tax_rate: state.taxRate,
                tax_total: state.getTaxTotal(),
                total_amount: state.getTotal(),
                currency_code: state.currencyCode,
                status: status,
                notes: state.notes,
                bank_name: state.bankName,
                account_name: state.accountName,
                account_number: state.accountNumber,
                signature_url: state.signatureUrl,
                metadata: {
                    payment_terms: state.paymentTerms,
                    accept_online_payments: state.acceptOnlinePayments
                }
            };

            let savedInvoice;
            if (draftId) {
                savedInvoice = await invoiceService.updateInvoice(draftId, invoiceData);
                toast.success('Invoice updated successfully!', { id: 'save-inv' });
            } else {
                savedInvoice = await invoiceService.createInvoice(invoiceData);
                toast.success('Invoice created successfully!', { id: 'save-inv' });
            }

            set({ issuedInvoiceData: savedInvoice, step: 'success' });
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error: any) {
            console.error('Error saving invoice:', error);
            const errorMsg = error?.message || error?.details || error?.hint || (typeof error === 'object' ? JSON.stringify(error) : String(error));
            toast.error(`${draftId ? 'Failed to update invoice' : 'Failed to create invoice'}: ${errorMsg}`, { id: 'save-inv' });
        }
    },
    
    resetStore: () => {
        set({
            step: 'select-type',
            currentWizardStep: 0,
            invoiceType: 'standard',
            selectedClientId: '',
            invoiceNumber: `INV-${typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID().split('-')[0].toUpperCase() : String(Math.floor(Math.random() * 100000)).padStart(5, '0')}`,
            dueDate: '',
            invoiceDate: new Date().toISOString().split('T')[0],
            paymentTerms: 'On Receipt',
            items: [{ id: Date.now(), name: '', quantity: 1, price: 0 }],
            taxRate: 0,
            taxType: 'exclusive',
            discountType: 'none',
            discountValue: 0,
            notes: '',
            issuedInvoiceData: null
        });
    }
}));
