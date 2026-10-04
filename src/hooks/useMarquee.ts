import { useEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { registerGsap, ScrollTrigger } from '@/animations/registerGsap';

/**
 * Drives an infinite marquee with GSAP. The track is expected to hold its
 * content twice, so a -50% shift loops seamlessly. Forward scrolls right→left;
 * `reverse` scrolls left→right. GSAP-driven (not a CSS keyframe) so it keeps
 * running even when the reduced-motion media query freezes CSS animations.
 * Scrolling kicks it into a faster gear in proportion to scroll velocity, then
 * it eases back to its calm cruise (skipped under reduced motion).
 */
export function useMarquee(
  trackRef: RefObject<HTMLElement | null>,
  reverse = false,
  speed = 44, // pixels per second (calm, matches the original cadence)
): void {
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const oneSet = track.offsetWidth / 2; // content is duplicated
    const effSpeed = reverse ? speed * 0.85 : speed; // reverse a touch slower, like the old 22s/26s
    const duration = oneSet > 0 ? oneSet / effSpeed : 24;

    gsap.set(track, { xPercent: reverse ? -50 : 0 });
    const tween = gsap.to(track, {
      xPercent: reverse ? 0 : -50,
      duration,
      ease: 'none',
      repeat: -1,
    });

    let boost: ScrollTrigger | undefined;
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      registerGsap();
      boost = ScrollTrigger.create({
        onUpdate(self) {
          const kick = 1 + Math.min(Math.abs(self.getVelocity()) / 400, 5);
          // overwrite kills any in-flight ramp, so each scroll tick re-aims it
          gsap.to(tween, {
            timeScale: kick,
            duration: 0.15,
            ease: 'power2.out',
            overwrite: true,
            onComplete: () => {
              gsap.to(tween, { timeScale: 1, duration: 1.2, delay: 0.1, ease: 'power2.out', overwrite: true });
            },
          });
        },
      });
    }

    return () => {
      boost?.kill();
      tween.kill();
    };
  }, [trackRef, reverse, speed]);
}
