# OMNIA - ENGINEERING HARDENING & ARCHITECTURE (2026)

## SECTION 1 — FINAL SYSTEM ARCHITECTURE
```text
[CLIENT LAYER: Next.js + Zustand (Web), Tauri (Desktop), PWA (Mobile)]
      | (Secure HTTPS / WSS / gRPC)
      v
[EDGE GATEWAY: Vercel Edge API | Rate Limiter | Auth Middleware]
      |
      +--> [LOCAL RUNTIME WORKER: Wasm / Tauri OS binding] -> local_gpu
      |
      +--> [ORCHESTRATOR: Target Resolution & Priority System]
                 |
                 +--> [FREE CLUSTER PLUGIN]  -> omnia_shared_k8s
                 +--> [PREMIUM CLUSTER PLUGIN] -> scale_tier_h100
                 +--> [API KEYS PLUGIN]      -> openai/anthropic/cohere
```

## SECTION 2 — MONOREPO STRUCTURE (FINAL)
```txt
/omnia
├── /apps
│   ├── /web (Next.js 16 deployment config, routing, page shells)
│   ├── /desktop (Tauri wrapper injecting local os privileges)
├── /packages
│   ├── /core (Types, AIOrchestrator, ModelRegistry)
│   ├── /ui (Tailwind 4.0, Radix primitives, glassmorphic themes)
│   ├── /plugins (The adapter logic for OpenAI, Anthropic, LocalMLC)
├── /docs (Architecture, SRE, Governance)
└── turbo.json (Monorepo orchestrator)
```

## SECTION 3 — AI ORCHESTRATOR IMPLEMENTATION
- **Pseudocode**:
  `executeTask(req) {`
  `  adapter = registry.find(req.model)`
  `  if (adapter.type == LOCAL && !hasVRAM) downgradeTo(FREE_CLOUD)`
  `  try { return adapter.generate(req, abortSignal) }`
  `  catch (e) { if (e.code == TIMEOUT && mode == CLOUD) routeToFallback(req) }`
  `}`
- **Queue Priority Logic**: Local -> Instance Execute. Premium -> Priority Queue Bypass. Free -> Deep upstash Redis queue.
- **Timeout**: 30s max API wait time on Vercel Edge. WebSockets kept alive via ping intervals for long generations.

## SECTION 4 — MODEL PLUGIN INTERFACE
```typescript
interface ModelAdapter {
  id: string; // 'gpt-4o', 'flux-schnell'
  type: 'LLM' | 'DIFFUSION' | 'AUDIO';
  mode: 'LOCAL' | 'API_KEY' | 'CLOUD';
  execute: (request: AIRequest, callbacks: Observers) => Promise<AIResponse>;
}
```
All new models MUST implement this. Closed APIs are wrapped to normalize errors into strict OMNIA types. Local runtimes register themselves on boot if hardware detects capabilities.

## SECTION 5 — CONFIGURATION & ENVIRONMENT
- `.env.local` contains Developer/Infra secrets (`TURBO_TOKEN`, `UPSTASH_REDIS_REST_URL`).
- `config.toml` inside `/apps/desktop` configures max RAM allocations for local models.
- **Secrets rules**: User LLM API keys are NEVER sent to the backend database; they execute directly from client to provider or are heavily encrypted in transport to the Edge broker.

## SECTION 6 — FAILURE-FIRST DESIGN
- **Detection**: 500s from Cloud, OOM errors from Local, RateLimits from BYOK.
- **Recovery**: Automatic silent downgrade from Local -> Cloud if a local model crashes.
- **User Reporting**: "Local GPU crashed. Failsafe activated: Resuming on Free Cloud."
- **Logged**: Error codes, latencies, model targets. **NEVER LOGGED**: Prompt content.

## SECTION 7 — PERFORMANCE & COST CONTROLS
- **Memory Caps**: Desktop wrapper hard-caps VRAM allocations at 80% to prevent OS freezing.
- **CPU Quotas**: WebAssembly threads limited to `navigator.hardwareConcurrency - 1`.
- **Rate Limiting**: Free Tier constrained strictly by Upstash Ratelimit algorithms based on IP hash + Fingerprinting. 

## SECTION 8 — SECURITY HARDENING
- **API Key Isolation**: Encrypted at rest in `localStorage`, decrypted only within volatile RAM during a fetch invocation.
- **Sandboxing**: Local code execution models (Python tools) MUST run inside a lightweight WebAssembly sandbox (e.g., Pyodide) rather than naked OS evaluation. 
- **Model Integrity**: Downloaded weights require strict SHA-256 hash matching before instantiation to prevent supply chain poisoning.

## SECTION 9 — DEVELOPMENT WORKFLOW
- **Contributors**: Run `npm install` and `npm run dev` to boot the web shell.
- **CI/CD**: GitHub Actions enforce Prettier, ESLint, TypeScript compilation, and Playwright E2E testing on every PR.
- **Breaking Changes**: Banned in `/packages/core` unless version bumped 1.0 -> 2.0.

## SECTION 10 — FINAL QUALITY GATE
- **Remaining Risk**: Vercel Edge function timeout limits (10s on hobby, 60s on pro) can abort long Diffussion generations.
- **Accepted Risk**: We accept this by enforcing streaming architectures and moving long jobs entirely to async poll-based architectures if they exceed limits. 
- **Conclusion**: This architecture is rigorously buildable TODAY.
