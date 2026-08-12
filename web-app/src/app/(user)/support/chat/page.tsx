'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Send, ChevronLeft, User, Bot, Headset } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function LiveChatPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi there! I'm Noble, your support assistant. How can I help you today?", sender: 'bot', time: new Date() }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg = { id: Date.now(), text: input, sender: 'user', time: new Date() };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        // Simulated Response
        setTimeout(() => {
            setIsTyping(false);
            const responses = [
                "I understand. Let me check your account details.",
                "That's a great question. You can find that setting in the Branding section.",
                "I've noted this down for our technical team. Is there anything else?",
                "Noble Pulse and Elite both support unlimited invoices. Elite adds team features.",
                "To change your currency, go to Settings > Team & Brand."
            ];
            const botMsg = { 
                id: Date.now() + 1, 
                text: responses[Math.floor(Math.random() * responses.length)], 
                sender: 'bot', 
                time: new Date() 
            };
            setMessages(prev => [...prev, botMsg]);
        }, 1500);
    };

    return (
        <div className="h-[calc(100vh-100px)] flex flex-col max-w-4xl mx-auto p-4 md:p-8">
            <div className="flex items-center justify-between mb-6">
                <button 
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-slate-500 dark:text-slate-400 dark:text-slate-500 hover:text-[#166FBB] transition-colors font-black text-[10px] uppercase tracking-widest"
                >
                    <ChevronLeft className="w-4 h-4" />
                    Back to Help Center
                </button>
                <div className="flex items-center gap-3 bg-green-500/10 px-4 py-2 rounded-full border border-green-500/20">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[10px] font-black text-green-600 uppercase tracking-widest">Support Online</span>
                </div>
            </div>

            <div className="flex-1 bg-noble-surface dark:bg-noble-card rounded-[32px] border border-[#E2E8F0] shadow-xl overflow-hidden flex flex-col">
                {/* Chat Header */}
                <div className="p-6 border-b border-[#E2E8F0] flex items-center gap-4 bg-slate-50 dark:bg-[#0D1B2E]/50">
                    <div className="w-12 h-12 rounded-2xl bg-[#166FBB] flex items-center justify-center text-white shadow-lg shadow-[#166FBB]/20">
                        <Headset className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="font-black text-[#0F172A] text-lg leading-tight">Noble Support</h2>
                        <p className="text-xs font-bold text-[#64748B]">Typical response time: <span className="text-[#166FBB]">2 minutes</span></p>
                    </div>
                </div>

                {/* Messages Container */}
                <div 
                    ref={scrollRef}
                    className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#F8FAFC] dark:bg-[#060D1A]/50 custom-scrollbar"
                >
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] space-y-2 ${msg.sender === 'user' ? 'text-right' : ''}`}>
                                <div className={`p-4 rounded-2xl text-sm font-medium shadow-sm ${
                                    msg.sender === 'user' 
                                    ? 'bg-[#166FBB] text-white rounded-tr-none' 
                                    : 'bg-noble-surface dark:bg-noble-card text-[#0F172A] border border-[#E2E8F0] rounded-tl-none'
                                }`}>
                                    {msg.text}
                                </div>
                                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                                    {msg.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="flex justify-start">
                            <div className="bg-noble-surface dark:bg-noble-card border border-[#E2E8F0] p-4 rounded-2xl rounded-tl-none shadow-sm flex gap-1">
                                <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <div className="p-6 bg-noble-surface dark:bg-noble-card border-t border-[#E2E8F0]">
                    <div className="relative">
                        <input 
                            type="text"
                            placeholder="Type your message..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            className="w-full h-14 pl-6 pr-16 bg-[#F8FAFC] dark:bg-[#060D1A] border border-[#E2E8F0] rounded-2xl text-sm font-medium focus:outline-none focus:border-[#166FBB] transition-all"
                        />
                        <button 
                            onClick={handleSend}
                            className="absolute right-2 top-2 w-10 h-10 bg-[#166FBB] text-white rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-[#166FBB]/20"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                    <p className="text-[10px] text-center text-slate-400 dark:text-slate-500 font-bold uppercase tracking-[0.2em] mt-4">
                        Press Enter to send message
                    </p>
                </div>
            </div>
        </div>
    );
}
