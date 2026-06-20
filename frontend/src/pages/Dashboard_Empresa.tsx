// src/pages/CompanyDashboard.tsx
import { useEffect, useState, useRef } from "react";

type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
  sales: number;
  views: number;
  rating: number;
  status: string;
};

type Company = {
  name: string;
  email: string;
  phone: string;
  memberSince: string;
  rating: number;
  reviews: number;
  sales: number;
  level: string;
  progress: number;
};

export default function CompanyDashboard() {
  const [company, setCompany] = useState<Company | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    // Simulación de endpoints
    setCompany({
      name: "TechStore Colombia",
      email: "techstore@gmail.com",
      phone: "+57 301 987 6543",
      memberSince: "Marzo 2024",
      rating: 4.8,
      reviews: 856,
      sales: 1247,
      level: "Platinum",
      progress: 78,
    });

    setProducts([
      { id: "1", name: "MacBook Pro 14'' M3 Pro", price: 11250000, stock: 12, sales: 89, views: 3420, rating: 4.9, status: "Activo" },
      { id: "2", name: "Auriculares Inalámbricos Premium", price: 1350000, stock: 45, sales: 234, views: 5680, rating: 4.7, status: "Activo" },
      { id: "3", name: "iPhone 15 Pro Max - 256GB", price: 5400000, stock: 8, sales: 156, views: 8920, rating: 4.8, status: "Inactivo" },
      { id: "4", name: "Cámara Canon EOS R5", price: 17550000, stock: 3, sales: 43, views: 2340, rating: 5, status: "Activo" },
    ]);
  }, []);

  if (!company) return <p>Cargando...</p>;

  return (
    <div className="page-container p-6">
      {/* BANNER DE EMPRESA */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-light)] rounded-xl p-6 md:p-8 mb-8 shadow-lg">
        <div className="mb-4 md:mb-0">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">{company.name}</h1>
          <p className="text-white/90 mb-1">{company.email} — {company.phone}</p>
          <p className="text-white/80 text-sm mb-2">Miembro desde {company.memberSince}</p>
          <p className="text-white/90 text-sm">⭐ {company.rating} ({company.reviews} reseñas) — {company.sales} ventas</p>
          <p className="text-white/80 text-sm">Nivel: <strong>{company.level}</strong> ({company.progress}%)</p>
        </div>
        <button className="btn-secondary px-6 py-2 whitespace-nowrap">Editar perfil</button>
      </header>

      {/* ESTADÍSTICAS */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        {[
          { label: "Productos activos", value: "3" },
          { label: "Ventas totales", value: company.sales },
          { label: "Ingresos totales", value: "$2914.2M" },
          { label: "Calificación", value: company.rating }
        ].map(stat => (
          <div key={stat.label} className="card p-6 text-center hover:shadow-lg hover:-translate-y-2 transition-all">
            <h3 className="text-sm uppercase text-[var(--color-text-muted)] font-semibold tracking-wide mb-2">{stat.label}</h3>
            <span className="text-3xl font-bold text-[var(--color-accent)]">{stat.value}</span>
          </div>
        ))}
      </section>

      {/* MIS PRODUCTOS */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 pb-3 border-b-2 border-[var(--color-accent)]">Mis Productos ({products.length})</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
          {products.map(p => (
            <div key={p.id} className="card p-5 hover:shadow-lg hover:border-[var(--color-accent)] transition-all">
              <h3 className="font-semibold text-[var(--color-text)] mb-3">{p.name}</h3>
              <div className="space-y-2 text-sm text-[var(--color-text-muted)] mb-4">
                <p><strong className="text-[var(--color-text)]">Precio:</strong> ${p.price.toLocaleString()}</p>
                <p><strong className="text-[var(--color-text)]">Stock:</strong> {p.stock}</p>
                <p><strong className="text-[var(--color-text)]">Vendidos:</strong> {p.sales}</p>
                <p><strong className="text-[var(--color-text)]">Vistas:</strong> {p.views.toLocaleString()}</p>
                <p className="text-[var(--color-accent)] font-semibold">⭐ {p.rating}</p>
              </div>
              <button className={`w-full py-2 px-3 rounded-md font-semibold text-sm uppercase tracking-wider transition-all ${
                p.status === "Activo"
                  ? "bg-red-500/20 text-red-500 hover:bg-red-500/30"
                  : "bg-[var(--color-success)] text-[var(--color-success-text)] hover:opacity-80"
              }`}>
                {p.status === "Activo" ? "Desactivar" : "Activar"}
              </button>
            </div>
          ))}
        </div>
        <button className="btn-primary px-6 py-3">Agregar producto</button>
      </section>

      {/* RENDIMIENTO */}
      <section>
        <h2 className="text-2xl font-bold mb-4 pb-3 border-b-2 border-[var(--color-accent)]">Rendimiento por producto</h2>
        <div className="space-y-4">
          {products.map(p => (
            <div key={p.id} className="card p-4 hover:shadow-lg hover:border-[var(--color-accent)] transition-all">
              <div className="flex justify-between items-center mb-3">
                <p className="font-semibold text-[var(--color-text)]">{p.name}</p>
                <span className="text-[var(--color-accent)] font-bold">{p.sales} vendidos</span>
              </div>
              <div className="w-full bg-[var(--color-bg-secondary)] rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-light)] h-3 rounded-full transition-all duration-500"
                  style={{ width: `${(p.sales / 300) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

