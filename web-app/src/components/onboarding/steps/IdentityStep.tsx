'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Globe, Briefcase } from 'lucide-react';

interface IdentityStepProps {
    data: {
        businessName: string;
        industry: string;
        country: string;
    };
    updateData: (fields: Partial<{ businessName: string; industry: string; country: string }>) => void;
    activeColor: string;
}

const INDUSTRIES = ['Technology', 'Retail', 'Creative Services', 'Consulting', 'Healthcare', 'Education', 'Construction', 'Other'];
const COUNTRIES = ['United States', 'United Kingdom', 'Canada', 'Australia', 'Nigeria', 'South Africa', 'Germany', 'France', 'Other'];

export const IdentityStep = ({ data, updateData, activeColor }: IdentityStepProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-lg mx-auto p-6"
        >
            <h2 className="text-2xl font-black text-noble-text mb-2">Business Identity</h2>
            <p className="text-slate-500 mb-8 font-medium">Let's start with the basics. How should your clients know you?</p>

            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Business Name</label>
                    <div className="relative">
                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            value={data.businessName}
                            onChange={(e) => updateData({ businessName: e.target.value })}
                            placeholder="Acme Corp"
                            className="w-full pl-12 pr-4 py-4 bg-noble-surface border border-noble-border rounded-2xl focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                            style={{ '--tw-ring-color': activeColor } as any}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Industry</label>
                    <div className="relative">
                        <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <select
                            value={data.industry}
                            onChange={(e) => updateData({ industry: e.target.value })}
                            className="w-full pl-12 pr-4 py-4 bg-noble-surface border border-noble-border rounded-2xl focus:outline-none focus:ring-2 focus:border-transparent transition-all appearance-none"
                            style={{ '--tw-ring-color': activeColor } as any}
                        >
                            {INDUSTRIES.map(ind => (
                                <option key={ind} value={ind}>{ind}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Operating Country</label>
                    <div className="relative">
                        <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <select
                            value={data.country}
                            onChange={(e) => updateData({ country: e.target.value })}
                            className="w-full pl-12 pr-4 py-4 bg-noble-surface border border-noble-border rounded-2xl focus:outline-none focus:ring-2 focus:border-transparent transition-all appearance-none"
                            style={{ '--tw-ring-color': activeColor } as any}
                        >
                            {COUNTRIES.map(c => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
