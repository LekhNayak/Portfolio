import { useState } from 'react';
import { LEADERSHIP } from '@/data/leadership';
import shared from '@/styles/shared.module.scss';
import styles from './Leadership.module.scss';

/**
 * Positions of responsibility. Each card flips vertically on click to reveal
 * the detail. Front: role / org / committee size. Back: what I actually did.
 */
export function Leadership() {
  const [flipped, setFlipped] = useState<boolean[]>(() => LEADERSHIP.map(() => false));
  const toggle = (i: number) => setFlipped((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

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
