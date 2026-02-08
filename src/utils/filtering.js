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
