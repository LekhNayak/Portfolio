# Lekh Nayak — Software Engineer Portfolio

A Spider-Verse / comic-book themed engineering portfolio built as a **React 19 + Vite + TypeScript** single-page application. Every animation, interaction, and the full WebGL scene are driven by GSAP and Three.js — no UI framework, no Tailwind.

**Live:** [lekh.dev](https://lekh.dev) &nbsp;·&nbsp; **Contact:** lekh.nayak23@spit.ac.in

---

## Stack

| Layer | Library / Tool |
|---|---|
| UI | React 19 + TypeScript (strict) |
| Bundler | Vite 6 |
| Animation | GSAP 3.12.5 + ScrollTrigger |
| 3-D scene | Three.js r171 (plain imperative, not R3F) |
| Styling | SCSS Modules — no Tailwind, no UI libs |

---

## Quick start

```bash
npm install
npm run dev        # dev server → http://localhost:5173
npm run build      # tsc -b + vite production build
npm run preview    # preview the production build locally
npm run typecheck  # type-check only, no emit
```

---

## Project structure

```
src/
├─ three/
│   ├─ SceneManager.ts      — WebGLRenderer lifecycle + animation loop
│   ├─ CityScene.ts         — procedural building geometry + canvas-texture windows
│   ├─ HeroSilhouette.ts    — billboard hero sprite
│   ├─ WebShooter.ts        — TubeGeometry web drawn by scroll via setDrawRange
│   ├─ Moon.ts              — emissive sphere + halo
│   ├─ Clouds.ts            — 6 billboard cloud sprites
│   ├─ Particles.ts         — 150-vertex ink-dust Points (upward drift)
│   └─ Materials.ts         — shared MeshStandardMaterial helpers
│
├─ animations/
│   ├─ heroAnimations.ts    — scramble + 3-D text + stagger entrance
│   ├─ scrollAnimations.ts  — reveal / flip3d / counters / chips / timeline / badge-pop
│   ├─ magneticButton.ts    — magnetic hover effect
│   ├─ cardTilt.ts          — perspective tilt on project cards
│   ├─ cursor.ts            — custom ink-drop cursor
│   └─ webTrail.ts          — mouse-follow SVG web trail
│
├─ hooks/
│   ├─ useHeroAnimations.ts
│   ├─ useScrollAnimations.ts
│   ├─ useNumberCounters.ts
│   ├─ useShowcaseAnimations.ts  — V2: chip stagger, timeline draw, badge pop
│   ├─ useMagneticButtons.ts
│   ├─ useCardTilt.ts
│   ├─ useCursor.ts
│   └─ useWebTrail.ts
│
├─ components/
│   ├─ Loader/
│   ├─ HUD/
│   ├─ Nav/
│   ├─ Hero/
│   ├─ Marquee/
│   ├─ About/
│   ├─ Projects/
│   ├─ Research/
│   ├─ Experience/
│   ├─ Achievements/
│   ├─ Leadership/
│   ├─ Contact/
│   └─ Footer/
│
├─ context/
│   └─ SceneBindingsContext.tsx  — mutable ref bridge for 60fps HUD writes
│
├─ data/
│   ├─ profile.ts       — name, brand, links, hero copy
│   ├─ projects.ts      — 6 project cards (issue #01–#06)
│   ├─ research.ts      — Quantum QUBO entry + accuracy metric
│   ├─ experience.ts    — 2 timeline entries
│   ├─ achievements.ts  — 6 badge entries
│   ├─ leadership.ts    — 2 role cards
│   └─ marquee.ts       — FWD + REV strip copy
│
├─ styles/
│   ├─ global.scss          — tokens, comic textures, all @keyframes
│   ├─ _abstracts.scss      — design tokens + mixins (auto-injected into every module)
│   └─ shared.module.scss
│
├─ pages/Home.tsx
├─ App.tsx
└─ main.tsx
```

---

## Architecture notes

### Plain Three.js (not R3F)
The WebGL scene is a tightly-coupled imperative system (`SceneManager` owns the renderer, RAF loop, and all sub-scenes). Keeping it fully imperative inside `SceneManager` guarantees identical frame timing to the original. Full GPU disposal (`geometry.dispose()`, `material.dispose()`, `texture.dispose()`, `renderer.dispose()`) runs on component unmount.

### Imperative HUD / scroll bridge
The render loop and scroll handler write HUD/progress text nodes every frame through the `SceneBindings` context — a mutable ref object holding raw DOM element refs. No React re-renders in the hot path, preserving 60 fps.

### SCSS Modules + global keyframes
All `@keyframes` live in `global.scss` (never mangled). Per-component styles are SCSS Modules with hashed class names. `_abstracts.scss` is auto-injected into every module via `vite.config.ts` `additionalData`, so design tokens and mixins are available everywhere without explicit imports.

### Global marker classes
GSAP selector queries (`gsap.utils.toArray('.reveal')`) need stable, un-hashed class names. A fixed set of marker classes sits alongside the hashed SCSS-module classes on elements:

`reveal` · `flip3d` · `card` · `magnetic` · `hoverable` · `skew-wrap` · `num` · `cards` · `js-chips` · `tl-line` · `tl-item` · `tl-node` · `badge-pop`

### Animated counters
Counters use a proxy-object tween (`{ v: 0 }`) rather than tweening `innerText` directly. The `data-decimals` and `data-suffix` HTML attributes configure per-element precision (e.g. `8.05` CGPA uses `data-decimals="2"`).

### Reduced motion
Under `prefers-reduced-motion: reduce`: the custom cursor and web trail are not mounted, looping CSS animations are neutralised, and every reveal / counter snaps instantly to its final state via `setCountersInstant()`.

---

## Content

All editable copy lives in `src/data/`:

| File | What to edit |
|---|---|
| `profile.ts` | Name, brand, social links, resume path, hero copy |
| `projects.ts` | Project cards — GitHub URLs, demo URLs, tech chips |
| `research.ts` | Research entry — title, blurb, accuracy metric |
| `experience.ts` | Timeline entries |
| `achievements.ts` | Badge entries |
| `leadership.ts` | Leadership role cards |
| `marquee.ts` | Scrolling strip copy |

### Resume PDF
Drop `Lekh_Nayak_Resume.pdf` into `public/`. It is linked from the hero and contact "Download Resume" buttons (configured in `PROFILE.links.resume`).
