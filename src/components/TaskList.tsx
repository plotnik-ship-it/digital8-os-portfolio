import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { useTaskStore, type Task, type TaskPriority, type TaskStatus } from '../lib/store';
import { AlertCircle, SignalHigh, SignalMedium, SignalLow, Circle, CheckCircle2, Trash2, Inbox, AlertTriangle } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { playCompletionSound } from '../lib/sounds';

function PriorityIcon({ priority }: { priority: TaskPriority }) {
  const iconProps = {
    size: 18,
  };

  switch (priority) {
    case 'urgent':
      return (
        <AlertCircle
          {...iconProps}
          className="text-accent"
          style={{
            color: '#e2ff3b',
            filter: 'drop-shadow(0 0 4px rgba(226, 255, 59, 0.4)) drop-shadow(0 0 8px rgba(226, 255, 59, 0.2))',
          }}
        />
      );
    case 'high':
      return <SignalHigh {...iconProps} className="text-white" />;
    case 'medium':
      return <SignalMedium {...iconProps} className="text-gray-400" />;
    case 'low':
      return <SignalLow {...iconProps} className="text-gray-600" />;
    case 'none':
    default:
      // Always show a placeholder to maintain consistent layout
      return <div style={{ width: 18, height: 18 }} />;
  }
}

function TaskRow({ task }: { task: Task }) {
  const { updateTaskStatus, deleteTask } = useTaskStore();
  const [isCompleting, setIsCompleting] = useState(false);
  const [showStrikethrough, setShowStrikethrough] = useState(task.status === 'done');

  // Update strikethrough when task status changes externally
  useEffect(() => {
    setShowStrikethrough(task.status === 'done');
  }, [task.status]);

  const statusColors: Record<TaskStatus, string> = {
    'backlog': 'text-gray-500',
    'todo': 'text-gray-400',
    'in_progress': 'text-neon-yellow',
    'done': 'text-green-500',
  };

  const handleStatusToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const newStatus: TaskStatus = task.status === 'done' ? 'todo' : 'done';
    const willComplete = newStatus === 'done';

    if (willComplete) {
      setIsCompleting(true);
      
      // Small delay to show pulse animation
      await new Promise(resolve => setTimeout(resolve, 250));

      // Update status and play sound
      updateTaskStatus(task.id, newStatus);
      playCompletionSound();

      // Trigger strikethrough animation
      setTimeout(() => {
        setShowStrikethrough(true);
        setIsCompleting(false);
      }, 100);
    } else {
      // Reverting to todo
      setShowStrikethrough(false);
      updateTaskStatus(task.id, newStatus);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteTask(task.id);
  };

  const isDone = task.status === 'done';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{
        layout: { duration: 0.3, ease: 'easeInOut' },
        opacity: { duration: 0.2 },
        y: { duration: 0.2 },
      }}
      className="border-b border-gray-900 py-4 px-2 hover:bg-gray-900/30 transition-colors"
    >
      <div className="flex items-center gap-3">
        {/* Status Circle - Clickable with pulse animation */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleStatusToggle}
          className="flex-shrink-0 relative"
        >
          {isDone ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 25 }}
            >
              <CheckCircle2 size={20} className="text-green-500" />
            </motion.div>
          ) : (
            <motion.div
              animate={isCompleting ? {
                scale: [1, 1.4, 1.2],
              } : {}}
              style={isCompleting ? {
                color: '#e2ff3b',
                filter: 'drop-shadow(0 0 8px rgba(226, 255, 59, 0.6))',
              } : {}}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            >
              <Circle size={20} className={statusColors[task.status]} />
            </motion.div>
          )}
        </motion.button>

        {/* Priority Icon - Always visible on the left */}
        <div className="flex-shrink-0 w-[18px] flex items-center justify-center">
          <PriorityIcon priority={task.priority} />
        </div>

        {/* Task Content with strike-through animation */}
        <motion.div 
          className="flex-1 min-w-0"
          animate={{
            opacity: isDone ? 0.6 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-white font-medium relative inline-block">
            {task.title}
            <AnimatePresence>
              {showStrikethrough && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  exit={{ scaleX: 0 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="absolute top-1/2 left-0 right-0 h-0.5 bg-accent origin-left"
                  style={{ 
                    transform: 'translateY(-50%)',
                    boxShadow: '0 0 4px rgba(226, 255, 59, 0.4)',
                  }}
                />
              )}
            </AnimatePresence>
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className={`text-xs ${statusColors[task.status]}`}>
              {task.status.replace('_', '-')}
            </span>
            {task.priority !== 'none' && (
              <span className="text-xs text-gray-600">
                • {task.priority}
              </span>
            )}
          </div>
        </motion.div>

        {/* Delete Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleDelete}
          className="text-gray-600 hover:text-red-500 transition-colors p-1 flex-shrink-0"
        >
          <Trash2 size={16} />
        </motion.button>
      </div>
    </motion.div>
  );
}

export function TaskList() {
  const { tasks, filter, searchQuery } = useTaskStore();

  // Memoized filtering - calculate during render, no state updates
  const filteredTasks = useMemo(() => {
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

    // Then apply search query if present
    if (searchQuery && searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter((task) =>
        task.title && task.title.toLowerCase().includes(query)
      );
    }

    // Always return an array
    return Array.isArray(filtered) ? filtered : [];
  }, [tasks, filter, searchQuery]);

  // Safe tasks array
  const safeTasks = Array.isArray(filteredTasks) ? filteredTasks : [];

  const getEmptyState = () => {
    if (filter === 'urgent') {
      return { message: 'No urgent tasks found.', icon: AlertTriangle };
    }
    if (filter === 'todo') {
      return { message: 'No todo tasks found.', icon: Circle };
    }
    if (filter === 'done') {
      return { message: 'No completed tasks found.', icon: CheckCircle2 };
    }
    return { message: 'No tasks yet. Press C to create one quickly.', icon: Inbox };
  };

  const emptyState = getEmptyState();
  const EmptyIcon = emptyState.icon;

  return (
    <LayoutGroup>
      <div className="space-y-0">
        <AnimatePresence mode="popLayout">
          {safeTasks && safeTasks.length > 0 ? (
            safeTasks.map((task) => (
              <TaskRow key={task.id} task={task} />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-16 text-gray-500"
            >
              <EmptyIcon size={48} className="mb-4 text-gray-600" />
              <p className="text-sm text-gray-400">{emptyState.message}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </LayoutGroup>
  );
}
