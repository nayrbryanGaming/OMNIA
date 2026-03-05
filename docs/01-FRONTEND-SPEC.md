# OMNIA - FRONTEND ARCHITECTURE & UX SPECIFICATION (2026)

## SECTION 1 — DESIGN PHILOSOPHY (UI/UX)
- **Visual Identity Principles**: OMNIA embraces a "Dark-First, Glassmorphic, High-Signal" aesthetic. It removes all cognitive friction. It feels like an integrated, sovereign operating system.
- **Color System**: Base background (`--color-obsidian` #050507), Surfaces (`--color-surface` #111111), Brand accents: Cyan (#06b6d4) and Blue (#3b82f6) for neutral, highly professional hints. Text is high-contrast off-white (`#ECECEC`).
- **Typography Hierarchy**: `Inter` for data density and UI controls; `Outfit` (or similar geometric sans) for cinematic headers. No exceptions.
- **Motion & Feedback**: Sub-second responsiveness. Page transitions utilize CSS hardware acceleration. Spring physics (via Framer Motion) are used for modal interactions to feel grounded and physical.
- **Accessibility Principles**: WCAG 2.1 AA compliant. High contrast ratios. Keyboard-first navigation (cmd/ctrl K to focus chat, arrows to navigate models). Aria-live regions for AI streaming responses.

## SECTION 2 — APP LAYOUT SYSTEM
- **Global Layout**: 
  - **Sidebar (Collapsible)**: Workspace selector, Model Manager, API Keys, Settings.
  - **Topbar**: Active mode indicator (Local/Cloud), Hardware status (RAM/VRAM), Connection ping.
  - **Workspace (Main Pane)**: Intent-driven canvas. Switches dynamically between Chat, Canvas (Image), and Timeline (Audio/Video).
- **Responsive Behavior**: 
  - Desktop: Full sidebar + right-side inspector.
  - Tablet: Collapsed sidebar (icon only).
  - Mobile: PWA-first bottom navigation bar. Workspace fills 100% height minus inputs.
- **Multi-pane Logic**: Support for split-screen context views (e.g., PDF viewer on left, chat on right).

## SECTION 3 — CORE UI SCREENS
- **Landing Page**: Pitch and category selection.
- **Main Dashboard**: Quick start "What do you want to build?" (Reasoning, Code, Image...)
- **Chat Workspace**: Infinite-scroll chat with streaming markdown, syntax highlighting, and inline tool-use renders.
- **Media Workspaces**: Canvas approach. Generative fills, history gallery, and export tools.
- **Model Selector**: Overlay or dropdown categorizing models by size, type (Open vs Closed), and requirements.
- **Execution Mode Selector**: Toggle switch for Local GPU vs Cloud Queue vs API Key.
- **Settings/API Key Manager**: Secure vault (client-side encrypted) for storing LLM provider keys.

## SECTION 4 — MODEL & MODE SELECTION UX
Mode selection is front and center.
- **Local (Shield Icon)**: "Zero cost, Total Privacy. Requires 8GB VRAM."
- **Free Cloud (Cloud Icon)**: "Queue based, rate-limited. Good for testing."
- **Premium Cloud (Lightning Icon)**: "Priority access to H100 clusters."
- **API Key (Key Icon)**: "Bring your own key, pay provider directly."
*Visual cost indicators* ($/1k tokens) are displayed next to the model name before selection.

## SECTION 5 — FRONTEND STATE ARCHITECTURE
- **Global State**: Managed by Zustand. Holds current session, selected model, selected mode, and active category.
- **Persistence Rules**: API keys and preferences are stored in `localStorage` using AES client-side encryption. Chat history uses IndexedDB (Dexie).
- **NEVER Stored**: The frontend *never* stores unencrypted PII, nor does it hold machine learning weights directly in RAM beyond what WebGPU/WASM explicitly requires in isolated contexts.

## SECTION 6 — FRONTEND ↔ BACKEND CONTRACT
- **API Style**: REST/Fetch with Server-Sent Events (SSE) for streaming text.
- **Required Endpoints**: `/api/jobs/submit`, `/api/jobs/status`, `/api/models/list` (Control plane only).
- **Error Normalization**: All errors return `{ error: { code, message, shouldRetry } }`.
- **Retry Logic**: Exponential backoff with jitter on network failures. Immediate abort on 401/403.

## SECTION 7 — PERFORMANCE & UX OPTIMIZATION
- **Vercel Edge**: App Router leverage with static shells. Dynamic generation restricted to API routes.
- **Code Splitting**: Heavy markdown parsers (remark/rehype) and syntax highlighters (Prism/Highlight.js) are strictly dynamically imported.
- **Skeleton UI**: Instant perceived load times while Hydration finishes. No cumulative layout shift (CLS).

## SECTION 8 — SECURITY & SAFETY
- **API Key Rules**: Pushed into headers immediately on request, never serialized into logs.
- **XSS Prevention**: Strict DOMPurify sanitization before rendering AI-generated markdown/HTML.
- **Guarantees**: "Local Mode" physically cuts outgoing network requests in the Service Worker.

## SECTION 9 — VERCEL DEPLOYMENT
- **Folder Structure**: `/src/app`, `/src/components`, `/src/lib`, `/src/store`.
- **Edge Rule**: Middleware and auth logic runs on Vercel Edge.
- **Env Strategy**: STRICT separation of `NEXT_PUBLIC_` and secret variables. 

## SECTION 10 — HANDOFF READY OUTPUT
- **Components Conventions**: Atomic design. `ui/` for dumb components, `shell/` for layouts, `views/` for complete screens.
- **Routing**: `/` (Dash), `/chat` (Text), `/canvas` (Images).
