import gsap from 'gsap';
import { useEffect, useRef, type ReactNode } from 'react';
import { Waves } from '../components/Common/LandingBackdrop';
import { SiteIcon } from '../components/Common/SiteIcon';
import { AgentBox, DashboardScreen, FlowArrow, Fork, Laptop, ServerStack, TallyPrimeScreen } from '../components/HowItWorks/FlowArt';
import { CssPhone } from '../components/Smartphone/CssPhone';
import { SETUP_STEPS } from '../data/content';
import type { IconName } from '../demo/icons';
import { useReveal } from '../hooks/useSmoothScroll';

// Verified architecture (repo README + tally-agent/README.md):
// TallyPrime (Windows) ⇄ Sync Agent (beside Tally) ⇄ Tally Connect server
// ⇄ Android app and web dashboard. Both write entries back via the Agent.

const PATHS: Record<string, string> = {
  db: 'M12 3c4.4 0 8 1.3 8 3s-3.6 3-8 3-8-1.3-8-3 3.6-3 8-3zM4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6',
  bolt: 'M13 2 4.5 13.5H11L10 22l8.5-11.5H12z',
  cloud: 'M7 18h10a4 4 0 0 0 .6-7.95A6 6 0 0 0 6.1 9.6 4.2 4.2 0 0 0 7 18zM9.5 13.5l2 2 3.5-3.5',
  monitor: 'M3 4h18v12H3zM8 20h8M12 16v4',
};
type GlyphName = IconName | 'db' | 'bolt' | 'cloud' | 'monitor';

function Glyph({ n, size = 22 }: { n: GlyphName; size?: number }) {
  if (n in PATHS)
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d={PATHS[n]} />
      </svg>
    );
  return <SiteIcon n={n as IconName} size={size} stroke={2} />;
}

function Label({ ic, t, d, accent = false, className = '' }: { ic: GlyphName; t: string; d: string; accent?: boolean; className?: string }) {
  return (
    <div
      className={`flex items-start gap-3 rounded-[18px] p-3.5 ${
        accent
          ? 'bg-gradient-to-br from-acc-2 to-acc-3 text-white shadow-[0_18px_34px_-16px_rgba(110,21,49,.75)]'
          : 'border border-white bg-white/85 shadow-[0_14px_30px_-18px_rgba(110,21,49,.35),0_2px_6px_rgba(27,45,91,.05)]'
      } ${className}`}
    >
      <span className={`grid h-10 w-10 flex-none place-items-center rounded-[12px] ${accent ? 'bg-white/15 text-white' : 'bg-[#fdeef4] text-acc'}`}>
        <Glyph n={ic} size={20} />
      </span>
      <span>
        <span className={`block text-[16px] font-extrabold leading-tight ${accent ? 'text-white' : 'text-navy-3'}`}>{t}</span>
        <span className={`mt-1 block text-[13.5px] font-semibold leading-snug ${accent ? 'text-white/85' : 'text-ink-2'}`}>{d}</span>
      </span>
    </div>
  );
}

const NODES: Record<string, { ic: GlyphName; t: string; d: string }> = {
  tally: { ic: 'laptop', t: 'TallyPrime', d: 'Your accounting data on your computer' },
  agent: { ic: 'sync', t: 'Sync Agent', d: 'Runs beside Tally and syncs data securely' },
  server: { ic: 'shield', t: 'Tally Connect', d: 'Secure server & data exchange' },
  app: { ic: 'phone', t: 'Mobile App', d: 'Access, create and manage on the go' },
  web: { ic: 'monitor', t: 'Web Dashboard', d: 'Monitor business, view analytics and manage operations' },
};

const HIGHLIGHTS: { ic: GlyphName; t: string }[] = [
  { ic: 'db', t: 'Ledgers, vouchers, stock & reports from Tally' },
  { ic: 'sync', t: 'Entries made in the app or dashboard posted into Tally' },
  { ic: 'bolt', t: 'Automatic & secure sync, every few minutes' },
  { ic: 'cloud', t: 'Works online & resumes automatically if offline' },
];

function Phone({ width }: { width: number }) {
  return <CssPhone width={width} app={{ screen: 'home' }} label="Tally Connect mobile app home screen" />;
}

function Col({ art, label }: { art: ReactNode; label: ReactNode }) {
  return (
    <div className="hiw-node flex flex-col justify-center gap-4">
      <div className="flex h-[160px] items-end justify-center">{art}</div>
      {label}
    </div>
  );
}

/** Desktop / laptop: the reference layout, left to right with a fork. */
function Wide() {
  return (
    <div className="hidden items-center gap-2 xl:grid xl:grid-cols-[1fr_40px_1fr_40px_1.1fr_64px_2.5fr]">
      <Col
        art={
          <Laptop className="mx-auto w-[86%]">
            <TallyPrimeScreen />
          </Laptop>
        }
        label={<Label {...NODES.tally!} />}
      />
      <FlowArrow className="hiw-node -mt-24" />
      <Col art={<AgentBox className="mx-auto w-[92%]" />} label={<Label {...NODES.agent!} />} />
      <FlowArrow className="hiw-node -mt-24" />
      <Col art={<ServerStack className="mx-auto w-[88%]" />} label={<Label {...NODES.server!} accent />} />
      <Fork className="hiw-node h-[400px] self-center" />
      <div className="grid gap-6">
        <div className="hiw-node grid grid-cols-[auto_1fr] items-center gap-4">
          <div className="-rotate-[4deg]">
            <Phone width={100} />
          </div>
          <Label {...NODES.app!} />
        </div>
        <div className="hiw-node grid grid-cols-[1.35fr_1fr] items-center gap-4">
          <Laptop aspect="1261 / 720" className="mx-[7%]">
            <DashboardScreen />
          </Laptop>
          <Label {...NODES.web!} />
        </div>
      </div>
    </div>
  );
}

