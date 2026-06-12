import { LEADERSHIP } from '@/data/leadership';
import shared from '@/styles/shared.module.scss';
import styles from './Leadership.module.scss';

/** Leadership roles with a faint animated network backdrop + stat highlights. */
export function Leadership() {
  return (
    <section id="leadership">
      <div className={`${shared.eyebrow} reveal`}>05 — Leadership</div>
      <h2 className={`${shared.h2} flip3d`}>
        POSITIONS OF <span className={shared.accent}>RESPONSIBILITY</span>
      </h2>

      <div className={styles.grid}>
        {LEADERSHIP.map((l) => (
          <div className={`${styles.card} reveal hoverable`} key={l.role}>
            <svg className={styles.net} preserveAspectRatio="none" viewBox="0 0 100 100" aria-hidden="true">
              <polyline points="8,80 30,50 55,66 78,30 94,48" />
              <polyline points="12,24 38,58 60,34 86,62" />
              <circle cx="30" cy="50" r="2.2" />
              <circle cx="55" cy="66" r="2.2" />
              <circle cx="78" cy="30" r="2.2" />
            </svg>
            <div className={styles.content}>
              <h4 className={styles.role}>{l.role}</h4>
              <div className={styles.org}>{l.org}</div>
              <p className={styles.blurb}>{l.blurb}</p>
              <div className={styles.stats}>
                {l.stats.map((s) => (
                  <div className={styles.stat} key={s.label}>
                    <b>{s.num}</b>
                    <span>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
