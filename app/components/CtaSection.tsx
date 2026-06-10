"use client";

import { motion } from "framer-motion";

export const CtaSection = () => {
  return (
    <section
      className="bg-ivory pt-16 pb-0 px-5 sm:px-8 lg:px-16 lg:pt-28 overflow-hidden"
      aria-label="Presentación final del producto"
    >
      <div className="max-w-2xl mx-auto text-center">

        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="flex items-center justify-center gap-4 mb-10"
        >
          <div className="h-px w-10 bg-gold" />
          <span className="font-body text-gold text-xs tracking-[0.35em] uppercase">
            El momento de actuar
          </span>
          <div className="h-px w-10 bg-gold" />
        </motion.div>

        {/* Titular */}
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-charcoal leading-tight mb-4 lg:mb-5"
        >
          Tu cuero cabelludo lleva{" "}
          <em className="not-italic text-gold">tiempo</em>{" "}
          esperando esto.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
          className="font-body text-warm-gray text-base lg:text-lg leading-relaxed mb-10 lg:mb-16"
        >
          Un tratamiento semanal. Resultados reales{" "}
          <span className="text-charcoal font-medium">
            desde la primera aplicación.
          </span>
        </motion.p>

        {/* Visual del producto */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative flex items-center justify-center mx-auto"
          style={{ width: "min(620px, 94vw)", height: "min(640px, 96vw)" }}
          aria-hidden="true"
        >
          <div className="absolute inset-0 rounded-[40%] bg-gold-pale/50 blur-[80px] -z-10" />
          <div className="absolute inset-0 rounded-[40%] border border-gold/40 animate-[spin_40s_linear_infinite]" />
          <div className="absolute inset-2 rounded-[40%] border border-gold/25" />
          <img
            src="/mascarilla1.png"
            alt="Mascarilla Exfoliante Capilar"
            className="relative z-10 w-[580px] h-[600px] object-cover"
            style={{
              maxWidth: "88vw",
              maxHeight: "90vw",
              filter: "drop-shadow(0 16px 40px rgba(200,169,110,0.55))",
            }}
          />
        </motion.div>

      </div>
    </section>
  );
};
