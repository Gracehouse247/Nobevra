'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Receipt, FileText } from 'lucide-react';

interface InvoicingStepProps {
    data: {
        taxNumber: string;
        invoiceFooter: string;
    };
    updateData: (fields: Partial<{ taxNumber: string; invoiceFooter: string }>) => void;
    activeColor: string;
}

export const InvoicingStep = ({ data, updateData, activeColor }: InvoicingStepProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-lg mx-auto p-6"
        >
            <h2 className="text-2xl font-black text-noble-text mb-2">Invoicing Details</h2>
            <p className="text-slate-500 mb-8 font-medium">Configure your default billing identifiers.</p>

            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Tax / VAT Number (Optional)</label>
                    <div className="relative">
                        <Receipt className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            value={data.taxNumber}
                            onChange={(e) => updateData({ taxNumber: e.target.value })}
                            placeholder="e.g. GB123456789"
                            className="w-full pl-12 pr-4 py-4 bg-noble-surface border border-noble-border rounded-2xl focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                            style={{ '--tw-ring-color': activeColor } as any}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Default Invoice Footer</label>
                    <div className="relative">
                        <FileText className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                        <textarea
                            value={data.invoiceFooter}
                            onChange={(e) => updateData({ invoiceFooter: e.target.value })}
                            placeholder="Thank you for your business! Payment is due within 30 days."
                            rows={4}
                            className="w-full pl-12 pr-4 py-4 bg-noble-surface border border-noble-border rounded-2xl focus:outline-none focus:ring-2 focus:border-transparent transition-all resize-none"
                            style={{ '--tw-ring-color': activeColor } as any}
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
