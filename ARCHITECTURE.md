# NEXORA System Architecture

## 1. High-Level System Overview

NEXORA is engineered as a modern, unified digital ecosystem. It delivers 20 interconnected modules spanning enterprise work management, e-learning, digital commerce, community discussion, file storage, auditability, and artificial intelligence.

```
+---------------------------------------------------------------------------------------+
|                                    NEXORA CLIENT (SPA)                                |
|                                                                                       |
|  +---------------------------------------------------------------------------------+  |
|  |                           AppShell Layout Architecture                          |  |
|  |  +---------------------+ +---------------------------------------------------+  |  |
|  |  | Sidebar Navigation  | | Top Bar (Wordmark | Search | Theme | User Menu)   |  |  |
|  |  | (20 Grouped Modules)| +---------------------------------------------------+  |  |
|  |  |                     | | Viewport Router (Dashboard, Kanban, LMS, Forum...)  |  |  |
|  |  +---------------------+ +---------------------------------------------------+  |  |
|  +---------------------------------------------------------------------------------+  |
|                                                                                       |
|  +------------------------+ +--------------------------+ +-------------------------+  |
|  | Global State Container | | Inter-Module Event Bus   | | Command Palette (Cmd+K) |  |
|  | (React Context + Hooks)| | (Typed Pub/Sub Dispatch) | | (Omni-search Indexer)   |  |
|  +------------------------+ +--------------------------+ +-------------------------+  |
|                                                                                       |
|  +---------------------------------------------------------------------------------+  |
|  |                           Unified Data Layer (UDL)                              |  |
|  |  +------------------------+ +---------------------+ +------------------------+  |  |
|  |  |  Supabase REST Client  | | Local Storage Cache | | Memory / Seed Store    |  |  |
|  |  +------------------------+ +---------------------+ +------------------------+  |  |
|  +---------------------------------------------------------------------------------+  |
+------------------------------------------+--------------------------------------------+
                                           |
                                           v
+---------------------------------------------------------------------------------------+
|                                   BACKEND SERVICES                                    |
|                                                                                       |
|  +-----------------------+ +-------------------------+ +---------------------------+  |
|  | Express Proxy Server  | | Supabase / PostgreSQL   | | Gemini AI SDK (@google/genai)
|  | (Static & API Bridge) | | (RLS, Migrations, Auth) | | (Streaming & Copilot)     |  |
|  +-----------------------+ +-------------------------+ +---------------------------+  |
+---------------------------------------------------------------------------------------+
```

## 2. Key Architecture Pillars

### 2.1 Decoupled Modular Design
Each of the 20 modules operates through typed interfaces and domain services:
- **Authentication & RBAC**: Granular roles (`admin`, `manager`, `member`, `guest`) and capability gates.
- **Projects & Kanban**: Workspaces, sprint boards, cards, and subtasks with drag-and-drop state machines.
- **Learning Management System (LMS)**: Course catalog, syllabus hierarchy, lesson player, and certificate hashing.
- **Community & Forums**: Real-time topic feeds, threaded discussions, reactions, and moderator tools.
- **Digital Marketplace**: Product inventory, cart operations, transaction ledger, and asset delivery.
- **Storage & Files**: Virtual hierarchical file system, mime-type categorization, and storage quotas.
- **Gemini AI Assistant**: Multi-turn dialogue, context-aware prompt injection, and task execution tools.
- **Administration & Audit**: Real-time user activity monitor, immutable audit trail, and system configuration.

### 2.2 Unified Data Layer (UDL)
NEXORA features a dual-target data layer:
1. **Supabase & PostgreSQL**: When provisioned with Supabase credentials, the client synchronizes directly with PostgreSQL tables secured by Row Level Security (RLS) policies.
2. **Reactive Local Storage Fallback**: An in-browser database abstraction layer with reactive subscriptions and full CRUD capabilities, ensuring the application remains 100% operational offline or in evaluation environments.

### 2.3 Event-Driven Communication
Inter-module events (e.g., creating a task generates an activity log and notification) are decoupled via the `EventBus` (`src/lib/events.ts`). Modules publish standard events without direct coupling.

### 2.4 Design System & Anti-Slop Discipline
Adheres strictly to the Frontend Design Constitution:
- Zero-pill metadata discipline (no bordered candy badges for static timestamps or categories).
- 1-row, 3-zone Top Bar Contract with breadcrumbs and single-line tabs.
- Full 1440px viewport presence with high-density data tables.
- Tabular figures (`tabular-nums`) on all numeric values, timers, and statistics.
- WCAG AA contrast compliance and dual-theme (`light` / `dark`) pairing.
