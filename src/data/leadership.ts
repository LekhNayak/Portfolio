export interface LeadershipRole {
  role: string;
  org: string;
  period: string;
  /** Committee size, shown as the front stat (e.g. "30+"). */
  committee: string;
  /** Org emblem shown on the right of the front face (placeholder for now). */
  logo: string;
  /** Detail revealed on the (vertical) flip: a lead line + highlight chips. */
  back: { lead: string; highlights: string[] };
}

export const LEADERSHIP: LeadershipRole[] = [
  {
    role: 'General Secretary',
    org: "Speakers' Club · S.P.I.T.",
    period: '2024 — 25',
    committee: '30+',
    logo: '/assets/speakers%20club-Photoroom.png',
    back: {
      lead: "Ran the speaking scene end-to-end and built a crew that genuinely wanted to raise S.P.I.T.'s debating culture.",
      highlights: ['Weekly Debates', 'Oxford-Style Debate', 'Elocution', 'Community Building'],
    },
  },
  {
    role: 'Head of Events',
    org: 'Computer Society of India · S.P.I.T.',
    period: '2025 — 26',
    committee: '60+',
    logo: '/assets/csi%20logo.png',
    back: {
      lead: 'Organized 15+ events across the year, from serious competitive coding to the genuinely fun stuff.',
      highlights: [
        'IICPC Regionals',
        'National Hackathon',
        '24-Hr Hackathons',
        'Minithons',
        'Game Dev',
        'ML Accuracy',
        'Bug Fixing',
      ],
    },
  },
];
