export interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  categorySlug: string;
  model: string;
  description: string;
  price: number;
  discount?: number;
  rating: number;
  reviewCount: number;
  stock: number;
  image: string;
}

export const categories = [
  { slug: 'celulares', name: 'Celulares' },
  { slug: 'consolas', name: 'Consolas' },
  { slug: 'perifericos', name: 'Periféricos' },
  { slug: 'monitores', name: 'Monitores' },
  { slug: 'televisores', name: 'Televisores' },
  { slug: 'audifonos', name: 'Audífonos' },
];

export const allProducts: Product[] = [
  {
    id: 1,
    name: 'Smartphone Nova 12',
    brand: 'Nova',
    category: 'Celulares',
    categorySlug: 'celulares',
    model: 'N12',
    description: 'Pantalla AMOLED, cámara avanzada y batería de larga duración.',
    price: 2400000,
    rating: 4.6,
    reviewCount: 96,
    stock: 2,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 2,
    name: 'Consola Gamer Vortex',
    brand: 'Vortex',
    category: 'Consolas',
    categorySlug: 'consolas',
    model: 'VX-5',
    description: 'Consola de última generación con gráficos 4K y controles inalámbricos.',
    price: 2200000,
    rating: 4.7,
    reviewCount: 88,
    stock: 7,
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 3,
    name: 'Audífonos Pulse X',
    brand: 'Pulse',
    category: 'Audífonos',
    categorySlug: 'audifonos',
    model: 'PX-300',
    description: 'Audio inmersivo con cancelación de ruido activa.',
    price: 360000,
    discount: 15,
    rating: 4.7,
    reviewCount: 82,
    stock: 12,
    image: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 4,
    name: 'Monitor UltraSharp 27"',
    brand: 'Vision',
    category: 'Monitores',
    categorySlug: 'monitores',
    model: 'V27U',
    description: 'Pantalla 4K con colores precisos y conectividad USB-C.',
    price: 1850000,
    rating: 4.9,
    reviewCount: 59,
    stock: 5,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 5,
    name: 'Teclado Mecánico Pro',
    brand: 'KeyLabs',
    category: 'Periféricos',
    categorySlug: 'perifericos',
    model: 'KL-MX',
    description: 'Teclado mecánico RGB con switches táctiles para alto rendimiento.',
    price: 420000,
    discount: 10,
    rating: 4.8,
    reviewCount: 74,
    stock: 9,
    image: 'https://images.unsplash.com/photo-1518633653012-200622b6f38d?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 6,
    name: 'TV OLED Vision 55"',
    brand: 'Vision',
    category: 'Televisores',
    categorySlug: 'televisores',
    model: 'OLED55X',
    description: 'Televisor OLED con contraste infinito, Dolby Vision y sonido envolvente.',
    price: 3200000,
    rating: 4.8,
    reviewCount: 61,
    stock: 4,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80',
  },
];
