export interface Project {
  issue: string;
  glyph: string;
  name: string;
  blurb: string;
  impact: string;
  tech: string[];
  github: string;
  demo?: string;
}

// NOTE: github/demo URLs are placeholders — swap in the real repo + deploy links.
export const PROJECTS: Project[] = [
  {
    issue: 'ISSUE #01',
    glyph: '🧠',
    name: 'InterviewMate',
    blurb:
      'A RAG-based interview-prep platform that runs contextual mock interviews and grounded feedback over a vector knowledge base.',
    impact: 'LangChain + Pinecone retrieval pipeline serving real-time, source-grounded answers.',
    tech: ['LangChain', 'Pinecone', 'OpenAI', 'MongoDB', 'React'],
    github: 'https://github.com/LekhNayak/interviewmate',
    demo: 'https://interviewmate.lekh.online',
  },
  {
    issue: 'ISSUE #02',
    glyph: '🧩',
    name: 'Collaborative VS Code',
    blurb:
      'A real-time collaborative code editor with multi-cursor editing, shared sessions and containerized code execution.',
    impact: 'Low-latency CRDT-style sync over WebSockets with Dockerized run sandboxes.',
    tech: ['WebSockets', 'Monaco', 'Docker', 'PostgreSQL', 'Node.js'],
    github: 'https://github.com/LekhNayak/collab-vscode',
    demo: 'https://collabcode.lekh.online',
  },
  {
    issue: 'ISSUE #03',
    glyph: '⚔️',
    name: 'CtrlFixIt',
    blurb:
      'A competitive-coding platform with isolated judging, live contests and a scalable, event-driven submission pipeline.',
    impact: 'Kafka + Redis backed judge using the Piston sandbox for safe multi-language execution.',
    tech: ['Piston', 'Kafka', 'Redis', 'WebSockets', 'Node.js'],
    github: 'https://github.com/LekhNayak/ctrlfixit',
    demo: 'https://ctrlfixit.csispit.online',
  },
  {
    issue: 'ISSUE #04',
    glyph: '🌾',
    name: 'Krishi Suraksha',
    blurb:
      'An AI-powered crop-insurance platform that verifies claims from satellite imagery and records them on a permissioned ledger.',
    impact: 'Tamper-proof claims via Hyperledger Fabric + remote-sensing damage detection.',
    tech: ['Satellite Imagery', 'Hyperledger', 'Flutter', 'FastAPI', 'PyTorch'],
    github: 'https://github.com/LekhNayak/krishi-suraksha',
  },
  {
    issue: 'ISSUE #05',
    glyph: '📊',
    name: 'Open Source Analytics',
    blurb:
      'A GitHub analytics platform that scores contribution difficulty and surfaces repo health through an event-driven pipeline.',
    impact: 'Analyzed 100+ contributors with a SonarQube-backed difficulty-scoring engine.',
    tech: ['GitHub API', 'SonarQube', 'Event-Driven', 'Node.js', 'PostgreSQL'],
    github: 'https://github.com/LekhNayak/oss-analytics',
    demo: 'https://devquest.lekh.online',
  },
  {
    issue: 'ISSUE #06',
    glyph: '🖥️',
    name: 'GPU Access Portal',
    blurb:
      'A self-service HPC portal that lets researchers schedule and monitor GPU jobs on a shared cluster with full observability.',
    impact: 'Slurm + Open OnDemand scheduling with Prometheus/Grafana telemetry across the cluster.',
    tech: ['Slurm', 'Open OnDemand', 'HPC', 'Prometheus', 'Grafana'],
    github: 'https://github.com/LekhNayak/gpu-access-portal',
    demo: 'https://gpu.spit.ac.in',
  },
];
