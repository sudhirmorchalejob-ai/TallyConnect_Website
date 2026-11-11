// Demo data for the website's phone screens.
//
// Transcribed from the Tally Connect app's own sample data set
// (Tallyconnect_UI/lib/data/mock/mock_data.dart), which the app shows as
// "Demo Company · Sample data · not from Tally". Nothing here comes from a
// real company, and nothing on the website talks to a server or to Tally.
// Amounts are rupees. "Today" in the sample set is 26 Sep 2026.
import type { IconName } from './icons';

export type KindKey = 'sales' | 'purchase' | 'receipt' | 'payment' | 'journal' | 'contra';

export const DEMO_COMPANY = {
  name: 'Demo Company',
  sub: 'Sample data · not from Tally',
};

export const DEMO_USER = { name: 'Demo user', email: 'demo@example.com' };

export const KINDS: Record<KindKey, { t: string; long: string; ic: IconName; sign: 1 | -1 | 0 }> = {
  sales: { t: 'Sale', long: 'Sale (Sales)', ic: 'bag', sign: 1 },
  purchase: { t: 'Purchase', long: 'Purchase', ic: 'cart', sign: -1 },
  receipt: { t: 'Receipt', long: 'Receipt', ic: 'in', sign: 1 },
  payment: { t: 'Payment', long: 'Payment', ic: 'out', sign: -1 },
  journal: { t: 'Journal', long: 'Journal', ic: 'book', sign: 0 },
  contra: { t: 'Contra', long: 'Contra', ic: 'swap', sign: 0 },
};

export type Voucher = { k: KindKey; party: string; no: string; day: number; amt: number };

export const VOUCHERS: Voucher[] = [
  { k: 'sales', party: 'Mehta Electricals', no: 'Sales 10', day: 24, amt: 84960 },
  { k: 'sales', party: 'Shree Balaji Traders', no: 'Sales 9', day: 21, amt: 112100 },
  { k: 'sales', party: 'Om Sai Electricals', no: 'Sales 8', day: 17, amt: 12980 },
  { k: 'sales', party: 'Patel Traders', no: 'Sales 7', day: 12, amt: 24780 },
  { k: 'sales', party: 'Gupta Hardware Stores', no: 'Sales 6', day: 8, amt: 68440 },
  { k: 'sales', party: 'Sai Enterprises', no: 'Sales 5', day: 3, amt: 45430 },
  { k: 'purchase', party: 'Kiran Steel Industries', no: 'PI-0005', day: 23, amt: 48380 },
  { k: 'purchase', party: 'Havells India Ltd', no: 'PI-0004', day: 19, amt: 36580 },
  { k: 'purchase', party: 'Polycab Wires Pvt Ltd', no: 'PI-0003', day: 14, amt: 24190 },
  { k: 'purchase', party: 'Anchor Electricals', no: 'PI-0002', day: 9, amt: 11800 },
  { k: 'purchase', party: 'Finolex Cables', no: 'PI-0001', day: 2, amt: 5900 },
  { k: 'receipt', party: 'Mehta Electricals', no: 'RCT-0003', day: 26, amt: 25000 },
  { k: 'receipt', party: 'Gupta Hardware Stores', no: 'RCT-0002', day: 18, amt: 125000 },
  { k: 'receipt', party: 'Patel Traders', no: 'RCT-0001', day: 5, amt: 65000 },
  { k: 'payment', party: 'Kiran Steel Industries', no: 'PAY-0003', day: 22, amt: 52000 },
  { k: 'payment', party: 'Havells India Ltd', no: 'PAY-0002', day: 15, amt: 38000 },
  { k: 'payment', party: 'Mahalaxmi Transport', no: 'PAY-0001', day: 3, amt: 8450 },
  { k: 'journal', party: 'Depreciation A/c', no: 'JV-0002', day: 25, amt: 24500 },
  { k: 'journal', party: 'Rent A/c', no: 'JV-0001', day: 10, amt: 35000 },
  { k: 'contra', party: 'Cash → HDFC Bank', no: 'CN-0002', day: 20, amt: 50000 },
  { k: 'contra', party: 'ICICI Bank → Cash', no: 'CN-0001', day: 6, amt: 20000 },
];

