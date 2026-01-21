import { create } from 'zustand';

export type TaskStatus = 'backlog' | 'todo' | 'in-progress' | 'done';
export type TaskPriority = 'no-priority' | 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
}

interface TaskStore {
  tasks: Task[];
  isCommandPaletteOpen: boolean;
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTask: (id: string, updates: Partial<Omit<Task, 'id'>>) => void;
  deleteTask: (id: string) => void;
  setCommandPaletteOpen: (isOpen: boolean) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  isCommandPaletteOpen: false,
  addTask: (task) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        {
          ...task,
          id: crypto.randomUUID(),
        },
      ],
    })),
  updateTask: (id, updates) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, ...updates } : task
      ),
    })),
  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
  setCommandPaletteOpen: (isOpen) =>
    set({ isCommandPaletteOpen: isOpen }),
}));
