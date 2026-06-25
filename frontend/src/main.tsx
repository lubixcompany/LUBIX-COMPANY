// Main entry point for the React application
// Sets up context providers and renders the root component

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthProvider";
import { ThemeProvider } from "./context/ThemeProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* Theme provider for light/dark mode */}
    <ThemeProvider>
      {/* Browser router for navigation */}
      <BrowserRouter>
        {/* Authentication provider for user context */}
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
