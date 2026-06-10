"use client";

import { motion } from "framer-motion";

export const HeroSection = () => {
  const handleScrollToNext = () => {
    document.getElementById("dolor")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScrollToPricing = () => {
    document.getElementById("precio")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative min-h-screen bg-[url('/radiancelife.png')] bg-cover bg-center bg-no-repeat flex flex-col"
      aria-label="Sección principal de Radiance Beauty"
    >
      {/* Overlay oscuro para legibilidad */}
      <div className="absolute inset-0 bg-black/45" aria-hidden="true" />

      {/* Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 flex items-center justify-between px-5 sm:px-10 lg:px-20 py-5"
        aria-label="Navegación principal"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-gold/70 flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-gold" />
          </div>
          <span className="font-display text-ivory font-medium text-base tracking-[0.2em] uppercase">
            Radiance Beauty
          </span>
        </div>
        <button
          onClick={handleScrollToNext}
          tabIndex={0}
          aria-label="Ir a conocer el producto"
          className="hidden md:block font-body text-xs text-ivory/70 hover:text-ivory transition-colors duration-200 tracking-[0.2em] uppercase"
        >
          Conocer el producto
        </button>
      </motion.nav>

      {/* Contenido principal — izquierda */}
      <div className="relative z-10 flex flex-1 items-center pl-5 sm:pl-10 lg:pl-20 pr-5 sm:pr-10 pb-10 lg:pb-16">
        <div className="max-w-xl">

          {/* Etiqueta dorada */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="h-px w-10 bg-gold" />
            <span className="font-body text-gold text-xs tracking-[0.35em] uppercase">
              Producto estrella
            </span>
          </motion.div>

          {/* Título principal */}
          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.85,
              delay: 0.35,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="font-display text-[2.4rem] sm:text-5xl lg:text-6xl xl:text-7xl text-ivory leading-[1.1] tracking-tight mb-5 lg:mb-6"
          >
            Tu cabello merece más que{" "}
            <br className="hidden lg:block" />
            <em className="not-italic text-gold">un día</em> de frescura
          </motion.h1>

          {/* Subtítulo */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.58, ease: "easeOut" }}
            className="font-body text-base lg:text-lg text-ivory/75 leading-relaxed mb-10 max-w-lg"
          >
            La mascarilla que reinicia tu cuero cabelludo y{" "}
            <span className="text-ivory font-medium">
              rompe el ciclo del lavado diario.
            </span>
          </motion.p>

          {/* Botón CTA principal */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.78, ease: "easeOut" }}
            className="flex flex-col items-start gap-4"
          >
            <motion.button
              onClick={handleScrollToPricing}
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
              whileTap={{ scale: 0.97 }}
              aria-label="Ir a comprar el tratamiento"
              className="font-body font-bold text-sm text-ivory tracking-[0.2em] uppercase flex items-center gap-3 bg-terracota hover:bg-terracota-dark px-8 py-4 rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracota focus-visible:ring-offset-2 focus-visible:ring-offset-black/50"
              style={{ boxShadow: "0 8px 32px rgba(196,87,47,0.45)" }}
            >
              Quiero mi Mascarilla
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </motion.button>

            <button
              onClick={handleScrollToNext}
              tabIndex={0}
              aria-label="Ver más sobre el producto"
              className="font-body text-sm text-ivory/60 hover:text-ivory transition-colors duration-200 tracking-[0.15em] uppercase flex items-center gap-2"
            >
              Conocer el producto
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Indicador de scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.3 }}
        className="relative z-10 flex flex-col items-center gap-2 pb-8"
        aria-hidden="true"
      >
        <span className="font-body text-[10px] text-ivory/50 tracking-[0.3em] uppercase">
          Descubrir
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-ivory/30 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-ivory/40" />
        </motion.div>
      </motion.div>
    </section>
  );
};
