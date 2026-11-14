// Scroll choreography for the 3D phone (desktop experience).
//
// Sections register scroll "keys" (via GSAP ScrollTrigger positions); each key
// holds a pose — position as a fraction of the viewport, rotation, scale —
// and the app screen to show. The director interpolates between keys from
// the scroll position; the R3F scene damps toward the result every frame.
// No React state is touched per frame: the scene reads `director.target`.
import { useSyncExternalStore } from 'react';
import gsap from 'gsap';
import type { ScreenKey } from '../demo/data';

export type Pose = { x: number; y: number; rx: number; ry: number; rz: number; s: number; hidden?: boolean };
export type Shot = { screen: ScreenKey; params?: Record<string, string> };
export type Key = { at: number; pose: Pose; shot?: Shot };

export const POSES = {
  // Hero framing from the landing reference: turned so the left edge comes
  // forward, top tipped back and leaning right. Sized per viewport (heroPose).
  hero: { x: 0.14, y: -0.065, rx: -0.1, ry: 0.38, rz: -0.06, s: 1.05 },
  about: { x: -0.22, y: 0, rx: 0.03, ry: 0.4, rz: -0.025, s: 0.94 },
  dash: { x: 0, y: -0.005, rx: 0, ry: 0, rz: 0, s: 1.14 },
  feat: { x: -0.235, y: -0.01, rx: 0.02, ry: 0.22, rz: -0.01, s: 1 },
  exit: { x: -0.62, y: 0.95, rx: 0.3, ry: 0.9, rz: 0.25, s: 0.8, hidden: true },
  // Off to the left while the live demo and screens strip are on screen.
  aside: { x: -0.85, y: 0, rx: 0.02, ry: 0.5, rz: 0, s: 0.9, hidden: true },
} satisfies Record<string, Pose>;

/** The hero's free vertical band (CSS px from the top of the page): below the navbar, above the feature strip. */
export type HeroBand = { top: number; bottom: number };
/** Share of the band the phone may fill, leaving room for its tilt and float. */
const HERO_FILL = 0.88;

/**
 * The hero pose and the phone's on-screen box. The phone is up to ~24% of
 * the viewport wide (reference design), but never taller than the hero band
 * allows, and is centred in that band. Phone size on screen: 0.7006·s·vh
 * tall, 0.3401·s·vh·cos(ry) wide (same geometry as featPose).
 */
export function heroLayout(vw: number, vh: number, band?: HeroBand) {
  const viewH = 2 * Math.tan((15 * Math.PI) / 180) * 4.4;
  let s = Math.min(1.1, Math.max(0.82, (0.24 * vw * viewH) / (0.8 * vh * Math.cos(POSES.hero.ry))));
  let cy = vh * (0.5 - POSES.hero.y);
  if (band && band.bottom > band.top) {
    s = Math.max(0.55, Math.min(s, (HERO_FILL * (band.bottom - band.top)) / (0.7006 * vh)));
    cy = (band.top + band.bottom) / 2;
  }
  const pose: Pose = { ...POSES.hero, s, y: 0.5 - cy / vh };
  const h = 0.7006 * s * vh;
  const w = 0.3401 * s * vh * Math.cos(POSES.hero.ry);
  return { pose, box: { cx: vw * (0.5 + POSES.hero.x), cy, w, h } };
}

export function heroPose(vw: number, vh: number, band?: HeroBand): Pose {
  return heroLayout(vw, vh, band).pose;
}

const lerpPose = (a: Pose, b: Pose, t: number): Pose => ({
  x: a.x + (b.x - a.x) * t,
  y: a.y + (b.y - a.y) * t,
  rx: a.rx + (b.rx - a.rx) * t,
  ry: a.ry + (b.ry - a.ry) * t,
  rz: a.rz + (b.rz - a.rz) * t,
  s: a.s + (b.s - a.s) * t,
  hidden: t >= 0.98 ? b.hidden : a.hidden && b.hidden,
});

const easeInOut = gsap.parseEase('power2.inOut');

/**
 * The Tally Connect AI robot rides at the phone's left side, wherever the
 * phone is (ScrollRobot reads phoneRect). These keys only set its size and
 * visibility: w: width (vw) · o: opacity · bo: its speech card's opacity.
 * (l and b are kept for the first frame, before the phone has drawn.)
 */
