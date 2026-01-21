import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Sidebar } from '../components/Sidebar';
import { Overview } from '../components/Overview';
import { TaskList } from '../components/TaskList';
import { FilterBar } from '../components/FilterBar';
import { ProjectsView } from '../components/ProjectsView';
import { CommandPalette } from '../components/CommandPalette';
import { QuickCreateTask } from '../components/QuickCreateTask';
import { Toast } from '../components/Toast';
import { useGlobalShortcuts } from '../hooks/useGlobalShortcuts';
import { useTaskStore } from '../lib/store';
import { motion, AnimatePresence } from 'framer-motion';

const viewTitles: Record<string, string> = {
  overview: 'Welcome',
  playground: 'Playground',
  projects: 'Engineering Portfolio',
};

export default function Page() {
  // Initialize global keyboard shortcuts
  useGlobalShortcuts();
  const { currentView = 'overview', darkModeRingActive = false } = useTaskStore();
  const title = viewTitles[currentView] || 'Tasks';

  // Mobile menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-pure-black text-white overflow-hidden relative">
      {/* Dark Mode Ring Animation */}
      <AnimatePresence>
        {darkModeRingActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 pointer-events-none z-50"
            style={{
              boxShadow: 'inset 0 0 100px 2px rgba(226, 255, 59, 0.4), inset 0 0 200px 4px rgba(226, 255, 59, 0.2)',
            }}
          />
        )}
      </AnimatePresence>

      {/* Mobile Header Bar - Only visible on mobile */}
      <header className="md:hidden fixed top-0 left-0 w-full z-40 bg-black border-b border-gray-800">
        <div className="flex items-center gap-3 px-4 py-3">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 rounded-md bg-sidebar border border-gray-800 text-white hover:bg-black/30 transition-colors"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
          <div className="font-bold text-lg text-[#e2ff3b]">Digital8</div>
        </div>
      </header>

      <Sidebar
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <main className="flex-1 overflow-y-auto ml-0 md:ml-64 pt-16 md:pt-0">
        <div className="max-w-6xl mx-auto p-6 md:p-12">
          {currentView === 'overview' ? (
            <Overview />
          ) : currentView === 'projects' ? (
            <>
              <h1 className="text-3xl font-semibold mb-8 text-white">{title}</h1>
              <ProjectsView />
            </>
          ) : (
            <>
              <h1 className="text-3xl font-semibold mb-8 text-white">{title}</h1>
              <FilterBar />
              <TaskList />
            </>
          )}
        </div>
      </main>
      <CommandPalette />
      <QuickCreateTask />
      <Toast />
    </div>
  );
}
