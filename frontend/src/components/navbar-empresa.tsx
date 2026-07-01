import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import api from "../api/axios";

export default function NavbarEmpresa() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  useEffect(() => {
    api.get("/company/dashboard/me")
      .then((res) => setLogoUrl(res.data.logo ?? null))
      .catch(() => {});
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const initials = user?.name
    ? user.name.trim().split(/\s+/).slice(0, 2).map((p: string) => p[0]).join("").toUpperCase()
    : "E";

  return (
    <nav
      className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-6 py-3 border-b"
      style={{ backgroundColor: "var(--color-navbar)", borderColor: "var(--color-navbar-border)" }}
    >
      {/* Logo */}
      <Link to="/home-empresa" className="text-xl font-black" style={{ color: "var(--color-accent)" }}>
        Lubix
      </Link>

      {/* Derecha: tema + perfil */}
      <div className="flex items-center gap-3">
        {/* Toggle tema */}
        <button
          onClick={toggleTheme}
          className="w-9 h-9 rounded-full flex items-center justify-center hover:opacity-80 transition"
          title={theme === "light" ? "Modo oscuro" : "Modo claro"}
          style={{ backgroundColor: "var(--color-btn-primary)" }}
        >
          {theme === "light" ? (
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 8a4 4 0 100 8 4 4 0 000-8zm0-6.75a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0V2a.75.75 0 01.75-.75zm0 18a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75zm10-9.25a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5a.75.75 0 01.75.75zm-18 0a.75.75 0 01-.75.75H1.75a.75.75 0 010-1.5H3a.75.75 0 01.75.75z" clipRule="evenodd" />
            </svg>
          )}
        </button>

        {/* Menú perfil */}
        {user && (
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2 rounded-full border px-2.5 py-1.5 text-sm transition hover:opacity-80"
              style={{ borderColor: "var(--color-border)" }}
            >
              {/* Avatar: logo empresa o iniciales */}
              <div className="w-7 h-7 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: logoUrl ? "transparent" : "var(--color-accent)" }}
              >
                {logoUrl ? (
                  <img src={logoUrl} alt="logo" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-xs font-bold text-white">{initials}</span>
                )}
              </div>
              <span className="hidden sm:block font-medium max-w-[140px] truncate" style={{ color: "var(--color-text)" }}>
                {user.name}
              </span>
              <ChevronDownIcon className="w-3.5 h-3.5 transition-transform" style={{
                color: "var(--color-text-muted)",
                transform: menuOpen ? "rotate(180deg)" : "rotate(0deg)"
              }} />
            </button>

            {menuOpen && (
              <div
                className="absolute right-0 mt-2 w-48 rounded-xl border shadow-lg z-50 py-1"
                style={{ backgroundColor: "var(--color-bg-card)", borderColor: "var(--color-border)" }}
              >
                <button
                  onClick={() => { setMenuOpen(false); handleLogout(); }}
                  className="block w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-500/10 transition rounded-lg mx-auto"
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
