import type { IconKey } from '@/components/Projects/ProjectIcon';

export interface Project {
  issue: string;
  icon: IconKey;
  name: string;
  blurb: string;
  impact: string;
  tech: string[];
  github: string;
  demo?: string;
  /** The back-of-card deep dive: what the problem was, how I built it, the payoff. */
  story: { what: string; how: string; impact: string };
}

// NOTE: github/demo URLs are placeholders — swap in the real repo + deploy links.
export const PROJECTS: Project[] = [
  {
    issue: 'ISSUE #01',
    icon: 'bubble',
    name: 'InterviewMate',
    blurb:
      'A RAG-based interview-prep platform that runs contextual mock interviews and grounded feedback over a vector knowledge base.',
    impact: 'LangChain + Pinecone retrieval pipeline serving real-time, source-grounded answers.',
    tech: ['LangChain', 'Pinecone', 'OpenAI', 'MongoDB', 'React'],
    github: 'https://github.com/LekhNayak/interviewmate',
    demo: 'https://interviewmate.lekh.online',
    story: {
      what: 'Generic mock interviews never adapt to you and AI tools tend to hallucinate questions. I wanted prep that was grounded in a real knowledge base and actually personalised.',
      how: 'Built a RAG pipeline on LangChain + Pinecone over 500+ domain Q&A pairs (~85% retrieval accuracy), with GPT driving adaptive difficulty and follow-ups, and MongoDB storing session analytics.',
      impact: 'Across 50+ simulated sessions it tracks feedback scores, surfaces weak areas by topic, and generates 10+ contextual follow-ups per session — feedback that compounds.',
    },
  },
  {
    issue: 'ISSUE #02',
    icon: 'code',
    name: 'Collaborative VS Code',
    blurb:
      'A real-time collaborative code editor with multi-cursor editing, shared sessions and containerized code execution.',
    impact: 'Low-latency sync over WebSockets with Dockerized run sandboxes.',
    tech: ['WebSockets', 'Monaco', 'Docker', 'PostgreSQL', 'Node.js'],
    github: 'https://github.com/LekhNayak/collab-vscode',
    demo: 'https://collabcode.lekh.online',
    story: {
      what: 'Pair-programming tools either lag badly or can’t run code safely. I wanted a shared editor where people could edit, run and debug together in real time.',
      how: 'A WebSocket event system keeps cursors, terminals and file state in sync under 100ms; Monaco powers editing across 6+ languages; every run is isolated in a Docker sandbox.',
      impact: 'Stress-tested with 30+ concurrent users with zero data loss on reconnect — collaboration that holds up under real load.',
    },
  },
  {
    issue: 'ISSUE #03',
    icon: 'trophy',
    name: 'CtrlFixIt',
    blurb:
      'A competitive-coding platform with isolated judging, live contests and a scalable, event-driven submission pipeline.',
    impact: 'Kafka + Redis backed judge using the Piston sandbox for safe multi-language execution.',
    tech: ['Piston', 'Kafka', 'Redis', 'WebSockets', 'Next.js'],
    github: 'https://github.com/LekhNayak/ctrlfixit',
    demo: 'https://ctrlfixit.csispit.online',
    story: {
      what: 'Running a fair, live coding contest at scale is genuinely hard — judging has to be safe, fast and tamper-resistant.',
      how: 'A Piston-based Docker engine clustered with Kafka handles 150+ concurrent execution jobs; Redis-backed queues with Prisma/PostgreSQL scale it; WebSockets drive live scoreboards and server-authoritative timing.',
      impact: 'Deployed live for 300+ participants across 6 languages, each job sandboxed with 1GB isolated memory — fair, fast and hard to cheat.',
    },
  },
  {
    issue: 'ISSUE #04',
    icon: 'shield',
    name: 'Krishi Suraksha',
    blurb:
      'An AI-powered crop-insurance platform that verifies claims from satellite imagery and records them on a permissioned ledger.',
    impact: 'Tamper-proof claims via Hyperledger Fabric + remote-sensing damage detection.',
    tech: ['Sentinel-2', 'Hyperledger', 'Flutter', 'FastAPI', 'PyTorch'],
    github: 'https://github.com/LekhNayak/krishi-suraksha',
    story: {
      what: 'Crop-insurance claims are slow, manual and easy to game. I wanted farmers to file damage claims from their phone and have them verified automatically and transparently.',
      how: 'A satellite pipeline (Sentinel-2 imagery + NDVI/NDWI analysis + IBM Prithvi-EO-2.0) auto-verifies crop damage, while Hyperledger Fabric records every farm record, claim and payout on an immutable audit trail.',
      impact: 'A multilingual, mobile-first workflow that speeds up payouts and makes every decision auditable end to end.',
    },
  },
  {
    issue: 'ISSUE #05',
    icon: 'chart',
    name: 'Open Source Analytics',
    blurb:
      'A GitHub analytics platform that scores contribution difficulty and surfaces repo health through an event-driven pipeline.',
    impact: 'Analyzed 100+ repos with a SonarQube-backed difficulty-scoring engine.',
    tech: ['GitHub API', 'SonarQube', 'Redis', 'Node.js', 'PostgreSQL'],
    github: 'https://github.com/LekhNayak/oss-analytics',
    demo: 'https://devquest.lekh.online',
    story: {
      what: 'New contributors struggle to find open-source issues that match their skill level. I wanted to score and rank work by real difficulty, not guesswork.',
      how: 'A microservices system ingests GitHub APIs, webhooks and SonarQube across 100+ repos; a scoring engine blends cognitive complexity, file churn and code impact to auto-rank issues Easy → Expert.',
      impact: 'Real-time dashboards on PostgreSQL + Redis cut repeated API latency by 60%+ and help contributors find the right task far faster.',
    },
  },
  {
    issue: 'ISSUE #06',
    icon: 'chip',
    name: 'GPU Access Portal',
    blurb:
      'A self-service HPC portal that lets researchers schedule and monitor GPU jobs on a shared cluster with full observability.',
    impact: 'Slurm + Open OnDemand scheduling with Prometheus/Grafana telemetry across the cluster.',
    tech: ['Slurm', 'Open OnDemand', 'HPC', 'Prometheus', 'Grafana'],
    github: 'https://github.com/LekhNayak/gpu-access-portal',
    demo: 'https://gpu.spit.ac.in',
    story: {
      what: 'Students needed GPU compute without fighting the command line. As a systems intern I built a browser-native portal onto a shared HPC cluster.',
      how: 'Configured a Slurm cluster for multi-node scaling with NFS shared storage and SSSD/LDAP identities, then deployed Open OnDemand for browser access to Jupyter, VS Code Server and RStudio.',
      impact: 'Prometheus + Grafana give live visibility into GPU utilization, job queues and node health across a real, student-facing environment.',
    },
  },
];
