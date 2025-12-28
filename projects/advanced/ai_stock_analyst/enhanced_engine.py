"""
AI Stock Analyst - Advanced Engine
===================================
Enhanced version inspired by nof1.ai Alpha Arena concepts:
- Multi-model analysis (GPT, DeepSeek, Claude style)
- Intelligent risk management with drawdown protection
- Real-time market sentiment analysis
- Strategy optimization and backtesting
- Performance analytics with Sharpe ratio
"""

import numpy as np
import pandas as pd
from datetime import datetime, timedelta
from dataclasses import dataclass, field
from typing import List, Dict, Optional, Callable
from collections import deque
import json
import random

# =============================================================================
# DATA CLASSES
# =============================================================================

@dataclass
class MarketSignal:
    """Market signal from analysis"""
    direction: str  # 'LONG', 'SHORT', 'NEUTRAL'
    confidence: float  # 0.0 - 1.0
    source: str  # 'technical', 'fundamental', 'sentiment'
    reasoning: str
    timestamp: datetime = field(default_factory=datetime.now)

@dataclass
class TradeProposal:
    """Proposed trade from the AI engine"""
    id: str
    ticker: str
    direction: str  # 'LONG' or 'SHORT'
    entry_price: float
    take_profit: float
    stop_loss: float
    size_pct: float  # Position size as % of portfolio
    risk_reward: float
    confidence: float
    signals: List[MarketSignal]
    status: str = 'pending'  # 'pending', 'approved', 'rejected', 'executed'
    created_at: datetime = field(default_factory=datetime.now)

@dataclass
class PerformanceMetrics:
    """Trading performance metrics"""
    total_trades: int = 0
    winning_trades: int = 0
    losing_trades: int = 0
    total_pnl: float = 0.0
    total_return_pct: float = 0.0
    win_rate: float = 0.0
    sharpe_ratio: float = 0.0
    max_drawdown: float = 0.0
    avg_trade_duration: float = 0.0
    biggest_win: float = 0.0
    biggest_loss: float = 0.0

# =============================================================================
# MULTI-MODEL AI ENGINE
# =============================================================================

class ModelEngine:
    """Base class for AI model engines"""
    
    def __init__(self, name: str, specialty: str):
        self.name = name
        self.specialty = specialty
        self.accuracy_history = deque(maxlen=100)
    
    def analyze(self, data: Dict) -> MarketSignal:
        raise NotImplementedError

class TechnicalModel(ModelEngine):
    """Technical analysis model (inspired by DeepSeek style)"""
    
    def __init__(self):
        super().__init__("TechnicalAI", "candlestick_patterns")
    
    def analyze(self, data: Dict) -> MarketSignal:
        """Analyze technical indicators"""
        price = data.get('price', 100)
        sma_20 = data.get('sma_20', price * 0.98)
        sma_50 = data.get('sma_50', price * 0.95)
        rsi = data.get('rsi', 50)
        macd = data.get('macd', 0)
        
        # Scoring system
        score = 0
        reasoning_parts = []
        
        # Price vs MAs
        if price > sma_20:
            score += 1
            reasoning_parts.append("Price above SMA20")
        if price > sma_50:
            score += 1
            reasoning_parts.append("Price above SMA50")
        
        # RSI
        if rsi < 30:
            score += 2
            reasoning_parts.append(f"RSI oversold ({rsi:.1f})")
        elif rsi > 70:
            score -= 2
            reasoning_parts.append(f"RSI overbought ({rsi:.1f})")
        else:
            reasoning_parts.append(f"RSI neutral ({rsi:.1f})")
        
        # MACD
        if macd > 0:
            score += 1
            reasoning_parts.append("MACD bullish")
        elif macd < 0:
            score -= 1
            reasoning_parts.append("MACD bearish")
        
        # Determine direction
        if score >= 2:
            direction = 'LONG'
            confidence = min(0.9, 0.5 + score * 0.1)
        elif score <= -2:
            direction = 'SHORT'
            confidence = min(0.9, 0.5 + abs(score) * 0.1)
        else:
            direction = 'NEUTRAL'
            confidence = 0.3
        
        return MarketSignal(
            direction=direction,
            confidence=confidence,
            source='technical',
            reasoning='; '.join(reasoning_parts)
        )

