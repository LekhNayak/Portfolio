import { useRef, useState } from 'react';
import { LEADERSHIP } from '@/data/leadership';
import { popChips, revealBackFace } from '@/animations/animeEffects';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import shared from '@/styles/shared.module.scss';
import styles from './Leadership.module.scss';

/**
 * Positions of responsibility. Each card flips vertically on click to reveal
 * the detail. Front: role / org / committee size. Back: what I actually did.
 * As the back turns up, its copy rises in and the highlight chips pop (anime.js).
 */
export function Leadership() {
  const [flipped, setFlipped] = useState<boolean[]>(() => LEADERSHIP.map(() => false));
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduceMotion = useReducedMotion();

  const toggle = (i: number) => {
    const toBack = !flipped[i];
    setFlipped((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

    const back = cardRefs.current[i]?.querySelector(`.${styles.back}`);
    if (!back || !toBack || reduceMotion) return;
    revealBackFace([...back.querySelectorAll(`.${styles.backLabel}, .${styles.backTitle}, .${styles.backLead}`)]);
    popChips([...back.querySelectorAll(`.${styles.backChip}`)], 480);
  };

  return (
    <section id="leadership">
      <div className={`${shared.eyebrow} reveal`}>05 — Leadership</div>
      <h2 className={`${shared.h2} flip3d`}>
        POSITIONS OF <span className={shared.accent}>RESPONSIBILITY</span>
      </h2>

      <div className={styles.grid}>
        {LEADERSHIP.map((l, i) => (
          <button
            type="button"
            className={`${styles.card} reveal hoverable ${flipped[i] ? styles.flipped : ''}`}
            key={l.role}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            onClick={() => toggle(i)}
            aria-pressed={flipped[i]}
            aria-label={`${l.role}, ${l.org} — tap to flip`}
            data-no-clickfx
          >
            <span className={styles.flipInner}>
              {/* ---------- FRONT ---------- */}
              <span className={`${styles.face} ${styles.front}`}>
                <img className={styles.logo} src={l.logo} alt="" aria-hidden="true" />
                <span className={styles.content}>
                  <span className={styles.role}>{l.role}</span>
                  <span className={styles.org}>{l.org}</span>
                  <span className={styles.period}>{l.period}</span>
                  <span className={styles.committee}>
                    <b>{l.committee}</b>
                    <em>people committee</em>
                  </span>
                  <span className={styles.flipHint}>tap for details ↻</span>
                </span>
              </span>

              {/* ---------- BACK ---------- */}
              <span className={`${styles.face} ${styles.back}`}>
                <span className={styles.content}>
                  <span className={styles.backLabel}>// what i actually did</span>
                  <span className={styles.backTitle}>{l.role}</span>
                  <span className={styles.backLead}>{l.back.lead}</span>
                  <span className={styles.backChips}>
                    {l.back.highlights.map((h) => (
                      <span className={styles.backChip} key={h}>
                        {h}
                      </span>
                    ))}
                  </span>
                  <span className={styles.flipHint}>↩ back</span>
                </span>
              </span>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
