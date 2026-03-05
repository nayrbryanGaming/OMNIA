# OMNIA - QA, SRE & OPEN SOURCE GOVERNANCE (2026)

## SECTION 1 — QUALITY ASSURANCE & RED-TEAM AUDIT
**Functional Bugs Checked:**
- **Race conditions**: Zustand state updates during rapid model switching.
- **Queue starvation**: Free tier users getting perpetually delayed by Premium influx. 
- **Fallback infinite loops**: Request bounces from Local -> Cloud -> API -> Local. (Patched via strict one-time fallback toggle flags in `orchestrator.ts`).

**Security Risks Addressed:**
- **API Key Leakage**: User keys appearing in Vercel logs. (Fix: Exclude headers from trace exporters).
- **Prompt Injection**: Handled at the model-layer, UI strictly separates system prompts from user input arrays.
- **Local Execution Escape**: Pyodide sandboxing ensures filesystem cannot be compromised.
- **Supply Chain**: Strict `.npmrc` lockfiles and dependency audits on `lucide-react`, `zustand`, `framer-motion`.

**User Error Scenarios:**
- **Wrong model selected**: UI defaults to 'Auto-detect' based on prompt semantic density.
- **Missing API Keys**: Graceful downgrade to Free Cloud.
- **Corrupt Model Files**: Desktop runtime checks SHA256 hashes on boot.

## SECTION 2 — SITE RELIABILITY ENGINEERING (SRE)
**Reliability Targets:**
- `Local`: 99.99% (Subject to user hardware).
- `Premium Cloud`: 99.95% (H100 clusters).
- `Free Cloud`: 98% (Subject to queue degradation).

**Observability:**
- **Metrics**: Token generation speed (t/s), Time to First Token (TTFT), Error rates per Adapter.
- **Traces**: Vercel APM utilized. 
- **FORBIDDEN**: The actual content payload (`messages.content`) is explicitly pruned from ALL traces.

**Incident Playbooks:**
1. **Cloud Outage**: Intercept 5xx errors -> Auto-trigger alert ribbon to users -> Reroute non-heavy tasks to Local fallback if hardware permits.
2. **Queue Overload**: Reject new incoming Free Cloud requests with a `429 Too Many Requests` + polite UI ("Cloud is full. Try Local GPU.") rather than stalling indefinitely.

## SECTION 3 — OPEN-SOURCE GOVERNANCE & RELEASE
**Repository Rules:**
- The core Orchestrator and Web Shell live in the main `nayrbryanGaming/OMNIA` repo.
- Experimental or highly specific model adapters (e.g., niche Medical LLMs) MUST be external plugins imported dynamically.

**Contribution Model:**
- PRs requiring breaking API changes must pass a 2-maintainer approval consensus and include an upgrade guide within `CHANGELOG.md`.

**Release Process:**
- Semantic Versioning exclusively.
- `alpha` tags deployed to preview URLs. `stable` pushed to `omnia.vercel.app`.

**Community Safety:**
- Strict Code of Conduct. Abuse of the OMNIA Free Cloud tier for generating illegal CSAM material results in instantaneous hardware-fingerprint bans, adhering strictly to global regulations while preserving privacy for innocent usage.

## SECTION 4 — LONG-TERM SUSTAINABILITY
- OMNIA will never inject ads into the UI.
- OMNIA will never silently swap open-source local models for closed-source telemetric ones.
- Funding is transparently supported by the Premium Cloud tier, subsidizing the open infrastructure.
