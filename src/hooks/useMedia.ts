import { useEffect, useState } from 'react';

export function useMediaQuery(q: string): boolean {
  const [m, setM] = useState(() => (typeof window !== 'undefined' ? window.matchMedia(q).matches : false));
  useEffect(() => {
    const mq = window.matchMedia(q);
    const on = () => setM(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, [q]);
  return m;
}

export const useReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)');

let webglCache: boolean | null = null;
export function hasWebGL(): boolean {
  if (webglCache !== null) return webglCache;
  try {
    const c = document.createElement('canvas');
    webglCache = !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    webglCache = false;
  }
  return webglCache;
}

/**
 * Which phone experience this device gets:
 * - 'full'   desktop/laptop ≥ 1024px with WebGL and motion → 3D, scroll-driven phone
 * - 'lite'   tablets, phones, no WebGL or reduced motion → CSS phone, simpler motion
 */
export function useExperience(): 'full' | 'lite' {
  const wide = useMediaQuery('(min-width: 1024px) and (min-height: 600px)');
  const reduced = useReducedMotion();
  const [gl] = useState(hasWebGL);
  return wide && !reduced && gl ? 'full' : 'lite';
}

/** Mounts children only once the element is near the viewport. */
export function useNearViewport<T extends Element>(margin = '300px') {
  const [el, setEl] = useState<T | null>(null);
  const [near, setNear] = useState(false);
  useEffect(() => {
    if (!el || near) return;
    const io = new IntersectionObserver((es) => es.some((e) => e.isIntersecting) && setNear(true), { rootMargin: margin });
    io.observe(el);
    return () => io.disconnect();
  }, [el, near, margin]);
  return [setEl, near] as const;
}
