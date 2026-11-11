// Layout of the pinned Feature Showcase (desktop): heading, the feature card,
// the tab bar and where the 3D phone sits inside the card. The section and the
// phone's scroll pose both read it, so the phone always lands inside the card.
import { POSES, type Pose } from './phoneDirector';

/** Phone size on screen per unit of pose scale (see PhoneScene geometry). */
const PHONE_H_PER_S = 0.7006; // × viewport height
const PHONE_W_PER_S = 0.3401; // × viewport height (before the y-rotation)

export type FeatLayout = {
  left: number;
  right: number;
  headTop: number;
  /** Hides the heading's description on short screens. */
  showDesc: boolean;
  cardTop: number;
  cardBottom: number;
  tabsTop: number;
  tabsH: number;
  phone: { cx: number; cy: number; w: number; h: number; s: number };
  /** Where the sliding feature content starts inside the card (page x). */
  contentLeft: number;
  /** Right-hand illustration width (0 when there is no room). */
  artW: number;
};

export function featLayout(vw: number, vh: number): FeatLayout {
  const left = Math.max(32, (vw - 1320) / 2);
  const right = vw - left;
  const cardW = right - left;
  const showDesc = vh >= 700;
  const headTop = 100;
  // Kicker + one-line heading (+ two-line description): see SectionHead.
  const headH = showDesc ? 132 : 82;
  const cardTop = headTop + headH + 16;
  const tabsH = 64;
  const tabsTop = vh - 34 - 12 - tabsH;
  const cardBottom = tabsTop - 16;
  const cardH = cardBottom - cardTop;

  // Phone fits inside the card with clear space above and below.
  const ry = POSES.feat.ry;
  const s = Math.min(1, Math.max(0.5, (cardH * 0.86) / (PHONE_H_PER_S * vh)));
  const h = PHONE_H_PER_S * s * vh;
  const w = PHONE_W_PER_S * s * vh * Math.cos(ry);
  const cx = left + Math.max(40, cardW * 0.055) + w / 2;
  const cy = (cardTop + cardBottom) / 2;

  const contentLeft = cx + w / 2 + Math.max(36, cardW * 0.04);
  const room = right - contentLeft;
  const artW = room > 700 ? Math.min(250, cardW * 0.19) : 0;
  return { left, right, headTop, showDesc, cardTop, cardBottom, tabsTop, tabsH, phone: { cx, cy, w, h, s }, contentLeft, artW };
}

/** The phone's pose for the showcase, placed from the layout above. */
export function featPose(vw: number, vh: number): Pose {
  const { phone } = featLayout(vw, vh);
  return { ...POSES.feat, x: (phone.cx - vw / 2) / vw, y: (vh / 2 - phone.cy) / vh, s: phone.s };
}
