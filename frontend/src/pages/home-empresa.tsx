import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavbarEmpresa from "../components/navbar-empresa";
import Footer from "../components/footer";
import { 
  ChartBarIcon, 
  ShoppingBagIcon,
  CurrencyDollarIcon 
} from "@heroicons/react/24/outline";

const GamepadIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={props.className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 9h2m-1-1v2m7-1h2m-1-1v2m-6 6h6a5 5 0 005-5V9a5 5 0 00-5-5H9a5 5 0 00-5 5v2a5 5 0 005 5z"
    />
  </svg>
);

const promociones = [
  { 
    titulo: "Destaca tu Tienda", 
    descripcion: "Promociones especiales para nuevos sellers", 
    color: "bg-gradient-to-tr from-emerald-500 to-green-700 text-white",
    imagen: "/portatil.png"
  },
  { 
    titulo: "Aumenta tus Ventas", 
    descripcion: "Herramientas de marketing incluidas", 
    color: "bg-gradient-to-tr from-emerald-950 to-gray-900 text-white",
    imagen: "/iphone.png"
  },
  { 
    titulo: "Gestiona tu Inventario", 
    descripcion: "Panel de control completo", 
    color: "bg-gradient-to-tr from-emerald-500 to-green-700 text-white",
    imagen: "/televisor.png"
  },
];

const HomeEmpresa = () => {
  const [index, setIndex] = useState(0);

  // Rotación automática del carrusel
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % promociones.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="page-container">
      {/* NAVBAR */}
      <NavbarEmpresa />

      {/* HERO */}
      <section className="flex flex-col md:flex-row justify-between items-center px-8 md:px-16 py-20 min-h-[calc(100vh-80px)]" style={{ backgroundColor: "var(--color-bg)" }}>
        <div className="max-w-lg text-center md:text-left mr-8">
          <div className="text-accent mb-2 text-sm font-semibold uppercase tracking-wide">
            🏢 Bienvenido a tu Tienda
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight" style={{ color: "var(--color-text)" }}>
            Gestiona tu Negocio en Lubix
          </h1>
          <p className="text-lg text-muted mb-6">
            Administra tus <span className="font-bold text-accent">productos, pedidos y ganancias</span> desde un solo lugar.
          </p>
          <Link 
            to="/empresa" 
            className="inline-block bg-emerald-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-emerald-700 transition"
          >
            Ir al Dashboard
          </Link>
        </div>

        {/* Carrusel de Promociones */}
        <div className="mt-10 md:mt-0 w-[420px] h-[500px] rounded-3xl shadow-2xl overflow-hidden flex flex-col items-center justify-between transform transition-all duration-700 ease-in-out hover:scale-105" style={{ backgroundColor: "var(--color-bg-card)" }}>
          <img 
            src={promociones[index].imagen} 
            alt={promociones[index].titulo} 
            className="w-full h-64 object-cover"
          />
          <div className={`w-full flex-1 flex flex-col items-center justify-center p-4 text-center ${promociones[index].color}`}>
            <h2 className="text-xl font-bold mb-1">{promociones[index].titulo}</h2>
            <p className="mb-3 text-sm">{promociones[index].descripcion}</p>
          </div>
        </div>
      </section>

      {/* INFO - CARACTERÍSTICAS PRINCIPALES */}
      <section className="grid md:grid-cols-3 gap-8 px-8 md:px-16 py-16 section-bg">
        <div className="card">
          <ChartBarIcon className="w-8 h-8 text-accent mb-3" />
          <h2 className="text-accent mb-3 text-xl font-semibold">Estadísticas</h2>
          <p className="text-muted text-sm leading-relaxed">
            Monitorea el rendimiento de tu tienda con analytics en tiempo real.
          </p>
        </div>

        <div className="card">
          <ShoppingBagIcon className="w-8 h-8 text-accent mb-3" />
          <h2 className="text-accent mb-3 text-xl font-semibold">Productos</h2>
          <p className="text-muted text-sm leading-relaxed">
            Gestiona tu catálogo, precios, inventario y ofertas fácilmente.
          </p>
        </div>

        <div className="card">
          <CurrencyDollarIcon className="w-8 h-8 text-accent mb-3" />
          <h2 className="text-accent mb-3 text-xl font-semibold">Ingresos</h2>
          <p className="text-muted text-sm leading-relaxed">
            Visualiza tus ganancias y accede a reportes detallados de ventas.
          </p>
        </div>
      </section>

      {/* HERRAMIENTAS PRINCIPALES */}
      <section className="card">
        <h2 className="text-3xl font-bold mb-10 text-center">
          Herramientas de Gestión
        </h2>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[
            { nombre: "Dashboard", icono: <ChartBarIcon className="w-10 h-10" /> },
            { nombre: "Mis Productos", icono: <ShoppingBagIcon className="w-10 h-10" /> },
         
            { nombre: "Reportes", icono: <CurrencyDollarIcon className="w-10 h-10" /> },
            { nombre: "Promociones", icono: <GamepadIcon className="w-10 h-10" /> },
            { nombre: "Clientes", icono: <ChartBarIcon className="w-10 h-10" /> },
            { nombre: "Configuración", icono: <ShoppingBagIcon className="w-10 h-10" /> },
           
          ].map((tool, i) => (
            <div key={i} className="card hover:shadow-lg transition cursor-pointer">
              <div className="text-4xl mb-3 text-accent">{tool.icono}</div>
              <h3 className="font-semibold text-lg text-center">{tool.nombre}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* ESTADÍSTICAS RÁPIDAS */}
      <section className="card">
        <h2 className="text-3xl font-bold mb-10 text-center text-emerald-700">Resumen Rápido</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { label: "Productos Activos", valor: "24", icon: "📦" },
            { label: "Órdenes Este Mes", valor: "156", icon: "📋" },
            { label: "Ingresos Totales", valor: "$45.2M", icon: "💰" },
            { label: "Tasa de Conversión", valor: "8.5%", icon: "📈" },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-xl shadow-lg p-6 text-center hover:-translate-y-2 transition">
              <div className="text-4xl mb-2">{stat.icon}</div>
              <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
              <h3 className="font-bold text-2xl text-emerald-600">{stat.valor}</h3>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomeEmpresa;
