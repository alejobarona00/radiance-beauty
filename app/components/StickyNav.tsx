"use client";

import { useState, useEffect } from "react";

export const StickyNav = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.85);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
      aria-hidden={!visible}
    >
      <div className="bg-charcoal/95 backdrop-blur-md border-b border-gold/15 px-5 sm:px-8 py-3 flex items-center justify-between gap-4">
        {/* Logo + marca */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <img
            src="/logo.png"
            alt="Radiance Beauty logo"
            className="w-8 h-8 rounded-full object-cover flex-shrink-0"
          />
          <span className="font-display text-ivory text-xs tracking-[0.18em] uppercase hidden sm:block">
            Radiance Beauty
          </span>
        </div>

        {/* Precio discreto */}
        <span className="font-body text-warm-gray text-xs tracking-wide hidden md:block">
          Mascarilla Exfoliante Capilar
        </span>

        {/* Botón de compra */}
        <a
          href="https://mpago.li/1ZF4qDN"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Comprar la mascarilla por $59.900 COP"
          className="flex-shrink-0 font-body text-xs font-semibold tracking-[0.12em] uppercase bg-terracota hover:bg-terracota-dark text-ivory px-5 py-2.5 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-terracota/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracota focus-visible:ring-offset-1 focus-visible:ring-offset-charcoal"
        >
          Comprar · $59.900
        </a>
      </div>
    </div>
  );
};
