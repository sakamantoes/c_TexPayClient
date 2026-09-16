import { motion, AnimatePresence } from "framer-motion";

export default function RemoveMemberModal({
  open,
  member,
  onCancel,
  onConfirm,
  isRemoving,
}) {
  if (!open) return null;

  const name = member?.user
    ? `${member.user.firstName} ${member.user.lastName}`
    : "this member";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onClick={onCancel}
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md overflow-hidden rounded-2xl border border-ctex-border bg-ctex-surface shadow-2xl"
          >
            <div className="p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-red-500/10 text-red-500">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <h3 className="text-base font-semibold text-ctex-text">
                    Remove member
                  </h3>
                  <p className="mt-1 text-sm text-ctex-text-muted">
                    Are you sure you want to remove{" "}
                    <strong className="text-ctex-text">{name}</strong> from
                    your merchant? They will lose access to all merchant
                    resources immediately.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-ctex-border bg-ctex-elevated/40 px-5 py-3">
              <button
                type="button"
                onClick={onCancel}
                disabled={isRemoving}
                className="rounded-xl border border-ctex-border bg-ctex-surface px-4 py-2 text-sm font-medium text-ctex-text transition hover:bg-ctex-elevated disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onConfirm}
                disabled={isRemoving}
                className="inline-flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-red-500/25 transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isRemoving && (
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                )}
                Remove member
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}