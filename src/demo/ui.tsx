// Small building blocks matching the app's widgets (tc_kit.dart / common.dart):
// Glass, Ico, CBtn, NavRow, BackNav, H1, Sub, Sec, Chips, Seg, Badge, Btn.
import type { CSSProperties, ReactNode } from 'react';
import { ICONS, type IconName } from './icons';
import { useApp } from './store';
import { TITLES } from './data';

export function Icon({ n, size, className = '' }: { n: IconName; size?: 's' | 'xs' | 'l'; className?: string }) {
  return (
    <svg className={`i ${size ?? ''} ${className}`} viewBox="0 0 24 24" aria-hidden="true">
      <path d={ICONS[n]} />
    </svg>
  );
}

export function Glass({
  children,
  className = '',
  style,
  onClick,
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
  as?: 'div' | 'button';
}) {
  if (as === 'button' || onClick) {
    return (
      <button type="button" className={`glass tap ${className}`} style={style} onClick={onClick}>
        {children}
      </button>
    );
  }
  return (
    <div className={`glass ${className}`} style={style}>
      {children}
    </div>
  );
}

export function Ico({ n, size, navy }: { n: IconName; size?: 'sm' | 'xs'; navy?: boolean }) {
  return (
    <span className={`ico ${size ?? ''} ${navy ? 'navy' : ''}`}>
      <Icon n={n} size={size === 'xs' ? 's' : undefined} />
    </span>
  );
}

export function CBtn({ n, onClick, dot, label, small }: { n: IconName; onClick: () => void; dot?: boolean; label: string; small?: boolean }) {
  return (
    <button type="button" aria-label={label} className={`cbtn glass tap ${small ? 'sm' : ''}`} onClick={onClick}>
      <Icon n={n} />
      {dot && <span className="ndot" />}
    </button>
  );
}

/** Top row on tab screens: menu · title-space · actions. */
export function NavRow({ children }: { children?: ReactNode }) {
  const { open } = useApp();
  return (
    <div className="nav">
      <CBtn n="menu" label="Open menu" onClick={() => open('menu')} />
      <div className="grow" />
      {children}
    </div>
  );
}

/** Back pill with the previous screen's name (app: BackNav). */
export function BackNav({ children, label }: { children?: ReactNode; label?: string }) {
  const { s, back } = useApp();
  const prev = s.history[s.history.length - 1];
  const name = label ?? (prev ? TITLES[prev.screen] : 'Home');
  return (
    <div className="nav">
      <button type="button" className="backp glass tap" onClick={back}>
        <Icon n="chevL" size="s" />
        {name}
      </button>
      <div className="grow" />
      {children}
    </div>
  );
}

export const H1 = ({ children, style }: { children: ReactNode; style?: CSSProperties }) => (
  <h1 className="h1" style={style}>
    {children}
  </h1>
);
export const Sub = ({ children }: { children: ReactNode }) => <p className="sub">{children}</p>;
export const Sec = ({ children, style }: { children: ReactNode; style?: CSSProperties }) => (
  <div className="sec" style={style}>
    {children}
  </div>
);

export function Chips<T extends string>({ items, value, onChange }: { items: [T, string][]; value: T; onChange: (v: T) => void }) {
  return (
    <div className="chips" data-lenis-prevent>
      {items.map(([k, t]) => (
        <button type="button" key={k} className={`chip glass tap ${value === k ? 'on' : ''}`} onClick={() => onChange(k)}>
          {t}
        </button>
      ))}
    </div>
  );
}

export function Seg<T extends string>({ items, value, onChange }: { items: [T, string][]; value: T; onChange: (v: T) => void }) {
  return (
    <div className="seg glass">
      {items.map(([k, t]) => (
        <button type="button" key={k} className={value === k ? 'on' : ''} onClick={() => onChange(k)}>
          {t}
        </button>
      ))}
    </div>
  );
}

export function Badge({ kind, children }: { kind: 'ok' | 'warn' | 'bad' | 'info' | 'acc'; children: ReactNode }) {
  return <span className={`badge ${kind}`}>{children}</span>;
}

export function Chev() {
  return (
    <span className="chev">
      <Icon n="chevR" size="s" />
    </span>
  );
}

export function Row({
  children,
  onClick,
  style,
}: {
  children: ReactNode;
  onClick?: () => void;
  style?: CSSProperties;
}) {
  if (!onClick)
    return (
      <div className="row" style={style}>
        {children}
      </div>
    );
  return (
    <button type="button" className="row tap" style={style} onClick={onClick}>
      {children}
    </button>
  );
}

export function StatusBadge({ st }: { st: 'ok' | 'wait' | 'fail' }) {
  if (st === 'ok')
    return (
      <Badge kind="ok">
        <Icon n="check" size="xs" />
        In Tally
      </Badge>
    );
  if (st === 'wait')
    return (
      <Badge kind="warn">
        <Icon n="clock" size="xs" />
        Waiting
      </Badge>
    );
  return (
    <Badge kind="bad">
      <Icon n="alert" size="xs" />
      Not sent
    </Badge>
  );
}
