// Lets any part of the page (e.g. the navbar) open the demo video popup.
import type { DemoView } from './DemoModal';

const EVENT = 'tc:open-demo';

export function openDemo(view: DemoView = 'choose') {
  window.dispatchEvent(new CustomEvent<DemoView>(EVENT, { detail: view }));
}

export function onOpenDemo(fn: (view: DemoView) => void) {
  const h = (e: Event) => fn((e as CustomEvent<DemoView>).detail);
  window.addEventListener(EVENT, h);
  return () => window.removeEventListener(EVENT, h);
}
