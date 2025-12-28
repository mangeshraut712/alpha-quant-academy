import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, FileText, BookOpen } from 'lucide-react';
import { cn } from '../lib/utils';
import { projectsData } from '../lib/constants';

const ProjectsSection = () => {
    const [activeProject, setActiveProject] = useState(null);

    return (
        <section id="projects" className="px-6 py-24 bg-slate-50 dark:bg-slate-900/50 border-y border-border">
            <div className="max-w-6xl mx-auto">
                <div className="mb-12">
                    <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Hands-On Practice</span>
                    <h2 className="text-4xl font-bold tracking-tighter mt-2">Core Projects</h2>
                    <p className="text-muted-foreground mt-2 text-sm">Hover over a project to see how to start it!</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {projectsData.map((project, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            onMouseEnter={() => setActiveProject(i)}
                            onMouseLeave={() => setActiveProject(null)}
                            className="bg-card border border-border rounded-2xl overflow-hidden flex flex-col relative group"
                        >
                            <div className={cn("h-2", project.color)} />
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full text-white uppercase tracking-wider", project.color)}>
                                        {project.level}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                                <p className="text-sm text-muted-foreground mb-4 flex-1">{project.description}</p>

                                <div className="bg-slate-900 p-3 rounded-lg border border-white/10 mb-4 overflow-hidden shadow-inner">
                                    <div className="text-[9px] font-bold text-white/50 uppercase mb-2 tracking-wider">Code Snippet</div>
                                    <pre className="text-[10px] text-white font-mono leading-relaxed truncate">
                                        {project.preview}
                                    </pre>
                                </div>

                                <div className="mb-4">
                                    <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Key Features</div>
                                    <div className="space-y-1">
                                        {project.features.slice(0, 4).map((feat, j) => (
                                            <div key={j} className="text-xs flex items-center gap-2">
                                                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                                                {feat}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-1 mb-4">
                                    {project.skills.map((skill, j) => (
                                        <span key={j} className="text-[9px] px-1.5 py-0.5 rounded-full bg-secondary font-bold uppercase border border-border">
                                            {skill}
                                        </span>
                                    ))}
                                </div>

                                <div className="text-[10px] font-mono text-slate-600 dark:text-slate-400 flex items-center gap-1.5 mt-auto pt-4 border-t border-border font-medium">
                                    <FileText className="w-3 h-3 text-blue-600 dark:text-blue-400" /> {project.file}
                                </div>
                            </div>

                            {/* Hover Guide Overlay */}
                            <AnimatePresence>
                                {activeProject === i && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute inset-0 bg-background/95 backdrop-blur-sm p-6 flex flex-col justify-center items-center text-center z-10"
                                    >
                                        <BookOpen className="w-10 h-10 text-primary mb-4" />
                                        <h4 className="font-bold text-lg mb-2">How to Run</h4>
                                        <p className="text-xs text-muted-foreground mb-6">
                                            Execute the following command in your terminal to launch this {project.title.toLowerCase()} tool:
                                        </p>
                                        <div className="flex flex-col gap-2 w-full">
                                            <div className="bg-white/10 p-2 rounded text-[9px] font-mono text-white/70 mb-2 truncate">
                                                $ {project.command}
                                            </div>
                                            <a href="http://mybinder.org/v2/gh/mangeshraut712/alpha-quant-academy/main?urlpath=lab" target="_blank" className="bg-primary text-primary-foreground h-9 flex items-center justify-center rounded-lg font-bold text-xs">
                                                Open Project Files
                                            </a>
                                            <button className="h-9 border border-border rounded-lg text-xs font-bold hover:bg-secondary">
                                                View Solution
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProjectsSection;
