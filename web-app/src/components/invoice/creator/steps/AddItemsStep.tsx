'use client';
import React from 'react';
import { FileText, Trash2, Plus, ChevronDown } from 'lucide-react';
import { useInvoiceCreator } from '../InvoiceCreatorContext';

const inputClass = `w-full h-10 px-3 bg-noble-surface border border-noble-border rounded-lg text-slate-800 text-[13px] focus:outline-none focus:border-[#0599D5] focus:ring-2 focus:ring-[#0599D5]/10 transition-all placeholder-slate-400 font-medium font-[Inter,sans-serif]`;
const labelClass = "text-[11px] font-bold text-slate-500 mb-1 block uppercase tracking-wider font-[Inter,sans-serif]";
const cardClass = "bg-noble-surface rounded-xl border border-noble-border shadow-sm overflow-hidden mb-3";
const cardHeaderClass = "px-5 py-3 border-b border-slate-100 bg-slate-50/50";

export const AddItemsStep = () => {
    const {
        items, addItem, removeItem, updateItem,
        currencySymbol, subtotal,
        discountType, setDiscountType, discountValue, setDiscountValue,
        taxType, setTaxType, taxRate, setTaxRate,
        discountTotal, taxTotal, total
    } = useInvoiceCreator();

    return (
        <div className="space-y-3">
            <div className={cardClass}>
                <div className={cardHeaderClass}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-md bg-blue-50 flex items-center justify-center">
                                <FileText className="w-3.5 h-3.5 text-blue-600" />
                            </div>
                            <h3 className="text-[13px] font-bold text-slate-800 font-[Inter,sans-serif]">Line Items</h3>
                        </div>
                        <span className="text-[11px] text-slate-400 font-medium font-[Inter,sans-serif]">{items.length} item{items.length !== 1 ? 's' : ''}</span>
                    </div>
                </div>

                {/* Column Headers */}
                <div className="hidden sm:grid sm:grid-cols-12 gap-2 px-5 py-2 border-b border-slate-100 bg-slate-50/40">
                    <div className="col-span-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Description</div>
                    <div className="col-span-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Qty</div>
                    <div className="col-span-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Rate</div>
                    <div className="col-span-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Amount</div>
                    <div className="col-span-1" />
                </div>

                <div className="divide-y divide-slate-100">
                    {items.map((item: any) => (
                        <div key={item.id} className="sm:grid sm:grid-cols-12 gap-2 items-center px-5 py-2.5 group hover:bg-slate-50/50 transition-colors">
                            <div className="col-span-5 mb-2 sm:mb-0">
                                <input
                                    type="text"
                                    aria-label="Item description"
                                    placeholder="Item or service name..."
                                    value={item.name}
                                    onChange={e => updateItem(item.id, 'name', e.target.value)}
                                    className="w-full text-[13px] font-medium text-slate-800 placeholder-slate-400 bg-transparent border-0 outline-none p-0 focus:ring-0 font-[Inter,sans-serif]"
                                />
                            </div>
                            <div className="col-span-2 flex sm:justify-center">
                                <input
                                    id={`qty-${item.id}`}
                                    type="number" min="0" step="1"
                                    aria-label="Quantity"
                                    value={item.quantity}
                                    onChange={e => updateItem(item.id, 'quantity', parseInt(e.target.value, 10) || 0)}
                                    className="w-14 text-[13px] text-center border border-noble-border rounded-lg py-1 focus:border-[#0599D5] focus:ring-1 focus:ring-[#0599D5]/20 outline-none bg-noble-surface font-medium font-[Inter,sans-serif]"
                                />
                            </div>
                            <div className="col-span-2 flex sm:justify-end">
                                <input
                                    id={`price-${item.id}`}
                                    type="number" min="0" step="0.01"
                                    aria-label="Unit rate"
                                    value={item.price}
                                    onChange={e => updateItem(item.id, 'price', parseFloat(e.target.value) || 0)}
                                    className="w-24 text-[13px] text-right border border-noble-border rounded-lg py-1 px-2 focus:border-[#0599D5] focus:ring-1 focus:ring-[#0599D5]/20 outline-none bg-noble-surface font-medium font-[Inter,sans-serif]"
                                />
                            </div>
                            <div className="col-span-2 text-right">
                                <span className="text-[13px] font-bold text-slate-800 font-[Inter,sans-serif]">
                                    {currencySymbol}{((item.quantity || 0) * (item.price || 0)).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                </span>
                            </div>
                            <div className="col-span-1 flex justify-end">
                                <button
                                    aria-label="Remove item" onClick={() => removeItem(item.id)}
                                    className="w-6 h-6 rounded-lg opacity-0 group-hover:opacity-100 flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all"
                                >
                <Trash2 className="w-3 h-3" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/30 flex items-center gap-4">
                    <button onClick={addItem} className="text-[13px] font-semibold text-[#0599D5] hover:text-[#0482B5] flex items-center gap-1 transition-colors font-['Inter',sans-serif]">
                        <Plus className="w-3.5 h-3.5" /> Add Item
                    </button>
                </div>
            </div>

            {/* Totals Card */}
            <div className={cardClass}>
                <div className={cardHeaderClass}>
                    <h3 className="text-[13px] font-bold text-slate-800 font-[Inter,sans-serif]">Totals & Adjustments</h3>
                </div>
                <div className="px-5 py-4 space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label htmlFor="discount-type" className={labelClass}>Discount Type</label>
                            <div className="relative">
                                <select id="discount-type" value={discountType} onChange={e => setDiscountType(e.target.value as any)} className={inputClass + ' appearance-none pr-8 cursor-pointer'}>
                                    <option value="none">No Discount</option>
                                    <option value="percentage">Percentage (%)</option>
                                    <option value="flat">Flat Amount</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="discount-value" className={labelClass}>{discountType === 'flat' ? `Amount (${currencySymbol})` : 'Discount Value'}</label>
                            <input id="discount-value" type="number" min="0" value={discountValue} onChange={e => setDiscountValue(parseFloat(e.target.value) || 0)} disabled={discountType === 'none'} className={inputClass + ' disabled:opacity-40 disabled:cursor-not-allowed'} />
                        </div>
                        <div>
                            <label htmlFor="tax-type" className={labelClass}>Tax Type</label>
                            <div className="relative">
                                <select id="tax-type" value={taxType} onChange={e => setTaxType(e.target.value as any)} className={inputClass + ' appearance-none pr-8 cursor-pointer'}>
                                    <option value="exclusive">Exclusive (add on top)</option>
                                    <option value="inclusive">Inclusive (tax included)</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="tax-rate" className={labelClass}>Tax Rate (%)</label>
                            <input id="tax-rate" type="number" min="0" value={taxRate} onChange={e => setTaxRate(parseFloat(e.target.value) || 0)} className={inputClass} />
                        </div>
                    </div>

                    {/* Totals Summary */}
                    <div className="bg-slate-50 rounded-xl border border-slate-100 px-4 py-3 space-y-2">
                        <div className="flex justify-between items-center text-[13px] text-slate-600 font-[Inter,sans-serif]">
                            <span className="font-medium">Subtotal</span>
                            <span className="font-bold text-slate-800">{currencySymbol}{subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                        </div>
                        {discountTotal > 0 && (
                            <div className="flex justify-between items-center text-[13px] text-[#0599D5] font-['Inter',sans-serif]">
                                <span className="font-medium">Discount {discountType === 'percentage' ? `(${discountValue}%)` : '(Flat)'}</span>
                                <span className="font-bold">−{currencySymbol}{discountTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                            </div>
                        )}
                        {taxTotal > 0 && (
                            <div className="flex justify-between items-center text-[13px] text-slate-600 font-[Inter,sans-serif]">
                                <span className="font-medium">Tax ({taxRate}%)</span>
                                <span className="font-bold text-slate-800">{currencySymbol}{taxTotal.toFixed(2)}</span>
                            </div>
                        )}
                        <div className="pt-2 border-t border-noble-border flex justify-between items-center">
                            <span className="text-[13px] font-bold text-slate-700 font-[Inter,sans-serif]">Total Due</span>
                            <span className="text-xl font-black text-[#0599D5] font-[Inter,sans-serif]">{currencySymbol}{total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
