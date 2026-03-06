# OMNIA: Frontend Engineering Handoff

This document serves as the absolute truth for frontend contributors building the OMNIA Unified Interface.

## 1. Final Folder Structure (Vercel Ready)
```text
omnia/
├── src/
│   ├── app/                 # Next.js App Router Pages
│   │   ├── (workspace)/     # AI Interaction surfaces
│   │   │   ├── chat/        # Text/Reasoning UI
│   │   │   └── canvas/      # Image/Media UI
│   │   ├── api/             # Vercel Edge API routes
│   │   ├── login/           # Authentication Gate
│   │   ├── globals.css      # Quantum Glassmorphism styles
│   │   ├── layout.tsx       # Root layout & providers
│   │   └── page.tsx         # Main Landing / Command Center
│   ├── components/
│   │   ├── shell/           # AppShell, Sidebar, Topbar
│   │   ├── ui/              # Buttons, Modals, Inputs
│   │   └── domain/          # ModelSelector, ModeBadge
│   ├── lib/                 # Core Architecture modules
│   │   ├── orchestrator/    # Module 2: AI Routing Logic
│   │   ├── plugins/         # Module 3: Model Adapters
│   │   └── runtime/         # Module 6: WebGPU Isolation
│   ├── store/
│   │   └── useOmniaStore.ts # Zustand global state
│   └── types/               # Module 1: Core Contracts
```

## 2. Component Naming Conventions
- **PascalCase** for all React components (e.g., `ModelSelector.tsx`).
- **camelCase** for hooks (e.g., `useOmniaStore.ts`) and utility functions (e.g., `formatTokens.ts`).
- **Domain Prefixing** where applicable to prevent collisions (e.g., `AuthButton.tsx`, `ChatBubble.tsx`).

## 3. Page Routing Map
- `/` - Main Command Center (Intelligent routing to workspaces).
- `/login` - Identity Verification.
- `/chat` - Reasoning & Multi-turn conversations.
- `/canvas` (Planned) - Infinite canvas for Image/Video generation workflows.
- `/settings` (Planned) - Local hardware assignment & API key vault.

## 4. README Snippet for Frontend Contributors
```markdown
### 🎨 Frontend Contribution Guidelines

We use **Next.js (App Router)** and **Tailwind CSS**. 
Our design philosophy is "Quantum Glassmorphism".

1. **Static First**: Attempt to make components SSR compatible unless they rely on `window` (like WebGPU).
2. **State**: Use `Zustand` for global state (Theme, Auth, Model Selection). Use React `useState` for highly localized component state.
3. **Never store API keys in plain text localStorage**. Keys must be encrypted before hitting IDB or localStorage.
4. **Vercel Deployments**: Ensure all new API routes edge-compatible by exporting `export const runtime = 'edge';`.
```
