export interface ExperienceEntry {
  no: string;
  role: string;
  org: string;
  /** Optional company link — when set, the org name becomes a clickable link. */
  url?: string;
  period: string;
  /** Short context label, e.g. "Corporate · Ongoing" / "On-campus". */
  tag: string;
  blurb: string;
  tech: string[];
}

// Most recent first.
export const EXPERIENCE: ExperienceEntry[] = [
  {
    no: '01',
    role: 'AI Automation Intern',
    org: 'Cactus Life Sciences',
    url: 'https://cactuslifesciences.com/',
    period: 'Jun 2026 — Present',
    tag: 'Corporate · Ongoing',
    blurb:
      'Summer internship on the AI Innovation & Automation Team, building and evaluating applied AI/ML and LLM-driven workflows for life-sciences and scientific content.',
    tech: ['Python', 'NLP', 'Machine Learning', 'Azure AI Foundry', 'AWS Bedrock', 'GCP'],
  },
  {
    no: '02',
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
