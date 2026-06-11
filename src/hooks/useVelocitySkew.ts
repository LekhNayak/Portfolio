import { useEffect } from 'react';
import { registerGsap, gsap } from '@/animations/registerGsap';
import { createVelocitySkew } from '@/animations/scrollAnimations';

/**
 * Velocity-based skew of the whole `.skew-wrap` page wrapper that springs back
 * to flat. Global (no scope). Skipped under reduced motion.
 */
export function useVelocitySkew(reduceMotion: boolean): void {
  useEffect(() => {
    if (reduceMotion) return;
    registerGsap();
    const ctx = gsap.context(() => createVelocitySkew());
    return () => ctx.revert();
  }, [reduceMotion]);
}
