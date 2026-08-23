'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function TeamsScalingDeepDive() {
    return (
        <section
            id="teams-enterprise"
            className="py-24 md:py-32 bg-slate-50/50 relative overflow-hidden"
            aria-label="Section 13: Team Workspaces and Enterprise Scaling"
        >
            <div className="max-w-[1430px] mx-auto px-4 md:px-16 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left: Copy */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/8 border border-noble-blue/15 text-noble-blue font-bold text-[10px] uppercase tracking-widest mb-6">
                            <span className="material-symbols-outlined text-sm" aria-hidden="true">group</span>
                            Teams & Workspace Scaling
                        </div>

                        <h2 className="font-inter text-3xl sm:text-4xl lg:text-5xl font-black text-near-black leading-[1.15] tracking-tight mb-6">
                            Scale Your Team with Strict{' '}
                            <span className="text-noble-blue italic">Role-Based Control.</span>
                        </h2>

                        <div className="text-base text-near-black/60 space-y-4 mb-8 leading-relaxed">
                            <p>
                                As your agency or business grows, sharing a single login creates serious security vulnerabilities and chaotic billing mistakes.
                            </p>
                            <p>
                                <strong className="text-near-black/80">Nobevra provides multi-tenant team workspaces protected by PostgreSQL Row-Level Security.</strong> Invite accountants, sales reps, and managers with granular permissions so everyone sees exactly what they need — and nothing they shouldn&apos;t.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4 mb-8">
                            <div className="bg-noble-surface p-4 rounded-2xl border border-slate-100 shadow-sm">
                                <div className="w-8 h-8 rounded-xl bg-noble-blue/10 flex items-center justify-center text-noble-blue mb-2">
                                    <span className="material-symbols-outlined text-base">admin_panel_settings</span>
                                </div>
                                <h3 className="font-bold text-xs text-near-black mb-1">Granular Role Permissions</h3>
                                <p className="text-[11px] text-near-black/50">Assign Owner, Admin, Member, or Billing-only roles.</p>
                            </div>

                            <div className="bg-noble-surface p-4 rounded-2xl border border-slate-100 shadow-sm">
                                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 mb-2">
                                    <span className="material-symbols-outlined text-base">branding_watermark</span>
                                </div>
                                <h3 className="font-bold text-xs text-near-black mb-1">Custom Workspace Branding</h3>
                                <p className="text-[11px] text-near-black/50">Remove watermarks and apply your company logo and colors.</p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <Link
                                href="/register"
                                className="w-full sm:w-auto px-7 py-3.5 bg-noble-blue text-white font-black text-xs rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-md shadow-blue-500/20"
                            >
                                Start Free
                                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </Link>

                            <Link
                                href="/pricing"
                                className="w-full sm:w-auto px-7 py-3.5 bg-noble-surface border border-slate-200 text-near-black font-bold text-xs rounded-xl hover:bg-slate-50 transition-all flex items-center justify-center"
                            >
                                Explore Team Plans
                            </Link>
                        </div>
                    </motion.div>

                    {/* Right: Team Roles Mockup */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.7 }}
                        className="relative"
                    >
                        <div className="bg-noble-surface rounded-[32px] p-6 shadow-xl border border-slate-100 space-y-4">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                                <div>
                                    <p className="font-black text-sm text-near-black">Team Members & Access</p>
                                    <p className="text-[10px] text-slate-400">Gracehouse Creative Agency Workspace</p>
                                </div>
                                <span className="px-3 py-1 rounded-full bg-noble-blue/10 text-noble-blue text-[10px] font-black uppercase">
                                    3 Active Seats
                                </span>
                            </div>

                            <div className="space-y-3">
                                <div className="bg-slate-50 rounded-2xl p-3.5 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-noble-blue text-white font-bold flex items-center justify-center text-xs">
                                            NO
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-near-black">Noble O. (You)</p>
                                            <p className="text-[10px] text-slate-400">noble@company.com</p>
                                        </div>
                                    </div>
                                    <span className="text-xs font-black text-noble-blue">Workspace Owner</span>
                                </div>

                                <div className="bg-slate-50 rounded-2xl p-3.5 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
                                            SA
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-near-black">Sarah A.</p>
                                            <p className="text-[10px] text-slate-400">sarah@company.com</p>
                                        </div>
                                    </div>
                                    <span className="text-xs font-black text-emerald-600">Billing Admin</span>
                                </div>

                                <div className="bg-slate-50 rounded-2xl p-3.5 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-slate-700 text-white font-bold flex items-center justify-center text-xs">
                                            MT
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-near-black">Marcus T.</p>
                                            <p className="text-[10px] text-slate-400">marcus@company.com</p>
                                        </div>
                                    </div>
                                    <span className="text-xs font-black text-slate-600">Operations Member</span>
                                </div>
                            </div>

                            <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 font-medium border-t border-slate-100">
                                <span>Multi-Tenant Data Isolation</span>
                                <span>RLS Policy Enforced</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
