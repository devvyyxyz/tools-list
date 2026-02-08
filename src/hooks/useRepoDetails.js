import { useQuery } from '@tanstack/react-query'
import { fetchRepoDetails } from '../api/github.js'

export const useRepoDetails = ({ owner, repo, enabled = true }) => {
  return useQuery({
    queryKey: ['repo-details', owner, repo],
    queryFn: () => fetchRepoDetails({ owner, repo }),
    enabled: Boolean(owner && repo && enabled),
  })
}
