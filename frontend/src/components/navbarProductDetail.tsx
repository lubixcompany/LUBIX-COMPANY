import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function NavbarProductDetail() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    logout();
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-[#162238] w-full">
      {/* Logo */}
      <div className="text-green-500 text-2xl font-bold">Lubix</div>

      {/* Buscador */}
      <div className="flex w-[500px] bg-[#1c2a4a] rounded-full overflow-hidden">
        <input
          type="text"
          placeholder="Buscar productos..."
          className="flex-1 px-4 py-2 bg-transparent text-white placeholder-gray-400 focus:outline-none"
        />
        <button className="bg-green-500 px-5 text-white">🔍</button>
      </div>

      {/* Perfil siempre visible */}
      <div className="flex items-center gap-6 text-white">
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 border-l border-gray-600 pl-4"
          >
            {user?.name ? (
              <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-black bg-green-400">
                {user.name.charAt(0).toUpperCase()}
              </div>
            ) : (
              <UserCircleIcon className="w-8 h-8 text-green-500" />
            )}
            <span className="font-medium">{user?.name || "Invitado"}</span>
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-[#1c2a4a] rounded shadow-lg py-2 z-50">
              <Link
                to="/dashboard-usuario"
                className="block px-4 py-2 text-white hover:bg-green-500 transition"
                onClick={() => setMenuOpen(false)}
              >
                Ver Perfil
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-white hover:bg-red-500 transition"
              >
                Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
