# OMNIA: Compliance, Ethics, & Data Architecture

## SECTION 1 — OPEN-SOURCE LEGAL & COMPLIANCE
- **Core License**: Apache 2.0. Ensuring enterprise usage without restrictive copyleft requirements, facilitating mass adoption.
- **Model Compliance**: The UI explicitly flags models with non-commercial usage restrictions (e.g., Llama 3 Community License). Users must "Agree" via a modal before utilizing restricted models for local inference.
- **API Key Ownership**: OMNIA acts ONLY as a pass-through client. User API keys are never transmitted to our telemetry servers.

## SECTION 2 — RESPONSIBLE AI & USER TRUST
- **Radical Transparency**: The UI always displays exactly which hardware is running the current inference. If a local request falls back to the cloud, the user is visibly notified and must confirm the data transmission.
- **No Censorship Guardrails (At Core Level)**: As an OS-level orchestrator, OMNIA does not inject hidden system prompts to enforce political or moral alignment. Trust is placed entirely in the user and the downstream model provider (who enforce their own safety layers).
- **Abuse Prevention**: Rate limits on `FREE_CLOUD` are enforced via ephemeral browser fingerprinting and Edge-level IP hashing to prevent bot-net exploitation without requiring invasive user tracking.

## SECTION 3 — USER MEMORY DESIGN
OMNIA implements a "Sovereign Memory Architecture":
1. **Session Memory**: In-RAM only. Cleared entirely on browser refresh.
2. **Local Long-Term**: Stored explicitly on the user's hard drive (IndexedDB / LocalFileSystem API).
3. **Cloud Memory (Opt-In)**: Fully End-to-End Encrypted (E2EE) before leaving the client. The OMNIA foundation has zero-knowledge of user projects or chat histories.

## SECTION 4 — NON-NEGOTIABLE PROMISES
- We will never silently read your local files.
- We will never sell telemetry data to advertising networks.
- The `LOCAL` execution mode will forever remain free and unrestrained by paywalls.
