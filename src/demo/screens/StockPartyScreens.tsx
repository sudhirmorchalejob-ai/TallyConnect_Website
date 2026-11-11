import { useMemo, useState } from 'react';
import { ITEMS, KINDS, PARTIES, VOUCHERS, inr, initials } from '../data';
import { useApp } from '../store';
import { BackNav, Badge, Chips, Glass, Icon, Ico, Sec, Seg } from '../ui';

export function ItemsScreen() {
  const { say } = useApp();
  const [f, setF] = useState<'all' | 'low' | 'out'>('all');
  const [q, setQ] = useState('');
  const rows = ITEMS.filter((i) => (f === 'all' || i.st === f) && (!q || i.name.toLowerCase().includes(q.toLowerCase())));
  const value = ITEMS.reduce((a, i) => a + i.stock * i.rate, 0);
  return (
    <div className="scr wt" data-lenis-prevent>
      <BackNav>
        <button type="button" aria-label="Scan barcode" className="cbtn glass tap" onClick={() => say('Point the camera at a barcode')}>
          <Icon n="hash" />
        </button>
        <button type="button" aria-label="Share stock list" className="cbtn glass tap" onClick={() => say('Stock list shared')}>
          <Icon n="share" />
        </button>
      </BackNav>
      <h1 className="h1">Items</h1>
      <p className="sub">Stock and prices from Tally</p>
      <div className="three" style={{ marginBottom: 14 }}>
        {[
          ['Stock value', inr(value)],
          ['Low stock', `${ITEMS.filter((i) => i.st === 'low').length} items`],
          ['Finished', `${ITEMS.filter((i) => i.st === 'out').length} items`],
        ].map(([t, v]) => (
          <Glass key={t} style={{ padding: '12px 10px' }}>
            <div className="rs" style={{ marginTop: 0, fontSize: 12 }}>{t}</div>
            <div className="rt" style={{ fontSize: 15.5, fontWeight: 800 }}>{v}</div>
          </Glass>
        ))}
      </div>
      <div className="inp" style={{ marginBottom: 12 }}>
        <Icon n="search" size="s" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search items" aria-label="Search items" />
      </div>
      <Chips items={[['all', 'All'], ['low', 'Low stock'], ['out', 'Finished']]} value={f} onChange={setF} />
      <Glass className="list">
        {rows.map((i) => (
          <div className="row" key={i.name}>
            <Ico n="box" size="xs" />
            <div className="grow">
              <div className="rt ell" style={{ fontSize: 15 }}>{i.name}</div>
              <div className="rs">
                {i.stock} {i.unit} · {inr(i.rate)} each
              </div>
            </div>
            {i.st === 'ok' ? <Badge kind="ok">In stock</Badge> : i.st === 'low' ? <Badge kind="warn">Low</Badge> : <Badge kind="bad">Finished</Badge>}
          </div>
        ))}
        {!rows.length && <div className="row rs">No items match.</div>}
      </Glass>
    </div>
  );
}

export function PartyScreen() {
  const { go } = useApp();
  const [f, setF] = useState<'all' | 'c' | 's'>('all');
  const [q, setQ] = useState('');
  const rows = PARTIES.filter((p) => (f === 'all' || p.type === f) && (!q || p.name.toLowerCase().includes(q.toLowerCase())));
  return (
    <div className="scr wt" data-lenis-prevent>
      <BackNav />
      <h1 className="h1">Party</h1>
      <p className="sub">Customers and suppliers · {PARTIES.length} ledgers</p>
      <div className="inp" style={{ marginBottom: 12 }}>
        <Icon n="search" size="s" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search party" aria-label="Search party" />
      </div>
      <Chips items={[['all', 'All'], ['c', 'Customers'], ['s', 'Suppliers']]} value={f} onChange={setF} />
      <Glass className="list">
        {rows.map((p) => (
          <button type="button" className="row tap" key={p.name} onClick={() => go('partyDetail', { name: p.name })}>
            <span className={`av ${p.type === 'c' ? 'acc' : ''}`}>{initials(p.name)}</span>
            <div className="grow">
              <div className="rt ell">{p.name}</div>
              <div className="rs">
                {p.type === 'c' ? 'Customer' : 'Supplier'} · {p.city}
              </div>
            </div>
            <div className={`amt ${p.bal ? (p.type === 'c' ? 'in' : 'out') : ''}`}>{p.bal ? inr(p.bal) : 'Settled'}</div>
          </button>
        ))}
      </Glass>
    </div>
  );
}

