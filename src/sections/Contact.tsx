import { useRef, useState, type FormEvent } from 'react';
import { SiteIcon } from '../components/Common/SiteIcon';
import { SITE } from '../config/site';
import { useReveal } from '../hooks/useSmoothScroll';

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  const [sent, setSent] = useState(false);
  // No backend: the form opens the visitor's email app with the message filled in.
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const body = `Name: ${d.get('name')}\nCompany: ${d.get('company')}\nPhone: ${d.get('phone')}\n\n${d.get('message')}`;
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent('Tally Connect enquiry')}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };
  const field = 'mt-1.5 h-12 w-full rounded-[14px] border border-navy/15 bg-white/85 px-4 text-[16px] outline-none transition focus:border-navy-2 focus:ring-4 focus:ring-navy-2/15';
  return (
    <section ref={ref} id="contact" className="section">
      <div className="wrap grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="kicker reveal">Contact</p>
          <h2 className="h-section reveal mt-3">Talk to the Tally Connect team.</h2>
          <p className="lead reveal mt-4">Setup help, a walkthrough for your team, or questions about your data — we’re happy to help.</p>
          <ul className="mt-8 space-y-3">
            {[
              { ic: 'phone' as const, t: SITE.phone, s: SITE.hours, href: SITE.phoneHref },
              { ic: 'whatsapp' as const, t: 'WhatsApp', s: 'Message us any time', href: SITE.whatsapp },
              { ic: 'mail' as const, t: SITE.email, s: 'We reply by email', href: `mailto:${SITE.email}` },
            ].map((c) => (
              <li key={c.t} className="reveal">
                <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="glass-card flex items-center gap-4 p-4 transition-transform hover:-translate-y-0.5">
                  <span className="ico-tile">
                    <SiteIcon n={c.ic} />
                  </span>
                  <span>
                    <span className="block text-[16.5px] font-extrabold">{c.t}</span>
                    <span className="block text-[14px] font-semibold text-ink-3">{c.s}</span>
                  </span>
                </a>
              </li>
            ))}
            <li className="reveal flex gap-4 px-4 pt-2 text-[14px] leading-relaxed text-ink-2">
              <SiteIcon n="building" className="mt-0.5 text-ink-3" />
              <span>
                <b className="text-ink">{SITE.company}</b>
                <br />
                {SITE.address}
              </span>
            </li>
          </ul>
        </div>
        <form onSubmit={submit} className="reveal glass-card p-6 sm:p-8" aria-label="Contact form">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-[14.5px] font-bold text-ink-2">
              Your name
              <input name="name" required autoComplete="name" className={field} />
            </label>
            <label className="text-[14.5px] font-bold text-ink-2">
              Company
              <input name="company" autoComplete="organization" className={field} />
            </label>
            <label className="text-[14.5px] font-bold text-ink-2 sm:col-span-2">
              Phone
              <input name="phone" type="tel" autoComplete="tel" className={field} />
            </label>
            <label className="text-[14.5px] font-bold text-ink-2 sm:col-span-2">
              How can we help?
              <textarea name="message" required rows={5} className={`${field} h-auto py-3`} />
            </label>
          </div>
          <button type="submit" className="btn btn-primary mt-6 w-full">
            <SiteIcon n="send" size={18} /> Write to us
          </button>
          <p className="mt-3 text-center text-[13px] font-semibold text-ink-3" role="status">
            {sent ? 'Your email app should open with the message ready to send.' : 'Opens your email app with your message filled in.'}
          </p>
        </form>
      </div>
    </section>
  );
}
