import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Terminal, TrendingUp, PieChart, Cpu, ChevronRight, ArrowRight, Menu, X,
  ShieldCheck, Zap, BookOpen, Code2, BarChart3, Database, FileText, Play,
  GraduationCap, Folder, Github, ExternalLink, CheckCircle2, Clock, Users
} from 'lucide-react';
import { cn } from './lib/utils';

// =============================================================================
// DATA - All actual project content
// =============================================================================

const curriculumData = {
  tracks: [
    {
      id: 1,
      title: "Python Fundamentals",
      icon: Terminal,
      color: "from-slate-500 to-slate-700",
      modules: [
        { name: "Python Basics", file: "curriculum/01-fundamentals/01-python-basics/01_python_basics.ipynb", status: "complete", duration: "2h" },
        { name: "Data Structures", file: "curriculum/01-fundamentals/02-data-structures/01_data_structures.ipynb", status: "complete", duration: "3h" },
        { name: "ML Fundamentals", file: "curriculum/05-machine-learning/01-ml-fundamentals/01_ml_fundamentals.ipynb", status: "complete", duration: "5h" },
      ]
    },
    {
      id: 2,
      title: "Data Analysis",
      icon: BarChart3,
      color: "from-blue-500 to-blue-700",
      modules: [
        { name: "NumPy Essentials", file: "curriculum/02-data-analysis/01-numpy-essentials/01_numpy_essentials.ipynb", status: "complete", duration: "3h" },
        { name: "Pandas Mastery", file: "curriculum/02-data-analysis/02-pandas-mastery/01_pandas_mastery.ipynb", status: "complete", duration: "5h" },
      ]
    },
    {
      id: 3,
      title: "Visualization",
      icon: PieChart,
      color: "from-indigo-500 to-indigo-700",
      modules: [
        { name: "Financial Charts", file: "curriculum/03-visualization/03-financial-charts/01_financial_charts.ipynb", status: "complete", duration: "4h" },
      ]
    },
    {
      id: 4,
      title: "Financial Analysis",
      icon: Zap,
      color: "from-amber-500 to-amber-700",
      modules: [
        { name: "Market Data APIs", file: "curriculum/04-financial-analysis/01-market-data-apis/01_market_data_apis.ipynb", status: "complete", duration: "3h" },
        { name: "Options Pricing", file: "curriculum/04-financial-analysis/02-options-pricing/01_options_pricing.ipynb", status: "complete", duration: "5h" },
        { name: "Portfolio Optimization", file: "curriculum/04-financial-analysis/03-portfolio-optimization/01_portfolio_optimization.ipynb", status: "complete", duration: "5h" },
        { name: "Risk Metrics", file: "curriculum/04-financial-analysis/04-risk-metrics/01_risk_metrics.ipynb", status: "complete", duration: "4h" },
      ]
    },
    {
      id: 5,
      title: "Machine Learning",
      icon: Cpu,
      color: "from-emerald-500 to-emerald-700",
      modules: [
        { name: "Time Series", file: "curriculum/05-machine-learning/02-time-series-forecasting/01_time_series.ipynb", status: "complete", duration: "6h" },
        { name: "Algo Trading", file: "curriculum/05-machine-learning/04-algorithmic-trading/01_algorithmic_trading.ipynb", status: "complete", duration: "8h" },
      ]
    },
    {
      id: 6,
      title: "Career & Strategy",
      icon: GraduationCap,
      color: "from-violet-500 to-violet-700",
      modules: [
        { name: "Alpha Arena Demo", file: "projects/advanced/ai_stock_analyst/demo.ipynb", status: "complete", duration: "2h" },
        { name: "Advanced Features", file: "projects/advanced/ai_stock_analyst/advanced_features.py", status: "complete", duration: "4h" },
      ]
    },
  ],
  legacyNotebooks: [
    "curriculum/00-legacy/0_best_practices.ipynb",
    "curriculum/00-legacy/1_basic.ipynb",
    "curriculum/00-legacy/2_straddle.ipynb",
    "curriculum/00-legacy/3_flights.ipynb",
    "curriculum/00-legacy/4_webapi.ipynb",
    "curriculum/00-legacy/5_website.ipynb",
    "curriculum/00-legacy/6_financial_data.ipynb"
  ]
};

