import { formatNumber, formatDate, formatTitle } from '../utils/formatting.js'
import { MdStar, MdBugReport, MdCallSplit, MdAccessTime } from 'react-icons/md'

const ToolCard = ({ repo, onSelect, onToggleCompare, isCompared }) => {
  return (
    <div className="glass-panel flex h-full min-h-[380px] flex-col gap-4 p-5">
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-4">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
            className="flex-1 text-lg font-semibold text-indigo-600 uppercase no-underline"
          >
            {formatTitle(repo.name)}
          </a>
          <button
            type="button"
            onClick={() => onToggleCompare(repo)}
            className={`flex-none rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
              isCompared
                ? 'border-indigo-500 bg-indigo-500 text-white'
                : 'border-slate-200 text-slate-500 dark:border-slate-800 dark:text-slate-300'
            }`}
          >
            {isCompared ? 'Selected' : 'Compare'}
          </button>
        </div>
        <p className="text-xs text-white/70">
          {repo.full_name}
        </p>
        <div className="flex flex-wrap gap-2">
          {repo.archived && (
            <span className="rounded-full bg-amber-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-amber-700">
              Archived
            </span>
          )}
          {repo.is_template && (
            <span className="rounded-full bg-green-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-green-700">
              Template
            </span>
          )}
        </div>
      </div>

      <p className="line-clamp-3 text-sm text-white/75">
        {repo.description || 'No description available yet.'}
      </p>

      <div className="mt-auto grid grid-cols-2 gap-4 text-xs text-white/80">
        <div>
          <p className="flex items-center gap-1 font-semibold uppercase tracking-wide text-white/75">
            <MdStar className="text-sm" />
            Stars
          </p>
          <p className="text-sm font-semibold text-white">
            {formatNumber(repo.stargazers_count)}
          </p>
        </div>
        <div>
          <p className="flex items-center gap-1 font-semibold uppercase tracking-wide text-white/75">
            <MdBugReport className="text-sm" />
            Open issues
          </p>
          <p className="text-sm font-semibold text-white">
            {formatNumber(repo.open_issues_count)}
          </p>
        </div>
        <div>
          <p className="flex items-center gap-1 font-semibold uppercase tracking-wide text-white/75">
            <MdAccessTime className="text-sm" />
            Updated
          </p>
          <p className="text-sm font-semibold text-white">
            {formatDate(repo.updated_at)}
          </p>
        </div>
        <div>
          <p className="flex items-center gap-1 font-semibold uppercase tracking-wide text-white/75">
            <MdCallSplit className="text-sm" />
            Forks
          </p>
          <p className="text-sm font-semibold text-white">
            {formatNumber(repo.forks_count)}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onSelect(repo)}
        className="mt-auto inline-flex items-center justify-center rounded-xl border border-indigo-500 bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:border-indigo-400 hover:bg-indigo-500"
      >
        View details
      </button>
    </div>
  )
}

export default ToolCard
