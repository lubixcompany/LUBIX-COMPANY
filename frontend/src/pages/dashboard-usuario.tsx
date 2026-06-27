import { useState } from 'react';
import Navbar from '../components/navbaruser';
import {
  UserIcon,
  CubeIcon,            
  HeartIcon,
  MapPinIcon,
  StarIcon,
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
  ShieldCheckIcon      
} from '@heroicons/react/24/outline';

const buyerData = {
  name: 'Carlos Andrés Gómez',
  email: 'carlos.gomez@gmail.com',
  phone: '+57 311 234 5678',
  memberSince: 'Enero 2023',
  avatar: 'C',
  totalOrders: 34,
  totalSpent: 8750000,
  savedProducts: 12,
  addresses: 2,
};

const orders = [
  {
    id: '#LBX-20240301',
    product: 'MacBook Pro 14" M3 Pro',
    image: 'https://images.unsplash.com/photo-1770278881151-7cd11eb115b0?w=80&h=80&fit=crop',
    price: 11250000,
    status: 'entregado',
    date: '2024-03-01',
    seller: 'TechStore Colombia',
  },
  {
    id: '#LBX-20240218',
    product: 'iPhone 15 Pro Max - 256GB',
    image: 'https://images.unsplash.com/photo-1646719223599-9864b351e242?w=80&h=80&fit=crop',
    price: 5400000,
    status: 'en camino',
    date: '2024-02-18',
    seller: 'TechStore Colombia',
  },
  {
    id: '#LBX-20240110',
    product: 'Auriculares Inalámbricos Premium',
    image: 'https://images.unsplash.com/photo-1640300065113-738f2abb8ba6?w=80&h=80&fit=crop',
    price: 1350000,
    status: 'procesando',
    date: '2024-01-10',
    seller: 'AudioPro Shop',
  },
  {
    id: '#LBX-20231215',
    product: 'Cámara Canon EOS R5',
    image: 'https://images.unsplash.com/photo-1729655669048-a667a0b01148?w=80&h=80&fit=crop',
    price: 17550000,
    status: 'entregado',
    date: '2023-12-15',
    seller: 'FotoWorld',
  },
];

const savedProducts = [
  {
    id: 1,
    name: 'Sony PlayStation 5',
    price: 3200000,
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=200&h=200&fit=crop',
    rating: 4.9,
  },
  {
    id: 2,
    name: 'Monitor LG UltraWide 34"',
    price: 4100000,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=200&h=200&fit=crop',
    rating: 4.7,
  },
  {
    id: 3,
    name: 'Tablet Samsung Galaxy S9',
    price: 2850000,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=200&h=200&fit=crop',
    rating: 4.6,
  },
];

const statusConfig: Record<string, { label: string; icon: React.ReactNode; color: string; bg: string }> = {
  entregado: {
    label: 'Entregado',
    icon: <CheckCircleIcon className="w-4 h-4" />,
    color: 'text-green-400',
    bg: 'bg-green-500/10 border-green-500/30',
  },
  'en camino': {
    label: 'En camino',
    icon: <TruckIcon className="w-4 h-4" />,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10 border-blue-500/30',
  },
  procesando: {
    label: 'Procesando',
    icon: <ClockIcon className="w-4 h-4" />,
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10 border-yellow-500/30',
  },
};

type Tab = 'overview' | 'orders' | 'saved' | 'profile';

