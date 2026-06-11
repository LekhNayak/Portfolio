import { useEffect, type RefObject } from 'react';
import { initHero3D, playHeroIntro, revealHeroInstant, type HeroIntroTargets } from '@/animations/heroAnimations';

export interface HeroIntroRefs {
  /** The `.h1-3d` wrapper that tilts with the mouse + bobs. */
  h13d: RefObject<HTMLElement | null>;
  /** The three `.row` spans (carry translateZ depth). */
  rows: RefObject<HTMLElement[]>;
  /** The three inner text spans (rise into place during the entrance). */
  rowSpans: RefObject<HTMLElement[]>;
  tag: RefObject<HTMLElement | null>;
  sub: RefObject<HTMLElement | null>;
  actions: RefObject<HTMLElement | null>;
  meta: RefObject<HTMLElement | null>;
}

/**
 * Owns every hero animation:
 *  - perpetual 3D depth + mouse-tilt + idle bob (on mount)
 *  - the entrance timeline, played once `active` flips true (loader done)
 * Reduced motion snaps everything to its end state.
 */
export function useHeroIntro(refs: HeroIntroRefs, active: boolean, reduceMotion: boolean): void {
  // perpetual 3D: depth on the rows, mouse-tilt + bob on the wrapper
  useEffect(() => {
    if (!refs.h13d.current) return;
    return initHero3D(refs.h13d.current, refs.rows.current ?? [], reduceMotion);
  }, [refs.h13d, refs.rows, reduceMotion]);

  // entrance
  useEffect(() => {
    if (!active) return;
    const targets: HeroIntroTargets = {
      rowSpans: refs.rowSpans.current ?? [],
      tag: refs.tag.current!,
      sub: refs.sub.current!,
      actions: refs.actions.current!,
      meta: refs.meta.current!,
    };
    if (!targets.tag || !targets.sub || !targets.actions || !targets.meta) return;

    if (reduceMotion) {
      revealHeroInstant(targets);
      return;
    }
    const tl = playHeroIntro(targets);
    return () => {
      tl.kill();
    };
  }, [active, reduceMotion, refs]);
}
