# 📱 Lubix Frontend

Frontend de la aplicación Lubix construido con **React + Vite + TypeScript + Tailwind CSS**.

**Con sistema de modo oscuro/claro completamente automático e integrado.**

## 🎯 Descripción

Lubix es una plataforma de gestión de usuarios y empresas. Este frontend proporciona una interfaz moderna y responsiva para:
- ✅ Autenticación de usuarios (Login/Register)
- ✅ Gestión de usuarios
- ✅ Gestión de empresas
- ✅ **Tema claro/oscuro automático** 🌙☀️
- ✅ Dashboard con datos en tiempo real

## 🛠️ Stack Tecnológico

- **React 19.2.6** — Librería UI moderna
- **TypeScript 6.0.3** — Seguridad de tipos en JavaScript
- **Vite 8.0.14** — Build tool rápido y optimizado
- **Tailwind CSS 3.4.19** — Framework de estilos utilitario
- **React Router 7.15.1** — Enrutamiento de páginas
- **Axios 1.16.1** — Cliente HTTP para consumir APIs
- **PostCSS + Autoprefixer 10.5.0** — Procesamiento de estilos

## 📁 Estructura del Proyecto

```
frontend/
├── src/
│   ├── components/          # Componentes reutilizables
│   │   └── navbar.tsx       # Navbar con botón de tema
│   ├── pages/               # Páginas (rutas)
│   │   ├── login.tsx        # Página de inicio de sesión
│   │   ├── registrer.tsx    # Página de registro
│   │   ├── reset-password.tsx
│   │   └── Home.tsx         # Página principal
│   ├── context/             # Context API
│   │   ├── ThemeContext.tsx # Contexto del tema
│   │   ├── ThemeProvider.tsx # Proveedor del tema
│   │   ├── AuthContext.tsx
│   │   └── AuthProvider.tsx
│   ├── constants/           # Variables globales
│   │   ├── colors.ts        # Colores globales (DESUSO)
│   │   └── useThemeColor.ts # Hook para colores (DESUSO)
│   ├── services/            # Servicios HTTP
│   ├── App.tsx              # Componente raíz con rutas
│   ├── index.css            # 🎨 ESTILOS GLOBALES + VARIABLES CSS
│   └── main.tsx             # Punto de entrada
├── tailwind.config.js       # Configuración de Tailwind
├── package.json             # Dependencias y scripts
└── README.md                # Este archivo
```

---

# 🎨 SISTEMA DE COLORES Y TEMA CLARO/OSCURO

Este proyecto implementa un sistema de colores centralizado basado en **variables CSS**, permitiendo cambios globales con un solo click.

## 📍 ¿Dónde Están los Colores?

**`src/index.css`** es el archivo principal donde se definen TODOS los colores de la aplicación.

```css
/* Modo Claro (por defecto) */
html {
  --color-bg: rgb(255, 255, 255);           /* Blanco */
  --color-text: rgb(17, 24, 39);            /* Negro */
  --color-accent: rgb(34, 197, 94);         /* Verde */
  /* ... más colores */
}

/* Modo Oscuro (cuando html tiene clase "dark") */
html.dark {
  --color-bg: rgb(3, 7, 18);                /* Negro muy oscuro */
  --color-text: rgb(248, 250, 252);         /* Blanco */
  --color-accent: rgb(34, 197, 94);         /* Verde (igual en ambos) */
  /* ... más colores */
}
```

---

## 🚀 ¿Cómo Cambiar Colores?

### **Opción 1: Cambiar UN color globalmente (Lo más fácil)**

Abre `src/index.css` y busca la sección de variables CSS:

```css
html {
  --color-bg: rgb(255, 255, 255);    /* ← Cambiar esto */
  --color-text: rgb(17, 24, 39);
  --color-accent: rgb(34, 197, 94);  /* ← O esto */
}
```

**Ejemplo:** Quieres que el verde principal sea azul:

```css
html {
  --color-accent: rgb(59, 130, 246);  /* Azul en lugar de verde */
}

html.dark {
  --color-accent: rgb(147, 197, 253); /* Azul claro para modo oscuro */
}
```

✅ **LISTO.** Se cambia en TODA la app automáticamente.

---

### **Opción 2: Cambiar MÚLTIPLES colores**

