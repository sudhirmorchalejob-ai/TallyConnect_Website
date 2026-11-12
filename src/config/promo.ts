// 6-month free access promotional popup — when and how often it shows.
export const PROMO = {
  /** Turn the popup off entirely. */
  enabled: true,
  /** Wait after the page loads before showing it. */
  delayMs: 1000,
  /** After it is closed (or its button used), wait this many days before showing it again. */
  snoozeDays: 7,
  /** Offer window from the banner (inclusive). The popup only shows inside it. */
  startsOn: '2026-11-01',
  endsOn: '2027-04-30',
  /** localStorage key that remembers when it was last dismissed. */
  storageKey: 'tc-promo-free-access-dismissed-at',
};

/** The banner artwork (rounded corners transparent) and where its × and CTA are, in % of the image. */
export const PROMO_BANNER = {
  src: '/images/promo/tc_free_access_banner.webp',
  srcSmall: '/images/promo/tc_free_access_banner_960.webp',
  width: 1623,
  height: 848,
  close: { left: 93.4, top: 1.9, width: 5.3, height: 10.2 },
  cta: { left: 4.0, top: 81.4, width: 36.6, height: 16.6 },
};
