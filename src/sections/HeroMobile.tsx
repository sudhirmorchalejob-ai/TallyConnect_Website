// Phone-only hero (under 768px), from the approved mobile homepage design:
// centred copy, four quick cards, the app on a tilted phone with the AI robot
// on a glowing stage, trust row and the two ways in (Android app, browser).
// Tablets and desktops keep their own hero (see Hero.tsx).
import { useEffect, useState } from 'react';
import { SiteIcon } from '../components/Common/SiteIcon';
import { CssPhone } from '../components/Smartphone/CssPhone';
import { SITE } from '../config/site';
import type { IconName } from '../demo/icons';
import { scrollToId } from '../hooks/useSmoothScroll';

const QUICK: { ic: IconName; t: [string, string] }[] = [
  { ic: 'file', t: ['Create', 'Ledger'] },
  { ic: 'note', t: ['Create', 'Voucher'] },
  { ic: 'box', t: ['Manage', 'Stock'] },
  { ic: 'cart', t: ['Create', 'Orders'] },
];

/** Stacked-layers glyph for "Works with All Tally Products". */
function LayersIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="m12 3 9 4.5-9 4.5-9-4.5L12 3Z" />
      <path d="m3 12 9 4.5 9-4.5" />
      <path d="m3 16.5 9 4.5 9-4.5" />
    </svg>
  );
}

const TRUST: { ic: IconName | 'layers'; t: [string, string] }[] = [
  { ic: 'layers', t: ['Works with', 'All Tally Products'] },
  { ic: 'sync', t: ['Real-time', 'Data Sync'] },
  { ic: 'shield', t: ['Secure &', 'Reliable'] },
];

/** Phone width in px for the stage: 60% of the screen, at most 280px. */
function usePhoneWidth() {
  const calc = () => Math.round(Math.min(document.documentElement.clientWidth * 0.6, 280));
  const [w, setW] = useState(calc);
  useEffect(() => {
    const on = () => setW(calc());
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
  }, []);
  return w;
}

