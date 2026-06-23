# D·N·A — Design Nucleus Analyzer

> `/dna <url>` — extract any website's complete design language into an installable AI skill.

## The Name

**D·N·A** stands for **Design Nucleus Analyzer**.

"DNA" carries a deliberate double meaning:

- **Biological DNA** — the genetic code that defines how an organism looks and behaves. A website's design system is its visual DNA: colors, typography, spacing, motion — the inherited traits that make it recognizable.
- **Nucleus** — the cell's core, where DNA resides. The analyzer penetrates a website's surface appearance to extract the core design rules — not the specific pixels, but the underlying principles encoded within.

Each extraction produces a reusable "gene" — an installable `.skill.md` that any AI agent can load to design in that style. Like genes, these skills can be inherited, combined, and evolved across projects.

## Quick Start

```
/dna https://stripe.com --name stripe-style
```

The agent will:
1. **Penetrate** — bypass login walls via Chrome profile import or public paths
2. **Sample** — statistical CSS extraction (600+ elements per page)
3. **Sequence** — cluster values, map to semantic roles, infer design rules
4. **Encode** — produce a comprehensive DESIGN.md (10 dimensions)
5. **Package** — wrap as an installable `.skill.md`

Then copy and use anywhere:

```bash
cp skills/stripe-style.skill.md ~/my-project/skills/
# "Design a landing page using skill://stripe-style"
```

## What Gets Extracted

| Dimension | What's Captured |
|---|---|
| 1. Atmosphere | Density, variance, motion, genre, mood |
| 2. Color | Light + dark palettes, semantic roles, gradients |
| 3. Typography | Font stack, type scale, weight hierarchy, text colors |
| 4. Spacing | Base unit, spacing scale, max-width, rhythm |
| 5. Shape | Border radius scale, shadow system, border conventions |
| 6. Layout | Grid/flex, breakpoints, sticky elements, z-index layers |
| 7. Components | Buttons, cards, inputs, nav, modals, badges, avatars |
| 8. Motion | Transitions, hover, scroll behaviors, entrance animations |
| 9. Imagery | Aspect ratios, image treatment, icon style |
| 10. Constraints | Anti-patterns, deliberate absences, copywriting voice |

## Acknowledgments

This project stands on the shoulders of two giants:

- **[ai-website-cloner-template](https://github.com/JCodesMore/ai-website-cloner-template)** (18k ★) — JCodesMore pioneered the "AI agent reverse-engineers websites" paradigm. Its multi-phase pipeline (reconnaissance → extraction → specification → parallel build → assembly) and 13-platform agent support provided the architectural blueprint for D·N·A. Without it, the idea of "extracting website design with AI" would never have emerged.
- **[browser-act](https://github.com/browser-act/skills)** (2.8k ★) — a browser automation CLI purpose-built for AI agents by the BrowserAct team. Unlike traditional scraping tools, browser-act redefines agent-browser interaction across four dimensions:
  - **Anti-blocking** (three progressive layers: environment fingerprint spoofing → `solve-captcha` auto-solving → `remote-assist` human handoff)
  - **Three browser modes** (`chrome` reuses local login state, `stealth` privacy mode leaves zero residue, `stealth` fixed identity enables multi-account parallelism without cross-contamination)
  - **Zero-interference concurrency** (cross-browser parallel with independent cookies/fingerprints/proxies; same-browser multi-session with shared login but non-blocking execution)
  - **Designed for agent reasoning** (`state` returns indexed element lists + `click 3` for index-based interaction — no DOM parsing needed; `get markdown` produces compact text output, several times more token-efficient than JSON/HTML)
  Every step of D·N·A rests on browser-act's shoulders: **CSS statistical sampling** uses `eval` to execute JavaScript in browser context; **authenticated session penetration** depends on `browser create --source-profile` importing 419 cookies from Chrome profiles; **interaction sweeps** (scroll/click/hover) are driven by `scroll`/`click`/`hover`; **page structure analysis** relies on `state` and `get markdown`. Without browser-act, D·N·A would be helpless against any site requiring authentication.

D·N·A's unique contribution is pivoting the pipeline from "pixel-perfect cloning" to "design DNA extraction" — deducing design rules rather than copying instances. But the inspiration, ideas, and technical foundation all came from these two projects.

## Provenance

The first public extraction — zhihu.com — revealed a near-flat design system with exactly 1 shadow across 1,200+ elements. That single data point says more about zhihu's design philosophy than any screenshot could.

## Prerequisites

- Node.js 24+
- An AI coding agent with browser MCP access (Claude Code recommended)
- Supported: Claude Code, Codex CLI, OpenCode, GitHub Copilot, Cursor, Windsurf, Gemini CLI, Cline, Roo Code, Continue, Amazon Q, Augment Code, Aider

## Project Structure

```
dna/
├── SKILL.md                       # The /dna command itself
├── templates/
│   ├── DESIGN_TEMPLATE.md         # 10-section spec template
│   └── SKILL_TEMPLATE.md          # .skill.md wrapper
├── scripts/
│   └── package-skill.mjs          # DESIGN.md → .skill.md
├── skills/                        # Extracted design skills (output)
│   └── <style-name>.skill.md      # Your extractions land here
└── README.md
```

## Not For

- **Cloning websites** — see [ai-website-cloner-template](https://github.com/JCodesMore/ai-website-cloner-template)
- **Phishing or impersonation**
- **Violating terms of service**

## License

MIT
