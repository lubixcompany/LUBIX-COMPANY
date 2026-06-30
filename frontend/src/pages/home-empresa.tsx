import { Link } from "react-router-dom";
import NavbarEmpresa from "../components/navbar-empresa";
import Footer from "../components/footer";
import {
  ArrowTrendingUpIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  ShoppingBagIcon,
  TruckIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

const quickActions = [
  { title: "Panel de ventas", description: "Revisa pedidos y rendimiento diario", icon: ChartBarIcon, to: "/dashboard-empresa" },
  { title: "Mis productos", description: "Gestiona catálogo, stock y promociones", icon: ShoppingBagIcon, to: "/dashboard-empresa" },
  { title: "Reportes", description: "Analiza ingresos y conversiones", icon: CurrencyDollarIcon, to: "/dashboard-empresa" },
];

const highlights = [
  { label: "Productos activos", value: "24", detail: "Catálogo actualizado" },
  { label: "Órdenes este mes", value: "156", detail: "+18% vs. el mes pasado" },
  { label: "Ingresos", value: "$45.2M", detail: "Meta superada" },
  { label: "Tasa de conversión", value: "8.5%", detail: "En crecimiento" },
];

const HomeEmpresa = () => {
  return (
    <div className="page-container bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <NavbarEmpresa />

      <section className="px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-600 via-emerald-500 to-green-700 p-8 text-white shadow-2xl shadow-emerald-900/20">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm font-semibold backdrop-blur">
              <SparklesIcon className="h-4 w-4" />
              Tu tienda, más preparada que nunca
            </div>
            <h1 className="text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
              Gestiona tu negocio con claridad y velocidad.
            </h1>
            <p className="mt-4 max-w-2xl text-sm text-emerald-50 sm:text-base">
              Centraliza productos, pedidos y métricas para que cada venta se traduzca en crecimiento real.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/dashboard-empresa" className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50">
                Ir al dashboard
              </Link>
              <Link to="/dashboard-empresa" className="rounded-full border border-white/40 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10">
                Ver productos
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/70 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-emerald-600">Resumen del día</p>
                <h2 className="text-2xl font-bold">Todo listo para vender</h2>
              </div>
              <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-600 dark:bg-emerald-500/10">
                <TruckIcon className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-6 space-y-3">
              {highlights.map((item) => (
                <div key={item.label} className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 dark:border-slate-800">
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{item.label}</p>
                    <p className="text-lg font-semibold text-slate-900 dark:text-white">{item.value}</p>
                  </div>
                  <span className="text-sm font-medium text-emerald-600">{item.detail}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-8 sm:px-6 lg:px-8 lg:pb-12">
        <div className="mx-auto max-w-7xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-emerald-600">Acciones rápidas</p>
              <h2 className="text-2xl font-bold">Todo lo que necesitas para crecer</h2>
            </div>
            <div className="rounded-full bg-emerald-50 p-2 text-emerald-600 dark:bg-emerald-500/10">
              <ArrowTrendingUpIcon className="h-5 w-5" />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link key={action.title} to={action.to} className="rounded-2xl border border-slate-200 p-5 transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg dark:border-slate-800">
                  <div className="mb-3 inline-flex rounded-2xl bg-emerald-50 p-3 text-emerald-600 dark:bg-emerald-500/10">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{action.title}</h3>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{action.description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomeEmpresa;
