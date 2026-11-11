import { useRef, useState } from 'react';
import { SiteIcon } from '../components/Common/SiteIcon';
import { CssPhone } from '../components/Smartphone/CssPhone';
import type { ScreenKey } from '../demo/data';
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

export function ScreenGallery() {
  const ref = useRef<HTMLElement>(null);
  const strip = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  useReveal(ref);
  const by = (d: number) => strip.current?.scrollBy({ left: d * Math.min(720, window.innerWidth * 0.8), behavior: 'smooth' });
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
          <button type="button" aria-label="Previous screens" disabled={atStart} onClick={() => by(-1)} className="btn btn-glass !h-12 !w-12 !px-0 disabled:opacity-40">
            <SiteIcon n="chevL" />
          </button>
          <button type="button" aria-label="Next screens" disabled={atEnd} onClick={() => by(1)} className="btn btn-glass !h-12 !w-12 !px-0 disabled:opacity-40">
            <SiteIcon n="chevR" />
          </button>
        </div>
      </div>
      <div
        ref={strip}
        onScroll={onScroll}
        data-lenis-prevent
        className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto px-[max(16px,calc((100vw-1200px)/2+32px))] pb-10 pt-2"
        tabIndex={0}
        aria-label="App screens"
      >
        {SHOTS.map((s) => (
          <figure key={s.t} className="flex-none snap-start">
            <CssPhone width={230} app={{ screen: s.screen, params: s.params, look: s.look }} label={`${s.t} screen`} />
            <figcaption className="mt-5 text-center text-[14.5px] font-bold text-ink-2">{s.t}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
