export interface ResearchEntry {
  badge: string;
  title: string;
  blurb: string;
  tech: string[];
  /** Headline metric rendered as an animated counter. */
  metric: { value: number; decimals: number; suffix: string; label: string };
  github?: string;
}

export const RESEARCH: ResearchEntry = {
  badge: 'FEATURED RESEARCH',
  title: 'Quantum QUBO Band Selection for Hyperspectral Image Classification',
  blurb:
    'A quantum-optimization approach to hyperspectral band selection: formulating the most-informative-bands problem as a QUBO and solving it with QAOA on IBM Quantum, then classifying with a spatial-spectral CNN.',
  tech: ['IBM Quantum', 'QAOA', 'QUBO Optimization', 'Spatial-Spectral CNN', 'PyTorch'],
  metric: { value: 99.57, decimals: 2, suffix: '%', label: 'Classification Accuracy' },
  github: 'https://github.com/LekhNayak/quantum-qubo-bands',
};
