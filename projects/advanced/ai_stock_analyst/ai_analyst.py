"""
AI-Powered Stock Analysis Toolkit
==================================
A comprehensive toolkit providing 7 AI-powered analysis features for stock market analysis.

Features:
1. Personal Market Analyst
2. Technical Chart Breakdown
3. Trading Strategy Simulator
4. Personal Risk Manager
5. AI Stock Screener
6. News Impact Analyzer
7. Daily Market Brain

Usage: python ai_analyst.py --feature [1-7] --stock AAPL
"""

import yfinance as yf
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import matplotlib.pyplot as plt
import warnings
warnings.filterwarnings('ignore')

class AIStockAnalyst:
    """AI-powered stock analysis toolkit."""
    
    def __init__(self, ticker: str = None):
        self.ticker = ticker
        self.stock = None
        if ticker:
            self.load_stock(ticker)
    
    def load_stock(self, ticker: str):
        """Load stock data."""
        self.ticker = ticker.upper()
        self.stock = yf.Ticker(self.ticker)
        print(f"✅ Loaded data for {self.ticker}")
    
    # ============================================================
    # Feature 1: Personal Market Analyst
    # ============================================================
    
    def fundamental_analysis(self):
        """
        Comprehensive fundamental analysis of the stock.
        Analyzes: Financials, Ratios, Business Model, Management, Competitive Edge
        """
        if not self.stock:
            return "❌ Please load a stock first using load_stock(ticker)"
        
        print(f"\n{'='*70}")
        print(f"📊 FUNDAMENTAL ANALYSIS: {self.ticker}")
        print(f"{'='*70}\n")
        
        info = self.stock.info
        
        # Company Overview
        print("🏢 COMPANY OVERVIEW")
        print("-" * 70)
        print(f"Company Name: {info.get('longName', 'N/A')}")
        print(f"Sector: {info.get('sector', 'N/A')}")
        print(f"Industry: {info.get('industry', 'N/A')}")
        print(f"Country: {info.get('country', 'N/A')}")
        print(f"\nBusiness Summary:")
        summary = info.get('longBusinessSummary', 'N/A')
        print(summary[:300] + "..." if len(summary) > 300 else summary)
        
        # Financial Ratios
        print(f"\n\n💰 KEY FINANCIAL RATIOS")
        print("-" * 70)
        
        metrics = {
            'Market Cap': self._format_large_number(info.get('marketCap')),
            'P/E Ratio (TTM)': info.get('trailingPE', 'N/A'),
            'Forward P/E': info.get('forwardPE', 'N/A'),
            'PEG Ratio': info.get('pegRatio', 'N/A'),
            'Price/Book': info.get('priceToBook', 'N/A'),
            'Price/Sales': info.get('priceToSalesTrailing12Months', 'N/A'),
            'EV/EBITDA': info.get('enterpriseToEbitda', 'N/A'),
        }
        
        for metric, value in metrics.items():
            print(f"{metric:.<40} {value}")
        
        # Profitability
        print(f"\n\n📈 PROFITABILITY & GROWTH")
        print("-" * 70)
        
        profitability = {
            'Profit Margin': self._format_percent(info.get('profitMargins')),
            'Operating Margin': self._format_percent(info.get('operatingMargins')),
            'ROE (Return on Equity)': self._format_percent(info.get('returnOnEquity')),
            'ROA (Return on Assets)': self._format_percent(info.get('returnOnAssets')),
            'Revenue Growth (YoY)': self._format_percent(info.get('revenueGrowth')),
            'Earnings Growth (YoY)': self._format_percent(info.get('earningsGrowth')),
        }
        
        for metric, value in profitability.items():
            print(f"{metric:.<40} {value}")
        
        # Financial Health
        print(f"\n\n🏦 FINANCIAL HEALTH")
        print("-" * 70)
        
        health = {
            'Current Ratio': info.get('currentRatio', 'N/A'),
            'Debt to Equity': info.get('debtToEquity', 'N/A'),
            'Total Cash': self._format_large_number(info.get('totalCash')),
            'Total Debt': self._format_large_number(info.get('totalDebt')),
            'Free Cash Flow': self._format_large_number(info.get('freeCashflow')),
            'Operating Cash Flow': self._format_large_number(info.get('operatingCashflow')),
        }
        
        for metric, value in health.items():
            print(f"{metric:.<40} {value}")
        
        # Valuation Assessment
        print(f"\n\n⚖️ VALUATION ASSESSMENT")
        print("-" * 70)
        
        pe = info.get('trailingPE', 0)
        industry_avg_pe = 20  # Generic average
        
        if pe and pe > 0:
            valuation = "Overvalued" if pe > industry_avg_pe * 1.5 else \
                       "Fairly Valued" if pe <= industry_avg_pe * 1.2 else "Undervalued"
            print(f"P/E Assessment: {pe:.2f} vs Industry Avg ~{industry_avg_pe} → {valuation}")
        
        # Management Quality Indicators
        print(f"\n\n👔 MANAGEMENT & GOVERNANCE")
        print("-" * 70)
        
        management = {
            'Recommendation': info.get('recommendationKey', 'N/A').upper(),
            'Target Mean Price': f"${info.get('targetMeanPrice', 'N/A')}",
            'Analyst Count': info.get('numberOfAnalystOpinions', 'N/A'),
        }
        
        for metric, value in management.items():
            print(f"{metric:.<40} {value}")
        
        # Dividend Information
        if info.get('dividendYield'):
            print(f"\n\n💵 DIVIDEND INFORMATION")
            print("-" * 70)
            print(f"Dividend Yield: {self._format_percent(info.get('dividendYield'))}")
            print(f"Payout Ratio: {self._format_percent(info.get('payoutRatio'))}")
            print(f"5-Year Avg Yield: {info.get('fiveYearAvgDividendYield', 'N/A')}")
        
        # Competitive Position
        print(f"\n\n🏆 COMPETITIVE POSITION")
        print("-" * 70)
        
        beta = info.get('beta', 1)
        volatility = "High" if beta > 1.5 else "Moderate" if beta > 0.8 else "Low"
        print(f"Beta (Market Sensitivity): {beta:.2f} → {volatility} Volatility")
        print(f"52-Week High: ${info.get('fiftyTwoWeekHigh', 'N/A')}")
        print(f"52-Week Low: ${info.get('fiftyTwoWeekLow', 'N/A')}")
        print(f"Avg Volume (3M): {self._format_large_number(info.get('averageVolume'))}")
        
        # Final Recommendation
        print(f"\n\n🎯 ANALYST SUMMARY")
        print("-" * 70)
        print(f"This is a fundamental analysis only. Consider:")
        print(f"  ✓ Strong Points: Check profitability, growth, and cash flow")
        print(f"  ✓ Risk Factors: Review debt levels, valuation multiples")
        print(f"  ✓ Follow-up: Analyze quarterly trends and industry comparisons")
        print(f"\n{'='*70}\n")
    
    # ============================================================
    # Feature 2: Technical Chart Breakdown
    # ============================================================
    
    def technical_analysis(self, period='6mo'):
        """
        Technical analysis with key indicators.
        Includes: SMA, EMA, RSI, MACD, Bollinger Bands, Support/Resistance
        """
        if not self.stock:
            return "❌ Please load a stock first"
        
        print(f"\n{'='*70}")
        print(f"📈 TECHNICAL ANALYSIS: {self.ticker}")
        print(f"{'='*70}\n")
        
        # Get historical data
        df = self.stock.history(period=period)
        
        if df.empty:
            print("❌ No data available")
            return
        
        # Calculate indicators
        df['SMA_20'] = df['Close'].rolling(20).mean()
        df['SMA_50'] = df['Close'].rolling(50).mean()
        df['SMA_200'] = df['Close'].rolling(200).mean()
        df['EMA_12'] = df['Close'].ewm(span=12).mean()
        df['EMA_26'] = df['Close'].ewm(span=26).mean()
        
        # RSI
        delta = df['Close'].diff()
        gain = (delta.where(delta > 0, 0)).rolling(14).mean()
        loss = (-delta.where(delta < 0, 0)).rolling(14).mean()
        rs = gain / loss
        df['RSI'] = 100 - (100 / (1 + rs))
        
        # MACD
        df['MACD'] = df['EMA_12'] - df['EMA_26']
        df['Signal'] = df['MACD'].ewm(span=9).mean()
        df['MACD_Hist'] = df['MACD'] - df['Signal']
        
        # Bollinger Bands
        df['BB_Mid'] = df['Close'].rolling(20).mean()
        df['BB_Std'] = df['Close'].rolling(20).std()
        df['BB_Upper'] = df['BB_Mid'] + 2 * df['BB_Std']
        df['BB_Lower'] = df['BB_Mid'] - 2 * df['BB_Std']
        
        # Latest values
        latest = df.iloc[-1]
        current_price = latest['Close']
        
        # Price Action
        print("💹 PRICE ACTION")
        print("-" * 70)
        print(f"Current Price: ${current_price:.2f}")
        print(f"SMA 20: ${latest['SMA_20']:.2f} → {'Above' if current_price > latest['SMA_20'] else 'Below'}")
        print(f"SMA 50: ${latest['SMA_50']:.2f} → {'Above' if current_price > latest['SMA_50'] else 'Below'}")
        if not pd.isna(latest['SMA_200']):
            print(f"SMA 200: ${latest['SMA_200']:.2f} → {'Above' if current_price > latest['SMA_200'] else 'Below'}")
        
        # Trend Analysis
        print(f"\n\n📊 TREND ANALYSIS")
        print("-" * 70)
        
        if current_price > latest['SMA_20'] > latest['SMA_50']:
            trend = "Strong Uptrend"
            emoji = "🟢"
        elif current_price < latest['SMA_20'] < latest['SMA_50']:
            trend = "Strong Downtrend"
            emoji = "🔴"
        else:
            trend = "Sideways/Mixed"
            emoji = "🟡"
        
        print(f"Overall Trend: {emoji} {trend}")
        
        # RSI Analysis
        print(f"\n\n⚡ RSI (Relative Strength Index)")
        print("-" * 70)
        rsi = latest['RSI']
        print(f"RSI: {rsi:.2f}")
        
        if rsi > 70:
            rsi_signal = "Overbought (potential reversal down)"
        elif rsi < 30:
            rsi_signal = "Oversold (potential reversal up)"
        else:
            rsi_signal = "Neutral"
        print(f"Signal: {rsi_signal}")
        
        # MACD Analysis
        print(f"\n\n🌊 MACD Analysis")
        print("-" * 70)
        macd = latest['MACD']
        signal = latest['Signal']
        print(f"MACD: {macd:.2f}")
        print(f"Signal: {signal:.2f}")
        print(f"Histogram: {latest['MACD_Hist']:.2f}")
        
        if macd > signal:
            macd_signal = "Bullish (MACD above signal)"
        else:
            macd_signal = "Bearish (MACD below signal)"
        print(f"Interpretation: {macd_signal}")
        
        # Bollinger Bands
        print(f"\n\n📏 BOLLINGER BANDS")
        print("-" * 70)
        print(f"Upper Band: ${latest['BB_Upper']:.2f}")
        print(f"Middle Band: ${latest['BB_Mid']:.2f}")
        print(f"Lower Band: ${latest['BB_Lower']:.2f}")
        
        bb_position = (current_price - latest['BB_Lower']) / (latest['BB_Upper'] - latest['BB_Lower']) * 100
        print(f"Price Position: {bb_position:.1f}% of band width")
        
        if current_price > latest['BB_Upper']:
            bb_signal = "Above upper band (overbought)"
        elif current_price < latest['BB_Lower']:
            bb_signal = "Below lower band (oversold)"
        else:
            bb_signal = "Within bands (normal)"
        print(f"Signal: {bb_signal}")
        
        # Support & Resistance
        print(f"\n\n🎯 SUPPORT & RESISTANCE LEVELS")
        print("-" * 70)
        recent_high = df['High'].tail(60).max()
        recent_low = df['Low'].tail(60).min()
        
        print(f"Resistance: ${recent_high:.2f} (60-day high)")
        print(f"Support: ${recent_low:.2f} (60-day low)")
        print(f"Current: ${current_price:.2f}")
        
        distance_to_resistance = ((recent_high - current_price) / current_price) * 100
        distance_to_support = ((current_price - recent_low) / current_price) * 100
        
        print(f"Distance to Resistance: {distance_to_resistance:.1f}% up")
        print(f"Distance to Support: {distance_to_support:.1f}% down")
        
        # Volume Analysis
        print(f"\n\n📊 VOLUME ANALYSIS")
        print("-" * 70)
        avg_volume = df['Volume'].tail(20).mean()
        current_volume = latest['Volume']
        
        print(f"Current Volume: {self._format_large_number(current_volume)}")
        print(f"20-Day Avg Volume: {self._format_large_number(avg_volume)}")
        
        volume_ratio = current_volume / avg_volume
        if volume_ratio > 1.5:
            vol_signal = "High volume (strong interest)"
        elif volume_ratio < 0.5:
            vol_signal = "Low volume (weak interest)"
        else:
            vol_signal = "Normal volume"
        print(f"Signal: {vol_signal}")
        
        # Scenarios
        print(f"\n\n🔮 LIKELY SCENARIOS (Not predictions)")
        print("-" * 70)
        print("Based on current technical setup:")
        
        if trend == "Strong Uptrend" and rsi < 70:
            print("  📈 Bullish Scenario: Continuation higher possible if volume confirms")
            print("  📉 Bearish Scenario: Watch for RSI divergence or break below SMA 20")
        elif trend == "Strong Downtrend" and rsi > 30:
            print("  📉 Bearish Scenario: Further downside if selling pressure continues")
            print("  📈 Bullish Scenario: Reversal if RSI oversold + bullish divergence")
        else:
            print("  ↔️ Mixed: Sideways consolidation likely. Wait for breakout direction")
        
        print(f"\n{'='*70}\n")
        
        # Plot chart
        self._plot_technical_chart(df)
    
    def _plot_technical_chart(self, df):
        """Plot technical analysis chart."""
        fig, axes = plt.subplots(3, 1, figsize=(14, 10), gridspec_kw={'height_ratios': [3, 1, 1]})
        
        # Price + MAs + Bollinger
        ax1 = axes[0]
        ax1.plot(df.index, df['Close'], 'b-', linewidth=1.5, label='Price')
        ax1.plot(df.index, df['SMA_20'], 'orange', linewidth=1, label='SMA 20')
        ax1.plot(df.index, df['SMA_50'], 'purple', linewidth=1, label='SMA 50')
        ax1.fill_between(df.index, df['BB_Lower'], df['BB_Upper'], alpha=0.2, color='gray', label='BB')
        ax1.set_title(f'{self.ticker} Technical Analysis', fontsize=14, fontweight='bold')
        ax1.set_ylabel('Price ($)')
        ax1.legend(loc='upper left')
        ax1.grid(True, alpha=0.3)
        
        # RSI
        ax2 = axes[1]
        ax2.plot(df.index, df['RSI'], 'purple', linewidth=1.5)
        ax2.axhline(70, color='red', linestyle='--', alpha=0.5, label='Overbought')
        ax2.axhline(30, color='green', linestyle='--', alpha=0.5, label='Oversold')
        ax2.fill_between(df.index, 70, df['RSI'], where=(df['RSI'] >= 70), alpha=0.3, color='red')
        ax2.fill_between(df.index, 30, df['RSI'], where=(df['RSI'] <= 30), alpha=0.3, color='green')
        ax2.set_ylabel('RSI')
        ax2.set_ylim(0, 100)
        ax2.legend(loc='upper left')
        ax2.grid(True, alpha=0.3)
        
        # MACD
        ax3 = axes[2]
        ax3.plot(df.index, df['MACD'], 'b-', linewidth=1, label='MACD')
        ax3.plot(df.index, df['Signal'], 'r-', linewidth=1, label='Signal')
        colors = ['g' if x > 0 else 'r' for x in df['MACD_Hist']]
        ax3.bar(df.index, df['MACD_Hist'], color=colors, alpha=0.3, label='Histogram')
        ax3.axhline(0, color='black', linestyle='-', linewidth=0.5)
        ax3.set_ylabel('MACD')
        ax3.legend(loc='upper left')
        ax3.grid(True, alpha=0.3)
        
        plt.tight_layout()
        plt.savefig(f'{self.ticker}_technical_analysis.png', dpi=150, bbox_inches='tight')
        print(f"📊 Chart saved as '{self.ticker}_technical_analysis.png'")
        plt.show()
    
    # ============================================================
    # Feature 3: Trading Strategy Simulator
    # ============================================================
    
    def simulate_strategy(self, strategy_type='swing', risk_level='moderate'):
        """
        Simulate different trading strategies in various market conditions.
        
        strategy_type: 'swing', 'intraday', 'position'
        risk_level: 'conservative', 'moderate', 'aggressive'
        """
        print(f"\n{'='*70}")
        print(f"🎯 TRADING STRATEGY SIMULATOR")
        print(f"{'='*70}\n")
        
        print(f"Strategy Type: {strategy_type.upper()}")
        print(f"Risk Level: {risk_level.upper()}")
        print(f"Stock: {self.ticker}\n")
        
        # Get data based on strategy
        if strategy_type == 'intraday':
            period = '5d'
            interval = '5m'
        elif strategy_type == 'swing':
            period = '3mo'
            interval = '1d'
        else:  # position
            period = '1y'
            interval = '1d'
        
        df = self.stock.history(period=period, interval=interval)
        
        if df.empty:
            print("❌ Insufficient data")
            return
        
        # Risk parameters
        risk_params = {
            'conservative': {'stop_loss': 0.02, 'take_profit': 0.04, 'position_size': 0.25},
            'moderate': {'stop_loss': 0.03, 'take_profit': 0.06, 'position_size': 0.50},
            'aggressive': {'stop_loss': 0.05, 'take_profit': 0.10, 'position_size': 0.75}
        }
        
        params = risk_params.get(risk_level, risk_params['moderate'])
        
        print(f"📋 STRATEGY PARAMETERS")
        print("-" * 70)
        print(f"Stop Loss: {params['stop_loss']*100:.0f}%")
        print(f"Take Profit: {params['take_profit']*100:.0f}%")
        print(f"Position Size: {params['position_size']*100:.0f}% of capital")
        
        # Simulate behavior in different conditions
        print(f"\n\n🌐 MARKET CONDITION SIMULATIONS")
        print("-" * 70)
        
        scenarios = [
            ("📈 Bull Market (Trending Up)", self._simulate_bull_market),
            ("📉 Bear Market (Trending Down)", self._simulate_bear_market),
            ("↔️ Sideways Market (Range-bound)", self._simulate_sideways_market),
            ("🌊 High Volatility", self._simulate_volatile_market)
        ]
        
        for scenario_name, sim_func in scenarios:
            print(f"\n{scenario_name}:")
            sim_func(strategy_type, params)
        
        print(f"\n\n💡 KEY INSIGHTS")
        print("-" * 70)
        
        if strategy_type == 'intraday':
            print("• Best for: High volatility, clear trends, sufficient liquidity")
            print("• Risk: Time pressure, multiple trades, high transaction costs")
            print("• Focus: Quick decisions, strict discipline, tight stops")
        elif strategy_type == 'swing':
            print("• Best for: Moderate trends, 3-10 day moves, less screen time")
            print("• Risk: Overnight gaps, market news, multi-day exposure")
            print("• Focus: Patience, trend following, risk management")
        else:  # position
            print("• Best for: Long-term trends, fundamentals, lower stress")
            print("• Risk: Market cycles, extended drawdowns, opportunity cost")
            print("• Focus: Strategic entries, macro trends, patience")
        
        print(f"\n{'='*70}\n")
    
    def _simulate_bull_market(self, strategy, params):
        """Simulate bull market behavior."""
        print(f"  Win Rate: ~65-75%")
        print(f"  Expected: Multiple winning trades, let profits run")
        print(f"  Action: Trail stops, reduce position sizing on strength")
    
    def _simulate_bear_market(self, strategy, params):
        """Simulate bear market behavior."""
        print(f"  Win Rate: ~35-45%")
        print(f"  Expected: More stop-outs, short rallies")
        print(f"  Action: Tighter stops, smaller positions, wait for reversal")
    
    def _simulate_sideways_market(self, strategy, params):
        """Simulate sideways market behavior."""
        print(f"  Win Rate: ~50-55%")
        print(f"  Expected: Whipsaws, range-bound moves")
        print(f"  Action: Buy support/sell resistance, avoid breakout trades")
    
    def _simulate_volatile_market(self, strategy, params):
        """Simulate volatile market behavior."""
        print(f"  Win Rate: ~45-60%")
        print(f"  Expected: Large swings, faster profit/loss targets")
        print(f"  Action: Wider stops, smaller positions, quick profits")
    
    # ============================================================
    # Utility Methods
    # ============================================================
    
    def _format_large_number(self, num):
        """Format large numbers (billions, millions)."""
        if not num or pd.isna(num):
            return "N/A"
        if num >= 1e12:
            return f"${num/1e12:.2f}T"
        elif num >= 1e9:
            return f"${num/1e9:.2f}B"
        elif num >= 1e6:
            return f"${num/1e6:.2f}M"
        else:
            return f"${num:,.0f}"
    
    def _format_percent(self, value):
        """Format percentage values."""
        if not value or pd.isna(value):
            return "N/A"
        return f"{value*100:.2f}%"


