// 6-Month Free Access contact page (target of the navbar CTA and the promo
// popup), laid out after the approved reference. Visitors reach the team by
// email, WhatsApp or phone; there is no sign-up flow here. The offer runs for
// a fixed period, not per visitor.
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Waves } from '../components/Common/LandingBackdrop';
import { SiteIcon } from '../components/Common/SiteIcon';
import { CssPhone } from '../components/Smartphone/CssPhone';
import { SITE } from '../config/site';
import { ICONS } from '../demo/icons';
import { useReveal } from '../hooks/useSmoothScroll';

const OFFER = { from: '1 November 2026', to: '30 April 2027' };

const EMAIL_SUBJECT = 'Tally Connect – 6-Month Free Access Enquiry';
const EMAIL_BODY = `Hello Tally Connect team,

I am interested in the Tally Connect 6-Month Free Access offer (${OFFER.from} to ${OFFER.to}). Please share the details and help me activate the free access.

Name:
Company:
Phone:

Thank you.`;
const WHATSAPP_TEXT =
  'Hello, I am interested in the Tally Connect 6-Month Free Access offer. Please share the details and help me with the activation process.';

const LINKS = {
  email: `mailto:${SITE.email}?subject=${encodeURIComponent(EMAIL_SUBJECT)}&body=${encodeURIComponent(EMAIL_BODY)}`,
  // Official click-to-chat link: opens the WhatsApp app on phones and WhatsApp Web on desktop.
  whatsapp: `https://wa.me/${SITE.phoneHref.replace(/\D/g, '')}?text=${encodeURIComponent(WHATSAPP_TEXT)}`,
  call: SITE.phoneHref,
};

const BENEFITS = [
  { t: 'Talk to Our Team', d: 'Discuss your requirements and get personalized assistance.', icon: 'handshake' },
  { t: 'Quick Setup', d: 'We help you with the implementation and access setup.', icon: 'gear' },
  { t: 'Use for 6 Months', d: `Enjoy Tally Connect free from ${OFFER.from} to ${OFFER.to}.`, icon: 'calendarCheck' },
] as const;

/* ---------- icons ---------- */

