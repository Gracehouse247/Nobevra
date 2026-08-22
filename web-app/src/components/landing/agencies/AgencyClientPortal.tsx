import React from 'react';
import { ShieldCheck, Mail, ArrowRightCircle } from 'lucide-react';

export default function AgencyClientPortal() {
    return (
        <section className="py-24 md:py-32 bg-[#F8FAFC] relative overflow-hidden border-t border-slate-100">
            <div className="max-w-[1430px] mx-auto px-4 md:px-16">
                
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    
                    <div className="bg-noble-surface rounded-[32px] border border-noble-border p-8 md:p-12 shadow-sm relative">
                        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                            <ShieldCheck className="w-48 h-48 text-indigo-500" />
                        </div>
                        
                        <h3 className="font-black text-2xl text-noble-text mb-8">Why email invoices delay payment</h3>
                        
                        <div className="space-y-6 relative z-10">
                            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 shadow-sm">
                                <div className="flex items-center gap-3 mb-3">
                                    <Mail className="w-5 h-5 text-slate-400" />
                                    <h4 className="font-bold text-noble-text">The 14-Day PDF Trap</h4>
                                </div>
                                <p className="text-slate-600 text-sm leading-relaxed">When you email a PDF, your client has to download it, forward it to their AP department, log into their bank portal, and manually wire the money. The average time to complete this? 14 days.</p>
                            </div>

                            <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-100 shadow-sm">
                                <div className="flex items-center gap-3 mb-3">
                                    <ShieldCheck className="w-5 h-5 text-indigo-500" />
                                    <h4 className="font-bold text-noble-text">The 45-Second Portal Solution</h4>
                                </div>
                                <p className="text-slate-600 text-sm leading-relaxed">Sending them a link to a dedicated client portal allows them to click "Pay via ACH or Card" instantly. The invoice is marked paid immediately, and the money routes to your account.</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 font-bold text-[10px] uppercase tracking-widest mb-6 border border-indigo-100">
                            The Approval Bottleneck
                        </div>
                        
                        <h2 className="font-inter text-[32px] md:text-[48px] font-black text-near-black leading-[1.1] mb-6 tracking-tight">
                            White-label client portals get you paid faster.
                        </h2>
                        
                        <div className="space-y-5 text-lg text-slate-600 leading-relaxed font-medium mb-10">
                            <p>
                                Premium clients expect a premium billing experience. A raw PDF attached to an email feels outdated and adds friction to the payment process.
                            </p>
                            <p>
                                With Nobevra, your clients log into a secure portal hosted on your custom domain, featuring your logo and exact brand colors. We are completely invisible.
                            </p>
                            <p className="text-near-black font-bold">
                                They can view their entire invoice history, manage their saved payment methods, and settle new retainer invoices in seconds.
                            </p>
                        </div>

                        <div className="flex items-center gap-4 text-noble-blue font-bold">
                            <ArrowRightCircle className="w-6 h-6" />
                            <span>Eliminate payment friction and look world-class doing it.</span>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