function DownArrow() {
  return (
    <div className="flex justify-center py-1" aria-hidden="true">
      <span className="flex h-10 flex-col items-center">
        <span className="flow-dash w-0 flex-1 border-l-[2.5px] border-dashed border-acc/60" />
        <span className="grid h-5 w-5 place-items-center rounded-full bg-acc text-white">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
      </span>
    </div>
  );
}

/** Tablets and phones: the same flow, top to bottom; both destinations side by side. */
function Tall() {
  const row = (art: ReactNode, label: ReactNode) => (
    <div className="hiw-node mx-auto grid max-w-[520px] grid-cols-[120px_1fr] items-center gap-4 sm:grid-cols-[150px_1fr]">
      <div className="flex justify-center">{art}</div>
      {label}
    </div>
  );
  return (
    <div className="xl:hidden">
      {row(
        <Laptop className="w-[88%]">
          <TallyPrimeScreen />
        </Laptop>,
        <Label {...NODES.tally!} />,
      )}
      <DownArrow />
      {row(<AgentBox className="w-full" />, <Label {...NODES.agent!} />)}
      <DownArrow />
      {row(<ServerStack className="w-[90%]" />, <Label {...NODES.server!} accent />)}
      <DownArrow />
      <div className="hiw-node grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col items-center gap-4 rounded-[22px] bg-white/45 p-4">
          <Phone width={120} />
          <Label {...NODES.app!} className="w-full" />
        </div>
        <div className="flex flex-col items-center justify-end gap-4 rounded-[22px] bg-white/45 p-4">
          <Laptop aspect="1261 / 720" className="w-[82%]">
            <DashboardScreen />
          </Laptop>
          <Label {...NODES.web!} className="w-full" />
        </div>
      </div>
    </div>
  );
}

export function HowItWorks() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.from('.hiw-node', {
        opacity: 0,
        y: 24,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.hiw-diagram', start: 'top 75%' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={ref} id="how-it-works" className="section relative isolate overflow-hidden">
      {/* soft lavender/pink backdrop with the flowing waves along the bottom */}
      <div className="pointer-events-none absolute inset-0 -z-[1]" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(50%_40%_at_20%_10%,rgba(255,255,255,.9),transparent_70%),radial-gradient(45%_45%_at_85%_20%,rgba(236,222,252,.9),transparent_70%),radial-gradient(40%_40%_at_95%_85%,rgba(246,205,226,.8),transparent_70%),linear-gradient(180deg,rgba(248,244,253,0)_0%,#f7f0fb_14%,#f8eef7_86%,rgba(248,238,247,0)_100%)]" />
        <Waves idp="hw" className="absolute bottom-[6%] left-0 h-[40%] w-full" />
      </div>
      <div className="wrap xl:max-w-[1380px]">
        <div className="mx-auto max-w-[1180px] text-center">
          <p className="reveal flex items-center justify-center gap-3 text-[13px] font-extrabold uppercase tracking-[0.1em] text-acc">
            <span className="h-[2px] w-8 bg-acc" />
            How it works
            <span className="h-[2px] w-8 bg-acc" />
          </p>
          <h2 className="h-section reveal mt-3 text-navy-3 xl:text-[44px]">
            From TallyPrime to your phone, <span className="text-acc">web dashboard – and back.</span>
          </h2>
          <p className="lead reveal mx-auto mt-4 max-w-[720px]">
            A small Sync Agent runs next to TallyPrime. It sends your Tally data up, and brings entries made in the app and dashboard back down into
            Tally.
          </p>
        </div>

        <div className="hiw-diagram mt-10 rounded-[28px] border border-white/90 bg-white/55 p-4 shadow-[0_30px_60px_-30px_rgba(110,21,49,.35)] backdrop-blur-xl sm:p-7 lg:p-9">
          <Wide />
          <Tall />
          <div className="mt-8 grid gap-4 rounded-[20px] border border-white bg-white/80 p-4 shadow-[0_14px_30px_-20px_rgba(110,21,49,.35)] sm:grid-cols-2 xl:grid-cols-4 xl:gap-0 xl:p-5">
            {HIGHLIGHTS.map((h, i) => (
              <div key={h.t} className={`flex items-center gap-3 xl:px-5 ${i ? 'xl:border-l xl:border-acc/15' : ''}`}>
                <span className="flex-none text-acc">
                  <Glyph n={h.ic} size={30} />
                </span>
                <span className="text-[14.5px] font-bold leading-snug text-navy-3">{h.t}</span>
              </div>
            ))}
          </div>
        </div>

        <div id="get-started" className="mt-16 scroll-mt-24">
          <h3 className="reveal text-center text-[24px] font-extrabold tracking-tight sm:text-[28px]">Get started in four steps</h3>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SETUP_STEPS.map((s, i) => (
              <li key={s.t} className="reveal glass-card p-5">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-navy text-[16px] font-extrabold text-white">{i + 1}</span>
                <h4 className="mt-4 text-[17px] font-extrabold">{s.t}</h4>
                <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-2">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <style>{`
        .flow-dash { animation: hiw-pulse 1.4s ease-in-out infinite; }
        @keyframes hiw-pulse { 50% { opacity: .45 } }
        .flow-dash-svg { animation: hiw-dash 1.1s linear infinite; }
        @keyframes hiw-dash { to { stroke-dashoffset: -22; } }
        @media (prefers-reduced-motion: reduce) { .flow-dash, .flow-dash-svg { animation: none; } }
      `}</style>
    </section>
  );
}
