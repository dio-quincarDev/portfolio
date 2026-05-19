# Frontend UX/UI & Demo Experience Design

## Portfolio — dio-quincar.dev

---

## 🎨 Design Vision

"The Backend Architect's Dashboard" — Un portfolio que se siente como un
Network Operations Center (NOC) o una herramienta de monitoreo de alto nivel.
Cada sección es un "módulo" del sistema. El visitante es un operator que
inspecciona un ecosistema backend vivo.

---

## 🛡️ Paleta de Colores (INTOCABLE)

| Token     | Valor Hex | Uso                              |
|-----------|-----------|----------------------------------|
| Dominant  | `#f2efe9` | Background principal (crema)    |
| Secondary | `#073b4c` | Títulos, bordes, iconos (verde azulado) |
| Accent    | `#ef476f` | Hover, CTAs, alertas (rosa/rojo) |
| Positive  | `#21ba45` | Estados OK                       |
| Negative  | `#c10015` | Estados ERROR                    |
| Info      | `#31ccec` | Estados INFO                     |
| Warning   | `#f2c037` | Estados WARNING                  |

> ⚠️ Esta paleta es sagrada. No cambiar bajo ninguna circunstancia.

---

## 🏗️ Estructura y Componentes

### Header / Toolbar

- [x] **NOC Toolbar**: Logo `dio-quincar.dev` + navegación monospace + social links
- [x] **Translate Toggle**: Botón ES/EN global (debe funcionar en todos los pages)
- [x] **Mobile Drawer**: Menú lateral en < md
- [x] **Logo personalizado**: `dq-logo.png` en `/public/icons/` — integrado en toolbar
- [x] **Botón Twitter/X**: Reintegrado

### IndexPage (Inicio)

- [x] Hero terminal con nombre + seniority
- [x] Seniority: "JAVA BACKEND DEVELOPER | API ARCHITECT" (ES) / "DESARROLLADOR BACKEND JAVA | ARQUITECTO DE API" (EN)
- [x] Grid asimétrico (8+4 cols en desktop)
- [x] Tech cards con border glow
- [x] Demo Management section
- [x] MetricsDashboard
- [x] ProjectCard con feature toggles
- [x] Contact section con form
- [ ] Fix responsive (verificar en mobile)
- [ ] Terminal boot animation (typewriter effect)

### AboutPage (Sobre Mí)

- [x] Refactorizar con mismo estilo NOC/tech-card
- [x] Agregar translate toggle ES/EN (via vue-i18n)

### SwaggerPage (API Docs)

- [x] Refactorizar con mismo estilo NOC/tech-card
- [x] Agregar translate toggle ES/EN (via vue-i18n)

---

## 🕹️ Demo Interactive Features

- [x] **Demo Reset Button**: Llama `POST /api/v1/demo/reset`
- [x] **Feature Toggle Nodes**: ProjectCards con toggles en vivo
- [x] **Swagger Explorer**: Iframe embebido por proyecto
- [ ] **Expandable Console**: En lugar de iframe full-page, módulo colapsable

---

## 🔧 Tech Stack UI

- **Framework**: Quasar + Vue 3 + Composition API
- **Tipografía**: JetBrains Mono (datos técnicos), Inter (body)
- **Grids**: 12-column Quasar responsive (q-col-gutter-lg)
- **Cards**: Border tech-card con glow effects
- **Scrollbar**: Custom style con colores de paleta

---

## 📍 Progress Tracker

### ✅ Completados

