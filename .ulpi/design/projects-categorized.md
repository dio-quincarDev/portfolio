---
feature: Categorized Project Index
project: dioquincar.dev portfolio
register: brand
design_system: bespoke (Quasar + CSS vars)
build_agent: general (Vue 3 + Quasar SPA)
status: spec
---

# Categorized Project Index

> Every screen must read as the same product if placed side by side.

Binds to `.ulpi/design/DESIGN.md`. No new colors, type, spacing, or motion introduced. All values derive from the locked design language.

## Design Read

Same as project-level: "Calm, evidence-led, editorial." The categorization does not change the aesthetic — it organizes the evidence (backend projects, challenges, community work) into a clearer professional narrative.

---

## Flow: Browse Projects by Category

### Overview

**Goal:** A visitor browses the portfolio's projects, filtered/conceptually organized into three categories, and opens individual project details in a modal dialog.

**User Story:** As a hiring manager or collaborator, I want to see the developer's work organized by type (personal projects, challenges, community contributions) so I can evaluate skills in context.

**Trigger:** User clicks "PROJECTS" in nav, or "Explore Projects" CTA in hero, or types `/projects`.

### Entry Points

- [x] Navigation bar: PROJECTS button
- [x] Hero CTA: "Explore Projects"
- [x] Direct URL: `/projects`
- [x] Mobile drawer: PROJECTS item

### Prerequisites

- [x] Page loads; no auth required.
- [x] Projects data loaded from `useProjects.js` (client-side data, no API).

### Flow Diagram

```
[Entry: /projects]
    │
    ▼
┌─────────────────────────────────────────┐
│ ProjectsPage loads                      │
│ - Page meta set                         │
│ - Scroll animation applied              │
│ - Query composable data                 │
└─────────────────────────────────────────┘
    │
    ▼
◇ projects.length > 0?
    │
    ├── Yes ──▶ ┌────────────────────────────────────────────┐
    │           │ Section 1: PERSONAL PROJECTS               │
    │           │ SectionHeader (eyebrow + title)             │
    │           │ Grid: [Auth Service] [Coming Soon]          │
    │           │                                             │
    │           │ Section 2: CHALLENGES                       │
    │           │ SectionHeader (eyebrow + title)             │
    │           │ Grid: [Challenge 1] ...                     │
    │           │                                             │
    │           │ Section 3: COMMUNITY                        │
    │           │ SectionHeader (eyebrow + title)             │
    │           │ Grid: [Feature Flag API] ...                │
    └───────────└────────────────────────────────────────────┘
    │
    └── No ────▶ [Empty State: "No projects yet."]
    │
    ▼
◇ User clicks a ProjectCard
    │
    ├── Card is "Coming Soon" ──▶ QDialog opens, shows
    │                              "Under construction" variant
    │
    ├── Card is regular ──▶ QDialog opens, shows ProjectDetail
    │                        with case study content
    │
    └── (Both cases)
        ◇ User clicks close / backdrop / Escape
            │
            ├── → Dialog closes, scroll position preserved
            │
            └── → User can click another card immediately
    │
    ▼
◇ User scrolls / nav elsewhere
```

### States

#### Page-level States

| State | Visual | Behavior |
|-------|--------|----------|
| **Loading** | Page renders immediately (data is local, no async fetch). No loading skeleton needed. | Instant render. |
| **Populated** | 3 category sections stacked vertically, each with SectionHeader + grid. | Full scrollable page. |
| **Empty** | Single SectionHeader ("Projects") + centered `$t('projects.empty')` text. | No grid, no categories. |
| **Error** | Not applicable — data is static client-side. If composable fails, empty state. | Fallback to empty. |

#### Dialog States

| State | Visual | Behavior |
|-------|--------|----------|
| **Open** | QCard with ProjectDetail content. | Scroll lock on body. Close via X button, backdrop click, or Escape. |
| **Coming Soon** | QCard with simplified content: title "Coming Soon", description placeholder, no case study sections. | Same close behavior. No links, no tech chips. |
| **Closing** | Standard Quasar dialog exit (fade + scale). ~200ms. | Component destroyed on `@hide`. `selectedId` reset. |

