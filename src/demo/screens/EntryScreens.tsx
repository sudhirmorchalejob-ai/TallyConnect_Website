import { Fragment } from 'react';
import { ENTRY_TILES, FLOWS, MODES, inr, lineTotals } from '../data';
import { useApp } from '../store';
import { BackNav, Glass, Icon, Ico, Sec } from '../ui';

export function NewEntryScreen() {
  const { dispatch } = useApp();
  return (
    <div className="scr" data-lenis-prevent>
      <BackNav />
      <h1 className="h1">New Entry</h1>
      <p className="sub">What do you want to write down?</p>
      <div className="two">
        {ENTRY_TILES.map((e) => (
          <Glass key={e.k} onClick={() => dispatch({ t: 'startFlow', k: e.k })} style={{ padding: 16, minHeight: 140, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Ico n={e.ic} size="sm" />
            <div>
              <div className="rt">{e.t}</div>
              <div className="rs">{e.sub}</div>
            </div>
          </Glass>
        ))}
      </div>
      <Glass className="row" style={{ marginTop: 16 }}>
        <Ico n="info" size="xs" navy />
        <div className="rs grow" style={{ marginTop: 0 }}>
          You can go back at any step. Nothing is sent to Tally until you tap Save.
        </div>
      </Glass>
    </div>
  );
}

function Field({ label, value, icon, onClick }: { label: string; value: string; icon?: Parameters<typeof Icon>[0]['n']; onClick?: () => void }) {
  return (
    <div className="fld">
      <div className="lab">{label}</div>
      {onClick ? (
        <button type="button" className="inp tap" onClick={onClick}>
          {icon && <Icon n={icon} size="s" />}
          <span className="grow ell" style={{ textAlign: 'left' }}>{value}</span>
          <Icon n="chevD" size="s" />
        </button>
      ) : (
        <div className="inp">
          {icon && <Icon n={icon} size="s" />}
          <span className="grow ell">{value}</span>
        </div>
      )}
    </div>
  );
}

export function FlowScreen() {
  const { s, dispatch, back, open, say } = useApp();
  const f = s.flow;
  const cfg = FLOWS[f.type];
  const steps = cfg.steps;
  const last = steps.length - 1;
  const t = lineTotals(f.lines);
  const total = cfg.items ? t.total : cfg.amt ?? 0;
  const bal = total - f.paid;
  const canNext = !(f.step === 1 && cfg.items && f.lines.length === 0);

  const setLine = (i: number, qty: number) =>
    dispatch({ t: 'flow', patch: { lines: f.lines.map((l, j) => (j === i ? { ...l, qty: Math.max(1, qty) } : l)) } });
  const removeLine = (i: number) => {
    dispatch({ t: 'flow', patch: { lines: f.lines.filter((_, j) => j !== i) } });
    say('Item removed');
  };

  return (
    <div className="flowscr">
      <div className="fbody" data-lenis-prevent>
        <BackNav label="Cancel" />
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '0 2px 14px' }}>
          <Ico n={cfg.ic} size="sm" />
          <div>
            <div className="h2" style={{ fontSize: 22, fontWeight: 800 }}>{cfg.title}</div>
            <div className="rs">{cfg.sub}</div>
          </div>
        </div>
        <div className="steps">
          {steps.map((st, i) => (
            <Fragment key={st}>
              {i > 0 && <span className={`bar ${i <= f.step ? 'done' : ''}`} />}
              <span className={`st ${i < f.step ? 'done' : i === f.step ? 'cur' : ''}`}>
                <span className="dot">{i < f.step ? <Icon n="check" size="xs" /> : i + 1}</span>
                {i === f.step && st}
              </span>
            </Fragment>
          ))}
        </div>

        {f.step === 0 && (
          <>
            <div className="two">
              <Field label={cfg.noLabel} value={cfg.no} icon="hash" />
              <Field label="Date" value="26 Sep 2026" icon="calendar" />
            </div>
            <Field label={cfg.partyLabel} value={f.party} icon={cfg.list === 'c' || cfg.list === 's' ? 'person' : 'book'} onClick={() => open('pickParty')} />
            {!cfg.items && cfg.amtLabel && <Field label={cfg.amtLabel} value={inr(cfg.amt ?? 0)} icon="rupeeC" />}
            {cfg.items && <Field label="Pay by date" value="11 Oct 2026" icon="calendar" />}
            <Field label="Note" value={cfg.note} icon="note" />
          </>
        )}

        {f.step === 1 && cfg.items && (
          <>
            <button type="button" className="inp tap" onClick={() => open('pickItem')} style={{ marginBottom: 12 }}>
              <Icon n="search" size="s" />
              <span className="grow" style={{ color: 'var(--ink3)' }}>Search item to add</span>
            </button>
            <Glass className="list">
              {f.lines.map((l, i) => (
                <div key={l.name} className="row" style={{ alignItems: 'flex-start' }}>
                  <div className="grow">
                    <div className="rt" style={{ fontSize: 15 }}>{l.name}</div>
                    <div className="rs">
                      {inr(l.rate)} × {l.qty} {l.unit} · GST {l.gst}%
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8 }}>
                      <span className="qty">
                        <button type="button" aria-label="Less" onClick={() => setLine(i, l.qty - 1)}><Icon n="minus" size="xs" /></button>
                        <b>{l.qty}</b>
                        <button type="button" aria-label="More" onClick={() => setLine(i, l.qty + 1)}><Icon n="plus" size="xs" /></button>
                      </span>
                      <button type="button" aria-label="Remove item" onClick={() => removeLine(i)} style={{ color: 'var(--neg)' }}>
                        <Icon n="trash" size="s" />
                      </button>
                    </div>
                  </div>
                  <div className="amt">{inr(l.rate * l.qty)}</div>
                </div>
              ))}
              {!f.lines.length && <div className="row rs">No items yet — add one above.</div>}
            </Glass>
            <Glass style={{ marginTop: 12, padding: '4px 0' }}>
              <div className="kv"><span className="k">Before GST</span><span className="v">{inr(t.sub)}</span></div>
              <div className="kv"><span className="k">GST</span><span className="v">{inr(t.gst)}</span></div>
              <div className="kv strong"><span className="k">Bill total</span><span className="v">{inr(t.total)}</span></div>
            </Glass>
          </>
        )}

        {f.step === 1 && f.type === 'journal' && (
          <>
            <div className="two" style={{ marginBottom: 12 }}>
              <Glass style={{ padding: 14 }}><div className="rs" style={{ marginTop: 0 }}>Goes to (Dr)</div><div className="amt" style={{ textAlign: 'left', fontSize: 20 }}>{inr(120000)}</div></Glass>
              <Glass style={{ padding: 14 }}><div className="rs" style={{ marginTop: 0 }}>Comes from (Cr)</div><div className="amt" style={{ textAlign: 'left', fontSize: 20 }}>{inr(120000)}</div></Glass>
            </div>
            <Glass className="row" style={{ marginBottom: 12, color: 'var(--pos)' }}>
              <Icon n="check" />
              <div className="rt">Matched — both sides are equal</div>
            </Glass>
            <Glass className="list">
              {[['Dr', 'Salaries A/c', 'Indirect Expenses'], ['Cr', 'Salary Payable', 'Current Liabilities']].map(([side, n, g]) => (
                <div className="row" key={n}>
                  <span className="badge info" style={{ minWidth: 38, justifyContent: 'center' }}>{side}</span>
                  <div className="grow"><div className="rt">{n}</div><div className="rs">{g}</div></div>
                  <div className="amt">{inr(120000)}</div>
                </div>
              ))}
            </Glass>
          </>
        )}

        {((f.step === 2 && cfg.items) || (f.step === 1 && !cfg.items && f.type !== 'journal')) && (
          <>
            {f.type !== 'contra' && (
              <>
                <div className="lab">How was it paid?</div>
                <div className="chips">
                  {MODES.map((m) => (
                    <button type="button" key={m.k} className={`chip glass tap ${f.mode === m.k ? 'on' : ''}`} onClick={() => dispatch({ t: 'flow', patch: { mode: m.k } })}>
                      <Icon n={m.ic} size="s" />
                      {m.t}
                    </button>
                  ))}
                </div>
              </>
            )}
            {cfg.accLabel && <Field label={cfg.accLabel} value={f.mode === 'cash' && f.type !== 'contra' ? 'Cash in hand' : cfg.acc ?? ''} icon="bank" />}
            {cfg.items ? (
              <>
                <div className="fld">
                  <div className="lab">{cfg.amtLabel}</div>
                  <div className="inp">
                    <Icon n="rupeeC" size="s" />
                    <input
                      inputMode="numeric"
                      value={String(f.paid)}
                      aria-label={cfg.amtLabel}
                      onChange={(e) => dispatch({ t: 'flow', patch: { paid: Math.max(0, Number(e.target.value.replace(/\D/g, '')) || 0) } })}
                    />
                  </div>
                </div>
                <Glass style={{ padding: '4px 0' }}>
                  <div className="kv"><span className="k">Bill total</span><span className="v">{inr(total)}</span></div>
                  <div className="kv strong" style={{ color: bal > 0 ? 'var(--warn)' : 'var(--pos)' }}>
                    <span className="k" style={{ color: 'inherit' }}>{bal > 0 ? cfg.balLabel : 'Fully paid'}</span>
                    <span className="v">{inr(Math.max(0, bal))}</span>
                  </div>
                </Glass>
              </>
            ) : (
              f.mode !== 'cash' && <Field label="Reference / UTR no." value={f.type === 'payment' ? 'RTGS ICICR52026092600417' : 'NEFT UTR HDFCN26269123'} icon="hash" />
            )}
          </>
        )}

        {f.step === last && (
          <>
            <div className="hero">
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <span className="ico"><Icon n={cfg.ic} /></span>
                <div className="grow">
                  <div className="rs">{cfg.title} · {cfg.no}</div>
                  <div className="amt big" style={{ textAlign: 'left', color: '#fff' }}>{inr(total)}</div>
                  <div className="rs">{f.party} · 26 Sep 2026</div>
                </div>
              </div>
            </div>
            <Glass className="row" style={{ marginTop: 12, color: 'var(--pos)' }}>
              <Icon n="check" />
              <div className="rt">Ready to send to Tally</div>
            </Glass>
            <Sec>Details</Sec>
            <Glass style={{ padding: '4px 0' }}>
              <div className="kv"><span className="k">{cfg.noLabel}</span><span className="v">{cfg.no}</span></div>
              <div className="kv"><span className="k">{cfg.partyLabel}</span><span className="v">{f.party}</span></div>
              <div className="kv"><span className="k">Note</span><span className="v ell">{cfg.note}</span></div>
            </Glass>
            {cfg.items && (
              <>
                <Sec>Items</Sec>
                <Glass style={{ padding: '4px 0' }}>
                  {f.lines.map((l) => (
                    <div className="kv" key={l.name}><span className="k ell">{l.name} × {l.qty}</span><span className="v">{inr(l.rate * l.qty)}</span></div>
                  ))}
                  <div className="kv strong"><span className="k">Bill total</span><span className="v">{inr(total)}</span></div>
                </Glass>
              </>
            )}
          </>
        )}
      </div>
      <div className="foot">
        <button type="button" className="btn btn-g glass tap" onClick={() => (f.step ? dispatch({ t: 'flow', patch: { step: f.step - 1 } }) : back())}>
          {f.step ? 'Back' : 'Cancel'}
        </button>
        {f.step < last ? (
          <button type="button" className="btn btn-p w2 tap" disabled={!canNext} onClick={() => dispatch({ t: 'flow', patch: { step: f.step + 1 } })}>
            Next <Icon n="arrow" size="s" />
          </button>
        ) : (
          <button type="button" className="btn btn-a w2 tap" onClick={() => dispatch({ t: 'saveFlow' })}>
            <Icon n="check" size="s" /> Save
          </button>
        )}
      </div>
    </div>
  );
}
