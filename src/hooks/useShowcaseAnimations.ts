import { useEffect, type RefObject } from 'react';
import { registerGsap, gsap } from '@/animations/registerGsap';
import {
  createBadgePop,
  createChipStagger,
  createTimelineDraw,
  createTimelineItems,
} from '@/animations/scrollAnimations';

/**
 * V2 showcase enhancements (chip stagger, timeline draw + slide, badge pop).
 * All target NEW marker classes, are scoped to `scopeRef` and reverted on
 * unmount — they never interfere with the existing reveal/flip/card/web systems.
 * Under reduced motion nothing is applied (content sits at its natural state).
 */
export function useShowcaseAnimations(scopeRef: RefObject<HTMLElement | null>, reduceMotion: boolean): void {
  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope || reduceMotion) return;
    registerGsap();

    const ctx = gsap.context(() => {
      createChipStagger();
      createTimelineDraw();
      createTimelineItems();
      createBadgePop();
    }, scope);
    return () => ctx.revert();
  }, [scopeRef, reduceMotion]);
}
