import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useCart } from "../contexts/CartContext";
import { allProducts } from "../data/products";
import { ArrowRight, ShoppingCart } from "lucide-react";

const ofertas = [
  {
    titulo: "Oferta 1",
    descripcion: "Hasta 40% en laptops",
    color: "bg-gradient-to-tr from-emerald-500 to-green-700 text-white",
    imagen: "/portatil.png",
  },
  {
    titulo: "Oferta 2",
    descripcion: "Smartphones con 30% de descuento",
    color: "bg-gradient-to-tr from-emerald-950 to-gray-900 text-white",
    imagen: "/iphone.png",
  },
  {
    titulo: "Oferta 3",
    descripcion: "Accesorios 2x1",
    color: "bg-gradient-to-tr from-emerald-500 to-green-700 text-white",
    imagen: "/televisor.png",
  },
];

function Bienvenida() {
  const [index, setIndex] = useState(0);
  const { addToCart } = useCart();
  const featuredProducts = allProducts.slice(0, 4);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % ofertas.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="page-container">
      <Navbar />

      <section className="flex flex-col md:flex-row justify-between items-center px-8 md:px-16 py-20 min-h-[calc(100vh-80px)]" style={{ backgroundColor: "var(--color-bg)" }}>
        <div className="max-w-lg text-center md:text-left mr-8">
          <div className="text-accent mb-2 text-sm font-semibold uppercase tracking-wide">
            Bienvenidos a Lubix
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight" style={{ color: "var(--color-text)" }}>
            Tienda de Tecnología
          </h1>
          <p className="text-lg text-muted mb-6">
            Y <span className="font-bold text-accent">50% de descuento</span> en productos seleccionados.
          </p>
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            <Link className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600" to="/search">
              <ShoppingCart className="h-4 w-4" /> Explorar ofertas
            </Link>
            <Link className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20" to="/search">
              Ver catálogo
            </Link>
          </div>
        </div>

        <div className="mt-10 md:mt-0 w-[420px] h-[500px] rounded-3xl shadow-2xl overflow-hidden flex flex-col items-center justify-between transform transition-all duration-700 ease-in-out hover:scale-105" style={{ backgroundColor: "var(--color-bg-card)" }}>
          <img src={ofertas[index].imagen} alt={ofertas[index].titulo} className="w-full h-64 object-cover" />
          <div className={`w-full flex-1 flex flex-col items-center justify-center p-4 text-center ${ofertas[index].color}`}>
            <h2 className="text-xl font-bold mb-1">{ofertas[index].titulo}</h2>
            <p className="mb-3 text-sm">{ofertas[index].descripcion}</p>
          </div>
          <div className="flex items-center justify-center gap-3 px-4 pb-4">
            {ofertas.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all ${i === index ? "w-8 bg-white" : "w-3 bg-white/50"}`}
              />
            ))}
          </div>
        </div>
      </section>

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

      <section className="px-8 md:px-16 pb-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-500">Productos Destacados</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">Lo mejor de nuestra selección</h2>
            </div>
            <Link to="/search" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-emerald-50">
              Ver catálogo
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {featuredProducts.map((product) => {
              const discountedPrice = product.discount ? product.price - (product.price * product.discount) / 100 : product.price;
              return (
                <div key={product.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
                  <img src={product.image} alt={product.name} className="mb-4 h-52 w-full rounded-3xl object-cover" />
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-500">{product.category}</span>
                  <h3 className="mt-3 text-xl font-semibold text-slate-900 dark:text-white">{product.name}</h3>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 line-clamp-2">{product.description}</p>
                  <div className="mt-4 flex items-center gap-3">
                    <span className="text-2xl font-bold text-emerald-600">${discountedPrice.toLocaleString('es-CO')}</span>
                    {product.discount ? <span className="text-sm text-slate-400 line-through">${product.price.toLocaleString('es-CO')}</span> : null}
                  </div>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <button onClick={() => addToCart({ id: product.id, name: product.name, price: product.price, image: product.image, category: product.category, discount: product.discount })} className="rounded-full bg-emerald-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600">
                      Agregar al carrito
                    </button>
                    <Link to={`/product/${product.id}`} className="inline-flex items-center justify-center rounded-full border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:border-emerald-500 hover:text-emerald-600 dark:border-slate-700 dark:text-slate-100">
                      Ver producto
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Bienvenida;
