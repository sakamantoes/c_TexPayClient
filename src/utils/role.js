export const normalizeRoleKey = (value) => {
  if (!value) return "";

  return String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "");
};

export const getUserRoles = (user) => {
  if (!user) return [];

  const values = [];

  const collect = (entry) => {
    if (!entry) return;

    if (Array.isArray(entry)) {
      entry.forEach(collect);
      return;
    }

    if (typeof entry === "object") {
      if (entry.name) values.push(entry.name);
      if (entry.role) values.push(entry.role);
      if (entry.value) values.push(entry.value);
      return;
    }

    values.push(entry);
  };

  collect(user.role);
  collect(user.roles);
  collect(user.userType);
  collect(user.type);
  collect(user?.membership?.role);
  collect(user?.membership?.name);
  collect(user?.merchant?.role);
  collect(user?.merchant?.type);

  return [...new Set(values.map((value) => normalizeRoleKey(value)).filter(Boolean))];
};

export const getDashboardPath = (user) => {
  const roles = getUserRoles(user);

  if (roles.includes("super_admin") || roles.includes("superadmin")) {
    return "/super-admin/dashboard";
  }

  if (roles.includes("admin")) {
    return "/admin/dashboard";
  }

  if (
    roles.includes("merchant") ||
    roles.includes("merchant_admin") ||
    roles.includes("merchantadmin")
  ) {
    return "/merchant/dashboard";
  }

  return "/dashboard";
};
