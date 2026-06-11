import { useRef } from 'react';
import { useCursor } from '@/hooks/useCursor';
import styles from './Cursor.module.scss';

interface CursorProps {
  /** Disabled on touch devices / reduced motion (component is not mounted). */
  enabled: boolean;
}

/** The global comic cursor: instant dot, eased ring, hover label. */
export function Cursor({ enabled }: CursorProps) {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useCursor(dotRef, ringRef, labelRef, enabled);

  return (
    <>
      <div ref={dotRef} className={styles.dot} aria-hidden="true" />
      <div ref={ringRef} className={styles.ring} aria-hidden="true" />
      <div ref={labelRef} className={styles.label} aria-hidden="true" />
    </>
  );
}