function Svg({ children, className = '', size = 24, stroke = 1.9 }: { children: ReactNode; className?: string; size?: number; stroke?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" className={`flex-none ${className}`} aria-hidden="true">
      {children}
    </svg>
  );
}
const Headset = (p: { size?: number }) => (
  <Svg {...p}>
    <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
    <rect x="3" y="13" width="4" height="6" rx="1.6" />
    <rect x="17" y="13" width="4" height="6" rx="1.6" />
    <path d="M19 19c0 1.7-2 2.5-5 2.5" />
  </Svg>
);
const Handshake = (p: { size?: number }) => (
  <Svg {...p} stroke={1.6}>
    <path d="M2.5 8.5 6 6l3 1.5L12 6l3 .5 3.5-1 3 2.5" />
    <path d="M2.5 8.5 7 14l2 2a1.6 1.6 0 0 0 2.3-2.2" />
    <path d="m11.3 13.8 1.8 1.8a1.6 1.6 0 0 0 2.3-2.2l-.6-.6" />
    <path d="m14.8 12.8 1 1a1.6 1.6 0 0 0 2.3-2.2L13 6.5l-2.6 2.6a1.6 1.6 0 0 1-2.3-2.2" />
    <path d="m18.1 11.6 3.4-3.6" />
  </Svg>
);
const CalendarCheck = (p: { size?: number }) => (
  <Svg {...p} stroke={1.6}>
    <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
    <path d="M3.5 9.5h17M8 3v4M16 3v4M9 14.5l2 2 4-4" />
  </Svg>
);
const WhatsAppLogo = ({ size = 30 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" className="flex-none">
    <path fill="#25D366" d="M16 3a13 13 0 0 0-11.2 19.6L3 29l6.6-1.7A13 13 0 1 0 16 3Z" />
    <path
      fill="#fff"
      d="M23.3 19.3c-.4-.2-2.3-1.1-2.6-1.3-.4-.1-.6-.2-.9.2-.3.4-1 1.3-1.2 1.5-.2.3-.4.3-.8.1a10.5 10.5 0 0 1-5.2-4.5c-.4-.7.4-.6 1.1-2 .1-.3 0-.5 0-.7l-1.2-2.8c-.3-.7-.6-.6-.9-.6h-.7c-.3 0-.7.1-1 .5-.4.4-1.4 1.3-1.4 3.2s1.4 3.7 1.6 4c.2.3 2.7 4.2 6.6 5.8 2.5 1 3.4 1.1 4.7.9.8-.1 2.3-.9 2.6-1.8.3-.9.3-1.7.2-1.8-.1-.2-.4-.3-.8-.5Z"
    />
  </svg>
);

function Sparks({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <g stroke="#ffc83d" strokeWidth="3.6" strokeLinecap="round">
        <path d="M8 20 5 9" />
        <path d="M16 22 28 9" />
        <path d="M19 30 34 27" />
      </g>
    </svg>
  );
}

/* ---------- pieces ---------- */

/** Calendar-style card with the fixed offer period. */
function ValidityCard({ className = '' }: { className?: string }) {
  return (
    <div className={`relative pt-5 ${className}`}>
      {/* binder rings */}
      {['left-[24%]', 'right-[24%]'].map((pos) => (
        <span
          key={pos}
          className={`absolute top-0 ${pos} z-[1] h-12 w-5 rounded-full border-[4px] border-[#e9ad3a] bg-gradient-to-b from-[#fff0c4] to-[#dda233] shadow-[0_4px_8px_rgba(110,21,49,.35)]`}
          aria-hidden="true"
        />
      ))}
      <Sparks className="absolute -right-3 -top-3 w-12" />
      <div className="overflow-hidden rounded-[26px] bg-white shadow-[0_28px_50px_-24px_rgba(110,21,49,.6),0_0_0_6px_rgba(255,255,255,.75)]">
        <p className="bg-gradient-to-b from-[#a8264f] to-[#7a1534] px-4 pb-4 pt-9 text-center text-[clamp(18px,1.6vw,26px)] font-extrabold text-white">Offer Validity</p>
        <div className="px-5 pb-6 pt-5 text-center">
          <p className="flex items-center justify-center gap-2.5 text-[clamp(16px,1.55vw,24px)] font-extrabold leading-tight text-[#6e1531]">
            <SiteIcon n="calendar" size={26} className="text-acc" />
            {OFFER.from}
          </p>
          <p className="my-2 flex items-center gap-3 text-[clamp(16px,1.4vw,22px)] font-extrabold text-[#6e1531]">
            <span className="h-px flex-1 bg-acc/15" />
            to
            <span className="h-px flex-1 bg-acc/15" />
          </p>
          <p className="text-[clamp(16px,1.55vw,24px)] font-extrabold leading-tight text-[#6e1531]">{OFFER.to}</p>
          <p className="mx-auto mt-5 w-fit rounded-full bg-gradient-to-b from-[#ffd95c] to-[#f6bb22] px-6 py-2 text-[clamp(14px,1.15vw,19px)] font-extrabold text-navy shadow-[0_10px_18px_-10px_rgba(196,127,18,.9)]">
            (6 Months Only)
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * The phone's four outer corners in the artwork (fractions of the image:
 * top-left, top-right, bottom-right, bottom-left), measured from the image.
 */
const ART_PHONE_QUAD: [number, number][] = [
  [0.5747, 0.0423],
  [1.0, 0.0235],
  [0.8628, 0.8732],
  [0.4514, 0.8623],
];
/** Grow the quad a little so the sharp phone fully covers the drawn one. */
const QUAD_GROW = 1.02;

/** Outer size of a CssPhone of a given width (same maths as CssPhone). */
function cssPhoneHeight(width: number) {
  const inner = width - 11 * 2 * (width / (390 + 22));
  return (844 * inner) / 390 + (width - inner);
}

/** CSS matrix3d that maps a w×h box onto the quad (projective transform). */
function quadMatrix(w: number, h: number, quad: [number, number][]) {
  const [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = quad as [[number, number], [number, number], [number, number], [number, number]];
  const dx1 = x1 - x2, dx2 = x3 - x2, dx3 = x0 - x1 + x2 - x3;
  const dy1 = y1 - y2, dy2 = y3 - y2, dy3 = y0 - y1 + y2 - y3;
  const det = dx1 * dy2 - dx2 * dy1;
  const g = (dx3 * dy2 - dx2 * dy3) / det;
  const k = (dx1 * dy3 - dx3 * dy1) / det;
  const a = x1 - x0 + g * x1, b = x3 - x0 + k * x3, c = x0;
  const d = y1 - y0 + g * y1, e = y3 - y0 + k * y3, f = y0;
  const m = [a / w, d / w, 0, g / w, b / h, e / h, 0, k / h, 0, 0, 1, 0, c, f, 0, 1];
  return `matrix3d(${m.map((v) => +v.toFixed(8)).join(',')})`;
}

/** Width of an element, kept up to date. */
function useWidth<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [w, setW] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setW(e!.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, w] as const;
}

/**
 * Gift box and podium from the approved design, with the site's own live phone
 * (the real app screen, drawn sharp at any size) placed exactly over the
 * phone in the artwork, which is too low-resolution to show crisply.
 */
function OfferArt({ className = '' }: { className?: string }) {
  const [ref, w] = useWidth<HTMLDivElement>();
  return (
    <div ref={ref} className={`relative w-full ${className}`}>
      <img
        src="/images/promo/tc_free_access_art.webp"
        width={576}
        height={639}
        loading="lazy"
        decoding="async"
        alt="Tally Connect app on a phone beside a gift box tagged 6 months free access"
        className="block h-auto w-full select-none"
        draggable={false}
      />
      {w > 0 && <SharpPhone w={w} />}
    </div>
  );
}

/** The live phone, mapped onto the artwork's phone (image is w wide, 576:639). */
function SharpPhone({ w }: { w: number }) {
  const h = (w * 639) / 576;
  const cx = ART_PHONE_QUAD.reduce((t, p) => t + p[0], 0) / 4;
  const cy = ART_PHONE_QUAD.reduce((t, p) => t + p[1], 0) / 4;
  const quad = ART_PHONE_QUAD.map(([x, y]) => [(cx + (x - cx) * QUAD_GROW) * w, (cy + (y - cy) * QUAD_GROW) * h] as [number, number]);
  const pw = Math.round(Math.hypot(quad[1][0] - quad[0][0], quad[1][1] - quad[0][1]));
  const ph = cssPhoneHeight(pw);
  return (
    <div
      className="pointer-events-none absolute left-0 top-0"
      style={{ width: pw, height: ph, transformOrigin: '0 0', transform: quadMatrix(pw, ph, quad) }}
      aria-hidden="true"
    >
      <CssPhone width={pw} app={{ screen: 'home' }} className="[&_.cssphone-shadow]:hidden" />
    </div>
  );
}

function ContactCard() {
  const tile =
    'group flex min-w-0 items-center gap-3 rounded-[18px] border border-[#f1e6ee] bg-white px-4 py-3 text-left shadow-[0_14px_26px_-18px_rgba(27,45,91,.45)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_34px_-18px_rgba(140,29,63,.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acc';
  return (
    <div className="reveal rounded-[30px] border border-white bg-white/80 p-5 shadow-[0_24px_50px_-30px_rgba(27,45,91,.4)] backdrop-blur-md sm:p-7">
      <div className="flex items-start gap-4">
        <span className="mt-0.5 text-acc">
          <Headset size={46} />
        </span>
        <div>
          <h3 className="text-[22px] font-extrabold leading-tight text-navy sm:text-[27px]">Contact Us to Get Access</h3>
          <p className="mt-1.5 text-[15.5px] leading-relaxed text-ink-2 sm:text-[16.5px]">
            Our team will guide you, complete the setup, and provide your free access for 6 months.
          </p>
        </div>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 min-[1680px]:grid-cols-[1.45fr_1fr_1.05fr] min-[1680px]:gap-4">
        <a
          href={LINKS.email}
          aria-label={`Email Us at ${SITE.email} about the 6-month free access`}
          className="group flex min-w-0 flex-col items-center justify-center rounded-[18px] bg-gradient-to-b from-[#a8264f] to-[#7a1534] px-4 py-3 text-center text-white shadow-[0_16px_30px_-14px_rgba(110,21,49,.8)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_36px_-14px_rgba(110,21,49,.9)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acc sm:col-span-2 min-[1680px]:col-span-1"
        >
          <span className="flex items-center gap-2.5 text-[19px] font-extrabold">
            <SiteIcon n="mail" size={23} className="transition-transform duration-300 group-hover:-rotate-6" /> Email Us
          </span>
          <span className="mt-0.5 max-w-full truncate text-[13.5px] font-semibold text-white/90">{SITE.email}</span>
        </a>
        <a href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer" aria-label={`Chat on WhatsApp with ${SITE.phone} (opens WhatsApp)`} className={tile}>
          <span className="transition-transform duration-300 group-hover:scale-110">
            <WhatsAppLogo size={36} />
          </span>
          <span className="text-[16.5px] font-extrabold leading-tight text-navy">
            Chat on
            <br />
            WhatsApp
          </span>
        </a>
        <a href={LINKS.call} aria-label={`Call Us on ${SITE.phone}`} className={tile}>
          <span className="text-acc transition-transform duration-300 group-hover:rotate-12">
            <Svg size={30} stroke={1.7}>
              <path d={ICONS.phone} />
            </Svg>
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block text-[16.5px] font-extrabold text-navy">Call Us</span>
            <span className="block whitespace-nowrap text-[14px] font-extrabold text-ink">{SITE.phone}</span>
          </span>
        </a>
      </div>
    </div>
  );
}

/* ---------- section ---------- */

export function FreeAccess() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  return (
    <section ref={ref} id="free-access" className="relative overflow-hidden pb-14 pt-16 sm:pt-20">
      {/* white / lavender / pink backdrop with the brand waves in the lower-right corner */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(50%_60%_at_10%_20%,#fdeef5_0%,transparent_70%),radial-gradient(45%_55%_at_80%_25%,#f6ecfb_0%,transparent_70%),linear-gradient(180deg,#fdf8fc_0%,#f9eff7_100%)]" />
        <Waves idp="fa" className="absolute bottom-0 right-0 h-[24%] w-[70%]" />
      </div>

      <div className="wrap xl:max-w-[1680px]">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.95fr] xl:grid-cols-[1.25fr_1fr_0.53fr] xl:gap-4">
          {/* text + contact */}
          <div className="min-w-0">
            <p className="reveal inline-flex items-center gap-2.5 rounded-full bg-[#fbe4ed] px-4 py-2 text-[14px] font-extrabold uppercase tracking-[0.03em] text-acc sm:text-[17px]">
              <SiteIcon n="gift" size={20} stroke={2.1} /> Limited-Time Offer
            </p>
            <h2 className="reveal mt-5 text-[42px] font-extrabold leading-[1.12] tracking-[-0.03em] text-navy sm:text-[58px] xl:text-[clamp(56px,4.1vw,68px)]">
              Get <span className="text-acc">6-Month</span>
              <br />
              <span className="relative mr-3 inline-block rounded-[18px] bg-gradient-to-r from-[#6e1531] via-[#8c1d3f] to-[#a8264f] px-4 pb-1.5 pt-0.5 italic text-white shadow-[-6px_8px_0_-1px_#f5b52c,0_16px_28px_-12px_rgba(110,21,49,.7)]">
                Free Access
              </span>
              to
              <Sparks className="ml-1 inline-block h-[0.85em] w-[0.85em] align-top" />
              <br />
              Tally Connect
            </h2>
            <p className="reveal mt-5 text-[17px] leading-[1.55] text-ink sm:text-[20px]">
              Interested in using Tally Connect?
              <br />
              Get in touch with our team to activate your 6-month free access.
            </p>
            <div className="mt-6">
              <ContactCard />
            </div>
          </div>

          {/* artwork + validity: side by side below xl, separate columns from xl */}
          <div className="reveal grid grid-cols-1 items-center gap-8 sm:grid-cols-[1.4fr_1fr] lg:grid-cols-1 xl:contents">
            <ValidityCard className="order-1 mx-auto w-full max-w-[300px] sm:order-2 lg:hidden xl:order-3 xl:block xl:max-w-none" />
            <OfferArt className="order-2 mx-auto max-w-[520px] sm:order-1 xl:order-2 xl:max-w-none" />
          </div>
        </div>
        {/* lg only: validity under the art column is hidden, so show it under the text */}
        <ValidityCard className="reveal mx-auto mt-8 hidden w-[320px] lg:block xl:hidden" />

        {/* benefits */}
        <div className="reveal mt-10 grid gap-6 border-t border-navy/10 pt-7 sm:grid-cols-3 sm:gap-0">
          {BENEFITS.map((b, i) => (
            <div key={b.t} className={`flex items-start justify-center gap-4 sm:px-6 ${i ? 'sm:border-l sm:border-navy/15' : ''}`}>
              <span className="mt-0.5 text-acc">
                {b.icon === 'handshake' ? <Handshake size={44} /> : b.icon === 'gear' ? <SiteIcon n="gear" size={40} stroke={1.6} /> : <CalendarCheck size={42} />}
              </span>
              <div>
                <h3 className="text-[18px] font-extrabold text-navy">{b.t}</h3>
                <p className="mt-1 text-[15px] leading-snug text-ink-2">{b.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
