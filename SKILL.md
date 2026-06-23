---
name: dna
description: D·N·A — Design Nucleus Analyzer. Extract a website's complete design DNA into a reusable, installable skill that AI agents can load to design in that style. Use whenever the user wants to extract, capture, analyze, reverse-engineer, or document a website's design language. Triggers on "extract design from X", "capture this site's style", "analyze the design of", "/dna <url>", "design nucleus analyzer".
argument-hint: "<url> [--name <skill-name>]"
user-invocable: true
---

# D·N·A — Design Nucleus Analyzer

You are about to analyze **$ARGUMENTS** and extract its complete design DNA into a reusable, installable AI skill.


This is not cloning. You will NOT build React components that match the source. Instead, you will **observe patterns, deduce rules, and encode principles** — producing a design system specification that can generate infinite new work in the same style, none of which needs to look exactly like the source.

## Scope

- **In scope:** Color system, typography architecture, spacing rhythm, shape/elevation language, layout philosophy, component patterns, motion language, imagery conventions, constraints & anti-patterns, visual atmosphere.
- **Out of scope:** Backend, database, authentication, real API endpoints, SEO, accessibility audit, actual source code.
- **Default depth:** Comprehensive — extract every observable design dimension. The user can limit scope with additional instructions.

## Pre-Flight

1. **Browser automation is required.** Check for available browser MCP tools (Chrome MCP, Playwright MCP, Browserbase MCP, Puppeteer MCP). If multiple exist, prefer Chrome MCP. If none, ask the user to connect one. This skill cannot work without browser automation.
2. Parse `$ARGUMENTS` to extract the target URL and optional `--name` flag. Normalize the URL. If `--name` is not provided, derive a kebab-case name from the domain (e.g., `stripe-com`, `linear-app`). Confirm the name with the user before proceeding.
3. Verify the URL is accessible via browser MCP. **If the page redirects to a login/signin wall, do NOT give up** — try these strategies in order:
   - **Try using the user's existing Chrome profile** (highest priority — gives full authenticated access):
     Run `browser-act browser list-profiles` to find local profiles, then `browser-act browser create --type chrome --source-profile <PROFILE_ID> --name "auth-session"`. Open the target URL with this browser — if the user is logged into the site in their normal Chrome, the cookies will carry over.
   - If no suitable profile exists, navigate to known public paths: append `/explore`, `/discover`, `/hot`, `/trending`, `/popular`, `/blog`, `/about`, `/pricing`, `/features`, `/docs` to the base URL. Many sites lock their homepage behind auth but leave secondary pages public. Try at least 3 paths before concluding the site is inaccessible.
   - Check the page content via `get markdown` — if partial content is visible alongside a login prompt (e.g., question cards visible on zhihu.com/explore despite a "登录" overlay), the page IS usable for extraction.
   - Use `eval` to enumerate all `<a>` tags — identify internal paths that avoid the auth wall.
   - If ALL paths redirect and no content is accessible, report to the user and ask for a different URL or login credentials.
4. Create output directories: `skills/`. Ensure `templates/DESIGN_TEMPLATE.md` and `templates/SKILL_TEMPLATE.md` exist in the repo.

## Guiding Principles

### 1. Generalize, Don't Duplicate
The cloner extracts per-element CSS. You extract **statistical distributions**. One element at `padding: 23.5px` is noise. Twenty elements clustering around `24px` is a rule. Always ask: "Is this a deliberate design choice, or an incidental value?" Rules are deliberate; outliers are incidental.

### 2. Semantics Over Measurements
`#1a1a1a` is a measurement. "Primary text on light backgrounds" is a semantic role. Always map raw values to their **design intent** — what purpose does this value serve? Where does it appear? What does it communicate? A color is only useful when you know HOW to use it.

### 3. Statistical Significance
Sample 500+ elements per page. A single element's CSS is an anecdote; 500 elements' CSS is a pattern. Clustering is your primary analysis tool — group similar values, identify the clusters, discard the noise.

### 4. Cross-Page Validation
Smart-crawl key internal pages. A value that appears consistently across 4 pages is a **core token**. A value that only appears on the blog is a **context-specific variation**. Flag both, but distinguish them clearly.

### 5. Absence Is Information
What the site does NOT do is as revealing as what it does. No shadows? That's a deliberate flat-design choice. No rounded corners? Brutalist intent. No hover animations? Static, confident aesthetic. The anti-patterns section is not optional.

### 6. Dark Mode Is a Separate System
If the site has a dark mode (check for `.dark` class, `prefers-color-scheme` media query, or a theme toggle), extract it as a complete parallel palette. Do not assume dark mode is just "light mode inverted."

### 7. Extraction Scripts Run Once
Each extraction script in this document is designed to run **once** via browser MCP, capture structured JSON, then you analyze it offline. Do not hand-measure individual properties. Run the script, capture the output, then reason about it.

### 8. The Skill File Is the Deliverable
The final `.skill.md` is what makes this reusable. It must be self-contained, agent-actionable, and include both the quick-reference card and the full spec. An agent loading this skill should need zero additional context to design in this style.

