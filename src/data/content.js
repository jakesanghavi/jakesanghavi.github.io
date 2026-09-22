import tavernLogo from '../assets/tavern_logo.png';
import roamioLogo from '../assets/roamio_logo.png';
import nflMark from '../../images/NFL_logo.jpg';
import nbaMark from '../../images/NBA.png';
import portrait from '../assets/denver_me.jpeg';
import attLogo from '../assets/logos/att.svg';
import ugaLogo from '../assets/logos/uga.svg';
import kraftLogo from '../assets/logos/kraft.svg';
import thermoLogo from '../assets/logos/thermo.svg';
import embryLogo from '../assets/logos/embryriddle.svg';
import patriotsLogo from '../assets/logos/patriots.svg';
import gatechLogo from '../assets/logos/gatech.svg';
import cwruLogo from '../assets/logos/cwru.svg';

// Brand fields for employment and education cards. Colors come from each mark.
const brands = {
  att: {
    logo: attLogo,
    background:
      'radial-gradient(80% 90% at 100% 40%, rgba(0,168,224,0.42), transparent 58%), linear-gradient(165deg, #0b3c56 0%, #071820 100%)',
  },
  uga: {
    logo: ugaLogo,
    background:
      'radial-gradient(80% 90% at 100% 50%, rgba(186,12,47,0.5), transparent 58%), linear-gradient(165deg, #3a1018 0%, #14080b 100%)',
  },
  kraft: {
    logo: kraftLogo,
    background:
      'radial-gradient(70% 80% at 100% 80%, rgba(255,255,255,0.08), transparent 55%), linear-gradient(165deg, #2a2a2a 0%, #111111 100%)',
  },
  thermo: {
    logo: thermoLogo,
    background:
      'radial-gradient(80% 80% at 100% 30%, rgba(239,65,53,0.42), transparent 56%), linear-gradient(165deg, #3a1614 0%, #140c0c 100%)',
  },
  embry: {
    logo: embryLogo,
    background:
      'radial-gradient(85% 80% at 100% 40%, rgba(0,82,156,0.55), transparent 58%), linear-gradient(165deg, #0c2f52 0%, #081420 100%)',
  },
  patriots: {
    logo: patriotsLogo,
    background:
      'radial-gradient(80% 80% at 100% 70%, rgba(198,12,48,0.4), transparent 55%), linear-gradient(165deg, #0d2244 0%, #081018 100%)',
  },
  gatech: {
    logo: gatechLogo,
    background:
      'radial-gradient(80% 80% at 100% 40%, rgba(170,152,93,0.45), transparent 56%), linear-gradient(165deg, #1a2740 0%, #0c1422 100%)',
  },
  cwru: {
    logo: cwruLogo,
    background:
      'radial-gradient(80% 80% at 100% 40%, rgba(0,82,160,0.45), transparent 56%), linear-gradient(165deg, #0c2748 0%, #081018 100%)',
  },
};

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
    year: '2024',
    role: 'Data Scientist',
    org: 'AT&T',
    period: '2024 — present',
    location: 'Atlanta, GA',
    summary:
      'Cash-flow forecasting in Prophet (<1.5% error) and PySpark billing platforms for 200M+ subscribers; earlier, NLP, computer vision, and RAG systems worth $15M+.',
    current: true,
    commitment: 'FULL-TIME',
    ...brands.att,
  },
  {
    year: '2025',
    role: 'Astrophysics Researcher',
    org: 'University of Georgia',
    period: '2025 — present',
    location: 'Athens, GA',
    summary:
      'Python simulations of exoplanet photosynthesis — modeling orbital dynamics and atmospheric composition to find worlds where it could be detectable from Earth.',
    current: true,
    commitment: 'PART-TIME',
    ...brands.uga,
  },
  {
    year: '2024',
    role: 'Data Analyst Intern',
    org: 'The Kraft Group',
    period: '2024',
    location: 'Foxboro, MA',
    summary:
      'Forecast game attendance to within 2%, cutting staffing and inventory costs by $10K+ per game.',
    ...brands.kraft,
  },
  {
    year: '2023',
    role: 'Data Science Intern',
    org: 'AT&T',
    period: '2023',
    location: 'Atlanta, GA',
    summary:
      'GPT-4 summarization workflows and complaint-prediction models mitigating an estimated $235M in risk.',
    ...brands.att,
  },
  {
    year: '2022',
    role: 'Corporate Data Science Intern',
    org: 'Thermo Fisher Scientific',
    period: '2022',
    location: 'Pittsburgh, PA',
    summary: 'NLP and anomaly detection to flag disloyal customers and drive sales growth.',
    ...brands.thermo,
  },
  {
    year: '2021',
    role: 'Astrophysics Research Intern',
    org: 'Embry-Riddle Aeronautical University',
    period: '2021',
    location: 'Daytona Beach, FL',
    summary:
      'Measured stellar orbital periods with FFTs; optimized wavelet algorithms for up to 500× speedups.',
    ...brands.embry,
  },
  {
    year: '2019',
    role: 'Data Analyst Intern',
    org: 'The New England Patriots',
    period: '2019 — 2020',
    location: 'Foxboro, MA',
    summary:
      'Built statistical models and visualizations for the Patriots Hall of Fame “Dynasty” exhibit.',
    ...brands.patriots,
  },
];

export const education = [
  {
    degree: 'M.S. in Analytics — Computational Track',
    org: 'Georgia Tech',
    period: '2025 — 2026',
    note: 'GPA 4.0',
    ...brands.gatech,
  },
  {
    degree: 'B.S. in Data Science & Analytics',
    org: 'Case Western Reserve University',
    period: '2020 — 2024',
    note: 'Summa Cum Laude · GPA 4.0',
    ...brands.cwru,
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
    image_url: nflMark,
    tone: 'field',
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
    image_url: nbaMark,
    tone: 'ink',
    featured: false,
  },
];
