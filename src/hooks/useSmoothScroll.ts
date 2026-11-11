import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;

/** Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger stays in sync. */
export function useSmoothScroll(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    const l = new Lenis({ duration: 1.1, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), touchMultiplier: 1.4 });
    lenis = l;
    l.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => l.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      l.destroy();
      lenis = null;
    };
  }, [enabled]);
}

/** Scrolls to a page offset through Lenis when it runs (so the two never fight). */
export function scrollToY(y: number, duration = 1) {
  if (lenis) lenis.scrollTo(y, { duration });
  else window.scrollTo({ top: y, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
}

export function scrollToId(id: string) {
  const el = id === 'top' ? document.body : document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (lenis) lenis.scrollTo(id === 'top' ? 0 : el, { offset: id === 'top' ? 0 : -80, duration: 1.4 });
  else if (id === 'top') window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: reduce ? 'auto' : 'smooth' });
  history.replaceState(null, '', id === 'top' ? location.pathname : `#${id}`);
}

/** Fades `.reveal` elements in as they enter the viewport. */
export function useReveal(scope: React.RefObject<HTMLElement>, deps: unknown[] = []) {
  useEffect(() => {
    const root = scope.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.batch(root.querySelectorAll('.reveal'), {
        start: 'top 88%',
        once: true,
        onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.08, overwrite: true }),
      });
    }, root);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/** Freezes page scrolling (Lenis and native) while a modal is open. */
export function setScrollLocked(on: boolean) {
  if (on) lenis?.stop();
  else lenis?.start();
  document.documentElement.style.overflow = on ? 'hidden' : '';
}
