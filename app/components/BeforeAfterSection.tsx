"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BuyButton } from "@/app/components/BuyButton";

interface Step {
  number: number;
  label: string;
  description: string;
  image: string;
  alt: string;
  width: number;
  height: number;
}

const steps: Step[] = [
  {
    number: 1,
    label: "Antes",
    description: "Residuos y grasa acumulados en el cuero cabelludo.",
    image: "/01-antes.jpg",
    alt: "Cuero cabelludo antes de usar la Mascarilla Exfoliante Capilar",
    width: 900,
    height: 1125,
  },
  {
    number: 2,
    label: "Aplicación",
    description: "Masajea sobre el cuero cabelludo húmedo y deja actuar.",
    image: "/02-aplicacion.jpg",
    alt: "Aplicación de la Mascarilla Exfoliante Capilar sobre el cuero cabelludo",
    width: 416,
    height: 520,
  },
  {
    number: 3,
    label: "Después",
    description: "Cuero cabelludo visiblemente más limpio.",
    image: "/03-despues.jpg",
    alt: "Cuero cabelludo después de usar la Mascarilla Exfoliante Capilar",
    width: 900,
    height: 1125,
  },
];

export const BeforeAfterSection = () => {
  return (
    <section
      className="bg-warm-stone py-16 px-5 sm:px-8 lg:px-16 lg:py-28"
      aria-label="Resultado real en tres pasos"
    >
      <div className="max-w-4xl mx-auto">

        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="text-center mb-10 lg:mb-14"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-10 bg-gold" />
            <span className="font-body text-gold text-xs tracking-[0.35em] uppercase">
              Resultados reales
            </span>
            <div className="h-px w-10 bg-gold" />
          </div>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-5xl text-charcoal leading-tight">
            Resultado real, <em className="not-italic text-gold">en 3 pasos</em>
          </h2>
        </motion.div>

        {/* Grilla de pasos */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 lg:gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.12, ease: "easeOut" }}
              className="max-w-[380px] mx-auto sm:max-w-none"
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src={step.image}
                  alt={step.alt}
                  width={step.width}
                  height={step.height}
                  sizes={
                    step.number === 2
                      ? "400px"
                      : "(min-width: 640px) 33vw, 380px"
                  }
                  className="w-full h-full object-cover"
                />
                {/* Numeración del paso */}
                <div
                  className="absolute top-3 left-3 w-8 h-8 rounded-full bg-ivory border border-gold flex items-center justify-center"
                  aria-hidden="true"
                >
                  <span className="font-display text-charcoal text-sm">{step.number}</span>
                </div>
              </div>
              <p className="font-body text-gold text-xs tracking-[0.35em] uppercase mt-4 mb-1.5">
                {step.label}
              </p>
              <p className="font-body text-warm-gray text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Aviso legal */}
        <p className="text-center font-body text-warm-gray/50 text-[11px] leading-relaxed mt-8 lg:mt-10">
          Resultados reales. Pueden variar según el tipo de cabello y la frecuencia de uso.
        </p>

        {/* CTA intermedio */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex justify-center mt-10 lg:mt-14"
        >
          <BuyButton trackingId="before_after_section" />
        </motion.div>

      </div>
    </section>
  );
};
