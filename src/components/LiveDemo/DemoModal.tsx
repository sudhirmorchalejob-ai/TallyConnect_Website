// "Choose your demo" popup and the demo video player.
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { DEMOS, resolveDemo, type DemoKind } from '../../config/demoVideos';
import { useReducedMotion } from '../../hooks/useMedia';
import { scrollToId, setScrollLocked } from '../../hooks/useSmoothScroll';
import { SiteIcon } from '../Common/SiteIcon';
import { CssPhone } from '../Smartphone/CssPhone';

export type DemoView = 'choose' | DemoKind;

export function PlayIcon({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={`flex-none ${className}`} aria-hidden="true">
      <path d="M8 5.6v12.8a1 1 0 0 0 1.52.85l10.2-6.4a1 1 0 0 0 0-1.7L9.52 4.75A1 1 0 0 0 8 5.6Z" fill="currentColor" />
    </svg>
  );
}

const COPY: Record<DemoKind, { icon: 'phone' | 'laptop'; blurb: string; cta: string }> = {
  mobile: {
    icon: 'phone',
    blurb: 'Vouchers, outstanding, parties and reports on your Android phone.',
    cta: 'Watch Mobile App Demo',
  },
  web: {
    icon: 'laptop',
    blurb: 'Analytics, receivables, payables and reports in your browser.',
    cta: 'Watch Web Dashboard Demo',
  },
};

function ChooseCard({ kind, onPick }: { kind: DemoKind; onPick: (k: DemoKind) => void }) {
  const c = COPY[kind];
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-[22px] border border-white bg-white/70 text-left shadow-[0_14px_34px_-18px_rgba(27,45,91,.35)] transition-all duration-300 hover:-translate-y-1 hover:border-acc/25 hover:shadow-[0_22px_40px_-18px_rgba(140,29,63,.45)] has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-acc">
      <div
        ref={(el) => el?.setAttribute('inert', '')}
        className="relative grid h-[132px] place-items-center overflow-hidden bg-[radial-gradient(120%_90%_at_50%_0%,#fbe3ee_0%,#efe8fb_55%,#e8ecfb_100%)] sm:h-[168px]"
      >
        {kind === 'mobile' ? (
          <div className="pointer-events-none translate-y-[30%] transition-transform duration-500 group-hover:translate-y-[24%]">
            <CssPhone width={96} app={{ screen: 'home' }} />
          </div>
        ) : (
          <div className="pointer-events-none w-[78%] translate-y-[16%] overflow-hidden rounded-t-[10px] border border-white bg-white shadow-[0_14px_28px_-14px_rgba(27,45,91,.5)] transition-transform duration-500 group-hover:translate-y-[11%]">
            <div className="flex h-4 items-center gap-1 bg-[#eef0f6] px-2">
              {[0, 1, 2].map((i) => (
                <span key={i} className="h-1.5 w-1.5 rounded-full bg-[#c9cede]" />
              ))}
            </div>
            <img src="/images/web_dashboard.webp" alt="" className="block aspect-[1261/720] w-full object-cover object-left-top" />
          </div>
        )}
        <span className="absolute left-3 top-3 grid h-10 w-10 place-items-center rounded-[13px] bg-white/90 text-acc shadow-[0_6px_14px_-6px_rgba(27,45,91,.35)]">
          <SiteIcon n={c.icon} size={20} />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="text-[12px] font-extrabold uppercase tracking-[0.08em] text-acc">{kind === 'mobile' ? 'Option 1' : 'Option 2'}</p>
        <h3 className="mt-1 text-[18px] font-extrabold leading-tight text-navy sm:text-[19px]">{DEMOS[kind].device}</h3>
        <p className="mt-1.5 text-[14px] leading-snug text-ink-2">{c.blurb}</p>
        {/* The whole card is clickable through this button's stretched hit area. */}
        <button
          type="button"
          onClick={() => onPick(kind)}
          className="btn btn-accent mt-4 !h-11 !w-full !rounded-[14px] !px-4 !text-[15px] outline-none after:absolute after:inset-0 after:rounded-[22px] after:content-['']"
        >
          <PlayIcon size={15} /> {c.cta}
        </button>
      </div>
    </div>
  );
}

