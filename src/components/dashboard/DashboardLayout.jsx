import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  Bell,
  BriefcaseBusiness,
  Building2,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  CreditCard,
  FileText,
  KeyRound,
  Landmark,
  LayoutGrid,
  Link2,
  LogOut,
  Menu,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UserCircle2,
  Users,
  Wallet,
  Webhook,
  X,
} from "lucide-react";

const ICONS = {
  dashboard: LayoutGrid,
  payments: CreditCard,
  transactions: Activity,
  customers: Users,
  links: Link2,
  apiKeys: KeyRound,
  webhooks: Webhook,
  wallet: Wallet,
  business: BriefcaseBusiness,
  developers: FileText,
  notifications: Bell,
  support: CircleHelp,
  merchants: Building2,
  withdrawals: Landmark,
  disputes: ShieldCheck,
  security: ShieldCheck,
  system: Settings,
  profile: UserCircle2,
  overview: Sparkles,
  fees: TrendingUp,
};

const resolveIcon = (iconName) => ICONS[iconName] || LayoutGrid;

const DashboardLayout = ({
  title,
  subtitle,
  navSections,
  profileName = "Operator",
  children,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedKey, setSelectedKey] = useState(() => {
    const firstItem = navSections?.[0]?.items?.[0]?.key || "dashboard";
    return firstItem;
  });
  const [expanded, setExpanded] = useState(() => {
    const map = {};
    navSections?.forEach((section) => {
      if (section.items) {
        section.items.forEach((item) => {
          if (item.children?.length) {
            map[item.key] = true;
          }
        });
      }
    });
    return map;
  });

  const activeLabel = useMemo(() => {
    const allItems = (navSections || []).flatMap((section) => section.items || []);
    const found = allItems.find((item) => item.key === selectedKey);
    return found?.label || title;
  }, [navSections, selectedKey, title]);

  const toggleExpanded = (key) => {
    setExpanded((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  const sidebar = (
    <aside className="hidden w-72 shrink-0 border-r border-ctex-border bg-ctex-surface/80 p-4 backdrop-blur-xl lg:flex lg:flex-col">
      <div className="mb-6 flex items-center justify-between rounded-2xl border border-ctex-border bg-ctex-elevated/50 px-3 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ctex-blue text-sm font-bold text-white shadow-lg shadow-ctex-blue/25">
            C
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-ctex-text-muted">C-TEX</p>
            <p className="text-base font-semibold text-ctex-text">PAY</p>
          </div>
        </div>
        <span className="rounded-full border border-ctex-border bg-ctex-bg px-2 py-1 text-[10px] uppercase tracking-[0.16em] text-ctex-text-muted">
          {title}
        </span>
      </div>

      <nav className="space-y-4 overflow-y-auto pb-4">
        {(navSections || []).map((section) => (
          <div key={section.title} className="space-y-2">
            <p className="px-2 text-[10px] font-medium uppercase tracking-[0.2em] text-ctex-text-muted">
              {section.title}
            </p>

            <div className="space-y-1">
              {(section.items || []).map((item) => {
                const Icon = resolveIcon(item.icon);
                const isSelected = selectedKey === item.key;
                const hasChildren = Boolean(item.children?.length);
                const isExpanded = expanded[item.key];

                return (
                  <div key={item.key} className="space-y-1">
                    <button
                      type="button"
                      onClick={() => {
                        if (hasChildren) {
                          toggleExpanded(item.key);
                        }
                        setSelectedKey(item.key);
                      }}
                      className={[
                        "flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition-all duration-150",
                        isSelected
                          ? "bg-ctex-blue/10 text-ctex-blue ring-1 ring-ctex-blue/20"
                          : "text-ctex-text-muted hover:bg-ctex-elevated hover:text-ctex-text",
                      ].join(" ")}
                    >
                      <span className="flex items-center gap-3">
                        <Icon size={16} />
                        {item.label}
                      </span>

                      {hasChildren && (
                        isExpanded ? <ChevronDown size={15} /> : <ChevronRight size={15} />
                      )}
                    </button>

                    {hasChildren && isExpanded && (
                      <div className="ml-6 space-y-1 border-l border-ctex-border pl-3">
                        {(item.children || []).map((child) => (
                          <button
                            type="button"
                            key={child.key}
                            onClick={() => setSelectedKey(child.key)}
                            className={[
                              "flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-xs transition-colors",
                              selectedKey === child.key
                                ? "bg-ctex-elevated text-ctex-text"
                                : "text-ctex-text-muted hover:bg-ctex-elevated hover:text-ctex-text",
                            ].join(" ")}
                          >
                            <span>{child.label}</span>
                            {selectedKey === child.key && <ChevronRight size={12} />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="mt-auto rounded-2xl border border-ctex-border bg-ctex-elevated/60 p-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ctex-blue/10 text-ctex-blue">
            <UserCircle2 size={18} />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-ctex-text">{profileName}</p>
            <p className="text-[11px] text-ctex-text-muted">{title} account</p>
          </div>
        </div>
        <button
          type="button"
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-ctex-border bg-ctex-surface px-3 py-2 text-sm font-medium text-ctex-text-muted transition hover:border-ctex-blue hover:text-ctex-blue"
        >
          <LogOut size={14} />
          Sign out
        </button>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-ctex-bg text-ctex-text">
      <div className="flex min-h-screen">
        {sidebar}

        <div className="flex min-h-screen flex-1 flex-col">
          <header className="sticky top-0 z-20 border-b border-ctex-border bg-ctex-bg/80 backdrop-blur-xl">
            <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-5 lg:px-6">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setMobileOpen(true)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-ctex-border bg-ctex-surface text-ctex-text lg:hidden"
                  aria-label="Open navigation"
                >
                  <Menu size={18} />
                </button>

                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-ctex-text-muted">Workspace</p>
                  <h1 className="text-lg font-semibold text-ctex-text sm:text-xl">{activeLabel}</h1>
                </div>
              </div>

              <div className="hidden items-center gap-3 md:flex">
                <label className="flex items-center gap-2 rounded-xl border border-ctex-border bg-ctex-surface px-3 py-2 text-sm text-ctex-text-muted">
                  <Search size={15} />
                  <input
                    placeholder="Search"
                    className="w-40 bg-transparent text-sm text-ctex-text placeholder:text-ctex-text-muted/70 outline-none"
                  />
                </label>

                <button
                  type="button"
                  className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-ctex-border bg-ctex-surface text-ctex-text-muted transition hover:text-ctex-blue"
                  aria-label="Notifications"
                >
                  <Bell size={16} />
                  <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-ctex-blue" />
                </button>
              </div>
            </div>
          </header>

          <main className="flex-1 p-4 sm:p-6">
            <div className="mb-6 rounded-2xl border border-ctex-border bg-ctex-surface p-5 shadow-lg shadow-black/10">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-ctex-blue">{title}</p>
                  <h2 className="mt-2 text-2xl font-semibold text-ctex-text sm:text-3xl">{subtitle}</h2>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-ctex-border bg-ctex-elevated px-3 py-2 text-xs text-ctex-text-muted">
                  <Sparkles size={14} className="text-ctex-blue" />
                  Live operations
                </div>
              </div>
            </div>

            {children}
          </main>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-slate-950/60 lg:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.aside
              initial={{ x: -32, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -32, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(event) => event.stopPropagation()}
              className="h-full w-[82vw] max-w-sm border-r border-ctex-border bg-ctex-surface p-4"
            >
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ctex-blue text-sm font-bold text-white">C</div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-ctex-text-muted">C-TEX</p>
                    <p className="text-base font-semibold text-ctex-text">PAY</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-ctex-border text-ctex-text-muted"
                  aria-label="Close navigation"
                >
                  <X size={16} />
                </button>
              </div>

              <nav className="space-y-4 overflow-y-auto pb-4">
                {(navSections || []).map((section) => (
                  <div key={section.title} className="space-y-2">
                    <p className="px-2 text-[10px] font-medium uppercase tracking-[0.2em] text-ctex-text-muted">
                      {section.title}
                    </p>

                    <div className="space-y-1">
                      {(section.items || []).map((item) => {
                        const Icon = resolveIcon(item.icon);
                        const isSelected = selectedKey === item.key;
                        const hasChildren = Boolean(item.children?.length);
                        const isExpanded = expanded[item.key];

                        return (
                          <div key={item.key} className="space-y-1">
                            <button
                              type="button"
                              onClick={() => {
                                if (hasChildren) toggleExpanded(item.key);
                                setSelectedKey(item.key);
                                setMobileOpen(false);
                              }}
                              className={[
                                "flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm",
                                isSelected
                                  ? "bg-ctex-blue/10 text-ctex-blue"
                                  : "text-ctex-text-muted hover:bg-ctex-elevated hover:text-ctex-text",
                              ].join(" ")}
                            >
                              <span className="flex items-center gap-3">
                                <Icon size={16} />
                                {item.label}
                              </span>
                              {hasChildren && (isExpanded ? <ChevronDown size={15} /> : <ChevronRight size={15} />)}
                            </button>

                            {hasChildren && isExpanded && (
                              <div className="ml-6 space-y-1 border-l border-ctex-border pl-3">
                                {(item.children || []).map((child) => (
                                  <button
                                    key={child.key}
                                    type="button"
                                    onClick={() => {
                                      setSelectedKey(child.key);
                                      setMobileOpen(false);
                                    }}
                                    className={[
                                      "flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-xs",
                                      selectedKey === child.key
                                        ? "bg-ctex-elevated text-ctex-text"
                                        : "text-ctex-text-muted hover:bg-ctex-elevated hover:text-ctex-text",
                                    ].join(" ")}
                                  >
                                    {child.label}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </nav>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardLayout;
