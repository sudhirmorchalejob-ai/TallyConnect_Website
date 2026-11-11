import { useMemo, useState } from 'react';
import { KINDS, PAYABLES, RECEIVABLES, VOUCHERS, inr, type Bill, type KindKey } from '../data';
import { useApp } from '../store';
import { BackNav, Badge, Chev, Chips, Glass, Icon, Ico, NavRow, Sec, Seg } from '../ui';

type VF = 'all' | KindKey;
const VF_ITEMS: [VF, string][] = [
  ['all', 'All'],
  ['sales', 'Sales'],
  ['purchase', 'Purchase'],
  ['receipt', 'Receipt'],
  ['payment', 'Payment'],
  ['journal', 'Journal'],
  ['contra', 'Contra'],
];

export function VoucherListScreen() {
  const { s, go } = useApp();
  const [f, setF] = useState<VF>((s.params.vFilter as VF) ?? 'all');
  const [q, setQ] = useState('');
  const [period, setPeriod] = useState<'month' | 'week'>('month');
  const rows = useMemo(
    () =>
      VOUCHERS.filter((v) => (f === 'all' || v.k === f) && (period === 'month' || v.day >= 20))
        .filter((v) => !q || `${v.party} ${v.no}`.toLowerCase().includes(q.toLowerCase()))
        .sort((a, b) => b.day - a.day),
    [f, q, period],
  );
  const total = rows.reduce((a, v) => a + v.amt, 0);
  return (
    <div className="scr wt" data-lenis-prevent>
      <BackNav />
      <h1 className="h1">Vouchers</h1>
      <p className="sub">Every entry from Tally · {rows.length} shown</p>
      <Seg items={[['month', 'This month'], ['week', 'Last 7 days']]} value={period} onChange={setPeriod} />
      <div className="inp" style={{ marginBottom: 12 }}>
        <Icon n="search" size="s" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search party or number" aria-label="Search vouchers" />
        {q && (
          <button type="button" aria-label="Clear" onClick={() => setQ('')}>
            <Icon n="close" size="s" />
          </button>
        )}
      </div>
      <Chips items={VF_ITEMS} value={f} onChange={setF} />
      <Glass className="row" style={{ marginBottom: 10, minHeight: 54 }}>
        <span className="rs grow" style={{ marginTop: 0 }}>Total of {rows.length} entries</span>
        <span className="amt">{inr(total)}</span>
      </Glass>
      <Glass className="list">
        {rows.map((v) => {
          const k = KINDS[v.k];
          return (
            <button type="button" key={v.no} className="row tap" onClick={() => go('entryDetail', { no: v.no })}>
              <Ico n={k.ic} size="xs" />
              <div className="grow">
                <div className="rt ell">{v.party}</div>
                <div className="rs">
                  {k.t} · {v.no} · {v.day} Sep
                </div>
              </div>
              <div className={`amt ${k.sign > 0 ? 'in' : k.sign < 0 ? 'out' : ''}`}>{inr(v.amt)}</div>
            </button>
          );
        })}
        {!rows.length && <div className="row rs">No entries match.</div>}
      </Glass>
    </div>
  );
}

const SALES9 = [
  { n: 'Polycab FR Wire 1.0 sq mm (90 m)', hsn: '8544', q: '30 coil', r: '₹1,600', a: 48000 },
  { n: 'Havells MCB 32A DP', hsn: '8536', q: '40 pcs', r: '₹620', a: 24800 },
  { n: 'Polycab LED Panel 18W', hsn: '9405', q: '42 pcs', r: '₹528.57', a: 22200 },
];

