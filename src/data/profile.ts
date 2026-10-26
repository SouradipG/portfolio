// Everything the site says about me lives here, so updating the
// portfolio after a resume change is a one file edit.

export const profile = {
  name: 'Souradip Ganguly',
  shortName: 'Souradip',
  role: 'Lead Backend Engineer',
  location: 'Kolkata, India',
  email: 'souradip.g.21@gmail.com',
  github: 'https://github.com/SouradipG',
  linkedin: 'https://www.linkedin.com/in/souradip/',
  resume: '/souradip-ganguly-resume.pdf',
  headline: 'I build Java services that keep working when the traffic doubles.',
  intro: [
    'Backend engineer with six years of shipping Spring Boot microservices on AWS for telecom, banking and insurance clients. I care about clear APIs, predictable latency and systems the next engineer can actually reason about.',
    'Lately most of my time goes into putting AI to practical use in backend systems. At Accolite I built an integration layer that moved the sales agents of one of the world’s largest telecom companies off a legacy Salesforce portal onto a modern online journey, and business volumes went up 30% in three months.',
  ],
  openTo: 'Open to senior backend roles at product companies',
};

export const metrics = [
  { value: '30%', label: 'rise in business volume within three months of launching a new integration layer' },
  { value: '10M+', label: 'API requests a month on services I designed' },
  { value: '6M+', label: 'insurance policies moved off legacy systems' },
  { value: '40%', label: 'manual effort removed through automation' },
];

export type Role = {
  company: string;
  title: string;
  period: string;
  place: string;
  summary: string;
  points: string[];
  stack: string[];
};

export const experience: Role[] = [
  {
    company: 'Accolite Digital',
    title: 'Lead Software Engineer',
    period: 'Jan 2024 to now',
    place: 'Remote',
    summary: 'Leading backend work for one of the world’s largest telecom companies.',
    points: [
      'Built a middle layer that connects the client’s legacy sales channels, including a dated Salesforce agent portal, to the new online journey. Agents now work in one modern interface, and business volumes rose 30% in the first three months.',
      'Built several AI proofs of concept for the client that have directly helped grow their business.',
      'Designed Spring Boot 3 microservices on Java 17 that now serve more than 10 million API requests a month.',
      'Built and tuned REST and GraphQL APIs that made order processing 35% more efficient and simplified integration with other platforms.',
      'Applied reactive programming to the busiest flows, which kept the platform responsive and fault tolerant through a 50% rise in traffic.',
      'Delivered automation and modernisation work on AWS and MongoDB over more than a million records, cutting manual effort by 40% across several business lines.',
    ],
    stack: ['Java 17', 'Spring Boot 3', 'WebFlux', 'GraphQL', 'MongoDB', 'AWS'],
  },
  {
    company: 'Infosys',
    title: 'Associate Consultant',
    period: 'May 2023 to Jan 2024',
    place: 'Kolkata',
    summary: 'Backend engineer on core banking products for a major private bank.',
    points: [
      'Built an internal automation tool that took about 40% of the repetitive work off the development team.',
      'Worked on architecture and feature optimisation that lifted end user satisfaction by 40%.',
    ],
    stack: ['Java', 'Spring Boot', 'SQL'],
  },
  {
    company: 'Tata Consultancy Services',
    title: 'Systems Engineer',
    period: 'Aug 2020 to May 2023',
    place: 'Kolkata',
    summary: 'TCS BaNCS Insurance, for life and pensions brands in the UK.',
    points: [
      'Owned parts of the migration of legacy life, annuity and pension systems covering more than 6 million policies.',
      'Cut development time by 20% and improved application performance by 30% through better planning and workflow changes.',
      'Mentored and led a small group of junior developers through full delivery cycles.',
    ],
    stack: ['Java', 'Spring', 'SQL', 'Maven'],
  },
];

export const skills = [
  { group: 'Languages', items: ['Java 17+', 'SQL', 'Python'] },
  { group: 'Frameworks', items: ['Spring Boot 3', 'Spring WebFlux', 'Project Reactor', 'Spring Security', 'Hibernate / JPA', 'R2DBC'] },
  { group: 'APIs and messaging', items: ['REST', 'GraphQL', 'Server Sent Events', 'Apache Kafka'] },
  { group: 'Data', items: ['MongoDB', 'PostgreSQL', 'MySQL'] },
  { group: 'Cloud and delivery', items: ['AWS (EC2, Lambda, S3, CloudWatch)', 'Docker', 'Maven', 'CI/CD'] },
  { group: 'AI in the backend', items: ['LLM APIs', 'Prompt design', 'Hugging Face', 'Apache Tika'] },
  { group: 'Testing', items: ['JUnit 5', 'Mockito', 'WebTestClient', 'TDD'] },
];

export const certifications = [
  'Claude Certified Architect, Foundations, Anthropic (2026)',
  'OCI Generative AI Professional, Oracle',
  'Programming, Data Structures and Algorithms using Python, IIT (NPTEL)',
];

export const awards = [
  'Emerging Icon and Extra Miler, Accolite Digital',
  'Star of the Month, On the Spot and Best Team, TCS',
];

export const earlyWork = {
  name: 'Hotel Management System',
  repo: 'https://github.com/iamsomraj/Hotel-Management',
  summary:
    'My first team project, built with three classmates in college. A web based hotel management system with a PHP backend, AJAX powered search and Chart.js financial reports. I worked across the whole project, from the server side logic and session handling to the Bootstrap screens.',
  stack: ['PHP', 'JavaScript', 'AJAX', 'Bootstrap', 'Chart.js'],
};

export const education = {
  school: 'Narula Institute of Technology, Kolkata',
  degree: 'B.Tech in Computer Science and Engineering',
  period: '2016 to 2020',
};
