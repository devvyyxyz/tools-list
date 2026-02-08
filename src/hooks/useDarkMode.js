import { useEffect, useState } from 'react'

const STORAGE_KEY = 'tools-theme'

export const useDarkMode = () => {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const next = stored ? stored === 'dark' : prefersDark
    setIsDark(next)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
      window.localStorage.setItem(STORAGE_KEY, 'dark')
    } else {
      root.classList.remove('dark')
      window.localStorage.setItem(STORAGE_KEY, 'light')
    }
  }, [isDark])

  return { isDark, setIsDark }
}
