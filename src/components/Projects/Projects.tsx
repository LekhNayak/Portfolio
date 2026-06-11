import { PROJECTS } from '@/data/projects';
import shared from '@/styles/shared.module.scss';
import styles from './Projects.module.scss';

/**
 * Premium project showcase. Each project is a comic "issue" card that reuses
 * the existing tilt + radial-glow + scroll-scrub system (via the global `card`
 * markers) and adds V2 flourishes: idle panel float, hover comic rays and a
 * sequentially-staggered tech-chip reveal (`js-chips`).
 */
export function Projects() {
  return (
    <section id="projects">
      <div className={`${shared.eyebrow} reveal`}>02 — What I've Built</div>
      <h2 className={`${shared.h2} flip3d`}>
        PROJECTS FROM <span className={shared.accent}>IDEA</span> TO <span className={shared.accentB}>SHIP</span>
      </h2>

      <div className={`${styles.cards} cards`}>
        {PROJECTS.map((p) => (
          <article className={`${styles.card} card hoverable reveal`} key={p.name}>
            <div className={styles.badge}>{p.issue}</div>
            <div className={styles.inner}>
              <div className={styles.glyph}>{p.glyph}</div>
              <h3 className={styles.title}>{p.name}</h3>
              <p className={styles.blurb}>{p.blurb}</p>
              <div className={styles.impact}>
                <span>⚡</span>
                {p.impact}
              </div>
              <div className={`${styles.chipRow} js-chips`}>
                {p.tech.map((t) => (
                  <span className={styles.chip} key={t}>
                    {t}
                  </span>
                ))}
              </div>
              <div className={styles.actions}>
                <a
                  className={`${styles.projBtn} ${styles.projBtnPrimary} hoverable`}
                  href={p.github}
                  target="_blank"
                  rel="noopener"
                >
                  GitHub ↗
                </a>
                {p.demo && (
                  <a className={`${styles.projBtn} hoverable`} href={p.demo} target="_blank" rel="noopener">
                    Live Demo ↗
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