## Phase 1: Reconnaissance

### Screenshots
- Full-page screenshots at 1440px, 768px, 390px viewports.
- Save to `docs/screenshots/<name>/` with descriptive filenames.
- These are your reference throughout extraction.

### Smart Crawl
After loading the main URL:

1. **Extract all internal links** from `<nav>`, `<header>`, `<footer>`, and any sitemap-like elements:
```javascript
// Run via browser MCP
JSON.stringify(
  [...document.querySelectorAll('nav a[href], header a[href], footer a[href]')]
    .map(a => ({ href: a.href, text: a.textContent.trim().slice(0, 60) }))
    .filter(l => l.href.startsWith(location.origin))
    .filter((l, i, arr) => arr.findIndex(x => x.href === l.href) === i)
    .slice(0, 30)
);
```

2. **Identify design-relevant pages** by scanning link text for keywords: about, pricing, features, product, blog, docs, documentation, contact, careers, company, customers, showcase, templates, examples, resources.

3. **Visit each identified page** (up to 5, prioritized by relevance). On each page, run the same extraction scripts from Phase 2. Tag each page's data with its URL for cross-page analysis.

4. **Record consistency scores**: for each design dimension, note whether values are consistent across pages (core spec) or vary (contextual variation).

### Atmosphere Assessment
Before any quantitative extraction, form a qualitative judgment:
- **Density** (1–10): How much visual information per screen?
- **Variance** (1–10): How asymmetric and unpredictable is the layout?
- **Motion** (1–10): How animated and interactive does it feel?
- **Genre classification**: editorial, brutalist, minimalist, corporate, playful, retro, luxury, dark-tech, developer-tool, consumer-app, SaaS, fintech, etc.
- **Mood adjectives** (3–5 evocative words): e.g., "confident, precise, warm, technical, premium"

Record these in `docs/screenshots/<name>/ATMOSPHERE.md`.

### Interaction Sweep
**Execute in this exact order — the order matters.** Scroll-driven behaviors are invisible until you scroll; clicking first may change state and hide scroll behaviors. Hovering is a refinement step after you understand the page structure.

**Step 1: Scroll sweep** — scroll slowly from top to bottom (400px increments). At each pause, observe:
- Does the header/nav change appearance (background, shadow, size)?
- Do elements animate into view (fade-up, slide-in, stagger)?
- Are there scroll-snap points or parallax layers?
- Does a sidebar/tab indicator auto-switch as content scrolls past?
- Is there smooth scrolling (Lenis `.lenis`, Locomotive Scroll, native `scroll-behavior: smooth`)?
- Record scroll position where each trigger fires. Use `eval` to capture `window.scrollY` and check for `position: fixed` elements.

**Step 2: Click sweep** — now click every interactive element:
- Navigation tabs, pills, and labels
- Buttons (primary, secondary, icon-only)
- Cards, links, dropdowns, modals
- Record what happens: page navigation? In-page anchor scroll? Content swap? Modal open?
- For stateful components (tabs, accordions): click EVERY state and capture the content for each.

**Step 3: Hover sweep** — hover over interactive elements and note:
- What CSS properties change (color, background, shadow, transform, border)?
- What is the transition duration and easing?
- Are there hover cards, tooltips, or preview panels?

**Also check:** Dark mode toggle (if present — toggle it and capture the dark palette separately).

Save findings to `docs/screenshots/<name>/BEHAVIORS.md`.

### Tech Stack Detection
```javascript
// Run via browser MCP
JSON.stringify({
  framework: !!document.querySelector('[data-reactroot]') ? 'react' :
             !!document.querySelector('[ng-version]') ? 'angular' :
             !!document.querySelector('#__nuxt') ? 'nuxt' :
             !!document.querySelector('#__next') ? 'nextjs' : 'unknown',
  cssApproach: [...document.styleSheets].some(s => {
    try { return [...s.cssRules].some(r => r.selectorText?.includes('--')); }
    catch { return false; }
  }) ? 'css-variables' : 'unknown',
  tailwind: !!document.querySelector('[class*="text-"]'),
  animationLibrary: (() => {
    if (typeof window.gsap !== 'undefined') return 'gsap';
    if (document.querySelector('[data-framer-]')) return 'framer-motion';
    return 'css-only';
  })(),
  fontSource: [...document.querySelectorAll('link[rel="stylesheet"]')]
    .map(l => l.href)
    .filter(h => h.includes('fonts.googleapis.com') || h.includes('fonts.gstatic.com'))
    .length > 0 ? 'google-fonts' : 'self-hosted-or-system',
  darkModeStrategy: document.querySelector('.dark') ? 'class-based' :
    matchMedia('(prefers-color-scheme: dark)').matches ? 'system-preference' :
    'unknown-or-none'
});
```

## Phase 2: Systematic Extraction

Run each extraction script once per page via browser MCP. Capture the full JSON output. Do NOT truncate. Save raw outputs to `docs/screenshots/<name>/raw/` for auditability.

