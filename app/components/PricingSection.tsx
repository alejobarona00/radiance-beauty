"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type OptionKey = "1" | "2";
type PaymentMethod = "contraentrega" | "anticipado";

const PRICING = {
  "1": {
    label: "1 Unidad",
    productPrice: 59900,
    compareAt: 89000,
    shipping: 10000,
    total: 69900,
    badge: null,
    savingsNote: null,
  },
  "2": {
    label: "2 Unidades",
    productPrice: 109000,
    compareAt: 178000,
    shipping: 0,
    total: 109000,
    badge: "Más popular",
    savingsNote: "Ahorras $10.800 vs comprar por separado",
  },
} as const;

const SHEETS_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbw8UurWxlDaKbow4QU-hqv5vE67tNLbqUMXqoCyTZi9p57Zgi5Bu-tVR5buBiweSWamWA/exec";
const PAYMENT_URLS: Record<OptionKey, string> = {
  "1": "https://mpago.li/1ZF4qDN",
  "2": "https://mpago.li/33fF2wx",
};

const fmt = (n: number) => "$" + n.toLocaleString("es-CO");

const applyDiscount = (total: number) => Math.round((total * 0.95) / 100) * 100;

interface FormData {
  nombre: string;
  whatsapp: string;
  ciudad: string;
  barrio: string;
  direccion: string;
  detalles: string;
  paymentMethod: PaymentMethod;
}

const inputClass =
  "w-full font-body text-charcoal text-sm bg-warm-stone/40 border border-gold/20 rounded-xl px-4 py-3 placeholder:text-warm-gray/50 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-colors duration-200";

const labelClass =
  "font-body text-xs text-warm-gray tracking-wide uppercase block mb-1.5";

