import tavernLogo from '../assets/tavern_logo.png';
import roamioLogo from '../assets/roamio_logo.png';

export const projects = [
  {
    id: 'cue-tavern',
    title: 'Cue Tavern',
    period: 'July 2024–Present',
    stack: ['React', 'OCR/Tesseract', 'Selenium', 'Netlify', 'MongoDB'],
    summary:
      'Social website with 200+ active users; implements OAuth, OCR, and more.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id ligula porta felis euismod semper. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
    liveUrl: 'https://cuetavern.com/',
    githubUrl: 'https://github.com/jakesanghavi/CUE_Social/tree/main',
    logo: tavernLogo,
    featured: true,
    motif: 'arc',
  },
  {
    id: 'roamio',
    title: 'Roamio',
    period: '',
    stack: ['React', 'Firebase', 'Node', 'Express', 'Playwright'],
    summary: 'An all-in-one trip planner for aspiring world travelers.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed diam eget risus varius blandit sit amet non magna. Donec id elit non mi porta gravida at eget metus.',
    liveUrl: 'https://roamio.earth/',
    githubUrl: 'https://github.com/jakesanghavi/TravelPlanner',
    logo: roamioLogo,
    featured: true,
    motif: 'orbit',
  },
  {
    id: 'lifeos',
    title: 'LifeOS',
    period: 'May 2026–Present',
    stack: ['LangGraph', 'LangChain', 'OpenAI API', 'Python', 'LLMs'],
    summary:
      'Extensible multi-agent AI platform (Python/LangGraph/LLMs) enabling users to build personalized AI assistants via a marketplace of specialized agents (finance, travel, productivity, etc.), orchestrated via tool calling and shared memory.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.',
    liveUrl: '',
    githubUrl: '',
    logo: null,
    featured: true,
    motif: 'isoline',
  },
];
