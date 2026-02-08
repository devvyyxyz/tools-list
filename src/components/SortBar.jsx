const SortBar = ({ value, onChange, groupByStatus, onToggleGroup }) => {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        Sort by
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
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
            : 'border-slate-200 bg-white text-slate-600 hover:border-indigo-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
        }`}
      >
        {groupByStatus ? 'Grouped' : 'Ungrouped'}
      </button>
    </div>
  )
}

export default SortBar
