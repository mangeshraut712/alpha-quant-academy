import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Play, Zap, ChevronRight, BookOpen, Clock, Database, Code2 } from 'lucide-react';
import { statsData } from '../lib/constants';

const Hero = () => (
    <section id="home" className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100/50 dark:bg-blue-900/20 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-100/50 dark:bg-indigo-900/20 rounded-full blur-3xl -z-10" />

        <div className="max-w-6xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center"
            >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-xs font-bold uppercase tracking-widest mb-8">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    {statsData.notebooks} Notebooks • {statsData.projects} Projects • 100% Free
                </div>

                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight mb-6">
                    Python Finance
                    <br />
                    <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Academy</span>
                </h1>

                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
                    Master quantitative finance with Python. From basics to ML-powered trading strategies.
                    Now with Alpha Arena-inspired multi-model AI analysis.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                    <a
                        href="http://mybinder.org/v2/gh/jpmorganchase/python-training/main?urlpath=lab"
                        target="_blank"
                        className="h-12 px-8 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-all"
                    >
                        <Play className="w-4 h-4" /> Launch in Browser
                    </a>
                    <button
                        onClick={() => document.getElementById('analyst')?.scrollIntoView({ behavior: 'smooth' })}
                        className="h-12 px-8 rounded-full border border-border bg-background hover:bg-secondary transition-colors font-semibold flex items-center justify-center gap-2"
                    >
                        <Zap className="w-4 h-4" /> AI Analyst <ChevronRight className="w-4 h-4" />
                    </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
                    {[
                        { value: statsData.notebooks, label: "Notebooks", icon: BookOpen },
                        { value: `${statsData.hours}+`, label: "Hours Content", icon: Clock },
                        { value: statsData.datasets, label: "Datasets", icon: Database },
                        { value: `${statsData.linesOfCode}+`, label: "Lines of Code", icon: Code2 },
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + i * 0.1 }}
                            className="p-4 rounded-2xl bg-card border border-border"
                        >
                            <stat.icon className="w-5 h-5 text-muted-foreground mb-2" />
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <div className="text-xs text-muted-foreground">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    </section>
);

export default Hero;
