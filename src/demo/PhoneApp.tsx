// The Tally Connect app UI (390 × 844), recreated in React with sample data.
// Used by the 3D phone (driven by scroll), the interactive demo and the
// screen gallery. `screen` makes it controlled from outside; `interactive`
// lets visitors tap through it.
import { AnimatePresence, motion } from 'framer-motion';
import { memo, useEffect, type CSSProperties } from 'react';
import './tc-app.css';
import { LOOKS, NO_TAB, TABS, type ScreenKey } from './data';
import { OverlayLayer } from './Overlays';
import { AppProvider, useApp, useAppReducer, type Params } from './store';
import { Icon } from './ui';
import { AssistantFab, HomeScreen, LoginScreen, NotifsScreen } from './screens/HomeScreens';
import { FlowScreen, NewEntryScreen } from './screens/EntryScreens';
import { BillDetailScreen, EntryDetailScreen, OutHubScreen, OutListScreen, VoucherListScreen } from './screens/LedgerScreens';
import { ItemsScreen, PartyDetailScreen, PartyScreen } from './screens/StockPartyScreens';
import { FinReportScreen, ReportScreen, ReportsScreen } from './screens/ReportScreens';
import { ActivityScreen, SettingsScreen, TeamAccessScreen, TeamScreen } from './screens/TeamScreens';

function Screen({ k }: { k: ScreenKey }) {
  switch (k) {
    case 'login': return <LoginScreen />;
    case 'home': return <HomeScreen />;
    case 'notifs': return <NotifsScreen />;
    case 'newEntry': return <NewEntryScreen />;
    case 'flow': return <FlowScreen />;
    case 'vList': return <VoucherListScreen />;
    case 'entryDetail': return <EntryDetailScreen />;
    case 'outHub': return <OutHubScreen />;
    case 'outList': return <OutListScreen />;
    case 'billDetail': return <BillDetailScreen />;
    case 'items': return <ItemsScreen />;
    case 'party': return <PartyScreen />;
    case 'partyDetail': return <PartyDetailScreen />;
    case 'reports': return <ReportsScreen />;
    case 'report': return <ReportScreen />;
    case 'finReport': return <FinReportScreen />;
    case 'activity': return <ActivityScreen />;
    case 'team': return <TeamScreen />;
    case 'teamAccess': return <TeamAccessScreen />;
    case 'settings': return <SettingsScreen />;
  }
}

function TabBar() {
  const { s, tab } = useApp();
  const cur = TABS.findIndex((t) => t.k === s.screen);
  const pos = cur >= 0 ? cur : s.pinnedTab;
  return (
    <div className="tabbar" role="tablist" aria-label="App tabs">
      <motion.span
        className="pill"
        initial={false}
        animate={{ left: 6 + pos * 70 }}
        transition={{ type: 'spring', stiffness: 420, damping: 26, mass: 0.9 }}
      />
      {TABS.map((t, i) => (
        <button
          type="button"
          role="tab"
          aria-selected={i === cur}
          key={t.k}
          className={`tab ${i === cur ? 'on' : ''}`}
          style={{ left: 6 + i * 70 }}
          onClick={() => tab(i)}
        >
          <Icon n={t.ic} />
          {t.t}
        </button>
      ))}
    </div>
  );
}

function Toast() {
  const { s, dispatch } = useApp();
  const id = s.toast?.id;
  useEffect(() => {
    if (!id) return;
    const t = window.setTimeout(() => dispatch({ t: 'toast', msg: null }), 2600);
    return () => window.clearTimeout(t);
  }, [id, dispatch]);
  return (
    <AnimatePresence>
      {s.toast && (
        <motion.div
          key={s.toast.id}
          className="toast"
          role="status"
          initial={{ opacity: 0, y: -16, scale: 0.94, x: '-50%' }}
          animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
          exit={{ opacity: 0, y: -10, x: '-50%' }}
          transition={{ duration: 0.42, ease: [0.3, 1.5, 0.5, 1] }}
        >
          <Icon n="check" size="s" />
          {s.toast.msg}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** New entries saved in the demo reach "In Tally" after a few seconds, like the app. */
function SyncSimulator() {
  const { s, dispatch } = useApp();
  const waiting = s.acts.filter((a) => a.id.startsWith('n') && a.st === 'wait').map((a) => a.id).join(',');
  useEffect(() => {
    if (!waiting) return;
    const ids = waiting.split(',');
    const t = window.setTimeout(() => ids.forEach((id) => dispatch({ t: 'actStatus', id, st: 'ok' })), 5000);
    return () => window.clearTimeout(t);
  }, [waiting, dispatch]);
  return null;
}

function Shell() {
  const { s, live, say } = useApp();
  const look = LOOKS.find((l) => l.k === s.look) ?? LOOKS[0]!;
  const vars = {
    '--acc': look.acc[0], '--acc2': look.acc[1], '--acc3': look.acc[2],
    '--navy': look.navy[0], '--navy2': look.navy[1], '--navy3': look.navy[2],
    '--ink': look.ink[0], '--ink2': look.ink[1], '--ink3': look.ink[2],
    '--wall': look.wall, '--o1': look.orbs[0], '--o2': look.orbs[1], '--o3': look.orbs[2],
  } as CSSProperties;
  const tabs = !NO_TAB.includes(s.screen);
  return (
    <div className={`tc ${live ? 'live' : ''}`} style={vars}>
      <div className="wall" />
      <span className="orb o1" />
      <span className="orb o2" />
      <span className="orb o3" />
      <div className="sbar" aria-hidden="true">
        <span>9:41</span>
        <span className="ic">
          <Icon n="globe" size="xs" />
          <span className="batt"><i /></span>
        </span>
      </div>
      <div className="demo-tag" aria-hidden="true">Demo data</div>
      <motion.div
        key={s.nav}
        style={{ position: 'absolute', inset: 0 }}
        initial={{ opacity: 0, x: s.dir === 'bk' ? -30 : 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.42, ease: [0.2, 0.85, 0.2, 1] }}
      >
        <Screen k={s.screen} />
      </motion.div>
      {tabs && <TabBar />}
      {s.screen === 'home' && !s.overlay && (
        <AssistantFab onClick={() => say('The AI assistant answers from your own company data')} />
      )}
      <OverlayLayer />
      <Toast />
      <SyncSimulator />
    </div>
  );
}

export type PhoneAppProps = {
  screen?: ScreenKey;
  params?: Params;
  interactive?: boolean;
  look?: string;
};

function PhoneAppImpl({ screen = 'home', params, interactive = false, look }: PhoneAppProps) {
  const [state, dispatch] = useAppReducer(screen, params);
  const pkey = JSON.stringify(params ?? {});
  // Controlled from outside (scroll-driven phone, gallery).
  useEffect(() => {
    if (!interactive) dispatch({ t: 'jump', screen, params });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen, pkey, interactive]);
  useEffect(() => {
    if (look) dispatch({ t: 'look', k: look });
  }, [look, dispatch]);
  return (
    <AppProvider state={state} dispatch={dispatch} live={interactive}>
      <div
        style={interactive ? undefined : { pointerEvents: 'none' }}
        aria-hidden={interactive ? undefined : true}
        {...(interactive ? {} : { inert: '' as unknown as boolean })}
      >
        <Shell />
      </div>
    </AppProvider>
  );
}

export const PhoneApp = memo(PhoneAppImpl);
export default PhoneApp;
