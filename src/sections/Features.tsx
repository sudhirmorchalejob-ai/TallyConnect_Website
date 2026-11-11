import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { featLayout, type FeatLayout } from '../animations/featLayout';
import { director } from '../animations/phoneDirector';
import { SiteIcon } from '../components/Common/SiteIcon';
import { CssPhone } from '../components/Smartphone/CssPhone';
import { FEATURES, type Feature } from '../data/content';
import { ICONS } from '../demo/icons';
import { isAutoScrolling, scrollToY, useReveal } from '../hooks/useSmoothScroll';

const num = (i: number) => String(i + 1).padStart(2, '0');

/** Maroon check used in the feature lists. */
function Check() {
  return (
    <span className="mt-0.5 grid h-[22px] w-[22px] flex-none place-items-center rounded-full bg-acc/10 text-acc">
      <SiteIcon n="check" size={13} stroke={2.8} />
    </span>
  );
}

/** Feature text: icon tile, numbered kicker, title, description and points. */
function FeatureCopy({ f, i, anim = '', compact = false, short = false }: { f: Feature; i: number; anim?: string; compact?: boolean; short?: boolean }) {
  return (
    <div>
      {/* Short screens drop the icon tile so the copy fits the card. */}
      {!short && (
        <span className={`${anim} mb-4 grid h-[52px] w-[52px] place-items-center rounded-[16px] bg-gradient-to-b from-[#fdf1f5] to-[#f7e3eb] text-acc shadow-[inset_0_1px_0_#fff,0_8px_18px_-10px_rgba(140,29,63,.45)] ${compact ? '' : 'sm:mb-5'}`}>
          <SiteIcon n={f.ic} size={24} />
        </span>
      )}
      <p className={`${anim} kicker`}>
        {num(i)} · {f.kicker}
      </p>
      <h3
        className={`${anim} mt-2 font-extrabold leading-[1.1] tracking-[-0.02em] text-navy ${compact ? 'text-[clamp(24px,2.3vw,38px)]' : 'text-[28px] sm:text-[34px]'}`}
      >
        {f.title}
      </h3>
      <p className={`${anim} mt-3 leading-[1.55] text-ink-2 ${compact ? 'max-w-[560px] text-[clamp(14.5px,1.1vw,17px)]' : 'text-[16.5px]'}`}>{f.desc}</p>
      <ul className={compact ? 'mt-4 space-y-2.5' : 'mt-5 space-y-2.5'}>
        {f.points.map((p) => (
          <li key={p} className={`${anim} flex items-start gap-3 text-[15px] font-semibold text-ink`}>
            <Check />
            {p}
          </li>
        ))}
      </ul>
      {!compact && <p className="mt-6 rounded-2xl border-l-4 border-acc bg-white/55 px-4 py-3 text-[15px] font-semibold text-ink-2">{f.benefit}</p>}
    </div>
  );
}