### 2.1 Color System

```javascript
// Run via browser MCP — extracts color data from 500+ elements
(function() {
  const TAGS = 'h1,h2,h3,h4,h5,h6,p,span,a,button,input,select,textarea,label,' +
    'div,section,header,footer,nav,article,li,td,th,small,strong,blockquote,code,pre';
  const elements = [...document.querySelectorAll(TAGS)].slice(0, 600);

  const data = elements.map(el => {
    const cs = getComputedStyle(el);
    return {
      tag: el.tagName,
      text: el.textContent?.trim().slice(0, 60),
      isInteractive: el.matches('button,a,input,select,textarea,[role="button"]'),
      isHeading: /^H[1-6]$/.test(el.tagName),
      isSmall: el.tagName === 'SMALL' || parseFloat(cs.fontSize) < 13,
      color: cs.color,
      backgroundColor: cs.backgroundColor,
      backgroundImage: cs.backgroundImage !== 'none' ? cs.backgroundImage : null,
      opacity: cs.opacity
    };
  });

  // Extract CSS custom properties from :root and .dark
  const rs = getComputedStyle(document.documentElement);
  const cssVars = {
    light: {},
    dark: null
  };
  // Sample known design token patterns
  const tokenPatterns = [
    '--background','--foreground','--primary','--secondary','--accent',
    '--muted','--card','--border','--input','--ring','--destructive',
    '--color-','--brand-','--surface-','--text-','--bg-','--gray-',
    '--blue-','--red-','--green-','--yellow-','--purple-','--orange-',
    '--teal-','--pink-','--indigo-'
  ];
  for (const [k, v] of Object.entries(rs)) {
    if (tokenPatterns.some(p => k.includes(p))) {
      cssVars.light[k] = v;
    }
  }

  // Try to get dark mode tokens
  const darkEl = document.querySelector('.dark');
  if (darkEl) {
    const darkStyles = getComputedStyle(darkEl);
    cssVars.dark = {};
    for (const [k, v] of Object.entries(darkStyles)) {
      if (tokenPatterns.some(p => k.includes(p))) {
        cssVars.dark[k] = v;
      }
    }
  }

  return JSON.stringify({
    url: location.href,
    sampleSize: data.length,
    hasDarkMode: !!cssVars.dark,
    data,
    cssVars
  });
})();
```

### 2.2 Typography

```javascript
// Run via browser MCP — typography clustering data
(function() {
  const elements = [...document.querySelectorAll(
    'h1,h2,h3,h4,h5,h6,p,span,a,button,li,td,th,label,small,strong,' +
    'blockquote,code,pre,cite,figcaption'
  )].slice(0, 600);

  const data = elements.map(el => {
    const cs = getComputedStyle(el);
    return {
      tag: el.tagName,
      text: el.textContent?.trim().slice(0, 60),
      fontSize: cs.fontSize,
      fontWeight: cs.fontWeight,
      fontFamily: cs.fontFamily.split(',')[0].replace(/["']/g, '').trim(),
      lineHeight: cs.lineHeight,
      letterSpacing: cs.letterSpacing,
      textTransform: cs.textTransform,
      textDecoration: cs.textDecoration,
      color: cs.color,
      maxWidth: cs.maxWidth,
      textAlign: cs.textAlign
    };
  });

  // Also get font-face declarations
  const fontFaces = [];
  try {
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules) {
          if (rule.constructor.name === 'CSSFontFaceRule') {
            fontFaces.push(rule.cssText.slice(0, 200));
          }
        }
      } catch {}
    }
  } catch {}

  // Detect font loading method
  const fontLinks = [...document.querySelectorAll('link[rel="stylesheet"]')]
    .map(l => l.href)
    .filter(h => h.includes('fonts.googleapis.com') || h.includes('fonts.gstatic.com'));

  return JSON.stringify({
    url: location.href,
    sampleSize: data.length,
    fontLinks,
    fontFaces,
    data
  });
})();
```

### 2.3 Spacing

```javascript
// Run via browser MCP — spacing and sizing patterns
(function() {
  const elements = [...document.querySelectorAll(
    'div,section,article,main,aside,nav,header,footer,' +
    'ul,ol,li,figure,form,fieldset'
  )].slice(0, 400);

  const data = elements.map(el => {
    const cs = getComputedStyle(el);
    return {
      tag: el.tagName,
      classes: el.className?.toString().slice(0, 80),
      children: el.children.length,
      padding: cs.padding,
      paddingTop: cs.paddingTop,
      paddingRight: cs.paddingRight,
      paddingBottom: cs.paddingBottom,
      paddingLeft: cs.paddingLeft,
      margin: cs.margin,
      marginTop: cs.marginTop,
      marginBottom: cs.marginBottom,
      gap: cs.gap,
      maxWidth: cs.maxWidth,
      width: cs.width,
      display: cs.display,
      flexDirection: cs.flexDirection,
      justifyContent: cs.justifyContent,
      alignItems: cs.alignItems
    };
  });

  // Find all distinct spacing values and their frequencies
  const spacingValues = {};
  const px = v => parseFloat(v);
  data.forEach(d => {
    [d.paddingTop, d.paddingBottom, d.paddingLeft, d.paddingRight,
     d.marginTop, d.marginBottom, d.gap, d.maxWidth].forEach(v => {
      if (v && v !== '0px' && v !== 'auto' && v !== 'none' && v !== 'normal') {
        spacingValues[v] = (spacingValues[v] || 0) + 1;
      }
    });
  });

  // Sort by frequency
  const sortedSpacing = Object.entries(spacingValues)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 40);

  return JSON.stringify({
    url: location.href,
    sampleSize: data.length,
    mostCommonSpacingValues: sortedSpacing,
    data
  });
})();
```

