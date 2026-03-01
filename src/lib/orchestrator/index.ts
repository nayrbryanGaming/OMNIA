// MODULE 2 — AI ORCHESTRATOR (CORE)
// Path: src/lib/orchestrator/index.ts

import { AIRequest, AIResponse, ExecutionMode } from '../../types';
import { ModelRegistry } from '../plugins';

export class Orchestrator {

  /**
   * Main entrypoint for all AI queries across Desktop/Web.
   */
  async execute(request: AIRequest): Promise<AIResponse> {
    try {
      // 1. Validate intent and route
      const adapter = ModelRegistry.getAdapter(request.model, request.mode);
      if (!adapter) throw new Error(`No adapter found for mode: ${request.mode}`);

      // 2. Add AbortController for timeouts (e.g., 30s)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort('Timeout'), 30000);

      const reqWithSignal = { ...request, signal: request.signal || controller.signal };

      // 3. Execute request via appropriate adapter
      const response = await adapter.execute(reqWithSignal, {
        onToken: (t) => console.log(t), // In prod, dispatch to store/SSE
        onError: (e) => console.error(e)
      });

      clearTimeout(timeoutId);
      return response;

    } catch (error: unknown) {
      if (error instanceof Error && error.name === 'AbortError') throw error;
      return this.handleFallback(request, error instanceof Error ? error : new Error(String(error)));
    }
  }

  /**
   * Fallback Logic: (Local -> Cloud -> API)
   */
  private async handleFallback(request: AIRequest, originalError: Error): Promise<AIResponse> {
    console.warn(`Primary failed. Checking fallback... Error: ${originalError.message}`);

    // Only fallback ONCE to prevent infinite loops (Feature #772)
    if ((request as any)._hasFallenBack) {
      throw new Error(`Execution failed permanently: ${originalError.message}`);
    }

    let fallbackMode: ExecutionMode | null = null;

    if (request.mode === 'LOCAL') fallbackMode = 'FREE_CLOUD';
    else if (request.mode === 'API_KEY') fallbackMode = 'LOCAL';

    if (!fallbackMode) throw originalError;

    console.warn(`Falling back to mode: ${fallbackMode}`);
    return this.execute({ ...request, mode: fallbackMode, _hasFallenBack: true } as AIRequest & { _hasFallenBack?: boolean });
  }
}

export const aiOrchestrator = new Orchestrator();

/*
EXPLANATION:
This Orchestrator is the central brain of the client. Instead of tightly 
coupling UI buttons to fetch requests, all UI elements call orchestrator.execute().
It automatically handles timeouts, aborts (cancellations), and critical fallback routing.
If the Local GPU crashes, it gracefully shifts to the free cloud tier silently.
*/
