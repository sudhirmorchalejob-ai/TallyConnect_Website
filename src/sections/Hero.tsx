import gsap from 'gsap';
import { useEffect, useLayoutEffect, useRef, useState, type RefObject } from 'react';
import { director, heroLayout } from '../animations/phoneDirector';
import { SiteIcon } from '../components/Common/SiteIcon';
import { CssPhone } from '../components/Smartphone/CssPhone';
import { SITE } from '../config/site';
import { scrollToId } from '../hooks/useSmoothScroll';
import type { IconName } from '../demo/icons';

// Hero copy and cards, from the approved homepage design.
const QUICK: { ic: IconName; t: [string, string] }[] = [
  { ic: 'book', t: ['Create', 'Ledger'] },
  { ic: 'file', t: ['Create', 'Voucher'] },
  { ic: 'box', t: ['Manage', 'Stock'] },
  { ic: 'cart', t: ['Create', 'Orders'] },
];

/** Translate glyph (two speech bubbles) for "Multiple Language Supported". */
const TRANSLATE =
  'M3 4h9a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H8l-3 3v-3H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1ZM5 7h5M7.5 7c0 2-1 3.2-2.5 3.8M6 8.6c.6.9 1.6 1.6 3 2M14 9h7a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-2v3l-3-3h-2a1 1 0 0 1-1-1v-3M15.5 16l2-5 2 5M16.2 14.4h2.6';

const CARDS: { ic: IconName | 'translate'; t: [string, string] }[] = [
  { ic: 'calendar', t: ['Attendance &', 'Leave Management'] },
  { ic: 'chart', t: ['Get Financial', 'Reports'] },
  { ic: 'team', t: ['Sales Team', 'Management'] },
  { ic: 'translate', t: ['Multiple Language', 'Supported'] },
  { ic: 'phone', t: ['Access All Tally', 'Products on Your Phone'] },
];

const RIBBON = [
  'Create Ledger, Voucher, Stock & Orders',
  'Real-time Tally Sync',
  'Financial Reports',
  'Attendance & Leave',
  'Sales Team Management',
  'Multiple Languages',
  'Tally Connect AI',
];

const TRUST = ['Works with All Tally Products', 'Real-time Data Sync', 'Secure & Reliable'];

/** Card width in px (matches the w-[clamp(250px,21.4vw,340px)] class below). */
const cardWidth = (vw: number) => Math.min(340, Math.max(250, vw * 0.214));
/** Where each card's centre sits down the phone, as a share of its height (design). */
const CARD_ROWS = [0.18, 0.34, 0.5, 0.66, 0.82];

/**
 * Lays the floating cards out against the 3D phone: a column just right of
 * the phone, spread down its height. Measured from the hero stage (the band
 * between navbar and feature ribbon) with the same maths the phone uses.
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
      const gap = Math.max(18, vw * 0.016);
      const left = Math.min(box.cx + box.w / 2 + gap, vw - Math.max(20, vw * 0.022) - cardWidth(vw));
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

function CardIcon({ ic, className }: { ic: IconName | 'translate'; className?: string }) {
  if (ic !== 'translate') return <SiteIcon n={ic} size={24} stroke={2} className={className} />;
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`flex-none ${className ?? ''}`}
      aria-hidden="true"
    >
      <path d={TRANSLATE} />
    </svg>
  );
}

/** One right-side feature card (design: white, rounded, pink icon disc, two bold lines). */
function FeatureCard({ c, className = '' }: { c: (typeof CARDS)[number]; className?: string }) {
  return (
    <div
      className={`flex items-center gap-[clamp(10px,1.1vw,18px)] rounded-[22px] border border-white bg-white/95 py-[clamp(7px,1.1vh,14px)] pl-[clamp(8px,0.8vw,14px)] pr-[clamp(10px,1vw,16px)] shadow-[0_18px_36px_-20px_rgba(110,21,49,.45),0_2px_6px_rgba(27,45,91,.05)] backdrop-blur-md ${className}`}
    >
      <span className="grid h-[clamp(40px,min(3.9vw,6.4vh),60px)] w-[clamp(40px,min(3.9vw,6.4vh),60px)] flex-none place-items-center rounded-full bg-gradient-to-b from-[#fdeef4] to-[#f6d2e2] text-acc">
        <CardIcon ic={c.ic} className="h-[52%] w-[52%]" />
      </span>
      <p className="whitespace-nowrap text-[clamp(14px,min(1.22vw,2.3vh),20px)] font-extrabold leading-[1.18] tracking-[-0.01em] text-navy-3">
        {c.t[0]}
        <br />
        {c.t[1]}
      </p>
    </div>
  );
}

/**
 * Bottom feature ribbon: a white bar of checked items with dividers. When the
 * items don't fit the width (smaller screens) it scrolls sideways instead.
 */
