// "Get Started in 3 Simple Steps" (sits under the Limited-Time Offer): three
// step tabs — Connector, sync, mobile app — and one panel showing the active
// step with its illustration, action and short installation list.
import {
  Fragment,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { SiteIcon } from "../components/Common/SiteIcon";
import { SITE } from "../config/site";
import { scrollToId, useReveal } from "../hooks/useSmoothScroll";

/** Smartphone outline (the shared "phone" icon is a telephone handset). */
function MobileIcon({
  size = 24,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`flex-none ${className}`}
      aria-hidden="true"
    >
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
      <path d="M11 18.5h2" />
    </svg>
  );
}

type Step = {
  tab: string;
  icon: (size: number) => ReactNode;
  title: string;
  text: string;
  list: string[];
  art: "connector" | "sync" | "mobile";
};

const STEPS: Step[] = [
  {
    tab: "Install Connector App",
    icon: (s) => <SiteIcon n="download" size={s} stroke={2.2} />,
    title: "Install Connector App",
    text: "Download and install the Tally Connect Connector on your Windows computer.",
    list: [
      "Download the connector installer.",
      "Run the installer and sign in or create your account.",
    ],
    art: "connector",
  },
  {
    tab: "Sync TallyPrime Data",
    icon: (s) => <SiteIcon n="sync" size={s} stroke={2.2} />,
    title: "Sync TallyPrime Data",
    text: "Pick the Tally companies to sync. After the first sync, the Connector keeps checking Tally on its own.",
    list: [
      "Match Tally’s connection port in the Connector.",
      "Switch on the companies you want to sync.",
      "Wait for the first sync — usually a few minutes.",
    ],
    art: "sync",
  },
  {
    tab: "Install Mobile App",
    icon: (s) => <MobileIcon size={s} />,
    title: "Install Mobile App",
    text: "Install Tally Connect on your phone and sign in. Your dashboards, dues, stock and reports are ready to use.",
    list: [
      "Download and install the Tally Connect app.",
      "Sign in with your account.",
      "Prefer a bigger screen? Open the web dashboard in your browser.",
    ],
    art: "mobile",
  },
];

