import { useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMerchantMemberStore } from "../../store/merchantMember.store";

/*
|--------------------------------------------------------------------------
| Helpers
|--------------------------------------------------------------------------
*/
const isUnread = (n) => !n?.readAt;

const formatDate = (iso) => {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
};

export default function NotificationsPage() {
  const {
    notifications,
    notificationsLoading,
    notificationsError,
    getMyNotifications,
    markNotificationRead,
    markAllNotificationsRead,
    clearNotificationsError,
  } = useMerchantMemberStore();

  useEffect(() => {
    clearNotificationsError?.();
    getMyNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const unreadCount = useMemo(
    () => notifications.filter(isUnread).length,
    [notifications]
  );

  const handleMarkAll = async () => {
    if (unreadCount === 0) return;
    await markAllNotificationsRead();
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-ctex-text">
            Notifications
          </h2>
          <p className="mt-1 text-sm text-ctex-text-muted">
            Stay up to date with your account activity.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            type="button"
            onClick={handleMarkAll}
            className="self-start rounded-xl border border-ctex-border bg-ctex-surface px-3 py-2 text-xs font-medium text-ctex-text-muted transition hover:border-ctex-blue/40 hover:text-ctex-blue sm:self-auto"
          >
            Mark all as read ({unreadCount})
          </button>
        )}
      </div>

      {/* Error */}
      {notificationsError && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-500">
          {notificationsError}
        </div>
      )}

      {/* List */}
      {notificationsLoading && notifications.length === 0 ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-16 animate-pulse rounded-2xl bg-ctex-elevated"
            />
          ))}
        </div>
      ) : notifications.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-ctex-border bg-ctex-surface/50 px-6 py-16 text-center">
          <p className="text-sm font-medium text-ctex-text">
            No notifications yet
          </p>
          <p className="mt-1 text-xs text-ctex-text-muted">
            You&apos;ll see updates here when something happens.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          <AnimatePresence initial={false}>
            {notifications.map((n) => {
              const unread = isUnread(n);
              return (
                <motion.div
                  key={n.id}
                  layout
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  onClick={() => unread && markNotificationRead(n.id)}
                  className={[
                    "rounded-2xl border p-4 transition",
                    unread
                      ? "cursor-pointer border-ctex-blue/30 bg-ctex-blue/5 hover:bg-ctex-blue/10"
                      : "border-ctex-border bg-ctex-surface",
                  ].join(" ")}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={[
                        "mt-1.5 h-2 w-2 flex-shrink-0 rounded-full",
                        unread ? "bg-ctex-blue" : "bg-ctex-border",
                      ].join(" ")}
                    />

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <p
                          className={[
                            "text-sm",
                            unread
                              ? "font-semibold text-ctex-text"
                              : "font-medium text-ctex-text",
                          ].join(" ")}
                        >
                          {n.title || n.message || "Notification"}
                        </p>

                        {unread && (
                          <span className="flex-shrink-0 rounded-full bg-ctex-blue px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-white">
                            New
                          </span>
                        )}
                      </div>

                      {n.message && n.title && (
                        <p className="mt-0.5 text-xs text-ctex-text-muted">
                          {n.message}
                        </p>
                      )}

                      {n.createdAt && (
                        <p className="mt-1 text-[10px] uppercase tracking-wide text-ctex-text-muted">
                          {formatDate(n.createdAt)}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}