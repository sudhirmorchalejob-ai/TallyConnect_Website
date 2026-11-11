import { AnimatePresence, motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { SiteIcon } from '../components/Common/SiteIcon';
import { FAQS } from '../data/content';
import { useReveal } from '../hooks/useSmoothScroll';

export function FAQ() {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<number | null>(0);
  useReveal(ref);
  return (
    <section ref={ref} id="faq" className="section">
      <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="kicker reveal">FAQ</p>
          <h2 className="h-section reveal mt-3">Questions, answered.</h2>
          <p className="lead reveal mt-4">Can’t find yours? Our team is available round the clock.</p>
        </div>
        <div className="space-y-3">
          {FAQS.map((f, i) => {
            const on = open === i;
            return (
              <div key={f.q} className="reveal glass-card overflow-hidden">
                <h3>
                  <button
                    type="button"
                    id={`faq-q-${i}`}
                    aria-expanded={on}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(on ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-[16.5px] font-extrabold sm:px-6 sm:py-5"
                  >
                    {f.q}
                    <motion.span animate={{ rotate: on ? 45 : 0 }} transition={{ duration: 0.25 }} className="grid h-9 w-9 flex-none place-items-center rounded-full bg-acc/10 text-acc">
                      <SiteIcon n="plus" size={18} />
                    </motion.span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div
                      id={`faq-a-${i}`}
                      role="region"
                      aria-labelledby={`faq-q-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: [0.2, 0.85, 0.2, 1] }}
                    >
                      <p className="px-5 pb-5 text-[15.5px] leading-relaxed text-ink-2 sm:px-6">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
