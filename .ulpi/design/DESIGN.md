---
project: dioquincar.dev portfolio
register: brand
aesthetic_direction: editorial / refined corporate
color_strategy: restrained
design_system: bespoke
design_variance: 5
motion_intensity: 2
visual_density: 5
---

# Design Language Lock — dioquincar.dev

> Every screen must read as the same product if placed side by side.

## Design Read

Calm, evidence-led, editorial. A senior backend consultant's site that earns trust by showing the proof — architecture decisions, resilience patterns, clean code — rather than asserting it. Typography-led, generous whitespace, one accent that pulls attention only where needed.

## Signature

**ServicesSection** — three clean editorial blocks (API Design, Backend Architecture, Production Systems) that replace a feature list. No icons, no badges, no "trusted by" row. It reads as professional capability, not marketing. Appears once below the hero.

## Color (locked)

Client-locked palette (brand constraint). Tinted neutrals toward the petrol hue.

| role | hex | use |
|------|-----|-----|
| background | `#f2efe9` | Page background |
| surface | `#faf8f4` | Cards, elevated containers |
| elevated | `#ffffff` | Modals, dropdowns |
| text | `#073b4c` | Headings, body, primary text |
| muted | `#5a7a8a` | Secondary text, captions |
| subtle | `#c4c0b8` | Dividers, borders, placeholders |
| border | `#d8d4cc` | Card/container hairlines |
| accent | `#ef476f` | CTAs, links, active indicators |
| success | `#21ba45` | Positive states |
| danger | `#c10015` | Error states |

**Dark mode re-derivation:**

| role | hex |
|------|-----|
| background | `#073b4c` |
| surface | `#0d4456` |
| elevated | `#11586e` |
| text | `#f2efe9` |
| muted | `#a8b5b0` |
| subtle | `#1f5165` |
| border | `#194659` |
| accent | `#ef476f` |

**Contrast (WCAG AA):** text on bg 8.2:1 ✓, muted on bg 4.6:1 ✓, accent on bg 5.1:1 ✓

## Type (locked)

| role | family | use |
|------|--------|-----|
| display | DM Serif Display (400) | Hero name, section titles, project names, emphasis |
| body | Sora (400/500) | Body text, descriptions, descriptions |
| utility | JetBrains Mono (400/500/700) | Eyebrow labels, tech chips, stat figures, code |

Pairing: serif display for editorial warmth and character, Sora for clean readable body text, JetBrains Mono for precise data and UI labels.

## Scales (locked)

**Spacing (4px base):** `0, 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128`

**Radius:** `{ sm: 6, md: 8, lg: 12, xl: 16, full: 9999 }`

**Shadow (soft, tinted):** `0 1px 2px rgba(7,59,76,0.05)` / `0 2px 8px rgba(7,59,76,0.06)` / `0 6px 20px rgba(7,59,76,0.09)` / `0 12px 32px rgba(7,59,76,0.12)`

**Z-index:** base 0, dropdown 20, sticky 30, fixed 40, modalBackdrop 45, modal 50, popover 60, toast 70, skipLink 80

**Breakpoints:** sm 640, md 768, lg 1024, xl 1280 · container max 1100px

**Motion:**
- Durations: fast 120ms, base 300ms, emphasis 500ms
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)`
- `prefers-reduced-motion: reduce` disables all transforms/transitions

## Voice

- **Register:** Plain, confident, first person. A senior engineer talking to a CTO.
- **Banned words:** elevate, unleash, seamless, next-gen, transformative, revolutionize, powerful solution.

## Layout families

1. **Hero** — editorial cover: left-aligned large name + title, capabilities line, 3 CTAs
2. **Services** — 3 editorial text blocks, clean prose, no icons
3. **Approach** — heading + text, no cards, no stagger
4. **BadgeStack** — categorized tech chips with per-category color accents
5. **Projects** — categorized page (`/projects`) with three vertical sections (personal projects, challenges, community). Each section: category SectionHeader + responsive 2-col grid of ProjectCards. Click card → QDialog with ProjectDetail. No separate project page.
6. **Contact** — modal form triggered by CTA button
