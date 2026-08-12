import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Loader2, FileText, X } from 'lucide-react';

interface LinkSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string, title: string) => void;
}

export default function LinkSearchModal({ isOpen, onClose, onSelect }: LinkSearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.trim().length < 2) {
        setResults([]);
        return;
      }
      setLoading(true);
      try {
        const res = await fetch(`/api/cms/search-articles?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.articles || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        >
          <div className="bg-noble-surface w-full max-w-lg rounded-2xl shadow-2xl flex flex-col max-h-[80vh]">
            <div className="p-4 border-b border-slate-100 flex items-center gap-3">
              <Search className="w-5 h-5 text-slate-400" />
              <input
                autoFocus
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles for internal linking..."
                className="flex-1 bg-transparent border-none outline-none text-slate-800 placeholder-slate-400 font-medium"
              />
              {loading && <Loader2 className="w-4 h-4 text-[#006970] animate-spin" />}
              <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-full ml-auto">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-2">
              {results.length > 0 ? (
                results.map((article) => (
                  <button
                    key={article.id}
                    onClick={() => onSelect(`/${article.slug}`, article.title)}
                    className="w-full text-left p-3 hover:bg-slate-50 rounded-xl transition-colors flex items-start gap-3 group"
                  >
                    <div className="bg-[#006970]/10 p-2 rounded-lg mt-0.5">
                      <FileText className="w-4 h-4 text-[#006970]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 group-hover:text-[#006970] transition-colors">{article.title}</h4>
                      <p className="text-xs text-slate-500 line-clamp-1 mt-1">{article.excerpt}</p>
                    </div>
                  </button>
                ))
              ) : query.length >= 2 && !loading ? (
                <div className="p-8 text-center text-slate-500 text-sm">
                  No articles found matching "{query}".
                </div>
              ) : (
                <div className="p-8 text-center text-slate-400 text-sm">
                  Type to search your published articles.
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
