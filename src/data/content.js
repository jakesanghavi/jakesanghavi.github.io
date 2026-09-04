import tavernLogo from '../assets/tavern_logo.png';
import roamioLogo from '../assets/roamio_logo.png';

// Base64-obfuscated email, kept from the previous site.
export const ENCODED_EMAIL = 'amFrZS5zYW5naGF2aUBnbWFpbC5jb20=';
export const FORMSPREE_ID = 'xwpqabby';

export const profile = {
  name: 'Jake Sanghavi',
  role: 'Solutions Designer',
  location: 'Atlanta',
  socials: [
    { label: 'GitHub', href: 'https://github.com/jakesanghavi' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/jake-sanghavi' },
    { label: 'X', href: 'https://x.com/jakesanghavi' },
  ],
};

export const nav = [
  { id: 'work', label: 'Work' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

// A concise purpose line that leads into the experience section.
export const about = {
  // `em` spans render as italic display accents.
  statement: [
    { t: 'I build tools that make ' },
    { t: 'complicated systems', em: true },
    { t: ' easier to understand.' },
  ],
  tagline: 'Data scientist & engineer based in Atlanta.',
};

// One quiet, evocative line for the immersive interlude.
export const interludeLine =
  'Almost everything I find interesting is, in the end, a system worth understanding.';

// Work — most recent first. Descriptions preserved verbatim.
export const experience = [
  {
    year: '2024',
    role: 'Data Analyst II',
    org: 'AT&T',
    period: '2024 — present',
    summary:
      'Primary developer of various ML and NLP models using Prophet and Transformer models. Informed company strategy around promotional programs and legal claim handling.',
    current: true,
  },
  {
    year: '2024',
    role: 'Data Analyst Intern',
    org: 'The Kraft Group',
    period: '2024',
    summary: 'Predicted event attendance using PyTorch to structure staffing and inventory.',
  },
  {
    year: '2023',
    role: 'Data Science Intern',
    org: 'AT&T',
    period: '2023',
    summary:
      'Developed customer churn prediction models. Member of the team responsible for bringing Gen. AI to the company.',
  },
  {
    year: '2022',
    role: 'Data Science Intern',
    org: 'Thermo Fisher Scientific',
    period: '2022',
    summary:
      'Developed sales algorithms using combinatorics and anomaly detection for competitor analysis.',
  },
];

export const education = [
  {
    degree: 'M.S., Data Science',
    org: 'Georgia Tech',
    period: '2025 — 2026',
    note: 'Advanced AI/ML.',
  },
  {
    degree: 'B.S., Data Science',
    org: 'Case Western Reserve University',
    period: '2020 — 2024',
    note: 'Summa Cum Laude · 4.0 GPA.',
  },
];

// A short, understated list of tools — not a logo wall.
export const tools = [
  'Python', 'TypeScript', 'PyTorch', 'TensorFlow', 'SQL', 'React',
  'Node', 'AWS', 'Spark', 'Databricks', 'Snowflake', 'Docker',
];

// Projects — two featured, two compact. Facts preserved.
export const projects = [
  {
    id: 1,
    index: '01',
    title: 'Cue Tavern',
    tag: 'Live product',
    year: '2024',
    description:
      'A social platform for the mobile game “CUE Cards,” grown past 100 registered users — accounts, community, and image-based card recognition via OCR.',
    technologies: ['React', 'Node', 'Express', 'MongoDB', 'OCR'],
    github_url: 'https://github.com/jakesanghavi/CUE_Social/tree/main',
    live_url: 'https://cuetavern.com/',
    image_url: tavernLogo,
    tone: 'warm',
    featured: true,
  },
  {
    id: 2,
    index: '02',
    title: 'Roamio',
    tag: 'Live product',
    year: '2023',
    description:
      'An all-in-one trip planner for aspiring world travelers — itinerary building, discovery, and automated collection that keeps destination data fresh.',
    technologies: ['React', 'Firebase', 'Node', 'Express', 'Playwright'],
    github_url: 'https://github.com/jakesanghavi/TravelPlanner',
    live_url: 'https://roamio.earth/',
    image_url: roamioLogo,
    tone: 'cool',
    featured: true,
  },
  {
    id: 3,
    index: '03',
    title: 'NFL Stats',
    tag: 'Sports analytics',
    description:
      'A widely-starred toolkit for gathering and modeling NFL data — finding structure in a noisy sport.',
    technologies: ['Python', 'scikit-learn', 'Selenium'],
    github_url: 'https://github.com/jakesanghavi/NFL_Stats',
    featured: false,
  },
  {
    id: 4,
    index: '04',
    title: 'NBA Stats',
    tag: 'Sports analytics',
    description:
      'An involved NBA scraping and analysis toolkit focused on clean datasets for downstream modeling.',
    technologies: ['Python', 'scikit-learn', 'Selenium'],
    github_url: 'https://github.com/jakesanghavi/NBA_Stats',
    featured: false,
  },
];
