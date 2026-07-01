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

This is a single-page personal portfolio site (React 19 + Vite 6 + Tailwind v4), not a multi-route app. It was originally scaffolded via Google AI Studio (see `metadata.json`, `@google/genai` dependency) but **no component currently calls the Gemini API** — the `CodePlayground` "Diagnostic Lab" is fully client-side simulated (debounce, batching, a11y, error-boundary demos) despite the AI-sounding dependency footprint. `express`/`dotenv` are present as leftover scaffolding for potential server-side use but there is no `server.js` in the repo currently.

### Structure
- `src/App.tsx` — top-level composition. Renders a fixed full-viewport background stack (two images cross-faded on scroll progress + a canvas-based radial-gradient "cursor spotlight" mask via `GlobalRevealLayer`) behind the scrollable section list: `Hero → CodePlayground → TechnicalNotes → InterestModule → Experience`. `ContactForm` is imported but currently commented out of the render tree.
- `src/components/` — one component per page section, each self-contained (owns its own local state/animations), plus `Header.tsx` (sticky nav with in-page anchor scrolling) and `ThemeToggle.tsx`.
- `src/data/portfolioData.ts` — all site content lives here as typed constants (`developerProfile`, `caseStudies`, etc.), not fetched from any API. To update copy/case-studies/experience entries, edit this file rather than the components.
- `src/types.ts` — shared TypeScript interfaces for the content model (`CaseStudy`, `TechNote`, `Experience`, `TrailPoint`, `VirtualPlant`, etc.) that `portfolioData.ts` and components conform to.

### Styling conventions
- Tailwind v4 via the `@tailwindcss/vite` plugin — no `tailwind.config.js`; theme customization (fonts) lives in `src/index.css` under `@theme`.
- Dark mode is the default/primary look: `index.html` sets `class="dark"` on `<html>` and most components style dark-mode-first with light variants as the `dark:` exception, not the other way around.
- Custom animations (hero reveal/fade/zoom, scroll trace) are defined as raw `@keyframes` in `src/index.css` and applied via utility classes like `.hero-anim`, `.hero-reveal`; respects `prefers-reduced-motion`.
- Path alias `@/*` maps to the repo root (configured in both `tsconfig.json` and `vite.config.ts`).

### Dev server notes
- `vite.config.ts` disables HMR and file watching when the `DISABLE_HMR` env var is `true` — this is intentional for the AI Studio agent-editing environment (avoids flicker while files are being edited) and should not be "fixed" or removed.
