import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, CheckCircle2, Play, Clock, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';

const AIAnalystSection = ({ isSimulating, simProgress, onStartSim }) => {
    const [activeTab, setActiveTab] = useState('overview');

    const alphaArenaFeatures = [
        {
            title: "Consensus Architecture",
            icon: "🤖",
            description: "Three specialized AI models (DeepSeek, GPT, Claude style) analyze markets independently.",
            stats: ["75%+ Confidence", "Weighted Voting", "Consensus"]
        },
        {
            title: "Intelligent Backtesting",
            icon: "⚡",
            description: "Run 100+ simulated iterations to test strategy robustness before live capital exposure.",
            stats: ["Monte Carlo", "Outcome Prob", "Stress Test"]
        },
        {
            title: "Smart Risk Controls",
            icon: "🛡️",
            description: "Institutional-grade safeguards: Drawdown Shield, Volatility Monitor, Position Sizing.",
            stats: ["10% max DD", "ATR-based SL", "Dynamic sizing"]
        },
        {
            title: "Career Roadmap",
            icon: "🎓",
            description: "Comprehensive path from technical basics to quantitative system design and interviews.",
            stats: ["25+ Modules", "JPMC Curated", "Job Ready"]
        }
    ];

    return (
        <section id="analyst" className="px-6 py-24">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-500/20 to-indigo-500/20 text-sm font-bold mb-6">
                        <Zap className="w-4 h-4 text-violet-500 animate-pulse" /> Alpha Arena Engine v2.0
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 px-2">
                        The Most Advanced AI <br className="hidden md:block" />
                        <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Quant Training Environment</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto px-4">
                        Inspired by nof1.ai Alpha Arena — master the architecture of autonomous multi-agent trading systems with layered risk protection.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 px-4 md:px-0">
                    {alphaArenaFeatures.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-6 rounded-2xl bg-card border border-border hover:border-violet-500/30 hover:shadow-lg hover:shadow-violet-500/5 transition-all group"
                        >
                            <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">{feature.icon}</div>
                            <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                            <p className="text-sm text-muted-foreground mb-4">{feature.description}</p>
                            <div className="flex flex-wrap gap-2">
                                {feature.stats.map((stat, j) => (
                                    <span key={j} className="text-[10px] px-2 py-1 rounded-full bg-violet-500/10 text-violet-500 font-medium whitespace-nowrap">
                                        {stat}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mx-4 md:mx-0 rounded-[32px] bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 text-white p-8 md:p-12 relative overflow-hidden border border-white/5"
                >
                    <div className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-l from-violet-500/10 to-transparent pointer-events-none" />

                    <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="flex flex-wrap gap-2 mb-8">
                                {['overview', 'models', 'risk', 'backtest'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={cn(
                                            "px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all",
                                            activeTab === tab
                                                ? "bg-white text-black shadow-lg shadow-white/10"
                                                : "bg-white/5 text-white/50 hover:bg-white/10"
                                        )}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>

                            <div className="min-h-[320px]">
                                {activeTab === 'overview' && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                        <h3 className="text-3xl font-bold mb-6">Autonomous Control Center</h3>
                                        <p className="text-slate-400 mb-8 leading-relaxed text-sm">
                                            A multi-layered system designed to protect capital while aggressively pursuing alpha.
                                            Manage 7 core AI features from a single unified control plane.
                                        </p>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                                            {[
                                                "Multi-Model Consensus", "Intelligent SL/TP",
                                                "Alpha Arena Simulator", "Risk Drawdown Shield",
                                                "Sentiment Analysis v2", "Volatility Engine", "Performance Audit"
                                            ].map((feat, i) => (
                                                <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                                                    <CheckCircle2 className="w-3.5 h-3.5 text-violet-400" /> {feat}
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === 'models' && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                        <h3 className="text-3xl font-bold mb-6 text-white">Model Consensus Hub</h3>
                                        <div className="space-y-4 mb-8">
                                            {[
                                                { name: "Technical (DeepSeek)", focus: "Price action & Momentum", color: "from-blue-500 to-blue-600" },
                                                { name: "Fundamental (GPT)", focus: "Value & Growth metrics", color: "from-emerald-500 to-emerald-600" },
                                                { name: "Sentiment (Claude)", focus: "News & Social Intelligence", color: "from-amber-500 to-amber-600" }
                                            ].map((model, i) => (
                                                <div key={i} className="flex items-center gap-4 group">
                                                    <div className={cn("w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center text-xl shadow-lg ring-1 ring-white/10", model.color)}>
                                                        🧠
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-xs group-hover:text-violet-400 transition-colors uppercase tracking-tight">{model.name}</div>
                                                        <div className="text-[10px] text-white/70 font-medium">{model.focus}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === 'risk' && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                        <h3 className="text-3xl font-bold mb-6">Institutional Guardrails</h3>
                                        <div className="space-y-4 mb-8">
                                            {[
                                                { name: "Drawdown Shield", desc: "Forced pause at 10% peak-to-trough", icon: "🛡️" },
                                                { name: "Daily Loss Limit", desc: "Max 3% risk exposure per 24h", icon: "📉" },
                                                { name: "ATR Volatility Monitor", desc: "Dynamic position sizing", icon: "📊" }
                                            ].map((control, i) => (
                                                <div key={i} className="flex items-center gap-4 bg-white/5 p-3 rounded-xl border border-white/5">
                                                    <span className="text-xl">{control.icon}</span>
                                                    <div>
                                                        <div className="font-bold text-xs tracking-tight">{control.name}</div>
                                                        <div className="text-[10px] text-white/70 font-medium">{control.desc}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === 'backtest' && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                        <h3 className="text-3xl font-bold mb-6">Simulation Sandbox</h3>
                                        <div className="bg-white/5 p-6 rounded-2xl border border-white/5 mb-6">
                                            <div className="flex items-center justify-between mb-4">
                                                <span className="text-xs font-bold opacity-60">TEST: AAPL_STRAT_v2</span>
                                                <span className="text-[10px] px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-full font-bold">READY</span>
                                            </div>
                                            <div className="space-y-4">
                                                {[
                                                    { label: "Iterations", value: "100 Runs" },
                                                    { label: "Win Probability", value: "62.4%" },
                                                    { label: "Est. Sharpe", value: "2.14" },
                                                    { label: "Max Stress DD", value: "4.2%" }
                                                ].map((stat, i) => (
                                                    <div key={i} className="flex justify-between border-b border-white/5 pb-2">
                                                        <span className="text-xs text-slate-400">{stat.label}</span>
                                                        <span className="text-xs font-bold text-white">{stat.value}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <button
                                            onClick={onStartSim}
                                            disabled={isSimulating}
                                            className={cn(
                                                "w-full h-10 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2",
                                                isSimulating ? "bg-slate-800 text-slate-400" : "bg-violet-600 text-white hover:bg-violet-700 shadow-lg shadow-violet-600/20"
                                            )}
                                        >
                                            {isSimulating ? <><Clock className="w-4 h-4 animate-spin" /> Simulating... {simProgress}%</> : <><Play className="w-4 h-4" /> Start simulation</>}
                                        </button>
                                    </motion.div>
                                )}
                            </div>

                            <div className="mt-8 flex items-center gap-4">
                                <button className="h-10 px-6 rounded-full border border-white/20 text-white/80 font-semibold text-xs hover:bg-white hover:text-black hover:border-white transition-all flex items-center gap-2 group">
                                    Learning Guide <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                                <div className="text-[10px] font-bold text-white uppercase tracking-widest bg-white/10 px-4 py-2 rounded-full border border-white/20">
                                    Next Lab: Multi-agent optimization
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-950/80 rounded-2xl p-6 border border-white/10 font-mono text-sm shadow-2xl relative min-h-[400px] flex flex-col">
                            <div className="absolute top-0 left-0 right-0 h-8 bg-white/5 border-b border-white/10 flex items-center px-4 gap-2 rounded-t-2xl">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
                                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
                                <span className="text-[10px] text-white/30 ml-2 font-bold uppercase tracking-widest">Quant-Terminal v2.0.4</span>
                            </div>

                            <div className="mt-8 space-y-4 text-[10px] md:text-xs flex-1">
                                <div className="flex gap-2">
                                    <span className="text-emerald-500 opacity-50">$</span>
                                    <span className="text-slate-300">python enhanced_engine.py --backtest AAPL</span>
                                </div>

                                {!isSimulating && simProgress === 0 && (
                                    <div className="text-slate-500 italic"># Waiting for input. Press 'Start Simulation' above to run the AI analyst test.</div>
                                )}

                                {(isSimulating || simProgress > 0) && (
                                    <div className="space-y-3">
                                        <div className="text-violet-400 font-bold">🚀 STARTING SIMULATION: AAPL (100 iterations)</div>

                                        <div className="space-y-1 opacity-80">
                                            <div className="flex justify-between items-center bg-white/5 p-2 rounded">
                                                <span className="text-slate-400">INITIALIZING MODELS:</span>
                                                <span className="text-emerald-400 font-bold">{simProgress > 20 ? 'COMPLETE' : 'LOADING...'}</span>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="text-slate-500 text-[9px]">Computing 100 Monte Carlo scenarios...</div>
                                            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                                                <motion.div
                                                    className="h-full bg-violet-500"
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${simProgress}%` }}
                                                    transition={{ duration: 0.1 }}
                                                />
                                            </div>
                                        </div>

                                        {simProgress > 50 && (
                                            <div className="bg-indigo-500/10 border border-indigo-500/20 p-3 rounded-lg animate-in fade-in slide-in-from-bottom-2 duration-500">
                                                <div className="text-[10px] font-bold text-indigo-300 mb-2 uppercase tracking-widest">Mid-point Report</div>
                                                <div className="grid grid-cols-2 gap-y-1 text-[11px] font-medium">
                                                    <span className="text-slate-400">Curr. Profit:</span> <span className="text-emerald-400 text-right">+$1,448.04</span>
                                                    <span className="text-slate-400">Win Rate:</span> <span className="text-white text-right">62.0%</span>
                                                </div>
                                            </div>
                                        )}

                                        {simProgress === 100 && (
                                            <div className="flex flex-col gap-2 pt-2 animate-in zoom-in duration-300">
                                                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                                                    <CheckCircle2 className="w-4 h-4" /> SIMULATION COMPLETE
                                                </div>
                                                <div className="bg-indigo-500/10 border border-indigo-500/20 p-3 rounded-lg mt-2">
                                                    <div className="flex justify-between text-[11px] font-mono">
                                                        <span className="text-slate-400">Total P&L:</span>
                                                        <span className="text-emerald-400">+$33,155.44</span>
                                                    </div>
                                                    <div className="flex justify-between text-[11px] font-mono">
                                                        <span className="text-slate-400">Sharpe:</span>
                                                        <span className="text-white">+7.922</span>
                                                    </div>
                                                </div>
                                                <div className="text-[9px] text-slate-500 uppercase tracking-widest font-bold bg-white/5 py-1 px-3 rounded w-fit">Strategy Status: READY FOR PROPOSALS</div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default AIAnalystSection;
