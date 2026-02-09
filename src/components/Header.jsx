import DarkModeToggle from './DarkModeToggle.jsx'
import SearchBar from './SearchBar.jsx'
import TagFilterBar from './TagFilterBar.jsx'

const Header = ({
  title,
  subtitle,
  searchValue,
  onSearchChange,
  tags,
  activeTags,
  onToggleTag,
}) => {
  return (
    <>
      <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-white/80 backdrop-blur dark:border-slate-800/70 dark:bg-slate-950/80">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-indigo-500">
                Developer Tools
              </p>
              <h1 className="text-xl font-semibold text-slate-900 dark:text-white">
                {title}
              </h1>
              {subtitle && (
                <p className="text-sm font-medium text-black/70 dark:text-white/90">
                  {subtitle}
                </p>
              )}
            </div>
            <DarkModeToggle />
          </div>
          <SearchBar value={searchValue} onChange={onSearchChange} />
        </div>
      </header>
      <div className="border-b border-slate-200/70 bg-white/80 backdrop-blur dark:border-slate-800/70 dark:bg-slate-950/80">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <TagFilterBar
            tags={tags}
            activeTags={activeTags}
            onToggleTag={onToggleTag}
          />
        </div>
      </div>
    </>
  )
}

export default Header
