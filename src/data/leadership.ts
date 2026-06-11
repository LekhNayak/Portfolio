export interface LeadershipRole {
  role: string;
  org: string;
  blurb: string;
  stats: { num: string; label: string }[];
}

export const LEADERSHIP: LeadershipRole[] = [
  {
    role: 'General Secretary',
    org: 'Speakers Club',
    blurb: 'Led the institute speaking community — organizing flagship events, mentoring speakers and growing participation.',
    stats: [
      { num: '350+', label: 'Participants' },
      { num: '1', label: 'Flagship Community' },
    ],
  },
  {
    role: 'Head of Events',
    org: 'Computer Society of India',
    blurb: 'Directed technical events end-to-end — leading a cross-functional team across planning, logistics and execution.',
    stats: [
      { num: '50+', label: 'Member Team' },
      { num: 'Many', label: 'Events Shipped' },
    ],
  },
];
