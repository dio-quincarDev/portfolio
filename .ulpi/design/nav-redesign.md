# Nav Redesign — dioquincar.dev

> Binds to `.ulpi/design/DESIGN.md`. Every screen must read as the same product if placed side by side.

## Design Read

A backend developer's nav that reads like a terminal title bar — functional, monospaced, one accent blink. The rest of the page stays editorial; the nav alone signals "this is a builder's site." Toggles sit on the left (utility-first), navigation in the center, social on the right. No brand logo or name.

## Aesthetic Direction (nav layer only)

**Site-wide:** `editorial / refined corporate` (from DESIGN.md).  
**Nav accent layer:** `retro-terminal` — a functional, monospaced, restrained terminal metaphor. Not gimmicky. The nav is a tool, not a decoration.

## User Flow

### Flow: Navigate the portfolio

**Goal:** Move between Home / Projects / About pages via the nav bar.

**User Story:** As a visitor, I want to navigate the site from any page so I can explore the portfolio.

**Trigger:** User clicks a nav item, toggle, or social link.

### Entry Points
- Header nav bar (desktop, all pages)
- Drawer overlay (mobile, opened via hamburger)

### State Model

| State | Visual | Behavior |
|-------|--------|----------|
| Idle (nav) | All items in `--text`, monospace caps | Hover → `--accent` text |
| Active | `--accent` text + `▌` block prefix | Page matches route |
| Idle (toggle left) | Icon in `--secondary` | Hover → `--accent` |
| Dark mode active | Sun icon | Replaces moon icon |
| Lang: ES | `translate` icon + label "ES" | |
| Lang: EN | `translate` icon + label "EN" | |
| Drawer open | Right-side overlay, full-height | Smooth slide-in |
| Drawer item active | `--accent` text + `▌` block prefix | |
| Reduced motion | No blink, no slide animation | |

### Edge Cases

| Scenario | Handling |
|----------|----------|
| Current page refresh | Nav reads active route on mount |
| Direct URL nav | Active state matches route |
| Resize from desktop→mobile | Drawer replaces inline nav |
| Resize from mobile→desktop | Drawer closes, inline nav appears |
| lang toggle mid-scroll | No scroll disruption |
| Mismatched route (404) | No nav item is active |

---

## Component Specs

### 1. NavBar (q-header)

**Purpose:** Primary site navigation — always visible at top, responsive between inline and drawer.

**Props** (existing from vue-router): none passed explicitly; reads `$route.path`.

**Variants:** `desktop` (inline) · `mobile` (hamburger → drawer)

#### Desktop Layout

```
┌────────────────────────────────────────────────────────────┐
│  ◐  🌐  │  ▌HOME  PROJECTS  ABOUT  │  ○  ○  ○  │
└────────────────────────────────────────────────────────────┘
```

**Left zone (utility):**
- `dark_mode` / `light_mode` icon button (Quasar `q-btn` flat round)
- `translate` icon button (Quasar `q-btn` flat round)
- No labels, no tooltips on touch (tooltips OK on desktop)

**Center zone (nav):**
- 3 items: HOME · PROJECTS · ABOUT — JetBrains Mono, 11px, 1px tracking, all caps
- Active page: text in `--accent`, prepended `▌` block character (U+258C LEFT HALF BLOCK) in `--accent`
- Non-active: text in `--text`, on hover transitions to `--accent`
- Separator `│` (U+2502 BOX DRAWINGS LIGHT VERTICAL) between center and right zone in `--border`
- Separator between left and center zone: none (gap only)

**Right zone (social):**
- GitHub, X, LinkedIn — `q-btn` flat round, `mdi-github`, custom X SVG icon, `mdi-linkedin`
- X icon: the current inline SVG (clean, no blob styling)
- All social: `size="sm"`, `--secondary` color, hover → `--accent`

**Header frame:**
- `--header-bg` background, `1px solid --header-border` bottom border
- **Retro accent:** 1px `--accent` line along the very top of the header (top border), at 50% opacity. Creates a terminal-window-frame feel.
- backdrop-filter blur(12px)

**Micro-interaction:** Active nav `▌` block blinks at `1s` interval (opacity 1 → 0 → 1, CSS `steps(1)`). Disabled when `prefers-reduced-motion: reduce`.

#### Mobile Layout

```
┌─────────────────────────┐
│  ◐  🌐           ☰     │
└─────────────────────────┘
```

- Toggles visible on left. Hamburger on right.
- No nav text visible. No social.
- Toolbar height: 44px on mobile.

### 2. Drawer (q-drawer)

**Purpose:** Mobile navigation overlay replacing inline nav.

**Behavior:** Right-side, overlay, "mobile" behavior (swipe to close). Closes on nav click or backdrop click.

**Content (top to bottom):**

1. **Toggle row** (top, no border bottom):
   - `dark_mode` / `light_mode` icon flat round
   - `translate` icon flat round
   - Label: "ES" or "EN" in JetBrains Mono 11px, `--muted`

2. **Nav items** (middle, flex: 1):
   - HOME, PROJECTS, ABOUT — full-width QItems
   - Left: icon (home / code / person) in `--secondary` (or `--accent` if active)
   - Center: label in JetBrains Mono 13px, all caps, `--text`
   - Right (active only): `▌` block in `--accent`, vertically centered
   - Active QItem: `--accent-text` color on icon + label
   - Hover: subtle `--accent` tint background (rgba(239,71,111,0.04))
   - Touch target: ≥ 48px height per item

3. **Social row** (bottom, above footer separator):
   - GitHub, X, LinkedIn — centered, `q-btn` flat round, `size="sm"`
   - Same icons as desktop

