import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTaskStore } from '../lib/store';

export function QuickCreateTask() {
  const { isQuickCreateOpen, setQuickCreate, addTask } = useTaskStore();
  const [taskTitle, setTaskTitle] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input when modal opens
  useEffect(() => {
    if (isQuickCreateOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isQuickCreateOpen]);

  // Reset input and success state when modal closes
  useEffect(() => {
    if (!isQuickCreateOpen) {
      setTaskTitle('');
      setIsSuccess(false);
    }
  }, [isQuickCreateOpen]);

  const handleSubmit = () => {
    const title = taskTitle.trim();
    if (title) {
      addTask(title);
      setTaskTitle('');
      // Show success animation
      setIsSuccess(true);
      // Close after success animation
      setTimeout(() => {
        setQuickCreate(false);
        setIsSuccess(false);
      }, 400);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      setQuickCreate(false);
    }
  };

  return (
    <AnimatePresence>
      {isQuickCreateOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={() => setQuickCreate(false)}
          />
          
          {/* Quick Create Flyout */}
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{
              type: 'spring',
              damping: 30,
              stiffness: 300,
            }}
            className="fixed bottom-0 left-0 right-0 z-50 p-6"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={isSuccess ? { scale: 1.05 } : { scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="max-w-2xl mx-auto bg-pure-black border-2 border-accent rounded-t-lg p-6"
              style={{
                boxShadow: isSuccess
                  ? '0 0 50px rgba(226, 255, 59, 0.4), 0 0 100px rgba(226, 255, 59, 0.2)'
                  : '0 0 30px rgba(226, 255, 59, 0.2), 0 0 60px rgba(226, 255, 59, 0.1)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.input
                ref={inputRef}
                type="text"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="What needs to be done?"
                className="w-full bg-transparent text-white text-2xl font-medium placeholder-gray-500 outline-none border-none focus:outline-none"
                autoFocus
              />
              <div className="mt-4 flex items-center justify-between">
                <p className="text-xs text-gray-500">
                  Press <kbd className="px-2 py-1 rounded bg-gray-900 border border-gray-800 text-accent">Enter</kbd> to create • <kbd className="px-2 py-1 rounded bg-gray-900 border border-gray-800 text-accent">Esc</kbd> to cancel
                </p>
                {taskTitle.trim() && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-accent text-black font-medium rounded-md hover:bg-accent/90 transition-colors"
                  >
                    Create Task
                  </motion.button>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
