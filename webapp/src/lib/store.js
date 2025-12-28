import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

// Curriculum Progress Store (Zustand for 2025)
export const useCurriculumStore = create(
    persist(
        (set, get) => ({
            completedModules: [],

            toggleModule: (trackId, moduleName) => {
                const moduleKey = `${trackId}-${moduleName}`
                const { completedModules } = get()

                if (completedModules.includes(moduleKey)) {
                    set({ completedModules: completedModules.filter(m => m !== moduleKey) })
                } else {
                    set({ completedModules: [...completedModules, moduleKey] })
                }
            },

            isModuleComplete: (trackId, moduleName) => {
                const moduleKey = `${trackId}-${moduleName}`
                return get().completedModules.includes(moduleKey)
            },

            getProgress: (tracks) => {
                const { completedModules } = get()
                const totalModules = tracks.flatMap(t => t.modules).length
                return {
                    completed: completedModules.length,
                    total: totalModules,
                    percentage: totalModules > 0 ? (completedModules.length / totalModules) * 100 : 0
                }
            },

            getTrackProgress: (track) => {
                const { completedModules } = get()
                const trackModules = track.modules.map(m => `${track.id}-${m.name}`)
                const completed = trackModules.filter(m => completedModules.includes(m)).length
                return {
                    completed,
                    total: track.modules.length,
                    percentage: track.modules.length > 0 ? (completed / track.modules.length) * 100 : 0
                }
            },

            resetProgress: () => set({ completedModules: [] }),
        }),
        {
            name: 'aqa-curriculum-progress',
            storage: createJSONStorage(() => localStorage),
        }
    )
)

// Simulation Store
export const useSimulationStore = create((set) => ({
    isSimulating: false,
    progress: 0,
    results: null,

    startSimulation: () => {
        set({ isSimulating: true, progress: 0, results: null })

        const interval = setInterval(() => {
            set((state) => {
                if (state.progress >= 100) {
                    clearInterval(interval)
                    return {
                        isSimulating: false,
                        progress: 100,
                        results: {
                            totalPnL: 33155.44,
                            sharpe: 7.922,
                            winRate: 62.4,
                            maxDrawdown: 4.2
                        }
                    }
                }
                return { progress: state.progress + 5 }
            })
        }, 100)
    },

    resetSimulation: () => set({ isSimulating: false, progress: 0, results: null })
}))

// UI State Store
export const useUIStore = create((set) => ({
    activeSection: 'home',
    mobileMenuOpen: false,

    setActiveSection: (section) => set({ activeSection: section }),
    toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),
    closeMobileMenu: () => set({ mobileMenuOpen: false }),
}))
