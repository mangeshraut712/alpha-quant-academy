import { memo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Trophy, Flame, Target, Star, Zap, TrendingUp,
    Award, Calendar, CheckCircle2, Lock, Crown
} from 'lucide-react';
import { useCurriculumStore } from '../lib/store';
import { curriculumData } from '../lib/constants';
import { cn } from '../lib/utils';

// Gamification: XP, Streaks, Achievements, Leaderboard
const GamificationPanel = memo(function GamificationPanel() {
    const [activeTab, setActiveTab] = useState('progress');
    const { completedModules } = useCurriculumStore();

    // Calculate XP (100 XP per module)
    const totalXP = completedModules.length * 100;
    const level = Math.floor(totalXP / 500) + 1;
    const xpToNextLevel = 500 - (totalXP % 500);
    const progressPercent = ((totalXP % 500) / 500) * 100;

    // Calculate streak (mock for demo)
    const currentStreak = 3;
    const longestStreak = 7;

    // Achievements
    const achievements = [
        { id: 'first_module', name: 'First Steps', desc: 'Complete your first module', icon: Star, unlocked: completedModules.length >= 1, xp: 50 },
        { id: 'track_complete', name: 'Track Master', desc: 'Complete an entire track', icon: Trophy, unlocked: false, xp: 500 },
        { id: 'week_streak', name: 'Week Warrior', desc: '7-day learning streak', icon: Flame, unlocked: longestStreak >= 7, xp: 200 },
        { id: 'half_curriculum', name: 'Halfway There', desc: 'Complete 50% of curriculum', icon: Target, unlocked: completedModules.length >= 13, xp: 1000 },
        { id: 'all_projects', name: 'Project Pro', desc: 'Complete all 3 projects', icon: Award, unlocked: false, xp: 750 },
        { id: 'speed_learner', name: 'Speed Learner', desc: 'Complete 5 modules in 1 day', icon: Zap, unlocked: false, xp: 300 },
    ];

    const unlockedAchievements = achievements.filter(a => a.unlocked);

    return (
        <section className="px-6 py-24 max-w-6xl mx-auto">
            <div className="mb-12">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-600">Your Journey</span>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mt-2 text-slate-900 dark:text-white">
                    Learning Dashboard
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mt-2">
                    Track your progress, maintain streaks, and unlock achievements
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-gradient-to-br from-amber-500 to-orange-500 p-6 rounded-2xl text-white">
                    <Crown className="w-8 h-8 mb-2 opacity-80" />
                    <div className="text-3xl font-bold">Level {level}</div>
                    <div className="text-sm opacity-80">{xpToNextLevel} XP to next</div>
                </div>

                <div className="bg-gradient-to-br from-violet-500 to-purple-600 p-6 rounded-2xl text-white">
                    <Zap className="w-8 h-8 mb-2 opacity-80" />
                    <div className="text-3xl font-bold">{totalXP}</div>
                    <div className="text-sm opacity-80">Total XP</div>
                </div>

                <div className="bg-gradient-to-br from-rose-500 to-pink-600 p-6 rounded-2xl text-white">
                    <Flame className="w-8 h-8 mb-2 opacity-80" />
                    <div className="text-3xl font-bold">{currentStreak} Days</div>
                    <div className="text-sm opacity-80">Current Streak</div>
                </div>

                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-6 rounded-2xl text-white">
                    <Trophy className="w-8 h-8 mb-2 opacity-80" />
                    <div className="text-3xl font-bold">{unlockedAchievements.length}/{achievements.length}</div>
                    <div className="text-sm opacity-80">Achievements</div>
                </div>
            </div>

            {/* XP Progress Bar */}
            <div className="bg-card border border-border rounded-2xl p-6 mb-8">
                <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-slate-900 dark:text-white">Level {level} Progress</span>
                    <span className="text-sm text-slate-500">{totalXP % 500}/500 XP</span>
                </div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-amber-500 to-orange-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercent}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    />
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6">
                {['progress', 'achievements', 'leaderboard'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={cn(
                            "px-4 py-2 rounded-full text-sm font-bold capitalize transition-all",
                            activeTab === tab
                                ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900"
                                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200"
                        )}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
                {activeTab === 'achievements' && (
                    <motion.div
                        key="achievements"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
                    >
                        {achievements.map((achievement) => (
                            <div
                                key={achievement.id}
                                className={cn(
                                    "p-5 rounded-2xl border flex items-start gap-4 transition-all",
                                    achievement.unlocked
                                        ? "bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800"
                                        : "bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 opacity-60"
                                )}
                            >
                                <div className={cn(
                                    "w-12 h-12 rounded-xl flex items-center justify-center",
                                    achievement.unlocked
                                        ? "bg-gradient-to-br from-amber-500 to-orange-500 text-white"
                                        : "bg-slate-200 dark:bg-slate-700 text-slate-400"
                                )}>
                                    {achievement.unlocked ? (
                                        <achievement.icon className="w-6 h-6" />
                                    ) : (
                                        <Lock className="w-5 h-5" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <div className="font-bold text-slate-900 dark:text-white">{achievement.name}</div>
                                    <div className="text-xs text-slate-500 dark:text-slate-400 mb-2">{achievement.desc}</div>
                                    <div className="text-xs font-bold text-amber-600">+{achievement.xp} XP</div>
                                </div>
                                {achievement.unlocked && (
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                )}
                            </div>
                        ))}
                    </motion.div>
                )}

                {activeTab === 'progress' && (
                    <motion.div
                        key="progress"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="bg-card border border-border rounded-2xl p-6"
                    >
                        <h3 className="font-bold text-lg mb-4 text-slate-900 dark:text-white">Track Progress</h3>
                        <div className="space-y-4">
                            {curriculumData.tracks.map((track) => {
                                const trackModulesCompleted = track.modules.filter(m =>
                                    useCurriculumStore.getState().completedModules.includes(`${track.id}-${m.name}`)
                                ).length;
                                const percent = (trackModulesCompleted / track.modules.length) * 100;

                                return (
                                    <div key={track.id}>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="font-medium text-slate-700 dark:text-slate-300">{track.title}</span>
                                            <span className="text-slate-500">{trackModulesCompleted}/{track.modules.length}</span>
                                        </div>
                                        <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                            <div
                                                className={cn("h-full transition-all", track.color)}
                                                style={{ width: `${percent}%` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                )}

                {activeTab === 'leaderboard' && (
                    <motion.div
                        key="leaderboard"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="bg-card border border-border rounded-2xl p-6"
                    >
                        <h3 className="font-bold text-lg mb-4 text-slate-900 dark:text-white">Weekly Leaderboard</h3>
                        <div className="space-y-3">
                            {[
                                { rank: 1, name: "Alex Chen", xp: 2450, avatar: "👨‍💻" },
                                { rank: 2, name: "Sarah Kim", xp: 2100, avatar: "👩‍💼" },
                                { rank: 3, name: "You", xp: totalXP, avatar: "🎯", isUser: true },
                                { rank: 4, name: "Mike Johnson", xp: 1800, avatar: "👨‍🎓" },
                                { rank: 5, name: "Emma Wilson", xp: 1650, avatar: "👩‍🔬" },
                            ].sort((a, b) => b.xp - a.xp).map((user, i) => (
                                <div
                                    key={i}
                                    className={cn(
                                        "flex items-center gap-4 p-3 rounded-xl",
                                        user.isUser ? "bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800" : ""
                                    )}
                                >
                                    <span className={cn(
                                        "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm",
                                        i === 0 ? "bg-amber-500 text-white" :
                                            i === 1 ? "bg-slate-400 text-white" :
                                                i === 2 ? "bg-amber-700 text-white" :
                                                    "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400"
                                    )}>
                                        {i + 1}
                                    </span>
                                    <span className="text-2xl">{user.avatar}</span>
                                    <span className={cn(
                                        "flex-1 font-medium",
                                        user.isUser ? "text-blue-600 dark:text-blue-400" : "text-slate-700 dark:text-slate-300"
                                    )}>
                                        {user.name}
                                    </span>
                                    <span className="font-bold text-slate-900 dark:text-white">{user.xp.toLocaleString()} XP</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
});

export default GamificationPanel;