export default function BuyerDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Resumen', icon: <UserIcon className="w-4 h-4" /> },
    { id: 'orders', label: 'Mis Pedidos', icon: <CubeIcon className="w-4 h-4" /> },
    { id: 'saved', label: 'Guardados', icon: <HeartIcon className="w-4 h-4" /> },
    { id: 'profile', label: 'Mi Perfil', icon: <ShieldCheckIcon className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Header perfil */}
        <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 mb-8 shadow-xl shadow-blue-500/20">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative">
              <div className="w-24 h-24 bg-slate-900 rounded-full flex items-center justify-center text-4xl font-bold text-blue-400 shadow-lg border-4 border-white/20">
                {buyerData.avatar}
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-400 transition-colors">
                <CameraIcon className="w-4 h-4 text-white" />
              </button>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-white mb-1">{buyerData.name}</h1>
              <p className="text-blue-100 mb-3">{buyerData.email}</p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-white/80">
                <div className="flex items-center gap-1">
                  <CalendarIcon className="w-4 h-4" />
                  <span>Miembro desde {buyerData.memberSince}</span>
                </div>
                <div className="flex items-center gap-1">
                  <ShoppingBagIcon className="w-4 h-4" />
                  <span>{buyerData.totalOrders} compras realizadas</span>
                </div>
              </div>
            </div>
            <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-lg transition-colors border border-white/20">
              <PencilSquareIcon className="w-4 h-4" />
              Editar perfil
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-green-500 text-white shadow-lg shadow-green-500/30'
                  : 'bg-slate-800 text-gray-400 hover:text-gray-200 hover:bg-slate-700'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Pedidos', value: buyerData.totalOrders, icon: <CubeIcon className="w-5 h-5 text-blue-400" /> },
                { label: 'Total gastado', value: `$${(buyerData.totalSpent / 1000000).toFixed(1)}M`, icon: <ShoppingBagIcon className="w-5 h-5 text-green-400" /> },
                { label: 'Guardados', value: buyerData.savedProducts, icon: <HeartIcon className="w-5 h-5 text-pink-400" /> },
                { label: 'Direcciones', value: buyerData.addresses, icon: <MapPinIcon className="w-5 h-5 text-yellow-400" /> },
              ].map((stat) => (
                <div key={stat.label} className="bg-slate-900 rounded-xl border border-slate-800 p-5 hover:border-slate-700 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-400 text-sm">{stat.label}</span>
                    {stat.icon}
                  </div>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Últimos pedidos */}
            <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-white">Pedidos recientes</h2>
                <button onClick={() => setActiveTab('orders')} className="flex items-center gap-1 text-green-400 hover:text-green-300 text-sm">
                  Ver todos <ChevronRightIcon className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3">
                {orders.slice(0, 3).map((order) => {
                  const s = statusConfig[order.status];
                  return (
                    <div key={order.id} className="flex items-center gap-4 p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors">
                      <img src={order.image} alt={order.product} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium truncate">{order.product}</p>
                        <p className="text-gray-400 text-sm">{order.id} · {order.seller}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-green-400 font-bold">${order.price.toLocaleString('es-CO')}</p>
                        <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border mt-1 ${s.color} ${s.bg}`}>
                          {s.icon} {s.label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Guardados preview */}
            <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-white">Productos guardados</h2>
                <button onClick={() => setActiveTab('saved')} className="flex items-center gap-1 text-green-400 hover:text-green-300 text-sm">
                  Ver todos <ChevronRightIcon className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {savedProducts.map((p) => (
                  <div key={p.id} className="rounded-xl overflow-hidden bg-slate-800 hover:bg-slate-700 transition-all group cursor-pointer">
                    <div className="relative">
                      <img src={p.image} alt={p.name} className="w-full h-28 object-cover group-hover:scale-105 transition-transform duration-300" />
                      <button className="absolute top-2 right-2 w-7 h-7 bg-slate-900/80 rounded-full flex items-center justify-center">
                        <HeartIcon className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />
                      </button>
                    </div>
                    <div className="p-3">
                      <p className="text-white text-sm font-medium line-clamp-1">{p.name}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-green-400 font-bold text-sm">${(p.price / 1000000).toFixed(1)}M</span>
                        <div className="flex items-center gap-1">
                          <StarIcon className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                          <span className="text-gray-400 text-xs">{p.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Orders tab */}
        {activeTab === 'orders' && (
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
            <h2 className="text-xl font-bold text-white mb-6">Todos mis pedidos</h2>
            <div className="space-y-4">
              {orders.map((order) => {
                const s = statusConfig[order.status];
                return (
                  <div key={order.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-xl bg-slate-800 hover:bg-slate-700 transition-all cursor-pointer">
                    <img src={order.image} alt={order.product} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-semibold">{order.product}</p>
                      <p className="text-gray-400 text-sm mt-0.5">{order.id} · Vendedor: {order.seller}</p>
                      <p className="text-gray-500 text-xs mt-0.5">{order.date}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <p className="text-green-400 font-bold text-lg">${order.price.toLocaleString('es-CO')}</p>
                      <span className={`inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full border font-medium ${s.color} ${s.bg}`}>
                        {s.icon} {s.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Saved tab */}
        {activeTab === 'saved' && (
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
            <h2 className="text-xl font-bold text-white mb-6">Productos guardados</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {savedProducts.map((p) => (
                <div key={p.id} className="rounded-xl overflow-hidden bg-slate-800 hover:shadow-lg hover:shadow-blue-500/10 transition-all group">
                  <div className="relative">
                    <img src={p.image} alt={p.name} className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300" />
                    <button className="absolute top-3 right-3 w-8 h-8 bg-slate-900/80 rounded-full flex items-center justify-center hover:bg-red-500/20 transition-colors">
                      <HeartIcon className="w-4 h-4 text-pink-400 fill-pink-400" />
                    </button>
                  </div>
                  <div className="p-4">
                    <p className="text-white font-semibold mb-2">{p.name}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-green-400 font-bold text-lg">${p.price.toLocaleString('es-CO')}</span>
                      <div className="flex items-center gap-1">
                        <StarIcon className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-gray-300 text-sm">{p.rating}</span>
                      </div>
                    </div>
                    <button className="w-full mt-3 py-2 bg-green-500 hover:bg-green-400 text-white rounded-lg font-medium transition-colors">
                      Agregar al carrito
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Profile tab */}
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
              <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                <UserIcon className="w-5 h-5 text-blue-400" /> Información personal
              </h2>
              <div className="space-y-4">
                {[
                  { label: 'Nombre completo', value: buyerData.name, icon: <UserIcon className="w-4 h-4 text-gray-400" /> },
                  { label: 'Correo electrónico', value: buyerData.email, icon: <EnvelopeIcon className="w-4 h-4 text-gray-400" /> },
                  { label: 'Teléfono', value: buyerData.phone, icon: <PhoneIcon className="w-4 h-4 text-gray-400" /> },
                  { label: 'Miembro desde', value: buyerData.memberSince, icon: <CalendarIcon className="w-4 h-4 text-gray-400" /> },
                ].map((field) => (
                  <div key={field.label} className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg">
                    {field.icon}
                    <div className="flex-1">
                      <p className="text-gray-500 text-xs">{field.label}</p>
                      <p className="text-white text-sm font-medium">{field.value}</p>
                    </div>
                    <button className="text-gray-500 hover:text-green-400 transition-colors">
                      <PencilSquareIcon className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <button className="w-full mt-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors">
                Guardar cambios
              </button>
            </div>

            <div className="space-y-5">
              <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <MapPinIcon className="w-5 h-5 text-yellow-400" /> Direcciones guardadas
                </h2>
                {[
                  { label: 'Casa', address: 'Calle 72 #10-34, Bogotá, Cundinamarca' },
                  { label: 'Trabajo', address: 'Av. El Dorado #103-15, Bogotá' },
                ].map((addr) => (
                  <div key={addr.label} className="flex items-start gap-3 p-3 bg-slate-800 rounded-lg mb-3">
                    <MapPinIcon className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-green-400 text-xs font-semibold uppercase">{addr.label}</p>
                      <p className="text-white text-sm">{addr.address}</p>
                    </div>
                    <button className="text-gray-500 hover:text-blue-400 transition-colors">
                      <PencilSquareIcon className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button className="w-full py-2 border border-dashed border-slate-600 text-gray-400 hover:border-green-500 hover:text-green-400 rounded-lg text-sm transition-colors">
                  + Agregar dirección
                </button>
              </div>

              <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <ShieldCheckIcon className="w-5 h-5 text-green-400" /> Seguridad
                </h2>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-between p-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors">
                    <span className="text-white text-sm">Cambiar contraseña</span>
                    <ChevronRightIcon className="w-4 h-4 text-gray-400" />
                  </button>
                  <button className="w-full flex items-center justify-between p-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors">
                    <span className="text-white text-sm">Verificación en 2 pasos</span>
                    <ChevronRightIcon className="w-4 h-4 text-gray-400" />
                  </button>
                  <button className="w-full flex items-center justify-between p-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors">
                    <span className="text-white text-sm">Sesiones activas</span>
                    <ChevronRightIcon className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}