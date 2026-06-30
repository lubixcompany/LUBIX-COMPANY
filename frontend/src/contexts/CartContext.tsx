import { createContext, useContext, useEffect, useMemo, useState } from 'react';

export interface CartItem {
  id: number;
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
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getCartCount: () => number;
  getCartTotal: () => number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') return [];
    const stored = window.localStorage.getItem('lubix-cart');
    if (!stored) return [];
    try {
      return JSON.parse(stored) as CartItem[];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    window.localStorage.setItem('lubix-cart', JSON.stringify(items));
  }, [items]);

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

  const removeFromCart = (productId: number) => {
    setItems((current) => current.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
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
