import { useQuery } from '@tanstack/react-query'
import { fetchStarredRepos } from '../api/github.js'

export const useStarredRepos = (params = {}) => {
  return useQuery({
    queryKey: ['starred-repos', params],
    queryFn: () => fetchStarredRepos(params),
  })
}