Abre `src/index.css` y personaliza la sección:

```css
/* Modo Claro */
html {
  --color-bg: rgb(255, 255, 255);           /* Fondo claro */
  --color-bg-secondary: rgb(249, 250, 251); /* Fondo alternativo */
  --color-text: rgb(17, 24, 39);            /* Texto oscuro */
  --color-text-muted: rgb(107, 114, 128);   /* Texto gris */
  --color-border: rgb(229, 231, 235);       /* Bordes grises */
  --color-btn-primary: rgb(34, 197, 94);    /* Botones */
  --color-accent: rgb(34, 197, 94);         /* Color principal */
}

/* Modo Oscuro */
html.dark {
  --color-bg: rgb(3, 7, 18);                /* Fondo oscuro */
  --color-bg-secondary: rgb(15, 23, 42);
  --color-text: rgb(248, 250, 252);         /* Texto claro */
  --color-text-muted: rgb(148, 163, 184);
  --color-border: rgb(71, 85, 105);
  --color-btn-primary: rgb(34, 197, 94);
  --color-accent: rgb(34, 197, 94);
}
```

---

## 🎯 ¿Cómo Usar los Colores en Componentes?

### **Forma 1: Directamente en las clases Tailwind**

```tsx
<div className="card">
  <h2 className="text-accent">Título</h2>
  <p className="text-muted">Subtítulo</p>
  <button className="btn-primary">Click</button>
</div>
```

Las clases `card`, `btn-primary`, `text-accent`, etc. están definidas en `src/index.css` y usan automáticamente las variables CSS.

### **Forma 2: Usando `style` inline (Para colores dinámicos)**

```tsx
<div style={{ backgroundColor: "var(--color-bg)", color: "var(--color-text)" }}>
  Contenido que cambia con el tema
</div>
```

### **Forma 3: En archivos CSS personalizados**

```css
.mi-componente {
  background-color: var(--color-bg-card);
  color: var(--color-text);
  border-color: var(--color-border);
}
```

---

## 📚 Clases CSS Reutilizables

El proyecto viene con clases pre-hechas que cambian automáticamente:

| Clase | Uso | Ejemplo |
|-------|-----|---------|
| `.page-container` | Contenedor principal de página | Fondo y texto automáticos |
| `.section-bg` | Secciones alternadas | Info sections, listas |
| `.card` | Tarjetas de contenido | Cards de info |
| `.input-base` | Inputs de formulario | Email, password, etc. |
| `.label-base` | Labels de formularios | Encima de inputs |
| `.btn-primary` | Botón principal | "Iniciar Sesión" |
| `.btn-secondary` | Botón secundario | Botones de acción |
| `.text-accent` | Texto principal | Títulos importantes |
| `.text-muted` | Texto secundario | Subtítulos, descripciones |
| `.popup-success` | Mensaje de éxito | Notificaciones verdes |
| `.popup-error` | Mensaje de error | Notificaciones rojas |
| `.divider` | Línea divisora | Bordes entre secciones |

### Ejemplo de uso:

```tsx
// Antes (Hardcoded)
<div className="bg-white dark:bg-gray-950 text-black dark:text-white p-4">

// Después (Con clases)
<div className="card">
```

---

## 🌙 ¿Cómo Funciona el Tema Claro/Oscuro?

### 1️⃣ **Detección Automática al Abrir la App**

```typescript
// En src/context/ThemeProvider.tsx
const [theme, setTheme] = useState<ThemeType>(() => {
  // 1. Busca en localStorage si el usuario ya eligió
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) return savedTheme;

  // 2. Si no, detecta la preferencia de Windows
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }

  // 3. Por defecto, claro
  return "light";
});
```

### 2️⃣ **Cambiar Tema (Botón en Navbar)**

El usuario hace clic en el botón de luna/sol en el navbar:

```tsx
const { toggleTheme } = useTheme();

<button onClick={toggleTheme}>
  {/* Luna si está en claro, Sol si está en oscuro */}
</button>
```

### 3️⃣ **Persitencia**

El tema se guarda en `localStorage`, así que si el usuario vuelve:
- Si eligió **oscuro**, abrirá en **oscuro**
- Si eligió **claro**, abrirá en **claro**

---

## 📝 Lista Completa de Variables CSS

