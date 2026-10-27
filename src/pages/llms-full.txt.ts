import type { APIRoute } from 'astro';
import { fullProfile } from '../lib/plainProfile';

export const GET: APIRoute = ({ site }) =>
  new Response(fullProfile(site!.toString().replace(/\/$/, '')), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
