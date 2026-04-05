import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface User {
  token: string;
  role: string;
  login: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (data: User) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize on component mount - don't use localStorage directly
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Check if there's a token in localStorage
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        const login = localStorage.getItem("login");

        // Only restore session if ALL values exist AND token is not empty
        if (token && role && login && token.trim() !== "") {
          console.log("✅ Existing session found - restoring...");
          setUser({ token, role, login });
        } else {
          console.log("🔐 No valid session found - user must login");
          // Clear any partial data
          localStorage.clear();
          setUser(null);
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        localStorage.clear();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = (data: User) => {
    if (!data.token || !data.role || !data.login) {
      console.error("❌ Invalid user data - missing token, role, or login");
      return;
    }
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);
    localStorage.setItem("login", data.login);
    setUser(data);
    console.log("✅ User logged in:", data.login);
  };

  const logout = () => {
    console.log("🔓 User logged out");
    localStorage.clear();
    sessionStorage.clear();
    setUser(null);
  };

  const isAuthenticated = !!user?.token && user.token.trim() !== "";

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, isLoading }}>
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


