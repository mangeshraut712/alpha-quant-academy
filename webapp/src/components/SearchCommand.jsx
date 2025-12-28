import { memo, useState } from 'react';
import { motion } from 'framer-motion';
import {
    Search, BookOpen, Clock, PlayCircle, FileText,
    Filter, ChevronDown, ExternalLink, Sparkles
} from 'lucide-react';
import { curriculumData } from '../lib/constants';
import { cn } from '../lib/utils';

// Global Search & Quick Navigation
const SearchCommand = memo(function SearchCommand() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [filter, setFilter] = useState('all');

    // Flatten all searchable items
    const allItems = [
        ...curriculumData.tracks.flatMap(track =>
            track.modules.map(m => ({
                type: 'module',
                title: m.name,
                track: track.title,
                file: m.file,
                duration: m.duration,
                icon: BookOpen,
            }))
        ),
        { type: 'project', title: 'Stock Portfolio Tracker', level: 'Beginner', icon: FileText },
        { type: 'project', title: 'Financial Dashboard', level: 'Intermediate', icon: FileText },
        { type: 'project', title: 'AI Stock Analyst v2.0', level: 'Advanced', icon: Sparkles },
        { type: 'tool', title: 'Launch JupyterLab', action: 'binder', icon: PlayCircle },
        { type: 'tool', title: 'View on GitHub', action: 'github', icon: ExternalLink },
    ];

    const filteredItems = allItems.filter(item => {
        const matchesQuery = query === '' ||
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            (item.track && item.track.toLowerCase().includes(query.toLowerCase()));
        const matchesFilter = filter === 'all' || item.type === filter;
        return matchesQuery && matchesFilter;
    });

    // Keyboard shortcut: Cmd+K
    if (typeof window !== 'undefined') {
        window.addEventListener('keydown', (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen(true);
            }
        }, { once: true });
    }

    return (
        <>
            {/* Search Trigger Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 left-6 z-50 flex items-center gap-2 px-4 py-2.5 bg-card border border-border rounded-full shadow-lg hover:shadow-xl transition-all group"
            >
                <Search className="w-4 h-4 text-slate-500" />
                <span className="text-sm text-slate-600 dark:text-slate-400 hidden sm:inline">Quick Search</span>
                <kbd className="hidden sm:inline text-[10px] font-mono bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-500">⌘K</kbd>
            </button>

            {/* Search Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh]">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        className="relative w-full max-w-2xl mx-4 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
                    >
                        {/* Search Input */}
                        <div className="flex items-center gap-3 p-4 border-b border-slate-200 dark:border-slate-700">
                            <Search className="w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search modules, projects, tools..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="flex-1 bg-transparent text-lg outline-none text-slate-900 dark:text-white placeholder:text-slate-400"
                                autoFocus
                            />
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-xs font-mono bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-slate-500"
                            >
                                ESC
                            </button>
                        </div>

                        {/* Filters */}
                        <div className="flex gap-2 p-3 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                            {['all', 'module', 'project', 'tool'].map(f => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f)}
                                    className={cn(
                                        "px-3 py-1 rounded-full text-xs font-bold capitalize transition-all",
                                        filter === f
                                            ? "bg-blue-600 text-white"
                                            : "bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100"
                                    )}
                                >
                                    {f === 'all' ? 'All' : f + 's'}
                                </button>
                            ))}
                        </div>

                        {/* Results */}
                        <div className="max-h-[50vh] overflow-y-auto p-2">
                            {filteredItems.length === 0 ? (
                                <div className="text-center py-12 text-slate-500">
                                    <Search className="w-12 h-12 mx-auto mb-3 opacity-30" />
                                    <p>No results found for "{query}"</p>
                                </div>
                            ) : (
                                <div className="space-y-1">
                                    {filteredItems.slice(0, 10).map((item, i) => (
                                        <button
                                            key={i}
                                            onClick={() => {
                                                if (item.action === 'binder') {
                                                    window.open('http://mybinder.org/v2/gh/mangeshraut712/alpha-quant-academy/main?urlpath=lab', '_blank');
                                                } else if (item.action === 'github') {
                                                    window.open('https://github.com/mangeshraut712/alpha-quant-academy', '_blank');
                                                } else if (item.file) {
                                                    // Scroll to curriculum section
                                                    document.getElementById('curriculum')?.scrollIntoView({ behavior: 'smooth' });
                                                }
                                                setIsOpen(false);
                                            }}
                                            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left group"
                                        >
                                            <div className={cn(
                                                "w-10 h-10 rounded-lg flex items-center justify-center",
                                                item.type === 'module' ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600" :
                                                    item.type === 'project' ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600" :
                                                        "bg-violet-100 dark:bg-violet-900/30 text-violet-600"
                                            )}>
                                                <item.icon className="w-5 h-5" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="font-medium text-slate-900 dark:text-white truncate">{item.title}</div>
                                                <div className="text-xs text-slate-500 truncate">
                                                    {item.track || item.level || 'Quick Action'}
                                                    {item.duration && ` • ${item.duration}`}
                                                </div>
                                            </div>
                                            <ChevronDown className="w-4 h-4 text-slate-400 -rotate-90 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="p-3 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between text-xs text-slate-500">
                            <div className="flex items-center gap-4">
                                <span>↑↓ Navigate</span>
                                <span>↵ Select</span>
                            </div>
                            <span>⌘K to open anytime</span>
                        </div>
                    </motion.div>
                </div>
            )}
        </>
    );
});

export default SearchCommand;
