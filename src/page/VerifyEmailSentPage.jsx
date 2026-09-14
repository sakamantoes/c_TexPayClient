import { Link, useLocation, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import AuthLayout from "../components/auth/AuthLayout";

export default function VerifyEmailSentPage() {
  const location = useLocation();
  const email = location.state?.email;

  if (!email) return <Navigate to="/register" replace />;

  return (
    <AuthLayout
      title="Check your inbox"
      subtitle="We sent you a verification link to confirm your email."
      footer={
        <>
          Wrong email?{" "}
          <Link
            to="/register"
            className="font-medium text-ctex-blue hover:text-ctex-blue-light hover:underline"
          >
            Try again
          </Link>
        </>
      }
    >
      <div className="space-y-4 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-ctex-blue/10 text-ctex-blue"
        >
          <svg
            className="h-8 w-8"
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
        </motion.div>

        <p className="text-sm text-ctex-text-muted">
          We sent a verification link to
        </p>

        <p className="text-sm font-semibold text-ctex-text">{email}</p>

        <p className="text-xs text-ctex-text-muted">
          Click the link in the email to activate your account. The link
          expires in 30 minutes. Don&apos;t forget to check your spam folder.
        </p>

        <Link
          to="/login"
          className="mt-2 inline-block text-sm font-medium text-ctex-blue hover:text-ctex-blue-light hover:underline"
        >
          Back to sign in
        </Link>
      </div>
    </AuthLayout>
  );
}