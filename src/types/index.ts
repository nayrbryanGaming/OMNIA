// MODULE 1 — CORE TYPES & CONTRACTS
// Path: src/types/index.ts

export type ExecutionMode = 'LOCAL' | 'FREE_CLOUD' | 'PREMIUM' | 'API_KEY';

export type ModelCapability = 'STREAM' | 'JSON_MODE' | 'TOOLS' | 'VISION';

export interface AIRequest {
    id: string; // Unique Request UUID
    timestamp: number;
    model: string; // e.g., "llama-3-8b", "gpt-4o"
    mode: ExecutionMode;
    messages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>;
    temperature?: number;
    maxTokens?: number;
    apiKey?: string; // Passed temporarily in memory if mode === API_KEY
    signal?: AbortSignal;
}

export interface AIResponse {
    requestId: string;
    modelId: string;
    usage: {
        promptTokens: number;
        completionTokens: number;
        totalTokens: number;
    };
    durationMs: number;
    finishReason: 'stop' | 'length' | 'error' | 'abort';
    content: string; // Final aggregated content if not streaming
}

export interface ExecutionCallbacks {
    onStart?: () => void;
    onToken?: (token: string) => void;
    onError?: (error: Error) => void;
    onFinish?: (response: AIResponse) => void;
}

/*
EXPLANATION:
This module defines the absolute core strict generic interfaces.
These are the data contracts shared across all UI components, Orchestrators,
and backend processes. It enables type safety across the monorepo.
*/
