import { StickyNav } from "@/app/components/StickyNav";
import { StickyBuyButton } from "@/app/components/StickyBuyButton";
import { WhatsAppButton } from "@/app/components/WhatsAppButton";
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
import { PricingProvider } from "@/app/components/PricingProvider";
import { Footer } from "@/app/components/Footer";

export default function Home() {
  return (
    <PricingProvider>
      <ViewContentPixel />
      <PaymentFailedBanner />
      <StickyNav />

      <main>
        {/* 1. HOOK */}
        <HeroSection />

        {/* 1.5 COMPRA — arriba del todo: precio, paquete y CTA a un scroll del hero */}
        <PricingSection sectionId="precio-top" showReviewsSummary />

        {/* 2. BENEFICIOS RÁPIDOS */}
        <QuickBenefits />

        {/* 3. DOLOR */}
        <PainSection />

        {/* 4. REVELACIÓN */}
        <RevealSection />

        {/* 5. SOLUCIÓN */}
        <ProductSection />

        {/* 6. PRUEBA */}
        <IngredientsSection />

        {/* 7. USO */}
        <RitualSection />

        {/* 8. CONFIANZA */}
        <TestimonialsSection />

        {/* 9. EVIDENCIA VISUAL */}
        <BeforeAfterSection />

        {/* 10. OBJECIONES */}
        <FAQSection />

        {/* 11. CIERRE — texto + imagen del producto */}
        <CtaSection />

        {/* 12. COMPRA — se repite al final para quien lee todo el contenido */}
        <PricingSection sectionId="precio-bottom" />
      </main>

      <Footer />
      <StickyBuyButton />
      <WhatsAppButton />
    </PricingProvider>
  );
}
