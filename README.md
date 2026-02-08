# Developer Tools List

Scalable React app to list and showcase GitHub-starred developer tools. Built with React Router, TailwindCSS (dark mode), TanStack React Query, Framer Motion, and Recharts.

## Getting started

1. Install dependencies.
2. Copy .env.example to .env and set your GitHub username. Add a token for higher rate limits.
3. Run the dev server.

## Environment variables

- VITE_GITHUB_USERNAME: GitHub username to fetch starred repositories.
- VITE_GITHUB_TOKEN: Optional token for higher rate limits.
- VITE_GITHUB_API_BASE: REST API base URL.
- VITE_GITHUB_GRAPHQL: GraphQL API endpoint.

## Scripts

- npm run dev: Start the dev server.
- npm run build: Build for production.
- npm run preview: Preview the production build.
- npm run lint: Run ESLint.

## Deployment notes

The app is ready for static hosting on Vercel, Netlify, or GitHub Pages. Ensure environment variables are configured in the provider dashboard.
