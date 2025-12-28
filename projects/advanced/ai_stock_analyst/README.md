# AI-Powered Stock Analysis Toolkit

## 🤖 Overview

A comprehensive Python toolkit providing AI-powered features for professional stock market analysis. Now enhanced with **Alpha Arena-inspired multi-model consensus architecture** for more robust trading decisions.

## 🚀 NEW: AI Stock Analyst v2.0 (Alpha Arena Style)

The project has been upgraded to a professional-grade quantitative training environment:

### Core v2.0 Features

1.  **Multi-Model Consensus Architecture**: Uses weighted voting from specialized Technical, Fundamental, and Sentiment AI models.
2.  **Intelligent Risk Management**: 
    *   **Drawdown Shield**: Automatically pauses trading at 10% peak-to-trough drawdown.
    *   **Daily Loss Limit**: Caps exposure at 3% per day.
    *   **ATR-Based Sizing**: Dynamically adjusts positions based on market volatility.
3.  **Market Backtester**: A new simulation engine that runs Monte Carlo stress tests across 100+ scenarios to verify strategy robustness.
4.  **Career & Strategy Track**: 4 new modules focusing on Quant Interviews, System Design, and Alpha Arena implementation.

### Architecture Overview

```
┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐
│  Technical AI   │   │ Fundamental AI  │   │  Sentiment AI   │
│ (Price Action)  │   │ (Value/Growth)  │   │ (Social/News)   │
└────────┬────────┘   └────────┬────────┘   └────────┬────────┘
         │                     │                     │
         └───────────┬─────────┴──────────┬──────────┘
                     │                    │
              ┌──────▼────────────────────▼───────┐
              │          CONSENSUS ENGINE         │
              │       (2/3+ weighted voting)      │
              └──────────────┬────────────────────┘
                             │
              ┌──────────────▼────────────────────┐
              │        RISK PROTECTION LAYER      │
              │  Drawdown Shield | Volatility Mon │
              └──────────────┬────────────────────┘
                             │
              ┌──────────────▼────────────────────┐
              │       SIMULATION & PROPOSAL       │
              │   Monte Carlo Backtest | Entry/SL │
              └───────────────────────────────────┘
```

## 🛠️ Performance Metrics

The engine now tracks institutional-grade metrics:
- **Sharpe Ratio**: Measures risk-adjusted returns.
- **Max Drawdown**: Tracks peak-to-trough risk.
- **Win Rate**: Historical accuracy of consensus signals.
- **Total P&L**: Simulated dollar performance.

### Key Features

| Feature | Description |
|---------|-------------|
| **Multi-Model AI** | 3 specialized models analyze independently |
| **Consensus Voting** | Trades only when 2/3+ models agree |
| **Smart Risk Control** | Drawdown shield, daily limits, cooldowns |
| **Performance Analytics** | Sharpe ratio, win rate, P&L tracking |
| **Trade Proposals** | AI generates, human approves |

### Quick Start - Enhanced Engine

```python
from enhanced_engine import EnhancedAIAnalyst

# Initialize with $100,000 capital
analyst = EnhancedAIAnalyst(initial_capital=100000)

# Sample market data
data = {
    'price': 185.50,
    'sma_20': 182.30,
    'sma_50': 178.90,
    'rsi': 58,
    'macd': 1.5,
    'atr': 3.2,
    'pe_ratio': 28.5,
    'roe': 1.47,
    'revenue_growth': 0.085,
    'news_sentiment': 0.4,
    'analyst_rating': 'buy'
}

# Run multi-model analysis
analyst.print_analysis('AAPL', data)

# Generate trade proposal
proposal = analyst.generate_trade_proposal('AAPL', data)

if proposal:
    print(f"Direction: {proposal.direction}")
    print(f"Entry: ${proposal.entry_price:.2f}")
    print(f"Stop Loss: ${proposal.stop_loss:.2f}")
    print(f"Take Profit: ${proposal.take_profit:.2f}")
    print(f"Confidence: {proposal.confidence:.1%}")
```

### Demo Output

