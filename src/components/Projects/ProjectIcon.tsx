import styles from './Projects.module.scss';

export type IconKey = 'bubble' | 'code' | 'trophy' | 'shield' | 'chart' | 'chip';

const BG: Record<IconKey, string> = {
  bubble: 'var(--blue)',
  code: 'var(--yellow)',
  trophy: 'var(--red)',
  shield: 'var(--blue)',
  chart: 'var(--yellow)',
  chip: 'var(--red)',
};

const INK = 'var(--ink)';
const WHITE = '#fff';

/** Inner artwork per icon, drawn on top of the shared comic "sticker" frame. */
function Art({ name }: { name: IconKey }) {
  switch (name) {
    case 'bubble': // InterviewMate — conversational AI
      return (
        <>
          <path
            d="M16 22h32a4 4 0 0 1 4 4v13a4 4 0 0 1-4 4H32l-9 7v-7h-7a4 4 0 0 1-4-4V26a4 4 0 0 1 4-4Z"
            fill={WHITE}
            stroke={INK}
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <g fill="var(--blue)">
            <circle cx="25" cy="33" r="2.6" />
            <circle cx="32" cy="33" r="2.6" />
            <circle cx="39" cy="33" r="2.6" />
          </g>
        </>
      );
    case 'code': // Collaborative VS Code
      return (
        <g fill="none" stroke={INK} strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M25 23 16 32l9 9" />
          <path d="M39 23l9 9-9 9" />
          <path d="M35 21 29 43" />
        </g>
      );
    case 'trophy': // CtrlFixIt — competitive judge
      return (
        <g fill={WHITE} stroke={INK} strokeWidth="2.6" strokeLinejoin="round">
          <path d="M23 20h18v6a9 9 0 0 1-18 0Z" />
          <path d="M23 22h-4a4 4 0 0 0 4 8" fill="none" />
          <path d="M41 22h4a4 4 0 0 1-4 8" fill="none" />
          <rect x="30" y="33" width="4" height="6" />
          <rect x="23" y="40" width="18" height="5" rx="1.5" />
        </g>
      );
    case 'shield': // Krishi Suraksha — crop insurance
      return (
        <>
          <path
            d="M32 17l14 5v11c0 8-6 13-14 16-8-3-14-8-14-16V22Z"
            fill={WHITE}
            stroke={INK}
            strokeWidth="2.6"
            strokeLinejoin="round"
          />
          <path d="M32 27c-5 4-5 11 0 16 5-5 5-12 0-16Z" fill="var(--red)" stroke={INK} strokeWidth="1.6" />
          <path d="M32 30v11" stroke={INK} strokeWidth="1.6" fill="none" />
        </>
      );
    case 'chart': // Open Source Analytics
      return (
        <g stroke={INK} strokeWidth="2.6" strokeLinecap="round">
          <line x1="18" y1="45" x2="47" y2="45" />
          <rect x="21" y="34" width="6" height="11" fill={INK} />
          <rect x="29" y="27" width="6" height="18" fill="var(--red)" />
          <rect x="37" y="21" width="6" height="24" fill={INK} />
        </g>
      );
    case 'chip': // GPU Access Portal
      return (
        <g stroke={INK} strokeWidth="2.6" strokeLinecap="round">
          <rect x="22" y="22" width="20" height="20" rx="2" fill={WHITE} />
          <rect x="28" y="28" width="8" height="8" fill="var(--red)" />
          <path d="M26 22v-4M32 22v-4M38 22v-4M26 42v4M32 42v4M38 42v4M22 26h-4M22 32h-4M22 38h-4M42 26h4M42 32h4M42 38h4" />
        </g>
      );
  }
}

/** Comic "sticker" icon for a project card: rounded frame + bold artwork. */
export function ProjectIcon({ name }: { name: IconKey }) {
  return (
    <svg className={styles.icon} viewBox="0 0 64 64" role="img" aria-hidden="true">
      <rect x="4" y="4" width="56" height="56" rx="15" fill={BG[name]} stroke={INK} strokeWidth="3" />
      <Art name={name} />
    </svg>
  );
}