export type BillStatus = 'ok' | 'soon' | 'late';
export type Bill = {
  party: string;
  no: string;
  date: string;
  due: string;
  terms: string;
  amt: number;
  st: BillStatus;
  dueText: string;
  city: string;
};

export const RECEIVABLES: Bill[] = [
  { party: 'Shree Balaji Traders', no: 'Sales 9', date: '21 Sep 2026', due: '06 Oct 2026', terms: '15 days', amt: 112100, st: 'ok', dueText: 'Due in 10 days', city: 'Mumbai' },
  { party: 'Mehta Electricals', no: 'Sales 10', date: '24 Sep 2026', due: '24 Oct 2026', terms: '30 days', amt: 84960, st: 'ok', dueText: 'Due in 28 days', city: 'Pune' },
  { party: 'Gupta Hardware Stores', no: 'Sales 6', date: '08 Sep 2026', due: '14 Sep 2026', terms: '6 days', amt: 68440, st: 'late', dueText: '12 days late', city: 'Jaipur' },
  { party: 'Sai Enterprises', no: 'Sales 5', date: '03 Sep 2026', due: '08 Sep 2026', terms: '5 days', amt: 45430, st: 'late', dueText: '18 days late', city: 'Nashik' },
  { party: 'Patel Traders', no: 'Sales 7', date: '12 Sep 2026', due: '27 Sep 2026', terms: '15 days', amt: 24780, st: 'soon', dueText: 'Due tomorrow', city: 'Surat' },
  { party: 'Om Sai Electricals', no: 'Sales 8', date: '17 Sep 2026', due: '02 Oct 2026', terms: '15 days', amt: 12980, st: 'soon', dueText: 'Due in 6 days', city: 'Thane' },
];

export const PAYABLES: Bill[] = [
  { party: 'Kiran Steel Industries', no: 'PI-0005', date: '23 Sep 2026', due: '29 Sep 2026', terms: '6 days', amt: 48380, st: 'soon', dueText: 'Due in 3 days', city: 'Ludhiana' },
  { party: 'Havells India Ltd', no: 'PI-0004', date: '19 Sep 2026', due: '19 Oct 2026', terms: '30 days', amt: 36580, st: 'ok', dueText: 'Due in 23 days', city: 'Noida' },
  { party: 'Polycab Wires Pvt Ltd', no: 'PI-0003', date: '14 Sep 2026', due: '30 Sep 2026', terms: '16 days', amt: 24190, st: 'soon', dueText: 'Due in 4 days', city: 'Mumbai' },
  { party: 'Anchor Electricals', no: 'PI-0002', date: '09 Sep 2026', due: '21 Sep 2026', terms: '12 days', amt: 11800, st: 'late', dueText: '5 days late', city: 'Mumbai' },
  { party: 'Finolex Cables', no: 'PI-0001', date: '02 Sep 2026', due: '16 Sep 2026', terms: '14 days', amt: 5900, st: 'late', dueText: '10 days late', city: 'Pune' },
];

export type Party = { name: string; type: 'c' | 's'; city: string; bal: number };
export const PARTIES: Party[] = [
  { name: 'Shree Balaji Traders', type: 'c', city: 'Mumbai', bal: 112100 },
  { name: 'Mehta Electricals', type: 'c', city: 'Pune', bal: 84960 },
  { name: 'Gupta Hardware Stores', type: 'c', city: 'Jaipur', bal: 68440 },
  { name: 'Kiran Steel Industries', type: 's', city: 'Ludhiana', bal: 48380 },
  { name: 'Sai Enterprises', type: 'c', city: 'Nashik', bal: 45430 },
  { name: 'Havells India Ltd', type: 's', city: 'Noida', bal: 36580 },
  { name: 'Patel Traders', type: 'c', city: 'Surat', bal: 24780 },
  { name: 'Polycab Wires Pvt Ltd', type: 's', city: 'Mumbai', bal: 24190 },
  { name: 'Om Sai Electricals', type: 'c', city: 'Thane', bal: 12980 },
  { name: 'Anchor Electricals', type: 's', city: 'Mumbai', bal: 11800 },
  { name: 'Finolex Cables', type: 's', city: 'Pune', bal: 5900 },
  { name: 'Mahalaxmi Transport', type: 's', city: 'Mumbai', bal: 0 },
  { name: 'Rajesh Hardware', type: 'c', city: 'Mumbai', bal: 0 },
  { name: 'Laxmi Traders', type: 'c', city: 'Vapi', bal: 0 },
];

