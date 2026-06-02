import { StickyNav } from "@/app/components/StickyNav";
import { HeroSection } from "@/app/components/HeroSection";
import { PainSection } from "@/app/components/PainSection";
import { RevealSection } from "@/app/components/RevealSection";
import { ProductSection } from "@/app/components/ProductSection";
import { IngredientsSection } from "@/app/components/IngredientsSection";
import { RitualSection } from "@/app/components/RitualSection";
import { TestimonialsSection } from "@/app/components/TestimonialsSection";
import { BeforeAfterSection } from "@/app/components/BeforeAfterSection";
import { FAQSection } from "@/app/components/FAQSection";
import { CtaSection } from "@/app/components/CtaSection";
import { Footer } from "@/app/components/Footer";

export default function Home() {
  return (
    <>
      {/* Barra de compra fija — aparece al hacer scroll */}
      <StickyNav />

      <main>
        {/* 1. HOOK — Captura la atención */}
        <HeroSection />

        {/* 2. DOLOR — Identificación con el problema */}
        <PainSection />

        {/* 3. REVELACIÓN — El insight que cambia la perspectiva */}
        <RevealSection />

        {/* 4. SOLUCIÓN — Presentación del producto */}
        <ProductSection />

        {/* 5. PRUEBA — Los ingredientes y su propósito */}
        <IngredientsSection />

        {/* 6. USO — El ritual de aplicación */}
        <RitualSection />

        {/* 7. CONFIANZA — Testimonios reales */}
        <TestimonialsSection />

        {/* 8. EVIDENCIA VISUAL — Antes y después */}
        <BeforeAfterSection />

        {/* 9. OBJECIONES — FAQ que cierra dudas */}
        <FAQSection />

        {/* 10. CIERRE — CTA final de compra */}
        <CtaSection />
      </main>

      {/* Footer con Instagram y legales */}
      <Footer />
    </>
  );
}
