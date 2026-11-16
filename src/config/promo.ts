// 6-month free access promotional popup — when and how often it shows.
export const PROMO = {
  /** Turn the popup off entirely. */
  enabled: true,
  /** Wait after the page loads before showing it. */
  delayMs: 1000,
  /**
   * After it is closed (or its button used), wait this many days before showing it again.
   * 0 = show on every visit / page load (closing only hides it until the next visit).
   */
  snoozeDays: 0,
  /** localStorage key that remembers when it was last dismissed. */
  storageKey: 'tc-promo-free-access-dismissed-at',
};

/** The banner artwork (rounded corners transparent) and where its × and CTA are, in % of the image. */
export const PROMO_BANNER = {
  src: '/images/promo/tc_free_access_banner.webp',
  srcSmall: '/images/promo/tc_free_access_banner_960.webp',
  width: 1721,
  height: 907,
  close: { left: 94.5, top: 1.5, width: 4.9, height: 9.5 },
  cta: { left: 3.8, top: 81.8, width: 37, height: 14.3 },
};
