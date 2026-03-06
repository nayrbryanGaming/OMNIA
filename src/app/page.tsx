'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare, Image as ImageIcon, Music, Video, Sparkles, ChevronRight, Shield, Zap, Cpu, ArrowRight, Database, FileText, Globe, Terminal, Square
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOmniaStore, CATEGORY_MODELS, AICategory } from '@/store/useOmniaStore';
import { useRouter } from 'next/navigation';
import { AppShell } from '@/components/shell/AppShell';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const CATEGORIES: { id: AICategory, name: string, icon: React.ReactNode, hint: string }[] = [
  { id: 'Reasoning', name: 'Reasoning', icon: <MessageSquare size={16} />, hint: "Logic and analytical chat" },
  { id: 'Code', name: 'Code', icon: <Terminal size={16} />, hint: "Programming and debugging" },
  { id: 'Image', name: 'Image', icon: <ImageIcon size={16} />, hint: "Generative visual art" },
  { id: 'Video', name: 'Video', icon: <Video size={16} />, hint: "High-fidelity clips" },
  { id: 'Audio', name: 'Audio', icon: <Music size={16} />, hint: "TTS and music synthesis" },
  { id: 'Data', name: 'Data', icon: <Database size={16} />, hint: "Complex analysis" },
  { id: 'File', name: 'File', icon: <FileText size={16} />, hint: "Knowledge ingestion" }
];

const MODES = [
  { id: 'LOCAL', name: 'Sovereign Engine', detail: 'Local GPU (0ms)', icon: <Cpu size={14} />, color: 'emerald' },
  { id: 'FREE_CLOUD', name: 'Public Cloud', detail: 'Queued (Pooled)', icon: <Globe size={14} />, color: 'blue' },
  { id: 'PREMIUM', name: 'Priority Core', detail: 'Low Latency', icon: <Sparkles size={14} />, color: 'purple' },
  { id: 'API_KEY', name: 'API Bypass', detail: 'Direct Access', icon: <Key size={14} />, color: 'amber' }
];

