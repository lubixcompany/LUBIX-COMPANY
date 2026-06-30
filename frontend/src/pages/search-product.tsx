import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Navbar from '../components/navbar';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../context/AuthContext';
import { Toaster, toast } from 'sonner';
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Clock,
  PackageSearch,
  Search,
  ShoppingCart,
  SlidersHorizontal,
  Star,
  Tag,
  TrendingUp,
  X,
} from 'lucide-react';
import { allProducts, categories } from '../data/products';

type SortOption = 'relevance' | 'price_asc' | 'price_desc' | 'rating' | 'newest';

const sortLabels: Record<SortOption, string> = {
  relevance: 'Más relevantes',
  price_asc: 'Menor precio',
  price_desc: 'Mayor precio',
  rating: 'Mejor calificados',
  newest: 'Más recientes',
};

const priceRanges = [
  { label: 'Hasta $500.000', min: 0, max: 500000 },
  { label: '$500.000 – $1.500.000', min: 500000, max: 1500000 },
  { label: '$1.500.000 – $5.000.000', min: 1500000, max: 5000000 },
  { label: '$5.000.000 – $15.000.000', min: 5000000, max: 15000000 },
  { label: 'Más de $15.000.000', min: 15000000, max: Infinity },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star key={s} className={`h-3 w-3 ${s <= Math.round(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300 dark:text-slate-600'}`} />
      ))}
    </div>
  );
}

