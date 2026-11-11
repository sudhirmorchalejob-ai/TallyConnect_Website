import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import { ICONS, type IconName } from '../demo/icons';
import { SETUP_STEPS } from '../data/content';
import { useReveal } from '../hooks/useSmoothScroll';

// Verified architecture (repo README + tally-agent/README.md):
// TallyPrime (Windows) ⇄ Sync Agent (same PC / network, Tally's XML port)
// ⇄ Tally Connect backend (Node, PostgreSQL) ⇄ Android app and web dashboard.
type Node = { id: string; ic: IconName; t: string; s: string };
const NODES: Node[] = [
  { id: 'tally', ic: 'laptop', t: 'TallyPrime', s: 'On your Windows PC' },
  { id: 'agent', ic: 'sync', t: 'Sync Agent', s: 'Runs beside Tally' },
  { id: 'cloud', ic: 'shield', t: 'Tally Connect', s: 'Secure server' },
  { id: 'app', ic: 'phone', t: 'Mobile app', s: 'You and your team' },
];

function NodeBox({ n, x, y, w = 200, h = 104, accent = false, grad = 'hiwAccW' }: { n: Node; x: number; y: number; w?: number; h?: number; accent?: boolean; grad?: string }) {
  return (
    <g className="hiw-node" transform={`translate(${x} ${y})`}>
      <rect width={w} height={h} rx={22} fill={accent ? `url(#${grad})` : 'rgba(255,255,255,.78)'} stroke="rgba(255,255,255,.95)" />
      <rect width={w} height={h} rx={22} fill="none" stroke="rgba(27,45,91,.08)" />
      <g transform="translate(18 24)">
        <rect width={52} height={52} rx={16} fill={accent ? 'rgba(255,255,255,.18)' : 'rgba(140,29,63,.09)'} />
        <path d={ICONS[n.ic]} transform="translate(14 14)" fill="none" stroke={accent ? '#fff' : '#8C1D3F'} strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <text x={84} y={46} fontSize={19} fontWeight={800} fill={accent ? '#fff' : '#0E1B33'}>
        {n.t}
      </text>
      <text x={84} y={70} fontSize={14} fontWeight={600} fill={accent ? 'rgba(255,255,255,.82)' : '#58647F'}>
        {n.s}
      </text>
    </g>
  );
}

function Dots({ path, n = 3, dur = 3.2, color = '#8C1D3F' }: { path: string; n?: number; dur?: number; color?: string }) {
  return (
    <g className="hiw-dots">
      {Array.from({ length: n }, (_, i) => (
        <circle key={i} r={5} fill={color}>
          <animateMotion dur={`${dur}s`} repeatCount="indefinite" begin={`${(-dur * i) / n}s`} path={path} />
        </circle>
      ))}
    </g>
  );
}

function Wide() {
  // Four nodes in a row; web dashboard branches below the server.
  const xs = [20, 290, 560, 830];
  const y = 70;
  const mid = y + 52;
  const fwd = (a: number, b: number) => `M${xs[a]! + 200} ${mid - 14} L${xs[b]!} ${mid - 14}`;
  const bwd = (a: number, b: number) => `M${xs[b]!} ${mid + 14} L${xs[a]! + 200} ${mid + 14}`;
  return (
    <svg viewBox="0 0 1050 360" className="h-auto w-full" role="img" aria-labelledby="hiw-title hiw-desc">
      <title id="hiw-title">How Tally Connect works</title>
      <desc id="hiw-desc">
        TallyPrime on your Windows PC talks to the Sync Agent beside it. The Agent sends your Tally data to the Tally Connect server, which the mobile
        app and web dashboard read. Entries made in the app travel back through the server to the Agent, which posts them into TallyPrime.
      </desc>
      <defs>
        <linearGradient id="hiwAccW" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#A42A52" />
          <stop offset="1" stopColor="#6E1531" />
        </linearGradient>
      </defs>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <path className="hiw-line" d={fwd(i, i + 1)} stroke="#8C1D3F" strokeOpacity={0.35} strokeWidth={2.5} strokeDasharray="6 7" fill="none" />
          <path className="hiw-line" d={bwd(i, i + 1)} stroke="#2A4584" strokeOpacity={0.35} strokeWidth={2.5} strokeDasharray="6 7" fill="none" />
          <Dots path={fwd(i, i + 1)} />
          <Dots path={bwd(i, i + 1)} color="#2A4584" dur={3.8} />
        </g>
      ))}
      <path className="hiw-line" d={`M${xs[2]! + 100} ${y + 104} L${xs[2]! + 100} 250`} stroke="#8C1D3F" strokeOpacity={0.35} strokeWidth={2.5} strokeDasharray="6 7" fill="none" />
      <Dots path={`M${xs[2]! + 100} ${y + 104} L${xs[2]! + 100} 250`} n={2} dur={2.4} />
      {NODES.map((n, i) => (
        <NodeBox key={n.id} n={n} x={xs[i]!} y={y} accent={n.id === 'cloud'} />
      ))}
      <NodeBox n={{ id: 'web', ic: 'globe', t: 'Web dashboard', s: 'In your browser' }} x={xs[2]!} y={250} w={200} h={96} />
      <text x={290} y={36} fontSize={14} fontWeight={700} fill="#8C1D3F">
        → Ledgers, vouchers, stock and reports from Tally
      </text>
      <text x={20} y={232} fontSize={14} fontWeight={700} fill="#2A4584">
        ← Entries made in the app, posted into Tally by the Agent
      </text>
    </svg>
  );
}

