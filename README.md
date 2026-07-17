# Portfolio - Diogenes Quintero

Personal portfolio built with Quasar (Vue 3), deployed on Oracle Cloud Infrastructure (OCI) Free Tier.

**Live:** https://dioquincar.dev

---

## Architecture

```
Internet
   |
   v
Cloudflare (DNS + SSL)
   |
   v
OCI Instance (Docker)
   |
   v
Nginx (static SPA)
```

Single container. Static files. No backend runtime.

---

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Quasar 2 + Vue 3 |
| Language | JavaScript (Composition API) |
| Styling | SCSS + CSS Custom Properties |
| i18n | vue-i18n (ES/EN) |
| Build | Vite |
| Deploy | Docker + Nginx |
| CI/CD | GitHub Actions |

---

## Local Development

Requirements: Node.js 22, Docker (optional).

```bash
git clone https://github.com/dio-quincarDev/portfolio.git
cd portfolio/frontend
npm install --legacy-peer-deps
npm run dev
```

---

## Deploy

Every push to `main` triggers:

1. **Lint** -- ESLint validation
2. **Docker** -- Multi-architecture image (amd64 + arm64) pushed to Docker Hub
3. **Deploy** -- SCP docker-compose.yml to OCI VM, pull new image, restart

```bash
# Manual deploy
docker compose up -d
```

---

## Project Structure

```
portfolio/
  frontend/
    src/
      pages/          # Home, About
      components/     # Hero, Philosophy, Projects, TerminalDots
      composables/    # useScrollAnimation
      i18n/           # ES/EN translations
      css/            # Global styles, variables
    Dockerfile        # Multi-stage: Node build, Nginx serve

  backend/            # Reference only (not deployed)
    portfolio-gateway/
    feat-flag-api-bytes-colabs/

  docker-compose.yml
  .github/workflows/deploy.yml
```

---

## Brand

- **Positioning:** Backend developer who builds resilient systems on free-tier infrastructure
- **Voice:** Direct, practical, no buzzwords
- **Palette:** Cream (#f2efe9) / Teal (#073b4c) / Coral (#ef476f)
- **Type:** JetBrains Mono (display) + IBM Plex Sans (body)

---

## Author

**Diogenes Quintero** -- https://dioquincar.dev
