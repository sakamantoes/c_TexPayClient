import { create } from "zustand";
import merchantMemberService from "../service/merchantMember.service";

/*
|--------------------------------------------------------------------------
| NOTIFICATION HELPERS
|--------------------------------------------------------------------------
| The backend uses `readAt` (ISO timestamp | null) — not a `read` boolean.
| Always derive the read state from readAt.
*/
const isNotificationUnread = (n) => !n?.readAt;

const normalizeNotification = (n) => ({
  ...n,
  // Convenience flag derived from the canonical `readAt` field.
  // Do NOT persist this; always recompute from the API response.
  read: Boolean(n?.readAt),
});

export const useMerchantMemberStore = create((set, get) => ({
  /*
  |--------------------------------------------------------------------------
  | STATE
  |--------------------------------------------------------------------------
  */
  // Members
  members: [],
  currentMember: null,
  isLoading: false,
  error: null,

  // Notifications
  notifications: [],
  notificationsLoading: false,
  notificationsError: null,

  /*
  |--------------------------------------------------------------------------
  | MEMBERS
  |--------------------------------------------------------------------------
  */

  getMembers: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await merchantMemberService.getMembers();
      set({ members: res.data.members, isLoading: false });
      return { success: true, data: res };
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to load members";
      set({ isLoading: false, error: message });
      return { success: false, message };
    }
  },

  getMember: async (memberId) => {
    set({ isLoading: true, error: null });
    try {
      const res = await merchantMemberService.getMember(memberId);
      set({ currentMember: res.data.member, isLoading: false });
      return { success: true, data: res };
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to load member";
      set({ isLoading: false, error: message });
      return { success: false, message };
    }
  },

  assignRole: async (memberId, roleId) => {
    try {
      const res = await merchantMemberService.assignRole(memberId, roleId);
      set((s) => ({
        members: s.members.map((m) =>
          m.id === memberId ? res.data.member : m
        ),
      }));
      return { success: true, data: res };
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to assign role";
      return { success: false, message };
    }
  },

  assignRoleByParam: async (memberId, roleId) => {
    try {
      const res = await merchantMemberService.assignRoleByParam(
        memberId,
        roleId
      );
      set((s) => ({
        members: s.members.map((m) =>
          m.id === memberId ? res.data.member : m
        ),
      }));
      return { success: true, data: res };
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to assign role";
      return { success: false, message };
    }
  },

  removeRole: async (memberId, roleId) => {
    try {
      const res = await merchantMemberService.removeRole(memberId, roleId);
      set((s) => ({
        members: s.members.map((m) =>
          m.id === memberId ? res.data.member : m
        ),
      }));
      return { success: true, data: res };
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to remove role";
      return { success: false, message };
    }
  },

  removeMember: async (memberId) => {
    try {
      const res = await merchantMemberService.removeMember(memberId);
      set((s) => ({
        members: s.members.map((m) =>
          m.id === memberId ? { ...m, status: "REMOVED" } : m
        ),
      }));
      return { success: true, data: res };
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to remove member";
      return { success: false, message };
    }
  },

  /*
  |--------------------------------------------------------------------------
  | INVITATIONS
  |--------------------------------------------------------------------------
  */

  inviteMember: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      const res = await merchantMemberService.inviteMember(payload);
      set({ isLoading: false });
      return { success: true, data: res };
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to send invitation";
      set({ isLoading: false, error: message });
      return { success: false, message };
    }
  },

  acceptInvitation: async (payload) => {
    try {
      const res = await merchantMemberService.acceptMemberInvitation(payload);
      return { success: true, data: res };
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to accept invitation";
      return { success: false, message };
    }
  },

  acceptInvitationById: async (invitationId) => {
    try {
      const res = await merchantMemberService.acceptInvitationById(
        invitationId
      );
      return { success: true, data: res };
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to accept invitation";
      return { success: false, message };
    }
  },

  /*
  |--------------------------------------------------------------------------
  | NOTIFICATIONS
  |--------------------------------------------------------------------------
  */

  /**
   * Fetch notifications for the authenticated user.
   * Normalizes `readAt` into a derived `read` flag for the UI.
   */
  getMyNotifications: async () => {
    set({ notificationsLoading: true, notificationsError: null });
    try {
      const res = await merchantMemberService.getMyNotifications();

      const list = (res.data.notifications || []).map(
        normalizeNotification
      );

      set({
        notifications: list,
        notificationsLoading: false,
      });

      return { success: true, data: res };
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to load notifications";
      set({ notificationsLoading: false, notificationsError: message });
      return { success: false, message };
    }
  },

  /**
   * Mark a notification as read.
   * Optimistically sets `readAt` to the current time, then reconciles
   * with the server response if it returns one.
   */
  markNotificationRead: async (notificationId) => {
    const now = new Date().toISOString();

    // Optimistic update — keep both `readAt` and derived `read` in sync.
    set((s) => ({
      notifications: s.notifications.map((n) =>
        n.id === notificationId
          ? { ...n, readAt: n.readAt || now, read: true }
          : n
      ),
    }));

    try {
      const res = await merchantMemberService.markNotificationRead(
        notificationId
      );

      // If the backend returns the updated notification, use it as truth.
      const updated =
        res?.data?.notification ||
        res?.data ||
        null;

      if (updated && updated.id) {
        set((s) => ({
          notifications: s.notifications.map((n) =>
            n.id === notificationId ? normalizeNotification(updated) : n
          ),
        }));
      }

      return { success: true, data: res };
    } catch (err) {
      // Roll back the optimistic update on failure
      set((s) => ({
        notifications: s.notifications.map((n) =>
          n.id === notificationId ? { ...n, readAt: null, read: false } : n
        ),
      }));

      const message =
        err.response?.data?.message || "Failed to mark notification read";
      return { success: false, message };
    }
  },

  /**
   * Mark all unread notifications as read (client-side loop).
   * Useful for a "Mark all as read" button.
   */
  markAllNotificationsRead: async () => {
    const unread = get().notifications.filter(isNotificationUnread);

    if (unread.length === 0) return { success: true };

    const results = await Promise.allSettled(
      unread.map((n) => get().markNotificationRead(n.id))
    );

    const failed = results.filter(
      (r) => r.status === "rejected" || r.value?.success === false
    ).length;

    return {
      success: failed === 0,
      failed,
    };
  },

  /*
  |--------------------------------------------------------------------------
  | UTILITIES
  |--------------------------------------------------------------------------
  */

  /**
   * Count of unread notifications.
   * Derives from `readAt` so it's always accurate after a refresh.
   */
  getUnreadNotificationCount: () => {
    return get().notifications.filter(isNotificationUnread).length;
  },

  clearError: () => set({ error: null }),

  clearNotificationsError: () => set({ notificationsError: null }),

  reset: () =>
    set({
      members: [],
      currentMember: null,
      isLoading: false,
      error: null,
      notifications: [],
      notificationsLoading: false,
      notificationsError: null,
    }),
}));

export default useMerchantMemberStore;