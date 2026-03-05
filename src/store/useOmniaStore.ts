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

// Basic persistence for the session
const getInitialState = () => {
    if (typeof window === 'undefined') return { isAdmin: false, currentUser: null };
    const savedAdmin = localStorage.getItem('omnia_admin');
    const savedUser = localStorage.getItem('omnia_user');
    return {
        isAdmin: savedAdmin === 'true',
        currentUser: savedUser ? JSON.parse(savedUser) : null,
    };
};

const initialState = getInitialState();

export const useOmniaStore = create<OmniaState>((set) => ({
    ...initialState,
    selectedCategory: 'Reasoning',
    selectedModel: CATEGORY_MODELS['Reasoning'][0],
    executionMode: 'LOCAL',

    login: (username: string, pass: string) => {
        // Normalize for case-insensitivity to avoid frustration
        const normalizedUser = username.trim();
        const normalizedPass = pass.trim();

        if (normalizedUser === 'nayrbryanGaming' && normalizedPass === 'nayrbryanGaming') {
            const user = { username: 'nayrbryanGaming', role: 'ADMIN' as const };
            if (typeof window !== 'undefined') {
                localStorage.setItem('omnia_admin', 'true');
                localStorage.setItem('omnia_user', JSON.stringify(user));
            }
            set({ isAdmin: true, currentUser: user });
            return true;
        }
        return false;
    },

    logout: () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('omnia_admin');
            localStorage.removeItem('omnia_user');
        }
        set({ isAdmin: false, currentUser: null });
    },

    setCategory: (cat) => set({
        selectedCategory: cat,
        selectedModel: CATEGORY_MODELS[cat][0]
    }),

    setModel: (selectedModel) => set({ selectedModel }),
    setMode: (executionMode) => set({ executionMode }),
}));
