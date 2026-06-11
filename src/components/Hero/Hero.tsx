import { useRef } from 'react';
import { useHeroIntro, type HeroIntroRefs } from '@/hooks/useHeroIntro';
import { useTextScramble } from '@/hooks/useTextScramble';
import { PROFILE } from '@/data/profile';
import shared from '@/styles/shared.module.scss';
import styles from './Hero.module.scss';

interface HeroProps {
  /** True after the loader completes — plays the entrance + scramble. */
  active: boolean;
  reduceMotion: boolean;
}

const ROWS = PROFILE.hero.rows;

/**
 * The 3D comic hero: scramble tag, three depth-staggered title rows that flip
 * up on entrance, body copy, magnetic CTAs and the absolute scroll-hint meta.
 * All motion is orchestrated by `useHeroIntro` + `useTextScramble`.
 */
export function Hero({ active, reduceMotion }: HeroProps) {
  const h13dRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<HTMLElement[]>([]);
  const rowSpansRef = useRef<HTMLElement[]>([]);

  const refs: HeroIntroRefs = {
    h13d: h13dRef,
    rows: rowsRef,
    rowSpans: rowSpansRef,
    tag: tagRef,
    sub: subRef,
    actions: actionsRef,
    meta: metaRef,
  };

  useHeroIntro(refs, active, reduceMotion);
  useTextScramble(tagRef, active, reduceMotion);

  return (
    <section className={styles.hero}>
      <div className={styles.heroTag} ref={tagRef}>
        {PROFILE.hero.tag}
      </div>

      <div className={styles.h13d} ref={h13dRef}>
        <h1 className={styles.h1}>
          {ROWS.map((r, i) => (
            <span
              key={r.text}
              className={styles.row}
              ref={(el) => {
                if (el) rowsRef.current[i] = el;
              }}
            >
              <span
                className={`${styles.rowInner} ${styles[r.cls]}`}
                ref={(el) => {
                  if (el) rowSpansRef.current[i] = el;
                }}
              >
                {r.text}
              </span>
            </span>
          ))}
        </h1>
      </div>

      <p className={styles.heroSub} ref={subRef}>
        Computer Science student, <b>full-stack developer</b>, <b>AI/ML researcher</b> and hackathon winner — passionate
        about building <b>scalable systems</b>, intelligent applications and impactful technology, from RAG platforms to
        HPC portals and quantum-optimized ML.
      </p>

      <div className={styles.heroActions} ref={actionsRef}>
        <a className={`${shared.btn} ${shared.btnPrimary} hoverable magnetic`} data-label="LET'S GO!" href="#projects">
          <span className={shared.dot} /> View Projects
        </a>
        <a
          className={`${shared.btn} ${shared.btnGhost} hoverable magnetic`}
          data-label="GRAB IT!"
          href={PROFILE.links.resume}
          target="_blank"
          rel="noopener"
        >
          Download Resume ↓
        </a>
        <a
          className={`${shared.btn} ${shared.btnGhost} hoverable magnetic`}
          data-label="CODE!"
          href={PROFILE.links.github}
          target="_blank"
          rel="noopener"
        >
          GitHub
        </a>
        <a
          className={`${shared.btn} ${shared.btnGhost} hoverable magnetic`}
          data-label="CONNECT!"
          href={PROFILE.links.linkedin}
          target="_blank"
          rel="noopener"
        >
          LinkedIn
        </a>
      </div>

      <div className={styles.heroMeta} ref={metaRef}>
        <div>{PROFILE.hero.meta.left}</div>
        <div className={styles.scrollHint}>
          <div className={styles.wheel} />
          SCROLL TO FIRE THE WEB
        </div>
        <div>{PROFILE.hero.meta.right}</div>
      </div>
    </section>
  );
}
