import { getLanguageColor } from '../utils/githubColors.js'

const LanguageBar = ({ languages = {} }) => {
  const entries = Object.entries(languages)
  const total = entries.reduce((acc, [, value]) => acc + value, 0)

  if (!entries.length) {
    return (
      <div className="text-xs text-slate-400">Language data unavailable.</div>
    )
  }

  return (
    <div className="flex h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
      {entries.map(([language, value]) => {
        const width = `${Math.round((value / total) * 100)}%`
        return (
          <span
            key={language}
            style={{ width, backgroundColor: getLanguageColor(language) }}
            title={`${language} ${width}`}
          />
        )
      })}
    </div>
  )
}

export default LanguageBar
