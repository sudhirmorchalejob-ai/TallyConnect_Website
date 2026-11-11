import { useRef } from 'react';
import { SiteIcon } from '../components/Common/SiteIcon';
import { CssPhone } from '../components/Smartphone/CssPhone';
import { SECURITY } from '../data/content';
import { useReveal } from '../hooks/useSmoothScroll';

export function Security() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  return (
    <section ref={ref} id="security" className="section">
      <div className="wrap grid items-center gap-14 lg:grid-cols-[1.25fr_auto]">
        <div>
          <p className="kicker reveal">Security & access management</p>
          <h2 className="h-section reveal mt-3">Share the app. Keep control of the books.</h2>
          <p className="lead reveal mt-4 max-w-[640px]">
            You decide what each person can see and do. Entries can wait for your approval, and nothing reaches Tally without the Agent you
            installed.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {SECURITY.map((s) => (
              <div key={s.t} className="reveal flex gap-4">
                <span className="ico-tile">
                  <SiteIcon n={s.ic} />
                </span>
                <div>
                  <h3 className="text-[17px] font-extrabold">{s.t}</h3>
                  <p className="mt-1 text-[14.5px] leading-relaxed text-ink-2">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="reveal flex justify-center">
          <CssPhone width={280} app={{ screen: 'teamAccess' }} tilt label="Access and Approvals screen" />
        </div>
      </div>
    </section>
  );
}
