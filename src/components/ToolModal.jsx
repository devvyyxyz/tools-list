import { AnimatePresence, motion } from 'framer-motion'
import LanguageBar from './LanguageBar.jsx'
import { formatNumber } from '../utils/formatting.js'

const ToolModal = ({ repo, languages, contributors, onClose }) => {
  return (
    <AnimatePresence>
      {repo && (
        <motion.div
          className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="glass-panel max-h-[80vh] w-full max-w-3xl overflow-y-auto p-6"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <h2 className="text-2xl font-semibold text-white">
                  {repo.name}
                </h2>
                <p className="text-sm text-white/90">
                  {repo.full_name}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-500 hover:border-slate-300 dark:border-slate-800 dark:text-slate-300"
              >
                Close
              </button>
            </div>

            <p className="mt-4 text-sm text-white/75">
              {repo.description || 'No description available yet.'}
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-xl border border-white/10 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-white/75">
                  Stars
                </p>
                <p className="text-lg font-semibold text-white">
                  {formatNumber(repo.stargazers_count)}
                </p>
              </div>
              <div className="rounded-xl border border-white/10 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-white/75">
                  Open issues
                </p>
                <p className="text-lg font-semibold text-white">
                  {formatNumber(repo.open_issues_count)}
                </p>
              </div>
              <div className="rounded-xl border border-white/10 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-white/75">
                  Forks
                </p>
                <p className="text-lg font-semibold text-white">
                  {formatNumber(repo.forks_count)}
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <h3 className="text-sm font-bold text-white">
                Language breakdown
              </h3>
              <LanguageBar languages={languages} />
              <div className="flex flex-wrap gap-2 text-xs text-white/80">
                {Object.entries(languages).map(([language, value]) => (
                  <span key={language}>{`${language} · ${formatNumber(value)}`}</span>
                ))}
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Top contributors
              </h3>
              <div className="grid gap-3 md:grid-cols-2">
                {(contributors || []).map((contributor) => (
                  <a
                    key={contributor.id}
                    href={contributor.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 rounded-xl border border-white/10 p-3 text-sm text-white/80 transition hover:border-indigo-400 dark:hover:border-indigo-400"
                  >
                    <img
                      src={contributor.avatar_url}
                      alt={contributor.login}
                      className="h-10 w-10 rounded-full"
                    />
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">
                        {contributor.login}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {formatNumber(contributor.contributions)} contributions
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ToolModal