function HeroRibbon({ className = '' }: { className?: string }) {
  const bar = useRef<HTMLDivElement>(null);
  const probe = useRef<HTMLDivElement>(null);
  const [scroll, setScroll] = useState(false);
  useLayoutEffect(() => {
    const b = bar.current;
    const p = probe.current;
    if (!b || !p) return;
    const fit = () => setScroll(p.scrollWidth > b.clientWidth - 24);
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(b);
    return () => ro.disconnect();
  }, []);
  const items = (hidden: boolean, extra = '') => (
    <ul className={`flex flex-none items-center ${extra}`} aria-hidden={hidden || undefined}>
      {RIBBON.map((t, i) => (
        <li key={t} className="flex flex-none items-center">
          {i > 0 && <span className="mx-[clamp(8px,0.9vw,16px)] h-6 w-px bg-navy-3/15" aria-hidden="true" />}
          <span className="flex items-center gap-[0.45em] whitespace-nowrap text-[clamp(12px,0.92vw,15px)] font-bold text-navy-3">
            <span className="grid h-[1.25em] w-[1.25em] flex-none place-items-center rounded-full bg-acc text-white">
              <SiteIcon n="check" size={10} stroke={3.4} />
            </span>
            {t}
          </span>
        </li>
      ))}
    </ul>
  );
  return (
    <div
      ref={bar}
      className={`relative overflow-hidden rounded-[22px] border border-white bg-white/95 py-[clamp(12px,1.9vh,20px)] shadow-[0_18px_40px_-24px_rgba(110,21,49,.45)] ${className}`}
    >
      {/* invisible copy of the row, used only to measure whether it fits */}
      <div className="pointer-events-none invisible absolute left-0 top-0 h-0 overflow-hidden" aria-hidden="true">
        <div ref={probe} className="w-max">
          {items(true)}
        </div>
      </div>
      {scroll ? (
        <div className="ribbon-mask overflow-hidden">
          <div className="ribbon-track flex w-max">
            {items(false, 'pr-[clamp(8px,0.9vw,16px)] [&>li:first-child]:pl-4')}
            {items(true, 'pr-[clamp(8px,0.9vw,16px)] [&>li:first-child]:pl-4')}
          </div>
        </div>
      ) : (
        <div className="flex justify-center px-4">{items(false)}</div>
      )}
    </div>
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
        .from('.hero-chip', { scale: 0.6, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'back.out(1.7)' }, 0.9)
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
        className="hero-cta btn btn-accent !rounded-[14px] lg:!h-[clamp(44px,min(3.4vw,6.4vh),58px)] lg:!px-[1.6vw] lg:!text-[clamp(14px,1.18vw,19px)]"
      >
        Get Started Free <SiteIcon n="arrow" size={18} />
      </a>
      <a
        href={apk || '#free-access'}
        onClick={(e) => {
          if (!apk) {
            e.preventDefault();
            scrollToId('free-access');
          }
        }}
        className="hero-cta btn !rounded-[14px] border border-[#ecdbe6] bg-white text-navy-3 shadow-[0_10px_24px_-14px_rgba(27,45,91,.35)] hover:border-acc/30 lg:!h-[clamp(44px,min(3.4vw,6.4vh),58px)] lg:!px-[1.5vw] lg:!text-[clamp(14px,1.18vw,19px)]"
      >
        <SiteIcon n="download" size={18} stroke={2.4} className="text-acc" /> Download Android App
      </a>
    </>
  );
  const badge = (
    <div className="hero-line inline-flex items-center gap-2.5 rounded-full border border-[#efe2ec] bg-white py-1 pl-1 pr-4 text-[14px] font-bold text-navy-3 shadow-[0_6px_18px_-10px_rgba(110,21,49,.35)] lg:text-[clamp(13px,1.05vw,17px)]">
      <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-b from-acc-2 to-acc-3 px-2.5 py-0.5 text-[12px] font-extrabold uppercase tracking-wider text-white lg:text-[clamp(11px,0.95vw,15px)]">
        <SiteIcon n="star" size={12} stroke={2.6} /> Beta
      </span>
      Android App for Tally
    </div>
  );
  const heading = (
    <h1 className="hero-line font-extrabold tracking-[-0.03em] text-navy-3">
      <span className="lg:whitespace-nowrap">Tally on Your Phone.</span>
      <br />
      <span className="text-acc lg:whitespace-nowrap">Create, Manage &amp; Sync Anywhere.</span>
    </h1>
  );
  const lede =
    'A powerful mobile and web solution to manage your Tally business anytime, anywhere. Create ledgers, vouchers, stock items and orders, view financial reports, manage your team and much more — all connected with your Tally products.';
  const quick = (size: string) => (
    <ul className="hero-line flex flex-wrap gap-[clamp(8px,0.85vw,14px)]">
      {QUICK.map((q) => (
        <li
          key={q.t[1]}
          className={`flex flex-col items-center justify-center gap-[0.45em] rounded-[18px] border border-[#f1dce7] bg-white/85 text-center font-bold leading-[1.15] text-navy-3 shadow-[0_12px_26px_-18px_rgba(110,21,49,.5)] ${size}`}
        >
          <SiteIcon n={q.ic} size={30} stroke={1.8} className="h-[2em] w-[2em] text-acc" />
          <span>
            {q.t[0]}
            <br />
            {q.t[1]}
          </span>
        </li>
      ))}
    </ul>
  );
  const trust = (extra: string) => (
    <ul className={`hero-line flex flex-wrap gap-x-[1.6vw] gap-y-2 text-[14.5px] font-semibold text-navy-3 ${extra}`}>
      {TRUST.map((t) => (
        <li key={t} className="flex items-center gap-2">
          <SiteIcon n="check" size={17} className="text-acc" stroke={2.8} />
          {t}
        </li>
      ))}
    </ul>
  );

  if (!full) {
    // Tablets, phones, no WebGL: the same design stacked, with the CSS phone
    // and the five feature cards in a grid under it.
    return (
      <section ref={root} id="top" className="relative overflow-hidden pb-12 pt-28">
        <div className="wrap grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div className="relative z-[2] [&_h1]:text-[32px] [&_h1]:leading-[1.08] sm:[&_h1]:text-[46px]">
            {badge}
            <div className="mt-5">{heading}</div>
            <p className="hero-line mt-4 max-w-[600px] text-[16px] leading-[1.6] text-ink-2">{lede}</p>
            <div className="mt-6">{quick('h-[92px] w-[calc(25%-6px)] max-w-[118px] text-[13.5px] sm:h-[108px] sm:text-[15px]')}</div>
            <div className="mt-7 flex flex-wrap gap-3">{ctas}</div>
            <div className="mt-6">{trust('flex-col sm:flex-row')}</div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <CssPhone width={300} app={{ screen: 'home' }} className="hero-phone-lite float" label="Tally Connect home screen with sample data" />
          </div>
        </div>
        <div className="wrap mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((c) => (
            <FeatureCard key={c.t[1]} c={c} className="hero-line" />
          ))}
        </div>
        <div className="wrap mt-8">
          <HeroRibbon className="hero-line" />
        </div>
      </section>
    );
  }

  // Desktop: one screen tall, in three rows — room for the fixed navbar, the
  // stage (copy on the left; the 3D phone, robot and cards on the right, all
  // sized to this band) and the feature ribbon. The 3D phone sits behind.
  return (
    <section ref={root} id="top" className="relative grid h-[100svh] min-h-[600px] grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden">
      {/* navbar: 12px offset + 72px bar, plus breathing room */}
      <div className="h-[calc(84px+clamp(8px,1.8vh,26px))]" aria-hidden="true" />

      <div ref={stage} id="hero-stage" className="relative">
        <div className="absolute inset-y-0 left-[calc(3vw+16px)] z-[2] flex w-[46vw] flex-col justify-center">
          <div>{badge}</div>
          <div className="mt-[clamp(12px,2.6vh,30px)] text-[clamp(30px,min(2.95vw,5.6vh),58px)] leading-[1.1]">{heading}</div>
          <p className="hero-line mt-[clamp(10px,1.7vh,20px)] max-w-[36.5vw] text-[clamp(14px,min(1.2vw,2.1vh),19px)] leading-[1.5] text-ink-2">{lede}</p>
          <div className="mt-[clamp(14px,2.6vh,30px)]">
            {quick('h-[clamp(76px,min(7.8vw,12.6vh),124px)] w-[clamp(74px,min(7.6vw,12.2vh),120px)] text-[clamp(12px,min(1.2vw,2vh),18px)]')}
          </div>
          <div className="mt-[clamp(14px,2.8vh,32px)] flex flex-wrap gap-[1vw]">{ctas}</div>
          <div className="mt-[clamp(12px,2.4vh,28px)]">
            {trust('lg:text-[clamp(13px,min(1.2vw,2.1vh),19px)] [@media(min-height:820px)]:flex-col [@media(min-height:820px)]:gap-y-[1.2vh]')}
          </div>
        </div>

        <div className="hero-chips pointer-events-none absolute inset-0 z-[2]" aria-hidden="true" style={{ visibility: cards ? 'visible' : 'hidden' }}>
          {CARDS.map((c, i) => (
            <div key={c.t[1]} className="hero-chip absolute" style={{ left: cards?.left, top: cards?.tops[i] }}>
              <FeatureCard c={c} className="float-chip w-[clamp(250px,21.4vw,340px)] -translate-y-1/2" />
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-[3] px-[clamp(12px,1.2vw,24px)] pb-[clamp(10px,2.2vh,26px)] pt-[clamp(6px,1.2vh,14px)]">
        <HeroRibbon className="hero-line" />
      </div>
    </section>
  );
}