function Tall() {
  const x = 30;
  const ys = [10, 190, 370, 550];
  const cx = x + 150;
  const down = (a: number) => `M${cx - 16} ${ys[a]! + 104} L${cx - 16} ${ys[a + 1]!}`;
  const up = (a: number) => `M${cx + 16} ${ys[a + 1]!} L${cx + 16} ${ys[a]! + 104}`;
  return (
    <svg viewBox="0 0 360 670" className="mx-auto h-auto w-full max-w-[380px]" role="img" aria-label="How Tally Connect works: TallyPrime, Sync Agent, Tally Connect server and the mobile app, with data flowing both ways.">
      <defs>
        <linearGradient id="hiwAccT" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#A42A52" />
          <stop offset="1" stopColor="#6E1531" />
        </linearGradient>
      </defs>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <path className="hiw-line" d={down(i)} stroke="#8C1D3F" strokeOpacity={0.35} strokeWidth={2.5} strokeDasharray="6 7" />
          <path className="hiw-line" d={up(i)} stroke="#2A4584" strokeOpacity={0.35} strokeWidth={2.5} strokeDasharray="6 7" />
          <Dots path={down(i)} n={2} dur={2.4} />
          <Dots path={up(i)} n={2} dur={2.8} color="#2A4584" />
        </g>
      ))}
      {NODES.map((n, i) => (
        <NodeBox key={n.id} n={n} x={x} y={ys[i]!} w={300} accent={n.id === 'cloud'} grad="hiwAccT" />
      ))}
    </svg>
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
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.hiw-diagram', start: 'top 75%' },
      });
      gsap.from('.hiw-line', {
        opacity: 0,
        duration: 1,
        stagger: 0.05,
        scrollTrigger: { trigger: '.hiw-diagram', start: 'top 70%' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={ref} id="how-it-works" className="section">
      <div className="wrap">
        <div className="mx-auto max-w-[720px] text-center">
          <p className="kicker reveal">How it works</p>
          <h2 className="h-section reveal mt-3">From TallyPrime to your phone — and back.</h2>
          <p className="lead reveal mt-4">
            A small Sync Agent runs next to TallyPrime. It sends your Tally data up, and brings entries made in the app back down into Tally.
          </p>
        </div>
        <div className="hiw-diagram glass-card mt-12 p-4 sm:p-8">
          <div className="hidden md:block">
            <Wide />
          </div>
          <div className="md:hidden">
            <Tall />
          </div>
          <div className="mt-6 grid gap-3 text-[14px] font-semibold text-ink-2 md:grid-cols-3">
            <p className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-acc" /> Tally data going up to the app
            </p>
            <p className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-navy-2" /> Your new entries coming back to Tally
            </p>
            <p className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-pos" /> Sync pauses offline and resumes on its own
            </p>
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
      <style>{`@media (prefers-reduced-motion: reduce){.hiw-dots{display:none}}`}</style>
    </section>
  );
}
