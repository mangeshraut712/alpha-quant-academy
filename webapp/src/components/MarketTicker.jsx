import { memo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    TrendingUp, TrendingDown, Activity, DollarSign,
    RefreshCw, Clock, Wifi, WifiOff
} from 'lucide-react';
import { cn } from '../lib/utils';

// Simulated real-time market data widget
const MarketTicker = memo(function MarketTicker() {
    const [marketData, setMarketData] = useState([
        { symbol: 'SPY', name: 'S&P 500', price: 478.52, change: 1.24, changePercent: 0.26 },
        { symbol: 'QQQ', name: 'Nasdaq', price: 412.87, change: -2.15, changePercent: -0.52 },
        { symbol: 'AAPL', name: 'Apple', price: 193.42, change: 3.21, changePercent: 1.69 },
        { symbol: 'GOOGL', name: 'Alphabet', price: 141.15, change: 0.87, changePercent: 0.62 },
        { symbol: 'MSFT', name: 'Microsoft', price: 376.04, change: -1.23, changePercent: -0.33 },
        { symbol: 'NVDA', name: 'NVIDIA', price: 495.22, change: 12.45, changePercent: 2.58 },
        { symbol: 'BTC', name: 'Bitcoin', price: 43250.00, change: 850.00, changePercent: 2.01 },
        { symbol: 'ETH', name: 'Ethereum', price: 2285.50, change: -45.20, changePercent: -1.94 },
    ]);

    const [isLive, setIsLive] = useState(true);
    const [lastUpdate, setLastUpdate] = useState(new Date());

    // Simulate real-time updates
    useEffect(() => {
        if (!isLive) return;

        const interval = setInterval(() => {
            setMarketData(prev => prev.map(stock => {
                const randomChange = (Math.random() - 0.5) * 2;
                const newPrice = stock.price + randomChange;
                const newChange = stock.change + randomChange;
                const newPercent = (newChange / (newPrice - newChange)) * 100;

                return {
                    ...stock,
                    price: Math.round(newPrice * 100) / 100,
                    change: Math.round(newChange * 100) / 100,
                    changePercent: Math.round(newPercent * 100) / 100,
                };
            }));
            setLastUpdate(new Date());
        }, 3000);

        return () => clearInterval(interval);
    }, [isLive]);

    return (
        <section className="py-6 bg-slate-900 dark:bg-slate-950 text-white overflow-hidden">
            <div className="max-w-6xl mx-auto px-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <Activity className="w-5 h-5 text-emerald-400" />
                        <span className="font-bold text-sm">Live Market Data</span>
                        <span className={cn(
                            "flex items-center gap-1.5 text-xs px-2 py-0.5 rounded-full",
                            isLive ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-700 text-slate-400"
                        )}>
                            {isLive ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
                            {isLive ? 'Live' : 'Paused'}
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-xs text-slate-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {lastUpdate.toLocaleTimeString()}
                        </span>
                        <button
                            onClick={() => setIsLive(!isLive)}
                            className="p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
                        >
                            <RefreshCw className={cn("w-4 h-4", isLive && "animate-spin")} style={{ animationDuration: '3s' }} />
                        </button>
                    </div>
                </div>

                {/* Ticker Tape */}
                <div className="relative">
                    <div className="flex gap-6 animate-scroll">
                        {[...marketData, ...marketData].map((stock, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-3 px-4 py-2 bg-slate-800/50 rounded-xl border border-slate-700/50 min-w-max"
                            >
                                <div>
                                    <div className="font-bold text-sm">{stock.symbol}</div>
                                    <div className="text-[10px] text-slate-500">{stock.name}</div>
                                </div>
                                <div className="text-right">
                                    <div className="font-mono font-bold">
                                        {stock.symbol === 'BTC' || stock.symbol === 'ETH' ? '$' : ''}
                                        {stock.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </div>
                                    <div className={cn(
                                        "text-xs font-bold flex items-center justify-end gap-1",
                                        stock.change >= 0 ? "text-emerald-400" : "text-rose-400"
                                    )}>
                                        {stock.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                        {stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Educational Note */}
                <p className="text-center text-xs text-slate-500 mt-4">
                    💡 This is simulated data for educational purposes. Learn to fetch real market data in Track 4: Financial Analysis.
                </p>
            </div>

            <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
        </section>
    );
});

export default MarketTicker;
