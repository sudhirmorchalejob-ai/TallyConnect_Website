import { useState } from 'react';
import { DEMO_COMPANY, ENTRY_TILES, NOTIFS, SHORTCUTS, SUMS, inr, type SumKey } from '../data';
import { useApp } from '../store';
import { CBtn, Glass, Icon, Ico, Sec } from '../ui';

export function Brand({ size = 22 }: { size?: number }) {
  return (
    <div className="brand" style={{ fontSize: size }}>
      Tally<span>Connect</span>
    </div>
  );
}

export function LoginScreen() {
  const { dispatch, say } = useApp();
  const [show, setShow] = useState(false);
  const [user, setUser] = useState('demo');
  return (
    <div className="scr" data-lenis-prevent style={{ paddingTop: 92 }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 14 }}>
        <img src="/images/tc_app_icon.png" alt="" width={86} height={86} style={{ borderRadius: 24, background: '#fff', boxShadow: '0 16px 30px -16px rgba(27,45,91,.5)' }} />
      </div>
      <h1 className="h1" style={{ textAlign: 'center' }}>Welcome back</h1>
      <p className="sub" style={{ textAlign: 'center' }}>Log in to see your business</p>
      <div className="fld">
        <label className="lab">Username or email</label>
        <div className="inp">
          <Icon n="person" size="s" />
          <input value={user} onChange={(e) => setUser(e.target.value)} placeholder="e.g. yourname" aria-label="Username or email" />
        </div>
      </div>
      <div className="fld">
        <label className="lab">Password</label>
        <div className="inp">
          <Icon n="lock" size="s" />
          <input type={show ? 'text' : 'password'} defaultValue="demo-only" aria-label="Password" />
          <button type="button" aria-label="Show password" onClick={() => setShow(!show)}>
            <Icon n={show ? 'eyeOff' : 'eye'} size="s" />
          </button>
        </div>
      </div>
      <div style={{ textAlign: 'right', margin: '-4px 4px 18px' }}>
        <button type="button" className="lnk" onClick={() => say('A reset link is sent to your email')}>
          Forgot password?
        </button>
      </div>
      <button type="button" className="btn btn-p w tap" onClick={() => dispatch({ t: 'login' })}>
        Log In <Icon n="arrow" size="s" />
      </button>
      <p className="rs" style={{ textAlign: 'center', marginTop: 18 }}>
        Demo — any username works. Nothing is sent anywhere.
      </p>
    </div>
  );
}

const HOME_SUMS: SumKey[] = ['toGet', 'toGive', 'mIn', 'mOut'];

