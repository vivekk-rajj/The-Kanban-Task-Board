# The-Kanban-Task-Board

This repository now contains a Vite + React implementation of a Kanban-style task board.

Features implemented:
- Phase 1 (P0): Add tasks, delete tasks, move tasks (buttons) — all state-driven using React useState.
- Phase 2 (Priority 1): Inline editing (double-click a task), priority selector (High/Medium/Low) with conditional CSS, state persistence using localStorage.
- Phase 3 (Priority 2): Drag-and-drop between columns using dnd-kit, and a global search input to filter tasks in real-time.

How to run locally:

1. Install dependencies

```bash
npm install
```

2. Start dev server

```bash
npm run dev
```

Notes:
- The board state is saved to localStorage under the key `kanban_board_v1`.
- Drag-and-drop is implemented with `@dnd-kit`; move buttons are kept for quick keyboard access.

If you'd like TypeScript instead or different styling (Tailwind), tell me and I can convert.
