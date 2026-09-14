import { create } from "zustand";
import merchantService from "../service/merchant.service";

export const useMerchantStore = create((set) => ({
  merchant: null,
  businessProfile: null,
  membership: null,
  permissions: [],
  roles: [],
  isLoading: false,
  error: null,

  /*
  |--------------------------------------------------------------------------
  | CREATE MERCHANT
  |--------------------------------------------------------------------------
  */
  createMerchant: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      const res = await merchantService.createMerchant(payload);
      set({
        merchant: res.data.merchant,
        isLoading: false,
      });
      return { success: true, data: res };
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to create merchant";
      set({ isLoading: false, error: message });
      return { success: false, message };
    }
  },

  /*
  |--------------------------------------------------------------------------
  | GET MY MERCHANT
  |--------------------------------------------------------------------------
  */
  getMyMerchant: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await merchantService.getMyMerchant();
      set({
        merchant: res.data.merchant,
        isLoading: false,
      });
      return { success: true, data: res };
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to load merchant";
      set({ isLoading: false, error: message });
      return { success: false, message };
    }
  },

  /*
  |--------------------------------------------------------------------------
  | UPDATE MERCHANT
  |--------------------------------------------------------------------------
  */
  updateMyMerchant: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      const res = await merchantService.updateMyMerchant(payload);
      set({ merchant: res.data.merchant, isLoading: false });
      return { success: true, data: res };
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to update merchant";
      set({ isLoading: false, error: message });
      return { success: false, message };
    }
  },

  /*
  |--------------------------------------------------------------------------
  | GET BUSINESS PROFILE
  |--------------------------------------------------------------------------
  */
  getBusinessProfile: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await merchantService.getBusinessProfile();
      set({
        businessProfile: res.data.businessProfile,
        isLoading: false,
      });
      return { success: true, data: res };
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to load business profile";
      set({ isLoading: false, error: message });
      return { success: false, message };
    }
  },

  /*
  |--------------------------------------------------------------------------
  | UPDATE BUSINESS PROFILE
  |--------------------------------------------------------------------------
  */
  updateBusinessProfile: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      const res = await merchantService.updateBusinessProfile(payload);
      set({
        businessProfile: res.data.businessProfile,
        isLoading: false,
      });
      return { success: true, data: res };
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to update business profile";
      set({ isLoading: false, error: message });
      return { success: false, message };
    }
  },

  /*
  |--------------------------------------------------------------------------
  | GET MY MEMBERSHIP (roles + permissions)
  |--------------------------------------------------------------------------
  */
  getMyMembership: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await merchantService.getMyMembership();

      set({
        membership: res.data.membership,
        merchant: res.data.merchant,
        roles: res.data.roles,
        permissions: res.data.permissions,
        isLoading: false,
      });

      return { success: true, data: res };
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to load membership";
      set({ isLoading: false, error: message });
      return { success: false, message };
    }
  },

  clearMerchant: () =>
    set({
      merchant: null,
      businessProfile: null,
      membership: null,
      roles: [],
      permissions: [],
      error: null,
    }),

  clearError: () => set({ error: null }),
}));