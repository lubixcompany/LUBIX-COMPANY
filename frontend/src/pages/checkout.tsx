import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import { CreditCard, ShoppingBag, Loader2, CheckCircle2 } from "lucide-react";

export default function Checkout() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { items, getCartTotal, clearCart } = useCart();

  const [form, setForm] = useState({
    name: user?.name ?? "",
    email: user?.email ?? "",
    address: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  const handlePlaceOrder = async () => {
    if (!form.name || !form.address) {
      setError("Completa nombre y dirección antes de continuar.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await api.post("/catalog/order", {
        items: items.map((i) => ({ product_id: i.id, quantity: i.quantity })),
        delivery_name: form.name,
        delivery_address: form.address,
        delivery_phone: form.phone,
      });
      clearCart();
      setSuccess(true);
      setTimeout(() => navigate("/home-usuario"), 3000);
    } catch {
      setError("Hubo un problema al procesar tu pedido. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        <Navbar />
        <div className="mx-auto flex max-w-md flex-col items-center justify-center px-4 py-32 text-center">
          <CheckCircle2 className="h-16 w-16 text-emerald-500 mb-4" />
          <h1 className="text-2xl font-bold mb-2">¡Pedido recibido!</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">En breve te contactaremos para coordinar la entrega. Serás redirigido automáticamente.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
          <Link to="/carrito" className="transition hover:text-emerald-600">Carrito</Link>
          <span>/</span>
          <span>Checkout</span>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.7fr_0.8fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-3 text-emerald-600">
              <CreditCard className="h-6 w-6" />
              <h1 className="text-2xl font-bold">Finalizar compra</h1>
            </div>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">Completa la información de entrega para coordinar tu pedido.</p>

            {error && (
              <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-400">
                {error}
              </div>
            )}

            <div className="mt-8 space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Detalles del pedido</h2>
                <div className="mt-4 text-sm text-slate-600 dark:text-slate-400">
                  <p>{totalItems} artículos en tu carrito</p>
                  <p className="mt-2">Te contactaremos para coordinar la entrega.</p>
                </div>
              </div>
              <div className="grid gap-4 lg:grid-cols-2">
                <label className="block rounded-3xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Nombre completo</span>
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-emerald-400 dark:border-slate-700 dark:bg-slate-900 dark:text-white" placeholder="Tu nombre" />
                </label>
                <label className="block rounded-3xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Dirección de entrega</span>
                  <input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-emerald-400 dark:border-slate-700 dark:bg-slate-900 dark:text-white" placeholder="Calle y número" />
                </label>
              </div>
              <div className="grid gap-4 lg:grid-cols-2">
                <label className="block rounded-3xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Correo electrónico</span>
                  <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-emerald-400 dark:border-slate-700 dark:bg-slate-900 dark:text-white" placeholder="correo@ejemplo.com" />
                </label>
                <label className="block rounded-3xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Teléfono</span>
                  <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-emerald-400 dark:border-slate-700 dark:bg-slate-900 dark:text-white" placeholder="+57 300 000 0000" />
                </label>
              </div>
            </div>
          </div>

          <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-3 text-emerald-600">
              <ShoppingBag className="h-6 w-6" />
              <div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Resumen de compra</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">Tu carrito está listo para pagar.</p>
              </div>
            </div>
            <div className="mt-6 space-y-4 text-sm text-slate-600 dark:text-slate-400">
              {items.map((item) => {
                const discountedPrice = item.discount ? item.price - (item.price * item.discount) / 100 : item.price;
                return (
                  <div key={item.id} className="flex items-center justify-between gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">{item.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">x{item.quantity}</p>
                    </div>
                    <span className="font-semibold text-slate-900 dark:text-white">${(discountedPrice * item.quantity).toLocaleString('es-CO')}</span>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 border-t border-slate-200 pt-4 text-sm text-slate-600 dark:border-slate-700 dark:text-slate-400">
              <div className="flex justify-between py-2"><span>Productos</span><span>{totalItems}</span></div>
              <div className="flex justify-between py-2"><span>Envío</span><span className="font-semibold text-emerald-600">Gratis</span></div>
              <div className="flex justify-between py-2 text-base font-semibold text-slate-900 dark:text-white"><span>Total</span><span>${getCartTotal().toLocaleString('es-CO')}</span></div>
            </div>
            <button
              onClick={handlePlaceOrder}
              disabled={loading}
              className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600 disabled:opacity-60"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {loading ? "Procesando..." : "Realizar pedido"}
            </button>
          </aside>
        </div>
      </div>
      <Footer />
    </div>
  );
}
