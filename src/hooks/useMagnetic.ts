import { useEffect, type RefObject } from 'react';
import { initMagnetic } from '@/animations/magneticEffects';

/** Attaches magnetic-button behaviour to all `.magnetic` elements in `scopeRef`. */
export function useMagnetic(scopeRef: RefObject<HTMLElement | null>, enabled = true): void {
  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope || !enabled) return;
    return initMagnetic(scope);
  }, [scopeRef, enabled]);
}

/** Alias matching the requested GSAP hook naming. */
export const useMagneticButtons = useMagnetic;