export type Item = { name: string; stock: number; unit: string; rate: number; st: 'ok' | 'low' | 'out' };
export const ITEMS: Item[] = [
  { name: 'Havells FR Wire 1.5 sq mm (90 m)', stock: 48, unit: 'coil', rate: 1850, st: 'ok' },
  { name: 'Polycab FR Wire 1.0 sq mm (90 m)', stock: 36, unit: 'coil', rate: 1600, st: 'ok' },
  { name: 'Polycab LED Panel 18W', stock: 120, unit: 'pcs', rate: 520, st: 'ok' },
  { name: 'Anchor Roma Switch 6A', stock: 850, unit: 'pcs', rate: 34, st: 'ok' },
  { name: 'Havells MCB 32A DP', stock: 8, unit: 'pcs', rate: 620, st: 'low' },
  { name: 'Crompton Ceiling Fan 1200 mm', stock: 1, unit: 'pcs', rate: 3100, st: 'low' },
  { name: 'Supreme PVC Pipe 1 inch', stock: 0, unit: 'pcs', rate: 85, st: 'out' },
  { name: 'Anchor Roma Socket 16A', stock: 0, unit: 'pcs', rate: 96, st: 'out' },
];

export type ActStatus = 'ok' | 'wait' | 'fail';
export type Act = {
  id: string;
  k: KindKey;
  no: string;
  party: string;
  amt: number;
  time: string;
  st: ActStatus;
  note?: string;
};
export const ACTS: Act[] = [
  { id: 'a1', k: 'receipt', no: 'RCT-0004', party: 'Shree Balaji Traders', amt: 50000, time: '11:05 AM', st: 'fail', note: 'Tally was closed on the Tally PC' },
  { id: 'a2', k: 'sales', no: 'Sales 11', party: 'Om Sai Electricals', amt: 14514, time: '10:58 AM', st: 'wait' },
  { id: 'a3', k: 'purchase', no: 'PI-0006', party: 'Polycab Wires Pvt Ltd', amt: 14160, time: '10:51 AM', st: 'wait' },
  { id: 'a4', k: 'receipt', no: 'RCT-0003', party: 'Mehta Electricals', amt: 25000, time: '10:32 AM', st: 'ok' },
  { id: 'a5', k: 'journal', no: 'JV-0002', party: 'Depreciation A/c', amt: 24500, time: '25 Sep', st: 'ok' },
  { id: 'a6', k: 'sales', no: 'Sales 10', party: 'Mehta Electricals', amt: 84960, time: '24 Sep', st: 'ok' },
  { id: 'a7', k: 'purchase', no: 'PI-0005', party: 'Kiran Steel Industries', amt: 48380, time: '23 Sep', st: 'ok' },
  { id: 'a8', k: 'payment', no: 'PAY-0003', party: 'Kiran Steel Industries', amt: 52000, time: '22 Sep', st: 'ok' },
  { id: 'a9', k: 'sales', no: 'Sales 9', party: 'Shree Balaji Traders', amt: 112100, time: '21 Sep', st: 'ok' },
  { id: 'a10', k: 'contra', no: 'CN-0002', party: 'Cash → HDFC Bank', amt: 50000, time: '20 Sep', st: 'ok' },
];

export type Member = { id: string; name: string; email: string; role: string; st: 'active' | 'pending' | 'off' };
export const TEAM: Member[] = [
  { id: 't1', name: 'Ravi Kumar', email: 'ravi.kumar@example.com', role: 'Sales Rep · Mumbai', st: 'active' },
  { id: 't2', name: 'Priya Shah', email: 'priya.shah@example.com', role: 'Sales Rep · Pune', st: 'active' },
  { id: 't3', name: 'Sunita Rao', email: 'sunita.rao@example.com', role: 'Sales Rep', st: 'pending' },
  { id: 't4', name: 'Amit Verma', email: 'amit.verma@example.com', role: 'Sales Rep · Jaipur', st: 'off' },
];

export type Notif = { id: string; t: string; body: string; time: string; ic: IconName; unread: boolean; to: ScreenTarget };
export type ScreenTarget = { screen: ScreenKey; params?: Record<string, string> };

