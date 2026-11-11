# Tally Connect — Product Website

Marketing and product-demo website for the **Tally Connect** Android app (TallyPrime on your phone).

- 3D smartphone (Three.js / React Three Fiber) that follows the page scroll and shows the real app UI
- "Tally Connect AI" mascot that travels with the phone
- Pinned horizontal feature showcase synced to the phone's screen (GSAP ScrollTrigger)
- Interactive in-browser demo of the app, built in React with the app's own sample data
- Responsive: full 3D on desktop, lighter CSS phone on tablets and phones, reduced-motion support

> The phone screens and the interactive demo use sample data only. Nothing on this site connects to the Tally Connect servers or to any Tally company.

## Tech stack

React 18 · Vite 5 · TypeScript · Tailwind CSS · Three.js + @react-three/fiber + drei · GSAP + ScrollTrigger · Framer Motion · Lenis

## Setup

Requires Node.js 18+.

```bash
npm install
npm run dev
```

Open http://localhost:5173.

## Configuration

Copy `.env.example` to `.env` and fill in as needed:

| Variable | Purpose |
|---|---|
| `VITE_ANDROID_APK_URL` | Direct APK download link. If empty, the button opens an email request instead. |
| `VITE_AGENT_URL` | Windows Sync Agent installer link. If empty, that button is hidden. |
| `VITE_MOBILE_APP_DEMO_URL` | Android app demo video (Live Demo section). |
| `VITE_WEB_DASHBOARD_DEMO_URL` | Web dashboard demo video (Live Demo section). |

### Demo videos

The two demo videos can be set either with the variables above or directly in `src/config/demoVideos.ts` (`MOBILE_APP_DEMO_URL`, `WEB_DASHBOARD_DEMO_URL`). Paste a Google Drive share link such as `https://drive.google.com/file/d/<FILE_ID>/view?usp=sharing` and share the file as "Anyone with the link → Viewer"; it is converted to Drive's embeddable player automatically. YouTube, Vimeo and direct `.mp4`/`.webm` links also work. While a value is empty, the player shows "Demo video coming soon".

## Production build

```bash
npm run build      # type-checks, then builds to dist/
npm run preview    # serves dist/ locally to check it
```

## Deployment

`dist/` is a static site — host it on any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages, Nginx, S3 + CloudFront).

- Build command: `npm run build`
- Output folder: `dist`
- Set the `VITE_*` variables in the host's environment settings before building.

## Project structure

```
src/
  animations/phoneDirector.ts   scroll choreography for the 3D phone and AI robot
  components/                   Navbar, Footer, Smartphone (3D + CSS phone), Common
  sections/                     page sections (Hero, About, Dashboard, Demo, Features, …)
  demo/                         the in-phone app: screens, overlays, sample data, styles
  data/content.ts               website copy
  config/site.ts                contact details and download links
public/                         fonts (Figtree), logos, AI robot image
```
