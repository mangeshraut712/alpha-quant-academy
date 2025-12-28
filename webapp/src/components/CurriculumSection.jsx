import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, CheckCircle2, FileText, Clock, Folder } from 'lucide-react';
import { cn } from '../lib/utils';
import { curriculumData } from '../lib/constants';

const CurriculumSection = ({ tracks, onToggle }) => {
    const [expandedTrack, setExpandedTrack] = useState(1);

    const completedModules = tracks.flatMap(t => t.modules).filter(m => m.status === 'complete').length;
    const totalModules = tracks.flatMap(t => t.modules).length;

    return (
        <section id="curriculum" className="px-6 py-24 max-w-6xl mx-auto">
            <div className="mb-12">
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Learning Path</span>
                <h2 className="text-4xl font-bold tracking-tighter mt-2 mb-4">Curriculum Progress</h2>
                <div className="flex items-center gap-4">
                    <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-blue-600 to-indigo-600"
                            initial={{ width: 0 }}
                            animate={{ width: `${(completedModules / totalModules) * 100}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                        />
                    </div>
                    <span className="text-sm font-medium">{completedModules}/{totalModules} Modules</span>
                </div>
            </div>

            <div className="grid gap-4">
                {tracks.map((track, i) => (
                    <motion.div
                        key={track.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        className={cn(
                            "border border-border rounded-2xl overflow-hidden bg-card transition-all",
                            expandedTrack === track.id ? "ring-2 ring-primary/20 shadow-lg shadow-primary/5" : "hover:border-primary/20"
                        )}
                    >
                        <button
                            onClick={() => setExpandedTrack(expandedTrack === track.id ? null : track.id)}
                            className="w-full p-6 flex items-center gap-4 hover:bg-secondary/50 transition-colors"
                        >
                            <div className={cn("w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center", track.color)}>
                                <track.icon className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1 text-left">
                                <div className="font-bold text-lg">Track {track.id}: {track.title}</div>
                                <div className="text-sm text-muted-foreground">
                                    {track.modules.filter(m => m.status === 'complete').length}/{track.modules.length} modules complete
                                </div>
                            </div>
                            <ChevronRight className={cn(
                                "w-5 h-5 transition-transform",
                                expandedTrack === track.id && "rotate-90"
                            )} />
                        </button>

                        <AnimatePresence>
                            {expandedTrack === track.id && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="border-t border-border"
                                >
                                    <div className="p-6 grid gap-3">
                                        {track.modules.map((module, j) => (
                                            <button
                                                key={j}
                                                onClick={() => onToggle(track.id, module.name)}
                                                className={cn(
                                                    "w-full p-4 rounded-xl flex items-center gap-4 text-left transition-all",
                                                    module.status === 'complete'
                                                        ? "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-500/20"
                                                        : "bg-secondary/30 border-transparent hover:border-primary/20"
                                                )}
                                                style={{ borderWidth: '1px' }}
                                            >
                                                {module.status === 'complete' ? (
                                                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                                ) : (
                                                    <div className="w-5 h-5 rounded-full border-2 border-muted-foreground/30 group-hover:border-primary/50 transition-colors" />
                                                )}
                                                <div className="flex-1">
                                                    <div className="font-medium">{module.name}</div>
                                                    {module.file && (
                                                        <div className="text-[10px] text-muted-foreground font-mono flex items-center gap-1.5 mt-0.5">
                                                            <FileText className="w-3 h-3" /> {module.file}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="text-[10px] text-muted-foreground flex items-center gap-1 font-bold">
                                                    <Clock className="w-3 h-3" /> {module.duration}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>

            <div className="mt-12 p-6 rounded-2xl bg-secondary/50 border border-border">
                <div className="flex items-center gap-3 mb-4">
                    <Folder className="w-5 h-5 text-muted-foreground" />
                    <span className="font-bold">Legacy JPMorgan Notebooks</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-muted">{curriculumData.legacyNotebooks.length} files</span>
                </div>
                <div className="flex flex-wrap gap-2">
                    {curriculumData.legacyNotebooks.map((nb, i) => (
                        <span key={i} className="text-xs px-3 py-1 rounded-full bg-background border border-border font-mono">
                            {nb}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CurriculumSection;