export const PricingSection = () => {
  const [selected, setSelected] = useState<OptionKey>("1");
  const [showModal, setShowModal] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stock, setStock] = useState(7);
  const [timeLeft, setTimeLeft] = useState(600);
  const [form, setForm] = useState<FormData>({
    nombre: "",
    whatsapp: "",
    ciudad: "",
    barrio: "",
    direccion: "",
    detalles: "",
    paymentMethod: "contraentrega",
  });

  const current = PRICING[selected];
  const discountedTotal = applyDiscount(current.total);

  // Contador de inventario: baja 1 o 2 unidades cada 12 segundos
  useEffect(() => {
    const id = setInterval(() => {
      setStock((prev) => Math.max(1, prev - (Math.random() < 0.5 ? 1 : 2)));
    }, 12000);
    return () => clearInterval(id);
  }, []);

  // Cuenta regresiva de 10 minutos
  useEffect(() => {
    const id = setInterval(() => {
      setTimeLeft((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  // Bloquear scroll con modal abierto
  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [showModal]);

  // Cerrar con Escape + resetear confirmación al cerrar
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    if (showModal) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [showModal]);

  const closeModal = () => {
    setShowModal(false);
    setOrderConfirmed(false);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const totalFinal =
      form.paymentMethod === "anticipado" ? discountedTotal : current.total;

    const orderData = {
      nombre: form.nombre,
      whatsapp: form.whatsapp,
      ciudad: form.ciudad,
      barrio: form.barrio,
      direccion: form.direccion,
      detalles: form.detalles || "Sin referencias adicionales",
      unidades: current.label,
      cantidad: Number(selected),
      precioProducto: current.productPrice,
      costoEnvio: current.shipping,
      metodoPago: form.paymentMethod === "anticipado"
        ? "Pago Anticipado (5% Descuento)"
        : "Pago Contraentrega",
      totalFinal,
      estado: form.paymentMethod === "anticipado" ? "Pago en proceso" : "Pendiente de pago",
      fecha: new Date().toLocaleString("es-CO"),
    };

    console.log("📦 Nuevo pedido Radiance Beauty:", orderData);

    if (form.paymentMethod === "anticipado") {
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
      if (typeof window !== "undefined" && typeof (window as any).fbq === "function") {
        (window as any).fbq("track", "Purchase", { value: discountedTotal, currency: "COP" });
      }
      setIsSubmitting(false);
      window.open(PAYMENT_URLS[selected], "_blank", "noopener,noreferrer");
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
      if (typeof window !== "undefined" && typeof (window as any).fbq === "function") {
        (window as any).fbq("track", "Purchase", { value: current.total, currency: "COP" });
      }
      setIsSubmitting(false);
      setOrderConfirmed(true);
    }
  };

  return (
    <section
      id="precio"
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

          {/* Contador de inventario */}
          <div className="mt-4 rounded-xl border p-3 text-center font-body text-sm font-bold" style={{ background: "#fff0f0", borderColor: "#ffcccc", color: "#d9534f" }}>
            ⚠️ ¡Solo quedan <span>{stock}</span> unidades disponibles en inventario!
          </div>

          {/* Cuenta regresiva de envío */}
          <div className="mt-2 rounded-xl border p-3 text-center font-body text-sm font-bold" style={{ background: "#fff0f0", borderColor: "#ffcccc", color: "#d9534f" }}>
            {timeLeft > 0 ? (
              <>
                ⚠️ ¡Pide ahora y despachamos hoy! Tiempo restante:{" "}
                <span>
                  {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:{String(timeLeft % 60).padStart(2, "0")}
                </span>
              </>
            ) : (
              <>⚠️ ¡Pide ya! Últimas unidades para despacho hoy.</>
            )}
          </div>
        </motion.div>

        {/* Selector de unidades */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="grid grid-cols-2 gap-4 mb-8"
        >
          {(["1", "2"] as OptionKey[]).map((key) => {
            const opt = PRICING[key];
            const isSelected = selected === key;
            return (
              <button
                key={key}
                onClick={() => setSelected(key)}
                aria-pressed={isSelected}
                className={`relative rounded-2xl border-2 p-5 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ivory ${
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
                <p className="font-display text-charcoal text-lg leading-tight mb-1">{opt.label}</p>
                <div className="flex items-baseline gap-2">
                  <p className={`font-display text-xl font-medium ${isSelected ? "text-gold" : "text-charcoal"}`}>
                    {fmt(opt.productPrice)}
                  </p>
                  <p className="font-body text-xs text-warm-gray/60 line-through">
                    {fmt(opt.compareAt)}
                  </p>
                </div>
                <p className={`font-body text-xs mt-1 ${opt.shipping === 0 ? "text-green-600 font-medium" : "text-warm-gray"}`}>
                  {opt.shipping === 0 ? "Envío gratis" : `+ ${fmt(opt.shipping)} envío`}
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
          className="bg-warm-stone/50 rounded-2xl border border-gold/15 p-6 mb-10"
          aria-live="polite"
        >
          <h3 className="font-body text-xs text-warm-gray tracking-[0.25em] uppercase mb-4">
            Detalle de tu pedido
          </h3>
          <div className="flex justify-between items-center mb-3">
            <span className="font-body text-warm-gray text-sm">{current.label}</span>
            <div className="flex items-baseline gap-2">
              <span className="font-body text-charcoal text-sm font-medium">{fmt(current.productPrice)}</span>
              <span className="font-body text-xs text-warm-gray/50 line-through">{fmt(current.compareAt)}</span>
            </div>
          </div>
          <div className="flex justify-between items-center pb-4 border-b border-gold/15">
            <span className="font-body text-warm-gray text-sm">Envío</span>
            <span className={`font-body text-sm font-medium ${current.shipping === 0 ? "text-green-600" : "text-charcoal"}`}>
              {current.shipping === 0 ? "Gratis" : fmt(current.shipping)}
            </span>
          </div>
          <div className="flex justify-between items-center pt-4">
            <span className="font-display text-charcoal text-lg">Total a pagar</span>
            <div className="text-right">
              <span className="font-display text-2xl lg:text-3xl text-charcoal tracking-tight">
                {fmt(current.total)}
              </span>
              <span className="font-body text-warm-gray text-xs block">COP</span>
            </div>
          </div>

          <p className="font-body text-xs text-center mt-4 font-medium text-green-600">
            {selected === "1"
              ? "¡Estás a 1 unidad de obtener envío GRATIS!"
              : "¡Has desbloqueado el envío GRATIS!"}
          </p>
        </motion.div>

        {/* Botón principal — pulsante */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex justify-center"
        >
          <motion.button
            onClick={() => setShowModal(true)}
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
            whileTap={{ scale: 0.97 }}
            aria-label="Abrir formulario de compra"
            className="w-full max-w-sm rounded-full bg-terracota hover:bg-terracota-dark text-ivory font-body font-bold text-base tracking-[0.2em] uppercase px-10 py-5 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracota focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
            style={{ boxShadow: "0 8px 32px rgba(196,87,47,0.35)" }}
          >
            ¡Comprar Ahora!
          </motion.button>
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

      {/* ─── Modal ─── */}
      <AnimatePresence>
        {showModal && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-black/60 z-50"
              onClick={closeModal}
              aria-hidden="true"
            />

            {/* Tarjeta del modal */}
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 24 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 max-w-md mx-auto bg-ivory rounded-3xl shadow-2xl overflow-y-auto max-h-[90vh]"
              role="dialog"
              aria-modal="true"
              aria-label={orderConfirmed ? "Pedido confirmado" : "Formulario de pedido"}
            >
              <div className="p-7 sm:p-8">

                {orderConfirmed ? (
                  /* ─── Vista de confirmación (Contraentrega) ─── */
                  <div className="text-center py-2">
                    <div className="w-16 h-16 rounded-full bg-gold/10 border-2 border-gold flex items-center justify-center mx-auto mb-5">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-8 h-8 text-gold" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <h3 className="font-display text-charcoal text-2xl mb-3 leading-tight">
                      ¡Pedido recibido!
                    </h3>
                    <p className="font-body text-warm-gray text-sm leading-relaxed mb-6">
                      Hemos recibido tu pedido y te contactaremos por WhatsApp para
                      coordinar el envío contraentrega.
                    </p>

                    {/* Resumen del pedido confirmado */}
                    <div className="bg-warm-stone/60 rounded-2xl p-5 text-left mb-6 space-y-2">
                      <div className="flex justify-between">
                        <span className="font-body text-warm-gray text-xs">Pedido</span>
                        <span className="font-body text-charcoal text-xs font-medium">{current.label}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-body text-warm-gray text-xs">Total</span>
                        <span className="font-display text-gold text-sm">{fmt(current.total)} COP</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-body text-warm-gray text-xs">WhatsApp</span>
                        <span className="font-body text-charcoal text-xs font-medium">{form.whatsapp}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-body text-warm-gray text-xs">Método de pago</span>
                        <span className="font-body text-charcoal text-xs font-medium">Contraentrega</span>
                      </div>
                    </div>

                    <button
                      onClick={closeModal}
                      className="w-full rounded-full bg-charcoal hover:bg-charcoal/80 text-ivory font-body font-bold text-sm tracking-[0.15em] uppercase py-4 transition-colors duration-200"
                    >
                      Cerrar
                    </button>
                  </div>

                ) : (
                  /* ─── Vista del formulario ─── */
                  <>
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="font-display text-charcoal text-2xl leading-tight mb-1">
                          Completa tu pedido
                        </h3>
                        <p className="font-body text-warm-gray text-xs">
                          Ingresa tus datos para finalizar la compra
                        </p>
                      </div>
                      <button
                        onClick={closeModal}
                        aria-label="Cerrar formulario"
                        className="flex-shrink-0 w-8 h-8 rounded-full bg-warm-stone flex items-center justify-center text-warm-gray hover:text-charcoal hover:bg-warm-stone/80 transition-colors duration-200 ml-4"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    {/* Resumen dinámico según método de pago */}
                    <div className="bg-warm-stone/60 rounded-2xl px-5 py-4 mb-6 flex justify-between items-center">
                      <div>
                        <p className="font-body text-warm-gray text-xs tracking-widest uppercase mb-0.5">Tu pedido</p>
                        <p className="font-display text-charcoal text-base">{current.label}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-body text-warm-gray text-xs mb-0.5">Total</p>
                        {form.paymentMethod === "anticipado" ? (
                          <>
                            <p className="font-body text-warm-gray/50 text-xs line-through">{fmt(current.total)}</p>
                            <p className="font-display text-gold text-xl tracking-tight">{fmt(discountedTotal)}</p>
                            <p className="font-body text-green-600 text-[10px] font-medium">5% descuento aplicado</p>
                          </>
                        ) : (
                          <>
                            <p className="font-display text-gold text-xl tracking-tight">{fmt(current.total)}</p>
                            <p className="font-body text-warm-gray/60 text-[10px]">
                              {current.shipping === 0 ? "Envío gratis" : `Incluye ${fmt(current.shipping)} envío`}
                            </p>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Formulario */}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                      {/* 1. Nombre */}
                      <div>
                        <label htmlFor="nombre" className={labelClass}>
                          Nombre completo <span className="text-terracota">*</span>
                        </label>
                        <input id="nombre" name="nombre" type="text" value={form.nombre}
                          onChange={handleInput} placeholder="Ej. Valentina Martínez"
                          autoComplete="name" required className={inputClass} />
                      </div>

                      {/* 2. WhatsApp */}
                      <div>
                        <label htmlFor="whatsapp" className={labelClass}>
                          Número de WhatsApp <span className="text-terracota">*</span>
                        </label>
                        <input id="whatsapp" name="whatsapp" type="tel" value={form.whatsapp}
                          onChange={handleInput} placeholder="Ej. 3001234567"
                          autoComplete="tel" required pattern="[0-9]{10}"
                          title="Ingresa los 10 dígitos sin espacios ni guiones"
                          className={inputClass} />
                      </div>

                      {/* 3. Ciudad */}
                      <div>
                        <label htmlFor="ciudad" className={labelClass}>
                          Ciudad <span className="text-terracota">*</span>
                        </label>
                        <input id="ciudad" name="ciudad" type="text" value={form.ciudad}
                          onChange={handleInput} placeholder="Ej. Bogotá"
                          autoComplete="address-level2" required className={inputClass} />
                      </div>

                      {/* 4. Barrio */}
                      <div>
                        <label htmlFor="barrio" className={labelClass}>
                          Barrio <span className="text-terracota">*</span>
                        </label>
                        <input id="barrio" name="barrio" type="text" value={form.barrio}
                          onChange={handleInput} placeholder="Ej. Chapinero, El Poblado"
                          autoComplete="address-level3" required className={inputClass} />
                      </div>

                      {/* 5. Dirección */}
                      <div>
                        <label htmlFor="direccion" className={labelClass}>
                          Dirección completa <span className="text-terracota">*</span>
                        </label>
                        <input id="direccion" name="direccion" type="text" value={form.direccion}
                          onChange={handleInput} placeholder="Ej. Calle 45 # 22-10, Apto 301"
                          autoComplete="street-address" required className={inputClass} />
                      </div>

                      {/* 6. Detalles (opcional) */}
                      <div>
                        <label htmlFor="detalles" className={labelClass}>
                          Detalles / Referencias{" "}
                          <span className="text-warm-gray/50 normal-case tracking-normal">(opcional)</span>
                        </label>
                        <input id="detalles" name="detalles" type="text" value={form.detalles}
                          onChange={handleInput} placeholder="Ej. Casa blanca, tocar timbre 2"
                          className={inputClass} />
                      </div>

                      {/* 7. Método de pago */}
                      <div className="pt-1">
                        <p className={labelClass}>
                          ¿Cómo deseas pagar? <span className="text-terracota">*</span>
                        </p>
                        <div className="flex flex-col gap-3">
                          {[
                            {
                              value: "contraentrega" as PaymentMethod,
                              title: "Pago Contraentrega",
                              desc: "Pagas al recibir tu pedido en casa",
                            },
                            {
                              value: "anticipado" as PaymentMethod,
                              title: "Pago Anticipado · 5% Descuento",
                              desc: `Tarjeta / PSE · Pagarías solo ${fmt(discountedTotal)} COP`,
                            },
                          ].map((opt) => {
                            const isActive = form.paymentMethod === opt.value;
                            return (
                              <label
                                key={opt.value}
                                className={`flex items-start gap-3 rounded-xl border-2 p-4 cursor-pointer transition-all duration-200 ${
                                  isActive
                                    ? "border-gold bg-gold/5"
                                    : "border-warm-stone hover:border-gold/40 bg-warm-stone/20"
                                }`}
                              >
                                <input
                                  type="radio"
                                  name="paymentMethod"
                                  value={opt.value}
                                  checked={isActive}
                                  onChange={handleInput}
                                  className="mt-0.5 accent-[#C8A96E] flex-shrink-0"
                                />
                                <div>
                                  <p className={`font-body text-sm font-semibold ${isActive ? "text-charcoal" : "text-charcoal/80"}`}>
                                    {opt.title}
                                  </p>
                                  <p className="font-body text-warm-gray text-xs mt-0.5">{opt.desc}</p>
                                </div>
                              </label>
                            );
                          })}
                        </div>
                      </div>

                      {/* Botón de submit */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full mt-2 rounded-full bg-terracota hover:bg-terracota-dark text-ivory font-body font-bold text-sm tracking-[0.18em] uppercase py-4 transition-all duration-200 hover:shadow-lg hover:shadow-terracota/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracota disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? "Procesando..." : "Finalizar Pedido →"}
                      </button>

                      {/* Mensaje de redirección para pago anticipado */}
                      {form.paymentMethod === "anticipado" && (
                        <p className="font-body text-[11px] text-warm-gray/70 text-center leading-relaxed flex items-center justify-center gap-1.5">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-3 h-3 flex-shrink-0" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                          </svg>
                          Serás redirigido a nuestra pasarela segura de Mercado Pago
                        </p>
                      )}

                      {/* Nota de confianza */}
                      <p className="font-body text-[11px] text-warm-gray/60 text-center leading-relaxed pt-1">
                        Al completar tu pedido, te escribiremos por WhatsApp para confirmar
                        los detalles de tu envío.
                      </p>

                      {/* Seguridad */}
                      <div className="flex items-center justify-center gap-2 text-warm-gray/50">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                        </svg>
                        <p className="font-body text-[10px]">
                          Compra segura · Procesado por{" "}
                          <span className="font-medium">Mercado Pago</span>
                        </p>
                      </div>
                    </form>
                  </>
                )}

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};
