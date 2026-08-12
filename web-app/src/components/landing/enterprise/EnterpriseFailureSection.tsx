import React from 'react';
import { AlertTriangle, TrendingDown, Clock } from 'lucide-react';

export default function EnterpriseFailureSection() {
    return (
        <section className="py-24 bg-slate-900 text-white relative">
            <div className="max-w-[1430px] mx-auto px-4 md:px-16 text-center">
                
                <h2 className="font-inter text-[32px] md:text-[48px] font-black leading-[1.1] mb-16 tracking-tight max-w-3xl mx-auto">
                    Why 70% of high-volume businesses experience revenue leakage.
                </h2>
                
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-noble-card border border-noble-card-border rounded-[24px] p-8 text-left hover:bg-noble-surface/10 transition-colors">
                        <AlertTriangle className="w-8 h-8 text-red-400 mb-6" />
                        <h3 className="text-xl font-bold mb-3">Disconnected Systems</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Sales closes the deal in CRM. Operations provisions it. Finance manually keys the invoice into the ERP. Every manual handoff is an opportunity for human error and delayed billing.
                        </p>
                    </div>

                    <div className="bg-noble-card border border-noble-card-border rounded-[24px] p-8 text-left hover:bg-noble-surface/10 transition-colors">
                        <Clock className="w-8 h-8 text-amber-400 mb-6" />
                        <h3 className="text-xl font-bold mb-3">Slow Accounts Receivable</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Without automated enterprise accounts receivable software, your finance team spends their days chasing clients for payment. 30-day terms easily stretch to 90 days, suffocating your cash flow.
                        </p>
                    </div>

                    <div className="bg-noble-card border border-noble-card-border rounded-[24px] p-8 text-left hover:bg-noble-surface/10 transition-colors">
                        <TrendingDown className="w-8 h-8 text-noble-blue mb-6" />
                        <h3 className="text-xl font-bold mb-3">Failed Payment Processing</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Legacy processors flag legitimate international transactions as fraud. A 3% failure rate on a $10M monthly volume means you are losing $300,000 every month to bad infrastructure.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
}
