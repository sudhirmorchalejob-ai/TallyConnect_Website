// The complete Tally Connect feature list: 17 groups, every point shown.
import { useRef } from 'react';
import { SiteIcon } from '../components/Common/SiteIcon';
import { ALL_FEATURES } from '../data/content';
import { useReveal } from '../hooks/useSmoothScroll';

export function AllFeatures() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  const total = ALL_FEATURES.reduce((n, g) => n + g.points.length, 0);
  return (
    <section ref={ref} id="all-features" className="section">
      <div className="wrap">
        <div className="max-w-[720px]">
          <p className="kicker reveal">Complete feature list</p>
          <h2 className="h-section reveal mt-3">Everything Tally Connect can do.</h2>
          <p className="reveal mt-4 text-[16.5px] leading-relaxed text-ink-2">
            {ALL_FEATURES.length} areas, {total} features — from the Home dashboard to your team’s attendance.
          </p>
        </div>
        {/* Masonry columns, so groups of different lengths pack without gaps. */}
        <div className="mt-12 gap-4 sm:columns-2 lg:columns-3">
          {ALL_FEATURES.map((g, i) => {
            const ai = g.t.startsWith('AI');
            return (
              <article
                key={g.t}
                className={`reveal mb-4 break-inside-avoid p-5 sm:p-6 ${
                  ai
                    ? 'relative overflow-hidden rounded-[22px] bg-[linear-gradient(135deg,#1b2d5b_0%,#2a1645_50%,#6e1531_100%)] text-white shadow-[0_24px_50px_-28px_rgba(42,22,69,.8)] [&_li]:text-white/80 [&_li_svg]:text-[#ffb3cc]'
                    : `glass-card ${g.key ? 'ring-2 ring-acc/25' : ''}`
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={ai ? 'grid h-12 w-12 flex-none place-items-center rounded-[15px] bg-white/10 text-[#ffb3cc]' : 'ico-tile'}>
                    <SiteIcon n={g.ic} />
                  </span>
                  <h3 className="text-[17px] font-extrabold leading-snug">{g.t}</h3>
                  <span className={`ml-auto text-[13px] font-bold tabular-nums ${ai ? 'text-white/60' : 'text-ink-2/70'}`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                {g.key && (
                  <p
                    className={`mt-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11.5px] font-extrabold uppercase tracking-[0.08em] ${ai ? 'bg-white/10 text-[#ffd1e1]' : 'bg-acc/10 text-acc'}`}
                  >
                    <SiteIcon n="star" size={12} stroke={2.4} /> Key feature
                  </p>
                )}
                <ul className="mt-4 space-y-2">
                  {g.points.map((p) => {
                    const text = typeof p === 'string' ? p : p.t;
                    const soon = typeof p !== 'string';
                    return (
                      <li key={text} className="flex gap-2.5 text-[14.5px] leading-snug text-ink-2">
                        <SiteIcon n="check" size={16} stroke={2.4} className="mt-[2px] text-acc" />
                        <span>
                          {text}
                          {soon && (
                            <span className="ml-2 inline-block whitespace-nowrap rounded-full bg-acc/10 px-2 py-0.5 align-middle text-[11.5px] font-bold text-acc">
                              Coming soon
                            </span>
                          )}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
