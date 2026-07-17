# Portfolio — Feature Spec (v2: editorial / refined corporate)

> Every screen must read as the same product if placed side by side.

Bound to `.ulpi/design/DESIGN.md` (editorial / refined corporate, palette locked, Signature = Capability Ledger).

## Overview

Personal portfolio for Diogenes Quintero. Bilingual (ES/EN). Static SPA served by Nginx. **No live backend.**
**Hybrid scope:** the site *shows* engineering capability through proof (the Capability Ledger, case-study
problem/solution blocks, architecture decisions) — it does not run live demos, health checks, or Swagger.
Two routes: Home (`/`) and About (`/about`).

**Target audience:** CTOs / Tech Leads.
**Goal:** Get hired, freelance, or consulting engagements.
**Positioning:** "Backend developer who builds resilient systems on free-tier infrastructure."

---

## Flow 1: Homepage Visit

**Goal:** Visitor understands who Diogenes is, sees the proof, and browses projects.
**Entry:** Direct URL, social link, search result.
**Prerequisites:** None.

### Steps
1. **Hero** — name, title, tagline, 3 CTAs (Explore projects / How I work / Contact).
2. **Capability Ledger** — the Signature proof strip (real metrics).
3. **Approach** — 4 zigzag blocks of engineering philosophy.
4. **Projects** — asymmetric editorial grid of project case studies.
5. **Contact** — centered mailto CTA.

### States
| State | Handling |
|-------|----------|
| Initial load | Staggered fade-in of sections (300ms each, 100ms delay), `prefers-reduced-motion` disables |
| Language toggle | Instant swap of all text, no reload |
| Dark mode toggle | Instant theme swap, persisted |
| Scroll | Smooth scroll to anchored sections; one focal point per view |

---

## Flow 2: About Page Visit

**Goal:** Learn background, skills, download CV.
**Entry:** Nav link, direct URL.

### Steps
1. **Header** — SectionHeader "ABOUT" + name + bio.
2. **Skills** — 4 soft cards (what he brings to a team).
3. **Tech stack** — ruled list with dividers.
4. **Connect** — CV download (ES/EN) + LinkedIn/GitHub.

---

## Component Specs

### 1. CapabilityLedger (Signature)

**Purpose:** One full-width proof strip of real engineering evidence. The memorable element.

**Layout:** horizontal ruled row, hairline top + bottom border (accent on the rule), items separated by vertical hairlines.

**Content (4 cells):**
```
1 GB RAM   |   99.9% uptime   |   $0 / mo   |   ARM64 + AMD64
```
Each cell: figure (JetBrains Mono, 20px, text role) above label (IBM Plex Sans, 12px, muted).

**Accessibility:** `<dl>` with `<dt>` figure / `<dd>` label; `aria-label` per cell. Not decorative.

**Responsive:** 4 cols ≥768px; 2x2 grid <768px.

---

### 2. SectionHeader

**Purpose:** Marks every major section. Editorial, not technical.

**Visual:**
```
PROJECTS                      ← eyebrow: JetBrains Mono, 12px, uppercase, letter-spacing 1px, muted
Case studies that prove it    ← title: IBM Plex Sans 700, 22px (mobile) / 28px (desktop), text role
────────────────────────────  ← hairline divider (subtle), 1px, full width, 16px below title
```
- Title optional per section (Hero/Ledger have none).
- Renders as `<h2>` `aria-level="2"`; eyebrow is decorative (`aria-hidden`).

---

### 3. HeroSection

**Purpose:** First impression. Editorial cover, left-aligned.

**Layout:** 2-col at ≥1024px (8/4); stacked <1024px. Generous vertical air (padding 64–96px).

**Left (8):** name (IBM Plex Sans 700, 32px/40px), title (IBM Plex Sans 500, 14px, uppercase, 2px tracking, muted), tagline (IBM Plex Sans 400, 18px, max-width 580px, line-height 1.7), CTA row.
**Right (4):** quiet stat stack — 2 blocks (label IBM Plex Sans 12px muted, value JetBrains Mono 24px accent): "Systems built" / "Free tier".

**CTAs:** Primary "Explore Projects" (filled accent, white text, radius 6px). Secondary "How I Work" (outline, text border). Tertiary "Contact" (outline accent). All `.btn`, focus ring 2px accent.

