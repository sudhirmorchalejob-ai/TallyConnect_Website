import { useRef } from 'react';
import { SiteIcon } from '../components/Common/SiteIcon';
import { CssPhone } from '../components/Smartphone/CssPhone';
import { SITE, apkRequestMail } from '../config/site';
import { useReveal } from '../hooks/useSmoothScroll';

const NEEDS = [
  'TallyPrime, licensed (Educational mode cannot sync)',
  'A Windows PC for the Sync Agent, with internet',
  'An Android phone for the Tally Connect app',
];

export function Download() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  return (
    <section ref={ref} id="download" className="section">
      <div className="wrap">
        <div className="relative overflow-hidden rounded-[34px] bg-gradient-to-br from-acc-2 via-acc to-acc-3 p-8 text-white shadow-[0_40px_80px_-40px_rgba(110,21,49,.8)] sm:p-12 lg:p-16">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_85%_10%,rgba(255,255,255,.22),transparent_70%)]" />
          <div className="relative grid items-center gap-12 lg:grid-cols-[1.2fr_auto]">
            <div>
              <p className="reveal text-[12.5px] font-extrabold uppercase tracking-[0.09em] text-white/75">Android app</p>
              <h2 className="reveal mt-3 text-[32px] font-extrabold leading-[1.06] tracking-[-0.025em] sm:text-[44px]">
                Put your Tally in your pocket.
              </h2>
              <p className="reveal mt-4 max-w-[540px] text-[17px] leading-relaxed text-white/85">
                Install Tally Connect on your Android phone and sign in with your account. Your companies appear after the Agent’s first sync.
              </p>
              <div className="reveal mt-8 flex flex-wrap gap-3">
                {SITE.apkUrl ? (
                  <a href={SITE.apkUrl} className="btn bg-white text-acc-3 shadow-lg" download>
                    <SiteIcon n="download" size={19} /> Download Android App
                  </a>
                ) : (
                  <a href={apkRequestMail} className="btn bg-white text-acc-3 shadow-lg">
                    <SiteIcon n="download" size={19} /> Request the Android App
                  </a>
                )}
                <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn border border-white/40 bg-white/10 text-white backdrop-blur">
                  <SiteIcon n="whatsapp" size={19} /> Ask on WhatsApp
                </a>
                {SITE.agentUrl && (
                  <a href={SITE.agentUrl} className="btn border border-white/40 bg-white/10 text-white backdrop-blur" download>
                    <SiteIcon n="laptop" size={19} /> Windows Sync Agent
                  </a>
                )}
              </div>
              {!SITE.apkUrl && (
                <p className="reveal mt-3 text-[13.5px] font-semibold text-white/70">The app is shared by our team during setup — request it and we’ll send it to you.</p>
              )}
              <ul className="reveal mt-8 space-y-2.5">
                {NEEDS.map((n) => (
                  <li key={n} className="flex items-center gap-3 text-[15px] font-semibold text-white/90">
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-white/20">
                      <SiteIcon n="check" size={14} stroke={2.6} />
                    </span>
                    {n}
                  </li>
                ))}
              </ul>
            </div>
            <div className="reveal hidden justify-center sm:flex">
              <CssPhone width={260} app={{ screen: 'login' }} tilt className="float" label="Tally Connect log-in screen" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
