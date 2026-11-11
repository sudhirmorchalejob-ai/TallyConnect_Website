import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';
import { SiteIcon } from '../components/Common/SiteIcon';
import { CssPhone } from '../components/Smartphone/CssPhone';
import type { ScreenKey } from '../demo/data';
import { useReducedMotion } from '../hooks/useMedia';
import { useReveal } from '../hooks/useSmoothScroll';

const SHOTS: { t: string; screen: ScreenKey; params?: Record<string, string>; look?: string }[] = [
  { t: 'Log in', screen: 'login' },
  { t: 'Home dashboard', screen: 'home' },
  { t: 'New Entry', screen: 'newEntry' },
  { t: 'New Sale', screen: 'flow' },
  { t: 'Vouchers', screen: 'vList' },
  { t: 'Bill details', screen: 'entryDetail', params: { no: 'Sales 9' } },
  { t: 'Outstanding', screen: 'outHub' },
  { t: 'Receivable', screen: 'outList', params: { outKind: 'recv' } },
  { t: 'Items & stock', screen: 'items' },
  { t: 'Party ledger', screen: 'partyDetail', params: { name: 'Mehta Electricals' } },
  { t: 'Reports', screen: 'reports' },
  { t: 'Profit & Loss', screen: 'finReport' },
  { t: 'Activity', screen: 'activity' },
  { t: 'Sales Team', screen: 'team' },
  { t: 'Access & Approvals', screen: 'teamAccess' },
  { t: 'Alerts', screen: 'notifs' },
  { t: 'Royal Silk look', screen: 'home', look: 'royal' },
  { t: 'Mint Ledger look', screen: 'reports', look: 'mint' },
];

/** Auto-scroll speed, CSS px per second (right → left). */
const SPEED = 45;
/** Gap between phones (matches gap-6). */
const GAP = 24;
/** One phone plus its gap — how far an arrow click moves the row. */
const STEP = 230 + GAP;

type Loop = { x: number; hover: boolean; visible: boolean; nudge: number };

function Shot({ s, copy, onHover }: { s: (typeof SHOTS)[number]; copy?: boolean; onHover?: (on: boolean) => void }) {
  return (
    <figure className="flex-none snap-start" aria-hidden={copy || undefined}>
      {/* Only the phone itself pauses the loop — not the caption or the gaps. */}
      <div
        onPointerEnter={(e) => e.pointerType === 'mouse' && onHover?.(true)}
        onPointerLeave={(e) => e.pointerType === 'mouse' && onHover?.(false)}
        onPointerDown={(e) => e.pointerType !== 'mouse' && onHover?.(true)}
        onPointerUp={(e) => e.pointerType !== 'mouse' && onHover?.(false)}
        onPointerCancel={() => onHover?.(false)}
      >
        <CssPhone width={230} app={{ screen: s.screen, params: s.params, look: s.look }} label={copy ? undefined : `${s.t} screen`} />
      </div>
      <figcaption className="mt-5 text-center text-[14.5px] font-bold text-ink-2">{s.t}</figcaption>
    </figure>
  );
}

/**
 * Seamless right-to-left loop. The row is rendered twice; the track moves with
 * a GPU transform and wraps by exactly one row's width, so the restart is
 * invisible. Pauses while a phone is hovered and while off screen.
 */
function Marquee({ loop }: { loop: React.MutableRefObject<Loop> }) {
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const st = loop.current;
    let set = 0;
    const measure = () => {
      const t = track.current;
      // Exact repeat distance: first phone → the same phone in the copy row.
      const a = t?.children[0] as HTMLElement | undefined;
      const b = t?.children[SHOTS.length] as HTMLElement | undefined;
      if (a && b) set = b.offsetLeft - a.offsetLeft;
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    const io = new IntersectionObserver(([e]) => (st.visible = !!e?.isIntersecting), { rootMargin: '100px' });
    if (viewport.current) io.observe(viewport.current);

    const tick = (_t: number, deltaMs: number) => {
      const t = track.current;
      if (!set || !t) return;
      const dt = Math.min(deltaMs, 64) / 1000;
      if (st.visible && !st.hover) st.x += SPEED * dt;
      if (st.nudge) {
        // Arrow clicks glide on top of the steady movement.
        const step = st.nudge * Math.min(1, dt * 6);
        st.x += step;
        st.nudge = Math.abs(st.nudge - step) < 0.5 ? 0 : st.nudge - step;
      }
      st.x = ((st.x % set) + set) % set;
      t.style.transform = `translate3d(${(-st.x).toFixed(2)}px,0,0)`;
    };
    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      ro.disconnect();
      io.disconnect();
    };
  }, [loop]);

  const hover = (on: boolean) => (loop.current.hover = on);
  return (
    <div ref={viewport} className="mt-10 overflow-hidden px-[max(16px,calc((100vw-1200px)/2+32px))] pb-10 pt-2" role="region" aria-label="App screens">
      {/* Phones inside a moving row don't need their slow background drift. */}
      <div ref={track} className="flex w-max gap-6 will-change-transform [&_.orb]:![animation:none]">
        {SHOTS.map((s) => (
          <Shot key={s.t} s={s} onHover={hover} />
        ))}
        {SHOTS.map((s) => (
          <Shot key={`${s.t}-copy`} s={s} copy onHover={hover} />
        ))}
      </div>
    </div>
  );
}

export function ScreenGallery() {
  const ref = useRef<HTMLElement>(null);
  const strip = useRef<HTMLDivElement>(null);
  const loop = useRef<Loop>({ x: 0, hover: false, visible: false, nudge: 0 });
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const reduced = useReducedMotion();
  useReveal(ref);

  // Reduced motion keeps the original manual strip; otherwise arrows nudge the loop.
  const by = (d: number) => {
    if (reduced) strip.current?.scrollBy({ left: d * Math.min(720, window.innerWidth * 0.8), behavior: 'smooth' });
    else loop.current.nudge += d * STEP;
  };
  const onScroll = () => {
    const s = strip.current;
    if (!s) return;
    setAtStart(s.scrollLeft < 8);
    setAtEnd(s.scrollLeft + s.clientWidth > s.scrollWidth - 8);
  };

  return (
    <section ref={ref} id="screens" className="section overflow-hidden">
      <div className="wrap flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-[640px]">
          <p className="kicker reveal">Application screens</p>
          <h2 className="h-section reveal mt-3">The whole app, screen by screen.</h2>
          <p className="lead reveal mt-4">Recreated from the Tally Connect app with its sample data. Scroll sideways to see more.</p>
        </div>
        <div className="reveal flex gap-2">
          <button type="button" aria-label="Previous screens" disabled={reduced && atStart} onClick={() => by(-1)} className="btn btn-glass !h-12 !w-12 !px-0 disabled:opacity-40">
            <SiteIcon n="chevL" />
          </button>
          <button type="button" aria-label="Next screens" disabled={reduced && atEnd} onClick={() => by(1)} className="btn btn-glass !h-12 !w-12 !px-0 disabled:opacity-40">
            <SiteIcon n="chevR" />
          </button>
        </div>
      </div>
      {reduced ? (
        <div
          ref={strip}
          onScroll={onScroll}
          data-lenis-prevent
          className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto px-[max(16px,calc((100vw-1200px)/2+32px))] pb-10 pt-2"
          tabIndex={0}
          aria-label="App screens"
        >
          {SHOTS.map((s) => (
            <Shot key={s.t} s={s} />
          ))}
        </div>
      ) : (
        <Marquee loop={loop} />
      )}
    </section>
  );
}
