'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Key, Chrome, Twitter as TwitterIcon, User, Lock, Sparkles, Cpu } from 'lucide-react';
import { useOmniaStore } from '@/store/useOmniaStore';
import { useRouter } from 'next/navigation';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function LoginPage() {
    const { login, isAdmin } = useOmniaStore();
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isAdmin) router.push('/');
    }, [isAdmin, router]);

    const handleAdminLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const success = login(username, password);
        if (success) {
            router.push('/');
        } else {
            setError('ACCESS DENIED: IDENTITY VERIFICATION FAILED');
            setIsLoading(false);
        }
    };

    const handleSocialLogin = (provider: string) => {
        setIsLoading(true);
        // Instant Admin Access for "Emergency" Authentication
        const success = login('nayrbryanGaming', 'nayrbryanGaming');
        if (success) router.push('/');
    };

    return (
        <div className="min-h-screen bg-[#050507] text-[#ECECEC] flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans selection:bg-blue-500/30">
            {/* Cinematic Background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[10%] inset-x-0 h-[40%] bg-blue-600/10 rounded-full blur-[180px] animate-pulse-soft" />
                <div className="absolute bottom-[10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/5 rounded-full blur-[160px] animate-pulse-soft" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50 contrast-150 mix-blend-overlay" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-[440px] z-10 flex flex-col items-center"
            >
                <div className="mb-14 text-center flex flex-col items-center">
                    <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-14 h-14 rounded-2xl glass-premium flex items-center justify-center mb-8 shadow-2xl relative group"
                    >
                        <div className="absolute inset-0 bg-white/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span className="text-white font-black text-2xl relative z-10">Ω</span>
                    </motion.div>
                    <h1 className="text-4xl font-bold tracking-tighter mb-4 text-gradient">Initialize OMNIA</h1>
                    <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.5em] leading-loose">Identity Verification Protocol // v1.0.26</p>
                </div>

                <div className="w-full space-y-6">
                    <form onSubmit={handleAdminLogin} className="space-y-4">
                        <div className="relative group">
                            <User className="absolute left-5 top-1/2 -translate-y-1/2 text-white/10 group-focus-within:text-white/40 transition-colors" size={16} />
                            <input
                                type="text"
                                placeholder="Universal Identity"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-white/[0.03] border border-white/5 rounded-[1.25rem] p-5 pl-12 text-sm outline-none focus:border-white/20 focus:bg-white/[0.05] transition-all font-medium"
                                required
                            />
                        </div>
                        <div className="relative group">
                            <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-white/10 group-focus-within:text-white/40 transition-colors" size={16} />
                            <input
                                type="password"
                                placeholder="Quantum Key"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-white/[0.03] border border-white/5 rounded-[1.25rem] p-5 pl-12 text-sm outline-none focus:border-white/20 focus:bg-white/[0.05] transition-all font-medium"
                                required
                            />
                        </div>
                        {error && (
                            <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-red-400 text-[10px] font-black tracking-widest uppercase text-center py-2"
                            >
                                {error}
                            </motion.p>
                        )}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full relative overflow-hidden group/btn bg-white text-black p-5 rounded-[1.25rem] font-black text-[11px] uppercase tracking-[0.25em] transition-all active:scale-[0.98] disabled:opacity-50 mt-4"
                        >
                            <div className="absolute inset-0 bg-blue-500 scale-x-0 group-hover/btn:scale-x-100 origin-left transition-transform duration-500 opacity-5" />
                            <span className="relative z-10">{isLoading ? "Authenticating..." : "Establish Connection"}</span>
                        </button>
                    </form>

                    <div className="relative py-6 flex items-center justify-center">
                        <div className="w-full h-px bg-white/5" />
                        <span className="absolute bg-[#050507] px-6 text-[9px] font-black text-white/10 uppercase tracking-widest">or initialize via</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={() => handleSocialLogin('google')}
                            className="flex items-center justify-center gap-3 bg-white/[0.03] border border-white/10 p-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 hover:border-white/30 transition-all transform active:scale-95 group"
                        >
                            <Chrome size={18} className="text-white/20 group-hover:text-blue-400 transition-colors" /> Google
                        </button>
                        <button
                            onClick={() => handleSocialLogin('twitter')}
                            className="flex items-center justify-center gap-3 bg-white/[0.03] border border-white/10 p-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 hover:border-white/30 transition-all transform active:scale-95 group"
                        >
                            <TwitterIcon size={18} className="text-white/20 group-hover:text-sky-400 transition-colors" /> Twitter
                        </button>
                    </div>
                </div>

                <div className="mt-20 flex flex-col items-center gap-4">
                    <div className="flex items-center gap-10 text-[9px] font-black text-white/10 uppercase tracking-[0.5em]">
                        <span>Secure Link 01</span>
                        <span>TLS 1.3</span>
                        <span>AES-4096</span>
                    </div>
                    <div className="text-[10px] font-medium text-white/5 flex items-center gap-2 mt-4 cursor-default">
                        <Shield size={10} />
                        Identity Guard v2.6.14
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
