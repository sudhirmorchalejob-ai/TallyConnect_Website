import { useState } from 'react';
import { DEMO_COMPANY, FIN_TILES, ITEMS, PARTIES, PL_DEMO, REPORTS, REP_TABS, SUMS, VOUCHERS, inr, type RepCat } from '../data';
import { useApp } from '../store';
import { BackNav, Chips, Glass, Icon, Ico, NavRow, Sec, Seg } from '../ui';

export function ReportsScreen() {
  const { go, say } = useApp();
  const [period, setPeriod] = useState<'month' | 'week' | 'today'>('month');
  const [tab, setTab] = useState<RepCat>('fin');
  const factor = period === 'month' ? 1 : period === 'week' ? 0.31 : 0.06;
  return (
    <div className="scr wt" data-lenis-prevent>
      <NavRow>
        <button type="button" aria-label="Report list PDF" className="cbtn glass tap" onClick={() => say('Report list PDF ready')}>
          <Icon n="file" />
        </button>
        <button type="button" aria-label="Refresh" className="cbtn glass tap" onClick={() => say('Up to date · synced just now')}>
          <Icon n="sync" />
        </button>
      </NavRow>
      <h1 className="h1">Reports</h1>
      <p className="sub">Easy views of your Tally data · {DEMO_COMPANY.name}</p>
      <Seg items={[['month', 'This month'], ['week', 'Last 7 days'], ['today', 'Today']]} value={period} onChange={setPeriod} />
      <Glass style={{ padding: 16 }}>
        <span className="badge info" style={{ marginBottom: 10 }}>{period === 'month' ? 'Sep 2026' : period === 'week' ? '20–26 Sep 2026' : '26 Sep 2026'}</span>
        <div className="two">
          {(['sales', 'purch', 'mIn', 'mOut'] as const).map((k) => (
            <div key={k}>
              <div className="rs" style={{ marginTop: 0 }}>{SUMS[k].t}</div>
              <div className="amt" style={{ textAlign: 'left', fontSize: 19 }}>{inr(SUMS[k].amt * factor)}</div>
            </div>
          ))}
        </div>
      </Glass>
      <div style={{ marginTop: 14 }}>
        <Chips items={REP_TABS} value={tab} onChange={setTab} />
      </div>
      <div className="two">
        {tab === 'fin'
          ? FIN_TILES.map((r) => (
              <Glass key={r.id} onClick={() => (r.id === 'pl' ? go('finReport') : say(`${r.t} opens with Tally's own figures`))} style={{ padding: 14, minHeight: 140, textAlign: 'left' }}>
                <Ico n={r.ic} size="sm" />
                <div className="rt" style={{ marginTop: 12 }}>{r.t}</div>
                <div className="rs">{r.s}</div>
              </Glass>
            ))
          : REPORTS.filter((r) => r.cat === tab).map((r) => (
              <Glass key={r.id} onClick={() => go('report', { id: r.id })} style={{ padding: 14, minHeight: 150, textAlign: 'left' }}>
                <Ico n={r.ic} size="sm" />
                <div className="rt" style={{ marginTop: 12 }}>{r.t}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--acc)', marginTop: 2 }}>{r.v}</div>
                <div className="rs">{r.s}</div>
              </Glass>
            ))}
      </div>
    </div>
  );
}

function reportRows(id: string): { t: string; v: number }[] {
  switch (id) {
    case 'top':
      return PARTIES.filter((p) => p.type === 'c' && p.bal).slice(0, 5).map((p) => ({ t: p.name, v: p.bal }));
    case 'stock':
      return ITEMS.map((i) => ({ t: i.name, v: i.stock * i.rate })).sort((a, b) => b.v - a.v).slice(0, 6);
    case 'inI':
      return ITEMS.filter((i) => i.st === 'out').map((i) => ({ t: i.name, v: 0 }));
    case 'inC':
      return [
        { t: 'Rajesh Hardware', v: 0 },
        { t: 'Laxmi Traders', v: 0 },
      ];
    case 'exp':
      return [
        { t: 'Rent A/c', v: 35000 },
        { t: 'Depreciation A/c', v: 24500 },
      ];
    case 'preg':
      return VOUCHERS.filter((v) => v.k === 'purchase').map((v) => ({ t: `${v.no} · ${v.party}`, v: v.amt }));
    case 'day':
      return VOUCHERS.slice().sort((a, b) => b.day - a.day).slice(0, 8).map((v) => ({ t: `${v.day} Sep · ${v.no}`, v: v.amt }));
    default:
      return VOUCHERS.filter((v) => v.k === 'sales').map((v) => ({ t: `${v.no} · ${v.party}`, v: v.amt }));
  }
}