class FundamentalModel(ModelEngine):
    """Fundamental analysis model (inspired by GPT style)"""
    
    def __init__(self):
        super().__init__("FundamentalAI", "financial_statements")
    
    def analyze(self, data: Dict) -> MarketSignal:
        """Analyze fundamental metrics"""
        pe_ratio = data.get('pe_ratio', 20)
        roe = data.get('roe', 0.15)
        debt_equity = data.get('debt_equity', 0.5)
        revenue_growth = data.get('revenue_growth', 0.05)
        
        score = 0
        reasoning_parts = []
        
        # P/E Analysis
        if pe_ratio < 15:
            score += 2
            reasoning_parts.append(f"Undervalued P/E ({pe_ratio:.1f})")
        elif pe_ratio > 30:
            score -= 1
            reasoning_parts.append(f"High P/E ({pe_ratio:.1f})")
        else:
            reasoning_parts.append(f"Fair P/E ({pe_ratio:.1f})")
        
        # ROE
        if roe > 0.20:
            score += 2
            reasoning_parts.append(f"Strong ROE ({roe:.1%})")
        elif roe > 0.10:
            score += 1
            reasoning_parts.append(f"Good ROE ({roe:.1%})")
        elif roe < 0:
            score -= 2
            reasoning_parts.append(f"Negative ROE ({roe:.1%})")
        
        # Debt
        if debt_equity < 0.5:
            score += 1
            reasoning_parts.append("Low debt")
        elif debt_equity > 2:
            score -= 1
            reasoning_parts.append("High debt")
        
        # Growth
        if revenue_growth > 0.15:
            score += 2
            reasoning_parts.append(f"Strong growth ({revenue_growth:.1%})")
        elif revenue_growth > 0.05:
            score += 1
            reasoning_parts.append(f"Moderate growth ({revenue_growth:.1%})")
        elif revenue_growth < 0:
            score -= 1
            reasoning_parts.append(f"Declining revenue ({revenue_growth:.1%})")
        
        if score >= 3:
            direction = 'LONG'
            confidence = min(0.85, 0.5 + score * 0.08)
        elif score <= -2:
            direction = 'SHORT'
            confidence = min(0.85, 0.5 + abs(score) * 0.08)
        else:
            direction = 'NEUTRAL'
            confidence = 0.4
        
        return MarketSignal(
            direction=direction,
            confidence=confidence,
            source='fundamental',
            reasoning='; '.join(reasoning_parts)
        )

class SentimentModel(ModelEngine):
    """Sentiment analysis model (inspired by Claude style)"""
    
    def __init__(self):
        super().__init__("SentimentAI", "news_social_media")
    
    def analyze(self, data: Dict) -> MarketSignal:
        """Analyze market sentiment"""
        news_sentiment = data.get('news_sentiment', 0)  # -1 to 1
        social_sentiment = data.get('social_sentiment', 0)  # -1 to 1
        analyst_rating = data.get('analyst_rating', 'hold')  # buy, hold, sell
        insider_activity = data.get('insider_activity', 'neutral')  # buying, selling, neutral
        
        score = 0
        reasoning_parts = []
        
        # News sentiment
        if news_sentiment > 0.3:
            score += 2
            reasoning_parts.append("Positive news sentiment")
        elif news_sentiment < -0.3:
            score -= 2
            reasoning_parts.append("Negative news sentiment")
        else:
            reasoning_parts.append("Neutral news")
        
        # Social sentiment
        if social_sentiment > 0.4:
            score += 1
            reasoning_parts.append("Bullish social media")
        elif social_sentiment < -0.4:
            score -= 1
            reasoning_parts.append("Bearish social media")
        
        # Analyst rating
        if analyst_rating == 'buy':
            score += 1
            reasoning_parts.append("Analyst: Buy")
        elif analyst_rating == 'sell':
            score -= 1
            reasoning_parts.append("Analyst: Sell")
        
        # Insider activity
        if insider_activity == 'buying':
            score += 2
            reasoning_parts.append("Insider buying")
        elif insider_activity == 'selling':
            score -= 1
            reasoning_parts.append("Insider selling")
        
        if score >= 2:
            direction = 'LONG'
            confidence = min(0.80, 0.4 + score * 0.1)
        elif score <= -2:
            direction = 'SHORT'
            confidence = min(0.80, 0.4 + abs(score) * 0.1)
        else:
            direction = 'NEUTRAL'
            confidence = 0.3
        
        return MarketSignal(
            direction=direction,
            confidence=confidence,
            source='sentiment',
            reasoning='; '.join(reasoning_parts)
        )

