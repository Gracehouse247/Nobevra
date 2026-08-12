'use client';

/**
 * ConflictResolverModal
 *
 * Industry-standard "Manual / User-Assisted Conflict Resolution" UI.
 *
 * Strategy: When automated rules cannot safely determine the "correct" version
 * (e.g., two users edited an invoice simultaneously), we surface the conflict
 * to the user with a clear diff of what changed so they can make an informed
 * decision: "Keep My Changes" or "Accept Server Version".
 *
 * This follows best practices from: Notion, Linear, Figma (conflict toasts),
 * and Google Docs (version history).
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, GitMerge, Monitor, Smartphone, Check, X, ChevronDown, ChevronUp } from 'lucide-react';
import { useSyncStore, SyncConflict } from '@/store/useSyncStore';
import { clientService, invoiceService } from '@/lib/services/supabaseService';
import { toast } from 'react-hot-toast';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatPayloadDiff(payload: any): Record<string, string> {
    const skip = ['id', 'team_id', 'user_id', '_snapshotAt', 'updated_at', 'created_at', 'items'];
    const result: Record<string, string> = {};
    for (const [key, value] of Object.entries(payload)) {
        if (skip.includes(key)) continue;
        if (value !== null && value !== undefined && value !== '') {
            result[key] = String(value);
        }
    }
    return result;
}

function friendlyLabel(key: string): string {
    return key
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());
}

// ─── Single Conflict Card ─────────────────────────────────────────────────────

function ConflictCard({ conflict, onResolved }: { conflict: SyncConflict; onResolved: () => void }) {
    const [loading, setLoading] = useState(false);
    const [showDiff, setShowDiff] = useState(false);
    const { removeConflict } = useSyncStore();
    const diff = formatPayloadDiff(conflict.action.payload);
    const entityName =
        conflict.action.type.includes('INVOICE') ? 'Invoice' :
        conflict.action.type.includes('CLIENT') ? 'Client' : 'Record';

    const handleKeepLocal = async () => {
        setLoading(true);
        try {
            // Force-push local version, ignoring the server's updated_at
            switch (conflict.action.type) {
                case 'UPDATE_CLIENT':
                    await clientService.updateClient(conflict.action.payload.id, conflict.action.payload);
                    break;
                case 'UPDATE_INVOICE':
                    await invoiceService.updateInvoice(conflict.action.payload.id, conflict.action.payload);
                    break;
            }
            removeConflict(conflict.action.id);
            toast.success('Your version has been saved.');
            onResolved();
        } catch (err) {
            toast.error('Failed to save your version. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleAcceptRemote = () => {
        // Discard local changes — just remove the queued action. The server's
        // current version is already the "truth" in Supabase.
        removeConflict(conflict.action.id);
        toast.success('Server version accepted. Your local changes have been discarded.');
        onResolved();
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="bg-noble-surface dark:bg-noble-card/60 backdrop-blur-xl border border-amber-200/60 rounded-[24px] p-6 shadow-[0_8px_32px_rgba(245,158,11,0.08)] relative overflow-hidden"
        >
            {/* Glow accent */}
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-amber-400 to-orange-500 rounded-l-[24px]" />

            <div className="flex items-start gap-4 pl-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <GitMerge className="w-5 h-5 text-amber-500" />
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-black text-amber-600 uppercase tracking-[0.2em]">
                            Sync Conflict
                        </span>
                        <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                            · {entityName}
                        </span>
                    </div>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-100 leading-snug">
                        This {entityName.toLowerCase()} was edited on another device while you were offline.
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold mt-1">
                        Queued {new Date(conflict.action.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>

                    {/* Expandable diff */}
                    {Object.keys(diff).length > 0 && (
                        <div className="mt-3">
                            <button
                                onClick={() => setShowDiff(!showDiff)}
                                className="flex items-center gap-1.5 text-[10px] font-black text-noble-blue uppercase tracking-widest hover:text-noble-blue/70 transition-colors"
                            >
                                {showDiff ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                                Your local changes
                            </button>
                            <AnimatePresence>
                                {showDiff && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="mt-2 bg-noble-surface dark:bg-noble-card/80 border border-slate-100 dark:border-noble-border rounded-2xl p-3 space-y-1.5">
                                            {Object.entries(diff).slice(0, 6).map(([key, value]) => (
                                                <div key={key} className="flex items-center gap-3 text-xs">
                                                    <span className="text-slate-400 dark:text-slate-500 font-bold w-28 flex-shrink-0 truncate">
                                                        {friendlyLabel(key)}
                                                    </span>
                                                    <span className="font-bold text-slate-700 dark:text-slate-200 truncate">{value}</span>
                                                </div>
                                            ))}
                                            {Object.keys(diff).length > 6 && (
                                                <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold">
                                                    +{Object.keys(diff).length - 6} more fields…
                                                </p>
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}

                    {/* Action buttons */}
                    <div className="flex items-center gap-3 mt-4">
                        {/* Keep Local — force-push */}
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={handleKeepLocal}
                            disabled={loading}
                            className="flex items-center gap-2 px-4 py-2.5 bg-noble-blue text-white rounded-xl text-[10px] font-black uppercase tracking-[0.15em] hover:bg-noble-blue/90 transition-all shadow-sm disabled:opacity-50"
                        >
                            <Smartphone className="w-3 h-3" />
                            Keep Mine
                        </motion.button>

                        {/* Accept Remote — discard local */}
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={handleAcceptRemote}
                            disabled={loading}
                            className="flex items-center gap-2 px-4 py-2.5 bg-noble-surface dark:bg-noble-card border border-noble-border text-slate-700 dark:text-slate-200 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] hover:bg-slate-50 dark:hover:bg-white/5 dark:bg-[#0D1B2E] transition-all shadow-sm disabled:opacity-50"
                        >
                            <Monitor className="w-3 h-3" />
                            Accept Server
                        </motion.button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// ─── Main Modal ───────────────────────────────────────────────────────────────

export default function ConflictResolverModal() {
    const { conflicts, removeConflict } = useSyncStore();
    const [isMinimized, setIsMinimized] = useState(false);

    if (conflicts.length === 0) return null;

    return (
        <AnimatePresence>
            <motion.div
                key="conflict-modal"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                className="fixed bottom-24 left-4 right-4 md:left-auto md:right-6 z-[9999] w-auto md:w-full max-w-md"
            >
                {/* Header */}
                <div
                    className="bg-noble-surface dark:bg-noble-card/80 backdrop-blur-2xl border border-amber-200/60 rounded-t-[28px] px-6 py-4 flex items-center justify-between shadow-[0_-4px_20px_rgba(0,0,0,0.04)] cursor-pointer"
                    onClick={() => setIsMinimized(!isMinimized)}
                >
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center animate-pulse">
                            <AlertTriangle className="w-4 h-4 text-amber-500" />
                        </div>
                        <div>
                            <h3 className="text-[11px] font-black text-noble-text uppercase tracking-[0.2em]">
                                Sync Conflicts
                            </h3>
                            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold">
                                {conflicts.length} {conflicts.length === 1 ? 'conflict needs' : 'conflicts need'} your review
                            </p>
                        </div>
                    </div>
                    <motion.div
                        animate={{ rotate: isMinimized ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <ChevronDown className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                    </motion.div>
                </div>

                {/* Conflict list */}
                <AnimatePresence>
                    {!isMinimized && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden bg-noble-surface dark:bg-noble-card/60 backdrop-blur-xl border-x border-b border-amber-200/60 rounded-b-[28px] shadow-[0_20px_60px_rgba(245,158,11,0.12)]"
                        >
                            <div className="p-4 space-y-3 max-h-[400px] overflow-y-auto">
                                <AnimatePresence>
                                    {conflicts.map((conflict) => (
                                        <ConflictCard
                                            key={conflict.action.id}
                                            conflict={conflict}
                                            onResolved={() => {}}
                                        />
                                    ))}
                                </AnimatePresence>
                            </div>

                            {/* Footer — dismiss all */}
                            {conflicts.length > 1 && (
                                <div className="px-4 pb-4">
                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => {
                                            conflicts.forEach((c) => removeConflict(c.action.id));
                                            toast.success('All conflicts dismissed. Server versions kept.');
                                        }}
                                        className="w-full py-3 bg-noble-surface dark:bg-noble-card/80 border border-slate-100 dark:border-noble-border text-slate-500 dark:text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 dark:bg-[#0D1B2E] transition-all"
                                    >
                                        Accept All Server Versions
                                    </motion.button>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </AnimatePresence>
    );
}
