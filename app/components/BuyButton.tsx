"use client";

import { fbq } from "@/app/lib/fbq";
import { scrollToNearestPricing } from "@/app/lib/scrollToPricing";

interface BuyButtonProps {
  label?: string;
  variant?: "terracota" | "gold";
  size?: "default" | "large";
  noteColor?: "dark" | "light";
  /** Muestra la nota de "Procesado por Mercado Pago" debajo del botón. */
  showNote?: boolean;
  /** Estira el botón al 100% del contenedor padre (para el sticky CTA móvil). */
  fullWidth?: boolean;
  /** Identificador del punto del funnel donde vive este botón, para el evento de Meta Pixel. */
  trackingId: string;
}

const LockIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    className="w-3.5 h-3.5 flex-shrink-0"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
    />
  </svg>
);

const ShieldIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    className="w-3.5 h-3.5 flex-shrink-0"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
    />
  </svg>
);

export const BuyButton = ({
  label = "Comprar ahora",
  variant = "terracota",
  size = "default",
  noteColor = "dark",
  showNote = true,
  fullWidth = false,
  trackingId,
}: BuyButtonProps) => {
  const noteTextClass =
    noteColor === "light" ? "text-ivory/50" : "text-warm-gray/70";
  const noteHighlightClass =
    noteColor === "light" ? "text-ivory/80" : "text-warm-gray";

  const handleClick = () => {
    fbq("trackCustom", "CTAClick", { cta_location: trackingId });
    scrollToNearestPricing();
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        type="button"
        onClick={handleClick}
        aria-label={`${label} — ir a la sección de compra`}
        className={`inline-flex items-center gap-3 font-body font-medium tracking-[0.15em] uppercase rounded-full transition-all duration-300 hover:-translate-y-0.5 ${
          variant === "terracota"
            ? "bg-terracota hover:bg-terracota-dark text-ivory hover:shadow-xl hover:shadow-terracota/25 focus-ring-terracota"
            : "text-charcoal hover:shadow-xl hover:shadow-gold/30 focus-ring-gold"
        } ${size === "large" ? "text-base px-12 py-5" : "text-sm px-8 py-4"} ${
          fullWidth ? "w-full justify-center" : ""
        }`}
        style={
          variant === "gold"
            ? {
                background:
                  "linear-gradient(135deg, #C8A96E 0%, #E8D5A3 50%, #C8A96E 100%)",
                boxShadow: "0 4px 24px rgba(200,169,110,0.35)",
              }
            : undefined
        }
      >
        {label}
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
          />
        </svg>
      </button>

      {/* Nota de seguridad Mercado Pago */}
      {showNote && (
        <div className={`flex items-center gap-1.5 ${noteTextClass}`}>
          <LockIcon />
          <span className="font-body text-[11px] leading-none">
            Procesado de forma segura por{" "}
            <span className={`font-medium ${noteHighlightClass}`}>
              Mercado Pago
            </span>
          </span>
          <ShieldIcon />
        </div>
      )}
    </div>
  );
};
