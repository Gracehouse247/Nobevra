'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Loader2, Sparkles, X, Info, Send, Keyboard } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useCurrency } from '@/context/CurrencyContext';
import { invoiceService, clientService, teamService } from '@/lib/services/supabaseService';
import { toast } from 'react-hot-toast';
import { supabase } from '@/lib/supabase';
import NeuralWaveform from '@/components/shared/NeuralWaveform';
import { useEntitlements } from '@/context/EntitlementsContext';
import { useUpgradeModal } from '@/context/UpgradeModalContext';
import PremiumBadge from '@/components/shared/PremiumBadge';
export default function FloatingVoiceAssistant() {
    const { user } = useAuth();
    const { currencyCode } = useCurrency();
    const { canUse } = useEntitlements();
    const { openUpgradeModal } = useUpgradeModal();
    const router = useRouter();
    
    const [isOpen, setIsOpen] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [showPermissionModal, setShowPermissionModal] = useState(false);
    
    // Fallback and Chat History States
    const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'model'; content: string }[]>([]);
    const [textInput, setTextInput] = useState('');
    const [isSpeechSupported, setIsSpeechSupported] = useState(true);
    
    const recognitionRef = useRef<any>(null);
    const transcriptRef = useRef<string>('');
    const chatEndRef = useRef<HTMLDivElement>(null);

    // Detect speech recognition support on mount
    useEffect(() => {
        const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
        setIsSpeechSupported(!!SpeechRecognition);
    }, []);

    // Auto-scroll chat history
    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chatHistory]);

    const stopListening = useCallback(() => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }
        setIsListening(false);
    }, []);

    const processIntent = async (text: string) => {
        if (!text.trim() || !user) return;
        
        setIsProcessing(true);
        setTranscript(text);
        
        try {
            // Fetch clients for context
            const { data: clients } = await supabase
                .from('clients')
                .select('id, name, email')
                .eq('user_id', user.id)
                .limit(20);
                
            const userContext = {
                clients: clients || []
            };

            // Get session token for edge function
            const { data: { session } } = await supabase.auth.getSession();
            const token = session?.access_token;
            
            if (!token) throw new Error("Authentication required");

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/ai-assistant`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                        'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
                    },
                    body: JSON.stringify({ message: text, chatHistory, userContext }),
                }
            );

            if (!response.ok) {
                const errResult = await response.json().catch(() => ({}));
                throw new Error(errResult.error || 'Failed to process command');
            }

            const result = await response.json();
            
            // Speak the reply if supported
            if (result.reply) {
                speak(result.reply);
                setChatHistory(prev => [
                    ...prev,
                    { role: 'user', content: text },
                    { role: 'model', content: result.reply }
                ]);
            }
            
            setTextInput('');
            
            // Check intent and execute actions
            if (result.intent === 'CREATE_INVOICE' || result.intent === 'CREATE_PROPOSAL') {
                toast.success('AI parsed invoice correctly. Creating draft...');
                
                const invoiceData = result.data?.invoice || {};
                const clientData = result.data?.client || {};
                
                // 1. Fetch Team Profile for Bank Details / Currency / Signature
                let teamId = user.id;
                try {
                    const tData = await teamService.getTeamByUserId(user.id);
                    if (tData) {
                        const td = tData as any;
                        teamId = td.id || user.id;
                        invoiceData.currency_code = invoiceData.currency_code || td.preferred_currency || currencyCode;
                        invoiceData.metadata = {
                            bank_name: td.bank_name || null,
                            account_name: td.account_name || null,
                            account_number: td.account_number || null,
                            signature_url: td.brand_signature_url || null
                        };
                    }
                } catch (e) {
                    console.warn("Failed to fetch team data", e);
                }

                // 2. Resolve Client
                let finalClientId = null;
                if (clientData.client_id) {
                    finalClientId = clientData.client_id;
                } else if (clientData.name) {
                    // Create a new client automatically
                    toast.success(`Creating new client: ${clientData.name}...`, { id: 'ai-client' });
                    try {
                        const newClient = await clientService.createClient({
                            name: clientData.name,
                            email: clientData.email || '',
                            company: clientData.company || '',
                            address: clientData.address || '',
                            team_id: teamId,
                            user_id: user.id,
                            lead_status: 'active'
                        });
                        if (newClient) {
                            finalClientId = newClient.id;
                            toast.success(`Client ${clientData.name} created!`, { id: 'ai-client' });
                        }
                    } catch (e) {
                        console.error("Failed to create client", e);
                        toast.error(`Failed to create client ${clientData.name}`, { id: 'ai-client' });
                    }
                }

                // 3. Prepare final invoice payload
                invoiceData.user_id = user.id;
                invoiceData.team_id = teamId;
                invoiceData.client_id = finalClientId;
                invoiceData.status = 'draft';
                invoiceData.invoice_type = result.intent === 'CREATE_PROPOSAL' ? 'estimate' : 'standard';
                invoiceData.invoice_number = `INV-${Date.now().toString().slice(-8)}`;
                
                const newInvoice = await invoiceService.createInvoice(invoiceData);
                toast.success('Invoice created successfully!');
                
                // Redirect user to edit their new invoice
                router.push(`/invoices/${newInvoice.invoice_id}`);
                setIsOpen(false);
                setTranscript('');
                transcriptRef.current = '';
            } else if (result.intent === 'NAVIGATE') {
                if (result.data?.path) {
                    router.push(result.data.path);
                    setIsOpen(false);
                }
                toast.success(result.reply || `Navigating to ${result.data?.path}`);
            } else {
                // Conversational or unsupported fallback
                toast.success(result.reply || "Command understood, but no action required.");
            }
        } catch (error: any) {
            console.error('AI Voice Error:', error);
            toast.error(error.message || 'Failed to communicate with AI Assistant');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleMicPermission = async () => {
        try {
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                toast.error('Your browser does not support microphone access.');
                return false;
            }
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            stream.getTracks().forEach(track => track.stop());
            return true;
        } catch (err: any) {
            console.error('Mic permission denied:', err);
            if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
                toast.error('Microphone access blocked. Please click the lock icon 🔒 next to your URL bar, allow Microphone, and try again.', { duration: 8000 });
            } else {
                toast.error('Microphone access error: ' + err.message);
            }
            return false;
        }
    };

    const speak = (text: string) => {
        if (!('speechSynthesis' in window)) return;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        
        const voices = window.speechSynthesis.getVoices();
        const preferred = voices.find(v => v.lang === 'en-US' && v.localService);
        if (preferred) utterance.voice = preferred;
        
        window.speechSynthesis.speak(utterance);
    };

    const startRecognition = () => {
        const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
        if (!SpeechRecognition) {
            toast.error('Voice recognition is not supported in this browser. Please use the text input below.');
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
            setIsListening(true);
            setTranscript('');
        };

        recognition.onresult = (event: any) => {
            let finalTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript + ' ';
                }
            }
            if (finalTranscript) {
                setTranscript(finalTranscript);
                transcriptRef.current = finalTranscript;
            }
        };

        recognition.onerror = (event: any) => {
            console.error('Speech recognition error:', event.error);
            
            if (event.error === 'not-allowed') {
                toast.error('Microphone access denied. Please allow microphone permissions in your browser settings.');
            } else if (event.error === 'no-speech') {
                toast.error('No speech detected. Please try again.');
            } else {
                toast.error(`Voice recognition error: ${event.error}`);
            }
            setIsListening(false);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognitionRef.current = recognition;
        
        try {
            recognition.start();
        } catch (error: any) {
            console.error('Failed to start speech recognition:', error);
            if (error.name === 'NotAllowedError') {
                 toast.error('Microphone access denied. Please check your browser settings.');
            } else {
                 toast.error('Failed to start the microphone. Please try again.');
            }
            setIsListening(false);
        }
    };

    const checkAndStartListening = async () => {
        if (isListening) {
            stopListening();
            return;
        }
        
        if (typeof window === 'undefined') return;

        try {
            const permStatus = await navigator.permissions.query({ name: 'microphone' as PermissionName });
            if (permStatus.state === 'granted') {
                startRecognition();
            } else if (permStatus.state === 'prompt') {
                setShowPermissionModal(true);
            } else {
                toast.error('Microphone access is blocked. Please allow it in your browser settings.');
            }
        } catch (e) {
            // Fallback for browsers that don't support permissions API for microphone
            setShowPermissionModal(true);
        }
    };

    const proceedWithPermission = async () => {
        setShowPermissionModal(false);
        const granted = await handleMicPermission();
        if (granted) {
            startRecognition();
        }
    };

    // Auto-process if listening stops and we have transcript
    useEffect(() => {
        if (!isListening && transcriptRef.current && !isProcessing) {
            processIntent(transcriptRef.current);
            transcriptRef.current = '';
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isListening]);

    if (!user) return null;

    return (
        <div className="fixed bottom-24 right-6 z-50 flex flex-col items-end gap-4">
            <AnimatePresence>
                {showPermissionModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-slate-800 border border-white/10 p-6 rounded-2xl shadow-2xl max-w-sm w-full mx-4"
                        >
                            <div className="w-12 h-12 bg-noble-blue/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                                <Mic className="w-6 h-6 text-noble-blue" />
                            </div>
                            <h3 className="text-white text-lg font-bold text-center mb-2">Allow Microphone Access</h3>
                            <p className="text-slate-300 text-sm text-center mb-6">
                                NobleInvoice AI needs your microphone to listen to your voice commands and create invoices automatically.
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowPermissionModal(false)}
                                    className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-xl transition-colors text-sm font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={proceedWithPermission}
                                    className="flex-1 px-4 py-2 bg-noble-blue hover:bg-blue-600 text-white rounded-xl transition-colors text-sm font-medium shadow-lg shadow-noble-blue/30"
                                >
                                    Allow Access
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="w-[330px] bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-[28px] shadow-2xl overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-5 border-b border-white/10 flex justify-between items-center bg-gradient-to-r from-noble-blue/20 to-transparent">
                            <div className="flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-electric-cyan" />
                                <h3 className="text-sm font-semibold text-white">NobleInvoice Assistant</h3>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Conversational Chat History */}
                        {chatHistory.length > 0 && (
                            <div className="max-h-[160px] overflow-y-auto px-4 py-3 space-y-3 scrollbar-thin border-b border-white/5 bg-black/15 flex-shrink-0">
                                {chatHistory.map((msg, index) => (
                                    <div key={index} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                                        <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">
                                            {msg.role === 'user' ? 'You' : 'Assistant'}
                                        </span>
                                        <div className={`max-w-[85%] rounded-2xl px-3 py-1.5 text-xs ${
                                            msg.role === 'user' 
                                                ? 'bg-noble-blue text-white rounded-tr-none' 
                                                : 'bg-slate-800 text-slate-200 rounded-tl-none border border-white/5'
                                        }`}>
                                            {msg.content}
                                        </div>
                                    </div>
                                ))}
                                <div ref={chatEndRef} />
                            </div>
                        )}

                        {/* Speech Control & Waveform Area */}
                        <div className="p-6 text-center space-y-4 flex-1">
                            {isSpeechSupported ? (
                                <div className="relative inline-flex items-center justify-center">
                                    {isListening && (
                                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-50 scale-150">
                                            <NeuralWaveform isListening={true} color="#38bdf8" />
                                        </div>
                                    )}
                                    <button
                                        onClick={checkAndStartListening}
                                        disabled={isProcessing}
                                        className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center transition-all ${
                                            isListening 
                                                ? 'bg-gradient-to-br from-noble-blue to-blue-500 shadow-[0_0_30px_rgba(22,111,187,0.5)]' 
                                                : isProcessing
                                                    ? 'bg-slate-800 border border-slate-700'
                                                    : 'bg-white text-slate-900 hover:scale-105 shadow-xl'
                                        }`}
                                    >
                                        {isProcessing ? (
                                            <Loader2 className="w-8 h-8 text-noble-blue animate-spin" />
                                        ) : isListening ? (
                                            <Mic className="w-8 h-8 text-white" />
                                        ) : (
                                            <Mic className="w-8 h-8 text-slate-900" />
                                        )}
                                    </button>
                                </div>
                            ) : (
                                <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex gap-2 items-start text-left">
                                    <Info className="w-4.5 h-4.5 text-amber-400 shrink-0 mt-0.5" />
                                    <p className="text-[10px] text-amber-200 font-bold uppercase tracking-wider leading-relaxed">
                                        Voice commands are disabled in Firefox/Safari. Please type below instead.
                                    </p>
                                </div>
                            )}
                            
                            <div className="h-16 flex flex-col justify-center items-center">
                                {isProcessing ? (
                                    <p className="text-xs font-bold text-noble-blue uppercase tracking-widest animate-pulse">
                                        Processing Request...
                                    </p>
                                ) : isListening ? (
                                    <p className="text-xs text-white font-medium italic">
                                        "{transcript || 'Listening...'}"
                                    </p>
                                ) : (
                                    <div className="space-y-1">
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                                            {isSpeechSupported ? 'Tap microphone to speak or type below' : 'Type a command below'}
                                        </p>
                                        <p className="text-[9px] text-slate-500 font-semibold uppercase tracking-wider">
                                            e.g., "Create an invoice for Acme Corp for $500"
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Combined Chat/Text Input Fallback */}
                        <form 
                            onSubmit={(e) => {
                                e.preventDefault();
                                if (textInput.trim() && !isProcessing) {
                                    processIntent(textInput);
                                }
                            }}
                            className="p-4 border-t border-white/10 bg-slate-950/40 flex gap-2 flex-shrink-0"
                        >
                            <input 
                                type="text" 
                                value={textInput} 
                                onChange={(e) => setTextInput(e.target.value)} 
                                placeholder="Type a command..." 
                                disabled={isProcessing}
                                className="flex-1 bg-slate-800 text-white placeholder-slate-500 border border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-noble-blue focus:ring-1 focus:ring-noble-blue disabled:opacity-50"
                            />
                            <button 
                                type="submit" 
                                disabled={isProcessing || !textInput.trim()} 
                                className="bg-noble-blue text-white rounded-xl p-2.5 hover:bg-blue-600 transition-colors disabled:opacity-40 disabled:hover:bg-noble-blue"
                            >
                                <Send className="w-3.5 h-3.5" />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {!isOpen && (
                <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                        if (!canUse('ai.voice')) {
                            openUpgradeModal({ featureName: 'AI Voice Assistant', requiredPlan: 'pulse' });
                            return;
                        }
                        setIsOpen(true);
                    }}
                    className="h-auto px-5 py-3 bg-noble-blue rounded-2xl shadow-[0_10px_30px_rgba(22,111,187,0.4)] flex flex-col items-center gap-1.5 relative overflow-hidden group border border-white/20"
                >
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
                    <div className="flex flex-col items-center justify-center gap-1">
                        <Sparkles className="w-5 h-5 text-white" />
                        <span className="text-white font-medium text-[10px] leading-tight text-center whitespace-nowrap flex items-center gap-1">
                            NobleInvoice AI
                            {!canUse('dashboard.insights') && <PremiumBadge tier="pulse" iconOnly />}
                        </span>
                    </div>
                </motion.button>
            )}
        </div>
    );
}
