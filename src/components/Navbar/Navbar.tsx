import { PROFILE } from '@/data/profile';
import styles from './Navbar.module.scss';

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#research', label: 'Research' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
] as const;

/** Fixed comic navbar. `hoverable` markers wire each link into the cursor. */
export function Navbar() {
  return (
    <nav className={styles.nav}>
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
