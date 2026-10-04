import { EXPERIENCE } from '@/data/experience';
import shared from '@/styles/shared.module.scss';
import styles from './Experience.module.scss';

/**
 * Experience timeline. The spine draws itself on scroll (`tl-line`), nodes
 * pulse, and each card slides in from an alternating side (`tl-item` +
 * `data-side`) — all handled by `useShowcaseAnimations`. Each node also sends
 * out radar rings (`tl-ring`) as its card arrives — `useAnimeEnhancements`.
 */
export function Experience() {
  return (
    <section id="experience">
      <div className={`${shared.eyebrow} reveal`}>03 — Experience</div>
      <h2 className={`${shared.h2} flip3d`}>
        WHERE I'VE <span className={shared.accent}>Worked</span>
      </h2>

      <div className={styles.timeline}>
        <div className={`${styles.line} tl-line`} aria-hidden="true" />
        {EXPERIENCE.map((e, i) => (
          <div className={`${styles.item} tl-item`} data-side={i % 2 ? 'r' : 'l'} key={e.no}>
            <span className={`${styles.node} tl-node`} aria-hidden="true">
              <span className={`${styles.ring} tl-ring`} />
            </span>
            <div className={`${styles.card} hoverable`}>
              <div className={styles.no}>{e.no}</div>
              <h4 className={styles.company}>
                {e.url ? (
                  <a className={`${styles.companyLink} hoverable`} href={e.url} target="_blank" rel="noopener">
                    {e.org} ↗
                  </a>
                ) : (
                  e.org
                )}
              </h4>
              <div className={styles.position}>{e.role}</div>
              <div className={styles.meta}>
                <span className={styles.period}>{e.period}</span>
                <span className={styles.tag}>{e.tag}</span>
              </div>
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
