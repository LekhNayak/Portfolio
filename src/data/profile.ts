// ============================================================
// Central profile / contact data.
// NOTE: links + email are placeholders — update them with the real handles.
// ============================================================

export const PROFILE = {
  name: 'Lekh Nayak',
  brand: 'LEKH',
  brandSuffix: '.DEV',
  roles: ['Software Engineer', 'Full Stack Developer', 'AI/ML Engineer', 'Researcher', 'Open Source Contributor'],

  links: {
    github: 'https://github.com/LekhNayak',
    linkedin: 'https://www.linkedin.com/in/lekh-nayak-9428aa280/',
    email: 'mailto:lekh.nayak23@spit.ac.in',
    resume: '/Lekh_Nayak_Resume.pdf',
  },

  hero: {
    tag: '// SOFTWARE ENGINEER · FULL-STACK · AI/ML · RESEARCHER — MUMBAI, INDIA',
    rows: [
      { cls: 't3dInk', text: 'ENGINEERING' },
      { cls: 't3dRed', text: 'IDEAS INTO' },
      { cls: 't3dBlue', text: 'REALITY.' },
    ],
    meta: { left: 'B.TECH CS @ SPIT', right: 'BUILD · SHIP · RESEARCH' },
  },
} as const;
