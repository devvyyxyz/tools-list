import { useMemo, useState } from 'react'
import { MdSearch } from 'react-icons/md'
import Header from '../components/Header.jsx'
import Section from '../components/Section.jsx'
import ToolCard from '../components/ToolCard.jsx'
import ToolModal from '../components/ToolModal.jsx'
import SortBar from '../components/SortBar.jsx'
import ComparisonPanel from '../components/ComparisonPanel.jsx'
import BackToTop from '../components/BackToTop.jsx'
import { useStarredRepos } from '../hooks/useStarredRepos.js'
import { useUserRepos } from '../hooks/useUserRepos.js'
import { useTemplateRepos } from '../hooks/useTemplateRepos.js'
import { useRepoLanguages } from '../hooks/useRepoLanguages.js'
import { useRepoContributors } from '../hooks/useRepoContributors.js'
import {
  filterByDenylist,
  filterBySearch,
  filterByTags,
  filterForks,
  filterByOwner,
} from '../utils/filtering.js'
import { sortRepos } from '../utils/sorting.js'

const Home = () => {
  const [search, setSearch] = useState('')
  const [activeTags, setActiveTags] = useState([])
  const [sortKey, setSortKey] = useState('stars')
  const [groupByStatus, setGroupByStatus] = useState(true)
  const [selectedRepo, setSelectedRepo] = useState(null)
  const [comparison, setComparison] = useState([])

  const {
    data: starredData,
    isLoading,
    isError,
    error,
  } = useStarredRepos()

  const {
    data: userReposData,
    isLoading: isUserLoading,
    isError: isUserError,
    error: userError,
  } = useUserRepos()

  const {
    data: templateReposData,
    isLoading: isTemplateLoading,
    isError: isTemplateError,
    error: templateError,
  } = useTemplateRepos()

  const isAnyLoading = isLoading || isUserLoading
  const errorMessage = (error || userError)?.message

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

  const { activeRepos, archivedRepos, noTagRepos, unstarredRepos, templateRepos, tags } =
    useMemo(() => {
      if (!starredData && !userReposData && !templateReposData) {
        return {
          activeRepos: [],
          archivedRepos: [],
          noTagRepos: [],
          unstarredRepos: [],
          templateRepos: [],
          tags: [],
        }
      }
      const denylist = (import.meta.env.VITE_REPO_DENYLIST || '')
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean)
      const forkAllowlist = (import.meta.env.VITE_FORK_ALLOWLIST || '')
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean)
      const ownerLogin = import.meta.env.VITE_GITHUB_USERNAME || ''
      const applyFilters = (repos) =>
        filterByOwner(
          filterForks(filterByDenylist(repos || [], denylist), forkAllowlist),
          ownerLogin,
        )

      const allowedStarred = applyFilters(starredData || [])
      const allowedUser = applyFilters(userReposData || [])
      const starredSet = new Set(
        allowedStarred.map((repo) =>
          String(repo.full_name || '').toLowerCase(),
        ),
      )
      const unstarred = allowedUser.filter(
        (repo) =>
          !starredSet.has(String(repo.full_name || '').toLowerCase()),
      )

      const active = allowedStarred.filter((repo) => !repo.archived)
      const archived = allowedStarred.filter((repo) => repo.archived)
      const noTags = active.filter((repo) => !(repo.topics || []).length)
      const withTags = active.filter((repo) => (repo.topics || []).length)
      const allTags = withTags.flatMap((repo) => repo.topics || [])
      return {
        activeRepos: active,
        archivedRepos: archived,
        noTagRepos: noTags,
        unstarredRepos: unstarred,
        templateRepos: applyFilters(templateReposData || []),
        tags: Array.from(new Set(allTags)).sort(),
      }
    }, [starredData, userReposData, templateReposData])

  const filteredRepos = useMemo(() => {
    const taggedRepos = activeRepos.filter((repo) => (repo.topics || []).length)
    const searched = filterBySearch(taggedRepos, search)
    const tagged = filterByTags(searched, activeTags)
    return sortRepos(tagged, sortKey)
  }, [activeRepos, search, activeTags, sortKey])

  const noTagsFiltered = useMemo(() => {
    const searched = filterBySearch(noTagRepos, search)
    return sortRepos(searched, sortKey)
  }, [noTagRepos, search, sortKey])

  const archivedFiltered = useMemo(() => {
    const searched = filterBySearch(archivedRepos, search)
    return sortRepos(searched, sortKey)
  }, [archivedRepos, search, sortKey])

  const unstarredFiltered = useMemo(() => {
    const searched = filterBySearch(unstarredRepos, search)
    return sortRepos(searched, sortKey)
  }, [unstarredRepos, search, sortKey])

  const templateFiltered = useMemo(() => {
    const searched = filterBySearch(templateRepos, search)
    return sortRepos(searched, sortKey)
  }, [templateRepos, search, sortKey])

  const sections = useMemo(() => {
    if (!groupByStatus) {
      const combined = sortRepos(
        [...filteredRepos, ...noTagsFiltered, ...archivedFiltered, ...unstarredFiltered],
        sortKey,
      )
      return [
        {
          id: 'all-repos',
          title: 'All repositories',
          items: combined,
        },
      ]
    }

    const base = [
      {
        id: 'all-starred',
        title: 'All repositories',
        items: filteredRepos,
      },
    ]

    if (noTagsFiltered.length) {
      base.push({
        id: 'no-tags',
        title: 'Repos with no tags',
        items: noTagsFiltered,
        defaultCollapsed: true,
      })
    }

    if (archivedFiltered.length) {
      base.push({
        id: 'archived',
        title: 'Archived repositories',
        items: archivedFiltered,
        defaultCollapsed: true,
      })
    }

    if (unstarredFiltered.length) {
      base.push({
        id: 'unstarred',
        title: 'Unstarred repositories',
        items: unstarredFiltered,
        defaultCollapsed: true,
      })
    }

    if (templateFiltered.length) {
      base.push({
        id: 'templates',
        title: 'Public templates',
        items: templateFiltered,
        defaultCollapsed: true,
      })
    }

    return base
  }, [
    filteredRepos,
    archivedFiltered,
    noTagsFiltered,
    unstarredFiltered,
    templateFiltered,
    groupByStatus,
    sortKey,
  ])

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
            <h2 className="text-xl font-bold text-white/80">
              Starred tools
            </h2>
            <p className="text-sm text-white/80">
              {isAnyLoading && 'Loading repositories...'}
              {(isError || isUserError) && errorMessage}
              {!isAnyLoading && !(isError || isUserError) &&
                `${
                  filteredRepos.length +
                  noTagsFiltered.length +
                  archivedFiltered.length +
                  unstarredFiltered.length
                } tools matched.`}
            </p>
          </div>
          <SortBar
            value={sortKey}
            onChange={setSortKey}
            groupByStatus={groupByStatus}
            onToggleGroup={setGroupByStatus}
          />
        </div>

        {comparison.length > 0 && (
          <ComparisonPanel items={comparison} onRemove={handleRemoveCompare} />
        )}

        {sections.filter((section) => section.items.length > 0).length === 0 && (
          <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 py-12 text-center dark:border-slate-800 dark:bg-slate-900">
            <MdSearch className="text-4xl text-slate-400" />
            <div>
              <p className="text-lg font-semibold text-slate-700 dark:text-slate-200">
                No results found
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Try adjusting your search or filters.
              </p>
            </div>
          </div>
        )}

        {sections
          .filter((section) => section.items.length > 0)
          .map((section) => (
          <Section
            key={section.id}
            title={section.title}
            count={section.items.length}
            defaultCollapsed={section.defaultCollapsed}
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
