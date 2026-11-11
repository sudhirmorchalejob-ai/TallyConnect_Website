import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Logo, SiteIcon } from '../Common/SiteIcon';
import { scrollToId } from '../../hooks/useSmoothScroll';

// Labels from the landing reference. "AI Assistant" opens the section that
// lists it; "Use Cases" opens "Why businesses use it".
const LINKS = [
  ['features', 'Features'],
  ['more', 'AI Assistant'],
  ['how-it-works', 'How it Works'],
  ['benefits', 'Use Cases'],
  ['security', 'Security'],
  ['faq', 'FAQ'],
  ['contact', 'Contact'],
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
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
    scrollToId(id);
  };
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <nav
        aria-label="Main"
        className={`mx-auto flex h-16 max-w-site items-center lg:h-[72px] lg:max-w-[88vw] gap-3 rounded-[22px] px-3 transition-all duration-300 sm:px-4 ${
          scrolled || open ? 'border border-white bg-white/85 shadow-[0_12px_30px_-18px_rgba(27,45,91,.35)] backdrop-blur-xl' : 'border border-transparent'
        }`}
      >
        <a href="#top" onClick={(e) => (e.preventDefault(), go('top'))} className="flex items-center gap-2.5" aria-label="Tally Connect home">
          <img src="/images/tc_app_icon.png" alt="" width={44} height={44} className="h-10 w-10 rounded-[12px] bg-white shadow-[0_4px_12px_-4px_rgba(27,45,91,.25)] sm:h-11 sm:w-11" />
          <Logo className="h-[24px] sm:h-[30px]" />
        </a>
        <ul className="mx-auto hidden items-center gap-1 lg:flex xl:gap-3">
          {LINKS.map(([id, t]) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={(e) => (e.preventDefault(), go(id))}
                className="whitespace-nowrap rounded-full px-2.5 py-2 text-[15px] font-semibold text-navy-3 transition-colors hover:text-acc lg:text-[clamp(13.5px,1vw,16px)] xl:px-[1vw]"
              >
                {t}
              </a>
            </li>
          ))}
        </ul>
        <a href="#download" onClick={(e) => (e.preventDefault(), go('download'))} className="btn btn-accent ml-auto !h-11 !rounded-[14px] !px-5 !text-[15.5px] lg:ml-0 lg:!h-12">
          <SiteIcon n="download" size={18} />
          <span className="hidden sm:inline">Get the App</span>
          <span className="sm:hidden">App</span>
        </a>
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
                className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-[16.5px] font-bold text-ink"
              >
                {t}
                <SiteIcon n="chevR" size={18} className="text-ink-3" />
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