```
======================================================================
  🤖 MULTI-MODEL AI ANALYSIS: AAPL
======================================================================

  📊 TECHNICAL MODEL
     🟢 Direction: LONG
     📈 Confidence: 80.0%
     💡 Reasoning: Price above SMA20; Price above SMA50; RSI neutral; MACD bullish

  📊 FUNDAMENTAL MODEL
     🟢 Direction: LONG
     📈 Confidence: 74.0%
     💡 Reasoning: Fair P/E (28.5); Strong ROE (147.0%); Moderate growth

  📊 SENTIMENT MODEL
     🟢 Direction: LONG
     📈 Confidence: 70.0%
     💡 Reasoning: Positive news sentiment; Analyst: Buy

  🎯 CONSENSUS DECISION
  ────────────────────────────────────────────────────────────
     🟢 Direction: LONG
     📊 Confidence: 75.4%
     🤝 Agreement: 3/3 models agree
     ⚡ Actionable: Yes

  🛡️ RISK STATUS
  ────────────────────────────────────────────────────────────
     🟢 Risk Level: LOW
     📉 Drawdown: 0.00%
     💰 Capital: $100,000.00
     ✅ Trading: Allowed
```

---

## ✨ Original 7 Features

### 1. 📊 Personal Market Analyst
Comprehensive fundamental analysis including:
- Financial ratios (P/E, PEG, P/B, P/S)
- Profitability metrics (margins, ROE, ROA)
- Growth indicators
- Financial health (debt, cash flow)
- Valuation assessment

### 2. 📈 Technical Chart Breakdown
Advanced technical analysis with:
- Moving averages (SMA, EMA)
- RSI (Relative Strength Index)
- MACD (Moving Average Convergence Divergence)
- Bollinger Bands
- Support & Resistance levels
- Interactive charts

### 3. 🎯 Trading Strategy Simulator
Simulate strategies across market conditions:
- **Strategy Types**: Intraday, Swing, Position
- **Risk Levels**: Conservative, Moderate, Aggressive
- **Market Scenarios**: Bull, Bear, Sideways, Volatile

### 4. 🛡️ Personal Risk Manager
Portfolio risk assessment:
- Risk appetite analysis
- Diversification recommendations
- Position sizing guidelines
- Asset allocation frameworks

### 5. 🔍 AI Stock Screener
Quality stock screening based on:
- Valuation metrics
- Growth prospects
- Financial health
- Custom scoring system

### 6. 📰 News Impact Analyzer
Analyze news impact on stocks:
- Sentiment analysis
- Short-term vs long-term effects
- Event-driven opportunities

### 7. 🧠 Daily Market Brain
10-minute daily routine:
- Index scanning
- News digest
- Watchlist reviews
- Action items

---

## 🚀 Quick Start

### Installation

```bash
cd python-training/projects/advanced/ai_stock_analyst

# Install dependencies
pip install yfinance pandas numpy matplotlib seaborn scikit-learn

# Run the original analyzer
python ai_analyst.py --feature 1 --stock AAPL

# Run the enhanced Alpha Arena engine
python enhanced_engine.py
```

### Demo

```bash
python enhanced_engine.py
```

---

## 🛡️ Alpha Arena Risk Management Features

### Drawdown Shield
```python
max_drawdown_pct = 0.10  # Pauses trading at 10% drawdown
```

### Daily Loss Limit
```python
daily_loss_limit = 0.03  # Max 3% loss per day
```

### Volatility Monitor
```python
volatility_threshold = 0.05  # Reduces position size in high vol
```

### Session Cooldown
```python
cooldown_seconds = 300  # 5 minute cooldown between trades
```

---

## 🎓 Architecture Comparison

| Feature | Original | Enhanced (Alpha Arena) |
|---------|----------|------------------------|
| Analysis | Single model | Multi-model consensus |
| Decision | Direct output | Voting system (2/3+) |
| Risk | Basic | Intelligent controls |
| Proposals | None | AI-generated with human approval |
| Analytics | Basic | Sharpe, win rate, P&L reports |
| State | Stateless | Tracks capital, trades, performance |

---

## 🛡️ Disclaimer

**IMPORTANT**: This toolkit is for educational and informational purposes only.

- ❌ NOT financial advice
- ❌ NOT buy/sell recommendations
- ❌ NOT guaranteed returns
- ✅ Educational analysis tool
- ✅ Data-driven insights
- ✅ Risk awareness framework

**Always:**
- Do your own research
- Consult licensed financial advisors
- Understand your risk tolerance
- Never invest money you can't afford to lose

---

## 📚 Learning Path

1. **Beginner**: Start with `ai_analyst.py` Features 1 & 2
2. **Intermediate**: Use strategy simulator (Feature 3)
3. **Advanced**: Explore `enhanced_engine.py` multi-model system
4. **Expert**: Customize models and risk parameters

---

## 🤝 Credits

- **Original**: JPMorgan Chase Python Training
- **Enhanced Engine**: Inspired by [nof1.ai Alpha Arena](https://github.com/nof1-ai-alpha-arena/nof1.ai-alpha-arena)

---

**Made with ❤️ for the Python Finance Academy**

*Empowering traders with multi-model AI insights*
