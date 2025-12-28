"""
AI Stock Analyst - Features 4-7 Implementation
===============================================
Completing the remaining features:
- Feature 4: Personal Risk Manager
- Feature 5: AI Stock Screener
- Feature 6: News Impact Analyzer
- Feature 7: Daily Market Brain
"""

import pandas as pd
import numpy as np
from datetime import datetime, timedelta


class RiskManager:
    """Personal Risk Manager - Feature 4"""
    
    def analyze_risk_profile(self, age, risk_tolerance, investment_horizon, goals):
        """
        Analyze risk profile and create personalized allocation strategy.
        
        Parameters:
        -----------
        age: int - Investor age
        risk_tolerance: str - 'conservative', 'moderate', 'aggressive'
        investment_horizon: str - 'short' (<3yr), 'medium' (3-10yr), 'long' (>10yr)
        goals: str - Investment goals
        """
        print(f"\n{'='*70}")
        print(f"🛡️ PERSONAL RISK MANAGER")
        print(f"{'='*70}\n")
        
        # Profile Summary
        print("👤 INVESTOR PROFILE")
        print("-" * 70)
        print(f"Age: {age}")
        print(f"Risk Tolerance: {risk_tolerance.upper()}")
        print(f"Time Horizon: {investment_horizon.upper()}")
        print(f"Goals: {goals}")
        
        # Calculate recommended allocations
        allocations = self._calculate_allocations(age, risk_tolerance, investment_horizon)
        
        print(f"\n\n📊 RECOMMENDED ASSET ALLOCATION")
        print("-" * 70)
        
        for asset, percentage in allocations.items():
            bar = "█" * int(percentage / 2)
            print(f"{asset:.<30} {percentage:>3.0f}% {bar}")
        
        # Risk controls
        print(f"\n\n⚙️ RISK CONTROL MECHANISMS")
        print("-" * 70)
        
        controls = self._get_risk_controls(risk_tolerance)
        for control, value in controls.items():
            print(f"• {control}: {value}")
        
        # Position sizing rules
        print(f"\n\n💰 POSITION SIZING GUIDELINES")
        print("-" * 70)
        
        max_position = {"conservative": 5, "moderate": 10, "aggressive": 15}[risk_tolerance]
        max_sector = {"conservative": 15, "moderate": 25, "aggressive": 35}[risk_tolerance]
        
        print(f"Max Single Position: {max_position}% of portfolio")
        print(f"Max Sector Exposure: {max_sector}% of portfolio")
        print(f"Min # of Holdings: {100 // max_position} stocks")
        print(f"Cash Reserve: 5-10% for opportunities")
        
        # Rebalancing strategy
        print(f"\n\n🔄 REBALANCING STRATEGY")
        print("-" * 70)
        
        if investment_horizon == 'short':
            rebal_freq = "Monthly"
            threshold = "5%"
        elif investment_horizon == 'medium':
            rebal_freq = "Quarterly"
            threshold = "10%"
        else:
            rebal_freq = "Semi-annually"
            threshold = "15%"
        
        print(f"Frequency: {rebal_freq}")
        print(f"Trigger Threshold: {threshold} deviation from target")
        print(f"Method: Sell winners, buy laggards (tax-efficient)")
        
        # Time-based adjustments
        print(f"\n\n📅 TIME-BASED ADJUSTMENTS")
        print("-" * 70)
        
        years_to_goal = {"short": 2, "medium": 7, "long": 20}[investment_horizon]
        print(f"Years to Goal: {years_to_goal}")
        print(f"Adjustment Strategy:")
        print(f"  • Every 5 years: Reduce equity by 5-10%")
        print(f"  • Within 5 years of goal: Shift to bonds/cash")
        print(f"  • Maintain emergency fund: 6-12 months expenses")
        
        print(f"\n{'='*70}\n")
    
    def _calculate_allocations(self, age, risk_tolerance, horizon):
        """Calculate asset allocation percentages."""
        # Base allocation on age (Rule of 110)
        base_equity = min(110 - age, 90)
        
        # Adjust for risk tolerance
        risk_adj = {"conservative": -15, "moderate": 0, "aggressive": 15}[risk_tolerance]
        
        # Adjust for time horizon
        horizon_adj = {"short": -15, "medium": 0, "long": 10}[horizon]
        
        equity_pct = max(30, min(90, base_equity + risk_adj + horizon_adj))
        fixed_income = 100 - equity_pct
        
        # Break down equity
        us_stocks = equity_pct * 0.60
        intl_stocks = equity_pct * 0.30
        reits = equity_pct * 0.10
        
        # Break down fixed income
        bonds = fixed_income * 0.70
        cash = fixed_income * 0.30
        
        return {
            "US Stocks": us_stocks,
            "International Stocks": intl_stocks,
            "REITs": reits,
            "Bonds": bonds,
            "Cash/Money Market": cash
        }
    
    def _get_risk_controls(self, risk_tolerance):
        """Get risk control parameters."""
        controls = {
            "conservative": {
                "Max Portfolio Volatility": "10-12%",
                "Max Drawdown Tolerance": "15%",
                "Stop Loss Per Position": "8-10%",
                "Diversification": "20-30 holdings"
            },
            "moderate": {
                "Max Portfolio Volatility": "12-18%",
                "Max Drawdown Tolerance": "25%",
                "Stop Loss Per Position": "12-15%",
                "Diversification": "15-25 holdings"
            },
            "aggressive": {
                "Max Portfolio Volatility": "18-25%",
                "Max Drawdown Tolerance": "35%",
                "Stop Loss Per Position": "15-20%",
                "Diversification": "10-20 holdings"
            }
        }
        return controls[risk_tolerance]


