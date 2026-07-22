'use client';
import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { fbq } from '@/app/lib/fbq';
import { PRICE_BY_UNIDADES, PAYMENT_URLS, type OptionKey } from '@/app/lib/pricing';

const isOptionKey = (v: string | null): v is OptionKey => v === '1' || v === '2';

function GraciasContent() {
  const searchParams = useSearchParams();
  const unidadesParam = searchParams.get('unidades');
  const unidades = isOptionKey(unidadesParam) ? unidadesParam : null;
  const paymentUrl = PAYMENT_URLS[unidades ?? '1'];

  useEffect(() => {
    const metodo = searchParams.get('metodo');
    const value = unidades ? PRICE_BY_UNIDADES[unidades] : undefined;

    // Solo dispara Purchase si llegamos desde el flujo de pago con params válidos,
    // no en visitas directas a /gracias.
    if (metodo && value !== undefined) {
      fbq('track', 'Purchase', {
        value,
        currency: 'COP',
        content_name: 'Mascarilla Exfoliante Capilar',
      });
    }
  }, [searchParams, unidades]);

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>¡Gracias por tu pedido! 🎉</h1>
      
      <div style={{ background: '#f9f9f9', padding: '2rem', borderRadius: '15px', border: '1px solid #ddd', maxWidth: '600px' }}>
        <p style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>
          Hemos recibido tu solicitud correctamente. 
        </p>
        <p style={{ fontSize: '1.1rem', color: '#555', marginBottom: '1.5rem' }}>
          Si elegiste <b>pago online</b>, asegúrate de haber finalizado el proceso en Mercado Pago. Si elegiste <b>pago contraentrega</b>, nos comunicaremos contigo vía WhatsApp en breve para coordinar el envío.
        </p>
        <a href={paymentUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', padding: '1rem 2rem', background: '#00a8e8', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>
          ¿Necesitas pagar? Haz clic aquí
        </a>
      </div>

      <Link href="/" style={{ marginTop: '3rem', color: '#666', textDecoration: 'underline' }}>Volver al inicio</Link>
    </main>
  );
}

export default function Gracias() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <GraciasContent />
    </Suspense>
  );
}