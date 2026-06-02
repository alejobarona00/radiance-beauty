"use client";

import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";

export const BeforeAfterSection = () => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateSlider = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pos = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(pos);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    updateSlider(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    updateSlider(e.touches[0].clientX);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") setSliderPos((p) => Math.max(0, p - 3));
    if (e.key === "ArrowRight") setSliderPos((p) => Math.min(100, p + 3));
  };

  return (
    <section
      className="bg-warm-stone py-16 px-5 sm:px-8 lg:px-16 lg:py-28"
      aria-label="Comparativa antes y después del tratamiento"
    >
      <div className="max-w-4xl mx-auto">

        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="text-center mb-8 lg:mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-10 bg-gold" />
            <span className="font-body text-gold text-xs tracking-[0.35em] uppercase">
              Resultados reales
            </span>
            <div className="h-px w-10 bg-gold" />
          </div>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-5xl text-charcoal leading-tight mb-4">
            Transformación real:{" "}
            <em className="not-italic text-gold block sm:inline">
              Purificación y Salud Capilar
            </em>
          </h2>
          <p className="font-body text-warm-gray text-sm tracking-[0.25em] uppercase">
            Desliza para ver la diferencia
          </p>
        </motion.div>

        {/* Contenedor del slider */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div
            ref={containerRef}
            className="relative overflow-hidden rounded-2xl shadow-2xl aspect-[4/3] cursor-ew-resize select-none"
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="slider"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(sliderPos)}
            aria-label="Comparador antes y después — usa las flechas del teclado para mover"
          >
            {/* Imagen ANTES — fondo */}
            <img
              src="/antes.png"
              alt="Cuero cabelludo antes del tratamiento"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              draggable={false}
            />

            {/* Imagen DESPUÉS — encima, revelada por clip-path */}
            <img
              src="/despues.png"
              alt="Cuero cabelludo después del tratamiento"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
              draggable={false}
            />

            {/* Línea divisora vertical */}
            <div
              className="absolute top-0 bottom-0 w-px bg-white/90"
              style={{
                left: `${sliderPos}%`,
                transform: "translateX(-50%)",
                boxShadow: "0 0 16px rgba(0,0,0,0.35)",
              }}
              aria-hidden="true"
            >
              {/* Handle circular */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white flex items-center justify-center gap-0.5"
                style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.25)" }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#6B6359"
                  strokeWidth={2.5}
                  className="w-3 h-3"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#6B6359"
                  strokeWidth={2.5}
                  className="w-3 h-3"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* Etiqueta ANTES */}
            <div className="absolute bottom-5 left-5 font-body text-white text-[10px] font-semibold tracking-[0.25em] uppercase px-3 py-1.5 rounded-full"
              style={{ background: "rgba(0,0,0,0.45)" }}
              aria-hidden="true"
            >
              Antes
            </div>

            {/* Etiqueta DESPUÉS */}
            <div className="absolute bottom-5 right-5 font-body text-white text-[10px] font-semibold tracking-[0.25em] uppercase px-3 py-1.5 rounded-full"
              style={{ background: "rgba(200,169,110,0.75)" }}
              aria-hidden="true"
            >
              Después
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
