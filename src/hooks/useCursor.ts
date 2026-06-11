import { useEffect, type RefObject } from 'react';
import { initCursor } from '@/animations/cursorEffects';

/**
 * Wires up the global comic cursor (dot + interpolated ring + hover label).
 * No-op when `enabled` is false (touch devices / reduced motion).
 */
export function useCursor(
  dotRef: RefObject<HTMLElement | null>,
  ringRef: RefObject<HTMLElement | null>,
  labelRef: RefObject<HTMLElement | null>,
  enabled: boolean,
): void {
  useEffect(() => {
    if (!enabled || !dotRef.current || !ringRef.current || !labelRef.current) return;
    return initCursor({ dot: dotRef.current, ring: ringRef.current, label: labelRef.current });
  }, [enabled, dotRef, ringRef, labelRef]);
}

/** Alias matching the requested GSAP hook naming. */
export const useCursorAnimations = useCursor;
