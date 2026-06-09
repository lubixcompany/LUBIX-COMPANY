import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const isLogged = !!user;

  return (
    <nav className="navbar">
      {/* LOGO */}
      <Link to="/" className="navbar-logo">
        Lubix
      </Link>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Buscar..."
        className="input-base w-64"
      />

      {/* LINKS */}
      <div className="flex items-center gap-4">
        {/* BOTÓN TEMA (Luna/Sol) */}
        <button
          onClick={toggleTheme}
          className="relative w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80 transition-all duration-300"
          title={theme === "light" ? "Modo oscuro" : "Modo claro"}
          style={{ backgroundColor: "var(--color-btn-primary)" }}
        >
          {/* Luna (muestra en modo claro) */}
          <svg
            className={`w-6 h-6 text-white absolute transition-all duration-300 ${
              theme === "light" ? "opacity-100 rotate-0" : "opacity-0 rotate-180"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>

          {/* Sol (muestra en modo oscuro) */}
          <svg
            className={`w-6 h-6 text-yellow-400 absolute transition-all duration-300 ${
              theme === "dark" ? "opacity-100 rotate-0" : "opacity-0 -rotate-180"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 2a1 1 0 011 1v2a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.536l1.414 1.414a1 1 0 001.414-1.414l-1.414-1.414a1 1 0 00-1.414 1.414zm2.828-2.828a1 1 0 001.414-1.414L16.536 9.172a1 1 0 00-1.414 1.414l1.414 1.414zM9 16a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1zm-4.536-2.464a1 1 0 00-1.414 1.414l1.414 1.414a1 1 0 001.414-1.414l-1.414-1.414zm0-2.828A1 1 0 003.172 9.172L1.758 10.586a1 1 0 101.414 1.414l1.414-1.414zM3 8a1 1 0 011-1h2a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {isLogged && user ? (
          <>
            {/* AVATAR */}
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-black"
              style={{ backgroundColor: "var(--color-accent)" }}
            >
              {user.name?.charAt(0).toUpperCase()}
            </div>

            {/* NAME */}
            <span className="navbar-link">{user.name}</span>

            {/* LOGOUT */}
            <button
              onClick={logout}
              className="bg-red-500 px-3 py-1 rounded text-white hover:bg-red-600 transition-colors duration-300"
            >
              Salir
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar-link">
              Login
            </Link>

            <Link
              to="/register"
              className="btn-primary"
              style={{
                width: "auto",
                padding: "0.5rem 1rem",
                backgroundColor: "var(--color-btn-primary)",
              }}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}