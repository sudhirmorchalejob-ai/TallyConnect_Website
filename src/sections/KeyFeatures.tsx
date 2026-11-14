// Key selling points, given strong visual emphasis: a dark spotlight for
// Tally Connect AI, then a bento grid of the other headline features.
import { useRef, type CSSProperties, type ReactNode } from 'react';
import { SiteIcon } from '../components/Common/SiteIcon';
import { KEY_FEATURES, KEY_REPORTS, LANGUAGE_NAMES, type KeyFeature } from '../data/content';
import { useReveal } from '../hooks/useSmoothScroll';

const AI_POINTS = [
  { ic: 'spark', t: 'AI-powered business assistance', d: 'Ask about sales, dues or stock in plain words.' },
  { ic: 'chart', t: 'Intelligent insights', d: 'Trends and the numbers behind them, explained.' },
  { ic: 'search', t: 'Simplified access to information', d: 'No menus to dig through — just ask.' },
] as const;

function Check() {
  return <SiteIcon n="check" size={16} stroke={2.6} className="mt-[3px] text-acc" />;
}

/** Sample chat in the AI spotlight (illustrative, using the demo company's figures). */
function AiChat() {
  return (
    <div className="relative mx-auto w-full max-w-[440px]" aria-label="Sample Tally Connect AI conversation">
      <div className="absolute -inset-6 rounded-[40px] bg-[radial-gradient(closest-side,rgba(232,93,140,.35),transparent)] blur-2xl" aria-hidden="true" />
      <div className="relative rounded-[26px] border border-white/15 bg-white/[.07] p-4 shadow-[0_30px_60px_-30px_rgba(0,0,0,.7)] backdrop-blur-xl sm:p-5">
        <div className="flex items-center gap-2.5 border-b border-white/10 pb-3">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-[#ff7aa8] to-[#a8264f] text-white shadow-[0_0_20px_rgba(255,122,168,.6)]">
            <SiteIcon n="spark" size={18} stroke={2.2} />
          </span>
          <div className="leading-tight">
            <p className="text-[14.5px] font-extrabold text-white">Tally Connect AI</p>
            <p className="flex items-center gap-1.5 text-[12px] font-semibold text-white/60">
              <span className="h-1.5 w-1.5 rounded-full bg-[#4ade80]" /> Ready to help
            </p>
          </div>
          <span className="ml-auto rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-bold text-white/70">Sample chat</span>
        </div>
        <div className="space-y-3 pt-4 text-[14px] leading-snug">
          <p className="ml-auto w-fit max-w-[85%] rounded-[18px] rounded-br-[6px] bg-gradient-to-b from-acc-2 to-acc-3 px-4 py-2.5 font-semibold text-white">
            How are sales this month?
          </p>
          <div className="w-fit max-w-[92%] rounded-[18px] rounded-bl-[6px] bg-white px-4 py-3 text-navy-3">
            <p className="font-semibold">
              Sales so far are <b className="text-acc">₹31.2 L</b>, up <b>12%</b> on last month.
            </p>
            <div className="mt-2.5 flex h-12 items-end gap-1.5" aria-hidden="true">
              {[38, 52, 44, 63, 58, 74, 90].map((h, i) => (
                <span key={i} className="flex-1 rounded-t-[4px] bg-gradient-to-t from-acc/25 to-acc/70" style={{ height: `${h}%` }} />
              ))}
            </div>
            <p className="mt-2 text-[12.5px] text-ink-2">Top customer: Shree Balaji Traders</p>
          </div>
          <p className="ml-auto w-fit max-w-[85%] rounded-[18px] rounded-br-[6px] bg-gradient-to-b from-acc-2 to-acc-3 px-4 py-2.5 font-semibold text-white">
            Who owes me the most?
          </p>
          <div className="flex w-fit items-center gap-1.5 rounded-[18px] rounded-bl-[6px] bg-white/90 px-4 py-3" aria-hidden="true">
            {[0, 1, 2].map((i) => (
              <span key={i} className="h-2 w-2 animate-bounce rounded-full bg-acc/60" style={{ animationDelay: `${i * 0.15}s` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AiSpotlight() {
  return (
    <article className="reveal relative overflow-hidden rounded-[32px] bg-[linear-gradient(135deg,#1b2d5b_0%,#2a1645_45%,#6e1531_100%)] p-6 text-white shadow-[0_40px_80px_-40px_rgba(42,22,69,.8)] sm:p-10 lg:p-12">
      {/* glow + grid texture */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#ff5c93]/30 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-32 left-10 h-80 w-80 rounded-full bg-[#5b7bff]/25 blur-3xl" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[.08] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:36px_36px]"
        aria-hidden="true"
      />
      <div className="relative grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[12.5px] font-extrabold uppercase tracking-[0.1em] text-white">
            <SiteIcon n="spark" size={15} stroke={2.4} className="text-[#ffb3cc]" /> Featured
          </p>
          <h3 className="mt-5 text-[34px] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[46px] lg:text-[54px]">
            Tally Connect <span className="bg-gradient-to-r from-[#ff9cc0] via-[#ffd1e1] to-[#a9b8ff] bg-clip-text text-transparent">AI</span>
          </h3>
          <p className="mt-4 max-w-[520px] text-[16.5px] leading-relaxed text-white/80 sm:text-[18px]">
            Your business assistant built into Tally Connect. Ask about your company in plain words; answers come from the Tally data your login is allowed to
            see.
          </p>
          <ul className="mt-7 grid gap-3">
            {AI_POINTS.map((p) => (
              <li key={p.t} className="flex items-start gap-3.5 rounded-[18px] border border-white/10 bg-white/[.06] p-3.5">
                <span className="grid h-10 w-10 flex-none place-items-center rounded-[12px] bg-white/10 text-[#ffb3cc]">
                  <SiteIcon n={p.ic} size={20} />
                </span>
                <span>
                  <span className="block text-[15.5px] font-extrabold">{p.t}</span>
                  <span className="block text-[14px] text-white/70">{p.d}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <AiChat />
      </div>
    </article>
  );
}

/** One feature card. `wide` cards span two columns on large screens. */
function Card({ f, wide = false, children }: { f: KeyFeature; wide?: boolean; children?: ReactNode }) {
  return (
    <article
      className={`reveal group glass-card relative overflow-hidden p-6 transition-transform duration-300 hover:-translate-y-1 sm:p-7 ${wide ? 'lg:col-span-2' : ''}`}
    >
      <span
        className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-acc/10 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden="true"
      />
      <div className="relative flex items-start gap-4">
        <span className="grid h-14 w-14 flex-none place-items-center rounded-[18px] bg-gradient-to-b from-acc-2 to-acc-3 text-white shadow-[0_14px_24px_-12px_rgba(110,21,49,.7)]">
          <SiteIcon n={f.ic} size={26} stroke={2} />
        </span>
        <div className="min-w-0">
          <p className="text-[11.5px] font-extrabold uppercase tracking-[0.1em] text-acc">Key feature</p>
          <h3 className="mt-1 text-[20px] font-extrabold leading-snug tracking-[-0.01em] text-navy-3 sm:text-[22px]">{f.t}</h3>
        </div>
      </div>
      <ul className="relative mt-5 space-y-2.5">
        {f.points.map((p) => (
          <li key={p} className="flex gap-2.5 text-[15px] leading-snug text-ink-2">
            <Check />
            {p}
          </li>
        ))}
      </ul>
      {children && <div className="relative mt-5">{children}</div>}
    </article>
  );
}

const byId = (id: string) => KEY_FEATURES.find((f) => f.id === id)!;

export function KeyFeatures() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  return (
    <section ref={ref} id="highlights" className="section">
      <div className="wrap">
        <div className="mx-auto max-w-[760px] text-center">
          <p className="kicker reveal">Key features</p>
          <h2 className="h-section reveal mt-3">
            Your whole business, <span className="text-acc">in one app.</span>
          </h2>
          <p className="lead reveal mx-auto mt-4 max-w-[600px]">
            AI assistance, every Tally entry, complete reports, your sales team and their attendance — on your phone and in your browser.
          </p>
        </div>

        <div className="mt-12">
          <AiSpotlight />
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-3">
          <Card f={byId('access')} wide>
            <div className="flex flex-wrap gap-2">
              {['TallyPrime data', 'Sales & dues', 'Stock', 'Reports', 'Anywhere, anytime'].map((t) => (
                <span key={t} className="rounded-full border border-acc/15 bg-white/80 px-3 py-1 text-[13px] font-bold text-navy-3">
                  {t}
                </span>
              ))}
            </div>
          </Card>
          <Card f={byId('create')}>
            <div className="grid grid-cols-2 gap-2">
              {[
                ['phone', 'Mobile app'],
                ['laptop', 'Web browser'],
              ].map(([ic, t]) => (
                <span key={t} className="flex items-center justify-center gap-2 rounded-[14px] bg-acc/[.07] py-2.5 text-[13.5px] font-extrabold text-acc">
                  <SiteIcon n={ic as 'phone'} size={17} /> {t}
                </span>
              ))}
            </div>
          </Card>
          <Card f={byId('reports')} wide>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {KEY_REPORTS.map((r) => (
                <span
                  key={r}
                  className="flex items-center gap-2 rounded-[14px] border border-white bg-white/85 px-3 py-2.5 text-[13.5px] font-bold text-navy-3 shadow-[0_6px_14px_-10px_rgba(27,45,91,.35)]"
                >
                  <SiteIcon n="file" size={16} className="text-acc" /> {r}
                </span>
              ))}
            </div>
          </Card>
          <Card f={byId('languages')}>
            <div className="grid grid-cols-2 gap-2">
              {LANGUAGE_NAMES.map((l) => (
                <span
                  key={l.en}
                  className="rounded-[14px] bg-gradient-to-b from-white to-[#fdf1f6] px-3 py-2.5 text-center shadow-[0_6px_14px_-10px_rgba(110,21,49,.35)]"
                >
                  <span className="block text-[18px] font-extrabold leading-tight text-acc" lang={l.en === 'English' ? 'en' : undefined}>
                    {l.n}
                  </span>
                  <span className="block text-[11.5px] font-bold uppercase tracking-wider text-ink-2/70">{l.en}</span>
                </span>
              ))}
            </div>
          </Card>
          <Card f={byId('attendance')} />
          <Card f={byId('team')} />
          <Card f={byId('orders')} />
        </div>
      </div>
    </section>
  );
}

/** Scrolling ribbon of the headline features, under the hero. */
export function KeyFeatureRibbon({ className = '', style }: { className?: string; style?: CSSProperties }) {
  const items = [{ ic: 'spark' as const, short: 'Tally Connect AI' }, ...KEY_FEATURES];
  const row = (hidden: boolean) => (
    <ul className="flex flex-none items-center gap-3 pr-3" aria-hidden={hidden || undefined}>
      {items.map((f) => (
        <li
          key={f.short}
          className={`flex flex-none items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2 text-[14px] font-extrabold shadow-[0_8px_20px_-14px_rgba(110,21,49,.45)] ${
            f.short === 'Tally Connect AI'
              ? 'border-transparent bg-gradient-to-r from-[#1b2d5b] to-[#6e1531] text-white'
              : 'border-white bg-white/90 text-navy-3'
          }`}
        >
          <SiteIcon n={f.ic} size={17} stroke={2.1} className={f.short === 'Tally Connect AI' ? 'text-[#ffb3cc]' : 'text-acc'} />
          {f.short}
        </li>
      ))}
    </ul>
  );
  return (
    <div className={`ribbon-mask overflow-hidden ${className}`} style={style}>
      <div className="ribbon-track flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
