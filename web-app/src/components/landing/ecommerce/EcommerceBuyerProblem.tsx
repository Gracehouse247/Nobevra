import React from 'react';
import { AlertCircle, FileX, ArrowRightCircle } from 'lucide-react';

export default function EcommerceBuyerProblem() {
    return (
        <section className="py-24 md:py-32 bg-noble-surface relative overflow-hidden border-t border-slate-100">
            <div className="max-w-[1430px] mx-auto px-4 md:px-16">
                
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    
                    <div className="bg-red-50 rounded-[32px] border border-red-100 p-8 md:p-12 shadow-sm relative">
                        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                            <FileX className="w-48 h-48 text-red-500" />
                        </div>
                        
                        <h3 className="font-black text-2xl text-red-900 mb-8">Why B2B buyers reject your invoices</h3>
                        
                        <div className="space-y-6 relative z-10">
                            <div className="bg-noble-surface rounded-2xl p-6 border border-red-100 shadow-sm">
                                <div className="flex items-center gap-3 mb-3">
                                    <AlertCircle className="w-5 h-5 text-red-500" />
                                    <h4 className="font-bold text-noble-text">Missing PO Number</h4>
                                </div>
                                <p className="text-slate-600 text-sm leading-relaxed">Accounts Payable (AP) cannot process an invoice without matching it to the original Purchase Order. Without a PO field, it gets kicked back.</p>
                            </div>

                            <div className="bg-noble-surface rounded-2xl p-6 border border-red-100 shadow-sm">
                                <div className="flex items-center gap-3 mb-3">
                                    <AlertCircle className="w-5 h-5 text-red-500" />
                                    <h4 className="font-bold text-noble-text">HTML Emails instead of PDFs</h4>
                                </div>
                                <p className="text-slate-600 text-sm leading-relaxed">Sending a Shopify order confirmation email doesn't work. Finance teams require a downloadable, compliant PDF document for their records.</p>
                            </div>

                            <div className="bg-noble-surface rounded-2xl p-6 border border-red-100 shadow-sm">
                                <div className="flex items-center gap-3 mb-3">
                                    <AlertCircle className="w-5 h-5 text-red-500" />
                                    <h4 className="font-bold text-noble-text">Missing Tax / VAT IDs</h4>
                                </div>
                                <p className="text-slate-600 text-sm leading-relaxed">In Europe and many other regions, a B2B invoice is legally invalid if it does not display both the seller's and the buyer's VAT registration numbers.</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 text-red-600 font-bold text-[10px] uppercase tracking-widest mb-6 border border-red-100">
                            The B2B Friction Point
                        </div>
                        
                        <h2 className="font-inter text-[32px] md:text-[48px] font-black text-near-black leading-[1.1] mb-6 tracking-tight">
                            The difference between an order receipt and a B2B invoice.
                        </h2>
                        
                        <div className="space-y-5 text-lg text-slate-600 leading-relaxed font-medium mb-10">
                            <p>
                                When selling to consumers, a simple email receipt is enough. When selling B2B wholesale, your buyers have strict Accounts Payable protocols. 
                            </p>
                            <p>
                                Every time you send an incomplete invoice, you trigger an email chain asking for corrections. This doesn't just annoy the buyer — it delays your payment by 2 to 4 weeks while the paperwork is sorted out.
                            </p>
                            <p className="text-near-black font-bold">
                                NobleInvoice automatically formats every B2B invoice to AP standards before it ever hits their inbox. Get paid on time, the first time.
                            </p>
                        </div>

                        <div className="flex items-center gap-4 text-noble-blue font-bold">
                            <ArrowRightCircle className="w-6 h-6" />
                            <span>Stop getting your invoices rejected by finance departments.</span>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
