import type { AchievementIconKey } from '@/components/Achievements/AchievementIcon';

export interface Achievement {
  rank: string;
  /** Drives the rank-pill colour: win = red, second = blue, finalist = yellow. */
  rankType: 'win' | 'second' | 'finalist';
  title: string;
  detail: string;
  icon: AchievementIconKey;
}

export const ACHIEVEMENTS: Achievement[] = [
  // ---- 1st place ----
  { rank: '1ST', rankType: 'win', title: 'La Casa De Code', detail: 'National Hackathon · DSU', icon: 'trophy' },
  { rank: '1ST', rankType: 'win', title: 'Abhimat (2×)', detail: 'Lok Sabha Style Debate · 2× Winner', icon: 'mic' },
  { rank: '1ST', rankType: 'win', title: 'CSI ML Competition', detail: 'Machine Learning · SPIT', icon: 'medal' },

  // ---- 2nd place / runners-up ----
  { rank: '2ND', rankType: 'second', title: 'EFOS Virtual Hackathon', detail: 'Runners-up', icon: 'bolt' },
  { rank: '2ND', rankType: 'second', title: 'Best Delegate — AIPPM', detail: 'Runner-up · mUNIFY MUN', icon: 'mic' },
  { rank: '2ND', rankType: 'second', title: 'MergeMania', detail: 'Mergers & Acquisitions · E-Summit ’25', icon: 'chart' },
  { rank: '2ND', rankType: 'second', title: 'Dreams & Deals', detail: 'Pitching Contest', icon: 'rocket' },
  { rank: '2ND', rankType: 'second', title: 'Pitch Hunt', detail: 'Elevator Pitch Challenge', icon: 'rocket' },
  { rank: '2ND', rankType: 'second', title: 'Annual Oxford Debate', detail: 'Oxford-Style Debate · SPCE', icon: 'mic' },

  // ---- finalists ----
  { rank: 'FINALIST', rankType: 'finalist', title: 'HERE Geospatial Hackathon', detail: 'Pan-India Hiring Hack', icon: 'satellite' },
  { rank: 'TOP 9', rankType: 'finalist', title: 'Minithon', detail: 'IIIT Bhubaneswar · 9 of 60+', icon: 'bolt' },
  { rank: 'FINALIST', rankType: 'finalist', title: 'Airavat AI Hackathon', detail: 'SPIT Mumbai 2024', icon: 'bolt' },
  { rank: 'TOP 10', rankType: 'finalist', title: 'Inspiriobiz 5.0', detail: 'VESIM · 10 of 300+ teams', icon: 'chart' },
  { rank: '5/550', rankType: 'finalist', title: 'Vishleshan Case Study', detail: 'TISS · Top 5 of 550 teams', icon: 'chart' },
  { rank: 'FINALIST', rankType: 'finalist', title: 'BizQuest', detail: 'E-Summit 2024 · SPIT', icon: 'star' },
];
