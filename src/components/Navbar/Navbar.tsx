import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Logo, SiteIcon } from '../Common/SiteIcon';
import { scrollToId } from '../../hooks/useSmoothScroll';
import { openDemo } from '../LiveDemo/openDemo';
import { FreeAccessButton } from './FreeAccessButton';

/** Small play badge that marks the "Live Demo" link. */
function PlayBadge({ big = false }: { big?: boolean }) {
  return (
    <span
      className={`grid flex-none place-items-center rounded-full bg-acc text-white shadow-[0_4px_10px_-3px_rgba(140,29,63,.6)] transition-transform duration-200 group-hover:scale-110 ${
        big ? 'h-6 w-6' : 'h-[18px] w-[18px]'
      }`}
      aria-hidden="true"
    >
      <svg width={big ? 10 : 8} height={big ? 10 : 8} viewBox="0 0 24 24">
        <path d="M7 4.5v15a1 1 0 0 0 1.53.85l12-7.5a1 1 0 0 0 0-1.7l-12-7.5A1 1 0 0 0 7 4.5Z" fill="currentColor" />
      </svg>
    </span>
  );
}

// "Live Demo" opens the demo video popup; the others scroll to their section.
const LINKS = [
  ['top', 'Home'],
  ['highlights', 'Key Features'],
  ['how-it-works', 'How it Works'],
  ['live-demo', 'Live Demo'],
  ['faq', 'FAQ'],
] as const;
type LinkId = (typeof LINKS)[number][0];

/** The navbar link for the section currently under the navbar (scroll spy). */
function useActiveLink(): LinkId {
  const [active, setActive] = useState<LinkId>('top');
  useEffect(() => {
    // Cheap (five boxes), so it runs straight from the scroll event.
    const on = () => {
      const line = window.innerHeight * 0.35;
      let cur: LinkId = 'top';
      for (const [id] of LINKS) {
        const el = id === 'top' ? null : document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= line && r.bottom > line) cur = id;
      }
      setActive(cur);
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => {
      window.removeEventListener('scroll', on);
      window.removeEventListener('resize', on);
    };
  }, []);
  return active;
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveLink();
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);
  const go = (id: string) => {
    setOpen(false);
    // "Live Demo" opens the video popup right away instead of scrolling.
    if (id === 'live-demo') openDemo();
    else scrollToId(id);
  };
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <nav
        aria-label="Main"
        className={`mx-auto flex h-16 max-w-site items-center lg:h-[72px] lg:max-w-[94vw] gap-3 rounded-[22px] px-3 transition-all duration-300 sm:px-4 ${
          scrolled || open ? 'border border-white bg-white/85 shadow-[0_12px_30px_-18px_rgba(27,45,91,.35)] backdrop-blur-xl' : 'border border-transparent'
        }`}
      >
        <a href="#top" onClick={(e) => (e.preventDefault(), go('top'))} className="flex flex-none items-center gap-2.5" aria-label="Tally Connect home">
          <Logo className="h-[28px] sm:h-[34px]" />
        </a>
        <ul className="ml-auto mr-auto hidden items-center gap-0.5 lg:flex xl:gap-2">
          {LINKS.map(([id, t]) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={(e) => (e.preventDefault(), go(id))}
                aria-current={active === id ? 'true' : undefined}
                className={`group relative inline-flex items-center gap-1.5 whitespace-nowrap px-3 py-2 text-[15px] font-semibold transition-colors hover:text-acc xl:px-4 xl:text-[16.5px] ${
                  active === id ? 'text-acc' : 'text-navy-3'
                }`}
              >
                {id === 'live-demo' && <PlayBadge big />}
                {t}
                {/* active underline (design) */}
                <span
                  className={`absolute inset-x-3 -bottom-0.5 h-[3px] rounded-full bg-acc transition-opacity duration-200 xl:inset-x-4 ${active === id ? 'opacity-100' : 'opacity-0'}`}
                  aria-hidden="true"
                />
              </a>
            </li>
          ))}
        </ul>
        {/* Full button on tablets and wide screens; compact on phones and next to the links on small laptops. */}
        <span className="ml-auto hidden sm:block lg:ml-0 lg:hidden xl:block">
          <FreeAccessButton onClick={() => go('free-access')} />
        </span>
        <span className="hidden lg:block xl:hidden">
          <FreeAccessButton compact onClick={() => go('free-access')} />
        </span>
        <span className="ml-auto sm:hidden">
          <FreeAccessButton compact onClick={() => go('free-access')} />
        </span>
        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className="grid h-11 w-11 place-items-center rounded-full text-ink lg:hidden"
          onClick={() => setOpen(!open)}
        >
          <SiteIcon n={open ? 'close' : 'menu'} />
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="glass-card mx-auto mt-2 max-w-site p-2 lg:hidden"
          >
            {LINKS.map(([id, t]) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => (e.preventDefault(), go(id))}
                className="group flex items-center justify-between rounded-2xl px-4 py-3.5 text-[16.5px] font-bold text-ink transition-colors hover:bg-white/70 hover:text-acc"
              >
                <span className="flex items-center gap-2.5">
                  {id === 'live-demo' && <PlayBadge big />}
                  {t}
                </span>
                <SiteIcon n="chevR" size={18} className="text-ink-3" />
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