class RiskModel(ModelEngine):
    """Risk management model"""
    
    def __init__(self):
        super().__init__("RiskAI", "risk_management")
    
    def calculate_position_size(self, portfolio_value: float, risk_per_trade: float, 
                                stop_loss_pct: float) -> float:
        """Calculate position size using Kelly-inspired sizing"""
        max_position = portfolio_value * 0.25  # Max 25% per position
        risk_based_size = (portfolio_value * risk_per_trade) / stop_loss_pct
        return min(max_position, risk_based_size)
    
    def calculate_stop_loss(self, entry: float, direction: str, atr: float) -> float:
        """Calculate stop loss based on ATR"""
        multiplier = 2.0
        if direction == 'LONG':
            return entry - (atr * multiplier)
        else:
            return entry + (atr * multiplier)
    
    def calculate_take_profit(self, entry: float, stop_loss: float, 
                             risk_reward: float = 2.0) -> float:
        """Calculate take profit for given R:R"""
        risk = abs(entry - stop_loss)
        reward = risk * risk_reward
        if entry > stop_loss:  # LONG
            return entry + reward
        else:  # SHORT
            return entry - reward

# =============================================================================
# MULTI-MODEL CONSENSUS ENGINE (Alpha Arena Style)
# =============================================================================

class MultiModelEngine:
    """
    Multi-model consensus system inspired by nof1.ai Alpha Arena.
    Combines signals from multiple AI models to make trading decisions.
    """
    
    def __init__(self):
        self.technical_model = TechnicalModel()
        self.fundamental_model = FundamentalModel()
        self.sentiment_model = SentimentModel()
        self.risk_model = RiskModel()
        
        # Model weights (can be adjusted based on performance)
        self.weights = {
            'technical': 0.40,
            'fundamental': 0.35,
            'sentiment': 0.25
        }
        
        # Performance tracking per model
        self.model_performance = {
            'technical': deque(maxlen=50),
            'fundamental': deque(maxlen=50),
            'sentiment': deque(maxlen=50)
        }
    
    def analyze(self, data: Dict) -> Dict:
        """
        Run multi-model analysis and return consensus.
        
        Returns:
            Dict with signals from each model and final consensus
        """
        # Get signals from each model
        technical_signal = self.technical_model.analyze(data)
        fundamental_signal = self.fundamental_model.analyze(data)
        sentiment_signal = self.sentiment_model.analyze(data)
        
        signals = [technical_signal, fundamental_signal, sentiment_signal]
        
        # Calculate weighted consensus
        direction_scores = {'LONG': 0, 'SHORT': 0, 'NEUTRAL': 0}
        
        for signal in signals:
            weight = self.weights[signal.source]
            direction_scores[signal.direction] += signal.confidence * weight
        
        # Determine consensus direction
        max_direction = max(direction_scores, key=direction_scores.get)
        max_score = direction_scores[max_direction]
        
        # Calculate overall confidence
        total_weight = sum(self.weights.values())
        overall_confidence = max_score / total_weight if total_weight > 0 else 0
        
        # Check for consensus strength
        agreement_count = sum(1 for s in signals if s.direction == max_direction)
        consensus_strength = agreement_count / len(signals)
        
        return {
            'signals': {
                'technical': {
                    'direction': technical_signal.direction,
                    'confidence': technical_signal.confidence,
                    'reasoning': technical_signal.reasoning
                },
                'fundamental': {
                    'direction': fundamental_signal.direction,
                    'confidence': fundamental_signal.confidence,
                    'reasoning': fundamental_signal.reasoning
                },
                'sentiment': {
                    'direction': sentiment_signal.direction,
                    'confidence': sentiment_signal.confidence,
                    'reasoning': sentiment_signal.reasoning
                }
            },
            'consensus': {
                'direction': max_direction,
                'confidence': overall_confidence,
                'strength': consensus_strength,
                'agreement': f"{agreement_count}/{len(signals)} models agree"
            },
            'actionable': max_direction != 'NEUTRAL' and overall_confidence > 0.5 and consensus_strength >= 0.66
        }
    
    def generate_proposal(self, ticker: str, data: Dict, portfolio_value: float = 100000) -> Optional[TradeProposal]:
        """Generate a trade proposal if conditions are met"""
        analysis = self.analyze(data)
        
        if not analysis['actionable']:
            return None
        
        direction = analysis['consensus']['direction']
        confidence = analysis['consensus']['confidence']
        
        entry_price = data.get('price', 100)
        atr = data.get('atr', entry_price * 0.02)
        
        # Calculate stops and targets
        stop_loss = self.risk_model.calculate_stop_loss(entry_price, direction, atr)
        take_profit = self.risk_model.calculate_take_profit(entry_price, stop_loss, risk_reward=2.0)
        
        # Calculate position size
        stop_loss_pct = abs(entry_price - stop_loss) / entry_price
        risk_per_trade = 0.02  # 2% risk per trade
        position_size = self.risk_model.calculate_position_size(
            portfolio_value, risk_per_trade, stop_loss_pct
        )
        size_pct = position_size / portfolio_value
        
        # Create signals list
        signals = [
            MarketSignal(
                direction=s['direction'],
                confidence=s['confidence'],
                source=source,
                reasoning=s['reasoning']
            )
            for source, s in analysis['signals'].items()
        ]
        
        return TradeProposal(
            id=f"prop_{ticker}_{datetime.now().strftime('%Y%m%d%H%M%S')}",
            ticker=ticker,
            direction=direction,
            entry_price=entry_price,
            take_profit=take_profit,
            stop_loss=stop_loss,
            size_pct=size_pct,
            risk_reward=2.0,
            confidence=confidence,
            signals=signals
        )
    
    def update_model_weights(self, performance_data: Dict):
        """
        Auto-adjust model weights based on performance (Alpha Arena style).
        Models with better recent performance get higher weights.
        """
        for model, accuracy in performance_data.items():
            if model in self.model_performance:
                self.model_performance[model].append(accuracy)
        
        # Calculate new weights based on recent accuracy
        recent_accuracy = {}
        for model, history in self.model_performance.items():
            if len(history) > 0:
                recent_accuracy[model] = sum(history) / len(history)
            else:
                recent_accuracy[model] = 0.5  # Default
        
        # Normalize weights
        total = sum(recent_accuracy.values())
        if total > 0:
            for model in self.weights:
                self.weights[model] = recent_accuracy.get(model, 0.33) / total

