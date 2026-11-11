import { useEffect, useState } from 'react';
import { DEMO_COMPANY, KINDS, LANGUAGES, LOOKS, inr, initials, type ActStatus } from '../data';
import { useApp } from '../store';
import { BackNav, Badge, Chev, Chips, Glass, Icon, Ico, NavRow, Sec, StatusBadge } from '../ui';

export function ActivityScreen() {
  const { s, dispatch, say } = useApp();
  const [f, setF] = useState<'all' | ActStatus>('all');
  const rows = s.acts.filter((a) => f === 'all' || a.st === f);
  const count = (st: ActStatus) => s.acts.filter((a) => a.st === st).length;
  const retry = (id: string) => {
    dispatch({ t: 'actStatus', id, st: 'wait', note: 'Trying again…' });
    say('Trying again…');
    window.setTimeout(() => dispatch({ t: 'actStatus', id, st: 'ok' }), 1600);
  };
  return (
    <div className="scr wt" data-lenis-prevent>
      <NavRow />
      <h1 className="h1">Activity</h1>
      <p className="sub">Entries made in the app, on their way to Tally</p>
      <Glass className="row" style={{ marginBottom: 12 }}>
        <Ico n="laptop" size="sm" navy />
        <div className="grow">
          <div className="rt"><span className="live" />Tally connected</div>
          <div className="rs">Tally PC · {DEMO_COMPANY.name} · checks every 5 min</div>
        </div>
      </Glass>
      <div className="three" style={{ marginBottom: 14 }}>
        {(
          [
            ['ok', 'Sent', 'var(--pos)'],
            ['wait', 'Waiting', 'var(--warn)'],
            ['fail', 'Not sent', 'var(--neg)'],
          ] as const
        ).map(([k, t, c]) => (
          <Glass key={k} onClick={() => setF(f === k ? 'all' : k)} style={{ padding: '12px 10px', textAlign: 'left', outline: f === k ? `2px solid ${c}` : undefined }}>
            <div style={{ fontSize: 24, fontWeight: 800, color: c }}>{count(k)}</div>
            <div className="rs" style={{ marginTop: 0 }}>{t}</div>
          </Glass>
        ))}
      </div>
      <Glass className="list">
        {rows.map((a) => (
          <div key={a.id} className="row" style={{ alignItems: 'flex-start' }}>
            <Ico n={KINDS[a.k].ic} size="xs" />
            <div className="grow">
              <div className="rt ell">{a.party}</div>
              <div className="rs">
                {KINDS[a.k].t} · {a.no} · {a.time}
              </div>
              {a.note && a.st !== 'ok' && <div className="rs" style={{ color: a.st === 'fail' ? 'var(--neg)' : 'var(--warn)' }}>{a.note}</div>}
              {a.st === 'fail' && (
                <button type="button" className="lnk tap" style={{ marginTop: 6, display: 'inline-flex', gap: 4, alignItems: 'center' }} onClick={() => retry(a.id)}>
                  <Icon n="sync" size="xs" /> Try again
                </button>
              )}
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="amt">{inr(a.amt)}</div>
              <StatusBadge st={a.st} />
            </div>
          </div>
        ))}
      </Glass>
    </div>
  );
}

export function TeamScreen() {
  const { s, go, dispatch, say } = useApp();
  const [f, setF] = useState<'all' | 'active' | 'pending' | 'off'>('all');
  const rows = s.team.filter((m) => f === 'all' || m.st === f);
  return (
    <div className="scr wt" data-lenis-prevent>
      <NavRow>
        <button type="button" aria-label="Invite" className="cbtn glass tap" onClick={() => say('Invite sent to the new member')}>
          <Icon n="userPlus" />
        </button>
      </NavRow>
      <h1 className="h1">Sales Team</h1>
      <p className="sub">Who can use Tally Connect for {DEMO_COMPANY.name}</p>
      <Glass className="row" onClick={() => go('teamAccess')} style={{ marginBottom: 14 }}>
        <Ico n="shield" size="sm" />
        <div className="grow">
          <div className="rt">Access &amp; Approvals</div>
          <div className="rs">Companies, voucher types and entries that need approval</div>
        </div>
        <Chev />
      </Glass>
      <Chips items={[['all', 'All'], ['active', 'Active'], ['pending', 'Invited'], ['off', 'Turned off']]} value={f} onChange={setF} />
      <Glass className="list">
        {rows.map((m) => (
          <div className="row" key={m.id}>
            <span className={`av ${m.st === 'active' ? 'acc' : ''}`} style={{ opacity: m.st === 'off' ? 0.5 : 1 }}>{initials(m.name)}</span>
            <div className="grow">
              <div className="rt ell">{m.name}</div>
              <div className="rs ell">{m.role}</div>
              <div style={{ marginTop: 4 }}>
                {m.st === 'active' ? <Badge kind="ok">Active</Badge> : m.st === 'pending' ? <Badge kind="warn">Invite sent</Badge> : <Badge kind="bad">Turned off</Badge>}
              </div>
            </div>
            {m.st !== 'pending' ? (
              <button
                type="button"
                aria-label={m.st === 'active' ? `Turn off ${m.name}` : `Turn on ${m.name}`}
                className={`sw ${m.st === 'active' ? 'on' : ''}`}
                onClick={() => {
                  dispatch({ t: 'team', id: m.id, patch: { st: m.st === 'active' ? 'off' : 'active' } });
                  say(`${m.name} turned ${m.st === 'active' ? 'off' : 'on'}`);
                }}
              />
            ) : (
              <button type="button" className="lnk" onClick={() => say('Invite sent again')}>
                Resend
              </button>
            )}
          </div>
        ))}
      </Glass>
    </div>
  );
}

