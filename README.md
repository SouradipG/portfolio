# portfolio

Source for my personal site, [portfolio-souradipg.vercel.app](https://portfolio-souradipg.vercel.app).

I'm a backend engineer working mostly with Java, Spring Boot and AWS. The site is a plain static build: no client framework, no tracking scripts, and almost no JavaScript beyond the dark mode toggle. Every page is HTML generated at build time and served from Vercel's CDN.

## Stack

* [Astro](https://astro.build) for static generation
* Hand written CSS with IBM Plex Sans and IBM Plex Mono
* `@astrojs/sitemap` for the sitemap, plus JSON-LD structured data on every page
* Vercel for hosting, deployed on every push to `main`

## Layout

```
src/
  data/profile.ts      experience, skills, metrics, contact details
  data/projects.ts     project write ups (problem, architecture, decisions)
  components/          header, footer, architecture diagram
  pages/               home page, one page per project, 404
public/                resume PDF, social preview image, favicon, robots.txt
scripts/og.mjs         regenerates public/og.png from scripts/og.html
```

All of the content lives in `src/data`, so updating the site after a job change or a new project means editing one file.

The architecture diagrams on the project pages are drawn at build time from a list of layers and links in `projects.ts`, so there are no image files to keep in sync.

## Running locally

```
npm install
npm run dev       # http://localhost:4321
npm run build     # outputs to dist/
```
