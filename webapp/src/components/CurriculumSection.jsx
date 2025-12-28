import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, CheckCircle2, FileText, Clock, Folder, ExternalLink, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';

const CurriculumSection = ({ tracks, onToggle }) => {
    const [expandedTrack, setExpandedTrack] = useState(1);

    const completedModules = tracks.flatMap(t => t.modules).filter(m => m.status === 'complete').length;
    const totalModules = tracks.flatMap(t => t.modules).length;
    const progressPercent = (completedModules / totalModules) * 100;

    const trackColors = {
        1: 'from-emerald-500 to-teal-500',
        2: 'from-blue-500 to-cyan-500',
        3: 'from-violet-500 to-purple-500',
        4: 'from-orange-500 to-amber-500',
        5: 'from-pink-500 to-rose-500',
        6: 'from-indigo-500 to-blue-500',
        7: 'from-cyan-500 to-teal-500',
    };

    return (
        <section id="curriculum" className="px-6 py-20 max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-12">
                <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">Learning Path</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4 text-slate-900 dark:text-white">
                    Curriculum Progress
                </h2>

                {/* Progress Bar */}
                <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                    <div className="flex-1">
                        <div className="flex justify-between text-sm mb-2">
                            <span className="font-medium text-slate-700 dark:text-slate-300">Overall Progress</span>
                            <span className="font-bold text-slate-900 dark:text-white">{Math.round(progressPercent)}%</span>
                        </div>
                        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${progressPercent}%` }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                            />
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-black text-slate-900 dark:text-white">{completedModules}/{totalModules}</div>
                        <div className="text-xs text-slate-500">Modules</div>
                    </div>
                </div>
            </div>

            {/* Tracks */}
            <div className="grid gap-4">
                {tracks.map((track, i) => {
                    const isExpanded = expandedTrack === track.id;
                    const trackCompleted = track.modules.filter(m => m.status === 'complete').length;
                    const trackProgress = (trackCompleted / track.modules.length) * 100;

                    return (
                        <motion.div
                            key={track.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            className={cn(
                                "rounded-2xl border overflow-hidden transition-all duration-300",
                                isExpanded
                                    ? "bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 shadow-xl"
                                    : "bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                            )}
                        >
                            {/* Track Header */}
                            <button
                                onClick={() => setExpandedTrack(isExpanded ? null : track.id)}
                                className="w-full p-5 flex items-center gap-4 text-left"
                            >
                                <div className={cn(
                                    "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center text-white font-black text-lg shadow-lg",
                                    trackColors[track.id] || 'from-slate-500 to-slate-600'
                                )}>
                                    {track.id}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-lg text-slate-900 dark:text-white truncate">{track.title}</h3>
                                    <div className="flex items-center gap-3 text-sm text-slate-500">
                                        <span>{track.modules.length} modules</span>
                                        <span>•</span>
                                        <span>{trackCompleted} completed</span>
                                    </div>
                                </div>
                                <div className="hidden sm:block w-32">
                                    <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                        <div
                                            className={cn("h-full rounded-full bg-gradient-to-r", trackColors[track.id])}
                                            style={{ width: `${trackProgress}%` }}
                                        />
                                    </div>
                                </div>
                                <ChevronRight className={cn(
                                    "w-5 h-5 text-slate-400 transition-transform duration-300",
                                    isExpanded && "rotate-90"
                                )} />
                            </button>

                            {/* Modules */}
                            <AnimatePresence>
                                {isExpanded && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="border-t border-slate-200 dark:border-slate-700"
                                    >
                                        <div className="p-4 grid gap-2">
                                            {track.modules.map((module, j) => (
                                                <button
                                                    key={j}
                                                    onClick={() => onToggle(track.id, module.name)}
                                                    className={cn(
                                                        "group w-full p-4 rounded-xl flex items-center gap-4 text-left transition-all",
                                                        module.status === 'complete'
                                                            ? "bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800"
                                                            : "bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent"
                                                    )}
                                                >
                                                    <div className={cn(
                                                        "w-8 h-8 rounded-lg flex items-center justify-center transition-all",
                                                        module.status === 'complete'
                                                            ? "bg-emerald-500 text-white"
                                                            : "bg-slate-200 dark:bg-slate-700 text-slate-500 group-hover:bg-slate-300 dark:group-hover:bg-slate-600"
                                                    )}>
                                                        {module.status === 'complete' ? (
                                                            <CheckCircle2 className="w-4 h-4" />
                                                        ) : (
                                                            <FileText className="w-4 h-4" />
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className={cn(
                                                            "font-medium truncate",
                                                            module.status === 'complete' ? "text-emerald-700 dark:text-emerald-400" : "text-slate-700 dark:text-slate-300"
                                                        )}>
                                                            {module.name}
                                                        </div>
                                                        <div className="flex items-center gap-2 text-xs text-slate-500">
                                                            <Clock className="w-3 h-3" />
                                                            {module.duration}
                                                        </div>
                                                    </div>
                                                    <a
                                                        href={`http://mybinder.org/v2/gh/mangeshraut712/alpha-quant-academy/main?urlpath=lab/tree/${module.file}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        onClick={(e) => e.stopPropagation()}
                                                        className="hidden sm:flex items-center gap-1 text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline"
                                                    >
                                                        Open <ExternalLink className="w-3 h-3" />
                                                    </a>
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
};

export default CurriculumSection;
