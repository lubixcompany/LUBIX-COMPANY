import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const isLogged = !!user;

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-[#162238] w-full">
      {/* LOGO */}
      <Link to="/" className="flex items-center">
        <img
          src="/lubix-logo.png"
          alt="Lubix Logo"
          className="h-10 w-auto" // ajusta tamaño según tu diseño
        />
      </Link>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Buscar..."
        className="px-4 py-2 rounded-full bg-[#1c2a4a] text-white placeholder-gray-400 focus:outline-none w-64"
      />

      {/* LINKS */}
      <div className="flex items-center gap-4 text-white">
        {/* BOTÓN TEMA */}
        <button
          onClick={toggleTheme}
          className="relative w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80 transition-all duration-300"
          title={theme === "light" ? "Modo oscuro" : "Modo claro"}
          style={{ backgroundColor: "var(--color-btn-primary)" }}
        >
          {/* Luna */}
          <svg
            className={`w-6 h-6 text-white absolute transition-all duration-300 ${
              theme === "light" ? "opacity-100 rotate-0" : "opacity-0 rotate-180"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
          {/* Sol limpio */}
          <svg
            className={`w-6 h-6 text-yellow-400 absolute transition-all duration-300 ${
              theme === "dark" ? "opacity-100 rotate-0" : "opacity-0 -rotate-180"
            }`}
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M12 8a4 4 0 100 8 4 4 0 000-8zm0-6.75a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0V2a.75.75 0 01.75-.75zm0 18a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75zm10-9.25a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5a.75.75 0 01.75.75zm-18 0a.75.75 0 01-.75.75H1.75a.75.75 0 010-1.5H3a.75.75 0 01.75.75zM17.657 6.343a.75.75 0 011.06 1.06l-1.06 1.06a.75.75 0 11-1.06-1.06l1.06-1.06zm-11.314 11.314a.75.75 0 011.06 1.06l-1.06 1.06a.75.75 0 11-1.06-1.06l1.06-1.06zm11.314 1.06a.75.75 0 01-1.06-1.06l1.06-1.06a.75.75 0 111.06 1.06l-1.06 1.06zm-11.314-11.314a.75.75 0 01-1.06-1.06l1.06-1.06a.75.75 0 111.06 1.06L6.343 6.343z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {isLogged ? (
          <>
            {/* AVATAR */}
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-black bg-green-400"
            >
              {user.name?.charAt(0).toUpperCase()}
            </div>
            {/* NAME */}
            <span className="font-medium">{user.name}</span>
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
            <Link to="/login" className="hover:text-green-400 transition">
              Login
            </Link>
            <Link
              to="/register"
              className="bg-green-500 text-black font-bold px-4 py-2 rounded-full hover:bg-green-600 transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
