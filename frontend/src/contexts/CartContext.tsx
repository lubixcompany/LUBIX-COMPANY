import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useAuth } from '../context/AuthContext';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  discount?: number;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartCount: () => number;
  getCartTotal: () => number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const cartKey = `lubix-cart-${user?.id ?? 'guest'}`;

  const [items, setItems] = useState<CartItem[]>([]);

  // Carga el carrito del usuario cuando cambia (login / logout)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = window.localStorage.getItem(cartKey);
    try {
      setItems(stored ? (JSON.parse(stored) as CartItem[]) : []);
    } catch {
      setItems([]);
    }
  }, [cartKey]);

  // Persiste el carrito en la clave del usuario actual
  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(cartKey, JSON.stringify(items));
  }, [items, cartKey]);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setItems((current) => {
      const existing = current.find((entry) => entry.id === item.id);
      if (existing) {
        return current.map((entry) =>
          entry.id === item.id ? { ...entry, quantity: entry.quantity + 1 } : entry
        );
      }
      return [...current, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setItems((current) => current.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setItems((current) =>
      current
        .map((item) => (item.id === productId ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => setItems([]);

  const getCartCount = () => items.reduce((total, item) => total + item.quantity, 0);

  const getCartTotal = () =>
    items.reduce((total, item) => {
      const discountedPrice = item.discount ? item.price - (item.price * item.discount) / 100 : item.price;
      return total + discountedPrice * item.quantity;
    }, 0);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartCount,
      getCartTotal,
    }),
    [items]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
