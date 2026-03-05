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

        // Simulate network lag for that premium feel
        setTimeout(() => {
            const success = login(username, password);
            if (success) {
                router.push('/');
            } else {
                setError('Invalid credentials. Access denied by OMNIA Security.');
                setIsLoading(false);
            }
        }, 1200);
    };

    const handleSocialLogin = (provider: string) => {
        setIsLoading(true);
        // Simulate immediate social auth success for the admin account
        setTimeout(() => {
            login('nayrbryanGaming', 'nayrbryanGaming');
            router.push('/');
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-[#050507] text-[#ECECEC] flex items-center justify-center p-6 relative overflow-hidden selection:bg-blue-500/30">
            {/* Background Aesthetics */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-600/10 rounded-full blur-[160px] animate-pulse" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-purple-600/10 rounded-full blur-[160px] animate-pulse" style={{ animationDelay: '2s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:32px_32px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className="w-full max-w-[420px] z-10"
            >
                {/* Logo Area */}
                <div className="flex flex-col items-center mb-12">
                    <motion.div
                        initial={{ rotate: -20, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white to-gray-400 flex items-center justify-center shadow-2xl shadow-white/10 mb-6"
                    >
                        <span className="text-black font-black text-2xl">Ω</span>
                    </motion.div>
                    <h1 className="text-4xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 mb-2">
                        OMNIA OS
                    </h1>
                    <p className="text-white/30 text-xs font-bold uppercase tracking-[0.3em]">Universal Intelligence</p>
                </div>

                {/* Login Card */}
                <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative bg-[#0A0A0A] border border-white/5 rounded-3xl p-8 backdrop-blur-2xl shadow-2xl">

                        <div className="space-y-6">
                            {/* Social Buttons */}
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={() => handleSocialLogin('google')}
                                    className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 p-3.5 rounded-2xl hover:bg-white/10 transition-all active:scale-95 group/btn"
                                >
                                    <Chrome size={18} className="text-white/60 group-hover/btn:text-white" />
                                    <span className="text-sm font-semibold">Google</span>
                                </button>
                                <button
                                    onClick={() => handleSocialLogin('twitter')}
                                    className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 p-3.5 rounded-2xl hover:bg-white/10 transition-all active:scale-95 group/btn"
                                >
                                    <TwitterIcon size={18} className="text-white/60 group-hover/btn:text-white" />
                                    <span className="text-sm font-semibold">Twitter</span>
                                </button>
                            </div>

                            <div className="relative flex items-center justify-center">
                                <span className="w-full h-px bg-white/5" />
                                <span className="absolute bg-[#0A0A0A] px-4 text-[10px] font-black text-white/20 uppercase tracking-widest">or secure relay</span>
                            </div>

                            {/* Admin Form */}
                            <form onSubmit={handleAdminLogin} className="space-y-4">
                                <div className="space-y-2">
                                    <div className="relative">
                                        <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                                        <input
                                            type="text"
                                            placeholder="Identity (Admin)"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pl-12 text-sm outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all placeholder:text-white/20 font-medium"
                                            required
                                        />
                                    </div>
                                    <div className="relative">
                                        <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                                        <input
                                            type="password"
                                            placeholder="Security Key"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pl-12 text-sm outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all placeholder:text-white/20 font-medium"
                                            required
                                        />
                                    </div>
                                </div>

                                {error && (
                                    <motion.p
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="text-red-400 text-[11px] font-bold text-center px-4"
                                    >
                                        {error}
                                    </motion.p>
                                )}

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-white text-black p-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-200 transition-all active:scale-[0.98] disabled:opacity-50"
                                >
                                    {isLoading ? (
                                        <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            Initialize Core Access
                                            <ArrowRight size={16} />
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Footer Info */}
                <div className="mt-12 flex flex-col items-center gap-4 text-white/20">
                    <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest">
                        <span className="flex items-center gap-2"><Shield size={12} /> Military Grade</span>
                        <span className="flex items-center gap-2"><Sparkles size={12} /> Quantum Safe</span>
                    </div>
                    <p className="text-[10px] text-center max-w-[280px] leading-loose">
                        By initializing, you accept the OMNIA Sovereignty Protocols and Data Isolation Agreements.
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
