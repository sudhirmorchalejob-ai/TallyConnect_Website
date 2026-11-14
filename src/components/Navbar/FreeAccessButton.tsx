// "Limited-Time Free Access" call-to-action from the navbar reference: maroon
// gradient pill, white gift icon, two lines of text, arrow, pink outer ring
// and yellow sparkles at the top-right corner.
import { ICONS } from '../../demo/icons';

function Sparkles() {
  return (
    <svg className="pointer-events-none absolute -right-3 -top-4 h-7 w-7" viewBox="0 0 28 28" aria-hidden="true">
      <g stroke="#ffc83d" strokeWidth="2.6" strokeLinecap="round">
        <path d="M9 12 7 5" />
        <path d="M15 14 21 6" />
        <path d="M17 19 25 17" />
      </g>
    </svg>
  );
}

export function FreeAccessButton({ onClick, compact = false }: { onClick: () => void; compact?: boolean }) {
  return (
    <a
      href="#free-access"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className="group relative block flex-none rounded-[20px] p-[3px] shadow-[0_0_0_1px_rgba(255,255,255,.9),0_0_0_4px_rgba(245,190,212,.45),0_12px_26px_-10px_rgba(140,29,63,.6)] transition-transform duration-300 hover:-translate-y-0.5"
      aria-label="Limited-Time Free Access: get a 6-month free trial"
    >
      <span
        className={`relative flex items-center overflow-hidden rounded-[17px] border border-[#f3b5ca]/70 bg-gradient-to-br from-[#b4305d] via-[#93203f] to-[#6e1531] text-white shadow-[inset_0_1px_0_rgba(255,255,255,.25)] ${
          compact ? 'h-10 gap-2 pl-3 pr-2.5' : 'h-[50px] gap-3 pl-4 pr-3.5'
        }`}
      >
        {/* soft glow on the gradient */}
        <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_120%_at_20%_0%,rgba(255,255,255,.22),transparent_60%)]" />
        <svg
          viewBox="0 0 24 24"
          className={`relative flex-none ${compact ? 'h-[18px] w-[18px]' : 'h-6 w-6'}`}
          fill="none"
          stroke="#fff"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d={ICONS.gift} />
        </svg>
        <span className="relative text-left leading-tight">
          <span className={`block whitespace-nowrap font-extrabold ${compact ? 'text-[13px]' : 'text-[15px]'}`}>
            {compact ? 'Free Access' : 'Limited-Time Free Access'}
          </span>
          {!compact && <span className="block whitespace-nowrap text-[12px] font-semibold text-white/85">Get 6-Month Free Trial</span>}
        </span>
        <svg
          viewBox="0 0 24 24"
          className={`relative flex-none transition-transform duration-300 group-hover:translate-x-0.5 ${compact ? 'h-4 w-4' : 'ml-1 h-5 w-5'}`}
          fill="none"
          stroke="#fff"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
      <Sparkles />
    </a>
  );
}
