/*
|--------------------------------------------------------------------------
| Role Utilities
|--------------------------------------------------------------------------
| The backend is the single source of truth for role. The User model
| defines role as an ENUM: USER | MERCHANT | ADMIN | SUPER_ADMIN.
| sanitizeUser() only strips `password`, so `role` always comes back
| exactly as stored — no other field ever carries the role.
|
| This file does NOT infer, normalize, or search across multiple
| possible fields. It reads `user.role` and matches it exactly.
|--------------------------------------------------------------------------
*/

export const ROLES = Object.freeze({
  USER: "USER",
  MERCHANT: "MERCHANT",
  ADMIN: "ADMIN",
  SUPER_ADMIN: "SUPER_ADMIN",
});

const DASHBOARD_PATHS = Object.freeze({
  [ROLES.SUPER_ADMIN]: "/super-admin/dashboard",
  [ROLES.ADMIN]: "/admin/dashboard",
  [ROLES.MERCHANT]: "/merchant/dashboard",
  [ROLES.USER]: "/user/onboarding/dashboard",
});

/**
 * Returns the user's exact role as sent by the backend.
 * No normalization, no fallbacks to other fields.
 */
export const getUserRole = (user) => {
  return user?.role ?? null;
};

/**
 * Strict equality check against the backend role.
 */
export const hasRole = (user, role) => {
  return getUserRole(user) === role;
};

/**
 * True if the user's role is one of the given list (exact match only).
 */
export const hasAnyRole = (user, roles = []) => {
  const role = getUserRole(user);
  if (!role) return false;
  return roles.includes(role);
};

export const isSuperAdmin = (user) => hasRole(user, ROLES.SUPER_ADMIN);
export const isAdmin = (user) => hasRole(user, ROLES.ADMIN);
export const isMerchant = (user) => hasRole(user, ROLES.MERCHANT);
export const isUser = (user) => hasRole(user, ROLES.USER);

/**
 * Resolves the dashboard path for the user's exact role.
 * Throws if the backend ever sends a role this file doesn't know about —
 * fail loudly rather than silently guessing a fallback route.
 */
export const getDashboardPath = (user) => {
  const role = getUserRole(user);

  if (!role) {
    throw new Error("getDashboardPath: user has no role");
  }

  const path = DASHBOARD_PATHS[role];

  if (!path) {
    throw new Error(`getDashboardPath: unknown role "${role}"`);
  }

  return path;
};