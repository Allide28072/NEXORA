# NEXORA — The Complete Digital Ecosystem

[![License: Apache-2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict_7.0-blue)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4.0-38bdf8)](https://tailwindcss.com/)
[![Gemini AI](https://img.shields.io/badge/Gemini_AI-2.5_Flash-orange)](https://ai.google.dev/)
[![300 Tasks Challenge](https://img.shields.io/badge/Contributions-300_Tasks_Roadmap-emerald)](#)

**NEXORA** is a multi-system enterprise digital platform engineered for modern teams. It integrates 20 foundational modules into a unified, high-performance web application designed with the **Universal Frontend Design Constitution** and enterprise architectural patterns.

---

## 20 Integrated Modules

1. **Authentication & Authorization**: Full RBAC matrix (Admin, Manager, Member, Guest), session token manager, demo role switcher.
2. **User Profile Management**: Bios, skills tagger, avatars, security settings, preferences.
3. **Advanced Dashboard & Analytics**: Executive overview, velocity charts, KPI cards with tabular numerals, live activity streams.
4. **Project Management**: Workspaces, milestones, project creation, status lifecycles.
5. **Task & Workflow Management**: Full Kanban board with column transitions, task creation, subtask checklists.
6. **Learning Management System (LMS)**: Course catalog, syllabus hierarchy, interactive lesson player.
7. **Course & Certificate Management**: Knowledge check quizzes, verified certificate credential generation.
8. **Community & Discussion Forums**: Categorized channels, discussion threads, nested comment trees.
9. **Posts, Comments & Reactions**: Rich text formatting, emoji reaction toggles, thread views.
10. **Digital Marketplace**: Digital assets catalog, shopping cart drawer, checkout simulator, license keys.
11. **File Management & Storage**: Hierarchical virtual folder explorer, file previewer, storage quota breakdown.
12. **Real-Time Notifications**: Unread badges, notification center drawer, instant event alerts.
13. **AI-Powered Assistant**: Gemini AI model integration (`gemini-2.5-flash`), contextual prompt injection, task generation tools.
14. **Administrative Management**: User management table, role assigner, system health probes.
15. **User Activity Monitoring**: Real-time user session status and activity telemetry.
16. **Audit Logs**: Append-only compliance audit trail with severity filtering and CSV export.
17. **Reporting & Analytics**: Cohort tables, revenue charts, completion funnels, export to CSV/JSON.
18. **Search & Filtering**: Global command palette (`Cmd+K` / `Ctrl+K`), omni-search indexing all 20 modules.
19. **Application Settings**: Platform configuration, feature flags, security policies, backup controls.
20. **Security & Permission Management**: Granular capability gates, input sanitization, CSRF tokens.

---

## Architecture & Technology Stack

- **Frontend**: React 19, TypeScript (strict), Tailwind CSS v4, Lucide React icons, Motion animations.
- **Backend & Persistence**: Supabase REST Client + LocalStorage reactive persistence fallback with relational schemas.
- **AI Engine**: `@google/genai` TypeScript SDK with server-side proxy integration.
- **Design System**: Zero-pill metadata discipline, 1-row Top Bar Contract, 1440px desktop baseline, dark/light theme pairing.

---

## 300+ Genuine Development Challenge

NEXORA tracks 300 distinct, independently verifiable development tasks across 10 progressive phases. Inspect the in-app **Development Roadmap & Task Tracker** and **Git Commit History Viewer** to monitor completed work and verification tests in real time!

### Phases
- **Phase 1**: Project Foundation & Architecture (Tasks 001–030)
- **Phase 2**: UI & Design System (Tasks 031–060)
- **Phase 3**: Authentication & Authorization (Tasks 061–090)
- **Phase 4**: Database Architecture & Supabase (Tasks 091–120)
- **Phase 5**: Advanced Dashboard & Analytics (Tasks 121–150)
- **Phase 6**: Main Application Modules (Tasks 151–210)
- **Phase 7**: Gemini AI Integration (Tasks 211–235)
- **Phase 8**: Administration & Audit Logs (Tasks 236–260)
- **Phase 9**: Security, Search & Performance (Tasks 261–285)
- **Phase 10**: Documentation & Deployment (Tasks 286–300)

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run linting & TypeScript verification
npm run lint

# Build production bundle
npm run build
```