### Fondos
```css
--color-bg              /* Fondo principal */
--color-bg-secondary    /* Fondo secundario */
--color-bg-card         /* Fondo de cards */
--color-bg-input        /* Fondo de inputs */
```

### Textos
```css
--color-text            /* Texto principal */
--color-text-muted      /* Texto secundario */
```

### Bordes
```css
--color-border          /* Borde principal */
--color-border-light    /* Borde claro */
```

### Botones
```css
--color-btn-primary     /* Botón principal */
--color-btn-primary-hover /* Botón principal hover */
--color-btn-secondary   /* Botón secundario */
```

### Navbar
```css
--color-navbar          /* Fondo navbar */
--color-navbar-border   /* Borde navbar */
```

### Acentos y Estado
```css
--color-accent          /* Color principal (verde) */
--color-accent-light    /* Verde claro */
--color-accent-dark     /* Verde oscuro */
--color-success         /* Fondo success */
--color-success-text    /* Texto success */
--color-error           /* Fondo error */
--color-error-text      /* Texto error */
```

---

## 🔧 Paso a Paso: Agregar un Nuevo Componente CON TEMA

### 1. Define la estructura HTML

```tsx
function MiComponente() {
  return (
    <div>
      <h1>Mi Componente</h1>
      <p>Descripción</p>
      <button>Click</button>
    </div>
  );
}
```

### 2. Usa las clases CSS

```tsx
function MiComponente() {
  return (
    <div className="card">                  {/* Usa .card */}
      <h1 className="text-accent">Título</h1>
      <p className="text-muted">Descripción</p>
      <button className="btn-primary">Click</button>
    </div>
  );
}
```

✅ **LISTO.** Automáticamente:
- ✓ Tiene fondo claro en modo claro
- ✓ Tiene fondo oscuro en modo oscuro
- ✓ El texto cambia automáticamente
- ✓ Los botones cambian de color
- ✓ Los bordes se adaptan

---

## ⚡ Ventajas de Este Sistema

✅ **Un solo archivo** para cambiar todos los colores (`src/index.css`)  
✅ **Sin código repetido** - una clase hace todo  
✅ **Cambios globales instantáneos** - cambias 1 variable y se actualiza en toda la app  
✅ **Tema automático** - detecta preferencia de Windows  
✅ **Persitencia** - recuerda la elección del usuario  
✅ **Transiciones suaves** - cambios con animaciones  
✅ **Modo claro** - perfecto para días  
✅ **Modo oscuro** - perfecto para noches  

---

## 🚀 Cómo Iniciar

### 1. Instalar Dependencias

```bash
cd frontend
npm install
```

### 2. Ejecutar en Modo Desarrollo

```bash
npm run dev
```

Abre `http://localhost:5173` en tu navegador. El servidor recargará automáticamente si haces cambios.

### 3. Compilar para Producción

```bash
npm run build
```

Genera una carpeta `dist/` optimizada para deploy.

### 4. Previsualizar Build de Producción

```bash
npm run preview
```

---

## ✨ Cambios Recientes Implementados

### 🎨 Sistema de Tema Claro/Oscuro (NUEVO)

Se implementó un sistema completo de tema claro/oscuro basado en **variables CSS**:

✅ **Variables CSS centralizadas** en `src/index.css`  
✅ **Detección automática** de preferencia de Windows al abrir la app  
✅ **Botón luna/sol** en el navbar para cambiar manualmente  
✅ **Persistencia** en localStorage - el tema se recuerda  
✅ **Transiciones suaves** de 300ms entre temas  
✅ **Clases CSS reutilizables** que cambian automáticamente:
  - `.page-container` - Contenedor de página
  - `.card` - Tarjetas
  - `.input-base` - Inputs
  - `.btn-primary` - Botones principales
  - `.text-accent` - Texto importante
  - `.text-muted` - Texto secundario
  - Y más...

### 🔧 Cómo Funciona

1. **Archivos clave:**
   - `src/context/ThemeContext.tsx` - Define el contexto
   - `src/context/ThemeProvider.tsx` - Lógica del tema
   - `src/index.css` - Variables CSS y clases
   - `src/main.tsx` - Envuelve con ThemeProvider

