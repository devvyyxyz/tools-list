import { useQuery } from '@tanstack/react-query'
import { fetchRepoContributors } from '../api/github.js'

export const useRepoContributors = ({ owner, repo, enabled = true }) => {
  return useQuery({
    queryKey: ['repo-contributors', owner, repo],
    queryFn: () => fetchRepoContributors({ owner, repo }),
    enabled: Boolean(owner && repo && enabled),
  })
}
