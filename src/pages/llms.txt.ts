import type { APIRoute } from 'astro';
import { shortProfile } from '../lib/plainProfile';

export const GET: APIRoute = ({ site }) =>
  new Response(shortProfile(site!.toString().replace(/\/$/, '')), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
