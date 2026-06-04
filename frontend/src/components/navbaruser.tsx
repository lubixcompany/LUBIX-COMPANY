import { Link } from "react-router-dom";
import { UserCircleIcon, Cog6ToothIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";

export default function NavbarUsuario() {
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-[#162238] w-full">
      {/* Logo */}
      <div className="text-green-500 text-2xl font-bold">Lubix</div>

      {/* Barra de búsqueda */}
      <div className="flex w-[500px] bg-[#1c2a4a] rounded-full overflow-hidden">
        <input
          type="text"
          placeholder="Buscar productos..."
          className="flex-1 px-4 py-2 bg-transparent text-white placeholder-gray-400 focus:outline-none"
        />
        <button className="bg-green-500 px-5 text-white">🔍</button>
      </div>

      {/* Links de navegación */}
      <div className="flex items-center gap-6 text-white">
        <Link
          to="/ofertas"
          className="flex items-center gap-1 hover:text-green-400 transition"
        >
          <ShoppingCartIcon className="w-5 h-5" />
          <span>carrito</span>
        </Link>

        <Link
          to="/perfil"
          className="flex items-center gap-1 hover:text-green-400 transition"
        >
          <UserCircleIcon className="w-5 h-5" />
          <span>Mi Perfil</span>
        </Link>

        <Link
          to="/configuracion"
          className="flex items-center gap-1 hover:text-green-400 transition"
        >
          <Cog6ToothIcon className="w-5 h-5" />
          <span>Configuración</span>
        </Link>

        {/* Avatar / Usuario */}
        <div className="flex items-center gap-2 border-l border-gray-600 pl-4">
          <UserCircleIcon className="w-8 h-8 text-green-500" />
          <span className="font-medium">usuario</span>
        </div>
      </div>
    </div>
  );
}
