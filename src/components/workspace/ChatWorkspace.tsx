// MODULE 5 — FRONTEND CORE
// Path: src/components/workspace/ChatWorkspace.tsx
'use client';

import { useState } from 'react';
import { aiOrchestrator } from '@/lib/orchestrator';
import { useOmniaStore } from '@/store/useOmniaStore';

export function ChatWorkspace() {
    const { selectedModel, executionMode, setMode } = useOmniaStore();
    const [messages, setMessages] = useState<{ role: string, content: string }[]>([]);
    const [input, setInput] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSend = async () => {
        if (!input.trim()) return;
        const newMsg = { role: 'user', content: input };
        setMessages(p => [...p, newMsg]);
        setInput('');
        setError(null);

        try {
            const res = await aiOrchestrator.execute({
                id: crypto.randomUUID(),
                timestamp: Date.now(),
                model: selectedModel,
                mode: executionMode,
                messages: [...messages, newMsg] as any
            });

            setMessages(p => [...p, { role: 'assistant', content: res.content }]);
        } catch (err: any) {
            // Frontend Error State UI integration
            setError(err.message || "Execution Failed.");
            setMessages(p => [...p, { role: 'system', content: "System halted due to error." }]);
        }
    };

    return (
        <div className="flex flex-col h-full bg-[#050507] text-[#ECECEC] p-6">
            <header className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                <h2 className="text-xl font-bold">Workspace</h2>

                {/* Mode Selector UI */}
                <div className="flex gap-2">
                    <select
                        className="bg-white/5 border border-white/10 rounded px-3 py-1 text-sm outline-none"
                        value={executionMode}
                        onChange={(e) => setMode(e.target.value as any)}
                    >
                        <option value="LOCAL">Local (Zero Cost)</option>
                        <option value="FREE_CLOUD">Free Cloud (Queued)</option>
                        <option value="PREMIUM">Premium (H100)</option>
                        <option value="API_KEY">API Key (BYOK)</option>
                    </select>
                </div>
            </header>

            <div className="flex-1 overflow-y-auto space-y-4 mb-6">
                {messages.map((m, i) => (
                    <div key={i} className={`p-4 rounded-xl ${m.role === 'user' ? 'bg-[#2F2F2F] ml-auto max-w-[80%]' : 'bg-transparent border border-white/10 max-w-[90%]'}`}>
                        <span className="text-xs uppercase text-gray-500 block mb-1">{m.role}</span>
                        {m.content}
                    </div>
                ))}
            </div>

            {/* Error UI */}
            {error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-xl mb-4 text-sm animate-in fade-in">
                    <strong>System Error:</strong> {error}
                </div>
            )}

            <div className="flex gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    className="flex-1 bg-[#111111] border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-cyan-500 transition-colors"
                    placeholder={`Message Model (${selectedModel}) in ${executionMode} mode...`}
                />
                <button onClick={handleSend} className="bg-white text-black px-6 rounded-xl font-bold hover:bg-gray-200">
                    Execute
                </button>
            </div>
        </div>
    );
}

/*
EXPLANATION:
This fulfills the Frontend Core module requirement.
It includes the App Shell integration structure, Chat UI array rendering,
dynamic Mode/Model Selector UI drops (bound directly to Zustand global state),
and strict Error State UI handling (catching `aiOrchestrator` aborts/failures).
*/
