type FbqArgs = [string, string, Record<string, unknown>?];

declare global {
  interface Window {
    fbq?: (...args: FbqArgs) => void;
  }
}

/** Llama a fbq de forma segura si el pixel de Meta ya cargó. Única fuente de esta lógica en todo el sitio. */
export const fbq = (...args: FbqArgs) => {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq(...args);
  }
};