2. **Flujo:**
   ```
   Usuario abre app
   ↓
   ThemeProvider detecta preferencia de Windows o localStorage
   ↓
   Aplica clase "dark" a <html>
   ↓
   Las variables CSS cambian automáticamente
   ↓
   Toda la app se ve clara u oscura
   ```

3. **Usuario hace clic en botón de luna:**
   ```
   Click en botón
   ↓
   toggleTheme() ejecuta
   ↓
   Clase "dark" se agrega/remueve
   ↓
   Variables CSS cambian
   ↓
   localStorage guarda la preferencia
   ```

### 📖 Documentación Completa

Lee la sección **"🎨 SISTEMA DE COLORES Y TEMA CLARO/OSCURO"** arriba en este README para:
- Cómo cambiar colores
- Cómo usar en componentes
- Lista de variables CSS
- Ejemplos prácticos

### 1. Dependencias ajustadas y más seguras
Se dejaron las versiones de los paquetes con números exactos en `package.json`, en lugar de usar rangos amplios.
Esto ayuda a:
- Evitar cambios inesperados al instalar
- Reproducir el proyecto igual en cualquier equipo
- Reducir riesgo de incompatibilidades y vulnerabilidades

### 2. Registro unificado: usuario y empresa en una sola pantalla
La página de registro ahora funciona como un solo formulario con un selector superior para elegir entre:
- Usuario
- Empresa

Cuando se selecciona "Empresa", aparecen campos extra como:
- Nombre de la empresa
- NIT
- Dirección
- Sector

El diseño visual no cambió, solo se hizo dinámico.

### 3. Corrección de errores de lógica en el formulario
Se solucionaron dos problemas importantes:
- el modo empresa estaba enviando el nombre de la empresa como si fuera el nombre del contacto
- la confirmación de contraseña no estaba validándose correctamente en todos los casos

Esto se corrigió en `src/pages/registrer.tsx` para que el formulario funcione de forma consistente.

## 🧭 Cómo lo hice paso a paso

1. Revisé el archivo de dependencias (`package.json`) y piné versiones exactas.
2. Verifiqué que el proyecto siguiera compilando con `pnpm build`.
3. Revisé la página de registro en `src/pages/registrer.tsx`.
4. Identifiqué el problema de lógica del formulario y lo corregí.
5. Unifiqué la experiencia de usuario/empresa en una sola pantalla sin tocar el estilo principal.
6. Volví a validar con `pnpm build` para asegurar que todo siguiera funcionando.

## 🔎 Qué se verificó

Se ejecutaron estas comprobaciones para confirmar que el proyecto quedó estable:

```bash
pnpm build
pnpm lint
```

El build terminó correctamente, lo que confirma que la página compila sin errores.

## 📄 Páginas Principales

### 1. **Login** (`src/pages/login.tsx`)
- Página inicial de la aplicación
- Formulario para iniciar sesión con email y contraseña
- Opción para continuar con Google
- Link para ir a la página de registro
- **Ruta:** `/`

### 2. **Registro** (`src/pages/registrer.tsx`)
- Formulario para crear nueva cuenta
- Campos: nombre, email, contraseña, confirmación
- Aceptación de términos y condiciones
- Link para volver al login
- **Ruta:** `/register`

### 3. **Home** (`src/pages/Home.tsx`)
- Dashboard principal tras autenticarse
- Mostrar datos del usuario
- Acceso a gestión de usuarios y empresas
- **Ruta:** `/home` (próximamente protegida)

## 🔌 Servicios HTTP

### `src/services/api.ts`
Instancia centralizada de **axios** para comunicarse con el backend.

**Próximamente:**
- Configurar URL base del backend (`http://localhost:8000`)
- Funciones para cada endpoint: `/users`, `/companies`, `/auth`
- Interceptores para autenticación con JWT

**Ejemplo de uso:**
```typescript
import api from './services/api';

// GET usuarios
const users = await api.get('/users');

// POST usuario
const newUser = await api.post('/users', { name: 'Juan' });
```

### `src/services/auth.ts`
Funciones auxiliares para autenticación.

**Próximamente:**
- `login(email, password)` — Envía credenciales y obtiene token
- `register(name, email, password)` — Crea nuevo usuario
- `logout()` — Limpia sesión

## 🎨 Estilos Tailwind

Toda la interfaz usa **Tailwind CSS** para estilos utilitarios:

