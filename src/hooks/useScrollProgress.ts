import { useEffect, type RefObject } from 'react';
import type { SceneBindings } from '@/context/SceneBindingsContext';

/**
 * Single source of truth for scroll position. On every (passive) scroll it:
 *  - feeds the smoothed web-extension target into the WebGL scene
 *  - writes the top progress-bar width
 *  - writes the HUD scroll percentage
 * All writes are imperative (no React re-render) via the shared bindings ref.
 */
export function useScrollProgress(bindings: RefObject<SceneBindings>): void {
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const denom = h.scrollHeight - h.clientHeight;
      const p = denom > 0 ? h.scrollTop / denom : 0;
      const b = bindings.current;
      b.manager?.setScroll(p);
      if (b.progressFill) b.progressFill.style.width = p * 100 + '%';
      if (b.hudScroll) b.hudScroll.textContent = String(Math.round(p * 100)).padStart(3, '0') + '%';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [bindings]);
}