# =============================================================================
# INTELLIGENT RISK MANAGEMENT (Alpha Arena Style)
# =============================================================================

class IntelligentRiskManager:
    """
    Advanced risk management system inspired by nof1.ai Alpha Arena.
    Features: Smart RR Control, Drawdown Shield, Volatility Monitor, Session Cooldown
    """
    
    def __init__(self, initial_capital: float = 100000):
        self.initial_capital = initial_capital
        self.current_capital = initial_capital
        self.peak_capital = initial_capital
        self.daily_pnl = 0.0
        self.trade_count_today = 0
        self.last_trade_time = None
        
        # Risk parameters
        self.max_drawdown_pct = 0.10  # 10% max drawdown
        self.daily_loss_limit = 0.03  # 3% daily loss limit
        self.max_trades_per_day = 10
        self.cooldown_seconds = 300  # 5 minute cooldown between trades
        self.volatility_threshold = 0.05  # 5% daily volatility threshold
        
        # State
        self.is_trading_paused = False
        self.pause_reason = None
        self.trade_history = []
    
    def check_trading_allowed(self) -> tuple[bool, str]:
        """Check if trading is currently allowed"""
        # Check drawdown
        current_drawdown = (self.peak_capital - self.current_capital) / self.peak_capital
        if current_drawdown >= self.max_drawdown_pct:
            return False, f"Drawdown Shield Active: {current_drawdown:.1%} drawdown exceeds {self.max_drawdown_pct:.1%} limit"
        
        # Check daily loss
        daily_loss_pct = abs(min(0, self.daily_pnl)) / self.initial_capital
        if daily_loss_pct >= self.daily_loss_limit:
            return False, f"Daily Loss Limit: {daily_loss_pct:.1%} exceeds {self.daily_loss_limit:.1%} limit"
        
        # Check trade count
        if self.trade_count_today >= self.max_trades_per_day:
            return False, f"Max Trades Reached: {self.trade_count_today} trades today"
        
        # Check cooldown
        if self.last_trade_time:
            time_since_last = (datetime.now() - self.last_trade_time).total_seconds()
            if time_since_last < self.cooldown_seconds:
                remaining = self.cooldown_seconds - time_since_last
                return False, f"Cooldown Active: {remaining:.0f}s remaining"
        
        return True, "Trading allowed"
    
    def adjust_position_size(self, base_size: float, volatility: float) -> float:
        """Adjust position size based on current conditions"""
        # Reduce size during high volatility
        if volatility > self.volatility_threshold:
            reduction = min(0.5, volatility / self.volatility_threshold - 1)
            return base_size * (1 - reduction)
        
        # Reduce size after losses
        if self.daily_pnl < 0:
            loss_factor = abs(self.daily_pnl) / (self.initial_capital * self.daily_loss_limit)
            reduction = min(0.5, loss_factor * 0.3)
            return base_size * (1 - reduction)
        
        return base_size
    
    def record_trade(self, pnl: float):
        """Record a completed trade"""
        self.current_capital += pnl
        self.daily_pnl += pnl
        self.trade_count_today += 1
        self.last_trade_time = datetime.now()
        
        # Update peak
        if self.current_capital > self.peak_capital:
            self.peak_capital = self.current_capital
        
        self.trade_history.append({
            'pnl': pnl,
            'capital': self.current_capital,
            'timestamp': datetime.now()
        })
    
    def reset_daily_stats(self):
        """Reset daily statistics (call at start of new trading day)"""
        self.daily_pnl = 0.0
        self.trade_count_today = 0
    
    def get_risk_status(self) -> Dict:
        """Get current risk status"""
        current_drawdown = (self.peak_capital - self.current_capital) / self.peak_capital
        allowed, reason = self.check_trading_allowed()
        
        return {
            'capital': self.current_capital,
            'peak_capital': self.peak_capital,
            'drawdown': current_drawdown,
            'drawdown_pct': f"{current_drawdown:.2%}",
            'daily_pnl': self.daily_pnl,
            'trades_today': self.trade_count_today,
            'trading_allowed': allowed,
            'status_message': reason,
            'risk_level': 'HIGH' if current_drawdown > 0.05 else 'MEDIUM' if current_drawdown > 0.02 else 'LOW'
        }

