import { useRef, useState } from 'react';
import { Loader } from '@/components/Loader/Loader';
import { Cursor } from '@/components/Cursor/Cursor';
import { Scene } from '@/components/Scene/Scene';
import { WebTrail } from '@/components/WebTrail/WebTrail';
import { Halftone } from '@/components/Halftone/Halftone';
import { ProgressBar } from '@/components/ProgressBar/ProgressBar';
import { HUD } from '@/components/HUD/HUD';
import { Navbar } from '@/components/Navbar/Navbar';
import { Hero } from '@/components/Hero/Hero';
import { Marquee } from '@/components/Marquee/Marquee';
import { About } from '@/components/About/About';
import { Projects } from '@/components/Projects/Projects';
import { Research } from '@/components/Research/Research';
import { Experience } from '@/components/Experience/Experience';
import { Achievements } from '@/components/Achievements/Achievements';
import { Leadership } from '@/components/Leadership/Leadership';
import { Contact } from '@/components/Contact/Contact';
import { Footer } from '@/components/Footer/Footer';

import { MARQUEE_FWD, MARQUEE_REV } from '@/data/marquee';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { useRevealAnimations } from '@/hooks/useRevealAnimations';
import { useFlipAnimations } from '@/hooks/useFlipAnimations';
import { useNumberCounters } from '@/hooks/useNumberCounters';
import { useVelocitySkew } from '@/hooks/useVelocitySkew';
import { useMagnetic } from '@/hooks/useMagnetic';
import { useCardTilt } from '@/hooks/useCardTilt';
import { useShowcaseAnimations } from '@/hooks/useShowcaseAnimations';
import { useSceneBindings } from '@/context/SceneBindingsContext';

/**
 * The whole single-page engineering portfolio. Owns the loader→loaded handoff,
 * the page skew-wrap scope for all GSAP scroll effects, and decides whether the
 * custom cursor / web-trail are active (pointer-capable + motion allowed).
 */
export function Home() {
  const reduceMotion = useReducedMotion();
  const [loaded, setLoaded] = useState(false);
  const [hoverCapable] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(hover: hover)').matches : true,
  );
  const cursorEnabled = hoverCapable && !reduceMotion;

  const skewWrapRef = useRef<HTMLDivElement>(null);
  const bindings = useSceneBindings();

  // page-level orchestration (all scoped to the skew-wrap + reverted on unmount)
  useScrollProgress(bindings);
  useRevealAnimations(skewWrapRef, reduceMotion);
  useFlipAnimations(skewWrapRef, reduceMotion);
  useNumberCounters(skewWrapRef, reduceMotion);
  useVelocitySkew(reduceMotion);
  useMagnetic(skewWrapRef);
  useCardTilt(skewWrapRef);
  useShowcaseAnimations(skewWrapRef, reduceMotion);

  return (
    <>
      <Loader onComplete={() => setLoaded(true)} />

      {cursorEnabled && <Cursor enabled={cursorEnabled} />}
      <Scene loaded={loaded} reduceMotion={reduceMotion} />
      {cursorEnabled && <WebTrail enabled={cursorEnabled} />}

      <Halftone />
      <ProgressBar />
      <HUD />
      <Navbar />

      <main id="top">
        <div className="skew-wrap" ref={skewWrapRef}>
          <Hero active={loaded} reduceMotion={reduceMotion} />
          <Marquee items={MARQUEE_FWD} />
          <Marquee items={MARQUEE_REV} reverse variant2 />
          <About />
          <Projects />
          <Research />
          <Experience />
          <Achievements />
          <Leadership />
          <Contact />
        </div>
      </main>

      <Footer />
    </>
  );
}
