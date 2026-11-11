# NEXORA Testing Strategy & Verification Guidelines

## 1. Testing Philosophy

Every feature in NEXORA is backed by verified functionality. We employ a three-tier testing strategy:
1. **Type Safety & Static Analysis**: Strict TypeScript configuration (`tsc --noEmit`), ESLint syntax rules, and complete domain typing.
2. **Component & Integration Testing**: In-app automated test harness that exercises business logic, reactive stores, event bus messaging, and RBAC permission checks in real time.
3. **End-to-End Simulation**: Live interactive verification flows across all 20 modules without mock stubs or dead clicks.

## 2. In-App Automated Test Suite

NEXORA includes a built-in automated test runner accessible from the developer utility panel:
- **Auth & Session Tests**: Password validation, role switching, token expiration handling, and permission gates.
- **Data Persistence Tests**: LocalStorage serialization, database repository CRUD, optimistic locking, and conflict resolution.
- **Event Bus Tests**: Decoupled pub/sub messaging, wildcard listener handling, and subscriber cleanup.
- **Search Engine Tests**: Omni-search tokenization, relevance scoring, and category grouping.
- **Kanban Engine Tests**: Card movement between columns, order index preservation, and status syncing.
- **AI Integration Tests**: Prompt payload formatting, context injection, and response parsing.

## 3. Manual Verification Checklist

Before any commit is finalized:
- [x] Responsive layout tested on 1440px desktop baseline and mobile viewports.
- [x] Top Bar Contract verified (3 zones, single line, no duplicate badges).
- [x] Zero-pill metadata verified (clean typographic separators, no candy boxes for static tags).
- [x] Light / Dark mode contrast tested with `@custom-variant dark`.
- [x] All numeric figures formatted with tabular numbers (`tabular-nums`).
- [x] Zero console errors or unhandled promise rejections.
