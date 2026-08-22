import React, { useState } from 'react';
import { User, Mail, MessageSquare, Send, CheckCircle2, Download, Shield } from 'lucide-react';

interface LeadCaptureFormProps {
  ownerName: string;
  onSuccess?: () => void;
}

export const LeadCaptureForm: React.FC<LeadCaptureFormProps> = ({ 
  ownerName,
  onSuccess 
}) => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate CRM Sync
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      if (onSuccess) onSuccess();
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="p-8 rounded-3xl bg-emerald-50 border border-emerald-100 text-center space-y-4 animate-in fade-in zoom-in duration-500 shadow-xl shadow-emerald-500/5">
        <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
          <CheckCircle2 className="text-white" size={32} />
        </div>
        <div className="space-y-1">
          <h3 className="text-2xl font-black text-noble-text">Connection Sent!</h3>
          <p className="text-emerald-600 font-medium">{ownerName} has been notified of your interest.</p>
        </div>
        <button 
          onClick={() => setSubmitted(false)}
          className="text-[10px] font-black uppercase tracking-widest text-emerald-600 hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 rounded-[32px] bg-noble-surface border border-slate-100 shadow-2xl shadow-slate-200/50 space-y-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-noble-blue/5 rounded-full -mr-16 -mt-16 blur-3xl pointer-events-none" />
      
      <div className="space-y-2 relative z-10">
        <h3 className="text-2xl font-black text-noble-text flex items-center gap-2">
          <Send className="text-noble-blue" size={24} />
          Connect with {ownerName.split(' ')[0]}
        </h3>
        <p className="text-slate-500 font-medium">Leave your details to start a professional conversation.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-noble-blue transition-colors">
              <User size={18} />
            </div>
            <input 
              type="text" 
              required
              className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3.5 pl-12 pr-4 text-noble-text font-medium focus:outline-none focus:border-noble-blue focus:bg-noble-surface transition-all shadow-sm"
              placeholder="John Doe"
              value={form.name}
              onChange={e => setForm({...form, name: e.target.value})}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Work Email</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-noble-blue transition-colors">
              <Mail size={18} />
            </div>
            <input 
              type="email" 
              required
              className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3.5 pl-12 pr-4 text-noble-text font-medium focus:outline-none focus:border-noble-blue focus:bg-noble-surface transition-all shadow-sm"
              placeholder="john@company.com"
              value={form.email}
              onChange={e => setForm({...form, email: e.target.value})}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Message (Optional)</label>
          <div className="relative group">
            <div className="absolute top-4 left-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-noble-blue transition-colors">
              <MessageSquare size={18} />
            </div>
            <textarea 
              className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3.5 pl-12 pr-4 text-noble-text font-medium focus:outline-none focus:border-noble-blue focus:bg-noble-surface transition-all h-24 resize-none shadow-sm"
              placeholder="I'd love to discuss..."
              value={form.message}
              onChange={e => setForm({...form, message: e.target.value})}
            />
          </div>
        </div>

        <button 
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-noble-blue hover:bg-noble-blue/90 text-white font-black rounded-xl transition-all shadow-xl shadow-noble-blue/20 flex items-center justify-center gap-2 group"
        >
          {loading ? (
            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              Send Connection Request
              <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </>
          )}
        </button>
      </form>

      <div className="pt-6 border-t border-slate-50 flex flex-col gap-4 relative z-10">
        <button className="w-full py-3 bg-noble-surface hover:bg-slate-50 text-noble-text font-black text-[10px] uppercase tracking-[0.2em] rounded-xl border border-slate-100 transition-all flex items-center justify-center gap-2 shadow-sm">
          <Download size={18} className="text-noble-blue" />
          Save to Contacts (vCard)
        </button>
        
        <div className="flex items-center justify-center gap-2 text-[8px] text-slate-400 font-black uppercase tracking-[0.3em]">
           <Shield size={12} />
           Secure Lead Capture by Nobevra
        </div>
      </div>
    </div>
  );
};