| # | Componente | Description |
|---|------------|-------------|
| 1 | Theming | quasar.variables.scss + app.scss |
| 2 | Toolbar | NOC style (MainLayout.vue) |
| 3 | Layout | Grid-based IndexPage |
| 4 | Traducción | Seniority ES/EN + translate toggle |
| 5 | Estilos | Tech-card border glow system |
| 6 | Features | Demo Management section |
| 7 | Dashboard | MetricsDashboard + Prometheus polling |
| 8 | Cards | ProjectCard con feature toggles |
| 9 | Colors | Color palette aplicada |
| 10 | Social | Reintegrar botón Twitter/X |
| 11 | i18n | Translate global en IndexPage |
| 12 | Logo | Logo personalizado `dq-logo.png` integrado en toolbar |
| 13 | i18n | vue-i18n integrado (ES/EN translations centralizados) |
| 14 | Layout | MainLayout refactorizado con $t() |
| 15 | Pages | IndexPage refactorizado con $t() |
| 16 | About | AboutPage refactorizado con estilo NOC + $t() |
| 17 | Swagger | SwaggerPage refactorizado con contenedor NOC + $t() |
| 18 | Metrics | MetricsDashboard refactorizado con $t() |
| 19 | Cards | ProjectCard refactorizado con $t() + tech-card styling |
| 20 | Errors | ErrorNotFound refactorizado con $t() |
| 21 | Hero | Botón Core Projects → scroll funcional (R1) |
| 22 | Hero | Traducción completa del Hero Terminal (R2) |
| 23 | UI | Dark Mode con toggle en toolbar (CSS Custom Properties) |
| 24 | Projects | ProjectCard con tech-badges MDI icons + descripción mejorada |
| 25 | Projects | Swagger con URL correcta (VITE_API_BASE_URL) + serviceUrl para métricas |
| 26 | Projects | Tech-badges con tooltip, color accent, tamaño visible |
| 27 | About | Dark theme aplicado al área de descarga de CV |

---

### 🔴 Issues Pendientes (por resolver)

| # | Componente | Issue | Prioridad | Estado |
|---|------------|-------|-----------|--------|
| R3 | Projects Section | Título "ACTIVE_MODULES" confuso para visitantes | ALTA | ✅ RESUELTO |
| R4 | ProjectCard | Descripción vaga del Feature Flag System | ALTA | ✅ RESUELTO |
| R5 | ProjectCard | Tech badges poco visibles/descritos | MEDIA | ✅ RESUELTO |
| R6 | IndexPage | ECOSYSTEM HEALTH card mejorado con estilo NOC | MEDIA | ✅ RESUELTO |
| R7 | IndexPage | PROTOCOL_RESET_CONTROL con feedback y traducciones | MEDIA | ✅ RESUELTO |
| R8 | MetricsDashboard | No se siente como "terminal hacker" — necesita más datos en vivo y visualización mejorada | MEDIA | ⏳ |

---

### ⚠️ Conflictos Actuales

> ✅ **TODOS LOS CONFLICTOS RESUELTOS**
> - Las URLs se han unificado a través del Gateway (8080).
> - El enrutamiento del Actuator en el Gateway se corrigió para apuntar a `/actuator/**` en el backend.
> - `ProjectCard.vue` ahora utiliza los endpoints correctos de la API (`/check`, `/enable`, `/disable`) y el Gateway para métricas.

---

### 🔧 Bugs Recientes (Resueltos)

| # | Fecha | Bug | Causa | Solución |
|---|-------|-----|-------|----------|
| B1 | Mayo 2026 | Redirect 401 generaba ruta inválida `/#/api/feature-flags/auth/api/feature-flags/auth/login` | Concatena `${AUTH}${LOGIN}` = doble ruta | Eliminé redirect a login en `axios.js`, ahora solo hace log |
| B2 | Mayo 2026 | Gateway no tenía ruta para actuator - métricas retornaban 401 | Reescribía `/api/v1/feature-flags/actuator/...` a `/api/v1/features/actuator/...` | Agregué ruta específica `/api/v1/feature-flags/actuator/**` → `/actuator/${segment}` |
| B3 | Mayo 2026 | `/actuator/metrics/**` requería auth en backend | No estaba en whitelist de SecurityConfig | Agregué `/actuator/metrics/**` a permitAll() |

---

### 📊 Estado de Servicios (Docker)

| Servicio | Puerto | Estado |
|----------|--------|--------|
| Frontend | 9000 | ✅ Corriendo |
| Gateway | 8080 | ✅ Healthy |
| Redis | 6379 | ✅ Healthy |
| Backend (Feature Flag API) | 8081 | ✅ Corriendo |

---

### 📋 TODO (Backlog)

**Responsive & Animations**
- [ ] Fix responsive en IndexPage (verificar en mobile)
- [ ] Terminal boot sequence animation (typewriter effect)

**Features**
- [ ] Expandable Swagger Console en lugar de iframe full-page
- [ ] Circuit breaker visualization avanzada
- [ ] Live observability: métricas en tiempo real del Gateway

---

### 🎯 FUTURE (Ideas para después)

- Expandable Swagger Console (mover a TODO si prioridad)
- Circuit breaker visualization avanzada (mover a TODO si prioridad)
- Boot sequence animation en hero terminal (mover a TODO si prioridad)
- Live observability: métricas en tiempo real del Gateway (mover a TODO si prioridad)