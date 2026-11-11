// State and navigation for the demo phone. Mirrors the app's AppController
// navigation rules (go / back / selectTab with a history stack and a
// forward/back direction for the slide), with sample data only.
import { createContext, useContext, useMemo, useReducer, type ReactNode } from 'react';
import {
  ACTS,
  FLOWS,
  NOTIFS,
  START_LINES,
  TABS,
  TEAM,
  type Act,
  type KindKey,
  type Line,
  type Member,
  type ScreenKey,
} from './data';

export type Params = Record<string, string>;
export type Overlay = null | 'menu' | 'search' | 'company' | 'pickParty' | 'pickItem';

export type FlowState = {
  type: KindKey;
  step: number;
  party: string;
  lines: Line[];
  mode: string;
  paid: number;
};

export type AppState = {
  screen: ScreenKey;
  params: Params;
  history: { screen: ScreenKey; params: Params }[];
  dir: 'fwd' | 'bk';
  nav: number; // bumps on every navigation (keys the entry animation)
  overlay: Overlay;
  toast: { id: number; msg: string } | null;
  look: string;
  acts: Act[];
  readIds: string[];
  team: Member[];
  flow: FlowState;
  pinnedTab: number;
};

function newFlow(type: KindKey): FlowState {
  const cfg = FLOWS[type];
  const lines = type === 'sales' || type === 'purchase' ? START_LINES[type].map((l) => ({ ...l })) : [];
  return { type, step: 0, party: cfg.party, lines, mode: type === 'contra' ? 'cash' : 'bank', paid: cfg.amt ?? 0 };
}

type Action =
  | { t: 'go'; screen: ScreenKey; params?: Params }
  | { t: 'jump'; screen: ScreenKey; params?: Params }
  | { t: 'back' }
  | { t: 'tab'; i: number }
  | { t: 'overlay'; o: Overlay }
  | { t: 'toast'; msg: string | null }
  | { t: 'look'; k: string }
  | { t: 'startFlow'; k: KindKey }
  | { t: 'flow'; patch: Partial<FlowState> }
  | { t: 'saveFlow' }
  | { t: 'actStatus'; id: string; st: Act['st']; note?: string }
  | { t: 'readAll' }
  | { t: 'read'; id: string }
  | { t: 'team'; id: string; patch: Partial<Member> }
  | { t: 'login' };

const tabIndex = (s: ScreenKey) => TABS.findIndex((x) => x.k === s);

