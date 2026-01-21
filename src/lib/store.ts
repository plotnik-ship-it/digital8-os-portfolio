import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { generateUUID } from './utils';

export type TaskStatus = 'backlog' | 'todo' | 'in_progress' | 'done';
export type TaskPriority = 'urgent' | 'high' | 'medium' | 'low' | 'none';
export type TaskFilter = 'all' | 'urgent' | 'todo' | 'done';
export type ViewType = 'overview' | 'playground' | 'projects';

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  domain?: string;
  techStack?: string[];
  status?: 'operational' | 'development' | 'maintenance';
}

interface TaskStore {
  tasks: Task[];
  filter: TaskFilter;
  currentView: ViewType;
  selectedProjectId: string | null;
  isCommandPaletteOpen: boolean;
  isQuickCreateOpen: boolean;
  toastMessage: string | null;
  darkModeRingActive: boolean;
  addTask: (title: string) => void;
  toggleCommandPalette: () => void;
  setCommandPalette: (isOpen: boolean) => void;
  setQuickCreate: (isOpen: boolean) => void;
  updateTaskStatus: (id: string, status: TaskStatus) => void;
  setTaskPriority: (id: string, priority: TaskPriority) => void;
  setFilter: (filter: TaskFilter) => void;
  setCurrentView: (view: ViewType) => void;
  setSelectedProject: (projectId: string | null) => void;
  showToast: (message: string) => void;
  hideToast: () => void;
  deleteTask: (id: string) => void;
  setSearchQuery: (query: string) => void;
  setDarkModeRingActive: (active: boolean) => void;
  searchQuery: string;
}

// Mock data - 3 example tasks
const mockTasks: Task[] = [
  {
    id: generateUUID(),
    title: 'Finish landing page',
    status: 'in_progress',
    priority: 'urgent',
  },
  {
    id: generateUUID(),
    title: 'Fix CSS bugs',
    status: 'todo',
    priority: 'high',
  },
  {
    id: generateUUID(),
    title: 'Review pull requests',
    status: 'todo',
    priority: 'medium',
  },
];

export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: mockTasks,
      filter: 'all',
      currentView: 'overview',
      selectedProjectId: null,
      isCommandPaletteOpen: false,
      isQuickCreateOpen: false,
      toastMessage: null,
      darkModeRingActive: false,
      addTask: (title: string) => {
        // Immediate synchronous update - no delays, no async operations
        // Task appears in UI within 1 frame (<16ms) for Linear-like responsiveness
        const newTask: Task = {
          id: generateUUID(),
          title: title.trim(),
          status: 'todo',
          priority: 'none',
        };

        // Update state immediately - Zustand updates are synchronous
        set((state) => ({
          tasks: [newTask, ...state.tasks], // Add to beginning for better UX
        }));
      },
      toggleCommandPalette: () =>
        set((state) => ({
          isCommandPaletteOpen: !state.isCommandPaletteOpen,
        })),
      setCommandPalette: (isOpen: boolean) =>
        set({ isCommandPaletteOpen: isOpen }),
      setQuickCreate: (isOpen: boolean) =>
        set({ isQuickCreateOpen: isOpen }),
      updateTaskStatus: (id, status) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, status } : task
          ),
        })),
      setTaskPriority: (id, priority) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, priority } : task
          ),
        })),
      setFilter: (filter) =>
        set({ filter }),
      setCurrentView: (view) =>
        set({ currentView: view }),
      setSelectedProject: (projectId) =>
        set({ selectedProjectId: projectId }),
      showToast: (message) =>
        set({ toastMessage: message }),
      hideToast: () =>
        set({ toastMessage: null }),
      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
      setSearchQuery: (query) =>
        set({ searchQuery: query }),
      setDarkModeRingActive: (active) =>
        set({ darkModeRingActive: active }),
      searchQuery: '',
    }),
    {
      name: 'digital8-tasks-storage', // localStorage key
      partialize: (state) => ({
        tasks: state.tasks,
        filter: state.filter,
        currentView: state.currentView,
      }), // Persist tasks, filter, and currentView
    }
  )
);

// Selector for filtered tasks (includes search query)
// Always returns an array, never null or undefined
export const useFilteredTasks = () => {
  return useTaskStore((state) => {
    const { tasks, filter, searchQuery } = state;

    // Ensure tasks is always an array
    if (!Array.isArray(tasks)) {
      return [];
    }

    // First apply filter
    let filtered: Task[] = [];
    switch (filter) {
      case 'urgent':
        filtered = tasks.filter((task) => task.priority === 'urgent');
        break;
      case 'todo':
        filtered = tasks.filter((task) => task.status === 'todo');
        break;
      case 'done':
        filtered = tasks.filter((task) => task.status === 'done');
        break;
      case 'all':
      default:
        filtered = [...tasks]; // Create a copy to avoid mutation
    }

    // Ensure filtered is always an array
    if (!Array.isArray(filtered)) {
      filtered = [];
    }

    // Then apply search query if present
    if (searchQuery && searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter((task) =>
        task.title && task.title.toLowerCase().includes(query)
      );
    }

    // Always return an array, never null or undefined
    return Array.isArray(filtered) ? filtered : [];
  });
};