### 2.4 Shape & Elevation

```javascript
// Run via browser MCP — border-radius, shadows, borders
(function() {
  const elements = [...document.querySelectorAll(
    'div,section,article,button,a,img,input,select,textarea,' +
    'nav,header,footer,li,figure,form,span'
  )].slice(0, 500);

  const data = elements.map(el => {
    const cs = getComputedStyle(el);
    return {
      tag: el.tagName,
      classes: el.className?.toString().slice(0, 80),
      borderRadius: cs.borderRadius,
      borderTopLeftRadius: cs.borderTopLeftRadius,
      borderTopRightRadius: cs.borderTopRightRadius,
      borderBottomLeftRadius: cs.borderBottomLeftRadius,
      borderBottomRightRadius: cs.borderBottomRightRadius,
      boxShadow: cs.boxShadow,
      border: cs.border,
      borderTop: cs.borderTop,
      borderBottom: cs.borderBottom,
      borderLeft: cs.borderLeft,
      borderRight: cs.borderRight,
      outline: cs.outline,
      overflow: cs.overflow
    };
  });

  // Cluster box-shadows
  const shadows = {};
  data.forEach(d => {
    if (d.boxShadow && d.boxShadow !== 'none') {
      shadows[d.boxShadow] = (shadows[d.boxShadow] || 0) + 1;
    }
  });
  const topShadows = Object.entries(shadows)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  // Cluster border-radius values
  const radii = {};
  data.forEach(d => {
    const v = d.borderRadius;
    if (v && v !== '0px' && v !== '0px / 0px') {
      radii[v] = (radii[v] || 0) + 1;
    }
  });
  const topRadii = Object.entries(radii)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15);

  return JSON.stringify({
    url: location.href,
    sampleSize: data.length,
    topShadows,
    topRadii,
    data
  });
})();
```

### 2.5 Layout Philosophy

```javascript
// Run via browser MCP — layout architecture
(function() {
  // Main content container detection
  const mainEl = document.querySelector('main') || document.body;
  const cs = getComputedStyle(mainEl);

  // Find all containers with explicit max-width
  const containers = [...document.querySelectorAll('*')]
    .filter(el => {
      const cs = getComputedStyle(el);
      return cs.maxWidth !== 'none' && cs.maxWidth !== '100%' &&
        el.children.length >= 1 &&
        parseFloat(cs.maxWidth) < innerWidth;
    })
    .slice(0, 20)
    .map(el => ({
      tag: el.tagName,
      classes: el.className?.toString().slice(0, 100),
      maxWidth: getComputedStyle(el).maxWidth,
      width: getComputedStyle(el).width,
      margin: getComputedStyle(el).margin,
      children: el.children.length
    }));

  // Sticky/fixed elements
  const sticky = [...document.querySelectorAll('*')]
    .filter(el => {
      const p = getComputedStyle(el).position;
      return p === 'sticky' || p === 'fixed';
    })
    .map(el => ({
      tag: el.tagName,
      classes: el.className?.toString().slice(0, 80),
      position: getComputedStyle(el).position,
      top: getComputedStyle(el).top,
      zIndex: getComputedStyle(el).zIndex
    }));

  // Z-index extremes
  const zIndices = [...document.querySelectorAll('*')]
    .map(el => ({ z: parseInt(getComputedStyle(el).zIndex) || 0, tag: el.tagName }))
    .filter(x => x.z > 0)
    .sort((a, b) => b.z - a.z)
    .slice(0, 20);

  // Grid usage
  const gridContainers = [...document.querySelectorAll('*')]
    .filter(el => getComputedStyle(el).display.includes('grid'))
    .slice(0, 10)
    .map(el => ({
      tag: el.tagName,
      classes: el.className?.toString().slice(0, 100),
      gridTemplateColumns: getComputedStyle(el).gridTemplateColumns,
      gap: getComputedStyle(el).gap,
      children: el.children.length
    }));

  return JSON.stringify({
    url: location.href,
    viewport: { w: innerWidth, h: innerHeight },
    mainMaxWidth: cs.maxWidth,
    bodyDisplay: getComputedStyle(document.body).display,
    bodyFlexDirection: getComputedStyle(document.body).flexDirection,
    containers,
    stickyElements: sticky,
    topZIndices: zIndices,
    gridContainers,
    // Responsive breakpoint detection via media queries
    mediaQueries: [...document.styleSheets].flatMap(s => {
      try { return [...s.cssRules].filter(r => r.constructor.name === 'CSSMediaRule')
        .map(r => r.conditionText); }
      catch { return []; }
    }).slice(0, 30)
  });
})();
```