export const NOTIFS: Notif[] = [
  { id: 'n1', t: 'Payment received', body: '₹25,000 from Mehta Electricals was saved as Receipt RCT-0003.', time: '10 min ago', ic: 'in', unread: true, to: { screen: 'vList', params: { vFilter: 'receipt' } } },
  { id: 'n2', t: 'Sent to Tally', body: '12 entries from the app reached Tally for Demo Company.', time: '1 hr ago', ic: 'sync', unread: true, to: { screen: 'activity' } },
  { id: 'n3', t: 'Invite accepted', body: 'Priya Shah joined your sales team.', time: 'Yesterday', ic: 'team', unread: true, to: { screen: 'team' } },
  { id: 'n4', t: 'Payment due soon', body: '₹48,380 to Kiran Steel Industries is due on 29 Sep.', time: 'Yesterday', ic: 'out', unread: false, to: { screen: 'outList', params: { outKind: 'pay' } } },
  { id: 'n5', t: 'New join request', body: 'Sunita Rao asked to join your team as Sales Rep.', time: '23 Sep', ic: 'userPlus', unread: false, to: { screen: 'team' } },
];

export type SumKey = 'toGet' | 'toGive' | 'mIn' | 'mOut' | 'sales' | 'purch' | 'cash' | 'bank';
export const SUMS: Record<SumKey, { t: string; sub: string; amt: number; ic: IconName; tone: 'in' | 'out' | 'plain'; to: ScreenTarget }> = {
  toGet: { t: 'Receivable', sub: 'Customers owe you', amt: 348690, ic: 'in', tone: 'in', to: { screen: 'outList', params: { outKind: 'recv' } } },
  toGive: { t: 'Payable', sub: 'You owe suppliers', amt: 126850, ic: 'out', tone: 'out', to: { screen: 'outList', params: { outKind: 'pay' } } },
  mIn: { t: 'Receipts', sub: 'This month', amt: 215000, ic: 'in', tone: 'plain', to: { screen: 'vList', params: { vFilter: 'receipt' } } },
  mOut: { t: 'Payments', sub: 'This month', amt: 98450, ic: 'out', tone: 'plain', to: { screen: 'vList', params: { vFilter: 'payment' } } },
  sales: { t: 'Total sales', sub: 'This month', amt: 348690, ic: 'bag', tone: 'plain', to: { screen: 'vList', params: { vFilter: 'sales' } } },
  purch: { t: 'Total purchase', sub: 'This month', amt: 126850, ic: 'cart', tone: 'plain', to: { screen: 'vList', params: { vFilter: 'purchase' } } },
  cash: { t: 'Cash in hand', sub: 'Cash balance', amt: 42300, ic: 'cash', tone: 'plain', to: { screen: 'vList', params: { vFilter: 'contra' } } },
  bank: { t: 'Bank balance', sub: 'All banks', amt: 386900, ic: 'bank', tone: 'plain', to: { screen: 'vList', params: { vFilter: 'contra' } } },
};

export const SHORTCUTS: { k: string; t: string; sub: string; ic: IconName; to?: ScreenKey; flow?: KindKey }[] = [
  { k: 'items', t: 'Items', sub: 'Stock', ic: 'box', to: 'items' },
  { k: 'party', t: 'Party', sub: 'Customers', ic: 'person', to: 'party' },
  { k: 'vouchers', t: 'Vouchers', sub: 'All entries', ic: 'receipt', to: 'vList' },
  { k: 'outstanding', t: 'Outstanding', sub: 'Money due', ic: 'rupeeC', to: 'outHub' },
  { k: 'reports', t: 'Reports', sub: 'Insights', ic: 'chart', to: 'reports' },
  { k: 'settings', t: 'Settings', sub: 'App setup', ic: 'gear', to: 'settings' },
];

export const ENTRY_TILES: { k: KindKey; t: string; sub: string; ic: IconName }[] = [
  { k: 'sales', t: 'Sale', sub: 'You sold goods', ic: 'bag' },
  { k: 'purchase', t: 'Purchase', sub: 'You bought goods', ic: 'cart' },
  { k: 'receipt', t: 'Receipt', sub: 'Money received', ic: 'in' },
  { k: 'payment', t: 'Payment', sub: 'Money paid', ic: 'out' },
  { k: 'journal', t: 'Journal', sub: 'Between accounts', ic: 'book' },
  { k: 'contra', t: 'Contra', sub: 'Bank ↔ Cash', ic: 'swap' },
];

