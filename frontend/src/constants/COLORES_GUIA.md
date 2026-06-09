# 🎨 GUÍA DE COLORES DE LUBIX

## Sistema Centralizado de Colores

Todos los colores están en UN SOLO LUGAR para que cambiarlos sea súper fácil.

---

## 📂 Archivos Creados

```
src/
├── constants/
│   ├── colors.ts              ← AQUÍ DEFINES TODOS LOS COLORES
│   └── useThemeColor.ts       ← Hook para usar los colores
```

---

## 🎨 ¿Cómo Cambiar Colores?

### Opción 1: En `colors.ts` (La más fácil)

Abre [src/constants/colors.ts](../constants/colors.ts) y cambia los colores:

```typescript
light: {
  bg: "white",           // ← Cambiar esto
  text: "gray-900",      // ← O esto
  accent: "green-600",   // ← O esto
  // ... más colores
},
dark: {
  bg: "gray-950",        // ← Versión oscura
  text: "white",
  accent: "green-500",
  // ...
}
```

**Ejemplo:** Quieres que el fondo claro sea beige:
```typescript
bg: "yellow-50",  // ← Cambiar de "white" a "yellow-50"
```

---

## 💻 ¿Cómo Usar los Colores en Componentes?

### Opción 1: Forma Manual (La más flexible)

```jsx
import { colors } from "../constants/colors";

export default function MiComponente() {
  return (
    <div className={`bg-${colors.light.bg} dark:bg-${colors.dark.bg}`}>
      ✅ Este div cambia de color automáticamente
    </div>
  );
}
```

### Opción 2: Con el Hook (La más cómoda)

```jsx
import { useThemeColor } from "../constants/useThemeColor";

export default function MiComponente() {
  const bg = useThemeColor("bg");        // "white dark:gray-950"
  const text = useThemeColor("text");    // "gray-900 dark:white"
  const accent = useThemeColor("accent");// "green-600 dark:green-500"

  return (
    <div className={`${bg} ${text} p-4`}>
      ✅ Mucho más limpio
    </div>
  );
}
```

---

## 📋 Colores Disponibles

### 🌞 Modo Claro

| Variable | Valor | Uso |
|----------|-------|-----|
| `bg` | white | Fondo principal |
| `bgSecondary` | gray-50 | Secciones |
| `bgCard` | white | Tarjetas |
| `text` | gray-900 | Texto principal |
| `textMuted` | gray-700 | Texto secundario |
| `navbar` | white | Navbar |
| `btnPrimary` | green-500 | Botones principales |
| `accent` | green-600 | Color verde principal |
| `success` | green-100 | Mensajes de éxito |
| `error` | red-100 | Mensajes de error |

### 🌙 Modo Oscuro

| Variable | Valor | Uso |
|----------|-------|-----|
| `bg` | gray-950 | Fondo principal |
| `bgSecondary` | gray-900 | Secciones |
| `bgCard` | gray-800 | Tarjetas |
| `text` | white | Texto principal |
| `textMuted` | gray-300 | Texto secundario |
| `navbar` | gray-900 | Navbar |
| `btnPrimary` | green-600 | Botones principales |
| `accent` | green-500 | Color verde principal |
| `success` | green-900 | Mensajes de éxito |
| `error` | red-900 | Mensajes de error |

---

## 🚀 Ejemplos Prácticos

### Ejemplo 1: Card con tema dinámico

```jsx
import { useThemeColor } from "../constants/useThemeColor";

function MiCard() {
  const bg = useThemeColor("bgCard");
  const text = useThemeColor("text");
  const border = useThemeColor("border");

  return (
    <div className={`${bg} ${text} ${border} p-6 rounded-lg border`}>
      Contenido de la card
    </div>
  );
}
```

### Ejemplo 2: Botón Principal

```jsx
import { useThemeColor } from "../constants/useThemeColor";

function BotonPrimario() {
  const btnColor = useThemeColor("btnPrimary");
  const btnHover = useThemeColor("btnPrimaryHover");

  return (
    <button className={`bg-${colors.light.btnPrimary} dark:bg-${colors.dark.btnPrimary} hover:bg-${colors.light.btnPrimaryHover} dark:hover:bg-${colors.dark.btnPrimaryHover}`}>
      Click me
    </button>
  );
}
```

### Ejemplo 3: Mensaje de Éxito

```jsx
import { colors } from "../constants/colors";

function MensajeExito() {
  return (
    <div className={`bg-${colors.light.success} dark:bg-${colors.dark.success} text-${colors.light.successText} dark:text-${colors.dark.successText}`}>
      ✅ ¡Éxito!
    </div>
  );
}
```

---

## 🔄 ¿Cómo Cambiar el Tema?

El usuario puede hacer clic en el botón de **Luna/Sol** en el navbar:

1. **Luz 🌞** → Página clara
2. **Oscuro 🌙** → Página oscura

El tema se guarda automáticamente en `localStorage`, así que si el usuario vuelve:
- Si eligió **oscuro**, abrirá en modo **oscuro**
- Si no hay preferencia, detecta la del **Sistema Windows**

---

## ⚡ Ventajas de Este Sistema

✅ **Un solo archivo** para cambiar todos los colores  
✅ **Autocomplete** del IDE  
✅ **Sin hardcodes** como `#162238` o `bg-[#162238]`  
✅ **Fácil de mantener**  
✅ **Funciona en toda la app** automáticamente  
✅ **Transiciones suaves** entre temas  

---

## 📝 Pasos para Aplicar a Todas las Páginas

Cuando quieras que tus páginas (Login, Register, Home, etc.) usen el sistema de colores:

### Antes ❌
```jsx
<div className="bg-[#162238] text-white">
```

### Después ✅
```jsx
import { colors } from "../constants/colors";

<div className={`bg-${colors.light.navbar} dark:bg-${colors.dark.navbar} text-${colors.light.text} dark:text-${colors.dark.text}`}>
```

¡Y listo! Ya tiene tema claro/oscuro automáticamente.

---

## ❓ ¿Preguntas?

Si quieres agregar un nuevo color:

1. Abre [src/constants/colors.ts](../constants/colors.ts)
2. Agrega en `light` y `dark`
3. ¡Listo!

Ejemplo:
```typescript
light: {
  // ... colores anteriores
  myCustomColor: "purple-500",
},
dark: {
  // ... colores anteriores
  myCustomColor: "purple-600",
}
```

Luego úsalo:
```jsx
className={`bg-${colors.light.myCustomColor} dark:bg-${colors.dark.myCustomColor}`}
```
