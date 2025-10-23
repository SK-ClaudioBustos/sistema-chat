export function generarUUID(): string {
  // La API `crypto` está disponible en navegadores modernos y Node.js.
  // `randomUUID()` genera un UUID v4 criptográficamente fuerte.
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  // Fallback si `crypto.randomUUID()` no está disponible (ej. entornos muy antiguos).
  // Aunque para TypeScript nativo moderno, esta rama es rara vez necesaria.
  // Es mejor usar una librería (como 'uuid') para un soporte completo en todos los entornos.
  console.warn("Usando fallback: crypto.randomUUID() no está disponible.");
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = Math.trunc(Math.random() * 16);
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
