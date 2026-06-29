import { useMemo, useState, useEffect, useRef } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import {
  ShoppingCartIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

export default function NavbarUsuario() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuOpen && menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleEsc);
    };
  }, [menuOpen]);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/login");
  };

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

  const initials = useMemo(
    () =>
      user?.name
        ?.trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0])
        .join("") || "U",
    [user?.name]
  );

  return (
    <nav className="border-b border-slate-800/80 bg-[#162238] text-white shadow-lg shadow-slate-950/30">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/home-usuario"
          className="text-2xl font-black tracking-tight text-green-400"
        >
          Lubix
        </Link>

        {/* Barra de búsqueda */}
        <form
          onSubmit={handleSearch}
          className="hidden flex-1 items-center rounded-full border border-slate-700/80 bg-slate-900/70 px-3 py-2 shadow-inner shadow-slate-950/40 md:flex md:max-w-xl"
        >
          <MagnifyingGlassIcon className="mr-2 h-4 w-4 text-slate-400" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="text"
            placeholder="Buscar productos..."
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-400"
          />
          <button
            type="submit"
            className="rounded-full bg-green-500 px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-green-400"
          >
            Buscar
          </button>
        </form>

        {/* Sección derecha */}
        <div className="flex items-center gap-4">
          {/* Botón tema */}
          <button
            onClick={toggleTheme}
            className="relative flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 hover:opacity-80"
            title={theme === "light" ? "Modo oscuro" : "Modo claro"}
            style={{ backgroundColor: "var(--color-btn-primary)" }}
          >
            {theme === "light" ? (
              <svg
                className="h-6 w-6 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            ) : (
              <svg
                className="h-6 w-6 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M12 8a4 4 0 100 8 4 4 0 000-8zm0-6.75a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0V2a.75.75 0 01.75-.75z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>

          {/* Carrito */}
          <Link
            to="/carrito"
            className="flex items-center gap-2 rounded-full px-3 py-2 text-sm transition hover:bg-slate-800/80 hover:text-green-400"
          >
            <ShoppingCartIcon className="h-5 w-5" />
            <span>Carrito</span>
          </Link>

          {/* Perfil con menú desplegable */}
          {user && (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen((open) => !open)}
                className="flex items-center gap-2 rounded-full border border-slate-700/70 bg-slate-900/70 px-3 py-2 text-sm transition hover:border-green-400"
                aria-expanded={menuOpen}
                aria-controls="user-dropdown"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-400 font-semibold text-slate-950">
                  {initials}
                </div>
                <span className="font-medium">{user.name}</span>
              </button>

              {menuOpen && (
                <div
                  id="user-dropdown"
                  className="absolute right-0 z-50 mt-2 w-56 rounded-xl border border-slate-700/70 bg-slate-900 shadow-lg shadow-slate-950/40 animate-fadeIn"
                >
                  <Link
                    to="/dashboard-usuario"
                    className="block px-4 py-2 text-sm text-slate-200 transition hover:bg-slate-800 hover:text-green-400 rounded-t-xl"
                    onClick={() => setMenuOpen(false)}
                  >
                    Ver Perfil
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-left text-sm text-slate-200 transition hover:bg-red-500/10 hover:text-red-400 rounded-b-xl"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
