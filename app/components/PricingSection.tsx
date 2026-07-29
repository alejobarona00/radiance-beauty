"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { fmt, PRICING, usePricing, fireOfferViewedOnce } from "@/app/components/PricingProvider";
import { CheckoutForm } from "@/app/components/CheckoutForm";
import type { OptionKey } from "@/app/lib/pricing";

interface PricingSectionProps {
  /** id único del bloque — hay dos en la página (arriba y abajo), no pueden compartir id. */
  sectionId: "precio-top" | "precio-bottom";
  /** Solo el bloque de arriba muestra el resumen de reseñas junto al precio. */
  showReviewsSummary?: boolean;
}

const TrustLine = () => (
  <div className="mt-4 flex flex-col items-center gap-2 font-body text-warm-gray text-xs sm:flex-row sm:justify-center sm:gap-5">
    <span className="flex items-center gap-1.5">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4 text-gold" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 8.25v10.5A2.25 2.25 0 0 0 4.5 21h15a2.25 2.25 0 0 0 2.25-2.25V8.25M2.25 8.25V6a2.25 2.25 0 0 1 2.25-2.25h15A2.25 2.25 0 0 1 21.75 6v2.25M6.75 12h.008v.008H6.75V12Z" />
      </svg>
      Pagas cuando lo recibes · Contraentrega en toda Colombia
    </span>
    <span className="hidden sm:inline text-warm-gray/30">·</span>
    <span className="flex items-center gap-1.5">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4 text-gold" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
      Garantía de 30 días
    </span>
    <span className="hidden sm:inline text-warm-gray/30">·</span>
    <span className="flex items-center gap-1.5">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4 text-gold" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
      Envío asegurado
    </span>
  </div>
);

const StarRating = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <div className="flex gap-0.5" aria-hidden="true">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg key={i} className={`${className} text-gold fill-gold`} viewBox="0 0 24 24">
        <path d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" />
      </svg>
    ))}
  </div>
);

const ReviewsSummary = () => (
  <a
    href="#testimonios"
    className="mt-4 inline-flex items-center gap-2 font-body text-xs text-warm-gray hover:text-charcoal transition-colors duration-200"
  >
    <StarRating />
    <span>3 reseñas de clientas reales</span>
  </a>
);

export const PricingSection = ({ sectionId, showReviewsSummary = false }: PricingSectionProps) => {
  const { selected, selectPackage, current } = usePricing();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) fireOfferViewedOnce();
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={sectionId}
      className="bg-ivory pt-10 pb-16 px-5 sm:px-8 lg:px-16 lg:pt-16 lg:pb-28"
      aria-label="Selecciona tu pedido"
    >
      <div className="max-w-xl mx-auto">

        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-10 bg-gold" />
            <span className="font-body text-gold text-xs tracking-[0.35em] uppercase">Elige tu pedido</span>
            <div className="h-px w-10 bg-gold" />
          </div>
          <h2 className="font-display text-3xl lg:text-4xl text-charcoal leading-tight">
            ¿Cuántas unidades{" "}
            <em className="not-italic text-gold">quieres?</em>
          </h2>

          {/* Confianza real, en el lugar donde antes iba la urgencia falsa */}
          <TrustLine />

          {showReviewsSummary && <ReviewsSummary />}
        </motion.div>

        {/* Selector de unidades */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="grid grid-cols-2 gap-4 mb-8 items-start"
        >
          {(["1", "2"] as OptionKey[]).map((key) => {
            const opt = PRICING[key];
            const isSelected = selected === key;
            const isFeatured = key === "2";
            return (
              <button
                key={key}
                onClick={() => selectPackage(key)}
                aria-pressed={isSelected}
                className={`relative rounded-2xl border-2 text-left transition-all duration-200 focus-ring-gold ${
                  isFeatured ? "p-6 lg:scale-[1.04]" : "p-5"
                } ${
                  isSelected
                    ? "border-gold bg-gold/5 shadow-lg shadow-gold/10"
                    : "border-warm-stone hover:border-gold/40 bg-warm-stone/30"
                }`}
              >
                {opt.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 font-body text-[10px] font-semibold tracking-[0.2em] uppercase bg-gold text-charcoal px-3 py-1 rounded-full whitespace-nowrap">
                    {opt.badge}
                  </span>
                )}
                <div className={`w-4 h-4 rounded-full border-2 mb-3 flex items-center justify-center transition-colors duration-200 ${isSelected ? "border-gold bg-gold" : "border-warm-gray/40"}`}>
                  {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-ivory" />}
                </div>
                <p className={`font-display text-charcoal leading-tight mb-1 ${isFeatured ? "text-xl" : "text-lg"}`}>
                  {opt.label}
                </p>
                <div className="flex items-baseline gap-2">
                  <p className={`font-display font-medium ${isFeatured ? "text-2xl" : "text-xl"} ${isSelected ? "text-gold" : "text-charcoal"}`}>
                    {fmt(opt.total)}
                  </p>
                  <p className="font-body text-xs text-warm-gray/60 line-through">
                    {fmt(opt.compareAt)}
                  </p>
                </div>
                <p className={`font-body text-xs mt-1 font-medium uppercase tracking-wide ${opt.shipping === 0 ? "text-green-600" : "text-warm-gray"}`}>
                  {opt.shipping === 0 ? "Envío gratis" : "Envío incluido"}
                </p>
                {opt.savingsNote && (
                  <p className="font-body text-[10px] text-gold/80 mt-2 leading-tight">{opt.savingsNote}</p>
                )}
              </button>
            );
          })}
        </motion.div>

        {/* Resumen del pedido */}
        <motion.div
          key={selected}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="bg-warm-stone/50 rounded-2xl border border-gold/15 p-6 mb-10 flex items-center justify-between"
          aria-live="polite"
        >
          <div>
            <h3 className="font-body text-xs text-warm-gray tracking-[0.25em] uppercase mb-1.5">
              {current.label}
            </h3>
            <p className={`font-body text-xs font-medium ${current.shipping === 0 ? "text-green-600" : "text-warm-gray"}`}>
              {current.shipping === 0 ? "Envío gratis" : "Envío incluido"}
            </p>
          </div>
          <div className="text-right">
            <span className="font-display text-2xl lg:text-3xl text-charcoal tracking-tight">
              {fmt(current.total)}
            </span>
            <span className="font-body text-warm-gray text-xs block">COP</span>
          </div>
        </motion.div>

        {/* Formulario de compra — inline, sin clic intermedio ni modal */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <CheckoutForm sectionId={sectionId} />
        </motion.div>

        {/* Iconos de confianza */}
        <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-gold/15">
          {[
            {
              label: "Garantía 30 días",
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                </svg>
              ),
            },
            {
              label: "Envío Asegurado",
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                </svg>
              ),
            },
            {
              label: "Pago Seguro",
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>
              ),
            },
          ].map(({ label, icon }) => (
            <div key={label} className="flex flex-col items-center gap-2 text-center">
              <div className="text-gold/80">{icon}</div>
              <p className="font-body text-[11px] text-warm-gray/70 leading-tight">{label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
