import { Command } from 'cmdk';
import { useTaskStore } from '../lib/store';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Moon, Folder } from 'lucide-react';

type PaletteMode = 'commands' | 'create-task';

const mockProjects = [
  { id: '1', name: 'Digital8 OS', domain: 'os.digital8.ca' },
  { id: '2', name: 'TravelPoint Planner', domain: 'planner.travelpoint.ca' },
  { id: '3', name: 'E-commerce Audit' },
  { id: '4', name: 'SEO Campaign' },
  { id: '5', name: 'Brand Redesign' },
  { id: '6', name: 'Performance Optimization' },
];

export function CommandPalette() {
  const { 
    isCommandPaletteOpen, 
    toggleCommandPalette, 
    addTask, 
    setSearchQuery, 
    showToast, 
    setDarkModeRingActive,
    setCurrentView,
    setSelectedProject
  } = useTaskStore();
  const [inputValue, setInputValue] = useState('');
  const [mode, setMode] = useState<PaletteMode>('commands');
  const [taskTitle, setTaskTitle] = useState('');

  // Reset state when palette closes
  useEffect(() => {
    if (!isCommandPaletteOpen) {
      setInputValue('');
      setMode('commands');
      setTaskTitle('');
    }
  }, [isCommandPaletteOpen]);

  // Real-time search as user types
  // Only update search when in commands mode and input changes
  useEffect(() => {
    if (mode === 'commands') {
      if (inputValue.trim()) {
        setSearchQuery(inputValue);
      } else {
        setSearchQuery('');
      }
    }
    // Only depend on inputValue and mode, not setSearchQuery (Zustand setter is stable)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue, mode]);

  // Escape key handler
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCommandPaletteOpen) {
        e.preventDefault();
        if (mode === 'create-task') {
          setMode('commands');
          setTaskTitle('');
        } else {
          toggleCommandPalette();
        }
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [isCommandPaletteOpen, toggleCommandPalette, mode]);

  const handleCreateTask = () => {
    const title = taskTitle.trim() || inputValue.trim();
    if (title) {
      addTask(title);
      setTaskTitle('');
      setInputValue('');
      setMode('commands');
      toggleCommandPalette();
    }
  };

  const handleSelect = (value: string) => {
    switch (value) {
      case 'create-task':
        setMode('create-task');
        setTaskTitle(inputValue.trim());
        setInputValue('');
        break;
      case 'search-tasks':
        // Search is already active via real-time input
        toggleCommandPalette();
        break;
      case 'toggle-dark-mode':
        setDarkModeRingActive(true);
        showToast('Dark Mode is already optimized for Digital8');
        toggleCommandPalette();
        // Auto-hide ring after 1 second
        setTimeout(() => {
          setDarkModeRingActive(false);
        }, 1000);
        break;
      case 'go-to-projects':
        setCurrentView('projects');
        toggleCommandPalette();
        break;
      default:
        // Check if it's a project ID
        const project = mockProjects.find(p => p.id === value || p.name.toLowerCase() === value.toLowerCase());
        if (project) {
          setCurrentView('projects');
          setSelectedProject(project.id);
          toggleCommandPalette();
        }
        break;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (mode === 'create-task' && e.key === 'Enter') {
      e.preventDefault();
      handleCreateTask();
    }
  };

  return (
    <AnimatePresence>
      {isCommandPaletteOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-black/60 backdrop-blur-sm"
          onClick={toggleCommandPalette}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl mx-4"
          >
            <Command 
              className="rounded-lg border border-gray-800 bg-pure-black shadow-2xl overflow-hidden"
              style={{
                boxShadow: '0 0 20px rgba(226, 255, 59, 0.15), 0 0 40px rgba(226, 255, 59, 0.1)',
              }}
            >
              <div className="px-4 py-3 border-b border-gray-800">
                {mode === 'create-task' ? (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2"
                  >
                    <Plus size={18} className="text-accent flex-shrink-0" />
                    <input
                      type="text"
                      value={taskTitle}
                      onChange={(e) => setTaskTitle(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Enter task title..."
                      className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-lg"
                      autoFocus
                    />
                  </motion.div>
                ) : (
                  <Command.Input
                    placeholder="Type a command or search..."
                    value={inputValue}
                    onValueChange={setInputValue}
                    className="w-full bg-transparent text-white placeholder-gray-500 outline-none text-lg"
                    autoFocus
                  />
                )}
              </div>
              {mode === 'commands' && (
                <Command.List className="max-h-80 overflow-y-auto p-2">
                  <Command.Empty className="py-6 text-center text-gray-500">
                    {inputValue.trim() ? 'No matching commands. Type to search tasks.' : 'Type a command or search...'}
                  </Command.Empty>
                  <Command.Group>
                    <Command.Item
                      value="create-task"
                      onSelect={handleSelect}
                      keywords={['create', 'new', 'task', 'add']}
                      className="px-4 py-3 rounded-md cursor-pointer text-white data-[selected]:bg-accent/20 data-[selected]:text-accent transition-all duration-300 ease-out"
                    >
                      <div className="flex items-center gap-3">
                        <Plus size={18} className="text-accent" />
                        <span>Create New Task</span>
                      </div>
                    </Command.Item>
                    <Command.Item
                      value="search-tasks"
                      onSelect={handleSelect}
                      keywords={['search', 'find', 'filter']}
                      className="px-4 py-3 rounded-md cursor-pointer text-white data-[selected]:bg-accent/20 data-[selected]:text-accent transition-all duration-300 ease-out"
                    >
                      <div className="flex items-center gap-3">
                        <Search size={18} className="text-accent" />
                        <span>Search Tasks</span>
                      </div>
                    </Command.Item>
                    <Command.Item
                      value="toggle-dark-mode"
                      onSelect={handleSelect}
                      className="px-4 py-3 rounded-md cursor-pointer text-white data-[selected]:bg-accent/20 data-[selected]:text-accent transition-all duration-300 ease-out"
                    >
                      <div className="flex items-center gap-3">
                        <Moon size={18} className="text-accent" />
                        <span>Toggle Dark Mode</span>
                      </div>
                    </Command.Item>
                    <Command.Item
                      value="go-to-projects"
                      onSelect={handleSelect}
                      className="px-4 py-3 rounded-md cursor-pointer text-white data-[selected]:bg-accent/20 data-[selected]:text-accent transition-all duration-300 ease-out"
                    >
                      <div className="flex items-center gap-3">
                        <Folder size={18} className="text-accent" />
                        <span>Go to Projects</span>
                      </div>
                    </Command.Item>
                  </Command.Group>
                  <Command.Group heading="Projects">
                    {mockProjects.map((project) => (
                      <Command.Item
                        key={project.id}
                        value={project.id}
                        keywords={[project.name, project.domain || '']}
                        onSelect={handleSelect}
                        className="px-4 py-3 rounded-md cursor-pointer text-white data-[selected]:bg-accent/20 data-[selected]:text-accent transition-all duration-300 ease-out"
                      >
                        <div className="flex items-center gap-3">
                          <Folder size={18} className="text-accent" />
                          <div className="flex-1">
                            <span>{project.name}</span>
                            {project.domain && (
                              <span className="text-xs text-gray-500 ml-2">{project.domain}</span>
                            )}
                          </div>
                        </div>
                      </Command.Item>
                    ))}
                  </Command.Group>
                </Command.List>
              )}
              {mode === 'create-task' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="px-4 py-2 border-t border-gray-800 text-xs text-gray-500"
                >
                  Press <kbd className="px-2 py-1 rounded bg-gray-900 border border-gray-800">Enter</kbd> to create • <kbd className="px-2 py-1 rounded bg-gray-900 border border-gray-800">Esc</kbd> to cancel
                </motion.div>
              )}
              {mode === 'commands' && (
                <div className="px-4 py-2 border-t border-gray-800 text-xs text-gray-500">
                  Press <kbd className="px-2 py-1 rounded bg-gray-900 border border-gray-800">Enter</kbd> to select • <kbd className="px-2 py-1 rounded bg-gray-900 border border-gray-800">Esc</kbd> to close
                </div>
              )}
            </Command>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
