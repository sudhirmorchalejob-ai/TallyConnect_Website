// Website copy. Every capability listed here was checked against the
// Tally Connect app source (Tallyconnect_UI/lib) — see docs/ANALYSIS.md.
import type { ScreenKey } from '../demo/data';
import type { IconName } from '../demo/icons';

export type Feature = {
  id: string;
  screen: ScreenKey;
  params?: Record<string, string>;
  ic: IconName;
  kicker: string;
  title: string;
  desc: string;
  points: string[];
  benefit: string;
};

/** The horizontal showcase: one panel per main area of the app. */
export const FEATURES: Feature[] = [
  {
    id: 'entry',
    screen: 'flow',
    ic: 'plus',
    kicker: 'New Entry',
    title: 'Record entries without opening Tally',
    desc: 'Sale, Purchase, Receipt, Payment, Journal and Contra — each one a short guided flow with items, GST and payment in one place.',
    points: ['Step by step: Details → Items → Payment → Check', 'GST and bill totals worked out as you add items', 'Saved entries reach Tally through the Agent'],
    benefit: 'Bills get written where the sale happens, not at the end of the day.',
  },
  {
    id: 'vouchers',
    screen: 'vList',
    ic: 'receipt',
    kicker: 'Vouchers',
    title: 'Every voucher, searchable in seconds',
    desc: 'All entries from Tally in one list, filtered by voucher type and period, with each voucher opening to its full detail.',
    points: ['Filter by Sales, Purchase, Receipt, Payment, Journal, Contra', 'Search by party or voucher number', 'Share any bill as a PDF'],
    benefit: 'Answer “did we bill them?” from your phone.',
  },
  {
    id: 'outstanding',
    screen: 'outHub',
    ic: 'rupeeC',
    kicker: 'Outstanding',
    title: 'Know who owes you — and who is late',
    desc: 'Receivables and payables with due dates and ageing. Late bills come first, so follow-ups start with the money that matters.',
    points: ['Receivable and Payable, late and due soon', 'Bill details with credit period and due date', 'Reminders on WhatsApp and by email'],
    benefit: 'Collect faster without digging through ledgers.',
  },
  {
    id: 'party',
    screen: 'partyDetail',
    params: { name: 'Shree Balaji Traders' },
    ic: 'person',
    kicker: 'Party & Ledgers',
    title: 'Customers and suppliers, with their ledger',
    desc: 'Every party with their balance and city. Open one to see their entries and the running ledger balance.',
    points: ['Customers and suppliers in one list', 'Summary and ledger view per party', 'Call or share party details in a tap'],
    benefit: 'Walk into a meeting knowing the exact balance.',
  },
  {
    id: 'items',
    screen: 'items',
    ic: 'box',
    kicker: 'Inventory',
    title: 'Stock and prices from Tally',
    desc: 'Item-wise stock, rates and stock value, with low-stock and finished items flagged so reordering is never a guess.',
    points: ['Stock value, low stock and finished counts', 'Search and filter items', 'Pick items straight into a new bill'],
    benefit: 'Quote prices and promise stock with confidence.',
  },
  {
    id: 'reports',
    screen: 'reports',
    ic: 'chart',
    kicker: 'Reports',
    title: 'Financial statements and business reports',
    desc: 'Balance Sheet, Profit & Loss, Trial Balance and Cash Flow, plus sales, party, inventory and accounts reports — with charts.',
    points: ['Periods: this month, last 7 days, today or a date range', 'Charts first, then the rows behind them', 'Download or share any report as a PDF'],
    benefit: 'The numbers you check every week, without waiting for a printout.',
  },
  {
    id: 'activity',
    screen: 'activity',
    ic: 'activity',
    kicker: 'Activity',
    title: 'See every entry reach Tally',
    desc: 'Each entry made in the app shows whether it is in Tally, waiting, or not sent — with the reason and a Try again button.',
    points: ['Sent · Waiting · Not sent at a glance', 'Clear reasons when Tally was not reachable', 'Retry from the phone'],
    benefit: 'No more “did it go through?” calls to the office.',
  },
  {
    id: 'team',
    screen: 'teamAccess',
    ic: 'shield',
    kicker: 'Team & Access',
    title: 'Your team, with the right access',
    desc: 'Invite your sales team, then decide which companies and voucher types each person may use — and whether their entries need approval.',
    points: ['Invite, turn on or turn off team members', 'Limit companies and voucher types per person', 'Approve entries before they go to Tally'],
    benefit: 'Give your team the app without giving away the books.',
  },
];

