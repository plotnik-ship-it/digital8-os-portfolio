import { motion } from 'framer-motion';
import { useTaskStore, type TaskFilter } from '../lib/store';

const filters: { value: TaskFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'urgent', label: 'Urgent' },
  { value: 'todo', label: 'Todo' },
  { value: 'done', label: 'Done' },
];

export function FilterBar() {
  const { filter, setFilter } = useTaskStore();

  const handleFilterClick = (filterValue: TaskFilter) => {
    setFilter(filterValue);
  };

  return (
    <div className="relative flex items-center gap-2 mb-6 px-2">
      {filters.map((filterOption) => {
        const isActive = filter === filterOption.value;
        
        return (
          <motion.button
            key={filterOption.value}
            onClick={() => handleFilterClick(filterOption.value)}
            className={`
              relative px-4 py-2 rounded-full text-sm font-medium
              border border-gray-800 bg-transparent
              transition-colors duration-200
              ${isActive ? 'text-accent' : 'text-gray-400 hover:text-gray-300'}
            `}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Sliding highlight background */}
            {isActive && (
              <motion.div
                layoutId="activeFilter"
                className="absolute inset-0 rounded-full bg-gray-900/50 border border-gray-700"
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 30,
                }}
              />
            )}
            
            {/* Button content */}
            <span className="relative z-10 flex items-center gap-2">
              {isActive && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-1.5 h-1.5 rounded-full bg-accent"
                />
              )}
              <span>{filterOption.label}</span>
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
