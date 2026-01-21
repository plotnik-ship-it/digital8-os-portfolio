import { motion, AnimatePresence } from 'framer-motion';
import { useTaskStore, type Task, type TaskStatus, type TaskPriority } from '../lib/store';
import { Trash2, Circle, CheckCircle2, AlertCircle, SignalHigh, SignalMedium, SignalLow } from 'lucide-react';

function PriorityIcon({ priority }: { priority: TaskPriority }) {
  const iconProps = { size: 18 };
  
  switch (priority) {
    case 'urgent':
      return <AlertCircle {...iconProps} className="text-accent" style={{ color: '#e2ff3b' }} />;
    case 'high':
      return <SignalHigh {...iconProps} className="text-white" />;
    case 'medium':
      return <SignalMedium {...iconProps} className="text-gray-400" />;
    case 'low':
      return <SignalLow {...iconProps} className="text-gray-600" />;
    case 'none':
    default:
      return null;
  }
}

function TaskRow({ task }: { task: Task }) {
  const { updateTaskStatus, deleteTask } = useTaskStore();

  const statusColors: Record<TaskStatus, string> = {
    'backlog': 'text-gray-500',
    'todo': 'text-gray-400',
    'in_progress': 'text-neon-yellow',
    'done': 'text-green-500 line-through',
  };

  const handleStatusChange = (e: React.MouseEvent) => {
    e.stopPropagation();
    const statusOrder: TaskStatus[] = ['backlog', 'todo', 'in_progress', 'done'];
    const currentIndex = statusOrder.indexOf(task.status);
    const nextStatus = statusOrder[(currentIndex + 1) % statusOrder.length];
    updateTaskStatus(task.id, nextStatus);
  };

  const isChecked = task.status === 'done';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      whileHover={{ scale: 1.01, backgroundColor: '#0a0a0a' }}
      className="flex items-center gap-4 p-4 border-b border-gray-800 cursor-pointer transition-colors"
    >
      {/* Status Checkbox */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleStatusChange}
        className="flex-shrink-0"
      >
        {isChecked ? (
          <CheckCircle2 size={20} className="text-green-500" />
        ) : (
          <Circle size={20} className={statusColors[task.status]} />
        )}
      </motion.button>

      {/* Priority Icon */}
      <div className="flex-shrink-0">
        <PriorityIcon priority={task.priority} />
      </div>

      {/* Task Content */}
      <div className="flex-1 min-w-0">
        <h3 className={`font-medium ${statusColors[task.status]}`}>
          {task.title}
        </h3>
        <div className="flex items-center gap-2 mt-1">
          <span className={`text-xs ${statusColors[task.status]}`}>
            {task.status.replace('_', '-')}
          </span>
          {task.priority !== 'none' && (
            <span className="text-xs text-gray-600">
              • {task.priority.replace('_', '-')}
            </span>
          )}
        </div>
      </div>

      {/* Delete Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={(e) => {
          e.stopPropagation();
          deleteTask(task.id);
        }}
        className="text-gray-600 hover:text-red-500 transition-colors p-1 flex-shrink-0"
      >
        <Trash2 size={16} />
      </motion.button>
    </motion.div>
  );
}

export function TaskBoard() {
  const tasks = useTaskStore((state) => state.tasks);

  return (
    <div className="flex-1 overflow-y-auto bg-pure-black ml-64">
      <div className="max-w-4xl mx-auto">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-300 mb-6">Tasks</h2>
          <AnimatePresence mode="popLayout">
            {tasks.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 text-gray-600"
              >
                <p>No tasks yet. Press Cmd+K to create one.</p>
              </motion.div>
            ) : (
              <div className="space-y-0">
                {tasks.map((task) => (
                  <TaskRow key={task.id} task={task} />
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
