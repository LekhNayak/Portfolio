import { useEffect } from 'react';
import { comicBurst, webSplat } from '@/three/comicFx';

/**
 * Global comic click FX: a random word-burst (BAM! / THWACK!) plus a spider-web
 * splat at every pointer press. This used to live inside the Three.js scene's
 * pointerdown handler — it's pure DOM/GSAP, so it runs independently now.
 * No-op under reduced motion.
 */
export function useClickFx(enabled: boolean): void {
  useEffect(() => {
    if (!enabled) return;
    const onDown = (e: PointerEvent) => {
      // skip the flippable cards — the burst fights their flip interaction
      if ((e.target as HTMLElement).closest('[data-no-clickfx]')) return;
      comicBurst(e.clientX, e.clientY);
      webSplat(e.clientX, e.clientY);
    };
    window.addEventListener('pointerdown', onDown);
    return () => window.removeEventListener('pointerdown', onDown);
  }, [enabled]);
}
