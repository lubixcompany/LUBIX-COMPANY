
// src/pages/UserDashboard.tsx
import NavbarUsuario from "../components/navbaruser";
import { useEffect, useState, useRef } from "react";


type Order = {
  id: string;
  product: string;
  vendor: string;
  code: string;
  date: string;
  price: number;
  status: string;
};

type Product = {
  id: string;
  name: string;
  price: number;
  rating: number;
  image: string;
};

type User = {
  name: string;
  email: string;
  phone: string;
  memberSince: string;
  stats: {
    orders: number;
    spent: number;
    saved: number;
    addresses: number;
  };
  addresses: { label: string; value: string }[];
};

export default function UserDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [saved, setSaved] = useState<Product[]>([]);
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    // Simulación de endpoints
    setUser({
      name: "Carlos Andrés Gómez",
      email: "carlos.gomez@gmail.com",
      phone: "+57 311 234 5678",
      memberSince: "Enero 2023",
      stats: { orders: 34, spent: 8.8, saved: 12, addresses: 2 },
      addresses: [
        { label: "CASA", value: "Calle 72 #10-34, Bogotá" },
        { label: "TRABAJO", value: "Av. El Dorado #103-15, Bogotá" },
      ],
    });

    setOrders([
      {
        id: "1",
        product: "MacBook Pro 14'' M3 Pro",
        vendor: "TechStore Colombia",
        code: "LBX-20240301",
        date: "2024-03-01",
        price: 11250000,
        status: "Entregado",
      },
      {
        id: "2",
        product: "iPhone 15 Pro Max - 256GB",
        vendor: "TechStore Colombia",
        code: "LBX-20240218",
        date: "2024-02-18",
        price: 5400000,
        status: "En camino",
      },
    ]);

    setSaved([
      { id: "1", name: "Sony PlayStation 5", price: 3200000, rating: 4.9, image: "ps5.png" },
      { id: "2", name: "Monitor LG UltraWide 34\"", price: 4100000, rating: 4.7, image: "monitor.png" },
      { id: "3", name: "Tablet Samsung Galaxy S9", price: 2850000, rating: 4.6, image: "tablet.png" },
    ]);
  }, []);

  if (!user) return <p>Cargando...</p>;

  return (
    <div className="page-container p-6">
      <NavbarUsuario />
      {/* BANNER DE PERFIL */}
        <div className="grid md:grid-cols-3 gap-8 mt-12">
        </div>
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-light)] rounded-xl p-6 md:p-8 mb-8 shadow-lg">
        <div className="mb-4 md:mb-0">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{user.name}</h1>
          <p className="text-white/90 mb-1">{user.email}</p>
          <p className="text-white/80 text-sm">Miembro desde {user.memberSince} — {user.stats.orders} compras</p>
        </div>
        <button className="btn-secondary px-6 py-2 whitespace-nowrap">Editar perfil</button>
      </header>

      {/* ESTADÍSTICAS */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        {[
          { label: "Pedidos", value: user.stats.orders },
          { label: "Total gastado", value: `$${user.stats.spent}M` },
          { label: "Guardados", value: user.stats.saved },
          { label: "Direcciones", value: user.stats.addresses }
        ].map(stat => (
          <div key={stat.label} className="card p-6 text-center hover:shadow-lg hover:-translate-y-2 transition-all">
            <h3 className="text-sm uppercase text-[var(--color-text-muted)] font-semibold tracking-wide mb-2">{stat.label}</h3>
            <span className="text-3xl font-bold text-[var(--color-accent)]">{stat.value}</span>
          </div>
        ))}
      </section>

      {/* PEDIDOS RECIENTES */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 pb-3 border-b-2 border-[var(--color-accent)]">Pedidos recientes</h2>
        <div className="space-y-3">
          {orders.map(o => (
            <div key={o.id} className="card p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-[var(--color-accent)] transition-all">
              <div className="flex-1">
                <h3 className="font-semibold text-[var(--color-text)] mb-1">{o.product}</h3>
                <p className="text-sm text-[var(--color-text-muted)]">{o.vendor} — #{o.code}</p>
              </div>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <p className="font-bold text-[var(--color-accent)] text-lg">${o.price.toLocaleString()}</p>
                <span className={`px-3 py-1 rounded-md text-xs font-semibold uppercase tracking-wider ${
                  o.status === "Entregado" ? "bg-[var(--color-success)] text-[var(--color-success-text)]" :
                  o.status === "En camino" ? "bg-blue-500/20 text-blue-500" :
                  "bg-orange-500/20 text-orange-500"
                }`}>
                  {o.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCTOS GUARDADOS */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 pb-3 border-b-2 border-[var(--color-accent)]">Productos guardados</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {saved.map(p => (
            <div key={p.id} className="card p-4 overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all">
              <div className="w-full h-40 bg-[var(--color-bg-secondary)] rounded-lg mb-3 flex items-center justify-center">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-semibold text-[var(--color-text)] mb-2 line-clamp-2">{p.name}</h3>
              <p className="font-bold text-[var(--color-accent)] text-lg mb-1">${p.price.toLocaleString()}</p>
              <p className="text-sm text-[var(--color-accent)] font-semibold mb-3">⭐ {p.rating}</p>
              <button className="btn-primary py-2 text-sm w-full">Agregar al carrito</button>
            </div>
          ))}
        </div>
      </section>

      {/* PERFIL */}
      <section>
        <h2 className="text-2xl font-bold mb-4 pb-3 border-b-2 border-[var(--color-accent)]">Mi Perfil</h2>
        <div className="card p-6">
          <p className="mb-4"><strong className="text-[var(--color-text)]">Teléfono:</strong> <span className="text-[var(--color-text-muted)]"> {user.phone}</span></p>
          <h3 className="font-semibold text-[var(--color-text)] mb-3 mt-6">Direcciones guardadas</h3>
          <ul className="space-y-2">
            {user.addresses.map(a => (
              <li key={a.label} className="text-sm text-[var(--color-text-muted)]">
                <strong className="text-[var(--color-text)]">{a.label}:</strong> {a.value}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
