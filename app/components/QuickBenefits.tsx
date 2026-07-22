"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface QuickBenefit {
  text: string;
  icon: ReactNode;
}

const quickBenefits: QuickBenefit[] = [
  {
    text: "Elimina residuos acumulados",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
      </svg>
    ),
  },
  {
    text: "Exfoliación suave",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3C12 3 5.25 10.5 5.25 14.25a6.75 6.75 0 0 0 13.5 0C18.75 10.5 12 3 12 3ZM9.75 15a2.25 2.25 0 0 0 4.5 0" />
      </svg>
    ),
  },
  {
    text: "Sensación de frescura",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
  {
    text: "Prepara el cuero cabelludo para absorber mejor los tratamientos",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
];

export const QuickBenefits = () => {
  return (
    <section
      className="bg-ivory py-8 px-5 sm:px-8 lg:px-16 border-b border-gold/10"
      aria-label="Beneficios clave"
    >
      <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {quickBenefits.map((b, i) => (
          <motion.div
            key={b.text}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: i * 0.08, ease: "easeOut" }}
            className="flex flex-col items-center text-center gap-2"
          >
            <div className="w-9 h-9 rounded-full border border-gold/40 flex items-center justify-center text-gold flex-shrink-0">
              {b.icon}
            </div>
            <p className="font-body text-charcoal text-xs leading-snug">
              {b.text}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