/** Decorative illustration: a slip of paper with the feature's icon and a check badge. */
function FeatureArt({ f, width }: { f: Feature; width: number }) {
  const id = `fa-${f.id}`;
  return (
    <svg viewBox="0 0 240 220" width={width} height={(width * 220) / 240} className="flex-none" aria-hidden="true">
      <defs>
        <radialGradient id={`${id}-glow`} cx="0.5" cy="0.55" r="0.5">
          <stop offset="0" stopColor="#f7c9da" stopOpacity="0.75" />
          <stop offset="1" stopColor="#f7c9da" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-paper`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#f6f1f6" />
        </linearGradient>
        <linearGradient id={`${id}-badge`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#b8325f" />
          <stop offset="1" stopColor="#7d1737" />
        </linearGradient>
        <filter id={`${id}-sh`} x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="12" stdDeviation="10" floodColor="#8c1d3f" floodOpacity="0.18" />
        </filter>
      </defs>
      <ellipse cx="120" cy="120" rx="118" ry="96" fill={`url(#${id}-glow)`} />
      <g transform="rotate(-9 120 110)" filter={`url(#${id}-sh)`}>
        <path
          d="M64 30h112a10 10 0 0 1 10 10v140l-12-8-12 8-12-8-12 8-12-8-12 8-12-8-12 8-12-8-12 8-12-8V40a10 10 0 0 1 10-10Z"
          fill={`url(#${id}-paper)`}
          stroke="#efe3ea"
          strokeWidth="1.5"
        />
        <circle cx="120" cy="78" r="26" fill="#fbeef3" />
        <g transform="translate(104 62) scale(1.33)" fill="none" stroke="#8c1d3f" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <path d={ICONS[f.ic]} />
        </g>
        {[120, 136, 152].map((y, k) => (
          <rect key={y} x="82" y={y} width={k === 2 ? 46 : 76} height="6" rx="3" fill="#ead9e2" />
        ))}
      </g>
      <g transform="translate(170 150)">
        <circle r="27" fill={`url(#${id}-badge)`} stroke="#fff" strokeWidth="4" style={{ filter: 'drop-shadow(0 8px 12px rgba(140,29,63,.35))' }} />
        <path d="M-11 0l7 7 14-14" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

/** Jumps past the whole showcase to "And there is more" (#more). */
function SkipButton({ className = '' }: { className?: string }) {
  return (
    <a
      href="#more"
      onClick={(e) => {
        e.preventDefault();
        // Target from the real page offset (not Lenis' cached position), 80px clear of the navbar.
        const el = document.getElementById('more');
        if (!el) return;
        scrollToY(el.getBoundingClientRect().top + window.scrollY - 80, 1.4);
        history.replaceState(null, '', '#more');
      }}
      className={`group inline-flex h-11 items-center gap-2 whitespace-nowrap rounded-full border-[1.5px] border-acc/70 bg-white/90 px-5 text-[14.5px] font-bold text-acc shadow-[0_10px_24px_-14px_rgba(140,29,63,.55)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-acc hover:bg-acc hover:text-white ${className}`}
    >
      Skip to And There’s More
      <SiteIcon n="arrow" size={17} stroke={2.4} className="transition-transform duration-300 group-hover:translate-x-1" />
    </a>
  );
}

function SectionHead({ compact = false, desc = true }: { compact?: boolean; desc?: boolean }) {
  return (
    <>
      <p className="kicker">Feature showcase</p>
      <h2
        className={
          compact ? 'mt-2 text-[clamp(28px,2.7vw,44px)] font-extrabold leading-[1.08] tracking-[-0.025em] text-navy' : 'h-section mt-3 text-navy'
        }
      >
        Built around the work you do <span className="text-acc">every day.</span>
      </h2>
      {desc && (
        <p className={`mt-3 max-w-[560px] leading-[1.55] text-ink-2 ${compact ? 'text-[15.5px]' : 'lead'}`}>
          Explore the key features of Tally Connect that simplify accounting, improve accuracy, and keep your business in sync with Tally.
        </p>
      )}
    </>
  );
}

/** The showcase layout for the current window (re-read on resize). */
function useFeatLayout(): FeatLayout {
  const calc = () => featLayout(document.documentElement.clientWidth, window.innerHeight);
  const [l, setL] = useState(calc);
  useEffect(() => {
    const on = () => setL(calc());
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
  }, []);
  return l;
}

function Horizontal() {
  const section = useRef<HTMLElement>(null);
  const clip = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const n = FEATURES.length;
  const L = useFeatLayout();

  useLayoutEffect(() => {
    let snapTimer = 0;
    const ctx = gsap.context(() => {
      // Content slides inside the card; the scroll length stays one screen per feature.
      const dist = () => track.current!.scrollWidth - clip.current!.clientWidth;
      const span = () => (n - 1) * window.innerWidth * 1.15;
      const clipLeft = () => clip.current!.getBoundingClientRect().left;
      const clipW = () => clip.current!.clientWidth;
      const tween = gsap.to(track.current, {
        x: () => -dist(),
        ease: 'none',
        scrollTrigger: {
          id: 'features-pin',
          trigger: section.current,
          start: 'top top',
          end: () => `+=${span()}`,
          pin: true,
          scrub: 0.7,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress * (n - 1);
            // Settle on the nearest feature once scrolling stops.
            // Not while a skip / nav jump is passing through the pin.
            window.clearTimeout(snapTimer);
            snapTimer = window.setTimeout(() => {
              if (!self.isActive || isAutoScrolling()) return;
              const q = self.progress * (n - 1);
              const to = Math.round(q);
              if (Math.abs(q - to) < 0.015) return;
              scrollToY(self.start + ((self.end - self.start) * to) / (n - 1), 0.7);
            }, 160);
            const idx = Math.min(n - 1, Math.round(p));
            const frac = p - Math.floor(p);
            const k = Math.sin(frac * Math.PI);
            director.sway.ry = -k * 0.42;
            director.sway.x = k * 0.025;
            director.sway.s = -k * 0.06;
            const f = FEATURES[idx]!;
            director.setOverride({ screen: f.screen, params: f.params });
            setActive(idx);
          },
          onToggle: (self) => {
            if (!self.isActive) {
              director.sway.ry = director.sway.x = director.sway.s = 0;
              director.setOverride(null);
            }
          },
        },
      });
      gsap.utils.toArray<HTMLElement>('.feat-panel').forEach((panel, i) => {
        // Outgoing content fades as it slides out of the card.
        if (i < n - 1) {
          gsap.to(panel.querySelector('.feat-body'), {
            opacity: 0,
            x: -30,
            ease: 'none',
            scrollTrigger: {
              trigger: panel,
              containerAnimation: tween,
              start: () => `left ${clipLeft()}px`,
              end: () => `left ${clipLeft() - clipW() * 0.3}px`,
              scrub: true,
            },
          });
        }
        if (i === 0) return;
        gsap.from(panel.querySelectorAll('.feat-anim'), {
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.05,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: panel,
            containerAnimation: tween,
            start: () => `left ${clipLeft() + clipW() * 0.55}px`,
            toggleActions: 'play none none reverse',
          },
        });
      });
      gsap.to('.feat-orb-a', { xPercent: -60, ease: 'none', scrollTrigger: { trigger: section.current, start: 'top top', end: () => `+=${span()}`, scrub: true } });
      gsap.to('.feat-orb-b', { xPercent: 50, yPercent: -30, ease: 'none', scrollTrigger: { trigger: section.current, start: 'top top', end: () => `+=${span()}`, scrub: true } });
    }, section);
    return () => {
      window.clearTimeout(snapTimer);
      ctx.revert();
      director.setOverride(null);
    };
  }, [n]);

  const jump = (i: number) => {
    const st = ScrollTrigger.getById('features-pin');
    if (!st) return;
    scrollToY(st.start + ((st.end - st.start) * i) / (n - 1) + 1, 1.2);
  };

  const cardW = L.right - L.left;
  const cardH = L.cardBottom - L.cardTop;
  // The card is clear where the 3D phone sits (it renders behind the page), then turns white.
  const clear = L.phone.cx + L.phone.w / 2 - L.left + 18;
  const cardBg = `linear-gradient(90deg, rgba(255,255,255,0) 0px, rgba(255,255,255,0) ${clear}px, rgba(255,255,255,.9) ${clear + 70}px, rgba(255,255,255,.94) 100%)`;
  const cur = FEATURES[active]!;

  return (
    <section ref={section} id="features" className="relative h-[100vh] overflow-hidden" aria-label="Feature showcase">
      <div className="feat-orb-a bg-orb right-[-10%] top-[10%] h-[40vw] w-[40vw] bg-[#dcccf5]" />
      <div className="feat-orb-b bg-orb bottom-[-20%] left-[30%] h-[34vw] w-[34vw] bg-[#f0d3df]" />

      {/* Heading + skip */}
      <div className="absolute z-[2] flex items-start justify-between gap-6" style={{ left: L.left, right: L.left, top: L.headTop }}>
        <div className="max-w-[720px]">
          <SectionHead compact desc={L.showDesc} />
        </div>
        <SkipButton className="mt-5 flex-none" />
      </div>

      {/* Feature card */}
      <div
        className="absolute rounded-[30px] border border-white/90 shadow-[0_30px_60px_-34px_rgba(27,45,91,.45),0_2px_8px_rgba(27,45,91,.05)]"
        style={{ left: L.left, top: L.cardTop, width: cardW, height: cardH, background: cardBg }}
        aria-hidden="true"
      />
      <div ref={clip} className="absolute z-[2] overflow-hidden" style={{ left: L.contentLeft, top: L.cardTop, right: L.left, height: cardH }}>
        <div ref={track} className="flex h-full will-change-transform" style={{ width: `${n * 100}%` }}>
          {FEATURES.map((f, i) => (
            <article key={f.id} className="feat-panel flex h-full flex-none items-center" style={{ width: `${100 / n}%` }} aria-label={f.kicker}>
              <div className="feat-body flex w-full items-center gap-6 pr-[3%]">
                <div className="min-w-0 flex-1 py-3">
                  <FeatureCopy f={f} i={i} anim="feat-anim" compact short={cardH < 400} />
                </div>
                {L.artW > 0 && (
                  <div className="feat-anim">
                    <FeatureArt f={f} width={L.artW} />
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Tab bar */}
      <nav
        className="absolute z-[3] flex items-stretch gap-1 rounded-[20px] border border-white bg-white/90 p-1.5 shadow-[0_18px_40px_-26px_rgba(27,45,91,.45)] backdrop-blur-md"
        style={{ left: L.left, width: cardW, top: L.tabsTop, height: L.tabsH }}
        aria-label="Features"
      >
        {FEATURES.map((f, i) => {
          const on = i === active;
          return (
            <button
              type="button"
              key={f.id}
              onClick={() => jump(i)}
              aria-current={on}
              className={`group flex min-w-0 flex-1 items-center justify-center gap-2.5 rounded-[14px] px-2 text-left transition-all duration-300 ${
                on ? 'bg-gradient-to-b from-acc-2 to-acc-3 text-white shadow-[0_10px_20px_-10px_rgba(110,21,49,.7)]' : 'text-navy hover:bg-acc/[0.06]'
              }`}
            >
              <SiteIcon n={f.ic} size={21} className={`hidden xl:block ${on ? 'text-white' : 'text-acc'}`} />
              <span className="min-w-0 leading-tight">
                <span className={`block text-[11.5px] font-bold ${on ? 'text-white/80' : 'text-ink-3'}`}>{num(i)}</span>
                <span className="block truncate text-[13px] font-bold">{f.kicker}</span>
              </span>
            </button>
          );
        })}
      </nav>

      {/* Progress */}
      <div className="absolute bottom-[14px] left-1/2 z-[3] flex -translate-x-1/2 items-center gap-4" aria-hidden="true">
        <span className="flex items-center gap-1.5">
          {FEATURES.map((f, i) => (
            <span key={f.id} className={`h-2 rounded-full transition-all duration-300 ${i === active ? 'w-7 bg-acc' : 'w-2 bg-navy/20'}`} />
          ))}
        </span>
        <span className="text-[13px] font-bold text-ink-2">
          {active + 1} of {n}
        </span>
        <span className="h-4 w-px bg-navy/20" />
        <span className="text-[13px] font-bold text-ink-2">{cur.kicker}</span>
      </div>
    </section>
  );
}

function Stacked() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  return (
    <section ref={ref} id="features" className="section">
      <div className="wrap">
        <div className="reveal max-w-[640px]">
          <SectionHead />
        </div>
        {/* Floats at the bottom of the screen while the features are in view. */}
        <div className="sticky top-[calc(100svh-68px)] z-10 flex h-0 justify-center">
          <SkipButton />
        </div>
        <div className="mt-14 space-y-20">
          {FEATURES.map((f, i) => (
            <article key={f.id} className={`grid items-center gap-10 md:grid-cols-2 ${i % 2 ? 'md:[&>*:first-child]:order-2' : ''}`}>
              <div className="flex justify-center">
                <CssPhone width={250} app={{ screen: f.screen, params: f.params }} label={`${f.kicker} screen with sample data`} />
              </div>
              <div className="reveal glass-card p-6 sm:p-7">
                <FeatureCopy f={f} i={i} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Features({ full }: { full: boolean }) {
  return full ? <Horizontal /> : <Stacked />;
}