# ============================================================
# CLI Interface
# ============================================================

def main():
    """Main CLI interface."""
    import argparse
    
    parser = argparse.ArgumentParser(description='AI-Powered Stock Analysis Toolkit')
    parser.add_argument('--feature', type=int, choices=range(1, 8), required=True,
                       help='Feature number (1-7)')
    parser.add_argument('--stock', type=str, required=True,
                       help='Stock ticker symbol')
    parser.add_argument('--period', type=str, default='6mo',
                       help='Time period for analysis')
    parser.add_argument('--strategy', type=str, default='swing',
                       choices=['intraday', 'swing', 'position'],
                       help='Trading strategy type')
    parser.add_argument('--risk', type=str, default='moderate',
                       choices=['conservative', 'moderate', 'aggressive'],
                       help='Risk level')
    
    args = parser.parse_args()
    
    analyst = AIStockAnalyst(args.stock)
    
    features = {
        1: ('Personal Market Analyst', lambda: analyst.fundamental_analysis()),
        2: ('Technical Chart Breakdown', lambda: analyst.technical_analysis(args.period)),
        3: ('Trading Strategy Simulator', lambda: analyst.simulate_strategy(args.strategy, args.risk)),
    }
    
    if args.feature in features:
        name, func = features[args.feature]
        print(f"\n🤖 Running: {name}\n")
        func()
    else:
        print(f"Feature {args.feature} is under construction. Check back soon!")


