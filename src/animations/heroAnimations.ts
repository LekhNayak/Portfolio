import gsap from 'gsap';

export interface HeroIntroTargets {
  /** The inner <span> of each title row (the elements that rise into place). */
  rowSpans: HTMLElement[];
  tag: HTMLElement;
  sub: HTMLElement;
  actions: HTMLElement;
  meta: HTMLElement;
}

/**
 * The hero entrance timeline: title rows flip up with a back-ease stagger,
 * then the tag / sub / actions / meta fade in on the original schedule.
 * (The camera fly-in that shared this timeline lives in `SceneManager.playIntro`.)
 */
export function playHeroIntro(t: HeroIntroTargets): gsap.core.Timeline {
  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
  tl.to(t.rowSpans, { y: 0, rotateX: 0, duration: 1.4, stagger: 0.15, ease: 'back.out(1.4)' }, 0.2)
    .to(t.tag, { opacity: 1, duration: 1 }, 0.5)
    .to(t.sub, { opacity: 1, duration: 1 }, 1)
    .to(t.actions, { opacity: 1, duration: 1 }, 1.2)
    .to(t.meta, { opacity: 1, duration: 1 }, 1.4);
  return tl;
}

/** When reduced motion is requested, snap every hero element to its end state. */
export function revealHeroInstant(t: HeroIntroTargets): void {
  gsap.set(t.rowSpans, { y: 0, rotateX: 0 });
  gsap.set([t.tag, t.sub, t.actions, t.meta], { opacity: 1 });
}

/**
 * 3D depth for the title rows, mouse-driven parallax tilt of the whole block,
 * and the perpetual idle bob. Returns a cleanup that removes the listener and
 * kills the bob tween.
 */
export function initHero3D(h13d: HTMLElement, rows: HTMLElement[], reduceMotion: boolean): () => void {
  rows.forEach((r, i) => {
    r.style.transform = `translateZ(${i * 38}px)`;
  });

  if (reduceMotion) return () => {};

  const onMove = (e: PointerEvent) => {
    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;
    gsap.to(h13d, { rotateY: x * 14, rotateX: -y * 10, duration: 0.8, ease: 'power2.out', transformPerspective: 1100 });
  };
  window.addEventListener('pointermove', onMove);
  const bob = gsap.to(h13d, { y: -8, duration: 2.6, yoyo: true, repeat: -1, ease: 'sine.inOut' });

  return () => {
    window.removeEventListener('pointermove', onMove);
    bob.kill();
  };
}
