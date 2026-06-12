import type { MarqueeItem } from '@/components/Marquee/Marquee';

// Forward strip — the engineering stack (★ separators added automatically).
const FWD_TAGS = [
  'React',
  'TypeScript',
  'Node.js',
  'Python',
  'Java',
  'Next.js',
  'Express',
  'Docker',
  'Kafka',
  'Redis',
  'PostgreSQL',
  'MongoDB',
  'WebSockets',
  'LangChain',
  'PyTorch',
  'AI / ML',
  'HPC',
  'Distributed Systems',
];

export const MARQUEE_FWD: MarqueeItem[] = FWD_TAGS.flatMap((text) => [
  { text },
  { text: '★', highlight: true },
]);

// Reverse strip — the build mantra (authored twice = one seamless half).
export const MARQUEE_REV: MarqueeItem[] = [
  'Build', '·', 'Ship', '·', 'Research', '·', 'Scale', '·', 'Repeat', '·',
  'Build', '·', 'Ship', '·', 'Research', '·', 'Scale', '·', 'Repeat', '·',
].map((text) => ({ text }));
