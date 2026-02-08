import { useState } from 'react'

const Section = ({ title, count, children, defaultCollapsed = false }) => {
  const [collapsed, setCollapsed] = useState(defaultCollapsed)

  return (
    <section className="space-y-4">
      <button
        type="button"
        onClick={() => setCollapsed((prev) => !prev)}
        className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-4 text-left text-sm font-semibold text-slate-800 shadow-sm transition hover:border-indigo-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
      >
        <span>{title}</span>
        <span className="flex items-center gap-3 text-xs font-medium text-slate-400">
          {count} tools
          <span className="text-lg">{collapsed ? '＋' : '－'}</span>
        </span>
      </button>
      {!collapsed && (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {children}
        </div>
      )}
    </section>
  )
}

export default Section
