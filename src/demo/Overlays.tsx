import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { ACCOUNTS, DEMO_COMPANY, DEMO_USER, FLOWS, ITEMS, LEDGERS, NOTIFS, PARTIES, inr, initials, type ScreenKey } from './data';
import type { IconName } from './icons';
import { useApp } from './store';
import { CBtn, Chev, Glass, Icon, Ico, Sec } from './ui';
import { Brand } from './screens/HomeScreens';

const sheetT = { type: 'tween', duration: 0.46, ease: [0.2, 0.95, 0.25, 1] } as const;

function Scrim({ alpha = 0.3 }: { alpha?: number }) {
  const { close } = useApp();
  return (
    <motion.div
      className="scrim"
      style={{ background: `rgba(14,27,51,${alpha})` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={close}
    />
  );
}

function Sheet({ children, top }: { children: React.ReactNode; top?: number }) {
  return (
    <motion.div
      className="sheet"
      data-lenis-prevent
      style={top !== undefined ? { top } : undefined}
      initial={{ y: '105%' }}
      animate={{ y: 0 }}
      exit={{ y: '105%' }}
      transition={sheetT}
    >
      <div className="grab" />
      {children}
    </motion.div>
  );
}

const MENU: { t: string; ic: IconName; to: ScreenKey; params?: Record<string, string> }[] = [
  { t: 'Sales Team', ic: 'team', to: 'team' },
  { t: 'Reports', ic: 'chart', to: 'reports' },
  { t: 'Items', ic: 'box', to: 'items' },
  { t: 'Party', ic: 'person', to: 'party' },
  { t: 'Alerts', ic: 'bell', to: 'notifs' },
  { t: 'Settings', ic: 'gear', to: 'settings' },
  { t: 'Language', ic: 'globe', to: 'settings', params: { tab: 'lang' } },
];

function SideMenu() {
  const { s, go, close, say } = useApp();
  const unread = NOTIFS.filter((n) => n.unread && !s.readIds.includes(n.id)).length;
  return (
    <motion.div className="drawer" data-lenis-prevent initial={{ x: '-105%' }} animate={{ x: 0 }} exit={{ x: '-105%' }} transition={{ type: 'tween', duration: 0.42, ease: [0.2, 0.95, 0.25, 1] }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        <img src="/images/tc_app_icon.png" alt="" width={38} height={38} style={{ borderRadius: 12, background: '#fff' }} />
        <div style={{ flex: 1, textAlign: 'left' }}>
          <Brand size={19} />
        </div>
        <CBtn n="close" small label="Close menu" onClick={close} />
      </div>
      <Glass className="row" onClick={() => go('settings')}>
        <span className="av acc" style={{ width: 50, height: 50 }}>{initials(DEMO_USER.name)}</span>
        <div className="grow">
          <div className="rt" style={{ fontSize: 17 }}>{DEMO_USER.name}</div>
          <div className="rs ell">{DEMO_USER.email}</div>
          <div style={{ color: 'var(--acc)', fontWeight: 700, fontSize: 14 }}>See profile ›</div>
        </div>
      </Glass>
      <Sec>My account</Sec>
      <Glass className="list" style={{ borderRadius: 20 }}>
        {MENU.map((m) => (
          <button type="button" key={m.t} className="row tap" style={{ minHeight: 56 }} onClick={() => go(m.to, m.params)}>
            <Ico n={m.ic} size="xs" />
            <div className="grow rt">{m.t}</div>
            {m.t === 'Alerts' && unread > 0 && (
              <span style={{ minWidth: 24, height: 24, borderRadius: 12, background: 'var(--neg)', color: '#fff', fontSize: 12.5, fontWeight: 800, display: 'grid', placeItems: 'center', padding: '0 7px' }}>{unread}</span>
            )}
            <Chev />
          </button>
        ))}
      </Glass>
      <Sec>Support</Sec>
      <Glass className="list" style={{ borderRadius: 20 }}>
        <button type="button" className="row tap" style={{ minHeight: 56 }} onClick={() => say('Opening WhatsApp…')}>
          <Ico n="whatsapp" size="xs" />
          <div className="grow rt">Chat with support</div>
          <Chev />
        </button>
        <button type="button" className="row tap" style={{ minHeight: 56 }} onClick={() => say('Demo — you stay logged in')}>
          <Ico n="logout" size="xs" />
          <div className="grow rt">Log out</div>
        </button>
      </Glass>
    </motion.div>
  );
}

const SEARCH: { t: string; s: string; ic: IconName; to?: ScreenKey; params?: Record<string, string>; flow?: keyof typeof FLOWS }[] = [
  { t: 'Items', s: 'Stock and prices', ic: 'box', to: 'items' },
  { t: 'Party', s: 'Customers and suppliers', ic: 'person', to: 'party' },
  { t: 'All Vouchers', s: 'Every entry in one list', ic: 'receipt', to: 'vList' },
  { t: 'New Sale', s: 'Make a sales bill', ic: 'bag', flow: 'sales' },
  { t: 'New Purchase', s: 'Write down what you bought', ic: 'cart', flow: 'purchase' },
  { t: 'Receipt', s: 'Record money received', ic: 'in', flow: 'receipt' },
  { t: 'Payment', s: 'Record money paid', ic: 'out', flow: 'payment' },
  { t: 'Receivable (Outstanding)', s: 'Money customers owe you', ic: 'in', to: 'outList', params: { outKind: 'recv' } },
  { t: 'Payable (Outstanding)', s: 'Money you owe suppliers', ic: 'out', to: 'outList', params: { outKind: 'pay' } },
  { t: 'Activity', s: 'Entries going to Tally', ic: 'activity', to: 'activity' },
  { t: 'Reports', s: 'Sales, stock and accounts', ic: 'chart', to: 'reports' },
  { t: 'Profit & Loss', s: 'Financial statement', ic: 'chart', to: 'finReport' },
];

function SearchSheet() {
  const { go, dispatch, say } = useApp();
  const [q, setQ] = useState('');
  const rows = SEARCH.filter((r) => !q || `${r.t} ${r.s}`.toLowerCase().includes(q.toLowerCase()));
  return (
    <Sheet top={60}>
      <div className="inp" style={{ marginBottom: 12 }}>
        <Icon n="search" size="s" />
        <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search screens and actions" aria-label="Search" />
        <button type="button" aria-label="Voice search" onClick={() => say('Voice search listens on your phone')}>
          <Icon n="mic" size="s" />
        </button>
      </div>
      <Glass className="list">
        {rows.map((r) => (
          <button
            type="button"
            key={r.t}
            className="row tap"
            onClick={() => (r.flow ? dispatch({ t: 'startFlow', k: r.flow }) : r.to && go(r.to, r.params))}
          >
            <Ico n={r.ic} size="xs" />
            <div className="grow">
              <div className="rt">{r.t}</div>
              <div className="rs">{r.s}</div>
            </div>
            <Chev />
          </button>
        ))}
        {!rows.length && <div className="row rs">Nothing found for “{q}”.</div>}
      </Glass>
    </Sheet>
  );
}

function CompanySheet() {
  const { close, say } = useApp();
  return (
    <Sheet>
      <div className="h2" style={{ fontSize: 22, fontWeight: 800, margin: '0 4px 4px' }}>Choose company</div>
      <p className="sub">Each Tally company's data stays separate</p>
      <Glass className="row">
        <Ico n="building" size="sm" navy />
        <div className="grow">
          <div className="rt">{DEMO_COMPANY.name}</div>
          <div className="rs">{DEMO_COMPANY.sub}</div>
        </div>
        <span style={{ color: 'var(--acc)' }}>
          <Icon n="check" />
        </span>
      </Glass>
      <div className="two" style={{ marginTop: 14 }}>
        <button
          type="button"
          className="btn btn-g glass tap"
          onClick={() => {
            close();
            say('Company list refreshed from Tally');
          }}
        >
          <Icon n="sync" size="s" /> Refresh
        </button>
        <button type="button" className="btn btn-p tap" onClick={close}>
          Done
        </button>
      </div>
    </Sheet>
  );
}

function PickPartySheet() {
  const { s, dispatch, close } = useApp();
  const cfg = FLOWS[s.flow.type];
  const [q, setQ] = useState('');
  const pool =
    cfg.list === 'ledger'
      ? LEDGERS.map((l) => ({ name: l.name, sub: l.group }))
      : cfg.list === 'acc'
        ? ACCOUNTS.map((a) => ({ name: a, sub: a.includes('Bank') ? 'Bank account' : 'Cash' }))
        : PARTIES.filter((p) => p.type === cfg.list).map((p) => ({ name: p.name, sub: `${p.city} · ${p.bal ? inr(p.bal) : 'Settled'}` }));
  const rows = pool.filter((p) => !q || p.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <Sheet top={100}>
      <div className="h2" style={{ fontSize: 20, fontWeight: 800, margin: '0 4px 10px' }}>{cfg.partyLabel}</div>
      <div className="inp" style={{ marginBottom: 12 }}>
        <Icon n="search" size="s" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search" aria-label="Search parties" />
      </div>
      <Glass className="list">
        {rows.map((p) => (
          <button
            type="button"
            key={p.name}
            className="row tap"
            onClick={() => {
              dispatch({ t: 'flow', patch: { party: p.name } });
              close();
            }}
          >
            <span className="av">{initials(p.name)}</span>
            <div className="grow">
              <div className="rt ell">{p.name}</div>
              <div className="rs">{p.sub}</div>
            </div>
            {s.flow.party === p.name && (
              <span style={{ color: 'var(--acc)' }}>
                <Icon n="check" />
              </span>
            )}
          </button>
        ))}
      </Glass>
    </Sheet>
  );
}

function PickItemSheet() {
  const { s, dispatch, close } = useApp();
  const picked = s.flow.lines.map((l) => l.name);
  const toggle = (name: string) => {
    const it = ITEMS.find((i) => i.name === name)!;
    const lines = picked.includes(name)
      ? s.flow.lines.filter((l) => l.name !== name)
      : [...s.flow.lines, { name, qty: 1, unit: it.unit, rate: it.rate, gst: 18 }];
    dispatch({ t: 'flow', patch: { lines } });
  };
  return (
    <Sheet top={40}>
      <div className="h2" style={{ fontSize: 20, fontWeight: 800, margin: '0 4px 10px' }}>Pick items</div>
      <Glass className="list">
        {ITEMS.map((i) => (
          <button type="button" key={i.name} className="row tap" onClick={() => toggle(i.name)}>
            <Ico n="box" size="xs" />
            <div className="grow">
              <div className="rt ell" style={{ fontSize: 15 }}>{i.name}</div>
              <div className="rs">
                {inr(i.rate)} · {i.stock} {i.unit} in stock
              </div>
            </div>
            <span
              style={{ width: 26, height: 26, borderRadius: 8, display: 'grid', placeItems: 'center', border: '2px solid var(--navy2)', background: picked.includes(i.name) ? 'var(--navy2)' : 'transparent', color: '#fff' }}
            >
              {picked.includes(i.name) && <Icon n="check" size="xs" />}
            </span>
          </button>
        ))}
      </Glass>
      <button type="button" className="btn btn-p w tap" style={{ marginTop: 14 }} onClick={close}>
        {picked.length} items picked · Done
      </button>
    </Sheet>
  );
}

export function OverlayLayer() {
  const { s } = useApp();
  const o = s.overlay;
  return (
    <AnimatePresence>
      {o && <Scrim key="scrim" alpha={o === 'menu' ? 0.12 : 0.3} />}
      {o === 'menu' && <SideMenu key="menu" />}
      {o === 'search' && <SearchSheet key="search" />}
      {o === 'company' && <CompanySheet key="company" />}
      {o === 'pickParty' && <PickPartySheet key="pp" />}
      {o === 'pickItem' && <PickItemSheet key="pi" />}
    </AnimatePresence>
  );
}