### 2.6 Component Patterns

```javascript
// Run via browser MCP — component structure analysis
(function() {
  // Button analysis
  const buttons = [...document.querySelectorAll('button, [role="button"], a.btn, a[class*="button"]')]
    .slice(0, 50)
    .map(el => {
      const cs = getComputedStyle(el);
      return {
        tag: el.tagName,
        text: el.textContent?.trim().slice(0, 30),
        classes: el.className?.toString().slice(0, 100),
        fontSize: cs.fontSize,
        fontWeight: cs.fontWeight,
        padding: cs.padding,
        borderRadius: cs.borderRadius,
        backgroundColor: cs.backgroundColor,
        color: cs.color,
        border: cs.border,
        boxShadow: cs.boxShadow,
        minHeight: cs.minHeight,
        minWidth: cs.minWidth,
        cursor: cs.cursor,
        transition: cs.transition,
        textTransform: cs.textTransform
      };
    });

  // Card detection — find repeating container patterns
  const cardCandidates = [...document.querySelectorAll('div,article,li')]
    .filter(el => {
      const cs = getComputedStyle(el);
      return (
        cs.borderRadius !== '0px' &&
        (cs.boxShadow !== 'none' || cs.border !== '0px none rgb(0, 0, 0)') &&
        el.children.length >= 2 &&
        (cs.backgroundColor !== 'rgba(0, 0, 0, 0)' || cs.backgroundImage !== 'none')
      );
    })
    .slice(0, 30)
    .map(el => {
      const cs = getComputedStyle(el);
      return {
        tag: el.tagName,
        classes: el.className?.toString().slice(0, 100),
        borderRadius: cs.borderRadius,
        boxShadow: cs.boxShadow,
        backgroundColor: cs.backgroundColor,
        border: cs.border,
        padding: cs.padding,
        overflow: cs.overflow,
        transition: cs.transition,
        cursor: cs.cursor,
        children: el.children.length,
        // Content slots: detect img, heading, paragraph, button inside
        hasImage: !!el.querySelector('img'),
        hasHeading: !!el.querySelector('h1,h2,h3,h4,h5,h6'),
        hasButton: !!el.querySelector('button,a[class*="button"],[role="button"]'),
        hasIcon: !!el.querySelector('svg')
      };
    });

  // Input/form analysis
  const inputs = [...document.querySelectorAll('input,select,textarea')]
    .slice(0, 30)
    .map(el => {
      const cs = getComputedStyle(el);
      return {
        tag: el.tagName,
        type: el.type || '',
        placeholder: el.placeholder || '',
        fontSize: cs.fontSize,
        padding: cs.padding,
        borderRadius: cs.borderRadius,
        border: cs.border,
        backgroundColor: cs.backgroundColor,
        color: cs.color,
        height: cs.height,
        outline: cs.outline
      };
    });

  // Navigation patterns
  const nav = document.querySelector('nav, [role="navigation"], header');
  const navData = nav ? {
    tag: nav.tagName,
    position: getComputedStyle(nav).position,
    top: getComputedStyle(nav).top,
    zIndex: getComputedStyle(nav).zIndex,
    backgroundColor: getComputedStyle(nav).backgroundColor,
    boxShadow: getComputedStyle(nav).boxShadow,
    height: getComputedStyle(nav).height,
    linkCount: nav.querySelectorAll('a').length,
    hasHamburger: !!nav.querySelector('[aria-label*="menu" i], [aria-label*="toggle" i], .hamburger, .burger'),
    links: [...nav.querySelectorAll('a')].slice(0, 15).map(a => ({
      text: a.textContent.trim().slice(0, 30),
      fontSize: getComputedStyle(a).fontSize,
      fontWeight: getComputedStyle(a).fontWeight,
      color: getComputedStyle(a).color
    }))
  } : null;

  return JSON.stringify({
    url: location.href,
    buttons,
    cardCandidates,
    inputs,
    navigation: navData
  });
})();
```

### 2.7 Motion & Interaction

