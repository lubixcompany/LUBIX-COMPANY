import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import { ArrowLeft, ShoppingCart, CheckCircle, Loader2 } from "lucide-react";

interface ApiProduct {
  id: string;
  name: string;
  price: number;
  images: string[];
  discount_enable: boolean;
  discount_value: number;
  stock: number;
  descripcion: string;
  technical_spec?: string;
  company?: { id: string; name: string } | null;
}

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, items } = useCart();
  const { isAuthenticated } = useAuth();

  const [product, setProduct] = useState<ApiProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) { setNotFound(true); setLoading(false); return; }
    setLoading(true);
    api.get(`/catalog/products/${id}`)
      .then((res) => { setProduct(res.data); setLoading(false); })
      .catch(() => { setNotFound(true); setLoading(false); });
  }, [id]);

  const isInCart = product ? items.some((i) => i.id === product.id) : false;

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        <Navbar />
        <div className="flex items-center justify-center py-32">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
        </div>
      </div>
    );
  }

  if (notFound || !product) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        <Navbar />
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-center px-4 py-24 text-center">
          <h1 className="text-3xl font-semibold mb-4">Producto no encontrado</h1>
          <p className="mb-8 text-slate-600 dark:text-slate-400">El producto que buscas no existe o fue removido.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:border-emerald-500 hover:text-emerald-600 dark:border-slate-700 dark:text-slate-300"
            >
              <ArrowLeft className="h-4 w-4" /> Volver
            </button>
            <Link to="/search" className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-600">
              Ver catálogo
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const discountedPrice = product.discount_enable && product.discount_value
    ? product.price - (product.price * product.discount_value) / 100
    : product.price;
  const image = product.images?.[0] ?? "";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
          <button onClick={() => navigate(-1)} className="rounded-full border border-slate-200 bg-white px-3 py-2 transition hover:border-emerald-500 dark:border-slate-700">
            <ArrowLeft className="h-4 w-4" />
          </button>
          <Link to="/search" className="hover:text-emerald-600 transition">Catálogo</Link>
          <span>/</span>
          <span className="line-clamp-1">{product.name}</span>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            {image
              ? <img src={image} alt={product.name} className="mb-6 h-96 w-full rounded-3xl object-cover" />
              : <div className="mb-6 h-96 w-full rounded-3xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 text-sm">Sin imagen</div>
            }
            <div className="flex flex-wrap items-center gap-3">
              {product.company && (
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">{product.company.name}</span>
              )}
              {product.discount_enable && product.discount_value ? (
                <span className="rounded-full bg-yellow-400/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-yellow-700">-{product.discount_value}%</span>
              ) : null}
            </div>
            <h1 className="mt-4 text-3xl font-bold text-slate-900 dark:text-white">{product.name}</h1>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">{product.descripcion}</p>
            {product.technical_spec && (
              <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">{product.technical_spec}</p>
            )}
            <div className="mt-6 flex items-center gap-4">
              <span className="text-3xl font-bold text-emerald-600">${discountedPrice.toLocaleString('es-CO')}</span>
              {product.discount_enable && product.discount_value
                ? <span className="text-sm text-slate-400 line-through">${product.price.toLocaleString('es-CO')}</span>
                : null}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              {!isAuthenticated ? (
                <Link to="/login" className="inline-flex items-center gap-2 rounded-full bg-emerald-500/60 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500">
                  <ShoppingCart className="h-4 w-4" /> Inicia sesión para comprar
                </Link>
              ) : isInCart ? (
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 px-5 py-3 text-sm font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:border-emerald-500/30 dark:text-emerald-400">
                  <CheckCircle className="h-4 w-4" /> Ya está en tu carrito
                </div>
              ) : (
                <button
                  onClick={() => addToCart({ id: product.id, name: product.name, price: product.price, image, category: product.company?.name ?? "Producto", discount: product.discount_enable ? product.discount_value : undefined })}
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
                >
                  <ShoppingCart className="h-4 w-4" /> Agregar al carrito
                </button>
              )}
              <Link to="/carrito" className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-emerald-500 hover:text-emerald-600 dark:border-slate-700 dark:text-slate-100">
                Ver carrito
              </Link>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
                <p className="font-semibold">Disponibilidad</p>
                <p>{product.stock > 0 ? `${product.stock} en stock` : 'Agotado'}</p>
              </div>
            </div>
          </div>

          <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Resumen rápido</h2>
            <div className="mt-5 space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <div className="flex justify-between"><span>Precio</span><span>${discountedPrice.toLocaleString('es-CO')}</span></div>
              <div className="flex justify-between"><span>Envío</span><span className="font-semibold text-emerald-600">Gratis</span></div>
              <div className="flex justify-between"><span>Entrega</span><span>2-4 días</span></div>
              <div className="flex justify-between border-t border-slate-200 pt-3 text-base font-semibold text-slate-900 dark:border-slate-700 dark:text-white"><span>Total</span><span>${discountedPrice.toLocaleString('es-CO')}</span></div>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}