export function EntryDetailScreen() {
  const { s, say } = useApp();
  const v = VOUCHERS.find((x) => x.no === s.params.no) ?? VOUCHERS[1]!;
  const k = KINDS[v.k];
  const showLines = v.no === 'Sales 9';
  return (
    <div className="scr" data-lenis-prevent>
      <BackNav>
        <button type="button" aria-label="Preview PDF" className="cbtn glass tap" onClick={() => say('PDF preview opened')}>
          <Icon n="file" />
        </button>
        <button type="button" aria-label="Share" className="cbtn glass tap" onClick={() => say('Share sheet opened with the PDF')}>
          <Icon n="share" />
        </button>
      </BackNav>
      <div className="hero">
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <span className="ico">
            <Icon n={k.ic} />
          </span>
          <div className="grow">
            <div className="rs">
              {k.long} · {v.no}
            </div>
            <div className="amt big" style={{ textAlign: 'left', color: '#fff' }}>{inr(v.amt)}</div>
            <div className="rs">{v.party} · {v.day} Sep 2026</div>
          </div>
        </div>
      </div>
      <Glass className="row" style={{ marginTop: 12, color: 'var(--pos)', minHeight: 54 }}>
        <Icon n="check" />
        <div className="rt">In Tally · synced by the Agent</div>
      </Glass>
      <Sec>Details</Sec>
      <Glass style={{ padding: '4px 0' }}>
        <div className="kv"><span className="k">Party</span><span className="v">{v.party}</span></div>
        <div className="kv"><span className="k">Date</span><span className="v">{v.day} Sep 2026</span></div>
        <div className="kv"><span className="k">Voucher type</span><span className="v">{k.long}</span></div>
      </Glass>
      {showLines && (
        <>
          <Sec>Items</Sec>
          <Glass style={{ padding: '4px 0' }}>
            {SALES9.map((l) => (
              <div className="kv" key={l.n} style={{ alignItems: 'flex-start' }}>
                <span className="k">
                  <span style={{ color: 'var(--ink)', fontWeight: 700 }}>{l.n}</span>
                  <br />
                  <span style={{ fontSize: 13 }}>HSN {l.hsn} · {l.q} × {l.r}</span>
                </span>
                <span className="v">{inr(l.a)}</span>
              </div>
            ))}
            <div className="kv"><span className="k">Taxable value</span><span className="v">{inr(95000)}</span></div>
            <div className="kv"><span className="k">CGST 9%</span><span className="v">{inr(8550)}</span></div>
            <div className="kv"><span className="k">SGST 9%</span><span className="v">{inr(8550)}</span></div>
            <div className="kv strong"><span className="k">Bill total</span><span className="v">{inr(112100)}</span></div>
          </Glass>
        </>
      )}
      <div className="two" style={{ marginTop: 16 }}>
        <button type="button" className="btn btn-g glass tap" onClick={() => say('PDF saved to Downloads')}>
          <Icon n="download" size="s" /> PDF
        </button>
        <button type="button" className="btn btn-p tap" onClick={() => say('Opening WhatsApp with the bill…')}>
          <Icon n="whatsapp" size="s" /> Share
        </button>
      </div>
    </div>
  );
}

const statusBadge = (b: Bill) =>
  b.st === 'late' ? <Badge kind="bad">{b.dueText}</Badge> : b.st === 'soon' ? <Badge kind="warn">{b.dueText}</Badge> : <Badge kind="ok">{b.dueText}</Badge>;

export function OutHubScreen() {
  const { go } = useApp();
  const sum = (b: Bill[]) => b.reduce((a, x) => a + x.amt, 0);
  const late = (b: Bill[]) => sum(b.filter((x) => x.st === 'late'));
  return (
    <div className="scr wt" data-lenis-prevent>
      <NavRow>
        <button type="button" aria-label="Share list" className="cbtn glass tap" onClick={() => go('outList', { outKind: 'recv' })}>
          <Icon n="whatsapp" />
        </button>
      </NavRow>
      <h1 className="h1">Outstanding</h1>
      <p className="sub">Money due · as on 26 Sep 2026</p>
      <div className="two">
        {(
          [
            ['recv', 'Receivable', 'Customers owe you', RECEIVABLES, 'in'],
            ['pay', 'Payable', 'You owe suppliers', PAYABLES, 'out'],
          ] as const
        ).map(([k, t, sub, list, ic]) => (
          <Glass key={k} onClick={() => go('outList', { outKind: k })} style={{ padding: 14, textAlign: 'left' }}>
            <Ico n={ic} size="xs" />
            <div className="rt" style={{ marginTop: 10 }}>{t}</div>
            <div className={`amt ${ic}`} style={{ textAlign: 'left', fontSize: 21 }}>{inr(sum(list))}</div>
            <div className="rs">{sub}</div>
            <div className="rs" style={{ color: 'var(--neg)', fontWeight: 700 }}>{inr(late(list))} late</div>
          </Glass>
        ))}
      </div>
      <Sec>Receivable by age</Sec>
      <Glass style={{ padding: 16 }}>
        {[
          ['On time', 234820, 'var(--pos)'],
          ['1–30 days late', 113870, 'var(--warn)'],
        ].map(([t, v, c]) => (
          <div key={t as string} style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14.5, fontWeight: 700, marginBottom: 6 }}>
              <span>{t}</span>
              <span>{inr(v as number)}</span>
            </div>
            <div className="meter"><i style={{ width: `${((v as number) / 348690) * 100}%`, background: c as string }} /></div>
          </div>
        ))}
      </Glass>
      <Sec>Late first</Sec>
      <Glass className="list">
        {[...RECEIVABLES]
          .sort((a, b) => (a.st === 'late' ? -1 : 1) - (b.st === 'late' ? -1 : 1))
          .slice(0, 4)
          .map((b) => (
            <button type="button" className="row tap" key={b.no} onClick={() => go('billDetail', { no: b.no })}>
              <div className="grow">
                <div className="rt ell">{b.party}</div>
                <div className="rs">{b.no} · {b.city}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div className="amt">{inr(b.amt)}</div>
                {statusBadge(b)}
              </div>
            </button>
          ))}
      </Glass>
    </div>
  );
}

