// The Tally Connect AI robot, travelling with the phone as the page scrolls.
// Each frame it is placed at the phone's left side using the phone's actual
// on-screen box (written by the 3D scene), so it moves exactly like the
// phone; the scroll keys only fade it out after About. No React re-renders.
import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import { director } from '../../animations/phoneDirector';

export function ScrollRobot() {
  const box = useRef<HTMLDivElement>(null);
  const bubble = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const cur = { ...director.robot };
    let first = true;
    const tick = (_t: number, deltaMs: number) => {
      const el = box.current;
      const ph = director.phoneRect;
      if (!el || !ph) return;
      const t = director.robot;
      const k = first ? 1 : 1 - Math.exp((-6 * Math.min(deltaMs, 50)) / 1000);
      first = false;
      cur.w += (t.w - cur.w) * k;
      cur.o += (t.o - cur.o) * k;
      cur.bo += (t.bo - cur.bo) * k;
      // Pinned to the phone: right edge just over the phone's left edge,
      // feet level with the lower part of the phone. Follows it every frame.
      const vw = document.documentElement.clientWidth / 100;
      const wPx = cur.w * vw;
      const left = ph.cx - ph.w / 2 - wPx * 0.93;
      const bottom = window.innerHeight - (ph.cy + ph.h * 0.4);
      const intro = director.intro.v;
      const o = cur.o * Math.min(1, Math.max(0, (intro - 0.25) / 0.6));
      el.style.width = `${wPx.toFixed(1)}px`;
      el.style.transform = `translate3d(${left.toFixed(1)}px, ${(-bottom).toFixed(1)}px, 0)`;
      el.style.opacity = o.toFixed(3);
      el.style.visibility = o < 0.01 ? 'hidden' : 'visible';
      if (bubble.current) bubble.current.style.opacity = (cur.bo * o).toFixed(3);
    };
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, []);

  return (
    <div
      ref={box}
      className="pointer-events-none fixed bottom-0 left-0 z-[1] hidden will-change-transform min-[1200px]:block"
      style={{ width: '15.5vw', opacity: 0 }}
      aria-hidden="true"
    >
      <div ref={bubble} className="absolute -top-[40%] left-[2%] w-[96%]">
        <div className="float-chip relative rounded-[16px] border border-white bg-white/95 px-[1vw] py-[0.8vw] text-center shadow-[0_14px_30px_-14px_rgba(110,21,49,.4)]">
          <div className="flex items-center justify-center gap-1.5 text-[clamp(14px,1.18vw,20px)] font-extrabold text-acc">
            <svg width="1.1em" height="1.1em" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2l1.8 5.4L19 9l-5.2 1.6L12 16l-1.8-5.4L5 9l5.2-1.6zM19 14l.9 2.6L22 17.5l-2.1.9L19 21l-.9-2.6-2.1-.9 2.1-.9z" />
            </svg>
            Tally Connect AI
          </div>
          <div className="mt-0.5 text-[clamp(12px,0.95vw,16px)] font-bold leading-snug text-navy-3">
            Your Smart
            <br />
            Accounting Expert
          </div>
          <span className="absolute -bottom-[7px] left-1/2 h-3.5 w-3.5 -translate-x-1/2 rotate-45 border-b border-r border-white bg-white/95" />
        </div>
      </div>
      <div className="float-chip">
        <img
          src="/images/tc_ai_robot.webp"
          alt=""
          width={780}
          height={920}
          decoding="async"
          className="h-auto w-full drop-shadow-[0_24px_30px_rgba(110,21,49,.2)] [mask-image:linear-gradient(180deg,#000_86%,transparent_100%)]"
        />
      </div>
    </div>
  );
}
