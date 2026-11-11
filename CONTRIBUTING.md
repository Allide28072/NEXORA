# Contributing to NEXORA

Thank you for participating in the **NEXORA 300+ Genuine GitHub Contributions Development Challenge**!

## 1. Core Contribution Rules

1. **Every contribution must represent actual work**: No empty commits, duplicate commits, or artificial metric manipulation.
2. **Quality Gates**: All code must pass `npm run lint` and TypeScript compilation (`compile_applet`) before committing.
3. **Task Tracking**: Every commit maps to a documented task in `DEVELOPMENT_ROADMAP.md` and `TASK_TRACKER.md`.

## 2. Conventional Commit Guidelines

We use conventional commit messages with descriptive scopes:

- `feat: add authentication system and role switcher`
- `fix: resolve dashboard velocity chart tooltip alignment`
- `docs: update database schema documentation and ERD`
- `test: implement automated test runner for storage layer`
- `refactor: extract reusable table component with tabular numerals`
- `style: optimize responsive sidebar for high-density viewports`
- `perf: add memoization to project filter engine`
- `chore: configure tailwind dark mode custom variant`

## 3. Branching & PR Workflow

- `main`: Production-ready, fully verified stable branch.
- Feature branches: `feat/<task-id>-<description>` (e.g., `feat/task-001-git-init`).
- Hotfixes: `fix/<task-id>-<description>`.
