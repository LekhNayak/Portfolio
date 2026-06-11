import { useEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { registerGsap } from '@/animations/registerGsap';
import { createFlips } from '@/animations/scrollAnimations';

/**
 * 3D flip-down reveals for headings (`.flip3d`), scoped to `scopeRef`.
 * Reduced motion snaps them flat + visible.
 */
export function useFlipAnimations(scopeRef: RefObject<HTMLElement | null>, reduceMotion: boolean): void {
  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;
    registerGsap();

    if (reduceMotion) {
      scope.querySelectorAll<HTMLElement>('.flip3d').forEach((el) => gsap.set(el, { opacity: 1, rotateX: 0, y: 0 }));
      return;
    }

    const ctx = gsap.context(() => createFlips(), scope);
    return () => ctx.revert();
  }, [scopeRef, reduceMotion]);
}
