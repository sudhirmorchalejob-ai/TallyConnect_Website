import { useRef } from 'react';
import { SiteIcon } from '../components/Common/SiteIcon';
import { BENEFITS } from '../data/content';
import { useReveal } from '../hooks/useSmoothScroll';

export function Benefits() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  return (
    <section ref={ref} id="benefits" className="section">
      <div className="wrap">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="kicker reveal">Why businesses use it</p>
            <h2 className="h-section reveal mt-3">Less waiting for numbers. More time running the business.</h2>
          </div>
          <p className="lead reveal">
            Owners check the day’s position from anywhere, the sales team records orders on the spot, and the accountant keeps one clean set of
            books in TallyPrime.
          </p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((b, i) => (
            <div key={b.t} className={`reveal glass-card overflow-hidden p-6 ${i === 0 ? 'lg:row-span-1' : ''}`}>
              <div className="flex items-center gap-4">
                <span className="ico-tile">
                  <SiteIcon n={b.ic} />
                </span>
                <h3 className="text-[18px] font-extrabold leading-tight">{b.t}</h3>
              </div>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-2">{b.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
