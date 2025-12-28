import { useState, useEffect, memo } from 'react';
import { Menu, X, Github, Sparkles, RotateCcw } from 'lucide-react';
import { cn } from '../lib/utils';

const Navigation = memo(function Navigation({ activeSection, setActiveSection, onReset }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { id: 'home', label: 'Home' },
        { id: 'curriculum', label: 'Curriculum' },
        { id: 'projects', label: 'Projects' },
        { id: 'data', label: 'Data' },
        { id: 'analyst', label: 'AI Analyst' },
    ];

    const handleNavClick = (id) => {
        setActiveSection(id);
        setMobileMenuOpen(false);
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <nav className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled
                    ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-lg shadow-slate-900/5 dark:shadow-black/20 border-b border-slate-200/50 dark:border-slate-700/50"
                    : "bg-transparent"
            )}>
                <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                    {/* Logo */}
                    <a href="#home" onClick={() => handleNavClick('home')} className="flex items-center gap-3 group">
                        <div className="relative w-10 h-10">
                            <img
                                src="/assets/logo.png"
                                alt="Alpha Quant Academy"
                                className="w-10 h-10 rounded-xl shadow-lg group-hover:scale-105 transition-transform object-cover"
                                loading="eager"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'flex';
                                }}
                            />
                            <div
                                className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 items-center justify-center text-white font-bold text-lg hidden"
                            >
                                α
                            </div>
                            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900" />
                        </div>
                        <div className="hidden sm:block">
                            <div className="font-bold text-lg tracking-tight text-slate-900 dark:text-white">
                                Alpha Quant
                            </div>
                            <div className="text-[10px] font-medium text-slate-500 dark:text-slate-400 -mt-0.5 tracking-wide">
                                ACADEMY
                            </div>
                        </div>
                    </a>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-1 bg-slate-100/80 dark:bg-slate-800/80 rounded-full px-1.5 py-1.5">
                        {navItems.map(item => (
                            <button
                                key={item.id}
                                onClick={() => handleNavClick(item.id)}
                                className={cn(
                                    "px-4 py-2 rounded-full text-sm font-medium transition-all",
                                    activeSection === item.id
                                        ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                                )}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={onReset}
                            className="hidden lg:flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                            title="Reset Progress"
                        >
                            <RotateCcw className="w-3.5 h-3.5" />
                            Reset
                        </button>

                        <a
                            href="https://github.com/mangeshraut712/alpha-quant-academy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden sm:flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90 transition-opacity"
                        >
                            <Github className="w-4 h-4" />
                            <span className="hidden lg:inline">GitHub</span>
                        </a>

                        <button
                            className="md:hidden p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-40 md:hidden">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => setMobileMenuOpen(false)}
                    />

                    {/* Menu Panel */}
                    <div className="absolute top-16 left-0 right-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 shadow-xl p-4 animate-slide-down">
                        <div className="space-y-1">
                            {navItems.map(item => (
                                <button
                                    key={item.id}
                                    onClick={() => handleNavClick(item.id)}
                                    className={cn(
                                        "block w-full text-left py-3 px-4 rounded-xl font-medium transition-colors",
                                        activeSection === item.id
                                            ? "bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400"
                                            : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                                    )}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>

                        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 flex gap-2">
                            <a
                                href="https://github.com/mangeshraut712/alpha-quant-academy"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold"
                            >
                                <Github className="w-4 h-4" />
                                GitHub
                            </a>
                            <button
                                onClick={() => { onReset(); setMobileMenuOpen(false); }}
                                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 font-semibold"
                            >
                                <RotateCcw className="w-4 h-4" />
                                Reset
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
});

export default Navigation;
