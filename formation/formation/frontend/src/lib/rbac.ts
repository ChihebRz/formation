export type AppRole = "simple_utilisateur" | "responsable" | "administrateur";

export const normalizeRole = (role?: string | null): AppRole | null => {
  const normalized = role?.trim().toLowerCase();
  if (normalized === "simple_utilisateur" || normalized === "responsable" || normalized === "administrateur") {
    return normalized;
  }
  return null;
};

export const hasAnyRole = (
  first: AppRole[] | string | null | undefined,
  second?: AppRole[] | string | null
) => {
  const allowedRoles = Array.isArray(first) ? first : Array.isArray(second) ? second : [];
  const role = Array.isArray(first) ? second : first;
  const normalizedRole = normalizeRole(role);
  return normalizedRole ? allowedRoles.includes(normalizedRole) : false;
};

export const canAccessRole = (allowedRoles: AppRole[], role?: string | null) => {
  const normalizedRole = normalizeRole(role);
  return normalizedRole ? allowedRoles.includes(normalizedRole) : false;
};

export const getDefaultRoute = (role?: string | null) => {
  const normalizedRole = normalizeRole(role);
  if (normalizedRole === "simple_utilisateur") {
    return "/formations";
  }
  if (normalizedRole === "responsable" || normalizedRole === "administrateur") {
    return "/dashboard";
  }
  return "/login";
};




