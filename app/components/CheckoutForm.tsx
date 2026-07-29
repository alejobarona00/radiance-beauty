"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  fmt,
  usePricing,
  anticipadoDiscountPercent,
  fieldId,
  type FieldName,
} from "@/app/components/PricingProvider";
import { COLOMBIA_DEPARTAMENTOS } from "@/app/lib/colombiaDepartamentos";

interface CheckoutFormProps {
  sectionId: string;
}

const FieldError = ({ message }: { message?: string }) => {
  if (!message) return null;
  return (
    <p role="alert" className="mt-1.5 font-body text-xs text-red-600">
      {message}
    </p>
  );
};

const inputBaseClass =
  "w-full rounded-xl border bg-ivory px-4 py-3 font-body text-sm text-charcoal placeholder:text-warm-gray/50 transition-colors duration-150 focus-ring-gold";

const inputBorderClass = (hasError: boolean) =>
  hasError ? "border-red-400" : "border-warm-stone focus:border-gold";

export const CheckoutForm = ({ sectionId }: CheckoutFormProps) => {
  const {
    current,
    discountedTotal,
    form,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleFocusField,
    handlePaymentMethodChange,
    handleSubmit,
    isSubmitting,
    checkoutError,
    orderConfirmed,
    dismissConfirmation,
  } = usePricing();

  const errorFor = (field: FieldName) => (touched[field] ? errors[field] : undefined);
  const id = (field: FieldName) => fieldId(field, sectionId);

  return (
    <div className="rounded-2xl border border-gold/15 bg-ivory p-5 sm:p-7">
      <AnimatePresence mode="wait">
        {orderConfirmed ? (
          <motion.div
            key="confirmed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="text-center py-6"
          >
            <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-gold/15 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-7 h-7 text-gold">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h4 className="font-display text-lg text-charcoal mb-2">¡Pedido confirmado!</h4>
            <p className="font-body text-sm text-warm-gray mb-6">
              Te contactaremos por WhatsApp para coordinar la entrega. Pagas cuando lo recibes.
            </p>
            <button
              onClick={dismissConfirmation}
              className="rounded-full bg-terracota hover:bg-terracota-dark text-ivory font-body font-bold text-sm tracking-[0.15em] uppercase px-8 py-4 transition-colors duration-200 focus-ring-terracota"
            >
              Hacer otro pedido
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onSubmit={handleSubmit}
            noValidate
            className="space-y-4"
          >
            <h3 className="font-display text-lg text-charcoal mb-1">Completa tus datos de envío</h3>
            <p className="font-body text-xs text-warm-gray mb-4">
              {current.label} · {fmt(current.total)}
            </p>

            {/* Método de pago */}
            <div className="grid grid-cols-2 gap-3 mb-2">
              <button
                type="button"
                onClick={() => handlePaymentMethodChange("contraentrega")}
                className={`rounded-xl border-2 px-3 py-3 text-left transition-colors duration-150 focus-ring-gold ${
                  form.paymentMethod === "contraentrega"
                    ? "border-gold bg-gold/5"
                    : "border-warm-stone hover:border-gold/40"
                }`}
              >
                <p className="font-body text-xs font-semibold text-charcoal">Contraentrega</p>
                <p className="font-body text-[11px] text-warm-gray mt-0.5">Pagas al recibir</p>
              </button>
              <button
                type="button"
                onClick={() => handlePaymentMethodChange("anticipado")}
                className={`rounded-xl border-2 px-3 py-3 text-left transition-colors duration-150 focus-ring-gold ${
                  form.paymentMethod === "anticipado"
                    ? "border-gold bg-gold/5"
                    : "border-warm-stone hover:border-gold/40"
                }`}
              >
                <p className="font-body text-xs font-semibold text-charcoal">Pago anticipado</p>
                <p className="font-body text-[11px] text-gold mt-0.5">
                  -{anticipadoDiscountPercent}% · {fmt(discountedTotal)}
                </p>
              </button>
            </div>

            <div>
              <label htmlFor={id("nombre")} className="font-body text-xs text-warm-gray mb-1.5 block">
                Nombre completo
              </label>
              <input
                id={id("nombre")}
                name="nombre"
                type="text"
                autoComplete="name"
                value={form.nombre}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleFocusField}
                placeholder="Ej: María Pérez"
                aria-invalid={Boolean(errorFor("nombre"))}
                className={`${inputBaseClass} ${inputBorderClass(Boolean(errorFor("nombre")))}`}
              />
              <FieldError message={errorFor("nombre")} />
            </div>

            <div>
              <label htmlFor={id("whatsapp")} className="font-body text-xs text-warm-gray mb-1.5 block">
                WhatsApp
              </label>
              <input
                id={id("whatsapp")}
                name="whatsapp"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                value={form.whatsapp}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleFocusField}
                placeholder="3001234567"
                aria-invalid={Boolean(errorFor("whatsapp"))}
                className={`${inputBaseClass} ${inputBorderClass(Boolean(errorFor("whatsapp")))}`}
              />
              <FieldError message={errorFor("whatsapp")} />
            </div>

            <div>
              <label htmlFor={id("departamento")} className="font-body text-xs text-warm-gray mb-1.5 block">
                Departamento
              </label>
              <select
                id={id("departamento")}
                name="departamento"
                autoComplete="address-level1"
                value={form.departamento}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleFocusField}
                aria-invalid={Boolean(errorFor("departamento"))}
                className={`${inputBaseClass} ${inputBorderClass(Boolean(errorFor("departamento")))}`}
              >
                <option value="">Selecciona tu departamento</option>
                {COLOMBIA_DEPARTAMENTOS.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              <FieldError message={errorFor("departamento")} />
            </div>

            <div>
              <label htmlFor={id("ciudad")} className="font-body text-xs text-warm-gray mb-1.5 block">
                Ciudad
              </label>
              <input
                id={id("ciudad")}
                name="ciudad"
                type="text"
                autoComplete="address-level2"
                value={form.ciudad}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleFocusField}
                placeholder="Ej: Medellín"
                aria-invalid={Boolean(errorFor("ciudad"))}
                className={`${inputBaseClass} ${inputBorderClass(Boolean(errorFor("ciudad")))}`}
              />
              <FieldError message={errorFor("ciudad")} />
            </div>

            <div>
              <label htmlFor={id("direccion")} className="font-body text-xs text-warm-gray mb-1.5 block">
                Dirección
              </label>
              <input
                id={id("direccion")}
                name="direccion"
                type="text"
                autoComplete="street-address"
                value={form.direccion}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleFocusField}
                placeholder="Calle 5 #23-45, Barrio El Poblado, Apto 302"
                aria-invalid={Boolean(errorFor("direccion"))}
                className={`${inputBaseClass} ${inputBorderClass(Boolean(errorFor("direccion")))}`}
              />
              <FieldError message={errorFor("direccion")} />
            </div>

            {checkoutError && (
              <p role="alert" className="font-body text-xs text-red-600 text-center">
                {checkoutError}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-full bg-terracota hover:bg-terracota-dark disabled:opacity-70 disabled:cursor-wait text-ivory font-body font-bold text-sm tracking-[0.12em] uppercase px-8 py-4 transition-colors duration-200 focus-ring-terracota mt-2"
            >
              {isSubmitting
                ? "Procesando..."
                : form.paymentMethod === "anticipado"
                  ? `Pagar ahora y ahorrar ${anticipadoDiscountPercent}%`
                  : "Confirmar pedido contraentrega"}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};