function Player({ kind, onClose }: { kind: DemoKind; onClose: () => void }) {
  const d = DEMOS[kind];
  const src = resolveDemo(d.url);
  const frame = d.portrait ? 'aspect-[9/16] h-[min(68svh,640px)] max-w-full' : 'aspect-video w-full max-h-[68svh]';

  if (src.type === 'none') {
    return (
      <div className="grid place-items-center rounded-[22px] border border-white bg-[radial-gradient(120%_100%_at_50%_0%,#fbe3ee_0%,#efe8fb_55%,#eef1fc_100%)] px-5 py-12 text-center sm:py-16">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-white text-acc shadow-[0_12px_26px_-12px_rgba(140,29,63,.55)]">
          <PlayIcon size={26} className="translate-x-[2px]" />
        </span>
        <h4 className="mt-5 text-[22px] font-extrabold text-navy sm:text-[24px]">Demo video coming soon</h4>
        <p className="mt-2 max-w-[440px] text-[15px] leading-relaxed text-ink-2">
          We’re preparing the {kind === 'mobile' ? 'Android app' : 'web dashboard'} walkthrough. In the meantime,{' '}
          {kind === 'mobile' ? 'try the app right here in your browser, or ask us for a live demo.' : 'ask our team for a live demo of the dashboard.'}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {kind === 'mobile' && (
            <button
              type="button"
              className="btn btn-accent !h-11 !rounded-[14px] !text-[15px]"
              onClick={() => {
                onClose();
                setTimeout(() => scrollToId('demo'), 60);
              }}
            >
              <SiteIcon n="phone" size={17} /> Try the interactive demo
            </button>
          )}
          <button
            type="button"
            className={`btn ${kind === 'mobile' ? 'btn-glass' : 'btn-accent'} !h-11 !rounded-[14px] !text-[15px]`}
            onClick={() => {
              onClose();
              setTimeout(() => scrollToId('contact'), 60);
            }}
          >
            <SiteIcon n="chat" size={17} /> Request a live demo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid place-items-center rounded-[22px] bg-[#0b1224] p-2 shadow-[inset_0_0_0_1px_rgba(255,255,255,.06)] sm:p-3">
      <div className={`relative overflow-hidden rounded-[14px] bg-black ${frame}`}>
        {src.type === 'video' ? (
          <video src={src.src} className="absolute inset-0 h-full w-full" controls autoPlay playsInline preload="metadata">
            Your browser can’t play this video.
          </video>
        ) : (
          <iframe
            src={src.src}
            title={d.title}
            className="absolute inset-0 h-full w-full border-0"
            allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        )}
      </div>
    </div>
  );
}

export function DemoModal({ view, onView, onClose }: { view: DemoView | null; onView: (v: DemoView) => void; onClose: () => void }) {
  const reduced = useReducedMotion();
  const panel = useRef<HTMLDivElement>(null);
  const open = view !== null;

  // Lock the page, close on Escape, keep Tab inside, restore focus afterwards.
  useEffect(() => {
    if (!open) return;
    const back = document.activeElement as HTMLElement | null;
    setScrollLocked(true);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key !== 'Tab' || !panel.current) return;
      const f = panel.current.querySelectorAll<HTMLElement>('button, [href], iframe, video, [tabindex]:not([tabindex="-1"])');
      if (!f.length) return;
      const first = f[0]!;
      const last = f[f.length - 1]!;
      if (e.shiftKey && document.activeElement === first) (e.preventDefault(), last.focus());
      else if (!e.shiftKey && document.activeElement === last) (e.preventDefault(), first.focus());
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      setScrollLocked(false);
      back?.focus?.({ preventScroll: true });
    };
  }, [open, onClose]);

  // Move focus into the panel whenever its content changes.
  useEffect(() => {
    if (view) panel.current?.querySelector<HTMLElement>('[data-autofocus]')?.focus({ preventScroll: true });
  }, [view]);

  const t = reduced ? { duration: 0 } : { duration: 0.32, ease: [0.22, 1, 0.36, 1] as const };
  const title = view === 'choose' || !view ? 'Choose Your Demo Experience' : DEMOS[view].title;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="demo-modal"
          className="fixed inset-0 z-[200] grid place-items-center overflow-y-auto p-3 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={t}
          data-lenis-prevent
        >
          <div className="fixed inset-0 bg-[rgba(14,27,51,.42)] backdrop-blur-[10px]" onClick={onClose} aria-hidden="true" />
          <motion.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby="demo-modal-title"
            className={`glass-card relative my-auto w-full !rounded-[28px] !bg-white/[0.93] p-4 sm:p-6 ${
              view && view !== 'choose' && DEMOS[view].portrait ? 'max-w-[640px]' : 'max-w-[880px]'
            }`}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={t}
          >
            <div className="flex items-center gap-3">
              {view && view !== 'choose' && (
                <button
                  type="button"
                  onClick={() => onView('choose')}
                  className="inline-flex h-10 flex-none items-center gap-1 rounded-full border border-white bg-white/80 pl-2 pr-3.5 text-[14px] font-bold text-navy shadow-[0_6px_14px_-8px_rgba(27,45,91,.4)] transition-colors hover:text-acc"
                >
                  <SiteIcon n="chevL" size={18} /> <span className="hidden sm:inline">All demos</span>
                  <span className="sm:hidden">Back</span>
                </button>
              )}
              <div className="min-w-0 flex-1">
                {view === 'choose' && <p className="text-[12px] font-extrabold uppercase tracking-[0.09em] text-acc">Watch product demo</p>}
                <h3 id="demo-modal-title" className="truncate text-[20px] font-extrabold leading-tight tracking-[-0.01em] text-navy sm:text-[24px]">
                  {title}
                </h3>
              </div>
              <button
                type="button"
                aria-label="Close"
                data-autofocus
                onClick={onClose}
                className="grid h-10 w-10 flex-none place-items-center rounded-full border border-white bg-white/80 text-ink shadow-[0_6px_14px_-8px_rgba(27,45,91,.4)] transition-colors hover:text-acc"
              >
                <SiteIcon n="close" size={20} />
              </button>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={view ?? 'none'}
                initial={{ opacity: 0, x: view === 'choose' ? -18 : 18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: view === 'choose' ? 18 : -18 }}
                transition={reduced ? { duration: 0 } : { duration: 0.24 }}
                className="mt-4 sm:mt-5"
              >
                {view === 'choose' ? (
                  <>
                    <p className="mb-4 text-[15px] leading-relaxed text-ink-2 sm:mb-5">
                      Tally Connect comes as an Android app and a web dashboard. Pick the one you’d like to see.
                    </p>
                    <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                      <ChooseCard kind="mobile" onPick={onView} />
                      <ChooseCard kind="web" onPick={onView} />
                    </div>
                  </>
                ) : view ? (
                  <Player kind={view} onClose={onClose} />
                ) : null}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
