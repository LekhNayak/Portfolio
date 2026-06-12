import { useEffect } from 'react';
import { ScrollTrigger, registerGsap } from '@/animations/registerGsap';

/**
 * Re-measures every ScrollTrigger once the page has actually finished laying
 * out. Mobile browsers — Firefox especially — compute trigger start positions
 * before the display font (Bangers) and hero images settle, which can leave
 * `.reveal` / `.flip3d` content stuck at opacity 0. Refreshing after fonts +
 * window load (and once more as a safety) keeps the content identical to Chrome.
 */
export function useScrollRefresh(ready: boolean): void {
  useEffect(() => {
    if (!ready) return;
    registerGsap();

    let cancelled = false;
    const refresh = () => {
      if (!cancelled) ScrollTrigger.refresh();
    };

    // settle the initial layout, then the slower font-driven reflow
    const t1 = window.setTimeout(refresh, 250);
    const t2 = window.setTimeout(refresh, 1200);
    window.addEventListener('load', refresh);

    const fonts = (document as Document & { fonts?: FontFaceSet }).fonts;
    fonts?.ready.then(refresh).catch(() => {});

    return () => {
      cancelled = true;
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener('load', refresh);
    };
  }, [ready]);
}