/** Smaller verified capabilities, shown as a grid after the showcase. */
export const MORE: { ic: IconName; t: string; d: string }[] = [
  { ic: 'spark', t: 'AI assistant', d: 'Ask questions about your company in plain words; answers come from the data your login may see.' },
  { ic: 'globe', t: 'Four languages', d: 'English, हिन्दी, ગુજરાતી and मराठी — switch any time.' },
  { ic: 'mic', t: 'Voice search', d: 'Speak to search screens, parties and actions.' },
  { ic: 'bell', t: 'Alerts & reminders', d: 'Alerts for payments received, dues and team updates; your reminders ring as phone notifications.' },
  { ic: 'file', t: 'PDF & WhatsApp sharing', d: 'Bills, statements and reports as PDFs — preview, download or share.' },
  { ic: 'cash', t: 'Cash flow forecast', d: '13 weeks of money in and out, from open bills and today’s cash and bank.' },
  { ic: 'receipt', t: 'E-invoices', d: 'See each sales invoice’s e-invoice status as TallyPrime created it.' },
  { ic: 'clock', t: 'Check-in & leave', d: 'Sales team check-in and check-out, team attendance and leave requests.' },
  { ic: 'building', t: 'Many companies', d: 'Switch between your Tally companies; each one’s data stays separate.' },
  { ic: 'grid', t: 'Workspaces', d: 'Arrange Home with the shortcuts and money cards each role needs.' },
  { ic: 'star', t: '8 looks', d: 'Aurora, Ocean Breeze, Royal Silk and more — the whole app re-themes.' },
  { ic: 'eye', t: 'Demo Company', d: 'Every account can explore sample data, kept strictly apart from real data.' },
];

/** Headline selling points, shown in the Key Features section and the hero ribbon. */
export const LANGUAGE_NAMES: { n: string; en: string }[] = [
  { n: 'English', en: 'English' },
  { n: 'हिन्दी', en: 'Hindi' },
  { n: 'ગુજરાતી', en: 'Gujarati' },
  { n: 'मराठी', en: 'Marathi' },
];
export const KEY_REPORTS = ['Balance Sheet', 'Cash Flow Statement', 'Trial Balance', 'Profit & Loss Statement', 'Day Book', 'Outstanding Reports'];
export type KeyFeature = { id: string; ic: IconName; t: string; short: string; points: string[] };
export const KEY_FEATURES: KeyFeature[] = [
  {
    id: 'access',
    ic: 'phone',
    t: 'Access All Tally Products on Your Phone',
    short: 'Tally on your phone',
    points: ['Access your Tally products and business data directly from your smartphone.', 'Manage business operations from anywhere — office, shop, site or on the road.'],
  },
  {
    id: 'create',
    ic: 'edit',
    t: 'Create & Manage Anything in Tally',
    short: 'Create & manage entries',
    points: ['Create, edit and manage Tally entries and vouchers.', 'Work from your mobile phone or a web browser.'],
  },
  {
    id: 'reports',
    ic: 'pie',
    t: 'Complete Financial Reports',
    short: 'Complete financial reports',
    points: ['Every key statement, with charts, ready to share as a PDF.'],
  },
  {
    id: 'languages',
    ic: 'globe',
    t: 'Multiple Language Support',
    short: 'Multiple languages',
    points: ['Use the whole app in your own language and switch any time.'],
  },
  {
    id: 'attendance',
    ic: 'clock',
    t: 'Attendance & Leave Management',
    short: 'Attendance & leave',
    points: ['Employee attendance tracking with check-in and check-out.', 'Leave applications, approvals and monitoring.'],
  },
  {
    id: 'team',
    ic: 'team',
    t: 'Sales Team Management',
    short: 'Sales team management',
    points: ['Manage your sales team’s activities and access.', 'Monitor team performance and sales operations.'],
  },
  {
    id: 'orders',
    ic: 'cart',
    t: 'Sales & Purchase Order Management',
    short: 'Sales & purchase orders',
    points: ['Create and manage sales orders.', 'Manage purchase orders.', 'Track every order: pending, partial or closed.'],
  },
];

/**
 * The complete feature list, as supplied by the Tally Connect team.
 * A point marked `soon` is still being built and is labelled that way on the page.
 */
