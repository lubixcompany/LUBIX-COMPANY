// Theme provider component
// Manages light/dark mode theme state
// Detects system preference and persists theme choice to localStorage

import React, { useState, useEffect } from "react";
import { ThemeContext, type ThemeType } from "./ThemeContext";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  
  // Initialize theme from localStorage or system preference
  const [theme, setTheme] = useState<ThemeType>(() => {
    // Check localStorage first for user's previous choice
    const savedTheme = localStorage.getItem("theme") as ThemeType | null;
    if (savedTheme) {
      return savedTheme;
    }

    // Check system preference if no saved theme
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }

    // Default to light theme
    return "light";
  });

  // Apply theme to document when it changes
  useEffect(() => {
    const htmlElement = document.documentElement;

    if (theme === "dark") {
      htmlElement.classList.add("dark");
    } else {
      htmlElement.classList.remove("dark");
    }

    // Save theme preference to localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
