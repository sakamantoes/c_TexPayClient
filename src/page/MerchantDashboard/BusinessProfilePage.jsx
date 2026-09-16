import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { useAuthStore } from "../../store/auth.store";
import { useMerchantStore } from "../../store/merchant.store";
import { hasPermission } from "../../utils/permissions";

const navSections = [
  {
    title: "Overview",
    items: [
      { key: "dashboard", label: "Dashboard", icon: "dashboard", path: "/merchant/dashboard" },
      {
        key: "business",
        label: "Business",
        icon: "business",
        children: [
          { key: "business-profile", label: "Business Profile", path: "/merchant/dashboard/business" },
          { key: "team-members", label: "Team Members", path: "/merchant/dashboard/team" },
          { key: "roles-permissions", label: "Roles & Permissions", path: "/merchant/dashboard/roles" },
        ],
      },
    ],
  },
];

const fields = [
  ["businessName", "Business name", true],
  ["businessType", "Business type", false],
  ["email", "Business email", false],
  ["phone", "Phone", false],
  ["website", "Website", false],
  ["country", "Country", false],
  ["addressLine1", "Address", false],
  ["city", "City", false],
  ["state", "State", false],
  ["postalCode", "Postal code", false],
];

const emptyForm = Object.fromEntries(fields.map(([name]) => [name, ""]));

export default function BusinessProfilePage() {
  const { user } = useAuthStore();
  const {
    businessProfile,
    merchant,
    permissions,
    roles,
    isLoading,
    error,
    getBusinessProfile,
    getMyMerchant,
    updateBusinessProfile,
    clearError,
  } = useMerchantStore();
  const [form, setForm] = useState(emptyForm);
  const [description, setDescription] = useState("");

  useEffect(() => {
    Promise.all([getBusinessProfile(), getMyMerchant()]);
  }, [getBusinessProfile, getMyMerchant]);

  useEffect(() => {
    if (!businessProfile) return;
    // The form is controlled locally and must hydrate after the async profile fetch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setForm((current) => ({
      ...current,
      ...Object.fromEntries(fields.map(([name]) => [name, businessProfile[name] || ""])),
    }));
    setDescription(businessProfile.description || "");
  }, [businessProfile]);

  const canUpdate = hasPermission(permissions, "business.update");
  const displayName = useMemo(
    () => `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || "Merchant Admin",
    [user]
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    if (error) clearError();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = Object.fromEntries(
      Object.entries({ ...form, description }).map(([key, value]) => [key, value.trim()])
    );

    if (!payload.businessName) {
      toast.error("Business name is required.");
      return;
    }

    const result = await updateBusinessProfile(payload);
    if (result.success) toast.success("Business profile updated successfully.");
    else toast.error(result.message || "Unable to update business profile.");
  };

  return (
    <DashboardLayout
      title={businessProfile?.businessName || "Merchant"}
      subtitle="Business profile"
      navSections={navSections}
      profileName={displayName}
      profileRole={roles[0]?.name}
    >
      <div className="rounded-2xl border border-ctex-border bg-ctex-surface p-5 shadow-lg shadow-black/10 sm:p-6">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-ctex-text">Business profile</h2>
            <p className="mt-1 text-sm text-ctex-text-muted">Keep your merchant information accurate and up to date.</p>
          </div>
          <span className="rounded-full border border-ctex-border bg-ctex-elevated px-3 py-1 text-xs text-ctex-text-muted">
            {merchant?.status || "ACTIVE"}
          </span>
        </div>

        {error && <div className="mb-5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-500">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            {fields.map(([name, label, required]) => (
              <label key={name} className={name === "addressLine1" ? "sm:col-span-2" : ""}>
                <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ctex-text-muted">{label}</span>
                <input
                  name={name}
                  type={name === "email" ? "email" : "text"}
                  value={form[name]}
                  onChange={handleChange}
                  required={required}
                  disabled={!canUpdate || isLoading}
                  className="h-11 w-full rounded-xl border border-ctex-border bg-ctex-elevated/60 px-3 text-sm text-ctex-text outline-none placeholder:text-ctex-text-muted/60 focus:border-ctex-blue focus:ring-2 focus:ring-ctex-blue/20 disabled:cursor-not-allowed disabled:opacity-60"
                />
              </label>
            ))}
          </div>

          <label>
            <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ctex-text-muted">Description</span>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={4}
              disabled={!canUpdate || isLoading}
              className="w-full rounded-xl border border-ctex-border bg-ctex-elevated/60 px-3 py-2 text-sm text-ctex-text outline-none placeholder:text-ctex-text-muted/60 focus:border-ctex-blue focus:ring-2 focus:ring-ctex-blue/20 disabled:cursor-not-allowed disabled:opacity-60"
            />
          </label>

          <div className="flex flex-col gap-3 border-t border-ctex-border pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-ctex-text-muted">{canUpdate ? "Changes are saved to your merchant profile." : "You have read-only access to this profile."}</p>
            {canUpdate && <button type="submit" disabled={isLoading} className="rounded-xl bg-ctex-blue px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-ctex-blue-light disabled:cursor-not-allowed disabled:opacity-60">{isLoading ? "Saving..." : "Save changes"}</button>}
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
