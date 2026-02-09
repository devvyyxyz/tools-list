## GitHub Pages Deployment

This project uses GitHub Actions to build and deploy to GitHub Pages. The app reads GitHub data at build/runtime using Vite environment variables that are supplied through repository secrets.

### Required Repository Secret

- `VITE_GITHUB_USERNAME` — the GitHub username whose repos/starred data should be shown.

### Optional Repository Secrets

- `VITE_GITHUB_TOKEN` — a GitHub personal access token for higher rate limits.
- `VITE_GITHUB_API_BASE` — default: `https://api.github.com`
- `VITE_GITHUB_GRAPHQL` — default: `https://api.github.com/graphql`

### How to Add Secrets

1. In your repo, go to **Settings → Secrets and variables → Actions**.
2. Click **New repository secret**.
3. Add the required secrets listed above.

### Deploy

- Push to `main`, or
- Run the **Deploy to GitHub Pages** workflow manually from the Actions tab.

If `VITE_GITHUB_USERNAME` is missing, the site will not load GitHub data.
