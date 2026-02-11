const TagFilterBar = ({ tags = [], activeTags = [], onToggleTag, tagColors = {} }) => {
  if (!tags.length) {
    return (
      <p className="text-xs font-semibold text-white/75">
        No tags available yet. Topics will appear once GitHub data loads.
      </p>
    )
  }

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => {
        const isActive = activeTags.includes(tag)
        const color = tagColors[String(tag).toLowerCase()] || tagColors[tag]
        return (
          <button
            key={tag}
            type="button"
            onClick={() => onToggleTag(tag)}
            className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide transition ${
              isActive
                ? 'text-white'
                : 'border-slate-200 bg-white text-slate-600 hover:border-indigo-300 dark:border-white/20 dark:bg-black dark:text-white/80 dark:hover:text-white'
            }`}
            style={isActive && color ? { backgroundColor: color, borderColor: color } : {}}
          >
            {color && !isActive && (
              <span
                className="inline-block mr-2 h-2.5 w-2.5 rounded-full align-middle"
                style={{ backgroundColor: color }}
              />
            )}
            {tag}
          </button>
        )
      })}
    </div>
  )
}

export default TagFilterBar
