import { createContext, useState, useEffect, useContext } from 'react'

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    // Check for saved theme preference first
    const savedTheme = localStorage.getItem('theme')
    // No need for JSON.parse since we're storing a string
    if (savedTheme !== null) return savedTheme === 'dark'
    
    // Fallback to system preference if no saved preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    // Store as string 'dark' or 'light' instead of boolean
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
    // Toggle the class on the HTML element
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  const toggleTheme = () => setIsDark(!isDark)

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)