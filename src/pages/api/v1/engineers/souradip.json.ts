import type { APIRoute } from 'astro';
import { profile, metrics, experience, buildingWith, helpWith } from '../../../../data/profile';
import { projects } from '../../../../data/projects';

// A small, real JSON endpoint about me, generated at build time.
export const GET: APIRoute = ({ site }) => {
  const base = site!.toString().replace(/\/$/, '');
  const body = {
    name: profile.name,
    role: profile.role,
    company: profile.company,
    based_in: profile.location,
    experience_years: 6,
    status: 'open_to_offers',
    open_to: profile.openTo,
    impact: metrics.map((m) => `${m.value}${m.suffix} ${m.label}`),
    experience: experience.map((r) => ({
      company: r.company.name,
      title: r.title,
      period: r.period,
      stack: r.stack,
    })),
    building_with: buildingWith,
    can_help_with: helpWith.map((h) => h.title),
    projects: projects.map((p) => ({ name: p.name, summary: p.tagline, notes: `${base}/projects/${p.slug}`, code: p.repo })),
    contact: {
      email: profile.email,
      linkedin: profile.linkedin,
      github: profile.github,
      resume: `${base}${profile.resume}`,
    },
  };
  return new Response(JSON.stringify(body, null, 2), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