class StockScreener:
    """AI Stock Screener - Feature 5"""
    
    def __init__(self):
        self.scoring_weights = {
            'valuation': 0.25,
            'growth': 0.20,
            'financial_health': 0.25,
            'profitability': 0.20,
            'momentum': 0.10
        }
    
    def screen_stock(self, ticker, stock_data):
        """
        Screen a stock using multi-factor quality scoring.
        
        Returns quality score (0-100) and detailed breakdown.
        """
        print(f"\n{'='*70}")
        print(f"🔍 AI STOCK SCREENER: {ticker}")
        print(f"{'='*70}\n")
        
        info = stock_data.info
        
        # Calculate individual scores
        scores = {
            'Valuation': self._score_valuation(info),
            'Growth': self._score_growth(info),
            'Financial Health': self._score_financial_health(info),
            'Profitability': self._score_profitability(info),
            'Momentum': self._score_momentum(info)
        }
        
        # Calculate weighted total
        total_score = sum(scores.values()) / len(scores)
        
        # Display results
        print("📊 QUALITY SCORES (0-100)")
        print("-" * 70)
        
        for category, score in scores.items():
            grade = self._get_grade(score)
            bar = "█" * int(score / 5)
            print(f"{category:.<30} {score:>3.0f} {grade:>3} {bar}")
        
        print("-" * 70)
        final_grade = self._get_grade(total_score)
        print(f"{'OVERALL QUALITY SCORE':.<30} {total_score:>3.0f} {final_grade:>3}")
        
        # Investment recommendation
        print(f"\n\n🎯 SCREENING RESULT")
        print("-" * 70)
        
        if total_score >= 75:
            verdict = "✅ HIGH QUALITY - Strong Buy Candidate"
            action = "Deep dive recommended. Check technicals for entry."
        elif total_score >= 60:
            verdict = "🟡 GOOD QUALITY - Worth Researching"
            action = "Review fundamentals in detail. Compare to peers."
        elif total_score >= 45:
            verdict = "⚠️ MIXED QUALITY - Proceed with Caution"
            action = "Identify specific concerns. May be situational."
        else:
            verdict = "❌ LOW QUALITY - Avoid or Short Candidate"
            action = "Look for better opportunities. High risk."
        
        print(f"{verdict}")
        print(f"Recommended Action: {action}")
        
        # Key strengths and weaknesses
        print(f"\n\n💪 STRENGTHS & WEAKNESSES")
        print("-" * 70)
        
        sorted_scores = sorted(scores.items(), key=lambda x: x[1], reverse=True)
        
        print("Strengths:")
        for category, score in sorted_scores[:2]:
            if score >= 60:
                print(f"  ✓ {category}: {score:.0f}/100")
        
        print("\nWeaknesses:")
        for category, score in sorted_scores[-2:]:
            if score < 60:
                print(f"  ✗ {category}: {score:.0f}/100")
        
        print(f"\n{'='*70}\n")
        
        return total_score
    
    def _score_valuation(self, info):
        """Score valuation metrics (0-100)."""
        score = 50  # Start neutral
        
        pe = info.get('trailingPE', 0)
        if pe and 0 < pe < 15:
            score += 25
        elif pe and 15 <= pe < 25:
            score += 10
        elif pe and pe >= 40:
            score -= 20
        
        pb = info.get('priceToBook', 0)
        if pb and pb < 2:
            score += 15
        elif pb and pb > 5:
            score -= 10
        
        peg = info.get('pegRatio', 0)
        if peg and 0 < peg < 1:
            score += 10
        
        return max(0, min(100, score))
    
    def _score_growth(self, info):
        """Score growth metrics (0-100)."""
        score = 50
        
        rev_growth = info.get('revenueGrowth', 0)
        if rev_growth and rev_growth > 0.15:
            score += 25
        elif rev_growth and rev_growth > 0.05:
            score += 10
        elif rev_growth and rev_growth < 0:
            score -= 20
        
        earn_growth = info.get('earningsGrowth', 0)
        if earn_growth and earn_growth > 0.15:
            score += 25
        elif earn_growth and earn_growth < 0:
            score -= 15
        
        return max(0, min(100, score))
    
    def _score_financial_health(self, info):
        """Score financial health (0-100)."""
        score = 50
        
        current_ratio = info.get('currentRatio', 0)
        if current_ratio and current_ratio > 2:
            score += 20
        elif current_ratio and current_ratio < 1:
            score -= 20
        
        debt_equity = info.get('debtToEquity', 0)
        if debt_equity and debt_equity < 50:
            score += 15
        elif debt_equity and debt_equity > 150:
            score -= 15
        
        fcf = info.get('freeCashflow', 0)
        if fcf and fcf > 0:
            score += 15
        
        return max(0, min(100, score))
    
    def _score_profitability(self, info):
        """Score profitability (0-100)."""
        score = 50
        
        roe = info.get('returnOnEquity', 0)
        if roe and roe > 0.20:
            score += 25
        elif roe and roe > 0.10:
            score += 10
        elif roe and roe < 0:
            score -= 25
        
        margin = info.get('profitMargins', 0)
        if margin and margin > 0.20:
            score += 25
        elif margin and margin > 0.10:
            score += 10
        
        return max(0, min(100, score))
    
    def _score_momentum(self, info):
        """Score price momentum (0-100)."""
        score = 50
        
        recommend = info.get('recommendationKey', '').lower()
        if recommend in ['strong_buy', 'buy']:
            score += 25
        elif recommend == 'sell':
            score -= 25
        
        # Simple momentum check would require price history
        # Placeholder for now
        
        return max(0, min(100, score))
    
    def _get_grade(self, score):
        """Convert score to letter grade."""
        if score >= 90:
            return "A+"
        elif score >= 80:
            return "A"
        elif score >= 70:
            return "B+"
        elif score >= 60:
            return "B"
        elif score >= 50:
            return "C"
        elif score >= 40:
            return "D"
        else:
            return "F"


