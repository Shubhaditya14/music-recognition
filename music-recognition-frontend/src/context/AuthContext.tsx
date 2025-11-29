import React, { createContext, useContext, useEffect, useState } from "react";

type User = {
  id: number;
  email: string;
} | null;

type AuthContextType = {
  user: User;
  loggedIn: boolean;
  refreshUser: () => Promise<void>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(null);

  const loggedIn = !!user;

  // ---------------------------
  // HIT /auth/me on load
  // ---------------------------
  const refreshUser = async () => {
    try {
      const res = await fetch("http://localhost:8000/auth/me", {
        method: "GET",
        credentials: "include", // <-- VERY IMPORTANT
      });

      if (res.ok) {
        const data = await res.json();
        setUser({ id: data.id, email: data.email });
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    }
  };

  // ---------------------------
  // LOGIN
  // ---------------------------
  const login = async (email: string, password: string) => {
    const res = await fetch("http://localhost:8000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // <-- stores HttpOnly cookies
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      await refreshUser();
      return true;
    }
    return false;
  };

  // ---------------------------
  // LOGOUT
  // ---------------------------
  const logout = () => {
    // simply clear user — token is cookie-based so backend handles it
    setUser(null);
  };

  // ---------------------------
  // RUN ONCE AT STARTUP
  // ---------------------------
  useEffect(() => {
    void refreshUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider value={{ user, loggedIn, refreshUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook for easy usage
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
