"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Step {
  number: string;
  title: string;
  description: string;
  icon: ReactNode;
}

const steps: Step[] = [
  {
    number: "01",
    title: "Masaje Estimulante",
    description:
      "Aplícalo sobre el cabello húmedo y masajea, especialmente en la zona del cuero cabelludo, con suaves movimientos circulares que lleguen hasta la raíz.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-6 h-6"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
        />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Activación",
    description:
      "Déjalo actuar durante 1 o 2 minutos para que los activos penetren profundamente en el cuero cabelludo.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-6 h-6"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Enjuague y Continuación",
    description:
      "Enjuaga con abundante agua asegurándote de que no queden residuos, y continúa con tu rutina normal de lavado y acondicionamiento.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-6 h-6"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3C12 3 5.25 10.5 5.25 14.25a6.75 6.75 0 0 0 13.5 0C18.75 10.5 12 3 12 3ZM9.75 15a2.25 2.25 0 0 0 4.5 0"
        />
      </svg>
    ),
  },
];

export const RitualSection = () => {
  return (
    <section
      className="bg-ivory py-16 px-5 sm:px-8 lg:px-16 lg:py-28"
      aria-label="Modo de uso del producto"
    >
      <div className="max-w-5xl mx-auto">

        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12 lg:mb-20"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-10 bg-gold" />
            <span className="font-body text-gold text-xs tracking-[0.35em] uppercase">
              El ritual
            </span>
            <div className="h-px w-10 bg-gold" />
          </div>
          <h2 className="font-display text-3xl lg:text-5xl text-charcoal leading-tight mb-4">
            Tres pasos.{" "}
            <em className="not-italic text-gold">Un reset completo.</em>
          </h2>
          <p className="font-body text-warm-gray text-base max-w-md mx-auto leading-relaxed">
            Úsala una vez por semana como primer paso de tu rutina de lavado.
          </p>
        </motion.div>

        {/* Pasos */}
        <div className="flex flex-col md:flex-row md:items-start gap-0">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="flex flex-col md:flex-row md:items-start flex-1"
            >
              {/* Tarjeta del paso */}
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.65, delay: i * 0.18, ease: "easeOut" }}
                className="flex-1 flex flex-col items-center text-center px-4 md:px-6"
              >
                {/* Ícono */}
                <div className="w-14 h-14 rounded-full border border-gold/40 bg-warm-stone/40 flex items-center justify-center text-gold mb-5">
                  {step.icon}
                </div>

                {/* Número */}
                <span className="font-display text-gold/60 text-sm tracking-[0.3em] mb-3">
                  {step.number}
                </span>

                {/* Título */}
                <h3 className="font-display text-charcoal text-xl lg:text-2xl leading-snug mb-4">
                  {step.title}
                </h3>

                {/* Descripción */}
                <p className="font-body text-warm-gray text-sm leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </motion.div>

              {/* Conector animado entre pasos (solo desktop, no en el último) */}
              {i < steps.length - 1 && (
                <div className="hidden md:flex items-start pt-7 flex-shrink-0">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{
                      duration: 0.6,
                      delay: i * 0.18 + 0.4,
                      ease: "easeOut",
                    }}
                    style={{ originX: 0 }}
                    className="w-16 h-px bg-gold/35"
                    aria-hidden="true"
                  />
                </div>
              )}

              {/* Separador móvil entre pasos */}
              {i < steps.length - 1 && (
                <div
                  className="md:hidden flex flex-col items-center my-8"
                  aria-hidden="true"
                >
                  <motion.div
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    style={{ originY: 0 }}
                    className="w-px h-10 bg-gold/30"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Nota de frecuencia */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, delay: 0.3, ease: "easeOut" }}
          className="mt-12 lg:mt-20 flex items-center justify-center gap-5"
        >
          <div className="h-px w-12 bg-gold/30" aria-hidden="true" />
          <p className="font-body text-xs text-warm-gray tracking-[0.2em] uppercase text-center">
            Frecuencia recomendada: una vez por semana
          </p>
          <div className="h-px w-12 bg-gold/30" aria-hidden="true" />
        </motion.div>

      </div>
    </section>
  );
};
