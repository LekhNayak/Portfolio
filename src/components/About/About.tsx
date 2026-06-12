import { useState } from 'react';
import shared from '@/styles/shared.module.scss';
import styles from './About.module.scss';

const STATS = [
  { count: 8.05, decimals: 2, suffix: '', label: 'CGPA · B.Tech CS', back: 'Receipts for the all-nighters' },
  { count: 8, decimals: 0, suffix: '+', label: 'Hackathon Wins', back: 'Trophies & certs — soon' },
  { count: 10, decimals: 0, suffix: '+', label: 'Major Projects', back: 'Demos & screenshots — soon' },
  { count: 300, decimals: 0, suffix: '+', label: 'Users Served', back: 'Case studies — soon' },
] as const;

/** "Who is Lekh" — casual intro + the four flip-to-reveal stat cards. */
export function About() {
  const [flipped, setFlipped] = useState<boolean[]>(() => STATS.map(() => false));

  const toggle = (i: number) =>
    setFlipped((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

  return (
    <section id="about">
      <div className={`${shared.eyebrow} reveal`}>01 — Who is Lekh</div>
      <h2 className={`${shared.h2} flip3d`}>
        4TH-YEAR CS STUDENT, <span className={shared.accent}>PROFESSIONAL</span>{' '}
        <span className={shared.accentB}>OVERTHINKER</span>
      </h2>

      <div className={styles.aboutGrid}>
        <div className={styles.aboutText}>
          <p className="reveal">
            Hi! I'm a <b>4th-year B.Tech CSE student</b> who stumbled into engineering and now does coding (kinda). On
            paper it's a degree; in practice it's one very long debugging session.
          </p>
          <p className="reveal">
            My PC and I have been through more together than most people go through in a relationship; late nights,
            crashes, the occasional breakdown (mostly mine). Somehow we keep <b>running</b>.
          </p>
          <p className="reveal">
            When I'm not fighting my own code, I'm building <b>full-stack products</b>,  or jumping into a{' '}
            <b>debate or case study</b> to feel smart again.
          </p>
        </div>

        <div className={`${styles.stats} reveal`}>
          {STATS.map((s, i) => (
            <button
              type="button"
              className={`${styles.card} hoverable ${flipped[i] ? styles.flipped : ''}`}
              key={s.label}
              onClick={() => toggle(i)}
              aria-pressed={flipped[i]}
              aria-label={`${s.label} — tap to flip`}
              data-no-clickfx
            >
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
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