const projectsData = [
  {
    level: "Beginner",
    color: "bg-emerald-500",
    title: "Stock Portfolio Tracker",
    description: "Track investments, calculate returns, and visualize performance using Pandas and Matplotlib.",
    file: "projects/beginner/stock_portfolio_tracker/stock_tracker.py",
    features: ["Portfolio value tracking", "Return calculations", "Matplotlib visualizations", "Historical analysis"],
    skills: ["Pandas", "Matplotlib", "Numpy"],
    command: "python3 projects/beginner/stock_portfolio_tracker/stock_tracker.py",
    preview: "portfolio = {\n    'AAPL': {'shares': 50, 'avg_cost': 150.00},\n    'GOOGL': {'shares': 20, 'avg_cost': 125.00},\n    'MSFT': {'shares': 30, 'avg_cost': 350.00}\n}"
  },
  {
    level: "Intermediate",
    color: "bg-amber-500",
    title: "Financial Dashboard",
    description: "Interactive Streamlit web app with real-time metrics, Plotly charts, and portfolio analysis.",
    file: "projects/intermediate/financial_dashboard/app.py",
    features: ["Real-time price simulation", "Technical Indicators", "Interactive Plotly Charts", "Allocation Analysis"],
    skills: ["Streamlit", "Plotly", "Pandas"],
    command: "streamlit run projects/intermediate/financial_dashboard/app.py",
    preview: "st.metric('Sharpe Ratio', f'{sharpe:.2f}')\nst.plotly_chart(fig, use_container_width=True)"
  },
  {
    level: "Advanced",
    color: "bg-rose-500",
    title: "AI Stock Analyst v2.0",
    description: "Multi-model consensus architecture with real-time risk management and backtesting engine.",
    file: "projects/advanced/ai_stock_analyst/enhanced_engine.py",
    features: [
      "Multi-Model Consensus AI",
      "Backtesting Simulation",
      "Drawdown & Volatility Shield",
      "Alpha Arena Architecture"
    ],
    skills: ["Quant AI", "Risk Control", "System Design"],
    command: "python3 projects/advanced/ai_stock_analyst/enhanced_engine.py",
    preview: "class EnhancedAIAnalyst:\n    def analyze_stock(self, ticker, data):\n        # Multi-model voting logic"
  }
];

const datasetsData = [
  { name: "sample_stock_prices.csv", description: "5 stocks × 5 years OHLCV data", rows: "6,300" },
  { name: "sample_portfolio.csv", description: "Portfolio holdings with costs", rows: "7" },
  { name: "financial_ratios.csv", description: "Key metrics (P/E, ROE, etc.)", rows: "5" },
  { name: "sample_options_chain.csv", description: "Options chain with Greeks", rows: "18" },
  { name: "economic_indicators.csv", description: "GDP, Inflation, VIX data", rows: "60" },
  { name: "transaction_history.csv", description: "Trading history log", rows: "100" },
  { name: "alpha_signals.csv", description: "AI signal confidence history", rows: "1,000" },
];

const statsData = {
  notebooks: 22,
  projects: 3,
  datasets: 11,
  hours: 100,
  exercises: 15,
  linesOfCode: 3500
};

// =============================================================================
// COMPONENTS
// =============================================================================