export type FlowCfg = {
  title: string;
  sub: string;
  ic: IconName;
  steps: string[];
  partyLabel: string;
  list: 'c' | 's' | 'acc' | 'ledger';
  items?: boolean;
  noLabel: string;
  no: string;
  party: string;
  amt?: number;
  amtLabel?: string;
  balLabel?: string;
  accLabel?: string;
  acc?: string;
  note: string;
};

export const FLOWS: Record<KindKey, FlowCfg> = {
  sales: { title: 'New Sale', sub: 'Sales bill', ic: 'bag', steps: ['Details', 'Items', 'Payment', 'Check'], partyLabel: 'Customer', list: 'c', items: true, noLabel: 'Bill no.', no: '11', party: 'Om Sai Electricals', amt: 5000, amtLabel: 'Money received now', balLabel: 'Still to get', note: 'Order by phone – deliver today' },
  purchase: { title: 'New Purchase', sub: 'Purchase bill', ic: 'cart', steps: ['Details', 'Items', 'Payment', 'Check'], partyLabel: 'Supplier (you bought from)', list: 's', items: true, noLabel: 'Bill no.', no: 'PI-0006', party: 'Polycab Wires Pvt Ltd', amt: 14160, amtLabel: 'Money paid now', balLabel: 'Still to pay', note: 'Monthly stock refill' },
  receipt: { title: 'Receipt', sub: 'Money received', ic: 'in', steps: ['Details', 'How paid', 'Check'], partyLabel: 'Received from', list: 'c', noLabel: 'Receipt no.', no: 'RCT-0004', party: 'Shree Balaji Traders', amt: 50000, amtLabel: 'Amount received', accLabel: 'Put money into', acc: 'HDFC Bank – Current', note: 'Part payment by NEFT' },
  payment: { title: 'Payment', sub: 'Money paid', ic: 'out', steps: ['Details', 'How paid', 'Check'], partyLabel: 'Paid to', list: 's', noLabel: 'Payment no.', no: 'PAY-0004', party: 'Havells India Ltd', amt: 36580, amtLabel: 'Amount paid', accLabel: 'Paid from', acc: 'ICICI Bank – Current', note: 'Full payment for MCB order' },
  journal: { title: 'Journal', sub: 'Journal entry', ic: 'book', steps: ['Details', 'Accounts', 'Check'], partyLabel: 'Main account', list: 'ledger', noLabel: 'Entry no.', no: 'JV-0003', party: 'Salaries A/c', amt: 120000, note: 'Salary provision for September 2026' },
  contra: { title: 'Contra', sub: 'Cash ↔ bank transfer', ic: 'swap', steps: ['Details', 'To account', 'Check'], partyLabel: 'From account (money goes out)', list: 'acc', noLabel: 'Contra no.', no: 'CN-0003', party: 'Cash in hand', amt: 25000, amtLabel: 'Amount', accLabel: 'To account (money comes in)', acc: 'HDFC Bank – Current', note: 'Cash deposited in bank' },
};

export type Line = { name: string; qty: number; unit: string; rate: number; gst: number };
export const START_LINES: Record<'sales' | 'purchase', Line[]> = {
  sales: [
    { name: 'Polycab LED Panel 18W', qty: 10, unit: 'pcs', rate: 520, gst: 18 },
    { name: 'Anchor Roma Switch 6A', qty: 40, unit: 'pcs', rate: 34, gst: 18 },
    { name: 'Havells MCB 32A DP', qty: 6, unit: 'pcs', rate: 620, gst: 18 },
  ],
  purchase: [
    { name: 'Supreme PVC Pipe 1 inch', qty: 100, unit: 'pcs', rate: 85, gst: 18 },
    { name: 'Anchor Roma Socket 16A', qty: 35, unit: 'pcs', rate: 96, gst: 18 },
  ],
};

export const MODES: { k: string; t: string; ic: IconName }[] = [
  { k: 'cash', t: 'Cash', ic: 'cash' },
  { k: 'bank', t: 'Bank', ic: 'bank' },
  { k: 'upi', t: 'UPI', ic: 'upi' },
  { k: 'cheque', t: 'Cheque', ic: 'cheque' },
  { k: 'other', t: 'Other', ic: 'more' },
];

