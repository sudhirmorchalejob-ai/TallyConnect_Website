// Illustrations for the "How it works" diagram: laptop (TallyPrime / web
// dashboard), the Sync Agent box, the Tally Connect server, dotted arrows.
import type { ReactNode } from 'react';
import { ICONS } from '../../demo/icons';

/** A laptop: dark bezel, screen content, light aluminium base. */
export function Laptop({ children, aspect = '16 / 10', className = '' }: { children: ReactNode; aspect?: string; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="rounded-t-[12px] rounded-b-[4px] bg-gradient-to-b from-[#2a2c38] to-[#14151c] p-[3.5%] pb-[4%] shadow-[0_18px_30px_-18px_rgba(14,27,51,.55)]">
        <div className="relative overflow-hidden rounded-[3px] bg-white" style={{ aspectRatio: aspect }}>
          {children}
          <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,.18),rgba(255,255,255,0)_38%)]" />
        </div>
      </div>
      <div className="relative -mx-[9%] h-[9px] rounded-b-[12px] rounded-t-[2px] bg-gradient-to-b from-[#eceaf1] via-[#d6d1de] to-[#b9b2c4] shadow-[0_10px_18px_-8px_rgba(14,27,51,.35)]">
        <span className="absolute left-1/2 top-0 h-[3px] w-[16%] -translate-x-1/2 rounded-b-[4px] bg-[#c9c3d3]" />
      </div>
    </div>
  );
}

/** TallyPrime on the laptop screen (product name only). */
export function TallyPrimeScreen() {
  return (
    <div className="grid h-full w-full place-items-center bg-gradient-to-b from-white to-[#f3f5fb]">
      <span className="text-[clamp(13px,1.35vw,20px)] font-bold tracking-[-0.01em] text-[#1f4fa3]">TallyPrime</span>
    </div>
  );
}

/** The actual Tally Connect web dashboard (screenshot). */
export function DashboardScreen() {
  return (
    <img
      src="/images/web_dashboard.webp"
      alt="Tally Connect web dashboard: overview with receivables, payables, bills, monthly income and expense, and outstanding trends"
      width={1261}
      height={720}
      loading="lazy"
      decoding="async"
      className="block h-full w-full object-cover object-left-top"
    />
  );
}

/** Sync Agent: a small white appliance with a glowing gear and status lights. */
export function AgentBox({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 160" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="ag-top" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#f6eef4" />
        </linearGradient>
        <linearGradient id="ag-l" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f3e9f0" />
          <stop offset="1" stopColor="#e6d6e1" />
        </linearGradient>
        <linearGradient id="ag-r" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ead9e5" />
          <stop offset="1" stopColor="#d9c4d3" />
        </linearGradient>
        <radialGradient id="ag-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ff6f9b" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ff6f9b" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="100" cy="140" rx="86" ry="14" fill="#b67896" opacity="0.18" />
      <ellipse cx="100" cy="134" rx="94" ry="20" fill="url(#ag-glow)" opacity="0.5" />
      <g strokeLinejoin="round">
        <path d="M100 52 L176 82 L100 112 L24 82 Z" fill="url(#ag-top)" stroke="#fff" strokeWidth="3" />
        <path d="M24 82 L100 112 L100 140 L24 110 Z" fill="url(#ag-l)" stroke="#fff" strokeWidth="2" />
        <path d="M100 112 L176 82 L176 110 L100 140 Z" fill="url(#ag-r)" stroke="#fff" strokeWidth="2" />
      </g>
      {[0, 1, 2, 3].map((i) => (
        <circle key={i} cx={118 + i * 13} cy={118 - i * 5.1} r="3.6" fill="#36d27a" style={{ filter: 'drop-shadow(0 0 3px #36d27a)' }} />
      ))}
      <ellipse cx="100" cy="66" rx="34" ry="16" fill="url(#ag-glow)" />
      <g transform="translate(78 18) scale(1.85)" fill="none" stroke="#c2185b" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 6px rgba(226,51,111,.55))' }}>
        <path d={ICONS.gear} />
      </g>
    </svg>
  );
}

