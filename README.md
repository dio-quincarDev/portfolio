# Portfolio — Diógenes Quintero

Personal site built with Quasar (Vue 3) and deployed as a static SPA on Oracle Cloud Infrastructure.

**Live:** https://dioquincar.dev

---

## Architecture

```
Internet
   |
   v
Cloudflare (DNS + TLS)
   |
   v
OCI instance (Docker)
   |
   v
Nginx (static SPA)
```

One container. Static files. No backend runtime.

---

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Quasar 2 + Vue 3 |
| Language | JavaScript (Composition API) |
| Styling | SCSS + CSS custom properties |
| i18n | vue-i18n (ES/EN) |
| Build | Vite |
| Deploy | Docker + Nginx |
| CI/CD | GitHub Actions |

---

## Local development

Requirements: Node.js 22.

```bash
cd frontend
npm ci --legacy-peer-deps
npm run dev
```

Validation:

```bash
npm run lint
npm run build
```

---

## Deploy

Every push to `main` that touches `frontend/**`, `docker-compose.yml`, or the workflow triggers:

1. **Validate** — install with `npm ci`, run ESLint and a production build.
2. **Docker** — build and push a multi-architecture image (amd64 + arm64) to Docker Hub.
3. **Deploy** — copy `docker-compose.yml` to the OCI VM, pull the new image, restart the container.

Manual deploy:

```bash
docker compose up -d
```

---

## Project structure

```
portfolio/
  frontend/
    src/
      pages/          # Home, projects, about, 404
      components/     # Hero, projects, contact, stack, layout pieces
      composables/    # Project data, contact form, scroll reveal
      i18n/           # ES/EN translations
      css/            # Global styles and variables
    public/
      cv/             # Spanish and English CV PDFs
      images/         # Project diagrams
    Dockerfile        # Multi-stage: Node build, Nginx serve
    nginx.conf        # SPA fallback and rate limits

  docker-compose.yml
  .github/workflows/deploy.yml
```

The retired Spring backend is archived outside this repository in `../archive/portfolio-backend-2026-10-25/`.

---

## Content

- **Featured project:** Pymeq — Forensic Accounting.
- **Selected projects:** Fleet Control, Car Rental API, Employee Management System.
- **Collaborations:** SkillLink, SportPulse, SwissRoute, with the specific contribution stated in each case.
- **CV:** Spanish and English PDFs under `public/cv/`.

The site is an SPA, not a PWA. It has no service worker or offline mode.

---

## Brand

- **Positioning:** Backend Java developer focused on authentication, APIs, and deployment.
- **Voice:** Direct, sober, no buzzwords.
- **Palette:** Cream `#f2efe9` / Teal `#073b4c` / Coral `#ef476f`.
- **Type:** DM Serif Display, Sora, JetBrains Mono.

---

## Author

**Diógenes Quintero** — https://dioquincar.dev
