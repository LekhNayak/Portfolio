import { useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import { useTypewriter } from '@/hooks/useTypewriter';
import { useHeroParallax } from '@/hooks/useHeroParallax';
import { HeroAvatar } from './HeroAvatar';
import { PROFILE } from '@/data/profile';
import shared from '@/styles/shared.module.scss';
import styles from './Hero.module.scss';

/** The rotating job "title" — types out, back-spaces, cycles. */
const ROLES = ['Programmer', 'coder', 'confused soul', 'barely alive'] as const;

interface HeroProps {
  /** True after the loader completes — plays the entrance. */
  active: boolean;
  reduceMotion: boolean;
}

/**
 * Full-viewport intro hero (no navbar — that fades in once you scroll past).
 * Left: rotating typewriter headline + intro + CTAs. Right: comic portrait
 * placeholder. Entrance is a simple staggered rise once the loader is done.
 */
export function Hero({ active, reduceMotion }: HeroProps) {
  const wordRef = useRef<HTMLSpanElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const parallaxRefs = useMemo(() => ({ hero: heroRef, left: leftRef, right: rightRef, hint: hintRef }), []);

  useTypewriter(wordRef, ROLES, reduceMotion);
  useHeroParallax(parallaxRefs, reduceMotion);

  useEffect(() => {
    if (!active) return;
    const items = leftRef.current?.querySelectorAll('[data-stagger]');
    if (!items) return;

    if (reduceMotion) {
      gsap.set(items, { opacity: 1, y: 0 });
      gsap.set(rightRef.current, { opacity: 1, scale: 1, rotate: 0 });
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.to(items, { opacity: 1, y: 0, duration: 0.85, stagger: 0.12 }, 0.1).to(
      rightRef.current,
      { opacity: 1, scale: 1, rotate: 0, duration: 1, ease: 'back.out(1.5)' },
      0.25,
    );
    return () => {
      tl.kill();
    };
  }, [active, reduceMotion]);

  return (
    <section className={styles.hero} ref={heroRef}>
      <div className={styles.left} ref={leftRef}>
        <div className={styles.tag} data-stagger>
          {PROFILE.hero.tag}
        </div>

        <h1 className={styles.title} data-stagger>
          <span className={styles.lead}>I&apos;M A</span>
          <span className={styles.rotor}>
            <span className={`${styles.word} ${styles.t3dRed}`} ref={wordRef}>
              Programmer
            </span>
            <span className={styles.caret} aria-hidden="true" />
          </span>
        </h1>

        <p className={styles.intro} data-stagger>
          Hi, I&apos;m <b>Lekh Nayak</b>  a final-year B.Tech CSE student in <b>S.P.I.T Mumbai</b> who builds full-stack
          products, distributed systems and the occasional AI/ML experiment. I build things that (usually) survive
          production, <b>win the odd hackathon</b>, and wander into <b>debates and competitive competitions</b> when nobody stops me.
        </p>

        <div className={styles.actions} data-stagger>
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
      </div>

      <div className={styles.right} ref={rightRef}>
        <HeroAvatar />
      </div>

      <div className={styles.scrollHint} ref={hintRef} aria-hidden="true">
        <img className={styles.spidey} src="/assets/spiderman%20hanging-Photoroom.png" alt="" decoding="async" />
        SCROLL
      </div>
    </section>
  );
}
