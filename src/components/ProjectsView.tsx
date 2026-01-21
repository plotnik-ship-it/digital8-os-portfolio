import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { Folder, X } from 'lucide-react';
import { useTaskStore, Project } from '../lib/store';
import { CaseStudyView } from './CaseStudyView';
import { Terminal } from './Terminal';

const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Digital8 OS',
    description: 'High-performance task management with Linear-inspired UX',
    domain: 'os.digital8.ca',
    techStack: ['Next.js', 'React', 'TypeScript', 'Zustand', 'Tailwind CSS', 'Framer Motion'],
    status: 'operational'
  },
  {
    id: '2',
    name: 'TravelPoint Planner',
    description: 'AI-powered travel planning platform',
    domain: 'planner.travelpoint.ca',
    techStack: ['React', 'TypeScript', 'Vite', 'Zustand', 'Framer Motion'],
    status: 'operational'
  },
  {
    id: '3',
    name: 'Digital8 Corporate',
    description: 'Corporate website with integrated brand identity',
    domain: 'digital8.ca',
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    status: 'operational'
  },
  {
    id: '4',
    name: 'MyTravelPoint Agency',
    description: 'Connecting a Duda CMS commercial site with high-performance Next.js custom widgets. Bypassed platform limitations to achieve 100/100 SEO and 0ms TBT.',
    domain: 'mytravelpoint.ca',
    techStack: ['Next.js', 'React', 'TypeScript', 'Duda CMS', 'Custom Widget Injection', 'Hybrid Architecture', 'Zustand', 'Tailwind CSS'],
    status: 'operational'
  },
];

export function ProjectsView() {
  const { selectedProjectId, setSelectedProject } = useTaskStore();
  const selectedProject = mockProjects.find(p => p.id === selectedProjectId);

  const handleProjectClick = (projectId: string) => {
    setSelectedProject(projectId);
  };

  const handleClose = () => {
    setSelectedProject(null);
  };

  return (
    <LayoutGroup>
      <AnimatePresence mode="wait">
        {selectedProject ? (
          <motion.div
            key="case-study"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 w-full h-full bg-pure-black z-50 overflow-hidden"
          >
            {/* Fixed Close Button - Always visible on top */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleClose}
              className="fixed top-4 right-4 md:top-6 md:right-6 z-60 p-3 md:p-2 rounded-lg border border-gray-800 bg-sidebar hover:border-accent/50 hover:bg-gray-900/30 transition-colors shadow-xl"
              aria-label="Close project details"
            >
              <X size={24} className="text-gray-400 hover:text-white" />
            </motion.button>

            {/* Responsive Container: Vertical on mobile, Horizontal on desktop */}
            <div className="flex flex-col md:flex-row h-full w-full overflow-hidden">
              {/* Project Details - Scrollable */}
              <div className="flex-1 overflow-y-auto p-6 md:p-12 pb-20 md:pb-12">
                <div className="max-w-4xl mx-auto">
                  <CaseStudyView
                    project={selectedProject}
                    layoutId={`project-${selectedProject.id}`}
                  />
                </div>
              </div>

              {/* Terminal - Fixed on desktop, scrollable section on mobile */}
              <div className="md:w-80 md:flex-shrink-0 border-t md:border-t-0 md:border-l border-gray-800">
                <Terminal
                  projectDomain={selectedProject.domain}
                  isVisible={true}
                />
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="project-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-12 max-w-4xl mx-auto"
          >
            {/* Lead Engineering Projects */}
            <div>
              <h2 className="text-xl font-semibold text-gray-300 mb-6">Lead Engineering Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockProjects.slice(0, 2).map((project, index) => (
                  <motion.div
                    key={project.id}
                    layoutId={`project-${project.id}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    whileHover={{ scale: 1.02, y: -4 }}
                    className="group relative"
                  >
                    <motion.div
                      layoutId={`project-card-${project.id}`}
                      onClick={() => handleProjectClick(project.id)}
                      className="border border-gray-800 rounded-lg p-6 bg-gray-900/20 hover:bg-gray-900/40 hover:border-gray-700 transition-all duration-200 cursor-pointer"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <motion.div
                          layoutId={`project-icon-${project.id}`}
                          className="p-2 rounded bg-gray-800/50 group-hover:bg-accent/10 transition-colors"
                        >
                          <Folder size={20} className="text-gray-400 group-hover:text-accent transition-colors" />
                        </motion.div>
                      </div>
                      <motion.h3
                        layoutId={`project-title-${project.id}`}
                        className="text-white font-medium text-sm group-hover:text-accent transition-colors mb-2"
                      >
                        {project.name}
                      </motion.h3>
                      {project.description && (
                        <motion.p
                          layoutId={`project-desc-${project.id}`}
                          className="text-xs text-gray-500 line-clamp-2"
                        >
                          {project.description}
                        </motion.p>
                      )}
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Production Sites */}
            <div>
              <h2 className="text-xl font-semibold text-gray-300 mb-6">Production Sites</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockProjects.slice(2, 4).map((project, index) => (
                  <motion.div
                    key={project.id}
                    layoutId={`project-${project.id}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    whileHover={{ scale: 1.02, y: -4 }}
                    className="group relative"
                  >
                    <motion.div
                      layoutId={`project-card-${project.id}`}
                      onClick={() => handleProjectClick(project.id)}
                      className="border border-gray-800 rounded-lg p-6 bg-gray-900/20 hover:bg-gray-900/40 hover:border-gray-700 transition-all duration-200 cursor-pointer"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <motion.div
                          layoutId={`project-icon-${project.id}`}
                          className="p-2 rounded bg-gray-800/50 group-hover:bg-accent/10 transition-colors"
                        >
                          <Folder size={20} className="text-gray-400 group-hover:text-accent transition-colors" />
                        </motion.div>
                      </div>
                      <motion.h3
                        layoutId={`project-title-${project.id}`}
                        className="text-white font-medium text-sm group-hover:text-accent transition-colors mb-2"
                      >
                        {project.name}
                      </motion.h3>
                      {project.description && (
                        <motion.p
                          layoutId={`project-desc-${project.id}`}
                          className="text-xs text-gray-500 line-clamp-2"
                        >
                          {project.description}
                        </motion.p>
                      )}
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {!selectedProject && <Terminal isVisible={false} />}
    </LayoutGroup>
  );
}
