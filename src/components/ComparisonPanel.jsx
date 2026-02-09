import { formatNumber } from '../utils/formatting.js'

const ComparisonPanel = ({ items, onRemove }) => {
  if (!items.length) return null

  return (
    <div className="glass-panel mt-6 p-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Comparison mode
          </h3>
          <p className="text-sm text-black/60 dark:text-white/80">
            Compare up to 3 tools side by side.
          </p>
        </div>
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {items.map((repo) => (
          <div
            key={repo.id}
            className="rounded-2xl border border-slate-200/60 p-4 dark:border-white/20 dark:bg-white/5\"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                {repo.name}
              </p>
              <button
                type="button"
                onClick={() => onRemove(repo)}
                className="text-xs font-semibold uppercase tracking-wide text-slate-400 hover:text-indigo-500"
              >
                Remove
              </button>
            </div>
            <div className="mt-3 space-y-2 text-xs text-black/60 dark:text-white/80">
              <p>Stars: {formatNumber(repo.stargazers_count)}</p>
              <p>Open issues: {formatNumber(repo.open_issues_count)}</p>
              <p>Forks: {formatNumber(repo.forks_count)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ComparisonPanel
