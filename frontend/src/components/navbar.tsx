import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  const isLogged = !!user;

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-[#162238] shadow-md">

      {/* LOGO */}
      <Link to="/" className="text-green-500 text-2xl font-bold">
        Lubix
      </Link>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Buscar..."
        className="bg-[#1c2a4a] text-white px-4 py-2 rounded-full outline-none"
      />

      {/* LINKS */}
      <div className="flex items-center gap-4">

        {isLogged && user ? (
          <>
            {/* AVATAR */}
            <div className="w-9 h-9 bg-green-500 rounded-full flex items-center justify-center font-bold text-black">
              {user.name?.charAt(0).toUpperCase()}
            </div>

            {/* NAME */}
            <span className="text-white">{user.name}</span>

            {/* LOGOUT */}
            <button
              onClick={logout}
              className="bg-red-500 px-3 py-1 rounded text-white"
            >
              Salir
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-white hover:text-green-400">
              Login
            </Link>

            <Link
              to="/register"
              className="bg-green-500 px-4 py-2 rounded text-black font-semibold"
            >
              Register
            </Link>
          </>
        )}

      </div>
    </nav>
  );
}