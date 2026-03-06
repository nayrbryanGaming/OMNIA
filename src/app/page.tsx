'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, MessageSquare, Code, Image as ImageIcon,
  BarChart3, Music, Video, FileText, ArrowRight,
  Shield, Zap, Globe, Cpu, Terminal, Database, Key
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useOmniaStore, CATEGORY_MODELS, AICategory } from '@/store/useOmniaStore';

export default function LandingPage() {
  const router = useRouter();
  const { setCategory, setModel, isAdmin } = useOmniaStore();
  const [selectedCat, setSelectedCat] = useState<AICategory>('Reasoning');

  const categories = [
    { id: 'Reasoning' as AICategory, icon: MessageSquare, label: 'Reasoning', desc: 'Advanced LLM logic & analysis', color: 'text-blue-400' },
    { id: 'Code' as AICategory, icon: Terminal, label: 'Software', desc: 'Elite programming & architecture', color: 'text-emerald-400' },
    { id: 'Image' as AICategory, icon: ImageIcon, label: 'Visuals', desc: 'High-fidelity generative art', color: 'text-purple-400' },
    { id: 'Data' as AICategory, icon: Database, label: 'Insight', desc: 'Real-time data orchestration', color: 'text-amber-400' },
    { id: 'Audio' as AICategory, icon: Music, label: 'Acoustic', desc: 'Neural audio & voice synthesis', color: 'text-red-400' },
    { id: 'Video' as AICategory, icon: Video, label: 'Motion', desc: 'Generative video sequences', color: 'text-indigo-400' },
    { id: 'File' as AICategory, icon: FileText, label: 'Knowledge', desc: 'Deep document ingestion', color: 'text-sky-400' },
  ];

  const handleLaunch = (cat: AICategory, model: string) => {
    setCategory(cat);
    setModel(model);
    if (isAdmin) {
      router.push('/chat');
    } else {
      router.push('/login');
    }
  };

  return (
    <div className="min-h-screen bg-[#020203] text-[#F5F5F7] selection:bg-blue-500/30 font-sans overflow-x-hidden">
      {/* Background Atmosphere */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-600/10 rounded-full blur-[180px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/5 rounded-full blur-[160px] animate-pulse" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50 mix-blend-overlay" />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => router.push('/')}>
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-2xl transition-transform group-hover:rotate-[10deg]">
            <span className="text-black font-black text-xl">Ω</span>
          </div>
          <span className="font-bold text-2xl tracking-tighter">OMNIA</span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push(isAdmin ? '/chat' : '/login')}
            className="bg-white text-black px-6 py-2.5 rounded-full font-bold text-[10px] uppercase tracking-widest hover:bg-gray-200 transition-all active:scale-95 shadow-xl shadow-white/10"
          >
            {isAdmin ? 'Dashboard' : 'Initialize Session'}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 pt-20 pb-40 px-6 max-w-7xl mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8">
            <Sparkles size={14} className="text-blue-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400/80">The 2026 AI Operating System</span>
          </div>
          <h1 className="text-6xl md:text-[5rem] font-bold tracking-tightest leading-tight mb-8">
            How can <span className="text-gradient">OMNIA</span> help today?
          </h1>
        </motion.div>

        {/* Categorical Engine Selector */}
        <div className="w-full max-w-4xl space-y-12">
          {/* Direct Category Icons */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(cat.id)}
                className={cn(
                  "flex flex-col items-center gap-3 p-6 rounded-[2rem] transition-all min-w-[120px] group border",
                  selectedCat === cat.id
                    ? "bg-white/10 border-white/20 shadow-2xl scale-110"
                    : "bg-white/[0.02] border-white/5 hover:bg-white/5"
                )}
              >
                <cat.icon size={24} className={cn("transition-colors", selectedCat === cat.id ? cat.color : "text-white/20 group-hover:text-white/40")} />
                <span className={cn("text-[10px] font-black uppercase tracking-widest", selectedCat === cat.id ? "text-white" : "text-white/20")}>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Model Preview & Launch */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCat}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="glass-premium rounded-[3rem] p-10 flex flex-col items-center border border-white/10 shadow-3xl"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                {CATEGORY_MODELS[selectedCat].map((model) => (
                  <div
                    key={model}
                    onClick={() => handleLaunch(selectedCat, model)}
                    className="group p-6 rounded-3xl bg-white/[0.03] border border-white/5 hover:border-white/20 transition-all cursor-pointer flex flex-col gap-4 active:scale-95"
                  >
                    <div className="flex justify-between items-start">
                      <div className="p-2 rounded-xl bg-white/5 text-white/40 group-hover:text-white transition-colors">
                        <Zap size={16} />
                      </div>
                      <div className="px-2 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-400 text-[8px] font-black uppercase tracking-widest">Active Node</div>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg leading-tight mb-1 group-hover:text-blue-400 transition-colors">{model}</h4>
                      <p className="text-[10px] text-white/20 font-medium uppercase tracking-widest">Latency: 0.1ms // 128k Context</p>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-white/0 group-hover:text-white transition-all text-[9px] font-black uppercase tracking-widest translate-x-[-10px] group-hover:translate-x-0">
                      Launch Instance <ArrowRight size={12} />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Global Stats Meta */}
        <div className="mt-32 flex gap-12 text-[10px] font-black text-white/10 uppercase tracking-[0.4em]">
          <div className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-emerald-500" /> S0-West: Operational</div>
          <div className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-emerald-500" /> S1-East: Operational</div>
          <div className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-blue-500" /> Vercel-Edge: Connected</div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-8 border-t border-white/5 bg-black/40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-[9px] font-black text-white/10 uppercase tracking-[0.2em]">
          <div className="flex items-center gap-2">OMNIA PLATFORM // 2026.15.42</div>
          <div className="flex gap-10">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
