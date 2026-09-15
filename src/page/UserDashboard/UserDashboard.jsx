import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthStore } from "../../store/auth.store";
import { Link } from "react-router-dom";
import { useMerchantStore } from "../../store/merchant.store";

const initialForm = {
  businessName: "",
  businessType: "",
  email: "",
  phone: "",
  website: "",
  description: "",
  country: "",
  addressLine1: "",
  city: "",
  state: "",
  postalCode: "",
};

const UserDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { createMerchant, isLoading } = useMerchantStore();
  const [form, setForm] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const displayName = useMemo(() => {
    if (user?.firstName || user?.lastName) {
      return `${user?.firstName || ""} ${user?.lastName || ""}`.trim();
    }

    return user?.email || "There";
  }, [user]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.businessName.trim()) {
      toast.error("Business name is required.");
      return;
    }

    setIsSubmitting(true);

    const payload = {
      businessName: form.businessName.trim(),
      businessType: form.businessType.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      website: form.website.trim(),
      description: form.description.trim(),
      country: form.country.trim(),
      addressLine1: form.addressLine1.trim(),
      city: form.city.trim(),
      state: form.state.trim(),
      postalCode: form.postalCode.trim(),
    };

    const result = await createMerchant(payload);

    if (!result.success) {
      toast.error(
        result.message || "Unable to create your business right now.",
      );
      setIsSubmitting(false);
      return;
    }

    try {
      const refreshed = await useAuthStore.getState().getMe();
      const refreshedUser =
        refreshed?.data?.user || useAuthStore.getState().user;

      if (refreshedUser?.role === "MERCHANT") {
        toast.success(
          "Business created successfully. Redirecting to your merchant dashboard.",
        );
        navigate("/merchant/dashboard", { replace: true });
        return;
      }

      toast.success("Business created successfully. Refreshing your account.");
      await useAuthStore.getState().getMe();
      navigate("/merchant/dashboard", { replace: true });
    } catch (error) {
      console.error("Merchant onboarding refresh failed:", error);
      toast.error(
        "Business created, but your account refresh failed. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-ctex-bg px-4 py-10 text-ctex-text">
      <div className="mx-auto max-w-4xl rounded-2xl border border-ctex-border bg-ctex-surface p-6 shadow-lg shadow-black/10 md:p-8">
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex mb-6 items-center gap-1.5 rounded-full border border-ctex-border bg-ctex-surface px-3 py-1.5 text-xs font-medium text-ctex-text-muted transition hover:border-ctex-blue hover:text-ctex-blue"
          >
            ← Back to Home
          </Link>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-ctex-blue">
            User dashboard
          </p>
          <h1 className="mt-3 text-3xl font-bold text-ctex-text">
            Welcome, {displayName}
          </h1>
          <p className="mt-2 text-ctex-text-muted">
            Create your business to become a merchant and unlock your merchant
            dashboard.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Business name
              </label>
              <input
                name="businessName"
                value={form.businessName}
                onChange={handleChange}
                placeholder="C-TEX PAY Solutions"
                className="w-full rounded-xl border border-ctex-border bg-ctex-elevated px-3 py-2.5 text-ctex-text placeholder:text-ctex-text-muted/70 focus:border-ctex-blue focus:outline-none focus:ring-2 focus:ring-ctex-blue/20"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Business type
              </label>
              <input
                name="businessType"
                value={form.businessType}
                onChange={handleChange}
                placeholder="Sole proprietorship, LLC, Corporation..."
                className="w-full rounded-xl border border-ctex-border bg-ctex-elevated px-3 py-2.5 text-ctex-text placeholder:text-ctex-text-muted/70 focus:border-ctex-blue focus:outline-none focus:ring-2 focus:ring-ctex-blue/20"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Business email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="hello@business.com"
                className="w-full rounded-xl border border-ctex-border bg-ctex-elevated px-3 py-2.5 text-ctex-text placeholder:text-ctex-text-muted/70 focus:border-ctex-blue focus:outline-none focus:ring-2 focus:ring-ctex-blue/20"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Phone
              </label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+1 555 000 0000"
                className="w-full rounded-xl border border-ctex-border bg-ctex-elevated px-3 py-2.5 text-ctex-text placeholder:text-ctex-text-muted/70 focus:border-ctex-blue focus:outline-none focus:ring-2 focus:ring-ctex-blue/20"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Website
              </label>
              <input
                name="website"
                value={form.website}
                onChange={handleChange}
                placeholder="https://example.com"
                className="w-full rounded-xl border border-ctex-border bg-ctex-elevated px-3 py-2.5 text-ctex-text placeholder:text-ctex-text-muted/70 focus:border-ctex-blue focus:outline-none focus:ring-2 focus:ring-ctex-blue/20"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Country
              </label>
              <input
                name="country"
                value={form.country}
                onChange={handleChange}
                placeholder="United States"
                className="w-full rounded-xl border border-ctex-border bg-ctex-elevated px-3 py-2.5 text-ctex-text placeholder:text-ctex-text-muted/70 focus:border-ctex-blue focus:outline-none focus:ring-2 focus:ring-ctex-blue/20"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Address
              </label>
              <input
                name="addressLine1"
                value={form.addressLine1}
                onChange={handleChange}
                placeholder="Street address"
                className="w-full rounded-xl border border-ctex-border bg-ctex-elevated px-3 py-2.5 text-ctex-text placeholder:text-ctex-text-muted/70 focus:border-ctex-blue focus:outline-none focus:ring-2 focus:ring-ctex-blue/20"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                City
              </label>
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="New York"
                className="w-full rounded-xl border border-ctex-border bg-ctex-elevated px-3 py-2.5 text-ctex-text placeholder:text-ctex-text-muted/70 focus:border-ctex-blue focus:outline-none focus:ring-2 focus:ring-ctex-blue/20"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                State
              </label>
              <input
                name="state"
                value={form.state}
                onChange={handleChange}
                placeholder="NY"
                className="w-full rounded-xl border border-ctex-border bg-ctex-elevated px-3 py-2.5 text-ctex-text placeholder:text-ctex-text-muted/70 focus:border-ctex-blue focus:outline-none focus:ring-2 focus:ring-ctex-blue/20"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Postal code
              </label>
              <input
                name="postalCode"
                value={form.postalCode}
                onChange={handleChange}
                placeholder="10001"
                className="w-full rounded-xl border border-ctex-border bg-ctex-elevated px-3 py-2.5 text-ctex-text placeholder:text-ctex-text-muted/70 focus:border-ctex-blue focus:outline-none focus:ring-2 focus:ring-ctex-blue/20"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                placeholder="Tell us a bit about your business."
                className="w-full rounded-xl border border-ctex-border bg-ctex-elevated px-3 py-2.5 text-ctex-text placeholder:text-ctex-text-muted/70 focus:border-ctex-blue focus:outline-none focus:ring-2 focus:ring-ctex-blue/20"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="rounded-xl bg-cyan-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting || isLoading
                ? "Creating business..."
                : "Create your business"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserDashboard;
