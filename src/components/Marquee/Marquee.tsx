import { useRef } from 'react';
import { useMarquee } from '@/hooks/useMarquee';
import styles from './Marquee.module.scss';

export interface MarqueeItem {
  text: string;
  highlight?: boolean;
}

interface MarqueeProps {
  /** One "half" of the loop — it is duplicated so the -50% scroll is seamless. */
  items: MarqueeItem[];
  /** Scrolls right-to-left when true (the `m2` red strip in the original). */
  reverse?: boolean;
  /** Red background variant. */
  variant2?: boolean;
}

/**
 * Infinite comic marquee. The passed items represent a single seamless half;
 * the component renders them twice so the CSS `translateX(-50%)` loops without
 * a visible seam. Timing/direction match the original (22s fwd / 26s rev).
 */
export function Marquee({ items, reverse = false, variant2 = false }: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  useMarquee(trackRef, reverse);

  const content = [...items, ...items];
  return (
    <div className={`${styles.marquee} ${variant2 ? styles.m2 : ''}`} aria-hidden="true">
      <div className={styles.track} ref={trackRef}>
        {content.map((it, i) => (
          <span key={i} className={it.highlight ? styles.hl : undefined}>
            {it.text}
          </span>
        ))}
      </div>
    </div>
  );
}
