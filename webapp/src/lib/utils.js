import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
    return twMerge(clsx(inputs))
}

/** Public asset URL that respects Vite `base` (GitHub Pages project path). */
export function publicUrl(path) {
    const base = import.meta.env.BASE_URL || '/'
    const trimmed = String(path).replace(/^\//, '')
    return `${base}${trimmed}`
}
