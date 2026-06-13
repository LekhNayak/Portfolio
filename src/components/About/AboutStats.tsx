import { useCallback, useEffect, useRef, useState, type CSSProperties, type PointerEvent } from 'react';
import gsap from 'gsap';
import { PROFILE } from '@/data/profile';
import styles from './About.module.scss';

const STATS = [
  { count: 15, decimals: 0, suffix: '+', label: 'Awards & Podiums', back: 'Hackathons, debates & case comps' },
  { count: 6, decimals: 0, suffix: '', label: 'Projects Shipped', back: 'RAG, real-time & HPC systems' },
  { count: 2, decimals: 0, suffix: '', label: 'Internships', back: 'Cactus Life Sciences · SPIT' },
  { count: 60, decimals: 0, suffix: '+', label: 'Team Led · CSI', back: 'Head of Events committee' },
] as const;

const IDLE_MS = 25000; // snap back to origin after this much inactivity
const TAP_PX = 6; // movement under this = a tap (flip), over = a drag
const SNAP = 0.5; // fraction of the card that must be inside its slot to dock
const BASE_ROT = [-1, 1, -1, 1]; // resting comic slant (CSS-driven; cards straighten to 0° when docked)

/** Fraction of rect `a` that overlaps rect `b`. */
function overlapFrac(a: DOMRect, b: DOMRect): number {
  const ix = Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left));
  const iy = Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
  return (ix * iy) / (a.width * a.height || 1);
}

/**
 * The four "Who is Lekh" stat cards — draggable in both faces, flipping on tap.
 * They spring back to their grid positions on scroll or after ~25s idle. Flip
 * all four to back to reveal four target outlines; drop each card onto its box
 * to dock it, and once all four are docked they fuse into one card filling the
 * centre. Tap that card to split them back to the start.
 *
 * The resting slant lives on an inner `.tilt` element (pure CSS) so the GSAP
 * drag transform on the card can never wipe it; docking adds `.docked` which
 * straightens the tilt to 0°.
 */
