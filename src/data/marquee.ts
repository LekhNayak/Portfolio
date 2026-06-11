import type { MarqueeItem } from '@/components/Marquee/Marquee';

// Forward strip — the engineering stack.
export const MARQUEE_FWD: MarqueeItem[] = [
  { text: 'React' },
  { text: '★', highlight: true },
  { text: 'TypeScript' },
  { text: '★', highlight: true },
  { text: 'Node.js' },
  { text: '★', highlight: true },
  { text: 'Python' },
  { text: '★', highlight: true },
  { text: 'Distributed Systems' },
  { text: '★', highlight: true },
  { text: 'AI / ML' },
  { text: '★', highlight: true },
];

// Reverse strip — the build mantra (authored twice = one seamless half).
export const MARQUEE_REV: MarqueeItem[] = [
  'Build', '·', 'Ship', '·', 'Research', '·', 'Scale', '·', 'Repeat', '·',
  'Build', '·', 'Ship', '·', 'Research', '·', 'Scale', '·', 'Repeat', '·',
].map((text) => ({ text }));
