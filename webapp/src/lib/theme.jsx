import { createContext, useContext, useEffect, useState, useCallback } from 'react'

const ThemeContext = createContext(undefined)

export function ThemeProvider({ children, defaultTheme = 'system', storageKey = 'aqa-theme' }) {
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem(storageKey) || defaultTheme
        }
        return defaultTheme
    })

    useEffect(() => {
        const root = window.document.documentElement
        root.classList.remove('light', 'dark')

        if (theme === 'system') {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
                ? 'dark'
                : 'light'
            root.classList.add(systemTheme)
            return
        }

        root.classList.add(theme)
    }, [theme])

    const setThemeAndStore = useCallback((newTheme) => {
        localStorage.setItem(storageKey, newTheme)
        setTheme(newTheme)
    }, [storageKey])

    const toggleTheme = useCallback(() => {
        setThemeAndStore(theme === 'light' ? 'dark' : 'light')
    }, [theme, setThemeAndStore])

    const value = {
        theme,
        setTheme: setThemeAndStore,
        toggleTheme,
        isDark: theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches),
    }

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const context = useContext(ThemeContext)
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
}
