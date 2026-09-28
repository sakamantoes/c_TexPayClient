import { create } from "zustand";
import merchantService from "../service/merchant.service";

export const useMerchantStore = create((set, get) => ({
  /*
  |--------------------------------------------------------------------------
  | STATE
  |--------------------------------------------------------------------------
  | `merchant`            → merchant the current user OWNS (or null)
  | `businessProfile`     → business profile of the OWNED merchant
  | `membership`          → the member record (owner OR team member)
  | `membershipMerchant`  → merchant from membership (READ-ONLY view)
  | `roles`               → roles assigned to the current user
  | `permissions`         → flattened permission keys from those roles
  */
  merchant: null,
  businessProfile: null,

  membership: null,
  membershipMerchant: null,

  roles: [],
  permissions: [],

  isLoading: false,
  error: null,

  /*
  |--------------------------------------------------------------------------
  | CREATE MERCHANT (owner-only action)
  |--------------------------------------------------------------------------
  */
  createMerchant: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      const res = await merchantService.createMerchant(payload);
      set({
        merchant: res.data.merchant,
        businessProfile: res.data.merchant?.businessProfile || null,
        isLoading: false,
      });
      return { success: true, data: res };
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to create merchant";
      set({ isLoading: false, error: message });
      return {
        success: false,
        message,
        status: err.response?.status,
        requiresEmailVerification:
          err.response?.status === 403 &&
          message === "Your account is not active",
      };
    }
  },

  /*
  |--------------------------------------------------------------------------
  | GET MY MERCHANT (owned)
  |--------------------------------------------------------------------------
  | 404 = user owns no merchant. Legitimate state — clear silently.
  */
  getMyMerchant: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await merchantService.getMyMerchant();
      set({
        merchant: res.data.merchant,
        businessProfile: res.data.merchant?.businessProfile || null,
        isLoading: false,
      });
      return { success: true, data: res };
    } catch (err) {
      if (err.response?.status === 404) {
        set({
          merchant: null,
          businessProfile: null,
          isLoading: false,
          error: null,
        });
        return { success: true, data: { data: { merchant: null } } };
      }
      const message =
        err.response?.data?.message || "Failed to load merchant";
      set({ isLoading: false, error: message });
      return { success: false, message };
    }
  },

  /*
  |--------------------------------------------------------------------------
  | UPDATE MERCHANT (owned)
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
  | GET BUSINESS PROFILE (owned)
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
      if (err.response?.status === 404) {
        set({ businessProfile: null, isLoading: false, error: null });
        return { success: true, data: { data: { businessProfile: null } } };
      }
      const message =
        err.response?.data?.message || "Failed to load business profile";
      set({ isLoading: false, error: message });
      return { success: false, message };
    }
  },

  /*
  |--------------------------------------------------------------------------
  | UPDATE BUSINESS PROFILE (owned)
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
  | GET MY MEMBERSHIP (roles + permissions + merchant view)
  |--------------------------------------------------------------------------
  | Does NOT touch `merchant` or `businessProfile`.
  | Stores membership merchant separately as `membershipMerchant`.
  */
  getMyMembership: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await merchantService.getMyMembership();

      set({
        membership: res.data.membership,
        membershipMerchant: res.data.merchant,
        roles: res.data.roles || [],
        permissions: res.data.permissions || [],
        isLoading: false,
      });

      return { success: true, data: res };
    } catch (err) {
      if (err.response?.status === 404) {
        set({
          membership: null,
          membershipMerchant: null,
          roles: [],
          permissions: [],
          isLoading: false,
          error: null,
        });
        return { success: true, data: { data: {} } };
      }
      const message =
        err.response?.data?.message || "Failed to load membership";
      set({ isLoading: false, error: message });
      return { success: false, message };
    }
  },

  /*
  |--------------------------------------------------------------------------
  | DERIVED HELPERS
  |--------------------------------------------------------------------------
  | Use these in components to avoid ambiguity.
  */

  /** True only if the current user OWNS a merchant. */
  isMerchantOwner: () => Boolean(get().merchant),

  /** True if the current user is a member (owner OR invited) of any merchant. */
  isTeamMember: () => Boolean(get().membership),

  /** True if the user is a member but NOT the owner (invited only). */
  isInvitedOnly: () => Boolean(get().membership) && !get().merchant,

  /** The merchant to display in a read-only context (prefers owned). */
  getDisplayMerchant: () =>
    get().merchant || get().membershipMerchant,

  /** The business profile to display in a read-only context. */
  getDisplayBusinessProfile: () =>
    get().businessProfile ||
    get().membershipMerchant?.businessProfile ||
    null,

  /*
  |--------------------------------------------------------------------------
  | RESET
  |--------------------------------------------------------------------------
  */
  clearMerchant: () =>
    set({
      merchant: null,
      businessProfile: null,
      membership: null,
      membershipMerchant: null,
      roles: [],
      permissions: [],
      error: null,
    }),

  clearError: () => set({ error: null }),
}));

export default useMerchantStore;