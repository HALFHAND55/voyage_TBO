import React, { createContext, useContext, useEffect, useState } from "react";
import { apiRequest } from "../lib/api";

interface User {
  _id: string;
  email: string;
  fullName: string;
}
interface Vendor {
  _id: string;
  email: string;
  businessName: string;
}

interface AuthContextType {
  user: User | null;
  vendor: Vendor | null;
  loading: boolean;
  refreshAuth: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshAuth = async () => {
    try {
      const userData = await apiRequest("/auth/check");
      setUser(userData);
    } catch {
      setUser(null);
    }

    try {
      const vendorData = await apiRequest("/auth/vendor/check");
      setVendor(vendorData);
    } catch {
      setVendor(null);
    }

    setLoading(false);
  };

  const logout = async () => {
    if (user) await apiRequest("/auth/logout", { method: "POST" });
    if (vendor) await apiRequest("/auth/vendor/logout", { method: "POST" });

    setUser(null);
    setVendor(null);
  };

  useEffect(() => {
    refreshAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, vendor, loading, refreshAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};