import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import { director } from '../animations/phoneDirector';
import { SiteIcon } from '../components/Common/SiteIcon';
import { CssPhone } from '../components/Smartphone/CssPhone';
import { SITE } from '../config/site';
import { scrollToId } from '../hooks/useSmoothScroll';
import type { IconName } from '../demo/icons';

const BOLT = 'M13 2 4.5 13.5H11L10 22l8.5-11.5H12z';

// Floating feature cards on the far right (reference design).
const CARDS: { ic: IconName | 'bolt'; t: string; s: string; top: string }[] = [
  { ic: 'bolt', t: 'Create Vouchers', s: 'On the Go', top: '23%' },
  { ic: 'chart', t: 'Real-time', s: 'Business Summary', top: '38%' },
  { ic: 'sync', t: 'Auto Sync with', s: 'TallyPrime', top: '53%' },
  { ic: 'shield', t: 'Secure &', s: 'Role-based Access', top: '68%' },
];

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
        href={apk || '#download'}
        onClick={(e) => {
          if (!apk) {
            e.preventDefault();
            scrollToId('download');
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
      <section ref={root} id="top" className="relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-28">
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
      </section>
    );
  }

  // Desktop: the reference composition, laid out against the viewport. The
  // 3D phone (scroll-driven, behind this layer) sits between robot and cards.
  return (
    <section ref={root} id="top" className="relative min-h-[100svh] overflow-hidden">
      <div className="absolute left-[7.5vw] top-1/2 z-[2] w-[38vw] -translate-y-[42%]">
        {badge}
        <div className="mt-[1.5vw] text-[clamp(34px,3.55vw,62px)] leading-[1.08]">{heading}</div>
        <p className="hero-line mt-[1.1vw] max-w-[33vw] text-[clamp(14.5px,1.12vw,19px)] leading-[1.55] text-ink-2">{lede}</p>
        <div className="mt-[1.8vw] flex flex-wrap gap-[1vw]">{ctas}</div>
        <div className="mt-[2vw]">{trust}</div>
      </div>

      <div className="hero-chips pointer-events-none absolute inset-0 z-[2]" aria-hidden="true">
        {CARDS.map((c) => (
          <div key={c.t} className="hero-chip absolute right-[5vw]" style={{ top: c.top }}>
            <div className="float-chip flex w-[15.2vw] min-w-[200px] items-center gap-[0.9vw] rounded-[16px] border border-white bg-white/90 py-[0.75vw] pl-[0.75vw] pr-[0.9vw] shadow-[0_14px_30px_-16px_rgba(110,21,49,.35),0_2px_6px_rgba(27,45,91,.05)] backdrop-blur-md">
              <span className="grid h-[clamp(36px,2.8vw,48px)] w-[clamp(36px,2.8vw,48px)] flex-none place-items-center rounded-full bg-gradient-to-b from-[#fdeef4] to-[#f7d7e6] text-acc">
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
    </section>
  );
}
