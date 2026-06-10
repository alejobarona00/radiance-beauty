"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Benefit {
  title: string;
  description: string;
  icon: ReactNode;
}

const benefits: Benefit[] = [
  {
    title: "Exfolia sin agredir",
    description:
      "Las semillas de macadamia pulen el cuero cabelludo con suavidad extrema, sin inflamar ni irritar el folículo.",
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
          d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z"
        />
      </svg>
    ),
  },
  {
    title: "Regula el exceso de grasa",
    description:
      "El aceite de jojoba imita el sebo natural, enviando la señal correcta al folículo para que deje de producir en exceso.",
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
    title: "Equilibra raíz y puntas",
    description:
      "Proteína de trigo y Aloe Vera fortalecen desde la raíz e hidratan las puntas. Un solo producto, dos problemas resueltos.",
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
          d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.97Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.97Z"
        />
      </svg>
    ),
  },
];

export const ProductSection = () => {
  return (
    <section
      className="bg-warm-stone py-16 px-5 sm:px-8 lg:px-16 lg:py-28 overflow-hidden"
      aria-label="Presentación del producto estrella"
    >
      <div className="max-w-6xl mx-auto">

        {/* Layout dos columnas en desktop */}
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20 mb-12 lg:mb-20">

          {/* Columna izquierda: texto */}
          <div className="flex-1 max-w-xl">

            {/* Tag */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="h-px w-10 bg-gold" />
              <span className="font-body text-gold text-xs tracking-[0.35em] uppercase">
                La solución
              </span>
            </motion.div>

            {/* Nombre del producto */}
            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="font-display text-4xl lg:text-5xl text-charcoal leading-tight tracking-tight mb-6"
            >
              Mascarilla Exfoliante
              <br />
              <span className="text-gold">Capilar</span>{" "}
              <em className="not-italic text-charcoal">Purificación Profunda</em>
            </motion.h2>

            {/* Subtítulo */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.65, delay: 0.25, ease: "easeOut" }}
              className="font-body text-warm-gray text-base lg:text-lg leading-relaxed mb-10"
            >
              Formulada para liberar tu cuero cabelludo, equilibrar tu cabello
              y devolverte{" "}
              <span className="text-charcoal font-medium">
                días de frescura real.
              </span>
            </motion.p>

            {/* Bullets de beneficio rápido */}
            <motion.ul
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: 0.38, ease: "easeOut" }}
              className="flex flex-col gap-3"
              aria-label="Beneficios principales"
            >
              {["Desde la primera aplicación", "Sin sulfatos agresivos", "Para todo tipo de cabello"].map(
                (item) => (
                  <li key={item} className="flex items-center gap-3 font-body text-sm text-warm-gray">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" aria-hidden="true" />
                    {item}
                  </li>
                )
              )}
            </motion.ul>


          </div>

          {/* Columna derecha: visual del producto */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.85, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex-shrink-0 relative flex items-center justify-center"
            style={{ width: "min(460px, 90vw)", height: "min(460px, 90vw)" }}
            aria-hidden="true"
          >
            {/* Glow dorado detrás */}
            <div className="absolute inset-0 rounded-full bg-gold-pale/40 blur-[80px] -z-10" />

            {/* Anillo exterior giratorio */}
            <div className="absolute inset-0 rounded-full border border-gold/40 animate-[spin_30s_linear_infinite]" />
            {/* Anillo interior estático */}
            <div className="absolute inset-2 rounded-full border border-gold/25" />

            {/* Imagen real del producto — el rey */}
            <img
              src="/mascarilla.png"
              alt="Mascarilla Radiance"
              className="relative z-10 object-contain w-[320px] h-auto md:w-[400px]"
              style={{
                width: "min(420px, 85vw)",
                height: "min(420px, 85vw)",
                filter: "drop-shadow(0 12px 32px rgba(200,169,110,0.5))",
              }}
            />
          </motion.div>
        </div>

        {/* Tarjetas de beneficio */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
              className="bg-ivory rounded-2xl p-7 border border-gold/20 hover:border-gold/45 hover:shadow-lg hover:shadow-gold/10 transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center text-gold mb-5 group-hover:border-gold/70 transition-colors duration-300">
                {benefit.icon}
              </div>
              <h3 className="font-display text-charcoal text-lg mb-2 leading-snug">
                {benefit.title}
              </h3>
              <p className="font-body text-warm-gray text-sm leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
