"use client";

import { motion } from "framer-motion";

const headingLines = [
  { text: "El problema no está", gold: false },
  { text: "en tu cabello.", gold: false },
  { text: "Está debajo de él.", gold: true },
];

export const RevealSection = () => {
  return (
    <section
      className="bg-ivory py-16 px-5 sm:px-8 lg:px-16 lg:py-28"
      aria-label="La raíz del problema capilar"
    >
      <div className="max-w-4xl mx-auto">

        {/* Tag centrado */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex items-center justify-center gap-4 mb-8 lg:mb-14"
        >
          <div className="h-px w-10 bg-gold" />
          <span className="font-body text-gold text-xs tracking-[0.35em] uppercase">
            La raíz del problema
          </span>
          <div className="h-px w-10 bg-gold" />
        </motion.div>

        {/* Título línea por línea */}
        <div className="text-center mb-8 lg:mb-14">
          {headingLines.map((line, i) => (
            <motion.span
              key={line.text}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.75,
                delay: i * 0.2,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className={`font-display block text-3xl sm:text-4xl lg:text-6xl leading-tight tracking-tight ${
                line.gold ? "text-gold" : "text-charcoal"
              }`}
            >
              {line.text}
            </motion.span>
          ))}
        </div>

        {/* Párrafo explicativo */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, delay: 0.1, ease: "easeOut" }}
          className="font-body text-warm-gray text-base lg:text-lg leading-relaxed text-center max-w-2xl mx-auto mb-10 lg:mb-16"
        >
          Todos los síntomas que sufres — el exceso de grasa, la picazón, la
          falta de volumen — nacen del mismo origen: un cuero cabelludo saturado
          de residuos, sebo y células muertas que ningún champú elimina en
          profundidad.
          <br />
          <br />
          Lavas el cabello, pero nunca{" "}
          <span className="text-charcoal font-medium">
            exfolias el cuero cabelludo.
          </span>
        </motion.p>

        {/* Cita metáfora */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="max-w-xl mx-auto border-l-2 border-gold pl-5 sm:pl-8 py-2"
        >
          <p className="font-display italic text-xl sm:text-2xl lg:text-3xl text-charcoal leading-snug">
            "Es como limpiar el piso{" "}
            <em className="not-italic text-gold">sin barrer primero.</em>"
          </p>
          <span className="font-body text-xs text-warm-gray tracking-[0.25em] uppercase mt-4 block">
            — Radiance Beauty
          </span>
        </motion.div>

      </div>
    </section>
  );
};
