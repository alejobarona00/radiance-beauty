"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "¿Cómo se aplica Radiance?",
    answer:
      "Aplícala sobre el cabello húmedo antes del champú. Masajea el cuero cabelludo con movimientos circulares durante 2–3 minutos, dejando que los activos penetren, y luego enjuaga completamente. Úsala una vez por semana como primer paso de tu rutina.",
  },
  {
    question: "¿Cuándo veré resultados?",
    answer:
      "La mayoría de nuestras clientas notan la diferencia desde la primera aplicación: menos grasa, más volumen y sensación de frescura prolongada. Con uso constante semanal, los resultados se optimizan durante las primeras cuatro semanas.",
  },
  {
    question: "¿Es apta para todo tipo de cabello?",
    answer:
      "Sí. La mascarilla está formulada para cabello liso, rizado, teñido o procesado. Sus ingredientes regulan el sebo sin resecar las fibras, equilibrando cualquier tipo de cuero cabelludo sin importar su condición.",
  },
  {
    question: "¿Hacen envíos a todo el país?",
    answer:
      "Sí, enviamos a todo Colombia. El tiempo de entrega es de 2 a 5 días hábiles según tu ciudad. El costo de envío está incluido en el precio especial de lanzamiento.",
  },
];

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section
      className="bg-charcoal py-16 px-5 sm:px-8 lg:px-16 lg:py-28"
      aria-label="Preguntas frecuentes"
    >
      <div className="max-w-3xl mx-auto">

        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12 lg:mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-10 bg-gold" />
            <span className="font-body text-gold text-xs tracking-[0.35em] uppercase">
              Resolvemos tus dudas
            </span>
            <div className="h-px w-10 bg-gold" />
          </div>
          <h2 className="font-display text-3xl lg:text-5xl text-ivory leading-tight">
            Preguntas{" "}
            <em className="not-italic text-gold">frecuentes</em>
          </h2>
        </motion.div>

        {/* Acordeón */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="divide-y divide-gold/15"
        >
          {faqs.map((faq, i) => (
            <div key={faq.question}>
              <button
                onClick={() => handleToggle(i)}
                aria-expanded={openIndex === i}
                className="w-full flex items-center justify-between gap-6 py-6 text-left group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/50 rounded"
              >
                <span
                  className={`font-display text-lg sm:text-xl leading-snug transition-colors duration-200 ${
                    openIndex === i ? "text-gold" : "text-ivory group-hover:text-gold/80"
                  }`}
                >
                  {faq.question}
                </span>

                {/* Chevron animado */}
                <motion.span
                  animate={{ rotate: openIndex === i ? 45 : 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className={`flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-colors duration-200 ${
                    openIndex === i
                      ? "border-gold text-gold"
                      : "border-gold/30 text-warm-gray group-hover:border-gold/60"
                  }`}
                  aria-hidden="true"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    className="w-3 h-3"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m-8-8h16" />
                  </svg>
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="font-body text-warm-gray text-sm sm:text-base leading-relaxed pb-6 pr-10">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
