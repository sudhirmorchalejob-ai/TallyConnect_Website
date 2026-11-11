import { useRef } from 'react';
import { SiteIcon } from '../components/Common/SiteIcon';
import { MORE } from '../data/content';
import { useReveal } from '../hooks/useSmoothScroll';

export function MoreFeatures() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  return (
    <section ref={ref} id="more" className="section" data-phone-key="exit">
      <div className="wrap">
        <div className="max-w-[680px]">
          <p className="kicker reveal">And there is more</p>
          <h2 className="h-section reveal mt-3">Small things that save time every day.</h2>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {MORE.map((m) => (
            <div key={m.t} className="reveal glass-card p-5 transition-transform duration-300 hover:-translate-y-1">
              <span className="ico-tile">
                <SiteIcon n={m.ic} />
              </span>
              <h3 className="mt-4 text-[17px] font-extrabold">{m.t}</h3>
              <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-2">{m.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
