const TagFilterBar = ({ tags = [], activeTags = [], onToggleTag }) => {
  if (!tags.length) {
    return (
      <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
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
                : 'border-slate-200 bg-white text-slate-600 hover:border-indigo-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
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