export default function Home() {
  const { isAdmin, selectedCategory, setCategory, selectedModel, setModel, executionMode, setMode } = useOmniaStore();
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!isAdmin) router.push('/login');
  }, [isAdmin, router]);

  if (!isAdmin) return null;

  return (
    <AppShell>
      <div className="relative min-h-[calc(100vh-64px)] w-full flex flex-col items-center justify-center p-4 md:p-12 overflow-hidden selection:bg-blue-500/30">

        {/* Cinematic Background */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] right-[10%] w-[60%] h-[60%] bg-blue-600/10 rounded-full blur-[200px] animate-pulse-soft" />
          <div className="absolute bottom-[-10%] left-[10%] w-[50%] h-[50%] bg-purple-600/5 rounded-full blur-[180px] animate-pulse-soft" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50 contrast-150 mix-blend-overlay" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-5xl z-10 flex flex-col items-center"
        >
          {/* Hero Section */}
          <div className="w-full mb-12 text-center flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-16 h-16 rounded-3xl glass-premium flex items-center justify-center mb-8 shadow-2xl relative group cursor-pointer"
            >
              <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-700" />
              <span className="text-white font-black text-2xl relative z-10">Ω</span>
            </motion.div>

            <h1 className="text-5xl md:text-[4.5rem] font-bold tracking-tight text-white mb-6 drop-shadow-2xl text-gradient leading-[1.1]">
              Orchestrate Intelligence
            </h1>
            <p className="text-white/40 text-sm font-bold uppercase tracking-[0.4em] mb-4">Core V1.0 - Sovereign Protocol</p>
          </div>

          {/* Unified Command Center */}
          <div className={cn(
            "w-full relative transition-all duration-700 ease-[0.16, 1, 0.3, 1]",
            isFocused ? "scale-[1.02]" : "scale-100"
          )}>
            <div className={cn(
              "absolute -inset-0.5 bg-gradient-to-r from-blue-600/20 via-white/10 to-purple-600/20 rounded-[2.5rem] blur-2xl transition-opacity duration-1000",
              isFocused ? "opacity-100" : "opacity-0"
            )} />

            <div className={cn(
              "relative glass-premium rounded-[2.5rem] p-4 flex flex-col transition-all duration-500",
              isFocused ? "border-white/20 ring-1 ring-white/10" : "border-white/5"
            )}>

              <textarea
                ref={textareaRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={"What will you deploy today?"}
                style={{ resize: 'none' }}
                className="w-full bg-transparent border-none outline-none min-h-[160px] text-xl md:text-2xl font-medium placeholder:text-white/10 text-white p-6 focus:ring-0 selection:bg-white/20 transition-all"
              />

              {/* Functional Dashboard Row */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-4 pb-4 pt-4 border-t border-white/[0.04]">

                {/* Horizontal Category Scroll */}
                <div className="flex items-center gap-2 overflow-x-auto pb-4 md:pb-0 no-scrollbar max-w-full md:max-w-[80%] px-1">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setCategory(cat.id)}
                      title={cat.hint}
                      className={cn(
                        "flex items-center gap-2.5 px-5 py-3 rounded-2xl text-[13px] font-bold tracking-tight whitespace-nowrap transition-all duration-300 transform active:scale-95 group",
                        selectedCategory === cat.id
                          ? "bg-white text-black shadow-2xl scale-105"
                          : "bg-white/[0.03] text-white/40 border border-white/5 hover:bg-white/5 hover:text-white hover:border-white/20"
                      )}
                    >
                      <span className={cn(selectedCategory === cat.id ? "text-black" : "text-white/20 group-hover:text-white/60")}>{cat.icon}</span>
                      {cat.name}
                    </button>
                  ))}
                </div>

                {/* Execution Trigger */}
                <div className="flex items-center gap-4 self-end md:self-auto">
                  <div className="hidden lg:flex flex-col items-end mr-2">
                    <span className="text-[9px] font-black text-white/10 uppercase tracking-widest leading-none mb-1">Context Window</span>
                    <span className="text-[10px] font-mono text-white/20 leading-none">128K Ready</span>
                  </div>
                  <button
                    disabled={!query.trim()}
                    className="h-14 w-14 rounded-[1.5rem] bg-white text-black flex items-center justify-center shadow-2xl hover:bg-blue-50 hover:scale-105 active:scale-90 transition-all duration-300 disabled:opacity-10 disabled:grayscale"
                  >
                    <ArrowRight size={22} strokeWidth={3} />
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Runtime Orchestration Settings */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            {/* Configuration Pill */}
            <div className="flex items-center gap-4 px-6 py-4 rounded-3xl glass border-white/5 shadow-2xl">

              {/* Model Picker */}
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-white/5 text-white/20"><Zap size={14} /></div>
                <select
                  value={selectedModel}
                  onChange={(e) => setModel(e.target.value)}
                  className="appearance-none bg-transparent text-xs font-black uppercase tracking-[0.2em] text-white outline-none cursor-pointer pr-4"
                >
                  {CATEGORY_MODELS[selectedCategory]?.map((m) => (
                    <option key={m} value={m} className="bg-[#0A0A0B] text-white">{m}</option>
                  ))}
                </select>
              </div>

              <div className="w-px h-4 bg-white/10" />

              {/* Mode Picker */}
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-white/5 text-white/20"><Shield size={14} /></div>
                <select
                  value={executionMode}
                  onChange={(e) => setMode(e.target.value as any)}
                  className="appearance-none bg-transparent text-xs font-black uppercase tracking-[0.2em] text-white outline-none cursor-pointer pr-4"
                >
                  {MODES.map((m) => (
                    <option key={m.id} value={m.id} className="bg-[#0A0A0B] text-white">{m.name} ({m.color})</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* System Telemetry Metadata */}
          <div className="mt-20 flex flex-wrap items-center justify-center gap-x-12 gap-y-4 opacity-20 pointer-events-none">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">Node-001: Operational</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">Engine: 8.4.1.v26</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">Status: Sovereign-Verified</span>
            </div>
          </div>

        </motion.div>
      </div>
    </AppShell>
  );
}
