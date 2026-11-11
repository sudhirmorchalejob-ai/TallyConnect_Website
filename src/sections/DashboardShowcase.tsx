import { useRef } from 'react';
import { SiteIcon } from '../components/Common/SiteIcon';
import { CssPhone } from '../components/Smartphone/CssPhone';
import type { IconName } from '../demo/icons';
import { useReveal } from '../hooks/useSmoothScroll';

const CALLOUTS: { side: 'l' | 'r'; top: string; ic: IconName; t: string; d: string }[] = [
  { side: 'l', top: '14%', ic: 'building', t: 'Company & live sync', d: 'Switch Tally companies from the top of Home and see when data was last synced.' },
  { side: 'l', top: '52%', ic: 'plus', t: 'New Entry, one tap away', d: 'Sale, Purchase, Receipt and Payment straight from the dashboard.' },
  { side: 'r', top: '26%', ic: 'rupeeC', t: 'Money summary', d: 'Receivable, Payable, Receipts and Payments — each card opens its list.' },
  { side: 'r', top: '64%', ic: 'grid', t: 'Your layout, your workspace', d: 'Pin, hide and rearrange cards across pages, or switch workspace by role.' },
];

export function DashboardShowcase({ full }: { full: boolean }) {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  return (
    <section ref={ref} id="dashboard" className="section" data-phone-key="dash">
      <div className="wrap text-center">
        <p className="kicker reveal">The dashboard</p>
        <h2 className="h-section reveal mx-auto mt-3 max-w-[760px]">Everything important on one Home screen.</h2>
        <p className="lead reveal mx-auto mt-4 max-w-[620px]">
          The Liquid Glass Home from the app: your company, money at a glance, new entries and every shortcut — arranged the way you work.
        </p>
      </div>
      {full ? (
        <div id="dash-stage" className="relative mx-auto mt-6 h-[100vh] max-w-[1280px]">
          {CALLOUTS.map((c) => (
            <div
              key={c.t}
              className={`reveal absolute w-[min(300px,24vw)] ${c.side === 'l' ? 'right-[calc(50%+min(25vh,250px))] text-right' : 'left-[calc(50%+min(25vh,250px))]'}`}
              style={{ top: c.top }}
            >
              <div className={`glass-card flex items-start gap-3 p-4 ${c.side === 'l' ? 'flex-row-reverse' : ''}`}>
                <span className="ico-tile">
                  <SiteIcon n={c.ic} />
                </span>
                <div>
                  <h3 className="text-[16.5px] font-extrabold">{c.t}</h3>
                  <p className="mt-1 text-[14px] leading-snug text-ink-2">{c.d}</p>
                </div>
              </div>
              <span
                className={`absolute top-1/2 h-px w-[min(70px,5vw)] bg-gradient-to-r ${c.side === 'l' ? 'left-full from-acc/50 to-transparent' : 'right-full from-transparent to-acc/50'}`}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="wrap mt-12 grid items-center gap-10 md:grid-cols-[auto_1fr]">
          <div className="flex justify-center">
            <CssPhone width={290} app={{ screen: 'home' }} label="Tally Connect Home dashboard with sample data" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {CALLOUTS.map((c) => (
              <div key={c.t} className="reveal glass-card flex items-start gap-3 p-4">
                <span className="ico-tile">
                  <SiteIcon n={c.ic} />
                </span>
                <div>
                  <h3 className="text-[16.5px] font-extrabold">{c.t}</h3>
                  <p className="mt-1 text-[14px] leading-snug text-ink-2">{c.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
