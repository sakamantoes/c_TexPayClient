import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Sun,
  Moon,
  Menu,
  X,
  Key,
  Webhook,
  ShieldCheck,
  RefreshCw,
  Users,
  Receipt,
  Wallet,
  ArrowDownToLine,
  ArrowRight,
  ChevronDown,
  Lock,
  ScrollText,
  UserCheck,
  CheckCircle2,
  Circle,
  Clock,
  XCircle,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Cartoon / illustration primitives (additive only)                   */
/* ------------------------------------------------------------------ */

/* A friendly cartoon credit card that tilts and floats slightly. */
function CartoonCard({ className = "" }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.svg
      viewBox="0 0 120 80"
      className={className}
      animate={reduceMotion ? undefined : { y: [0, -6, 0], rotate: [-3, 3, -3] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden
    >
      <rect x="4" y="10" width="112" height="66" rx="10" fill="var(--ctex-blue)" opacity="0.9" />
      <rect x="4" y="24" width="112" height="10" fill="rgba(0,0,0,0.25)" />
      <rect x="14" y="46" width="34" height="18" rx="4" fill="rgba(255,255,255,0.85)" />
      <circle cx="24" cy="55" r="4" fill="#f59e0b" />
      <circle cx="32" cy="55" r="4" fill="#fbbf24" />
      <rect x="58" y="52" width="48" height="4" rx="2" fill="rgba(255,255,255,0.6)" />
      <rect x="58" y="60" width="30" height="4" rx="2" fill="rgba(255,255,255,0.4)" />
    </motion.svg>
  );
}

/* A cartoon coin with a naira/currency glyph. */
function CartoonCoin({ className = "", delay = 0 }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.svg
      viewBox="0 0 64 64"
      className={className}
      animate={reduceMotion ? undefined : { rotateY: [0, 360] }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear", delay }}
      aria-hidden
    >
      <circle cx="32" cy="32" r="28" fill="#f59e0b" />
      <circle cx="32" cy="32" r="22" fill="#fbbf24" />
      <text
        x="32"
        y="41"
        textAnchor="middle"
        fontSize="26"
        fontWeight="700"
        fill="#92400e"
        fontFamily="monospace"
      >
        ₦
      </text>
    </motion.svg>
  );
}

/* A cartoon wallet with money peeking out. */
function CartoonWallet({ className = "" }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.svg
      viewBox="0 0 120 90"
      className={className}
      animate={reduceMotion ? undefined : { rotate: [-2, 2, -2] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden
    >
      <rect x="10" y="24" width="100" height="60" rx="10" fill="#0b68ad" />
      <rect x="10" y="34" width="100" height="50" rx="10" fill="#1e7fc4" />
      <rect x="78" y="50" width="34" height="20" rx="6" fill="#fbbf24" />
      <circle cx="95" cy="60" r="4" fill="#92400e" />
      <rect x="20" y="14" width="60" height="18" rx="4" fill="#34d399" />
      <rect x="24" y="18" width="52" height="10" rx="2" fill="#10b981" />
    </motion.svg>
  );
}

/* A tiny cartoon receipt with a checkmark. */
function CartoonReceipt({ className = "" }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.svg
      viewBox="0 0 80 100"
      className={className}
      animate={reduceMotion ? undefined : { y: [0, -4, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden
    >
      <path
        d="M10 8 h60 v84 l-10 -6 -10 6 -10 -6 -10 6 -10 -6 -10 6 z"
        fill="#ffffff"
        stroke="var(--ctex-border)"
        strokeWidth="2"
      />
      <rect x="22" y="24" width="36" height="4" rx="2" fill="#94a3b8" />
      <rect x="22" y="34" width="28" height="4" rx="2" fill="#cbd5e1" />
      <rect x="22" y="44" width="32" height="4" rx="2" fill="#cbd5e1" />
      <rect x="22" y="54" width="20" height="4" rx="2" fill="#cbd5e1" />
      <circle cx="52" cy="74" r="12" fill="#10b981" />
      <path
        d="M46 74 l4 4 l8 -8"
        stroke="#ffffff"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
}

/* A cartoon piggy bank — symbolises savings / merchant wallet. */
function CartoonPiggy({ className = "" }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.svg
      viewBox="0 0 120 100"
      className={className}
      animate={reduceMotion ? undefined : { scale: [1, 1.03, 1] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden
    >
      <ellipse cx="60" cy="58" rx="44" ry="32" fill="#f9a8d4" />
      <ellipse cx="60" cy="58" rx="44" ry="32" fill="none" stroke="#ec4899" strokeWidth="2" />
      <circle cx="98" cy="52" r="8" fill="#f472b6" />
      <circle cx="98" cy="52" r="4" fill="#be185d" />
      <circle cx="46" cy="46" r="4" fill="#831843" />
      <rect x="52" y="18" width="16" height="6" rx="2" fill="#be185d" />
      <rect x="30" y="82" width="10" height="12" rx="3" fill="#be185d" />
      <rect x="80" y="82" width="10" height="12" rx="3" fill="#be185d" />
    </motion.svg>
  );
}

/* A cartoon smartphone showing a payment success screen. */
function CartoonPhone({ className = "" }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.svg
      viewBox="0 0 80 140"
      className={className}
      animate={reduceMotion ? undefined : { y: [0, -5, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden
    >
      <rect x="6" y="6" width="68" height="128" rx="12" fill="#0f172a" />
      <rect x="10" y="14" width="60" height="112" rx="8" fill="#e2e8f0" />
      <circle cx="40" cy="30" r="10" fill="#10b981" />
      <path
        d="M35 30 l4 4 l7 -7"
        stroke="#ffffff"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="20" y="50" width="40" height="5" rx="2.5" fill="#94a3b8" />
      <rect x="24" y="62" width="32" height="5" rx="2.5" fill="#cbd5e1" />
      <rect x="28" y="74" width="24" height="5" rx="2.5" fill="#cbd5e1" />
      <rect x="18" y="96" width="44" height="14" rx="7" fill="#0b68ad" />
      <rect x="24" y="102" width="32" height="2" rx="1" fill="rgba(255,255,255,0.7)" />
    </motion.svg>
  );
}

/* A small floating coin burst — decorative accent. */
function CoinBurst({ className = "" }) {
  return (
    <div className={`pointer-events-none ${className}`} aria-hidden>
      <CartoonCoin className="absolute h-8 w-8" delay={0} />
      <CartoonCoin className="absolute left-10 top-6 h-6 w-6" delay={1.5} />
      <CartoonCoin className="absolute left-4 top-12 h-5 w-5" delay={3} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Theme                                                               */
/* ------------------------------------------------------------------ */

function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light";
    const stored = window.localStorage.getItem("ctex-theme");
    if (stored) return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem("ctex-theme", theme);
  }, [theme]);

  return [theme, setTheme];
}

/* ------------------------------------------------------------------ */
/* Shared primitives                                                   */
/* ------------------------------------------------------------------ */

function Reveal({ children, delay = 0, className = "" }) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children }) {
  return (
    <p className="font-mono text-[13px] text-ctex-blue dark:text-ctex-blue-light">
      {children}
    </p>
  );
}

function SectionHeading({ eyebrow, title, sub, align = "left" }) {
  return (
    <div className={align === "center" ? "text-center mx-auto max-w-2xl" : "max-w-2xl"}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="mt-3 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--ctex-text)]">
        {title}
      </h2>
      {sub && (
        <p className="mt-4 text-base leading-relaxed text-[var(--ctex-text-muted)]">
          {sub}
        </p>
      )}
    </div>
  );
}

function Button({ as = "button", variant = "primary", children, className = "", ...props }) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-medium transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ctex-blue";
  const variants = {
    primary:
      "bg-ctex-blue text-white hover:bg-ctex-blue-light",
    secondary:
      "border border-[var(--ctex-border)] text-[var(--ctex-text)] hover:border-ctex-blue hover:text-ctex-blue",
    ghost:
      "text-[var(--ctex-text)] hover:text-ctex-blue",
  };
  const Comp = as;
  return (
    <Comp className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </Comp>
  );
}

function CodeWindow({ label = "request.js", lines }) {
  return (
    <div className="rounded-none border border-[var(--ctex-border)] bg-[var(--ctex-elevated)] shadow-[0_24px_60px_-24px_rgba(11,104,173,0.35)]">
      <div className="flex items-center justify-between border-b border-[var(--ctex-border)] px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--ctex-border)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--ctex-border)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--ctex-border)]" />
        </div>
        <span className="font-mono text-xs text-[var(--ctex-text-muted)]">{label}</span>
      </div>
      <pre className="overflow-x-auto px-5 py-5 font-mono text-[13px] leading-relaxed text-[var(--ctex-text)]">
        <code>{lines}</code>
      </pre>
    </div>
  );
}

function FlowSteps({ steps, orientation = "vertical" }) {
  const isRow = orientation === "horizontal";
  return (
    <div className={isRow ? "flex flex-col sm:flex-row" : "flex flex-col"}>
      {steps.map((step, i) => (
        <div
          key={step.title}
          className={isRow ? "flex flex-1 items-start gap-3" : "flex gap-4"}
        >
          <div className="flex flex-col items-center">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ctex-blue/40 bg-ctex-blue/5 font-mono text-xs text-ctex-blue dark:text-ctex-blue-light">
              {i + 1}
            </div>
            {i < steps.length - 1 && (
              <span
                className={
                  isRow
                    ? "hidden sm:block mt-4 h-px flex-1 w-full bg-[var(--ctex-border)]"
                    : "my-1 w-px flex-1 bg-[var(--ctex-border)]"
                }
              />
            )}
          </div>
          <div className={isRow ? "pb-8" : "pb-8"}>
            <p className="font-medium text-[var(--ctex-text)]">{step.title}</p>
            <p className="mt-1 text-sm text-[var(--ctex-text-muted)]">{step.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Navbar                                                              */
/* ------------------------------------------------------------------ */

function Navbar({ theme, setTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Product", href: "#features" },
    { label: "Developers", href: "#developers" },
    { label: "Solutions", href: "#merchant-flow" },
    { label: "Pricing", href: "#pricing" },
    { label: "Documentation", href: "#docs" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-200 ${
        scrolled
          ? "border-b border-[var(--ctex-border)] bg-[var(--ctex-bg)]/85 backdrop-blur"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight text-[var(--ctex-text)]">
          {/* ADDED: tiny cartoon card mark next to brand */}
          <CartoonCard className="h-7 w-10" />
          <span>
            C-TEX <span className="text-ctex-blue">PAY</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm text-[var(--ctex-text-muted)] transition-colors hover:text-ctex-blue"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <button
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-[var(--ctex-border)] text-[var(--ctex-text-muted)] transition-colors hover:text-ctex-blue"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <Link
            to="/login"
            className="text-sm font-medium text-[var(--ctex-text)] hover:text-ctex-blue"
          >
            Log in
          </Link>
          <Button as={Link} to="/signup">
            Get Started
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-[var(--ctex-border)] text-[var(--ctex-text-muted)]"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-[var(--ctex-border)] text-[var(--ctex-text)]"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-b border-[var(--ctex-border)] bg-[var(--ctex-bg)] md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 pb-5 pt-1">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-2.5 text-sm text-[var(--ctex-text-muted)] hover:text-ctex-blue"
                >
                  {l.label}
                </a>
              ))}
              <div className="mt-3 flex flex-col gap-2">
                <Button as={Link} to="/login" variant="secondary">
                  Log in
                </Button>
                <Button as={Link} to="/signup">
                  Get Started
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                 */
/* ------------------------------------------------------------------ */

function Hero() {
  const reduceMotion = useReducedMotion();
  const codeLines = `const res = await fetch(
  "https://api.ctexpay.com/v1/payments",
  {
    method: "POST",
    headers: {
      "Authorization": \`Bearer \${CTEX_SECRET_KEY}\`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      amount: 500000,
      currency: "NGN",
      customer: "cus_8fh29a",
      reference: "order_10234"
    })
  }
);

const payment = await res.json();`;

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
  };
  const item = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-ctex-blue/20 blur-[140px] dark:bg-ctex-blue/25"
      />
      <motion.div
        variants={reduceMotion ? undefined : container}
        initial={reduceMotion ? undefined : "hidden"}
        animate={reduceMotion ? undefined : "show"}
        className="relative mx-auto grid max-w-7xl gap-14 px-6 pb-24 pt-16 sm:pt-24 lg:grid-cols-2 lg:items-center lg:pb-32"
      >
        <div>
          <motion.p
            variants={reduceMotion ? undefined : item}
            className="font-mono text-[13px] text-ctex-blue dark:text-ctex-blue-light"
          >
            Payment infrastructure for developers
          </motion.p>
          <motion.h1
            variants={reduceMotion ? undefined : item}
            className="mt-4 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-[var(--ctex-text)] sm:text-5xl"
          >
            Accept payments. Build faster.
          </motion.h1>
          <motion.p
            variants={reduceMotion ? undefined : item}
            className="mt-6 max-w-md text-base leading-relaxed text-[var(--ctex-text-muted)]"
          >
            Accept payments, verify transactions, and automate payment
            confirmation with a simple API built for modern businesses.
          </motion.p>
          <motion.div variants={reduceMotion ? undefined : item} className="mt-9 flex flex-wrap gap-3">
            <Button as={Link} to="/signup">
              Get Started
              <ArrowRight size={16} />
            </Button>
            <Button as="a" href="#docs" variant="secondary">
              Read the Docs
            </Button>
          </motion.div>
          <motion.p
            variants={reduceMotion ? undefined : item}
            className="mt-8 text-sm text-[var(--ctex-text-muted)]"
          >
            No SDK to install. Your API key is the integration.
          </motion.p>

          {/* ADDED: cartoon payment symbols floating below hero copy */}
          <motion.div
            variants={reduceMotion ? undefined : item}
            className="mt-10 flex items-end gap-6"
            aria-hidden
          >
            <CartoonWallet className="h-20 w-28" />
            <CartoonPhone className="h-24 w-14" />
            <CartoonCoin className="h-12 w-12" />
          </motion.div>
        </div>

        <motion.div variants={reduceMotion ? undefined : item} className="relative">
          {/* ADDED: cartoon card overlapping the code window */}
          <CartoonCard className="absolute -top-10 -left-10 z-10 hidden h-20 w-32 sm:block" />
          <CartoonReceipt className="absolute -bottom-10 -right-6 z-10 hidden h-24 w-20 sm:block" />
          <CodeWindow label="payments.js" lines={codeLines} />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Trust strip                                                         */
/* ------------------------------------------------------------------ */

function TrustBar() {
  const points = [
    { icon: Key, label: "API-first" },
    { icon: ShieldCheck, label: "Secure by default" },
    { icon: Users, label: "Developer-friendly" },
    { icon: Webhook, label: "Webhook powered" },
  ];
  return (
    <div className="border-y border-[var(--ctex-border)]">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-8 sm:grid-cols-4">
        {points.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-2.5 text-sm text-[var(--ctex-text-muted)]">
            <Icon size={16} className="text-ctex-blue dark:text-ctex-blue-light" />
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Problem → Solution                                                  */
/* ------------------------------------------------------------------ */

function ProblemSolution() {
  const rows = [
    { problem: "Complex integrations", solution: "One documented API" },
    { problem: "Manual verification", solution: "Automatic verification + webhooks" },
    { problem: "Unclear transaction status", solution: "Real-time transaction state" },
    { problem: "Difficult API management", solution: "Simple key generation and rotation" },
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <Reveal>
        <SectionHeading
          eyebrow="Why C-TEX PAY"
          title="Payment integration shouldn't slow your product down."
          sub="Most delays come from the same handful of problems. C-TEX PAY removes them one by one."
        />
      </Reveal>

      <div className="mt-12 divide-y divide-[var(--ctex-border)] border-y border-[var(--ctex-border)]">
        {rows.map((row, i) => (
          <Reveal key={row.problem} delay={i * 0.05}>
            <div className="grid grid-cols-1 items-center gap-3 py-5 sm:grid-cols-[1fr_auto_1fr] sm:gap-6">
              <p className="text-[var(--ctex-text-muted)]">{row.problem}</p>
              <ArrowRight size={16} className="hidden text-ctex-blue sm:block" />
              <p className="font-medium text-[var(--ctex-text)]">{row.solution}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Core features                                                       */
/* ------------------------------------------------------------------ */

function Features() {
  const features = [
    { icon: Key, title: "API-First Payments", desc: "Integrate directly with the C-TEX PAY API without installing an SDK." },
    { icon: Lock, title: "API Keys", desc: "Generate, rotate, and revoke API keys directly from your dashboard." },
    { icon: Webhook, title: "Webhooks", desc: "Receive secure payment notifications directly on your server." },
    { icon: CheckCircle2, title: "Automatic Verification", desc: "C-TEX PAY verifies transactions before reporting successful payments." },
    { icon: ShieldCheck, title: "Idempotency", desc: "Protect payment requests from accidental duplicate processing." },
    { icon: RefreshCw, title: "Automatic Retries", desc: "Transient failures can be retried safely, without manual intervention." },
    { icon: Users, title: "Customer Management", desc: "Create and manage customers directly from your API." },
    { icon: Receipt, title: "Transaction Management", desc: "Track payment status and transaction history in one place." },
    { icon: Wallet, title: "Merchant Wallet", desc: "Monitor available funds and balances as payments settle." },
    { icon: ArrowDownToLine, title: "Payouts", desc: "Withdraw eligible funds to your supported bank accounts." },
  ];

  return (
    <section id="features" className="mx-auto max-w-7xl px-6 py-24">
      <Reveal>
        <SectionHeading
          eyebrow="Everything included"
          title="One platform for your entire payment operation."
        />
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-[var(--ctex-border)] bg-[var(--ctex-border)] sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <Reveal key={f.title} delay={(i % 3) * 0.04} className="bg-[var(--ctex-bg)]">
            <div className="h-full p-7">
              <f.icon size={20} className="text-ctex-blue dark:text-ctex-blue-light" />
              <p className="mt-4 font-medium text-[var(--ctex-text)]">{f.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-[var(--ctex-text-muted)]">
                {f.desc}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Developer section — tabbed code examples                            */
/* ------------------------------------------------------------------ */

function DeveloperSection() {
  const tabs = {
    "Node.js": `const res = await fetch("https://api.ctexpay.com/v1/payments", {
  method: "POST",
  headers: {
    Authorization: \`Bearer \${process.env.CTEX_SECRET_KEY}\`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    amount: 500000,
    currency: "NGN",
    customer: "cus_8fh29a",
    reference: "order_10234",
  }),
});

const payment = await res.json();`,
    cURL: `curl https://api.ctexpay.com/v1/payments \\
  -H "Authorization: Bearer $CTEX_SECRET_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 500000,
    "currency": "NGN",
    "customer": "cus_8fh29a",
    "reference": "order_10234"
  }'`,
    Python: `import requests

response = requests.post(
    "https://api.ctexpay.com/v1/payments",
    headers={
        "Authorization": f"Bearer {CTEX_SECRET_KEY}",
        "Content-Type": "application/json",
    },
    json={
        "amount": 500000,
        "currency": "NGN",
        "customer": "cus_8fh29a",
        "reference": "order_10234",
    },
)

payment = response.json()`,
    PHP: `$ch = curl_init("https://api.ctexpay.com/v1/payments");

curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => [
        "Authorization: Bearer " . getenv("CTEX_SECRET_KEY"),
        "Content-Type: application/json",
    ],
    CURLOPT_POSTFIELDS => json_encode([
        "amount" => 500000,
        "currency" => "NGN",
        "customer" => "cus_8fh29a",
        "reference" => "order_10234",
    ]),
]);

$payment = json_decode(curl_exec($ch), true);`,
    JavaScript: `const res = await fetch("https://api.ctexpay.com/v1/payments", {
  method: "POST",
  headers: {
    Authorization: "Bearer CTEX_SECRET_KEY",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    amount: 500000,
    currency: "NGN",
    customer: "cus_8fh29a",
    reference: "order_10234",
  }),
});

const { checkout_url } = await res.json();
window.location.href = checkout_url;`,
  };

  const [active, setActive] = useState("Node.js");

  const steps = [
    { title: "Create account", desc: "Sign up for C-TEX PAY in a few minutes." },
    { title: "Create merchant", desc: "Register the business you're collecting payments for." },
    { title: "Generate API key", desc: "Create a key from your dashboard — no approval wait." },
    { title: "Add API to your application", desc: "Call the API directly. No SDK required." },
    { title: "Receive webhook", desc: "C-TEX PAY notifies your server the moment status changes." },
    { title: "Verify payment", desc: "Confirm the signature, then mark the order paid." },
  ];

  return (
    <section id="developers" className="mx-auto max-w-7xl px-6 py-24">
      <Reveal>
        <SectionHeading
          eyebrow="For developers"
          title="One API. Everything your payment flow needs."
        />
      </Reveal>

      <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:items-start">
        <Reveal>
          <FlowSteps steps={steps} />
        </Reveal>

        <Reveal delay={0.08} className="relative">
          {/* ADDED: cartoon coin cluster floating near the code tabs */}
          <CoinBurst className="absolute -top-10 right-0 z-10 hidden sm:block" />
          <div className="flex flex-wrap gap-1 border-b border-[var(--ctex-border)]">
            {Object.keys(tabs).map((tab) => (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                className={`px-3.5 py-2.5 font-mono text-xs transition-colors ${
                  active === tab
                    ? "border-b-2 border-ctex-blue text-ctex-blue dark:text-ctex-blue-light"
                    : "border-b-2 border-transparent text-[var(--ctex-text-muted)] hover:text-[var(--ctex-text)]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="mt-4">
            <CodeWindow label={`payments.${active === "Python" ? "py" : active === "PHP" ? "php" : active === "cURL" ? "sh" : "js"}`} lines={tabs[active]} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Webhook section                                                     */
/* ------------------------------------------------------------------ */

function WebhookSection() {
  const flow = [
    { title: "Customer pays", desc: "Your customer completes payment at checkout." },
    { title: "C-TEX PAY verifies transaction", desc: "The payment is confirmed with the provider, not assumed." },
    { title: "C-TEX PAY signs webhook", desc: "A signed event is generated for your endpoint." },
    { title: "Merchant receives webhook", desc: "Your server gets a POST request with the event payload." },
    { title: "Merchant verifies signature", desc: "Confirm the request actually came from C-TEX PAY." },
    { title: "Merchant updates order", desc: "Mark the order paid and continue your flow." },
  ];

  const webhookCode = `import crypto from "crypto";

app.post("/webhooks/ctexpay", (req, res) => {
  const signature = req.headers["x-ctex-signature"];
  const expected = crypto
    .createHmac("sha256", process.env.CTEX_WEBHOOK_SECRET)
    .update(JSON.stringify(req.body))
    .digest("hex");

  if (signature !== expected) return res.sendStatus(401);

  if (req.body.event === "payment.success") {
    markOrderPaid(req.body.data.reference);
  }

  res.sendStatus(200);
});`;

  return (
    <section className="border-t border-[var(--ctex-border)] bg-[var(--ctex-surface)]">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <Reveal>
          <SectionHeading
            eyebrow="Webhooks"
            title="Know when a payment is complete."
            sub="Set your webhook URL from the dashboard, and C-TEX PAY will notify your server the moment a transaction's status changes — signed, so you can trust what you receive."
          />
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:items-start">
          <Reveal>
            <FlowSteps steps={flow} />
          </Reveal>
          <Reveal delay={0.08} className="relative">
            {/* ADDED: cartoon receipt peeking above webhook code */}
            <CartoonReceipt className="absolute -top-12 -right-4 z-10 hidden h-24 w-20 sm:block" />
            <CodeWindow label="webhooks.js" lines={webhookCode} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Security section                                                    */
/* ------------------------------------------------------------------ */

function SecuritySection() {
  const items = [
    { icon: Key, title: "API key security", desc: "Keys are hashed at rest and scoped to permissions you set." },
    { icon: Webhook, title: "Webhook signatures", desc: "Every webhook is signed so you can confirm its origin." },
    { icon: CheckCircle2, title: "Transaction verification", desc: "Payments are confirmed with the provider before they're reported as successful." },
    { icon: ShieldCheck, title: "Idempotency", desc: "Duplicate requests are detected and safely ignored." },
    { icon: RefreshCw, title: "Automatic retries", desc: "Transient failures are retried without duplicating charges." },
    { icon: UserCheck, title: "Permission-based access", desc: "API access is scoped to what each key is allowed to do." },
    { icon: Lock, title: "Merchant isolation", desc: "Each merchant's data and keys are kept fully separate." },
    { icon: ScrollText, title: "Audit logs", desc: "Key actions on your account are recorded for review." },
  ];

  const pipeline = [
    "Merchant",
    "C-TEX PAY",
    "Payment Provider",
    "Verification",
    "Signed Webhook",
    "Merchant Server",
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <Reveal>
        <SectionHeading
          eyebrow="Security"
          title="Payments should be verified, not assumed."
          sub="A successful payment response should never be trusted blindly. C-TEX PAY verifies transactions before treating them as successful."
        />
      </Reveal>

      <Reveal delay={0.05}>
        <div className="mt-10 flex flex-wrap items-center gap-2 overflow-x-auto rounded-lg border border-[var(--ctex-border)] bg-[var(--ctex-surface)] px-5 py-4 font-mono text-xs text-[var(--ctex-text-muted)]">
          {pipeline.map((step, i) => (
            <React.Fragment key={step}>
              <span className={i === 4 ? "text-ctex-blue dark:text-ctex-blue-light" : ""}>{step}</span>
              {i < pipeline.length - 1 && <ArrowRight size={12} className="shrink-0 opacity-50" />}
            </React.Fragment>
          ))}
        </div>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-[var(--ctex-border)] bg-[var(--ctex-border)] sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it, i) => (
          <Reveal key={it.title} delay={(i % 4) * 0.04} className="bg-[var(--ctex-bg)]">
            <div className="h-full p-6">
              <it.icon size={18} className="text-ctex-blue dark:text-ctex-blue-light" />
              <p className="mt-3 text-sm font-medium text-[var(--ctex-text)]">{it.title}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-[var(--ctex-text-muted)]">{it.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Dashboard preview                                                   */
/* ------------------------------------------------------------------ */

function DashboardPreview() {
  const stats = [
    { label: "Available balance", value: "₦482,300.00" },
    { label: "Total transactions", value: "1,204" },
    { label: "Successful payments", value: "1,148" },
    { label: "Pending payments", value: "12" },
    { label: "Failed payments", value: "44" },
  ];

  const transactions = [
    { ref: "order_10234", customer: "cus_8fh29a", amount: "₦5,000.00", status: "success" },
    { ref: "order_10233", customer: "cus_2ka91c", amount: "₦12,500.00", status: "success" },
    { ref: "order_10232", customer: "cus_9jd03f", amount: "₦2,000.00", status: "pending" },
    { ref: "order_10231", customer: "cus_71la5v", amount: "₦8,750.00", status: "failed" },
  ];

  const statusMeta = {
    success: { icon: CheckCircle2, color: "text-emerald-500", label: "Success" },
    pending: { icon: Clock, color: "text-amber-500", label: "Pending" },
    failed: { icon: XCircle, color: "text-red-500", label: "Failed" },
  };

  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <Reveal>
        <SectionHeading
          eyebrow="Your dashboard"
          title="Every transaction, key, and webhook in one view."
          sub="Interface example with demo values — this is what your dashboard looks like once you're set up."
        />
      </Reveal>

      <Reveal delay={0.08} className="relative">
        {/* ADDED: piggy bank + wallet + coin trio above the dashboard preview */}
        <div className="mb-6 flex items-end justify-center gap-6 sm:justify-end" aria-hidden>
          <CartoonPiggy className="h-20 w-24" />
          <CartoonWallet className="h-16 w-24" />
          <CartoonCoin className="h-10 w-10" />
        </div>
        <div className="mt-0 rounded-none border border-[var(--ctex-border)] bg-[var(--ctex-elevated)]">
          <div className="grid grid-cols-2 divide-x divide-y divide-[var(--ctex-border)] border-b border-[var(--ctex-border)] sm:grid-cols-5 sm:divide-y-0">
            {stats.map((s) => (
              <div key={s.label} className="px-5 py-5">
                <p className="text-xs text-[var(--ctex-text-muted)]">{s.label}</p>
                <p className="mt-1.5 font-mono text-lg text-[var(--ctex-text)]">{s.value}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-[1.4fr_1fr]">
            <div className="border-r border-[var(--ctex-border)] p-5">
              <p className="text-sm font-medium text-[var(--ctex-text)]">Recent transactions</p>
              <div className="mt-4 divide-y divide-[var(--ctex-border)]">
                {transactions.map((t) => {
                  const meta = statusMeta[t.status];
                  return (
                    <div key={t.ref} className="flex items-center justify-between py-3">
                      <div>
                        <p className="font-mono text-xs text-[var(--ctex-text)]">{t.ref}</p>
                        <p className="mt-0.5 font-mono text-[11px] text-[var(--ctex-text-muted)]">{t.customer}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-xs text-[var(--ctex-text)]">{t.amount}</span>
                        <span className={`flex items-center gap-1 text-xs ${meta.color}`}>
                          <meta.icon size={13} />
                          {meta.label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-5">
              <p className="text-sm font-medium text-[var(--ctex-text)]">API keys</p>
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-[var(--ctex-text)]">sk_live_••••••••8f21</span>
                  <span className="text-emerald-500">Active</span>
                </div>
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-[var(--ctex-text)]">sk_test_••••••••1a09</span>
                  <span className="text-[var(--ctex-text-muted)]">Test mode</span>
                </div>
              </div>

              <p className="mt-6 text-sm font-medium text-[var(--ctex-text)]">Webhook status</p>
              <div className="mt-3 flex items-center gap-2 font-mono text-xs">
                <Circle size={8} className="fill-emerald-500 text-emerald-500" />
                <span className="text-[var(--ctex-text)]">api.yourapp.com/webhooks/ctexpay</span>
              </div>
              <p className="mt-1 text-[11px] text-[var(--ctex-text-muted)]">Last delivery succeeded</p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Merchant + customer experience                                      */
/* ------------------------------------------------------------------ */

function MerchantFlow() {
  const steps = [
    { title: "Create account", desc: "Sign up as a merchant on C-TEX PAY." },
    { title: "Create business", desc: "Register the business you're collecting payments for." },
    { title: "Generate API key", desc: "Create keys scoped to what your app needs." },
    { title: "Configure webhook", desc: "Point C-TEX PAY at your server's webhook endpoint." },
    { title: "Integrate API", desc: "Call the payments API directly from your application." },
    { title: "Accept payments", desc: "Customers pay; you get notified automatically." },
    { title: "Monitor transactions", desc: "Track status and history from your dashboard." },
    { title: "Withdraw funds", desc: "Move eligible balance to your bank account." },
  ];

  return (
    <section id="merchant-flow" className="mx-auto max-w-7xl px-6 py-24">
      <Reveal>
        <SectionHeading eyebrow="Merchant experience" title="From account to payout, in one flow." />
      </Reveal>
      <Reveal delay={0.06}>
        <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.title}>
              <span className="font-mono text-xs text-ctex-blue dark:text-ctex-blue-light">{String(i + 1).padStart(2, "0")}</span>
              <p className="mt-2 font-medium text-[var(--ctex-text)]">{s.title}</p>
              <p className="mt-1 text-sm text-[var(--ctex-text-muted)]">{s.desc}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function CustomerFlow() {
  const steps = ["Merchant website", "Checkout", "Customer payment", "C-TEX PAY", "Payment provider", "Verification", "Merchant webhook"];
  return (
    <section className="border-t border-[var(--ctex-border)] bg-[var(--ctex-surface)]">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <Reveal>
          <SectionHeading
            eyebrow="Customer experience"
            title="Simple for the person paying, too."
            sub="C-TEX PAY sits between your checkout and the payment provider, so your customer only ever sees a single, consistent payment experience."
          />
        </Reveal>
        <Reveal delay={0.06}>
          <div className="mt-12 flex flex-wrap items-center gap-x-2 gap-y-4 font-mono text-xs text-[var(--ctex-text-muted)] sm:text-sm">
            {steps.map((step, i) => (
              <React.Fragment key={step}>
                <span className="rounded-none border border-[var(--ctex-border)] bg-[var(--ctex-elevated)] px-3 py-2 text-[var(--ctex-text)]">
                  {step}
                </span>
                {i < steps.length - 1 && <ArrowRight size={14} className="opacity-50" />}
              </React.Fragment>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Pricing                                                             */
/* ------------------------------------------------------------------ */

function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-7xl px-6 py-24">
      <Reveal>
        <SectionHeading eyebrow="Pricing" title="Simple, transparent transaction pricing." />
      </Reveal>

      <Reveal delay={0.08}>
        <div className="mt-12 max-w-lg rounded-lg border border-[var(--ctex-border)] p-8 relative">
          {/* ADDED: cartoon coin sitting in the corner of the pricing card */}
          <CartoonCoin className="absolute -top-6 -right-6 hidden h-14 w-14 sm:block" />
          <p className="font-display text-2xl font-semibold text-[var(--ctex-text)]">Transaction fee</p>
          <p className="mt-2 text-sm text-[var(--ctex-text-muted)]">
            Configured by C-TEX PAY per merchant. No setup fees, no monthly minimums.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-[var(--ctex-text-muted)]">
            <li className="flex items-center gap-2">
              <CheckCircle2 size={15} className="text-ctex-blue dark:text-ctex-blue-light" />
              Pay only for successful transactions
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 size={15} className="text-ctex-blue dark:text-ctex-blue-light" />
              No hidden integration costs
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 size={15} className="text-ctex-blue dark:text-ctex-blue-light" />
              Full access to the dashboard and API
            </li>
          </ul>
          <Button as={Link} to="/signup" className="mt-8 w-full">
            Get Started
          </Button>
        </div>
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Docs CTA                                                            */
/* ------------------------------------------------------------------ */

function DocsCTA() {
  return (
    <section id="docs" className="border-t border-[var(--ctex-border)] bg-[var(--ctex-surface)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-24 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <p className="font-mono text-[13px] text-ctex-blue dark:text-ctex-blue-light">Documentation</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[var(--ctex-text)] sm:text-4xl">
            Ready to integrate?
          </h2>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button as="a" href="/docs">
              Read Documentation
              <ArrowRight size={16} />
            </Button>
            <Button as={Link} to="/signup" variant="secondary">
              Create Account
            </Button>
          </div>
        </Reveal>
        <Reveal delay={0.08} className="relative">
          {/* ADDED: wallet + phone pair next to docs quickstart */}
          <div className="absolute -top-16 right-0 z-10 hidden items-end gap-4 sm:flex" aria-hidden>
            <CartoonWallet className="h-16 w-24" />
            <CartoonPhone className="h-24 w-14" />
          </div>
          <CodeWindow
            label="quickstart.sh"
            lines={`curl https://api.ctexpay.com/v1/payments \\
  -H "Authorization: Bearer $CTEX_SECRET_KEY" \\
  -d amount=500000 -d currency=NGN`}
          />
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

function FAQ() {
  const faqs = [
    { q: "Do I need an SDK?", a: "No. C-TEX PAY is designed around direct API integration." },
    { q: "How do I authenticate API requests?", a: "Using your C-TEX PAY API key, passed as a bearer token." },
    { q: "Can I configure webhooks?", a: "Yes. Merchants can configure their webhook endpoint from their dashboard." },
    { q: "How are payments verified?", a: "C-TEX PAY verifies payment information before treating a transaction as successful." },
    { q: "Can I withdraw my funds?", a: "Yes, eligible merchant funds can be withdrawn to supported bank accounts." },
    { q: "Can I rotate my API keys?", a: "Yes, keys can be rotated at any time from your dashboard." },
    { q: "Can I revoke an API key?", a: "Yes, revoked keys stop working immediately." },
    { q: "Is C-TEX PAY suitable for developers?", a: "Yes. The platform is designed with API-first integration in mind." },
  ];
  const [open, setOpen] = useState(0);

  return (
    <section className="mx-auto max-w-4xl px-6 py-24">
      <Reveal>
        <SectionHeading eyebrow="FAQ" title="Common questions." />
      </Reveal>

      <div className="mt-10 divide-y divide-[var(--ctex-border)] border-y border-[var(--ctex-border)]">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q}>
              <button
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
              >
                <span className="font-medium text-[var(--ctex-text)]">{f.q}</span>
                <ChevronDown
                  size={16}
                  className={`shrink-0 text-[var(--ctex-text-muted)] transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 text-sm leading-relaxed text-[var(--ctex-text-muted)]">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Final CTA                                                           */
/* ------------------------------------------------------------------ */

function FinalCTA() {
  return (
    <section className="border-t border-[var(--ctex-border)]">
      <div className="mx-auto max-w-7xl px-6 py-24 text-center">
        <Reveal>
          {/* ADDED: cartoon cluster above the final CTA headline */}
          <div className="mb-10 flex items-end justify-center gap-6" aria-hidden>
            <CartoonCard className="h-16 w-24" />
            <CartoonWallet className="h-20 w-28" />
            <CartoonPiggy className="h-20 w-24" />
            <CartoonReceipt className="h-20 w-16" />
          </div>
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-semibold tracking-tight text-[var(--ctex-text)] sm:text-4xl">
            Your payments. Your API. Your business.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-[var(--ctex-text-muted)]">
            Build your payment flow with infrastructure designed around developers.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button as={Link} to="/signup">
              Get Started
              <ArrowRight size={16} />
            </Button>
            <Button as="a" href="#docs" variant="secondary">
              Explore Documentation
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Footer                                                               */
/* ------------------------------------------------------------------ */

function Footer() {
  const columns = [
    { title: "Product", links: ["Payments", "Transactions", "Customers", "Webhooks", "API Keys", "Payouts"] },
    { title: "Developers", links: ["Documentation", "API Reference", "Integration Guide", "Webhooks", "Security"] },
    { title: "Company", links: ["About", "Contact", "Support"] },
    { title: "Legal", links: ["Privacy", "Terms"] },
  ];

  return (
    <footer className="border-t border-[var(--ctex-border)]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-medium text-[var(--ctex-text)]">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-[var(--ctex-text-muted)] hover:text-ctex-blue">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-[var(--ctex-border)] pt-8 sm:flex-row sm:items-center">
          {/* ADDED: cartoon card mark next to footer brand */}
          <span className="flex items-center gap-2 font-display text-sm font-semibold text-[var(--ctex-text)]">
            <CartoonCard className="h-6 w-9" />
            <span>
              C-TEX <span className="text-ctex-blue">PAY</span>
            </span>
          </span>
          <p className="text-xs text-[var(--ctex-text-muted)]">© 2026 C-TEX PAY. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                 */
/* ------------------------------------------------------------------ */

export default function LandingPage() {
  const [theme, setTheme] = useTheme();

  return (
    <div className="min-h-screen bg-[var(--ctex-bg)] font-body text-[var(--ctex-text)]">
      <Navbar theme={theme} setTheme={setTheme} />
      <main>
        <Hero />
        <TrustBar />
        <ProblemSolution />
        <Features />
        <DeveloperSection />
        <WebhookSection />
        <SecuritySection />
        <DashboardPreview />
        <MerchantFlow />
        <CustomerFlow />
        <Pricing />
        <DocsCTA />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}