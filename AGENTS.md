# AGENTS.md — dio-quincar.dev

## Repo structure

Single static Quasar SPA. Everything under `frontend/` is built and served by Nginx; there is no backend runtime in this repository.

| Path | Purpose |
|---|---|
| `frontend/src/pages/` | Home, projects, about, 404 |
| `frontend/src/components/` | Hero, featured projects, cards, detail, contact, stack |
| `frontend/src/composables/` | Project data, contact form, scroll reveal |
| `frontend/src/i18n/` | Spanish and English copy |
| `frontend/public/` | CV PDFs, images, favicon, robots, sitemap |
| `docker-compose.yml` | Single frontend container on the external proxy network |
| `.github/workflows/deploy.yml` | Lint, build, multi-arch image, SSH deploy to OCI |

The retired Spring backend and historical design notes are archived outside this repo in `../archive/portfolio-backend-2026-10-25/`.

## Essential commands

Run from `frontend/`:

```bash
npm ci --legacy-peer-deps
npm run dev
npm run lint
npm run build      # dist/spa/
npm run format
```

There is no test suite. `npm test` is a no-op. The validation gate is lint plus a production build.

## Architecture

- Quasar 2 + Vue 3, Composition API and `<script setup>`.
- Router uses **history mode**. Nginx must keep `try_files $uri $uri/ /index.html`.
- Static files only: no API calls. Contact is direct email plus social links (no form service).
- Deploy: GitHub Actions builds `linux/amd64,linux/arm64`, pushes to Docker Hub, then pulls and restarts the container on OCI.

## Content conventions

- Source of truth for projects is `src/composables/useProjects.js`.
- All user-facing copy belongs in `src/i18n/es.js` and `src/i18n/en.js`; keep both in sync.
- Pymeq is the featured project. Its authentication diagram is `public/images/pymes-auth-flow.png`.
- Collaborations must state the actual contribution. Do not claim whole-team work.
- Keep the tone sober. No superlatives, marketing language, emojis, or unsupported metrics.
- CV files in `public/cv/` are the same PDFs stored in `../data-profile/cv/`. Replace both together.
- The site is an SPA, not a PWA. It has no service worker and makes no offline claims.
- Visual system: cream `#f2efe9`, teal `#073b4c`, coral `#ef476f`; DM Serif Display, Sora, JetBrains Mono.

## Gotchas

- `postinstall` runs `quasar prepare`; use `--legacy-peer-deps` because of the dependency graph.
- Every route needs the Nginx fallback; otherwise deep links return 404.
- Keep `favicon.png` at 128×128 and `icons/dq-logo.png` at 512×512.