```javascript
// Run via browser MCP — animation, transition, and motion patterns
(function() {
  const elements = [...document.querySelectorAll('*')]
    .filter(el => {
      const cs = getComputedStyle(el);
      return cs.transition !== 'all 0s ease 0s' ||
             cs.animation !== 'none 0s ease 0s 1 normal none running' ||
             cs.transform !== 'none';
    })
    .slice(0, 300);

  const data = elements.map(el => {
    const cs = getComputedStyle(el);
    return {
      tag: el.tagName,
      classes: el.className?.toString().slice(0, 60),
      isInteractive: el.matches('button,a,input,select,textarea,[role="button"]'),
      transition: cs.transition,
      transitionDuration: cs.transitionDuration,
      transitionTimingFunction: cs.transitionTimingFunction,
      transitionProperty: cs.transitionProperty,
      animation: cs.animation,
      animationDuration: cs.animationDuration,
      animationTimingFunction: cs.animationTimingFunction,
      transform: cs.transform,
      willChange: cs.willChange,
      cursor: cs.cursor
    };
  });

  // Cluster transition patterns
  const transitions = {};
  data.forEach(d => {
    if (d.transition && d.transition !== 'all 0s ease 0s') {
      const key = `${d.transitionProperty}|${d.transitionDuration}|${d.transitionTimingFunction}`;
      transitions[key] = (transitions[key] || 0) + 1;
    }
  });
  const topTransitions = Object.entries(transitions)
    .sort((a, b) => b[1] - a[1]).slice(0, 15);

  // Check for animation libraries
  const hasGSAP = typeof window.gsap !== 'undefined';
  const hasLenis = !!document.querySelector('.lenis') ||
    typeof window.Lenis !== 'undefined';
  const hasLocomotive = !!document.querySelector('[data-scroll-container]') ||
    typeof window.LocomotiveScroll !== 'undefined';
  const hasFramerMotion = !!document.querySelector('[data-framer-]');
  const hasAOS = !!document.querySelector('[data-aos]');

  // Scroll behavior detection
  const html = document.documentElement;
  const bodyScrollBehavior = getComputedStyle(html).scrollBehavior;
  const hasScrollSnap = [...document.querySelectorAll('*')]
    .some(el => getComputedStyle(el).scrollSnapType !== 'none');

  // Backdrop filter / glass effects
  const glassElements = [...document.querySelectorAll('*')]
    .filter(el => {
      const bf = getComputedStyle(el).backdropFilter;
      return bf !== 'none' && bf !== 'auto';
    })
    .slice(0, 20)
    .map(el => ({
      classes: el.className?.toString().slice(0, 80),
      backdropFilter: getComputedStyle(el).backdropFilter,
      backgroundColor: getComputedStyle(el).backgroundColor,
      opacity: getComputedStyle(el).opacity
    }));

  return JSON.stringify({
    url: location.href,
    animatedElementCount: data.length,
    topTransitions,
    libraries: { gsap: hasGSAP, lenis: hasLenis, locomotive: hasLocomotive,
      framerMotion: hasFramerMotion, aos: hasAOS },
    scrollBehavior: bodyScrollBehavior,
    hasScrollSnap,
    glassElements,
    data
  });
})();
```

### 2.8 Imagery & Media

```javascript
// Run via browser MCP — image, icon, and media analysis
(function() {
  const images = [...document.querySelectorAll('img')]
    .slice(0, 100)
    .map(img => ({
      src: img.src?.slice(0, 120),
      alt: img.alt?.slice(0, 60),
      width: img.naturalWidth,
      height: img.naturalHeight,
      aspectRatio: img.naturalWidth && img.naturalHeight ?
        (img.naturalWidth / img.naturalHeight).toFixed(2) : null,
      borderRadius: getComputedStyle(img).borderRadius,
      boxShadow: getComputedStyle(img).boxShadow,
      objectFit: getComputedStyle(img).objectFit,
      filter: getComputedStyle(img).filter,
      mixBlendMode: getComputedStyle(img).mixBlendMode,
      loading: img.loading,
      parentTag: img.parentElement?.tagName,
      siblingCount: img.parentElement?.querySelectorAll('img').length || 0
    }));

  // SVG/icon detection
  const svgs = [...document.querySelectorAll('svg')]
    .slice(0, 50)
    .map(svg => ({
      width: svg.getAttribute('width') || getComputedStyle(svg).width,
      height: svg.getAttribute('height') || getComputedStyle(svg).height,
      viewBox: svg.getAttribute('viewBox'),
      fill: svg.getAttribute('fill') || getComputedStyle(svg).fill,
      stroke: svg.getAttribute('stroke') || getComputedStyle(svg).stroke,
      strokeWidth: svg.getAttribute('stroke-width'),
      class: svg.className?.toString()?.slice(0, 60),
      isInline: svg.closest('button,a,[role="button"]') !== null
    }));

  // Video detection
  const videos = [...document.querySelectorAll('video')]
    .map(v => ({
      src: v.src?.slice(0, 120) || v.querySelector('source')?.src?.slice(0, 120),
      autoplay: v.autoplay,
      loop: v.loop,
      muted: v.muted,
      controls: v.controls,
      width: v.videoWidth,
      height: v.videoHeight
    }));

  // Aspect ratio clusters
  const aspectRatios = {};
  images.forEach(img => {
    if (img.aspectRatio) {
      const bucket = parseFloat(img.aspectRatio).toFixed(1);
      aspectRatios[bucket] = (aspectRatios[bucket] || 0) + 1;
    }
  });

  return JSON.stringify({
    url: location.href,
    imageCount: images.length,
    svgCount: svgs.length,
    videoCount: videos.length,
    aspectRatioDistribution: aspectRatios,
    images,
    svgs,
    videos
  });
})();
```

