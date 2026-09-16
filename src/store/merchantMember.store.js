import { create } from "zustand";
import merchantMemberService from "../service/merchantMember.service";

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

  /**
   * Fetch all members of the current merchant.
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

  /**
   * Fetch a single member by ID.
   */
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

  /**
   * Assign a role to a member (body variant).
   */
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

  /**
   * Assign a role to a member (URL-param variant).
   */
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

  /**
   * Remove a role from a member.
   */
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

  /**
   * Remove a member from the merchant (soft delete → status: REMOVED).
   */
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

  /**
   * Send an invitation to join the current merchant.
   *
   * @param {Object} payload
   * @param {string} payload.email
   * @param {string} payload.roleId
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

  /**
   * Accept an invitation (token variant).
   *
   * @param {Object} payload
   * @param {string} payload.token
   */
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

  /**
   * Accept an invitation by ID.
   *
   * @param {string} invitationId
   */
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
   */
  getMyNotifications: async () => {
    set({ notificationsLoading: true, notificationsError: null });
    try {
      const res = await merchantMemberService.getMyNotifications();
      set({
        notifications: res.data.notifications || [],
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
   * Mark a notification as read (optimistic).
   */
  markNotificationRead: async (notificationId) => {
    try {
      await merchantMemberService.markNotificationRead(notificationId);
      set((s) => ({
        notifications: s.notifications.map((n) =>
          n.id === notificationId ? { ...n, read: true } : n
        ),
      }));
      return { success: true };
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to mark notification read";
      return { success: false, message };
    }
  },

  /*
  |--------------------------------------------------------------------------
  | UTILITIES
  |--------------------------------------------------------------------------
  */

  /**
   * Get count of unread notifications.
   */
  getUnreadNotificationCount: () => {
    return get().notifications.filter((n) => !n.read).length;
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
