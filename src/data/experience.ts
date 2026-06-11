export interface ExperienceEntry {
  no: string;
  role: string;
  org: string;
  blurb: string;
  tech: string[];
}

export const EXPERIENCE: ExperienceEntry[] = [
  {
    no: '01',
    role: 'System Engineering Intern',
    org: 'GPU Access Portal · HPC Cluster',
    blurb:
      'Built a self-service portal for scheduling and monitoring GPU workloads on a shared HPC cluster, with authentication, quotas and full-stack observability.',
    tech: ['Slurm', 'Open OnDemand', 'HPC', 'Prometheus', 'Grafana', 'NFS', 'LDAP'],
  },
  {
    no: '02',
    role: 'Freelance Developer',
    org: 'Inventory Management System',
    blurb:
      'Designed and shipped a full-stack inventory management system for a real business — stock tracking, role-based access and reporting dashboards.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'REST APIs'],
  },
];
