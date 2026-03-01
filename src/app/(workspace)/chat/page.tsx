'use client';
import { useState, useRef, useEffect } from 'react';
import { aiOrchestrator } from '@/lib/orchestrator';
import { useOmniaStore, AICategory } from '@/store/useOmniaStore';
import { Send, Paperclip, Sparkles, User, Bot, Loader2, MessageSquare, Code, Image, BarChart3, Music, Video, FileText } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function ChatView() {
  const [messages, setMessages] = useState<Array<{ role: string, content: string }>>([]);
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { selectedModel, executionMode, selectedCategory, setCategory } = useOmniaStore();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (suggestionText?: string) => {
    const textToSend = suggestionText || input;
    if (!textToSend.trim() || isGenerating) return;

    const newMsg = { role: 'user', content: textToSend };
    setMessages(prev => [...prev, newMsg]);
    setInput('');
    setIsGenerating(true);

    try {
      const response = await aiOrchestrator.execute({
        id: crypto.randomUUID(),
        model: selectedModel,
        mode: executionMode,
        messages: [...messages, newMsg] as any,
        timestamp: Date.now()
      });

      setMessages(prev => [...prev, { role: 'assistant', content: response.content }]);
    } catch (e: unknown) {
      setMessages(prev => [...prev, { role: 'system', content: `Error: ${e instanceof Error ? e.message : String(e)}` }]);
    } finally {
      setIsGenerating(false);
    }
  };

  const suggestions: Record<AICategory, string[]> = {
    Reasoning: ["Analyze this logical paradox...", "Explain quantum computing...", "Write a philosophy essay..."],
    Code: ["Write a React hook for API state", "Debug this Python script...", "Explain Rust ownership..."],
    Image: ["Generate a cyberpunk city skyline", "Create a minimalist logo...", "A majestic lion in 8k..."],
    Data: ["Analyze recent tech stock trends", "Predict crypto market movement", "Summarize this dataset..."],
    Audio: ["Compose a lo-fi study track", "Generate a podcast intro...", "Clean up this audio clip..."],
    Video: ["Animate a spaceship takeoff", "Create a cinematic drone shot", "Generate a 5-second transition..."],
    File: ["Extract data from this spreadsheet", "Summarize this 50-page PDF", "Audit this smart contract code..."]
  };

  return (
    <div className="flex flex-col h-full bg-[#050507]">
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-10 space-y-12 custom-scrollbar"
      >
        <div className="max-w-3xl mx-auto w-full space-y-12">
          {messages.length === 0 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <h1 className="text-4xl md:text-6xl font-bold mb-16 tracking-tight text-center">
                <span className="bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent block mb-4">
                  What do you want to build?
                </span>
                <span className="text-xl md:text-2xl text-gray-500 font-medium font-sans tracking-normal">
                  Omnia orchestrates {selectedCategory.toLowerCase()} with sovereign intelligence.
                </span>
              </h1>

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-16">
                {[
                  { id: 'Reasoning', icon: MessageSquare, label: 'Think', desc: 'Reasoning', color: 'text-blue-400' },
                  { id: 'Code', icon: Code, label: 'Build', desc: 'Code', color: 'text-emerald-400' },
                  { id: 'Image', icon: Image, label: 'Create', desc: 'Art', color: 'text-purple-400' },
                  { id: 'Data', icon: BarChart3, label: 'Analyze', desc: 'Data', color: 'text-amber-400' },
                  { id: 'Audio', icon: Music, label: 'Audio', desc: 'Sound', color: 'text-pink-400' },
                  { id: 'Video', icon: Video, label: 'Video', desc: 'Motion', color: 'text-red-400' },
                  { id: 'File', icon: FileText, label: 'File', desc: 'Docs', color: 'text-orange-400' }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setCategory(cat.id as any)}
                    className={cn(
                      "p-4 rounded-3xl bg-white/[0.02] border transition-all hover:scale-[1.05] text-center group flex flex-col items-center",
                      selectedCategory === cat.id
                        ? "border-blue-500/30 bg-blue-500/5 shadow-[0_0_20px_rgba(59,130,246,0.1)]"
                        : "border-white/5 hover:border-white/10 hover:bg-white/[0.04]"
                    )}
                  >
                    <cat.icon size={20} className={cn("mb-3 transition-transform group-hover:scale-110", selectedCategory === cat.id ? cat.color : "text-gray-500")} />
                    <h3 className="font-bold text-xs mb-0.5">{cat.label}</h3>
                    <p className="text-[10px] text-gray-500 leading-none">{cat.desc}</p>
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                <h3 className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em] text-center mb-6">Suggested for {selectedCategory} focus</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
                  {suggestions[selectedCategory].map((sug, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(sug)}
                      className="p-5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 text-sm text-gray-300 text-left transition-all hover:translate-x-1 flex items-center justify-between group"
                    >
                      <span>{sug}</span>
                      <Sparkles size={14} className="text-gray-600 group-hover:text-blue-400 transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {messages.map((msg, idx) => (
            <div key={idx} className={cn("group flex flex-col w-full animate-in fade-in duration-500", msg.role === 'user' ? "items-end" : "items-start")}>
              <div className={cn(
                "flex gap-4 max-w-[85%] md:max-w-[80%]",
                msg.role === 'user' ? "flex-row-reverse" : "flex-row"
              )}>
                <div className={cn(
                  "w-8 h-8 rounded-full shrink-0 flex items-center justify-center border border-white/10",
                  msg.role === 'user' ? "bg-white/10" : "bg-gradient-to-br from-blue-500 to-cyan-500"
                )}>
                  {msg.role === 'user' ? <User size={14} /> : <Bot size={14} className="text-white" />}
                </div>
                <div className={cn(
                  "p-5 rounded-3xl text-[15px] leading-relaxed shadow-2xl",
                  msg.role === 'user'
                    ? "bg-[#2F2F2F] text-white rounded-tr-lg"
                    : "bg-transparent text-gray-100"
                )}>
                  {msg.content}
                </div>
              </div>
            </div>
          ))}

          {isGenerating && (
            <div className="flex gap-4 animate-in fade-in">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <Bot size={14} className="text-white" />
              </div>
              <div className="mt-2">
                <Loader2 size={20} className="animate-spin text-blue-400" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* INPUT AREA */}
      <div className="w-full max-w-4xl mx-auto p-4 md:p-8 shrink-0">
        <div className="relative group bg-[#111111] rounded-[32px] border border-white/5 focus-within:border-white/20 transition-all shadow-2xl overflow-hidden">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder={`Message OMNIA (${selectedCategory})...`}
            className="w-full bg-transparent px-6 py-5 outline-none text-[15px] placeholder:text-gray-500 resize-none max-h-60 min-h-[64px] text-[#ECECEC]"
            rows={1}
          />
          <div className="flex justify-between items-center px-4 pb-4">
            <div className="flex gap-1">
              <button className="p-3 text-gray-400 hover:text-white rounded-2xl hover:bg-white/5 transition-all">
                <Paperclip size={20} />
              </button>
            </div>
            <button
              onClick={() => handleSend()}
              disabled={isGenerating || !input.trim()}
              className={cn(
                "p-3 rounded-2xl transition-all shadow-xl",
                input.trim()
                  ? "bg-[#ECECEC] text-black hover:bg-white scale-100"
                  : "bg-white/5 text-gray-600 cursor-not-allowed scale-95 opacity-50"
              )}
            >
              <Send size={20} fill={input.trim() ? "currentColor" : "none"} />
            </button>
          </div>
        </div>
        <p className="text-[10px] text-center text-gray-600 mt-4 uppercase tracking-[0.2em] font-bold">
          Omnia Operating System • 2026 Production Edition
        </p>
      </div>
    </div>
  );
}
