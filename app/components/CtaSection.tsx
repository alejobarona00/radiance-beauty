"use client";

import { motion } from "framer-motion";

const reassurances = [
  { label: "Envío a todo el país" },
  { label: "Garantía de 30 días" },
  { label: "Resultados o reembolso" },
];

const CheckIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    className="w-3.5 h-3.5 flex-shrink-0"
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

export const CtaSection = () => {
  return (
    <>
      {/* ─── Sección principal de cierre ─── */}
      <section
        className="bg-ivory py-16 px-5 sm:px-8 lg:px-16 lg:py-28 overflow-hidden"
        aria-label="Comprar la mascarilla"
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

          {/* Titular magnético */}
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

          {/* Visual del producto — spotlight */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative flex items-center justify-center mx-auto mb-14"
            style={{ width: "min(620px, 94vw)", height: "min(640px, 96vw)" }}
            aria-hidden="true"
          >
            {/* Glow detrás */}
            <div className="absolute inset-0 rounded-[40%] bg-gold-pale/50 blur-[80px] -z-10" />

            {/* Anillo exterior — rotación lenta */}
            <div className="absolute inset-0 rounded-[40%] border border-gold/40 animate-[spin_40s_linear_infinite]" />
            {/* Anillo interior estático */}
            <div className="absolute inset-2 rounded-[40%] border border-gold/25" />

            {/* mascarilla1.png — 580 × 600 px */}
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

          {/* Precio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="mb-8"
          >
            <span className="font-body text-xs text-warm-gray tracking-[0.25em] uppercase block mb-2">
              Precio especial de lanzamiento
            </span>
            <div className="flex items-baseline justify-center gap-2">
              <span className="font-display text-4xl sm:text-5xl lg:text-6xl text-charcoal tracking-tight">
                $59.900
              </span>
              <span className="font-body text-warm-gray text-sm">COP</span>
            </div>
          </motion.div>

          {/* Garantías */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: 0.3, ease: "easeOut" }}
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-12"
            aria-label="Garantías de compra"
          >
            {reassurances.map((r) => (
              <span
                key={r.label}
                className="flex items-center gap-2 font-body text-xs text-warm-gray"
              >
                <span className="text-gold">
                  <CheckIcon />
                </span>
                {r.label}
              </span>
            ))}
          </motion.div>

          {/* ─── Botón CTA dorado con shimmer ─── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: 0.38, ease: "easeOut" }}
            className="flex flex-col items-center gap-5"
          >
            {/* Botón gold con shimmer + link real a Mercado Pago */}
            <motion.a
              href="https://mpago.li/1ZF4qDN"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Comprar la mascarilla — se abrirá en una nueva pestaña"
              whileHover="hovered"
              whileTap={{ scale: 0.97 }}
              initial="rest"
              animate="rest"
              className="relative overflow-hidden rounded-full px-10 sm:px-14 py-5 font-body font-semibold text-sm tracking-[0.15em] uppercase text-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
              style={{
                background: "linear-gradient(135deg, #C8A96E 0%, #E8D5A3 50%, #C8A96E 100%)",
                boxShadow: "0 4px 24px rgba(200, 169, 110, 0.35)",
              }}
            >
              <motion.span
                variants={{
                  rest: { x: "-120%", skewX: -15, opacity: 1 },
                  hovered: { x: "220%", skewX: -15, opacity: 1, transition: { duration: 0.55, ease: "easeInOut" } },
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none"
                aria-hidden="true"
              />
              <motion.span
                variants={{
                  rest: { opacity: 0 },
                  hovered: { opacity: 1, transition: { duration: 0.2 } },
                }}
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{ boxShadow: "0 8px 40px rgba(200, 169, 110, 0.6)" }}
                aria-hidden="true"
              />
              <span className="relative flex items-center gap-3">
                Quiero mi Mascarilla
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </motion.a>

            {/* Nota de seguridad Mercado Pago */}
            <div className="flex items-center gap-1.5 text-warm-gray/60">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
              <p className="font-body text-[11px] tracking-wide">
                Procesado de forma segura por{" "}
                <span className="text-warm-gray/80 font-medium">Mercado Pago</span>
              </p>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
              </svg>
            </div>
          </motion.div>

        </div>
      </section>
    </>
  );
};
