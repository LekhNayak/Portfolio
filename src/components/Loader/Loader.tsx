import { useEffect, useRef, useState } from 'react';
import styles from './Loader.module.scss';

const STATUSES = [
  'CLIMBING THE TOWER…',
  'TAKING POSITION…',
  'LOADING WEB FLUID…',
  'INKING THE SKYLINE…',
  'READY TO FIRE!',
] as const;

interface LoaderProps {
  /** Fired once (after the 400ms pause at 100%) to launch the experience. */
  onComplete: () => void;
}

/**
 * React-state-driven loader. Progress climbs in random increments, status text
 * advances through the comic phases, and at 100% it pauses 400ms, fades out and
 * triggers the entrance. No direct DOM manipulation — width/text/visibility are
 * all derived from state.
 */
export function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [statusIdx, setStatusIdx] = useState(0);
  const [done, setDone] = useState(false);
  const firedRef = useRef(false);

  useEffect(() => {
    let p = 0;
    let si = 0;
    let pauseTimer = 0;
    const id = window.setInterval(() => {
      p = Math.min(100, p + Math.random() * 14);
      setProgress(p);
      if ((p / 100) * STATUSES.length > si && si < STATUSES.length - 1) {
        si++;
        setStatusIdx(si);
      }
      if (p >= 100) {
        window.clearInterval(id);
        setStatusIdx(STATUSES.length - 1);
        pauseTimer = window.setTimeout(() => {
          setDone(true);
          if (!firedRef.current) {
            firedRef.current = true;
            onComplete();
          }
        }, 400);
      }
    }, 110);

    return () => {
      window.clearInterval(id);
      window.clearTimeout(pauseTimer);
    };
  }, [onComplete]);

  return (
    <div className={`${styles.loader} ${done ? styles.done : ''}`} role="status" aria-live="polite" aria-busy={!done}>
      <div className={styles.logo}>LEKH!</div>
      <div className={styles.bar}>
        <i className={styles.fill} style={{ width: `${progress}%` }} />
      </div>
      <div className={styles.status}>{STATUSES[statusIdx]}</div>
    </div>
  );
}
