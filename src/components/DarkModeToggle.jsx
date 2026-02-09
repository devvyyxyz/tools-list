import { useDarkMode } from '../hooks/useDarkMode.js'
import { MdDarkMode, MdLightMode } from 'react-icons/md'

const DarkModeToggle = () => {
  const { isDark, setIsDark } = useDarkMode()

  return (
    <button
      type="button"
      onClick={() => setIsDark((prev) => !prev)}
      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-white/20 dark:bg-black dark:text-white dark:hover:bg-white/10"
    >
      {isDark ? (
        <MdLightMode className="text-lg" />
      ) : (
        <MdDarkMode className="text-lg" />
      )}
      <span>{isDark ? 'Dark' : 'Light'} mode</span>
    </button>
  )
}

export default DarkModeToggle
