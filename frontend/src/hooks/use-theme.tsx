"use client"

import { useEffect, useState } from "react"

type Theme = "light" | "dark"

export function useTheme() {
    const [theme, setTheme] = useState<Theme>("dark")

    useEffect(() => {
        // Get initial theme from localStorage or system preference
        const stored = localStorage.getItem("theme") as Theme | null
        const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
        const initialTheme = stored || (systemPrefersDark ? "dark" : "dark") // Default to dark

        setTheme(initialTheme)
        applyTheme(initialTheme)
    }, [])

    const applyTheme = (newTheme: Theme) => {
        const root = document.documentElement
        if (newTheme === "dark") {
            root.classList.add("dark")
        } else {
            root.classList.remove("dark")
        }
    }

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light"
        setTheme(newTheme)
        localStorage.setItem("theme", newTheme)
        applyTheme(newTheme)
    }

    return { theme, toggleTheme }
}
