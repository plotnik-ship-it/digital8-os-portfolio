import { motion, AnimatePresence } from 'framer-motion';
import { Home, Zap, Folder, X } from 'lucide-react';
import { useTaskStore, type ViewType } from '../lib/store';

interface SidebarProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export function Sidebar({ isMobileMenuOpen, setIsMobileMenuOpen }: SidebarProps) {
  const { currentView = 'overview', setCurrentView, tasks = [] } = useTaskStore();
  const taskCount = Array.isArray(tasks) ? tasks.length : 0;

  const navItems: { id: ViewType; label: string; icon: typeof Home; badge?: number }[] = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'playground', label: 'Playground', icon: Zap, badge: taskCount },
    { id: 'projects', label: 'Projects', icon: Folder },
  ];

  const handleNavClick = (viewId: ViewType) => {
    setCurrentView(viewId);
    // Close mobile menu when navigation item is clicked
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Overlay Backdrop */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="md:hidden fixed inset-0 bg-black/60 z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 w-64 h-screen border-r border-gray-800 bg-sidebar z-50
          transition-transform duration-300 ease-in-out
          md:translate-x-0
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="p-6">
          {/* Header with Close Button (Mobile Only) */}
          <div className="mb-8 flex items-center justify-between">
            <div className="font-bold text-xl text-[#e2ff3b]">Digital8</div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="md:hidden p-1 rounded-md text-gray-400 hover:text-white hover:bg-black/30 transition-colors"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;

              return (
                <motion.button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  whileHover={{ scale: 1.02, x: 4 }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors ${isActive
                    ? 'text-accent bg-black/30 border-l-2 border-accent'
                    : 'text-gray-400 hover:text-white hover:bg-black/30'
                    }`}
                >
                  <Icon size={18} />
                  <span className="text-sm font-medium flex-1">{item.label}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="px-1.5 py-0.5 rounded-full text-xs font-medium bg-accent text-black min-w-[18px] text-center"
                    >
                      {item.badge}
                    </motion.span>
                  )}
                </motion.button>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}