function FiltersPanel({
  selectedCategories,
  toggleCategory,
  selectedPriceRange,
  setSelectedPriceRange,
  onlyDiscount,
  setOnlyDiscount,
  minRating,
  setMinRating,
  activeFilterCount,
  clearFilters,
  baseResults,
}: {
  selectedCategories: Set<string>;
  toggleCategory: (slug: string) => void;
  selectedPriceRange: number | null;
  setSelectedPriceRange: (value: number | null) => void;
  onlyDiscount: boolean;
  setOnlyDiscount: (value: boolean) => void;
  minRating: number;
  setMinRating: (value: number) => void;
  activeFilterCount: number;
  clearFilters: () => void;
  baseResults: typeof allProducts;
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white">Filtros</h3>
        {activeFilterCount > 0 ? (
          <button onClick={clearFilters} className="flex items-center gap-1 text-xs font-medium text-rose-500 transition hover:text-rose-400">
            <X className="h-3.5 w-3.5" /> Limpiar ({activeFilterCount})
          </button>
        ) : null}
      </div>

      <div>
        <h4 className="mb-3 text-sm font-semibold text-slate-700 dark:text-slate-300">Categoría</h4>
        <div className="space-y-2">
          {categories.map((cat) => {
            const count = baseResults.filter((product) => product.categorySlug === cat.slug).length;
            return (
              <label key={cat.slug} className="flex cursor-pointer items-center justify-between gap-2 rounded-lg px-2 py-1.5 transition hover:bg-slate-100 dark:hover:bg-slate-800">
                <div className="flex items-center gap-2.5">
                  <input type="checkbox" checked={selectedCategories.has(cat.slug)} onChange={() => toggleCategory(cat.slug)} className="h-4 w-4 rounded border-slate-300 accent-emerald-500" />
                  <span className="text-sm text-slate-700 dark:text-slate-300">{cat.name}</span>
                </div>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500 dark:bg-slate-800 dark:text-slate-400">{count}</span>
              </label>
            );
          })}
        </div>
      </div>

      <div>
        <h4 className="mb-3 text-sm font-semibold text-slate-700 dark:text-slate-300">Precio</h4>
        <div className="space-y-2">
          {priceRanges.map((range, index) => (
            <label key={`${range.label}-${index}`} className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 transition hover:bg-slate-100 dark:hover:bg-slate-800">
              <input type="radio" name="priceRange" checked={selectedPriceRange === index} onChange={() => setSelectedPriceRange(selectedPriceRange === index ? null : index)} className="h-4 w-4 accent-emerald-500" />
              <span className="text-sm text-slate-700 dark:text-slate-300">{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="mb-3 text-sm font-semibold text-slate-700 dark:text-slate-300">Calificación</h4>
        <div className="space-y-2">
          {[4.5, 4.0, 3.5].map((rating) => (
            <button key={rating} onClick={() => setMinRating(minRating === rating ? 0 : rating)} className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${minRating === rating ? 'border border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-400' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'}`}>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className={`h-3 w-3 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300 dark:text-slate-600'}`} />
                ))}
              </div>
              <span>{rating}+ estrellas</span>
            </button>
          ))}
        </div>
      </div>

      <label className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 transition hover:bg-slate-100 dark:hover:bg-slate-800">
        <input type="checkbox" checked={onlyDiscount} onChange={(event) => setOnlyDiscount(event.target.checked)} className="h-4 w-4 rounded border-slate-300 accent-emerald-500" />
        <div className="flex items-center gap-1.5">
          <Tag className="h-3.5 w-3.5 text-yellow-500" />
          <span className="text-sm text-slate-700 dark:text-slate-300">Con descuento</span>
        </div>
      </label>
    </div>
  );
}

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q')?.trim() ?? '';
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const [sort, setSort] = useState<SortOption>('relevance');
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  const [selectedPriceRange, setSelectedPriceRange] = useState<number | null>(null);
  const [onlyDiscount, setOnlyDiscount] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);

  const baseResults = useMemo(() => {
    if (!query) return allProducts;
    const normalizedQuery = query.toLowerCase();
    return allProducts.filter((product) => [product.name, product.brand, product.category, product.model, product.description].some((value) => value.toLowerCase().includes(normalizedQuery)));
  }, [query]);

  const results = useMemo(() => {
    let list = [...baseResults];

    if (selectedCategories.size > 0) {
      list = list.filter((product) => selectedCategories.has(product.categorySlug));
    }

    if (selectedPriceRange !== null) {
      const range = priceRanges[selectedPriceRange];
      list = list.filter((product) => product.price >= range.min && product.price <= range.max);
    }

    if (onlyDiscount) {
      list = list.filter((product) => product.discount);
    }

    if (minRating > 0) {
      list = list.filter((product) => product.rating >= minRating);
    }

    switch (sort) {
      case 'price_asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        list.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        list.sort((a, b) => b.id - a.id);
        break;
      default:
        break;
    }

    return list;
  }, [baseResults, selectedCategories, selectedPriceRange, onlyDiscount, minRating, sort]);

  const activeFilterCount = selectedCategories.size + (selectedPriceRange !== null ? 1 : 0) + (onlyDiscount ? 1 : 0) + (minRating > 0 ? 1 : 0);

  const clearFilters = () => {
    setSelectedCategories(new Set());
    setSelectedPriceRange(null);
    setOnlyDiscount(false);
    setMinRating(0);
    setSort('relevance');
  };

  const toggleCategory = (slug: string) => {
    setSelectedCategories((previous) => {
      const next = new Set(previous);
      if (next.has(slug)) {
        next.delete(slug);
      } else {
        next.add(slug);
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Encabezado de resultados */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
            <Link to="/" className="hover:text-green-500 transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Inicio
            </Link>
            <span>/</span>
            <span>Búsqueda</span>
          </div>

          {query ? (
            <div className="flex flex-col sm:flex-row sm:items-end gap-1">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Resultados para:{' '}
                <span className="text-green-500">&ldquo;{query}&rdquo;</span>
              </h1>
              <span className="text-gray-500 dark:text-gray-400 text-sm sm:mb-0.5">
                — {baseResults.length} {baseResults.length === 1 ? 'producto encontrado' : 'productos encontrados'}
              </span>
            </div>
          ) : (
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Todos los productos
            </h1>
          )}
        </div>

        <div className="flex gap-7">
          {/* ── Sidebar filtros (desktop) ───────────────────────────────── */}
          <aside className="hidden lg:block w-60 flex-shrink-0">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 p-5 sticky top-24">
              <FiltersPanel
                selectedCategories={selectedCategories}
                toggleCategory={toggleCategory}
                selectedPriceRange={selectedPriceRange}
                setSelectedPriceRange={setSelectedPriceRange}
                onlyDiscount={onlyDiscount}
                setOnlyDiscount={setOnlyDiscount}
                minRating={minRating}
                setMinRating={setMinRating}
                activeFilterCount={activeFilterCount}
                clearFilters={clearFilters}
                baseResults={baseResults}
              />
            </div>
          </aside>

          {/* ── Área principal ─────────────────────────────────────────── */}
          <div className="flex-1 min-w-0">
            {/* Barra superior: botón filtros mobile + selector de orden */}
            <div className="flex items-center justify-between mb-5 gap-3 flex-wrap">
              <button
                onClick={() => setShowFilters(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm text-gray-700 dark:text-gray-300 hover:border-green-400 transition-all"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filtros
                {activeFilterCount > 0 && (
                  <span className="bg-green-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              {/* Selector de ordenamiento */}
              <div className="relative ml-auto">
                <button
                  onClick={() => setShowSortMenu(!showSortMenu)}
                  onBlur={() => setTimeout(() => setShowSortMenu(false), 120)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm text-gray-700 dark:text-gray-300 hover:border-green-400 transition-all min-w-[180px] justify-between"
                >
                  <span className="flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    {sortLabels[sort]}
                  </span>
                  {showSortMenu ? <ChevronUp className="w-4 h-4 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 flex-shrink-0" />}
                </button>
                {showSortMenu && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl shadow-xl overflow-hidden z-30">
                    {(Object.keys(sortLabels) as SortOption[]).map((key) => (
                      <button
                        key={key}
                        onClick={() => { setSort(key); setShowSortMenu(false); }}
                        className={`w-full flex items-center gap-2.5 px-4 py-3 text-sm text-left transition-colors ${
                          sort === key
                            ? 'bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 font-medium'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700'
                        }`}
                      >
                        {key === 'relevance'  && <Search className="w-3.5 h-3.5" />}
                        {key === 'price_asc'  && <span className="text-xs font-bold">$↑</span>}
                        {key === 'price_desc' && <span className="text-xs font-bold">$↓</span>}
                        {key === 'rating'     && <Star className="w-3.5 h-3.5" />}
                        {key === 'newest'     && <Clock className="w-3.5 h-3.5" />}
                        {sortLabels[key]}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* ── Estado vacío ───────────────────────────────────────────── */}
            {results.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
                <div className="w-24 h-24 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
                  <PackageSearch className="w-12 h-12 text-gray-300 dark:text-gray-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {activeFilterCount > 0
                    ? 'Sin resultados con estos filtros'
                    : `No encontramos productos para "${query}"`}
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-8 max-w-sm">
                  {activeFilterCount > 0
                    ? 'Intenta ajustar o eliminar los filtros aplicados para ver más productos.'
                    : 'Verifica la ortografía o intenta con términos más generales como la marca o categoría.'}
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  {activeFilterCount > 0 && (
                    <button
                      onClick={clearFilters}
                      className="flex items-center gap-2 px-5 py-2.5 bg-green-500 hover:bg-green-400 text-white rounded-xl font-semibold transition-all shadow-lg shadow-green-500/30"
                    >
                      <X className="w-4 h-4" /> Limpiar filtros
                    </button>
                  )}
                  <Link
                    to="/"
                    className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 hover:border-green-400 dark:hover:border-green-500 rounded-xl font-semibold transition-all"
                  >
                    <ArrowLeft className="w-4 h-4" /> Volver al catálogo
                  </Link>
                </div>

                {/* Sugerencias de búsqueda */}
                {activeFilterCount === 0 && (
                  <div className="mt-10 w-full max-w-md">
                    <p className="text-gray-400 dark:text-gray-500 text-xs uppercase tracking-wider mb-3 font-semibold">
                      Quizás te interesa
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {['MacBook', 'iPhone', 'PlayStation', 'Samsung', 'Sony', 'Cámara'].map((tag) => (
                        <Link
                          key={tag}
                          to={`/search?q=${encodeURIComponent(tag)}`}
                          className="px-3 py-1.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-gray-400 hover:border-green-400 hover:text-green-600 dark:hover:text-green-400 rounded-full text-sm transition-all"
                        >
                          {tag}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* ── Grid de resultados ───────────────────────────────────── */
              <>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                  Mostrando <span className="font-semibold text-gray-900 dark:text-white">{results.length}</span> de{' '}
                  <span className="font-semibold text-gray-900 dark:text-white">{baseResults.length}</span> productos
                </p>

                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                  {results.map((product) => {
                    const dp = product.discount
                      ? product.price - (product.price * product.discount) / 100
                      : product.price;

                    return (
                      <div
                        key={product.id}
                        className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 overflow-hidden hover:shadow-xl hover:shadow-green-500/10 hover:border-green-300 dark:hover:border-green-500/40 transition-all group"
                      >
                        <Link to={`/product/${product.id}`} className="block">
                          <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-slate-800">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            {product.discount && (
                              <div className="absolute top-2 right-2 bg-yellow-400 text-slate-900 px-2 py-0.5 rounded-full text-xs font-bold shadow">
                                -{product.discount}%
                              </div>
                            )}
                            {product.stock <= 3 && product.stock > 0 && (
                              <div className="absolute bottom-2 left-2 bg-red-500/90 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-full font-medium">
                                ¡Últimas {product.stock}!
                              </div>
                            )}
                          </div>
                        </Link>

                        <div className="p-3">
                          {/* Categoría */}
                          <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                            {product.category}
                          </span>

                          {/* Nombre */}
                          <Link to={`/product/${product.id}`}>
                            <h3 className="text-gray-900 dark:text-gray-200 text-sm font-medium line-clamp-2 min-h-[2.5rem] mt-0.5 mb-2 hover:text-green-600 dark:hover:text-green-400 transition-colors">
                              {product.name}
                            </h3>
                          </Link>

                          {/* Calificación */}
                          <div className="flex items-center gap-1.5 mb-2">
                            <StarRating rating={product.rating} />
                            <span className="text-gray-400 dark:text-gray-500 text-xs">
                              ({product.reviewCount})
                            </span>
                          </div>

                          {/* Precio */}
                          <div className="flex items-baseline gap-1.5 mb-3">
                            <span className="text-green-600 dark:text-green-400 font-bold text-base">
                              ${dp.toLocaleString('es-CO')}
                            </span>
                            {product.discount && (
                              <span className="text-gray-400 line-through text-xs">
                                ${product.price.toLocaleString('es-CO')}
                              </span>
                            )}
                          </div>

                          {/* Botón agregar al carrito */}
                          {isAuthenticated ? (
                            <button
                              onClick={() => {
                                addToCart({
                                  id: product.id,
                                  name: product.name,
                                  price: product.price,
                                  image: product.image,
                                  category: product.category,
                                  discount: product.discount,
                                });
                                toast.success('Agregado al carrito', {
                                  description: product.name,
                                });
                              }}
                              className="w-full flex items-center justify-center gap-1.5 py-2 bg-green-500 hover:bg-green-400 active:scale-95 text-white rounded-lg text-sm font-semibold transition-all"
                            >
                              <ShoppingCart className="w-3.5 h-3.5" />
                              Agregar al carrito
                            </button>
                          ) : (
                            <Link
                              to="/login"
                              className="w-full flex items-center justify-center gap-1.5 py-2 bg-green-500/60 hover:bg-green-500 text-white rounded-lg text-sm font-semibold transition-all"
                            >
                              <ShoppingCart className="w-3.5 h-3.5" />
                              Inicia sesión para comprar
                            </Link>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <Toaster richColors position="top-right" />

      {/* ── Drawer de filtros (mobile) ──────────────────────────────────── */}
      {showFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowFilters(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-slate-900 rounded-t-2xl shadow-2xl max-h-[88vh] flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-slate-800">
              <h2 className="font-bold text-gray-900 dark:text-white text-lg">Filtros</h2>
              <button
                onClick={() => setShowFilters(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-5">
              <FiltersPanel
                selectedCategories={selectedCategories}
                toggleCategory={toggleCategory}
                selectedPriceRange={selectedPriceRange}
                setSelectedPriceRange={setSelectedPriceRange}
                onlyDiscount={onlyDiscount}
                setOnlyDiscount={setOnlyDiscount}
                minRating={minRating}
                setMinRating={setMinRating}
                activeFilterCount={activeFilterCount}
                clearFilters={clearFilters}
                baseResults={baseResults}
              />
            </div>
            <div className="px-6 py-4 border-t border-gray-100 dark:border-slate-800">
              <button
                onClick={() => setShowFilters(false)}
                className="w-full py-3 bg-green-500 hover:bg-green-400 text-white rounded-xl font-semibold transition-all shadow-lg shadow-green-500/30"
              >
                Ver {results.length} {results.length === 1 ? 'resultado' : 'resultados'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
