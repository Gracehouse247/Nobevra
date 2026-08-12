import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Send, Loader2, CheckCircle2, AlertTriangle } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface SocialPublishModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: string;
  platform: 'twitter' | 'linkedin' | 'newsletter';
  articleId?: string;
}

export default function SocialPublishModal({ isOpen, onClose, content, platform, articleId }: SocialPublishModalProps) {
  const [mode, setMode] = useState<'now' | 'schedule'>('now');
  const [scheduleDate, setScheduleDate] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleAction = async () => {
    setLoading(true);
    try {
      if (mode === 'now') {
        const res = await fetch('/api/social/publish-now', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ platform, content })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to publish');
        toast.success('Successfully published to ' + platform);
      } else {
        if (!scheduleDate) throw new Error('Please select a date and time');
        const res = await fetch('/api/social/schedule', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ platform, content, scheduledFor: scheduleDate, articleId })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to schedule');
        toast.success('Post scheduled successfully');
      }
      onClose();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      >
        <div className="bg-noble-surface w-full max-w-md rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              Publish to {platform.charAt(0).toUpperCase() + platform.slice(1)}
            </h3>
            <button onClick={onClose} className="p-1 hover:bg-slate-200 rounded-full text-slate-500">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="p-5 flex flex-col gap-4">
            <div className="flex gap-2 p-1 bg-slate-100 rounded-lg">
              <button
                onClick={() => setMode('now')}
                className={`flex-1 py-1.5 text-sm font-semibold rounded-md transition-all ${mode === 'now' ? 'bg-noble-surface shadow text-[#006970]' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Publish Now
              </button>
              <button
                onClick={() => setMode('schedule')}
                className={`flex-1 py-1.5 text-sm font-semibold rounded-md transition-all ${mode === 'schedule' ? 'bg-noble-surface shadow text-[#006970]' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Schedule
              </button>
            </div>

            {mode === 'schedule' && (
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Select Date & Time</label>
                <input 
                  type="datetime-local" 
                  value={scheduleDate}
                  onChange={(e) => setScheduleDate(e.target.value)}
                  className="w-full border border-noble-border rounded-lg p-2.5 text-sm outline-none focus:border-[#006970]"
                />
              </div>
            )}

            <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 max-h-40 overflow-y-auto">
              <p className="text-xs text-slate-600 whitespace-pre-wrap">{content}</p>
            </div>

            <button
              onClick={handleAction}
              disabled={loading || (mode === 'schedule' && !scheduleDate)}
              className="w-full py-2.5 rounded-xl bg-[#006970] text-white font-bold text-sm hover:bg-[#005a60] transition-colors disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : mode === 'now' ? <Send className="w-4 h-4" /> : <Calendar className="w-4 h-4" />}
              {mode === 'now' ? 'Publish Immediately' : 'Schedule Post'}
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
