import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavbarEmpresa from "../components/navbar-empresa";
import Footer from "../components/footer";

const ofertas = [
  {
    label: "Oferta 1",
    titulo: "Laptops con hasta 40% off",
    descripcion: "Los mejores portátiles al mejor precio",
    imagen: "/portatil.png",
  },
  {
    label: "Oferta 2",
    titulo: "Smartphones 30% descuento",
    descripcion: "Última tecnología al alcance de todos",
    imagen: "/iphone.png",
  },
  {
    label: "Oferta 3",
    titulo: "Accesorios 2x1",
    descripcion: "El mejor complemento para tus dispositivos",
    imagen: "/televisor.png",
  },
];

const infoCards = [
  {
    icon: "💻",
    titulo: "¿Qué es Lubix?",
    texto:
      "Plataforma digital que conecta usuarios con empresas para descubrir, comparar y adquirir productos de forma rápida y segura.",
  },
  {
    icon: "🛒",
    titulo: "¿Qué hacemos?",
    texto:
      "Facilitamos la compra en línea con recogida en tienda, ofreciendo una experiencia práctica para clientes y empresas.",
  },
  {
    icon: "🎯",
    titulo: "Nuestra misión",
    texto:
      "Impulsar el comercio digital local con tecnología moderna que mejore la visibilidad y ventas de los negocios.",
  },
  {
    icon: "⭐",
    titulo: "Beneficios para clientes",
    texto:
      "Encuentra las mejores ofertas locales, compara precios fácilmente y recoge tus compras en minutos.",
  },
  {
    icon: "📊",
    titulo: "Ventajas para empresas",
    texto:
      "Aumenta tus ventas online, llega a más clientes cercanos y gestiona pedidos con nuestro sistema integrado.",
  },
  {
    icon: "🚀",
    titulo: "Empieza hoy",
    texto:
      "Regístrate gratis, explora productos y únete a la revolución del comercio local digital con Lubix.",
    cta: true,
  },
];

export default function Bienvenida() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % ofertas.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950">
      <NavbarEmpresa />

      {/* HERO */}
      <section className="flex flex-col md:flex-row items-center justify-between gap-10 px-6 md:px-16 py-20 max-w-7xl mx-auto">
        {/* Texto izquierdo */}
        <div className="max-w-lg text-center md:text-left">
          <p className="text-green-500 text-xs font-semibold uppercase tracking-widest mb-3">
            🏷 Oferta Especial
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
            Mega Sale de{" "}
            <span className="text-green-400">Tecnología</span>
          </h1>
          <p className="text-slate-400 text-base mb-8 leading-relaxed">
            Hasta{" "}
            <span className="text-green-400 font-semibold">50% de descuento</span>{" "}
            en productos seleccionados. Descubre, compara y compra de forma
            rápida y segura.
          </p>
          <Link
            to="/ofertas"
            className="inline-block bg-green-500 hover:bg-green-400 text-white font-bold px-8 py-3 rounded-full transition-all shadow-lg shadow-green-500/30 hover:shadow-green-500/50"
          >
            Ver ofertas
          </Link>
        </div>

        {/* Carrusel */}
        <div className="w-72 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex-shrink-0 hover:border-green-500/40 transition-all">
          <img
            src={ofertas[index].imagen}
            alt={ofertas[index].titulo}
            className="w-full h-44 object-cover"
          />
          <div className="p-5 text-center">
            <p className="text-green-500 text-xs font-bold uppercase tracking-widest mb-1">
              {ofertas[index].label}
            </p>
            <h2 className="text-white font-bold text-base mb-1">
              {ofertas[index].titulo}
            </h2>
            <p className="text-slate-400 text-sm mb-4">
              {ofertas[index].descripcion}
            </p>
            <Link
              to="/ofertas"
              className="inline-block bg-green-500 hover:bg-green-400 text-white text-xs font-bold px-5 py-2 rounded-full transition-all"
            >
              Comprar ahora
            </Link>
          </div>
          {/* Dots */}
          <div className="flex justify-center gap-2 pb-4">
            {ofertas.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === index ? "bg-green-500 w-4" : "bg-slate-700"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* INFO */}
      <section className="bg-slate-900/50 border-t border-slate-800 px-6 md:px-16 py-16">
        <div className="max-w-7xl mx-auto">
          <p className="text-green-500 text-xs font-bold uppercase tracking-widest text-center mb-2">
            Conoce Lubix
          </p>
          <h2 className="text-white text-2xl font-bold text-center mb-10">
            Todo lo que necesitas en un solo lugar
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {infoCards.map((card) => (
              <div
                key={card.titulo}
                className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-green-500/40 hover:shadow-lg hover:shadow-green-500/10 transition-all"
              >
                <div className="w-9 h-9 bg-green-500/10 rounded-lg flex items-center justify-center text-lg mb-3">
                  {card.icon}
                </div>
                <h3 className="text-white font-semibold text-sm mb-2">
                  {card.titulo}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {card.texto}
                </p>
                {card.cta && (
                  <Link
                    to="/register"
                    className="inline-block mt-4 bg-green-500 hover:bg-green-400 text-white text-xs font-bold px-5 py-2 rounded-full transition-all shadow-lg shadow-green-500/30"
                  >
                    Comenzar
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
      
    </div>
  );
}