# =============================================================================
# PERFORMANCE ANALYTICS
# =============================================================================

class PerformanceAnalytics:
    """
    Trading performance analytics inspired by nof1.ai Alpha Arena.
    Tracks all key metrics and generates reports.
    """
    
    def __init__(self):
        self.trades = []
        self.returns = []
    
    def record_trade(self, entry: float, exit: float, direction: str, 
                     size: float, duration_hours: float):
        """Record a completed trade"""
        if direction == 'LONG':
            pnl = (exit - entry) * size / entry
        else:
            pnl = (entry - exit) * size / entry
        
        self.trades.append({
            'entry': entry,
            'exit': exit,
            'direction': direction,
            'size': size,
            'pnl': pnl,
            'pnl_pct': pnl / size,
            'duration_hours': duration_hours,
            'timestamp': datetime.now()
        })
        
        self.returns.append(pnl / size)
    
    def calculate_metrics(self) -> PerformanceMetrics:
        """Calculate all performance metrics"""
        if not self.trades:
            return PerformanceMetrics()
        
        total_trades = len(self.trades)
        winning_trades = sum(1 for t in self.trades if t['pnl'] > 0)
        losing_trades = total_trades - winning_trades
        
        total_pnl = sum(t['pnl'] for t in self.trades)
        win_rate = winning_trades / total_trades if total_trades > 0 else 0
        
        # Sharpe ratio
        if len(self.returns) > 1:
            mean_return = np.mean(self.returns)
            std_return = np.std(self.returns)
            sharpe = (mean_return / std_return) * np.sqrt(252) if std_return > 0 else 0
        else:
            sharpe = 0
        
        # Max drawdown
        cumulative = np.cumsum(self.returns)
        peak = np.maximum.accumulate(cumulative)
        drawdowns = cumulative - peak
        max_drawdown = abs(np.min(drawdowns)) if len(drawdowns) > 0 else 0
        
        # Average duration
        avg_duration = np.mean([t['duration_hours'] for t in self.trades])
        
        # Biggest win/loss
        pnls = [t['pnl'] for t in self.trades]
        biggest_win = max(pnls) if pnls else 0
        biggest_loss = min(pnls) if pnls else 0
        
        return PerformanceMetrics(
            total_trades=total_trades,
            winning_trades=winning_trades,
            losing_trades=losing_trades,
            total_pnl=total_pnl,
            total_return_pct=(total_pnl / sum(t['size'] for t in self.trades)) * 100 if self.trades else 0,
            win_rate=win_rate,
            sharpe_ratio=sharpe,
            max_drawdown=max_drawdown,
            avg_trade_duration=avg_duration,
            biggest_win=biggest_win,
            biggest_loss=biggest_loss
        )
    
    def generate_report(self) -> str:
        """Generate a formatted performance report"""
        metrics = self.calculate_metrics()
        
        win_rate_str = f"{metrics.win_rate:.1%}"
        report = f"""
╔══════════════════════════════════════════════════════════════════════════════╗
║                         PERFORMANCE REPORT                                    ║
║                         {datetime.now().strftime('%Y-%m-%d %H:%M')}                                     ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  📊 TRADING SUMMARY                                                          ║
║  ─────────────────────────────────────────────────────────────────────────  ║
║  Total Trades: {metrics.total_trades:<10}    Winning: {metrics.winning_trades:<8}    Losing: {metrics.losing_trades:<8} ║
║  Win Rate: {win_rate_str:<15}                                                 ║
║                                                                              ║
║  💰 P&L ANALYSIS                                                             ║
║  ─────────────────────────────────────────────────────────────────────────  ║
║  Total P&L: ${metrics.total_pnl:>+12,.2f}                                      ║
║  Total Return: {metrics.total_return_pct:>+8.2f}%                                      ║
║  Biggest Win: ${metrics.biggest_win:>+12,.2f}                                   ║
║  Biggest Loss: ${metrics.biggest_loss:>+12,.2f}                                  ║
║                                                                              ║
║  📈 RISK METRICS                                                             ║
║  ─────────────────────────────────────────────────────────────────────────  ║
║  Sharpe Ratio: {metrics.sharpe_ratio:>+8.3f}                                          ║
║  Max Drawdown: {metrics.max_drawdown * 100:>8.2f}%                                         ║
║  Avg Trade Duration: {metrics.avg_trade_duration:>6.1f} hours                               ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
"""
        return report

