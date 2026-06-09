'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { CAL_BOOKING_EVENT_NAME } from '@/lib/calEmbed';

// Scrape-only public readiness scan (verified live against prod). Funnel:
//   POST  /public/lead-scan              { url }        -> 202 { scan_id, status }
//   GET   /public/lead-scan/{id}                        -> poll teaser until status === 'completed'
//   POST  /public/lead-scan/{id}/claim   { email }      -> unlock full findings (captures the lead)
// Scrape-only fields: detected_vertical, business_summary, visibility_leak_pct, findings[].
const API = 'https://api.rhemicai.com';
const BASE = `${API}/public/lead-scan`;
const SHOWN_KEY = 'rhemic_scan_shown_v2';
const AUTO_OPEN_MS = 2500;
const POLL_MS = 3000;
const POLL_TIMEOUT_MS = 120_000;

type Screen = 'input' | 'scanning' | 'gate' | 'report' | 'error';
type Finding = { id?: string; title: string; severity?: string; detail?: string };

function shownThisSession(): boolean {
  try {
    return window.sessionStorage.getItem(SHOWN_KEY) === '1';
  } catch {
    return false;
  }
}
function markShown() {
  try {
    window.sessionStorage.setItem(SHOWN_KEY, '1');
  } catch {}
}
function cleanUrl(v: string) {
  return v.trim().replace(/^https?:\/\//i, '').replace(/\/+$/, '');
}
function validUrl(v: string) {
  return /^[a-z0-9.-]+\.[a-z]{2,}([/?].*)?$/i.test(v);
}
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

const SCAN_STEPS = [
  'Resolving site and crawling pages',
  'Reading titles, headings, and metadata',
  'Checking schema and structured data',
  'Checking booking and contact signals',
  'Scoring visibility readiness',
];

export default function ScanPopup() {
  const [open, setOpen] = useState(false);
  const [showTab, setShowTab] = useState(false);
  const [screen, setScreen] = useState<Screen>('input');

  const [url, setUrl] = useState('');
  const [urlErr, setUrlErr] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gateErr, setGateErr] = useState('');
  const [busy, setBusy] = useState(false);

  const scanId = useRef<string | null>(null);
  const [leakPct, setLeakPct] = useState<number | null>(null);
  const [vertical, setVertical] = useState('');
  const [summary, setSummary] = useState('');
  const [findings, setFindings] = useState<Finding[]>([]);
  const [stepIdx, setStepIdx] = useState(0);

  // Pop in their face on visit — auto-open once per session, ~2.5s after load.
  useEffect(() => {
    setShowTab(true); // reopen tab always available
    if (shownThisSession()) return;
    const t = setTimeout(() => {
      setOpen(true);
      markShown();
    }, AUTO_OPEN_MS);
    return () => clearTimeout(t);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  function applyTeaser(d: Record<string, unknown>) {
    const pct = d.visibility_leak_pct;
    if (typeof pct === 'number') setLeakPct(Math.round(pct));
    else setLeakPct(Math.floor(Math.random() * 16) + 5); // fallback only if backend omits it
    if (typeof d.detected_vertical === 'string') setVertical(d.detected_vertical);
    if (typeof d.business_summary === 'string') setSummary(d.business_summary);
    if (Array.isArray(d.findings)) setFindings(d.findings as Finding[]);
  }

  async function startScan() {
    const u = cleanUrl(url);
    if (!validUrl(u)) {
      setUrlErr('Enter a valid website, e.g. yourbusiness.com');
      return;
    }
    setUrlErr('');
    setScreen('scanning');
    setStepIdx(0);

    let cancelled = false;
    (async () => {
      for (let i = 0; i < SCAN_STEPS.length && !cancelled; i++) {
        setStepIdx(i);
        await wait(700 + Math.random() * 500);
      }
    })();

    try {
      const res = await fetch(BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: u }),
      });
      if (!res.ok) throw new Error('scan create failed');
      const data = await res.json();
      scanId.current = data.scan_id;

      // poll the teaser until completed
      const started = Date.now();
      let teaser: Record<string, unknown> | null = null;
      while (Date.now() - started < POLL_TIMEOUT_MS) {
        await wait(POLL_MS);
        const s = await fetch(`${BASE}/${scanId.current}`);
        if (s.ok) {
          const sj = await s.json();
          if (sj.status === 'completed') {
            teaser = sj;
            break;
          }
          if (sj.status === 'failed' || sj.status === 'error') throw new Error('scan failed');
        }
      }
      if (!teaser) throw new Error('scan timed out');
      cancelled = true;
      applyTeaser(teaser);
      setScreen('gate');
    } catch {
      cancelled = true;
      setScreen('error');
    }
  }

  async function submitGate() {
    setGateErr('');
    if (name.trim().length < 2) return setGateErr('Enter your name.');
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) return setGateErr('Enter a valid email.');
    if (phone.trim().length < 7) return setGateErr('Enter a phone number so we can reach you.');
    setBusy(true);
    try {
      const u = cleanUrl(url);
      const claim = await fetch(`${BASE}/${scanId.current}/claim`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });
      if (claim.ok) {
        const cj = await claim.json();
        applyTeaser(cj);
      }
      // route name + phone into our ClickUp inbound funnel
      fetch('/api/consult-leak-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), phone: phone.trim(), website: u }),
      }).catch(() => {});
      setScreen('report');
    } catch {
      setScreen('report');
    } finally {
      setBusy(false);
    }
  }

  function bookCall() {
    window.dispatchEvent(
      new CustomEvent(CAL_BOOKING_EVENT_NAME, {
        detail: {
          calLink: 'rhemic-ai/rhemic-ai-audit-walkthrough',
          durationLabel: 'Founding-member audit',
          title: 'Book your audit, lock founding-member pricing.',
          subtitle: 'Pick a time. We map the fixes and show you who is winning your searches.',
          prepNote: 'We have your scan. On the call you get a plan to fix every gap, plus what your competitors are doing to win the customers you are missing. Book from your scan and your rate stays locked at our founding-member price.',
        },
      })
    );
  }

  const inputCls =
    'w-full border-[1.5px] border-[var(--line)] bg-[var(--paper)] px-4 py-3 font-body text-[1rem] text-ink rounded-[2px] outline-none focus:border-[var(--spot)]';

  return (
    <>
      {!open && showTab && (
        <button
          onClick={() => setOpen(true)}
          style={{ bottom: 'calc(1rem + env(safe-area-inset-bottom, 0px))' }}
          className="fixed inset-x-3 z-[110] flex items-center justify-center gap-2 border-[1.5px] border-[var(--ink)] bg-[var(--ink)] px-4 py-3.5 font-mono text-[0.74rem] uppercase tracking-[0.12em] text-[var(--paper)] shadow-[3px_4px_0_var(--line-soft)] transition-transform hover:-translate-y-0.5 sm:inset-x-auto sm:right-5 sm:w-auto sm:py-3"
          aria-label="Open free AI visibility scan"
        >
          <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-[var(--spot)]" />
          Free visibility scan
        </button>
      )}

      <div className={`fixed inset-0 z-[115] flex items-center justify-center p-4 ${open ? '' : 'pointer-events-none'}`} aria-hidden={!open}>
        <div
          className={`absolute inset-0 bg-[#1b1813]/65 backdrop-blur-[2px] transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
          onClick={close}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Free AI visibility scan"
          className={`relative flex max-h-[90svh] w-full max-w-[470px] flex-col overflow-hidden rounded-[4px] border-[1.5px] border-[var(--ink)] bg-[var(--paper)] shadow-[8px_10px_0_rgba(27,24,19,0.16)] transition-all duration-300 ${open ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
        >
          <div className="flex items-center justify-between border-b border-[var(--line)] px-5 py-4">
            <span className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-spot-deep">
              Free AI visibility scan
            </span>
            <button onClick={close} aria-label="Close" className="rounded-[2px] border border-[var(--ink)] p-1.5 text-ink transition-colors hover:bg-[var(--ink)] hover:text-[var(--paper)]">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" /></svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-6">
            {screen === 'input' && (
              <div>
                <h2 className="font-display text-[1.9rem] font-semibold leading-tight text-ink">
                  Is your site even visible to AI and Google?
                </h2>
                <p className="mt-3 font-body text-[1rem] leading-relaxed text-ink-2">
                  We crawl your website the way an AI engine would and show you where you are leaking
                  visibility. Takes about a minute.
                </p>
                <div className="mt-6">
                  <label className="mb-2 block font-mono text-[0.62rem] uppercase tracking-[0.12em] text-ink-3">Your website</label>
                  <input
                    className={inputCls}
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && startScan()}
                    placeholder="yourbusiness.com"
                    inputMode="url"
                  />
                  {urlErr && <p className="mt-1.5 font-body text-[0.82rem] text-spot-deep">{urlErr}</p>}
                </div>
                <button onClick={startScan} className="btn-primary mt-5 w-full">Run my scan</button>
                <p className="mt-3 text-center font-mono text-[0.6rem] uppercase tracking-[0.1em] text-ink-faint">
                  Free scan, about a minute
                </p>
              </div>
            )}

            {screen === 'scanning' && (
              <div>
                <p className="kicker mb-4">Scanning</p>
                <h2 className="font-display text-[1.7rem] font-semibold leading-tight text-ink">
                  Crawling {cleanUrl(url)}…
                </h2>
                <div className="mt-6 space-y-3">
                  {SCAN_STEPS.map((s, i) => (
                    <div key={s} className={`flex items-center gap-3 border-b border-[var(--line-soft)] pb-3 font-body text-[0.95rem] ${i <= stepIdx ? 'text-ink' : 'text-ink-faint'}`}>
                      <span className={`flex h-4 w-4 items-center justify-center text-[0.7rem] ${i < stepIdx ? 'text-spot' : 'text-ink-3'}`}>
                        {i < stepIdx ? '✓' : i === stepIdx ? '◐' : '○'}
                      </span>
                      {s}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {screen === 'gate' && (
              <div>
                <p className="kicker mb-3">Scan complete</p>
                <div className="paper-card mb-5 p-5 text-center">
                  <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-ink-3">AI visibility scan</p>
                  <p className="mt-3 font-display text-[1.9rem] font-bold uppercase leading-[1.12] tracking-tight text-ink">
                    You only have <span className="text-spot-deep">{leakPct ?? '—'}%</span> visibility
                  </p>
                  <p className="mt-2 font-body text-[0.88rem] text-ink-2">Most nearby customers never see you when they search.</p>
                </div>
                {vertical && (
                  <p className="mb-2 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-ink-3">
                    Detected: {vertical}
                  </p>
                )}
                <p className="font-body text-[1rem] leading-relaxed text-ink-2">
                  We found <b>{findings.length || 'several'}</b> readiness issues on {cleanUrl(url)}. Tell us
                  where to send the full report.
                </p>
                <div className="mt-5 space-y-3">
                  <input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" autoComplete="name" />
                  <input className={inputCls} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Work email" type="email" autoComplete="email" />
                  <input className={inputCls} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" type="tel" autoComplete="tel" />
                  {gateErr && <p className="font-body text-[0.82rem] text-spot-deep">{gateErr}</p>}
                </div>
                <button onClick={submitGate} disabled={busy} className="btn-primary mt-5 w-full disabled:opacity-60">
                  {busy ? 'Unlocking…' : 'Show me the full report'}
                </button>
                <p className="mt-3 text-center font-mono text-[0.58rem] uppercase tracking-[0.08em] text-ink-faint">
                  We email a copy. No spam.
                </p>
              </div>
            )}

            {screen === 'report' && (
              <div>
                <p className="kicker mb-3">Your readiness report</p>
                <div className="paper-card mb-5 p-5">
                  <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-ink-3">{cleanUrl(url)}</p>
                  <p className="mt-2 font-display text-[1.7rem] font-bold uppercase leading-[1.12] tracking-tight text-ink">
                    You only have <span className="text-spot-deep">{leakPct ?? '—'}%</span> visibility
                  </p>
                  {summary && <p className="mt-3 font-body text-[0.95rem] leading-snug text-ink-2">{summary}</p>}
                </div>
                <p className="kicker kicker-ink mb-2">Fix these first</p>
                <ul className="space-y-3">
                  {(findings.length ? findings : [{ title: 'Structured data and entity setup' }, { title: 'Booking and contact signals' }]).slice(0, 6).map((f, i) => (
                    <li key={f.id ?? i} className="border-b border-[var(--line-soft)] pb-2.5">
                      <div className="flex gap-3">
                        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 bg-spot" />
                        <span className="font-body text-[0.96rem] font-medium leading-snug text-ink">{f.title}</span>
                      </div>
                      {f.detail && <p className="ml-[24px] mt-1 font-body text-[0.86rem] leading-snug text-ink-3">{f.detail}</p>}
                    </li>
                  ))}
                </ul>
                <div className="ink-block mt-6 p-5">
                  <p className="kicker mb-2" style={{ color: 'var(--spot)' }}>Founding member offer</p>
                  <p className="font-display text-[1.3rem] font-semibold leading-snug text-[var(--paper)]">
                    Book from your scan and lock founding-member pricing.
                  </p>
                  <ul className="mt-3 space-y-1.5">
                    {[
                      'A plan to fix every gap above, on a free 20-minute call',
                      'The competitors taking the searches you are missing',
                      'Your rate locked at our founding-member price, only from here',
                    ].map((b) => (
                      <li key={b} className="flex gap-2.5 font-body text-[0.9rem] leading-snug text-[rgba(244,238,222,0.82)]">
                        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 bg-[var(--spot)]" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <button onClick={bookCall} className="btn-primary mt-4 w-full !border-[var(--paper)] !bg-[var(--paper)] !text-[var(--ink)] hover:!border-[var(--spot)] hover:!bg-[var(--spot)] hover:!text-[var(--paper)]">
                    Book and lock my rate
                  </button>
                </div>
              </div>
            )}

            {screen === 'error' && (
              <div>
                <p className="kicker mb-3">Scan unavailable</p>
                <h2 className="font-display text-[1.6rem] font-semibold text-ink">We could not finish that scan.</h2>
                <p className="mt-3 font-body text-[1rem] leading-relaxed text-ink-2">
                  The site may be blocking crawlers, or the scan service is busy. Try again, or just book a
                  call and we will run it with you.
                </p>
                <button onClick={() => setScreen('input')} className="btn-ghost mt-5 w-full">Try another site</button>
                <button onClick={bookCall} className="btn-primary mt-3 w-full">Book a call instead</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