const VTYPES = ['Every type', 'Sales', 'Purchase', 'Receipt', 'Payment', 'Journal'];

export function TeamAccessScreen() {
  const { say, back } = useApp();
  const [every, setEvery] = useState(true);
  const [types, setTypes] = useState<string[]>(['Every type']);
  const [approval, setApproval] = useState(true);
  const toggle = (t: string) => {
    if (t === 'Every type') return setTypes(['Every type']);
    const next = types.filter((x) => x !== 'Every type');
    const out = next.includes(t) ? next.filter((x) => x !== t) : [...next, t];
    setTypes(out.length ? out : ['Every type']);
  };
  return (
    <div className="flowscr">
      <div className="fbody" data-lenis-prevent>
        <BackNav />
        <h1 className="h1" style={{ fontSize: 30 }}>Access &amp; Approvals</h1>
        <p className="sub">For Priya Shah · Sales Rep</p>
        <Sec>Companies</Sec>
        <Glass className="row">
          <div className="grow">
            <div className="rt">Every company</div>
            <div className="rs">No company limit</div>
          </div>
          <button type="button" aria-label="Every company" className={`sw ${every ? 'on' : ''}`} onClick={() => setEvery(!every)} />
        </Glass>
        <Sec>Voucher types</Sec>
        <p className="rs" style={{ margin: '-2px 8px 10px' }}>Leave a company on Every type to allow all of them</p>
        <Glass style={{ padding: 14 }}>
          <div className="rt">{DEMO_COMPANY.name}</div>
          <div className="rs" style={{ marginBottom: 10 }}>{types.includes('Every type') ? 'Every voucher type' : types.join(', ')}</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {VTYPES.map((t) => (
              <button type="button" key={t} className={`chip glass tap ${types.includes(t) ? 'on' : ''}`} style={{ height: 38, fontSize: 14 }} onClick={() => toggle(t)}>
                {t}
              </button>
            ))}
          </div>
        </Glass>
        <Sec>Entries</Sec>
        <Glass className="row">
          <div className="grow">
            <div className="rt">Need approval</div>
            <div className="rs">An admin approves entries before they go to Tally</div>
          </div>
          <button type="button" aria-label="Entries need approval" className={`sw ${approval ? 'on' : ''}`} onClick={() => setApproval(!approval)} />
        </Glass>
      </div>
      <div className="foot">
        <div className="grow">
          <div className="rs" style={{ marginTop: 0 }}>Entries</div>
          <div className="rt" style={{ fontSize: 19, fontWeight: 800 }}>{approval ? 'Need approval' : 'Go straight to Tally'}</div>
        </div>
        <button
          type="button"
          className="btn btn-p tap"
          style={{ flex: 'none', width: 140 }}
          onClick={() => {
            say('Access saved');
            back();
          }}
        >
          <Icon n="check" size="s" /> Save
        </button>
      </div>
    </div>
  );
}

export function SettingsScreen() {
  const { s, dispatch, say } = useApp();
  const [lang, setLang] = useState(0);
  const [tab, setTab] = useState<'look' | 'lang'>('look');
  useEffect(() => {
    if (s.params.tab === 'lang') setTab('lang');
  }, [s.params.tab]);
  return (
    <div className="scr" data-lenis-prevent>
      <BackNav />
      <h1 className="h1">Settings</h1>
      <p className="sub">Make Tally Connect yours</p>
      <Chips items={[['look', 'Look'], ['lang', 'Language']]} value={tab} onChange={setTab} />
      {tab === 'look' ? (
        <>
          <Sec style={{ marginTop: 6 }}>8 looks · tap to try</Sec>
          <div className="two">
            {LOOKS.map((l) => (
              <button
                type="button"
                key={l.k}
                className="tap"
                style={{ textAlign: 'left' }}
                onClick={() => {
                  dispatch({ t: 'look', k: l.k });
                  say(`${l.t} look applied`);
                }}
              >
                <div className={`swatch ${s.look === l.k ? 'on' : ''}`} style={{ background: l.wall }}>
                  <span style={{ position: 'absolute', left: 10, bottom: 10, width: 22, height: 22, borderRadius: 11, background: l.acc[0] }} />
                  <span style={{ position: 'absolute', left: 36, bottom: 10, width: 22, height: 22, borderRadius: 11, background: l.navy[0] }} />
                </div>
                <div className="rt" style={{ fontSize: 14.5, marginTop: 6 }}>{l.t}</div>
                <div className="rs" style={{ fontSize: 12, marginTop: 0 }}>{l.sub}</div>
              </button>
            ))}
          </div>
        </>
      ) : (
        <Glass className="list" style={{ marginTop: 6 }}>
          {LANGUAGES.map((l, i) => (
            <button
              type="button"
              key={l}
              className="row tap"
              onClick={() => {
                setLang(i);
                say(`${l} selected`);
              }}
            >
              <Ico n="globe" size="xs" navy />
              <div className="grow rt">{l}</div>
              {lang === i && (
                <span style={{ color: 'var(--acc)' }}>
                  <Icon n="check" />
                </span>
              )}
            </button>
          ))}
        </Glass>
      )}
    </div>
  );
}
