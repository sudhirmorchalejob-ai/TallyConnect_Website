import { useEffect, useRef, useState } from 'react';
import { SiteIcon } from '../components/Common/SiteIcon';
import { CssPhone } from '../components/Smartphone/CssPhone';
import type { ScreenKey } from '../demo/data';
import type { IconName } from '../demo/icons';
import { useReveal } from '../hooks/useSmoothScroll';

const TASKS: { k: string; ic: IconName; t: string; hint: string; screen: ScreenKey; params?: Record<string, string> }[] = [
  { k: 'home', ic: 'home', t: 'Start from Home', hint: 'Open the menu, switch tabs, search, or tap a money card.', screen: 'home' },
  { k: 'sale', ic: 'bag', t: 'Record a sale', hint: 'Tap Sale, change quantities, pick items, then Save. Watch it appear in Activity.', screen: 'newEntry' },
  { k: 'dues', ic: 'rupeeC', t: 'Chase a late payment', hint: 'Filter Late, open a bill and send a reminder.', screen: 'outList', params: { outKind: 'recv' } },
  { k: 'sync', ic: 'activity', t: 'Fix an entry that was not sent', hint: 'Find the “Not sent” receipt and tap Try again.', screen: 'activity' },
  { k: 'party', ic: 'person', t: 'Open a party ledger', hint: 'Pick a customer, then switch to the Ledger tab.', screen: 'party' },
  { k: 'rep', ic: 'chart', t: 'Explore reports', hint: 'Change the period, switch category, open Profit & Loss.', screen: 'reports' },
  { k: 'team', ic: 'shield', t: 'Set a team member’s access', hint: 'Limit voucher types and turn approvals on or off.', screen: 'teamAccess' },
  { k: 'look', ic: 'star', t: 'Try another look', hint: 'Pick any of the app’s 8 looks — the whole app re-themes.', screen: 'settings' },
];

function usePhoneWidth() {
  const calc = () => {
    const byH = ((window.innerHeight - 150) * 412) / 890;
    const byW = window.innerWidth - 40;
    return Math.round(Math.max(270, Math.min(360, byH, byW)));
  };
  const [w, setW] = useState(() => (typeof window === 'undefined' ? 340 : calc()));
  useEffect(() => {
    const on = () => setW(calc());
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
  }, []);
  return w;
}

export function InteractiveDemo() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  const [task, setTask] = useState(0);
  const [run, setRun] = useState(0);
  const width = usePhoneWidth();
  const cur = TASKS[task]!;
  return (
    <section ref={ref} id="demo" className="section">
      <div className="wrap grid items-center gap-12 lg:grid-cols-[1fr_auto]">
        <div className="max-w-[560px]">
          <p className="kicker reveal">Interactive demo</p>
          <h2 className="h-section reveal mt-3">Go on — tap through the app.</h2>
          <p className="lead reveal mt-4">
            This is the Tally Connect interface rebuilt for the web, with the app’s own sample data. Pick a task, or just explore.
          </p>
          <div className="reveal mt-8 grid gap-2 sm:grid-cols-2">
            {TASKS.map((t, i) => (
              <button
                type="button"
                key={t.k}
                onClick={() => {
                  setTask(i);
                  setRun((r) => r + 1);
                }}
                aria-pressed={i === task}
                className={`flex items-center gap-3 rounded-[18px] border p-3 text-left transition-all duration-200 ${
                  i === task ? 'border-acc/30 bg-white shadow-[0_10px_24px_-14px_rgba(140,29,63,.6)]' : 'border-white/80 bg-white/45 hover:bg-white/70'
                }`}
              >
                <span className={`grid h-10 w-10 flex-none place-items-center rounded-xl ${i === task ? 'bg-acc text-white' : 'bg-acc/10 text-acc'}`}>
                  <SiteIcon n={t.ic} size={19} />
                </span>
                <span className="text-[15px] font-bold leading-tight">{t.t}</span>
              </button>
            ))}
          </div>
          <div className="reveal mt-5 flex items-start gap-3 rounded-[18px] bg-navy px-4 py-3.5 text-white">
            <SiteIcon n="info" size={20} className="mt-0.5 opacity-80" />
            <p className="text-[14.5px] font-semibold leading-snug">{cur.hint}</p>
          </div>
          <div className="reveal mt-4 flex flex-wrap items-center gap-3">
            <button type="button" className="btn btn-glass !h-11 !text-[15px]" onClick={() => setRun((r) => r + 1)}>
              <SiteIcon n="sync" size={17} /> Reset demo
            </button>
            <p className="text-[13px] font-semibold text-ink-3">
              Runs in your browser with sample data — not connected to any server or Tally company.
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <CssPhone key={`${task}-${run}`} width={width} app={{ screen: cur.screen, params: cur.params, interactive: true }} />
        </div>
      </div>
    </section>
  );
}
