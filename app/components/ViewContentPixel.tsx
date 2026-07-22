"use client";

import { useEffect } from "react";
import { fbq } from "@/app/lib/fbq";
import { PRICE_BY_UNIDADES } from "@/app/lib/pricing";

/** Registra ViewContent una vez por carga — esta landing es la página del único producto. */
export const ViewContentPixel = () => {
  useEffect(() => {
    fbq("track", "ViewContent", {
      content_name: "Mascarilla Exfoliante Capilar",
      content_type: "product",
      value: PRICE_BY_UNIDADES["1"],
      currency: "COP",
    });
  }, []);

  return null;
};
