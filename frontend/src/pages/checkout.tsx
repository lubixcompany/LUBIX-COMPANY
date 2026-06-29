import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useCart } from "../contexts/CartContext";
import { CreditCard, ShoppingBag } from "lucide-react";

export default function Checkout() {
  const { items, getCartTotal, clearCart } = useCart();

  const handlePlaceOrder = () => {
    clearCart();
    window.alert("Compra realizada con éxito. Gracias por tu pedido.");
  };

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
          <Link to="/" className="transition hover:text-emerald-600">Inicio</Link>
          <span>/</span>
          <span>Checkout</span>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.7fr_0.8fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-3 text-emerald-600">
              <CreditCard className="h-6 w-6" />
              <h1 className="text-2xl font-bold">Finalizar compra</h1>
            </div>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">Revisa tu pedido y completa la información para coordinar la entrega.</p>

            <div className="mt-8 space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Detalles del pedido</h2>
                <div className="mt-4 text-sm text-slate-600 dark:text-slate-400">
                  <p>{totalItems} artículos en tu carrito</p>
                  <p className="mt-2">Pago seguro con tarjeta, transferencia o pago en tienda.</p>
                </div>
              </div>
              <div className="grid gap-4 lg:grid-cols-2">
                <label className="block rounded-3xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Nombre completo</span>
                  <input className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white" placeholder="Tu nombre" />
                </label>
                <label className="block rounded-3xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Dirección</span>
                  <input className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white" placeholder="Calle y número" />
                </label>
              </div>
              <div className="grid gap-4 lg:grid-cols-2">
                <label className="block rounded-3xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Correo electrónico</span>
                  <input className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white" placeholder="correo@ejemplo.com" />
                </label>
                <label className="block rounded-3xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Teléfono</span>
                  <input className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white" placeholder="+57 300 000 0000" />
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
            <button onClick={handlePlaceOrder} className="mt-6 w-full rounded-full bg-emerald-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600">Realizar pedido</button>
          </aside>
        </div>
      </div>
      <Footer />
    </div>
  );
}
