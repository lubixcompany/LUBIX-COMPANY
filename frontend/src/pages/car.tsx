import Navbar from '../components/navbar';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Cart() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { items, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  const handleRemoveFromCart = (productId: string) => {
    removeFromCart(productId);
  };

  const handleClearCart = () => {
    clearCart();
  };

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleContinuePurchase = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        <Navbar />
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-center px-4 py-20 text-center">
          <div className="mb-6 rounded-full bg-emerald-100 p-6 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
            <ShoppingBag className="h-16 w-16" />
          </div>
          <h2 className="mb-3 text-3xl font-semibold">Tu carrito está vacío</h2>
          <p className="mb-8 max-w-md text-slate-600 dark:text-slate-400">
            Agrega productos para empezar una compra rápida y sencilla.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 rounded-full border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:border-emerald-500 hover:text-emerald-600 dark:border-slate-700 dark:text-slate-300"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver
            </button>
            <Link
              to="/"
              className="rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-600"
            >
              Explorar productos
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-emerald-600 dark:text-slate-400"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver
        </button>

        <div className="mb-8 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-emerald-500">Carrito</p>
            <h1 className="mt-1 text-3xl font-semibold">Productos seleccionados</h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{totalItems} artículos listos para finalizar tu compra.</p>
          </div>
          <button
            onClick={handleClearCart}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-rose-200 px-4 py-2 text-sm font-medium text-rose-600 transition hover:bg-rose-50 dark:border-rose-500/20 dark:text-rose-400 dark:hover:bg-rose-500/10"
          >
            <Trash2 className="h-4 w-4" />
            Vaciar carrito
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.7fr_0.8fr]">
          <div className="space-y-4">
            {items.map((item) => {
              const discountedPrice = item.discount ? item.price - (item.price * item.discount) / 100 : item.price;
              return (
                <div key={item.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <img src={item.image} alt={item.name} className="h-28 w-full rounded-xl object-cover sm:w-28" />
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-medium text-emerald-500">{item.category}</p>
                          <h3 className="text-lg font-semibold">{item.name}</h3>
                        </div>
                        <button onClick={() => handleRemoveFromCart(item.id)} className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-rose-500 dark:hover:bg-slate-800">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="mt-3 flex flex-wrap items-center gap-3">
                        <span className="text-xl font-semibold text-emerald-600">${discountedPrice.toLocaleString('es-CO')}</span>
                        {item.discount ? <span className="text-sm text-slate-400 line-through">${item.price.toLocaleString('es-CO')}</span> : null}
                      </div>
                      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2 rounded-full border border-slate-200 p-1 dark:border-slate-700">
                          <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)} className="rounded-full p-2 transition hover:bg-slate-100 dark:hover:bg-slate-800">
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="min-w-8 text-center text-sm font-semibold">{item.quantity}</span>
                          <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)} className="rounded-full p-2 transition hover:bg-slate-100 dark:hover:bg-slate-800">
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <span className="text-sm text-slate-600 dark:text-slate-400">Subtotal: <span className="font-semibold text-slate-900 dark:text-white">${(discountedPrice * item.quantity).toLocaleString('es-CO')}</span></span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-xl font-semibold">Resumen de compra</h2>
            <div className="mt-5 space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <div className="flex justify-between"><span>Productos</span><span>{totalItems}</span></div>
              <div className="flex justify-between"><span>Envío</span><span className="font-semibold text-emerald-600">Gratis</span></div>
              <div className="flex justify-between border-t border-slate-200 pt-3 text-base font-semibold text-slate-900 dark:border-slate-700 dark:text-white"><span>Total</span><span>${getCartTotal().toLocaleString('es-CO')}</span></div>
            </div>
            <button onClick={handleContinuePurchase} className="mt-6 w-full rounded-full bg-emerald-500 px-4 py-3 font-semibold text-white transition hover:bg-emerald-600">Continuar compra</button>
            <Link to="/" className="mt-3 block text-center text-sm font-medium text-slate-500 transition hover:text-emerald-600">Seguir comprando</Link>
          </aside>
        </div>
      </div>
    </div>
  );
}