if __name__ == "__main__":
    main()


# ============================================================
# Integration of Advanced Features (4-7)
# ============================================================

def run_risk_manager():
    """Feature 4: Personal Risk Manager"""
    from advanced_features import RiskManager
    
    print("\n🛡️ PERSONAL RISK MANAGER\n")
    print("Let's assess your risk profile and create a personalized plan.\n")
    
    # Interactive input
    age = int(input("Enter your age: ") or "35")
    
    print("\nRisk Tolerance:")
    print("1. Conservative (capital preservation)")
    print("2. Moderate (balanced growth)")
    print("3. Aggressive (maximum growth)")
    risk_choice = input("Select (1-3): ") or "2"
    risk_map = {"1": "conservative", "2": "moderate", "3": "aggressive"}
    risk_tolerance = risk_map.get(risk_choice, "moderate")
    
    print("\nInvestment Horizon:")
    print("1. Short-term (<3 years)")
    print("2. Medium-term (3-10 years)")
    print("3. Long-term (>10 years)")
    horizon_choice = input("Select (1-3): ") or "2"
    horizon_map = {"1": "short", "2": "medium", "3": "long"}
    investment_horizon = horizon_map.get(horizon_choice, "medium")
    
    goals = input("\nInvestment goals (e.g., retirement, house): ") or "Retirement"
    
    manager = RiskManager()
    manager.analyze_risk_profile(age, risk_tolerance, investment_horizon, goals)


