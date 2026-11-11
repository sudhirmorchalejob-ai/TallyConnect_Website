// Demo videos for the "Live Demo" section.
//
// Google Drive share links for the two demo videos, e.g.
//   https://drive.google.com/file/d/<FILE_ID>/view?usp=sharing
// Each file must stay shared as "Anyone with the link → Viewer".
// An empty value shows the "Demo video coming soon" state.
//
// They can also be set at build time with VITE_MOBILE_APP_DEMO_URL and
// VITE_WEB_DASHBOARD_DEMO_URL (see README → "Configuration").
const env = import.meta.env;

export const MOBILE_APP_DEMO_URL: string =
  (env.VITE_MOBILE_APP_DEMO_URL as string | undefined) || 'https://drive.google.com/file/d/1-dxd5U-cxOHRPEP3ALC8NYAnaXXx17jw/view?usp=drivesdk';
export const WEB_DASHBOARD_DEMO_URL: string =
  (env.VITE_WEB_DASHBOARD_DEMO_URL as string | undefined) || 'https://drive.google.com/file/d/1-jvbHkt-5vX0iu_smdq98entt-o63vsi/view?usp=drivesdk';

export type DemoKind = 'mobile' | 'web';

export type DemoSource =
  | { type: 'iframe'; src: string }
  /** Direct video files: played by the site's own player and started automatically. */
  | { type: 'video'; src: string }
  | { type: 'none' };

/** Pulls the file id out of the usual Google Drive link shapes. */
function driveId(u: URL): string | null {
  if (!/(^|\.)drive\.google\.com$|(^|\.)docs\.google\.com$/.test(u.hostname)) return null;
  const m = u.pathname.match(/\/file\/d\/([\w-]{10,})/);
  if (m) return m[1]!;
  const id = u.searchParams.get('id'); // /open?id=…, /uc?id=…
  return id && /^[\w-]{10,}$/.test(id) ? id : null;
}

/**
 * Turns a configured link into something the player can show:
 * - Google Drive share links → Drive's embeddable preview player
 * - YouTube / Vimeo links → their embed players (autoplay)
 * - direct video files (.mp4, .webm, .mov) → the browser's own player
 */
export function resolveDemo(raw: string): DemoSource {
  const s = raw.trim();
  if (!s) return { type: 'none' };
  let u: URL;
  try {
    u = new URL(s);
  } catch {
    return { type: 'none' };
  }
  if (u.protocol !== 'https:' && u.protocol !== 'http:') return { type: 'none' };

  const d = driveId(u);
  // Google Drive only allows playback inside its own embedded player (it
  // refuses video requests from other sites), so Drive videos open there and
  // start with one tap on Drive's play button.
  if (d) return { type: 'iframe', src: `https://drive.google.com/file/d/${d}/preview` };

  const host = u.hostname.replace(/^www\.|^m\./, '');
  if (host === 'youtu.be' || host === 'youtube.com') {
    const id = host === 'youtu.be' ? u.pathname.slice(1) : u.searchParams.get('v') ?? u.pathname.split('/').pop();
    if (id && /^[\w-]{6,}$/.test(id)) return { type: 'iframe', src: `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0` };
  }
  if (host === 'vimeo.com') {
    const id = u.pathname.split('/').filter(Boolean)[0];
    if (id && /^\d+$/.test(id)) return { type: 'iframe', src: `https://player.vimeo.com/video/${id}?autoplay=1` };
  }
  if (/\.(mp4|webm|mov|m4v)$/i.test(u.pathname)) return { type: 'video', src: u.href };
  return { type: 'none' };
}

/** `ratio`: the video's width ÷ height, so the player frame fits it exactly. */
export const DEMOS: Record<DemoKind, { title: string; device: string; url: string; portrait: boolean; ratio: number }> = {
  mobile: { title: 'Android App Demo', device: 'Android mobile application', url: MOBILE_APP_DEMO_URL, portrait: true, ratio: 2160 / 3840 },
  web: { title: 'Web Dashboard Demo', device: 'Web browser dashboard', url: WEB_DASHBOARD_DEMO_URL, portrait: false, ratio: 2026 / 1022 },
};
