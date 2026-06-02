export const Footer = () => {
  return (
    <footer
      className="bg-charcoal py-10 px-5 sm:px-8 lg:px-16"
      aria-label="Pie de página"
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-8 md:flex-row md:justify-between">

        {/* Logo y marca */}
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Radiance Beauty logo"
            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
          />
          <span className="font-display text-ivory text-sm tracking-[0.2em] uppercase">
            Radiance Beauty
          </span>
        </div>

        {/* Instagram */}
        <a
          href="https://www.instagram.com/radiancebeautycol"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Síguenos en Instagram @radiancebeautycol"
          className="flex items-center gap-2 font-body text-warm-gray/60 hover:text-gold text-xs tracking-wide transition-colors duration-200 group"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            className="w-4 h-4 group-hover:scale-110 transition-transform duration-200"
            aria-hidden="true"
          >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line
              x1="17.5"
              y1="6.5"
              x2="17.51"
              y2="6.5"
              strokeWidth={2}
              strokeLinecap="round"
            />
          </svg>
          @radiancebeautycol
        </a>

        {/* Links legales */}
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
          {[
            "Política de privacidad",
            "Términos y condiciones",
            "Política de devoluciones",
          ].map((link) => (
            <a
              key={link}
              href="#"
              className="font-body text-warm-gray/40 hover:text-warm-gray/70 text-xs transition-colors duration-200"
            >
              {link}
            </a>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <p className="font-body text-warm-gray/30 text-xs tracking-wide text-center mt-8">
        © {new Date().getFullYear()} Radiance Beauty. Todos los derechos
        reservados.
      </p>
    </footer>
  );
};
