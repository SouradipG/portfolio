// Everything the site says about me lives here, so updating the
// portfolio after a resume change is a one file edit.

export const profile = {
  name: 'Souradip Ganguly',
  shortName: 'Souradip',
  role: 'Lead Backend Engineer',
  company: 'Bounteous',
  location: 'Kolkata, India',
  email: 'souradip.g.21@gmail.com',
  github: 'https://github.com/SouradipG',
  linkedin: 'https://www.linkedin.com/in/souradip/',
  resume: '/souradip-ganguly-resume.pdf',
  pitch: 'I modernise legacy systems and put AI to work inside Java backends.',
  intro: [
    'Six years of building Java and Spring Boot microservices on AWS for telecom, banking and insurance. Most of that time has gone into the unglamorous, high value work of taking old systems that make money and making them faster, simpler and easier to change.',
    'Right now I lead backend work for one of the world’s largest telecom companies. I designed the service that moved their agent channels onto a modern digital order journey, and I’m building agentic AI tooling on Claude LLMs for their sales teams. On my own time I build distributed systems that stay correct under heavy concurrency: a payments ledger, a flash sale backend and a multi tenant AI gateway.',
  ],
  openTo: 'Open to senior and lead backend roles',
};

export const metrics = [
  { value: 30, suffix: '%+', label: 'lift in order volume within three months of launching Omni Context Service' },
  { value: 10, suffix: 'M+', label: 'API requests a month on services I designed' },
  { value: 6, suffix: 'M+', label: 'insurance policies moved off legacy systems' },
  { value: 40, suffix: '%', label: 'manual effort removed through automation' },
];

export type Company = { name: string; linkedin: string; note?: string };

export const companies: Record<string, Company> = {
  bounteous: {
    name: 'Bounteous',
    linkedin: 'https://www.linkedin.com/company/bounteous/',
    note: 'formerly Accolite Digital',
  },
  infosys: { name: 'Infosys', linkedin: 'https://www.linkedin.com/company/infosys/' },
  tcs: { name: 'Tata Consultancy Services', linkedin: 'https://www.linkedin.com/company/tata-consultancy-services/' },
};

export type Role = {
  company: Company;
  title: string;
  period: string;
  place: string;
  summary: string;
  points: string[];
  stack: string[];
};

