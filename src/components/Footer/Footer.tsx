import { SITE } from '../../config/site';
import { scrollToId } from '../../hooks/useSmoothScroll';
import { Logo, SiteIcon } from '../Common/SiteIcon';

const COLS: [string, [string, string][]][] = [
  ['Product', [['features', 'Features'], ['demo', 'Live demo'], ['screens', 'Screens'], ['free-access', 'Free access']]],
  ['Learn', [['how-it-works', 'How it works'], ['security', 'Security & access'], ['faq', 'FAQ'], ['free-access', 'Contact']]],
];

export function Footer() {
  return (
    <footer className="relative z-[1] mt-10 border-t border-white/70 bg-white/45 backdrop-blur-xl">
      <div className="wrap grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div>
          <Logo className="h-8" />
          <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-ink-2">
            Your TallyPrime data on your phone — dashboards, vouchers, dues, stock and reports, kept in sync by the Tally Connect Agent.
          </p>
        </div>
        {COLS.map(([t, links]) => (
          <div key={t}>
            <h3 className="text-[12.5px] font-extrabold uppercase tracking-[0.08em] text-ink-3">{t}</h3>
            <ul className="mt-4 space-y-2.5">
              {links.map(([id, l]) => (
                <li key={id}>
                  <a href={`#${id}`} onClick={(e) => (e.preventDefault(), scrollToId(id))} className="text-[15px] font-semibold text-ink-2 hover:text-acc">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h3 className="text-[12.5px] font-extrabold uppercase tracking-[0.08em] text-ink-3">Contact</h3>
          <ul className="mt-4 space-y-2.5 text-[15px] font-semibold text-ink-2">
            <li>
              <a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-2 hover:text-acc">
                <SiteIcon n="mail" size={17} /> {SITE.email}
              </a>
            </li>
            <li>
              <a href={SITE.phoneHref} className="inline-flex items-center gap-2 hover:text-acc">
                <SiteIcon n="phone" size={17} /> {SITE.phone}
              </a>
            </li>
            <li>
              <a href={SITE.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-acc">
                <SiteIcon n="globe" size={17} /> tally-connect.com
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="wrap flex flex-col gap-2 border-t border-ink/5 py-6 text-[13px] text-ink-3 sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} {SITE.company}. All rights reserved.</p>
        <p>TallyPrime is a trademark of Tally Solutions Pvt. Ltd. Phone screens on this page use sample data.</p>
      </div>
    </footer>
  );
}
