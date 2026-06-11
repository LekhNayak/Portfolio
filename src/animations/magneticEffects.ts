import gsap from 'gsap';

/**
 * Magnetic pull on `.magnetic` buttons within `scope`: the element chases the
 * cursor at 0.32 strength and springs back elastically on leave.
 * Returns a cleanup that removes every listener.
 */
export function initMagnetic(scope: HTMLElement): () => void {
  const cleanups: Array<() => void> = [];

  scope.querySelectorAll<HTMLElement>('.magnetic').forEach((btn) => {
    const move = (e: PointerEvent) => {
      const r = btn.getBoundingClientRect();
      gsap.to(btn, {
        x: (e.clientX - r.left - r.width / 2) * 0.32,
        y: (e.clientY - r.top - r.height / 2) * 0.32,
        duration: 0.4,
      });
    };
    const leave = () => gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1,.4)' });

    btn.addEventListener('pointermove', move);
    btn.addEventListener('pointerleave', leave);
    cleanups.push(() => {
      btn.removeEventListener('pointermove', move);
      btn.removeEventListener('pointerleave', leave);
      gsap.killTweensOf(btn);
    });
  });

  return () => cleanups.forEach((c) => c());
}
