import { useRef } from 'react';
import { useCursor } from '@/hooks/useCursor';
import styles from './Cursor.module.scss';

interface CursorProps {
  /** Disabled on touch devices / reduced motion (component is not mounted). */
  enabled: boolean;
}

/**
 * The comic hover label that trails the native Spider-Man image cursor. The
 * pointer itself is a real CSS cursor (see global.scss) — the old red dot and
 * eased ring are gone, so nothing is painted over the Spidey art.
 */
export function Cursor({ enabled }: CursorProps) {
  const labelRef = useRef<HTMLDivElement>(null);

  useCursor(labelRef, enabled);

  return <div ref={labelRef} className={styles.label} aria-hidden="true" />;
}
