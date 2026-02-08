export const filterBySearch = (repos, query) => {
  if (!query) return repos
  const term = query.toLowerCase()
  return repos.filter((repo) =>
    [repo.name, repo.full_name, repo.description]
      .filter(Boolean)
      .some((value) => value.toLowerCase().includes(term)),
  )
}

export const filterByTags = (repos, tags) => {
  if (!tags?.length) return repos
  return repos.filter((repo) => {
    const topics = repo.topics || []
    return tags.every((tag) => topics.includes(tag))
  })
}

export const filterByDenylist = (repos, denylist = []) => {
  if (!denylist.length) return repos
  const normalized = denylist.map((item) => item.toLowerCase())
  return repos.filter(
    (repo) => !normalized.includes(String(repo.full_name || '').toLowerCase()),
  )
}

export const filterForks = (repos, forkAllowlist = []) => {
  const normalized = forkAllowlist.map((item) => item.toLowerCase())
  return repos.filter((repo) => {
    const fullName = String(repo.full_name || '').toLowerCase()
    if (repo.fork) {
      return normalized.includes(fullName)
    }
    return true
  })
}

export const filterByOwner = (repos, ownerLogin) => {
  if (!ownerLogin) return repos
  const normalized = ownerLogin.toLowerCase()
  return repos.filter(
    (repo) => String(repo.owner?.login || '').toLowerCase() === normalized,
  )
}
