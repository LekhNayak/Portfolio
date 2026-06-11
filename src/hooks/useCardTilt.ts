import { useEffect, type RefObject } from 'react';
import { initCardTilt } from '@/animations/cardTilt';

/** Attaches 3D tilt + radial glow to all `.card` elements in `scopeRef`. */
export function useCardTilt(scopeRef: RefObject<HTMLElement | null>, enabled = true): void {
  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope || !enabled) return;
    return initCardTilt(scope);
  }, [scopeRef, enabled]);
}
