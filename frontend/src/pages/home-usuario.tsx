import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavbarUsuario from "../components/navbarUsuario";
import Footer from "../components/footer";
import { useCart } from "../contexts/CartContext";
import api from "../api/axios";
import { DevicePhoneMobileIcon, ComputerDesktopIcon, SpeakerWaveIcon, CameraIcon, ClockIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

interface ApiProduct {
  id: string;
  name: string;
  price: number;
  images: string[];
  discount_enable: boolean;
  discount_value: number;
  stock: number;
  descripcion: string;
}

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

const HomeUsuario: React.FC = () => {
  const [index, setIndex] = useState(0);
  const { addToCart } = useCart();
  const [featuredProducts, setFeaturedProducts] = useState<ApiProduct[]>([]);

  useEffect(() => {
    api.get("/catalog/products", { params: { limit: 3 } })
      .then((res) => setFeaturedProducts(res.data.results ?? []))
      .catch(() => setFeaturedProducts([]));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % ofertas.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="page-container">
      <NavbarUsuario />

      <section className="flex flex-col md:flex-row justify-between items-center px-8 md:px-16 py-20 min-h-[calc(100vh-80px)]" style={{ backgroundColor: "var(--color-bg)" }}>
        <div className="max-w-lg text-center md:text-left mr-8">
          <div className="text-accent mb-2 text-sm font-semibold uppercase tracking-wide">Hola</div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight" style={{ color: "var(--color-text)" }}>
            Bienvenido de nuevo a Lubix
          </h1>
          <p className="text-lg text-muted mb-6">
            Explora tus <span className="font-bold text-accent">compras, perfil y productos</span> de manera rápida y sencilla.
          </p>
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            <Link to="/search" className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600">
              Ver productos
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <Link to="/carrito" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20">
              Ver carrito
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

      <section className="card px-6 py-8">
        <h2 className="text-3xl font-bold mb-10 text-center">Categorías Principales</h2>
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

      <section className="px-6 py-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-500">Productos Destacados</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">Lleva tus favoritos al carrito</h2>
            </div>
            <Link to="/search" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-emerald-50">
              Ver catálogo
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {featuredProducts.map((product) => {
              const discountedPrice = product.discount_enable && product.discount_value
                ? product.price - (product.price * product.discount_value) / 100
                : product.price;
              const image = product.images?.[0] ?? "";
              return (
                <div key={product.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
                  {image && <img src={image} alt={product.name} className="mb-4 h-52 w-full rounded-3xl object-cover" />}
                  <h3 className="mt-3 text-xl font-semibold text-slate-900 dark:text-white">{product.name}</h3>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 line-clamp-2">{product.descripcion}</p>
                  <div className="mt-4 flex items-center gap-3">
                    <span className="text-2xl font-bold text-emerald-600">${discountedPrice.toLocaleString('es-CO')}</span>
                    {product.discount_enable && product.discount_value ? <span className="text-sm text-slate-400 line-through">${product.price.toLocaleString('es-CO')}</span> : null}
                  </div>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <button
                      onClick={() => addToCart({ id: product.id, name: product.name, price: product.price, image, category: "Producto", discount: product.discount_enable ? product.discount_value : undefined })}
                      className="rounded-full bg-emerald-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
                    >
                      Agregar al carrito
                    </button>
                    <Link
                      to={`/product/${product.id}`}
                      className="inline-flex items-center justify-center rounded-full border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:border-emerald-500 hover:text-emerald-600 dark:border-slate-700 dark:text-slate-100"
                    >
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
};

export default HomeUsuario;