export const experience: Role[] = [
  {
    company: companies.bounteous,
    title: 'Lead Software Engineer',
    period: 'Jan 2024 to now',
    place: 'Remote',
    summary:
      'Leading backend modernisation for one of the world’s largest telecom companies, where most orders still come in through agent and store channels rather than the website.',
    points: [
      'Designed and built Omni Context Service, a Spring Boot microservice that bridges legacy channels (a Salesforce agent desktop, ServiceNow, retail store systems) and the company’s modern Omni order journey. A legacy tool calls one create session API, the service keeps the customer context as a session in MongoDB, and the agent lands in the new journey, which reads that session at every step. Far fewer screens and clicks for agents, and order volume grew by more than 30% within three months.',
      'Building AI proofs of concept on the order data with agentic LLM workflows, routing each task to a model sized for it: a management dashboard that tracks every order from start to completion with drill down to the pain points, and an agent view with personal progress, follow up reminders and a leaderboard that drives healthy competition.',
      'Designed Spring Boot microservices that serve more than 10 million API requests a month.',
      'Built and tuned REST and GraphQL APIs that made order processing 35% more efficient.',
      'Moved the busiest flows to reactive programming, keeping the platform responsive through a 50% rise in traffic.',
      'Automated workflows over more than a million records on AWS and MongoDB, cutting manual effort by 40%.',
    ],
    stack: ['Java 21', 'Spring Boot', 'Microservices', 'MongoDB', 'AWS ECS', 'Amazon S3', 'REST', 'GraphQL', 'Spring WebFlux', 'Agentic AI', 'Claude LLMs', 'Salesforce', 'ServiceNow'],
  },
  {
    company: companies.infosys,
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
    company: companies.tcs,
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

// What my side projects are being built on now.
export const buildingWith = ['Java 25', 'Spring Boot 4', 'Spring AI 2.0', 'Model Context Protocol', 'Virtual threads', 'Apache Kafka', 'Kubernetes', 'OpenTelemetry'];

export const skills = [
  { group: 'Languages', items: ['Java (up to 25)', 'SQL', 'Python', 'Lua (Redis scripts)'] },
  { group: 'Frameworks', items: ['Spring Boot', 'Spring MVC', 'Spring WebFlux', 'Project Reactor', 'Spring Security', 'Spring Data JPA', 'Hibernate', 'Spring AI', 'R2DBC'] },
  { group: 'Architecture', items: ['Microservices', 'Distributed systems', 'System design', 'Event driven architecture', 'Concurrency and multithreading', 'Idempotency', 'Saga and transactional outbox', 'Caching', 'Rate limiting'] },
  { group: 'APIs and integration', items: ['REST', 'GraphQL', 'Server Sent Events', 'Apache Kafka', 'Salesforce', 'ServiceNow'] },
  { group: 'Data', items: ['MongoDB', 'PostgreSQL', 'Redis', 'MySQL'] },
  { group: 'Cloud and delivery', items: ['AWS (ECS, EC2, Lambda, S3, CloudWatch)', 'Docker', 'Maven', 'CI/CD'] },
  { group: 'AI in the backend', items: ['LLM integration', 'Agentic AI', 'Claude', 'Spring AI', 'Model routing', 'Prompt engineering', 'Hugging Face', 'Apache Tika'] },
  { group: 'Testing', items: ['JUnit', 'Mockito', 'Testcontainers', 'k6 load tests', 'TDD'] },
];

export const helpWith = [
  {
    title: 'Modernising legacy channels',
    body: 'Old systems that still bring in the money, wrapped and bridged so the business can move to a modern stack without a risky big bang rewrite.',
    subject: 'Legacy modernisation',
  },
  {
    title: 'AI inside Java backends',
    body: 'LLM features that sit next to deterministic code, with fallbacks, guardrails and numbers you can trust.',
    subject: 'AI in the backend',
  },
  {
    title: 'Leading a backend team',
    body: 'Service design, API contracts, reviews and mentoring, for a team that needs to ship at scale without breaking things.',
    subject: 'Lead backend role',
  },
];

export const certifications = [
  'Claude Certified Architect, Foundations, Anthropic (2026)',
  'OCI Generative AI Professional, Oracle',
  'Programming, Data Structures and Algorithms using Python, IIT (NPTEL)',
];

export const awards = [
  { name: 'Emerging Icon', from: 'Accolite Digital (now Bounteous)' },
  { name: 'Extra Miler', from: 'Accolite Digital (now Bounteous)' },
  { name: 'Star of the Month', from: 'Tata Consultancy Services' },
  { name: 'On the Spot', from: 'Tata Consultancy Services' },
  { name: 'Best Team', from: 'Tata Consultancy Services' },
  { name: 'NIT Jewels', from: 'Narula Institute of Technology' },
];

// Excerpts from recommendations on my LinkedIn profile, word for word.
export const recommendations: { quote: string; name: string; title: string; relation: string; link?: string }[] = [
  {
    quote:
      'He was deeply involved in managing deployments, maintaining code quality, and contributing to clean, maintainable, and scalable solutions. Whether it was troubleshooting complex production issues or proactively identifying areas for improvement in our Codebase and CI/CD pipeline, Souradip could be counted on to deliver.',
    name: 'Lakhvir Bansal',
    title: 'Associate Technical Director, Bounteous',
    relation: 'managed me at Accolite',
    link: 'https://www.linkedin.com/in/lakhvir-bansal/',
  },
  {
    quote:
      'When it comes to coding, Souradip’s work is all about clean, efficient, and future-proof solutions. Whether solving tricky problems or rolling out best practices, he handles it all easily. Plus, he brings a compelling passion and a collaborative spirit that uplifts the entire team.',
    name: 'Sudha S Balaguru',
    title: 'Engineering Manager',
    relation: 'managed me directly',
    link: 'https://www.linkedin.com/in/sudha-s-balaguru-774344a2/',
  },
];

export const education = {
  school: 'Narula Institute of Technology, Kolkata',
  degree: 'B.Tech in Computer Science and Engineering',
  period: '2016 to 2020',
};
