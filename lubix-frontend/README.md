# 📱 Lubix Frontend

Frontend de la aplicación Lubix construido con **React + Vite + TypeScript + Tailwind CSS**.

## 🎯 Descripción

Lubix es una plataforma de gestión de usuarios y empresas. Este frontend proporciona una interfaz moderna y responsiva para:
- Autenticación de usuarios (Login/Register)
- Gestión de usuarios
- Gestión de empresas
- Dashboard con datos en tiempo real

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
│   │   └── (NavBar, Cards, etc.)
│   ├── pages/               # Páginas (rutas)
│   │   ├── login.tsx        # Página de inicio de sesión
│   │   ├── registrer.tsx    # Página de registro
│   │   └── Home.tsx         # Página principal (después de login)
│   ├── services/            # Servicios HTTP y lógica
│   │   ├── api.ts           # Instancia de axios + endpoints
│   │   └── auth.ts          # Funciones de autenticación
│   ├── App.tsx              # Componente raíz con rutas
│   ├── App.css              # Estilos globales
│   ├── index.css            # Directivas de Tailwind
│   └── main.tsx             # Punto de entrada
├── public/                  # Recursos estáticos
├── index.html               # HTML principal
├── vite.config.ts           # Configuración de Vite
├── tailwind.config.js       # Configuración de Tailwind
├── tsconfig.json            # Configuración de TypeScript
├── package.json             # Dependencias y scripts
└── README.md                # Este archivo
```

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

## ✅ Cambios recientes realizados

### 1. Dependencias ajustadas y más seguras
Se dejaron las versiones de los paquetes con números exactos en `package.json`, en lugar de usar rangos amplios.
Esto ayuda a:
- evitar cambios inesperados al instalar
- reproducir el proyecto igual en cualquier equipo
- reducir riesgo de incompatibilidades y vulnerabilidades

### 2. Registro unificado: usuario y empresa en una sola pantalla
La página de registro ahora funciona como un solo formulario con un selector superior para elegir entre:
- Usuario
- Empresa

Cuando se selecciona "Empresa", aparecen campos extra como:
- nombre de la empresa
- NIT
- dirección
- sector

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
