"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { fbq } from "@/app/lib/fbq";
import { PEDIDO_ANTICIPADO_STORAGE_KEY } from "@/app/lib/orderWebhook";

const PaymentFailedBannerContent = () => {
  const searchParams = useSearchParams();
  const [dismissed, setDismissed] = useState(false);
  const failed = searchParams.get("pago") === "fallido";

  // El pedido guardado para notificar solo con pago aprobado ya no aplica
  // si Mercado Pago redirigió aquí por un pago fallido.
  useEffect(() => {
    if (!failed) return;
    try {
      sessionStorage.removeItem(PEDIDO_ANTICIPADO_STORAGE_KEY);
    } catch {}
  }, [failed]);

  if (!failed || dismissed) return null;

  const handleRetry = () => {
    fbq("trackCustom", "CTAClick", { cta_location: "payment_failed_banner" });
    document.getElementById("precio")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="w-full px-5 sm:px-8 py-3 sm:py-4"
      style={{ background: "#fff0f0", borderBottom: "1px solid #ffcccc" }}
      role="alert"
    >
      <div className="max-w-3xl mx-auto flex items-center justify-between gap-4 flex-wrap sm:flex-nowrap">
        <p className="font-body text-sm font-medium leading-snug" style={{ color: "#d9534f" }}>
          ⚠️ Tu pago no pudo procesarse. Puedes intentarlo de nuevo o elegir pago contraentrega.
        </p>
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            type="button"
            onClick={handleRetry}
            className="font-body text-xs font-bold uppercase tracking-wide bg-terracota hover:bg-terracota-dark text-ivory px-4 py-2 rounded-full whitespace-nowrap transition-colors duration-200"
          >
            Intentar de nuevo
          </button>
          <button
            type="button"
            onClick={() => setDismissed(true)}
            aria-label="Cerrar aviso"
            className="text-lg leading-none hover:opacity-70 transition-opacity"
            style={{ color: "#d9534f" }}
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

export const PaymentFailedBanner = () => (
  <Suspense fallback={null}>
    <PaymentFailedBannerContent />
  </Suspense>
);
