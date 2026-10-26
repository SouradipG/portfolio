// Renders scripts/og.html to public/og.png (the social preview image).
// Run with: node scripts/og.mjs
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';

const fontCss = ['ibm-plex-sans/400.css', 'ibm-plex-sans/600.css', 'ibm-plex-mono/400.css', 'ibm-plex-mono/500.css']
  .map((f) => readFileSync(new URL(`../node_modules/@fontsource/${f}`, import.meta.url), 'utf8')
    .replace(/url\(\.\/files\//g, `url(${new URL(`../node_modules/@fontsource/${f.split('/')[0]}/files/`, import.meta.url)}`))
  .join('\n');

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.goto(new URL('./og.html', import.meta.url).href);
await page.addStyleTag({ content: fontCss });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: new URL('../public/og.png', import.meta.url).pathname });
await browser.close();
