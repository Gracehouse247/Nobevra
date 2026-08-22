import React from 'react';
import { useInvoiceCreator } from '../InvoiceCreatorContext';

const labelClass = "text-[11px] font-bold text-slate-500 mb-1 block uppercase tracking-wider font-[Inter,sans-serif]";
const inputClass = `w-full h-10 px-3 bg-noble-surface border border-noble-border rounded-lg text-slate-800 text-[13px]
  focus:outline-none focus:border-[#01A0E2] focus:ring-2 focus:ring-[#01A0E2]/10
  transition-all placeholder-slate-400 font-medium font-[Inter,sans-serif]`;
const cardClass = "bg-noble-surface rounded-xl border border-noble-border shadow-sm overflow-hidden mb-3";
const cardHeaderClass = "px-5 py-3 border-b border-slate-100 bg-slate-50/50";

export const ReviewStep = () => {
    const {
        clients, selectedClientId, invoiceNumber, invoiceDate, paymentTerms,
        items, getCurrencySymbol, getTotal, notes, setNotes,
        bankName, setBankName, accountName, setAccountName, accountNumber, setAccountNumber
    } = useInvoiceCreator();
    const client = clients.find((c: any) => String(c.id) === selectedClientId);

    const currencySymbol = getCurrencySymbol();
    const total = getTotal();

    return (
        <div className="space-y-3">
            <div className={cardClass}>
                <div className={cardHeaderClass}>
                    <h3 className="text-[13px] font-bold text-slate-800 font-[Inter,sans-serif]">Invoice Summary</h3>
                </div>
                <div className="px-5 py-4 space-y-2">
                    {[
                        { label: 'Invoice No.', value: invoiceNumber },
                        { label: 'Customer', value: client?.name || '—' },
                        { label: 'Date', value: invoiceDate },
                        { label: 'Terms', value: paymentTerms },
                        { label: 'Items', value: `${items.length} item${items.length !== 1 ? 's' : ''}` },
                    ].map(({ label, value }) => (
                        <div key={label} className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0">
                            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide font-[Inter,sans-serif]">{label}</span>
                            <span className="text-[13px] font-bold text-slate-800 font-[Inter,sans-serif]">{value}</span>
                        </div>
                    ))}
                    <div className="flex justify-between items-center pt-2">
                        <span className="text-[13px] font-bold text-slate-700 font-[Inter,sans-serif]">Total Amount Due</span>
                        <span className="text-2xl font-black text-[#01A0E2] font-[Inter,sans-serif]">{currencySymbol}{total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                    </div>
                </div>
            </div>

            <div className={cardClass}>
                <div className={cardHeaderClass}>
                    <h3 className="text-[13px] font-bold text-slate-800 font-[Inter,sans-serif]">Notes & Terms</h3>
                </div>
                <div className="px-5 py-4">
                    <textarea
                        value={notes}
                        onChange={e => setNotes(e.target.value)}
                        placeholder="e.g. Thank you for your business. Payment is due within the terms stated."
                        className="w-full h-24 p-3 text-[13px] bg-slate-50 border border-noble-border rounded-xl focus:outline-none focus:border-[#01A0E2] focus:ring-2 focus:ring-[#01A0E2]/10 resize-none text-slate-800 placeholder-slate-400 font-medium transition-all font-[Inter,sans-serif]"
                    />
                </div>
            </div>

            <div className={cardClass}>
                <div className={cardHeaderClass}>
                    <h3 className="text-[13px] font-bold text-slate-800 font-[Inter,sans-serif]">Bank / Payment Details</h3>
                </div>
                <div className="px-5 py-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                        <label className={labelClass}>Bank Name</label>
                        <input type="text" value={bankName} onChange={e => setBankName(e.target.value)} placeholder="e.g. Access Bank" className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Account Name</label>
                        <input type="text" value={accountName} onChange={e => setAccountName(e.target.value)} placeholder="e.g. Noble Ltd." className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Account Number</label>
                        <input type="text" value={accountNumber} onChange={e => setAccountNumber(e.target.value)} placeholder="e.g. 1234567890" className={inputClass} />
                    </div>
                </div>
            </div>
        </div>
    );
};
