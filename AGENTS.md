# AGENTS.md — dio-quincar.dev portfolio

## Repo structure

Polyglot monorepo with three independently-built services orchestrated via Docker Compose.

| Path | Tech | Entry point |
|---|---|---|
| `frontend/` | Quasar (Vue 3, Vite) | `npm run dev`, `npm run build` |
| `backend/portfolio-gateway/` | Spring Cloud Gateway, Java 21, WebFlux | `PortfolioGatewayApplication.java` |
| `backend/feat-flag-api-bytes-colabs/` | Spring Boot 3.3.1, Java 21, SQLite | `FeatureFlagApi.java` (has `@EnableScheduling`) |

## Essential commands

**Frontend** (run from `frontend/`):
- `npm install --legacy-peer-deps` (required flag, `postinstall` runs `quasar prepare`)
- `npm run dev` — hot-reload dev server
- `npm run build` — production build to `dist/spa/`
- `npm run lint` — ESLint (flat config, `eslint.config.js`)
- `npm run format` — Prettier (no semi, single quotes, 100 width)
- Tests: **none** (`"test"` is a no-op placeholder)

**Backend services** (run from each `backend/*/` dir):
- `./mvnw clean package -DskipTests` — package (as Dockerfiles do)
- `./mvnw test` — run unit tests
- No shared parent POM; each service builds independently.

**Full stack locally:**
```
cp .env.example .env
docker compose up -d
cd frontend && npm install --legacy-peer-deps && npm run dev
```

## Architecture quirks

- Frontend uses **hash-based routing** (`vueRouterMode: 'hash'`), so URLs contain `#/`.
- Frontend talks **only to the API Gateway** (`VITE_API_BASE_URL`), never directly to backend.
- Gateway is reactive (WebFlux), not Spring MVC.
- Feature Flag API uses **SQLite** via Hibernate community dialects — no PostgreSQL/MySQL.
- Redis is required for Gateway (rate limiting); Gateway won't start healthy without it.
- Gateway depends on `backend` (Feature Flag API) and `redis` being healthy; `frontend` depends on `gateway`.
- JWT auth: `JWT_SECRET` env var must be set for the Feature Flag API (backend).
- `docker compose` uses an **external** `proxy-network` for Nginx Proxy Manager integration.

## Frontend conventions

- **Composition API** + `<script setup>` throughout.
- **i18n**: vue-i18n with ES/EN translations in `src/i18n/`; use `$t()` for all user-facing strings.
- **Dark mode**: toggle in toolbar using CSS custom properties (palette in `DESIGN.md`).
- **Quasar plugins**: only `Notify`.
- **Boot files**: `axios.js`, `apexcharts.js`, `i18n.js` (loaded in `quasar.config.js`).
- **Color palette** (immutable, per `DESIGN.md`): bg `#f2efe9`, titles `#073b4c`, accent `#ef476f`.
- Emails are sent via EmailJS (keys in `.env`, already committed to repo).

## CI/CD (GitHub Actions)

Every push to `main` triggers: `mvn test` for both Java services → `npm run lint` for frontend → Docker multi-arch build → SCP compose + deploy to OCI ARM64 VM.

## Gotchas

- No `.mvn/` config dir in either backend service — only `mvnw` scripts.
- `frontend/.env` has **real EmailJS keys committed** — be careful not to expose further.
- `.gitignore` excludes `*.db`, `*.sqlite`, `*.sqlite3` (SQLite data is for local runs only; production uses Docker volumes).
- The `postinstall` script (`quasar prepare`) must succeed for the dev server to work.
