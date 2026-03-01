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
  Cpu
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [selectedMode, setSelectedMode] = useState<string>('cloud-free');

  const currentCategory = CATEGORIES.find(c => c.id === selectedCategory);

  return (
    <div className="min-h-screen bg-[#050507] text-white flex flex-col items-center justify-center p-6 md:p-12 selection:bg-blue-500/30">
      {/* Background Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl z-10 space-y-12"
      >
        {/* Header */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-blue-400"
          >
            <Sparkles className="w-4 h-4" />
            OMNIA v2.0 Released
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
            Hello, Admin <span className="text-blue-500">nayrbryanGaming</span>
          </h1>
          <p className="text-lg text-white/40 max-w-xl mx-auto">
            Universal AI Orchestration for Sovereign Intelligence.
            Select a mode to begin execution.
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => (
            <motion.button
              key={cat.id}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedCategory(cat.id)}
              className={`p-6 rounded-2xl border transition-all text-left space-y-4 ${selectedCategory === cat.id
                  ? 'bg-white/10 border-blue-500/50 shadow-lg shadow-blue-500/10'
                  : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                }`}
            >
              <div className={`p-3 rounded-xl w-fit ${selectedCategory === cat.id ? 'bg-blue-500 text-white' : 'bg-white/5 text-white/70'}`}>
                {cat.icon}
              </div>
              <div>
                <h3 className="font-semibold text-lg">{cat.name}</h3>
                <p className="text-sm text-white/40 line-clamp-2">{cat.description}</p>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Dynamic Options Panel */}
        <AnimatePresence mode="wait">
          {selectedCategory && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md space-y-8"
            >
              <div className="flex flex-col md:flex-row gap-8">
                {/* Model Selection */}
                <div className="flex-1 space-y-4">
                  <label className="text-sm font-medium text-white/40 flex items-center gap-2">
                    <Zap className="w-4 h-4" /> Select Model
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {currentCategory?.models.map((model) => (
                      <button
                        key={model}
                        onClick={() => setSelectedModel(model)}
                        className={`px-4 py-3 rounded-xl text-sm border transition-all text-left ${selectedModel === model
                            ? 'bg-blue-500/20 border-blue-500 text-white'
                            : 'bg-white/5 border-white/10 text-white/60 hover:border-white/30'
                          }`}
                      >
                        {model}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Execution Mode */}
                <div className="flex-1 space-y-4">
                  <label className="text-sm font-medium text-white/40 flex items-center gap-2">
                    <Cpu className="w-4 h-4" /> Execution Mode
                  </label>
                  <div className="space-y-2">
                    {MODES.map((mode) => (
                      <button
                        key={mode.id}
                        onClick={() => setSelectedMode(mode.id)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all ${selectedMode === mode.id
                            ? 'bg-white/10 border-white/20 text-white'
                            : 'bg-transparent border-transparent text-white/40 hover:bg-white/5 hover:border-white/10'
                          }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={mode.color}>{mode.icon}</span>
                          <span className="text-sm font-medium">{mode.name}</span>
                        </div>
                        {selectedMode === mode.id && <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-white/30 uppercase tracking-widest font-bold">Status</p>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
                    <span className="text-blue-400 font-medium">Ready for Execution</span>
                  </div>
                </div>

                <button
                  disabled={!selectedModel}
                  className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-blue-50 bg-gradient-to-r from-white to-gray-200 disabled:opacity-50 disabled:cursor-not-allowed group transition-all transform active:scale-95"
                >
                  Start {currentCategory?.name.split(' ')[0]} Session
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer info for Admin */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-12 text-white/20 text-xs tracking-wide uppercase border-t border-white/5">
          <div className="flex items-center gap-4">
            <span>© 2026 OMNIA FOUNDATION</span>
            <span>OS INTERFACE V2.4.9</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Shield className="w-3 h-3" /> Encrypted Session
            </span>
            <span className="flex items-center gap-1.5">
              <Cpu className="w-3 h-3" /> Node Active: ID-001
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
