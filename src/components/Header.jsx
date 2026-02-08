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
    <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-white/80 backdrop-blur dark:border-slate-800/70 dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-indigo-500">
              Developer Tools
            </p>
            <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
              {title}
            </h1>
            {subtitle && (
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {subtitle}
              </p>
            )}
          </div>
          <DarkModeToggle />
        </div>
        <SearchBar value={searchValue} onChange={onSearchChange} />
        <TagFilterBar
          tags={tags}
          activeTags={activeTags}
          onToggleTag={onToggleTag}
        />
      </div>
    </header>
  )
}

export default Header
