# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start Vite dev server on port 3000 (host `0.0.0.0`)
- `npm run build` — production build via `vite build`
- `npm run preview` — preview the production build
- `npm run lint` — type-check only (`tsc --noEmit`); there is no separate test suite or linter config in this repo
- `npm run clean` — removes `dist` and `server.js`

There are no unit/e2e tests configured. Validate changes with `npm run lint` and by visually checking `npm run dev`.

## Architecture

This is a single-page personal portfolio site (React 19 + Vite 6 + Tailwind v4), not a multi-route app. It was originally scaffolded via Google AI Studio (see `metadata.json`, `@google/genai` dependency) but **nothing calls the Gemini API**. `express`/`dotenv` are leftover scaffolding; there is no `server.js`.

### Structure
- `src/App.tsx` — top-level composition: `PullCord` (theme toggle) + `Lamp`, then `Hero → TechStack → Experience → Education → Footer`, with a `SectionMark` between each section.
- `src/components/site/` — **the live components.** One per section, plus:
  - `Hero.tsx` — top nav, the `Amok` mascot (`page-mascot`), the name rendered as fur text (`feral-fur`, shortened to a monogram on phones), role/tagline and links.
  - `SectionMark.tsx` — the Amok photo cut-out (`assets/amok-cutout.webp`) centred on each section boundary.
  - `Lamp.tsx` — ceiling lamp the pull cord hangs from; replays its flicker on every theme change.
  - `SectionHeader.tsx`, `HighlightsCarousel.tsx` — shared pieces used by the section components.
- `src/components/*.tsx` (top level: `Hero`, `CodePlayground`, `TechnicalNotes`, `InterestModule`, `ContactForm`, etc.) — **the previous design, not imported anywhere.** Don't edit these expecting a visible change; edit `site/` instead.
- `src/hooks/useTheme.ts` — `useIsDark()` / `toggleTheme()`; the theme is the `dark` class on `<html>`, persisted to `localStorage['portfolio-theme']`. `src/hooks/useMediaQuery.ts` — media-query hook.
- `src/data/portfolioData.ts` — all site content as typed constants (`developerProfile`, `techStack`, `experiences`, `experienceHighlights`, `education`, …). Edit copy here, not in components. It also still holds data/demo code for the old design (`caseStudies`, `techNotes`, `SearchFilter`, etc.).
- `src/types.ts` — shared content-model interfaces.

### Mascot
- The hero mascot uses the `page-mascot` component with two sprite atlases served from `public/mascots/amok-{directions,reactions}.webp`.
- `characters/amok/` holds the source sheets (`directions.png`, `reactions.png`, green-keyed) and the prompts used to draw them. Rebuild the atlases from these with the `page-mascot` skill's `mascot.py amok --skip-generate`; don't hand-edit the `.webp` files.

### Styling conventions
- Tailwind v4 via the `@tailwindcss/vite` plugin — no `tailwind.config.js`. Theme lives in `src/index.css`: monochrome CSS tokens (`--bg`, `--fg`, `--muted`, `--line`, …) on `:root` (light) overridden by `.dark`, exposed to Tailwind via `@theme inline` as `bg-bg`, `text-fg`, `text-muted`, etc. Fonts are Geist / Geist Mono.
- Dark is the default: `index.html` sets `class="dark"` on `<html>` and an inline script removes it before first paint if the saved theme is light.
- Shared utility classes are plain CSS in `src/index.css` (`.label`, `.nav`, `.pill`, `.reveal` with a `--d` delay variable, `.section-mark`, `.lamp-*`), and animations are raw `@keyframes` there; all respect `prefers-reduced-motion`.
- `feral-fur` and `pullcord` stylesheets are imported at the top of `src/index.css`; `PullCord` is positioned via `--pullcord-*` tokens.
- Path alias `@/*` maps to the repo root (configured in both `tsconfig.json` and `vite.config.ts`).

### Dev server notes
- `vite.config.ts` disables HMR and file watching when the `DISABLE_HMR` env var is `true` — this is intentional for the AI Studio agent-editing environment (avoids flicker while files are being edited) and should not be "fixed" or removed.
