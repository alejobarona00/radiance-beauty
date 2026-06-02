"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Pain {
  title: string;
  description: string;
  icon: ReactNode;
}

const pains: Pain[] = [
  {
    title: "El efecto 'recién sucio'",
    description:
      "Lo lavas en la mañana y a las pocas horas ya parece que llevas días sin lavarlo. Grasoso, sin volumen, sin vida.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-5 h-5"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3C12 3 5.25 10.5 5.25 14.25a6.75 6.75 0 0 0 13.5 0C18.75 10.5 12 3 12 3Z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.75 15a2.25 2.25 0 0 0 4.5 0"
        />
      </svg>
    ),
  },
  {
    title: "La esclavitud del lavado diario",
    description:
      "Terminas lavándote el cabello todos los días aunque no quieras. El tiempo, el esfuerzo, el daño acumulado. Es agotador.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-5 h-5"
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
    title: "La picazón que no para",
    description:
      "Esa sensación constante de cuero cabelludo sucio, con residuos acumulados que el champú normal no puede eliminar.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-5 h-5"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
        />
      </svg>
    ),
  },
  {
    title: "Raíz grasa, puntas secas",
    description:
      "El dilema que ningún producto resuelve: un extremo se ahoga en sebo y el otro se quiebra de resequedad.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-5 h-5"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7.5 21 3 16.5m0 0 4.5-4.5M3 16.5h13.5m0-13.5L21 7.5m0 0-4.5 4.5M21 7.5H7.5"
        />
      </svg>
    ),
  },
];

export const PainSection = () => {
  return (
    <section
      id="dolor"
      className="bg-charcoal py-14 px-5 sm:px-8 lg:px-16 lg:py-24"
      aria-label="Problemas capilares comunes"
    >
      <div className="max-w-5xl mx-auto">

        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="text-center mb-10 lg:mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-10 bg-gold" />
            <span className="font-body text-gold text-xs tracking-[0.35em] uppercase">
              El diagnóstico
            </span>
            <div className="h-px w-10 bg-gold" />
          </div>
          <h2 className="font-display text-3xl lg:text-5xl text-ivory leading-tight">
            ¿Te suena familiar?
          </h2>
        </motion.div>

        {/* Tarjetas de dolor */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 lg:mb-20">
          {pains.map((pain, i) => (
            <motion.div
              key={pain.title}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
              className="group border border-gold/20 rounded-2xl p-5 md:p-8 bg-white/[0.03] hover:bg-white/[0.06] hover:border-gold/40 transition-all duration-300"
            >
              <div className="flex gap-5">
                <div className="flex-shrink-0 w-11 h-11 rounded-full border border-gold/40 flex items-center justify-center text-gold group-hover:border-gold/70 transition-colors duration-300">
                  {pain.icon}
                </div>
                <div>
                  <h3 className="font-display text-ivory text-xl mb-2 leading-snug">
                    {pain.title}
                  </h3>
                  <p className="font-body text-warm-gray text-sm leading-relaxed">
                    {pain.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Cierre emocional */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="text-center"
        >
          <div className="h-px w-16 bg-gold/30 mx-auto mb-10" />
          <p className="font-display text-2xl lg:text-3xl text-ivory leading-relaxed max-w-2xl mx-auto">
            No es tu rutina.{" "}
            <em className="not-italic text-gold">
              Es tu cuero cabelludo pidiendo ayuda.
            </em>
          </p>
          <div className="h-px w-16 bg-gold/30 mx-auto mt-10" />
        </motion.div>

      </div>
    </section>
  );
};
