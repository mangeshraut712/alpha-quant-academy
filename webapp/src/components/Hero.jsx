import { memo } from 'react';
import { CheckCircle2, Play, Zap, ChevronRight, BookOpen, Clock, Database, Code2 } from 'lucide-react';
import { statsData } from '../lib/constants';

// Optimized Hero - Clean, focused, minimal
const Hero = memo(function Hero() {
    return (
        <section id="home" className="relative pt-28 pb-16 px-6 overflow-hidden">
            {/* Background glows */}
            <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-blue-500/10 dark:bg-blue-600/5 rounded-full blur-[100px] -z-10" />
            <div className="absolute bottom-0 right-1/4 w-1/2 h-1/2 bg-indigo-500/10 dark:bg-indigo-600/5 rounded-full blur-[100px] -z-10" />

            <div className="max-w-4xl mx-auto text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-bold uppercase tracking-widest mb-8 text-slate-600 dark:text-slate-400">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    {statsData.notebooks} Notebooks • {statsData.projects} Projects • 100% Free
                </div>

                {/* Title */}
                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.1] mb-6">
                    <span className="text-slate-900 dark:text-white">Python Finance</span>
                    <br />
                    <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Academy</span>
                </h1>

                {/* Subtitle */}
                <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                    Master quantitative finance with Python. From basics to ML-powered trading strategies.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                    <a
                        href="http://mybinder.org/v2/gh/mangeshraut712/alpha-quant-academy/main?urlpath=lab"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-14 px-8 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-blue-500/25 active:scale-[0.98] transition-all text-base"
                    >
                        <Play className="w-5 h-5" /> Launch in Browser
                    </a>
                    <button
                        onClick={() => document.getElementById('analyst')?.scrollIntoView({ behavior: 'smooth' })}
                        className="h-14 px-8 rounded-full border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-600 transition-colors font-semibold flex items-center justify-center gap-2 text-base"
                    >
                        <Zap className="w-5 h-5 text-violet-500" /> AI Analyst <ChevronRight className="w-4 h-4" />
                    </button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                    {[
                        { value: statsData.notebooks, label: "Notebooks", Icon: BookOpen, color: "text-blue-600 dark:text-blue-400" },
                        { value: `${statsData.hours}+`, label: "Hours Content", Icon: Clock, color: "text-emerald-600 dark:text-emerald-400" },
                        { value: statsData.datasets, label: "Datasets", Icon: Database, color: "text-violet-600 dark:text-violet-400" },
                        { value: `${statsData.linesOfCode}+`, label: "Lines of Code", Icon: Code2, color: "text-orange-600 dark:text-orange-400" },
                    ].map((stat, i) => (
                        <div
                            key={i}
                            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <stat.Icon className={`w-5 h-5 ${stat.color} mb-3`} />
                            <div className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</div>
                            <div className="text-xs text-slate-500 dark:text-slate-500 font-medium">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
});

export default Hero;
