import React, { useState, useEffect, useRef } from "react";
import NavbarUsuario from "../components/navbaruser";
import { Link } from "react-router-dom";
import {
  UserIcon,
  CubeIcon,
  HeartIcon,
  ShieldCheckIcon,
  MapPinIcon,
  ChevronRightIcon,
  ShoppingBagIcon,
  ClockIcon,
  CheckCircleIcon,
  TruckIcon,
  PencilSquareIcon,
  CameraIcon,
  PhoneIcon,
  EnvelopeIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid, StarIcon as StarSolid } from "@heroicons/react/24/solid";
import {
  getUserProfile,
  getUserOrders,
  getUserSaved,
  type UserProfile,
  type Order,
  type SavedProduct,
} from "../api/userApi"; 

type StatusKey = "entregado" | "en camino" | "procesando";

type StatusCfg = {
  label: string;
  Icon: React.ElementType;
  color: string;
  bg: string;
};

// ─── Config de estados ────────────────────────────────────────────────────────
const statusConfig: Record<StatusKey, StatusCfg> = {
  entregado: {
    label: "Entregado",
    Icon: CheckCircleIcon,
    color: "text-[var(--color-success)]",
    bg: "bg-green-500/10 border-green-500/30",
  },
  "en camino": {
    label: "En camino",
    Icon: TruckIcon,
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/30",
  },
  procesando: {
    label: "Procesando",
    Icon: ClockIcon,
    color: "text-yellow-400",
    bg: "bg-yellow-500/10 border-yellow-500/30",
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const formatCOP = (n: number) => `$${n.toLocaleString("es-CO")}`;
const formatM   = (n: number) => `$${(n / 1000000).toFixed(1)}M`;

// ─── Skeleton de carga ────────────────────────────────────────────────────────
function Skeleton({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-[var(--color-border)] rounded-lg ${className ?? ""}`} />
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────
export default function DashboardUsuario() {
  const [activeTab, setActiveTab]       = useState<Tab>("overview");
  const [profile, setProfile]           = useState<UserProfile | null>(null);
  const [orders, setOrders]             = useState<Order[]>([]);
  const [savedProducts, setSaved]       = useState<SavedProduct[]>([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState<string | null>(null);
  const isInitialized                   = useRef(false);

  // ── Carga de datos ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    async function loadDashboard() {
      try {
        setLoading(true);
        // Las 3 llamadas en paralelo — más rápido que hacerlas una por una
        const [profileData, ordersData, savedData] = await Promise.all([
          getUserProfile(),
          getUserOrders(),
          getUserSaved(),
        ]);
        setProfile(profileData);
        setOrders(ordersData);
        setSaved(savedData);
      } catch (err) {
        setError("No se pudo cargar el dashboard. Intenta de nuevo.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  // ── Tabs ────────────────────────────────────────────────────────────────────
  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "overview", label: "Resumen",     icon: <UserIcon       className="w-4 h-4" /> },
    { id: "orders",   label: "Mis Pedidos", icon: <CubeIcon       className="w-4 h-4" /> },
    { id: "saved",    label: "Guardados",   icon: <HeartIcon      className="w-4 h-4" /> },
    { id: "profile",  label: "Mi Perfil",   icon: <ShieldCheckIcon className="w-4 h-4" /> },
  ];

  // ── Estado de error ─────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)]">
        <NavbarUsuario />
        <div className="flex flex-col items-center justify-center h-96 gap-4">
          <p className="text-[var(--color-error)] font-medium">{error}</p>
          <button
            className="btn-primary px-6 py-2"
            onClick={() => { isInitialized.current = false; window.location.reload(); }}
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <NavbarUsuario />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ── HEADER PERFIL ────────────────────────────────────────────────── */}
        <div className="bg-gradient-to-r from-[var(--color-accent)] to-blue-600 rounded-2xl p-8 mb-8 shadow-xl shadow-[var(--color-accent)]/20">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">

            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-20 h-20 bg-[var(--color-bg)] rounded-full flex items-center justify-center text-3xl font-bold text-[var(--color-accent)] border-4 border-white/20 shadow-lg">
                {loading ? "·" : profile?.avatar}
              </div>
              <button className="absolute bottom-0 right-0 w-7 h-7 bg-[var(--color-accent)] rounded-full flex items-center justify-center shadow-md hover:opacity-90 transition-opacity">
                <CameraIcon className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              {loading ? (
                <div className="space-y-2">
                  <Skeleton className="h-8 w-64" />
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-4 w-72" />
                </div>
              ) : (
                <>
                  <h1 className="text-3xl font-bold text-white mb-1">{profile?.name}</h1>
                  <p className="text-blue-100 mb-3">{profile?.email}</p>
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-white/80">
                    <span className="flex items-center gap-1.5">
                      <CalendarIcon className="w-4 h-4" />
                      Miembro desde {profile?.memberSince}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <ShoppingBagIcon className="w-4 h-4" />
                      {profile?.stats.orders} compras realizadas
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Editar */}
            <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-xl transition-colors border border-white/20 text-sm font-medium">
              <PencilSquareIcon className="w-4 h-4" />
              Editar perfil
            </button>
          </div>
        </div>

        {/* ── TABS ─────────────────────────────────────────────────────────── */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium whitespace-nowrap transition-all text-sm ${
                activeTab === tab.id
                  ? "bg-[var(--color-accent)] text-white shadow-lg shadow-[var(--color-accent)]/30"
                  : "bg-[var(--color-bg-card)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] border border-[var(--color-border)]"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── OVERVIEW ─────────────────────────────────────────────────────── */}
        {activeTab === "overview" && (
          <div className="space-y-6">

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-24" />
                ))
              ) : (
                [
                  { label: "Pedidos",       value: profile?.stats.orders,               icon: <CubeIcon        className="w-5 h-5 text-blue-400" /> },
                  { label: "Total gastado", value: formatM(profile?.stats.spent ?? 0),  icon: <ShoppingBagIcon className="w-5 h-5 text-[var(--color-accent)]" /> },
                  { label: "Guardados",     value: profile?.stats.saved,                icon: <HeartSolid      className="w-5 h-5 text-pink-400" /> },
                  { label: "Direcciones",   value: profile?.stats.addresses,            icon: <MapPinIcon      className="w-5 h-5 text-yellow-400" /> },
                ].map((stat) => (
                  <div key={stat.label} className="card p-5 hover:border-[var(--color-accent)]/30 transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[var(--color-text-muted)] text-sm">{stat.label}</span>
                      {stat.icon}
                    </div>
                    <p className="text-2xl font-bold text-[var(--color-text)]">{stat.value}</p>
                  </div>
                ))
              )}
            </div>

            {/* Pedidos recientes */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-[var(--color-text)]">Pedidos recientes</h2>
                <button
                  onClick={() => setActiveTab("orders")}
                  className="flex items-center gap-1 text-[var(--color-accent)] hover:opacity-80 text-sm transition-opacity"
                >
                  Ver todos <ChevronRightIcon className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3">
                {loading ? (
                  Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-16" />)
                ) : (
                  orders.slice(0, 3).map((order) => {
                    const s = statusConfig[order.status as StatusKey];
                    return (
                      <div
                        key={order.id}
                        className="flex items-center gap-4 p-3 rounded-xl bg-[var(--color-bg)]/60 border border-[var(--color-border)] hover:border-[var(--color-accent)]/30 transition-all cursor-pointer"
                      >
                        <img src={order.image} alt={order.product} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-[var(--color-text)] font-medium truncate">{order.product}</p>
                          <p className="text-[var(--color-text-muted)] text-sm">{order.id} · {order.seller}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-[var(--color-accent)] font-bold">{formatCOP(order.price)}</p>
                          <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full border mt-1 ${s.color} ${s.bg}`}>
                            <s.Icon className="w-4 h-4" /> {s.label}
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Guardados preview */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-[var(--color-text)]">Productos guardados</h2>
                <button
                  onClick={() => setActiveTab("saved")}
                  className="flex items-center gap-1 text-[var(--color-accent)] hover:opacity-80 text-sm transition-opacity"
                >
                  Ver todos <ChevronRightIcon className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {loading ? (
                  Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-48" />)
                ) : (
                  savedProducts.map((p) => (
                    <div key={p.id} className="rounded-xl overflow-hidden bg-[var(--color-bg)] border border-[var(--color-border)] hover:border-[var(--color-accent)]/30 transition-all group cursor-pointer">
                      <div className="relative">
                        <img src={p.image} alt={p.name} className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300" />
                        <button className="absolute top-2 right-2 w-8 h-8 bg-[var(--color-bg-card)]/80 rounded-full flex items-center justify-center backdrop-blur-sm">
                          <HeartSolid className="w-4 h-4 text-pink-400" />
                        </button>
                      </div>
                      <div className="p-3">
                        <p className="text-[var(--color-text)] text-sm font-medium line-clamp-1">{p.name}</p>
                        <div className="flex items-center justify-between mt-1.5">
                          <span className="text-[var(--color-accent)] font-bold text-sm">{formatM(p.price)}</span>
                          <div className="flex items-center gap-1">
                            <StarSolid className="w-3.5 h-3.5 text-yellow-400" />
                            <span className="text-[var(--color-text-muted)] text-xs">{p.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── MIS PEDIDOS ──────────────────────────────────────────────────── */}
        {activeTab === "orders" && (
          <div className="card p-6">
            <h2 className="text-xl font-bold text-[var(--color-text)] mb-6">Todos mis pedidos</h2>
            <div className="space-y-4">
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-20" />)
              ) : (
                orders.map((order) => {
                  const s = statusConfig[order.status as StatusKey];
                  return (
                    <div
                      key={order.id}
                      className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)] hover:border-[var(--color-accent)]/30 transition-all cursor-pointer"
                    >
                      <img src={order.image} alt={order.product} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-[var(--color-text)] font-semibold">{order.product}</p>
                        <p className="text-[var(--color-text-muted)] text-sm mt-0.5">{order.id} · Vendedor: {order.seller}</p>
                        <p className="text-[var(--color-text-muted)] text-xs mt-0.5">{order.date}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2 flex-shrink-0">
                        <p className="text-[var(--color-accent)] font-bold text-lg">{formatCOP(order.price)}</p>
                        <span className={`inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full border font-medium ${s.color} ${s.bg}`}>
                          <s.Icon className="w-4 h-4" /> {s.label}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* ── GUARDADOS ────────────────────────────────────────────────────── */}
        {activeTab === "saved" && (
          <div className="card p-6">
            <h2 className="text-xl font-bold text-[var(--color-text)] mb-6">Productos guardados</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-64" />)
              ) : (
                savedProducts.map((p) => (
                  <div key={p.id} className="rounded-xl overflow-hidden bg-[var(--color-bg)] border border-[var(--color-border)] hover:border-[var(--color-accent)]/30 transition-all group">
                    <div className="relative">
                      <img src={p.image} alt={p.name} className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300" />
                      <button className="absolute top-3 right-3 w-8 h-8 bg-[var(--color-bg-card)]/80 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-red-500/20 transition-colors">
                        <HeartSolid className="w-4 h-4 text-pink-400" />
                      </button>
                    </div>
                    <div className="p-4">
                      <p className="text-[var(--color-text)] font-semibold mb-2">{p.name}</p>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[var(--color-accent)] font-bold text-lg">{formatCOP(p.price)}</span>
                        <div className="flex items-center gap-1">
                          <StarSolid className="w-4 h-4 text-yellow-400" />
                          <span className="text-[var(--color-text-muted)] text-sm">{p.rating}</span>
                        </div>
                      </div>
                      <button className="btn-primary w-full py-2 text-sm">Agregar al carrito</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ── MI PERFIL ────────────────────────────────────────────────────── */}
        {activeTab === "profile" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Info personal */}
            <div className="card p-6">
              <h2 className="text-lg font-bold text-[var(--color-text)] mb-5 flex items-center gap-2">
                <UserIcon className="w-5 h-5 text-blue-400" />
                Información personal
              </h2>
              <div className="space-y-3">
                {loading ? (
                  Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-14" />)
                ) : (
                  [
                    { label: "Nombre completo",    value: profile?.name,         icon: <UserIcon      className="w-4 h-4 text-[var(--color-text-muted)]" /> },
                    { label: "Correo electrónico", value: profile?.email,        icon: <EnvelopeIcon  className="w-4 h-4 text-[var(--color-text-muted)]" /> },
                    { label: "Teléfono",           value: profile?.phone,        icon: <PhoneIcon     className="w-4 h-4 text-[var(--color-text-muted)]" /> },
                    { label: "Miembro desde",      value: profile?.memberSince,  icon: <CalendarIcon  className="w-4 h-4 text-[var(--color-text-muted)]" /> },
                  ].map((field) => (
                    <div key={field.label} className="flex items-center gap-3 p-3 bg-[var(--color-bg)] rounded-lg border border-[var(--color-border)]">
                      {field.icon}
                      <div className="flex-1">
                        <p className="text-[var(--color-text-muted)] text-xs">{field.label}</p>
                        <p className="text-[var(--color-text)] text-sm font-medium">{field.value}</p>
                      </div>
                      <button className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors">
                        <PencilSquareIcon className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
              <button className="btn-primary w-full mt-5 py-2.5 text-sm">Guardar cambios</button>
            </div>

            {/* Columna derecha */}
            <div className="space-y-5">

              {/* Direcciones */}
              <div className="card p-6">
                <h2 className="text-lg font-bold text-[var(--color-text)] mb-4 flex items-center gap-2">
                  <MapPinIcon className="w-5 h-5 text-yellow-400" />
                  Direcciones guardadas
                </h2>
                <div className="space-y-3 mb-3">
                  {loading ? (
                    Array.from({ length: 2 }).map((_, i) => <Skeleton key={i} className="h-14" />)
                  ) : (
                    profile?.addresses.map((addr) => (
                      <div key={addr.label} className="flex items-start gap-3 p-3 bg-[var(--color-bg)] rounded-lg border border-[var(--color-border)]">
                        <MapPinIcon className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-[var(--color-accent)] text-xs font-semibold uppercase tracking-wide">{addr.label}</p>
                          <p className="text-[var(--color-text)] text-sm">{addr.value}</p>
                        </div>
                        <button className="text-[var(--color-text-muted)] hover:text-blue-400 transition-colors">
                          <PencilSquareIcon className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
                <button className="w-full py-2 border border-dashed border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] rounded-lg text-sm transition-colors">
                  + Agregar dirección
                </button>
              </div>

              {/* Seguridad */}
              <div className="card p-6">
                <h2 className="text-lg font-bold text-[var(--color-text)] mb-4 flex items-center gap-2">
                  <ShieldCheckIcon className="w-5 h-5 text-[var(--color-accent)]" />
                  Seguridad
                </h2>
                <div className="space-y-2">
                  {["Cambiar contraseña", "Verificación en 2 pasos", "Sesiones activas"].map((item) => (
                    <button
                      key={item}
                      className="w-full flex items-center justify-between p-3 bg-[var(--color-bg)] border border-[var(--color-border)] hover:border-[var(--color-accent)]/30 rounded-lg transition-colors"
                    >
                      <span className="text-[var(--color-text)] text-sm">{item}</span>
                      <ChevronRightIcon className="w-4 h-4 text-[var(--color-text-muted)]" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}