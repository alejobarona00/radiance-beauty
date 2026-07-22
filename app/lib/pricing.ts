export type OptionKey = "1" | "2";

// Única fuente de verdad de precios y links de pago — usada por PricingSection,
// BuyButton, /gracias y los eventos de Meta Pixel. No hardcodear estos valores
// en ningún otro archivo: importar siempre desde aquí.

/** Costo de envío incluido en cada opción. */
export const SHIPPING_BY_UNIDADES: Record<OptionKey, number> = {
  "1": 10000,
  "2": 0,
};

/** Precio final que paga el cliente (producto + envío). Lo que se cobra realmente. */
export const PRICE_BY_UNIDADES: Record<OptionKey, number> = {
  "1": 79900,
  "2": 139900,
};

/** Precio de referencia tachado, mostrado como comparación. */
export const COMPARE_AT_BY_UNIDADES: Record<OptionKey, number> = {
  "1": 99900,
  "2": 159900,
};

/** Precio del producto solo, sin envío (total final - envío). */
export const PRODUCT_PRICE_BY_UNIDADES: Record<OptionKey, number> = {
  "1": PRICE_BY_UNIDADES["1"] - SHIPPING_BY_UNIDADES["1"],
  "2": PRICE_BY_UNIDADES["2"] - SHIPPING_BY_UNIDADES["2"],
};

export const PAYMENT_URLS: Record<OptionKey, string> = {
  "1": "https://mpago.li/1ZF4qDN",
  "2": "https://mpago.li/33fF2wx",
};
