import { memo } from 'react';
import { CheckCircle2, Play, Zap, ChevronRight, BookOpen, Clock, Database, Code2, Sparkles } from 'lucide-react';
import { statsData } from '../lib/constants';

// Premium Hero Section
const Hero = memo(function Hero() {
    return (
        <section id="home" className="relative pt-32 pb-20 px-6 overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-500/20 dark:bg-blue-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '4s' }} />
                <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-indigo-500/20 dark:bg-indigo-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '6s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-violet-500/5 to-transparent rounded-full" />
            </div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 -z-10 opacity-[0.02] dark:opacity-[0.05]" style={{
                backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
                backgroundSize: '50px 50px'
            }} />

            <div className="max-w-5xl mx-auto text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 border border-blue-200/50 dark:border-blue-800/50 text-sm font-semibold mb-8 animate-fade-up">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span className="text-slate-700 dark:text-slate-300">{statsData.notebooks} Notebooks</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-700 dark:text-slate-300">{statsData.projects} Projects</span>
                    <span className="text-slate-400">•</span>
                    <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent font-bold">100% Free</span>
                </div>

                {/* Title */}
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter leading-[1.05] mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
                    <span className="text-slate-900 dark:text-white">Master</span>
                    <br className="sm:hidden" />
                    <span className="text-slate-900 dark:text-white"> Quantitative</span>
                    <br />
                    <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">Finance with Python</span>
                </h1>

                {/* Subtitle */}
                <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up" style={{ animationDelay: '0.2s' }}>
                    From zero to ML-powered trading strategies.
                    <span className="hidden sm:inline"> Learn Python, data analysis, and build real financial applications.</span>
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-up" style={{ animationDelay: '0.3s' }}>
                    <a
                        href="http://mybinder.org/v2/gh/mangeshraut712/alpha-quant-academy/main?urlpath=lab"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group h-14 px-8 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-blue-500/25 active:scale-[0.98] transition-all text-base"
                    >
                        <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        Start Learning Free
                    </a>
                    <button
                        onClick={() => document.getElementById('analyst')?.scrollIntoView({ behavior: 'smooth' })}
                        className="group h-14 px-8 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-violet-300 dark:hover:border-violet-700 transition-all font-semibold flex items-center justify-center gap-2 text-base hover:shadow-lg"
                    >
                        <Sparkles className="w-5 h-5 text-violet-500 group-hover:rotate-12 transition-transform" />
                        Try AI Analyst
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto animate-fade-up" style={{ animationDelay: '0.4s' }}>
                    {[
                        { value: statsData.notebooks, label: "Notebooks", Icon: BookOpen, gradient: "from-blue-500 to-cyan-500" },
                        { value: `${statsData.hours}+`, label: "Hours Content", Icon: Clock, gradient: "from-emerald-500 to-teal-500" },
                        { value: statsData.datasets, label: "Datasets", Icon: Database, gradient: "from-violet-500 to-purple-500" },
                        { value: `${statsData.linesOfCode}+`, label: "Lines of Code", Icon: Code2, gradient: "from-orange-500 to-amber-500" },
                    ].map((stat, i) => (
                        <div
                            key={i}
                            className="group p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300 cursor-default"
                        >
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                <stat.Icon className="w-5 h-5 text-white" />
                            </div>
                            <div className="text-3xl font-black text-slate-900 dark:text-white mb-1">{stat.value}</div>
                            <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
});

export default Hero;
