// Public contact details and links, as published on https://tally-connect.com/
// (same values as the app's lib/core/share/links.dart → TcSite).
// Download links are set at build time — see README → "Configuration".
const env = import.meta.env;

/** Direct-download link for a public Google Drive file. */
const driveDownload = (id: string) => `https://drive.usercontent.google.com/download?id=${id}&export=download&confirm=t`;

export const SITE = {
  name: 'Tally Connect',
  company: 'Averlon Enterprise Solutions Private Limited',
  website: 'https://tally-connect.com/',
  dashboard: 'https://dashboard.tally-connect.com',
  email: 'info@averlonworld.com',
  phone: '+91 9892440788',
  phoneHref: 'tel:+919892440788',
  whatsapp: 'https://wa.me/919892440788',
  hours: '24/7 Support Available',
  address:
    '5th Floor, Lodha Supremus - II, Phase - II, Unit No. A-515, Road No. 22, Wagle Industrial Estate, Thane West, 400604, Mumbai, Maharashtra, India',
  /**
   * Android app (APK) and Windows Connector (EXE), served from Google Drive.
   * drive.usercontent.google.com with confirm=t sends the file itself as an
   * attachment; the shorter drive.google.com/uc?export=download link stops on
   * Google's "can't scan this file for viruses" page for files this large.
   * The links need rel="noreferrer": Drive also shows that page when the
   * click carries the website as Referer.
   * Override at build time with VITE_ANDROID_APK_URL / VITE_AGENT_URL.
   */
  apkUrl: (env.VITE_ANDROID_APK_URL as string | undefined) || driveDownload('1YmIrRHcK8Hc1hjM60eLxa-WnAQ43QpA8'),
  agentUrl: (env.VITE_AGENT_URL as string | undefined) || driveDownload('1ZKgd1Oc5YB2IavM6fzEOsz5zrYeD-mtx'),
};
