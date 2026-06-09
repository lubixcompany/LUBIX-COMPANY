/**
 * 🎨 COLORES CENTRALIZADOS DE LA APP
 * 
 * Sistema: Cambia los colores aquí y se actualizan en TODA la app
 * 
 * Uso:
 * import { colors } from "../constants/colors";
 * className={`bg-${colors.light.bg} dark:bg-${colors.dark.bg}`}
 */

export const colors = {
  // =====================================================
  // 🌞 MODO CLARO (light)
  // =====================================================
  light: {
    // Fondos
    bg: "white",              // Fondo principal
    bgSecondary: "gray-50",   // Fondo secundario (secciones)
    bgCard: "white",          // Fondo de tarjetas
    
    // Textos
    text: "gray-900",         // Texto principal
    textMuted: "gray-700",    // Texto secundario
    
    // Navbar
    navbar: "white",          // Fondo navbar
    navbarBorder: "gray-200", // Borde navbar
    
    // Botones
    btnPrimary: "green-500",     // Botón principal
    btnPrimaryHover: "green-600",// Botón principal hover
    btnSecondary: "gray-200",    // Botón secundario
    
    // Acentos
    accent: "green-600",       // Color principal (verde)
    accentLight: "emerald-500",// Verde claro
    accentDark: "emerald-700", // Verde oscuro
    
    // Estado
    success: "green-100",      // Fondo success
    successText: "green-800",  // Texto success
    successBorder: "green-300",// Borde success
    
    error: "red-100",          // Fondo error
    errorText: "red-800",      // Texto error
    errorBorder: "red-300",    // Borde error
    
    // Otros
    shadow: "shadow",
    border: "gray-200",
  },

  // =====================================================
  // 🌙 MODO OSCURO (dark)
  // =====================================================
  dark: {
    // Fondos
    bg: "gray-950",             // Fondo principal (casi negro)
    bgSecondary: "gray-900",    // Fondo secundario
    bgCard: "gray-800",         // Fondo de tarjetas
    
    // Textos
    text: "white",              // Texto principal
    textMuted: "gray-300",      // Texto secundario
    
    // Navbar
    navbar: "gray-900",         // Fondo navbar
    navbarBorder: "gray-700",   // Borde navbar
    
    // Botones
    btnPrimary: "green-600",     // Botón principal
    btnPrimaryHover: "green-500",// Botón principal hover
    btnSecondary: "gray-700",    // Botón secundario
    
    // Acentos
    accent: "green-500",        // Color principal (verde más claro)
    accentLight: "emerald-400", // Verde claro
    accentDark: "emerald-600",  // Verde oscuro
    
    // Estado
    success: "green-900",       // Fondo success
    successText: "green-200",   // Texto success
    successBorder: "green-700", // Borde success
    
    error: "red-900",           // Fondo error
    errorText: "red-200",       // Texto error
    errorBorder: "red-700",     // Borde error
    
    // Otros
    shadow: "shadow-lg",
    border: "gray-700",
  },
};

/**
 * 📝 EJEMPLOS DE USO:
 * 
 * 1. Fondo que cambia con el tema:
 *    className={`bg-${colors.light.bg} dark:bg-${colors.dark.bg}`}
 * 
 * 2. Texto que cambia con el tema:
 *    className={`text-${colors.light.text} dark:text-${colors.dark.text}`}
 * 
 * 3. Botón principal:
 *    className={`bg-${colors.light.btnPrimary} dark:bg-${colors.dark.btnPrimary} hover:bg-${colors.light.btnPrimaryHover} dark:hover:bg-${colors.dark.btnPrimaryHover}`}
 * 
 * 4. Card completa:
 *    className={`bg-${colors.light.bgCard} dark:bg-${colors.dark.bgCard} text-${colors.light.text} dark:text-${colors.dark.text} p-6 rounded-xl`}
 */
