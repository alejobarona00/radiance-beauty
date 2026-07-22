"use client";

import { useEffect, useState } from "react";
import { BuyButton } from "@/app/components/BuyButton";

export const StickyBuyButton = () => {
  const [pastThreshold, setPastThreshold] = useState(false);
  const [nearFooterOrPricing, setNearFooterOrPricing] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      setPastThreshold(progress > 0.15);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Se oculta cerca del footer y también dentro de la sección de precio: ahí ya está
  // visible el botón real "¡Comprar Ahora!" y el flotante sería un duplicado redundante.
  useEffect(() => {
    const targets = [document.getElementById("site-footer"), document.getElementById("precio")].filter(
      (el): el is HTMLElement => el !== null
    );
    if (targets.length === 0) return;

    const visible = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        }
        setNearFooterOrPricing(visible.size > 0);
      },
      { rootMargin: "0px" }
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const show = pastThreshold && !nearFooterOrPricing;

  return (
    <div
      className={`md:hidden fixed inset-x-0 bottom-0 z-40 flex justify-center transition-all duration-300 ease-out ${
        show ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0 pointer-events-none"
      }`}
      style={{ paddingBottom: "calc(0.9rem + env(safe-area-inset-bottom))", paddingTop: "0.5rem" }}
      aria-hidden={!show}
      // Evita que el botón sea enfocable por teclado mientras está oculto visualmente
      // (opacity/translate por sí solos no lo sacan del orden de tabulación).
      inert={!show}
    >
      <div
        className="w-[90%]"
        style={{ filter: "drop-shadow(0 6px 20px rgba(28,28,30,0.18))" }}
      >
        <BuyButton
          label="Comprar ahora"
          size="default"
          showNote={false}
          fullWidth
          trackingId="sticky_mobile"
        />
      </div>
    </div>
  );
};
