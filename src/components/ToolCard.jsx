import { formatNumber, formatDate } from '../utils/formatting.js'

const ToolCard = ({ repo, onSelect, onToggleCompare, isCompared }) => {
  return (
    <div className="glass-panel flex h-full flex-col gap-4 p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              className="text-lg font-semibold text-indigo-600 hover:underline"
            >
              {repo.name}
            </a>
            {repo.archived && (
              <span className="rounded-full bg-amber-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-amber-700">
                Archived
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {repo.full_name}
          </p>
        </div>
        <button
          type="button"
          onClick={() => onToggleCompare(repo)}
          className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
            isCompared
              ? 'border-indigo-500 bg-indigo-500 text-white'
              : 'border-slate-200 text-slate-500 dark:border-slate-800 dark:text-slate-300'
          }`}
        >
          {isCompared ? 'Selected' : 'Compare'}
        </button>
      </div>

      <p className="text-sm text-slate-600 dark:text-slate-300">
        {repo.description || 'No description available yet.'}
      </p>

      <div className="grid grid-cols-2 gap-4 text-xs text-slate-500 dark:text-slate-400">
        <div>
          <p className="font-semibold uppercase tracking-wide">Stars</p>
          <p className="text-sm text-slate-900 dark:text-slate-100">
            {formatNumber(repo.stargazers_count)}
          </p>
        </div>
        <div>
          <p className="font-semibold uppercase tracking-wide">Open issues</p>
          <p className="text-sm text-slate-900 dark:text-slate-100">
            {formatNumber(repo.open_issues_count)}
          </p>
        </div>
        <div>
          <p className="font-semibold uppercase tracking-wide">Updated</p>
          <p className="text-sm text-slate-900 dark:text-slate-100">
            {formatDate(repo.updated_at)}
          </p>
        </div>
        <div>
          <p className="font-semibold uppercase tracking-wide">Forks</p>
          <p className="text-sm text-slate-900 dark:text-slate-100">
            {formatNumber(repo.forks_count)}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onSelect(repo)}
        className="mt-auto inline-flex items-center justify-center rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-600 transition hover:border-indigo-300 hover:bg-indigo-100 dark:border-indigo-600/40 dark:bg-indigo-500/10 dark:text-indigo-200"
      >
        View details
      </button>
    </div>
  )
}

export default ToolCard
