'use client';

import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  Image as ImageIcon,
  Music,
  Video,
  Sparkles,
  ChevronRight,
  Shield,
  Zap,
  Cpu,
  ArrowRight,
  Database,
  FileText
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useOmniaStore, CATEGORY_MODELS, AICategory } from '@/store/useOmniaStore';
import { useRouter } from 'next/navigation';
import { AppShell } from '@/components/shell/AppShell';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const CATEGORIES: { id: AICategory, name: string, icon: React.ReactNode }[] = [
  { id: 'Reasoning', name: 'Reasoning', icon: <MessageSquare className="w-4 h-4" /> },
  { id: 'Code', name: 'Code', icon: <Cpu className="w-4 h-4" /> },
  { id: 'Image', name: 'Image', icon: <ImageIcon className="w-4 h-4" /> },
  { id: 'Video', name: 'Video', icon: <Video className="w-4 h-4" /> },
  { id: 'Audio', name: 'Audio', icon: <Music className="w-4 h-4" /> },
  { id: 'Data', name: 'Data', icon: <Database className="w-4 h-4" /> },
  { id: 'File', name: 'Documents', icon: <FileText className="w-4 h-4" /> }
];

const MODES = [
  { id: 'LOCAL', name: 'Local Compute (0ms)', icon: <Cpu className="w-4 h-4" /> },
  { id: 'FREE_CLOUD', name: 'Free Cloud (Queue)', icon: <Zap className="w-4 h-4" /> },
  { id: 'PREMIUM', name: 'Premium Cloud', icon: <Sparkles className="w-4 h-4" /> },
  { id: 'API_KEY', name: 'Your API Key', icon: <Shield className="w-4 h-4" /> }
];

export default function Home() {
  const { isAdmin, selectedCategory, setCategory, selectedModel, setModel, executionMode, setMode } = useOmniaStore();
  const router = useRouter();
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!isAdmin) {
      router.push('/login');
    }
  }, [isAdmin, router]);

  if (!isAdmin) return null;

  return (
    <AppShell>
      <div className="min-h-[calc(100vh-theme(spacing.16))] w-full flex flex-col items-center justify-center p-4 md:p-8 relative selection:bg-white/20">

        {/* Subtle Background Elements */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center">
          <div className="w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[120px] absolute mix-blend-screen" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-4xl z-10 flex flex-col items-center"
        >
          {/* Main Greeting */}
          <div className="w-full mb-10 text-center">
            <h1 className="text-4xl md:text-[3.5rem] font-medium tracking-tight text-white mb-4 drop-shadow-md">
              How can I help you today?
            </h1>
            <p className="text-[#ECECEC]/60 text-sm font-medium tracking-wide">Enter a prompt or choose an AI capability block below.</p>
          </div>

          {/* The Prompt Block (Gemini/Grok Style) */}
          <div className="w-full relative group mb-8">
            <div className="absolute -inset-0.5 bg-gradient-to-br from-white/10 to-transparent rounded-3xl blur-md opacity-0 group-focus-within:opacity-100 transition duration-700 pointer-events-none" />
            <div className="relative bg-[#0F0F12]/80 backdrop-blur-3xl border border-white/[0.08] hover:border-white/[0.15] rounded-[2rem] p-3 flex flex-col shadow-2xl transition-all duration-300 group-focus-within:border-white/30 group-focus-within:bg-[#0F0F12]">

              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={"Ask OMNIA anything..."}
                style={{ resize: 'none' }}
                className="w-full bg-transparent border-none outline-none min-h-[140px] text-lg font-normal placeholder:text-white/20 text-white p-4 focus:ring-0"
              />

              {/* Action Bar Inside Input Block */}
              <div className="flex flex-col md:flex-row md:items-center justify-between mt-2 pt-2 gap-4 border-t border-white/[0.04]">

                {/* Capabilities / Categories List */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 no-scrollbar max-w-full md:max-w-[85%] px-1">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setCategory(cat.id)}
                      className={cn(
                        "flex items-center gap-2 px-3 py-2 rounded-xl text-[13px] font-medium whitespace-nowrap transition-all duration-200",
                        selectedCategory === cat.id
                          ? "bg-white text-black shadow-md scale-[1.02]"
                          : "bg-transparent text-white/50 hover:bg-white/5 hover:text-white/80"
                      )}
                    >
                      <span className={cn(selectedCategory === cat.id ? "opacity-100" : "opacity-70")}>{cat.icon}</span>
                      {cat.name}
                    </button>
                  ))}
                </div>

                {/* Submit button */}
                <button
                  disabled={!query.trim()}
                  className="h-10 w-10 shrink-0 self-end md:self-auto rounded-full bg-white flex items-center justify-center shadow-md hover:bg-gray-200 transition-all disabled:opacity-20 disabled:hover:bg-white"
                >
                  <ArrowRight className="text-black" size={18} />
                </button>
              </div>

            </div>
          </div>

          {/* Model & Runtime Settings (Below the Input Block) */}
          <div className="w-full flex flex-wrap items-center justify-center gap-3">
            <div className="flex items-center gap-3 text-white/40 text-xs font-semibold mr-2 uppercase tracking-wider">
              Deploying to
            </div>

            {/* Model Selector */}
            <div className="relative group">
              <select
                value={selectedModel}
                onChange={(e) => setModel(e.target.value)}
                className="appearance-none bg-[#141417] border border-white-[0.05] shadow-sm rounded-xl px-4 py-2.5 pr-10 text-sm font-medium text-white/90 hover:border-white/20 transition-all outline-none cursor-pointer"
              >
                {CATEGORY_MODELS[selectedCategory]?.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-white/40 pointer-events-none w-4 h-4" />
            </div>

            <div className="text-white/20 text-xs">via</div>

            {/* Mode Selector */}
            <div className="relative group">
              <select
                value={executionMode}
                onChange={(e) => setMode(e.target.value as any)}
                className="appearance-none bg-[#141417] border border-white-[0.05] shadow-sm rounded-xl px-4 py-2.5 pr-10 text-sm font-medium text-white/90 hover:border-white/20 transition-all outline-none cursor-pointer"
              >
                {MODES.map((m) => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </select>
              <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-white/40 pointer-events-none w-4 h-4" />
            </div>
          </div>

        </motion.div>
      </div>
    </AppShell>
  );
}
