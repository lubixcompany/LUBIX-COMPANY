import { useState, useEffect } from "react";
import NavbarUsuario from "../components/navbaruser";
import Footer from "../components/footer";
import {DevicePhoneMobileIcon,ComputerDesktopIcon,SpeakerWaveIcon,CameraIcon,ClockIcon}from "@heroicons/react/24/outline" 

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
    <div className="page-container">
      {/* NAVBAR */}
      <NavbarUsuario />

      {/* HERO */}
      <section className="flex flex-col md:flex-row justify-between items-center px-8 md:px-16 py-20 min-h-[calc(100vh-80px)]" style={{ backgroundColor: "var(--color-bg)" }}>
        <div className="max-w-lg text-center md:text-left mr-8">
          <div className="text-accent mb-2 text-sm font-semibold uppercase tracking-wide">
            👋 Hola 
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight" style={{ color: "var(--color-text)" }}>
            Bienvenido de nuevo a Lubix
          </h1>
          <p className="text-lg text-muted mb-6">
            Explora tus <span className="font-bold text-accent">compras, perfil y configuración</span> de manera rápida y sencilla.
          </p>
        
        </div>

        {/* Carrusel de Ofertas */}
        <div className="mt-10 md:mt-0 w-[420px] h-[500px] rounded-3xl shadow-2xl overflow-hidden flex flex-col items-center justify-between transform transition-all duration-700 ease-in-out hover:scale-105" style={{ backgroundColor: "var(--color-bg-card)" }}>
          <img 
            src={ofertas[index].imagen} 
            alt={ofertas[index].titulo} 
            className="w-full h-64 object-cover"
          />
          <div className={`w-full flex-1 flex flex-col items-center justify-center p-4 text-center ${ofertas[index].color}`}>
            <h2 className="text-xl font-bold mb-1">{ofertas[index].titulo}</h2>
            <p className="mb-3 text-sm">{ofertas[index].descripcion}</p>
          
          </div>
        </div>
      </section>

      {/* INFO */}
      <section className="grid md:grid-cols-3 gap-8 px-8 md:px-16 py-16 section-bg">
        <div className="card">
          <h2 className="text-accent mb-3 text-xl font-semibold">Tus Compras</h2>
          <p className="text-muted text-sm leading-relaxed">
            Revisa tu historial de compras y sigue el estado de tus pedidos.
          </p>
        </div>

        <div className="card">
          <h2 className="text-accent mb-3 text-xl font-semibold">Perfil</h2>
          <p className="text-muted text-sm leading-relaxed">
            Edita tu información personal, cambia tu contraseña y gestiona tus preferencias.
          </p>
        </div>

        <div className="card">
          <h2 className="text-accent mb-3 text-xl font-semibold">Configuración</h2>
          <p className="text-muted text-sm leading-relaxed">
            Ajusta tu experiencia: notificaciones, seguridad y más.
          </p>
        </div>
      </section>

      {/* CATEGORÍAS PRINCIPALES */}
      <section className="card">
        <h2 className="text-3xl font-bold mb-10 text-center">
          Categorías Principales
        </h2>
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
          {[
            { nombre: "Computadoras", icono: <ComputerDesktopIcon className="w-10 h-10" /> },
            { nombre: "Celulares", icono: <DevicePhoneMobileIcon className="w-10 h-10" /> },
            { nombre: "Audio", icono: <SpeakerWaveIcon className="w-10 h-10" /> },
            { nombre: "Cámaras", icono: <CameraIcon className="w-10 h-10" /> },
            { nombre: "Wearables", icono: <ClockIcon className="w-10 h-10" /> },
            { nombre: "Gaming", icono: <GamepadIcon className="w-10 h-10" /> },
          ].map((cat, i) => (
            <div key={i} className="card">
              <div className="text-4xl mb-3">{cat.icono}</div>
              <h3 className="font-semibold text-lg">{cat.nombre}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCTOS DESTACADOS */}
      <section className="card">
        <h2 className="text-3xl font-bold mb-10 text-center text-emerald-700">Productos Destacados</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { nombre: "MacBook Pro 14\" M3 Pro", desc: "Laptop de alto rendimiento", precio: 9562500, antes: 11250000, descuento: "-15%", imagen: "/macbook.png" },
            { nombre: "Auriculares Premium", desc: "Cancelación de ruido", precio: 1080000, antes: 1350000, descuento: "-20%", imagen: "/headphones.png" },
            { nombre: "iPhone 15 Pro Max", desc: "256GB Titanio Azul", precio: 5400000, antes: null, descuento: null, imagen: "/iphone15.png" },
          ].map((prod, i) => (
            <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden hover:-translate-y-2 transition">
              <img src={prod.imagen} alt={prod.nombre} className="w-full h-56 object-cover" />
              <div className="p-6">
                <h3 className="font-bold text-lg mb-1">{prod.nombre}</h3>
                <p className="text-sm text-gray-600 mb-3">{prod.desc}</p>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-emerald-600 font-bold text-xl">${prod.precio.toLocaleString()}</span>
                  {prod.antes && (
                    <span className="line-through text-gray-400">${prod.antes.toLocaleString()}</span>
                  )}
                  {prod.descuento && (
                    <span className="bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-1 rounded">{prod.descuento}</span>
                  )}
                </div>
                <button className="w-full bg-emerald-600 text-white py-2 rounded-lg font-semibold hover:bg-emerald-700 transition">
                  Agregar al carrito
                </button>
              </div>
            </div>
          ))}
         </div>
         <div className="grid md:grid-cols-3 gap-8 mt-12">
          
          </div>
         <div className="grid md:grid-cols-3 gap-8">
          {[
            { nombre: "MacBook Pro 14\" M3 Pro", desc: "Laptop de alto rendimiento", precio: 9562500, antes: 11250000, descuento: "-15%", imagen: "/macbook.png" },
            { nombre: "Auriculares Premium", desc: "Cancelación de ruido", precio: 1080000, antes: 1350000, descuento: "-20%", imagen: "/headphones.png" },
            { nombre: "iPhone 15 Pro Max", desc: "256GB Titanio Azul", precio: 5400000, antes: null, descuento: null, imagen: "/iphone15.png" },
          ].map((prod, i) => (
            <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden hover:-translate-y-2 transition">
              <img src={prod.imagen} alt={prod.nombre} className="w-full h-56 object-cover" />
              <div className="p-6">
                <h3 className="font-bold text-lg mb-1">{prod.nombre}</h3>
                <p className="text-sm text-gray-600 mb-3">{prod.desc}</p>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-emerald-600 font-bold text-xl">${prod.precio.toLocaleString()}</span>
                  {prod.antes && (
                    <span className="line-through text-gray-400">${prod.antes.toLocaleString()}</span>
                  )}
                  {prod.descuento && (
                    <span className="bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-1 rounded">{prod.descuento}</span>
                  )}
                </div>
                <button className="w-full bg-emerald-600 text-white py-2 rounded-lg font-semibold hover:bg-emerald-700 transition">
                  Agregar al carrito
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default HomeUsuario;