/** Step illustration: a device on a soft pink blob with a maroon badge. */
function Art({ kind }: { kind: Step["art"] }) {
  const badge =
    kind === "connector" ? "download" : kind === "sync" ? "sync" : "check";
  return (
    <div
      className="relative mx-auto aspect-[1.25] w-full max-w-[230px] sm:max-w-[260px] lg:max-w-[300px]"
      aria-hidden="true"
    >
      <div className="absolute inset-[6%_0_2%_0] rounded-[48%_52%_46%_54%/55%_48%_52%_45%] bg-gradient-to-br from-[#fde4ee] to-[#fbeef4]" />
      {/* sparks */}
      <svg
        className="absolute left-[2%] top-[2%] h-[18%] w-[18%] text-acc"
        viewBox="0 0 40 40"
      >
        <g stroke="currentColor" strokeWidth="3.2" strokeLinecap="round">
          <path d="M20 18 15 6" />
          <path d="M26 21 34 11" />
          <path d="M17 26 4 25" />
        </g>
      </svg>
      {kind === "mobile" ? (
        <div className="absolute left-1/2 top-[8%] h-[84%] w-[38%] -translate-x-1/2 rounded-[22px] border-[5px] border-[#3a4560] bg-gradient-to-b from-[#eef3fd] to-[#dfe8fa] shadow-[0_16px_30px_-16px_rgba(27,45,91,.6)]">
          <span className="absolute left-1/2 top-1.5 h-1.5 w-8 -translate-x-1/2 rounded-full bg-[#3a4560]" />
          <div className="absolute inset-x-[14%] top-[22%] grid place-items-center">
            <img
              src="/images/tc_app_icon.png"
              alt=""
              className="h-12 w-12 rounded-[12px] shadow-[0_8px_16px_-8px_rgba(110,21,49,.6)]"
            />
          </div>
          <div className="absolute inset-x-[16%] top-[58%] space-y-1.5">
            <span className="block h-1.5 rounded-full bg-[#c9d4ec]" />
            <span className="block h-1.5 w-3/4 rounded-full bg-[#c9d4ec]" />
          </div>
        </div>
      ) : (
        <div className="absolute left-[8%] right-[14%] top-[16%]">
          {/* laptop */}
          <div className="relative aspect-[1.5] rounded-[10px] border-[6px] border-[#3a4560] bg-gradient-to-b from-[#eef3fd] to-[#dbe5f8]">
            {kind === "connector" ? (
              <svg
                className="absolute left-1/2 top-1/2 h-[46%] w-[46%] -translate-x-1/2 -translate-y-1/2"
                viewBox="0 0 88 88"
              >
                <path
                  d="M0 12.5 36 7.6v34.7H0zM40 7 88 0v42.3H40zM0 45.7h36v34.7L0 75.5zM40 45.7h48V88l-48-6.8z"
                  fill="#1a73d9"
                />
              </svg>
            ) : (
              <div className="absolute inset-0 grid place-items-center">
                <span className="rounded-[8px] bg-white px-2.5 py-1 text-[15px] font-extrabold italic text-acc shadow-[0_6px_14px_-8px_rgba(27,45,91,.5)]">
                  TallyPrime
                </span>
              </div>
            )}
          </div>
          <div className="mx-[-7%] h-[10px] rounded-b-[8px] bg-[#4b566f]" />
        </div>
      )}
      <span className="absolute bottom-[8%] right-[6%] grid h-[30%] w-[24%] place-items-center rounded-full border-[5px] border-white bg-gradient-to-b from-acc-2 to-acc-3 text-white shadow-[0_14px_26px_-10px_rgba(110,21,49,.7)]">
        <SiteIcon n={badge} size={30} stroke={2.6} />
      </span>
    </div>
  );
}

