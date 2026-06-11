import { EXPERIENCE } from '@/data/experience';
import shared from '@/styles/shared.module.scss';
import styles from './Experience.module.scss';

/**
 * Experience timeline. The spine draws itself on scroll (`tl-line`), nodes
 * pulse, and each card slides in from an alternating side (`tl-item` +
 * `data-side`) — all handled by `useShowcaseAnimations`.
 */
export function Experience() {
  return (
    <section id="experience">
      <div className={`${shared.eyebrow} reveal`}>04 — Experience</div>
      <h2 className={`${shared.h2} flip3d`}>
        WHERE I'VE <span className={shared.accent}>SHIPPED</span>
      </h2>

      <div className={styles.timeline}>
        <div className={`${styles.line} tl-line`} aria-hidden="true" />
        {EXPERIENCE.map((e, i) => (
          <div className={`${styles.item} tl-item`} data-side={i % 2 ? 'r' : 'l'} key={e.no}>
            <span className={`${styles.node} tl-node`} aria-hidden="true" />
            <div className={`${styles.card} hoverable`}>
              <div className={styles.no}>{e.no}</div>
              <h4 className={styles.role}>{e.role}</h4>
              <div className={styles.org}>{e.org}</div>
              <p className={styles.blurb}>{e.blurb}</p>
              <div className={`${styles.chipRow} js-chips`}>
                {e.tech.map((t) => (
                  <span className={styles.chip} key={t}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
