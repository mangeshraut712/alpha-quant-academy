import { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, RotateCcw } from 'lucide-react';
import { cn } from '../lib/utils';

// Apple-style spring
const spring = {
    type: "spring",
    stiffness: 400,
    damping: 30
};

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
            <motion.nav
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
                    isScrolled
                        ? "glass shadow-lg"
                        : "bg-transparent"
                )}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={spring}
            >
                <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                    {/* Logo */}
                    <motion.a
                        href="#home"
                        onClick={() => handleNavClick('home')}
                        className="flex items-center"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={spring}
                    >
                        <img
                            src="/assets/logo.png"
                            alt="Alpha Quant Academy"
                            className="h-10 w-auto max-w-[180px] object-contain"
                            loading="eager"
                            onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                            }}
                        />
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 items-center justify-center text-white font-bold text-lg hidden">
                            α
                        </div>
                    </motion.a>

                    {/* Desktop Nav - Pill Style */}
                    <div className="hidden md:flex items-center p-1.5 rounded-full bg-slate-100/80 dark:bg-slate-800/80 backdrop-blur-sm">
                        {navItems.map((item) => (
                            <motion.button
                                key={item.id}
                                onClick={() => handleNavClick(item.id)}
                                className={cn(
                                    "relative px-4 py-2 rounded-full text-sm font-medium transition-colors",
                                    activeSection === item.id
                                        ? "text-slate-900 dark:text-white"
                                        : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                                )}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={spring}
                            >
                                {activeSection === item.id && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-white dark:bg-slate-700 rounded-full shadow-sm"
                                        transition={spring}
                                    />
                                )}
                                <span className="relative z-10">{item.label}</span>
                            </motion.button>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        <motion.button
                            onClick={onReset}
                            className="hidden lg:flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={spring}
                        >
                            <RotateCcw className="w-3.5 h-3.5" />
                            Reset
                        </motion.button>

                        <motion.a
                            href="https://github.com/mangeshraut712/alpha-quant-academy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden sm:flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={spring}
                        >
                            <Github className="w-4 h-4" />
                            <span className="hidden lg:inline">GitHub</span>
                        </motion.a>

                        <motion.button
                            className="md:hidden p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            transition={spring}
                        >
                            <AnimatePresence mode="wait">
                                {mobileMenuOpen ? (
                                    <motion.div
                                        key="close"
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <X className="w-5 h-5" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="menu"
                                        initial={{ rotate: 90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: -90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Menu className="w-5 h-5" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        <motion.div
                            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileMenuOpen(false)}
                        />

                        <motion.div
                            className="fixed top-16 left-0 right-0 z-40 md:hidden glass border-b border-slate-200 dark:border-slate-700 p-4"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={spring}
                        >
                            <div className="space-y-1">
                                {navItems.map((item, i) => (
                                    <motion.button
                                        key={item.id}
                                        onClick={() => handleNavClick(item.id)}
                                        className={cn(
                                            "block w-full text-left py-3.5 px-4 rounded-xl font-medium transition-colors",
                                            activeSection === item.id
                                                ? "bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400"
                                                : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                                        )}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                    >
                                        {item.label}
                                    </motion.button>
                                ))}
                            </div>

                            <motion.div
                                className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 flex gap-2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
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
                                </button>
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
});

export default Navigation;
