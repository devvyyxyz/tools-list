import { useQuery } from '@tanstack/react-query'
import { fetchTemplateRepos } from '../api/github.js'

export const useTemplateRepos = (params = {}) => {
  return useQuery({
    queryKey: ['template-repos', params],
    queryFn: () => fetchTemplateRepos(params),
  })
}
