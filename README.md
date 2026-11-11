# Ramayana — The Eternal Journey of Dharma

An interactive illustrated manuscript of the Ramayana, built as a single-page experience. Twelve books, 232 scenes, original procedural SVG artwork, and a synthesised score — no stock images and no audio files.

**Live:** https://sparshsinghal1618.github.io/ramayana/

## The edition

- **Twelve books** from Bala Kanda to Uttara Kanda, with 232 written scenes; 78 featured scenes become pinned, scroll-driven stages.
- **Original artwork** drawn in SVG: layered palettes, seeded landscapes, palace, forest, ocean, Lanka and battlefield motifs, shadow-puppet figures, and character portraits.
- **Archives** for 29 characters, 13 places, 32 timeline entries, 11 objects, and the major regional and devotional traditions.
- **Synthesised audio** generated in the browser with the Web Audio API — optional, muted by default, never autoplaying.
- **Three performance profiles** and full reduced-motion support, including static scene galleries in place of the pinned stages.
- **Accessibility**: keyboard navigation, focus-managed dialogs, live regions, and zero axe violations across nine audited contexts.

### On accuracy

The narrative follows Valmiki's Ramayana as its primary source. Ramcharitmanas and regional traditions are labelled where they differ, and later or contested material — the Uttara Kanda, the Lakshmana rekha, and several popular episodes absent from Valmiki — is explicitly marked rather than presented as scripture. Quotations are paraphrases, not invented verse.

## Running locally

```bash
npm install
npm run dev
```

Build a production bundle:

```bash
npm run build     # output in dist/
npm run preview
```

The build uses a relative base, so `dist/` can be served from any path, including a GitHub Pages project site.

## Stack

React 19 · TypeScript · Vite · GSAP for the two long scroll sequences (Hanuman's leap and the building of the bridge) · Framer Motion for reveals · hand-authored CSS for the design system.

## Deploying

The `gh-pages` branch holds the built site and is served by GitHub Pages. To republish after changes:

```bash
npm run build
npx gh-pages -d dist
```

## Licence

Text and artwork are original to this project. The Ramayana itself is part of the public domain; this edition is an independent interpretive work.