export function HomeScreen() {
  const { s, go, open, dispatch } = useApp();
  const unread = NOTIFS.filter((n) => n.unread && !s.readIds.includes(n.id)).length;
  return (
    <div className="scr wt" data-lenis-prevent>
      <div className="nav">
        <CBtn n="menu" label="Open menu" onClick={() => open('menu')} />
        <Brand />
        <CBtn n="search" label="Search" onClick={() => open('search')} />
        <CBtn n="bell" label="Alerts" dot={unread > 0} onClick={() => go('notifs')} />
      </div>

      <Glass className="row" onClick={() => open('company')} style={{ marginBottom: 4 }}>
        <Ico n="building" size="sm" navy />
        <div className="grow">
          <div className="rt ell">{DEMO_COMPANY.name}</div>
          <div className="rs ell">
            <span className="live" />
            Tally Connected · Synced 2 min ago
          </div>
        </div>
        <span className="chev">
          <Icon n="chevD" size="s" />
        </span>
      </Glass>

      <Sec>What would you like to do?</Sec>
      <div className="hero tap" role="button" tabIndex={0} onClick={() => go('newEntry')} onKeyDown={(e) => e.key === 'Enter' && go('newEntry')} style={{ cursor: 'pointer' }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <span className="ico">
            <Icon n="plus" />
          </span>
          <div className="grow">
            <div className="rt" style={{ fontSize: 19, fontWeight: 800 }}>New Entry</div>
            <div className="rs">Record a sale, purchase, receipt or payment</div>
          </div>
          <Icon n="chevR" size="s" />
        </div>
        <div className="four" style={{ marginTop: 14 }}>
          {ENTRY_TILES.slice(0, 4).map((e) => (
            <button
              type="button"
              key={e.k}
              className="tap"
              onClick={(ev) => {
                ev.stopPropagation();
                dispatch({ t: 'startFlow', k: e.k });
              }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: '10px 0', borderRadius: 16, background: 'rgba(255,255,255,.14)', border: '1px solid rgba(255,255,255,.25)', fontSize: 12.5, fontWeight: 700 }}
            >
              <Icon n={e.ic} />
              {e.t}
            </button>
          ))}
        </div>
      </div>

      <Glass style={{ marginTop: 12, padding: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '2px 2px 12px' }}>
          <div className="rt" style={{ fontSize: 18, fontWeight: 800 }}>Money summary</div>
          <span className="badge acc">Demo data</span>
        </div>
        <div className="two">
          {HOME_SUMS.map((k) => {
            const m = SUMS[k];
            return (
              <button type="button" key={k} className="tap" onClick={() => go(m.to.screen, m.to.params)} style={{ textAlign: 'left', padding: 12, borderRadius: 18, background: 'rgba(255,255,255,.7)', border: '1px solid rgba(255,255,255,.9)' }}>
                <Ico n={m.ic} size="xs" />
                <div className="rt" style={{ marginTop: 8, fontSize: 14.5 }}>{m.t}</div>
                <div className={`amt ${m.tone === 'plain' ? '' : m.tone}`} style={{ textAlign: 'left', fontSize: 19, marginTop: 2 }}>
                  {inr(m.amt)}
                </div>
                <div className="rs" style={{ fontSize: 12 }}>{m.sub}</div>
              </button>
            );
          })}
        </div>
      </Glass>

      <div className="three" style={{ marginTop: 12 }}>
        {SHORTCUTS.map((t) => (
          <Glass key={t.k} onClick={() => t.to && go(t.to)} style={{ padding: '14px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, textAlign: 'center' }}>
            <Ico n={t.ic} size="sm" />
            <div>
              <div className="rt" style={{ fontSize: 14.5 }}>{t.t}</div>
              <div className="rs" style={{ fontSize: 12 }}>{t.sub}</div>
            </div>
          </Glass>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 14 }}>
        <span style={{ width: 18, height: 6, borderRadius: 3, background: 'var(--acc)' }} />
        <span style={{ width: 6, height: 6, borderRadius: 3, background: 'rgba(27,45,91,.2)' }} />
      </div>
    </div>
  );
}

export function AssistantFab({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label="Ask the AI assistant"
      className="tap"
      onClick={onClick}
      style={{ position: 'absolute', right: 22, bottom: 104, width: 56, height: 56, borderRadius: 28, display: 'grid', placeItems: 'center', color: '#fff', background: 'linear-gradient(160deg, var(--acc2), var(--acc3))', boxShadow: '0 14px 26px -10px color-mix(in srgb, var(--acc3) 75%, transparent), inset 0 1px 0 rgba(255,255,255,.35)', zIndex: 15 }}
    >
      <Icon n="spark" />
    </button>
  );
}

export function NotifsScreen() {
  const { s, go, dispatch, back } = useApp();
  const [f, setF] = useState<'all' | 'unread'>('all');
  const isUnread = (id: string, u: boolean) => u && !s.readIds.includes(id);
  const rows = NOTIFS.filter((n) => f === 'all' || isUnread(n.id, n.unread));
  const count = NOTIFS.filter((n) => isUnread(n.id, n.unread)).length;
  return (
    <div className="scr wt" data-lenis-prevent>
      <div className="nav">
        <button type="button" className="backp glass tap" onClick={back}>
          <Icon n="chevL" size="s" />
          Home
        </button>
        <div className="grow" />
        <button type="button" className="lnk" onClick={() => dispatch({ t: 'readAll' })}>
          Mark all read
        </button>
      </div>
      <h1 className="h1">Alerts</h1>
      <p className="sub">{count ? `${count} new` : 'You have read everything.'}</p>
      <div className="seg glass">
        <button type="button" className={f === 'all' ? 'on' : ''} onClick={() => setF('all')}>All</button>
        <button type="button" className={f === 'unread' ? 'on' : ''} onClick={() => setF('unread')}>Unread</button>
      </div>
      <div className="stack">
        {rows.map((n) => (
          <Glass
            key={n.id}
            className="row"
            onClick={() => {
              dispatch({ t: 'read', id: n.id });
              go(n.to.screen, n.to.params);
            }}
            style={{ alignItems: 'flex-start' }}
          >
            <Ico n={n.ic} size="sm" />
            <div className="grow">
              <div className="rt">{n.t}</div>
              <div className="rs">{n.body}</div>
              <div className="rs" style={{ fontSize: 12, marginTop: 4 }}>{n.time}</div>
            </div>
            {isUnread(n.id, n.unread) && <span style={{ width: 9, height: 9, borderRadius: 5, background: 'var(--acc)', marginTop: 6 }} />}
          </Glass>
        ))}
        {!rows.length && <p className="sub" style={{ textAlign: 'center', marginTop: 30 }}>You have read everything.</p>}
      </div>
    </div>
  );
}
