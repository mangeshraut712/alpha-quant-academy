import { memo } from 'react';
import { Github, ExternalLink, Heart, Mail, Twitter } from 'lucide-react';

const Footer = memo(function Footer() {
    const currentYear = new Date().getFullYear();

    const links = {
        resources: [
            { name: 'Curriculum', href: '#curriculum' },
            { name: 'Projects', href: '#projects' },
            { name: 'Datasets', href: '#data' },
            { name: 'AI Analyst', href: '#analyst' },
        ],
        external: [
            { name: 'GitHub', href: 'https://github.com/mangeshraut712/alpha-quant-academy', icon: Github },
            { name: 'Binder', href: 'http://mybinder.org/v2/gh/mangeshraut712/alpha-quant-academy/main?urlpath=lab', icon: ExternalLink },
        ]
    };

    return (
        <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
            <div className="max-w-6xl mx-auto px-6 py-16">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                    {/* Brand */}
                    <div className="col-span-2">
                        <div className="flex items-center gap-3 mb-4">
                            <img
                                src="/assets/logo.png"
                                alt="Alpha Quant Academy"
                                className="h-10 w-auto"
                                onError={(e) => e.target.style.display = 'none'}
                            />
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 max-w-xs">
                            Free, open-source quantitative finance education. From Python basics to ML-powered trading strategies.
                        </p>
                        <div className="flex items-center gap-3">
                            <a
                                href="https://github.com/mangeshraut712/alpha-quant-academy"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
                            >
                                <Github className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
                            >
                                <Twitter className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                            </a>
                        </div>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-4">Resources</h4>
                        <ul className="space-y-3">
                            {links.resources.map((link, i) => (
                                <li key={i}>
                                    <a
                                        href={link.href}
                                        className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* External */}
                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-4">Links</h4>
                        <ul className="space-y-3">
                            {links.external.map((link, i) => (
                                <li key={i}>
                                    <a
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-2"
                                    >
                                        <link.icon className="w-4 h-4" />
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-slate-500 dark:text-slate-500 flex items-center gap-1">
                        © {currentYear} Alpha Quant Academy. Made with <Heart className="w-4 h-4 text-rose-500 fill-rose-500" /> for learners.
                    </p>
                    <p className="text-xs text-slate-400">
                        Open source • Free forever
                    </p>
                </div>
            </div>
        </footer>
    );
});

export default Footer;