**Drawer visual:**
- Background: `--drawer-bg` (matches header bg)
- Right border: `1px solid --header-border`
- No brand/logo anywhere in drawer

**Terminal accent (drawer only):**
- A subtle scanning line overlay on the drawer background: a repeating-linear-gradient at 4% opacity, simulating old CRT monitor lines. Only visible in drawer — never on the main page content.
- Implementation: `background-image: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)`
- In dark mode: white instead of black at same 4% opacity.

### 3. Social Icons

**Purpose:** External profile links — open in new tab with `rel="noopener noreferrer"`.

**Platforms:**
- GitHub: `mdi-github` (Quasar icon)
- X: inline SVG (current implementation — clean X mark, no blob)
- LinkedIn: `mdi-linkedin` (Quasar icon)

**States:** Color `--secondary`, hover → `--accent`. No ripple, no tooltip needed (aria-label covers it).

**Accessibility:** Each has `aria-label` with platform name (e.g., "GitHub", "X", "LinkedIn").

---

## CSS Variables Referenced

Must exist in the app's token layer. If not present, add:

```css
--header-bg: hsla(42, 29%, 91%, 0.85);        /* light */
--header-border: var(--border);                 /* light */
--drawer-bg: var(--background);                 /* light */

/* dark */
--header-bg: hsla(196, 82%, 16%, 0.92);
--header-border: var(--border);
--drawer-bg: var(--background);
```

---

## Pre-Flight Gate

### Identity lock
- [x] Every value references `DESIGN.md` palette, type, spacing, radius — no off-system values introduced.
- [x] One accent (`#ef476f`), one radius scale, one type pairing — unchanged.
- [x] Nav reads as same product as hero, about, projects.
- [x] `DESIGN.md` was re-read before writing this spec.

### Anti-slop
- [x] 0 banned fonts (JetBrains Mono is in DESIGN.md already).
- [x] 0 banned color clichés.
- [x] 0 banned layout patterns (nav is a minimal bar, not 3 cards).
- [x] 0 buzzwords in nav copy (HOME, PROJECTS, ABOUT — functional labels).
- [x] Slop test passes: retro-terminal nav with block cursor blink is not a generic AI nav.
- [x] Counterfactual test: this nav would NOT be my answer for a generic SaaS, e-commerce, or media site.

### State coverage
- [x] Active, idle, hover, focus, disabled, reduced-motion all covered.
- [x] Edge cases: 404 route (no active), resize, refresh, direct URL.

### Accessibility
- [x] Contrast: text on `--header-bg` passes AA (tokens from DESIGN.md already verified).
- [x] Visible focus handled by Quasar's `q-btn` focus ring.
- [x] `prefers-reduced-motion` disables blink + drawer slide animations.
- [x] `aria-label` on every icon-only button. `aria-current="page"` on active nav item.
- [x] Touch targets ≥ 48px (Quasar defaults).

### Layout craft
- [x] 3 zones (left utility, center nav, right social) with clear hierarchy.
- [x] Nav is a single line — no excessive decoration.

### Cognitive load
- [x] 3 nav items, 3 social icons, 2 toggles. Well under 4±2 threshold.
- [x] Exactly one primary nav per view (the active page).

### Scored self-critique

| Axis | Score | Notes |
|------|-------|-------|
| Distinctiveness | 3 | Retro-terminal block cursor + scanline drawer — unusual for a portfolio. Not groundbreaking but not generic. |
| Hierarchy & focus | 3 | Zones clear, active state obvious. |
| Consistency with DESIGN.md | 4 | Every value locked. No drift. |
| Accessibility | 3 | Quasar covers basics; manual check needed for blink + reduced-motion. |
| State/edge coverage | 3 | All states covered. Edge case table complete. |
| Copy quality | 4 | Three words: HOME, PROJECTS, ABOUT. No copy to mess up. |
| Restraint | 4 | One accent move (the block blink), everything else quiet. |
| Motion motivation | 3 | Blink is motivated ("terminal cursor"). Reduced-motion honored. |

**Total: 27/32** — No axis ≤ 2. Pass.

---

## Build Handoff

### Target Agent
`vue-best-practices` skill + `quasar-skilld` skill — this is a Quasar + Vue 3 portfolio already being developed on this machine.

### Design System
**Bespoke** (register: brand). The nav uses Quasar components (`q-btn`, `q-drawer`, `q-list`, `q-item`) themed with CSS variables from `DESIGN.md`.

### Setup Note
CSS variables `--header-bg`, `--header-border`, `--drawer-bg` must be added to the app's token layer (or used as-is inline).

### Acceptance Criteria
- [ ] Nav bar renders on all pages (Home, Projects, About, 404).
- [ ] Desktop: 3 zones — toggles left, nav center, social right.
- [ ] Active page has `▌` block prefix in `--accent`, blinking at 1s (CSS steps, disabled on reduced-motion).
- [ ] Header has thin `--accent` top border at 50% opacity (terminal frame).
- [ ] All social links open in new tab with `rel="noopener noreferrer"`.
- [ ] Mobile: toggles visible left, hamburger right.
- [ ] Drawer: no brand logo/name, toggle row at top, nav items with `▌` active indicator, social at bottom.
- [ ] Drawer has CRT scanline overlay (subtle repeating-linear-gradient).
- [ ] `prefers-reduced-motion` disables all blink and slide animations.
- [ ] No browser warnings, no layout shift on navigation.
- [ ] `aria-current="page"` on active nav items.
- [ ] X icon preserved (not removed).

### Implement exactly this spec. Theme the design system with our locked tokens; do NOT redesign or re-implement its components.
