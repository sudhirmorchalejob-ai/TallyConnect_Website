import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect, useRef, useState } from 'react';
import { director } from '../animations/phoneDirector';
import { SiteIcon } from '../components/Common/SiteIcon';
import { CssPhone } from '../components/Smartphone/CssPhone';
import { FEATURES, type Feature } from '../data/content';
import { scrollToY, useReveal } from '../hooks/useSmoothScroll';

function FeatureCopy({ f, i, anim = '', compact = false }: { f: Feature; i: number; anim?: string; compact?: boolean }) {
  return (
    <div>
      <div className={`${anim} flex items-center gap-3`}>
        <span className="ico-tile">
          <SiteIcon n={f.ic} />
        </span>
        <span className="kicker">
          {String(i + 1).padStart(2, '0')} · {f.kicker}
        </span>
      </div>
      <h3
        className={`${anim} ${compact ? 'mt-4 text-[26px] xl:text-[32px]' : 'mt-5 text-[30px] sm:text-[38px]'} font-extrabold leading-[1.1] tracking-[-0.02em]`}
      >
        {f.title}
      </h3>
      <p className={`${anim} ${compact ? 'mt-3 text-[15.5px] leading-[1.5] text-ink-2 xl:text-[17px]' : 'lead mt-4'}`}>{f.desc}</p>
      <ul className={compact ? 'mt-4 space-y-2' : 'mt-6 space-y-2.5'}>
        {f.points.map((p) => (
          <li key={p} className={`${anim} flex items-start gap-3 text-[15.5px] font-semibold text-ink`}>
            <span className="mt-0.5 grid h-6 w-6 flex-none place-items-center rounded-full bg-pos/10 text-pos">
              <SiteIcon n="check" size={14} stroke={2.6} />
            </span>
            {p}
          </li>
        ))}
      </ul>
      <p
        className={`${anim} ${compact ? 'mt-4 [@media(max-height:760px)]:hidden' : 'mt-6'} rounded-2xl border-l-4 border-acc bg-white/55 px-4 py-3 text-[15px] font-semibold text-ink-2`}
      >
        {f.benefit}
      </p>
    </div>
  );
}

function SectionHead({ compact = false }: { compact?: boolean }) {
  return (
    <>
      <p className="kicker">Feature showcase</p>
      <h2 className={compact ? 'mt-2 text-[26px] font-extrabold leading-[1.1] tracking-[-0.02em] xl:text-[30px]' : 'h-section mt-3'}>
        Built around the work you do every day.
      </h2>
    </>
  );
}

