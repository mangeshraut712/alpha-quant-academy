import { Terminal, BarChart3, PieChart, Zap, Cpu, GraduationCap, BookOpen, Clock, Database, Code2 } from 'lucide-react';

export const curriculumData = {
    tracks: [
        {
            id: 1,
            title: "Python Fundamentals",
            icon: Terminal,
            color: "from-slate-500 to-slate-700",
            modules: [
                { name: "Python Basics", file: "curriculum/01-fundamentals/01-python-basics/01_python_basics.ipynb", status: "complete", duration: "2h" },
                { name: "Data Structures", file: "curriculum/01-fundamentals/02-data-structures/01_data_structures.ipynb", status: "complete", duration: "3h" },
                { name: "Best Practices", file: "curriculum/legacy/0_best_practices.ipynb", status: "complete", duration: "1h" },
                { name: "Basic Operations", file: "curriculum/legacy/1_basic.ipynb", status: "complete", duration: "1h" },
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
                { name: "Financial Data Ops", file: "curriculum/legacy/6_financial_data.ipynb", status: "complete", duration: "2h" },
                { name: "Data Straddles", file: "curriculum/legacy/2_straddle.ipynb", status: "complete", duration: "2h" },
            ]
        },
        {
            id: 3,
            title: "Visualization & Web",
            icon: PieChart,
            color: "from-indigo-500 to-indigo-700",
            modules: [
                { name: "Financial Charts", file: "curriculum/03-visualization/03-financial-charts/01_financial_charts.ipynb", status: "complete", duration: "4h" },
                { name: "Advanced Plotting", file: "curriculum/legacy/7_advanced_plotting.ipynb", status: "complete", duration: "3h" },
                { name: "3D Visualizations", file: "curriculum/legacy/9_3d_plotting.ipynb", status: "complete", duration: "2h" },
                { name: "Web API Integration", file: "curriculum/legacy/4_webapi.ipynb", status: "complete", duration: "3h" },
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
                { name: "Altman Z-Score", file: "curriculum/legacy/8_altman_z_double_prime.ipynb", status: "complete", duration: "2h" },
                { name: "Risk Metrics", file: "curriculum/04-financial-analysis/04-risk-metrics/01_risk_metrics.ipynb", status: "complete", duration: "4h" },
            ]
        },
        {
            id: 5,
            title: "Machine Learning",
            icon: Cpu,
            color: "from-emerald-500 to-emerald-700",
            modules: [
                { name: "ML Fundamentals", file: "curriculum/05-machine-learning/01-ml-fundamentals/01_ml_fundamentals.ipynb", status: "complete", duration: "5h" },
                { name: "Time Series", file: "curriculum/05-machine-learning/02-time-series-forecasting/01_time_series.ipynb", status: "complete", duration: "6h" },
                { name: "Algo Trading", file: "curriculum/05-machine-learning/04-algorithmic-trading/01_algorithmic_trading.ipynb", status: "complete", duration: "8h" },
            ]
        },
        {
            id: 6,
            title: "Advanced Quant Lab",
            icon: GraduationCap,
            color: "from-violet-500 to-violet-700",
            modules: [
                { name: "Alpha Arena Demo", file: "projects/advanced/ai_stock_analyst/demo.ipynb", status: "complete", duration: "2h" },
                { name: "AI Analyst Engine", file: "projects/advanced/ai_stock_analyst/ai_analyst.py", status: "complete", duration: "5h" },
                { name: "Enhanced Architecture", file: "projects/advanced/ai_stock_analyst/enhanced_engine.py", status: "complete", duration: "6h" },
                { name: "Multi-Model Logic", file: "projects/advanced/ai_stock_analyst/advanced_features.py", status: "complete", duration: "4h" },
            ]
        },
        {
            id: 7,
            title: "Special Topics",
            icon: Database,
            color: "from-rose-500 to-rose-700",
            modules: [
                { name: "Flight Data Analysis", file: "curriculum/legacy/3_flights.ipynb", status: "complete", duration: "3h" },
                { name: "Financial Web Portal", file: "curriculum/legacy/5_website.ipynb", status: "complete", duration: "4h" },
            ]
        }
    ],
    legacyNotebooks: [
        "curriculum/legacy/0_best_practices.ipynb",
        "curriculum/legacy/1_basic.ipynb",
        "curriculum/legacy/2_straddle.ipynb",
        "curriculum/legacy/3_flights.ipynb",
        "curriculum/legacy/4_webapi.ipynb",
        "curriculum/legacy/5_website.ipynb",
        "curriculum/legacy/6_financial_data.ipynb",
        "curriculum/legacy/7_advanced_plotting.ipynb",
        "curriculum/legacy/8_altman_z_double_prime.ipynb",
        "curriculum/legacy/9_3d_plotting.ipynb"
    ]
};

export const projectsData = [
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

export const datasetsData = [
    { name: "sample_stock_prices.csv", description: "5 stocks × 5 years OHLCV data", rows: "6,300" },
    { name: "sample_portfolio.csv", description: "Portfolio holdings with costs", rows: "7" },
    { name: "financial_ratios.csv", description: "Key metrics (P/E, ROE, etc.)", rows: "5" },
    { name: "sample_options_chain.csv", description: "Options chain with Greeks", rows: "18" },
    { name: "economic_indicators.csv", description: "GDP, Inflation, VIX data", rows: "60" },
    { name: "transaction_history.csv", description: "Trading history log", rows: "100" },
    { name: "alpha_signals.csv", description: "AI signal confidence history", rows: "1,000" },
];

export const statsData = {
    notebooks: 22,
    projects: 3,
    datasets: 7,
    hours: 100,
    exercises: 15,
    linesOfCode: 3500
};
