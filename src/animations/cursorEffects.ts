export interface CursorElements {
  dot: HTMLElement;
  ring: HTMLElement;
  label: HTMLElement;
}

/**
 * Custom comic cursor: an instant red dot, a smoothly-interpolated ring that
 * eases toward the pointer (0.18 lerp), and a tilted Bangers label that shows
 * `data-label` text on hover targets. Hover targets (`.hoverable, a, button`)
 * enlarge the ring via the global `hovering` class.
 *
 * Returns a cleanup that cancels the RAF loop and removes all listeners.
 */
export function initCursor(els: CursorElements): () => void {
  const { dot, ring, label } = els;
  let rx = 0;
  let ry = 0;
  let raf = 0;

  const onMove = (e: PointerEvent) => {
    dot.style.transform = `translate(${e.clientX}px,${e.clientY}px) translate(-50%,-50%)`;
    label.style.left = e.clientX + 'px';
    label.style.top = e.clientY + 'px';
    rx = e.clientX;
    ry = e.clientY;
  };
  window.addEventListener('pointermove', onMove);

  const ringLoop = () => {
    const cur = ring.getBoundingClientRect();
    const cx = cur.left + cur.width / 2;
    const cy = cur.top + cur.height / 2;
    ring.style.transform = `translate(${cx + (rx - cx) * 0.18}px,${cy + (ry - cy) * 0.18}px) translate(-50%,-50%)`;
    raf = requestAnimationFrame(ringLoop);
  };
  ringLoop();

  // hover targets enlarge the ring + surface the comic label
  const hoverables = document.querySelectorAll<HTMLElement>('.hoverable,a,button');
  const cleanups: Array<() => void> = [];
  hoverables.forEach((el) => {
    const enter = () => {
      ring.classList.add('hovering');
      if (el.dataset.label) {
        label.textContent = el.dataset.label;
        label.style.opacity = '1';
      }
    };
    const leave = () => {
      ring.classList.remove('hovering');
      label.style.opacity = '0';
    };
    el.addEventListener('pointerenter', enter);
    el.addEventListener('pointerleave', leave);
    cleanups.push(() => {
      el.removeEventListener('pointerenter', enter);
      el.removeEventListener('pointerleave', leave);
    });
  });

  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener('pointermove', onMove);
    cleanups.forEach((c) => c());
  };
}
