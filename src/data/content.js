import tavernLogo from '../assets/tavern_logo.png';
import roamioLogo from '../assets/roamio_logo.png';
import portrait from '../assets/denver_me.jpeg';

export { portrait };

// Base64-obfuscated email, kept from the previous site.
export const ENCODED_EMAIL = 'amFrZS5zYW5naGF2aUBnbWFpbC5jb20=';
export const FORMSPREE_ID = 'xwpqabby';

export const profile = {
  name: 'Jake Sanghavi',
  role: 'Solutions Designer',
  location: 'Atlanta',
  // A short, personal introduction for the opening screen.
  summary:
    'Data scientist and engineer building production ML — NLP, forecasting, and the data platforms behind them. Off the clock, it’s astrophysics and sports analytics: the same hunt for structure hidden in noisy data.',
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

// A compact professional summary that leads the experience section.
export const resumeSummary =
  'ML / data science engineer building production NLP, forecasting, and data pipelines for telecom and finance — with measurable impact from GenAI, computer vision, and predictive analytics.';

// Experience — most recent first. Each summary condensed to one line.
export const experience = [
  {
    year: '2025',
    role: 'Data Science Engineer II, Corporate Finance',
    org: 'AT&T',
    period: '2025 — present',
    location: 'Atlanta, GA',
    summary:
      'Enterprise cash-flow forecasting in Prophet (<1.5% monthly error) and a PySpark billing platform unifying records for 200M+ subscribers.',
    current: true,
  },
  {
    year: '2024',
    role: 'Data Science Engineer I, Mass Markets',
    org: 'AT&T',
    period: '2024 — 2025',
    location: 'Atlanta, GA',
    summary:
      'NLP, computer vision, and RAG systems that recovered misassigned credits and matched customer claims — $15M+ in annual value.',
  },
  {
    year: '2024',
    role: 'Data Analyst Intern',
    org: 'The Kraft Group',
    period: '2024',
    location: 'Foxboro, MA',
    summary:
      'Forecast game attendance to within 2%, cutting staffing and inventory costs by $10K+ per game.',
  },
  {
    year: '2023',
    role: 'Data Science Intern',
    org: 'AT&T',
    period: '2023',
    location: 'Atlanta, GA',
    summary:
      'GPT-4 summarization workflows and complaint-prediction models mitigating an estimated $235M in risk.',
  },
  {
    year: '2022',
    role: 'Corporate Data Science Intern',
    org: 'Thermo Fisher Scientific',
    period: '2022',
    location: 'Pittsburgh, PA',
    summary: 'NLP and anomaly detection to flag disloyal customers and drive sales growth.',
  },
  {
    year: '2021',
    role: 'Astrophysics Research Intern',
    org: 'Embry-Riddle Aeronautical University',
    period: '2021',
    location: 'Daytona Beach, FL',
    summary:
      'Measured stellar orbital periods with FFTs; optimized wavelet algorithms for up to 500× speedups.',
  },
  {
    year: '2019',
    role: 'Data Analyst Intern',
    org: 'The New England Patriots',
    period: '2019 — 2020',
    location: 'Foxboro, MA',
    summary:
      'Built statistical models and visualizations for the Patriots Hall of Fame “Dynasty” exhibit.',
  },
];

export const education = [
  {
    degree: 'M.S. in Analytics — Computational Track',
    org: 'Georgia Tech',
    period: '2025 — 2026',
    note: 'GPA 4.0',
  },
  {
    degree: 'B.S. in Data Science & Analytics',
    org: 'Case Western Reserve University',
    period: '2020 — 2024',
    note: 'Summa Cum Laude · GPA 4.0',
  },
];

// Skills as two compact groups (not a logo wall).
export const skills = [
  {
    group: 'Engineering',
    items: ['Python', 'TypeScript', 'SQL', 'React', 'Next.js', 'Node', 'FastAPI', 'Databricks', 'Snowflake', 'Azure', 'Docker'],
  },
  {
    group: 'ML / AI',
    items: ['PyTorch', 'TensorFlow', 'scikit-learn', 'PySpark', 'LangChain / LangGraph', 'RAG', 'LLMs', 'OpenCV'],
  },
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
      'A social platform for the mobile game “CUE Cards,” now with 200+ active users — accounts, OAuth, community, and image-based card recognition via OCR.',
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
