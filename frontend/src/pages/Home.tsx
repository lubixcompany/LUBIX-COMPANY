import  { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

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


function Bienvenida() {
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
      <Navbar />

      {/* HERO */}
      <section className="flex flex-col md:flex-row justify-between items-center px-8 md:px-16 py-20 min-h-[calc(100vh-80px)]" style={{ backgroundColor: "var(--color-bg)" }}>
        <div className="max-w-lg text-center md:text-left mr-8">
          <div className="text-accent mb-2 text-sm font-semibold uppercase tracking-wide">
            Bienvenidos a Lubix
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight" style={{ color: "var(--color-text)" }}>
            Tienda de Tecnología
          </h1>
          <p className="text-lg text-muted mb-6">
            Y <span className="font-bold text-accent">50% de descuento</span> en productos seleccionados
          </p>
      
        </div>

        {/* Carrusel */}
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
          <h2 className="text-accent mb-3 text-xl font-semibold">¿Qué es Lubix?</h2>
          <p className="text-muted text-sm leading-relaxed">
            Lubix es una plataforma digital que conecta a los usuarios con diferentes empresas, permitiendo descubrir, comparar y adquirir productos de manera rápida y segura.
          </p>
        </div>

        <div className="card">
          <h2 className="text-accent mb-3 text-xl font-semibold">¿Qué hacemos?</h2>
          <p className="text-muted text-sm leading-relaxed">
            Facilitamos la compra en línea con recogida en tienda, ofreciendo una experiencia práctica tanto para clientes como para empresas.
          </p>
        </div>

        <div className="card">
          <h2 className="text-accent mb-3 text-xl font-semibold">Nuestra misión</h2>
          <p className="text-muted text-sm leading-relaxed">
            Impulsar el comercio digital local mediante tecnología moderna, brindando herramientas que mejoren la visibilidad y ventas de los negocios.
          </p>
        </div>

        <div className="card">
          <h2 className="text-accent mb-3 text-xl font-semibold">Beneficios para clientes</h2>
          <p className="text-muted text-sm leading-relaxed">
            Encuentra las mejores ofertas locales, compara precios fácilmente y recoge tus compras en minutos sin esperas de envío.
          </p>
        </div>

        <div className="card">
          <h2 className="text-accent mb-3 text-xl font-semibold">Ventajas para empresas</h2>
          <p className="text-muted text-sm leading-relaxed">
            Aumenta tus ventas online, llega a más clientes cercanos y gestiona pedidos con nuestro sistema integrado simple.
          </p>
        </div>

        <div className="card">
          <h2 className="text-accent mb-3 text-xl font-semibold">Empieza hoy</h2>
          <p className="text-muted text-sm leading-relaxed mb-4">
            Regístrate gratis, explora productos y únete a la revolución del comercio local digital con Lubix.
          </p>
          <Link
            to="/register"
            className="text-white font-bold px-4 py-2 rounded-full hover:shadow transition inline-block"
            style={{ backgroundColor: "var(--color-btn-primary)" }}
          >
            Comenzar
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Bienvenida;
