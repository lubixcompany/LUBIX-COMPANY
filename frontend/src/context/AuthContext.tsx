// Authentication context for managing user state across the application
// Provides user information and authentication methods

import { createContext, useContext } from "react";

// User interface defines the structure of authenticated user
export interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "empresa" | "admin";
}

// AuthContextType defines all authentication related state and methods
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  isUser: () => boolean;
  isCompany: () => boolean;
}

// Create the authentication context
export const AuthContext = createContext<AuthContextType | null>(null);

// Custom hook to use authentication context
// Must be called within components wrapped by AuthProvider
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};