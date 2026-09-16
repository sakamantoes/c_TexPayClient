import { create } from "zustand";
import roleService from "../service/role.service";

export const useRoleStore = create((set) => ({
  roles: [],
  currentRole: null,
  isLoading: false,
  error: null,

  getRoles: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await roleService.getRoles();
      set({ roles: res.data.roles, isLoading: false });
      return { success: true, data: res };
    } catch (err) {
      const message = err.response?.data?.message || "Failed to load roles";
      set({ isLoading: false, error: message });
      return { success: false, message };
    }
  },

  getRole: async (roleId) => {
    set({ isLoading: true, error: null });
    try {
      const res = await roleService.getRole(roleId);
      set({ currentRole: res.data.role, isLoading: false });
      return { success: true, data: res };
    } catch (err) {
      const message = err.response?.data?.message || "Failed to load role";
      set({ isLoading: false, error: message });
      return { success: false, message };
    }
  },

  createRole: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      const res = await roleService.createRole(payload);
      set((s) => ({
        roles: [res.data.role, ...s.roles],
        isLoading: false,
      }));
      return { success: true, data: res };
    } catch (err) {
      const message = err.response?.data?.message || "Failed to create role";
      set({ isLoading: false, error: message });
      return { success: false, message };
    }
  },

  updateRole: async (roleId, payload) => {
    set({ isLoading: true, error: null });
    try {
      const res = await roleService.updateRole(roleId, payload);
      set((s) => ({
        roles: s.roles.map((r) =>
          r.id === roleId ? res.data.role : r
        ),
        isLoading: false,
      }));
      return { success: true, data: res };
    } catch (err) {
      const message = err.response?.data?.message || "Failed to update role";
      set({ isLoading: false, error: message });
      return { success: false, message };
    }
  },

  deleteRole: async (roleId) => {
    set({ isLoading: true, error: null });
    try {
      await roleService.deleteRole(roleId);
      set((s) => ({
        roles: s.roles.filter((r) => r.id !== roleId),
        isLoading: false,
      }));
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || "Failed to delete role";
      set({ isLoading: false, error: message });
      return { success: false, message };
    }
  },

  assignPermission: async (roleId, permissionId) => {
    try {
      const res = await roleService.assignPermission(roleId, permissionId);
      set((s) => ({
        roles: s.roles.map((r) =>
          r.id === roleId ? res.data.role : r
        ),
      }));
      return { success: true, data: res };
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to assign permission";
      return { success: false, message };
    }
  },

  removePermission: async (roleId, permissionId) => {
    try {
      const res = await roleService.removePermission(roleId, permissionId);
      set((s) => ({
        roles: s.roles.map((r) =>
          r.id === roleId ? res.data.role : r
        ),
      }));
      return { success: true, data: res };
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to remove permission";
      return { success: false, message };
    }
  },

  clearError: () => set({ error: null }),
}));