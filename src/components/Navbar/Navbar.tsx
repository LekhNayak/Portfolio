import { useEffect, useRef, useState } from 'react';
import { PROFILE } from '@/data/profile';
import { dropIn } from '@/animations/animeEffects';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import styles from './Navbar.module.scss';

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  // { href: '#research', label: 'Research' }, // hidden for now — kept in code
  { href: '#experience', label: 'Experience' },
  { href: '#achievements', label: 'Achievements' },
  { href: '#leadership', label: 'Leadership' },
  { href: '#contact', label: 'Contact' },
] as const;

const SECTION_IDS = LINKS.map((l) => l.href.slice(1));

/**
 * Fixed comic navbar. Hidden over the full-screen hero; slides in once the
 * hero is scrolled past. `hoverable` markers wire each link into the cursor.
 * The link for the section in view keeps its red underline, and the links
 * drop in one by one each time the bar slides back in.
 */
export function Navbar() {
  const [visible, setVisible] = useState(false);
  const active = useActiveSection(SECTION_IDS);
  const reduceMotion = useReducedMotion();
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!visible || reduceMotion || !linksRef.current) return;
    const anim = dropIn([...linksRef.current.children]);
    return () => {
      anim?.revert();
    };
  }, [visible, reduceMotion]);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.85);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${visible ? styles.visible : ''}`}>
      <a className={`${styles.logo} hoverable`} href="#top" aria-label={`${PROFILE.brand}${PROFILE.brandSuffix} — back to top`}>
        <img src="/assets/lekh-icon-180.png" alt="" width={44} height={44} decoding="async" />
      </a>
      <div className={styles.links} ref={linksRef}>
        {LINKS.map((l) => (
          <a
            key={l.href}
            className={`hoverable ${active === l.href.slice(1) ? styles.active : ''}`}
            href={l.href}
            aria-current={active === l.href.slice(1) ? 'true' : undefined}
          >
            {l.label}
          </a>
        ))}
      </div>
      <a className={`${styles.cta} hoverable`} href={PROFILE.links.github} target="_blank" rel="noopener">
        GitHub ↗
      </a>
    </nav>
  );
}
