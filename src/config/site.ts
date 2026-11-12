// Public contact details and links, as published on https://tally-connect.com/
// (same values as the app's lib/core/share/links.dart → TcSite).
// Download links are set at build time — see README → "Configuration".
const env = import.meta.env;

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
  /** Direct APK link. When empty, the download button asks support for the app. */
  apkUrl: (env.VITE_ANDROID_APK_URL as string | undefined) ?? '',
  /** Windows Sync Agent installer. Hidden when empty. */
  agentUrl: (env.VITE_AGENT_URL as string | undefined) ?? '',
};