export function HeroMobile() {
  const apk = SITE.apkUrl;
  const phoneW = usePhoneWidth();
  return (
    <div className="relative">
      {/* soft pink swoosh behind the stage (design) */}
      <div
        className="pointer-events-none absolute -right-24 top-[58%] h-[70vw] w-[90vw] rotate-[-28deg] rounded-[50%] bg-gradient-to-l from-[#e9a3bf]/70 via-[#f6cfdd]/50 to-transparent blur-[2px]"
        aria-hidden="true"
      />

      <div className="relative px-4 text-center">
        {/* BETA | phone + monitor  Mobile App & Web Access */}
        <div className="hero-line mx-auto inline-flex max-w-full items-center gap-[min(2vw,8px)] rounded-full border border-[#f1e2ea] bg-white/90 py-1 pl-1 pr-3 shadow-[0_8px_20px_-12px_rgba(110,21,49,.45)]">
          <span className="inline-flex flex-none items-center gap-1 rounded-full bg-gradient-to-b from-acc-2 to-acc-3 px-2 py-1 text-[min(3.1vw,11.5px)] font-extrabold uppercase tracking-wider text-white">
            <SiteIcon n="star" size={12} stroke={2.6} /> Beta
          </span>
          <span className="h-4 w-px flex-none bg-navy-3/20" aria-hidden="true" />
          <span className="flex flex-none items-center gap-0.5 text-acc" aria-hidden="true">
            <SiteIcon n="phone" size={16} stroke={2} />
            <SiteIcon n="laptop" size={18} stroke={2} />
          </span>
          <span className="truncate text-[min(3.6vw,13px)] font-bold text-navy-3">Mobile App &amp; Web Access</span>
        </div>

        <h1 className="hero-line mt-5 font-extrabold leading-[1.1] tracking-[-0.03em]">
          <span className="block whitespace-nowrap text-[min(8.3vw,40px)] text-navy-3">Tally on Mobile &amp; Web.</span>
          <span className="block whitespace-nowrap text-[min(6vw,30px)] text-acc">Create, Manage &amp; Sync Anywhere.</span>
        </h1>
        {/* brush underline */}
        <svg className="hero-line mx-auto mt-1.5 h-2.5 w-[38%] text-acc" viewBox="0 0 160 10" preserveAspectRatio="none" aria-hidden="true">
          <path d="M2 7C40 2.5 110 1.5 158 4.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity=".8" />
        </svg>

        <p className="hero-line mx-auto mt-3 max-w-[520px] text-[14.5px] leading-[1.55] text-ink-2">
          A powerful mobile and web solution to manage your Tally business anytime, anywhere. Create ledgers, vouchers, stock items and orders, view
          financial reports, manage your team and much more — all connected with your Tally products.
        </p>

        <ul className="hero-line mt-5 grid grid-cols-4 gap-2">
          {QUICK.map((q) => (
            <li
              key={q.t[1]}
              className="flex aspect-[1/0.82] flex-col items-center justify-center gap-1 rounded-[16px] border border-[#f1dce7] bg-gradient-to-b from-white to-[#fdf2f7] text-[min(3.5vw,15px)] font-bold leading-[1.15] text-navy-3 shadow-[0_12px_24px_-16px_rgba(110,21,49,.55)]"
            >
              <SiteIcon n={q.ic} size={26} stroke={1.9} className="h-[1.85em] w-[1.85em] text-acc" />
              <span>
                {q.t[0]}
                <br />
                {q.t[1]}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Stage: tilted phone with the live Home screen, AI robot and callout, glowing platform. */}
      <div className="relative mx-auto mt-4 h-[min(138vw,600px)] w-full max-w-[480px]">
        {/* platform */}
        <div className="pointer-events-none absolute inset-x-[6%] bottom-[2%] h-[17%]" aria-hidden="true">
          <div className="absolute inset-x-0 bottom-0 h-[62%] rounded-[50%] bg-gradient-to-b from-[#c43a6b] to-[#7d1a3b] shadow-[0_24px_40px_-14px_rgba(110,21,49,.6)]" />
          <div className="absolute inset-x-0 bottom-[22%] h-[62%] rounded-[50%] bg-gradient-to-b from-[#fff4f8] to-[#f3c6d8] shadow-[inset_0_-6px_14px_rgba(196,58,107,.35)]" />
          <div className="absolute inset-x-[9%] bottom-[33%] h-[40%] rounded-[50%] border-2 border-white/90 shadow-[0_0_18px_4px_rgba(255,255,255,.8),0_0_30px_rgba(232,93,143,.6)]" />
        </div>

        {/* phone */}
        <div className="absolute bottom-[11%] right-[5%] [transform:perspective(1100px)_rotateY(-18deg)_rotateX(6deg)_rotateZ(5deg)]">
          <CssPhone
            width={phoneW}
            app={{ screen: 'home' }}
            className="hero-phone-lite"
            label="Tally Connect home screen with sample data"
          />
        </div>

        {/* AI callout */}
        <div className="hero-chip absolute left-[4%] top-[17%] z-[2] w-[46%] rounded-[22px] border border-[#f2c9da] bg-white/95 px-3 py-2.5 text-center shadow-[0_16px_30px_-18px_rgba(110,21,49,.55)]">
          <p className="flex items-center justify-center gap-1 whitespace-nowrap text-[min(4vw,17px)] font-extrabold text-acc">
            <SiteIcon n="spark" size={16} stroke={2.2} />
            Tally Connect
            <span className="rounded-full bg-acc px-1.5 text-[0.8em] leading-[1.45] text-white">AI</span>
          </p>
          <p className="mt-0.5 text-[min(3.5vw,15px)] font-bold leading-[1.2] text-navy-3">
            Your Smart
            <br />
            Accounting Expert
          </p>
          <span className="absolute -bottom-[7px] left-[62%] h-3.5 w-3.5 rotate-45 border-b border-r border-[#f2c9da] bg-white" aria-hidden="true" />
        </div>

        {/* robot */}
        <img
          src="/images/tc_ai_robot.webp"
          alt="Tally Connect AI robot"
          className="hero-chip float-chip absolute bottom-[12%] left-[3%] z-[3] w-[40%] drop-shadow-[0_18px_22px_rgba(110,21,49,.35)]"
          draggable={false}
        />
      </div>

      {/* trust row */}
      <ul className="hero-line relative mx-3 mt-2 flex items-center justify-between rounded-[22px] border border-white bg-white/95 px-2 py-3 shadow-[0_18px_36px_-22px_rgba(110,21,49,.5)]">
        {TRUST.map((t, i) => (
          <li key={t.t[1]} className={`flex items-center justify-center gap-1.5 ${i === 0 ? 'flex-[1.3]' : 'flex-1'}`}>
            {i > 0 && <span className="mr-1 h-8 w-px flex-none bg-navy-3/15" aria-hidden="true" />}
            {t.ic === 'layers' ? (
              <LayersIcon className="h-[min(6.4vw,30px)] w-[min(6.4vw,30px)] flex-none text-acc" />
            ) : (
              <SiteIcon n={t.ic} size={28} stroke={1.9} className="h-[min(6.4vw,30px)] w-[min(6.4vw,30px)] flex-none text-acc" />
            )}
            <span className="whitespace-nowrap text-left text-[min(2.95vw,14px)] font-bold leading-[1.2] text-navy-3">
              {t.t[0]}
              <br />
              {t.t[1]}
            </span>
          </li>
        ))}
      </ul>

      {/* Android app + web browser */}
      <div className="hero-cta relative mx-3 mt-4 grid grid-cols-2 gap-3">
        <a
          href={apk || '#free-access'}
          onClick={(e) => {
            if (!apk) {
              e.preventDefault();
              scrollToId('free-access');
            }
          }}
          className="flex h-[58px] items-center justify-center gap-2.5 rounded-[18px] bg-gradient-to-br from-[#b4305d] via-[#93203f] to-[#6e1531] px-2 text-white shadow-[0_14px_28px_-12px_rgba(140,29,63,.7),inset_0_1px_0_rgba(255,255,255,.25)]"
        >
          <SiteIcon n="download" size={26} stroke={2.2} className="flex-none" />
          <span className="text-left leading-tight">
            <span className="block text-[min(2.9vw,12px)] font-semibold uppercase tracking-wide text-white/85">Get the app</span>
            <span className="block whitespace-nowrap text-[min(4.2vw,18px)] font-extrabold">Android App</span>
          </span>
        </a>
        <a
          href={SITE.dashboard}
          className="flex h-[58px] items-center justify-center gap-2.5 rounded-[18px] border-2 border-acc/80 bg-white px-2 text-acc shadow-[0_14px_28px_-16px_rgba(140,29,63,.5)]"
        >
          <SiteIcon n="laptop" size={28} stroke={1.9} className="flex-none" />
          <span className="text-left text-[min(3.9vw,17px)] font-extrabold leading-[1.15]">
            Access on
            <br />
            Web Browser
          </span>
        </a>
      </div>
    </div>
  );
}
