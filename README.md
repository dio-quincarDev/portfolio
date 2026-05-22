# Portfolio - Diogenes Quintero

A personal portfolio built with a full-stack microservices architecture, deployed on Oracle Cloud Infrastructure (OCI) Free Tier.

**Live:** https://dioquincar.dev

---

## Architecture Overview

```
Internet
   |
   v
Cloudflare (DNS + SSL termination)
   |
   v
OCI Load Balancer (HTTPS 443 / HTTP 80)
   |
   v
Nginx Proxy Manager (path-based routing)
   |
   +-- /api/v1/*          --> API Gateway :8080
   +-- /api/*             --> API Gateway :8080
   +-- /swagger-ui/*      --> API Gateway :8080
   +-- /webjars/*         --> API Gateway :8080
   +-- /feature-flags/*   --> API Gateway :8080
   +-- /                  --> Frontend :80
```

All public traffic goes through Cloudflare for SSL, then the OCI Load Balancer, then Nginx Proxy Manager. Nginx routes API traffic to the Gateway and everything else to the frontend. The Gateway handles rate limiting, circuit breaking, and routing to internal services.

---

## Services

| Service | Technology | Port | Network Access |
|---|---|---|---|
| Frontend | Quasar (Vue 3) + Nginx | 80 (internal) | Via Nginx Proxy Manager |
| API Gateway | Spring Cloud Gateway 3.5.14 / Java 21 | 8080 | Exposed via LB + NPM |
| Feature Flag API | Spring Boot 3.3.1 / Java 21 | 8081 | Internal only (behind Gateway) |
| Redis Cache | Redis 7 Alpine | 6379 | Internal only |

The frontend and backend communicate exclusively through the API Gateway. The Feature Flag API and Redis are never exposed to the host network.

---

## The Backend: What Problem Does It Solve?

This project exists because backend architecture is hard to express visually. The Feature Flag API and Gateway demonstrate:

**API Gateway Pattern** -- A single entry point for all backend services, handling cross-cutting concerns in one place:
- Authentication (JWT validation before requests reach the backend)
- Rate limiting (Redis-backed, preventing abuse without backend changes)
- Circuit breaker (Resilience4j - if the backend is slow or failing, the gateway fails fast instead of hanging)
- Route aggregation (multiple backend services behind a single domain)

**Feature Flag API** -- A complete REST API for managing feature toggles:
- User authentication and role management (USER, ADMIN, SUPER_ADMIN)
- Feature flag CRUD with environment-aware configurations (DEV, STAGING, PROD)
- Public endpoints for checking flag status (no auth needed for reads)
- Admin endpoints for enabling/disabling flags

**Infrastructure as Code** -- The entire deployment is automated:
- Multi-architecture Docker images (amd64 + arm64) via GitHub Actions
- Zero-downtime deployments to OCI Free Tier ARM64 instances
- Health checks, restart policies, and network isolation via Docker Compose

---

## API Endpoints

All endpoints are available through the live site at https://dioquincar.dev.

| Method | Path | Auth Required | Purpose |
|---|---|---|---|
| POST | /api/v1/auth/register | No | Create account |
| POST | /api/v1/auth/register-super-admin | No | First admin setup |
| POST | /api/v1/auth/login | No | Login, receive JWT |
| GET | /api/v1/auth | JWT | Current user info |
| GET | /api/v1/auth/users | SUPER_ADMIN | List all users |
| PUT | /api/v1/auth/users/{id}/role | SUPER_ADMIN | Change user role |
| POST | /api/v1/feature-flags | No | Create a flag |
| GET | /api/v1/feature-flags | No | List all flags |
| GET | /api/v1/feature-flags/{id} | No | Get flag details |
| POST | /api/v1/feature-flags/{id}/enable | ADMIN | Enable a flag |
| POST | /api/v1/feature-flags/{id}/disable | ADMIN | Disable a flag |
| GET | /api/v1/feature-flags/check | No | Check flag status (public) |
| GET | /actuator/health | No | System health |
| GET | /actuator/prometheus | No | Metrics for monitoring |

Interactive API documentation at https://dioquincar.dev/swagger-ui.html.

---

## CI/CD Pipeline

Every push to main triggers four automated stages:

1. **Validation** -- Unit tests for both Java services, linting for the frontend
2. **Build** -- Maven packages for Gateway and Feature Flag API
3. **Docker** -- Multi-architecture images (linux/amd64 + linux/arm64) pushed to Docker Hub
4. **Deploy** -- SCPs docker-compose.yml to the OCI VM, pulls new images, restarts services

No manual steps. No downtime.

---

## Infrastructure

- **Cloud:** Oracle Cloud Infrastructure Always Free Tier (no cost)
- **Compute:** 2x Ampere ARM64 instances (4 OCPUs, 24 GB RAM total)
- **Networking:** OCI Load Balancer -> Nginx Proxy Manager -> Docker networks
- **Container Registry:** Docker Hub
- **Security:** Cloudflare SSL termination, JWT authentication, Redis rate limiting, circuit breaker, CORS restriction, honeypot bot detection
- **Monitoring:** Prometheus metrics, health checks per service

---

## Local Development

Requirements: Docker, Java 21, Node.js 22, Maven.

```bash
git clone https://github.com/dio-quincarDev/portfolio.git
cd portfolio
cp .env.example .env
docker compose up -d

# Frontend dev server (hot reload)
cd frontend
npm install --legacy-peer-deps
npm run dev
```

---

## Project Structure

```
portfolio/
  frontend/                       # Quasar (Vue 3) SPA
    src/
      pages/                      # Index, About, Swagger UI
      components/                 # Dashboard, Project cards
      boot/                       # Axios config, i18n, charts
      router/                     # Routes and navigation
      i18n/                       # English and Spanish translations
    Dockerfile                    # Multi-stage: Node build, Nginx serve

  backend/
    portfolio-gateway/            # Spring Cloud Gateway
      src/main/java/portfolio_gateway/
        config/                   # Route definitions, rate limiter, CORS
        constants/                # API path configuration
      Dockerfile                  # Multi-stage: Maven build, JRE runtime

    feat-flag-api-bytes-colabs/   # Feature Flag REST API
      src/main/java/com/bytes_colaborativos/api/
        auth/                     # Auth controller, JWT service, security config
        feature/                  # Feature flag CRUD, check, enable/disable
        exceptions/               # Global error handling
        constants/                # API route constants
      Dockerfile                  # Multi-stage: Maven build, JRE runtime

  .github/workflows/deploy.yml   # CI/CD pipeline
  docker-compose.yml              # Service orchestration
  .env.example                    # Environment variable template
```

---

## Author

**Diogenes Quintero** -- https://dioquincar.dev
