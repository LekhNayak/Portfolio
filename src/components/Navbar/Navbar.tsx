import { useEffect, useState } from 'react';
import { PROFILE } from '@/data/profile';
import styles from './Navbar.module.scss';

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  // { href: '#research', label: 'Research' }, // hidden for now — kept in code
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
] as const;

/**
 * Fixed comic navbar. Hidden over the full-screen hero; slides in once the
 * hero is scrolled past. `hoverable` markers wire each link into the cursor.
 */
export function Navbar() {
  const [visible, setVisible] = useState(false);

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
      <a className={`${styles.logo} hoverable`} href="#top">
        {PROFILE.brand}
        <span>{PROFILE.brandSuffix}</span>
      </a>
      <div className={styles.links}>
        {LINKS.map((l) => (
          <a key={l.href} className="hoverable" href={l.href}>
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