---

### 4. ApproachSection (zigzag)

**Purpose:** Engineering philosophy as 4 alternating blocks.

**Layout:** 2-col zigzag ≥768px (text | icon, then icon | text). Stacked <768px.

**Card:** surface bg, radius 12px, border hairline, soft shadow-default; hover → shadow-md, translateY(-3px). Icon 28px accent, title IBM Plex Sans 700 16px, text IBM Plex Sans 400 14px muted, line-height 1.6.

**Content:** Optimize Before Scale · Design for Failure · Ship Multi-Arch · Document Decisions.

**Accessibility:** each block `<article>`, title `<h3>`, icon `aria-hidden`.

---

### 5. ProjectCard (editorial case study)

**Purpose:** Describe a project with problem/solution proof.

**Layout:** full-width card within asymmetric grid.

**Structure:**
- Header row: name (IBM Plex Sans 700, 18px) + GitHub/YouTube icon links (muted → accent hover).
- Description: IBM Plex Sans 400, 14px, muted, 2–3 sentences.
- Case block: "THE PROBLEM" (accent, mono, 11px uppercase) + text; "THE SOLUTION" (muted, mono, 11px) + text; "KEY DECISIONS" + bullet list. Clean prose, no engineering-doc border treatment — just quiet dividers.
- Tech chips: row of soft rounded chips (radius 9999, subtle border, icon + name on hover).
- Footer: "View source" link (outline btn).

**States:** Default surface + hairline; Hover shadow-md + translateY(-2px).

**Accessibility:** card `<article>` `aria-label`=name; GitHub link `aria-label`; chips `aria-label`.

---

### 6. TechStackSection (ruled list)

**Purpose:** Technologies as a clean ruled list.

**Layout:** single column, hairline dividers between rows. No cards, no `>` prompt.

**Structure:** each row — tech name (JetBrains Mono 14px, text role) + optional note (muted). 1px subtle divider.

**Accessibility:** `<ul>`/`<li>`.

---

### 7. ContactSection

**Purpose:** Reach out. Centered, single column, max-width 480px.

**Structure:** SectionHeader "CONTACT" + subtext (IBM Plex Sans 14px muted) + one primary mailto button "Send email". No form.

**Accessibility:** link text descriptive; visible focus.

---

### 8. MainLayout (nav + footer)

**Header:** logo "dioquincar.dev" (JetBrains Mono 700); nav HOME / ABOUT (IBM Plex Sans 12px uppercase, 1px separator); language toggle (globe), dark toggle (sun/moon), GitHub, X, LinkedIn. Mobile: hamburger drawer. No `// sys:online` or terminal chrome.

**Footer:** minimal copyright + social links (IBM Plex Sans 12px muted).

**Accessibility:** `<nav aria-label="Main navigation">`; drawer focus trap; skip link "Skip to main content".

---

## Build Handoff

**Target agent:** `quasar-skilld` (Quasar/Vue 3 Composition API specialist).
**Design system:** bespoke (brand register) — build on Quasar primitives, theme with our locked tokens.
**Acceptance criteria:**
- [ ] All text matches i18n keys (ES + EN) in `src/i18n/`.
- [ ] Palette uses ONLY values from `DESIGN.md` (CSS vars: `--bg`, `--surface`, `--text`, `--muted`, `--subtle`, `--border`, `--accent`).
- [ ] Type uses ONLY IBM Plex Sans (display/body) + JetBrains Mono (utility/data).
- [ ] Radius soft (cards 12px, buttons 6px); no sharp `0` corners; no `tech-card`/`cyber-button`/`border-glow`.
- [ ] Capability Ledger present once on home, as `<dl>`, real metrics only.
- [ ] SectionHeader editorial style (eyebrow + title + hairline), no `■` square / ruled-line signature.
- [ ] No backend deps (no axios, no health, no swagger, no EmailJS — mailto only).
- [ ] Dark mode re-derived palette works; contrast passes AA.
- [ ] Responsive sm/md/lg; `prefers-reduced-motion` honored.
- [ ] Visible focus on all interactive elements; skip link functional.
- [ ] Language toggle works globally; docker-compose single service; `npm run lint` passes.

**Instruction to the build agent:** Implement exactly this spec. Theme Quasar with our locked tokens; do NOT redesign or re-implement the design language.
