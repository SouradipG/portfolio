import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://portfolio-souradipg.vercel.app',
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [sitemap()],
});
