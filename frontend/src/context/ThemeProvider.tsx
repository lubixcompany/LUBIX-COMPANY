import React, { useState, useEffect } from "react";
import { ThemeContext, type ThemeType } from "./ThemeContext";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // Estado inicial: detecta preferencia de Windows o localStorage
  const [theme, setTheme] = useState<ThemeType>(() => {
    // 1. Primero, busca en localStorage si ya el usuario eligió un tema
    const savedTheme = localStorage.getItem("theme") as ThemeType | null;
    if (savedTheme) {
      return savedTheme;
    }

    // 2. Si no hay en localStorage, detecta preferencia del sistema (Windows)
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }

    // 3. Por defecto, retorna "light"
    return "light";
  });

  // Aplica el tema a la página
  useEffect(() => {
    const htmlElement = document.documentElement;

    if (theme === "dark") {
      htmlElement.classList.add("dark");
    } else {
      htmlElement.classList.remove("dark");
    }

    // Guarda la preferencia en localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Función para cambiar el tema
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
