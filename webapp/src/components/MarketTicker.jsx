import { memo, useState, useEffect } from 'react';
import {
    TrendingUp, TrendingDown, Activity,
    RefreshCw, Wifi, WifiOff
} from 'lucide-react';
import { cn } from '../lib/utils';

// Compact Market Ticker
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
        }, 3000);

        return () => clearInterval(interval);
    }, [isLive]);

    return (
        <section className="py-8 bg-slate-900 dark:bg-slate-950 text-white">
            <div className="max-w-6xl mx-auto px-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <Activity className="w-4 h-4 text-emerald-400" />
                        <span className="font-semibold text-sm">Market Overview</span>
                        <span className={cn(
                            "flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-bold",
                            isLive ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-700 text-slate-400"
                        )}>
                            {isLive ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
                            {isLive ? 'LIVE' : 'PAUSED'}
                        </span>
                    </div>
                    <button
                        onClick={() => setIsLive(!isLive)}
                        className="p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
                        aria-label={isLive ? 'Pause updates' : 'Resume updates'}
                    >
                        <RefreshCw className={cn("w-4 h-4 text-slate-400", isLive && "animate-spin")} style={{ animationDuration: '3s' }} />
                    </button>
                </div>

                {/* Ticker Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
                    {marketData.map((stock, i) => (
                        <div
                            key={i}
                            className="p-3 bg-slate-800/50 rounded-xl border border-slate-700/50 hover:border-slate-600/50 transition-colors"
                        >
                            <div className="flex items-center justify-between mb-1">
                                <span className="font-bold text-xs">{stock.symbol}</span>
                                <span className={cn(
                                    "text-[10px] font-bold flex items-center gap-0.5",
                                    stock.change >= 0 ? "text-emerald-400" : "text-rose-400"
                                )}>
                                    {stock.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                    {stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(1)}%
                                </span>
                            </div>
                            <div className="font-mono text-sm text-slate-300">
                                ${stock.price < 1000 ? stock.price.toFixed(2) : stock.price.toLocaleString()}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Educational Note */}
                <p className="text-center text-[10px] text-slate-500 mt-4">
                    📊 Simulated data for educational purposes • Learn real data fetching in Track 4
                </p>
            </div>
        </section>
    );
});

export default MarketTicker;
