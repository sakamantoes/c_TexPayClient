import { create } from "zustand";
import merchantMemberService from "../service/merchantMember.service";

export const useMerchantMemberStore = create((set) => ({
  members: [],
  currentMember: null,
  isLoading: false,
  error: null,

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

  clearError: () => set({ error: null }),
}));