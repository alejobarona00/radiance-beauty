"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ChangeEvent,
  type FocusEvent,
  type FormEvent,
  type ReactNode,
} from "react";
import { fbq } from "@/app/lib/fbq";
import {
  PRICE_BY_UNIDADES,
  COMPARE_AT_BY_UNIDADES,
  SHIPPING_BY_UNIDADES,
  PRODUCT_PRICE_BY_UNIDADES,
  ANTICIPADO_PRICE_BY_UNIDADES,
  ANTICIPADO_DISCOUNT,
  type OptionKey,
} from "@/app/lib/pricing";
import { SHEETS_WEBHOOK_URL, PEDIDO_ANTICIPADO_STORAGE_KEY } from "@/app/lib/orderWebhook";

export type PaymentMethod = "contraentrega" | "anticipado";

export const fmt = (n: number) => "$" + n.toLocaleString("es-CO");

// Ahorro real de comprar el pack de 2 vs. pedir la opción de 1 unidad dos veces
// (incluye el envío duplicado que te ahorras). Se recalcula solo si cambian los precios.
const bundleSavings = 2 * PRICE_BY_UNIDADES["1"] - PRICE_BY_UNIDADES["2"];

export const PRICING = {
  "1": {
    label: "1 Unidad",
    productPrice: PRODUCT_PRICE_BY_UNIDADES["1"],
    compareAt: COMPARE_AT_BY_UNIDADES["1"],
    shipping: SHIPPING_BY_UNIDADES["1"],
    total: PRICE_BY_UNIDADES["1"],
    badge: null as string | null,
    savingsNote: null as string | null,
  },
  "2": {
    label: "2 Unidades",
    productPrice: PRODUCT_PRICE_BY_UNIDADES["2"],
    compareAt: COMPARE_AT_BY_UNIDADES["2"],
    shipping: SHIPPING_BY_UNIDADES["2"],
    total: PRICE_BY_UNIDADES["2"],
    badge: "Más popular" as string | null,
    savingsNote: `Ahorras ${fmt(bundleSavings)} vs comprar por separado` as string | null,
  },
} as const;

export const anticipadoDiscountPercent = ANTICIPADO_DISCOUNT * 100;

export interface FormData {
  nombre: string;
  whatsapp: string;
  departamento: string;
  ciudad: string;
  direccion: string;
  detalles: string;
  paymentMethod: PaymentMethod;
}

export type FieldName = "nombre" | "whatsapp" | "departamento" | "ciudad" | "direccion";

// El formulario vive inline dentro de los dos bloques de precio (arriba y abajo),
// así que cada campo existe dos veces en el DOM. El "name" sigue siendo el mismo
// (para los handlers), pero el "id"/"htmlFor" se prefija con la sección para que
// sean únicos y los <label> sigan asociados correctamente.
export const fieldId = (field: FieldName, sectionId: string) => `${field}-${sectionId}`;

const FIELD_LABELS: Record<FieldName, string> = {
  nombre: "tu nombre",
  whatsapp: "tu WhatsApp",
  departamento: "tu departamento",
  ciudad: "tu ciudad",
  direccion: "tu dirección",
};

const validateField = (name: FieldName, value: string): string | null => {
  const trimmed = value.trim();
  if (name === "whatsapp") {
    if (!trimmed) return `Ingresa ${FIELD_LABELS.whatsapp}`;
    if (!/^[0-9]{10}$/.test(trimmed)) return "Deben ser 10 dígitos, sin espacios ni guiones";
    return null;
  }
  if (!trimmed) return `Ingresa ${FIELD_LABELS[name]}`;
  return null;
};

interface PricingContextValue {
  selected: OptionKey;
  selectPackage: (key: OptionKey) => void;
  current: (typeof PRICING)["1"] | (typeof PRICING)["2"];
  discountedTotal: number;

  orderConfirmed: boolean;
  isSubmitting: boolean;
  checkoutError: string | null;
  dismissConfirmation: () => void;

