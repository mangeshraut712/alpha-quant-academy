import { memo } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Play, Zap, ChevronRight, BookOpen, Clock, Database, Code2, Sparkles, ArrowRight } from 'lucide-react';
import { statsData } from '../lib/constants';

// Apple-style spring animation config
const spring = {
    type: "spring",
    stiffness: 300,
    damping: 30
};

// Stagger children animation
const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 30 },
    show: {
        opacity: 1,
        y: 0,
        transition: spring
    }
};

// Premium Hero Section with Apple-style animations
const Hero = memo(function Hero() {
    return (
        <section id="home" className="relative min-h-[90vh] flex items-center justify-center pt-20 pb-20 px-6 overflow-hidden">
            {/* Animated Background Orbs */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <motion.div
                    className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full"
                    style={{
                        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
                    }}
                    animate={{
                        scale: [1, 1.2, 1],
                        x: [0, 50, 0],
                        y: [0, 30, 0],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full"
                    style={{
                        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 70%)',
                    }}
                    animate={{
                        scale: [1.2, 1, 1.2],
                        x: [0, -30, 0],
                        y: [0, -50, 0],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>

            {/* Grid Pattern */}
            <div
                className="absolute inset-0 -z-10 opacity-[0.015] dark:opacity-[0.03]"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
          `,
                    backgroundSize: '60px 60px'
                }}
            />

            <motion.div
                className="max-w-5xl mx-auto text-center"
                variants={container}
                initial="hidden"
                animate="show"
            >
                {/* Badge */}
                <motion.div
                    variants={item}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass text-sm font-medium mb-8"
                >
                    <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    </motion.div>
                    <span className="text-slate-600 dark:text-slate-300">{statsData.notebooks} Notebooks</span>
                    <span className="text-slate-300 dark:text-slate-600">•</span>
                    <span className="text-slate-600 dark:text-slate-300">{statsData.projects} Projects</span>
                    <span className="text-slate-300 dark:text-slate-600">•</span>
                    <span className="font-bold text-gradient-blue">100% Free</span>
                </motion.div>

                {/* Title */}
                <motion.h1
                    variants={item}
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] mb-8"
                >
                    <span className="text-slate-900 dark:text-white">Master</span>
                    <br />
                    <span className="text-gradient-blue">Quantitative Finance</span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    variants={item}
                    className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed font-medium"
                >
                    From Python fundamentals to ML-powered trading strategies.
                    <span className="hidden sm:inline text-slate-400 dark:text-slate-500"> Build real financial applications with hands-on projects.</span>
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    variants={item}
                    className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
                >
                    <motion.a
                        href="http://mybinder.org/v2/gh/mangeshraut712/alpha-quant-academy/main?urlpath=lab"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group h-14 px-8 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold flex items-center justify-center gap-3 shadow-2xl shadow-slate-900/20 dark:shadow-white/10"
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        transition={spring}
                    >
                        <Play className="w-5 h-5" />
                        Start Learning
                        <ArrowRight className="w-4 h-4 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    </motion.a>

                    <motion.button
                        onClick={() => document.getElementById('analyst')?.scrollIntoView({ behavior: 'smooth' })}
                        className="group h-14 px-8 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm font-semibold flex items-center justify-center gap-3"
                        whileHover={{ scale: 1.02, y: -2, borderColor: 'rgb(139, 92, 246)' }}
                        whileTap={{ scale: 0.98 }}
                        transition={spring}
                    >
                        <Sparkles className="w-5 h-5 text-violet-500" />
                        Try AI Analyst
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                </motion.div>

                {/* Stats Grid */}
                <motion.div
                    variants={container}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
                >
                    {[
                        { value: statsData.notebooks, label: "Notebooks", Icon: BookOpen, color: "from-blue-500 to-cyan-400" },
                        { value: `${statsData.hours}+`, label: "Hours", Icon: Clock, color: "from-emerald-500 to-teal-400" },
                        { value: statsData.datasets, label: "Datasets", Icon: Database, color: "from-violet-500 to-purple-400" },
                        { value: `${statsData.linesOfCode}+`, label: "LOC", Icon: Code2, color: "from-orange-500 to-amber-400" },
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            variants={item}
                            className="card-interactive p-6 text-center"
                            whileHover={{ y: -8, scale: 1.02 }}
                            transition={spring}
                        >
                            <motion.div
                                className={`w-12 h-12 mx-auto rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 shadow-lg`}
                                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <stat.Icon className="w-6 h-6 text-white" />
                            </motion.div>
                            <div className="text-3xl font-black text-slate-900 dark:text-white mb-1">{stat.value}</div>
                            <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">{stat.label}</div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
                <div className="w-6 h-10 rounded-full border-2 border-slate-300 dark:border-slate-600 flex justify-center pt-2">
                    <motion.div
                        className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500"
                        animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                </div>
            </motion.div>
        </section>
    );
});

export default Hero;
