import { useMemo, useState } from 'react'
import { MdSearch } from 'react-icons/md'
import Header from '../components/Header.jsx'
import Section from '../components/Section.jsx'
import ToolCard from '../components/ToolCard.jsx'
import ToolCardSkeleton from '../components/ToolCardSkeleton.jsx'
import SubSection from '../components/SubSection.jsx'
import ToolModal from '../components/ToolModal.jsx'
import SortBar from '../components/SortBar.jsx'
import ComparisonPanel from '../components/ComparisonPanel.jsx'
import BackToTop from '../components/BackToTop.jsx'
import Preloader from '../components/Preloader.jsx'
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

  const isAnyLoading = isLoading || isUserLoading || isTemplateLoading
  const errorMessage = (error || userError || templateError)?.message
  const hasData = Boolean(starredData || userReposData || templateReposData)
  const showPreloader = isAnyLoading && !hasData
  const showSkeleton = isAnyLoading && !hasData

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

  const tagSectionDefinitions = useMemo(() => {
    const raw = (import.meta.env.VITE_TAG_SECTIONS || '').trim()

    if (!raw) {
      return []
    }

    return raw
      .split('|')
      .map((section) => section.trim())
      .filter(Boolean)
      .map((section) => {
        const [label, tagList] = section.split(':')
        const tagsValue = (tagList || label)
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean)
        const normalizedTags = tagsValue.map((t) => t.toLowerCase())

        if (!tagsValue.length) return null

        const titleValue = tagList
          ? label.trim()
          : tagsValue
              .join(' ')
              .split('-')
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ')

        return {
          id: `tag-${tagsValue.join('-')}`,
          title: titleValue || tagsValue.join(', '),
          tags: normalizedTags,
        }
      })
      .filter(Boolean)
  }, [tags])

  const tagColors = useMemo(() => {
    const palette = [
      '#7c3aed', // indigo/violet
      '#06b6d4', // cyan
      '#f97316', // orange
      '#10b981', // green
      '#ef4444', // red
      '#f59e0b', // amber
      '#6366f1', // purple
      '#db2777', // pink
    ]
    const map = {}
    tagSectionDefinitions.forEach((section, idx) => {
      const color = palette[idx % palette.length]
      ;(section.tags || []).forEach((t) => {
        map[t] = color
      })
    })
    return map
  }, [tagSectionDefinitions])

  const tagSections = useMemo(() => {
    return tagSectionDefinitions
      .map((section) => ({
        ...section,
        // Match if a repo has ANY of the section tags (OR),
        // because sections list alternative tags like "ai,ml".
        items: filteredRepos.filter((repo) =>
          (repo.topics || []).map((t) => String(t).toLowerCase()).some((t) => section.tags.includes(t)),
        ),
        showCount: false,
      }))
      .filter((section) => section.items.length > 0)
  }, [filteredRepos, tagSectionDefinitions])

  const sections = useMemo(() => {
    if (!groupByStatus) {
      const combined = sortRepos(
        [...filteredRepos, ...noTagsFiltered, ...archivedFiltered, ...unstarredFiltered, ...templateFiltered],
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

    // If we have tag sections, create nested structure
    if (tagSections.length > 0) {
      const reposInTagSections = new Set()
      tagSections.forEach((section) => {
        section.items.forEach((repo) => {
          reposInTagSections.add(repo.id)
        })
      })

      const remainingRepos = filteredRepos.filter((repo) => !reposInTagSections.has(repo.id))

      const allRepositoriesSection = {
        id: 'all-starred',
        title: 'All repositories',
        items: filteredRepos,
        isNested: true,
        nestedSections: tagSections,
        remainingItems: remainingRepos,
      }

      const base = [allRepositoriesSection]

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
    }

    // Default behavior without tag sections
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
    tagSections,
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
    <div>
      {showPreloader && <Preloader label="Loading your GitHub tools…" />}
      <Header
        title="Tools"
        subtitle="A comprehensive collection of your development tools and resources."
        searchValue={search}
        onSearchChange={setSearch}
        tags={tags}
        tagColors={tagColors}
        activeTags={activeTags}
        onToggleTag={handleToggleTag}
      />

      <main className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white/80">
              Available tools
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

        {showSkeleton && (
          <section className="space-y-4">
            <div className="skeleton h-14 w-full rounded-2xl" />
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <ToolCardSkeleton key={`skeleton-${index}`} />
              ))}
            </div>
          </section>
        )}

        {!showSkeleton &&
          sections.filter((section) => section.items.length > 0).length === 0 && (
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

        {!showSkeleton &&
          sections
            .filter((section) => section.items.length > 0)
            .map((section) => (
              <Section
                key={section.id}
                title={section.title}
                count={section.items.length}
                // Default to collapsed unless explicitly set to false
                defaultCollapsed={section.defaultCollapsed ?? true}
                showCount={section.showCount !== false}
                isNested={section.isNested}
              >
                {section.isNested ? (
                  <>
                    {section.nestedSections.map((tagSection) => (
                      <SubSection
                        key={tagSection.id}
                        title={tagSection.title}
                        count={tagSection.items.length}
                        // collapse tag subsections by default
                        defaultCollapsed={tagSection.defaultCollapsed ?? true}
                      >
                        {tagSection.items.map((repo) => (
                          <ToolCard
                            key={repo.id}
                            repo={repo}
                            onSelect={setSelectedRepo}
                            onToggleCompare={handleToggleCompare}
                            isCompared={comparison.some((item) => item.id === repo.id)}
                          />
                        ))}
                      </SubSection>
                    ))}
                    {section.remainingItems.length > 0 && (
                      <SubSection
                        title="Other"
                        count={section.remainingItems.length}
                        // keep "Other" expanded by default
                        defaultCollapsed={false}
                      >
                        {section.remainingItems.map((repo) => (
                          <ToolCard
                            key={repo.id}
                            repo={repo}
                            onSelect={setSelectedRepo}
                            onToggleCompare={handleToggleCompare}
                            isCompared={comparison.some((item) => item.id === repo.id)}
                          />
                        ))}
                      </SubSection>
                    )}
                  </>
                ) : (
                  section.items.map((repo) => (
                    <ToolCard
                      key={repo.id}
                      repo={repo}
                      onSelect={setSelectedRepo}
                      onToggleCompare={handleToggleCompare}
                      isCompared={comparison.some((item) => item.id === repo.id)}
                    />
                  ))
                )}
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