  form: FormData;
  errors: Partial<Record<FieldName, string>>;
  touched: Partial<Record<FieldName, boolean>>;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleBlur: (e: FocusEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleFocusField: () => void;
  handlePaymentMethodChange: (method: PaymentMethod) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  isFormValid: boolean;
}

const PricingContext = createContext<PricingContextValue | null>(null);

export const usePricing = () => {
  const ctx = useContext(PricingContext);
  if (!ctx) throw new Error("usePricing debe usarse dentro de <PricingProvider>");
  return ctx;
};

const offerViewedFired = { current: false };
/** Se llama una sola vez, la primera vez que cualquiera de los dos bloques de compra entra en pantalla. */
export const fireOfferViewedOnce = () => {
  if (offerViewedFired.current) return;
  offerViewedFired.current = true;
  fbq("trackCustom", "OfferViewed", {});
};

export const PricingProvider = ({ children }: { children: ReactNode }) => {
  const [selected, setSelected] = useState<OptionKey>("2"); // Tarea 3: 2 unidades por defecto
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>({
    nombre: "",
    whatsapp: "",
    departamento: "",
    ciudad: "",
    direccion: "",
    detalles: "",
    paymentMethod: "contraentrega",
  });
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const formStarted = useRef(false);
  const initiateCheckoutFired = useRef(false);

  const current = PRICING[selected];
  const discountedTotal = ANTICIPADO_PRICE_BY_UNIDADES[selected];

  const selectPackage = useCallback((key: OptionKey) => {
    setSelected(key);
    fbq("trackCustom", "PackageSelected", { package: key === "1" ? "1_unidad" : "2_unidades" });
  }, []);

  const dismissConfirmation = useCallback(() => {
    setOrderConfirmed(false);
    setCheckoutError(null);
  }, []);

  const handleFocusField = useCallback(() => {
    if (formStarted.current) return;
    formStarted.current = true;
    fbq("trackCustom", "FormStarted", {});
  }, []);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
      // Si el campo ya tenía error mostrado, revalida en vivo para que
      // desaparezca en cuanto se corrija, sin esperar a un nuevo blur.
      setErrors((prev) => {
        if (!(name in prev)) return prev;
        const fieldName = name as FieldName;
        const message = validateField(fieldName, value);
        const next = { ...prev };
        if (message) next[fieldName] = message;
        else delete next[fieldName];
        return next;
      });
    },
    []
  );

  const handleBlur = useCallback((e: FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const fieldName = name as FieldName;
    if (!(fieldName in FIELD_LABELS)) return;
    setTouched((prev) => ({ ...prev, [fieldName]: true }));
    const message = validateField(fieldName, value);
    setErrors((prev) => {
      const next = { ...prev };
      if (message) next[fieldName] = message;
      else delete next[fieldName];
      return next;
    });
    if (message) {
      fbq("trackCustom", "FormError", { field: fieldName });
    } else if (!initiateCheckoutFired.current) {
      // Señal de intención real: completó un campo con un valor válido,
      // no solo lo tocó (eso ya lo cubre FormStarted). Dispara una sola vez.
      initiateCheckoutFired.current = true;
      fbq("track", "InitiateCheckout", {
        value: current.total,
        currency: "COP",
        content_ids: [selected],
        content_name: current.label,
        num_items: Number(selected),
      });
    }
  }, [current, selected]);

  const handlePaymentMethodChange = useCallback((method: PaymentMethod) => {
    setForm((prev) => ({ ...prev, paymentMethod: method }));
    fbq("trackCustom", "PaymentMethodSelected", { method });
  }, []);

  const isFormValid =
    (["nombre", "whatsapp", "departamento", "ciudad", "direccion"] as FieldName[]).every(
      (f) => !validateField(f, form[f])
    );

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // Hay dos instancias del mismo formulario en la página (bloque de arriba y de
      // abajo); esto identifica desde cuál se envió, para enfocar el campo correcto
      // de ESA instancia si falta algo, sin tocar la otra que está fuera de pantalla.
      const sectionId = (e.currentTarget.closest('[id^="precio-"]') as HTMLElement | null)?.id ?? "precio-top";

      const fields: FieldName[] = ["nombre", "whatsapp", "departamento", "ciudad", "direccion"];
      const nextErrors: Partial<Record<FieldName, string>> = {};
      for (const f of fields) {
        const message = validateField(f, form[f]);
        if (message) nextErrors[f] = message;
      }
      if (Object.keys(nextErrors).length > 0) {
        setTouched((prev) => {
          const next = { ...prev };
          fields.forEach((f) => { next[f] = true; });
          return next;
        });
        setErrors(nextErrors);
        Object.keys(nextErrors).forEach((f) => {
          fbq("trackCustom", "FormError", { field: f });
        });
        // Lleva al usuario directo al primer campo que falta, en el bloque desde el que envió.
        const firstInvalid = fields.find((f) => nextErrors[f]);
        if (firstInvalid) {
          document.getElementById(fieldId(firstInvalid, sectionId))?.focus();
        }
        return;
      }

      setIsSubmitting(true);
      setCheckoutError(null);

      const totalFinal = form.paymentMethod === "anticipado" ? discountedTotal : current.total;

      const orderData = {
        nombre: form.nombre,
        whatsapp: form.whatsapp,
        departamento: form.departamento,
        ciudad: form.ciudad,
        direccion: form.direccion,
        detalles: form.detalles || "Sin referencias adicionales",
        unidades: current.label,
        cantidad: Number(selected),
        precioProducto: current.productPrice,
        costoEnvio: current.shipping,
        metodoPago:
          form.paymentMethod === "anticipado"
            ? "Pago Anticipado (5% Descuento)"
            : "Pago Contraentrega",
        totalFinal,
        estado: form.paymentMethod === "anticipado" ? "Pago en proceso" : "Pendiente de pago",
        fecha: new Date().toLocaleString("es-CO"),
      };

      if (form.paymentMethod === "anticipado") {
        try {
          sessionStorage.setItem(PEDIDO_ANTICIPADO_STORAGE_KEY, JSON.stringify(orderData));
        } catch (err) {
          console.error("No se pudo guardar el pedido en sessionStorage:", err);
        }

        try {
          const res = await fetch("/api/checkout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ unidades: Number(selected) }),
          });
          const data: { init_point?: string; error?: string } = await res.json();
          if (!res.ok || !data.init_point) {
            throw new Error(data.error || "No se pudo crear la preferencia de pago.");
          }
          window.location.assign(data.init_point);
        } catch (err) {
          console.error("Error creando la preferencia de Mercado Pago:", err);
          try {
            sessionStorage.removeItem(PEDIDO_ANTICIPADO_STORAGE_KEY);
          } catch {}
          setIsSubmitting(false);
          setCheckoutError(
            "No pudimos conectar con la pasarela de pago. Intenta de nuevo en unos segundos."
          );
        }
      } else {
        try {
          await fetch(SHEETS_WEBHOOK_URL, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderData),
          });
        } catch (err) {
          console.error("Error enviando a Google Sheets:", err);
        }
        fbq("track", "Purchase", { value: current.total, currency: "COP" });
        setIsSubmitting(false);
        setOrderConfirmed(true);
      }
    },
    [form, current, selected, discountedTotal]
  );

  return (
    <PricingContext.Provider
      value={{
        selected,
        selectPackage,
        current,
        discountedTotal,
        orderConfirmed,
        isSubmitting,
        checkoutError,
        dismissConfirmation,
        form,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleFocusField,
        handlePaymentMethodChange,
        handleSubmit,
        isFormValid,
      }}
    >
      {children}
    </PricingContext.Provider>
  );
};
