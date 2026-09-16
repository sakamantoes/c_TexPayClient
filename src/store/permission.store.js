import { create } from "zustand";
import permissionService from "../service/permission.service";

export const usePermissionStore = create((set, get) => ({
  permissions: [],
  isLoading: false,
  error: null,
  // Track whether we've already loaded — lets us skip re-fetching
  loaded: false,

  /**
   * Fetch the full permission catalogue.
   * @param {Object} [options]
   * @param {boolean} [options.force=false] - Force re-fetch even if cached.
   */
  getPermissions: async ({ force = false } = {}) => {
    if (get().loaded && !force) {
      return {
        success: true,
        data: { permissions: get().permissions },
      };
    }

    set({ isLoading: true, error: null });
    try {
      const res = await permissionService.getPermissions();
      set({
        permissions: res.data.permissions || [],
        isLoading: false,
        loaded: true,
      });
      return { success: true, data: res };
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to load permissions";
      set({ isLoading: false, error: message });
      return { success: false, message };
    }
  },

  clearError: () => set({ error: null }),

  reset: () =>
    set({ permissions: [], isLoading: false, error: null, loaded: false }),
}));

export default usePermissionStore;