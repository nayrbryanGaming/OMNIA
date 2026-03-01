'use client';
import { create } from 'zustand';

interface User {
    username: string;
    role: 'USER' | 'ADMIN';
}

export type AICategory = 'Reasoning' | 'Code' | 'Image' | 'Data' | 'Audio' | 'Video' | 'File';

interface OmniaState {
    isAdmin: boolean;
    currentUser: User | null;
    selectedCategory: AICategory;
    selectedModel: string;
    executionMode: 'LOCAL' | 'FREE_CLOUD' | 'PREMIUM' | 'API_KEY';
    login: (username: string, pass: string) => boolean;
    logout: () => void;
    setCategory: (cat: AICategory) => void;
    setModel: (model: string) => void;
    setMode: (mode: 'LOCAL' | 'FREE_CLOUD' | 'PREMIUM' | 'API_KEY') => void;
}

export const CATEGORY_MODELS: Record<AICategory, string[]> = {
    Reasoning: ['Llama-3-2026', 'GPT-4o-Omni', 'Claude-3.5-Sonnet'],
    Code: ['DeepSeek-Coder-V3', 'Llama-3-Code', 'Qwen-2.5-Coder'],
    Image: ['Stable-Diffusion-X', 'Midjourney-V7-API', 'Flux-1-Dev'],
    Data: ['Grok-OMNIA-Turbo', 'Mistral-Large', 'Data-Agent-1'],
    Audio: ['Whisper-V4', 'Suno-V3.5', 'ElevenLabs-Pro'],
    Video: ['Sora-Edge', 'Kling-AI', 'Runway-Gen-3'],
    File: ['Claude-Project-Analyzer', 'PDF-Expert-V2', 'DocuSearch-2026']
};

export const useOmniaStore = create<OmniaState>((set) => ({
    isAdmin: false,
    currentUser: null,
    selectedCategory: 'Reasoning',
    selectedModel: CATEGORY_MODELS['Reasoning'][0],
    executionMode: 'LOCAL',

    login: (username: string, pass: string) => {
        if (username === 'nayrbryanGaming' && pass === 'nayrbryanGaming') {
            set({ isAdmin: true, currentUser: { username: 'nayrbryanGaming', role: 'ADMIN' } });
            return true;
        }
        return false;
    },

    logout: () => set({ isAdmin: false, currentUser: null }),

    setCategory: (cat) => set({
        selectedCategory: cat,
        selectedModel: CATEGORY_MODELS[cat][0] // Auto-switch to the first model of the new category
    }),

    setModel: (selectedModel) => set({ selectedModel }),
    setMode: (executionMode) => set({ executionMode }),
}));