function Horizontal() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const n = FEATURES.length;

  useLayoutEffect(() => {
    let snapTimer = 0;
    const ctx = gsap.context(() => {
      const dist = () => track.current!.scrollWidth - window.innerWidth;
      const tween = gsap.to(track.current, {
        x: () => -dist(),
        ease: 'none',
        scrollTrigger: {
          id: 'features-pin',
          trigger: section.current,
          start: 'top top',
          end: () => `+=${dist() * 1.15}`,
          pin: true,
          scrub: 0.7,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress * (n - 1);
            // Settle on the nearest feature once scrolling stops.
            window.clearTimeout(snapTimer);
            snapTimer = window.setTimeout(() => {
              if (!self.isActive) return;
              const q = self.progress * (n - 1);
              const to = Math.round(q);
              if (Math.abs(q - to) < 0.015) return;
              scrollToY(self.start + ((self.end - self.start) * to) / (n - 1), 0.7);
            }, 160);
            const idx = Math.min(n - 1, Math.round(p));
            const frac = p - Math.floor(p);
            const k = Math.sin(frac * Math.PI);
            director.sway.ry = -k * 0.42;
            director.sway.x = k * 0.025;
            director.sway.s = -k * 0.06;
            const f = FEATURES[idx]!;
            director.setOverride({ screen: f.screen, params: f.params });
            setActive(idx);
          },
          onToggle: (self) => {
            if (!self.isActive) {
              director.sway.ry = director.sway.x = director.sway.s = 0;
              director.setOverride(null);
            }
          },
        },
      });
      // Big numbers drift slower than their panels (parallax).
      gsap.utils.toArray<HTMLElement>('.feat-num').forEach((el) => {
        gsap.fromTo(
          el,
          { xPercent: 35 },
          { xPercent: -35, ease: 'none', scrollTrigger: { trigger: el.parentElement, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true } },
        );
      });
      gsap.utils.toArray<HTMLElement>('.feat-panel').forEach((panel, i) => {
        // Outgoing card fades before it can slide across the phone.
        if (i < n - 1) {
          gsap.to(panel.querySelector('.glass-card'), {
            opacity: 0,
            x: -40,
            ease: 'none',
            scrollTrigger: { trigger: panel, containerAnimation: tween, start: 'left left', end: 'left -16%', scrub: true },
          });
        }
        if (i === 0) return;
        gsap.from(panel.querySelectorAll('.feat-anim'), {
          y: 36,
          opacity: 0,
          duration: 0.7,
          stagger: 0.06,
          ease: 'power3.out',
          scrollTrigger: { trigger: panel, containerAnimation: tween, start: 'left 62%', toggleActions: 'play none none reverse' },
        });
      });
      gsap.to('.feat-orb-a', { xPercent: -60, ease: 'none', scrollTrigger: { trigger: section.current, start: 'top top', end: () => `+=${dist() * 1.15}`, scrub: true } });
      gsap.to('.feat-orb-b', { xPercent: 50, yPercent: -30, ease: 'none', scrollTrigger: { trigger: section.current, start: 'top top', end: () => `+=${dist() * 1.15}`, scrub: true } });
    }, section);
    return () => {
      window.clearTimeout(snapTimer);
      ctx.revert();
      director.setOverride(null);
    };
  }, [n]);

  const jump = (i: number) => {
    const st = ScrollTrigger.getById('features-pin');
    if (!st) return;
    scrollToY(st.start + ((st.end - st.start) * i) / (n - 1) + 1, 1.2);
  };

  return (
    <section ref={section} id="features" className="relative h-[100vh] overflow-hidden" aria-label="Feature showcase">
      <div className="feat-orb-a bg-orb right-[-10%] top-[10%] h-[40vw] w-[40vw] bg-[#dcccf5]" />
      <div className="feat-orb-b bg-orb bottom-[-20%] left-[30%] h-[34vw] w-[34vw] bg-[#f0d3df]" />
      <div className="absolute left-[50%] right-6 top-[92px] z-[2] max-w-[600px]">
        <SectionHead compact />
      </div>
      <div ref={track} className="relative flex h-full will-change-transform" style={{ width: `${n * 100}vw` }}>
        {FEATURES.map((f, i) => (
          <article key={f.id} className="feat-panel relative flex h-full w-[100vw] flex-none items-center" aria-label={f.kicker}>
            <span className="feat-num pointer-events-none absolute bottom-[4%] left-[37%] select-none text-[24vh] font-extrabold leading-none text-transparent [-webkit-text-stroke:2px_rgba(140,29,63,.16)]" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="absolute bottom-[72px] left-[50%] top-[178px] flex w-[min(560px,42vw)] items-center xl:top-[190px]">
              <div className="glass-card w-full p-6 xl:p-7">
                <FeatureCopy f={f} i={i} anim="feat-anim" compact />
              </div>
            </div>
          </article>
        ))}
      </div>
      <nav className="absolute bottom-7 left-[50%] z-[3] flex items-center gap-2" aria-label="Features">
        {FEATURES.map((f, i) => (
          <button
            type="button"
            key={f.id}
            onClick={() => jump(i)}
            aria-label={f.kicker}
            aria-current={i === active}
            className={`h-2.5 rounded-full transition-all duration-300 ${i === active ? 'w-9 bg-acc' : 'w-2.5 bg-navy/20 hover:bg-navy/40'}`}
          />
        ))}
        <span className="ml-3 text-[13px] font-bold text-ink-3">{FEATURES[active]!.kicker}</span>
      </nav>
    </section>
  );
}

function Stacked() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  return (
    <section ref={ref} id="features" className="section">
      <div className="wrap">
        <div className="reveal max-w-[640px]">
          <SectionHead />
        </div>
        <div className="mt-14 space-y-20">
          {FEATURES.map((f, i) => (
            <article key={f.id} className={`grid items-center gap-10 md:grid-cols-2 ${i % 2 ? 'md:[&>*:first-child]:order-2' : ''}`}>
              <div className="flex justify-center">
                <CssPhone width={250} app={{ screen: f.screen, params: f.params }} label={`${f.kicker} screen with sample data`} />
              </div>
              <div className="reveal">
                <FeatureCopy f={f} i={i} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Features({ full }: { full: boolean }) {
  return full ? <Horizontal /> : <Stacked />;
}
