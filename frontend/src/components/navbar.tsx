import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { MagnifyingGlassIcon, ShoppingCartIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const isLogged = !!user;

  const handleSearch = (event?: React.FormEvent) => {
    event?.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      setSearchParams({ q: trimmed });
      navigate(`/search?q=${encodeURIComponent(trimmed)}`);
    } else {
      navigate("/search");
    }
  };

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/login");
  };

  return (
    <nav className="flex w-full items-center justify-between gap-3 bg-[#162238] px-4 py-4 text-white sm:px-6 lg:px-8">
      <Link to="/" className="text-2xl font-black tracking-tight text-green-400">Lubix</Link>

      <form onSubmit={handleSearch} className="hidden flex-1 items-center rounded-full border border-slate-700/70 bg-slate-900/70 px-3 py-2 shadow-inner shadow-slate-950/40 md:flex md:max-w-xl">
        <MagnifyingGlassIcon className="mr-2 h-4 w-4 text-slate-400" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          type="text"
          placeholder="Buscar productos"
          className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
        />
        <button type="submit" className="rounded-full bg-green-500 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-green-400">Buscar</button>
      </form>

      <div className="flex items-center gap-2 sm:gap-3">
        <Link to="/carrito" className="rounded-full p-2.5 transition hover:bg-slate-800/70" title="Ver carrito">
          <ShoppingCartIcon className="h-5 w-5" />
        </Link>

        <button
          onClick={toggleTheme}
          className="relative flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 hover:opacity-80"
          title={theme === "light" ? "Modo oscuro" : "Modo claro"}
          style={{ backgroundColor: "var(--color-btn-primary)" }}
        >
          <svg
            className={`absolute h-6 w-6 text-white transition-all duration-300 ${theme === "light" ? "rotate-0 opacity-100" : "rotate-180 opacity-0"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
          <svg
            className={`absolute h-6 w-6 text-yellow-400 transition-all duration-300 ${theme === "dark" ? "rotate-0 opacity-100" : "-rotate-180 opacity-0"}`}
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
          <div className="relative">
            <button
              onClick={() => setMenuOpen((open) => !open)}
              className="flex items-center gap-2 rounded-full border border-slate-700/70 bg-slate-900/70 px-2.5 py-2 text-sm transition hover:border-green-400"
            >
              <UserCircleIcon className="h-5 w-5 text-green-400" />
              <span className="hidden font-medium sm:inline">{user.name}</span>
            </button>

            {menuOpen && (
              <div className="absolute right-0 z-50 mt-2 w-48 rounded-xl border border-slate-700/70 bg-slate-900 py-2 shadow-xl shadow-slate-950/40">
                <Link to="/dashboard-usuario" className="block px-4 py-2 text-sm text-slate-200 transition hover:bg-slate-800 hover:text-green-400" onClick={() => setMenuOpen(false)}>
                  Mi cuenta
                </Link>
                <Link to="/carrito" className="block px-4 py-2 text-sm text-slate-200 transition hover:bg-slate-800 hover:text-green-400" onClick={() => setMenuOpen(false)}>
                  Ver carrito
                </Link>
                <button onClick={handleLogout} className="block w-full px-4 py-2 text-left text-sm text-slate-200 transition hover:bg-red-500/10 hover:text-red-400">
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link to="/login" className="rounded-full px-3 py-2 text-sm font-medium transition hover:text-green-400">Iniciar sesión</Link>
            <Link to="/register" className="rounded-full bg-green-500 px-4 py-2 text-sm font-semibold text-black transition hover:bg-green-600">Registrarse</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
