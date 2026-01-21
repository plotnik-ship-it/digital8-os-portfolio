import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Code, 
  Database, 
  Globe, 
  Zap,
  Layers,
  FileCode,
  GitBranch
} from 'lucide-react';
import { useTaskStore } from '../lib/store';
import { Project } from '../lib/store';

interface ProjectDetailViewProps {
  project: Project;
}

const techStackIcons: Record<string, { icon: any; color: string }> = {
  'React': { icon: Layers, color: 'text-blue-400' },
  'TypeScript': { icon: FileCode, color: 'text-blue-500' },
  'Vite': { icon: Zap, color: 'text-yellow-400' },
  'Zustand': { icon: Database, color: 'text-orange-400' },
  'Framer Motion': { icon: Zap, color: 'text-purple-400' },
  'Tailwind CSS': { icon: Code, color: 'text-cyan-400' },
  'CMDK': { icon: GitBranch, color: 'text-gray-400' },
};

export function ProjectDetailView({ project }: ProjectDetailViewProps) {
  const { setSelectedProject } = useTaskStore();

  const handleBack = () => {
    setSelectedProject(null);
  };

  const techStack = project.techStack || ['React', 'TypeScript', 'Vite', 'Zustand', 'Framer Motion', 'Tailwind CSS'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.1, x: -4 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleBack}
          className="p-2 rounded-lg border border-gray-800 hover:border-accent/50 hover:bg-gray-900/30 transition-colors"
        >
          <ArrowLeft size={20} className="text-gray-400" />
        </motion.button>
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">{project.name}</h2>
          {project.description && (
            <p className="text-gray-400">{project.description}</p>
          )}
        </div>
      </div>

      {/* Status Badge */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-800 bg-gray-900/20">
          <CheckCircle2 size={16} className="text-green-500" />
          <span className="text-sm font-medium text-gray-300">Status: Operational</span>
        </div>
        {project.domain && (
          <a
            href={`https://${project.domain}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-800 hover:border-accent/50 hover:bg-gray-900/30 transition-colors"
          >
            <Globe size={16} className="text-accent" />
            <span className="text-sm font-medium text-accent">{project.domain}</span>
          </a>
        )}
      </div>

      {/* Tech Stack */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Tech Stack</h3>
        <div className="flex flex-wrap gap-3">
          {techStack.map((tech) => {
            const techInfo = techStackIcons[tech] || { icon: Code, color: 'text-gray-400' };
            const Icon = techInfo.icon;
            return (
              <motion.div
                key={tech}
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-800 bg-gray-900/20 hover:bg-gray-900/40 hover:border-gray-700 transition-all"
              >
                <Icon size={18} className={techInfo.color} />
                <span className="text-sm text-gray-300">{tech}</span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Engineering Challenges */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Engineering Challenges</h3>
        <div className="space-y-6">
          {/* Error #185 Fix */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 rounded-lg border border-gray-800 bg-gray-900/20"
          >
            <h4 className="text-base font-semibold text-accent mb-3">
              React Error #185: Maximum Update Depth Exceeded
            </h4>
            <p className="text-gray-400 text-sm leading-relaxed mb-3">
              The application was experiencing infinite re-render loops when filtering tasks. 
              This occurred because filter state updates were triggering component re-renders 
              that immediately triggered new filter updates.
            </p>
            <div className="space-y-2">
              <p className="text-gray-300 text-sm font-medium">Solution:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-400 text-sm ml-2">
                <li>Isolated all <code className="text-accent/80">setFilter</code> calls to <code className="text-accent/80">onClick</code> handlers only</li>
                <li>Replaced state-based filtering with <code className="text-accent/80">useMemo</code> for computed derived state</li>
                <li>Memoized filter handlers with <code className="text-accent/80">useCallback</code> to prevent unnecessary re-renders</li>
                <li>Ensured filtered tasks always return an empty array instead of undefined/null</li>
              </ul>
            </div>
          </motion.div>

          {/* Vercel Observability Fix */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 rounded-lg border border-gray-800 bg-gray-900/20"
          >
            <h4 className="text-base font-semibold text-accent mb-3">
              Production 500 Error: Vercel Observability Solution
            </h4>
            <p className="text-gray-400 text-sm leading-relaxed mb-3">
              After deployment, the application was returning 500 errors in production. 
              Using Vercel's Observability dashboard, we identified the root cause: 
              hydration mismatches between server and client state.
            </p>
            <div className="space-y-2">
              <p className="text-gray-300 text-sm font-medium">Solution:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-400 text-sm ml-2">
                <li>Implemented <code className="text-accent/80">HydrationGuard</code> component to delay rendering until Zustand persist middleware hydrates</li>
                <li>Used Vercel's real-time logs to trace the exact error stack trace</li>
                <li>Added defensive checks for array operations to prevent runtime errors</li>
                <li>Configured <code className="text-accent/80">vercel.json</code> to properly handle the Vite build output</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
