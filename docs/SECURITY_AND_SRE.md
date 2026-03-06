# OMNIA: Security, QA, & Site Reliability (SRE)

## SECTION 1 — PRIORITIZED BUG & RISK LIST (QA LEAD)

### BLOCKERS (Must Fix Before Global V1.0)
1. **Risk**: WebGPU Memory Leak in `LocalRuntimeWorker`.
   - **Scenario**: Continuous generation of 4K images or 128K context tokens locally causes browser crash.
   - **Fix**: Implement aggressive Javascript Garbage Collection hints and strict WebGPU buffer destruction in Module 6 after each `executeIsolated` call.
2. **Risk**: API Key Extraction via XSS.
   - **Scenario**: Malicious plugin or prompt injection executes payload to read `localStorage` API keys.
   - **Fix**: Move API keys from `localStorage` to an encrypted IndexedDB store unlocked only by a user PIN in the active session memory.

### ACCEPTABLE RISKS (Monitor in V1.0)
1. **Risk**: Free Cloud Queue Starvation.
   - **Scenario**: Millions of users requesting `FREE_CLOUD` delay responses to minutes.
   - **Fix**: Implemented strict rate limits (5 req/min, 20 req/day) and prioritized UI upselling to Premium. Accepted risk for free tier.

## SECTION 2 — RELIABILITY TARGETS
- **Local Mode**: 99.99% Availability (Depends entirely on user hardware limits).
- **Premium Cloud**: 99.9% Availability. Latency Budget: < 800ms Time-To-First-Token (TTFT).
- **Free Cloud**: 95% Availability. Expected queuing.

## SECTION 3 — INCIDENT PLAYBOOKS

### Scenario: Cloud API Provider Failure (e.g., OpenAI/Anthropic goes down)
- **Detection**: Orchestrator detects > 50% `5xx` errors from a specific plugin within 10 seconds.
- **Mitigation (Automated)**: Orchestrator triggers *Circuit Breaker*. Traffic is instantly routed to a redundant fallback provider (e.g., Grok API) or down-leveled to `LOCAL` mode seamlessly.
- **Communication**: UI updates the status indicator from Green (Active) to Amber (Degraded/Fallback in use). Log incident to public status page.

## SECTION 4 — OBSERVABILITY & CHAOS ENGINEERING
- **Metrics Collected**: TTFT (Time to first token), Fallback trigger counts, Model timeout rates.
- **NEVER LOGGED**: User prompts, User generated content, API Keys. Log payloads must be scrubbed of all PII at the Edge node before hitting central telemetry.
- **Chaos Tests**: Periodically run "Simulated GPU Failure" on client staging nodes to ensure the fallback mechanism to `FREE_CLOUD` activates without freezing the UI.
