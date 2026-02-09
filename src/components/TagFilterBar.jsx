const TagFilterBar = ({ tags = [], activeTags = [], onToggleTag }) => {
  if (!tags.length) {
    return (
      <p className="text-xs font-semibold text-black/75">
        No tags available yet. Topics will appear once GitHub data loads.
      </p>
    )
  }

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => {
        const isActive = activeTags.includes(tag)
        return (
          <button
            key={tag}
            type="button"
            onClick={() => onToggleTag(tag)}
            className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide transition ${
              isActive
                ? 'border-indigo-500 bg-indigo-500 text-white'
                : 'border-slate-200 bg-white text-slate-600 hover:border-indigo-300 dark:border-white/20 dark:bg-black dark:text-white/80 dark:hover:text-white'
            }`}
          >
            {tag}
          </button>
        )
      })}
    </div>
  )
}

export default TagFilterBar