export function ReportScreen() {
  const { s, say } = useApp();
  const r = REPORTS.find((x) => x.id === s.params.id) ?? REPORTS[0]!;
  const rows = reportRows(r.id);
  const max = Math.max(1, ...rows.map((x) => x.v));
  const total = rows.reduce((a, x) => a + x.v, 0);
  const [chart, setChart] = useState<'bar' | 'list'>('bar');
  return (
    <div className="scr" data-lenis-prevent>
      <BackNav>
        <button type="button" aria-label="Download PDF" className="cbtn glass tap" onClick={() => say('PDF saved to Downloads')}>
          <Icon n="download" />
        </button>
        <button type="button" aria-label="Share" className="cbtn glass tap" onClick={() => say('Report shared')}>
          <Icon n="share" />
        </button>
      </BackNav>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', margin: '0 2px 16px' }}>
        <Ico n={r.ic} />
        <div>
          <div className="h1" style={{ fontSize: 28, margin: 0 }}>{r.t}</div>
          <div className="rs">{r.s} · Sep 2026</div>
        </div>
      </div>
      {total > 0 && (
        <>
          <Seg items={[['bar', 'Chart'], ['list', 'List only']]} value={chart} onChange={setChart} />
          {chart === 'bar' && (
            <Glass style={{ padding: '18px 14px 14px' }}>
              <div className="bars">
                {rows.slice(0, 6).map((x, i) => (
                  <div className="b" key={x.t}>
                    <i style={{ height: `${Math.max(4, (x.v / max) * 100)}%`, animationDelay: `${i * 60}ms` }} />
                    <span className="ell" style={{ maxWidth: 48 }}>{x.t.split(/[ ·]/)[0]}</span>
                  </div>
                ))}
              </div>
            </Glass>
          )}
        </>
      )}
      <Glass className="row" style={{ marginTop: 12, minHeight: 56 }}>
        <span className="rs grow" style={{ marginTop: 0 }}>Total</span>
        <span className="amt">{total ? inr(total) : `${rows.length} found`}</span>
      </Glass>
      <Glass className="list" style={{ marginTop: 12 }}>
        {rows.map((x, i) => (
          <div className="row" key={x.t} style={{ minHeight: 56 }}>
            <span className="av" style={{ width: 30, height: 30, fontSize: 13 }}>{i + 1}</span>
            <div className="grow rt ell" style={{ fontSize: 15 }}>{x.t}</div>
            <div className="amt">{x.v ? inr(x.v) : '—'}</div>
          </div>
        ))}
      </Glass>
    </div>
  );
}

export function FinReportScreen() {
  const { say } = useApp();
  const inc = PL_DEMO.income.reduce((a, x) => a + x.v, 0);
  const exp = PL_DEMO.expenses.reduce((a, x) => a + x.v, 0);
  return (
    <div className="scr" data-lenis-prevent>
      <BackNav>
        <button type="button" aria-label="Share on WhatsApp" className="cbtn glass tap" onClick={() => say('Profit & Loss PDF ready on WhatsApp')}>
          <Icon n="whatsapp" />
        </button>
      </BackNav>
      <h1 className="h1" style={{ fontSize: 30 }}>Profit &amp; Loss</h1>
      <p className="sub">1–30 Sep 2026 · sample figures</p>
      <div className="three">
        {[
          ['Income', inc, ''],
          ['Expenses', exp, ''],
          ['Net profit', inc - exp, 'in'],
        ].map(([t, v, c]) => (
          <Glass key={t as string} style={{ padding: '12px 10px' }}>
            <div className="rs" style={{ marginTop: 0, fontSize: 12 }}>{t}</div>
            <div className={`amt ${c}`} style={{ textAlign: 'left', fontSize: 15 }}>{inr(v as number)}</div>
          </Glass>
        ))}
      </div>
      <Sec>Income</Sec>
      <Glass style={{ padding: '4px 0' }}>
        {PL_DEMO.income.map((x) => (
          <div className="kv" key={x.t}><span className="k">{x.t}</span><span className="v">{inr(x.v)}</span></div>
        ))}
      </Glass>
      <Sec>Expenses</Sec>
      <Glass style={{ padding: '4px 0' }}>
        {PL_DEMO.expenses.map((x) => (
          <div className="kv" key={x.t}><span className="k">{x.t}</span><span className="v">{inr(x.v)}</span></div>
        ))}
        <div className="kv strong"><span className="k">Net profit</span><span className="v" style={{ color: 'var(--pos)' }}>{inr(inc - exp)}</span></div>
      </Glass>
    </div>
  );
}
