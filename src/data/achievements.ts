export interface Achievement {
  rank: string;
  title: string;
  detail: string;
  glyph: string;
}

export const ACHIEVEMENTS: Achievement[] = [
  { rank: '1ST', title: 'La Casa De Code', detail: 'Winner · Hackathon', glyph: '🏆' },
  { rank: 'WIN', title: 'CSI ML Competition', detail: 'Machine Learning Champion', glyph: '🥇' },
  { rank: 'TOP', title: 'HERE Geospatial Hackathon', detail: 'National Finalist', glyph: '🛰️' },
  { rank: 'TOP', title: 'IIIT Bhubaneswar Minithon', detail: 'Finalist', glyph: '⚡' },
  { rank: '5/550', title: 'TISS Vishleshan', detail: 'Top 5 of 550 Teams', glyph: '📈' },
  { rank: '★', title: 'Debate & Pitching', detail: 'Multiple Awards', glyph: '🎤' },
];
