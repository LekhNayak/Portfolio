/** Original Spider-Verse scramble character set — preserved exactly. */
export const SCRAMBLE_CHARS = '!<>-_\\/[]{}—=+*^?#01';

/**
 * Progressively de-scrambles an element's text over 40 frames at 30ms each,
 * locking in characters left-to-right. Returns a cleanup that stops the timer.
 * The resolved text is cached on `data-original` so it can be replayed.
 */
export function scrambleText(el: HTMLElement): () => void {
  const original = el.dataset.original ?? el.textContent ?? '';
  el.dataset.original = original;
  let frame = 0;
  const total = 40;
  const timer = window.setInterval(() => {
    frame++;
    el.textContent = original
      .split('')
      .map((ch, i) => {
        if (ch === ' ') return ' ';
        if (i < (frame / total) * original.length) return ch;
        return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      })
      .join('');
    if (frame >= total) {
      el.textContent = original;
      window.clearInterval(timer);
    }
  }, 30);

  return () => window.clearInterval(timer);
}
