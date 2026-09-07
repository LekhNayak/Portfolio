export interface CursorElements {
  label: HTMLElement;
}

/**
 * Comic hover label: a tilted Bangers caption trailing the pointer that shows
 * `data-label` text over hover targets (`.hoverable, a, button`).
 *
 * The pointer itself is the native Spider-Man image cursor set in global.scss.
 * The old red dot and eased ring are both gone — they drew on top of the Spidey
 * art — which also means there is no RAF loop left here at all.
 *
 * Returns a cleanup that removes all listeners.
 */
export function initCursor(els: CursorElements): () => void {
  const { label } = els;

  const onMove = (e: PointerEvent) => {
    label.style.left = e.clientX + 'px';
    label.style.top = e.clientY + 'px';
  };
  window.addEventListener('pointermove', onMove);

  // only elements that actually carry a label need listeners now that the ring
  // (which reacted to every hover target) is gone
  const cleanups: Array<() => void> = [];
  document.querySelectorAll<HTMLElement>('.hoverable,a,button').forEach((el) => {
    const text = el.dataset.label;
    if (!text) return;
    const enter = () => {
      label.textContent = text;
      label.style.opacity = '1';
    };
    const leave = () => {
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
    window.removeEventListener('pointermove', onMove);
    cleanups.forEach((c) => c());
  };
}
