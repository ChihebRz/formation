export type AppRole = "simple_utilisateur" | "responsable" | "administrateur";

export const normalizeRole = (role?: string | null): AppRole | null => {
  if (!role) return null;

  // Accept legacy formats such as ROLE_ADMINISTRATEUR, "simple utilisateur", or "admin".
  const cleaned = role.trim().toLowerCase().replace(/[\s-]+/g, "_");
  const normalized = cleaned.startsWith("role_") ? cleaned.slice(5) : cleaned;

  if (normalized === "simple_utilisateur" || normalized === "simpleutilisateur" || normalized === "simple") {
    return "simple_utilisateur";
  }
  if (normalized === "responsable") {
    return "responsable";
  }
  if (normalized === "administrateur" || normalized === "admin") {
    return "administrateur";
  }

  return null;
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








