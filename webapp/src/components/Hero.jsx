import { memo } from 'react';
import { CheckCircle2, Play, Zap, ChevronRight, BookOpen, Clock, Database, Code2 } from 'lucide-react';
import { statsData } from '../lib/constants';

// Optimized Hero - No Framer Motion for faster initial paint
const Hero = memo(function Hero() {
    const stats = [
        { value: statsData.notebooks, label: "Notebooks", Icon: BookOpen },
        { value: `${statsData.hours}+`, label: "Hours Content", Icon: Clock },
        { value: statsData.datasets, label: "Datasets", Icon: Database },
        { value: `${statsData.linesOfCode}+`, label: "Lines of Code", Icon: Code2 },
    ];

    return (
        <section id="home" className="relative pt-32 pb-20 px-6 overflow-hidden">
            {/* Background glows - using CSS for performance */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-[80px] -z-10" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-400/20 dark:bg-indigo-600/10 rounded-full blur-[80px] -z-10" />

            <div className="max-w-6xl mx-auto">
                <div className="text-center animate-fade-up">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-xs font-bold uppercase tracking-widest mb-8">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        {statsData.notebooks} Notebooks • {statsData.projects} Projects • 100% Free
                    </div>

                    {/* Title */}
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight mb-6 text-slate-900 dark:text-white">
                        Python Finance
                        <br />
                        <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent inline-block">Academy</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-12">
                        Master quantitative finance with Python. From basics to ML-powered trading strategies.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                        <a
                            href="http://mybinder.org/v2/gh/mangeshraut712/alpha-quant-academy/main?urlpath=lab"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="h-12 px-8 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all"
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

                    {/* Stats Grid - CSS animations instead of Framer Motion */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto">
                        {stats.map((stat, i) => (
                            <div
                                key={i}
                                className="p-4 rounded-2xl bg-card border border-border animate-fade-up"
                                style={{ animationDelay: `${i * 100}ms` }}
                            >
                                <stat.Icon className="w-5 h-5 text-blue-600 dark:text-blue-400 mb-2" />
                                <div className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</div>
                                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
});

export default Hero;
