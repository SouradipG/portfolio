// Everything the site says about me lives here, so updating the
// portfolio after a resume change is a one file edit.

export const profile = {
  name: 'Souradip Ganguly',
  shortName: 'Souradip',
  role: 'Lead Java Backend Engineer',
  company: 'Bounteous',
  location: 'Kolkata, India',
  email: 'souradip.g.21@gmail.com',
  github: 'https://github.com/SouradipG',
  linkedin: 'https://www.linkedin.com/in/souradip/',
  resume: '/souradip-ganguly-resume.pdf',
  pitch: 'I design and build Java backends that carry real traffic and real money, and I keep them running in production.',
  intro: [
    'I’m a lead backend engineer at Bounteous, where I lead backend work on British Telecom’s digital ordering platform. The services my team runs handle more than 10 million API calls a month, and the order handover service I launched lifted order volume by 30% in its first three months.',
    'Over six years in telecom, banking and insurance I’ve built new services from a blank page, rebuilt legacy systems that were still carrying the business, and moved more than 6 million insurance policies onto a modern platform. I care most about the parts that decide whether a system survives production: concurrency that stays correct under load, retries that never charge anyone twice, and failures that slow things down instead of taking them down.',
    'I lead and mentor a team of five to seven engineers, and I use AI where it makes us faster without letting it make the decisions. Outside work I build the hard parts myself: a payments ledger, a flash sale backend and a multi tenant AI gateway, each tested against the failures that usually break systems like them.',
  ],
  openTo: 'Open to senior and lead backend roles',
};

export const metrics = [
  { value: 30, suffix: '%+', label: 'lift in order volume within three months of launch' },
  { value: 10, suffix: 'M+', label: 'API requests a month on services I designed' },
  { value: 6, suffix: 'M+', label: 'insurance policies moved off legacy systems' },
  { value: 40, suffix: '%', label: 'manual effort removed through automation' },
];

export type Company = { name: string; linkedin: string; note?: string };

export const companies: Record<string, Company> = {
  bounteous: {
    name: 'Bounteous',
    linkedin: 'https://www.linkedin.com/company/bounteous/',
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
      'Leading backend modernisation for British Telecom, where most orders still come in through contact centre and store channels rather than the website.',
    points: [
      'Launched a service that lets contact centre and store staff place orders on the new digital journey instead of old screens. Orders went up 30%+ in 3 months.',
      'Built AI powered dashboards that show stakeholders where every order stands and give sales agents a leaderboard to compete on.',
      'Microservices now handle 10M+ API calls a month. Reworked the order APIs (35% more efficient processing) and moved the busiest flows to Spring WebFlux ahead of a 50% jump in traffic.',
      'Automated manual steps on 1M+ records, so business teams spend 40% less time on them.',
      'Use AI across solution design, architecture reviews, coding and testing, making delivery about 20% faster.',
      'Mentor 5 to 7 engineers. Also review code, run releases and handle production incidents.',
    ],
    stack: ['Java 21', 'Spring Boot', 'Microservices', 'MongoDB', 'AWS ECS', 'Amazon S3', 'REST', 'GraphQL', 'Spring WebFlux', 'Agentic AI'],
  },
  {
    company: companies.infosys,
    title: 'Associate Consultant',
    period: 'May 2023 to Jan 2024',
    place: 'Kolkata',
    summary: 'Backend engineer on core banking products for a major private bank.',
    points: [
      'Worked on the Java and Spring Boot services behind core banking operations at one of India’s largest private banks.',
      'Created an internal automation tool that took over 40% of the team’s repetitive work.',
      'Improved high traffic banking features, lifting end user satisfaction by 40%.',
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
      'Ran the migration of 6M+ UK life, annuity and pension policies from legacy systems to a modern insurance platform.',
      'Improved the team’s planning and workflow, so features took 20% less time to build and the app ran 30% faster.',
      'Led 3 to 4 junior developers through full release cycles, and every release shipped on time.',
    ],
    stack: ['Java', 'Spring', 'SQL', 'Maven'],
  },
];

// What my side projects are being built on now.
export const buildingWith = ['Java 25', 'Spring Boot 4', 'Spring AI 2.0', 'Model Context Protocol', 'Virtual threads', 'Apache Kafka', 'Kubernetes', 'OpenTelemetry'];

export const skills = [
  { group: 'Languages', items: ['Java (17, 21, 25)', 'SQL', 'Python'] },
  { group: 'Backend', items: ['Spring Boot', 'Spring WebFlux', 'Spring Security', 'Spring Data JPA', 'Hibernate', 'REST APIs', 'GraphQL', 'gRPC'] },
  { group: 'Architecture', items: ['Microservices', 'Distributed systems', 'System design', 'Event driven architecture', 'Scalability', 'High availability', 'Concurrency'] },
  { group: 'Data and messaging', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Elasticsearch', 'Apache Kafka'] },
  { group: 'Cloud and DevOps', items: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD', 'GitHub Actions', 'Jenkins'] },
  { group: 'Observability and testing', items: ['OpenTelemetry', 'Prometheus', 'Grafana', 'JUnit', 'Mockito', 'Testcontainers'] },
  { group: 'AI engineering', items: ['Agentic AI', 'AI agents', 'LLM orchestration', 'Tool calling', 'RAG', 'Vector databases', 'MCP', 'Spring AI', 'Claude Code'] },
  { group: 'Leadership', items: ['Mentoring', 'Code reviews', 'Stakeholder communication', 'Cross team collaboration', 'Agile and Scrum'] },
];

export const helpWith = [
  {
    title: 'Building backends from scratch',
    body: 'New services designed for production from day one: clean APIs, safe concurrency, idempotency and caching, so they hold up when traffic spikes or a dependency fails.',
    subject: 'New backend build',
  },
  {
    title: 'Modernising legacy systems',
    body: 'Any legacy system, moved onto a modern stack step by step, so the business keeps running and earning without a risky big bang rewrite.',
    subject: 'Legacy modernisation',
  },
  {
    title: 'AI where it earns its place',
    body: 'LLM features beside deterministic code, with fallbacks, guardrails and numbers you can trust, used where they make people faster and left out where they don’t.',
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
  { name: 'Emerging Icon', from: 'Bounteous' },
  { name: 'Extra Miler', from: 'Bounteous' },
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
    relation: 'managed me at Bounteous',
    link: 'https://www.linkedin.com/in/lakhvir-bansal/',
  },
  {
    quote:
      'When it comes to coding, Souradip’s work is all about clean, efficient, and future-proof solutions. Whether solving tricky problems or rolling out best practices, he handles it all easily. Plus, he brings a compelling passion and a collaborative spirit that uplifts the entire team.',
    name: 'Sudha S Balaguru',
    title: 'Engineering Manager, British Telecom (BT), UK',
    relation: 'managed me directly as my client manager',
    link: 'https://www.linkedin.com/in/sudha-s-balaguru-774344a2/',
  },
];

export const education = {
  school: 'Narula Institute of Technology, Kolkata',
  degree: 'B.Tech in Computer Science and Engineering',
  period: '2016 to 2020',
};
