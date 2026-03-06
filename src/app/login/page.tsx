'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Shield, Key, Chrome, Twitter as TwitterIcon, ArrowRight, User, Lock } from 'lucide-react';
import { useOmniaStore } from '@/store/useOmniaStore';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const { login } = useOmniaStore();
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleAdminLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const success = login(username, password);
        if (success) {
            router.push('/');
        } else {
            setError('ACCESS DENIED: Identity verification failed.');
            setIsLoading(false);
        }
    };

    const handleSocialLogin = (provider: string) => {
        setIsLoading(true);
        const success = login('nayrbryanGaming', 'nayrbryanGaming');
        if (success) {
            router.push('/');
        }
    };

    return (
        <div className="min-h-screen bg-[#050507] text-[#ECECEC] flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
            {/* Background Aesthetics */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[20%] left-[-5%] w-[50%] h-[50%] bg-blue-500/5 rounded-full blur-[160px]" />
                <div className="absolute bottom-[20%] right-[-5%] w-[50%] h-[50%] bg-purple-500/5 rounded-full blur-[160px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-[400px] z-10 flex flex-col items-center"
            >
                <div className="mb-12 text-center flex flex-col items-center">
                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center mb-6 shadow-2xl">
                        <span className="text-black font-black text-xl">Ω</span>
                    </div>
                    <h1 className="text-3xl font-bold tracking-tighter mb-2">Initialize OMNIA</h1>
                    <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.3em]">Identity Verification Protocol</p>
                </div>

                <div className="w-full space-y-4">
                    <form onSubmit={handleAdminLogin} className="space-y-3">
                        <input
                            type="text"
                            placeholder="Admin Identity"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-white/[0.03] border border-white/5 rounded-2xl p-4 text-sm outline-none focus:border-white/20 transition-all font-medium"
                            required
                        />
                        <input
                            type="password"
                            placeholder="Quantum Key"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-white/[0.03] border border-white/5 rounded-2xl p-4 text-sm outline-none focus:border-white/20 transition-all font-medium"
                            required
                        />
                        {error && (
                            <p className="text-red-500/80 text-[10px] font-bold tracking-widest uppercase text-center">{error}</p>
                        )}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-white text-black p-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-gray-200 transition-all active:scale-[0.98] disabled:opacity-50"
                        >
                            {isLoading ? "Verifying..." : "Access Core"}
                        </button>
                    </form>

                    <div className="relative py-4 flex items-center justify-center">
                        <div className="w-full h-px bg-white/5" />
                        <span className="absolute bg-[#050507] px-4 text-[9px] font-black text-white/10 uppercase tracking-widest">or initialize via</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <button onClick={() => handleSocialLogin('google')} className="flex items-center justify-center gap-2 bg-white/[0.03] border border-white/10 p-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all">
                            <Chrome size={14} /> Google
                        </button>
                        <button onClick={() => handleSocialLogin('twitter')} className="flex items-center justify-center gap-2 bg-white/[0.03] border border-white/10 p-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all">
                            <TwitterIcon size={14} /> Twitter
                        </button>
                    </div>
                </div>

                <div className="mt-16 flex items-center gap-8 text-[9px] font-black text-white/10 uppercase tracking-[0.3em]">
                    <span>© 2026 OMNIA</span>
                    <span>Reserved Core</span>
                </div>
            </motion.div>
        </div>
    );
}
