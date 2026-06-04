import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavbarUsuario from "../components/navbaruser";

const ofertas = [
  { 
    titulo: "Oferta 1", 
    descripcion: "Hasta 40% en laptops", 
    color: "bg-gradient-to-tr from-emerald-500 to-green-700 text-white",
    imagen: "/portatil.png"
  },
  { 
    titulo: "Oferta 2", 
    descripcion: "Smartphones con 30% de descuento", 
    color: "bg-gradient-to-tr from-emerald-950 to-gray-900 text-white",
    imagen: "/iphone.png"
  },
  { 
    titulo: "Oferta 3", 
    descripcion: "Accesorios 2x1", 
    color: "bg-gradient-to-tr from-emerald-500 to-green-700 text-white",
    imagen: "/televisor.png"
  },
];

const HomeUsuario: React.FC = () => {
  const [index, setIndex] = useState(0);

  // Rotación automática del carrusel
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % ofertas.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* NAVBAR */}
      <NavbarUsuario />

      {/* HERO */}
      <section className="flex flex-col md:flex-row justify-between items-center px-8 md:px-16 py-20 min-h-[calc(100vh-80px)] bg-white">
        <div className="max-w-lg text-center md:text-left mr-8">
          <div className="text-green-600 mb-2 text-sm font-semibold uppercase tracking-wide">
            👋 Hola 
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
            Bienvenido de nuevo a Lubix
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Explora tus <span className="font-bold text-green-600">compras, perfil y configuración</span> de manera rápida y sencilla.
          </p>
          <Link
            to="/ofertas"
            className="inline-block bg-green-500 text-white font-bold px-6 py-3 rounded-full shadow hover:bg-green-600 transition"
          >
            Ver Ofertas
          </Link>
        </div>

        {/* Carrusel de Ofertas */}
        <div className="mt-10 md:mt-0 w-[420px] h-[500px] rounded-3xl shadow-2xl overflow-hidden flex flex-col items-center justify-between bg-white transform transition-all duration-700 ease-in-out hover:scale-105">
          <img 
            src={ofertas[index].imagen} 
            alt={ofertas[index].titulo} 
            className="w-full h-64 object-cover"
          />
          <div className={`w-full flex-1 flex flex-col items-center justify-center p-4 text-center ${ofertas[index].color}`}>
            <h2 className="text-xl font-bold mb-1">{ofertas[index].titulo}</h2>
            <p className="mb-3 text-sm">{ofertas[index].descripcion}</p>
            <Link 
              to="/ofertas"
              className="bg-white text-emerald-700 font-semibold px-4 py-1.5 rounded-full shadow hover:bg-gray-200 transition text-sm"
            >
              Comprar ahora
            </Link>
          </div>
        </div>
      </section>

      {/* INFO */}
      <section className="grid md:grid-cols-3 gap-8 px-8 md:px-16 py-16 bg-gray-50">
        <div className="bg-white p-6 rounded-xl shadow hover:-translate-y-1 transition">
          <h2 className="text-green-600 mb-3 text-xl font-semibold">Tus Compras</h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            Revisa tu historial de compras y sigue el estado de tus pedidos.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:-translate-y-1 transition">
          <h2 className="text-green-600 mb-3 text-xl font-semibold">Perfil</h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            Edita tu información personal, cambia tu contraseña y gestiona tus preferencias.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:-translate-y-1 transition">
          <h2 className="text-green-600 mb-3 text-xl font-semibold">Configuración</h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            Ajusta tu experiencia: notificaciones, seguridad y más.
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomeUsuario;
