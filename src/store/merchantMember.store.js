import { create } from "zustand";
import merchantMemberService from "../service/merchantMember.service";

/*
|--------------------------------------------------------------------------
| NOTIFICATION HELPERS
|--------------------------------------------------------------------------
*/
const isNotificationUnread = (n) => !n?.readAt;

const normalizeNotification = (n) => ({
  ...n,
  read: Boolean(n?.readAt),
});

export const useMerchantMemberStore = create((set, get) => ({
  /*
  |--------------------------------------------------------------------------
  | STATE
  |--------------------------------------------------------------------------
  */
  members: [],
  currentMember: null,
  isLoading: false,
  error: null,

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
      const message = err.response?.data?.message || "Failed to load members";
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
      const message = err.response?.data?.message || "Failed to load member";
      set({ isLoading: false, error: message });
      return { success: false, message };
    }
  },

  assignRole: async (memberId, roleId) => {
    try {
      const res = await merchantMemberService.assignRole(memberId, roleId);
      set((s) => ({
        members: s.members.map((m) => (m.id === memberId ? res.data.member : m)),
      }));
      return { success: true, data: res };
    } catch (err) {
      const message = err.response?.data?.message || "Failed to assign role";
      return { success: false, message };
    }
  },

  assignRoleByParam: async (memberId, roleId) => {
    try {
      const res = await merchantMemberService.assignRoleByParam(memberId, roleId);
      set((s) => ({
        members: s.members.map((m) => (m.id === memberId ? res.data.member : m)),
      }));
      return { success: true, data: res };
    } catch (err) {
      const message = err.response?.data?.message || "Failed to assign role";
      return { success: false, message };
    }
  },

  removeRole: async (memberId, roleId) => {
    try {
      const res = await merchantMemberService.removeRole(memberId, roleId);
      set((s) => ({
        members: s.members.map((m) => (m.id === memberId ? res.data.member : m)),
      }));
      return { success: true, data: res };
    } catch (err) {
      const message = err.response?.data?.message || "Failed to remove role";
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
      const message = err.response?.data?.message || "Failed to remove member";
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
      const message = err.response?.data?.message || "Failed to send invitation";
      set({ isLoading: false, error: message });
      return { success: false, message };
    }
  },

  acceptInvitation: async (payload) => {
    try {
      const res = await merchantMemberService.acceptMemberInvitation(payload);
      return { success: true, data: res };
    } catch (err) {
      const message = err.response?.data?.message || "Failed to accept invitation";
      return { success: false, message };
    }
  },

  acceptInvitationById: async (invitationId) => {
    try {
      const res = await merchantMemberService.acceptInvitationById(invitationId);
      return { success: true, data: res };
    } catch (err) {
      const message = err.response?.data?.message || "Failed to accept invitation";
      return { success: false, message };
    }
  },

  /*
  |--------------------------------------------------------------------------
  | NOTIFICATIONS
  |--------------------------------------------------------------------------
  */
  getMyNotifications: async () => {
    set({ notificationsLoading: true, notificationsError: null });
    try {
      const res = await merchantMemberService.getMyNotifications();
      const list = (res.data.notifications || []).map(normalizeNotification);
      set({ notifications: list, notificationsLoading: false });
      return { success: true, data: res };
    } catch (err) {
      const message = err.response?.data?.message || "Failed to load notifications";
      set({ notificationsLoading: false, notificationsError: message });
      return { success: false, message };
    }
  },

  markNotificationRead: async (notificationId) => {
    const now = new Date().toISOString();

    set((s) => ({
      notifications: s.notifications.map((n) =>
        n.id === notificationId ? { ...n, readAt: n.readAt || now, read: true } : n
      ),
    }));

    try {
      const res = await merchantMemberService.markNotificationRead(notificationId);
      const updated = res?.data?.notification || res?.data || null;
      if (updated && updated.id) {
        set((s) => ({
          notifications: s.notifications.map((n) =>
            n.id === notificationId ? normalizeNotification(updated) : n
          ),
        }));
      }
      return { success: true, data: res };
    } catch (err) {
      set((s) => ({
        notifications: s.notifications.map((n) =>
          n.id === notificationId ? { ...n, readAt: null, read: false } : n
        ),
      }));
      const message = err.response?.data?.message || "Failed to mark notification read";
      return { success: false, message };
    }
  },

  markAllNotificationsRead: async () => {
    const unread = get().notifications.filter(isNotificationUnread);
    if (unread.length === 0) return { success: true };

    const results = await Promise.allSettled(
      unread.map((n) => get().markNotificationRead(n.id))
    );

    const failed = results.filter(
      (r) => r.status === "rejected" || r.value?.success === false
    ).length;

    return { success: failed === 0, failed };
  },

  /**
   * Delete a notification (optimistic).
   * Removes it from the list immediately; rolls back on failure.
   */
  deleteNotification: async (notificationId) => {
    const previous = get().notifications;

    // Optimistic removal
    set((s) => ({
      notifications: s.notifications.filter((n) => n.id !== notificationId),
    }));

    try {
      await merchantMemberService.deleteNotification(notificationId);
      return { success: true };
    } catch (err) {
      // Roll back
      set({ notifications: previous });
      const message =
        err.response?.data?.message || "Failed to delete notification";
      return { success: false, message };
    }
  },

    /**
   * Delete ALL notifications (optimistic).
   * Clears the list immediately; rolls back on failure.
   */
  deleteAllNotifications: async () => {
    const previous = get().notifications;

    // Optimistic clear
    set({ notifications: [] });

    try {
      await merchantMemberService.deleteAllNotifications();
      return { success: true };
    } catch (err) {
      // Roll back
      set({ notifications: previous });
      const message =
        err.response?.data?.message || "Failed to delete notifications";
      return { success: false, message };
    }
  },

  /*
  |--------------------------------------------------------------------------
  | UTILITIES
  |--------------------------------------------------------------------------
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