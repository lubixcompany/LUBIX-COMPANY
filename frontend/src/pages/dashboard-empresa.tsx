import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import api from "../api/axios";
import axios from "axios";
import NavbarEmpresa from "../components/navbar-empresa";
import Footer from "../components/footer";
import {
  CubeIcon,
  PlusIcon,
  TrashIcon,
  XMarkIcon,
  CameraIcon,
  BuildingStorefrontIcon,
  CheckIcon,
  TagIcon,
  ArchiveBoxXMarkIcon,
  ExclamationTriangleIcon,
  PencilSquareIcon,
  MagnifyingGlassIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";

type Tab = "products" | "profile";

interface CompanyProfile {
  nameCompany: string;
  emailCompany: string;
  addressCompany: string;
  tellCompany: string;
  memberAT: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  descripcion: string;
  images: string[];
}

interface DashboardMe {
  logo: string | null;
  banner: string | null;
  nameCompany: string;
  email: string;
  tell: string;
  addressCompany: string;
  total_products: number;
  low_stock_products: number;
  out_of_stock_products: number;
}

interface ProductsPage {
  products: Product[];
  total: number;
  total_pages: number;
}

export default function DashboardEmpresa() {
  const [searchParams] = useSearchParams();
  const [tab, setTab] = useState<Tab>("products");

  const [me, setMe] = useState<DashboardMe | null>(null);
  const [profile, setProfile] = useState<CompanyProfile | null>(null);
  const [editForm, setEditForm] = useState({ nameCompany: "", emailCompany: "", tellCompany: "", addressCompany: "" });
  const [editLoading, setEditLoading] = useState(false);
  const [editMsg, setEditMsg] = useState({ text: "", ok: true });
  const logoRef = useRef<HTMLInputElement>(null);
  const editLogoRef = useRef<HTMLInputElement>(null);

  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [showCreate, setShowCreate] = useState(false);
  const [createForm, setCreateForm] = useState({ nameProduct: "", priceProduct: "", stockProduct: "", descripcionProduct: "" });
  const [createImages, setCreateImages] = useState<File[]>([]);
  const [createLoading, setCreateLoading] = useState(false);
  const [createMsg, setCreateMsg] = useState({ text: "", ok: true });
  const imagesRef = useRef<HTMLInputElement>(null);

  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [editProductForm, setEditProductForm] = useState({ nameProduct: "", priceProduct: "", stockProduct: "", descripcionProduct: "" });
  const [editProductLoading, setEditProductLoading] = useState(false);
  const [editProductMsg, setEditProductMsg] = useState({ text: "", ok: true });

  const [popup, setPopup] = useState({ text: "", ok: true });
  const showPopup = (text: string, ok: boolean) => {
    setPopup({ text, ok });
    setTimeout(() => setPopup({ text: "", ok: true }), 4000);
  };

  const filteredProducts = useMemo(
    () => searchQuery.trim()
      ? products.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
      : products,
    [products, searchQuery]
  );

  const loadMe = useCallback(async () => {
    try {
      const [meRes, profileRes] = await Promise.all([
        api.get<DashboardMe>("/company/dashboard/me"),
        api.get("/company/dashboard/my-profile"),
      ]);
      setMe(meRes.data);
      const p: CompanyProfile = {
        nameCompany: profileRes.data.nameCompany,
        emailCompany: profileRes.data.emailCompany,
        addressCompany: profileRes.data.addressCompany,
        tellCompany: profileRes.data.tellCompany,
        memberAT: profileRes.data.memberAT,
      };
      setProfile(p);
      setEditForm({ nameCompany: p.nameCompany, emailCompany: p.emailCompany, tellCompany: p.tellCompany, addressCompany: p.addressCompany });
    } catch {
      showPopup("Error cargando perfil", false);
    }
  }, []);

  const loadProducts = useCallback(async (pg = 1) => {
    setLoadingProducts(true);
    try {
      const res = await api.get<ProductsPage>("/company/dashboard/get-my-products", { params: { page: pg, limit: 12 } });
      setProducts(res.data.products ?? []);
      setTotal(res.data.total);
      setTotalPages(res.data.total_pages);
      setPage(pg);
    } catch {
      showPopup("Error cargando productos", false);
    } finally {
      setLoadingProducts(false);
    }
  }, []);

  useEffect(() => {
    const tabParam = searchParams.get("tab") as Tab | null;
    const newParam = searchParams.get("new");
    if (tabParam === "products" || tabParam === "profile") setTab(tabParam);
    if (newParam === "1") setShowCreate(true);
  }, [searchParams]);

  useEffect(() => { loadMe(); loadProducts(1); }, [loadMe, loadProducts]);

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fd = new FormData();
    fd.append("photo_profile", file);
    try {
      await api.patch("/company/dashboard/patch-media-logo-banner", fd, { headers: { "Content-Type": "multipart/form-data" } });
      showPopup("Logo actualizado", true);
      loadMe();
    } catch {
      showPopup("Error subiendo logo", false);
    }
  };

  const handleEditProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setEditLoading(true);
    try {
      await api.patch("/company/dashboard/upgrade-my-profile", editForm);
      setEditMsg({ text: "Perfil actualizado", ok: true });
      loadMe();
    } catch (err) {
      const msg = axios.isAxiosError(err) ? (err.response?.data?.detail ?? "Error") : "Error";
      setEditMsg({ text: msg, ok: false });
    } finally {
      setEditLoading(false);
      setTimeout(() => setEditMsg({ text: "", ok: true }), 4000);
    }
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!createForm.nameProduct || !createForm.priceProduct || !createForm.stockProduct || !createForm.descripcionProduct) {
      setCreateMsg({ text: "Completa los campos obligatorios", ok: false });
      return;
    }
    setCreateLoading(true);
    const fd = new FormData();
    fd.append("nameProduct", createForm.nameProduct);
    fd.append("priceProduct", createForm.priceProduct);
    fd.append("stockProduct", createForm.stockProduct);
    fd.append("descripcionProduct", createForm.descripcionProduct);
    createImages.forEach((f) => fd.append("imagesProduct", f));
    try {
      await api.post("/company/dashboard/product", fd, { headers: { "Content-Type": "multipart/form-data" } });
      setCreateMsg({ text: "Producto creado", ok: true });
      setCreateForm({ nameProduct: "", priceProduct: "", stockProduct: "", descripcionProduct: "" });
      setCreateImages([]);
      loadProducts(1);
      loadMe();
      setTimeout(() => { setShowCreate(false); setCreateMsg({ text: "", ok: true }); }, 1500);
    } catch (err) {
      const msg = axios.isAxiosError(err) ? (err.response?.data?.detail ?? "Error al crear") : "Error";
      setCreateMsg({ text: typeof msg === "string" ? msg : JSON.stringify(msg), ok: false });
    } finally {
      setCreateLoading(false);
    }
  };

  const openEditProduct = (p: Product) => {
    setEditProduct(p);
    setEditProductForm({ nameProduct: p.name, priceProduct: String(p.price), stockProduct: String(p.stock), descripcionProduct: p.descripcion ?? "" });
    setEditProductMsg({ text: "", ok: true });
  };

  const handleEditProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editProduct) return;
    setEditProductLoading(true);
    const fd = new FormData();
    fd.append("nameProduct", editProductForm.nameProduct);
    fd.append("priceProduct", editProductForm.priceProduct);
    fd.append("stockProduct", editProductForm.stockProduct);
    fd.append("descripcionProduct", editProductForm.descripcionProduct);
    try {
      await api.patch(`/company/dashboard/update-my-product/${editProduct.id}`, fd, { headers: { "Content-Type": "multipart/form-data" } });
      setEditProductMsg({ text: "Producto actualizado", ok: true });
      loadProducts(page);
      loadMe();
      setTimeout(() => { setEditProduct(null); setEditProductMsg({ text: "", ok: true }); }, 1500);
    } catch (err) {
      const msg = axios.isAxiosError(err) ? (err.response?.data?.detail ?? "Error al guardar") : "Error";
      setEditProductMsg({ text: typeof msg === "string" ? msg : JSON.stringify(msg), ok: false });
    } finally {
      setEditProductLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/company/dashboard/delete-my-product/${id}`);
      showPopup("Producto eliminado", true);
      loadProducts(page);
      loadMe();
    } catch (err) {
      const msg = axios.isAxiosError(err) ? (err.response?.data?.detail ?? "Error eliminando") : "Error";
      showPopup(typeof msg === "string" ? msg : "Error eliminando", false);
    } finally {
      setDeleteId(null);
    }
  };

  const logoUrl = me?.logo ?? null;

  return (
    <div className="page-container" style={{ backgroundColor: "var(--color-bg)" }}>
      <NavbarEmpresa />

      {popup.text && (
        <div className={popup.ok ? "popup-success" : "popup-error"}>
          {popup.ok ? "✅" : "❌"} {popup.text}
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">

        {/* Breadcrumb back */}
        <div className="flex items-center gap-2 text-sm">
          <Link to="/home-empresa" className="flex items-center gap-1.5 font-medium transition-colors hover:opacity-80"
            style={{ color: "var(--color-text-muted)" }}>
            <ArrowLeftIcon className="w-4 h-4" />
            Inicio
          </Link>
          <span style={{ color: "var(--color-border)" }}>/</span>
          <span className="font-semibold" style={{ color: "var(--color-text)" }}>Gestionar empresa</span>
        </div>

        {/* Header */}
        <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-card)" }}>
          <div className="h-24 sm:h-28 relative" style={{ background: "linear-gradient(135deg, var(--color-accent) 0%, #0a4f3c 100%)" }}>
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 80%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
          </div>
          <div className="px-5 pb-5">
            <div className="flex items-end gap-4 -mt-10 mb-4">
              <div className="relative w-20 h-20 rounded-2xl border-4 overflow-hidden flex items-center justify-center cursor-pointer flex-shrink-0 shadow-lg group"
                style={{ borderColor: "var(--color-bg-card)", backgroundColor: "var(--color-bg-secondary)" }}
                onClick={() => logoRef.current?.click()} title="Haz clic para cambiar el logo">
                {logoUrl ? (
                  <img src={logoUrl} alt="logo" className="w-full h-full object-cover" />
                ) : (
                  <BuildingStorefrontIcon className="w-9 h-9" style={{ color: "var(--color-accent)" }} />
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                  <CameraIcon className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
              <input ref={logoRef} type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
              <div className="flex-1 min-w-0 pt-10">
                <h1 className="text-xl font-black truncate" style={{ color: "var(--color-text)" }}>{me?.nameCompany ?? "Cargando..."}</h1>
                <p className="text-sm truncate" style={{ color: "var(--color-text-muted)" }}>{me?.email}{me?.addressCompany ? ` · ${me.addressCompany}` : ""}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: TagIcon, label: "Total productos", value: me?.total_products ?? 0, color: "var(--color-accent)" },
                { icon: ExclamationTriangleIcon, label: "Stock bajo", value: me?.low_stock_products ?? 0, color: "#d97706" },
                { icon: ArchiveBoxXMarkIcon, label: "Sin stock", value: me?.out_of_stock_products ?? 0, color: "#dc2626" },
              ].map(({ icon: Icon, label, value, color }) => (
                <div key={label} className="rounded-xl p-3 text-center" style={{ backgroundColor: "var(--color-bg-secondary)" }}>
                  <Icon className="w-5 h-5 mx-auto mb-1" style={{ color }} />
                  <p className="text-lg font-black leading-none" style={{ color }}>{value}</p>
                  <p className="text-xs mt-0.5 leading-tight" style={{ color: "var(--color-text-muted)" }}>{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b" style={{ borderColor: "var(--color-border)" }}>
          {([["products", "Mis productos"], ["profile", "Mi empresa"]] as [Tab, string][]).map(([t, label]) => (
            <button key={t} onClick={() => setTab(t)}
              className="px-5 py-2.5 text-sm font-semibold -mb-px border-b-2 transition-all"
              style={{ borderBottomColor: tab === t ? "var(--color-accent)" : "transparent", color: tab === t ? "var(--color-accent)" : "var(--color-text-muted)" }}>
              {label}
            </button>
          ))}
        </div>

        {/* Tab productos */}
        {tab === "products" && (
          <div>
            <div className="flex items-center gap-3 mb-5 flex-wrap">
              <div className="relative flex-1 min-w-[180px]">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--color-text-muted)" }} />
                <input type="text" placeholder="Buscar producto..." value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)} className="input-base pl-9 text-sm" />
              </div>
              <p className="text-sm hidden sm:block" style={{ color: "var(--color-text-muted)" }}>
                {filteredProducts.length} de {total}
              </p>
              <button onClick={() => setShowCreate(true)} className="flex items-center gap-2 btn-primary text-sm px-4 py-2 whitespace-nowrap">
                <PlusIcon className="w-4 h-4" /> Nuevo producto
              </button>
            </div>

            {loadingProducts ? (
              <div className="flex justify-center py-20">
                <div className="w-8 h-8 border-2 rounded-full animate-spin" style={{ borderColor: "var(--color-accent)", borderTopColor: "transparent" }} />
              </div>
            ) : products.length === 0 ? (
              <div className="rounded-2xl border-2 border-dashed p-16 text-center" style={{ borderColor: "var(--color-border)" }}>
                <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: "var(--color-bg-secondary)" }}>
                  <CubeIcon className="w-8 h-8" style={{ color: "var(--color-accent)" }} />
                </div>
                <p className="font-bold text-base mb-1" style={{ color: "var(--color-text)" }}>Sin productos publicados</p>
                <p className="text-sm max-w-xs mx-auto mb-4" style={{ color: "var(--color-text-muted)" }}>
                  Crea tu primer producto y aparecerá en el catálogo automáticamente.
                </p>
                <button onClick={() => setShowCreate(true)} className="btn-primary text-sm px-5 py-2">Crear primer producto</button>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <MagnifyingGlassIcon className="w-10 h-10 mx-auto mb-3" style={{ color: "var(--color-text-muted)" }} />
                <p className="font-semibold" style={{ color: "var(--color-text)" }}>Sin resultados para "{searchQuery}"</p>
                <button onClick={() => setSearchQuery("")} className="mt-2 text-sm underline" style={{ color: "var(--color-accent)" }}>
                  Limpiar búsqueda
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredProducts.map((p) => (
                    <div key={p.id} className="group card overflow-hidden flex flex-col hover:shadow-lg transition-shadow">
                      <div className="h-40 overflow-hidden relative" style={{ backgroundColor: "var(--color-bg-secondary)" }}>
                        {p.images?.[0] ? (
                          <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        ) : (
                          <div className="h-full flex flex-col items-center justify-center gap-1">
                            <CubeIcon className="w-10 h-10" style={{ color: "var(--color-text-muted)" }} />
                          </div>
                        )}
                        <div className="absolute top-2 left-2">
                          <span className="text-xs font-bold px-2 py-0.5 rounded-full shadow"
                            style={{
                              backgroundColor: p.stock === 0 ? "#dc2626" : p.stock <= 5 ? "#d97706" : "#16a34a",
                              color: "white",
                            }}>
                            {p.stock === 0 ? "Sin stock" : p.stock <= 5 ? `⚠ ${p.stock}` : `${p.stock} uds`}
                          </span>
                        </div>
                      </div>
                      <div className="p-3 flex flex-col flex-1">
                        <p className="font-semibold text-sm line-clamp-2 mb-1 flex-1" style={{ color: "var(--color-text)" }}>{p.name}</p>
                        <p className="text-base font-black mb-3" style={{ color: "var(--color-accent)" }}>${p.price.toLocaleString("es-CO")}</p>
                        <div className="flex items-center gap-2 pt-2 border-t" style={{ borderColor: "var(--color-border)" }}>
                          <button onClick={() => openEditProduct(p)}
                            className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs font-semibold transition-colors hover:bg-blue-500/10"
                            style={{ color: "#3b82f6", border: "1px solid #3b82f620" }}>
                            <PencilSquareIcon className="w-3.5 h-3.5" /> Editar
                          </button>
                          <button onClick={() => setDeleteId(p.id)}
                            className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs font-semibold transition-colors hover:bg-red-500/10"
                            style={{ color: "#ef4444", border: "1px solid #ef444420" }}>
                            <TrashIcon className="w-3.5 h-3.5" /> Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {totalPages > 1 && (
                  <div className="flex justify-center gap-2 mt-6">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
                      <button key={pg} onClick={() => loadProducts(pg)}
                        className="w-9 h-9 rounded-xl text-sm font-bold transition-colors"
                        style={{ backgroundColor: pg === page ? "var(--color-accent)" : "var(--color-bg-secondary)", color: pg === page ? "white" : "var(--color-text-muted)" }}>
                        {pg}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Tab perfil */}
        {tab === "profile" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <form onSubmit={handleEditProfile} className="card p-6 space-y-4">
              <div>
                <h2 className="text-base font-bold" style={{ color: "var(--color-text)" }}>Información de la empresa</h2>
                <p className="text-xs mt-0.5" style={{ color: "var(--color-text-muted)" }}>Los cambios se aplican de inmediato</p>
              </div>
              {[
                { label: "Nombre de la empresa", key: "nameCompany", type: "text", placeholder: "Empresa S.A.S" },
                { label: "Email de contacto", key: "emailCompany", type: "email", placeholder: "contacto@empresa.com" },
                { label: "Teléfono", key: "tellCompany", type: "text", placeholder: "+57 300 000 0000" },
                { label: "Dirección", key: "addressCompany", type: "text", placeholder: "Calle 100 #10-20, Bogotá" },
              ].map(({ label, key, type, placeholder }) => (
                <div key={key}>
                  <label className="label-base">{label}</label>
                  <input type={type} placeholder={placeholder}
                    value={editForm[key as keyof typeof editForm]}
                    onChange={(e) => setEditForm({ ...editForm, [key]: e.target.value })}
                    className="input-base" />
                </div>
              ))}
              {editMsg.text && (
                <p className={`text-sm font-medium ${editMsg.ok ? "text-green-500" : "text-red-500"}`}>
                  {editMsg.ok ? "✅" : "❌"} {editMsg.text}
                </p>
              )}
              <button type="submit" disabled={editLoading} className="btn-primary w-full">
                {editLoading ? "Guardando..." : "Guardar cambios"}
              </button>
            </form>

            <div className="space-y-4">
              <div className="card p-5">
                <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--color-text-muted)" }}>Vista previa</p>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 rounded-xl overflow-hidden flex items-center justify-center flex-shrink-0 border"
                    style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-secondary)" }}>
                    {logoUrl ? <img src={logoUrl} alt="logo" className="w-full h-full object-cover" /> : <BuildingStorefrontIcon className="w-7 h-7" style={{ color: "var(--color-accent)" }} />}
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold truncate" style={{ color: "var(--color-text)" }}>{editForm.nameCompany || profile?.nameCompany || "—"}</p>
                    <p className="text-sm truncate" style={{ color: "var(--color-text-muted)" }}>{editForm.emailCompany || profile?.emailCompany || "—"}</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  {[
                    { label: "Teléfono", value: editForm.tellCompany || profile?.tellCompany },
                    { label: "Dirección", value: editForm.addressCompany || profile?.addressCompany },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between gap-2">
                      <span style={{ color: "var(--color-text-muted)" }}>{label}</span>
                      <span className="font-medium text-right truncate max-w-[60%]" style={{ color: "var(--color-text)" }}>{value || "—"}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card p-5">
                <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--color-text-muted)" }}>Logo de empresa</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl overflow-hidden flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "var(--color-bg-secondary)" }}>
                    {logoUrl ? <img src={logoUrl} alt="logo" className="w-full h-full object-cover" /> : <BuildingStorefrontIcon className="w-6 h-6" style={{ color: "var(--color-accent)" }} />}
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: "var(--color-text)" }}>{logoUrl ? "Logo actual" : "Sin logo"}</p>
                    <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>PNG, JPG — max 5MB</p>
                  </div>
                  <button type="button" onClick={() => editLogoRef.current?.click()} className="ml-auto btn-secondary text-xs px-3 py-1.5 flex items-center gap-1">
                    <CameraIcon className="w-3.5 h-3.5" /> Cambiar
                  </button>
                </div>
                <input ref={editLogoRef} type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
              </div>

              {profile?.memberAT && (
                <p className="text-xs text-center" style={{ color: "var(--color-text-muted)" }}>
                  Empresa en Lubix desde {new Date(profile.memberAT).getFullYear()}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modal crear */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl border shadow-xl" style={{ backgroundColor: "var(--color-bg-card)", borderColor: "var(--color-border)" }}>
            <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: "var(--color-border)" }}>
              <h2 className="font-bold text-lg" style={{ color: "var(--color-text)" }}>Nuevo producto</h2>
              <button onClick={() => { setShowCreate(false); setCreateMsg({ text: "", ok: true }); }}>
                <XMarkIcon className="w-5 h-5" style={{ color: "var(--color-text-muted)" }} />
              </button>
            </div>
            <form onSubmit={handleCreateProduct} className="p-5 space-y-4">
              <div>
                <label className="label-base">Nombre *</label>
                <input className="input-base" value={createForm.nameProduct}
                  onChange={(e) => setCreateForm({ ...createForm, nameProduct: e.target.value })} placeholder="Ej: Laptop HP ProBook" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label-base">Precio (COP) *</label>
                  <input className="input-base" type="number" min="0" value={createForm.priceProduct}
                    onChange={(e) => setCreateForm({ ...createForm, priceProduct: e.target.value })} placeholder="1500000" />
                </div>
                <div>
                  <label className="label-base">Stock *</label>
                  <input className="input-base" type="number" min="0" value={createForm.stockProduct}
                    onChange={(e) => setCreateForm({ ...createForm, stockProduct: e.target.value })} placeholder="10" />
                </div>
              </div>
              <div>
                <label className="label-base">Descripcion *</label>
                <textarea className="input-base resize-none" rows={3} value={createForm.descripcionProduct}
                  onChange={(e) => setCreateForm({ ...createForm, descripcionProduct: e.target.value })} placeholder="Describe el producto..." />
              </div>
              <div>
                <label className="label-base">Imagenes (opcional)</label>
                <div className="input-base cursor-pointer flex items-center gap-2"
                  style={{ color: createImages.length > 0 ? "var(--color-text)" : "var(--color-text-muted)" }}
                  onClick={() => imagesRef.current?.click()}>
                  <CameraIcon className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{createImages.length > 0 ? `${createImages.length} imagen(es)` : "Seleccionar imagenes..."}</span>
                </div>
                <input ref={imagesRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => setCreateImages(Array.from(e.target.files ?? []))} />
              </div>
              {createMsg.text && (
                <p className={`text-sm font-medium flex items-center gap-1 ${createMsg.ok ? "text-green-500" : "text-red-500"}`}>
                  {createMsg.ok ? <CheckIcon className="w-4 h-4" /> : "x"} {createMsg.text}
                </p>
              )}
              <div className="flex gap-3 pt-1">
                <button type="button" onClick={() => setShowCreate(false)} className="flex-1 btn-secondary py-2 text-sm">Cancelar</button>
                <button type="submit" disabled={createLoading} className="flex-1 btn-primary text-sm">{createLoading ? "Creando..." : "Crear producto"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal editar */}
      {editProduct && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl border shadow-xl" style={{ backgroundColor: "var(--color-bg-card)", borderColor: "var(--color-border)" }}>
            <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: "var(--color-border)" }}>
              <h2 className="font-bold text-lg" style={{ color: "var(--color-text)" }}>Editar producto</h2>
              <button onClick={() => setEditProduct(null)}><XMarkIcon className="w-5 h-5" style={{ color: "var(--color-text-muted)" }} /></button>
            </div>
            <form onSubmit={handleEditProduct} className="p-5 space-y-4">
              <div>
                <label className="label-base">Nombre</label>
                <input className="input-base" value={editProductForm.nameProduct}
                  onChange={(e) => setEditProductForm({ ...editProductForm, nameProduct: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label-base">Precio (COP)</label>
                  <input className="input-base" type="number" min="0" value={editProductForm.priceProduct}
                    onChange={(e) => setEditProductForm({ ...editProductForm, priceProduct: e.target.value })} />
                </div>
                <div>
                  <label className="label-base">Stock</label>
                  <input className="input-base" type="number" min="0" value={editProductForm.stockProduct}
                    onChange={(e) => setEditProductForm({ ...editProductForm, stockProduct: e.target.value })} />
                </div>
              </div>
              <div>
                <label className="label-base">Descripcion</label>
                <textarea className="input-base resize-none" rows={3} value={editProductForm.descripcionProduct}
                  onChange={(e) => setEditProductForm({ ...editProductForm, descripcionProduct: e.target.value })} />
              </div>
              {editProductMsg.text && (
                <p className={`text-sm font-medium flex items-center gap-1 ${editProductMsg.ok ? "text-green-500" : "text-red-500"}`}>
                  {editProductMsg.ok ? <CheckIcon className="w-4 h-4" /> : "x"} {editProductMsg.text}
                </p>
              )}
              <div className="flex gap-3 pt-1">
                <button type="button" onClick={() => setEditProduct(null)} className="flex-1 btn-secondary py-2 text-sm">Cancelar</button>
                <button type="submit" disabled={editProductLoading} className="flex-1 btn-primary text-sm">{editProductLoading ? "Guardando..." : "Guardar cambios"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmar eliminar */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-2xl border p-6 text-center shadow-xl" style={{ backgroundColor: "var(--color-bg-card)", borderColor: "var(--color-border)" }}>
            <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center bg-red-500/10">
              <TrashIcon className="w-7 h-7 text-red-500" />
            </div>
            <p className="font-bold text-base mb-1" style={{ color: "var(--color-text)" }}>Eliminar producto?</p>
            <p className="text-sm mb-5" style={{ color: "var(--color-text-muted)" }}>Esta accion no se puede deshacer.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 btn-secondary py-2 text-sm">Cancelar</button>
              <button onClick={() => handleDelete(deleteId)} className="flex-1 py-2 text-sm font-bold rounded-xl text-white bg-red-500 hover:bg-red-600 transition">Eliminar</button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
