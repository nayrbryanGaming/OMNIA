'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOmniaStore } from '@/store/useOmniaStore';
import { AppShell } from '@/components/shell/AppShell';
import { ArrowRight, Bot, User, Sparkles, StopCircle, RefreshCw, Paperclip } from 'lucide-react';
import { aiOrchestrator } from '@/lib/orchestrator';
import { AIRequest, AIResponse } from '@/types';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  isStreaming?: boolean;
}

export default function ChatWorkspace() {
  const { selectedModel, executionMode, isAdmin } = useOmniaStore();
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: 'Omnia Core Neural Net Online. How can I assist you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async () => {
    if (!input.trim() || isGenerating) return;

    const userMsg: Message = { id: crypto.randomUUID(), role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsGenerating(true);

    const assistantId = crypto.randomUUID();
    setMessages(prev => [...prev, { id: assistantId, role: 'assistant', content: '', isStreaming: true }]);

    try {
      // Build the AIRequest
      const req: AIRequest = {
        id: crypto.randomUUID(),
        timestamp: Date.now(),
        model: selectedModel || 'Default-Model',
        mode: executionMode,
        messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content }))
      };

      const response = await aiOrchestrator.execute(req);

      setMessages(prev => prev.map(m =>
        m.id === assistantId ? { ...m, content: response.content, isStreaming: false } : m
      ));

    } catch (error: any) {
      setMessages(prev => prev.map(m =>
        m.id === assistantId ? { ...m, content: `[SYSTEM ERROR] ${error.message}`, isStreaming: false } : m
      ));
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <AppShell>
      <div className="flex flex-col h-[calc(100vh-64px)] w-full bg-[#030304] relative">

        {/* Cinematic Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-[20%] right-[15%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[150px] animate-pulse-soft" />
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto w-full max-w-4xl mx-auto px-4 py-8 space-y-8 z-10 no-scrollbar pb-32">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-lg ${msg.role === 'user' ? 'bg-white text-black' : 'glass border border-white/10 text-white'}`}>
                  {msg.role === 'user' ? <User size={14} strokeWidth={2.5} /> : <span className="font-black text-xs">Ω</span>}
                </div>
                <div className={`max-w-[80%] rounded-2xl px-5 py-3.5 text-[15px] leading-relaxed tracking-wide ${msg.role === 'user'
                    ? 'bg-white/10 text-white font-medium border border-white/5'
                    : 'bg-transparent text-[#ECECEC]/90'
                  }`}>
                  {msg.isStreaming ? (
                    <div className="flex items-center gap-2 h-6">
                      <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  ) : (
                    msg.content
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#030304] via-[#030304] to-transparent pt-10 pb-6 px-4 z-20">
          <div className="max-w-4xl mx-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/10 via-white/5 to-purple-600/10 rounded-3xl blur-xl opacity-0 hover:opacity-100 transition duration-700" />
            <div className="relative glass-premium border border-white/10 rounded-3xl p-2 flex items-end shadow-2xl transition-all focus-within:border-white/20 focus-within:bg-[#08080A]">

              <button className="p-3 text-white/30 hover:text-white/80 transition-colors shrink-0 mb-1">
                <Paperclip size={18} />
              </button>

              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
                placeholder="Message OMNIA..."
                className="w-full bg-transparent border-none appearance-none outline-none resize-none max-h-48 min-h-[44px] py-3 text-[15px] text-white placeholder:text-white/20 focus:ring-0"
                rows={Math.min(5, Math.max(1, input.split('\n').length))}
              />

              {isGenerating ? (
                <button className="h-10 w-10 shrink-0 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center mb-1 mr-1 hover:bg-red-500/30 transition-colors">
                  <StopCircle size={18} />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!input.trim()}
                  className="h-10 w-10 shrink-0 bg-white text-black rounded-full flex items-center justify-center mb-1 mr-1 shadow-lg hover:scale-105 active:scale-95 transition-all disabled:opacity-20 disabled:grayscale disabled:hover:scale-100"
                >
                  <ArrowRight size={18} strokeWidth={2.5} />
                </button>
              )}
            </div>
            <div className="text-center mt-3">
              <span className="text-[10px] text-white/20 font-medium">OMNIA can make mistakes. Consider verifying important information.</span>
            </div>
          </div>
        </div>

      </div>
    </AppShell>
  );
}
