"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { fmt, usePricing, fieldId } from "@/app/components/PricingProvider";
import { scrollToNearestPricing, PRICING_SECTION_IDS } from "@/app/lib/scrollToPricing";

export const StickyBuyButton = () => {
  const { current } = usePricing();
  const [pastHero, setPastHero] = useState(false);
  const [pricingVisible, setPricingVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => setPastHero(!entry.isIntersecting),
      { rootMargin: "0px" }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  // Se oculta mientras cualquiera de los dos bloques de precio (arriba o abajo)
  // esté visible: ahí ya está el botón real "¡Comprar Ahora!" y el flotante sería redundante.
  useEffect(() => {
    const sections = PRICING_SECTION_IDS
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const visibility = new Map<Element, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => visibility.set(entry.target, entry.isIntersecting));
        setPricingVisible(Array.from(visibility.values()).some(Boolean));
      },
      { threshold: 0.15 }
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleTap = () => {
    const nearestId = scrollToNearestPricing();
    if (!nearestId) return;
    // Espera a que el scroll suave termine antes de robar el foco, para no
    // pelear con la animación (si se enfoca de inmediato, el navegador puede
    // saltar el scroll directo al input y cortar la animación a medias).
    window.setTimeout(() => {
      document.getElementById(fieldId("nombre", nearestId))?.focus();
    }, 500);
  };

  const show = pastHero && !pricingVisible;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-ivory/95 backdrop-blur-sm border-t border-gold/20 px-4 pt-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]"
          style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
        >
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-display text-lg text-charcoal leading-none">{fmt(current.total)}</p>
              <p className="font-body text-[11px] text-warm-gray mt-1">
                {current.shipping === 0 ? "Envío gratis" : "Envío incluido"}
              </p>
            </div>
            <button
              onClick={handleTap}
              aria-label="Comprar ahora"
              className="rounded-full bg-terracota hover:bg-terracota-dark text-ivory font-body font-bold text-sm tracking-[0.1em] uppercase px-8 py-3.5 transition-colors duration-200 focus-ring-terracota"
            >
              Comprar
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
