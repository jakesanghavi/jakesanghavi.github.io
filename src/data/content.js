import tavernLogo from '../assets/tavern_logo.png';
import roamioLogo from '../assets/roamio_logo.png';

// Base64-obfuscated email, kept from the previous site.
export const ENCODED_EMAIL = 'amFrZS5zYW5naGF2aUBnbWFpbC5jb20=';
export const FORMSPREE_ID = 'xwpqabby';

export const profile = {
  name: 'Jake Sanghavi',
  role: 'Solutions Designer',
  // Atlanta, GA — used as the observatory's coordinates throughout the site.
  coordinates: '33.7490° N  ·  84.3880° W',
  location: 'Atlanta, Georgia',
  intro:
    'I work at the intersection of data, software, and the systems they describe — building tools that turn noisy, complicated information into something people can actually use.',
  socials: [
    { label: 'GitHub', handle: 'jakesanghavi', href: 'https://github.com/jakesanghavi' },
    { label: 'LinkedIn', handle: 'jake-sanghavi', href: 'https://linkedin.com/in/jake-sanghavi' },
    { label: 'X', handle: 'jakesanghavi', href: 'https://x.com/jakesanghavi' },
  ],
};

export const sections = [
  { id: 'observation', num: '01', title: 'Observation' },
  { id: 'field-notes', num: '02', title: 'Field Notes' },
  { id: 'trajectory', num: '03', title: 'Trajectory' },
  { id: 'experiments', num: '04', title: 'Experiments' },
  { id: 'systems', num: '05', title: 'Other Systems' },
  { id: 'transmission', num: '06', title: 'Contact' },
];

export const fieldNotes = {
  lead:
    'A short account of what I pay attention to.',
  paragraphs: [
    'I am, first, a curious person. My deepest interest is astrophysics — the discipline of measuring things that are impossibly far away and reasoning carefully about what the measurements imply. That instinct, careful observation followed by honest inference, shapes how I approach everything else.',
    'Professionally I am a data scientist and engineer. In practice that means I spend my time modeling behavior, forecasting, and building software that puts those models in front of people. I care less about which technique is fashionable and more about whether the result is legible, defensible, and genuinely useful.',
    'Outside of work I read about stellar evolution and orbital mechanics, dig into sports analytics for the pleasure of finding structure in messy data, and think about markets as another complex system worth understanding.',
  ],
  observed: [
    { k: 'Primary interest', v: 'Astrophysics' },
    { k: 'Practice', v: 'Data science & engineering' },
    { k: 'Secondary', v: 'Sports analytics' },
    { k: 'Disposition', v: 'Analytical · Creative · Curious' },
  ],
};

// 03 — Trajectory (professional experience). Descriptions preserved verbatim.
export const experience = [
  {
    designation: 'ATT-II',
    role: 'Data Analyst II',
    org: 'AT&T',
    period: '2024 —',
    year: '2024',
    summary:
      'Primary developer of various ML and NLP models using Prophet and Transformer models. Informed company strategy around promotional programs and legal claim handling.',
    tags: ['Prophet', 'Transformers', 'NLP', 'Strategy'],
    current: true,
  },
  {
    designation: 'KRAFT-I',
    role: 'Data Analyst Intern',
    org: 'The Kraft Group',
    period: '2024',
    year: '2024',
    summary: 'Predicted event attendance using PyTorch to structure staffing and inventory.',
    tags: ['PyTorch', 'Forecasting', 'Operations'],
  },
  {
    designation: 'ATT-I',
    role: 'Data Science Intern',
    org: 'AT&T',
    period: '2023',
    year: '2023',
    summary:
      'Developed customer churn prediction models. Member of the team responsible for bringing Gen. AI to the company.',
    tags: ['Churn Modeling', 'Generative AI'],
  },
  {
    designation: 'TFS-I',
    role: 'Data Science Intern',
    org: 'Thermo Fisher Scientific',
    period: '2022',
    year: '2022',
    summary:
      'Developed sales algorithms using combinatorics and anomaly detection for competitor analysis.',
    tags: ['Combinatorics', 'Anomaly Detection'],
  },
];

