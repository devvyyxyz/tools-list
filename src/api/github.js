import axios from 'axios'

const API_BASE = import.meta.env.VITE_GITHUB_API_BASE || 'https://api.github.com'
const GRAPHQL_ENDPOINT =
  import.meta.env.VITE_GITHUB_GRAPHQL || 'https://api.github.com/graphql'
const DEFAULT_USERNAME = import.meta.env.VITE_GITHUB_USERNAME || ''
const TOKEN = import.meta.env.VITE_GITHUB_TOKEN || ''

const buildHeaders = () => {
  const headers = {
    Accept: 'application/vnd.github+json',
  }
  if (TOKEN) {
    headers.Authorization = `Bearer ${TOKEN}`
  }
  return headers
}

export const githubRest = axios.create({
  baseURL: API_BASE,
  headers: buildHeaders(),
})

export const fetchStarredRepos = async ({
  username = DEFAULT_USERNAME,
  page = 1,
  perPage = 100,
  sort = 'created',
  direction = 'desc',
} = {}) => {
  if (!username) {
    throw new Error('Missing GitHub username. Set VITE_GITHUB_USERNAME in .env.')
  }
  const { data } = await githubRest.get(`/users/${username}/starred`, {
    params: {
      page,
      per_page: perPage,
      sort,
      direction,
    },
  })
  return data
}

export const fetchUserRepos = async ({
  username = DEFAULT_USERNAME,
  page = 1,
  perPage = 100,
  sort = 'updated',
  direction = 'desc',
} = {}) => {
  if (!username) {
    throw new Error('Missing GitHub username. Set VITE_GITHUB_USERNAME in .env.')
  }
  const { data } = await githubRest.get(`/users/${username}/repos`, {
    params: {
      page,
      per_page: perPage,
      sort,
      direction,
    },
  })
  return data
}

export const fetchRepoDetails = async ({ owner, repo }) => {
  const { data } = await githubRest.get(`/repos/${owner}/${repo}`)
  return data
}

export const fetchRepoLanguages = async ({ owner, repo }) => {
  const { data } = await githubRest.get(`/repos/${owner}/${repo}/languages`)
  return data
}

export const fetchRepoContributors = async ({ owner, repo, perPage = 10 }) => {
  const { data } = await githubRest.get(
    `/repos/${owner}/${repo}/contributors`,
    {
      params: {
        per_page: perPage,
      },
    },
  )
  return data
}

export const fetchStarredReposGraphQL = async ({
  username = DEFAULT_USERNAME,
  after = null,
} = {}) => {
  if (!username) {
    throw new Error('Missing GitHub username. Set VITE_GITHUB_USERNAME in .env.')
  }
  const query = `
    query ($username: String!, $after: String) {
      user(login: $username) {
        starredRepositories(first: 50, after: $after, orderBy: {field: STARRED_AT, direction: DESC}) {
          totalCount
          pageInfo {
            hasNextPage
            endCursor
          }
          nodes {
            id
            name
            nameWithOwner
            description
            stargazerCount
            forkCount
            url
            updatedAt
            primaryLanguage {
              name
              color
            }
            repositoryTopics(first: 10) {
              nodes {
                topic { name }
              }
            }
          }
        }
      }
    }
  `

  const { data } = await axios.post(
    GRAPHQL_ENDPOINT,
    {
      query,
      variables: { username, after },
    },
    {
      headers: buildHeaders(),
    },
  )

  if (data.errors) {
    throw new Error(data.errors.map((err) => err.message).join(', '))
  }

  return data.data.user.starredRepositories
}
