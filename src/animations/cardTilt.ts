import gsap from 'gsap';

/**
 * Interactive comic-panel tilt for `.card` elements within `scope`:
 *  - tracks the cursor to drive the radial hover glow (`--mx` / `--my`)
 *  - tilts the panel in 3D (rotateX / rotateY) for a depth illusion
 *  - springs back elastically on leave
 * Returns a cleanup that removes every listener.
 */
export function initCardTilt(scope: HTMLElement): () => void {
  const cleanups: Array<() => void> = [];

  scope.querySelectorAll<HTMLElement>('.card').forEach((card) => {
    const move = (e: PointerEvent) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      card.style.setProperty('--mx', px * 100 + '%');
      card.style.setProperty('--my', py * 100 + '%');
      gsap.to(card, {
        rotateY: (px - 0.5) * 16,
        rotateX: (0.5 - py) * 16,
        duration: 0.5,
        ease: 'power2.out',
        transformPerspective: 1000,
      });
    };
    const leave = () => gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.8, ease: 'elastic.out(1,.5)' });

    card.addEventListener('pointermove', move);
    card.addEventListener('pointerleave', leave);
    cleanups.push(() => {
      card.removeEventListener('pointermove', move);
      card.removeEventListener('pointerleave', leave);
      gsap.killTweensOf(card);
    });
  });

  return () => cleanups.forEach((c) => c());
}
