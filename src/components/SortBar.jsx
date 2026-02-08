const SortBar = ({ value, onChange }) => {
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
    </div>
  )
}

export default SortBar
