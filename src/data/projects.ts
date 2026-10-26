// Each project is written up like a short design doc: what problem it
// solves, how it is put together, and the calls I made along the way.

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  year: string;
  repo: string;
  stack: string[];
  problem: string;
  design: string[];
  decisions: { title: string; body: string }[];
  next: string[];
  // Top to bottom layers of the architecture diagram, plus the arrows
  // between boxes. Without edges every box links to the whole next row.
  diagram: string[][];
  edges?: [string, string][];
};

export const projects: Project[] = [
  {
    slug: 'fire-calculator',
    name: 'FIRE Planner API',
    tagline: 'A GraphQL service that runs retirement math on the JVM and asks an LLM to explain the result.',
    year: '2026',
    repo: 'https://github.com/SouradipG/fire-calculator',
    stack: ['Java 21', 'Spring Boot', 'Spring for GraphQL', 'RestClient', 'Groq (Llama 3.3 70B)'],
    problem:
      'Most FIRE (financial independence, retire early) calculators give you one number and stop there. I wanted an API that returns the full picture, a year by year projection, the shortfall and the SIP needed to close it, plus plain language advice that reacts to the person’s own goals and risk profile.',
    design: [
      'A single GraphQL endpoint lets clients ask for just the summary or the full yearly projection in one round trip, instead of me maintaining several REST shapes.',
      'All of the financial math sits in a pure calculation engine with no framework or network dependencies, so it is fast and covered by plain unit tests.',
      'An insights service builds a structured prompt from the computed numbers and calls Groq’s OpenAI compatible chat API through Spring’s RestClient.',
    ],
    decisions: [
      {
        title: 'The model explains, the code calculates',
        body: 'Numbers come from deterministic Java code and are passed into the prompt as facts. The LLM is only asked to interpret them, which keeps the figures correct even if the model has a bad day.',
      },
      {
        title: 'Graceful fallback',
        body: 'If the LLM call fails for any reason, the API still returns the full calculation along with rule based guidance. The AI part is an enhancement, never a dependency of the core response.',
      },
      {
        title: 'Plain HTTP over an SDK',
        body: 'Groq speaks the OpenAI wire format, so a small RestClient call with a low temperature and a JSON response contract was enough. Swapping providers is a config change.',
      },
    ],
    next: ['Response caching for repeated inputs', 'Rate limiting per client', 'Streaming insights over SSE'],
    diagram: [
      ['GraphQL client'],
      ['FireCalculatorResolver'],
      ['FireCalculatorService'],
      ['Calculation engine', 'AI insights service'],
      ['Groq chat API'],
    ],
    edges: [
      ['GraphQL client', 'FireCalculatorResolver'],
      ['FireCalculatorResolver', 'FireCalculatorService'],
      ['FireCalculatorService', 'Calculation engine'],
      ['FireCalculatorService', 'AI insights service'],
      ['AI insights service', 'Groq chat API'],
    ],
  },
  {
    slug: 'reactive-trading-platform',
    name: 'Reactive Trading Platform',
    tagline: 'Non blocking microservices that stream live stock prices and execute trades end to end.',
    year: '2025',
    repo: 'https://github.com/SouradipG/trade-platofrm',
    stack: ['Java', 'Spring WebFlux', 'Project Reactor', 'R2DBC', 'Server Sent Events', 'WebClient'],
    problem:
      'A trading flow has to read a live price, validate the order and update a portfolio while thousands of clients hold open price streams. A thread per request model runs out of threads long before it runs out of CPU, so I built the whole path to be non blocking.',
    design: [
      'An aggregator service acts as the gateway. It exposes the price stream to clients over Server Sent Events and orchestrates every trade.',
      'A customer service owns balances and holdings and persists them through Spring Data R2DBC, so even database access never blocks a thread.',
      'Services talk to each other with WebClient, and every call is composed as Mono and Flux pipelines from controller to database.',
    ],
    decisions: [
      {
        title: 'SSE instead of WebSockets',
        body: 'Prices only flow one way, from server to client. SSE runs over plain HTTP, reconnects on its own and is trivial to put behind a load balancer.',
      },
      {
        title: 'Retry at the edge',
        body: 'The aggregator retries the upstream price stream with backoff when it drops, so a short outage in the stock feed does not end every client connection.',
      },
      {
        title: 'Domain errors as signals',
        body: 'Insufficient balance or unknown customer travel through the reactive chain as typed errors and are mapped to clean HTTP responses in one exception handler.',
      },
    ],
    next: ['Kafka for trade events', 'Idempotency keys on trade requests', 'Load test numbers with Gatling'],
    diagram: [
      ['Browser (SSE)'],
      ['Aggregator service'],
      ['Customer service', 'Stock price service'],
      ['R2DBC (H2)'],
    ],
    edges: [
      ['Browser (SSE)', 'Aggregator service'],
      ['Aggregator service', 'Customer service'],
      ['Aggregator service', 'Stock price service'],
      ['Customer service', 'R2DBC (H2)'],
    ],
  },
  {
    slug: 'ai-resume-analyzer',
    name: 'Resume Analyzer',
    tagline: 'Upload a resume and get extracted skills, a role guess, a sentiment read and a score back over REST.',
    year: '2025',
    repo: 'https://github.com/SouradipG/ai-resume-analyzer',
    stack: ['Java', 'Spring Boot', 'Apache Tika', 'Hugging Face Inference API', 'Spring Data JPA'],
    problem:
      'Screening resumes by hand is slow and inconsistent. I wanted a service that turns any PDF or Word resume into structured data a recruiter or another system can filter, rank and chart.',
    design: [
      'Apache Tika pulls clean text out of PDF, DOC and DOCX uploads, so the rest of the pipeline only ever deals with plain text.',
      'A hosted Hugging Face model reads the tone of the resume, while skills, role and years of experience come from a curated skill dictionary and pattern matching.',
      'Results are stored with JPA and exposed through REST endpoints for analysis, search by role, top scores and analytics such as skill trends and experience against score.',
    ],
    decisions: [
      {
        title: 'Models where they help, rules where they are enough',
        body: 'Tone is hard to judge with rules, so that goes to a model. Finding “5 years” or a known framework name is easy, so those stay as fast, testable rules with no network call.',
      },
      {
        title: 'One scoring formula',
        body: 'Skills, experience and tone feed a single weighted score, which makes results comparable across candidates and easy to explain.',
      },
    ],
    next: ['Async processing with a job queue for large batches', 'Embedding based job description matching'],
    diagram: [
      ['REST client'],
      ['Resume controller', 'Analytics controller'],
      ['Resume service'],
      ['Apache Tika', 'Hugging Face model', 'Database'],
    ],
    edges: [
      ['REST client', 'Resume controller'],
      ['REST client', 'Analytics controller'],
      ['Resume controller', 'Resume service'],
      ['Analytics controller', 'Database'],
      ['Resume service', 'Apache Tika'],
      ['Resume service', 'Hugging Face model'],
      ['Resume service', 'Database'],
    ],
  },
  {
    slug: 'job-portal',
    name: 'Job Portal',
    tagline: 'A role based hiring platform for recruiters and job seekers, secured with Spring Security.',
    year: '2025',
    repo: 'https://github.com/SouradipG/job-portal',
    stack: ['Java', 'Spring Boot', 'Spring Security', 'Hibernate / JPA', 'Thymeleaf', 'MySQL'],
    problem:
      'Two kinds of users, recruiters and job seekers, share one application but must never see each other’s tools. The interesting part was modelling that cleanly in both the data layer and the security layer.',
    design: [
      'Spring Security handles registration, form login and logout, with passwords hashed using BCrypt and only a small allow list of public routes.',
      'Separate profile entities for recruiters and job seekers hang off a common user account, mapped with Hibernate.',
      'Recruiters post and manage jobs from a dashboard; seekers search, save and apply, and can upload a resume.',
    ],
    decisions: [
      {
        title: 'One login, two experiences',
        body: 'Both user types share a single Spring Security setup. A custom success handler looks at the account type after login and sends recruiters and seekers into their own flows.',
      },
      {
        title: 'Server side rendering',
        body: 'Thymeleaf kept the project to one deployable and let me spend the time on the domain model and security instead of a separate frontend.',
      },
    ],
    next: ['Expose the core as a REST API', 'Full text search for jobs'],
    diagram: [
      ['Browser'],
      ['Spring Security filter chain'],
      ['Recruiter flows', 'Job seeker flows'],
      ['JPA repositories'],
      ['MySQL'],
    ],
  },
];
