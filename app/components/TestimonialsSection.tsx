"use client";

import { motion } from "framer-motion";

interface Testimonial {
  quote: string;
  author: string;
  detail: string;
  week: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "Llevaba años buscando algo que controlara mi raíz sin secar mis rizos. Esta mascarilla lo logró en la primera semana. Antes me lavaba el cabello día por medio; ahora llego fácil al cuarto día sin sentir que lo necesito. Es el único tratamiento que ha entendido mi tipo de cabello.",
    author: "Valentina M.",
    detail: "Cabello rizado · Cuero cabelludo graso",
    week: "Desde la semana 1",
  },
  {
    quote:
      "La picazón constante que tenía desapareció después de la segunda aplicación. No puedo creer que algo tan elegante funcione tan bien. Mi cuero cabelludo por fin respira.",
    author: "Sofía R.",
    detail: "Cabello liso · Picazón crónica",
    week: "Semana 2",
  },
  {
    quote:
      "Tenía el dilema clásico: raíz brillosa y puntas como paja. Desde la primera semana mis puntas absorbieron la hidratación y mi raíz dejó de verse grasosa. Por fin un producto que resuelve los dos extremos.",
    author: "Mariana L.",
    detail: "Cabello teñido · Raíz grasa / puntas secas",
    week: "Semana 1",
  },
];

const StarRating = () => (
  <div className="flex gap-1" aria-label="Calificación 5 de 5 estrellas">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        className="w-3.5 h-3.5 text-gold fill-gold"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" />
      </svg>
    ))}
  </div>
);

export const TestimonialsSection = () => {
  return (
    <section
      className="bg-charcoal py-28 px-8 lg:px-16"
      aria-label="Testimonios de clientas"
    >
      <div className="max-w-5xl mx-auto">

        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-10 bg-gold" />
            <span className="font-body text-gold text-xs tracking-[0.35em] uppercase">
              Lo que dicen ellas
            </span>
            <div className="h-px w-10 bg-gold" />
          </div>
          <h2 className="font-display text-4xl lg:text-5xl text-ivory leading-tight">
            El cambio que{" "}
            <em className="not-italic text-gold">no vuelve atrás.</em>
          </h2>
        </motion.div>

        {/* Tarjeta destacada — testimonial principal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="relative mb-5 rounded-2xl border border-gold/25 bg-white/[0.04] p-10 lg:p-12 overflow-hidden"
        >
          {/* Comilla decorativa */}
          <span
            className="absolute -top-2 left-8 font-display text-[9rem] leading-none text-gold/8 select-none pointer-events-none"
            aria-hidden="true"
          >
            &#8220;
          </span>

          <div className="relative flex flex-col lg:flex-row lg:items-end lg:gap-12">
            {/* Texto */}
            <div className="flex-1">
              <StarRating />
              <p className="font-display italic text-ivory text-xl lg:text-2xl leading-relaxed mt-5 mb-7">
                &#8220;{testimonials[0].quote}&#8221;
              </p>
            </div>

            {/* Autoría con foto */}
            <div className="flex flex-col gap-3 flex-shrink-0">
              <div className="h-px w-full lg:w-px lg:h-16 bg-gold/20" aria-hidden="true" />

              <div className="flex items-center gap-4">
                {/* Foto de la clienta */}
                <div className="w-16 h-16 rounded-full overflow-hidden border border-gold/40 bg-warm-stone/20 flex-shrink-0">
                  <img
                    src="/retratomujer.png"
                    alt="Foto de Valentina M."
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Nombre, detalle y badge */}
                <div>
                  <span className="font-body text-ivory text-sm font-medium block mb-0.5">
                    {testimonials[0].author}
                  </span>
                  <span className="font-body text-warm-gray text-xs block mb-3">
                    {testimonials[0].detail}
                  </span>
                  <span className="font-body text-gold text-[10px] tracking-[0.2em] uppercase border border-gold/30 px-3 py-1 rounded-full">
                    {testimonials[0].week}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Dos tarjetas de apoyo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {testimonials.slice(1).map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.65, delay: i * 0.15, ease: "easeOut" }}
              className="relative rounded-2xl border border-gold/20 bg-white/[0.03] hover:bg-white/[0.06] hover:border-gold/40 transition-all duration-300 p-8 overflow-hidden group"
            >
              {/* Comilla decorativa */}
              <span
                className="absolute top-4 right-6 font-display text-6xl leading-none text-gold/8 select-none pointer-events-none group-hover:text-gold/14 transition-colors duration-300"
                aria-hidden="true"
              >
                &#8220;
              </span>

              <div className="relative">
                <StarRating />
                <p className="font-display italic text-ivory text-base lg:text-lg leading-relaxed mt-4 mb-6">
                  &#8220;{t.quote}&#8221;
                </p>
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <span className="font-body text-ivory text-sm font-medium block mb-0.5">
                      {t.author}
                    </span>
                    <span className="font-body text-warm-gray text-xs">
                      {t.detail}
                    </span>
                  </div>
                  <span className="font-body text-gold text-[10px] tracking-[0.2em] uppercase border border-gold/30 px-3 py-1 rounded-full flex-shrink-0">
                    {t.week}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Nota de confianza */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center font-body text-warm-gray/50 text-xs tracking-widest uppercase mt-12"
        >
          Reseñas verificadas de clientas reales
        </motion.p>

      </div>
    </section>
  );
};