const Navigation = ({ activeSection, setActiveSection, onReset }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'curriculum', label: 'Curriculum' },
    { id: 'projects', label: 'Projects' },
    { id: 'data', label: 'Data' },
    { id: 'analyst', label: 'AI Analyst' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 h-16 flex items-center justify-between",
      isScrolled ? "glass shadow-sm" : "bg-transparent"
    )}>
      <div className="flex items-center gap-2 text-foreground">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
          <TrendingUp className="text-white w-5 h-5" />
        </div>
        <span className="font-bold tracking-tight text-lg">PFA</span>
      </div>

      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => {
              setActiveSection(item.id);
              document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={cn(
              "hover:text-foreground transition-colors",
              activeSection === item.id && "text-foreground"
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onReset}
          className="hidden md:flex text-[10px] uppercase font-bold tracking-widest text-muted-foreground hover:text-foreground transition-colors border border-border px-3 py-1.5 rounded-lg"
        >
          Fresh Start
        </button>
        <a
          href="https://github.com/jpmorganchase/python-training"
          target="_blank"
          className="hidden md:flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full border border-border hover:bg-secondary transition-all"
        >
          <Github className="w-4 h-4" /> GitHub
        </a>
        <button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 left-0 right-0 bg-background border-b border-border p-4 md:hidden"
          >
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setMobileMenuOpen(false);
                  document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="block w-full text-left py-3 px-4 hover:bg-secondary rounded-lg font-medium"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => { onReset(); setMobileMenuOpen(false); }}
              className="w-full text-left py-3 px-4 text-xs font-bold uppercase tracking-widest text-red-500 border-t border-border mt-2"
            >
              Reset Progress (Fresh Start)
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

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

const ProjectsSection = () => {
  const [activeProject, setActiveProject] = useState(null);

  return (
    <section id="projects" className="px-6 py-24 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Hands-On Practice</span>
          <h2 className="text-4xl font-bold tracking-tighter mt-2">Core Projects</h2>
          <p className="text-muted-foreground mt-2 text-sm">Hover over a project to see how to start it!</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {projectsData.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onMouseEnter={() => setActiveProject(i)}
              onMouseLeave={() => setActiveProject(null)}
              className="bg-card border border-border rounded-2xl overflow-hidden flex flex-col relative group"
            >
              <div className={cn("h-2", project.color)} />
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full text-white uppercase tracking-wider", project.color)}>
                    {project.level}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 flex-1">{project.description}</p>

                <div className="bg-slate-950/50 p-3 rounded-lg border border-border mb-4 overflow-hidden">
                  <div className="text-[9px] font-bold text-slate-500 uppercase mb-2">Code Snippet</div>
                  <pre className="text-[10px] text-slate-300 font-mono leading-relaxed truncate">
                    {project.preview}
                  </pre>
                </div>

                <div className="mb-4">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Key Features</div>
                  <div className="space-y-1">
                    {project.features.slice(0, 4).map((feat, j) => (
                      <div key={j} className="text-xs flex items-center gap-2">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                        {feat}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {project.skills.map((skill, j) => (
                    <span key={j} className="text-[9px] px-1.5 py-0.5 rounded-full bg-secondary font-bold uppercase border border-border">
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="text-[10px] font-mono text-muted-foreground flex items-center gap-1.5 mt-auto pt-4 border-t border-border">
                  <FileText className="w-3 h-3" /> {project.file}
                </div>
              </div>

              {/* Hover Guide Overlay */}
              <AnimatePresence>
                {activeProject === i && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-background/95 backdrop-blur-sm p-6 flex flex-col justify-center items-center text-center z-10"
                  >
                    <BookOpen className="w-10 h-10 text-primary mb-4" />
                    <h4 className="font-bold text-lg mb-2">How to Run</h4>
                    <p className="text-xs text-muted-foreground mb-6">
                      {project.title.includes('AI')
                        ? "Run 'python enhanced_engine.py' in the project folder to start the multi-agent simulation."
                        : project.title.includes('Dashboard')
                          ? "Run 'streamlit run app.py' to launch the interactive financial metrics dashboard."
                          : "Run 'python stock_tracker.py' to start the portfolio management system."}
                    </p>
                    <div className="flex flex-col gap-2 w-full">
                      <div className="bg-white/10 p-2 rounded text-[9px] font-mono text-white/70 mb-2 truncate">
                        $ {project.command}
                      </div>
                      <a href="http://mybinder.org/v2/gh/jpmorganchase/python-training/main?urlpath=lab" target="_blank" className="bg-primary text-primary-foreground h-9 flex items-center justify-center rounded-lg font-bold text-xs">
                        Open Project Files
                      </a>
                      <button className="h-9 border border-border rounded-lg text-xs font-bold hover:bg-secondary">
                        View Solution
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

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
        <div className="text-xs font-bold px-4 py-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 border border-blue-200 dark:border-blue-800">
          Hint: Use pd.read_csv('{activeDataset !== null ? datasetsData[activeDataset].name : 'filename.csv'}') to load.
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
                <div className="text-xs text-muted-foreground mt-2 font-medium">{dataset.description}</div>
                <div className="text-[10px] text-muted-foreground mt-4 font-bold flex items-center gap-1.5 uppercase tracking-widest">
                  <Users className="w-3 h-3" /> {dataset.rows} Rows
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

      {/* Dataset Preview Mockup */}
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
                <button className="text-white font-bold bg-blue-600 px-4 py-2 rounded-lg">Open in Binder</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

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
                            <div className="text-[10px] text-slate-400 font-medium">{model.focus}</div>
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
                            <div className="text-[10px] text-slate-400 font-medium">{control.desc}</div>
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
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-white/5 px-4 py-2 rounded-full border border-white/5">
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
                    <div className="text-violet-400 font-bold">� STARTING SIMULATION: AAPL (100 iterations)</div>

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

const Footer = () => (
  <footer className="px-6 py-16 border-t border-border">
    <div className="max-w-6xl mx-auto">
      <div className="grid md:grid-cols-4 gap-8 mb-12">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
              <TrendingUp className="text-white w-5 h-5" />
            </div>
            <span className="font-bold">Python Finance Academy</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Open-source Python training for finance professionals.
          </p>
        </div>

        <div>
          <div className="font-bold mb-4 text-sm">Curriculum</div>
          <div className="space-y-2 text-sm text-muted-foreground">
            {curriculumData.tracks.slice(0, 4).map((t, i) => (
              <div key={i}>{t.title}</div>
            ))}
          </div>
        </div>

        <div>
          <div className="font-bold mb-4 text-sm">Projects</div>
          <div className="space-y-2 text-sm text-muted-foreground">
            {projectsData.map((p, i) => (
              <div key={i}>{p.title}</div>
            ))}
          </div>
        </div>

        <div>
          <div className="font-bold mb-4 text-sm">Resources</div>
          <div className="space-y-2 text-sm text-muted-foreground">
            <a href="#" className="block hover:text-foreground">Documentation</a>
            <a href="#" className="block hover:text-foreground">GitHub</a>
            <a href="#" className="block hover:text-foreground">Contributing</a>
            <a href="#" className="block hover:text-foreground">License</a>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-border">
        <div className="text-xs text-muted-foreground">
          Based on <a href="https://github.com/jpmorganchase/python-training" className="underline">JPMorgan Chase Python Training</a>
        </div>
        <div className="text-xs text-muted-foreground">
          Apache 2.0 License • Enhanced with Alpha Arena AI
        </div>
      </div>
    </div>
  </footer>
);

// =============================================================================
// MAIN APP
// =============================================================================

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [tracks, setTracks] = useState(curriculumData.tracks.map(t => ({
    ...t,
    modules: t.modules.map(m => ({ ...m, status: 'pending' }))
  })));
  const [isSimulating, setIsSimulating] = useState(false);
  const [simProgress, setSimProgress] = useState(0);

  const handleReset = () => {
    if (confirm("Reset all progress for a fresh start?")) {
      setTracks(curriculumData.tracks.map(t => ({
        ...t,
        modules: t.modules.map(m => ({ ...m, status: 'pending' }))
      })));
    }
  };

  const toggleModule = (trackId, moduleName) => {
    setTracks(prev => prev.map(t => {
      if (t.id !== trackId) return t;
      return {
        ...t,
        modules: t.modules.map(m => {
          if (m.name !== moduleName) return m;
          const nextStatus = m.status === 'complete' ? 'pending' : 'complete';
          return { ...m, status: nextStatus };
        })
      };
    }));
  };

  const startSimulation = () => {
    setIsSimulating(true);
    setSimProgress(0);
    const interval = setInterval(() => {
      setSimProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsSimulating(false), 2000);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} onReset={handleReset} />

      <main>
        <Hero />

        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-xl border border-blue-100 dark:border-blue-900/30 flex items-center gap-4 shadow-sm">
            <div className="p-2 bg-blue-600 rounded-lg shadow-lg">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-blue-900 dark:text-blue-100">Learning Hint:</p>
              <p className="text-xs text-blue-800 dark:text-blue-300">Click on any module in the curriculum to mark it as complete and track your journey through the tracks!</p>
            </div>
          </div>
        </div>

        <CurriculumSection tracks={tracks} onToggle={toggleModule} />
        <ProjectsSection />
        <DataSection />
        <AIAnalystSection
          isSimulating={isSimulating}
          simProgress={simProgress}
          onStartSim={startSimulation}
        />
      </main>

      <Footer />
    </div>
  );
}