export const ACCOUNTS = ['HDFC Bank – Current', 'ICICI Bank – Current', 'Cash in hand'];
export const LEDGERS = [
  { name: 'Salaries A/c', group: 'Indirect Expenses' },
  { name: 'Salary Payable', group: 'Current Liabilities' },
  { name: 'Rent A/c', group: 'Indirect Expenses' },
  { name: 'Depreciation A/c', group: 'Indirect Expenses' },
  { name: 'Office Expenses A/c', group: 'Indirect Expenses' },
  { name: 'Freight Charges', group: 'Direct Expenses' },
];

export type RepCat = 'fin' | 'sales' | 'party' | 'stock' | 'accounts';
export const REP_TABS: [RepCat, string][] = [
  ['fin', 'Financial Statements'],
  ['sales', 'Sales'],
  ['party', 'Party'],
  ['stock', 'Inventory'],
  ['accounts', 'Accounts'],
];

export const REPORTS: { id: string; cat: RepCat; t: string; s: string; ic: IconName; v: string }[] = [
  { id: 'top', cat: 'sales', t: 'Top customers', s: 'Top 5 by money owed', ic: 'trophy', v: '₹3,48,690' },
  { id: 'sreg', cat: 'sales', t: 'Sales list', s: 'Every sale', ic: 'bag', v: '6 bills' },
  { id: 'inC', cat: 'party', t: 'Quiet customers', s: 'No sale in 60 days', ic: 'person', v: '2 customers' },
  { id: 'inI', cat: 'stock', t: 'Items not moving', s: 'Finished or not sold', ic: 'box', v: '2 items' },
  { id: 'stock', cat: 'stock', t: 'Stock summary', s: 'Value of all items', ic: 'box', v: '₹2,45,760' },
  { id: 'exp', cat: 'accounts', t: 'Expenses', s: 'Direct and indirect', ic: 'pie', v: '₹59,500' },
  { id: 'day', cat: 'accounts', t: 'Day Book', s: 'Every entry, day by day', ic: 'calendar', v: '21 entries' },
  { id: 'preg', cat: 'accounts', t: 'Purchase list', s: 'Every purchase', ic: 'cart', v: '5 bills' },
];

/** Financial statements tiles (app: financial_screens.dart FinancialTiles). */
export const FIN_TILES: { id: string; t: string; s: string; ic: IconName }[] = [
  { id: 'bs', t: 'Balance Sheet', s: 'Assets and liabilities', ic: 'building' },
  { id: 'pl', t: 'Profit & Loss', s: 'Income, expenses, profit', ic: 'chart' },
  { id: 'tb', t: 'Trial Balance', s: 'Every ledger, Debit / Credit', ic: 'file' },
  { id: 'cf', t: 'Cash Flow', s: 'Cash and bank: money in and out', ic: 'cash' },
];

/** Illustrative Profit & Loss for the sample month (demo figures). */
export const PL_DEMO = {
  income: [
    { t: 'Sales Accounts', v: 348690 },
    { t: 'Indirect Incomes', v: 4200 },
  ],
  expenses: [
    { t: 'Purchase Accounts', v: 126850 },
    { t: 'Direct Expenses', v: 8450 },
    { t: 'Indirect Expenses', v: 59500 },
  ],
};

export type ScreenKey =
  | 'login'
  | 'home'
  | 'notifs'
  | 'newEntry'
  | 'flow'
  | 'vList'
  | 'entryDetail'
  | 'outHub'
  | 'outList'
  | 'billDetail'
  | 'items'
  | 'party'
  | 'partyDetail'
  | 'reports'
  | 'report'
  | 'finReport'
  | 'activity'
  | 'team'
  | 'teamAccess'
  | 'settings';

export const TABS: { k: ScreenKey; t: string; ic: IconName }[] = [
  { k: 'home', t: 'Home', ic: 'home' },
  { k: 'outHub', t: 'Outstanding', ic: 'rupeeC' },
  { k: 'team', t: 'Team', ic: 'team' },
  { k: 'activity', t: 'Activity', ic: 'activity' },
  { k: 'reports', t: 'Reports', ic: 'chart' },
];

/** Screens with no tab bar (app: kNoTab). */
export const NO_TAB: ScreenKey[] = ['login', 'flow', 'newEntry', 'entryDetail', 'billDetail', 'partyDetail', 'teamAccess'];

