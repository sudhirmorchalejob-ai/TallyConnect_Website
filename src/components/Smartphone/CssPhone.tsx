// A realistic device frame in plain CSS: titanium edge, black glass bezel,
// side buttons, island, screen glare and a soft contact shadow. Holds the
// 390 × 844 app UI scaled to `width`.
import { lazy, Suspense, type CSSProperties, type ReactNode } from 'react';
import type { PhoneAppProps } from '../../demo/PhoneApp';
import { useNearViewport } from '../../hooks/useMedia';
import './phone.css';

const PhoneApp = lazy(() => import('../../demo/PhoneApp'));

const SCREEN_W = 390;
const SCREEN_H = 844;
const BEZEL = 11;

export function CssPhone({
  width = 300,
  app,
  className = '',
  style,
  tilt = false,
  label,
  children,
}: {
  width?: number;
  app?: PhoneAppProps;
  className?: string;
  style?: CSSProperties;
  tilt?: boolean;
  label?: string;
  children?: ReactNode;
}) {
  const inner = width - BEZEL * 2 * (width / (SCREEN_W + BEZEL * 2));
  const scale = inner / SCREEN_W;
  const pad = (width - inner) / 2;
  const height = SCREEN_H * scale + pad * 2;
  const [ref, near] = useNearViewport<HTMLDivElement>('400px');
  return (
    <div
      ref={ref}
      className={`cssphone ${tilt ? 'tilt' : ''} ${className}`}
      style={{ width, height, ...style }}
      role={label ? 'img' : undefined}
      aria-label={label}
    >
      <div className="cssphone-body" style={{ borderRadius: width * 0.155, padding: pad }}>
        <span className="cssphone-btn b1" />
        <span className="cssphone-btn b2" />
        <span className="cssphone-btn b3" />
        <div className="cssphone-screen" style={{ borderRadius: width * 0.125, width: inner, height: SCREEN_H * scale }}>
          <div style={{ width: SCREEN_W, height: SCREEN_H, transform: `scale(${scale})`, transformOrigin: '0 0' }}>
            {children ??
              (near && app ? (
                <Suspense fallback={<div className="cssphone-loading" />}>
                  <PhoneApp {...app} />
                </Suspense>
              ) : (
                <div className="cssphone-loading" />
              ))}
          </div>
          <span className="cssphone-island" style={{ width: inner * 0.3, height: inner * 0.085, top: inner * 0.03 }} />
          <span className="cssphone-glare" />
        </div>
      </div>
      <span className="cssphone-shadow" />
    </div>
  );
}