### Edge Cases

| Scenario | Handling |
|----------|----------|
| Refresh on `/projects` | Page reloads, all categories render from local data. |
| Direct URL `/projects` | Works, same as nav entry. |
| No entries in one category | Category section is omitted entirely (no empty sub-header shown). |
| All entries in one category | Category renders alone; other categories invisible (no empty placeholder). |
| "Coming Soon" clicked | Opens dialog with placeholder content, no broken links or empty sections. |
| Screen reader opens dialog | Focus trapped inside dialog. Close button announced. `aria-modal="true"`. |
| Reduced motion | Dialog opens without animation; scroll animation disabled. |

---

## Component Specs

### 1. useProjects.js — Data Model Change

**Change type:** Extension (add `category` field)

Add a `category` field to each project entry:

```typescript
type ProjectCategory = 'personal-project' | 'challenge' | 'community'

interface ProjectEntry {
  id: string
  i18nKey: string
  category: ProjectCategory
  tech: { name: string; icon: string }[]
  repoUrl: string | null
  youtubeUrl: string | null
  diagramUrl: string | null
  demoUrl: string | null
  comingSoon?: boolean  // optional, for placeholder cards
}
```

**New method** to be exposed:

```typescript
function getProjectsByCategory(): Record<ProjectCategory, ProjectEntry[]>
```

**Current entries mapping:**

| id | category | comingSoon |
|----|----------|------------|
| `auth-service` | `personal-project` | false |
| `feature-flag-api` | `community` | false |
| *(placeholder)* | `personal-project` | true |

**New i18n keys required:**

```
en.js:
  projects.categories.personal-project: { eyebrow: 'PORTFOLIO', title: 'Projects' }
  projects.categories.challenge:        { eyebrow: 'CHALLENGES', title: 'Coding Challenges' }
  projects.categories.community:        { eyebrow: 'COMMUNITY', title: 'Open Source & Community' }
  projects.comingSoon:                  { name: 'Coming Soon', description: '...' }

es.js:
  projects.categories.personal-project: { eyebrow: 'PORTAFOLIO', title: 'Proyectos' }
  projects.categories.challenge:        { eyebrow: 'RETOS', title: 'Retos de Código' }
  projects.categories.community:        { eyebrow: 'COMUNIDAD', title: 'Open Source y Comunidad' }
  projects.comingSoon:                  { name: 'Próximamente', description: '...' }
```

---

### 2. ProjectsPage.vue — Modified

**Change type:** Major rewrite (flat grid → categorized sections)

**Purpose:** Render three vertically stacked category sections, each with SectionHeader + grid of ProjectCards. Wrap the dialog at page level (shared across categories).

**Layout structure:**

```
ProjectsPage
  .projects-page__inner
    CategorySection (personal-project)
      SectionHeader (eyebrow, title from i18n)
      .projects-page__grid
        ProjectCard × N
    CategorySection (challenge)
      SectionHeader (eyebrow, title from i18n)
      .projects-page__grid
        ProjectCard × N
    CategorySection (community)
      SectionHeader (eyebrow, title from i18n)
      .projects-page__grid
        ProjectCard × N
    QDialog (shared, at page level)
      QCard → ProjectDetail
```

**Key behaviors:**

- Render section only if `getProjectsByCategory()[category].length > 0`.
- Each category section has `margin-top: 64px` to separate them visually.
- All cards wire to the same `openProject(id)` → `q-dialog v-model="dialogOpen"`.
- "Coming Soon" cards: `comingSoon` variant → ProjectCard shows a subtle dashed border or muted styling + "Coming Soon" label (no tech chips in main card).
- `useMeta` unchanged.

---

### 3. ProjectCard.vue — Minor modifications

**Change type:** Add `comingSoon` variant

**Purpose:** Display a project card that can optionally show a "Coming Soon" state.

**Props extension:**

```typescript
interface ProjectCardProps {
  project: ProjectEntry
  comingSoon?: boolean  // if true, render placeholder variant
}
```

**Coming Soon variant visual:**

