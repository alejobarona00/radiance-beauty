import { StickyNav } from "@/app/components/StickyNav";
import { StickyBuyButton } from "@/app/components/StickyBuyButton";
import { ViewContentPixel } from "@/app/components/ViewContentPixel";
import { PaymentFailedBanner } from "@/app/components/PaymentFailedBanner";
import { HeroSection } from "@/app/components/HeroSection";
import { QuickBenefits } from "@/app/components/QuickBenefits";
import { PainSection } from "@/app/components/PainSection";
import { RevealSection } from "@/app/components/RevealSection";
import { ProductSection } from "@/app/components/ProductSection";
import { IngredientsSection } from "@/app/components/IngredientsSection";
import { RitualSection } from "@/app/components/RitualSection";
import { TestimonialsSection } from "@/app/components/TestimonialsSection";
import { BeforeAfterSection } from "@/app/components/BeforeAfterSection";
import { FAQSection } from "@/app/components/FAQSection";
import { CtaSection } from "@/app/components/CtaSection";
import { PricingSection } from "@/app/components/PricingSection";
import { Footer } from "@/app/components/Footer";

export default function Home() {
  return (
    <>
      <ViewContentPixel />
      <PaymentFailedBanner />
      <StickyNav />

      <main>
        {/* 1. HOOK */}
        <HeroSection />

        {/* 1.5 BENEFICIOS RÁPIDOS */}
        <QuickBenefits />

        {/* 2. DOLOR */}
        <PainSection />

        {/* 3. REVELACIÓN */}
        <RevealSection />

        {/* 4. SOLUCIÓN */}
        <ProductSection />

        {/* 5. PRUEBA */}
        <IngredientsSection />

        {/* 6. USO */}
        <RitualSection />

        {/* 7. CONFIANZA */}
        <TestimonialsSection />

        {/* 8. EVIDENCIA VISUAL */}
        <BeforeAfterSection />

        {/* 9. OBJECIONES */}
        <FAQSection />

        {/* 10. CIERRE — texto + imagen del producto */}
        <CtaSection />

        {/* 11. COMPRA — selector de unidades + modal (único punto de venta) */}
        <PricingSection />
      </main>

      <Footer />
      <StickyBuyButton />
    </>
  );
}