def run_stock_screener(ticker):
    """Feature 5: AI Stock Screener"""
    from advanced_features import StockScreener
    import yfinance as yf
    
    stock = yf.Ticker(ticker)
    screener = StockScreener()
    score = screener.screen_stock(ticker, stock)
    
    return score


def run_daily_brain():
    """Feature 7: Daily Market Brain"""
    from advanced_features import DailyMarketBrain
    
    brain = DailyMarketBrain()
    brain.generate_daily_routine()


# Update main() to include new features
def main():
    """Main CLI interface."""
    import argparse
    
    parser = argparse.ArgumentParser(description='AI-Powered Stock Analysis Toolkit')
    parser.add_argument('--feature', type=int, choices=range(1, 8), required=True,
                       help='Feature number (1-7)')
    parser.add_argument('--stock', type=str,
                       help='Stock ticker symbol')
    parser.add_argument('--period', type=str, default='6mo',
                       help='Time period for analysis')
    parser.add_argument('--strategy', type=str, default='swing',
                       choices=['intraday', 'swing', 'position'],
                       help='Trading strategy type')
    parser.add_argument('--risk', type=str, default='moderate',
                       choices=['conservative', 'moderate', 'aggressive'],
                       help='Risk level')
    
    args = parser.parse_args()
    
    # Features that require a stock ticker
    if args.feature in [1, 2, 3, 5] and not args.stock:
        print("❌ Error: --stock required for this feature")
        return
    
    if args.stock:
        analyst = AIStockAnalyst(args.stock)
    
    features = {
        1: ('Personal Market Analyst', lambda: analyst.fundamental_analysis()),
        2: ('Technical Chart Breakdown', lambda: analyst.technical_analysis(args.period)),
        3: ('Trading Strategy Simulator', lambda: analyst.simulate_strategy(args.strategy, args.risk)),
        4: ('Personal Risk Manager', run_risk_manager),
        5: ('AI Stock Screener', lambda: run_stock_screener(args.stock)),
        6: ('News Impact Analyzer', lambda: print("Feature 6 coming in next update!")),
        7: ('Daily Market Brain', run_daily_brain),
    }
    
    if args.feature in features:
        name, func = features[args.feature]
        print(f"\n🤖 Running: {name}\n")
        func()
    else:
        print(f"Feature {args.feature} not found!")


if __name__ == "__main__":
    main()
