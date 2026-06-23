# Design System: [Site Name]

> **Source:** [URL] · **Extracted:** [YYYY-MM-DD] · **Pages sampled:** [N]
> **Genre:** [classification] · **Density:** [1-10] · **Variance:** [1-10] · **Motion:** [1-10]

---

## 1. Visual Atmosphere & Identity

### Genre & Mood
- **Classification:** [genre — editorial, brutalist, minimalist, corporate, playful, retro, luxury, dark-tech, developer-tool, consumer-app, SaaS, fintech, etc.]
- **Mood:** [3–5 evocative adjectives with brief evidence, e.g., "Confident — large type, no decorative elements, strong contrast. Precise — consistent 8px grid, exact spacing. Technical — monospace for data, code-like aesthetic."]

### Design Philosophy
[One paragraph. What does this design system prioritize? Legibility? Impact? Density? Playfulness? What's the emotional response it aims for?]

---

## 2. Color System

### Light Mode

| Token | Hex | OKLCH | Usage | Prevalence |
|---|---|---|---|---|
| Canvas | `#XXXXXX` | `oklch(...)` | Page background | 100% |
| Surface | `#XXXXXX` | `oklch(...)` | Cards, dialogs, dropdowns | ~XX% |
| Text Primary | `#XXXXXX` | `oklch(...)` | Headings, body text | All text |
| Text Secondary | `#XXXXXX` | `oklch(...)` | Descriptions, metadata, captions | ~XX% |
| Text Tertiary | `#XXXXXX` | `oklch(...)` | Placeholders, disabled text | ~XX% |
| Accent | `#XXXXXX` | `oklch(...)` | CTAs, links, focus rings, active states | ~XX% |
| Accent Hover | `#XXXXXX` | `oklch(...)` | Button hover, link hover | ~XX% |
| Border | `#XXXXXX` | `oklch(...)` | Card borders, inputs, dividers | ~XX% |
| Border Strong | `#XXXXXX` | `oklch(...)` | Focus rings, active borders | ~XX% |
| Success | `#XXXXXX` | `oklch(...)` | Success states, confirmations | ~XX% |
| Warning | `#XXXXXX` | `oklch(...)` | Warning states, alerts | ~XX% |
| Error | `#XXXXXX` | `oklch(...)` | Error states, destructive actions | ~XX% |
| Overlay | `rgba(X,X,X,0.X)` | — | Modal backdrops, hover overlays | ~XX% |

### Dark Mode (if detected)
| Token | Hex | OKLCH | Notes |
|---|---|---|---|
| Canvas | `#XXXXXX` | `oklch(...)` | [same structure as light] |
| ... | ... | ... | ... |

### Accent Strategy
- **Type:** [single / dual / split-complementary / monochromatic]
- **Primary accent:** `#XXXXXX` — used for [list specific uses]
- **Secondary accent (if any):** `#XXXXXX` — used for [list]
- **Saturation profile:** accents at ~XX% saturation, neutrals at ~X% saturation
- **Contrast philosophy:** [high-contrast text on light / low-contrast muted / etc.]

### Gradient Catalog
| Name | Direction | Stops | Usage |
|---|---|---|---|
| [e.g., "Hero Gradient"] | `to bottom right` | `#XXX → #XXX` | Hero section background |
| ... | ... | ... | ... |

---

## 3. Typography Architecture

### Font Stack

| Role | Font Family | Source | Weights Used |
|---|---|---|---|
| Display / Heading | `[name]` | [Google Fonts / self-hosted / system] | [400, 600, 700, 800] |
| Body | `[name]` | [source] | [400, 500] |
| Mono / Code | `[name]` | [source] | [400, 600] |

### Type Scale

| Level | Tag | Size | Weight | Line Height | Letter Spacing | Color | Usage |
|---|---|---|---|---|---|---|---|
| Hero | `h1` (hero variant) | XXpx | XXX | X.XX | -X.XXem | text-primary | Main page title |
| H1 | `h1` | XXpx | XXX | X.XX | -X.XXem | text-primary | Section headings |
| H2 | `h2` | XXpx | XXX | X.XX | X | text-primary | Sub-section headings |
| H3 | `h3` | XXpx | XXX | X.XX | X | text-primary | Card headings |
| Body | `p`, `span`, `li` | XXpx | XXX | X.XX | X | text-primary | Paragraph text |
| Body Large | `p` (lead) | XXpx | XXX | X.XX | X | text-secondary | Lead paragraphs |
| Caption | `small`, `figcaption` | XXpx | XXX | X.XX | X | text-tertiary | Captions, metadata |
| Label | `label` | XXpx | XXX | X.XX | X.XXem | text-secondary | Form labels, badges |
| Code | `code`, `pre` | XXpx | XXX | X.XX | X | text-primary | Inline code, code blocks |

### Weight Hierarchy
- **800 / Bold:** [when to use — display, primary headings, emphasis]
- **600 / Semibold:** [when to use]
- **500 / Medium:** [when to use]
- **400 / Regular:** [when to use — body text, default]

### Text Transform Conventions
- Headings: [none / capitalize / uppercase]
- Labels: [none / uppercase]
- Buttons: [none / uppercase]
- Navigation: [none / uppercase]

---

## 4. Spacing System

- **Base unit:** [N]px
- **Scale:**

| Step | Value | Usage Examples |
|---|---|---|
| 0.5x | Xpx | Tight internal padding, icon gaps |
| 1x | Xpx | Element padding, inline gaps |
| 1.5x | Xpx | Card internal padding, button padding |
| 2x | Xpx | Section internal padding |
| 3x | Xpx | Card gaps, list gaps |
| 4x | Xpx | Section gaps |
| 6x | Xpx | Major section gaps |
| 8x | Xpx | Page-level padding |

- **Content max-width:** [value] — applied to [which containers]
- **Section vertical rhythm:** [value] gap between major sections
- **Page horizontal padding:** [value] at desktop, [value] at mobile

---

## 5. Shape & Elevation

### Border Radius Scale

| Token | Value | Usage |
|---|---|---|
| none | 0 | Inputs, tables, sharp elements |
| sm | Xpx | Buttons, tags, small interactive elements |
| md | Xpx | Cards, dialogs, dropdowns |
| lg | Xpx | Large containers, modals |
| full | 9999px | Avatars, pills, circular buttons |

### Shadow System

| Level | Box Shadow | Usage |
|---|---|---|
| flat | `none` | Default state, flat surfaces |
| subtle | `0 Xpx Xpx rgba(…,…,…,…)` | Cards resting state |
| raised | `0 Xpx Xpx rgba(…,…,…,…)` | Cards on hover, dropdowns |
| floating | `0 Xpx Xpx rgba(…,…,…,…)` | Modals, dialogs, tooltips |
| overlay | `0 Xpx Xpx rgba(…,…,…,…)` | Modal backdrop |

### Border Conventions
- **Default border:** [width] [style] [color] — used on [cards, inputs, etc.]
- **Focus ring:** [width] [style] [color] — used on [inputs, buttons]
- **Divider style:** [full-width 1px solid / inset / dotted / gradient]

---

## 6. Layout Philosophy

### Grid System
- **Approach:** [CSS Grid / Flexbox / hybrid]
- **Columns:** [N]-column at desktop, [N]-column at tablet, single at mobile
- **Gutter:** [value]
- **Margin:** [value]

### Alignment
- **Primary content:** [centered / left-aligned / asymmetric]
- **Hero section:** [centered / split / left-aligned]
- **Feature sections:** [2-col alternating / 3-col grid / horizontal scroll / etc.]

### Responsive Breakpoints

| Breakpoint | Width | Behavior Changes |
|---|---|---|
| Mobile | < XXpx | [single column, stacked layout, hamburger nav] |
| Tablet | XXpx–XXpx | [2-column, reduced padding, etc.] |
| Desktop | > XXpx | [full multi-column, max-width constraints] |

### Sticky / Fixed Elements
- **[Element]:** position [sticky/fixed], at [top/bottom], triggers at [scroll position], z-index [N]

### Z-Index Convention
| Layer | Z-Index | Elements |
|---|---|---|
| Content | 0–10 | Default flow |
| Sticky nav | XX | Sticky header, sidebar |
| Dropdown | XX | Dropdowns, popovers |
| Modal overlay | XX | Modal backdrop |
| Modal | XX | Modal content |
| Toast | XX | Notifications |

---

## 7. Component Patterns

### Buttons

#### Variants
| Variant | Background | Text Color | Border | Hover | Active |
|---|---|---|---|---|---|
| Primary | `accent` | `white` | none | `accent-hover`, scale 1.02 | scale 0.98 |
| Secondary | `transparent` | `accent` | `1px solid accent` | `accent` at 10% opacity | `accent` at 20% opacity |
| Ghost | `transparent` | `text-primary` | none | `surface` | `surface` darker |
| Icon-only | `transparent` | `text-secondary` | none | `text-primary` | — |

#### Sizes
| Size | Height | Padding X | Font Size | Border Radius |
|---|---|---|---|---|
| sm | XXpx | XXpx | XXpx | Xpx |
| md | XXpx | XXpx | XXpx | Xpx |
| lg | XXpx | XXpx | XXpx | Xpx |

#### States
- **Default:** [description]
- **Hover:** [what changes, transition]
- **Active/Pressed:** [what changes, transition]
- **Focus:** [ring style]
- **Disabled:** [opacity, cursor]
- **Loading:** [spinner or skeleton]

### Cards

- **Structure:** [image → heading → description → action? / other]
- **Background:** `surface`
- **Border:** [style] or `none`
- **Border Radius:** Xpx
- **Shadow:** `subtle` (resting) → `raised` (hover)
- **Padding:** Xpx
- **Hover:** [scale? shadow? border color? transition details]
- **Content slots:** [image, heading, body, CTA, icon, tag, avatar]

### Form Inputs

- **Label position:** [above / floating / placeholder-as-label]
- **Input height:** XXpx
- **Input padding:** Xpx Xpx
- **Input border:** `1px solid border` (default) → `2px solid accent` (focus)
- **Input border-radius:** Xpx
- **Input background:** `surface` / `canvas`
- **Error state:** red border + red text below
- **Helper text:** below input, `text-tertiary`, XXpx
- **Placeholder:** `text-tertiary`, italic (or not)

### Navigation

- **Desktop:** [horizontal links / sidebar / both]
- **Link style:** [font size, weight, color, hover effect]
- **Active indicator:** [underline / background / color change / none]
- **Mobile:** [hamburger → drawer / bottom bar / collapsible]
- **Sticky behavior:** [sticky at top / disappears on scroll down / reappears on scroll up]

### Modals / Dialogs

- **Backdrop:** `rgba(0,0,0,0.X)` + `backdrop-filter: blur(Xpx)` or none
- **Modal background:** `surface`
- **Border radius:** Xpx
- **Shadow:** `floating`
- **Animation:** [fade + scale / slide-up / none]
- **Width:** [value or responsive]
- **Close mechanism:** [X button top-right / click backdrop / ESC key]

### Badges / Tags / Chips

| Variant | Background | Text Color | Border | Size | Border Radius |
|---|---|---|---|---|---|
| Default | `surface` | `text-secondary` | `1px solid border` | XXpx | Xpx |
| Accent | `accent` at 10% | `accent` | none | XXpx | Xpx |
| Success | `success` at 10% | `success` | none | XXpx | Xpx |
| ... | ... | ... | ... | ... | ... |

### Avatars

- **Shape:** [circle / rounded square]
- **Size:** [XXpx for sm, XXpx for md, XXpx for lg]
- **Border:** [Xpx solid border] or none
- **Fallback:** [initials / generic icon / gradient placeholder]
- **Stacking:** [overlapping with Xpx negative margin] or [none]

---

## 8. Motion Language

### Default Transition
- **Duration:** [XXXms]
- **Easing:** [ease / ease-out / ease-in-out / cubic-bezier(X,X,X,X)]
- **Properties:** [all / specific properties like opacity, transform, background-color]

### Hover Response
- **Buttons:** [background-color shift + subtle scale, XXXms ease-out]
- **Links:** [color shift / underline animation, XXXms]
- **Cards:** [shadow elevation + Y-translate, XXXms]
- **Images:** [scale / brightness / none]

### Scroll-Driven Behaviors
[Enumerate each detected behavior with trigger mechanism, state A → state B, and transition]

| Behavior | Trigger | State A | State B | Transition |
|---|---|---|---|---|
| Header shrink | scrollY > XXpx | height XXpx, bg transparent | height XXpx, bg surface, shadow raised | XXXms ease-out |
| ... | ... | ... | ... | ... |

### Click-Driven Interactions
| Interaction | Trigger | Animation | Duration |
|---|---|---|---|
| Tab switch | click `.tab` | content fade + slide | XXXms |
| Dropdown open | click toggle | scale(0.95)→scale(1) + opacity 0→1 | XXXms |
| ... | ... | ... | ... |

### Entrance Animations
- **Strategy:** [none (static) / fade-up on scroll / stagger reveal / full page transitions]
- **Implementation:** [CSS animation / IntersectionObserver + class toggle / GSAP / Framer Motion]
- **Stagger delay:** [value] between items (if applicable)

### Loading Strategy
- **Page load:** [skeleton / spinner / progressive / instant]
- **Data fetching:** [skeleton matching layout / inline spinner / optimistic UI]
- **Image loading:** [blur-up / fade-in / skeleton placeholder / native lazy]

### Micro-Interaction Style
- **Spring physics:** [if using GSAP/Framer, note the feel — bouncy, snappy, smooth]
- **CSS transitions:** [if pure CSS, note the overall feel — snappy, smooth, deliberate]

### Smooth Scroll
- **Library:** [Lenis / Locomotive Scroll / native CSS `scroll-behavior: smooth` / none]
- **Configuration:** [if Lenis: duration, easing, smoothWheel, etc.]

---

## 9. Imagery & Media Conventions

### Aspect Ratios
| Context | Ratio | Notes |
|---|---|---|
| Hero / Banner | X:Y | |
| Card thumbnail | X:Y | |
| Blog featured image | X:Y | |
| Avatar | 1:1 | |
| Logo / Brand mark | [variable / fixed] | |

### Image Treatment
- **Border radius:** [Xpx / none]
- **Shadow:** [style / none]
- **Overlay:** [gradient overlay at X% opacity / solid overlay / none]
- **Blend mode:** [normal / multiply / overlay / etc.]
- **Filter:** [grayscale / brightness / contrast / none]
- **Object fit:** [cover / contain / fill]

### Icon Style
- **Type:** [filled / outline / duotone]
- **Stroke width:** Xpx (if outline)
- **Sizes:** [XXpx sm, XXpx md, XXpx lg]
- **Library:** [Lucide / Heroicons / Phosphor / custom SVG]

### Video / Animation
- **Background video:** [autoplay, loop, muted, no controls]
- **Product demos:** [embedded player with controls]
- **Lottie / Rive:** [if detected]

---

## 10. Constraints & Anti-Patterns

### Deliberate Absences
[List at least 5 things the site deliberately avoids. These are inferred from the ABSENCE of common patterns.]

- **No** [pattern] — [why this matters to the aesthetic]
- **No** [pattern] — [why this matters]
- ...

### Design Rules (NEVER)
[Express as imperative constraints for anyone designing in this style]

- NEVER use [banned pattern or value]
- NEVER exceed [threshold]
- NEVER mix [conflicting elements]
- ...

### Copywriting Voice
- **Tone:** [professional / casual / technical / playful / authoritative / warm]
- **Sentence style:** [short and punchy / long and flowing / mixed]
- **Banned terms:** [corporate jargon, buzzwords, filler, etc.]

---

*End of extracted design system. Apply these rules to any new project to achieve a consistent aesthetic in the style of [Site Name].*