```tsx
<div className="bg-gray-800 p-6 rounded-lg text-white">
  <h1 className="text-2xl font-bold text-green-400">Lubix</h1>
</div>
```

### Configuración de Colores Principales
- **Fondo:** `gray-900`, `gray-800`
- **Acento:** `green-400`, `green-500`, `green-600`
- **Texto:** `white`, `gray-300`, `gray-400`

## 🔐 Autenticación (En Desarrollo)

El login/registro actualmente solo valida en el front. **Próximos pasos:**

1. Conectar `src/services/auth.ts` con endpoints del backend
2. Guardar token JWT en `localStorage`
3. Crear rutas protegidas con `ProtectedRoute`
4. Implementar auto-logout si token expira

## 📋 Rutas de la Aplicación

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/` | Login | Iniciar sesión |
| `/register` | Register | Crear cuenta |
| `/home` | Home | Dashboard principal |

**Próximamente:**
- `/users` — Gestión de usuarios
- `/companies` — Gestión de empresas
- `/perfil` — Perfil del usuario

## 🔄 Flujo de Usuarios

```
inicio
  ↓
[Login]
  ├── ¿Tiene cuenta? → [Iniciar Sesión] → [Home]
  └── ¿Sin cuenta? → [Registrarse] → [Crear Cuenta] → [Login] → [Home]
```

## 🛠️ Comandos Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor dev en http://localhost:5173

# Linting
npm run lint         # Ejecuta ESLint para verificar código

# Build
npm run build        # Compila para producción
npm run preview      # Previsualiza el build
```

## 📦 Dependencias Principales

| Paquete | Versión | Propósito |
|---------|---------|----------|
| react | 19.2.6 | Librería UI |
| react-router-dom | 7.15.1 | Enrutamiento |
| axios | 1.16.1 | HTTP client |
| tailwindcss | 3.4.19 | Estilos |
| typescript | 6.0.3 | Type checking |
| vite | 8.0.14 | Build tool |

## 🔧 Configuración Clave

### Tailwind (`tailwind.config.js`)
```javascript
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [],
}
```

### Vite (`vite.config.ts`)
- Plugin React activado para JSX
- Modo desarrollo en puerto 5173

### TypeScript (`tsconfig.json`)
- Target ES2020
- JSX con React

## 🚀 Próximos Pasos

### Corto Plazo
- [ ] Conectar login/registro al backend
- [ ] Implementar protección de rutas
- [ ] Guardar token en localStorage
- [ ] Crear NavBar principal

### Mediano Plazo
- [ ] Página de gestión de usuarios (CRUD)
- [ ] Página de gestión de empresas (CRUD)
- [ ] Dashboard con gráficos
- [ ] Perfil de usuario editable

### Largo Plazo
- [ ] Tests unitarios e integración
- [ ] Deploy en hosting (Vercel/Netlify)
- [ ] PWA (Progressive Web App)
- [ ] Internacionalización (i18n)

## 🤝 Cómo Contribuir

1. Crea una rama para tu feature: `git checkout -b feature/mi-feature`
2. Haz cambios y commitea: `git commit -m 'Add: descripción'`
3. Push a la rama: `git push origin feature/mi-feature`
4. Abre un Pull Request

## 📚 Recursos

- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [React Router Docs](https://reactrouter.com)
- [TypeScript Docs](https://www.typescriptlang.org)

## 📝 Notas de Desarrollo

- Todos los componentes deben ser **funcionales** con hooks
- Usar **TypeScript** en todos los archivos (`.tsx` para componentes)
- Tailwind classes en lugar de CSS files (cuando sea posible)
- Mantener componentes **pequeños y reutilizables**
- Documentar funciones complejas

## 🐛 Troubleshooting

**Problema:** Los estilos Tailwind no aparecen
- **Solución:** Asegúrate de que `index.css` esté importado en `main.tsx`

**Problema:** Error de rutas
- **Solución:** Verifica que `BrowserRouter` esté en `main.tsx` y las rutas estén en `App.tsx`

**Problema:** Puerto 5173 en uso
- **Solución:** `npm run dev -- --port 3000` (usa otro puerto)

---

**Versión:** 1.0.0  
**Última actualización:** Marzo 2026  
**Autor:** Equipo Lubix

import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
