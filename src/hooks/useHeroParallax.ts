import { useEffect, type RefObject } from 'react';
import { registerGsap, gsap } from '@/animations/registerGsap';

export interface HeroParallaxRefs {
  hero: RefObject<HTMLElement | null>;
  left: RefObject<HTMLElement | null>;
  right: RefObject<HTMLElement | null>;
  hint: RefObject<HTMLElement | null>;
}

/**
 * Scroll-out depth for the hero: as it leaves the viewport the copy drifts up
 * gently while the portrait deck rises faster, so the two columns separate
 * like layered panels. The scroll cue fades out within the first stretch of
 * scroll. Only `y` on the column wrappers (and the cue's opacity) is scrubbed —
 * the entrance tweens own opacity / scale / rotate, so the two never compete.
 * Skipped under reduced motion.
 */
export function useHeroParallax(refs: HeroParallaxRefs, reduceMotion: boolean): void {
  useEffect(() => {
    const hero = refs.hero.current;
    if (!hero || reduceMotion) return;
    registerGsap();

    const ctx = gsap.context(() => {
      const scrub = { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.6 };
      if (refs.left.current) gsap.to(refs.left.current, { y: -70, ease: 'none', scrollTrigger: scrub });
      if (refs.right.current) gsap.to(refs.right.current, { y: -150, ease: 'none', scrollTrigger: scrub });
      if (refs.hint.current) {
        gsap.to(refs.hint.current, {
          opacity: 0,
          ease: 'none',
          scrollTrigger: { trigger: hero, start: 'top top', end: '18% top', scrub: true },
        });
      }
    }, hero);
    return () => ctx.revert();
  }, [refs, reduceMotion]);
}
