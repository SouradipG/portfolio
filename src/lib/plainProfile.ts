import { profile, metrics, experience, skills, certifications, awards, education, helpWith } from '../data/profile';
import { projects } from '../data/projects';

// Plain text versions of the profile for AI assistants and search tools
// (served as /llms.txt and /llms-full.txt), built from the same data as the site.

export function shortProfile(base: string): string {
  return [
    `# ${profile.name}`,
    '',
    `> ${profile.role} at ${profile.company}, based in ${profile.location}. Six years building Java and Spring Boot backend systems for telecom, banking and insurance. ${profile.openTo}.`,
    '',
    profile.intro.join('\n\n'),
    '',
    '## Key facts',
    `- Current role: ${profile.role} at ${profile.company}, leading backend work for British Telecom`,
    `- Location: ${profile.location} (currently working remotely)`,
    '- Experience: 6+ years',
    `- Core skills: Java, Spring Boot, microservices, distributed systems, concurrency, REST and GraphQL APIs, AWS, Kafka, PostgreSQL, MongoDB, Redis, agentic AI`,
    ...metrics.map((m) => `- ${m.value}${m.suffix} ${m.label}`),
    '',
    '## Links',
    `- [Portfolio](${base}/): full profile, experience and recommendations`,
    `- [Resume (PDF)](${base}${profile.resume})`,
    `- [Full profile as plain text](${base}/llms-full.txt)`,
    `- [Profile as JSON](${base}/api/v1/engineers/souradip)`,
    ...projects.map((p) => `- [${p.name}](${base}/projects/${p.slug}): ${p.tagline}`),
    `- [LinkedIn](${profile.linkedin})`,
    `- [GitHub](${profile.github})`,
    '',
    '## Contact',
    `- Email: ${profile.email}`,
    '',
  ].join('\n');
}

export function fullProfile(base: string): string {
  const lines = [shortProfile(base), '## Experience', ''];
  for (const r of experience) {
    lines.push(`### ${r.title}, ${r.company.name} (${r.period}, ${r.place})`, '', r.summary, '');
    lines.push(...r.points.map((p) => `- ${p}`), '', `Stack: ${r.stack.join(', ')}`, '');
  }
  lines.push('## Skills', '');
  lines.push(...skills.map((s) => `- ${s.group}: ${s.items.join(', ')}`), '');
  lines.push('## What I can help with', '');
  lines.push(...helpWith.map((h) => `- ${h.title}: ${h.body}`), '');
  lines.push('## Side projects', '');
  for (const p of projects) {
    lines.push(`### ${p.name}`, '', p.tagline, '', p.problem, '', `Stack: ${p.stack.join(', ')}`, `Design notes: ${base}/projects/${p.slug}`, `Code: ${p.repo}`, '');
  }
  lines.push('## Education', '', `${education.degree}, ${education.school} (${education.period})`, '');
  lines.push('## Certifications', '', ...certifications.map((c) => `- ${c}`), '');
  lines.push('## Awards', '', ...awards.map((a) => `- ${a.name}, ${a.from}`), '');
  return lines.join('\n');
}
