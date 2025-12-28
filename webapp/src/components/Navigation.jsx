import { useState, useEffect, memo } from 'react';
import { TrendingUp, Menu, X, Github } from 'lucide-react';
import { cn } from '../lib/utils';

const Navigation = memo(function Navigation({ activeSection, setActiveSection, onReset }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
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
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 h-16 flex items-center justify-between",
                isScrolled
                    ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-sm border-b border-slate-200/50 dark:border-slate-700/50"
                    : "bg-transparent"
            )}>
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                        <TrendingUp className="text-white w-5 h-5" />
                    </div>
                    <span className="font-bold tracking-tight text-lg text-slate-900 dark:text-white">PFA</span>
                </div>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8 text-sm font-medium">
                    {navItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => handleNavClick(item.id)}
                            className={cn(
                                "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors",
                                activeSection === item.id && "text-slate-900 dark:text-white"
                            )}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={onReset}
                        className="hidden md:flex text-[10px] uppercase font-bold tracking-widest text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-lg"
                    >
                        Fresh Start
                    </button>
                    <a
                        href="https://github.com/mangeshraut712/alpha-quant-academy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden md:flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                        <Github className="w-4 h-4" /> GitHub
                    </a>
                    <button
                        className="md:hidden p-2 text-slate-700 dark:text-slate-300"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu - CSS animation instead of Framer Motion */}
            {mobileMenuOpen && (
                <div className="fixed top-16 left-0 right-0 z-40 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 p-4 md:hidden animate-slide-down">
                    {navItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => handleNavClick(item.id)}
                            className="block w-full text-left py-3 px-4 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg font-medium text-slate-700 dark:text-slate-300"
                        >
                            {item.label}
                        </button>
                    ))}
                    <button
                        onClick={() => { onReset(); setMobileMenuOpen(false); }}
                        className="w-full text-left py-3 px-4 text-xs font-bold uppercase tracking-widest text-red-500 border-t border-slate-200 dark:border-slate-700 mt-2"
                    >
                        Reset Progress
                    </button>
                </div>
            )}
        </>
    );
});

export default Navigation;
