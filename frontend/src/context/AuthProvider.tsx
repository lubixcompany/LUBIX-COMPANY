// Authentication provider component
// Manages user authentication state and persists to localStorage
// Provides login/logout functionality throughout the application

import React, { useState } from "react";
import { AuthContext } from "./AuthContext";
import type { User } from "./AuthContext";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

  // Initialize user state from localStorage
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("user");
    const token = localStorage.getItem("access_token");

    if (!savedUser || !token) return null;

    try {
      const parsedUser = JSON.parse(savedUser) as User;
      return parsedUser;
    } catch {
      return null;
    }
  });

  // Store user data and token in localStorage
  const login = (token: string, userData: User) => {
    localStorage.setItem("access_token", token);
    localStorage.setItem("user", JSON.stringify(userData));

    setUser(userData);
  };

  // Clear user data and tokens from localStorage
  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");

    setUser(null);
  };

  // Helper methods to check user role
  const isUser = () => user?.role === "user";
  const isCompany = () => user?.role === "company";

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user,
      login, 
      logout,
      isUser,
      isCompany
    }}>
      {children}
    </AuthContext.Provider>
  );
};