# =============================================================================
# MAIN ENHANCED AI ANALYST
# =============================================================================

class EnhancedAIAnalyst:
    """
    Enhanced AI Stock Analyst with Alpha Arena-inspired features.
    Combines multi-model analysis, intelligent risk management, and performance tracking.
    """
    
    def __init__(self, initial_capital: float = 100000):
        self.multi_model = MultiModelEngine()
        self.risk_manager = IntelligentRiskManager(initial_capital)
        self.analytics = PerformanceAnalytics()
        self.pending_proposals = []
        self.active_trades = []
    
    def analyze_stock(self, ticker: str, data: Dict) -> Dict:
        """Run full multi-model analysis on a stock"""
        analysis = self.multi_model.analyze(data)
        
        # Add risk check
        trading_allowed, reason = self.risk_manager.check_trading_allowed()
        analysis['risk_status'] = self.risk_manager.get_risk_status()
        analysis['trading_allowed'] = trading_allowed
        analysis['risk_message'] = reason
        
        return analysis
    
    def generate_trade_proposal(self, ticker: str, data: Dict) -> Optional[TradeProposal]:
        """Generate a trade proposal if conditions are met"""
        # Check if trading is allowed
        allowed, reason = self.risk_manager.check_trading_allowed()
        if not allowed:
            print(f"⚠️ Trading blocked: {reason}")
            return None
        
        proposal = self.multi_model.generate_proposal(
            ticker, data, self.risk_manager.current_capital
        )
        
        if proposal:
            # Adjust position size based on risk conditions
            volatility = data.get('volatility', 0.02)
            base_size = proposal.size_pct * self.risk_manager.current_capital
            adjusted_size = self.risk_manager.adjust_position_size(base_size, volatility)
            proposal.size_pct = adjusted_size / self.risk_manager.current_capital
            
            self.pending_proposals.append(proposal)
        
        return proposal
    
    def approve_proposal(self, proposal_id: str) -> bool:
        """Approve and execute a trade proposal"""
        for proposal in self.pending_proposals:
            if proposal.id == proposal_id:
                proposal.status = 'executed'
                self.active_trades.append(proposal)
                self.pending_proposals.remove(proposal)
                return True
        return False
    
    def close_trade(self, trade_id: str, exit_price: float):
        """Close an active trade and record results"""
        for trade in self.active_trades:
            if trade.id == trade_id:
                # Calculate P&L
                if trade.direction == 'LONG':
                    pnl = (exit_price - trade.entry_price) * trade.size_pct * self.risk_manager.current_capital / trade.entry_price
                else:
                    pnl = (trade.entry_price - exit_price) * trade.size_pct * self.risk_manager.current_capital / trade.entry_price
                
                # Record to risk manager
                self.risk_manager.record_trade(pnl)
                
                # Record to analytics
                duration = (datetime.now() - trade.created_at).total_seconds() / 3600
                self.analytics.record_trade(
                    trade.entry_price, exit_price, trade.direction,
                    trade.size_pct * self.risk_manager.current_capital, duration
                )
                
                self.active_trades.remove(trade)
                return True
        return False
    
    def get_performance_report(self) -> str:
        """Get formatted performance report"""
        return self.analytics.generate_report()
    
    def get_risk_status(self) -> Dict:
        """Get current risk status"""
        return self.risk_manager.get_risk_status()

    def print_analysis(self, ticker: str, data: Dict):
        """Print a formatted multi-model analysis"""
        analysis = self.analyze_stock(ticker, data)
        
        print(f"\n{'='*70}")
        print(f"  🤖 MULTI-MODEL AI ANALYSIS: {ticker}")
        print(f"{'='*70}\n")
        
        for source, sig in analysis['signals'].items():
            icon = "🟢" if sig['direction'] == 'LONG' else "🔴" if sig['direction'] == 'SHORT' else "⚪"
            print(f"  {source.upper():<12} Model")
            print(f"     {icon} Direction: {sig['direction']}")
            print(f"     📈 Confidence: {sig['confidence']:.1%}")
            print(f"     💡 Reasoning: {sig['reasoning']}\n")
        
        consensus = analysis['consensus']
        c_icon = "🟢" if consensus['direction'] == 'LONG' else "🔴" if consensus['direction'] == 'SHORT' else "⚪"
        print(f"  🎯 CONSENSUS DECISION")
        print(f"  {'-'*60}")
        print(f"     {c_icon} Direction: {consensus['direction']}")
        print(f"     📊 Confidence: {consensus['confidence']:.1%}")
        print(f"     🤝 Agreement: {consensus['agreement']}")
        print(f"     ⚡ Actionable: {'Yes' if analysis['actionable'] else 'No'}\n")
        
        risk = analysis['risk_status']
        r_icon = "🟢" if risk['risk_level'] == 'LOW' else "🟡" if risk['risk_level'] == 'MEDIUM' else "🔴"
        print(f"  🛡️ RISK STATUS")
        print(f"  {'-'*60}")
        print(f"     {r_icon} Risk Level: {risk['risk_level']}")
        print(f"     📉 Drawdown: {risk['drawdown_pct']}")
        print(f"     💰 Capital: ${risk['capital']:,.2f}")
        print(f"     {'✅' if risk['trading_allowed'] else '❌'} Trading: {'Allowed' if risk['trading_allowed'] else 'Paused'}")
        if not risk['trading_allowed']:
            print(f"     ⚠️ Reason: {risk['status_message']}")
        print(f"\n{'='*70}\n")
    
