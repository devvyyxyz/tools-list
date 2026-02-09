const SearchBar = ({ value, onChange }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-semibold text-white/75">
        Search tools
      </label>
      <input
        type="search"
        placeholder="Search by name, description, or topic"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 dark:border-white/20 dark:bg-black dark:text-white dark:focus:border-indigo-500 dark:focus:ring-indigo-500/30"
      />
    </div>
  )
}

export default SearchBar