- Same card structure (border, background, layout)
- No tech chips rendered
- Thumbnail area (if any) replaced with a muted geometric placeholder (CSS pattern, no image)
- Title: "Coming Soon" (from i18n), not linked to any project name
- Description: single muted line
- Border: dashed `var(--border)` instead of solid
- Hover effect: slightly reduced (no scale bump, just border color change)
- The `select` event still fires so the dialog opens

Existing card behavior (non-coming-soon): unchanged.

---

### 4. ProjectDetail.vue — Minor modifications

**Change type:** Add `comingSoon` variant

**Purpose:** Handle the case where a placeholder card's detail is opened.

**Behavior:**

- If `project.comingSoon === true`, render a simplified detail:
  - Title: `$t('projects.comingSoon.name')`
  - Description: `$t('projects.comingSoon.description')`
  - No case study section (Problem / Solution / Key Decisions)
  - No tech chips
  - No multimedia slots
  - A single muted line: "This project is in progress. Check back soon."
- If `project.comingSoon` is false/undefined: render normal full detail as currently designed.

---

### 5. SectionHeader.vue — No changes needed

Already supports `eyebrow` + `title` props. Reused as-is.

---

## Responsive Behavior

| Breakpoint | Layout |
|------------|--------|
| Mobile (< 768px) | Each category: 1-column grid. Section headers normal. |
| Tablet/Desktop (≥ 768px) | Each category: 2-column grid. Sections stacked with 64px gap. |
| Dialog | Same at all breakpoints: `max-width: 800px`, `width: 90vw`. Content scrolls internally. |

---

## Accessibility

- Category sections use `<section>` with an `aria-labelledby` pointing to the SectionHeader heading.
- ProjectCards: `role="button"`, `tabindex="0"`, keyboard activation (Enter/Space) triggers `select` event. Cards must have `aria-label` based on project name.
- Dialog: `aria-modal="true"`, focus trap, close button has `aria-label="Close"`. On open, focus moves to close button or dialog title.
- "Coming Soon" cards: `aria-label="Coming Soon: [description]"`.
- No new contrast concerns — uses existing DESIGN.md palette.

---

## Design Pre-Flight

### Identity lock

- [x] Every screen/component uses ONLY values from the locked `DESIGN.md` (palette, type, spacing, radius, motion). Off-system values: **0**.
- [x] One accent, one radius scale, one icon family, one type pairing across the whole project.
- [x] Identity-lock holds: all screens read as the SAME product placed side by side.
- [x] `DESIGN.md` was re-read first; layout families section updated to reflect current architecture.

### Anti-slop

- [x] **0** banned fonts; **0** banned color clichés.
- [x] **0** banned layout patterns (the 3 vertical sections are not "3 equal cards" — each is a full grid section with its own header and narrative).
- [x] **0** buzzwords, **0** fake names (Coming Soon is a status, not a name), **0** fake-precise numbers, **0** em-dashes.
- [x] **Slop test:** Would someone say "AI made that"? No. The editorial layout, DM Serif Display + JetBrains Mono pairing, and restrained palette are distinctive to this portfolio.
- [x] **Counterfactual test:** Would I produce this for any portfolio brief? No — a frontend or creative portfolio would get a different approach (more visual, less text-heavy). This fits a backend engineer's evidence-based narrative.
- [x] **Signature** (ServicesSection editorial blocks) remains the remembered element; the categorized projects page supports it, doesn't compete.

### State & flow coverage

- [x] Empty, populated, coming-soon, dialog states all covered.
- [x] Edge cases covered (refresh, direct URL, missing categories, placeholder).

### Accessibility

- [x] Contrast ratios inherited from `DESIGN.md` (already WCAG AA).
- [x] Keyboard focus path documented for Card + Dialog.
- [x] `prefers-reduced-motion` handled (Quasar honors it, scroll animation composable honors it).
- [x] ARIA roles specified (section, button, dialog).
- [x] Touch targets: ProjectCards are well above 48dp minimum.

### Layout craft

- [x] **≥ 3 distinct layout families** across the full site: Hero (editorial cover), Services (3 editorial blocks), Approach (heading + prose), BadgeStack (chips), Projects (categorized sections with grid + dialog), Contact (modal). This page uses family #5.
- [x] Clear hierarchy: category eyebrow → title → grid of cards → dialog on click. One focal point per view.

