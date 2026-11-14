// 6-month free access promotional popup. Shows the approved banner artwork
// as-is, with clickable areas over its own × and "Grab Your 6-Month Free
// Access" button. Timing and frequency come from config/promo.ts.
import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { PROMO, PROMO_BANNER } from '../../config/promo';
import { useReducedMotion } from '../../hooks/useMedia';
import { scrollToId, setScrollLocked } from '../../hooks/useSmoothScroll';

const DAY = 24 * 60 * 60 * 1000;

function readDismissed(): number {
  try {
    return Number(localStorage.getItem(PROMO.storageKey)) || 0;
  } catch {
    return 0;
  }
}
function writeDismissed() {
  try {
    localStorage.setItem(PROMO.storageKey, String(Date.now()));
  } catch {
    /* private mode / storage blocked: it simply shows again next visit */
  }
}

/** Enabled and not dismissed within the snooze period. */
function shouldShow(): boolean {
  if (!PROMO.enabled) return false;
  return Date.now() - readDismissed() > PROMO.snoozeDays * DAY;
}

const pct = (r: { left: number; top: number; width: number; height: number }) => ({
  left: `${r.left}%`,
  top: `${r.top}%`,
  width: `${r.width}%`,
  height: `${r.height}%`,
});

export function PromoPopup() {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const downOnBackdrop = useRef(false);

  // Show ~1s after load, once the artwork is ready (so it never pops in half-loaded).
  useEffect(() => {
    if (!shouldShow()) return;
    let alive = true;
    const img = new Image();
    img.src = window.innerWidth < 640 ? PROMO_BANNER.srcSmall : PROMO_BANNER.src;
    const ready = img.decode ? img.decode().catch(() => undefined) : Promise.resolve();
    const wait = new Promise((r) => setTimeout(r, PROMO.delayMs));
    Promise.all([ready, wait]).then(() => alive && shouldShow() && setOpen(true));
    return () => {
      alive = false;
    };
  }, []);

  const close = useCallback(() => {
    writeDismissed();
    setOpen(false);
  }, []);

  const claim = useCallback(() => {
    writeDismissed();
    setOpen(false);
    // The offer section with the email / WhatsApp / phone claim options.
    setTimeout(() => scrollToId('free-access'), 80);
  }, []);

  // Lock the page, Escape to close, keep Tab inside, restore focus afterwards.
  useEffect(() => {
    if (!open) return;
    const back = document.activeElement as HTMLElement | null;
    setScrollLocked(true);
    closeBtn.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key !== 'Tab' || !panel.current) return;
      const f = [...panel.current.querySelectorAll<HTMLElement>('button')].filter((b) => b.offsetParent);
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
  }, [open, close]);

  const fade = reduced ? { duration: 0 } : { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const };
  const hotspot =
    'absolute rounded-full outline-none focus-visible:ring-4 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-acc';

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="promo"
          className="fixed inset-0 z-[210] grid place-items-center overflow-y-auto p-3 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={fade}
          data-lenis-prevent
          // Close on a click that both starts and ends on the backdrop (not a drag out of the banner).
          onPointerDown={(e) => (downOnBackdrop.current = e.target === e.currentTarget)}
          onClick={(e) => downOnBackdrop.current && e.target === e.currentTarget && close()}
        >
          <div className="pointer-events-none fixed inset-0 bg-[rgba(14,27,51,.5)] backdrop-blur-[6px]" aria-hidden="true" />
          <motion.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby="promo-title"
            aria-describedby="promo-desc"
            className="relative w-full max-w-[min(1080px,calc((100svh-48px)*1.914))]"
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={fade}
          >
            {/* Screen-reader version of the banner text. */}
            <h2 id="promo-title" className="sr-only">
              Limited-time offer: get Tally Connect free for 6 months
            </h2>
            <p id="promo-desc" className="sr-only">
              Phone access on your mobile phone and web access in your browser, free for 6 months.
            </p>
            <div className="relative" style={{ aspectRatio: `${PROMO_BANNER.width} / ${PROMO_BANNER.height}` }}>
              <img
                src={PROMO_BANNER.src}
                srcSet={`${PROMO_BANNER.srcSmall} 960w, ${PROMO_BANNER.src} ${PROMO_BANNER.width}w`}
                sizes="(max-width: 1100px) 100vw, 1080px"
                width={PROMO_BANNER.width}
                height={PROMO_BANNER.height}
                alt="Tally Connect limited-time offer: Get Tally Connect free for 6 months. Phone access and web access."
                decoding="async"
                className="block h-full w-full select-none drop-shadow-[0_30px_60px_rgba(14,27,51,.45)]"
                draggable={false}
              />
              {/* Over the banner's own × (hit area padded for touch). */}
              <button
                ref={closeBtn}
                type="button"
                onClick={close}
                aria-label="Close offer"
                className={`${hotspot} before:absolute before:-inset-2.5 before:content-['']`}
                style={pct(PROMO_BANNER.close)}
              />
              {/* Over the banner's "Grab Your 6-Month Free Access" button. */}
              <button
                type="button"
                onClick={claim}
                aria-label="Grab your 6-month free access"
                className={`${hotspot} cursor-pointer transition-[filter] duration-200 hover:brightness-110`}
                style={pct(PROMO_BANNER.cta)}
              />
            </div>
            {/* Phones: the banner gets small, so repeat its two actions as full-size buttons. */}
            <div className="mt-3 flex gap-2 sm:hidden">
              <button type="button" onClick={claim} className="btn btn-accent !h-12 flex-1 !rounded-[14px] !px-3 !text-[15px]">
                Grab 6-Month Free Access
              </button>
              <button type="button" onClick={close} className="btn btn-glass !h-12 !rounded-[14px] !px-4 !text-[15px]">
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
