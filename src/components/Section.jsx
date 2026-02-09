import { useState } from 'react'
import { MdExpandMore, MdExpandLess } from 'react-icons/md'

const Section = ({ title, count, children, defaultCollapsed = false, showCount = true, isNested = false }) => {
  const [collapsed, setCollapsed] = useState(defaultCollapsed)

  return (
    <section className="space-y-4">
      <button
        type="button"
        onClick={() => setCollapsed((prev) => !prev)}
        className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-4 text-left text-sm font-semibold text-slate-800 shadow-sm transition hover:border-indigo-300 dark:border-white/20 dark:bg-black dark:text-white dark:hover:border-indigo-500"
      >
        <span>{title}</span>
        <span className="flex items-center gap-3 text-xs font-medium text-white/75">
          {showCount && <span>{count} tools</span>}
          {collapsed ? (
            <MdExpandMore className="text-lg" />
          ) : (
            <MdExpandLess className="text-lg" />
          )}
        </span>
      </button>
      {!collapsed && (
        isNested ? (
          <div className="space-y-6">
            {children}
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {children}
          </div>
        )
      )}
    </section>
  )
}

export default Section
