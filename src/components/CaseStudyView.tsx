import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Code,
  Database,
  Globe,
  Zap,
  Layers,
  FileCode,
  GitBranch,
  Gauge,
  Activity,
  ExternalLink,
  Github
} from 'lucide-react';
import { Project } from '../lib/store';
import { useState } from 'react';

interface CaseStudyViewProps {
  project: Project;
  layoutId?: string;
}

const techStackIcons: Record<string, { icon: any; color: string; tooltip: string }> = {
  'Next.js': {
    icon: Layers,
    color: 'text-white',
    tooltip: 'Next.js used for server-side rendering and optimal performance'
  },
  'React': {
    icon: Layers,
    color: 'text-blue-400',
    tooltip: 'React for component-based architecture and reactive UI'
  },
  'TypeScript': {
    icon: FileCode,
    color: 'text-blue-500',
    tooltip: 'TypeScript for type safety and enhanced developer experience'
  },
  'Vite': {
    icon: Zap,
    color: 'text-yellow-400',
    tooltip: 'Vite for lightning-fast development and build times'
  },
  'Zustand': {
    icon: Database,
    color: 'text-orange-400',
    tooltip: 'Zustand used for global state management to achieve 60fps UI performance'
  },
  'Framer Motion': {
    icon: Zap,
    color: 'text-purple-400',
    tooltip: 'Framer Motion for smooth animations and shared element transitions'
  },
  'Tailwind CSS': {
    icon: Code,
    color: 'text-cyan-400',
    tooltip: 'Tailwind CSS for utility-first styling and rapid UI development'
  },
  'CMDK': {
    icon: GitBranch,
    color: 'text-gray-400',
    tooltip: 'CMDK for building accessible command palette interfaces'
  },
  'Duda CMS': {
    icon: Layers,
    color: 'text-green-400',
    tooltip: 'Duda CMS for commercial site management and content delivery'
  },
  'Custom Widget Injection': {
    icon: Code,
    color: 'text-accent',
    tooltip: 'Custom HTML/JS widgets injected for real-time booking flows and platform integration'
  },
  'Hybrid Architecture': {
    icon: GitBranch,
    color: 'text-purple-400',
    tooltip: 'Hybrid architecture orchestrating multiple platforms to bypass native limitations'
  },
};

