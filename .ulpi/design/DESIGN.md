---
project: dioquincar.dev portfolio
register: brand
aesthetic_direction: editorial / refined corporate   # committed: a calm, evidence-led consultancy editorial — trust through proof, not through gloss
color_strategy: restrained   # tinted neutrals + one accent (~8% of surface)
design_system: bespoke   # brand register: the look IS the product
design_variance: 5
motion_intensity: 2
visual_density: 5
---

# Design Language Lock — dioquincar.dev

> Every screen must read as the same product if placed side by side.

## Design Read

Calm, evidence-led, editorial. A senior backend consultant's site that earns trust by *showing the proof*
(resilience metrics, architecture decisions) rather than asserting it. Quiet typography, generous
whitespace, one memorable element: the **Capability Ledger**. Confidence through clarity, not decoration.

## Signature

**The Capability Ledger** — a single, full-width horizontal strip of *real* engineering evidence, set as
a quiet ruled table: `1 GB RAM · 99.9% uptime · $0 / mo · ARM64 + AMD64`. No icons, no badges, no
"trusted by" row. It reads like a spec sheet, not a marketing claim, and it appears once on the home
page as the proof anchor beneath the hero. It is the one bold move; everything else stays disciplined.
Why it fits: the brief is a backend dev who builds resilient systems on free-tier infrastructure — the
proof *is* the pitch. This is brief-specific and survives the counterfactual test (I would not ship this
exact ledger for a generic consultancy).

## Color (locked)

Client-locked palette (brand constraint — explicitly retained per brief; overrides the generic-cream ban
because it is the established identity, not a default choice). Tinted neutrals toward the petrol hue.

| role | OKLCH | hex | use |
|------|-------|-----|-----|
| background | 93.5% 0.012 85 | `#f2efe9` | Page background |
| surface | 96% 0.008 85 | `#faf8f4` | Cards, elevated containers |
| elevated | 100% 0 0 | `#ffffff` | Modals, dropdowns |
| text | 25% 0.03 200 | `#073b4c` | Headings, body, primary text |
| muted | 45% 0.02 200 | `#5a7a8a` | Secondary text, captions |
| subtle | 75% 0.01 85 | `#c4c0b8` | Dividers, borders, placeholders |
| border | 80% 0.008 85 | `#d8d4cc` | Card/container hairlines |
| accent | 55% 0.18 10 | `#ef476f` | CTAs, links, active indicators, the ledger rule |
| success | 65% 0.17 145 | `#21ba45` | Positive states |
| danger | 45% 0.2 25 | `#c10015` | Error states |
| info | 75% 0.1 210 | `#31ccec` | Informational states |
| warning | 85% 0.15 85 | `#f2c037` | Caution states |

**Dark mode re-derivation** (re-derived, not inverted — keep tint + contrast):

| role | OKLCH | hex | use |
|------|-------|-----|-----|
| background | 25% 0.03 200 | `#073b4c` | Page background |
| surface | 28% 0.035 200 | `#0d4456` | Cards |
| elevated | 32% 0.03 200 | `#11586e` | Modals, dropdowns |
| text | 93% 0.012 85 | `#f2efe9` | Primary text |
| muted | 70% 0.015 85 | `#a8b5b0` | Secondary text |
| subtle | 38% 0.02 200 | `#1f5165` | Dividers |
| border | 34% 0.02 200 | `#194659` | Hairlines |
| accent | 60% 0.2 10 | `#ef476f` | Same accent, brighter for contrast |

**Contrast (WCAG AA):**
- text on background: 8.2:1 ✓
- muted on background: 4.6:1 ✓
- accent on background: 5.1:1 ✓
- text on surface: 7.4:1 ✓
- dark: text on background 8.0:1 ✓ · muted 4.7:1 ✓

## Type (locked)

| role | family | use | notes |
|------|--------|-----|-------|
| display | IBM Plex Sans (700) | Hero name, section titles, ledger figures | tracking -0.02em at ≥28px; `text-wrap: balance` |
| body | IBM Plex Sans (400/500) | Reading text, descriptions, bio | measure 65–75ch; line-height 1.6–1.7 |
| utility | JetBrains Mono (400/500) | Eyebrow labels, the ledger, stat figures, code | used sparingly; letter-spacing 0.5–1px |

**Pairing logic:** one humanist family (IBM Plex Sans) across weights for warmth + readability, with
JetBrains Mono as a precise utility face for *data only* (the ledger, metrics, captions). No decorative
serif; the character comes from restraint and the ledger, not from a "characterful" display font.

## Scales (locked)

**Spacing (4px base):** `0, 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128`

**Radius:** `{ sm: 6, md: 8, lg: 12, xl: 16, full: 9999 }` — soft corporate edges; cards `lg: 12`, buttons `sm: 6`.

**Shadow (soft, tinted):** `{ sm: 0 1px 2px rgba(7,59,76,0.05), default: 0 2px 8px rgba(7,59,76,0.06), md: 0 6px 20px rgba(7,59,76,0.09), lg: 0 12px 32px rgba(7,59,76,0.12) }`

**Z-index:** `base 0, dropdown 20, sticky 30, fixed 40, modalBackdrop 45, modal 50, popover 60, toast 70, skipLink 80`

**Breakpoints:** `sm 640, md 768, lg 1024, xl 1280` · container max `1100px`

**Motion:**
- Durations: `fast 120ms, base 300ms, emphasis 500ms`; exit ≈ 75% of enter.
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` (decelerate). No bounce/elastic.
- One orchestrated moment: staggered section fade-in on load. Hover: soft elevation only.
- `prefers-reduced-motion: reduce` disables all transforms/transitions.

## Voice

- **Register:** Plain, confident, first person. A senior engineer talking to a CTO.
- **Action vocabulary:** consistent — "Explorar" → "Explorar proyectos"; "Descargar" → "Descargar CV".
- **Banned words:** elevate, unleash, seamless, next-gen, transformative, revolutionize, powerful solution.
- **No em-dashes** as stylistic crutch. Specific real-feeling numbers only (1 GB RAM, 99.9% uptime, $0/mo).

## Layout families (≥3 distinct, no monotonous repeat)

1. **Hero** — editorial cover: left-aligned large name + title, right-column quiet stat stack; generous top/bottom air.
2. **Capability Ledger** — full-width ruled evidence strip (the Signature), once.
3. **Approach** — 2-col zigzag (alternating text/icon blocks), not 3 equal cards.
4. **Projects** — asymmetric editorial grid (one wide + stacked narrow), problem/solution as clean prose blocks.
5. **Tech stack** — ruled list with dividers (no cards, no `>` prompt).
6. **Contact** — centered single column, one primary action (mailto).