export type FeatureGroup = { ic: IconName; t: string; key?: boolean; points: (string | { t: string; soon: true })[] };
export const ALL_FEATURES: FeatureGroup[] = [
  {
    ic: 'home',
    t: 'Home Dashboard',
    points: [
      'Dashboard cards and customizable layout',
      'Sales Performance summary',
      'Order Management summary',
      'Outstanding summary',
      'Sales and financial overview',
      'Notifications and sync status',
      'AI Assistant access',
    ],
  },
  {
    ic: 'rupeeC',
    t: 'Outstanding',
    points: [
      'Receivables and Payables',
      'Bill-wise outstanding',
      'Ageing analysis',
      'Bill details and payment history',
      'Email payment reminders',
      'Reminder history and templates',
    ],
  },
  {
    ic: 'person',
    t: 'Parties / Ledgers',
    points: [
      'Ledger list and details',
      'Create and edit parties',
      'Ledger balances and transactions',
      'Search and location-based party information',
      'Bulk sharing and PDF export',
    ],
  },
  {
    ic: 'box',
    t: 'Items & Inventory',
    points: ['Stock item list and details', 'Stock summary and godowns', 'Inventory movements', 'Create and edit items', 'Physical stock counting'],
  },
  {
    ic: 'receipt',
    t: 'Vouchers & Entries',
    key: true,
    points: [
      'Sales, Purchase, Receipt, Payment, Journal and Contra',
      'Create entries',
      'Voucher details and history',
      'Voucher sync status and retry',
      'Team member entry approvals',
    ],
  },
  {
    ic: 'cart',
    t: 'Order Management',
    key: true,
    points: [
      'Sales Orders and Purchase Orders',
      'Create orders',
      'Order details and item tracking',
      { t: 'Convert orders into invoices', soon: true },
      'Pending, Partial and Closed status',
      'Order analytics',
    ],
  },
  {
    ic: 'chart',
    t: 'Sales Analytics',
    points: ['Sales dashboard', 'Customer-wise sales', 'Top customers', 'Top-selling products'],
  },
  {
    ic: 'trophy',
    t: 'Sales Performance',
    points: ['Salesperson-wise performance', 'Order and invoice conversion tracking', 'Salesperson rankings', 'Performance charts and reports'],
  },
  {
    ic: 'pie',
    t: 'Financial Reports',
    key: true,
    points: ['Profit & Loss', 'Balance Sheet', 'Trial Balance', 'Day Book', 'Outstanding Reports', 'Expenses', 'Cash Flow Forecast', 'Official Tally Reports'],
  },
  {
    ic: 'file',
    t: 'E-Invoice',
    points: ['E-invoice management and details'],
  },
  {
    ic: 'team',
    t: 'Sales Team',
    key: true,
    points: [
      'Add and manage team members',
      'Configure ledger, item and voucher access',
      'Group-wise and location-based permissions',
      'Feature and action permissions',
      'Entry approvals and access requests',
      'Attendance and employee management',
    ],
  },
  {
    ic: 'clock',
    t: 'Attendance & Leave',
    key: true,
    points: ['Employee check-in/check-out', 'Attendance history', 'Team attendance monitoring', 'Attendance rules', 'Leave applications and approvals'],
  },
  {
    ic: 'activity',
    t: 'Reports & Activity',
    points: ['Reports dashboard', 'Activity tracking', 'Report details and sharing'],
  },
  {
    ic: 'spark',
    t: 'AI Assistant & Search',
    key: true,
    points: ['AI Assistant', 'Global search', 'Voice search'],
  },
  {
    ic: 'share',
    t: 'Sharing & Export',
    points: ['PDF generation', 'WhatsApp sharing', 'Bulk document sharing', 'Voucher and bill exports'],
  },
  {
    ic: 'bell',
    t: 'Notifications & Reminders',
    points: ['Mobile notifications', 'Device reminders and alarms', 'Bill payment reminders', 'Out-of-stock alerts'],
  },
  {
    ic: 'gear',
    t: 'Account & Settings',
    points: [
      'Login, OTP and password recovery',
      'Multi-company selection',
      'Profile and settings',
      'Themes, wallpapers and language',
      'Licence and subscription details',
      'Terms & Conditions',
      'Feedback and support',
    ],
  },
];

