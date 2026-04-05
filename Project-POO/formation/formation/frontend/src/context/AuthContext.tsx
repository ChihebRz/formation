import React, { createContext, useContext, useState, ReactNode } from "react";
import { AuthContextType } from "@/types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const login = localStorage.getItem("login");
    console.log("🔄 AuthProvider init - Token from localStorage:", token ? "✅ YES" : "❌ NO");
    return token ? { token, role, login } : null;
  });

  const login = (data: { token: string; role: string; login: string }) => {
    console.log("💾 AuthContext.login - Saving token:", data.token.substring(0, 50) + "...");
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);
    localStorage.setItem("login", data.login);
    setUser(data);
    console.log("✅ Token saved to localStorage");
  };

  const logout = () => {
    console.log("🚪 Logout - Clearing localStorage");
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        setUser,
        isAuthenticated: !!user,
        userRole: user?.role ?? null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};