export const education = [
  {
    designation: 'GT-MS',
    degree: 'M.S. in Data Science',
    org: 'Georgia Tech',
    period: '2025 — 2026',
    summary: 'Furthering my understanding in advanced AI/ML fields.',
  },
  {
    designation: 'CWRU-BS',
    degree: 'B.S. in Data Science',
    org: 'Case Western Reserve University',
    period: '2020 — 2024',
    summary: 'Graduated Summa Cum Laude with a 4.0 GPA and numerous awards.',
  },
];

// 04 — Experiments (projects). Two featured investigations + a compact catalog.
export const projects = [
  {
    id: 1,
    designation: 'EXP-001',
    title: 'Cue Tavern',
    kind: 'Live product',
    description:
      'A social website for the mobile game “CUE Cards,” grown to over 100 registered users. Handles user accounts, community features, and image-based card recognition via OCR.',
    metrics: [
      { k: 'Users', v: '100+' },
      { k: 'Status', v: 'Live' },
    ],
    technologies: ['React', 'Node', 'Express', 'MongoDB', 'OCR', 'JavaScript'],
    github_url: 'https://github.com/jakesanghavi/CUE_Social/tree/main',
    live_url: 'https://cuetavern.com/',
    image_url: tavernLogo,
    featured: true,
  },
  {
    id: 2,
    designation: 'EXP-002',
    title: 'Roamio',
    kind: 'Live product',
    description:
      'An all-in-one trip planner for aspiring world travelers — itinerary building, discovery, and automated data collection to keep destination information fresh.',
    metrics: [
      { k: 'Domain', v: 'roamio.earth' },
      { k: 'Status', v: 'Live' },
    ],
    technologies: ['React', 'Firebase', 'Node', 'Express', 'Playwright', 'JavaScript'],
    github_url: 'https://github.com/jakesanghavi/TravelPlanner',
    live_url: 'https://roamio.earth/',
    image_url: roamioLogo,
    featured: true,
  },
  {
    id: 3,
    designation: 'CAT-011',
    title: 'NFL Stats',
    kind: 'Open-source research',
    description:
      'A widely-starred repository for NFL data gathering and analysis — scraping, cleaning, and modeling to surface structure in the sport.',
    technologies: ['Python', 'scikit-learn', 'Selenium'],
    github_url: 'https://github.com/jakesanghavi/NFL_Stats',
    live_url: null,
    featured: false,
  },
  {
    id: 4,
    designation: 'CAT-012',
    title: 'NBA Stats',
    kind: 'Open-source research',
    description:
      'An involved NBA data-scraping and analysis toolkit, focused on assembling clean datasets for downstream modeling.',
    technologies: ['Python', 'scikit-learn', 'Selenium'],
    github_url: 'https://github.com/jakesanghavi/NBA_Stats',
    live_url: null,
    featured: false,
  },
];

// 05 — Capabilities, presented as a catalog index rather than a logo wall.
export const capabilities = [
  {
    group: 'Languages',
    items: ['Python', 'JavaScript', 'TypeScript', 'SQL', 'R', 'Java', 'Swift'],
  },
  {
    group: 'Modeling & Data',
    items: ['PyTorch', 'TensorFlow', 'scikit-learn', 'Pandas', 'Hugging Face', 'OpenCV', 'Spark', 'Databricks'],
  },
  {
    group: 'Interfaces',
    items: ['React', 'Next.js', 'Node', 'FastAPI', 'D3', 'Tailwind'],
  },
  {
    group: 'Platforms',
    items: ['AWS', 'Azure', 'Google Cloud', 'Docker', 'Snowflake', 'Palantir', 'MongoDB', 'Supabase', 'Firebase'],
  },
];

export const systems = {
  lead:
    'Sports analytics is where I practice the same discipline on a different sky: extracting structure and insight from complex, noisy data — held to the same standard of rigor as an astronomical measurement.',
  note: 'The chart below is illustrative — a light curve is to a star what a performance trace is to a season: a signal pulled from noise.',
};
