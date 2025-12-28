import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Menu, X, Github } from 'lucide-react';
import { cn } from '../lib/utils';

const Navigation = ({ activeSection, setActiveSection, onReset }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { id: 'home', label: 'Home' },
        { id: 'curriculum', label: 'Curriculum' },
        { id: 'projects', label: 'Projects' },
        { id: 'data', label: 'Data' },
        { id: 'analyst', label: 'AI Analyst' },
    ];

    return (
        <nav className={cn(
            "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 h-16 flex items-center justify-between",
            isScrolled ? "glass shadow-sm saturate-[1.8]" : "bg-white/0 dark:bg-black/0"
        )} style={isScrolled ? { WebkitBackdropFilter: 'saturate(180%) blur(20px)' } : {}}>
            <div className="flex items-center gap-2 text-foreground">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                    <TrendingUp className="text-white w-5 h-5" />
                </div>
                <span className="font-bold tracking-tight text-lg">PFA</span>
            </div>

            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
                {navItems.map(item => (
                    <button
                        key={item.id}
                        onClick={() => {
                            setActiveSection(item.id);
                            document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className={cn(
                            "hover:text-foreground transition-colors",
                            activeSection === item.id && "text-foreground"
                        )}
                    >
                        {item.label}
                    </button>
                ))}
            </div>

            <div className="flex items-center gap-3">
                <button
                    onClick={onReset}
                    className="hidden md:flex text-[10px] uppercase font-bold tracking-widest text-muted-foreground hover:text-foreground transition-colors border border-border px-3 py-1.5 rounded-lg"
                >
                    Fresh Start
                </button>
                <a
                    href="https://github.com/jpmorganchase/python-training"
                    target="_blank"
                    className="hidden md:flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full border border-border hover:bg-secondary transition-all"
                >
                    <Github className="w-4 h-4" /> GitHub
                </a>
                <button
                    className="md:hidden p-2"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-16 left-0 right-0 bg-background border-b border-border p-4 md:hidden"
                    >
                        {navItems.map(item => (
                            <button
                                key={item.id}
                                onClick={() => {
                                    setActiveSection(item.id);
                                    setMobileMenuOpen(false);
                                    document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="block w-full text-left py-3 px-4 hover:bg-secondary rounded-lg font-medium"
                            >
                                {item.label}
                            </button>
                        ))}
                        <button
                            onClick={() => { onReset(); setMobileMenuOpen(false); }}
                            className="w-full text-left py-3 px-4 text-xs font-bold uppercase tracking-widest text-red-500 border-t border-border mt-2"
                        >
                            Reset Progress (Fresh Start)
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navigation;