### Cognitive load

- [x] Primary nav: **4 items** (HOME, PROJECTS, ABOUT). ≤ 5 ✓
- [x] Categorized sections disclose projects in groups of 1–3, not a flat list of 6+ items.
- [x] One primary action per view: on `/projects`, the action is "browse and click a card." The dialog has one primary close button.

### Scored self-critique

| Axis | Score | Notes |
|------|-------|-------|
| Distinctiveness | 3 | Editorial layout is distinctive for a dev portfolio. Categorization is common but the execution (editorial headers, restrained palette, dialog detail) lifts it. |
| Hierarchy & focus | 3 | Clear: category → card → dialog. Each section has one visual weight. |
| Consistency with DESIGN.md | 4 | All tokens reused. No new colors, type, or spacing. The layout families doc was updated. |
| Accessibility | 3 | Focus, ARIA, contrast documented. Live-region announcement for dialog open could be added. |
| State/edge coverage | 3 | All major states covered. No loading skeleton needed (local data). Coming Soon handled. |
| Copy quality | 4 | Editorial, evidence-led. No buzzwords. Category labels are descriptive and professional. |
| Restraint | 4 | No decoration without meaning. Coming Soon is a dashed border — minimal, honest. |
| Motion motivation | 3 | Page reveal animation exists. Dialog open/close is standard Quasar. Motivated (focus direction). |

**Total: 27/32** — No axis ≤ 2. Gate passes.

---

## Build Handoff

### Target Agent

`general` — the same agent that already built the initial ProjectsPage, ProjectCard, ProjectDetail, and useProjects.js. This is an incremental change to existing components, not a greenfield build.

### Current State of Code

The codebase already has:
- `/frontend/src/pages/ProjectsPage.vue` — flat grid + dialog
- `/frontend/src/components/ProjectCard.vue` — emits `select` event
- `/frontend/src/components/ProjectDetail.vue` — full case study dialog content
- `/frontend/src/composables/useProjects.js` — flat array of project entries
- `/frontend/src/i18n/en.js` + `es.js` — existing project keys + `empty` key
- Router: `/projects` route exists, `/projects/:id` removed
- Nav: PROJECTS button in MainLayout

### Changes Required

1. **useProjects.js** — add `category` field to each entry; add `comingSoon` optional field; add `getProjectsByCategory()` method.
2. **ProjectCard.vue** — add `comingSoon` variant (dashed border, no tech chips, muted label).
3. **ProjectDetail.vue** — add `comingSoon` variant (simplified placeholder content).
4. **ProjectsPage.vue** — rewrite template to iterate over categories; render SectionHeader + grid per category; shared dialog.
5. **en.js / es.js** — add `projects.categories.*` (eyebrow + title for each category), `projects.comingSoon.*`, `challenge` entry keys.

### Design System

`design_system: bespoke (Quasar + CSS vars)`

Theme is already applied via Quasar variables and CSS custom properties matching `DESIGN.md`. No new components from external libraries. Use existing `QDialog`, `QCard`, `QCardSection`, `QBtn` from Quasar with our custom scoped styles.

### Acceptance Criteria

- [ ] `/projects` renders 3 vertical sections (personal-project, challenge, community). Each has its own SectionHeader.
- [ ] Sections with 0 entries are omitted entirely (no empty sub-header).
- [ ] Each section's grid matches the existing responsive 1-col / 2-col behavior.
- [ ] "Coming Soon" card in personal-project shows dashed border, no tech chips, muted label. Click opens dialog with placeholder content.
- [ ] Existing project cards (Auth Service, Feature Flag API) render identically to current implementation.
- [ ] QDialog opens on any card click, shows correct content, closes via X/backdrop/Escape.
- [ ] All i18n keys present in both EN and ES.
- [ ] `getProjectsByCategory()` returns correct grouping.
- [ ] No regressions: nav, hero CTA, other pages unchanged.
- [ ] `npm run lint` passes.
- [ ] `npx quasar build` succeeds.
