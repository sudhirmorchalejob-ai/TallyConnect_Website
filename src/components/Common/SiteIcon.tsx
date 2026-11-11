import { ICONS, type IconName } from '../../demo/icons';

/** The app's own stroke icons, for use on the marketing page. */
export function SiteIcon({ n, size = 22, stroke = 1.9, className = '' }: { n: IconName; size?: number; stroke?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`flex-none ${className}`}
      aria-hidden="true"
    >
      <path d={ICONS[n]} />
    </svg>
  );
}

export function Logo({ className = 'h-8' }: { className?: string }) {
  return <img src="/images/tc_logo.png" alt="Tally Connect" width={1200} height={328} className={`w-auto ${className}`} />;
}
