import { useEffect, type RefObject } from 'react';
import { initCursor } from '@/animations/cursorEffects';

/**
 * Wires up the comic hover label that trails the native Spider-Man image cursor.
 * No-op when `enabled` is false (touch devices / reduced motion).
 */
export function useCursor(labelRef: RefObject<HTMLElement | null>, enabled: boolean): void {
  useEffect(() => {
    if (!enabled || !labelRef.current) return;
    return initCursor({ label: labelRef.current });
  }, [enabled, labelRef]);
}

/** Alias matching the requested GSAP hook naming. */
export const useCursorAnimations = useCursor;
