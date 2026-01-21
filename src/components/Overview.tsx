import { motion } from 'framer-motion';
import { Github, Linkedin, Download, ArrowRight } from 'lucide-react';
import { useTaskStore } from '../lib/store';

export function Overview() {
    const { setCurrentView } = useTaskStore();

    const handleViewProjects = () => {
        setCurrentView('projects');
    };

    const stats = [
        { label: '3+ Years Experience', value: 'Building production apps' },
        { label: 'Focus on Performance', value: '100/100 Lighthouse scores' },
        { label: 'Full Stack Capable', value: 'React, TypeScript, Node.js' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto space-y-16"
        >
            {/* Hero Section */}
            <div className="space-y-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
                        Daniel Plotnik
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-400 mb-2">
                        Senior Frontend Developer | Winnipeg, MB
                    </p>
                    <p className="text-lg text-gray-500">
                        Building high-performance web applications with React & AI.
                    </p>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-wrap gap-4"
                >
                    {/* Primary: View Projects */}
                    <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleViewProjects}
                        className="px-8 py-4 bg-accent text-black font-semibold rounded-lg hover:bg-accent/90 transition-colors flex items-center gap-2 text-lg shadow-lg shadow-accent/20"
                    >
                        View Projects
                        <ArrowRight size={20} />
                    </motion.button>

                    {/* Secondary: Download Resume */}
                    <motion.a
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        href="/Resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-4 border-2 border-gray-700 text-white font-semibold rounded-lg hover:border-accent/50 hover:bg-gray-900/30 transition-colors flex items-center gap-2 text-lg"
                    >
                        <Download size={20} />
                        Download Resume
                    </motion.a>

                    {/* Tertiary: GitHub & LinkedIn */}
                    <div className="flex gap-3">
                        <motion.a
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.9 }}
                            href="https://github.com/danielplotnik"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-4 border border-gray-800 rounded-lg hover:border-accent/50 hover:bg-gray-900/30 transition-colors"
                            aria-label="GitHub"
                        >
                            <Github size={24} className="text-gray-400 hover:text-white transition-colors" />
                        </motion.a>
                        <motion.a
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.9 }}
                            href="https://linkedin.com/in/danielplotnik"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-4 border border-gray-800 rounded-lg hover:border-accent/50 hover:bg-gray-900/30 transition-colors"
                            aria-label="LinkedIn"
                        >
                            <Linkedin size={24} className="text-gray-400 hover:text-white transition-colors" />
                        </motion.a>
                    </div>
                </motion.div>
            </div>

            {/* Quick Stats Grid */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <h2 className="text-2xl font-semibold text-white mb-6">Quick Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + index * 0.1 }}
                            whileHover={{ scale: 1.02, y: -4 }}
                            className="p-6 rounded-lg border border-gray-800 bg-gray-900/20 hover:bg-gray-900/40 hover:border-gray-700 transition-all"
                        >
                            <h3 className="text-lg font-semibold text-accent mb-2">{stat.label}</h3>
                            <p className="text-sm text-gray-400">{stat.value}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Call to Action */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="p-8 rounded-lg border border-gray-800 bg-gray-900/20 text-center"
            >
                <h3 className="text-2xl font-semibold text-white mb-3">
                    Ready to see my work?
                </h3>
                <p className="text-gray-400 mb-6">
                    Explore my portfolio of production applications and engineering case studies.
                </p>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleViewProjects}
                    className="px-6 py-3 bg-accent text-black font-semibold rounded-lg hover:bg-accent/90 transition-colors inline-flex items-center gap-2"
                >
                    View Projects
                    <ArrowRight size={18} />
                </motion.button>
            </motion.div>
        </motion.div>
    );
}