export const BENEFITS: { ic: IconName; t: string; d: string }[] = [
  { ic: 'phone', t: 'Your business in your pocket', d: 'Sales, dues, stock and reports from TallyPrime, on your Android phone.' },
  { ic: 'send', t: 'Entries from anywhere', d: 'Make vouchers on the move — the Agent posts them into TallyPrime.' },
  { ic: 'rupeeC', t: 'Faster collections', d: 'Late bills first, reminders on WhatsApp and email.' },
  { ic: 'team', t: 'Team without risk', d: 'Per-person access to companies, voucher types and approvals.' },
  { ic: 'sync', t: 'Always in step with Tally', d: 'The Agent checks Tally every few minutes and keeps going after an outage.' },
  { ic: 'globe', t: 'Made for Indian businesses', d: '₹ with Indian digit grouping, GST on every bill, four Indian languages.' },
];

export const SECURITY: { ic: IconName; t: string; d: string }[] = [
  { ic: 'lock', t: 'Verified login', d: 'Every account is protected with a verified login. No one reaches your data without going through the right steps.' },
  { ic: 'shield', t: 'You decide who sees what', d: 'Choose the sections each person can open and the companies and voucher types they can use.' },
  { ic: 'check', t: 'Approvals before Tally', d: 'Turn on approval for a person and their entries wait for an admin. A rejected entry is never sent.' },
  { ic: 'laptop', t: 'A recognised Sync Agent', d: 'The Agent on your Tally PC is recognised by your device, so nothing unauthorised can connect to your Tally.' },
  { ic: 'building', t: 'Companies kept apart', d: 'Each Tally company’s data is kept completely separate — with different rules for each.' },
  { ic: 'activity', t: 'Every action logged', d: 'Actions on the platform are logged, and the app shows each entry’s journey to Tally.' },
];

export const FAQS: { q: string; a: string }[] = [
  { q: 'What is Tally Connect?', a: 'Tally Connect connects to your TallyPrime and turns your accounting data into easy-to-read dashboards and reports. Instead of opening Tally every time you need a number, open the Tally Connect app on your phone — or the web dashboard in your browser.' },
  { q: 'How does the auto-sync work?', a: 'A small background app — the Sync Agent — runs on the Windows computer where Tally is installed. Every few minutes it picks up new entries and changes from Tally and sends them to Tally Connect. You don’t have to do anything; it stays current on its own.' },
  { q: 'How do I get the sync app set up?', a: 'Install the Sync Agent on the Windows computer where TallyPrime runs, sign in with your registered admin email and switch on the companies to sync. The first sync usually completes in a few minutes. The Agent works on Windows only, since TallyPrime itself is a Windows application, and TallyPrime must be licensed — Educational mode cannot sync.' },
  { q: 'Can I create vouchers and bills without opening Tally?', a: 'Yes. Sales, purchases, receipts, payments, journals and contra entries made in the app are pushed into TallyPrime by the Agent. The Activity screen shows when each one has reached Tally.' },
  { q: 'Is my financial data safe?', a: 'Yes. Every account is protected with a verified login. You control exactly who sees what, every action on the platform is logged, and your Sync Agent is recognised by your device so nothing unauthorised can connect to your Tally.' },
  { q: 'Can I control what my team members are allowed to see?', a: 'Yes, in detail. As the admin you choose which sections of the app each person can open, which companies and voucher types they can use, and whether their entries need your approval before going to Tally.' },
  { q: 'Can I manage more than one company?', a: 'Yes. Connect multiple Tally companies to one account. Each company’s data is kept separate, and you can give team members access to different companies. In the app, tap the company name on Home to switch.' },
  { q: 'What if my internet or Tally goes offline?', a: 'The sync pauses while Tally or the internet is unavailable and picks up where it left off once things are back. Entries that could not reach Tally show as “Not sent” in Activity, with a Try again button.' },
  { q: 'Which languages does the app support?', a: 'English, Hindi (हिन्दी), Gujarati (ગુજરાતી) and Marathi (मराठी). You can switch language from the app menu at any time.' },
  { q: 'Can I try the app without my own data?', a: 'Yes. Every account can open a Demo Company with sample data. It is kept strictly apart from your real data and never reaches the server or Tally. The interactive demo on this page uses the same kind of sample data.' },
];

export const SETUP_STEPS: { t: string; d: string }[] = [
  { t: 'Install the Sync Agent', d: 'On the Windows PC that runs TallyPrime. It starts with Windows and keeps running in the tray.' },
  { t: 'Sign in and pick companies', d: 'Use your admin email, match Tally’s connection port, then switch on the companies to sync.' },
  { t: 'Wait for the first sync', d: 'Usually a few minutes. After that the Agent keeps checking Tally on its own.' },
  { t: 'Install the app and sign in', d: 'Your dashboards, dues, stock and reports are ready on your phone.' },
];