export function GetStarted() {
  const ref = useRef<HTMLElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const [active, setActive] = useState(0);
  useReveal(ref);
  const step = STEPS[active]!;

  // Arrow keys move between the step tabs (ARIA tabs pattern).
  const onKey = (e: KeyboardEvent) => {
    const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const next = (active + d + STEPS.length) % STEPS.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  /** A download link that falls back to the offer's contact options when no file is published yet. */
  const download = (url: string, label: string) => (
    <a
      href={url || "#free-access"}
      rel="noreferrer"
      referrerPolicy="no-referrer"
      onClick={(e) => {
        if (!url) {
          e.preventDefault();
          scrollToId("free-access");
        }
      }}
      className="btn btn-accent !h-[54px] w-full !rounded-[14px] sm:w-auto sm:min-w-[300px] lg:!h-[60px] lg:!text-[18px]"
    >
      <SiteIcon n="download" size={22} stroke={2.3} /> {label}
    </a>
  );

  return (
    <section
      ref={ref}
      id="setup-steps"
      className="relative overflow-hidden py-14 sm:py-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(45%_60%_at_8%_20%,#fdeef5_0%,transparent_70%),radial-gradient(40%_55%_at_92%_70%,#fbe6f0_0%,transparent_70%),linear-gradient(180deg,#f9eff7_0%,#fcf3f8_100%)] [-webkit-mask-image:linear-gradient(180deg,#000_80%,transparent)] [mask-image:linear-gradient(180deg,#000_80%,transparent)]"
      />

      <div className="wrap xl:max-w-[1320px]">
        <div className="text-center">
          <h2 className="reveal text-[30px] font-extrabold leading-[1.15] tracking-[-0.03em] text-navy sm:text-[40px] lg:text-[48px]">
            Get Started in{" "}
            <span className="relative inline-block italic text-acc">
              3 Simple Steps
              <svg
                className="absolute -bottom-2 left-[22%] h-3 w-[70%]"
                viewBox="0 0 200 12"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M2 9C60 3 140 2 198 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </svg>
              <svg
                className="absolute -right-9 -top-3 h-8 w-8 sm:-right-11 sm:h-10 sm:w-10"
                viewBox="0 0 28 28"
                aria-hidden="true"
              >
                <g stroke="#f5b52c" strokeWidth="2.6" strokeLinecap="round">
                  <path d="M9 12 7 5" />
                  <path d="M15 14 21 6" />
                  <path d="M17 19 25 17" />
                </g>
              </svg>
            </span>
          </h2>
          <p className="reveal mt-4 text-[16px] text-ink-2 sm:text-[19px]">
            Complete each step to access Tally Connect on your phone.
          </p>
        </div>

        {/* step tabs */}
        <div
          role="tablist"
          aria-label="Setup steps"
          className="reveal mt-8 grid grid-cols-3 items-center gap-2 sm:mt-10 lg:grid-cols-[1fr_32px_1fr_32px_1fr] lg:gap-0"
          onKeyDown={onKey}
        >
          {STEPS.map((s, i) => {
            const on = i === active;
            return (
              <Fragment key={s.tab}>
                {i > 0 && (
                  <span
                    className="hidden h-[2px] bg-acc/30 lg:block"
                    aria-hidden="true"
                  />
                )}
                <button
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`setup-tab-${i}`}
                  aria-selected={on}
                  aria-controls="setup-panel"
                  tabIndex={on ? 0 : -1}
                  onClick={() => setActive(i)}
                  className={`flex h-full flex-col items-center justify-center gap-1.5 rounded-[16px] px-2 py-3 text-center text-[12.5px] font-extrabold leading-tight transition-all duration-300 sm:flex-row sm:gap-3 sm:text-[15px] lg:h-[72px] lg:rounded-[20px] lg:text-[18px] ${
                    on
                      ? "bg-gradient-to-b from-acc-2 to-acc-3 text-white shadow-[0_16px_30px_-14px_rgba(110,21,49,.75)]"
                      : "border border-white bg-white/80 text-navy shadow-[0_12px_26px_-18px_rgba(27,45,91,.45)] hover:bg-white"
                  }`}
                >
                  <span className={on ? "text-white" : "text-navy"}>
                    {s.icon(26)}
                  </span>
                  <span>
                    {i + 1}. {s.tab}
                  </span>
                </button>
              </Fragment>
            );
          })}
        </div>

        {/* active step */}
        <div
          id="setup-panel"
          role="tabpanel"
          aria-labelledby={`setup-tab-${active}`}
          className="reveal mt-6 rounded-[28px] border border-white bg-white/95 p-5 shadow-[0_30px_60px_-34px_rgba(110,21,49,.45)] sm:p-8 lg:mt-8 lg:grid lg:grid-cols-[minmax(220px,0.85fr)_1.5fr_1.15fr] lg:items-center lg:gap-0 lg:p-10"
        >
          <div className="lg:pr-10">
            <Art kind={step.art} />
          </div>

          <div className="mt-6 lg:mt-0 lg:border-l lg:border-r lg:border-navy/10 lg:px-10">
            <span className="inline-block rounded-full bg-[#fde4ee] px-3.5 py-1 text-[14px] font-extrabold text-acc">
              Step {active + 1} of {STEPS.length}
            </span>
            <h3 className="mt-3 text-[28px] font-extrabold leading-tight tracking-[-0.02em] text-navy sm:text-[34px] lg:text-[40px]">
              {step.title}
            </h3>
            <p className="mt-3 text-[16px] leading-[1.6] text-ink-2 sm:text-[18px]">
              {step.text}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {active === 0 && download(SITE.agentUrl, "Download Connector")}
              {active === 1 && (
                <button
                  type="button"
                  onClick={() => setActive(2)}
                  className="btn btn-accent !h-[54px] w-full !rounded-[14px] sm:w-auto sm:min-w-[300px] lg:!h-[60px] lg:!text-[18px]"
                >
                  Next: Install Mobile App <SiteIcon n="arrow" size={20} />
                </button>
              )}
              {active === 2 && (
                <>
                  {download(SITE.apkUrl, "Download Android App")}
                  <a
                    href={SITE.dashboard}
                    className="btn !h-[54px] w-full !rounded-[14px] border border-[#ecdbe6] bg-white text-navy shadow-[0_10px_24px_-14px_rgba(27,45,91,.35)] hover:border-acc/30 sm:w-auto lg:!h-[60px]"
                  >
                    <SiteIcon n="laptop" size={20} className="text-acc" /> Open
                    Web Dashboard
                  </a>
                </>
              )}
            </div>
          </div>

          {active === 0 ? (
            /* Step 1: licence activation by phone (replaces the installation list). */
            <div className="mt-8 lg:mt-0 lg:pl-10">
              <p className="inline-flex items-center gap-3 rounded-full bg-[#fde4ee] py-2.5 pl-4 pr-6 text-[19px] font-extrabold tracking-[-0.01em] text-navy shadow-[0_10px_24px_-18px_rgba(110,21,49,.5)] sm:text-[21px]">
                <SiteIcon
                  n="gear"
                  size={26}
                  stroke={2.1}
                  className="text-acc"
                />
                For Active License
              </p>
              <div className="mt-6 flex items-center gap-4">
                <span className="grid h-14 w-14 flex-none place-items-center rounded-full bg-gradient-to-b from-[#fdeef4] to-[#fadbe7] text-acc shadow-[0_10px_20px_-12px_rgba(110,21,49,.45)]">
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z" />
                    <path d="M15 3.5a6 6 0 0 1 5.5 5.5M14.6 7a2.6 2.6 0 0 1 2.4 2.4" />
                  </svg>
                </span>
                <p className="text-[17px] font-bold leading-snug text-ink sm:text-[19px]">
                  Call Us to Activate Your License.
                </p>
              </div>
              <a
                href={SITE.phoneHref}
                aria-label={`Call ${SITE.phone} to activate your license`}
                className="mt-5 flex h-[58px] items-center justify-center gap-4 rounded-[16px] bg-gradient-to-b from-acc-2 to-acc-3 px-6 text-white shadow-[0_16px_30px_-14px_rgba(110,21,49,.7),inset_0_1px_0_rgba(255,255,255,.25)] transition-[transform,filter] duration-200 hover:-translate-y-0.5 hover:brightness-110 active:scale-[.98] sm:ml-[72px] lg:h-[62px]"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z" />
                </svg>
                <span className="h-7 w-px bg-white/60" aria-hidden="true" />
                <span className="whitespace-nowrap text-[21px] font-extrabold tracking-[0.01em] sm:text-[23px]">
                  {SITE.phone}
                </span>
              </a>
            </div>
          ) : (
            <div className="mt-8 lg:mt-0 lg:pl-10">
              <p className="inline-flex items-center gap-2.5 rounded-[14px] bg-[#fdeaf2] px-4 py-2.5 text-[17px] font-extrabold text-navy sm:text-[19px]">
                <SiteIcon n="gear" size={24} stroke={2} className="text-acc" />{" "}
                Installation Steps
              </p>
              <ol className="mt-5 space-y-4">
                {step.list.map((t, i) => (
                  <li key={t} className="flex items-start gap-4">
                    <span className="grid h-10 w-10 flex-none place-items-center rounded-full bg-[#fde4ee] text-[16px] font-extrabold text-acc">
                      {i + 1}
                    </span>
                    <span className="pt-2 text-[16px] leading-snug text-navy sm:text-[17px]">
                      {t}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
