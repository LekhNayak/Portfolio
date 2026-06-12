import { useEffect, type RefObject } from 'react';
import gsap from 'gsap';

/**
 * Drives an infinite marquee with GSAP. The track is expected to hold its
 * content twice, so a -50% shift loops seamlessly. Forward scrolls right→left;
 * `reverse` scrolls left→right. GSAP-driven (not a CSS keyframe) so it keeps
 * running even when the reduced-motion media query freezes CSS animations.
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

    return () => {
      tween.kill();
    };
  }, [trackRef, reverse, speed]);
}
