type FbqArgs = [string, string, Record<string, unknown>?];

declare global {
  interface Window {
    fbq?: (...args: FbqArgs) => void;
  }
}

/**
 * Llama a fbq de forma segura si el pixel de Meta ya cargó. Única fuente de esta
 * lógica en todo el sitio. En development (npm run dev, incluyendo pruebas de
 * Playwright) el pixel real nunca se inyecta (ver layout.tsx) para no contaminar
 * los datos de producción — acá solo dejamos un rastro en consola para poder
 * seguir depurando el orden de los eventos localmente.
 */
export const fbq = (...args: FbqArgs) => {
  if (typeof window === "undefined") return;
  if (typeof window.fbq === "function") {
    window.fbq(...args);
    return;
  }
  if (process.env.NODE_ENV !== "production") {
    console.log("[fbq:dev-noop]", ...args);
  }
};
