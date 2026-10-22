export interface ExperienceEntry {
  no: string;
  role: string;
  org: string;
  /** Optional company link — when set, the org name becomes a clickable link. */
  url?: string;
  period: string;
  /** Short context label, e.g. "Corporate" / "On-campus". */
  tag: string;
  blurb: string;
  tech: string[];
}

// Most recent first.
export const EXPERIENCE: ExperienceEntry[] = [
  {
    no: '01',
    role: 'Technology Graduate Engineer',
    org: 'Barclays',
    url: 'https://www.barclays.com/',
    period: 'Jul 2027 — Onwards',
    tag: 'Upcoming',
    blurb:
      'Joining Barclays as a Technology Graduate Engineer, working on engineering and technology for a global financial services firm.',
    tech: ['Software Engineering', 'Banking Technology', 'Graduate Program'],
  },
  {
    no: '02',
    role: 'SDE Intern',
    org: 'Cactus Life Sciences',
    url: 'https://cactuslifesciences.com/',
    period: 'Jun 2026 — Aug 2026',
    tag: 'Corporate',
    blurb:
      'Summer internship on the AI Innovation & Automation Team, building and evaluating applied AI/ML and LLM-driven workflows for life-sciences and scientific content.',
    tech: ['Python', 'NLP', 'Machine Learning', 'Azure AI Foundry', 'AWS Bedrock', 'GCP'],
  },
  {
    no: '03',
    role: 'System Engineering Intern',
    org: 'Sardar Patel Institute of Technology',
    url: 'https://gpu.spit.ac.in',
    period: 'Jan 2026 — Mar 2026',
    tag: 'On-campus',
    blurb:
      'Built a self-service GPU Access Portal for scheduling and monitoring workloads on a shared HPC cluster, with shared storage, central identities and full-stack observability.',
    tech: ['Slurm', 'Open OnDemand', 'HPC', 'Prometheus', 'Grafana', 'NFS', 'LDAP'],
  },
];
