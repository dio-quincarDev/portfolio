# Portfolio — Feature Spec

> Bound to `.ulpi/design/DESIGN.md`.

## Overview

Personal portfolio for Diogenes Quintero. Bilingual (ES/EN). Static SPA served by Nginx. EmailJS for contact form. Two routes: Home (`/`), About (`/about`), and project detail (`/projects/:id`).

**Target audience:** CTOs / Tech Leads.
**Goal:** Get hired, freelance, or consulting engagements.

---

## Flow 1: Homepage Visit

**Goal:** Visitor understands who Diogenes is, sees capability proof, browses projects.

### Steps
1. **Hero** — name, title, capabilities line, 3 CTAs.
2. **Services** — 3 editorial blocks (API Design, Architecture, Production).
3. **Approach** — section heading + text.
4. **BadgeStack** — categorized tech stack with per-category color.
5. **Projects** — cards linking to `/projects/:id`.
6. **Contact** — button opens modal form.

### States
| State | Handling |
|-------|----------|
| Initial load | Staggered fade-in of sections, `prefers-reduced-motion` disables |
| Language toggle | Instant swap, no reload |
| Dark mode toggle | Instant theme swap, persisted |
| Modal form | QDialog, focus trap, close on backdrop click |

---

## Flow 2: Project Detail Page

**Goal:** Full case study with problem, solution, key decisions.

### Steps
1. Back link to homepage.
2. Project header (name + GitHub/YouTube links).
3. Description.
4. Case blocks: Problem / Solution / Key Decisions.
5. Tech chips.

---

## Flow 3: About Page Visit

**Goal:** Learn background, skills, download CV.

### Steps
1. Name + bio.
2. Skills cards.
3. Connect + CV download + social links.

---

## Component Specs

### 1. SectionHeader

**Purpose:** Marks every major section. Editorial, not technical.

**Visual:** Eyebrow (JetBrains Mono 10px uppercase, muted) + optional title (DM Serif Display 22/28px, text) + hairline divider.

### 2. HeroSection

**Purpose:** First impression. Editorial cover, left-aligned.

**Layout:** Single column, max-width 1100px. Name (DM Serif Display 32/40px), title (uppercase Sora 12px, 2px tracking, accent), capabilities line (Sora 14px muted), tagline (Sora 18px), CTA row.

### 3. ServicesSection

**Purpose:** Capability proof as 3 editorial text blocks.

**Layout:** Single column, max-width 700px. Each block: title (DM Serif Display 20px) + text (Sora 14px, line-height 1.7). Hairline dividers between blocks.

### 4. ApproachSection

**Purpose:** Engineering philosophy as concise text block.

**Layout:** SectionHeader + single paragraph of text (Sora 14px, max-width 700px).

### 5. BadgeStack

**Purpose:** Tech stack shown as categorized chips with per-category color.

**Layout:** SectionHeader + groups. Each group: heading (JetBrains Mono 10px uppercase, color matches category) + colored divider line + flex-wrap row of pill chips (border in category color, border-radius 9999px).

### 6. ProjectCard (homepage)

**Purpose:** Project teaser linking to full detail page.

**Layout:** Card within grid. Name (DM Serif Display 20px) + description (Sora 14px muted) + "View case" arrow. Full article on project page.

**Accessibility:** `<article>` `aria-label`=name; clickable card with `router-link`.

### 7. ProjectPage

**Purpose:** Full case study at `/projects/:id`.

**Layout:** Back link → header row (name + GitHub/YouTube) → description → case blocks (Problem/Solution/Key Decisions) → tech chips.

### 8. ContactSection

**Purpose:** Reach out via modal form.

**Layout:** CTA button "Send message" → opens QDialog with compact form (name, email, message fields). EmailJS integration. Close on submit or backdrop click.

**Accessibility:** QDialog focus trap, `aria-label` on modal, form validation.

### 9. BadgeStack

**Purpose:** Tech stack categorized by type with per-category color coding.

**Visual:** SectionHeader "TECNOLOGÍAS" / "STACK" + groups. Each group: category heading (JetBrains Mono 10px, uppercase, letter-spacing 1px, category color) + hairline divider in category color + flex-wrap pill chips (border 1px solid category color, radius 9999px, Sora 12px, text role). Pills have hover tint.

### 10. MainLayout

**Header:** logo "dioquincar.dev" (JetBrains Mono 700); nav HOME / ABOUT; language toggle, dark toggle, social links. Mobile drawer.

**Footer:** minimal copyright + social links.

---

## Build Handoff

**Design system:** bespoke — build on Quasar primitives, theme with locked tokens.
**Acceptance criteria:**
- [ ] All text matches i18n keys (ES + EN).
- [ ] Palette uses ONLY values from `DESIGN.md` (CSS vars: `--bg`, `--surface`, `--text`, `--muted`, `--subtle`, `--border`, `--accent`).
- [ ] Type uses ONLY DM Serif Display (display) + Sora (body) + JetBrains Mono (utility).
- [ ] Contact form uses QDialog modal pattern with EmailJS.
- [ ] Projects route to `/projects/:id` with full case study layout.
- [ ] BadgeStack shows categorized chips with per-category color.
- [ ] Dark mode re-derived palette passes AA contrast.
- [ ] Responsive sm/md/lg; `prefers-reduced-motion` honored.
- [ ] Visible focus on all interactive elements.
- [ ] Language toggle works globally.
- [ ] `npm run lint` passes.
