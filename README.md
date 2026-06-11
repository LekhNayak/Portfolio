# SARVESH — AI Builder & Coach (React migration)

A pixel-faithful migration of the original single-file comic / Spider-Verse
portfolio into a modern **React 19 + Vite + TypeScript** application. Every
animation, interaction and the full WebGL scene are preserved — GSAP still
orchestrates all motion; Three.js still renders the city/hero/web scene.

## Stack

- React 19 + Vite + TypeScript
- GSAP + ScrollTrigger (all animation orchestration)
- Three.js (procedural city, hero silhouette, scroll-fired web, moon, clouds)
- SCSS Modules (+ a global stylesheet for tokens, comic textures & shared keyframes)

## Run

```bash
npm install
npm run dev        # start the dev server
npm run build      # type-check (tsc -b) + production build
npm run preview    # preview the production build
```

## Architecture

```
src/
├─ three/        SceneManager + CityScene/HeroSilhouette/WebShooter/Moon/Clouds/Materials
├─ animations/   pure GSAP/canvas routines (hero, scroll, scramble, magnetic, cardTilt, cursor)
├─ hooks/        thin React wrappers around the animation routines (GSAP context + cleanup)
├─ components/   one folder per UI piece (.tsx + .module.scss)
├─ context/      SceneBindings bridge (imperative 60fps HUD/scroll writes, no re-renders)
├─ styles/       global.scss (tokens, textures, keyframes) + _abstracts + shared.module
├─ pages/Home.tsx
├─ App.tsx
└─ main.tsx
```

### Key design decisions

- **Plain Three.js (not R3F):** the original scene is a tightly-coupled
  imperative system; keeping it imperative inside `SceneManager` guarantees
  identical behaviour and frame timing. Full GPU disposal runs on unmount.
- **Imperative HUD/scroll bridge:** the render loop and scroll handler write
  the HUD/progress text every frame through a shared `SceneBindings` ref — no
  React re-renders in the hot path (preserving 60 FPS).
- **Global marker classes** (`reveal`, `flip3d`, `card`, `magnetic`,
  `hoverable`, `skew-wrap`, `num`, `cards`) sit alongside the hashed SCSS-module
  classes so GSAP selector queries keep working while styling stays modular.
- **Reduced motion:** the custom cursor/web-trail are not mounted, looping CSS
  animations are neutralised, and every reveal/counter snaps to its end state.

The original implementation is preserved at `legacy/original.html` for reference.
