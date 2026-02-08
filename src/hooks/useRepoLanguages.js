import { useQuery } from '@tanstack/react-query'
import { fetchRepoLanguages } from '../api/github.js'

export const useRepoLanguages = ({ owner, repo, enabled = true }) => {
  return useQuery({
    queryKey: ['repo-languages', owner, repo],
    queryFn: () => fetchRepoLanguages({ owner, repo }),
    enabled: Boolean(owner && repo && enabled),
  })
}
