import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { UserCircleIcon, ChartBarIcon, ShoppingBagIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useMemo, useState } from "react";

export default function NavbarEmpresa() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const initials = useMemo(() => user?.name?.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join("") || "E", [user?.name]);

  return (
    <nav className="border-b border-slate-800/80 bg-[#162238] text-white shadow-lg shadow-slate-950/30">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/home-empresa" className="text-2xl font-black tracking-tight text-green-400">Lubix</Link>

        <div className="hidden items-center gap-4 lg:flex">
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

          <Link to="/dashboard-empresa" className="flex items-center gap-2 rounded-full px-3 py-2 text-sm transition hover:bg-slate-800/80 hover:text-green-400">
            <ChartBarIcon className="h-5 w-5" />
            <span>Dashboard</span>
          </Link>

          <Link to="/dashboard-empresa" className="flex items-center gap-2 rounded-full px-3 py-2 text-sm transition hover:bg-slate-800/80 hover:text-green-400">
            <ShoppingBagIcon className="h-5 w-5" />
            <span>Productos</span>
          </Link>

          {user && (
            <div className="relative">
              <button
                onClick={() => setMenuOpen((open) => !open)}
                className="flex items-center gap-2 rounded-full border border-slate-700/70 bg-slate-900/70 px-3 py-2 text-sm transition hover:border-green-400"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-400 font-semibold text-slate-950">
                  {initials}
                </div>
                <span className="font-medium">{user.name}</span>
              </button>

              {menuOpen && (
                <div className="absolute right-0 z-50 mt-2 w-48 rounded-xl border border-slate-700/70 bg-slate-900 py-2 shadow-xl shadow-slate-950/40">
                  <Link to="/dashboard-empresa" className="block px-4 py-2 text-sm text-slate-200 transition hover:bg-slate-800 hover:text-green-400" onClick={() => setMenuOpen(false)}>
                    Perfil de Empresa
                  </Link>
                  <Link to="/dashboard-empresa" className="block px-4 py-2 text-sm text-slate-200 transition hover:bg-slate-800 hover:text-green-400" onClick={() => setMenuOpen(false)}>
                    Configuración
                  </Link>
                  <button onClick={handleLogout} className="block w-full px-4 py-2 text-left text-sm text-slate-200 transition hover:bg-red-500/10 hover:text-red-400">
                    Cerrar Sesión
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button onClick={toggleTheme} className="rounded-full bg-green-500 p-2.5 text-white transition hover:bg-green-400" title={theme === "light" ? "Modo oscuro" : "Modo claro"}>
            <UserCircleIcon className="h-5 w-5" />
          </button>
          <button onClick={() => setMobileMenuOpen((open) => !open)} className="rounded-full border border-slate-700/70 bg-slate-900/70 p-2.5 text-white">
            {mobileMenuOpen ? <XMarkIcon className="h-5 w-5" /> : <Bars3Icon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-slate-800/80 bg-slate-900/95 px-4 py-4 lg:hidden">
          <div className="space-y-2">
            <Link to="/dashboard-empresa" className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-slate-200 transition hover:bg-slate-800" onClick={() => setMobileMenuOpen(false)}>
              <ChartBarIcon className="h-4 w-4" /> Dashboard
            </Link>
            <Link to="/dashboard-empresa" className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-slate-200 transition hover:bg-slate-800" onClick={() => setMobileMenuOpen(false)}>
              <ShoppingBagIcon className="h-4 w-4" /> Productos
            </Link>
            {user && (
              <button onClick={handleLogout} className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-red-300 transition hover:bg-red-500/10">
                Cerrar sesión
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
