import { Database, ExternalLink, FileSpreadsheet, BarChart3, Globe, TrendingUp, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

const datasets = [
    {
        id: 1,
        name: "S&P 500 Historical Data",
        description: "Complete historical price data for all S&P 500 companies including OHLCV, splits, and dividends.",
        icon: TrendingUp,
        format: "CSV",
        size: "50MB+",
        records: "10M+ rows",
        gradient: "from-blue-500 to-cyan-500"
    },
    {
        id: 2,
        name: "SEC Financial Filings",
        description: "Quarterly and annual financial statements, balance sheets, and income statements from SEC EDGAR.",
        icon: FileSpreadsheet,
        format: "JSON/XML",
        size: "100MB+",
        records: "50K+ filings",
        gradient: "from-emerald-500 to-teal-500"
    },
    {
        id: 3,
        name: "Crypto Market Data",
        description: "Real-time and historical cryptocurrency prices, trading volumes, and market cap data.",
        icon: DollarSign,
        format: "API",
        size: "Live",
        records: "1000+ coins",
        gradient: "from-orange-500 to-amber-500"
    },
    {
        id: 4,
        name: "Economic Indicators",
        description: "Federal Reserve data including GDP, inflation, unemployment, and interest rates.",
        icon: BarChart3,
        format: "CSV/API",
        size: "10MB+",
        records: "500+ indicators",
        gradient: "from-violet-500 to-purple-500"
    },
    {
        id: 5,
        name: "News Sentiment Data",
        description: "Pre-processed financial news with sentiment scores for NLP and trading signal research.",
        icon: Globe,
        format: "JSON",
        size: "25MB+",
        records: "100K+ articles",
        gradient: "from-pink-500 to-rose-500"
    },
    {
        id: 6,
        name: "Options Chain Data",
        description: "Historical options data including Greeks, implied volatility, and open interest.",
        icon: TrendingUp,
        format: "CSV",
        size: "75MB+",
        records: "5M+ contracts",
        gradient: "from-indigo-500 to-blue-500"
    },
];

const DataSection = () => {
    return (
        <section id="data" className="px-6 py-20 max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-12">
                <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                        <Database className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Resources</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-2 text-slate-900 dark:text-white">
                    Financial Datasets
                </h2>
                <p className="text-slate-600 dark:text-slate-400">Real-world data for learning and building projects</p>
            </div>

            {/* Datasets Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {datasets.map((dataset, i) => (
                    <motion.div
                        key={dataset.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        className="group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-xl transition-all duration-300"
                    >
                        <div className="flex items-start gap-4">
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${dataset.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                                <dataset.icon className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-slate-900 dark:text-white mb-1 truncate">{dataset.name}</h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-3">{dataset.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-[10px] font-bold text-slate-600 dark:text-slate-400">
                                        {dataset.format}
                                    </span>
                                    <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-[10px] font-bold text-slate-600 dark:text-slate-400">
                                        {dataset.size}
                                    </span>
                                    <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-[10px] font-bold text-slate-600 dark:text-slate-400">
                                        {dataset.records}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* CTA */}
            <div className="mt-10 text-center">
                <a
                    href="http://mybinder.org/v2/gh/mangeshraut712/alpha-quant-academy/main?urlpath=lab/tree/data"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold hover:shadow-lg hover:shadow-emerald-500/25 transition-all"
                >
                    Explore All Datasets <ExternalLink className="w-4 h-4" />
                </a>
            </div>
        </section>
    );
};

export default DataSection;
