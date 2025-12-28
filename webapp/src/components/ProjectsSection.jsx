import { Folder, ExternalLink, Star, Code, TrendingUp, Brain, Github, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const projects = [
    {
        id: 1,
        title: "Stock Portfolio Tracker",
        description: "Build a complete portfolio management system with real-time data, performance analytics, and interactive visualizations.",
        icon: TrendingUp,
        level: "Beginner",
        levelColor: "from-emerald-500 to-teal-500",
        tech: ["Python", "Pandas", "yfinance", "Plotly"],
        folder: "projects/beginner/stock_portfolio_tracker/",
        stars: 4,
        duration: "4-6 hours"
    },
    {
        id: 2,
        title: "Financial Dashboard",
        description: "Create an interactive Streamlit dashboard with multiple financial indicators, charts, and real-time market data.",
        icon: Code,
        level: "Intermediate",
        levelColor: "from-blue-500 to-indigo-500",
        tech: ["Streamlit", "Python", "Altair", "APIs"],
        folder: "projects/intermediate/financial_dashboard/",
        stars: 4,
        duration: "6-8 hours"
    },
    {
        id: 3,
        title: "AI Stock Analyst v2.0",
        description: "Advanced multi-model AI system with sentiment analysis, ML predictions, Monte Carlo simulations, and risk management.",
        icon: Brain,
        level: "Advanced",
        levelColor: "from-violet-500 to-purple-500",
        tech: ["ML", "NLP", "Monte Carlo", "LLMs"],
        folder: "projects/advanced/ai_stock_analyst",
        stars: 5,
        featured: true,
        duration: "10-15 hours"
    },
];

const ProjectsSection = () => {
    return (
        <section id="projects" className="px-6 py-20 max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-12">
                <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                        <Folder className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-orange-600 dark:text-orange-400">Hands-On Practice</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-2 text-slate-900 dark:text-white">
                    Real-World Projects
                </h2>
                <p className="text-slate-600 dark:text-slate-400">Build portfolio-worthy applications from scratch</p>
            </div>

            {/* Projects Grid */}
            <div className="grid md:grid-cols-3 gap-6">
                {projects.map((project, i) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className={`group relative rounded-2xl border overflow-hidden transition-all duration-300 hover:shadow-2xl ${project.featured
                                ? "bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/50 dark:to-purple-950/50 border-violet-200 dark:border-violet-800"
                                : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                            }`}
                    >
                        {project.featured && (
                            <div className="absolute top-0 right-0">
                                <div className="bg-gradient-to-r from-violet-500 to-purple-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg">
                                    FEATURED
                                </div>
                            </div>
                        )}

                        <div className="p-6">
                            {/* Icon & Level */}
                            <div className="flex items-start justify-between mb-4">
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${project.levelColor} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                                    <project.icon className="w-7 h-7 text-white" />
                                </div>
                                <div className="flex items-center gap-1">
                                    {[...Array(project.stars)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                                    ))}
                                </div>
                            </div>

                            {/* Title & Description */}
                            <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold mb-3 ${project.level === 'Beginner' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' :
                                    project.level === 'Intermediate' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' :
                                        'bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400'
                                }`}>
                                {project.level} • {project.duration}
                            </div>

                            <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-2">{project.title}</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">{project.description}</p>

                            {/* Tech Stack */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {project.tech.map((tech, j) => (
                                    <span key={j} className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400">
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2">
                                <a
                                    href={`http://mybinder.org/v2/gh/mangeshraut712/alpha-quant-academy/main?urlpath=lab/tree/${project.folder}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm transition-all ${project.featured
                                            ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:shadow-lg hover:shadow-violet-500/25"
                                            : "bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90"
                                        }`}
                                >
                                    Start Project <ArrowRight className="w-4 h-4" />
                                </a>
                                <a
                                    href={`https://github.com/mangeshraut712/alpha-quant-academy/tree/main/${project.folder}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                >
                                    <Github className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default ProjectsSection;
