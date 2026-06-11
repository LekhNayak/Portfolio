import { useEffect, type DependencyList, type RefObject } from 'react';
import gsap from 'gsap';
import { registerGsap } from '@/animations/registerGsap';

/**
 * Runs `setup` inside a `gsap.context` scoped to `scopeRef`, so every tween,
 * ScrollTrigger and selector created inside is automatically tracked and
 * reverted (`ctx.revert()`) on unmount / dependency change.
 */
export function useGSAPContext(
  setup: () => void,
  scopeRef: RefObject<HTMLElement | null>,
  deps: DependencyList = [],
): void {
  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;
    registerGsap();
    const ctx = gsap.context(setup, scope);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
