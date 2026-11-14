import gsap from 'gsap';
import { useEffect, useRef, useState, type RefObject } from 'react';
import { director, heroLayout } from '../animations/phoneDirector';
import { SiteIcon } from '../components/Common/SiteIcon';
import { CssPhone } from '../components/Smartphone/CssPhone';
import { SITE } from '../config/site';
import { scrollToId } from '../hooks/useSmoothScroll';
import { KeyFeatureRibbon } from './KeyFeatures';
import type { IconName } from '../demo/icons';

const BOLT = 'M13 2 4.5 13.5H11L10 22l8.5-11.5H12z';

// Floating feature cards on the far right (reference design).
const CARDS: { ic: IconName | 'bolt'; t: string; s: string }[] = [
  { ic: 'bolt', t: 'Create Vouchers', s: 'On the Go' },
  { ic: 'chart', t: 'Real-time', s: 'Business Summary' },
  { ic: 'sync', t: 'Auto Sync with', s: 'TallyPrime' },
  { ic: 'shield', t: 'Secure &', s: 'Role-based Access' },
];

/** Feature card size (matches the w-[15.2vw] min-w-[200px] classes below). */
const cardWidth = (vw: number) => Math.max(200, vw * 0.152);
/** Where the card column's centre sits down the phone, as a share of its height. */
const CARD_ROWS = [0.2, 0.4, 0.6, 0.8];

/**
 * Lays the floating cards out against the 3D phone: a column just right of
 * the phone, spread down its height. Measured from the hero stage (the band
 * between navbar and feature strip) with the same maths the phone uses.
 */
function useCardLayout(enabled: boolean, stage: RefObject<HTMLDivElement>) {
  const [layout, setLayout] = useState<{ left: number; tops: number[] } | null>(null);
  useEffect(() => {
    const el = stage.current;
    if (!enabled || !el) return;
    const measure = () => {
      const vw = document.documentElement.clientWidth;
      const vh = window.innerHeight;
      const r = el.getBoundingClientRect();
      const top = r.top + window.scrollY;
      const { box } = heroLayout(vw, vh, { top, bottom: top + r.height });
      const gap = Math.max(20, vw * 0.018);
      const left = Math.min(box.cx + box.w / 2 + gap, vw - vw * 0.03 - cardWidth(vw));
      setLayout({ left, tops: CARD_ROWS.map((f) => box.cy - top + box.h * (f - 0.5)) });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [enabled, stage]);
  return layout;
}

const TRUST = ['Works with TallyPrime', 'Real-time Data Sync', 'Secure & Reliable'];

function CardIcon({ ic }: { ic: IconName | 'bolt' }) {
  if (ic !== 'bolt') return <SiteIcon n={ic} size={20} stroke={2.1} />;
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.1} strokeLinejoin="round" aria-hidden="true">
      <path d={BOLT} />
    </svg>
  );
}

