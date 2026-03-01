'use client';
import React, { useState, useEffect } from 'react';
import { useOmniaStore, CATEGORY_MODELS, AICategory } from '@/store/useOmniaStore';
import {
    Menu, X, Sparkles, Cpu, Cloud, Zap, Key,
    LayoutGrid, MessageSquare, Code, Image,
    BarChart3, Settings, ShieldCheck, Music,
    Video, FileText, ChevronRight, User
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion, AnimatePresence } from 'framer-motion';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { executionMode, setMode, selectedCategory, setCategory, selectedModel, setModel, isAdmin, login } = useOmniaStore();
    const [sidebarOpen, setSidebarOpen] = useState(true);

    // Auto-login for the requested admin account for this final build
    useEffect(() => {
        login('nayrbryanGaming', 'nayrbryanGaming');
    }, [login]);

    const categories = [
        { id: 'Reasoning' as AICategory, icon: MessageSquare, label: 'Reasoning' },
        { id: 'Code' as AICategory, icon: Code, label: 'Code' },
        { id: 'Image' as AICategory, icon: Image, label: 'Image' },
        { id: 'Data' as AICategory, icon: BarChart3, label: 'Data' },
        { id: 'Audio' as AICategory, icon: Music, label: 'Audio' },
        { id: 'Video' as AICategory, icon: Video, label: 'Video' },
        { id: 'File' as AICategory, icon: FileText, label: 'File' },
    ];

    const modes = [
        { id: 'LOCAL' as const, icon: Cpu, label: 'Local', color: 'text-emerald-400' },
        { id: 'FREE_CLOUD' as const, icon: Cloud, label: 'Free Cloud', color: 'text-sky-400' },
        { id: 'PREMIUM' as const, icon: Zap, label: 'Premium', color: 'text-amber-400' },
        { id: 'API_KEY' as const, icon: Key, label: 'API Key', color: 'text-purple-400' },
    ];

    return (
        <div className="flex h-screen w-screen bg-[#050507] text-[#ECECEC] font-sans selection:bg-blue-500/30">
            {/* SIDEBAR */}
            <AnimatePresence mode="wait">
                {sidebarOpen && (
                    <motion.aside
                        initial={{ x: -300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -300, opacity: 0 }}
                        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                        className="fixed inset-y-0 left-0 z-50 flex flex-col w-64 border-r border-white/5 bg-[#0A0A0A]/80 backdrop-blur-2xl shadow-2xl shadow-black"
                    >
                        <div className="flex flex-col h-full p-6">
                            <div className="flex items-center justify-between mb-10">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-white to-gray-400 flex items-center justify-center shadow-lg shadow-white/5">
                                        <span className="text-black font-black text-sm">Ω</span>
                                    </div>
                                    <span className="font-bold tracking-tighter text-2xl bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">OMNIA</span>
                                </div>
                                <button onClick={() => setSidebarOpen(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/40 hover:text-white">
                                    <X size={18} />
                                </button>
                            </div>

                            <button className="flex items-center gap-3 w-full bg-white text-black p-3.5 rounded-2xl transition-all mb-10 group hover:shadow-lg hover:shadow-white/5 active:scale-95 duration-200">
                                <div className="p-1.5 rounded-lg bg-black/5 group-hover:bg-black/10 transition-colors">
                                    <Sparkles size={16} className="text-black" />
                                </div>
                                <span className="font-bold text-xs uppercase tracking-widest">New Engine Session</span>
                            </button>

                            <div className="flex-1 space-y-10 overflow-y-auto no-scrollbar">
                                <section>
                                    <h3 className="text-[10px] font-bold text-white/20 uppercase tracking-[0.25em] mb-4 px-2">Core Categories</h3>
                                    <div className="space-y-1">
                                        {categories.map(({ id, icon: Icon, label }) => (
                                            <button
                                                key={id}
                                                onClick={() => setCategory(id)}
                                                className={cn(
                                                    "w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm transition-all group",
                                                    selectedCategory === id
                                                        ? "bg-white/5 text-white font-medium ring-1 ring-white/10"
                                                        : "text-white/40 hover:bg-white/5 hover:text-white"
                                                )}
                                            >
                                                <Icon size={18} className={cn(selectedCategory === id ? "text-blue-400" : "text-white/20 group-hover:text-white/40")} />
                                                {label}
                                            </button>
                                        ))}
                                    </div>
                                </section>

                                <section>
                                    <h3 className="text-[10px] font-bold text-white/20 uppercase tracking-[0.25em] mb-4 px-2">Execution Engine</h3>
                                    <div className="space-y-1">
                                        {modes.map(({ id, icon: Icon, label, color }) => (
                                            <button
                                                key={id}
                                                onClick={() => setMode(id)}
                                                className={cn(
                                                    "w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm transition-all group",
                                                    executionMode === id
                                                        ? "bg-white/5 text-white font-medium ring-1 ring-white/10"
                                                        : "text-white/40 hover:bg-white/5 hover:text-white"
                                                )}
                                            >
                                                <Icon size={18} className={cn(executionMode === id ? color : "text-white/20 group-hover:text-white/40")} />
                                                {label}
                                            </button>
                                        ))}
                                    </div>
                                </section>
                            </div>

                            <div className="mt-auto pt-6 space-y-4">
                                {isAdmin && (
                                    <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-blue-500/5 border border-blue-500/10 shadow-[inset_0_0_20px_rgba(59,130,246,0.05)]">
                                        <div className="p-1.5 rounded-lg bg-blue-500/20">
                                            <ShieldCheck size={14} className="text-blue-400" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Administrator</span>
                                            <span className="text-[11px] text-blue-400/60 font-medium truncate">nayrbryanGaming</span>
                                        </div>
                                    </div>
                                )}
                                <div className="p-4 rounded-2xl bg-white/[0.01] border border-white/5 text-[10px] space-y-2 group">
                                    <div className="flex justify-between items-center text-white/20">
                                        <span>Status</span>
                                        <span className="text-emerald-400 flex items-center gap-1.5 font-bold uppercase tracking-tighter">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                            Active
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center text-white/20">
                                        <span>Latency</span>
                                        <span className="text-white/40 font-mono">0.4ms</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* MAIN CONTENT */}
            <main className={cn(
                "flex-1 flex flex-col relative transition-all duration-500 ease-in-out",
                sidebarOpen ? "pl-0 md:pl-64" : "pl-0"
            )}>
                <header className="h-16 flex items-center px-8 gap-4 border-b border-white/5 bg-[#050507]/60 backdrop-blur-2xl z-40 sticky top-0">
                    {!sidebarOpen && (
                        <button onClick={() => setSidebarOpen(true)} className="p-2 hover:bg-white/5 rounded-xl transition-all text-white/40 hover:text-white transform hover:scale-110 active:scale-95">
                            <Menu size={20} />
                        </button>
                    )}

                    <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-2xl group transition-all hover:border-white/20 cursor-default">
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black text-white/20 uppercase tracking-widest group-hover:text-white/40 transition-colors uppercase">{selectedCategory}</span>
                        </div>
                        <div className="w-px h-3 bg-white/10 mx-1" />
                        <select
                            value={selectedModel}
                            onChange={(e) => setModel(e.target.value)}
                            className="bg-transparent text-sm font-bold text-white outline-none cursor-pointer appearance-none pr-1"
                        >
                            {CATEGORY_MODELS[selectedCategory].map(model => (
                                <option key={model} value={model} className="bg-[#121212]">{model}</option>
                            ))}
                        </select>
                        <ChevronRight size={14} className="text-white/20 group-hover:text-white/40 rotate-90" />
                    </div>

                    <div className="ml-auto flex items-center gap-4">
                        <button className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white/40 hover:text-white hover:border-white/20 transition-all active:scale-95">
                            <Settings size={18} />
                        </button>
                        <div className="h-10 w-10 p-0.5 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-lg shadow-blue-500/10 active:scale-95 transition-transform cursor-pointer">
                            <div className="w-full h-full rounded-full bg-[#050507] flex items-center justify-center border border-black/20">
                                <User size={18} className="text-white/60" />
                            </div>
                        </div>
                    </div>
                </header>

                <div className="flex-1 relative overflow-hidden bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.03),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.03),transparent_40%)]">
                    {children}
                </div>
            </main>
        </div>
    );
};
