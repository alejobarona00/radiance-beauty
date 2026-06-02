"use client";

import { motion } from "framer-motion";

const ingredients = [
  {
    number: "01",
    name: "Semillas de Macadamia",
    tag: "Exfoliación profunda",
    description:
      "Granos ultrafinos que remueven células muertas y depósitos de sebo del cuero cabelludo con precisión, sin inflamar ni dañar el folículo piloso.",
    benefit: "Cuero cabelludo libre e impuro desde el primer uso.",
  },
  {
    number: "02",
    name: "Proteína de Trigo",
    tag: "Fortalecimiento capilar",
    description:
      "Se une a la queratina para reparar la fibra dañada desde adentro, reduce la porosidad y fortalece cada hebra desde su punto de nacimiento.",
    benefit: "Menos caída, más densidad y resistencia visible.",
  },
  {
    number: "03",
    name: "Aceite de Jojoba",
    tag: "Regulador natural de grasa",
    description:
      "Imita molecularmente el sebo humano, enviando la señal exacta al folículo para que deje de producir grasa en exceso de forma natural.",
    benefit: "Más días entre lavados, sin raíz brillante ni pesada.",
  },
  {
    number: "04",
    name: "Aloe Vera",
    tag: "Calmante e hidratante",
    description:
      "Su gel penetra el cuero cabelludo para calmar la inflamación, aliviar la picazón al instante y reponer hidratación en toda la fibra capilar.",
    benefit: "Cero picazón. Sensación de frescura que se mantiene.",
  },
  {
    number: "05",
    name: "Vitamina E",
    tag: "Escudo antioxidante",
    description:
      "Neutraliza los radicales libres que opacan el color, debilitan la estructura capilar y aceleran el envejecimiento de cada hebra.",
    benefit: "Brillo natural y protección activa contra el daño ambiental.",
  },
];

export const IngredientsSection = () => {
  return (
    <section
      className="bg-charcoal py-16 px-5 sm:px-8 lg:px-16 lg:py-28"
      aria-label="Ingredientes activos del producto"
    >
      <div className="max-w-5xl mx-auto">

        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-10 lg:mb-20"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-10 bg-gold" />
            <span className="font-body text-gold text-xs tracking-[0.35em] uppercase">
              Formulado con ciencia natural
            </span>
            <div className="h-px w-10 bg-gold" />
          </div>
          <h2 className="font-display text-3xl lg:text-5xl text-ivory leading-tight max-w-2xl mx-auto">
            Cada ingrediente tiene un propósito.{" "}
            <em className="not-italic text-gold">Ninguno sobra.</em>
          </h2>
        </motion.div>

        {/* Lista de ingredientes */}
        <div>
          {ingredients.map((item, i) => {
            const fromRight = i % 2 === 1;
            return (
              <div key={item.number}>
                {i > 0 && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="h-px bg-gold/15 origin-left"
                    aria-hidden="true"
                  />
                )}

                <motion.div
                  initial={{ opacity: 0, x: fromRight ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.65, ease: "easeOut" }}
                  className={`flex flex-col gap-5 py-8 md:flex-row md:items-center md:gap-16 md:py-14 ${
                    fromRight ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Columna del nombre */}
                  <div className="flex-1 relative min-w-0">
                    <span
                      className="absolute -top-6 left-0 font-display text-[7rem] leading-none text-ivory/[0.04] select-none pointer-events-none"
                      aria-hidden="true"
                    >
                      {item.number}
                    </span>
                    <div className="relative">
                      <span className="font-body text-gold text-xs tracking-[0.35em] uppercase block mb-3">
                        {item.tag}
                      </span>
                      <h3 className="font-display text-ivory text-2xl lg:text-4xl leading-tight">
                        {item.name}
                      </h3>
                    </div>
                  </div>

                  {/* Separador vertical solo en desktop */}
                  <div
                    className="hidden md:block w-px h-20 bg-gold/20 flex-shrink-0"
                    aria-hidden="true"
                  />

                  {/* Columna de descripción */}
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-warm-gray text-base leading-relaxed mb-5">
                      {item.description}
                    </p>
                    <div className="flex items-start gap-3">
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0 mt-[6px]"
                        aria-hidden="true"
                      />
                      <p className="font-body text-ivory text-sm font-medium leading-relaxed">
                        {item.benefit}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* Línea de cierre */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="h-px bg-gold/15 origin-left mt-0"
          aria-hidden="true"
        />

      </div>
    </section>
  );
};