export function Hero({ full }: { full: boolean }) {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const cards = useCardLayout(full, stage);
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      director.intro.v = 1;
      return;
    }
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.hero-line', { y: 40, opacity: 0, duration: 1, stagger: 0.09 })
        .from('.hero-cta', { y: 20, opacity: 0, duration: 0.8, stagger: 0.08 }, '-=0.6')
        .to(director.intro, { v: 1, duration: 1.8, ease: 'power3.inOut' }, 0.1)
        .from('.hero-chip', { scale: 0.6, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'back.out(1.7)' }, 0.9)
        .from('.hero-phone-lite', { y: 60, opacity: 0, rotateY: -25, duration: 1.3 }, 0.2);
      // Chips drift up as the hero scrolls away (parallax).
      gsap.to('.hero-chips', { yPercent: -18, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true } });
    }, root);
    return () => ctx.revert();
  }, []);

  const apk = SITE.apkUrl;
  const ctas = (
    <>
      <a
        href="#get-started"
        onClick={(e) => (e.preventDefault(), scrollToId('get-started'))}
        className="hero-cta btn btn-accent !rounded-[12px] lg:!h-[clamp(44px,3.2vw,56px)] lg:!px-[1.7vw] lg:!text-[clamp(14px,1.08vw,18px)]"
      >
        Get Started <SiteIcon n="arrow" size={18} />
      </a>
      <a
        href={apk || '#free-access'}
        onClick={(e) => {
          if (!apk) {
            e.preventDefault();
            scrollToId('free-access');
          }
        }}
        className="hero-cta btn !rounded-[12px] border border-[#ece4f0] bg-white text-navy-3 shadow-[0_10px_24px_-14px_rgba(27,45,91,.35)] hover:border-acc/30 lg:!h-[clamp(44px,3.2vw,56px)] lg:!px-[1.5vw] lg:!text-[clamp(14px,1.08vw,18px)]"
      >
        <SiteIcon n="download" size={18} className="text-acc" /> Download Android App
      </a>
    </>
  );
  const badge = (
    <div className="hero-line inline-flex items-center gap-2 rounded-full border border-[#efe6f3] bg-white py-1 pl-1 pr-3.5 text-[13px] font-bold text-navy shadow-[0_6px_18px_-10px_rgba(110,21,49,.35)] lg:text-[clamp(12px,0.92vw,15px)]">
      <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-b from-acc-2 to-acc-3 px-2 py-0.5 text-[11px] font-extrabold uppercase tracking-wider text-white lg:text-[clamp(10.5px,0.78vw,13px)]">
        <SiteIcon n="phone" size={11} stroke={2.4} /> Beta
      </span>
      Android app for TallyPrime
    </div>
  );
  const trust = (
    <ul className="hero-line flex flex-wrap gap-x-[1.6vw] gap-y-2 text-[13.5px] font-semibold text-navy lg:text-[clamp(12.5px,0.95vw,16px)]">
      {TRUST.map((t) => (
        <li key={t} className="flex items-center gap-1.5">
          <SiteIcon n="check" size={15} className="text-acc" stroke={2.6} />
          {t}
        </li>
      ))}
    </ul>
  );
  const heading = (
    <h1 className="hero-line font-extrabold tracking-[-0.03em] text-navy-3">
      <span className="lg:whitespace-nowrap">Smart Accounting.</span>
      <br />
      <span className="text-acc lg:whitespace-nowrap">Seamlessly Connected.</span>
    </h1>
  );
  const lede =
    'Manage your accounting operations, access Tally data, create vouchers, view reports and stay connected with your business anytime, anywhere through Tally Connect.';

  if (!full) {
    // Tablets, phones, no WebGL: same design, stacked, with the CSS phone.
    return (
      <section ref={root} id="top" className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pb-12 pt-28">
        <div className="wrap grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
          <div className="relative z-[2] max-w-[640px] [&_h1]:text-[34px] [&_h1]:leading-[1.08] sm:[&_h1]:text-[46px]">
            {badge}
            <div className="mt-5">{heading}</div>
            <p className="hero-line mt-4 max-w-[520px] text-[16px] leading-[1.6] text-ink-2">{lede}</p>
            <div className="mt-7 flex flex-wrap gap-3">{ctas}</div>
            <div className="mt-6">{trust}</div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <CssPhone width={290} app={{ screen: 'home' }} className="hero-phone-lite float" label="Tally Connect home screen with sample data" />
          </div>
        </div>
        <KeyFeatureRibbon className="hero-line mt-12 w-full" />
      </section>
    );
  }

  // Desktop: one screen tall, in three rows — room for the fixed navbar, the
  // stage (headline on the left; the 3D phone, robot and cards on the right,
  // all sized to this band) and the feature strip. The 3D phone sits behind.
  return (
    <section ref={root} id="top" className="relative grid h-[100svh] min-h-[600px] grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden">
      {/* navbar: 12px offset + 72px bar, plus breathing room */}
      <div className="h-[calc(84px+clamp(12px,2.4vh,32px))]" aria-hidden="true" />

      <div ref={stage} id="hero-stage" className="relative">
        <div className="absolute inset-y-0 left-[7.5vw] z-[2] flex w-[38vw] flex-col justify-center">
          <div>{badge}</div>
          <div className="mt-[clamp(14px,2.6vh,30px)] text-[clamp(34px,min(3.55vw,6.6vh),62px)] leading-[1.08]">{heading}</div>
          <p className="hero-line mt-[clamp(12px,2vh,22px)] max-w-[33vw] text-[clamp(14.5px,1.12vw,19px)] leading-[1.55] text-ink-2">{lede}</p>
          <div className="mt-[clamp(18px,3.4vh,38px)] flex flex-wrap gap-[1vw]">{ctas}</div>
          <div className="mt-[clamp(16px,2.8vh,32px)]">{trust}</div>
        </div>

        <div className="hero-chips pointer-events-none absolute inset-0 z-[2]" aria-hidden="true" style={{ visibility: cards ? 'visible' : 'hidden' }}>
          {CARDS.map((c, i) => (
            <div key={c.t} className="hero-chip absolute" style={{ left: cards?.left, top: cards?.tops[i] }}>
              <div className="float-chip flex w-[15.2vw] min-w-[200px] -translate-y-1/2 items-center gap-[0.9vw] rounded-[16px] border border-white bg-white/90 py-[clamp(8px,1.2vh,14px)] pl-[0.75vw] pr-[0.9vw] shadow-[0_14px_30px_-16px_rgba(110,21,49,.35),0_2px_6px_rgba(27,45,91,.05)] backdrop-blur-md">
                <span className="grid h-[clamp(36px,min(2.8vw,5vh),48px)] w-[clamp(36px,min(2.8vw,5vh),48px)] flex-none place-items-center rounded-full bg-gradient-to-b from-[#fdeef4] to-[#f7d7e6] text-acc">
                  <CardIcon ic={c.ic} />
                </span>
                <div className="whitespace-nowrap text-[clamp(12.5px,1vw,17px)] font-extrabold leading-[1.25] text-navy-3">
                  {c.t}
                  <br />
                  {c.s}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-[3] pb-[clamp(12px,2.6vh,30px)] pt-[clamp(8px,1.4vh,16px)]">
        <KeyFeatureRibbon className="hero-line" />
      </div>
    </section>
  );
}