export const TITLES: Record<ScreenKey, string> = {
  login: 'Log in',
  home: 'Home',
  notifs: 'Alerts',
  newEntry: 'New Entry',
  flow: 'Entry',
  vList: 'Vouchers',
  entryDetail: 'Entry',
  outHub: 'Outstanding',
  outList: 'Outstanding',
  billDetail: 'Bill',
  items: 'Items',
  party: 'Party',
  partyDetail: 'Party',
  reports: 'Reports',
  report: 'Reports',
  finReport: 'Financials',
  activity: 'Activity',
  team: 'Team',
  teamAccess: 'Access & Approvals',
  settings: 'Settings',
};

/** The app's 8 looks (prototype .ps-* / tc_palette.dart). */
export type Look = {
  k: string;
  t: string;
  sub: string;
  acc: [string, string, string];
  navy: [string, string, string];
  ink: [string, string, string];
  wall: string;
  orbs: [string, string, string];
};

export const LOOKS: Look[] = [
  { k: 'aurora', t: 'Aurora', sub: 'Maroon & navy · misty blue', acc: ['#8C1D3F', '#A42A52', '#6E1531'], navy: ['#1B2D5B', '#2A4584', '#172A55'], ink: ['#0E1B33', '#3F4B68', '#58647F'], wall: 'radial-gradient(60% 38% at 12% 6%,#C9DCFA 0%,rgba(201,220,250,0) 70%),radial-gradient(55% 34% at 95% 22%,#E2D8F7 0%,rgba(226,216,247,0) 70%),radial-gradient(70% 40% at 80% 96%,#D3E4F8 0%,rgba(211,228,248,0) 70%),radial-gradient(45% 30% at 4% 70%,#F1DFE8 0%,rgba(241,223,232,0) 70%),linear-gradient(180deg,#EEF2FB 0%,#E7EBF6 100%)', orbs: ['#BCD3F8', '#DCCCF5', '#F0D3DF'] },
  { k: 'ocean', t: 'Ocean Breeze', sub: 'Calm blues', acc: ['#0B6A8F', '#1486B0', '#07506D'], navy: ['#133A63', '#1F5690', '#0E2B4B'], ink: ['#0B2340', '#34506B', '#4D677F'], wall: 'radial-gradient(60% 40% at 10% 5%,#BDE3F3 0%,rgba(189,227,243,0) 70%),radial-gradient(55% 35% at 95% 25%,#C7D6F8 0%,rgba(199,214,248,0) 70%),radial-gradient(70% 45% at 70% 98%,#CDEFEA 0%,rgba(205,239,234,0) 70%),linear-gradient(180deg,#EDF6FA 0%,#E3EEF6 100%)', orbs: ['#A9D6EF', '#BFD0F6', '#BFE8E1'] },
  { k: 'royal', t: 'Royal Silk', sub: 'Violet on silk waves', acc: ['#5A3DBF', '#7457D9', '#43299A'], navy: ['#26235F', '#3A3790', '#1B1946'], ink: ['#1C1640', '#453F6B', '#5D5782'], wall: 'repeating-linear-gradient(118deg,rgba(255,255,255,0) 0px,rgba(255,255,255,0) 30px,rgba(255,255,255,.4) 36px,rgba(255,255,255,0) 42px,rgba(255,255,255,0) 72px),radial-gradient(90% 60% at 0% 0%,#D3E1FB 0%,rgba(211,225,251,0) 65%),radial-gradient(80% 60% at 100% 100%,#F2D8E6 0%,rgba(242,216,230,0) 65%),linear-gradient(160deg,#E6EBFA 0%,#EEE6F6 55%,#F6E8EE 100%)', orbs: ['#CAD8F8', '#E2D2F3', '#F1D2E0'] },
  { k: 'sunrise', t: 'Sunrise Clay', sub: 'Warm terracotta', acc: ['#A2462A', '#BF5E3E', '#7E331C'], navy: ['#3A2C4A', '#574370', '#2A1F36'], ink: ['#2A1A14', '#5A443A', '#6E574D'], wall: 'radial-gradient(60% 40% at 10% 6%,#FBD6C3 0%,rgba(251,214,195,0) 70%),radial-gradient(55% 35% at 95% 28%,#F6CFDA 0%,rgba(246,207,218,0) 70%),radial-gradient(70% 45% at 65% 98%,#FBE6C2 0%,rgba(251,230,194,0) 70%),linear-gradient(180deg,#FCF4EE 0%,#F6EBE7 100%)', orbs: ['#F7C6AE', '#F2C0CF', '#F7DDB0'] },
  { k: 'mint', t: 'Mint Ledger', sub: 'Fresh greens', acc: ['#0E7159', '#169174', '#0A5443'], navy: ['#16423C', '#22625A', '#0F302B'], ink: ['#0F2A24', '#36514A', '#4B665E'], wall: 'radial-gradient(60% 40% at 10% 6%,#C9EADB 0%,rgba(201,234,219,0) 70%),radial-gradient(55% 35% at 95% 26%,#CFE5F2 0%,rgba(207,229,242,0) 70%),radial-gradient(70% 45% at 65% 98%,#E2F0CE 0%,rgba(226,240,206,0) 70%),linear-gradient(180deg,#EFF8F3 0%,#E6F1EC 100%)', orbs: ['#B5E0CB', '#BCD9EC', '#D7EBB9'] },
  { k: 'pearl', t: 'Pearl Graphite', sub: 'Quiet neutrals', acc: ['#3E4C63', '#56657F', '#2B3647'], navy: ['#1E2635', '#33405A', '#141A25'], ink: ['#141A25', '#3F4758', '#565E6E'], wall: 'radial-gradient(60% 40% at 12% 6%,#E4E7F0 0%,rgba(228,231,240,0) 70%),radial-gradient(55% 35% at 92% 28%,#F1ECE4 0%,rgba(241,236,228,0) 70%),radial-gradient(70% 45% at 60% 98%,#E0E7F2 0%,rgba(224,231,242,0) 70%),linear-gradient(180deg,#F7F7F9 0%,#EDEEF2 100%)', orbs: ['#DADFEA', '#EAE3D8', '#D8E0EC'] },
  { k: 'prism', t: 'Prism Indigo', sub: 'Soft rainbow glass', acc: ['#4338CA', '#5B51E0', '#312A9E'], navy: ['#1E1B4B', '#2E2A75', '#151238'], ink: ['#15133A', '#413E66', '#58557C'], wall: 'radial-gradient(70% 55% at 50% 45%,rgba(255,255,255,.72) 0%,rgba(255,255,255,0) 70%),conic-gradient(from 200deg at 65% 35%,#D6E4FB,#E6D8F6,#F5DCE5,#FAE9D6,#D9EFE6,#D6E4FB)', orbs: ['#CFE0FA', '#EBD3F1', '#F7E0CB'] },
  { k: 'rose', t: 'Rose Quartz', sub: 'Rose on lavender', acc: ['#A0306A', '#B8487F', '#7C2352'], navy: ['#3B2350', '#57346F', '#2A1839'], ink: ['#24152E', '#4E3F5A', '#63556F'], wall: 'radial-gradient(60% 40% at 12% 6%,#DACDF6 0%,rgba(218,205,246,0) 70%),radial-gradient(55% 35% at 92% 30%,#F2D3E6 0%,rgba(242,211,230,0) 70%),radial-gradient(70% 45% at 60% 98%,#CBD4F6 0%,rgba(203,212,246,0) 70%),linear-gradient(180deg,#F3F0FB 0%,#EAE5F6 100%)', orbs: ['#CDBBF2', '#EEC5DC', '#C0CBF3'] },
];

export const LANGUAGES = ['English', 'हिन्दी', 'ગુજરાતી', 'मराठी'];

// ---------- formatting (app: core/utils/format.dart) ----------

/** Indian digit grouping, rounded, with the U+2212 minus. */
export function inr(v: number): string {
  const n = Math.round(Math.abs(v));
  const s = String(n);
  let out = s;
  if (s.length > 3) {
    const last3 = s.slice(-3);
    const rest = s.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ',');
    out = `${rest},${last3}`;
  }
  return `${v < 0 ? '−' : ''}₹${out}`;
}

export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join('');
}

export function lineTotals(lines: Line[]) {
  const sub = Math.round(lines.reduce((a, l) => a + l.rate * l.qty, 0));
  const gst = Math.round(lines.reduce((a, l) => a + (l.rate * l.qty * l.gst) / 100, 0));
  return { sub, gst, total: sub + gst };
}
