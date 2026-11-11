// Hero backdrop from the reference design: white and lavender base, pink and
// purple glows, and flowing pink/maroon waves along the bottom with a soft
// light streak. Rendered behind the 3D phone layer (decorative only).
export function LandingBackdrop() {
  return (
    <div className="landing-bg" aria-hidden="true">
      <Waves className="landing-waves" />
    </div>
  );
}

/** The flowing pink/maroon waves (also used behind "How it works"). */
export function Waves({ className, idp = 'lw' }: { className?: string; idp?: string }) {
  return (
    <svg className={className} viewBox="0 0 1440 420" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`${idp}-fill`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#efe8fb" stopOpacity="0" />
          <stop offset="0.45" stopColor="#f6dbe9" stopOpacity="0.55" />
          <stop offset="1" stopColor="#f2b3cf" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id={`${idp}-band`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#e05a95" stopOpacity="0" />
          <stop offset="0.45" stopColor="#d94a8c" stopOpacity="0.38" />
          <stop offset="0.8" stopColor="#b62c64" stopOpacity="0.62" />
          <stop offset="1" stopColor="#8c1d3f" stopOpacity="0.75" />
        </linearGradient>
        <linearGradient id={`${idp}-band2`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#f39bc0" stopOpacity="0" />
          <stop offset="0.6" stopColor="#ef86b3" stopOpacity="0.5" />
          <stop offset="1" stopColor="#e2669e" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id={`${idp}-line`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="0.35" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0.6" />
        </linearGradient>
        <filter id={`${idp}-blur`} x="-10%" y="-50%" width="120%" height="200%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
        <filter id={`${idp}-blur-sm`} x="-10%" y="-50%" width="120%" height="200%">
          <feGaussianBlur stdDeviation="1.6" />
        </filter>
      </defs>
      {/* soft pink body rising to the right */}
      <path d="M0 360 C 320 330 640 380 940 290 C 1160 220 1300 140 1440 70 L1440 420 L0 420 Z" fill={`url(#${idp}-fill)`} />
      {/* lighter ribbon */}
      <path d="M180 420 C 560 360 900 350 1180 240 C 1300 192 1380 150 1440 118 L1440 210 C 1330 270 1200 330 980 380 C 800 418 520 420 180 420 Z" fill={`url(#${idp}-band2)`} />
      {/* maroon ribbon */}
      <path d="M420 420 C 760 380 1040 360 1260 280 C 1340 252 1400 226 1440 206 L1440 300 C 1340 344 1180 392 960 420 Z" fill={`url(#${idp}-band)`} />
      {/* glowing light streaks */}
      <path d="M120 418 C 520 350 880 340 1170 238 C 1290 196 1380 152 1440 120" fill="none" stroke={`url(#${idp}-line)`} strokeWidth="10" filter={`url(#${idp}-blur)`} />
      <path d="M120 418 C 520 350 880 340 1170 238 C 1290 196 1380 152 1440 120" fill="none" stroke={`url(#${idp}-line)`} strokeWidth="2" filter={`url(#${idp}-blur-sm)`} />
      <path d="M360 420 C 700 372 1000 362 1250 282 C 1340 254 1400 230 1440 212" fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="1.4" />
    </svg>
  );
}
