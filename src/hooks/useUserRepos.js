import { useQuery } from '@tanstack/react-query'
import { fetchUserRepos } from '../api/github.js'

export const useUserRepos = (params = {}) => {
  return useQuery({
    queryKey: ['user-repos', params],
    queryFn: () => fetchUserRepos(params),
  })
}
