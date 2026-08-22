'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, X, CheckCircle2, Download, ArrowRight, FileText, Zap, Globe } from 'lucide-react';
import { supabase } from '@/lib/supabase';

function getPasswordStrength(password: string): number {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
  return strength;
}

const STRENGTH_CONFIG = [
  { label: 'Weak',      color: '#EF4444' },
  { label: 'Fair',      color: '#F59E0B' },
  { label: 'Good',      color: '#3B82F6' },
  { label: 'Strong',    color: '#166FBB' },
  { label: 'Excellent', color: '#10B981' },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

type View = 'register' | 'login' | 'success';

export default function TemplateDownloadModal({ isOpen, onClose }: Props) {
  const [view, setView] = useState<View>('register');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');

  const strength = useMemo(() => getPasswordStrength(password), [password]);
  const strengthConfig = STRENGTH_CONFIG[strength];

  const triggerDownload = () => {
    const link = document.createElement('a');
    link.href = '/api/download/proforma-template';
    link.setAttribute('download', 'Nobevra-Proforma-Template.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSuccess = () => {
    setView('success');
    setTimeout(() => {
      triggerDownload();
      setTimeout(onClose, 1200);
    }, 1400);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (view === 'register') {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { name, display_name: name, full_name: name } },
        });
        if (signUpError) throw signUpError;
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        if (signInError) throw signInError;
      }
      handleSuccess();
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    setError('');
    try {
      const { error: googleError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/api/download/proforma-template`,
        },
      });
      if (googleError) throw googleError;
    } catch (err: any) {
      setError(err.message || 'Google sign-in failed.');
      setGoogleLoading(false);
    }
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setError('');
    setView('register');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal Panel */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full max-w-lg bg-noble-surface rounded-[28px] shadow-2xl overflow-hidden">

              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-noble-text transition-all"
              >
                <X className="w-4 h-4" />
              </button>

              <AnimatePresence mode="wait">

                {/* ── SUCCESS STATE ─────────────────────────────── */}
                {view === 'success' && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-20 px-8 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
                      className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                      style={{ backgroundColor: '#166FBB' }}
                    >
                      <CheckCircle2 className="w-10 h-10 text-white" />
                    </motion.div>
                    <h2 className="text-2xl font-black text-noble-text mb-2">Account Created!</h2>
                    <p className="text-slate-500 font-medium mb-4">Your proforma invoice template is downloading...</p>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 2.5, ease: 'linear' }}
                      className="h-1.5 rounded-full max-w-[240px]"
                      style={{ backgroundColor: '#166FBB' }}
                    />
                    <div className="flex items-center gap-2 mt-4 text-sm font-bold text-slate-400">
                      <Download className="w-4 h-4" />
                      Nobevra-Proforma-Template.pdf
                    </div>
                  </motion.div>
                )}

                {/* ── FORM STATE ────────────────────────────────── */}
                {view !== 'success' && (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Header */}
                    <div className="px-8 pt-8 pb-6 border-b border-slate-100">
                      <div className="flex items-center gap-4 mb-4">
                        {/* PDF Preview icon */}
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#EFF6FF' }}>
                          <FileText className="w-6 h-6" style={{ color: '#166FBB' }} />
                        </div>
                        <div>
                          <p className="text-xs font-black uppercase tracking-widest" style={{ color: '#166FBB' }}>Free Download</p>
                          <h2 className="text-xl font-black text-noble-text leading-tight">Professional Proforma Invoice Template</h2>
                        </div>
                      </div>

                      {/* Benefits strip */}
                      <div className="flex items-center gap-6 text-xs font-bold text-slate-500">
                        <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-amber-500" />Instant PDF</span>
                        <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5 text-emerald-500" />Multi-currency fields</span>
                        <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" style={{ color: '#166FBB' }} />100% free</span>
                      </div>
                    </div>

                    {/* Form body */}
                    <div className="px-8 py-6">
                      {/* Tab switcher */}
                      <div className="flex bg-slate-100 rounded-xl p-1 mb-5">
                        {(['register', 'login'] as const).map((tab) => (
                          <button
                            key={tab}
                            onClick={() => { setView(tab); setError(''); }}
                            className={`flex-1 py-2 text-xs font-black rounded-lg uppercase tracking-widest transition-all ${
                              view === tab
                                ? 'bg-noble-surface text-noble-text shadow-sm'
                                : 'text-slate-400 hover:text-slate-600'
                            }`}
                          >
                            {tab === 'register' ? 'Create Account' : 'Sign In'}
                          </button>
                        ))}
                      </div>

                      {/* Google */}
                      <button
                        onClick={handleGoogle}
                        disabled={googleLoading}
                        className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-noble-border bg-noble-surface hover:bg-slate-50 transition-all font-bold text-sm text-slate-700 mb-4 shadow-sm disabled:opacity-50"
                      >
                        {googleLoading ? (
                          <div className="w-4 h-4 border-2 border-slate-300 border-t-blue-600 rounded-full animate-spin" />
                        ) : (
                          <svg className="w-4 h-4" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                          </svg>
                        )}
                        Continue with Google
                      </button>

                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex-1 h-px bg-slate-100" />
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-300">Or use email</span>
                        <div className="flex-1 h-px bg-slate-100" />
                      </div>

                      {error && (
                        <div className="bg-red-50 text-red-600 text-xs font-bold p-3 rounded-xl border border-red-100 mb-4 text-center">
                          {error}
                        </div>
                      )}

                      <form onSubmit={handleSubmit} className="space-y-3">
                        {view === 'register' && (
                          <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Full Name / Company Name"
                            className="w-full bg-slate-50 border border-noble-border rounded-xl px-4 py-3 text-sm text-noble-text placeholder:text-slate-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                          />
                        )}

                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Email Address"
                          className="w-full bg-slate-50 border border-noble-border rounded-xl px-4 py-3 text-sm text-noble-text placeholder:text-slate-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                        />

                        <div className="relative">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password (min. 8 characters)"
                            className="w-full bg-slate-50 border border-noble-border rounded-xl px-4 py-3 pr-12 text-sm text-noble-text placeholder:text-slate-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(p => !p)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
                            tabIndex={-1}
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>

                        {/* Password strength — only on register */}
                        {view === 'register' && password.length > 0 && (
                          <div className="space-y-1.5 px-1">
                            <div className="flex justify-between items-center">
                              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Security</span>
                              <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: strengthConfig.color }}>{strengthConfig.label}</span>
                            </div>
                            <div className="flex gap-1.5">
                              {[0,1,2,3].map(i => (
                                <div key={i} className="flex-1 h-1 rounded-full transition-all duration-300"
                                  style={{ backgroundColor: i < strength ? strengthConfig.color : '#E2E8F0' }} />
                              ))}
                            </div>
                          </div>
                        )}

                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full py-3.5 rounded-xl text-white font-black text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90 hover:scale-[1.01] active:scale-95 shadow-lg disabled:opacity-50 disabled:scale-100"
                          style={{ backgroundColor: '#166FBB', boxShadow: '0 10px 30px rgba(22,111,187,0.3)' }}
                        >
                          {loading ? (
                            <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Processing...</>
                          ) : (
                            <>
                              <Download className="w-4 h-4" />
                              {view === 'register' ? 'Create Account & Download' : 'Sign In & Download'}
                              <ArrowRight className="w-4 h-4" />
                            </>
                          )}
                        </button>
                      </form>

                      <p className="text-center text-[10px] text-slate-400 mt-4 leading-relaxed font-medium">
                        By signing up, you agree to our{' '}
                        <a href="/terms" className="underline hover:text-blue-600">Terms</a> &{' '}
                        <a href="/privacy" className="underline hover:text-blue-600">Privacy Policy</a>
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
