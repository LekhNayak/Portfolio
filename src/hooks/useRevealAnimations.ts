import { useEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { registerGsap } from '@/animations/registerGsap';
import { createReveals, createCardScrub } from '@/animations/scrollAnimations';

/**
 * Scroll reveals (`.reveal`) plus the parallax scrub on the service cards.
 * Both are scoped to `scopeRef` via a GSAP context and reverted on unmount.
 * Reduced motion shows reveals immediately and skips the scrub.
 */
export function useRevealAnimations(scopeRef: RefObject<HTMLElement | null>, reduceMotion: boolean): void {
  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;
    registerGsap();

    if (reduceMotion) {
      scope.querySelectorAll<HTMLElement>('.reveal').forEach((el) => gsap.set(el, { opacity: 1, y: 0 }));
      return;
    }

    const ctx = gsap.context(() => {
      createReveals();
      createCardScrub();
    }, scope);
    return () => ctx.revert();
  }, [scopeRef, reduceMotion]);
}
