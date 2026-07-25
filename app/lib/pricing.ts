export type OptionKey = "1" | "2";

// Única fuente de verdad de precios — usada por PricingSection, BuyButton,
// /gracias, app/api/checkout y los eventos de Meta Pixel. No hardcodear estos
// valores en ningún otro archivo: importar siempre desde aquí.

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

/** Descuento del pago anticipado frente al precio de lista (contraentrega). */
export const ANTICIPADO_DISCOUNT = 0.05;

/**
 * Precio final del pago anticipado, ya con el 5% de descuento aplicado sobre
 * PRICE_BY_UNIDADES. Es el monto real que se cobra en Mercado Pago
 * (app/api/checkout) y el que debe mostrarse en la UI antes de llegar ahí.
 * Contraentrega NUNCA usa este valor — sigue usando PRICE_BY_UNIDADES tal cual.
 */
export const ANTICIPADO_PRICE_BY_UNIDADES: Record<OptionKey, number> = {
  "1": Math.round((PRICE_BY_UNIDADES["1"] * (1 - ANTICIPADO_DISCOUNT)) / 100) * 100,
  "2": Math.round((PRICE_BY_UNIDADES["2"] * (1 - ANTICIPADO_DISCOUNT)) / 100) * 100,
};
