import { create } from "zustand";
import apiKeyService from "../service/apiKey.service";

export const useApiKeyStore = create((set) => ({
  apiKeys: [],
  currentApiKey: null,
  usage: [],
  usagePagination: null,
  // The raw key is ONLY available immediately after create/rotate.
  // Never store it in localStorage.
  newlyCreatedKey: null,
  isLoading: false,
  error: null,

  getApiKeys: async (params = {}) => {
    set({ isLoading: true, error: null });
    try {
      const res = await apiKeyService.getApiKeys(params);
      set({ apiKeys: res.data.apiKeys, isLoading: false });
      return { success: true, data: res };
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to load API keys";
      set({ isLoading: false, error: message });
      return { success: false, message };
    }
  },

  getApiKey: async (apiKeyId) => {
    set({ isLoading: true, error: null });
    try {
      const res = await apiKeyService.getApiKey(apiKeyId);
      set({ currentApiKey: res.data.apiKey, isLoading: false });
      return { success: true, data: res };
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to load API key";
      set({ isLoading: false, error: message });
      return { success: false, message };
    }
  },

  createApiKey: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      const res = await apiKeyService.createApiKey(payload);
      // res.data contains the full API key + raw `key` (shown once)
      set((s) => ({
        apiKeys: [res.data, ...s.apiKeys],
        newlyCreatedKey: res.data.key,
        isLoading: false,
      }));
      return { success: true, data: res };
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to create API key";
      set({ isLoading: false, error: message });
      return { success: false, message };
    }
  },

  rotateApiKey: async (apiKeyId) => {
    set({ isLoading: true, error: null });
    try {
      const res = await apiKeyService.rotateApiKey(apiKeyId);
      set((s) => ({
        apiKeys: s.apiKeys.map((k) =>
          k.id === apiKeyId ? res.data.newApiKey : k
        ),
        newlyCreatedKey: res.data.key,
        isLoading: false,
      }));
      return { success: true, data: res };
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to rotate API key";
      set({ isLoading: false, error: message });
      return { success: false, message };
    }
  },

  revokeApiKey: async (apiKeyId) => {
    set({ isLoading: true, error: null });
    try {
      const res = await apiKeyService.revokeApiKey(apiKeyId);
      set((s) => ({
        apiKeys: s.apiKeys.map((k) =>
          k.id === apiKeyId
            ? { ...k, status: "REVOKED", revokedAt: res.data.revokedAt }
            : k
        ),
        isLoading: false,
      }));
      return { success: true, data: res };
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to revoke API key";
      set({ isLoading: false, error: message });
      return { success: false, message };
    }
  },

  getApiKeyUsage: async (apiKeyId, params = {}) => {
    set({ isLoading: true, error: null });
    try {
      const res = await apiKeyService.getApiKeyUsage(apiKeyId, params);
      set({
        usage: res.data.usage,
        usagePagination: res.data.pagination,
        isLoading: false,
      });
      return { success: true, data: res };
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to load API key usage";
      set({ isLoading: false, error: message });
      return { success: false, message };
    }
  },

  clearNewlyCreatedKey: () => set({ newlyCreatedKey: null }),
  clearError: () => set({ error: null }),
}));