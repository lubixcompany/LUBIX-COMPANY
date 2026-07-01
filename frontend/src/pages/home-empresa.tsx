import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import axios from "axios";
import NavbarEmpresa from "../components/navbar-empresa";
import Footer from "../components/footer";
import {
  CubeIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  PlusIcon,
  PencilSquareIcon,
  ChartBarIcon,
  BuildingStorefrontIcon,
  CalendarDaysIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

interface CompanyMe {
  logo: string | null;
  banner: string | null;
  nameCompany: string;
  addressCompany: string;
  email: string;
  tell: string;
  memberAT: string;
  total_products: number;
  low_stock_products: number;
  out_of_stock_products: number;
}

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  images: string[];
}

export default function HomeEmpresa() {
  const [company, setCompany] = useState<CompanyMe | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [meRes, productsRes] = await Promise.all([
        api.get<CompanyMe>("/company/dashboard/me"),
        api.get("/company/dashboard/get-my-products", { params: { page: 1, limit: 6 } }),
      ]);
      setCompany(meRes.data);
      setProducts(productsRes.data.products ?? []);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.detail ?? "Error cargando datos");
      } else {
        setError("Error inesperado");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const joinYear = company?.memberAT
    ? new Date(company.memberAT).getFullYear()
    : null;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "var(--color-bg)" }}>
        <div className="w-8 h-8 border-2 rounded-full animate-spin" style={{ borderColor: "var(--color-accent)", borderTopColor: "transparent" }} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "var(--color-bg)" }}>
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button onClick={fetchData} className="btn-primary px-4 py-2">Reintentar</button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container" style={{ backgroundColor: "var(--color-bg)" }}>
      <NavbarEmpresa />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

        {/* Banner + Info empresa */}
        <div
          className="rounded-2xl overflow-hidden border"
          style={{ borderColor: "var(--color-border)" }}
        >
          <div
            className="h-36 sm:h-48 w-full bg-gradient-to-r from-emerald-600 to-green-500"
            style={company?.banner ? { backgroundImage: `url(${company.banner})`, backgroundSize: "cover", backgroundPosition: "center" } : {}}
          />
          <div className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4" style={{ backgroundColor: "var(--color-bg-card)" }}>
            <div
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl border-2 flex-shrink-0 flex items-center justify-center overflow-hidden -mt-10 sm:-mt-12"
              style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-secondary)" }}
            >
              {company?.logo ? (
                <img src={company.logo} alt="logo" className="w-full h-full object-cover" />
              ) : (
                <BuildingStorefrontIcon className="w-8 h-8" style={{ color: "var(--color-accent)" }} />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-xl sm:text-2xl font-black" style={{ color: "var(--color-text)" }}>
                  {company?.nameCompany}
                </h1>
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-semibold"
                  style={{ backgroundColor: "var(--color-accent)", color: "white" }}
                >
                  Empresa
                </span>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm" style={{ color: "var(--color-text-muted)" }}>
                {company?.addressCompany && (
                  <span className="flex items-center gap-1">
                    <MapPinIcon className="w-4 h-4 flex-shrink-0" />
                    {company.addressCompany}
                  </span>
                )}
                {company?.email && (
                  <span className="flex items-center gap-1">
                    <EnvelopeIcon className="w-4 h-4 flex-shrink-0" />
                    {company.email}
                  </span>
                )}
                {company?.tell && (
                  <span className="flex items-center gap-1">
                    <PhoneIcon className="w-4 h-4 flex-shrink-0" />
                    {company.tell}
                  </span>
                )}
                {joinYear && (
                  <span className="flex items-center gap-1">
                    <CalendarDaysIcon className="w-4 h-4 flex-shrink-0" />
                    Miembro desde {joinYear}
                  </span>
                )}
              </div>
            </div>

            <Link
              to="/dashboard-empresa"
              className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl border transition-opacity hover:opacity-80"
              style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)" }}
            >
              <PencilSquareIcon className="w-4 h-4" />
              Editar perfil
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="card p-5 flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "var(--color-bg-secondary)" }}
            >
              <CubeIcon className="w-6 h-6" style={{ color: "var(--color-accent)" }} />
            </div>
            <div>
              <p className="text-3xl font-black" style={{ color: "var(--color-accent)" }}>
                {company?.total_products ?? 0}
              </p>
              <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>Productos publicados</p>
            </div>
          </div>

          <div className="card p-5 flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: (company?.low_stock_products ?? 0) > 0 ? "#fef3c7" : "var(--color-bg-secondary)" }}
            >
              <ExclamationTriangleIcon
                className="w-6 h-6"
                style={{ color: (company?.low_stock_products ?? 0) > 0 ? "#d97706" : "var(--color-text-muted)" }}
              />
            </div>
            <div>
              <p
                className="text-3xl font-black"
                style={{ color: (company?.low_stock_products ?? 0) > 0 ? "#d97706" : "var(--color-text-muted)" }}
              >
                {company?.low_stock_products ?? 0}
              </p>
              <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>Stock bajo (5 unidades)</p>
            </div>
          </div>

          <div className="card p-5 flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: (company?.out_of_stock_products ?? 0) > 0 ? "#fee2e2" : "var(--color-bg-secondary)" }}
            >
              <XCircleIcon
                className="w-6 h-6"
                style={{ color: (company?.out_of_stock_products ?? 0) > 0 ? "#dc2626" : "var(--color-text-muted)" }}
              />
            </div>
            <div>
              <p
                className="text-3xl font-black"
                style={{ color: (company?.out_of_stock_products ?? 0) > 0 ? "#dc2626" : "var(--color-text-muted)" }}
              >
                {company?.out_of_stock_products ?? 0}
              </p>
              <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>Sin stock</p>
            </div>
          </div>
        </div>

        {/* Acciones rapidas */}
        <div className="card p-5">
          <h2 className="text-base font-bold mb-4" style={{ color: "var(--color-text)" }}>
            Acciones rapidas
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link
              to="/dashboard-empresa"
              className="flex items-center gap-3 p-4 rounded-xl border transition-colors hover:border-current"
              style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "var(--color-bg-secondary)" }}
              >
                <PlusIcon className="w-5 h-5" style={{ color: "var(--color-accent)" }} />
              </div>
              <div>
                <p className="text-sm font-semibold">Agregar producto</p>
                <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Publica un nuevo articulo</p>
              </div>
            </Link>

            <Link
              to="/dashboard-empresa"
              className="flex items-center gap-3 p-4 rounded-xl border transition-colors hover:border-current"
              style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "var(--color-bg-secondary)" }}
              >
                <ChartBarIcon className="w-5 h-5" style={{ color: "#3b82f6" }} />
              </div>
              <div>
                <p className="text-sm font-semibold">Gestionar catalogo</p>
                <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Edita, elimina y actualiza stock</p>
              </div>
            </Link>

            <Link
              to="/dashboard-empresa"
              className="flex items-center gap-3 p-4 rounded-xl border transition-colors hover:border-current"
              style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "var(--color-bg-secondary)" }}
              >
                <PencilSquareIcon className="w-5 h-5" style={{ color: "#8b5cf6" }} />
              </div>
              <div>
                <p className="text-sm font-semibold">Editar perfil</p>
                <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Logo, banner e informacion</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Ultimos productos */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold" style={{ color: "var(--color-text)" }}>
              Ultimos productos
            </h2>
            <Link
              to="/dashboard-empresa"
              className="text-sm font-semibold hover:underline"
              style={{ color: "var(--color-accent)" }}
            >
              Ver todos
            </Link>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-12">
              <CubeIcon className="w-12 h-12 mx-auto mb-3" style={{ color: "var(--color-text-muted)" }} />
              <p className="text-sm font-semibold mb-1" style={{ color: "var(--color-text)" }}>
                Aun no tienes productos
              </p>
              <p className="text-sm mb-4" style={{ color: "var(--color-text-muted)" }}>
                Publica tu primer articulo y empieza a vender
              </p>
              <Link to="/dashboard-empresa" className="btn-primary text-sm px-4 py-2">
                Agregar producto
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                    <th className="text-left py-2 pb-3 font-semibold" style={{ color: "var(--color-text-muted)" }}>Producto</th>
                    <th className="text-right py-2 pb-3 font-semibold" style={{ color: "var(--color-text-muted)" }}>Precio</th>
                    <th className="text-right py-2 pb-3 font-semibold" style={{ color: "var(--color-text-muted)" }}>Stock</th>
                    <th className="text-right py-2 pb-3 font-semibold" style={{ color: "var(--color-text-muted)" }}></th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => {
                    const stockColor =
                      product.stock === 0
                        ? "#dc2626"
                        : product.stock <= 5
                        ? "#d97706"
                        : "var(--color-accent)";
                    return (
                      <tr key={product.id} style={{ borderBottom: "1px solid var(--color-border)" }}>
                        <td className="py-3 pr-4">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0"
                              style={{ backgroundColor: "var(--color-bg-secondary)" }}
                            >
                              {product.images?.[0] ? (
                                <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <CubeIcon className="w-5 h-5" style={{ color: "var(--color-text-muted)" }} />
                                </div>
                              )}
                            </div>
                            <span className="font-medium line-clamp-1" style={{ color: "var(--color-text)" }}>
                              {product.name}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 text-right font-semibold" style={{ color: "var(--color-accent)" }}>
                          ${product.price.toLocaleString("es-CO")}
                        </td>
                        <td className="py-3 text-right">
                          <span
                            className="text-xs font-semibold px-2 py-0.5 rounded-full"
                            style={{ backgroundColor: `${stockColor}22`, color: stockColor }}
                          >
                            {product.stock === 0 ? "Sin stock" : `${product.stock} uds`}
                          </span>
                        </td>
                        <td className="py-3 text-right pl-4">
                          <Link
                            to="/dashboard-empresa"
                            className="text-xs font-semibold hover:underline"
                            style={{ color: "var(--color-text-muted)" }}
                          >
                            Editar
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
