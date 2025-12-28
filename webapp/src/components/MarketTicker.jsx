import { memo, useState, useEffect } from 'react';
import {
    TrendingUp, TrendingDown, Activity,
    RefreshCw, Wifi, WifiOff
} from 'lucide-react';
import { cn } from '../lib/utils';

// World's Top 10 Companies by Market Cap (December 2024/2025)
const MarketTicker = memo(function MarketTicker() {
    const [marketData, setMarketData] = useState([
        // Top 10 Global Companies by Market Cap (Current as of Dec 2024)
        { symbol: 'NVDA', name: 'NVIDIA Corp', price: 134.25, change: 3.45, changePercent: 2.64, marketCap: '$3.3T' },
        { symbol: 'AAPL', name: 'Apple Inc.', price: 254.50, change: 1.85, changePercent: 0.73, marketCap: '$3.9T' },
        { symbol: 'MSFT', name: 'Microsoft', price: 438.15, change: -2.10, changePercent: -0.48, marketCap: '$3.3T' },
        { symbol: 'GOOGL', name: 'Alphabet', price: 192.45, change: 4.21, changePercent: 2.24, marketCap: '$2.4T' },
        { symbol: 'AMZN', name: 'Amazon', price: 224.80, change: 2.35, changePercent: 1.06, marketCap: '$2.4T' },
        { symbol: 'META', name: 'Meta Platforms', price: 612.50, change: 8.75, changePercent: 1.45, marketCap: '$1.6T' },
        { symbol: 'TSLA', name: 'Tesla Inc.', price: 462.25, change: -5.80, changePercent: -1.24, marketCap: '$1.5T' },
        { symbol: 'AVGO', name: 'Broadcom', price: 235.60, change: 4.15, changePercent: 1.79, marketCap: '$1.1T' },
        { symbol: 'TSM', name: 'TSMC', price: 203.40, change: 3.20, changePercent: 1.60, marketCap: '$1.0T' },
        { symbol: 'BRK.B', name: 'Berkshire Hath.', price: 468.75, change: 1.50, changePercent: 0.32, marketCap: '$1.0T' },
    ]);

    const [isLive, setIsLive] = useState(true);

    // Simulate real-time updates
    useEffect(() => {
        if (!isLive) return;

        const interval = setInterval(() => {
            setMarketData(prev => prev.map(stock => {
                const volatility = stock.symbol === 'NVDA' || stock.symbol === 'TSLA' ? 0.005 : 0.002;
                const randomChange = (Math.random() - 0.5) * stock.price * volatility;
                const newPrice = stock.price + randomChange;
                const newChange = stock.change + randomChange * 0.3;
                const newPercent = (newChange / (newPrice - newChange)) * 100;

                return {
                    ...stock,
                    price: Math.round(newPrice * 100) / 100,
                    change: Math.round(newChange * 100) / 100,
                    changePercent: Math.round(newPercent * 100) / 100,
                };
            }));
        }, 2500);

        return () => clearInterval(interval);
    }, [isLive]);

    return (
        <section className="py-10 bg-slate-900 dark:bg-slate-950 text-white">
            <div className="max-w-6xl mx-auto px-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <Activity className="w-5 h-5 text-emerald-400" />
                        <div>
                            <span className="font-bold text-base">Global Top 10</span>
                            <span className="text-xs text-slate-500 ml-2">by Market Cap • Dec 2024</span>
                        </div>
                        <span className={cn(
                            "flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-bold ml-2",
                            isLive ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-700 text-slate-400"
                        )}>
                            {isLive ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
                            {isLive ? 'LIVE' : 'PAUSED'}
                        </span>
                    </div>
                    <button
                        onClick={() => setIsLive(!isLive)}
                        className="p-2 rounded-lg hover:bg-slate-800 transition-colors"
                        aria-label={isLive ? 'Pause updates' : 'Resume updates'}
                    >
                        <RefreshCw className={cn("w-4 h-4 text-slate-400", isLive && "animate-spin")} style={{ animationDuration: '3s' }} />
                    </button>
                </div>

                {/* Ticker Grid - 2 rows of 5 */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                    {marketData.map((stock, i) => (
                        <div
                            key={i}
                            className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/50 hover:border-slate-600/50 hover:bg-slate-800 transition-all group"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-slate-500 bg-slate-700/50 px-1.5 py-0.5 rounded font-mono">#{i + 1}</span>
                                    <span className="font-bold text-sm">{stock.symbol}</span>
                                </div>
                                <span className={cn(
                                    "text-[10px] font-bold flex items-center gap-0.5 px-1.5 py-0.5 rounded",
                                    stock.change >= 0
                                        ? "text-emerald-400 bg-emerald-500/10"
                                        : "text-rose-400 bg-rose-500/10"
                                )}>
                                    {stock.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                    {stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                                </span>
                            </div>
                            <div className="text-xs text-slate-500 mb-1 truncate">{stock.name}</div>
                            <div className="flex items-end justify-between">
                                <div className="font-mono text-lg font-bold text-white">
                                    ${stock.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </div>
                                <div className="text-[10px] text-slate-500 font-medium">{stock.marketCap}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer Note */}
                <div className="flex items-center justify-center gap-2 mt-6 text-xs text-slate-500">
                    <span>📊</span>
                    <span>Simulated prices for educational purposes</span>
                    <span>•</span>
                    <span>Learn real API integration in Track 4</span>
                </div>
            </div>
        </section>
    );
});

export default MarketTicker;
