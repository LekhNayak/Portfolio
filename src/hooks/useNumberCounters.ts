import { useEffect, type RefObject } from 'react';
import { registerGsap, gsap } from '@/animations/registerGsap';
import { createCounters, setCountersInstant } from '@/animations/scrollAnimations';

/**
 * Animated stat counters (`.num[data-count]`), scoped to `scopeRef`.
 * Reduced motion writes the final value immediately.
 */
export function useNumberCounters(scopeRef: RefObject<HTMLElement | null>, reduceMotion: boolean): void {
  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;
    registerGsap();

    if (reduceMotion) {
      setCountersInstant(scope);
      return;
    }

    const ctx = gsap.context(() => createCounters(), scope);
    return () => ctx.revert();
  }, [scopeRef, reduceMotion]);
}
