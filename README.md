# daniel.london

Personal site for Daniel Raban — senior software engineer in East London.

Built with Next.js 16, Tailwind CSS v4, and a dark 8-bit HUD aesthetic.

## Local

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` for local integrations:

- Spotify now-playing: `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, `SPOTIFY_REFRESH_TOKEN`
- GitHub lab (heatmap + higher rate limits): `GITHUB_TOKEN` — a fine-grained PAT with public repo and user profile read, or a classic token