## Phase 3: Generalization

This is the critical phase. Take the raw JSON from Phase 2 and transform it into design system rules. Work dimension by dimension.

### Color Generalization

1. **Cluster colors** from the `data` array. Group by HSL proximity (hue ±10°, saturation ±10%, lightness ±5%). Each cluster is a candidate design token.

2. **Assign semantic roles** to each cluster by analyzing WHERE it appears:
   - Colors on headings (h1-h6) → "primary text" or "heading text"
   - Colors on `<p>`, `<span>`, `<li>` → "body text"
   - Colors on `small`, elements with font-size < 13px → "secondary/muted text"
   - Background colors of cards/dialogs → "surface" or "card"
   - Background colors of buttons → accent candidates
   - Border colors → "border"
   - Page background (most common background-color) → "canvas"

3. **Identify the accent strategy**: single vs dual vs complementary. An accent appears on CTAs, links, focus rings, active states — it's the color that says "interact here."

4. **Gradient catalog**: from `backgroundImage` values, extract each gradient's direction, stops, and where it's used.

5. **Write the color system section** with: token name, hex value, oklch approximation (compute if needed), usage description, and prevalence.

### Typography Generalization

1. **Cluster font sizes** from the `data` array. Group sizes within ±1px.

2. **Map clusters to semantic levels**: the largest font on the page → hero/display; sizes on `<h1>` → h1; `<h2>` → h2; etc. If heading tags map inconsistently to sizes, note the actual visual hierarchy.

3. **Identify the font stack**: group by `fontFamily`. Usually 2–3 distinct families.

4. **Weight hierarchy**: for each size cluster, what's the dominant weight? What weights appear for emphasis (strong, b)?

5. **Line height patterns**: compute the median line-height per size cluster. Note if line-height is proportional (unitless like 1.5) or fixed (px).

6. **Letter spacing patterns**: any negative tracking on headings? Any expanded tracking on labels?

### Spacing Generalization

1. **Extract all padding and margin values** from the `mostCommonSpacingValues` array.

2. **Find the base unit**: compute the greatest common divisor of the top 15 values (in px). If values are [8, 12, 16, 24, 32, 48, 64], base = 4. If [10, 20, 30, 40, 60, 80], base = 10.

3. **Build the spacing scale**: list all common steps with usage examples. For each step, find which components use it (e.g., "16px — card internal padding, button vertical padding, list gap").

4. **Content max-width**: from `containers` in the layout data, find the most common max-width. Also check `main` element's max-width.

5. **Section gap**: find the most common vertical margin/gap between major sections. Check `marginTop` and `marginBottom` on `<section>` elements.

### Shape & Elevation Generalization

1. **Border radius scale**: cluster the `topRadii` values. Group by usage context (buttons tend to have one radius, cards another, avatars are circular at 9999px).

2. **Shadow system**: from `topShadows`, cluster into levels. Common patterns: "none" (flat), "subtle" (1px blur, low opacity), "raised" (4-8px blur, medium opacity), "floating" (12-24px blur, higher opacity), "modal overlay" (large blur + dark backdrop).

3. **Border conventions**: check `border` values. Is there a consistent border color? Width? Which sides get borders (all? bottom only?)?

### Layout Generalization

1. **Grid system**: from `gridContainers`, identify the dominant grid pattern. Column count, gap, and any fractional unit patterns (e.g., `1fr 1fr` = 2-column).

2. **Alignment bias**: from `bodyDisplay`, container `margin` values, and `textAlign`, determine if the site is center-aligned, left-aligned, or asymmetric.

3. **Sticky elements**: from `stickyElements`, document what sticks and where. Navbar at top? Sidebar? Floating CTA?

4. **Z-index layers**: from `topZIndices`, infer the layering convention: what's at z-10, z-20, z-30, z-50?

5. **Responsive breakpoints**: from `mediaQueries`, extract min-width and max-width breakpoints. Common patterns: 640px, 768px, 1024px, 1280px.

### Component Pattern Generalization

1. **Button system**: from `buttons`, cluster by visual properties. A "primary" button typically has: filled background (accent color), white text, no border, medium border-radius, padding ~12px 24px, min-height ~40px. A "secondary" has: outline or ghost style. An "icon-only" has: square aspect ratio, no visible text.

2. **Card patterns**: from `cardCandidates`, identify the dominant card style. Does it have a shadow? Border? Both? What's the border-radius? Is there a hover effect (check `transition`)? Do cards contain predictable content slots (image → heading → text → button)?

3. **Form/input style**: from `inputs`, determine the input pattern: label position (above? floating? placeholder-as-label?), border style, focus ring, height, padding.

4. **Navigation**: from `navigation`, document the pattern: horizontal links at top? Sticky? Hamburger on mobile? Link styling (font size, weight, color, hover effect).

