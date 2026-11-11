import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { SiteIcon } from '../components/Common/SiteIcon';
import { DASHBOARD, DashboardScreen, Laptop } from '../components/HowItWorks/FlowArt';
import { DemoModal, PlayIcon, type DemoView } from '../components/LiveDemo/DemoModal';
import { onOpenDemo } from '../components/LiveDemo/openDemo';
import { CssPhone } from '../components/Smartphone/CssPhone';
import type { DemoKind } from '../config/demoVideos';
import { useReveal } from '../hooks/useSmoothScroll';

/** Takes a preview out of the tab order and the accessibility tree. */
const inert = (el: HTMLElement | null) => el?.setAttribute('inert', '');

function DemoCard({
  kind,
  chip,
  title,
  text,
  cta,
  art,
  onWatch,
}: {
  kind: DemoKind;
  chip: string;
  title: string;
  text: string;
  cta: string;
  art: ReactNode;
  onWatch: (k: DemoKind) => void;
}) {
  return (
    <article className="reveal glass-card group flex flex-col overflow-hidden !rounded-[28px] transition-shadow duration-300 hover:shadow-[0_28px_50px_-24px_rgba(140,29,63,.45)]">
      <div className="relative h-[300px] overflow-hidden bg-[radial-gradient(110%_90%_at_50%_0%,#fbe1ed_0%,#f1e9fb_52%,#e9edfb_100%)] sm:h-[340px]">
        <span className="pointer-events-none absolute -right-10 -top-12 h-48 w-48 rounded-full bg-[#ff8fb5]/30 blur-3xl" />
        <span className="pointer-events-none absolute -bottom-16 -left-10 h-48 w-48 rounded-full bg-[#9fb2f5]/30 blur-3xl" />
        {/* Preview only: the app UI inside is not interactive here. */}
        <div ref={inert} className="pointer-events-none absolute inset-0 flex items-end justify-center transition-transform duration-500 ease-out group-hover:-translate-y-2">
          {art}
        </div>
        <button type="button" onClick={() => onWatch(kind)} aria-label={cta} className="absolute inset-0 block">
          <span className="absolute left-1/2 top-1/2 grid h-[68px] w-[68px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-acc shadow-[0_16px_34px_-12px_rgba(140,29,63,.6)] backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
            <span className="absolute inset-0 animate-ping rounded-full bg-white/40 [animation-duration:2.4s] motion-reduce:hidden" />
            <PlayIcon size={26} className="relative translate-x-[2px]" />
          </span>
        </button>
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-acc/10 px-3 py-1 text-[12.5px] font-extrabold uppercase tracking-[0.06em] text-acc">
          <SiteIcon n={kind === 'mobile' ? 'phone' : 'laptop'} size={15} /> {chip}
        </span>
        <h3 className="mt-3 text-[24px] font-extrabold leading-tight tracking-[-0.015em] text-navy sm:text-[27px]">{title}</h3>
        <p className="mt-2 flex-1 text-[16px] leading-[1.55] text-ink-2">{text}</p>
        <button type="button" onClick={() => onWatch(kind)} className="btn btn-accent mt-6 w-full !rounded-[16px] sm:w-fit">
          <PlayIcon size={17} /> {cta}
        </button>
      </div>
    </article>
  );
}

export function LiveDemo() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  const [view, setView] = useState<DemoView | null>(null);
  const close = useCallback(() => setView(null), []);
  useEffect(() => onOpenDemo(setView), []);

  return (
    <section ref={ref} id="live-demo" className="section overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_15%_20%,rgba(255,170,205,.22),transparent_70%),radial-gradient(55%_45%_at_90%_70%,rgba(170,160,245,.22),transparent_70%)]"
      />
      <div className="wrap">
        <div className="mx-auto max-w-[760px] text-center">
          <p className="kicker reveal">— Demo videos —</p>
          <h2 className="h-section reveal mt-3 text-navy">
            Experience Tally Connect <span className="text-acc">in Action</span>
          </h2>
          <p className="lead reveal mx-auto mt-4 max-w-[640px]">
            Explore how Tally Connect simplifies your accounting operations through our Android Mobile Application and Web Dashboard.
          </p>
          <div className="reveal mt-8 flex justify-center">
            <button type="button" onClick={() => setView('choose')} className="btn btn-primary !h-14 !rounded-[18px] !px-7 !text-[17px]">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-white/20">
                <PlayIcon size={15} className="translate-x-[1px]" />
              </span>
              Watch Product Demo
            </button>
          </div>
        </div>

        <div className="mt-12 grid gap-6 sm:mt-14 lg:grid-cols-2 lg:gap-8">
          <DemoCard
            kind="mobile"
            chip="Android app"
            title="Android App Demo"
            text="Discover how to manage accounting activities, create vouchers and access business information from your Android device."
            cta="Watch Mobile Demo"
            onWatch={setView}
            art={
              <div className="translate-y-[38%]">
                <CssPhone width={230} app={{ screen: 'home' }} />
              </div>
            }
          />
          <DemoCard
            kind="web"
            chip="Web browser"
            title="Web Dashboard Demo"
            text="Explore business analytics, sales performance, receivables, payables, reports and centralized business monitoring."
            cta="Watch Dashboard Demo"
            onWatch={setView}
            art={
              <Laptop browser aspect={DASHBOARD.aspect} className="mb-[-6px] w-[84%] max-w-[520px]">
                <DashboardScreen />
              </Laptop>
            }
          />
        </div>
      </div>
      <DemoModal view={view} onView={setView} onClose={close} />
    </section>
  );
}
