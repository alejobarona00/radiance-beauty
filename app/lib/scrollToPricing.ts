export const PRICING_SECTION_IDS = ["precio-top", "precio-bottom"] as const;
export type PricingSectionId = (typeof PRICING_SECTION_IDS)[number];

const findNearest = (): { el: HTMLElement; id: PricingSectionId } | null => {
  const viewportCenter = window.scrollY + window.innerHeight / 2;

  const candidates = PRICING_SECTION_IDS
    .map((id) => ({ id, el: document.getElementById(id) }))
    .filter((c): c is { id: PricingSectionId; el: HTMLElement } => c.el !== null)
    .map((c) => {
      const rect = c.el.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      return { ...c, distance: Math.abs(top - viewportCenter) };
    });

  if (candidates.length === 0) return null;
  return candidates.reduce((a, b) => (a.distance <= b.distance ? a : b));
};

/**
 * Hace scroll al bloque de compra más cercano a la posición actual (hay dos:
 * uno justo después del Hero y otro al final). Devuelve el id del bloque
 * elegido, o null si ninguno está en el DOM (por ejemplo durante hidratación).
 */
export const scrollToNearestPricing = (): PricingSectionId | null => {
  const nearest = findNearest();
  if (!nearest) return null;
  nearest.el.scrollIntoView({ behavior: "smooth", block: "start" });
  return nearest.id;
};
