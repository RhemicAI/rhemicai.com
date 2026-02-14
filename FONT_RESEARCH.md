# Font Research — AI Company Typography

Research conducted 2026-02-14 via Playwright browser inspection.

## Sites Inspected

| Site | Headline Font | Headline Weight | Body Font | Letter-Spacing (Headlines) | Vibe |
|------|--------------|-----------------|-----------|---------------------------|------|
| **vercel.com** | Geist (proprietary) | 600 | Geist (400) | -2.2px at 45px | Authoritative, modern, system-level |
| **linear.app** | Inter Variable | 510 (custom) | Inter Variable (400) | -1.408px at 64px | Refined, systematic, precision-engineered |
| **e2b.dev** | IBM Plex Mono | 700 | IBM Plex Sans (400) | -0.32px to -0.8px | Brutalist, terminal, industrial |
| **cursor.com** | CursorGothic (proprietary) | 400 (light!) | CursorGothic (400) | -0.325px at 26px | Elegant, editorial, understated |
| **anthropic.com** | IBM Plex Mono | 700 | Arial/system stack (400) | -0.32px (h1) | Research-lab editorial gravitas |
| **perplexity.ai** | FK Grotesk Neue (custom) | 475 | FK Grotesk Neue (400) | normal | Warm minimalism, product-focused |
| **midjourney.com** | JetBrains Mono | 400 | DM Sans (400) | normal | Indie-creative, contemplative |
| **lopus.ai** | Inter | 500 | Inter (500) | -5.48px at 137px | Bold SaaS startup energy |

## Key Patterns Discovered

1. **Aggressive negative tracking on headlines** — universally -0.3px to -5.5px on large text
2. **Monospace for headlines is a trend** — Anthropic, E2B, Midjourney all use mono for headings (signals technical credibility)
3. **Single-font systems are common** — Linear, Cursor, Perplexity, Lopus all use one family for everything
4. **Proprietary fonts rising** — Vercel (Geist), Cursor (CursorGothic), Perplexity (PPLX family) all have custom typefaces
5. **Variable fonts preferred** — every site uses variable fonts for performance
6. **Body weight is always 400** — no one uses light/300 on dark backgrounds
7. **Antialiased font smoothing** — universal on dark backgrounds
8. **Berkeley Mono is the premium code font** — used by both Cursor and Perplexity

## Decision: Satoshi + General Sans

**Why this pairing:**
- **Satoshi** (headlines): Modern geometric with slightly rounded terminals, feels technical without being cold. Free via Fontshare (Indian Type Foundry). Already installed in project.
- **General Sans** (body): Versatile neo-grotesque, excellent dark-background readability at 16-18px. Free via Fontshare.
- Both are variable fonts (single file, all weights)
- Total font payload: ~162kB (4 files)
- Commercial use: both free under Fontshare Free Font License

**Applied typography system:**
- Headlines: Satoshi, 700-800 weight, -0.02em to -0.03em letter-spacing, 1.05-1.15 line-height
- Body: General Sans, 400 weight, normal letter-spacing, 1.6 line-height
- Eyebrows: General Sans, 500 weight, 0.12-0.15em letter-spacing, uppercase
- Navigation: General Sans, 500 weight, 0.02em letter-spacing
- Buttons: General Sans, 600 weight, 0.01em letter-spacing
- Monospace: system monospace stack (UI elements in AEO Engine, HowItWorks)
