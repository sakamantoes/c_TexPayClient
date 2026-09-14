import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "../store/auth.store";
import { getDashboardPath } from "../utils/role";
import AuthLayout from "../components/auth/AuthLayout";
import TextField from "../components/auth/TextField";
import PrimaryButton from "../components/auth/PrimaryButton";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading, error, clearError } = useAuthStore();

  const [form, setForm] = useState({ email: "", password: "" });
  const [localError, setLocalError] = useState("");

  const justVerified = location.state?.verified;

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    if (localError) setLocalError("");
    if (error) clearError();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");

    if (!form.email.trim()) return setLocalError("Email is required");
    if (!form.password) return setLocalError("Password is required");

    const res = await login({
      email: form.email.trim().toLowerCase(),
      password: form.password,
    });

    if (res.success) {
      const nextUser = res?.data?.user || useAuthStore.getState().user;
      navigate(getDashboardPath(nextUser), { replace: true });
    }
  };

  const displayError = localError || error;

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to continue to your C-TEX PAY dashboard."
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-ctex-blue hover:text-ctex-blue-light hover:underline"
          >
            Create one
          </Link>
        </>
      }
    >
      <AnimatePresence>
        {justVerified && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginBottom: 0 }}
            animate={{ opacity: 1, height: "auto", marginBottom: 16 }}
            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
            className="overflow-hidden"
          >
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-2.5 text-xs text-emerald-600 dark:text-emerald-400">
              ✅ Email verified successfully. You can now sign in.
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <TextField
          label="Email"
          name="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          value={form.email}
          onChange={handleChange}
          icon={<MailIcon className="h-4 w-4" />}
          required
        />

        <TextField
          label="Password"
          name="password"
          type="password"
          placeholder="••••••••"
          autoComplete="current-password"
          value={form.password}
          onChange={handleChange}
          icon={<LockIcon className="h-4 w-4" />}
          required
        />

        <div className="flex justify-end">
          <Link
            to="/forgot-password"
            className="text-xs font-medium text-ctex-text-muted transition hover:text-ctex-blue"
          >
            Forgot password?
          </Link>
        </div>

        <AnimatePresence>
          {displayError && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="rounded-xl border border-red-500/30 bg-red-500/10 px-3.5 py-2.5 text-xs text-red-500"
            >
              {displayError}
            </motion.div>
          )}
        </AnimatePresence>

        <PrimaryButton loading={isLoading}>
          {isLoading ? "Signing in…" : "Sign in"}
        </PrimaryButton>
      </form>
    </AuthLayout>
  );
}

/* ------------------------------- Icons ------------------------------- */

function MailIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function LockIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}