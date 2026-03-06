# OMNIA: Architecture & Governance (2026 Standard)

## SECTION 1 — REPOSITORY STRUCTURE RULES
- **Core Repository (`omnia-core`)**: Contains ONLY the Orchestrator (Module 2), Plugin System interfaces (Module 3), and Local Runtime boundary (Module 6). No specific AI models or UI components live here.
- **Frontend Repository (`omnia-web`)**: Next.js App Router implementation of the UI.
- **Plugin Registries**: All models (Llama, Grok, GPT) MUST be implemented as independent NPM packages (e.g., `@omnia/plugin-llama-local`).
- **Forbidden**: Hardcoding model-specific API logic inside the core orchestrator.

## SECTION 2 — CONTRIBUTION MODEL
- **PR Review**: Requires 2 approvals from Core Maintainers. Automated CI must pass 100% (Typecheck, Lint, Resource Limits testing).
- **Breaking Changes**: Allowed only on major version bumps (e.g., v1.x.x to v2.x.x). Must include an automated migration CLI.
- **Model Plugins**: Community can publish plugins without approval. Core maintains a "Verified Plugin Registry" for trusted adapters.

## SECTION 3 — FUTURE ARCHITECTURE EVOLUTION
- **Change Absorption**: OMNIA uses an event-driven `ModelAdapter` interface. If a new AI paradigm emerges (e.g., "Agentic Swarms"), it is implemented as a new `Plugin` type, not a core refactor.
- **Hardware Evolution**: The `LocalRuntimeWorker` abstracts away WebGPU/NPU. As new accelerators emerge, only the worker bindings need updates, while the UI and Orchestrator remain untouched.

## SECTION 4 — LONG-TERM SUSTAINABILITY & PROJECT EXIT
- **Maintainer Exit**: A minimum "Bus Factor" of 5 is enforced. Root keys and registry publishing rights are secured via a multi-sig hardware wallet managed by the OMNIA Foundation.
- **Project Failure Guarantee**: The system is designed to gracefully degrade. If the centralized API/App fails, the "Sovereign Engine" (Local Mode) will continue to function indefinitely on user machines without requiring cloud authentication.
