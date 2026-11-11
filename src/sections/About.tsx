import { useRef } from 'react';
import { SiteIcon } from '../components/Common/SiteIcon';
import { CssPhone } from '../components/Smartphone/CssPhone';
import { useReveal } from '../hooks/useSmoothScroll';

const FACTS = [
  ['6', 'voucher types you can enter from the phone'],
  ['4', 'Indian languages, switchable any time'],
  ['5 min', 'how often the Agent checks Tally for changes'],
];

export function About({ full }: { full: boolean }) {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  return (
    <section ref={ref} id="about" className="section" data-phone-key="about">
      <div className="wrap grid items-center gap-12 lg:grid-cols-2">
        <div className="hidden lg:block" aria-hidden={full}>
          {!full && <CssPhone width={300} app={{ screen: 'activity' }} tilt className="mx-auto" label="Activity screen" />}
        </div>
        {!full && (
          <div className="flex justify-center lg:hidden">
            <CssPhone width={260} app={{ screen: 'activity' }} label="Activity screen showing entries reaching Tally" />
          </div>
        )}
        <div className="max-w-[560px]">
          <p className="kicker reveal">About Tally Connect</p>
          <h2 className="h-section reveal mt-3">Your Tally, wherever business happens.</h2>
          <p className="lead reveal mt-5">
            Tally Connect links TallyPrime on your office PC to an app on your phone. A small Sync Agent next to Tally keeps your
            companies up to date, so sales, dues, stock and reports are always a tap away — and entries you make on the move flow
            back into Tally on their own.
          </p>
          <p className="lead reveal mt-4">
            The Activity screen shows every entry on its way: <b className="text-ink">In Tally</b>, <b className="text-ink">Waiting</b> or{' '}
            <b className="text-ink">Not sent</b>, with a clear reason and a Try again button.
          </p>
          <div className="mt-9 grid gap-3 sm:grid-cols-3">
            {FACTS.map(([n, t]) => (
              <div key={t} className="reveal glass-card p-4">
                <div className="text-[30px] font-extrabold tracking-tight text-acc">{n}</div>
                <div className="mt-1 text-[14px] font-semibold leading-snug text-ink-2">{t}</div>
              </div>
            ))}
          </div>
          <div className="reveal mt-6 inline-flex items-center gap-2 text-[14.5px] font-semibold text-ink-3">
            <SiteIcon n="laptop" size={18} /> TallyPrime runs on Windows; the Agent runs beside it.
          </div>
        </div>
      </div>
    </section>
  );
}
