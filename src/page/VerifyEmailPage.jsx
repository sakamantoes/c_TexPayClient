import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AuthLayout from "../components/auth/AuthLayout";
import authService from "../service/auth.service";

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [status, setStatus] = useState("verifying"); // verifying | success | error
  const [message, setMessage] = useState("");
  const called = useRef(false);

  useEffect(() => {
    if (called.current) return;
    called.current = true;

    if (!token) {
      setStatus("error");
      setMessage("Missing verification token.");
      return;
    }

    (async () => {
      try {
        const res = await authService.verifyEmail(token);
        setStatus("success");
        setMessage(res.message || "Email verified successfully.");

        // Redirect to login with a success banner after a beat
        setTimeout(() => {
          navigate("/login", {
            state: { verified: true },
            replace: true,
          });
        }, 1800);
      } catch (err) {
        setStatus("error");
        setMessage(
          err.response?.data?.message || "Unable to verify email."
        );
      }
    })();
  }, [token, navigate]);

  return (
    <AuthLayout
      title={
        status === "verifying"
          ? "Verifying your email"
          : status === "success"
          ? "Email verified"
          : "Verification failed"
      }
      subtitle={
        status === "verifying"
          ? "Hang tight, this only takes a moment."
          : status === "success"
          ? "Redirecting you to sign in…"
          : "The link may be invalid or expired."
      }
      footer={
        status === "error" && (
          <>
            Need a new link?{" "}
            <Link
              to="/register"
              className="font-medium text-ctex-blue hover:text-ctex-blue-light hover:underline"
            >
              Register again
            </Link>
          </>
        )
      }
    >
      <div className="flex flex-col items-center gap-5 py-2 text-center">
        {/* Icon / spinner */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 220, damping: 18 }}
          className={[
            "flex h-20 w-20 items-center justify-center rounded-3xl",
            status === "verifying" && "bg-ctex-blue/10 text-ctex-blue",
            status === "success" &&
              "bg-emerald-500/10 text-emerald-500",
            status === "error" && "bg-red-500/10 text-red-500",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {status === "verifying" && (
            <span className="h-8 w-8 animate-spin rounded-full border-2 border-ctex-blue/30 border-t-ctex-blue" />
          )}
          {status === "success" && <CheckIcon className="h-9 w-9" />}
          {status === "error" && <XIcon className="h-9 w-9" />}
        </motion.div>

        {message && (
          <p
            className={[
              "text-sm",
              status === "error" ? "text-red-500" : "text-ctex-text-muted",
            ].join(" ")}
          >
            {message}
          </p>
        )}

        {status === "error" && (
          <Link
            to="/login"
            className="text-sm font-medium text-ctex-blue hover:text-ctex-blue-light hover:underline"
          >
            Back to sign in
          </Link>
        )}
      </div>
    </AuthLayout>
  );
}

/* -------------------------------- Icons -------------------------------- */

function CheckIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function XIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="M6 6l12 12" />
    </svg>
  );
}