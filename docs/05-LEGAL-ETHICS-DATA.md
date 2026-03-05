# OMNIA - LEGAL, ETHICS, DATA & FUTURE ARCHITECTURE

## SECTION 1 — LEGAL COMPLIANCE & LICENSING
**Open-Source License Matrix:**
- OMNIA core is licensed under **Apache 2.0**. It grants users commercial use, modification, and distribution rights while requiring explicit attribution.
- **Forbidden Licenses**: OMNIA plugins cannot rely on aggressively copyleft licenses (e.g., AGPL) if they intermix inextricably with the Apache 2.0 core environment, preventing ecosystem legal contamination.

**Closed-Source API Compliance:**
- The Orchestrator treats OpenAI / Anthropic APIs purely as ephemeral endpoints. We enforce zero data-retention guarantees on the OMNIA proxy side, fulfilling GDPR "Data Processor" requirements locally.
- **Provider ToS**: Users checking the "I agree" box when entering a third-party API key absolve OMNIA of provider-side terms violations (e.g., using GPT-4 to generate code for a competitor).

## SECTION 2 — RESPONSIBLE AI & USER TRUST
**User Transparency:**
- **Clear Signals**: The UI explicitly displays a visual icon denoting execution mode on every output bubble. (e.g., User sees exactly if an answer came from their Local RTX 4090 or from a Cloud Server).
- **Cost Honesty**: When bypassing Free Tier, API cost expenditures are tabulated locally and shown transparently.

**Ethical Boundaries**:
- OMNIA acts as the medium, not the moral arbiter. While the *Free Cloud* tier possesses standard safety filters, the *Local Mode* refuses to enforce DRM or censorship architectures on open weights executing on sovereign hardware. User hardware, user rules.

## SECTION 3 — DATA ARCHITECTURE & USER MEMORY
**Memory Types**:
- **Session Memory**: In-RAM array storing the active context window. Wiped on tab refresh.
- **Long-Term Memory**: (Future feature) RAG-based context injection stored in IndexedDB.
- **Project Memory**: Sandboxed metadata linked strictly to the `/workspace` ID.

**Storage Guarantees**:
- OMNIA NEVER syncs chat history to the cloud unless the user explicitly activates the E2EE (End-to-End Encrypted) sync module. The default is 100% device-bound state.

## SECTION 4 — FUTURE ARCHITECTURE (EVOLUTION GUARD)
**Change Absorption**:
- The `ModelRegistry` pattern allows OMNIA to absorb entire new AI paradigms (e.g., multi-agent swarms, non-transformer state space models) without touching the React UI. The adapter normalizes the future into the `AIResponse` standard interface.
- **Hardware Evolution**: If Apple Silicon NPU paradigms or localized Edge servers replace generalized GPUs, OMNIA merely adds an `NPUAdapter` execution layer.

## SECTION 5 — ETHICAL STEWARDSHIP (DEATH OF THE PROJECT)
**Maintainer Exit Plan**:
- If the OMNIA Foundation dissolves, the Apache 2.0 license guarantees the community can fork entirely.
- The `Free Cloud` backend endpoints will open-source their Dockerfiles ensuring the infrastructure can be mirrored by anyone.
- **Non-Negotiable Promise**: OMNIA guarantees UI and Local Mode will forever function regardless of OMNIA's corporate state. There are no proprietary backend 'heartbeat' checks locking the local software. 

*Designed for a good death, not just success.*
