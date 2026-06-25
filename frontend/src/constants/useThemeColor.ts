/**
 * 🎨 HOOK PERSONALIZADO PARA COLORES DINÁMICOS
 * 
 * Uso: const bgColor = useThemeColor("bg");
 * Retorna: "bg-white dark:bg-gray-950"
 */

import { colors } from "./colors";

export function useThemeColor(colorKey: keyof typeof colors.light): string {
  
  const lightColor = colors.light[colorKey];
  const darkColor = colors.dark[colorKey];
  
  return `${lightColor} dark:${darkColor}`;
}

/**
 * 📝 EJEMPLOS DE USO:
 * 
 * import { useThemeColor } from "../constants/useThemeColor";
 * 
 * const bgColor = useThemeColor("bg");              // "white dark:gray-950"
 * const textColor = useThemeColor("text");          // "gray-900 dark:white"
 * const accentColor = useThemeColor("accent");      // "green-600 dark:green-500"
 * 
 * // En JSX:
 * <div className={`${bgColor} ${textColor} p-4`}>
 *   Hola
 * </div>
 */