export function OutListScreen() {
  const { s, go, say } = useApp();
  const [kind, setKind] = useState<'recv' | 'pay'>((s.params.outKind as 'recv' | 'pay') ?? 'recv');
  const [f, setF] = useState<'all' | 'late' | 'soon'>('all');
  const list = (kind === 'recv' ? RECEIVABLES : PAYABLES).filter((b) => f === 'all' || b.st === f);
  return (
    <div className="scr wt" data-lenis-prevent>
      <BackNav>
        <button type="button" aria-label="Send reminders" className="cbtn glass tap" onClick={() => say('WhatsApp reminders ready for the late customers')}>
          <Icon n="whatsapp" />
        </button>
      </BackNav>
      <h1 className="h1">{kind === 'recv' ? 'Receivable' : 'Payable'}</h1>
      <p className="sub">{kind === 'recv' ? 'Customers owe you' : 'You owe suppliers'}</p>
      <Seg items={[['recv', 'Receivable'], ['pay', 'Payable']]} value={kind} onChange={setKind} />
      <Chips items={[['all', 'All'], ['late', 'Late'], ['soon', 'Due soon']]} value={f} onChange={setF} />
      <Glass className="list">
        {list.map((b) => (
          <button type="button" className="row tap" key={b.no} onClick={() => go('billDetail', { no: b.no })}>
            <div className="grow">
              <div className="rt ell">{b.party}</div>
              <div className="rs">{b.no} · due {b.due}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="amt">{inr(b.amt)}</div>
              {statusBadge(b)}
            </div>
          </button>
        ))}
        {!list.length && <div className="row rs">Nothing here.</div>}
      </Glass>
    </div>
  );
}

export function BillDetailScreen() {
  const { s, say } = useApp();
  const b = [...RECEIVABLES, ...PAYABLES].find((x) => x.no === s.params.no) ?? RECEIVABLES[0]!;
  const recv = RECEIVABLES.includes(b);
  return (
    <div className="scr" data-lenis-prevent>
      <BackNav />
      <h1 className="h1" style={{ fontSize: 28 }}>{b.party}</h1>
      <p className="sub">{b.no} · {b.city}</p>
      <Glass style={{ padding: 18 }}>
        <div className="rs" style={{ marginTop: 0 }}>{recv ? 'Still to get' : 'Still to pay'}</div>
        <div className={`amt big ${recv ? 'in' : 'out'}`} style={{ textAlign: 'left' }}>{inr(b.amt)}</div>
        <div style={{ marginTop: 8 }}>{statusBadge(b)}</div>
      </Glass>
      <Sec>Bill</Sec>
      <Glass style={{ padding: '4px 0' }}>
        <div className="kv"><span className="k">Bill date</span><span className="v">{b.date}</span></div>
        <div className="kv"><span className="k">Due date</span><span className="v">{b.due}</span></div>
        <div className="kv"><span className="k">Credit period</span><span className="v">{b.terms}</span></div>
      </Glass>
      <div className="stack" style={{ marginTop: 16 }}>
        {recv && (
          <button type="button" className="btn btn-a w tap" onClick={() => say(`Reminder ready on WhatsApp for ${b.party}`)}>
            <Icon n="whatsapp" size="s" /> Send reminder
          </button>
        )}
        <button type="button" className="btn btn-g glass w tap" onClick={() => say('Bill PDF ready to share')}>
          <Icon n="share" size="s" /> Share bill PDF
        </button>
      </div>
      <Glass className="row" style={{ marginTop: 14 }}>
        <Ico n="mail" size="xs" navy />
        <div className="grow">
          <div className="rt" style={{ fontSize: 15 }}>Email reminders</div>
          <div className="rs">Schedule reminders for bills that are due</div>
        </div>
        <Chev />
      </Glass>
    </div>
  );
}