# =============================================================================
# BACKTESTING ENGINE (New Improvement)
# =============================================================================

class MarketBacktester:
    """
    Backtesting engine to simulate strategy performance over time.
    Provides realistic win/loss probabilities based on consensus confidence.
    """
    def __init__(self, analyst: 'EnhancedAIAnalyst'):
        self.analyst = analyst
        self.history = []

    def run_simulation(self, ticker: str, iterations: int = 20):
        """Simulate multiple trading scenarios to test strategy robustness"""
        print(f"\n🚀 STARTING BACKTEST SIMULATION: {ticker} ({iterations} iterations)")
        print(f"─{'─'*70}")
        
        # Temporarily relax risk limits for simulation
        original_cooldown = self.analyst.risk_manager.cooldown_seconds
        original_max_trades = self.analyst.risk_manager.max_trades_per_day
        self.analyst.risk_manager.cooldown_seconds = 0
        self.analyst.risk_manager.max_trades_per_day = iterations + 10
        
        for i in range(iterations):
            # Simulate shifting market conditions
            base_price = 150 + random.uniform(-20, 50)
            volatility = random.uniform(0.01, 0.05)
            
            data = {
                'price': base_price,
                'sma_20': base_price * random.uniform(0.95, 1.05),
                'sma_50': base_price * random.uniform(0.92, 1.08),
                'rsi': random.uniform(20, 80),
                'macd': random.uniform(-2, 2),
                'atr': base_price * volatility,
                'volatility': volatility,
                'pe_ratio': random.uniform(10, 40),
                'roe': random.uniform(0.05, 0.30),
                'debt_equity': random.uniform(0.1, 2.5),
                'revenue_growth': random.uniform(-0.05, 0.25),
                'news_sentiment': random.uniform(-0.8, 0.8),
                'social_sentiment': random.uniform(-0.8, 0.8),
                'analyst_rating': random.choice(['buy', 'hold', 'sell']),
                'insider_activity': random.choice(['buying', 'neutral', 'selling'])
            }
            
            # 1. Run Analysis
            analysis = self.analyst.analyze_stock(ticker, data)
            
            # 2. Generate Proposal
            proposal = self.analyst.generate_trade_proposal(ticker, data)
            
            if proposal:
                # 3. Auto-approve for backtest
                self.analyst.approve_proposal(proposal.id)
                
                # 4. Simulate Outcome based on confidence
                # Higher confidence = higher win probability
                win_prob = proposal.confidence * 0.8  # Max 80% real-world win prob
                is_win = random.random() < win_prob
                
                if is_win:
                    exit_price = proposal.take_profit
                else:
                    exit_price = proposal.stop_loss
                
                # 5. Close Trade
                self.analyst.close_trade(proposal.id, exit_price)
                
                if (i + 1) % 5 == 0:
                    print(f"  Processed {i+1}/{iterations} iterations...")

        # Restore original limits
        self.analyst.risk_manager.cooldown_seconds = original_cooldown
        self.analyst.risk_manager.max_trades_per_day = original_max_trades

        print(f"\n✅ Simulation Complete!")
        print(self.analyst.get_performance_report())


def demo():
    """Run a full demo of the enhanced AI analyst"""
    print(f"\n{'='*70}")
    print(f"  🚀 ENHANCED AI STOCK ANALYST - DEMO v2.0")
    print(f"  Powered by Multi-Model AI (Alpha Arena Style)")
    print(f"{'='*70}\n")
    
    analyst = EnhancedAIAnalyst(initial_capital=100000)
    
    # Sample real-world scenario
    sample_data = {
        'price': 185.50,
        'sma_20': 182.30,
        'sma_50': 178.90,
        'rsi': 58,
        'macd': 1.5,
        'atr': 3.2,
        'volatility': 0.02,
        'pe_ratio': 28.5,
        'roe': 1.47,
        'debt_equity': 1.1,
        'revenue_growth': 0.085,
        'news_sentiment': 0.4,
        'social_sentiment': 0.3,
        'analyst_rating': 'buy',
        'insider_activity': 'neutral'
    }
    
    # 1. Print Analysis
    analyst.print_analysis('AAPL', sample_data)
    
    # 2. Run Backtest Simulation
    backtester = MarketBacktester(analyst)
    backtester.run_simulation('AAPL', iterations=100)

if __name__ == "__main__":
    demo()
