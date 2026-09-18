import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useMerchantStore } from "../../store/merchant.store";
import { hasPermission } from "../../utils/permissions";

export default function UserBusinessProfilePage() {
  const {
    merchant,           // owned merchant (null if leo)
    businessProfile,    // owned business profile
    permissions,
    isLoading,
    error,
    getMyMerchant,
    getBusinessProfile,
    updateBusinessProfile,
    clearError,
  } = useMerchantStore();

  const [form, setForm] = useState({
    businessName: "",
    businessType: "",
    email: "",
    phone: "",
    website: "",
    country: "",
    state: "",
    city: "",
    address: "",
    description: "",
  });

  /*
  |--------------------------------------------------------------------------
  | Fetch owned merchant + business profile
  |--------------------------------------------------------------------------
  */
  useEffect(() => {
    if (!merchant) getMyMerchant().catch(() => {});
    if (!businessProfile) getBusinessProfile().catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (businessProfile) {
      setForm({
        businessName: businessProfile.businessName || "",
        businessType: businessProfile.businessType || "",
        email: businessProfile.email || "",
        phone: businessProfile.phone || "",
        website: businessProfile.website || "",
        country: businessProfile.country || "",
        state: businessProfile.state || "",
        city: businessProfile.city || "",
        address: businessProfile.address || "",
        description: businessProfile.description || "",
      });
    }
  }, [businessProfile]);

  const canUpdate = hasPermission(permissions, "business.update");

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    if (error) clearError();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canUpdate) return;

    const payload = Object.fromEntries(
      Object.entries(form).map(([k, v]) => [k, v.trim() || undefined])
    );

    const res = await updateBusinessProfile(payload);
    if (res.success) toast.success("Business profile updated.");
    else toast.error(res.message || "Unable to update profile.");
  };

  /*
  |--------------------------------------------------------------------------
  | Loading
  |--------------------------------------------------------------------------
  */
  if (isLoading && !businessProfile && !merchant) {
    return (
      <div className="space-y-4">
        <div className="h-24 animate-pulse rounded-2xl bg-ctex-elevated" />
        <div className="h-64 animate-pulse rounded-2xl bg-ctex-elevated" />
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | No owned merchant — this user is a team member (or nothing)
  |--------------------------------------------------------------------------
  */
  if (!businessProfile) {
    return (
      <div className="rounded-2xl border border-dashed border-ctex-border bg-ctex-surface/50 px-6 py-16 text-center">
        <p className="text-sm font-medium text-ctex-text">
          You don&apos;t own a business yet
        </p>
        <p className="mx-auto mt-2 max-w-sm text-xs text-ctex-text-muted">
          You&apos;re part of a team, but you haven&apos;t created your own
          business. Create one to unlock your merchant dashboard.
        </p>
        <Link
          to="/user/dashboard/create-business"
          className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-ctex-blue px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-ctex-blue/25 transition hover:bg-ctex-blue-light"
        >
          Create your business →
        </Link>
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Owned business — render editable form
  |--------------------------------------------------------------------------
  */
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-ctex-border bg-ctex-surface p-5 shadow-lg shadow-black/10 sm:p-6">
        <p className="text-[11px] uppercase tracking-[0.2em] text-ctex-blue">
          Business profile
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-ctex-text">
          {businessProfile.businessName}
        </h2>
        <p className="mt-1 text-sm text-ctex-text-muted">
          {businessProfile.businessType || "—"} ·{" "}
          {businessProfile.country || "—"}
        </p>
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-500">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-ctex-border bg-ctex-surface p-5 shadow-lg shadow-black/10 sm:p-6"
      >
        <div className="grid gap-5 md:grid-cols-2">
          <Field
            label="Business name"
            name="businessName"
            value={form.businessName}
            onChange={handleChange}
            disabled={!canUpdate}
          />
          <Field
            label="Business type"
            name="businessType"
            value={form.businessType}
            onChange={handleChange}
            disabled={!canUpdate}
          />
          <Field
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            disabled={!canUpdate}
          />
          <Field
            label="Phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            disabled={!canUpdate}
          />
          <Field
            label="Website"
            name="website"
            value={form.website}
            onChange={handleChange}
            disabled={!canUpdate}
          />
          <Field
            label="Country"
            name="country"
            value={form.country}
            onChange={handleChange}
            disabled={!canUpdate}
          />
          <Field
            label="State"
            name="state"
            value={form.state}
            onChange={handleChange}
            disabled={!canUpdate}
          />
          <Field
            label="City"
            name="city"
            value={form.city}
            onChange={handleChange}
            disabled={!canUpdate}
          />
          <div className="md:col-span-2">
            <Field
              label="Address"
              name="address"
              value={form.address}
              onChange={handleChange}
              disabled={!canUpdate}
            />
          </div>
          <div className="md:col-span-2">
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ctex-text-muted">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              disabled={!canUpdate}
              className="w-full rounded-xl border border-ctex-border bg-ctex-elevated/60 px-3 py-2.5 text-sm text-ctex-text outline-none transition focus:border-ctex-blue focus:ring-2 focus:ring-ctex-blue/20 disabled:opacity-60"
            />
          </div>
        </div>

        {canUpdate ? (
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center gap-2 rounded-xl bg-ctex-blue px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-ctex-blue/25 transition hover:bg-ctex-blue-light disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading && (
                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              )}
              Save changes
            </button>
          </div>
        ) : (
          <p className="mt-4 text-xs text-ctex-text-muted">
            You have read-only access to this business profile.
          </p>
        )}
      </form>
    </div>
  );
}

function Field({ label, ...props }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ctex-text-muted">
        {label}
      </label>
      <input
        {...props}
        className="h-11 w-full rounded-xl border border-ctex-border bg-ctex-elevated/60 px-3 text-sm text-ctex-text placeholder:text-ctex-text-muted/60 outline-none transition focus:border-ctex-blue focus:ring-2 focus:ring-ctex-blue/20 disabled:opacity-60"
      />
    </div>
  );
}