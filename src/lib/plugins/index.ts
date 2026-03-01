// MODULE 3 — MODEL PLUGIN SYSTEM
// Path: src/lib/plugins/index.ts

import { AIRequest, AIResponse, ExecutionCallbacks } from '../../types';

/**
 * The strict abstract contract EVERY model executor must fulfill.
 */
export interface ModelAdapter {
  id: string;
  name: string;
  type: 'LLM' | 'DIFFUSION' | 'AUDIO';
  execute: (req: AIRequest, callbacks?: ExecutionCallbacks) => Promise<AIResponse>;
}

class Registry {
  private adapters: Map<string, ModelAdapter> = new Map();

  register(modeKey: string, adapter: ModelAdapter) {
    this.adapters.set(modeKey, adapter);
  }

  getAdapter(modelId: string, mode: string): ModelAdapter | undefined {
    // Lookup pattern e.g., "LOCAL:llama-3-8b"
    return this.adapters.get(`${mode}:${modelId}`) || this.adapters.get(`${mode}:DEFAULT`);
  }
}

export const ModelRegistry = new Registry();

// --- EXAMPLE PLUGIN: API KEY OPENAI ADAPTER ---
class OpenAiAdapter implements ModelAdapter {
  id = 'openai-api';
  name = 'OpenAI Direct API';
  type = 'LLM' as const;

  async execute(req: AIRequest, cb?: ExecutionCallbacks): Promise<AIResponse> {
    if (!req.apiKey) throw new Error("API Key required for this execution mode.");

    cb?.onStart?.();
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${req.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ model: req.model, messages: req.messages }),
      signal: req.signal
    });

    if (!res.ok) throw new Error(`OpenAI Error: ${res.statusText}`);
    const data = (await res.json()) as any;

    const response: AIResponse = {
      requestId: req.id,
      modelId: req.model,
      finishReason: data.choices[0].finish_reason,
      content: data.choices[0].message.content,
      usage: {
        promptTokens: data.usage.prompt_tokens,
        completionTokens: data.usage.completion_tokens,
        totalTokens: data.usage.total_tokens
      },
      durationMs: 0
    };

    cb?.onFinish?.(response);
    return response;
  }
}

// Register it on boot
ModelRegistry.register('API_KEY:gpt-4o', new OpenAiAdapter());

/*
EXPLANATION:
This Plugin architecture guarantees OMNIA will never be locked to one provider.
To add Anthropic, Mistral, or a custom internal endpoint, developers just write
a new class implementing \`ModelAdapter\` and call \`ModelRegistry.register()\`.
*/
