# OMNIA - SYSTEM ARCHITECTURE & PRODUCT VISION (2026)

## SECTION 1 — PRODUCT DEFINITION
- **Product Name**: OMNIA (The Sovereign AI Operating System)
- **Value Proposition**: "All the world's intelligence, accessible through a single, sovereign command center."
- **Target Users**: Ranging from privacy-conscious beginners (WebGPU local models), to developers (API integrations), to power users (Premium Cloud access).
- **Core Problem Solved**: Eliminating vendor lock-in, fragmenting UI subscriptions, and data harvesting by combining all modalities (Text/Image/Audio/Video) under one Bring-Your-Own-Compute (BYOC) interface.
- **Competitive Positioning**: Unlike ChatGPT/Claude (walled gardens), OMNIA is a unified aggregator that shifts the control plane explicitly to the user.

## SECTION 2 — AI ORCHESTRATION LOGIC (CRITICAL)
- **Intent Detection**: The Orchestrator intercepts prompts and defaults to the user's selected category. It optionally uses a rapid, lightweight local semantic router to suggest better tools.
- **Routing**: `User Request -> Frontend State -> ModelRegistry -> Target Execution Adapter -> Return Stream`.
- **Fallback Hierarchy**: Local GPU Engine -> Free Cloud Queue -> User API Key -> Failure. (Never silently charge Premium credits).
- **Resource Limits**: Configured in state. If payload exceeds maxTokens, UI truncates client-side before submission.
- **Multi-Model Pipelines**: Supported via chaining adapters (e.g., LLM reasoning output pipes directly into Diffusion Image generation parameters).

## SECTION 3 — MODEL ECOSYSTEM
**LLM / Reasoning**:
- Local/Open: Llama-3 (8B/70B quant), Mistral Nemo (Requires 8GB-16GB VRAM)
- API/Closed: GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro
**Image Generation**:
- Local/Open: Stable Diffusion XL / Flux.1-schnell (Requires 10GB VRAM)
- API/Closed: Midjourney (via external API patterns), DALL-E 3
**Audio/Video**:
- Local/Open: Whisper (STT), Bark (TTS), CogVideoX
- API/Closed: ElevenLabs, Runway Gen-3

## SECTION 4 — EXECUTION MODES
1. **LOCAL MODE (Self-Hosted)**
   - **Compute**: User hardware (WebGPU / Local binary fallback).
   - **Privacy**: Absolute 100%. Data never leaves `localhost`.
   - **Failure**: Fails instantly if VRAM is exceeded. Offers fallback to Cloud.
2. **FREE CLOUD MODE**
   - **Compute**: OMNIA Foundation shared GPU pool.
   - **Privacy**: No retention. Logs purged after 1 hour.
   - **Limits**: Strict strict queueing. Low priority.
3. **PREMIUM CLOUD MODE**
   - **Compute**: Dedicated scalable H100 clusters.
   - **Priority**: Queue bipass, ultra-low latency. 
4. **API KEY MODE (BYOK)**
   - **Compute**: Third-party providers (OpenAI, Anthropic).
   - **UX**: User inputs key. OMNIA wraps the network request. User owns the billing.

## SECTION 5 — BACKEND ARCHITECTURE
- **API Gateway**: Edge-optimized proxy built on Vercel Edge Runtime. Strips internal headers, validats auth.
- **Auth System**: NextAuth (Stateless JWT).
- **Job Queue**: Upstash Redis for distributing long-running tasks strictly outside the Vercel 10s timeout constraint.
- **Model Registry**: Centralized constant mapping adapter IDs to capabilities.
- **Security Boundaries**: The Vercel execution environment MUST NOT have access to the bare-metal GPU clusters directly except via hardened mTLS gRPC endpoints.

## SECTION 6 — CROSS-PLATFORM STRATEGY
- **One Codebase**: Next.js App Router forms the core.
- **Web**: Deployed via Vercel (Primary access point).
- **Desktop**: Wrapped using **Tauri** (Rust core) to provide OS-level file system access and deep local GPU integration that standard browsers block.
- **Mobile**: Capacitor or PWA, prioritizing offline-first model caching (e.g., MLC-LLM WebGPU).

## SECTION 7 — MVP ROADMAP
- **Phase 0**: Core Architecture, Vercel CI/CD, Frontend Shell *[COMPLETE]*.
- **Phase 1**: Text Modality (Local API + Cloud API bindings) *[CURRENT]*.
- **Phase 2**: Image & Audio Support, Tauri Desktop wrapper.
- **Phase 3**: Premium Cloud integration, Multi-agent pipelines, 1.0 Release.
