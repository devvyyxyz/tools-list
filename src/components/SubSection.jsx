import { useState } from 'react'
import { MdExpandMore, MdExpandLess } from 'react-icons/md'

const SubSection = ({ title, count, children, defaultCollapsed = false }) => {
  const [collapsed, setCollapsed] = useState(defaultCollapsed)

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={() => setCollapsed((prev) => !prev)}
        className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm font-semibold text-white transition hover:border-indigo-400 dark:hover:border-indigo-500"
      >
        <span>{title}</span>
        <span className="flex items-center gap-2 text-xs font-medium text-white/75">
          {count && <span>{count} tools</span>}
          {collapsed ? (
            <MdExpandMore className="text-lg" />
          ) : (
            <MdExpandLess className="text-lg" />
          )}
        </span>
      </button>
      <div className={`subsection-content grid gap-4 md:grid-cols-2 xl:grid-cols-3 ${collapsed ? '' : 'open'}`}>
        {children}
      </div>
    </div>
  )
}

export default SubSection
