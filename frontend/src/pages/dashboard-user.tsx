import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarUsuario from "../components/navbarUsuario";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";
import {
  UserIcon,
  ShoppingBagIcon,
  HeartIcon,
  MapPinIcon,
  ShieldCheckIcon,
  CalendarIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  ArrowLeftIcon,
  PencilSquareIcon,
  XMarkIcon,
  PhotoIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { ProfileHeader } from "../components/dashboard-user/ProfileHeader";
import { DashboardTabs } from "../components/dashboard-user/DashboardTabs";
import { EditableField } from "../components/dashboard-user/EditableField";
import { EmptyStateCard } from "../components/dashboard-user/EmptyStateCard";
import type { Address, Modal, Order, ProfileData, SavedProduct, Tab } from "../components/dashboard-user/types";

const EMPTY_PROFILE: ProfileData = {
  name: "",
  email: "",
  phone: "",
  memberSince: "",
  avatarColor: "from-blue-500 to-indigo-600",
  avatarUrl: null,
};

const SAMPLE_ORDERS: Order[] = [
  {
    id: "PED-8422",
    product: "Laptop Gaming GX-16",
    image: "/macbook.png",
    price: 4850000,
    status: "en camino",
    date: "21 Jun 2026",
    seller: "Lubix Oficial",
    tracking: "TRK-33475",
  },
  {
    id: "PED-9931",
    product: "Auriculares Wireless Pro",
    image: "/headphones.png",
    price: 1080000,
    status: "procesando",
    date: "18 Jun 2026",
    seller: "Lubix Oficial",
  },
];

const SAMPLE_SAVED: SavedProduct[] = [
  {
    id: 1,
    name: "Smartphone Ultra 5G",
    price: 3299000,
    image: "/iphone.png",
    rating: 4.9,
  },
  {
    id: 2,
    name: "Teclado mecánico RGB",
    price: 399000,
    image: "/televisor.png",
    rating: 4.7,
  },
];

const SAMPLE_ADDRESSES: Address[] = [
  {
    id: 1,
    label: "Casa",
    address: "Cra 13 #45-78",
    city: "Bogotá",
    isDefault: true,
  },
];

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; steps: string[] }> = {
  entregado: { label: "Entregado", color: "text-green-400", bg: "bg-green-500/10 border-green-500/30", steps: ["Confirmado", "Preparando", "En camino", "Entregado"] },
  "en camino": { label: "En camino", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/30", steps: ["Confirmado", "Preparando", "En camino", "Entregado"] },
  procesando: { label: "Procesando", color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/30", steps: ["Confirmado", "Preparando", "En camino", "Entregado"] },
};

const STATUS_STEP: Record<string, number> = { procesando: 1, "en camino": 2, entregado: 3 };

export default function DashboardUsuario() {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [profile, setProfile] = useState<ProfileData>(EMPTY_PROFILE);
  const [orders] = useState<Order[]>(SAMPLE_ORDERS);
  const [savedList] = useState<SavedProduct[]>(SAMPLE_SAVED);
  const [addresses, setAddresses] = useState<Address[]>(SAMPLE_ADDRESSES);
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [modal, setModal] = useState<Modal>(null);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState("");
  const [addrForm, setAddrForm] = useState({ label: "", address: "", city: "" });
  const [editingAddr, setEditingAddr] = useState<Address | null>(null);
  const [deletingAddrId, setDeletingAddrId] = useState<number | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user) {
      setProfile((current) => ({
        ...current,
        name: user.name,
        email: user.email,
        memberSince: current.memberSince || "Jul 2024",
      }));
    }
  }, [user]);

  const totalSpent = orders.reduce((sum, order) => sum + order.price, 0);

  const startEdit = (field: string, value: string) => {
    setEditingField(field);
    setTempValue(value);
  };

  const cancelEdit = () => {
    setEditingField(null);
    setTempValue("");
  };

  const saveField = (field: keyof ProfileData) => {
    if (!tempValue.trim()) {
      toast.error("Ingresa un valor válido");
      return;
    }

    setProfile((current) => ({ ...current, [field]: tempValue.trim() }));
    setEditingField(null);
    setTempValue("");
    toast.success("Perfil actualizado");
  };

  const handleAvatarFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Solo se permiten imágenes");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("La imagen no puede superar 5 MB");
      return;
    }
    setAvatarPreview(URL.createObjectURL(file));
  };

  const confirmAvatar = () => {
    if (avatarPreview) {
      setProfile((current) => ({ ...current, avatarUrl: avatarPreview }));
      toast.success("Foto de perfil actualizada");
    }
    setModal(null);
    setAvatarPreview(null);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    if (file) handleAvatarFile(file);
  };

  const setDefaultAddress = (id: number) => {
    setAddresses((list) => list.map((address) => ({ ...address, isDefault: address.id === id })));
    toast.success("Dirección predeterminada actualizada");
  };

  const openEditAddress = (address: Address) => {
    setEditingAddr(address);
    setAddrForm({ label: address.label, address: address.address, city: address.city });
    setModal("editAddress");
  };

  const saveAddress = () => {
    if (!addrForm.label || !addrForm.address || !addrForm.city) {
      toast.error("Completa todos los campos");
      return;
    }

    if (editingAddr) {
      setAddresses((list) => list.map((address) => address.id === editingAddr.id ? { ...address, ...addrForm } : address));
      toast.success("Dirección actualizada");
    } else {
      setAddresses((list) => [...list, { id: Date.now(), ...addrForm, isDefault: list.length === 0 }]);
      toast.success("Dirección agregada");
    }

    setModal(null);
    setAddrForm({ label: "", address: "", city: "" });
    setEditingAddr(null);
  };

  const deleteAddress = () => {
    if (deletingAddrId === null) return;
    setAddresses((list) => list.filter((address) => address.id !== deletingAddrId));
    toast.success("Dirección eliminada");
    setModal(null);
    setDeletingAddrId(null);
  };

  const addSavedToCart = (product: SavedProduct) => {
    addToCart({ id: product.id, name: product.name, price: product.price, image: product.image, category: "" });
    toast.success("Agregado al carrito");
  };

  const initials = profile.name
    ? profile.name.split(" ").map((part) => part[0]).slice(0, 2).join("").toUpperCase()
    : "?";


  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <NavbarUsuario />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <ProfileHeader profile={profile} ordersCount={orders.length} savedCount={savedList.length} onEditProfile={() => setActiveTab("profile")} />
        <DashboardTabs activeTab={activeTab} setActiveTab={setActiveTab} orderCount={orders.length} savedCount={savedList.length} />
        {activeTab === "overview" && (
          <section className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Pedidos", value: orders.length, icon: <ShoppingBagIcon className="w-5 h-5 text-blue-400" />, action: () => setActiveTab("orders") },
                { label: "Total gastado", value: `$${(totalSpent / 1000000).toFixed(1)}M`, icon: <HeartIcon className="w-5 h-5 text-pink-400" />, action: null },
                { label: "Guardados", value: savedList.length, icon: <HeartIcon className="w-5 h-5 text-rose-400" />, action: () => setActiveTab("saved") },
                { label: "Direcciones", value: addresses.length, icon: <MapPinIcon className="w-5 h-5 text-yellow-400" />, action: () => setActiveTab("profile") },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => item.action?.()}
                  className={`rounded-2xl border border-slate-800 bg-slate-900 p-5 text-left transition ${item.action ? "hover:border-green-400 hover:shadow-lg" : "cursor-default"}`}
                >
                  <div className="flex items-center justify-between mb-3 text-sm text-slate-400">
                    <span>{item.label}</span>
                    {item.icon}
                  </div>
                  <p className="text-2xl font-semibold text-white">{item.value}</p>
                </button>
              ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h2 className="text-lg font-semibold">Pedidos recientes</h2>
                    <p className="text-sm text-slate-400">Tus últimas compras en Lubix.</p>
                  </div>
                  <button onClick={() => setActiveTab("orders")} className="inline-flex items-center gap-2 rounded-full bg-green-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-green-400">
                    Ver todos
                    <ChevronRightIcon className="w-4 h-4" />
                  </button>
                </div>
                {orders.length === 0 ? (
                  <EmptyStateCard
                    icon={<ShoppingBagIcon className="w-8 h-8" />}
                    title="Aún no tienes pedidos"
                    description="Haz tu primera compra y el pedido aparecerá aquí."
                    actionLabel="Explorar productos"
                    onAction={() => navigate("/")}
                  />
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => {
                      const status = STATUS_CONFIG[order.status] || STATUS_CONFIG.procesando;
                      const step = STATUS_STEP[order.status] || 0;
                      const isExpanded = expandedOrder === order.id;
                      return (
                        <div key={order.id} className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
                          <button
                            onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                            className="flex w-full items-center justify-between gap-4 text-left"
                          >
                            <div className="flex items-center gap-4">
                              <img src={order.image} alt={order.product} className="h-14 w-14 rounded-2xl object-cover" />
                              <div>
                                <p className="font-semibold">{order.product}</p>
                                <p className="text-sm text-slate-400">{order.id} · {order.seller}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className={`${status.color} ${status.bg} rounded-full px-3 py-1 text-xs font-semibold`}>{status.label}</span>
                              {isExpanded ? <ChevronDownIcon className="h-5 w-5" /> : <ChevronRightIcon className="h-5 w-5" />}
                            </div>
                          </button>
                          {isExpanded && (
                            <div className="mt-4 space-y-3 border-t border-slate-800 pt-4">
                              <div className="grid grid-cols-4 gap-2 text-xs text-slate-400">
                                {status.steps.map((stepLabel, index) => (
                                  <div key={stepLabel} className="flex flex-col items-center gap-2">
                                    <div className={`h-3 w-3 rounded-full ${index <= step ? "bg-green-400" : "bg-slate-700"}`} />
                                    <span className="text-center">{stepLabel}</span>
                                  </div>
                                ))}
                              </div>
                              {order.tracking && (
                                <div className="rounded-2xl border border-blue-500/20 bg-blue-500/10 p-3 text-sm text-blue-100">
                                  <p className="font-semibold">Número de rastreo</p>
                                  <p className="mt-1 font-mono">{order.tracking}</p>
                                </div>
                              )}
                              <div className="flex flex-wrap gap-2">
                                <button onClick={() => addToCart({ id: Number(order.id.replace(/\D/g, "")) || 0, name: order.product, price: order.price, image: order.image, category: "" })} className="rounded-2xl bg-green-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-green-400">
                                  Repetir compra
                                </button>
                                <button className="rounded-2xl border border-slate-800 px-4 py-2 text-sm text-slate-400 transition hover:border-green-400 hover:text-green-300">
                                  Soporte
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h2 className="text-lg font-semibold">Guardados</h2>
                    <p className="text-sm text-slate-400">Tus favoritos para comprar después.</p>
                  </div>
                  <button onClick={() => setActiveTab("saved")} className="rounded-full bg-green-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-green-400">
                    Ver todos
                  </button>
                </div>
                {savedList.length === 0 ? (
                  <EmptyStateCard
                    icon={<HeartIcon className="w-8 h-8" />}
                    title="No hay guardados"
                    description="Guarda productos desde el catálogo para encontrarlos más rápido."
                    actionLabel="Explorar"
                    onAction={() => navigate("/")}
                  />
                ) : (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {savedList.map((product) => (
                      <div key={product.id} className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                        <div className="flex items-center gap-3">
                          <img src={product.image} alt={product.name} className="h-16 w-16 rounded-2xl object-cover" />
                          <div>
                            <p className="font-semibold">{product.name}</p>
                            <p className="text-sm text-slate-400">${product.price.toLocaleString("es-CO")}</p>
                          </div>
                        </div>
                        <button onClick={() => addSavedToCart(product)} className="mt-4 w-full rounded-2xl bg-green-500 px-3 py-2 text-sm font-semibold text-slate-950 transition hover:bg-green-400">
                          Agregar al carrito
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {activeTab === "orders" && (
          <section className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold">Mis Pedidos</h2>
                <p className="text-sm text-slate-400">Administra tus compras recientes y rastrea los envíos.</p>
              </div>
              <button onClick={() => navigate("/")} className="inline-flex items-center gap-2 rounded-2xl bg-green-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-green-400">
                Explorar productos
                <ArrowLeftIcon className="w-4 h-4" />
              </button>
            </div>
            {orders.length === 0 ? (
              <EmptyStateCard icon={<ShoppingBagIcon className="w-8 h-8" />} title="No hay pedidos" description="Todavía no has comprado nada." />
            ) : (
              <div className="space-y-4">
                {orders.map((order) => {
                  const status = STATUS_CONFIG[order.status] || STATUS_CONFIG.procesando;
                  const isExpanded = expandedOrder === order.id;
                  return (
                    <div key={order.id} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                      <button onClick={() => setExpandedOrder(isExpanded ? null : order.id)} className="flex w-full items-center justify-between gap-4 text-left">
                        <div className="flex items-center gap-4">
                          <img src={order.image} alt={order.product} className="h-16 w-16 rounded-2xl object-cover" />
                          <div>
                            <p className="font-semibold">{order.product}</p>
                            <p className="text-sm text-slate-400">{order.date} · {order.id}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`${status.color} ${status.bg} rounded-full px-3 py-1 text-xs font-semibold`}>{status.label}</span>
                          {isExpanded ? <ChevronDownIcon className="h-5 w-5" /> : <ChevronRightIcon className="h-5 w-5" />}
                        </div>
                      </button>
                      {isExpanded && order.tracking && (
                        <div className="mt-4 rounded-2xl border border-blue-500/20 bg-blue-500/10 p-4 text-sm text-blue-100">
                          <p className="font-semibold">Rastreo</p>
                          <p className="mt-1 font-mono">{order.tracking}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        )}

        {activeTab === "saved" && (
          <section className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold">Guardados</h2>
              <p className="text-sm text-slate-400">Tus productos favoritos en un solo lugar.</p>
            </div>
            {savedList.length === 0 ? (
              <EmptyStateCard icon={<HeartIcon className="w-8 h-8" />} title="Aún no hay guardados" description="Guarda tus productos favoritos desde el catálogo." />
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {savedList.map((product) => (
                  <div key={product.id} className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
                    <div className="flex items-center gap-4">
                      <img src={product.image} alt={product.name} className="h-16 w-16 rounded-2xl object-cover" />
                      <div>
                        <p className="font-semibold">{product.name}</p>
                        <p className="text-sm text-slate-400">${product.price.toLocaleString("es-CO")}</p>
                      </div>
                    </div>
                    <button onClick={() => addSavedToCart(product)} className="mt-4 w-full rounded-2xl bg-green-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-green-400">
                      Agregar al carrito
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {activeTab === "profile" && (
          <section className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-xl font-semibold">Mi perfil</h2>
                  <p className="text-sm text-slate-400">Edita tu información personal.</p>
                </div>
                <PencilSquareIcon className="h-5 w-5 text-green-400" />
              </div>
              <div className="space-y-3">
                <EditableField field="name" label="Nombre completo" value={profile.name} icon={<UserIcon className="w-4 h-4" />} editingField={editingField} tempValue={tempValue} onEdit={startEdit} onSave={saveField} onCancel={cancelEdit} onTempChange={setTempValue} />
                <EditableField field="email" label="Correo electrónico" value={profile.email} icon={<PhotoIcon className="w-4 h-4" />} editingField={editingField} tempValue={tempValue} onEdit={startEdit} onSave={saveField} onCancel={cancelEdit} onTempChange={setTempValue} />
                <EditableField field="phone" label="Teléfono" value={profile.phone} icon={<PhoneIcon className="w-4 h-4" />} editingField={editingField} tempValue={tempValue} onEdit={startEdit} onSave={saveField} onCancel={cancelEdit} onTempChange={setTempValue} />
                <EditableField field="memberSince" label="Miembro desde" value={profile.memberSince} icon={<CalendarIcon className="w-4 h-4" />} editingField={editingField} tempValue={tempValue} onEdit={startEdit} onSave={saveField} onCancel={cancelEdit} onTempChange={setTempValue} readonly />
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h2 className="text-xl font-semibold">Direcciones</h2>
                    <p className="text-sm text-slate-400">Administra tus direcciones de envío.</p>
                  </div>
                  <button onClick={() => { setModal("addAddress"); setEditingAddr(null); setAddrForm({ label: "", address: "", city: "" }); }} className="rounded-full bg-green-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-green-400">
                    Agregar
                  </button>
                </div>
                <div className="space-y-3">
                  {addresses.map((address) => (
                    <div key={address.id} className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2 text-sm text-slate-400 mb-1">
                            <MapPinIcon className="h-4 w-4 text-yellow-400" />
                            <span>{address.label}</span>
                            {address.isDefault && <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-xs">Predeterminada</span>}
                          </div>
                          <p className="font-medium">{address.address}</p>
                          <p className="text-sm text-slate-500">{address.city}</p>
                        </div>
                        <div className="flex flex-col gap-2 text-slate-400">
                          {!address.isDefault && (
                            <button onClick={() => setDefaultAddress(address.id)} className="text-left text-sm text-green-400 hover:text-green-300">Predeterminar</button>
                          )}
                          <button onClick={() => openEditAddress(address)} className="text-left text-sm hover:text-slate-200">Editar</button>
                          <button onClick={() => { setDeletingAddrId(address.id); setModal("deleteAddress"); }} className="text-left text-sm text-red-400 hover:text-red-300">Eliminar</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                <div className="flex items-center gap-3 mb-5">
                  <ShieldCheckIcon className="h-5 w-5 text-green-400" />
                  <div>
                    <h2 className="text-xl font-semibold">Seguridad</h2>
                    <p className="text-sm text-slate-400">Cambia tu contraseña cuando quieras.</p>
                  </div>
                </div>
                <button onClick={() => navigate("/recover")} className="w-full rounded-2xl bg-green-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-green-400">
                  Ir a recuperar contraseña
                </button>
              </div>
            </div>
          </section>
        )}
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 p-4 backdrop-blur-sm" onClick={(event) => { if (event.target === event.currentTarget) setModal(null); }}>
          <div className="w-full max-w-xl rounded-3xl bg-slate-950 border border-slate-800 p-6 shadow-2xl">
            {modal === "avatar" && (
              <div>
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-xl font-semibold">Actualizar foto</h3>
                  <button onClick={() => setModal(null)}><XMarkIcon className="h-5 w-5 text-slate-400 hover:text-slate-100" /></button>
                </div>
                <div className="mb-5 rounded-3xl border border-slate-800 bg-slate-900 p-6 text-center">
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="Preview" className="mx-auto mb-4 h-32 w-32 rounded-full object-cover" />
                  ) : (
                    <div className="mx-auto mb-4 h-32 w-32 rounded-full bg-slate-800 flex items-center justify-center text-5xl text-slate-400">
                      {initials}
                    </div>
                  )}
                  <div className="mb-4">
                    <p className="text-sm text-slate-400">Arrastra una imagen o haz clic para seleccionar.</p>
                  </div>
                  <div
                    onDrop={handleDrop}
                    onDragOver={(event) => { event.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    onClick={() => fileInputRef.current?.click()}
                    className={`cursor-pointer rounded-3xl border-2 p-8 text-slate-400 transition ${isDragging ? "border-green-400 bg-slate-800" : "border-slate-700 bg-slate-950"}`}
                  >
                    <PhotoIcon className="mx-auto mb-3 h-8 w-8" />
                    <p className="text-sm">Haz clic o arrastra una imagen</p>
                  </div>
                  <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={(event) => { const file = event.target.files?.[0]; if (file) handleAvatarFile(file); }} />
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setModal(null)} className="flex-1 rounded-2xl border border-slate-700 px-4 py-3 text-sm text-slate-300 hover:bg-slate-900/80">Cancelar</button>
                  <button onClick={confirmAvatar} className="flex-1 rounded-2xl bg-green-500 px-4 py-3 text-sm font-semibold text-slate-950 hover:bg-green-400">Guardar</button>
                </div>
              </div>
            )}

            {(modal === "addAddress" || modal === "editAddress") && (
              <div>
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-xl font-semibold">{modal === "editAddress" ? "Editar dirección" : "Nueva dirección"}</h3>
                  <button onClick={() => setModal(null)}><XMarkIcon className="h-5 w-5 text-slate-400 hover:text-slate-100" /></button>
                </div>
                <div className="space-y-4">
                  {[
                    { key: "label", label: "Etiqueta", placeholder: "Casa, Trabajo" },
                    { key: "address", label: "Dirección", placeholder: "Cra 10 #20-30" },
                    { key: "city", label: "Ciudad", placeholder: "Bogotá" },
                  ].map(({ key, label, placeholder }) => (
                    <div key={key}>
                      <label className="block text-sm text-slate-300 mb-1">{label}</label>
                      <input
                        value={addrForm[key as keyof typeof addrForm]}
                        onChange={(event) => setAddrForm((current) => ({ ...current, [key]: event.target.value }))}
                        placeholder={placeholder}
                        className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-green-400"
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex gap-3">
                  <button onClick={() => setModal(null)} className="flex-1 rounded-2xl border border-slate-700 px-4 py-3 text-sm text-slate-300 hover:bg-slate-900/80">Cancelar</button>
                  <button onClick={saveAddress} className="flex-1 rounded-2xl bg-green-500 px-4 py-3 text-sm font-semibold text-slate-950 hover:bg-green-400">Guardar</button>
                </div>
              </div>
            )}

            {modal === "deleteAddress" && (
              <div>
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-xl font-semibold">Eliminar dirección</h3>
                  <button onClick={() => setModal(null)}><XMarkIcon className="h-5 w-5 text-slate-400 hover:text-slate-100" /></button>
                </div>
                <p className="text-slate-400">¿Estás seguro de que quieres eliminar esta dirección?</p>
                <div className="mt-6 flex gap-3">
                  <button onClick={() => setModal(null)} className="flex-1 rounded-2xl border border-slate-700 px-4 py-3 text-sm text-slate-300 hover:bg-slate-900/80">Cancelar</button>
                  <button onClick={deleteAddress} className="flex-1 rounded-2xl bg-red-500 px-4 py-3 text-sm font-semibold text-white hover:bg-red-400">Eliminar</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
