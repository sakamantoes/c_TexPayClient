import DashboardLayout from "../../components/dashboard/DashboardLayout";

const merchantNav = [
  {
    title: "Overview",
    items: [
      { key: "dashboard", label: "Dashboard", icon: "dashboard" },
      { key: "payments", label: "Payments", icon: "payments", children: [
          { key: "transactions", label: "Transactions" },
          { key: "payment-links", label: "Payment Links" },
          { key: "customers", label: "Customers" },
        ],
      },
      { key: "wallet", label: "Wallet", icon: "wallet", children: [
          { key: "wallet-balance", label: "Balance" },
          { key: "wallet-transactions", label: "Transactions" },
          { key: "withdraw", label: "Withdraw" },
        ],
      },
      { key: "business", label: "Business", icon: "business", children: [
          { key: "business-profile", label: "Business Profile" },
          { key: "team-members", label: "Team Members" },
          { key: "roles-permissions", label: "Roles & Permissions" },
          { key: "settings", label: "Settings" },
        ],
      },
      { key: "developers", label: "Developers", icon: "developers", children: [
          { key: "api-docs", label: "API Documentation" },
          { key: "api-keys", label: "API Keys" },
          { key: "webhooks", label: "Webhooks" },
        ],
      },
      { key: "notifications", label: "Notifications", icon: "notifications" },
      { key: "support", label: "Support", icon: "support" },
    ],
  },
];

const merchantCards = [
  { title: "Total Volume", value: "$84.2K", detail: "+12.5% vs last month" },
  { title: "Successful Payments", value: "1,482", detail: "98.6% success rate" },
  { title: "Pending Payouts", value: "$18.4K", detail: "3 settlements queued" },
  { title: "Active Customers", value: "426", detail: "+32 this week" },
];

const MerchantDashboard = () => {
  return (
    <DashboardLayout
      title="Merchant"
      subtitle="Overview dashboard"
      navSections={merchantNav}
      profileName="Merchant Admin"
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {merchantCards.map((card) => (
          <div key={card.title} className="rounded-2xl border border-ctex-border bg-ctex-surface p-5 shadow-lg shadow-black/10">
            <p className="text-sm text-ctex-text-muted">{card.title}</p>
            <h3 className="mt-3 text-3xl font-semibold text-ctex-text">{card.value}</h3>
            <p className="mt-2 text-xs text-ctex-text-muted">{card.detail}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <div className="rounded-2xl border border-ctex-border bg-ctex-surface p-5 shadow-lg shadow-black/10">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-ctex-text">Recent activity</h3>
            <button type="button" className="text-sm text-ctex-blue">View all</button>
          </div>
          <div className="space-y-4">
            {[
              ["Invoice #CTX-1042", "Completed", "+$2,450.00"],
              ["Subscription renewal", "Pending", "+$860.00"],
              ["Customer refund", "Processed", "-$120.00"],
            ].map(([label, status, amount]) => (
              <div key={label} className="flex items-center justify-between rounded-xl border border-ctex-border bg-ctex-elevated px-3 py-3">
                <div>
                  <p className="font-medium text-ctex-text">{label}</p>
                  <p className="text-xs text-ctex-text-muted">{status}</p>
                </div>
                <span className="font-semibold text-ctex-text">{amount}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-ctex-border bg-ctex-surface p-5 shadow-lg shadow-black/10">
          <h3 className="text-lg font-semibold text-ctex-text">Quick actions</h3>
          <div className="mt-4 space-y-2">
            {[
              "Create payment link",
              "View transactions",
              "Add team member",
              "Manage API keys",
            ].map((action) => (
              <button
                key={action}
                type="button"
                className="flex w-full items-center justify-between rounded-xl border border-ctex-border bg-ctex-elevated px-3 py-2.5 text-sm text-ctex-text transition hover:border-ctex-blue hover:text-ctex-blue"
              >
                {action}
                <span>→</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MerchantDashboard;
