export const sanitizeUsername = (name: string): string => {
  return name.toLowerCase().replace(/\s+/g, "_");
};

export const validateUsername = (name: string): boolean => {
  const regex = /^[a-zA-Z\s]+$/;
  return regex.test(name);
};

/**
 * Genera una clase de color de Tailwind basada en un string
 * @param {string} str - String base para generar el color
 * @returns {string} - Clase de Tailwind (ej: "bg-blue-500")
 */
export function generateTailwindColor(str: string) {
  // Colores disponibles en Tailwind
  const colors = [
    'slate', 'gray', 'zinc', 'neutral', 'stone',
    'red', 'orange', 'amber', 'yellow', 'lime',
    'green', 'emerald', 'teal', 'cyan', 'sky',
    'blue', 'indigo', 'violet', 'purple', 'fuchsia',
    'pink', 'rose'
  ];
  
  // Intensidades disponibles en Tailwind
  const shades = [400, 500, 600, 700, 800, 900];
  
  // Generar hash simple del string
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.codePointAt(i);
    hash = ((hash << 5) - hash) + char!;
    hash = hash & hash; // Convertir a entero de 32 bits
  }
  
  // Hacer el hash positivo
  hash = Math.abs(hash);
  
  // Seleccionar color e intensidad basados en el hash
  const colorIndex = hash % colors.length;
  const shadeIndex = Math.floor(hash / colors.length) % shades.length;
  
  const selectedColor = colors[colorIndex];
  const selectedShade = shades[shadeIndex];
  
  return `bg-${selectedColor}-${selectedShade}`;
}