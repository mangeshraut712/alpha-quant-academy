import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Users, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { datasetsData } from '../lib/constants';

const DataSection = () => {
    const [activeDataset, setActiveDataset] = useState(null);

    return (
        <section id="data" className="px-6 py-24 max-w-6xl mx-auto">
            <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
                <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">The Workbench</span>
                    <h2 className="text-4xl font-bold tracking-tighter mt-2">Sample Datasets</h2>
                    <p className="text-muted-foreground mt-2">Realistic financial data for hands-on practice</p>
                </div>
                <div className="text-xs font-bold px-4 py-2 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 shadow-sm">
                    Hint: Use <span className="font-mono text-[10px] bg-blue-500/10 px-1 rounded">pd.read_csv('{activeDataset !== null ? datasetsData[activeDataset].name : 'filename.csv'}')</span> to load.
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {datasetsData.map((dataset, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        onClick={() => setActiveDataset(activeDataset === i ? null : i)}
                        className={cn(
                            "p-6 rounded-2xl border border-border bg-card hover:border-primary/40 transition-all cursor-pointer group relative overflow-hidden",
                            activeDataset === i && "ring-2 ring-primary/20 bg-primary/[0.02]"
                        )}
                    >
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Database className="w-5 h-5 text-blue-500" />
                            </div>
                            <div>
                                <div className="font-mono text-sm font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">{dataset.name}</div>
                                <div className="text-xs text-slate-600 dark:text-slate-400 mt-2 font-medium">{dataset.description}</div>
                                <div className="text-[10px] text-slate-700 dark:text-slate-300 mt-4 font-bold flex items-center gap-1.5 uppercase tracking-widest">
                                    <Users className="w-3 h-3 text-blue-600 dark:text-blue-400" /> {dataset.rows} Rows
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex gap-2">
                            <button className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded bg-secondary hover:bg-secondary/80 transition-colors">Download</button>
                            <button className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded bg-primary/10 text-primary hover:bg-primary/20 transition-colors">Preview data</button>
                        </div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {activeDataset !== null && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="mt-12 p-8 rounded-3xl bg-slate-900 text-white border border-white/10 shadow-2xl relative overflow-hidden"
                    >
                        <button onClick={() => setActiveDataset(null)} className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                        <div className="flex items-center gap-3 mb-8">
                            <Database className="w-6 h-6 text-blue-400" />
                            <h4 className="text-xl font-bold">Preview: {datasetsData[activeDataset].name}</h4>
                        </div>
                        <div className="overflow-x-auto rounded-xl border border-white/5 bg-slate-950/50">
                            <table className="w-full text-xs font-mono text-left">
                                <thead className="bg-white/5 text-slate-500 uppercase tracking-widest">
                                    <tr>
                                        <th className="px-4 py-3 border-r border-white/5">Date</th>
                                        <th className="px-4 py-3 border-r border-white/5">Open</th>
                                        <th className="px-4 py-3 border-r border-white/5">High</th>
                                        <th className="px-4 py-3 border-r border-white/5">Low</th>
                                        <th className="px-4 py-3 border-r border-white/5">Close</th>
                                        <th className="px-4 py-3">Volume</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                                            <td className="px-4 py-2 border-r border-white/5 text-slate-400">2023-12-0{i}</td>
                                            <td className="px-4 py-2 border-r border-white/5">{150 + i * 2}.50</td>
                                            <td className="px-4 py-2 border-r border-white/5">{152 + i * 2}.25</td>
                                            <td className="px-4 py-2 border-r border-white/5">{149 + i * 2}.10</td>
                                            <td className="px-4 py-2 border-r border-white/5 text-emerald-400">{151 + i * 2}.45</td>
                                            <td className="px-4 py-2 text-slate-500">{(50000 + i * 1000).toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-8 pt-8 border-t border-white/10 flex justify-between items-center text-xs">
                            <p className="text-slate-400 italic">Showing top 5 rows for validation. For full analysis, launch the Jupyter Notebook environment.</p>
                            <div className="flex gap-4">
                                <button className="text-blue-400 font-bold hover:underline underline-offset-4">Full Dataset CSV</button>
                                <button className="text-white font-bold bg-blue-600 px-4 py-2 rounded-lg" onClick={() => window.open('http://mybinder.org/v2/gh/mangeshraut712/alpha-quant-academy/main?urlpath=lab', '_blank')}>Open in Binder</button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default DataSection;
