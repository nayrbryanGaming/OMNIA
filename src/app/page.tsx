'use client';

import React, { useState } from 'react';
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
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOmniaStore, CATEGORY_MODELS } from '@/store/useOmniaStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { AppShell } from '@/components/shell/AppShell';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const CATEGORIES = [
  {
    id: 'text',
    name: 'Text & Reasoning',
    icon: <MessageSquare className="w-6 h-6" />,
    description: 'Chat, analysis, and coding assistance.',
    models: ['Gemini 2.0 Flash', 'Grok-3', 'GPT-4o', 'Llama 3.1 405B']
  },
  {
    id: 'image',
    name: 'Image Generation',
    icon: <ImageIcon className="w-6 h-6" />,
    description: 'Create stunning visuals and art.',
    models: ['Imagen 3', 'Flux.1 (Dev)', 'Stable Diffusion 3.5', 'Midjourney v6.1']
  },
  {
    id: 'audio',
    name: 'Audio & Music',
    icon: <Music className="w-6 h-6" />,
    description: 'TTS, STT, and music creation.',
    models: ['Suno v4', 'Udio v1.5', 'ElevenLabs Turbo', 'Whisper v3']
  },
  {
    id: 'video',
    name: 'Video Animation',
    icon: <Video className="w-6 h-6" />,
    description: 'Generate high-fidelity video clips.',
    models: ['Luma Dream Machine', 'Runway Gen-3 Alpha', 'Sora (Waitlist)', 'Kling AI']
  }
];

const MODES = [
  { id: 'local', name: 'Local Compute', icon: <Cpu className="w-4 h-4" />, color: 'text-green-400' },
  { id: 'cloud-free', name: 'Free Cloud (Queued)', icon: <Zap className="w-4 h-4" />, color: 'text-blue-400' },
  { id: 'cloud-premium', name: 'Premium Cloud', icon: <Sparkles className="w-4 h-4" />, color: 'text-purple-400' },
  { id: 'api', name: 'API Key (BYOK)', icon: <Shield className="w-4 h-4" />, color: 'text-amber-400' }
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
      <div className="min-h-full w-full flex flex-col items-center justify-center p-6 md:p-12 relative overflow-hidden">
        {/* Aesthetic Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[10%] left-[20%] w-[30%] h-[30%] bg-blue-500/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-[20%] right-[10%] w-[40%] h-[40%] bg-purple-500/5 rounded-full blur-[150px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-3xl z-10 flex flex-col items-center"
        >
          {/* Centered Command Bar - Gemini Style */}
          <div className="w-full mb-12 text-center space-y-4">
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40 mb-2">
              What can OMNIA do for you?
            </h1>
            <p className="text-white/20 text-xs font-black uppercase tracking-[0.4em]">Universal Intelligence Interface</p>
          </div>

          <div className="w-full relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
            <div className="relative bg-[#0A0A0B]/80 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] p-2 pr-6 flex items-center shadow-2xl transition-all hover:border-white/10">
              <div className="flex-1 px-8">
                <input
                  type="text"
                  placeholder="Ask OMNIA anything..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-transparent border-none outline-none py-6 text-xl font-medium placeholder:text-white/10 text-white"
                />
              </div>
              <button className="h-14 w-14 rounded-full bg-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all">
                <ArrowRight className="text-black" size={24} />
              </button>
            </div>
          </div>

          {/* Quick Action Categories */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
            {CATEGORIES.map((cat) => (
              <motion.button
                key={cat.id}
                whileHover={{ y: -4, backgroundColor: 'rgba(255,255,255,0.03)' }}
                onClick={() => setCategory(cat.name.split(' ')[0] as any)}
                className={cn(
                  "p-6 rounded-3xl border text-center transition-all flex flex-col items-center gap-4",
                  selectedCategory.toLowerCase() === cat.id
                    ? "bg-white/5 border-white/10"
                    : "bg-transparent border-white/5"
                )}
              >
                <div className={cn(
                  "p-3 rounded-2xl",
                  selectedCategory.toLowerCase() === cat.id ? "bg-white text-black" : "bg-white/5 text-white/40"
                )}>
                  {cat.icon}
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-white/60">{cat.name.split(' ')[0]}</span>
              </motion.button>
            ))}
          </div>

          {/* Execution & Model Strip */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/[0.02] border border-white/5 backdrop-blur-xl">
              <Cpu size={14} className="text-white/20" />
              <select
                value={executionMode}
                onChange={(e) => setMode(e.target.value as any)}
                className="bg-transparent text-sm font-bold text-white/60 uppercase tracking-widest outline-none cursor-pointer"
              >
                {MODES.map(m => (
                  <option key={m.id} value={m.id.toUpperCase().replace('-', '_')} className="bg-[#0A0A0A]">{m.name}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/[0.02] border border-white/5 backdrop-blur-xl">
              <Sparkles size={14} className="text-white/20" />
              <select
                value={selectedModel}
                onChange={(e) => setModel(e.target.value)}
                className="bg-transparent text-sm font-bold text-white/60 uppercase tracking-widest outline-none cursor-pointer"
              >
                {CATEGORY_MODELS[selectedCategory].map(m => (
                  <option key={m} value={m} className="bg-[#0A0A0A]">{m}</option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* System Breadcrumbs */}
        <div className="absolute bottom-12 flex items-center gap-10 text-[10px] font-black text-white/10 uppercase tracking-[0.4em]">
          <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" /> Node-001: Online</span>
          <span>Uptime: 99.9%</span>
          <span>Encryption: AES-4096</span>
        </div>
      </div>
    </AppShell>
  );
}
