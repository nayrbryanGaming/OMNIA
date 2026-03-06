# OMNIA

The unified intelligence layer.

OMNIA is an open-source, sovereign, and modular platform designed to orchestrate all AI models, modalities, and execution environments through a single, highly optimized interface.

## Architecture

Our foundation relies on strict decoupling of interface, orchestration, and compute:
- **Universal Orchestration**: Fluid routing across local self-hosted models, shared cloud queues, premium APIs, and user-provided API keys.
- **Modality Agnostic**: Unified control plane for text, image, audio, and video generation.
- **Local-First Trust**: By default, compute is sovereign. Data never leaves the client unless explicitly routed to external APIs.

## Deployment

OMNIA is architected for edge deployment on Vercel with zero cold-start overhead for the core UI.

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## System Requirements

- Node.js 20+
- Vercel CLI (for deployment)
- Optional: Required hardware for local inference capabilities (16GB RAM minimum for 7B parameter models).

## Security & Privacy

OMNIA maintains a strict client-side boundary for API keys. We do not store, log, or proxy your credentials through our backend unless explicitly configured for shared cloud features. All proprietary API communication happens directly from the client to the provider or via secure serverless functions.

---

**OMNIA Foundation** | Distributed under Apache 2.0.
