import { create } from "zustand";
import { persist } from "zustand/middleware";
import authService from "../service/auth.service";
import { useMerchantStore } from "./merchant.store";

const syncMerchantState = async (user) => {
  const roles = Array.isArray(user?.roles) ? user.roles : [];
  const roleValues = [user?.role, ...roles].filter(Boolean);
  const isMerchantFlow = roleValues.includes("MERCHANT");

  if (!isMerchantFlow) {
    useMerchantStore.getState().clearMerchant();
    return;
  }

  try {
    await Promise.all([
      useMerchantStore.getState().getMyMerchant(),
      useMerchantStore.getState().getMyMembership(),
    ]);
  } catch (error) {
    console.error("Merchant bootstrap failed:", error);
  }
};

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      initialized: false,

      /*
      |--------------------------------------------------------------------------
      | REGISTER
      |--------------------------------------------------------------------------
      */
      register: async (payload) => {
        set({ isLoading: true, error: null });
        try {
          const res = await authService.register(payload);
          set({ isLoading: false });
          return { success: true, data: res };
        } catch (err) {
          const message =
            err.response?.data?.message || "Registration failed";
          set({ isLoading: false, error: message });
          return { success: false, message };
        }
      },

      /*
      |--------------------------------------------------------------------------
      | LOGIN
      |--------------------------------------------------------------------------
      */
      login: async ({ email, password }) => {
        set({ isLoading: true, error: null });
        try {
          const res = await authService.login({ email, password });
          const nextUser = res?.data?.user;

          set({
            user: nextUser,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });

          if (nextUser) {
            await syncMerchantState(nextUser);
          }

          return { success: true, data: res };
        } catch (err) {
          const message = err.response?.data?.message || "Login failed";
          set({ isLoading: false, error: message });
          return { success: false, message };
        }
      },

      /*
      |--------------------------------------------------------------------------
      | LOGOUT
      |--------------------------------------------------------------------------
      */
      logout: async () => {
        set({ isLoading: true });
        await authService.logout();
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      },

      /*
      |--------------------------------------------------------------------------
      | GET ME (bootstrap session on app load)
      |--------------------------------------------------------------------------
      */
      getMe: async () => {
        const token = localStorage.getItem("accessToken");

        if (!token) {
          set({ initialized: true, isAuthenticated: false, user: null });
          return;
        }

        set({ isLoading: true });
        try {
          const res = await authService.getMe();
          const nextUser = res?.data?.user;

          set({
            user: nextUser,
            isAuthenticated: true,
            isLoading: false,
            initialized: true,
          });

          if (nextUser) {
            await syncMerchantState(nextUser);
          }
        } catch (err) {
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            initialized: true,
          });
        }
      },

      /*
      |--------------------------------------------------------------------------
      | FORGOT PASSWORD
      |--------------------------------------------------------------------------
      */
      forgotPassword: async (email) => {
        set({ isLoading: true, error: null });
        try {
          const res = await authService.forgotPassword(email);
          set({ isLoading: false });
          return { success: true, message: res.message };
        } catch (err) {
          const message =
            err.response?.data?.message || "Request failed";
          set({ isLoading: false, error: message });
          return { success: false, message };
        }
      },

      /*
      |--------------------------------------------------------------------------
      | RESET PASSWORD
      |--------------------------------------------------------------------------
      */
      resetPassword: async (payload) => {
        set({ isLoading: true, error: null });
        try {
          const res = await authService.resetPassword(payload);
          set({ isLoading: false });
          return { success: true, message: res.message };
        } catch (err) {
          const message =
            err.response?.data?.message || "Reset failed";
          set({ isLoading: false, error: message });
          return { success: false, message };
        }
      },

      resendVerification: async (email) => {
  set({ isLoading: true, error: null });
  try {
    const res = await authService.resendVerification(email);
    set({ isLoading: false });
    return { success: true, message: res.message };
  } catch (err) {
    const message = err.response?.data?.message || "Failed to resend email";
    set({ isLoading: false, error: message });
    return { success: false, message };
  }
},

      /*
      |--------------------------------------------------------------------------
      | CHANGE PASSWORD
      |--------------------------------------------------------------------------
      */
      changePassword: async (payload) => {
        set({ isLoading: true, error: null });
        try {
          const res = await authService.changePassword(payload);
          // Sessions revoked → force logout locally
          await get().logout();
          return { success: true, message: res.message };
        } catch (err) {
          const message =
            err.response?.data?.message || "Change password failed";
          set({ isLoading: false, error: message });
          return { success: false, message };
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: "auth-store",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);