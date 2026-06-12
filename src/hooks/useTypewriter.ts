import { useEffect, type RefObject } from 'react';

interface TypewriterOptions {
  /** ms per character while typing. */
  typeSpeed?: number;
  /** ms per character while deleting. */
  deleteSpeed?: number;
  /** ms to hold a fully-typed word before deleting. */
  holdFull?: number;
  /** ms to pause on an empty string before the next word. */
  holdEmpty?: number;
  /** ms before the very first character is typed. */
  startDelay?: number;
}

/**
 * Imperative typewriter: cycles through `words`, typing then back-spacing each
 * one, writing straight to `ref.textContent` (no React re-render per keystroke).
 * Under reduced motion it just pins the first word.
 */
export function useTypewriter(
  ref: RefObject<HTMLElement | null>,
  words: readonly string[],
  reduceMotion: boolean,
  opts: TypewriterOptions = {},
): void {
  useEffect(() => {
    const el = ref.current;
    if (!el || words.length === 0) return;

    if (reduceMotion) {
      el.textContent = words[0];
      return;
    }

    const { typeSpeed = 95, deleteSpeed = 45, holdFull = 1400, holdEmpty = 380, startDelay = 650 } = opts;

    let timeout: ReturnType<typeof setTimeout>;
    let wordIdx = 0;
    let charIdx = 0;
    let deleting = false;

    const tick = () => {
      const word = words[wordIdx];
      if (!deleting) {
        charIdx += 1;
        el.textContent = word.slice(0, charIdx);
        if (charIdx === word.length) {
          deleting = true;
          timeout = setTimeout(tick, holdFull);
          return;
        }
        timeout = setTimeout(tick, typeSpeed);
      } else {
        charIdx -= 1;
        el.textContent = word.slice(0, charIdx);
        if (charIdx === 0) {
          deleting = false;
          wordIdx = (wordIdx + 1) % words.length;
          timeout = setTimeout(tick, holdEmpty);
          return;
        }
        timeout = setTimeout(tick, deleteSpeed);
      }
    };

    el.textContent = '';
    timeout = setTimeout(tick, startDelay);
    return () => clearTimeout(timeout);
    // `opts` is treated as a stable config; intentionally keyed on primitives.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, words, reduceMotion]);
}
