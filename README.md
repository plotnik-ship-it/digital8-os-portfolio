# Digital8 OS

**High-performance task management with Linear-inspired UX**

🌐 **Live at:** [https://os.digital8.ca](https://os.digital8.ca)

---

## Why Digital8 OS?

Digital8 OS is a **Design Engineering showcase** that demonstrates what high-performance task management looks like when every interaction is optimized for speed and delight. Built with a focus on:

- **60fps interactions** — Every animation runs at a consistent 60 frames per second
- **Optimistic UI** — Updates appear instantly (<16ms) for that Linear-like responsiveness
- **Keyboard-first workflow** — Power users can navigate and execute actions without touching the mouse

This project represents Digital8's approach to building software that feels fast, responsive, and premium.

---

## Tech Stack

- **Next.js 15+** — App Router & React Compiler for optimal performance
- **Zustand** — Lightweight state management with middleware persist for localStorage
- **Framer Motion** — Shared layout animations for smooth task transitions
- **CMDK** — Command palette experience inspired by Linear and Raycast
- **Tailwind CSS** — Utility-first styling with custom Digital8 design tokens
- **TypeScript** — Full type safety across the application

---

## Key Features

### 🎯 Command Palette (Cmd+K / Ctrl+K)

Seamless navigation and action execution through a beautiful command palette interface. Search, create, and manage tasks with keyboard shortcuts.

### ⌨️ Single-Key Shortcuts

- **`C`** — Quick create a new task
- **`A`** — Filter by All tasks
- **`U`** — Filter by Urgent priority
- **`D`** — Filter by Done tasks
- **`Esc`** — Close any open modal

### ⚡ Optimistic Updates

Immediate UI feedback on task completion and deletion. Tasks appear in the list within a single frame (<16ms) for that instant, responsive feel.

### 🎨 Reward Animations

Completing a task triggers a delightful animation sequence:
- Circle pulses in Digital8 neon yellow (#e2ff3b)
- Text dims and strike-through slides from left to right
- Subtle audio feedback for completion

### 💾 Persistent State

All tasks and their states are automatically saved to localStorage. Your progress persists across browser refreshes.

### 🔍 Real-Time Search

Search through tasks as you type. The command palette input connects directly to the store for instant filtering.

---

## Branding

Digital8 OS integrates seamlessly with the Digital8 visual identity:

- **Background:** Pure black (#000000)
- **Accent:** Neon yellow (#e2ff3b) for highlights and interactions
- **Typography:** Clean sans-serif (Inter/Geist) for that premium feel
- **Borders:** Subtle gray-800 for a high-end, minimal aesthetic

---

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Project Structure

```
src/
├── app/              # Next.js App Router pages and layout
├── components/       # React components
│   ├── CommandPalette.tsx
│   ├── FilterBar.tsx
│   ├── QuickCreateTask.tsx
│   └── TaskList.tsx
├── lib/
│   ├── store.ts      # Zustand store with persist middleware
│   ├── utils.ts      # Utility functions (UUID generation)
│   └── sounds.ts     # Audio feedback for interactions
└── hooks/
    └── useGlobalShortcuts.ts  # Keyboard shortcut handling
```

---

## License

© 2024 Digital8. All rights reserved.

---

**Built with precision by Digital8 Design Engineering**