function reducer(s: AppState, a: Action): AppState {
  switch (a.t) {
    case 'go': {
      const ti = tabIndex(a.screen);
      if (ti >= 0) return reducer(s, { t: 'tab', i: ti });
      return {
        ...s,
        history: [...s.history, { screen: s.screen, params: s.params }],
        screen: a.screen,
        params: a.params ?? {},
        dir: 'fwd',
        nav: s.nav + 1,
        overlay: null,
      };
    }
    case 'jump':
      if (a.screen === s.screen && JSON.stringify(a.params ?? {}) === JSON.stringify(s.params)) return s;
      return { ...s, screen: a.screen, params: a.params ?? {}, history: [], dir: 'fwd', nav: s.nav + 1, overlay: null };
    case 'back': {
      if (s.overlay) return { ...s, overlay: null };
      const prev = s.history[s.history.length - 1];
      if (!prev) {
        if (s.screen === 'home') return s;
        return { ...s, screen: 'home', params: {}, dir: 'bk', nav: s.nav + 1, pinnedTab: 0 };
      }
      return { ...s, screen: prev.screen, params: prev.params, history: s.history.slice(0, -1), dir: 'bk', nav: s.nav + 1 };
    }
    case 'tab': {
      const k = TABS[a.i]!.k;
      const cur = tabIndex(s.screen);
      return {
        ...s,
        screen: k,
        params: {},
        history: [],
        overlay: null,
        dir: cur >= 0 && a.i < cur ? 'bk' : 'fwd',
        nav: s.nav + 1,
        pinnedTab: a.i,
      };
    }
    case 'overlay':
      return { ...s, overlay: a.o };
    case 'toast':
      return { ...s, toast: a.msg ? { id: Date.now(), msg: a.msg } : null };
    case 'look':
      return { ...s, look: a.k };
    case 'startFlow':
      return reducer({ ...s, flow: newFlow(a.k) }, { t: 'go', screen: 'flow' });
    case 'flow':
      return { ...s, flow: { ...s.flow, ...a.patch } };
    case 'saveFlow': {
      const f = s.flow;
      const cfg = FLOWS[f.type];
      const total = f.lines.length
        ? f.lines.reduce((x, l) => x + l.rate * l.qty * (1 + l.gst / 100), 0)
        : cfg.amt ?? 0;
      const act: Act = { id: `n${Date.now()}`, k: f.type, no: cfg.no, party: f.party, amt: Math.round(total), time: 'Just now', st: 'wait' };
      return {
        ...s,
        acts: [act, ...s.acts],
        screen: 'home',
        params: {},
        history: [],
        dir: 'bk',
        nav: s.nav + 1,
        pinnedTab: 0,
        toast: { id: Date.now(), msg: 'Saved! It will reach Tally by itself' },
      };
    }
    case 'actStatus':
      return { ...s, acts: s.acts.map((x) => (x.id === a.id ? { ...x, st: a.st, note: a.note } : x)) };
    case 'readAll':
      return { ...s, readIds: NOTIFS.map((n) => n.id), toast: { id: Date.now(), msg: 'All marked as read' } };
    case 'read':
      return s.readIds.includes(a.id) ? s : { ...s, readIds: [...s.readIds, a.id] };
    case 'team':
      return { ...s, team: s.team.map((m) => (m.id === a.id ? { ...m, ...a.patch } : m)) };
    case 'login':
      return { ...s, screen: 'home', params: {}, history: [], dir: 'fwd', nav: s.nav + 1, pinnedTab: 0, toast: { id: Date.now(), msg: 'Welcome back' } };
  }
}

export function initialState(screen: ScreenKey = 'home', params: Params = {}): AppState {
  const ti = tabIndex(screen);
  return {
    screen,
    params,
    history: [],
    dir: 'fwd',
    nav: 0,
    overlay: null,
    toast: null,
    look: 'aurora',
    acts: ACTS,
    readIds: [],
    team: TEAM,
    flow: newFlow('sales'),
    pinnedTab: ti >= 0 ? ti : 0,
  };
}

type Api = {
  s: AppState;
  live: boolean;
  go: (screen: ScreenKey, params?: Params) => void;
  back: () => void;
  tab: (i: number) => void;
  open: (o: Overlay) => void;
  close: () => void;
  say: (msg: string) => void;
  dispatch: (a: Action) => void;
};

const Ctx = createContext<Api | null>(null);

export function useApp(): Api {
  const v = useContext(Ctx);
  if (!v) throw new Error('useApp outside AppProvider');
  return v;
}

export function useAppReducer(screen: ScreenKey, params?: Params) {
  return useReducer(reducer, undefined, () => initialState(screen, params));
}

export function AppProvider({
  state,
  dispatch,
  live,
  children,
}: {
  state: AppState;
  dispatch: (a: Action) => void;
  live: boolean;
  children: ReactNode;
}) {
  const api = useMemo<Api>(
    () => ({
      s: state,
      live,
      go: (screen, params) => dispatch({ t: 'go', screen, params }),
      back: () => dispatch({ t: 'back' }),
      tab: (i) => dispatch({ t: 'tab', i }),
      open: (o) => dispatch({ t: 'overlay', o }),
      close: () => dispatch({ t: 'overlay', o: null }),
      say: (msg) => dispatch({ t: 'toast', msg }),
      dispatch,
    }),
    [state, live, dispatch],
  );
  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export type { Action };
