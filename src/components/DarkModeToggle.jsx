import { useDarkMode } from '../hooks/useDarkMode.js'

const DarkModeToggle = () => {
  const { isDark, setIsDark } = useDarkMode()

  return (
    <button
      type="button"
      onClick={() => setIsDark((prev) => !prev)}
      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
    >
      <span className="text-base">{isDark ? '🌙' : '☀️'}</span>
      <span>{isDark ? 'Dark' : 'Light'} mode</span>
    </button>
  )
}

export default DarkModeToggle