export function PartyDetailScreen() {
  const { s, go, say } = useApp();
  const p = PARTIES.find((x) => x.name === s.params.name) ?? PARTIES[0]!;
  const [tab, setTab] = useState<'sum' | 'ledger'>('sum');
  const entries = useMemo(() => VOUCHERS.filter((v) => v.party === p.name).sort((a, b) => a.day - b.day), [p.name]);
  let run = 0;
  return (
    <div className="scr" data-lenis-prevent>
      <BackNav>
        <button type="button" aria-label="Call" className="cbtn glass tap" onClick={() => say('Calling the party…')}>
          <Icon n="phone" />
        </button>
        <button type="button" aria-label="Share" className="cbtn glass tap" onClick={() => say('Party details shared')}>
          <Icon n="share" />
        </button>
      </BackNav>
      <div style={{ display: 'flex', gap: 14, alignItems: 'center', margin: '4px 4px 16px' }}>
        <span className={`av lg ${p.type === 'c' ? 'acc' : ''}`}>{initials(p.name)}</span>
        <div>
          <div className="h2" style={{ fontSize: 22, fontWeight: 800 }}>{p.name}</div>
          <div className="rs">{p.type === 'c' ? 'Customer · Sundry Debtors' : 'Supplier · Sundry Creditors'} · {p.city}</div>
        </div>
      </div>
      <Seg items={[['sum', 'Summary'], ['ledger', 'Ledger']]} value={tab} onChange={setTab} />
      {tab === 'sum' ? (
        <>
          <Glass style={{ padding: 18 }}>
            <div className="rs" style={{ marginTop: 0 }}>{p.type === 'c' ? 'To get' : 'To give'}</div>
            <div className={`amt big ${p.bal ? (p.type === 'c' ? 'in' : 'out') : ''}`} style={{ textAlign: 'left' }}>{inr(p.bal)}</div>
          </Glass>
          <Sec>Recent entries</Sec>
          <Glass className="list">
            {entries.map((v) => (
              <button type="button" key={v.no} className="row tap" onClick={() => go('entryDetail', { no: v.no })}>
                <Ico n={KINDS[v.k].ic} size="xs" />
                <div className="grow">
                  <div className="rt">{v.no}</div>
                  <div className="rs">{KINDS[v.k].t} · {v.day} Sep 2026</div>
                </div>
                <div className="amt">{inr(v.amt)}</div>
              </button>
            ))}
            {!entries.length && <div className="row rs">No entries this month.</div>}
          </Glass>
        </>
      ) : (
        <Glass style={{ padding: '6px 0' }}>
          <div className="kv" style={{ fontSize: 12.5, fontWeight: 800, color: 'var(--ink3)', textTransform: 'uppercase', letterSpacing: '.05em' }}>
            <span>Entry</span>
            <span>Balance</span>
          </div>
          {entries.map((v) => {
            const dr = v.k === 'sales' || v.k === 'payment';
            run += dr ? v.amt : -v.amt;
            return (
              <div className="kv" key={v.no}>
                <span className="k">
                  <span style={{ color: 'var(--ink)', fontWeight: 700 }}>{v.no}</span> · {v.day} Sep
                  <br />
                  <span style={{ fontSize: 13 }}>{dr ? 'Dr' : 'Cr'} {inr(v.amt)}</span>
                </span>
                <span className="v">{inr(Math.abs(run))} {run >= 0 ? 'Dr' : 'Cr'}</span>
              </div>
            );
          })}
          {!entries.length && <div className="kv rs">No entries this month.</div>}
        </Glass>
      )}
    </div>
  );
}