export function CaseStudyView({ project, layoutId }: CaseStudyViewProps) {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  const techStack = project.techStack || ['React', 'TypeScript', 'Vite', 'Zustand', 'Framer Motion', 'Tailwind CSS'];

  return (
    <motion.div
      layoutId={layoutId}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="space-y-8"
    >
      {/* Header */}
      <motion.div
        layout
        className="flex items-center gap-4"
      >
        <div>
          <motion.h2
            layout
            className="text-3xl font-bold text-white mb-2"
          >
            {project.name}
          </motion.h2>
          {project.description && (
            <motion.p
              layout
              className="text-gray-400"
            >
              {project.description}
            </motion.p>
          )}
        </div>
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap gap-4"
      >
        {/* Live Demo Button */}
        <motion.a
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          href={project.domain ? `https://${project.domain}` : '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-accent text-black font-semibold rounded-lg hover:bg-accent/90 transition-colors flex items-center gap-2 shadow-lg shadow-accent/20"
        >
          <ExternalLink size={18} />
          Live Demo
        </motion.a >

        {/* Source Code Button */}
        < motion.a
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 border-2 border-gray-700 text-white font-semibold rounded-lg hover:border-accent/50 hover:bg-gray-900/30 transition-colors flex items-center gap-2"
        >
          <Github size={18} />
          Source Code
        </motion.a >
      </motion.div >

      {/* Performance Metrics */}
      < motion.div
        layout
        className="flex items-center gap-3 flex-wrap"
      >
        {
          project.id === '4' ? (
            <>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-800 bg-gray-900/20">
                <Gauge size={16} className="text-accent" />
                <span className="text-sm font-medium text-gray-300">Lighthouse: 100/100 SEO</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-800 bg-gray-900/20">
                <CheckCircle2 size={16} className="text-green-500" />
                <span className="text-sm font-medium text-gray-300">Status: Operational</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-800 bg-gray-900/20">
                <Gauge size={16} className="text-accent" />
                <span className="text-sm font-medium text-gray-300">Lighthouse: 100/100</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-800 bg-gray-900/20">
                <CheckCircle2 size={16} className="text-green-500" />
                <span className="text-sm font-medium text-gray-300">Status: Operational</span>
              </div>
            </>
          )
        }
        {
          project.domain && (
            <a
              href={`https://${project.domain}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-800 hover:border-accent/50 hover:bg-gray-900/30 transition-colors"
            >
              <Globe size={16} className="text-accent" />
              <span className="text-sm font-medium text-accent">{project.domain}</span>
            </a>
          )
        }
      </motion.div >

      {/* Interactive Tech Stack with Tooltips */}
      < motion.div layout >
        <h3 className="text-lg font-semibold text-white mb-4">Tech Stack</h3>
        <div className="flex flex-wrap gap-3 relative items-center">
          {techStack.map((tech) => {
            const techInfo = techStackIcons[tech] || {
              icon: Code,
              color: 'text-gray-400',
              tooltip: `${tech} technology stack`
            };
            const Icon = techInfo.icon;
            const isHovered = hoveredTech === tech;

            return (
              <div key={tech} className="relative">
                <motion.div
                  layout
                  whileHover={{ scale: 1.05, y: -2 }}
                  onHoverStart={() => setHoveredTech(tech)}
                  onHoverEnd={() => setHoveredTech(null)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-800 bg-gray-900/20 hover:bg-gray-900/40 hover:border-gray-700 transition-all cursor-help"
                >
                  <Icon size={18} className={techInfo.color} />
                  <span className="text-sm text-gray-300">{tech}</span>
                </motion.div>

                {/* Tooltip */}
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 rounded-lg bg-gray-900 border border-gray-800 text-xs text-gray-300 whitespace-nowrap z-50 shadow-xl"
                    style={{
                      boxShadow: '0 0 20px rgba(226, 255, 59, 0.1)',
                    }}
                  >
                    {techInfo.tooltip}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 w-2 h-2 bg-gray-900 border-r border-b border-gray-800 rotate-45"></div>
                  </motion.div>
                )}
              </div>
            );
          })}
          {/* Hybrid Architecture Badge for MyTravelPoint */}
          {project.id === '4' && (
            <div className="px-4 py-2 rounded-lg border border-accent/50 bg-accent/10">
              <span className="text-sm font-semibold text-accent">Hybrid Architecture</span>
            </div>
          )}
        </div>
      </motion.div >

      {/* Key Impact & Metrics */}
      < motion.div layout >
        <h3 className="text-lg font-semibold text-white mb-4">Key Impact & Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {project.id === '1' && (
            <>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="p-4 rounded-lg border border-green-500/30 bg-green-500/5"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">🚀</span>
                  <h4 className="text-base font-semibold text-green-400">100/100 Lighthouse Score</h4>
                </div>
                <p className="text-sm text-gray-400">Perfect performance, accessibility, and SEO scores</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="p-4 rounded-lg border border-green-500/30 bg-green-500/5"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">⚡</span>
                  <h4 className="text-base font-semibold text-green-400">60fps UI Performance</h4>
                </div>
                <p className="text-sm text-gray-400">Smooth animations and instant task creation</p>
              </motion.div>
            </>
          )}
          {project.id === '4' && (
            <>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="p-4 rounded-lg border border-green-500/30 bg-green-500/5"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">🚀</span>
                  <h4 className="text-base font-semibold text-green-400">100/100 SEO Score</h4>
                </div>
                <p className="text-sm text-gray-400">Perfect search engine optimization despite platform constraints</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="p-4 rounded-lg border border-green-500/30 bg-green-500/5"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">⚡</span>
                  <h4 className="text-base font-semibold text-green-400">0ms Total Blocking Time</h4>
                </div>
                <p className="text-sm text-gray-400">Zero blocking time on mobile devices</p>
              </motion.div>
            </>
          )}
          {(project.id === '2' || project.id === '3') && (
            <>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="p-4 rounded-lg border border-green-500/30 bg-green-500/5"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">🚀</span>
                  <h4 className="text-base font-semibold text-green-400">100/100 Lighthouse Score</h4>
                </div>
                <p className="text-sm text-gray-400">Perfect performance across all metrics</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="p-4 rounded-lg border border-green-500/30 bg-green-500/5"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">⚡</span>
                  <h4 className="text-base font-semibold text-green-400">Optimized Load Times</h4>
                </div>
                <p className="text-sm text-gray-400">Fast initial page load and smooth interactions</p>
              </motion.div>
            </>
          )}
        </div>
      </motion.div >

      {/* Engineering Challenges */}
      < motion.div layout >
        <h3 className="text-lg font-semibold text-white mb-4">Engineering Challenges</h3>
        <div className="space-y-6">
          {/* Show Error #185 and Vercel Observability only for Digital8 OS */}
          {project.id === '1' && (
            <>
              {/* Error #185 Fix */}
              <motion.div
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="p-6 rounded-lg border border-gray-800 bg-gray-900/20 hover:border-gray-700 transition-colors"
              >
                <h4 className="text-base font-semibold text-accent mb-3 flex items-center gap-2">
                  <Activity size={18} />
                  React Error #185: Maximum Update Depth Exceeded (Infinite Loop)
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  The application was experiencing infinite re-render loops when filtering tasks.
                  This occurred because filter state updates were triggering component re-renders
                  that immediately triggered new filter updates, creating a recursive cycle.
                </p>
                <div className="space-y-2">
                  <p className="text-gray-300 text-sm font-medium">Solution Implemented:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-400 text-sm ml-2">
                    <li>Isolated all <code className="text-accent/80 px-1 py-0.5 rounded bg-gray-800">setFilter</code> calls to <code className="text-accent/80 px-1 py-0.5 rounded bg-gray-800">onClick</code> handlers only, preventing render-time state updates</li>
                    <li>Replaced state-based filtering with <code className="text-accent/80 px-1 py-0.5 rounded bg-gray-800">useMemo</code> for computed derived state, eliminating unnecessary recalculations</li>
                    <li>Memoized filter handlers with <code className="text-accent/80 px-1 py-0.5 rounded bg-gray-800">useCallback</code> to ensure stable function references and prevent unnecessary re-renders</li>
                    <li>Added defensive checks ensuring filtered tasks always return an empty array instead of undefined/null, preventing runtime errors</li>
                  </ul>
                </div>
              </motion.div>

              {/* Vercel Observability Fix */}
              <motion.div
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="p-6 rounded-lg border border-gray-800 bg-gray-900/20 hover:border-gray-700 transition-colors"
              >
                <h4 className="text-base font-semibold text-accent mb-3 flex items-center gap-2">
                  <Activity size={18} />
                  Production 500 Error: Vercel Observability Solution
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  After deployment, the application was returning 500 errors in production.
                  Using Vercel's Observability dashboard and real-time logging, we identified the root cause:
                  hydration mismatches between server and client state, causing React to throw errors during
                  the initial render cycle.
                </p>
                <div className="space-y-2">
                  <p className="text-gray-300 text-sm font-medium">Solution Implemented:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-400 text-sm ml-2">
                    <li>Implemented <code className="text-accent/80 px-1 py-0.5 rounded bg-gray-800">HydrationGuard</code> component to delay rendering until Zustand persist middleware hydrates from localStorage</li>
                    <li>Used Vercel's real-time logs and Observability dashboard to trace the exact error stack trace and identify hydration mismatches</li>
                    <li>Added defensive checks for array operations to prevent runtime errors when state is undefined during hydration</li>
                    <li>Configured <code className="text-accent/80 px-1 py-0.5 rounded bg-gray-800">vercel.json</code> to properly handle the Vite build output and ensure correct deployment configuration</li>
                  </ul>
                </div>
              </motion.div>
            </>
          )}

          {/* Performance Optimization Challenge for Digital8 Corporate */}
          {project.id === '3' && (
            <motion.div
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="p-6 rounded-lg border border-gray-800 bg-gray-900/20 hover:border-gray-700 transition-colors"
            >
              <h4 className="text-base font-semibold text-accent mb-3 flex items-center gap-2">
                <Activity size={18} />
                Performance Optimization: Core Web Vitals & Brand Integration
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                The corporate website required achieving perfect Lighthouse scores while maintaining
                seamless brand identity integration across all pages. Initial load times were above
                3 seconds, and brand assets were causing layout shifts during hydration.
              </p>
              <div className="space-y-2">
                <p className="text-gray-300 text-sm font-medium">Solution Implemented:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-400 text-sm ml-2">
                  <li>Implemented image optimization with Next.js Image component and WebP format conversion, reducing asset sizes by 70%</li>
                  <li>Created a unified design system component library ensuring consistent brand application across all pages</li>
                  <li>Optimized font loading with font-display: swap and preload strategies to eliminate FOIT (Flash of Invisible Text)</li>
                  <li>Integrated brand color palette and typography system into Tailwind config for maintainable theming</li>
                  <li>Achieved 100/100 Lighthouse scores across Performance, Accessibility, Best Practices, and SEO</li>
                </ul>
              </div>
            </motion.div>
          )}

          {/* Hybrid Architecture Challenge for MyTravelPoint Agency */}
          {project.id === '4' && (
            <motion.div
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="p-6 rounded-lg border border-gray-800 bg-gray-900/20 hover:border-gray-700 transition-colors"
            >
              <h4 className="text-base font-semibold text-accent mb-3 flex items-center gap-2">
                <Activity size={18} />
                Platform Limitations & Custom Widget Injection
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                The challenge was to integrate a high-performance Next.js AI tool with a Duda CMS commercial site while
                bypassing platform-native limitations. Duda CMS's constraints prevented direct integration of custom React
                components and optimized performance features, requiring a hybrid architecture solution.
              </p>
              <div className="space-y-2">
                <p className="text-gray-300 text-sm font-medium">Solution Implemented:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-400 text-sm ml-2">
                  <li>Developed <strong className="text-accent">custom widget injection</strong> system to bypass Duda CMS platform limitations, enabling seamless integration of Next.js components</li>
                  <li>Orchestrated hybrid architecture connecting Duda CMS commercial site with high-performance Next.js custom widgets for real-time functionality</li>
                  <li>Achieved <strong className="text-accent">100/100 SEO</strong> scores despite platform constraints through strategic widget placement and optimization</li>
                  <li>Optimized third-party script execution and asset delivery, achieving <strong className="text-accent">0ms Total Blocking Time (TBT)</strong> on mobile devices</li>
                  <li>Maintained consistent design system across both platforms through shared component libraries and theme management</li>
                  <li>Ensured fast load times through code splitting, lazy loading, and optimized widget initialization sequences</li>
                </ul>
              </div>
            </motion.div>
          )}

          {/* Default challenge for TravelPoint Planner */}
          {project.id === '2' && (
            <motion.div
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="p-6 rounded-lg border border-gray-800 bg-gray-900/20 hover:border-gray-700 transition-colors"
            >
              <h4 className="text-base font-semibold text-accent mb-3 flex items-center gap-2">
                <Activity size={18} />
                AI Integration: Real-time Processing & State Management
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Integrating OpenAI API for travel planning required managing complex async state flows
                while maintaining responsive UI performance. Initial implementation caused UI freezes
                during API calls and inconsistent state updates.
              </p>
              <div className="space-y-2">
                <p className="text-gray-300 text-sm font-medium">Solution Implemented:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-400 text-sm ml-2">
                  <li>Implemented optimistic UI updates with Zustand for immediate user feedback before API responses</li>
                  <li>Created debounced search inputs to reduce API calls while maintaining real-time feel</li>
                  <li>Added streaming response handling for progressive data loading and improved perceived performance</li>
                  <li>Built error recovery system with retry logic and graceful degradation for API failures</li>
                  <li>Achieved 60fps animations during data loading using Framer Motion's layout animations</li>
                </ul>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div >
    </motion.div >
  );
}
