export const sortRepos = (repos, sortKey) => {
  const items = [...repos]
  switch (sortKey) {
    case 'stars':
      return items.sort((a, b) => b.stargazers_count - a.stargazers_count)
    case 'updated':
      return items.sort(
        (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
      )
    case 'issues':
      return items.sort((a, b) => b.open_issues_count - a.open_issues_count)
    default:
      return items
  }
}