/** Tally Connect server: stacked units with a cloud and two-way sync arrows. */
export function ServerStack({ className = '' }: { className?: string }) {
  const unit = (y: number, k: number) => (
    <g key={k} strokeLinejoin="round">
      <path d={`M110 ${y} L188 ${y + 26} L110 ${y + 52} L32 ${y + 26} Z`} fill="#fbf8fc" stroke="#fff" strokeWidth="2.5" />
      <path d={`M32 ${y + 26} L110 ${y + 52} L110 ${y + 74} L32 ${y + 48} Z`} fill="#efe6ef" stroke="#fff" strokeWidth="2" />
      <path d={`M110 ${y + 52} L188 ${y + 26} L188 ${y + 48} L110 ${y + 74} Z`} fill="#e2d3e0" stroke="#fff" strokeWidth="2" />
      {[0, 1, 2, 3, 4].map((i) => (
        <path key={i} d={`M${122 + i * 11} ${y + 58 - i * 3.7} l7 -2.3`} stroke="#b9a6b8" strokeWidth="2" strokeLinecap="round" />
      ))}
      <circle cx="46" cy={y + 42} r="3" fill={k ? '#36d27a' : '#ff4d6d'} style={{ filter: `drop-shadow(0 0 3px ${k ? '#36d27a' : '#ff4d6d'})` }} />
      <circle cx="56" cy={y + 46} r="3" fill="#ff4d6d" style={{ filter: 'drop-shadow(0 0 3px #ff4d6d)' }} />
    </g>
  );
  return (
    <svg viewBox="0 0 220 210" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="sv-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ff7aa8" stopOpacity="0.5" />
          <stop offset="1" stopColor="#ff7aa8" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="110" cy="192" rx="100" ry="16" fill="url(#sv-glow)" />
      <ellipse cx="110" cy="190" rx="80" ry="10" fill="#b67896" opacity="0.18" />
      {/* cloud with up/down arrows */}
      <g style={{ filter: 'drop-shadow(0 0 8px rgba(255,111,155,.6))' }}>
        <path
          d="M74 70 a22 22 0 0 1 4-43 a30 30 0 0 1 56-6 a22 22 0 0 1 14 44 Z"
          fill="rgba(255,255,255,.75)"
          stroke="#ff8fb5"
          strokeWidth="4"
          strokeLinejoin="round"
        />
      </g>
      <g stroke="#b3123e" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M100 58 V26 M90 36 l10 -10 10 10" />
        <path d="M122 26 V58 M112 48 l10 10 10 -10" />
      </g>
      {unit(84, 0)}
      {unit(120, 1)}
    </svg>
  );
}

/** Dotted connector with an arrow badge, flowing left → right. */
export function FlowArrow({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center ${className}`} aria-hidden="true">
      <span className="flow-dash h-0 flex-1 border-t-[2.5px] border-dashed border-acc/60" />
      <span className="mx-1 grid h-5 w-5 flex-none place-items-center rounded-full bg-acc text-white shadow-[0_0_10px_rgba(140,29,63,.45)]">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 6l6 6-6 6" />
        </svg>
      </span>
      <span className="flow-dash h-0 flex-1 border-t-[2.5px] border-dashed border-acc/60" />
    </div>
  );
}

/** The server's fork to the two destinations (desktop). */
export function Fork({ className = '' }: { className?: string }) {
  return (
    <div className={`relative ${className}`} aria-hidden="true">
      <svg viewBox="0 0 80 300" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <g fill="none" stroke="#8C1D3F" strokeOpacity="0.6" strokeWidth="2.5" strokeDasharray="5 6" vectorEffect="non-scaling-stroke" className="flow-dash-svg">
          <path d="M0 150 C 30 150 26 75 60 75 L80 75" vectorEffect="non-scaling-stroke" />
          <path d="M0 150 C 30 150 26 225 60 225 L80 225" vectorEffect="non-scaling-stroke" />
        </g>
      </svg>
      {['top-1/4', 'top-3/4'].map((t) => (
        <span key={t} className={`absolute right-0 ${t} grid h-5 w-5 -translate-y-1/2 place-items-center rounded-full bg-acc text-white shadow-[0_0_10px_rgba(140,29,63,.45)]`}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </span>
      ))}
    </div>
  );
}