### Motion Generalization

1. **Default transition**: from `topTransitions`, identify the most common transition pattern. This is the site's "motion signature."

2. **Hover response**: from `data`, look at elements with `cursor: pointer` — what transitions do they have? Common: background-color + transform + box-shadow on hover.

3. **Animation library**: from `libraries`, note what's detected. GSAP → spring-loaded interactions. Lenis → smooth scrolling. Framer Motion → React-based animations.

4. **Scroll behavior**: `smooth` on html → native smooth scrolling. Scroll-snap → section snapping. Check BEHAVIORS.md for scroll-driven effects.

5. **Glass effects**: from `glassElements`, if any, document the backdrop-filter pattern.

### Imagery Generalization

1. **Aspect ratio conventions**: from `aspectRatioDistribution`, what ratios dominate? 16:9 for hero? 3:2 for cards? 1:1 for avatars?

2. **Image treatment**: from `images` — common border-radius? Shadow? Object-fit? Filter?

3. **Icon style**: from `svgs` — typical size? Filled vs outline? Stroke width? Rounded vs sharp corners?

### Cross-Page Analysis

If you visited multiple pages, compare findings:
- **Core tokens** (consistent across all pages) → build the spec around these
- **Page-specific variations** → note as "contextual overrides"
- **Consistency score**: what % of tokens are consistent? >80% = cohesive system. <50% = inconsistent, flag to user.

## Phase 4: Spec Assembly

Now fill in `templates/DESIGN_TEMPLATE.md` with your generalized findings.

**Rules:**
- Every value must be traceable to an extraction data point. No guessing.
- Use exact hex codes, px values, and CSS values from the extraction.
- Express rules in imperative, agent-actionable language: "Use X for Y." Not "The site uses X."
- Where the data is ambiguous, note the ambiguity and your reasoning.
- The anti-patterns section must list at least 5 deliberate absences.

Save the filled spec as `skills/<name>.design.md` (intermediate file — will be wrapped into .skill.md in Phase 5).

## Phase 5: Skill Packaging

Wrap the DESIGN.md into a `.skill.md` file using the `templates/SKILL_TEMPLATE.md`.

### Frontmatter

Generate accurate YAML frontmatter:
```yaml
---
name: <kebab-case-name>
description: <one-line summary of the design style — 15-25 words>
source: <original URL>
extracted: <today's date YYYY-MM-DD>
genre: <genre classification from Phase 1>
tags: [<5-10 descriptive tags>]
---
```

### Quick Reference Card

Write a skimmable overview at the top. This is what an agent reads first to decide if this style fits its task:
- 5-line palette summary (canvas, text, accent, surface, border)
- 3-line typography summary (display font, body font, key scale sizes)
- 3-line shape/motion/layout summary

### Full Spec

The complete DESIGN.md content follows.

Use the `scripts/package-skill.mjs` script if it exists; otherwise, assemble manually following `templates/SKILL_TEMPLATE.md`.

Save the final output to `skills/<name>.skill.md`.

### Registry Update

Add the new skill to `skills/registry.json`:
```json
{
  "name": "<name>",
  "genre": "<genre>",
  "tags": ["<tag1>", "<tag2>", ...],
  "source": "<url>",
  "extracted": "<date>"
}
```

## Phase 6: QA & Review

Present the spec to the user:

1. **Quick reference card first** — let them verify the vibe feels right
2. **Color palette** — show the extracted colors with swatches (use the hex values)
3. **Typography** — show the type scale
4. **Ask for targeted corrections** — "Does anything look wrong? I can re-extract any dimension."

If the user identifies an issue:
- Re-extract just that dimension from the live site
- Update the spec
- Re-package the .skill.md

## What NOT to Do

- **Don't clone.** You are not building React components. You are extracting design rules.
- **Don't guess.** If the data doesn't clearly support a claim, say so rather than fabricating.
- **Don't skip dimensions.** All 10 sections must be filled — even if the answer is "none" or "static."
- **Don't treat dark mode as inverted light mode.** Extract it independently.
- **Don't assume Tailwind tokens.** Map to semantic roles, not framework-specific names.
- **Don't skip cross-page validation.** Single-page sampling is fragile.
- **Don't present raw JSON to the user.** The output is the DESIGN.md / .skill.md, not the extraction data.
- **Don't skip the anti-patterns section.** Absence is design information.
- **Don't produce vague descriptions.** "Clean and modern" means nothing without specific evidence.
- **Don't skip the interaction sweep.** Static screenshots miss scroll-driven behaviors, hover states, and animations.

## Completion

When done, report:
- Skill name and file path (`skills/<name>.skill.md`)
- Pages sampled (count + which pages)
- Design genre and mood
- Color palette summary (light + dark if applicable)
- Typography summary (fonts + scale)
- Number of component patterns documented
- Any uncertainties or areas the user should review
- Next step: "Copy `skills/<name>.skill.md` to your project's skills directory and reference it as `skill://<name>`"
