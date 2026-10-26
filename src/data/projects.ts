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
    slug: 'ledgerline',
    name: 'Ledgerline',
    tagline: 'A double entry payments ledger that stays correct under concurrent transfers, client retries and crashes halfway through a request.',
    year: '2026',
    repo: 'https://github.com/SouradipG/ledgerline',
    stack: ['Java 25', 'Spring Boot 4', 'PostgreSQL', 'Apache Kafka', 'Virtual threads', 'Testcontainers'],
    problem:
      'Two bugs show up in almost every first version of a payments service, and neither shows up when you test by hand. A client times out after the server already moved the money, retries, and the customer is charged twice. Two transfers read the same balance at the same moment and both spend it. I wanted a ledger that makes both impossible, with tests that prove it against a real Postgres under real concurrency.',
    design: [
      'Every transfer writes exactly one negative and one positive posting, and the balance snapshot is updated in the same transaction, so the books always sum to zero.',
      'Idempotency keys live in Postgres. The claim commits on its own so a concurrent duplicate sees it at once, and the stored response commits with the money movement, so a retry gets the original answer byte for byte.',
      'Events go out through a transactional outbox. A relay on every instance publishes to Kafka with FOR UPDATE SKIP LOCKED, and the consumer dedupes on the event id.',
      'Payouts run as a saga against a simulated provider that can decline, go down, or take the money and never answer. A nightly reconciliation compares the provider’s settlements with the ledger.',
    ],
    decisions: [
      {
        title: 'Lock rows in one global order',
        body: 'Every transfer locks the two balance rows in ascending account id order, so two opposing transfers can never deadlock. A test fires 1,000 transfers in both directions between the same two accounts and expects zero deadlocks.',
      },
      {
        title: 'Three ways to debit, measured side by side',
        body: 'Pessimistic locks, optimistic versions with jittered retries, and a conditional UPDATE ... WHERE balance >= amount. All three are selectable at run time and all three pass the same double spend test: 200 concurrent debits of 80 against a balance of 100, exactly one succeeds.',
      },
      {
        title: 'A timeout is not a failure',
        body: 'When the payment provider times out, the payout moves to UNKNOWN and is only resolved by asking the provider. Refunding on timeout would pay the customer twice whenever the provider had in fact paid.',
      },
      {
        title: 'A bulkhead sized to the pool',
        body: 'Virtual threads accept thousands of requests while Hikari has ten connections. A semaphore with the same number of permits sits in front of database work and fails fast with 503 instead of letting requests time out inside the pool.',
      },
    ],
    next: ['Hot account sharding for a single busy merchant', 'Published load numbers for each locking strategy', 'Network fault drills with Toxiproxy'],
    diagram: [
      ['API client'],
      ['Transfer API', 'Payout API'],
      ['Idempotency store', 'Ledger', 'Payout worker'],
      ['PostgreSQL', 'Payment provider'],
      ['Outbox relay'],
      ['Kafka'],
    ],
    edges: [
      ['API client', 'Transfer API'],
      ['API client', 'Payout API'],
      ['Transfer API', 'Idempotency store'],
      ['Transfer API', 'Ledger'],
      ['Payout API', 'Ledger'],
      ['Payout worker', 'Payment provider'],
      ['Payout worker', 'PostgreSQL'],
      ['Idempotency store', 'PostgreSQL'],
      ['Ledger', 'PostgreSQL'],
      ['PostgreSQL', 'Outbox relay'],
      ['Outbox relay', 'Kafka'],
    ],
  },
  {
    slug: 'surge',
    name: 'Surge',
    tagline: 'A ticket drop and flash sale backend that stays up and never oversells when a hundred thousand people press buy in the same second.',
    year: '2026',
    repo: 'https://github.com/SouradipG/surge',
    stack: ['Java 25', 'Spring Boot 4', 'Redis', 'PostgreSQL', 'Lua', 'k6'],
    problem:
      'A sale opens and traffic goes to fifty times normal in a second, all for the same few thousand seats. The obvious code reads the count, checks it, and writes it back, and two buyers get the last ticket. Meanwhile every request slows down, clients retry, and the site falls over at exactly the moment it matters. Surge is built for that second.',
    design: [
      'A virtual waiting room puts everyone in a FIFO queue in Redis and lets people in in batches at the rate the backend can serve. Admission is an HMAC signed token any instance can check without a lookup.',
      'Holds reserve tickets with one Lua script that checks stock and the per person limit and decrements in a single step. Postgres stays the source of truth, with a check constraint that makes overselling impossible even if every layer above were wrong.',
      'Rate limits per user and per IP use a token bucket in Redis shared by every instance. Load shedding caps requests in flight and keeps 40 percent of the capacity for people who are already paying.',
      'The event page is served from a 250 ms local cache and a jittered Redis cache with single flight, so a cold cache at the moment of the drop costs one database query, not ten thousand.',
    ],
    decisions: [
      {
        title: 'The hot counter lives in Redis, the truth in Postgres',
        body: 'Ten thousand buyers decrementing one Postgres row would all queue on its lock. Redis does the contended step in memory. A reconciler rebuilds the counters from Postgres after a Redis failure, and only overwrites them if no reserve ran in between.',
      },
      {
        title: 'Payment and expiry cannot both win',
        body: 'A buyer pays in the same instant their five minute hold runs out. Both sides are one conditional update on the same row, so for every hold exactly one of them wins. A test races 200 purchases against the expiry job around the deadline.',
      },
      {
        title: 'Hash tags for Redis Cluster',
        body: 'Every key for an event carries the same {event:N} tag, so multi key scripts keep working on a cluster. Without it they work on a laptop and fail in production with CROSSSLOT.',
      },
      {
        title: 'Fail open for reads, closed for writes',
        body: 'When Redis is unreachable the event page keeps loading without limits for a moment, but holds and purchases are refused, because those are exactly what bots go after.',
      },
    ],
    next: ['Payment through an external provider with unknown outcome handling', 'Published numbers for one and three instances', 'Redis failover drill with Sentinel'],
    diagram: [
      ['Buyers'],
      ['Load shedding and rate limits'],
      ['Waiting room', 'Event page cache', 'Holds and purchase'],
      ['Redis', 'PostgreSQL'],
      ['Reconciler'],
    ],
    edges: [
      ['Buyers', 'Load shedding and rate limits'],
      ['Load shedding and rate limits', 'Waiting room'],
      ['Load shedding and rate limits', 'Event page cache'],
      ['Load shedding and rate limits', 'Holds and purchase'],
      ['Waiting room', 'Redis'],
      ['Event page cache', 'Redis'],
      ['Event page cache', 'PostgreSQL'],
      ['Holds and purchase', 'Redis'],
      ['Holds and purchase', 'PostgreSQL'],
      ['PostgreSQL', 'Reconciler'],
      ['Redis', 'Reconciler'],
    ],
  },
  {
    slug: 'relay',
    name: 'Relay',
    tagline: 'A multi tenant AI gateway that streams chat, runs long jobs in the background, keeps every team inside its token budget and fails over between providers.',
    year: '2026',
    repo: 'https://github.com/SouradipG/relay',
    stack: ['Java 25', 'Spring Boot 4', 'Spring AI 2', 'MongoDB', 'Redis', 'Server Sent Events'],
    problem:
      'Once a few teams build on LLMs, the same things break. Providers answer 429 and have outages. Token cost is only known after the call. One team’s batch job uses the whole quota and another team’s chat starts failing. Streams get cut by load balancers and deploys, and a user who closes the tab leaves the model generating tokens that are still billed. Relay puts all of that in one place.',
    design: [
      'Chat streams over Server Sent Events. Everything that can be refused is refused before the stream opens, as a normal error with a status code, and failures after the first token are reported as events.',
      'Longer work goes through jobs that return 202 with an id. Workers claim jobs with a lease in MongoDB, retry with exponential backoff and jitter, dead letter with the reason, and notify through signed webhooks.',
      'Token budgets per tenant live in Redis: estimate, reserve, call, then settle with the real usage, so budgets do not drift by the estimation error.',
      'A router tries providers in order behind a circuit breaker and an adaptive concurrency limit each. A Spring AI adapter puts any model Spring AI supports behind the same rules.',
    ],
    decisions: [
      {
        title: 'Fail over only before the first token',
        body: 'Switching providers mid stream would restart the answer and bill twice. So failover happens while waiting for the provider to accept, and a stream that breaks later tells the client exactly how many chunks it got.',
      },
      {
        title: 'Fair scheduling across tenants',
        body: 'Stride scheduling gives each tenant worker time in proportion to its weight, however many jobs it has queued. In the tests, a tenant with 10 jobs behind a flood of 200 finishes after fewer than 40 of the flood, against more than 180 with FIFO.',
      },
      {
        title: 'Leases with fencing',
        body: 'A worker that dies loses its lease and another takes the job over. A worker that was only slow comes back to find its write refused, so the tenant sees one result and gets one webhook.',
      },
      {
        title: 'Cancel what nobody reads',
        body: 'When the client disconnects, the upstream connection is closed so the provider stops generating, and the unused part of the token reservation is refunded.',
      },
    ],
    next: ['Hard per tenant job caps with a Redis semaphore', 'Output schema validation with a bounded repair retry', 'Published drill numbers for floods, provider 429s and deploys'],
    diagram: [
      ['Tenant apps'],
      ['Chat over SSE', 'Job queue and workers'],
      ['Token budget'],
      ['Router with breakers'],
      ['Provider A', 'Provider B', 'Spring AI model'],
    ],
    edges: [
      ['Tenant apps', 'Chat over SSE'],
      ['Tenant apps', 'Job queue and workers'],
      ['Chat over SSE', 'Token budget'],
      ['Job queue and workers', 'Token budget'],
      ['Token budget', 'Router with breakers'],
      ['Router with breakers', 'Provider A'],
      ['Router with breakers', 'Provider B'],
      ['Router with breakers', 'Spring AI model'],
    ],
  },
];
