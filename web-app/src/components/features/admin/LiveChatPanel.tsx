'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Circle, User, Search, MoreVertical } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';

interface ChatMessage {
    id: string;
    text: string;
    sender: 'admin' | 'user';
    time: string;
}

interface Conversation {
    id: string;
    name: string;
    lastMessage: string;
    time: string;
    unread: number;
    status: string;
    user_id: string;
}

export default function LiveChatPanel() {
    const { user } = useAuth();
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [activeConv, setActiveConv] = useState<string | null>(null);
    const [search, setSearch] = useState('');
    const endRef = useRef<HTMLDivElement>(null);

    useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

    useEffect(() => {
        loadConversations();
        
        const convSubscription = supabase.channel('chat_conversations')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'chat_conversations' }, () => {
                loadConversations();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(convSubscription);
        };
    }, []);

    useEffect(() => {
        if (!activeConv) return;
        loadMessages(activeConv);

        const msgSubscription = supabase.channel(`chat_messages_${activeConv}`)
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chat_messages', filter: `conversation_id=eq.${activeConv}` }, (payload) => {
                const newMsg = payload.new;
                setMessages(prev => [...prev, {
                    id: newMsg.id,
                    text: newMsg.message,
                    sender: newMsg.sender_id === user?.id ? 'admin' : 'user', // Assuming this UI is for admin
                    time: new Date(newMsg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                }]);
            })
            .subscribe();

        return () => {
            supabase.removeChannel(msgSubscription);
        };
    }, [activeConv, user]);

    const loadConversations = async () => {
        const { data: convs, error } = await supabase
            .from('chat_conversations')
            .select(`
                id, status, updated_at, user_id,
                users (name, email)
            `)
            .order('updated_at', { ascending: false });

        if (!error && convs) {
            const formatted = convs.map((c: any) => ({
                id: c.id,
                name: c.users?.name || c.users?.email || 'Unknown User',
                lastMessage: 'Active chat', // Ideally fetch from latest message
                time: new Date(c.updated_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                unread: 0,
                status: c.status === 'open' ? 'online' : 'offline',
                user_id: c.user_id,
            }));
            setConversations(formatted);
            if (formatted.length > 0 && !activeConv) {
                setActiveConv(formatted[0].id);
            }
        }
    };

    const loadMessages = async (convId: string) => {
        const { data: msgs, error } = await supabase
            .from('chat_messages')
            .select('*')
            .eq('conversation_id', convId)
            .order('created_at', { ascending: true });

        if (!error && msgs) {
            setMessages(msgs.map(m => ({
                id: m.id,
                text: m.message,
                sender: m.sender_id === user?.id ? 'admin' : 'user',
                time: new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            })));
        }
    };

    const sendMessage = async () => {
        if (!input.trim() || !activeConv || !user) return;
        
        const tempId = Date.now().toString();
        const msgText = input.trim();
        setInput('');

        // Optimistic UI update
        setMessages(prev => [...prev, {
            id: tempId,
            text: msgText,
            sender: 'admin',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }]);

        await supabase.from('chat_messages').insert({
            conversation_id: activeConv,
            sender_id: user.id,
            message: msgText
        });
        
        await supabase.from('chat_conversations').update({ updated_at: new Date().toISOString() }).eq('id', activeConv);
    };

    const filtered = conversations.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
    const activeConvData = conversations.find(c => c.id === activeConv);

    return (
        <div className="flex h-full gap-0 overflow-hidden rounded-3xl glass-card">
            {/* Conversations List */}
            <aside className="w-72 border-r border-black/5  flex flex-col flex-shrink-0">
                <div className="p-5 border-b border-black/5 ">
                    <h2 className="text-lg font-bold text-foreground  font-sans mb-3">Live Chat</h2>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users..." className="w-full bg-black/5  border border-black/5  rounded-xl py-2 pl-9 pr-3 text-sm text-slate-700  focus:outline-none" />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto p-2 space-y-1">
                    {filtered.map(conv => (
                        <div key={conv.id} onClick={() => setActiveConv(conv.id)}
                            className={`p-4 rounded-2xl cursor-pointer transition-all ${activeConv === conv.id ? 'bg-[#006970]/10 border border-[#006970]/20' : 'hover:bg-black/5 :bg-white/5'}`}>
                            <div className="flex items-start justify-between mb-1">
                                <div className="flex items-center gap-2">
                                    <div className="relative">
                                        <div className="w-8 h-8 rounded-full bg-[#006970]/20 flex items-center justify-center text-[#006970]"><User className="w-4 h-4" /></div>
                                        <Circle className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 fill-current ${conv.status === 'online' ? 'text-emerald-400' : conv.status === 'away' ? 'text-amber-400' : 'text-slate-600'}`} />
                                    </div>
                                    <span className="font-semibold text-sm text-foreground ">{conv.name}</span>
                                </div>
                                {conv.unread > 0 && <span className="text-[10px] bg-[#006970] text-foreground  font-bold px-1.5 py-0.5 rounded-full">{conv.unread}</span>}
                            </div>
                            <p className="text-xs text-slate-500 line-clamp-1">{conv.lastMessage}</p>
                            <p className="text-[10px] text-slate-600 mt-1">{conv.time}</p>
                        </div>
                    ))}
                </div>
            </aside>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
                <div className="flex items-center justify-between px-6 py-4 border-b border-black/5 ">
                    {activeConvData ? (
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-[#006970]/20 flex items-center justify-center text-[#006970]"><User className="w-5 h-5" /></div>
                            <div>
                                <p className="font-bold text-sm text-foreground ">{activeConvData.name}</p>
                                <p className="text-[10px] text-emerald-400 font-bold flex items-center gap-1"><Circle className="w-2 h-2 fill-emerald-400" /> {activeConvData.status === 'online' ? 'Online' : 'Offline'}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="text-sm text-slate-500">Select a conversation</div>
                    )}
                    <button className="p-2 hover:bg-black/5 :bg-white/5 rounded-xl transition-colors text-slate-500"><MoreVertical className="w-5 h-5" /></button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {messages.map(msg => (
                        <motion.div key={msg.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                            className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[70%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                                msg.sender === 'admin'
                                    ? 'bg-[#006970] text-foreground  rounded-br-sm'
                                    : 'glass border border-black/10  text-slate-200 rounded-bl-sm'
                            }`}>
                                <p>{msg.text}</p>
                                <p className={`text-[10px] mt-1 ${msg.sender === 'admin' ? 'text-[#b9cacb]' : 'text-slate-500'}`}>{msg.time}</p>
                            </div>
                        </motion.div>
                    ))}
                    <div ref={endRef} />
                </div>

                <div className="p-4 border-t border-black/5 ">
                    <div className="flex gap-3">
                        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()}
                            disabled={!activeConv}
                            placeholder={activeConv ? "Type a message..." : "Select a conversation first"}
                            className="flex-1 bg-black/5  border border-black/5  rounded-2xl px-5 py-3 text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-[#006970]/50 placeholder:text-slate-600 disabled:opacity-50" />
                        <button onClick={sendMessage} disabled={!activeConv || !input.trim()} className="p-3 bg-[#006970] hover:bg-[#006970] rounded-2xl text-foreground  transition-all shadow-lg shadow-indigo-600/20 disabled:opacity-50">
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

