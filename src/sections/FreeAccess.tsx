// The limited-time 6-month free access offer (target of the navbar CTA).
// Claiming goes through the existing contact channels — no sign-up flow here.
import { useRef } from 'react';
import { SiteIcon } from '../components/Common/SiteIcon';
import { SITE } from '../config/site';
import { ICONS } from '../demo/icons';
import { useReveal } from '../hooks/useSmoothScroll';

const claimMail = `mailto:${SITE.email}?subject=${encodeURIComponent('Tally Connect: 6-month free access')}&body=${encodeURIComponent(
  'Hello, I would like to claim the 6-month free access to Tally Connect.\n\nName:\nCompany:\nPhone:',
)}`;

const INCLUDED = [
  { ic: 'phone', t: 'Android app', d: 'Vouchers, outstanding, parties, stock and reports on your phone.' },
  { ic: 'laptop', t: 'Web dashboard', d: 'Business analytics and reports in your browser.' },
  { ic: 'sync', t: 'Sync with TallyPrime', d: 'The Sync Agent keeps your Tally data up to date.' },
] as const;

function GiftArt() {
  return (
    <div className="relative mx-auto grid h-[220px] w-[220px] place-items-center sm:h-[260px] sm:w-[260px]" aria-hidden="true">
      <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(247,190,212,.7),rgba(247,190,212,0)_68%)]" />
      <span className="relative grid h-[150px] w-[150px] place-items-center rounded-[40px] bg-gradient-to-br from-[#b4305d] via-[#93203f] to-[#6e1531] shadow-[0_30px_50px_-20px_rgba(110,21,49,.75),inset_0_1px_0_rgba(255,255,255,.3)] sm:h-[176px] sm:w-[176px]">
        <svg viewBox="0 0 24 24" className="h-[72px] w-[72px] sm:h-[84px] sm:w-[84px]" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d={ICONS.gift} />
        </svg>
        <span className="absolute -bottom-4 rounded-full border-2 border-white bg-[#ffc83d] px-4 py-1.5 text-[13px] font-extrabold text-[#5a1028] shadow-lg">6 months free</span>
      </span>
      <svg className="absolute right-6 top-6 h-12 w-12" viewBox="0 0 28 28">
        <g stroke="#ffc83d" strokeWidth="2.6" strokeLinecap="round">
          <path d="M9 12 7 5" />
          <path d="M15 14 21 6" />
          <path d="M17 19 25 17" />
        </g>
      </svg>
    </div>
  );
}

export function FreeAccess() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  return (
    <section ref={ref} id="free-access" className="section">
      <div className="wrap">
        <div className="glass-card relative overflow-hidden !rounded-[34px] p-8 sm:p-12 lg:p-14">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(55%_70%_at_90%_20%,rgba(247,190,212,.45),transparent_70%),radial-gradient(45%_60%_at_5%_100%,rgba(196,186,245,.35),transparent_70%)]" />
          <div className="grid items-center gap-10 lg:grid-cols-[1.25fr_auto]">
            <div>
              <p className="reveal inline-flex items-center gap-2 rounded-full bg-acc/10 px-3.5 py-1.5 text-[12.5px] font-extrabold uppercase tracking-[0.08em] text-acc">
                <SiteIcon n="gift" size={15} /> Limited-time offer
              </p>
              <h2 className="h-section reveal mt-4 text-navy">
                Grab your <span className="text-acc">6-month free access</span> to Tally Connect.
              </h2>
              <p className="lead reveal mt-4 max-w-[600px]">
                For a limited time, you can use Tally Connect free for six months. Get in touch with our team to claim your free access.
              </p>
              <div className="reveal mt-8 flex flex-wrap gap-3">
                <a href={claimMail} className="btn btn-accent">
                  <SiteIcon n="mail" size={19} /> Claim by email
                </a>
                <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-glass">
                  <SiteIcon n="whatsapp" size={19} /> Ask on WhatsApp
                </a>
                <a href={SITE.phoneHref} className="btn btn-glass">
                  <SiteIcon n="phone" size={19} /> {SITE.phone}
                </a>
              </div>
              <div className="reveal mt-9 grid gap-3 sm:grid-cols-3">
                {INCLUDED.map((x) => (
                  <div key={x.t} className="rounded-[18px] border border-white/90 bg-white/60 p-4">
                    <span className="ico-tile !h-10 !w-10">
                      <SiteIcon n={x.ic} size={19} />
                    </span>
                    <p className="mt-3 text-[15px] font-extrabold text-navy">{x.t}</p>
                    <p className="mt-1 text-[13.5px] leading-snug text-ink-2">{x.d}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="reveal">
              <GiftArt />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