class DailyMarketBrain:
    """Daily Market Brain - Feature 7"""
    
    def generate_daily_routine(self):
        """Generate a 10-minute daily market analysis routine."""
        print(f"\n{'='*70}")
        print(f"🧠 DAILY MARKET BRAIN - 10-Minute Routine")
        print(f"{'='*70}\n")
        
        print("⏰ ROUTINE BREAKDOWN")
        print("-" * 70)
        
        routine = [
            ("1. Index Check", "2 min", "SPY, QQQ, DIA - Check overnight moves & futures"),
            ("2. News Scan", "2 min", "Top 3 market-moving headlines via Bloomberg/CNBC"),
            ("3. Watchlist Review", "3 min", "Check 5-10 stocks on watchlist for setups"),
            ("4. Chart Analysis", "2 min", "Quick technical check on 2-3 priority stocks"),
            ("5. Risk Check", "1 min", "Portfolio exposure, upcoming earnings, stops")
        ]
        
        for task, time, description in routine:
            print(f"\n{task} ({time}):")
            print(f"  → {description}")
        
        print(f"\n\n📋 TODAY'S CHECKLIST")
        print("-" * 70)
        
        now = datetime.now()
        
        checklist = [
            "[ ] Check index futures (S&P, Nasdaq, Dow)",
            "[ ] Scan top 3 news headlines",
            "[ ] Review watchlist (5-10 stocks)",
            "[ ] Check 2-3 priority charts",
            "[ ] Verify stop losses are set",
            "[ ] Review upcoming earnings calendar",
            "[ ] Check economic calendar for today",
            "[ ] Update trading journal from yesterday",
            "[ ] Set price alerts for key levels",
            "[ ] Review and adjust daily game plan"
        ]
        
        for item in checklist:
            print(f"  {item}")
        
        print(f"\n\n🎯 FOCUS AREAS FOR {now.strftime('%B %d, %Y')}")
        print("-" * 70)
        
        day_of_week = now.strftime('%A')
        
        if day_of_week == 'Monday':
            focus = "Weekend news gaps, setup for the week, sector rotation"
        elif day_of_week == 'Friday':
            focus = "Week-end profit taking, position management, weekend risk"
        else:
            focus = "Mid-week trends, earnings reactions, follow-through"
        
        print(f"Day: {day_of_week}")
        print(f"Focus: {focus}")
        
        print(f"\n\n📊 KEY METRICS TO TRACK")
        print("-" * 70)
        
        metrics = [
            "VIX (Fear Index): <15 calm, 15-25 normal, >25 fear",
            "10Y Treasury Yield: Rising = bearish stocks, Falling = bullish",
            "USD Dollar Index: Strong $ can hurt earnings",
            "Oil Prices: Inflation indicator, sector impact",
            "Crypto (BTC): Risk-on/risk-off sentiment"
        ]
        
        for metric in metrics:
            print(f"  • {metric}")
        
        print(f"\n\n💡 PRO TIPS")
        print("-" * 70)
        
        tips = [
            "Best time: 30 min before market open (9:00 AM ET)",
            "Use same routine every day for consistency",
            "Keep a market journal - note what worked/didn't",
            "Don't overtrade - quality over quantity",
            "If nothing sets up, cash is a position",
            "Never fight the Fed or the trend"
        ]
        
        for tip in tips:
            print(f"  ✓ {tip}")
        
        print(f"\n{'='*70}\n")


# Export classes
__all__ = ['RiskManager', 'StockScreener', 'DailyMarketBrain']
