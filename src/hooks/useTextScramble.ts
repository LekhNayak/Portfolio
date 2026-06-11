import { useEffect, type RefObject } from 'react';
import { scrambleText } from '@/animations/textScramble';

/**
 * Plays the scramble-in effect on `ref` once `active` flips true (e.g. after
 * the loader finishes). Skipped entirely under reduced motion.
 */
export function useTextScramble(
  ref: RefObject<HTMLElement | null>,
  active: boolean,
  reduceMotion: boolean,
): void {
  useEffect(() => {
    if (!active || reduceMotion || !ref.current) return;
    return scrambleText(ref.current);
  }, [active, reduceMotion, ref]);
}
