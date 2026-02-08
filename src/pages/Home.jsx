import { useMemo, useState } from 'react'
import Header from '../components/Header.jsx'
import Section from '../components/Section.jsx'
import ToolCard from '../components/ToolCard.jsx'
import ToolModal from '../components/ToolModal.jsx'
import SortBar from '../components/SortBar.jsx'
import ComparisonPanel from '../components/ComparisonPanel.jsx'
import BackToTop from '../components/BackToTop.jsx'
import { useStarredRepos } from '../hooks/useStarredRepos.js'
import { useRepoLanguages } from '../hooks/useRepoLanguages.js'
import { useRepoContributors } from '../hooks/useRepoContributors.js'
import { filterByDenylist, filterBySearch, filterByTags } from '../utils/filtering.js'
import { sortRepos } from '../utils/sorting.js'

const Home = () => {
  const [search, setSearch] = useState('')
  const [activeTags, setActiveTags] = useState([])
  const [sortKey, setSortKey] = useState('stars')
  const [selectedRepo, setSelectedRepo] = useState(null)
  const [comparison, setComparison] = useState([])

  const { data, isLoading, isError, error } = useStarredRepos()

  const { data: languages = {} } = useRepoLanguages({
    owner: selectedRepo?.owner?.login,
    repo: selectedRepo?.name,
    enabled: Boolean(selectedRepo),
  })

  const { data: contributors = [] } = useRepoContributors({
    owner: selectedRepo?.owner?.login,
    repo: selectedRepo?.name,
    enabled: Boolean(selectedRepo),
  })

  const tags = useMemo(() => {
    if (!data) return []
    const all = data.flatMap((repo) => repo.topics || [])
    return Array.from(new Set(all)).sort()
  }, [data])

  const filteredRepos = useMemo(() => {
    if (!data) return []
    const denylist = (import.meta.env.VITE_REPO_DENYLIST || '')
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
    const allowed = filterByDenylist(data, denylist)
    const searched = filterBySearch(allowed, search)
    const tagged = filterByTags(searched, activeTags)
    return sortRepos(tagged, sortKey)
  }, [data, search, activeTags, sortKey])

  const sections = useMemo(() => {
    return [
      {
        id: 'all-starred',
        title: 'All starred repositories',
        items: filteredRepos,
      },
    ]
  }, [filteredRepos])

  const handleToggleTag = (tag) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((item) => item !== tag) : [...prev, tag],
    )
  }

  const handleToggleCompare = (repo) => {
    setComparison((prev) => {
      if (prev.some((item) => item.id === repo.id)) {
        return prev.filter((item) => item.id !== repo.id)
      }
      if (prev.length >= 3) return prev
      return [...prev, repo]
    })
  }

  const handleRemoveCompare = (repo) => {
    setComparison((prev) => prev.filter((item) => item.id !== repo.id))
  }

  return (
    <div className="min-h-screen">
      <Header
        title="Toolbox"
        subtitle="A curated view of your starred GitHub repositories."
        searchValue={search}
        onSearchChange={setSearch}
        tags={tags}
        activeTags={activeTags}
        onToggleTag={handleToggleTag}
      />

      <main className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              Starred tools
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {isLoading && 'Loading repositories...'}
              {isError && error?.message}
              {!isLoading && !isError &&
                `${filteredRepos.length} tools matched.`}
            </p>
          </div>
          <SortBar value={sortKey} onChange={setSortKey} />
        </div>

        {comparison.length > 0 && (
          <ComparisonPanel items={comparison} onRemove={handleRemoveCompare} />
        )}

        {sections.map((section) => (
          <Section
            key={section.id}
            title={section.title}
            count={section.items.length}
          >
            {section.items.map((repo) => (
              <ToolCard
                key={repo.id}
                repo={repo}
                onSelect={setSelectedRepo}
                onToggleCompare={handleToggleCompare}
                isCompared={comparison.some((item) => item.id === repo.id)}
              />
            ))}
          </Section>
        ))}
      </main>

      <ToolModal
        repo={selectedRepo}
        languages={languages}
        contributors={contributors}
        onClose={() => setSelectedRepo(null)}
      />
      <BackToTop />
    </div>
  )
}

export default Home