export type RobotPose = { l: number; b: number; w: number; o: number; bo: number };
export type RobotKey = { at: number; pose: RobotPose };
export const ROBOT = {
  hero: { l: 46, b: 9, w: 15.5, o: 1, bo: 1 },
  about: { l: 7, b: 9, w: 12.5, o: 1, bo: 0 },
  gone: { l: -16, b: 9, w: 12.5, o: 0, bo: 0 },
} satisfies Record<string, RobotPose>;
const lerpRobot = (a: RobotPose, b: RobotPose, t: number): RobotPose => ({
  l: a.l + (b.l - a.l) * t,
  b: a.b + (b.b - a.b) * t,
  w: a.w + (b.w - a.w) * t,
  o: a.o + (b.o - a.o) * t,
  bo: a.bo + (b.bo - a.bo) * t,
});

type Listener = () => void;

class Director {
  keys: Key[] = [{ at: 0, pose: POSES.hero, shot: { screen: 'home' } }];
  target: Pose = { ...POSES.hero };
  /** Extra sway from the feature showcase (x as viewport fraction, ry in rad). */
  sway = { x: 0, ry: 0, s: 0 };
  /** 0 → 1 entrance animation. */
  intro = { v: 0 };
  pointer = { x: 0, y: 0 };
  robotKeys: RobotKey[] = [{ at: 0, pose: ROBOT.hero }];
  robot: RobotPose = { ...ROBOT.hero };
  /** The phone's current on-screen box (CSS px), written by the 3D scene each frame. */
  phoneRect: { cx: number; cy: number; w: number; h: number } | null = null;
  hidden = false;
  private shot: Shot = { screen: 'home' };
  private override: Shot | null = null;
  private shotListeners = new Set<Listener>();
  private hiddenListeners = new Set<Listener>();

  setKeys(keys: Key[]) {
    this.keys = keys.slice().sort((a, b) => a.at - b.at);
    this.update(window.scrollY);
  }

  setRobotKeys(keys: RobotKey[]) {
    this.robotKeys = keys.slice().sort((a, b) => a.at - b.at);
    this.update(window.scrollY);
  }

  private updateRobot(y: number) {
    const k = this.robotKeys;
    let i = 0;
    while (i < k.length - 1 && y >= k[i + 1]!.at) i++;
    const a = k[i]!;
    const b = k[i + 1];
    this.robot = b && y >= a.at ? lerpRobot(a.pose, b.pose, easeInOut(b.at > a.at ? (y - a.at) / (b.at - a.at) : 1)) : a.pose;
  }

  update(y: number) {
    this.updateRobot(y);
    const k = this.keys;
    let i = 0;
    while (i < k.length - 1 && y >= k[i + 1]!.at) i++;
    const a = k[i]!;
    const b = k[i + 1];
    let pose = a.pose;
    let shotIdx = i;
    if (b && y >= a.at) {
      const raw = b.at > a.at ? (y - a.at) / (b.at - a.at) : 1;
      pose = lerpPose(a.pose, b.pose, easeInOut(raw));
      if (raw > 0.5) shotIdx = i + 1;
    }
    let shot: Shot | undefined;
    for (let j = shotIdx; j >= 0 && !shot; j--) shot = k[j]!.shot;
    this.target = pose;
    if (shot) this.setShot(shot, false);
    const hidden = !!pose.hidden;
    if (hidden !== this.hidden) {
      this.hidden = hidden;
      this.hiddenListeners.forEach((l) => l());
    }
  }

  /** The feature showcase takes over the screen while it is pinned. */
  setOverride(s: Shot | null) {
    const o = this.override;
    if (s === o || (s && o && s.screen === o.screen && JSON.stringify(s.params) === JSON.stringify(o.params))) return;
    this.override = s;
    this.shotListeners.forEach((l) => l());
  }

  private setShot(s: Shot, force: boolean) {
    if (!force && s.screen === this.shot.screen && JSON.stringify(s.params) === JSON.stringify(this.shot.params)) return;
    this.shot = s;
    this.shotListeners.forEach((l) => l());
  }

  getShot = (): Shot => this.override ?? this.shot;
  subscribeShot = (l: Listener) => {
    this.shotListeners.add(l);
    return () => this.shotListeners.delete(l);
  };
  getHidden = () => this.hidden;
  subscribeHidden = (l: Listener) => {
    this.hiddenListeners.add(l);
    return () => this.hiddenListeners.delete(l);
  };
}

export const director = new Director();

export const usePhoneShot = () => useSyncExternalStore(director.subscribeShot, director.getShot, director.getShot);
export const usePhoneHidden = () => useSyncExternalStore(director.subscribeHidden, director.getHidden, director.getHidden);
