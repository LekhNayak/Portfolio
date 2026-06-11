import { useMemo } from 'react';
import { RESEARCH } from '@/data/research';
import shared from '@/styles/shared.module.scss';
import styles from './Research.module.scss';

const PARTICLE_COUNT = 18;

/**
 * Featured research panel with an animated "quantum" backdrop (drifting
 * particles + connection lines + grid). The accuracy metric reuses the global
 * `.num` counter system so it animates with the rest of the page.
 */
export function Research() {
  // stable random particle field for this mount
  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }, () => {
        const size = 4 + Math.random() * 7;
        return {
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          width: `${size}px`,
          height: `${size}px`,
          animationDelay: `${(Math.random() * -8).toFixed(2)}s`,
          animationDuration: `${(4 + Math.random() * 5).toFixed(2)}s`,
        };
      }),
    [],
  );

  const r = RESEARCH;

  return (
    <section id="research">
      <div className={`${shared.eyebrow} reveal`}>03 — Research</div>
      <h2 className={`${shared.h2} flip3d`}>
        QUANTUM × <span className={shared.accent}>MACHINE LEARNING</span>
      </h2>

      <div className={`${styles.panel} reveal`}>
        <div className={styles.bg} aria-hidden="true">
          <div className={styles.grid} />
          <svg className={styles.lines} preserveAspectRatio="none" viewBox="0 0 100 100">
            <polyline points="6,84 26,40 48,62 70,22 94,52" />
            <polyline points="10,18 34,70 58,30 82,74 96,30" />
          </svg>
          {particles.map((p, i) => (
            <span key={i} className={styles.particle} style={p} />
          ))}
        </div>

        <div className={styles.content}>
          <div className={styles.badge}>{r.badge}</div>
          <h3 className={styles.title}>{r.title}</h3>
          <p className={styles.blurb}>{r.blurb}</p>

          <div className={styles.metricRow}>
            <div className={styles.metric}>
              <span
                className={`${styles.metricNum} num`}
                data-count={r.metric.value}
                data-decimals={r.metric.decimals}
                data-suffix={r.metric.suffix}
              >
                0
              </span>
              <span className={styles.metricLabel}>{r.metric.label}</span>
            </div>

            <div className={styles.chipRow}>
              {r.tech.map((t) => (
                <span className={styles.chip} key={t}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {r.github && (
            <div className={styles.actions}>
              <a className={`${styles.projBtn} hoverable`} href={r.github} target="_blank" rel="noopener">
                Read the Work ↗
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