export function AboutStats() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const slotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mergedRef = useRef<HTMLDivElement>(null);

  const offsets = useRef(STATS.map(() => ({ x: 0, y: 0 })));
  const docked = useRef<boolean[]>(STATS.map(() => false));
  const [dockedUI, setDockedUI] = useState<boolean[]>(() => STATS.map(() => false));
  const setDock = (i: number, val: boolean) => {
    docked.current[i] = val;
    setDockedUI([...docked.current]);
  };
  const setAllDock = (val: boolean) => {
    docked.current = STATS.map(() => val);
    setDockedUI([...docked.current]);
  };

  const [flipped, setFlipped] = useState<boolean[]>(() => STATS.map(() => false));
  const flippedState = useRef(flipped);
  flippedState.current = flipped;
  const [merged, setMerged] = useState(false);
  const isMerged = useRef(false);
  isMerged.current = merged;

  const drag = useRef<{ i: number; sx: number; sy: number; ox: number; oy: number; moved: boolean } | null>(null);
  const idle = useRef<number | undefined>(undefined);

  const isDisplaced = () => offsets.current.some((o) => Math.abs(o.x) > 0.5 || Math.abs(o.y) > 0.5);

  const syncWrapZ = useCallback(() => {
    const w = wrapRef.current;
    if (w) w.style.zIndex = isMerged.current || isDisplaced() ? '40' : '';
  }, []);

  const clearSlotHighlights = useCallback(() => {
    slotRefs.current.forEach((s) => s?.classList.remove(styles.slotActive));
  }, []);

  const resetPositions = useCallback(() => {
    if (isMerged.current) return;
    offsets.current = STATS.map(() => ({ x: 0, y: 0 }));
    setAllDock(false);
    cardRefs.current.forEach((el) => {
      if (!el) return;
      el.style.zIndex = '1';
      gsap.to(el, { x: 0, y: 0, scale: 1, duration: 0.7, ease: 'elastic.out(1, 0.65)' });
    });
    clearSlotHighlights();
    syncWrapZ();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [syncWrapZ, clearSlotHighlights]);

  const armIdle = useCallback(() => {
    window.clearTimeout(idle.current);
    idle.current = window.setTimeout(() => {
      if (!isMerged.current) resetPositions();
    }, IDLE_MS);
  }, [resetPositions]);

  // ---- merge / split ----
  const doMerge = useCallback(() => {
    if (isMerged.current) return;
    window.clearTimeout(idle.current);
    isMerged.current = true;
    setMerged(true);
    syncWrapZ();
  }, [syncWrapZ]);

  const split = useCallback(() => {
    const finish = () => {
      isMerged.current = false;
      setMerged(false);
      const allFront = STATS.map(() => false);
      flippedState.current = allFront;
      setFlipped(allFront);
      offsets.current = STATS.map(() => ({ x: 0, y: 0 }));
      setAllDock(false);
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        el.style.pointerEvents = '';
        el.style.zIndex = '1';
        gsap.to(el, { x: 0, y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.7)', delay: i * 0.05 });
      });
      syncWrapZ();
    };
    const m = mergedRef.current;
    if (m) gsap.to(m, { opacity: 0, scale: 0.82, duration: 0.25, ease: 'power2.in', onComplete: finish });
    else finish();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [syncWrapZ]);

  // crossfade cards ↔ merged card whenever `merged` flips
  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean) as HTMLElement[];
    if (merged) {
      gsap.to(cards, {
        opacity: 0,
        scale: 0.85,
        duration: 0.3,
        stagger: 0.04,
        ease: 'power2.in',
        onComplete: () => cards.forEach((el) => (el.style.pointerEvents = 'none')),
      });
      const m = mergedRef.current;
      if (m) gsap.fromTo(m, { opacity: 0, scale: 0.7, rotate: -4 }, { opacity: 1, scale: 1, rotate: 0, duration: 0.55, delay: 0.28, ease: 'back.out(1.6)' });
    }
  }, [merged]);

  // ---- flip ----
  const toggleFlip = useCallback((i: number) => {
    setFlipped((prev) => {
      const next = prev.map((v, idx) => (idx === i ? !v : v));
      flippedState.current = next;
      return next;
    });
  }, []);

  // when the outlines go away (a card flips back to front), drop all docking
  const armed = flipped.every(Boolean) && !merged;
  useEffect(() => {
    if (!armed) setAllDock(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [armed]);

  // ---- drag ----
  const onDown = (e: PointerEvent<HTMLButtonElement>, i: number) => {
    if (isMerged.current) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { i, sx: e.clientX, sy: e.clientY, ox: offsets.current[i].x, oy: offsets.current[i].y, moved: false };
    setDock(i, false); // picking it up undocks it (and re-slants it)
    const el = cardRefs.current[i];
    if (el) {
      el.style.zIndex = '60';
      gsap.to(el, { scale: 1.05, duration: 0.18, ease: 'power2.out' });
    }
    syncWrapZ();
    armIdle();
  };

  const onMove = (e: PointerEvent<HTMLButtonElement>) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.sx;
    const dy = e.clientY - d.sy;
    if (Math.abs(dx) + Math.abs(dy) > TAP_PX) d.moved = true;
    const nx = d.ox + dx;
    const ny = d.oy + dy;
    offsets.current[d.i] = { x: nx, y: ny };
    const el = cardRefs.current[d.i];
    if (el) gsap.set(el, { x: nx, y: ny });
    const slot = slotRefs.current[d.i];
    if (el && slot) {
      const over = overlapFrac(el.getBoundingClientRect(), slot.getBoundingClientRect()) >= SNAP;
      slot.classList.toggle(styles.slotActive, over);
    }
  };

  const endDrag = (allowFlip: boolean) => {
    const d = drag.current;
    if (!d) return;
    drag.current = null;
    const el = cardRefs.current[d.i];
    if (el) gsap.to(el, { scale: 1, duration: 0.2 });

    if (allowFlip && !d.moved) {
      toggleFlip(d.i);
      if (el) el.style.zIndex = '1';
    } else {
      const slot = slotRefs.current[d.i];
      if (el && slot && flippedState.current.every(Boolean)) {
        const cr = el.getBoundingClientRect();
        const sr = slot.getBoundingClientRect();
        if (overlapFrac(cr, sr) >= SNAP) {
          const ddx = sr.left + sr.width / 2 - (cr.left + cr.width / 2);
          const ddy = sr.top + sr.height / 2 - (cr.top + cr.height / 2);
          const no = { x: offsets.current[d.i].x + ddx, y: offsets.current[d.i].y + ddy };
          offsets.current[d.i] = no;
          gsap.to(el, { x: no.x, y: no.y, duration: 0.28, ease: 'back.out(2)' }); // snap into slot
          setDock(d.i, true); // `.docked` straightens the tilt to 0°
        } else {
          setDock(d.i, false);
        }
      }
      if (el) el.style.zIndex = isDisplaced() ? '60' : '1';
      clearSlotHighlights();
      if (flippedState.current.every(Boolean) && docked.current.every(Boolean)) doMerge();
    }
    syncWrapZ();
    armIdle();
  };

  // ---- scroll resets scattered cards (never the merged card) ----
  useEffect(() => {
    const onScroll = () => {
      if (!isMerged.current && isDisplaced()) resetPositions();
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.clearTimeout(idle.current);
    };
  }, [resetPositions]);

  return (
    <div className={`${styles.stats} reveal`} ref={wrapRef}>
      {armed && (
        <div className={styles.slotLayer} aria-hidden="true">
          {STATS.map((_, i) => (
            <div
              key={i}
              className={styles.slot}
              ref={(el) => {
                slotRefs.current[i] = el;
              }}
            />
          ))}
        </div>
      )}

      {STATS.map((s, i) => (
        <button
          type="button"
          className={`${styles.card} hoverable ${flipped[i] ? styles.flipped : ''} ${dockedUI[i] ? styles.docked : ''}`}
          key={s.label}
          ref={(el) => {
            cardRefs.current[i] = el;
          }}
          onPointerDown={(e) => onDown(e, i)}
          onPointerMove={onMove}
          onPointerUp={() => endDrag(true)}
          onPointerCancel={() => endDrag(false)}
          aria-label={`${s.label} — drag to move, tap to flip`}
          data-no-clickfx
        >
          <span className={styles.tilt} style={{ '--rot': `${BASE_ROT[i]}deg` } as CSSProperties}>
            <span className={styles.flipInner}>
              <span className={`${styles.face} ${styles.front}`}>
                <span
                  className={`${styles.num} num`}
                  data-count={s.count}
                  data-decimals={s.decimals}
                  data-suffix={s.suffix}
                >
                  0
                </span>
                <span className={styles.lbl}>{s.label}</span>
              </span>
              <span className={`${styles.face} ${styles.back}`}>
                <span className={styles.placeholder} aria-hidden="true" />
                <span className={styles.backLbl}>{s.back}</span>
                <span className={styles.flipHint}>↺ flip back</span>
              </span>
            </span>
          </span>
        </button>
      ))}

      {merged && (
        <div
          className={styles.mergedCard}
          ref={mergedRef}
          role="button"
          tabIndex={0}
          onClick={split}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              split();
            }
          }}
          aria-label="Combined card — tap to split"
          data-no-clickfx
        >
          <span className={styles.mergedMono}>{PROFILE.brand}</span>
          <span className={styles.mergedHint}>tap to split ✦</span>
        </div>
      )}
    </div>
  );
}
