import { useEffect, useRef, useState } from 'react';
import { animate, createTimeline, spring, stagger } from 'animejs';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import styles from './Loader.module.scss';

const LOGO = 'LEKH!';

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
 * all derived from state. anime.js layers on the comic flair: the logo letters
 * drop in and ripple, each status line punches in, and the letters burst apart
 * as the loader fades.
 */
export function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [statusIdx, setStatusIdx] = useState(0);
  const [done, setDone] = useState(false);
  const firedRef = useRef(false);
  const reduceMotion = useReducedMotion();
  const charsRef = useRef<HTMLSpanElement[]>([]);
  const statusRef = useRef<HTMLSpanElement>(null);

  // letters drop in on a spring, then ripple until loading finishes
  useEffect(() => {
    const chars = charsRef.current.filter(Boolean);
    if (reduceMotion || !chars.length) return;
    const tl = createTimeline()
      .add(chars, {
        y: { from: -90 },
        rotate: { from: stagger([-25, 25]) },
        opacity: { from: 0 },
        delay: stagger(70, { from: 'center' }),
        ease: spring({ bounce: 0.6, duration: 800 }),
      })
      .add(chars, {
        y: [0, -14, 0],
        duration: 520,
        delay: stagger(65),
        loop: true,
        loopDelay: 450,
        ease: 'inOutSine',
      });
    return () => {
      tl.revert();
    };
  }, [reduceMotion]);

  // punch each new status line in
  useEffect(() => {
    if (reduceMotion || !statusRef.current) return;
    const anim = animate(statusRef.current, {
      scale: [1.35, 1],
      opacity: [0.2, 1],
      duration: 380,
      ease: 'outBack(2)',
    });
    return () => {
      anim.pause();
    };
  }, [statusIdx, reduceMotion]);

  // burst the letters apart as the loader fades out
  useEffect(() => {
    const chars = charsRef.current.filter(Boolean);
    if (!done || reduceMotion || !chars.length) return;
    const anim = animate(chars, {
      y: stagger([-30, 30], { from: 'center' }),
      x: stagger([-60, 60]),
      scale: 1.5,
      opacity: 0,
      rotate: stagger([-20, 20]),
      duration: 650,
      ease: 'outExpo',
      composition: 'replace',
    });
    return () => {
      anim.pause();
    };
  }, [done, reduceMotion]);

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
      <div className={styles.logo} aria-label={LOGO}>
        {LOGO.split('').map((ch, i) => (
          <span
            key={i}
            className={styles.char}
            aria-hidden="true"
            ref={(el) => {
              if (el) charsRef.current[i] = el;
            }}
          >
            {ch}
          </span>
        ))}
      </div>
      <div className={styles.bar}>
        <i className={styles.fill} style={{ width: `${progress}%` }} />
      </div>
      <div className={styles.status}>
        <span className={styles.statusText} ref={statusRef}>
          {STATUSES[statusIdx]}
        </span>
      </div>
    </div>
  );
}
