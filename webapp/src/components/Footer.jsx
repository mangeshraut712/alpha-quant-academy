import React from 'react';
import { TrendingUp } from 'lucide-react';
import { curriculumData, projectsData } from '../lib/constants';

const Footer = () => (
    <footer className="px-6 py-16 border-t border-border">
        <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-12">
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                            <TrendingUp className="text-white w-5 h-5" />
                        </div>
                        <span className="font-bold">Python Finance Academy</span>
                    </div>
                    <p className="text-sm text-foreground/60 dark:text-white/60">
                        Open-source Python training for finance professionals.
                    </p>
                </div>

                <div>
                    <div className="font-bold mb-4 text-sm">Curriculum</div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                        {curriculumData.tracks.slice(0, 4).map((t, i) => (
                            <div key={i}>{t.title}</div>
                        ))}
                    </div>
                </div>

                <div>
                    <div className="font-bold mb-4 text-sm">Projects</div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                        {projectsData.map((p, i) => (
                            <div key={i}>{p.title}</div>
                        ))}
                    </div>
                </div>

                <div>
                    <div className="font-bold mb-4 text-sm">Resources</div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                        <a href="#" className="block hover:text-foreground">Documentation</a>
                        <a href="#" className="block hover:text-foreground">GitHub</a>
                        <a href="#" className="block hover:text-foreground">Contributing</a>
                        <a href="#" className="block hover:text-foreground">License</a>
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-border">
                <div className="text-xs text-muted-foreground">
                    Based on <a href="https://github.com/jpmorganchase/python-training" className="underline">JPMorgan Chase Python Training</a>
                </div>
                <div className="text-xs text-muted-foreground">
                    Apache 2.0 License • Enhanced with Alpha Arena AI
                </div>
            </div>
        </div>
    </footer>
);

export default Footer;
