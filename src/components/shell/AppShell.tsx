'use client';
import React, { useState } from 'react';
import { useOmniaStore, CATEGORY_MODELS, AICategory } from '@/store/useOmniaStore';
import { Menu, X, Sparkles, Cpu, Cloud, Zap, Key, LayoutGrid, MessageSquare, Code, Image, BarChart3, Settings, ShieldCheck, Music, Video, FileText } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { executionMode, setMode, selectedCategory, setCategory, selectedModel, setModel, isAdmin } = useOmniaStore();
    const [sidebarOpen, setSidebarOpen] = useState(true);

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
        <div className="flex h-screen w-screen bg-[#050507] text-[#ECECEC] overflow-hidden">
            {/* SIDEBAR */}
            <aside className={cn(
                "fixed inset-y-0 left-0 z-50 flex flex-col transition-all duration-300 border-r border-white/5 bg-[#0A0A0A]",
                sidebarOpen ? "w-64" : "w-0 -translate-x-full opacity-0"
            )}>
                <div className="flex flex-col h-full p-4">
                    <div className="flex items-center justify-between mb-8 px-2">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                                <span className="text-black font-black text-xs">O</span>
                            </div>
                            <span className="font-bold tracking-tight text-xl">OMNIA</span>
                        </div>
                        <button onClick={() => setSidebarOpen(false)} className="md:hidden">
                            <X size={20} />
                        </button>
                    </div>

                    <button className="flex items-center gap-3 w-full bg-white/5 hover:bg-white/10 p-3 rounded-2xl transition-all mb-8 group">
                        <div className="p-2 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors">
                            <Sparkles size={18} className="text-amber-400" />
                        </div>
                        <span className="font-medium text-sm">New Session</span>
                    </button>

                    <div className="flex-1 space-y-8 overflow-y-auto custom-scrollbar">
                        <section>
                            <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-4 px-2">Focus</h3>
                            <div className="space-y-1">
                                {categories.map(({ id, icon: Icon, label }) => (
                                    <button
                                        key={id}
                                        onClick={() => setCategory(id)}
                                        className={cn(
                                            "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all group",
                                            selectedCategory === id
                                                ? "bg-white/10 text-white font-medium"
                                                : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
                                        )}
                                    >
                                        <Icon size={18} className={cn(selectedCategory === id ? "text-blue-400" : "text-gray-500 group-hover:text-gray-400")} />
                                        {label}
                                    </button>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-4 px-2">Engine</h3>
                            <div className="space-y-1">
                                {modes.map(({ id, icon: Icon, label, color }) => (
                                    <button
                                        key={id}
                                        onClick={() => setMode(id)}
                                        className={cn(
                                            "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all group",
                                            executionMode === id
                                                ? "bg-white/10 text-white font-medium shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]"
                                                : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
                                        )}
                                    >
                                        <Icon size={18} className={cn(executionMode === id ? color : "text-gray-500 group-hover:text-gray-400")} />
                                        {label}
                                    </button>
                                ))}
                            </div>
                        </section>
                    </div>

                    <div className="mt-auto pt-4 space-y-4">
                        {isAdmin && (
                            <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
                                <ShieldCheck size={16} className="text-blue-400" />
                                <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider">Admin Pro</span>
                            </div>
                        )}
                        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-[11px] space-y-2">
                            <div className="flex justify-between items-center text-gray-500">
                                <span>Connectivity</span>
                                <span className="text-emerald-400 flex items-center gap-1.5 font-bold uppercase tracking-tighter">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                    Online
                                </span>
                            </div>
                            <div className="flex justify-between items-center text-gray-500">
                                <span>Engine Latency</span>
                                <span className="text-gray-300 font-mono">12ms</span>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <main className={cn(
                "flex-1 flex flex-col relative transition-all duration-300",
                sidebarOpen ? "pl-0 md:pl-64" : "pl-0"
            )}>
                <header className="h-16 flex items-center px-6 gap-4 border-b border-white/5 bg-[#050507]/80 backdrop-blur-xl z-40 sticky top-0">
                    {!sidebarOpen && (
                        <button onClick={() => setSidebarOpen(true)} className="p-2 hover:bg-white/5 rounded-xl transition-colors">
                            <Menu size={20} />
                        </button>
                    )}

                    <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl cursor-default">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{selectedCategory}</span>
                        <span className="text-gray-600">/</span>
                        <select
                            value={selectedModel}
                            onChange={(e) => setModel(e.target.value)}
                            className="bg-transparent text-sm font-semibold text-white outline-none cursor-pointer"
                        >
                            {CATEGORY_MODELS[selectedCategory].map(model => (
                                <option key={model} value={model} className="bg-[#121212]">{model}</option>
                            ))}
                        </select>
                    </div>

                    <div className="ml-auto flex items-center gap-4">
                        <button className="text-gray-400 hover:text-white transition-colors">
                            <Settings size={20} />
                        </button>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 border border-white/10" />
                    </div>
                </header>

                <div className="flex-1 relative overflow-hidden">
                    {children}
                </div>
            </main>
        </div>
    );
};
