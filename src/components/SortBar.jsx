const SortBar = ({ value, onChange, groupByStatus, onToggleGroup }) => {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-xs font-semibold text-white/75">
        Sort by
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm outline-none dark:border-white/20 dark:bg-black dark:text-white"
      >
        <option value="stars">Star count</option>
        <option value="updated">Last updated</option>
        <option value="issues">Open issues</option>
      </select>
      <button
        type="button"
        onClick={() => onToggleGroup(!groupByStatus)}
        className={`rounded-xl border px-3 py-2 text-xs font-semibold uppercase tracking-wide transition ${
          groupByStatus
            ? 'border-indigo-500 bg-indigo-500 text-white'
            : 'border-slate-200 bg-white text-slate-600 hover:border-indigo-300 dark:border-white/20 dark:bg-black dark:text-white/80 dark:hover:text-white'
        }`}
      >
        {groupByStatus ? 'Grouped' : 'Ungrouped'}
      </button>
    </div>
  )
}

export default SortBar
