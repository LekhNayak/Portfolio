import styles from './Achievements.module.scss';

export type AchievementIconKey =
  | 'trophy'
  | 'medal'
  | 'mic'
  | 'chart'
  | 'rocket'
  | 'satellite'
  | 'bolt'
  | 'star';

const INK = 'var(--ink)';

function Art({ name }: { name: AchievementIconKey }) {
  switch (name) {
    case 'trophy':
      return (
        <g fill="var(--yellow)" stroke={INK} strokeWidth="3" strokeLinejoin="round">
          <path d="M15 8h18v9a9 9 0 0 1-18 0Z" />
          <path d="M15 11h-5a5 5 0 0 0 6 8" fill="none" />
          <path d="M33 11h5a5 5 0 0 1-6 8" fill="none" />
          <rect x="21" y="26" width="6" height="7" />
          <rect x="14" y="33" width="20" height="6" rx="2" />
        </g>
      );
    case 'medal':
      return (
        <g stroke={INK} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round">
          <path d="M17 7l7 13M31 7l-7 13" fill="none" />
          <circle cx="24" cy="30" r="11" fill="var(--red)" />
          <circle cx="24" cy="30" r="4" fill="var(--yellow)" strokeWidth="2" />
        </g>
      );
    case 'mic':
      return (
        <g stroke={INK} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round">
          <rect x="18" y="7" width="12" height="22" rx="6" fill="var(--blue)" />
          <path d="M13 23a11 11 0 0 0 22 0" fill="none" />
          <path d="M24 34v6M18 40h12" fill="none" />
        </g>
      );
    case 'chart':
      return (
        <g stroke={INK} strokeLinecap="round">
          <path d="M10 39h30" fill="none" strokeWidth="3" />
          <rect x="13" y="25" width="6" height="14" fill={INK} strokeWidth="2" />
          <rect x="21" y="17" width="6" height="22" fill="var(--red)" strokeWidth="2" />
          <rect x="29" y="10" width="6" height="29" fill="var(--yellow)" strokeWidth="2" />
        </g>
      );
    case 'rocket':
      return (
        <g stroke={INK} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round">
          <path d="M24 5c6 6 7 16 4 24H20c-3-8-2-18 4-24Z" fill="var(--paper)" />
          <circle cx="24" cy="17" r="3.5" fill="var(--red)" strokeWidth="2" />
          <path d="M20 28l-6 7 8-3Z" fill="var(--yellow)" strokeWidth="2" />
          <path d="M28 28l6 7-8-3Z" fill="var(--yellow)" strokeWidth="2" />
          <path d="M21 34c1 5 3 7 3 7s2-2 3-7" fill="var(--red)" strokeWidth="2" />
        </g>
      );
    case 'satellite':
      return (
        <g stroke={INK} strokeWidth="3" strokeLinejoin="round">
          <circle cx="24" cy="24" r="9" fill="var(--blue)" />
          <ellipse cx="24" cy="24" rx="19" ry="7.5" fill="none" transform="rotate(-25 24 24)" />
        </g>
      );
    case 'bolt':
      return (
        <path
          d="M27 5 11 27h11l-3 16 18-24H25z"
          fill="var(--yellow)"
          stroke={INK}
          strokeWidth="3"
          strokeLinejoin="round"
        />
      );
    case 'star':
      return (
        <path
          d="M24 5 29 18 43 19 32 28 36 42 24 34 12 42 16 28 5 19 19 18z"
          fill="var(--yellow)"
          stroke={INK}
          strokeWidth="3"
          strokeLinejoin="round"
        />
      );
  }
}

/** Bold comic icon for an achievement badge (sits in the badge's top-right). */
export function AchievementIcon({ name }: { name: AchievementIconKey }) {
  return (
    <svg className={styles.icon} viewBox="0 0 48 48" role="img" aria-hidden="true">
      <Art name={name} />
    </svg>
  );
}
