import { useCallback, useLayoutEffect, useRef, type KeyboardEvent } from 'react';
import gsap from 'gsap';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import styles from './Hero.module.scss';

// Photos live in /public/assets (served from the site root).
const IMAGES = ['1', '2', '3', '4', '5', '7', '8'].map((n) => `/assets/${n}.jpeg`);

// The three visible cascade positions (front → back). Cards past the third are
// parked on the back position, hidden, until they rotate forward again.
const SLOTS = [
  { x: 0, y: 0, r: -3, s: 1 },
  { x: 18, y: 20, r: 3, s: 1 },
  { x: 36, y: 40, r: -2, s: 1 },
];

/**
 * The hero portrait panel — a tappable comic card-deck. The frame + "ISSUE
 * #LEKH" tag stay put; inside, 2–3 photos cascade with neobrutalist offset
 * shadows. Tapping sends the front photo behind the stack to become the last
 * card. All positioning is imperative GSAP (no React re-render per shuffle).
 */
export function HeroAvatar() {
  const reduceMotion = useReducedMotion();
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const orderRef = useRef<number[]>(IMAGES.map((_, i) => i));
  const animatingRef = useRef(false);

  // place every card according to its slot in the current order
  const layout = useCallback((animate: boolean) => {
    const order = orderRef.current;
    order.forEach((cardId, slot) => {
      const el = cardRefs.current[cardId];
      if (!el) return;
      const s = SLOTS[Math.min(slot, SLOTS.length - 1)];
      const hidden = slot > SLOTS.length - 1;
      el.style.zIndex = String(IMAGES.length - slot); // snaps → leaving card drops behind immediately
      const to = { x: s.x, y: s.y, rotation: s.r, scale: s.s, opacity: hidden ? 0 : 1 };
      if (animate) gsap.to(el, { ...to, duration: 0.5, ease: 'power3.out' });
      else gsap.set(el, to);
    });
  }, []);

  useLayoutEffect(() => {
    layout(false);
  }, [layout]);

  // send the front card to the back of the deck
  const shuffle = useCallback(() => {
    if (animatingRef.current) return;
    const order = orderRef.current;
    if (order.length < 2) return;
    orderRef.current = [...order.slice(1), order[0]];

    if (reduceMotion) {
      layout(false);
      return;
    }
    animatingRef.current = true;
    layout(true);
    gsap.delayedCall(0.5, () => {
      animatingRef.current = false;
    });
  }, [layout, reduceMotion]);

  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      shuffle();
    }
  };

  return (
    <div
      className={`${styles.avatar} hoverable`}
      role="button"
      tabIndex={0}
      aria-label="Tap to shuffle the photos"
      onClick={shuffle}
      onKeyDown={onKey}
      data-no-clickfx
    >
      <span className={styles.avatarTag}>ISSUE #LEKH</span>

      <div className={styles.deck}>
        {IMAGES.map((src, i) => (
          <div
            className={styles.deckCard}
            key={src}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
          >
            <img src={src} alt="" draggable={false} />
          </div>
        ))}
      </div>

      <span className={styles.avatarNote}>// tap to shuffle</span>
    </div>
  );
}
