import { useRef, useState, type MouseEvent } from 'react';
import { PROJECTS } from '@/data/projects';
import { popChips, revealBackFace } from '@/animations/animeEffects';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { ProjectIcon } from './ProjectIcon';
import shared from '@/styles/shared.module.scss';
import styles from './Projects.module.scss';

/**
 * Premium project showcase. Each project is a comic "issue" card that reuses
 * the existing tilt + radial-glow + scroll-scrub system (via the global `card`
 * markers). Cards flip on click to a back face with the in-depth story
 * (what / how / impact). The tilt stays on `.card`; the flip lives on an inner
 * wrapper so the two never fight. On each flip anime.js staggers in the face
 * that just turned toward you: the story rows, or the tech chips on return.
 */
export function Projects() {
  const [flipped, setFlipped] = useState<boolean[]>(() => PROJECTS.map(() => false));
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const reduceMotion = useReducedMotion();

  const toggle = (i: number) => {
    const toBack = !flipped[i];
    setFlipped((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

    const card = cardRefs.current[i];
    if (!card || reduceMotion) return;
    if (toBack) {
      revealBackFace([...card.querySelectorAll(`.${styles.back} .${styles.backTitle}, .${styles.back} .${styles.storyRow}`)]);
    } else {
      popChips([...card.querySelectorAll(`.${styles.front} .${styles.chip}`)], 300);
    }
  };

  // flip on card click, but let the GitHub / Live Demo links work normally
  const onCardClick = (e: MouseEvent<HTMLElement>, i: number) => {
    if ((e.target as HTMLElement).closest('a')) return;
    toggle(i);
  };

  return (
    <section id="projects">
      <div className={`${shared.eyebrow} reveal`}>02 — Selected Work</div>
      <h2 className={`${shared.h2} flip3d`}>PROJECTS</h2>

      <div className={`${styles.cards} cards`}>
        {PROJECTS.map((p, i) => (
          <article
            className={`${styles.card} card hoverable reveal ${flipped[i] ? styles.flipped : ''}`}
            key={p.name}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            onClick={(e) => onCardClick(e, i)}
            data-no-clickfx
          >
            <div className={styles.flipInner}>
              {/* ---------- FRONT ---------- */}
              <div className={`${styles.face} ${styles.front}`}>
                <div className={styles.badge}>{p.issue}</div>
                <div className={styles.inner}>
                  <div className={styles.glyph}>
                    <ProjectIcon name={p.icon} />
                  </div>
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
                    <button type="button" className={`${styles.flipBtn} hoverable`} aria-label={`Read the story behind ${p.name}`}>
                      The Story ↻
                    </button>
                  </div>
                </div>
              </div>

              {/* ---------- BACK ---------- */}
              <div className={`${styles.face} ${styles.back}`}>
                <div className={`${styles.badge} ${styles.badgeBack}`}>THE STORY</div>
                <div className={styles.inner}>
                  <h3 className={styles.backTitle}>{p.name}</h3>
                  <dl className={styles.story}>
                    <div className={styles.storyRow}>
                      <dt>The problem</dt>
                      <dd>{p.story.what}</dd>
                    </div>
                    <div className={styles.storyRow}>
                      <dt>What I built</dt>
                      <dd>{p.story.how}</dd>
                    </div>
                    <div className={styles.storyRow}>
                      <dt>The payoff</dt>
                      <dd>{p.story.impact}</dd>
                    </div>
                  </dl>
                  <button type="button" className={`${styles.flipBtn} hoverable`} aria-label={`Back to ${p.name} summary`}>
                    ↩ Back
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
