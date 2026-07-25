'use client';
import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { fbq } from '@/app/lib/fbq';
import { PRICE_BY_UNIDADES, type OptionKey } from '@/app/lib/pricing';

const isOptionKey = (v: string | null): v is OptionKey => v === '1' || v === '2';

function GraciasContent() {
  const searchParams = useSearchParams();
  const unidadesParam = searchParams.get('unidades');
  const unidades = isOptionKey(unidadesParam) ? unidadesParam : null;
  const metodo = searchParams.get('metodo');
  // back_urls.pending de Mercado Pago (efectivo/Efecty, transferencias que no
  // se aprueban al instante) manda aquí con estado=pendiente, sin "metodo".
  const isPendiente = searchParams.get('estado') === 'pendiente';
  // No ofrecemos "¿aún necesitas pagar?" si el pago ya se aprobó (anticipado)
  // ni si está en proceso (pendiente) — evita inducir un segundo pago.
  const showPaymentLink = metodo !== 'anticipado' && !isPendiente;

  useEffect(() => {
    const value = unidades ? PRICE_BY_UNIDADES[unidades] : undefined;

    // "anticipado" ya no dispara Purchase aquí: con Checkout Pro, es Mercado Pago
    // quien lo dispara del lado del servidor (vía "tracks") al aprobar el pago.
    // Hacerlo también desde /gracias duplicaría el evento. Solo "contraentrega"
    // (que no pasa por Mercado Pago) lo dispara desde el navegador.
    if (metodo === 'contraentrega' && value !== undefined) {
      fbq('track', 'Purchase', {
        value,
        currency: 'COP',
        content_name: 'Mascarilla Exfoliante Capilar',
      });
    }
  }, [searchParams, unidades, metodo]);

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
        {isPendiente ? 'Tu pago está siendo procesado ⏳' : '¡Gracias por tu pedido! 🎉'}
      </h1>

      <div style={{ background: '#f9f9f9', padding: '2rem', borderRadius: '15px', border: '1px solid #ddd', maxWidth: '600px' }}>
        {isPendiente ? (
          <p style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>
            Tu pago está siendo procesado. Te avisaremos por WhatsApp en cuanto se confirme.
          </p>
        ) : (
          <>
            <p style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>
              Hemos recibido tu solicitud correctamente.
            </p>
            <p style={{ fontSize: '1.1rem', color: '#555', marginBottom: '1.5rem' }}>
              Si elegiste <b>pago online</b>, asegúrate de haber finalizado el proceso en Mercado Pago. Si elegiste <b>pago contraentrega</b>, nos comunicaremos contigo vía WhatsApp en breve para coordinar el envío.
            </p>
          </>
        )}
        {showPaymentLink && (
          <Link href="/#precio" style={{ display: 'inline-block', padding: '1rem 2rem', background: '#00a8e8', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>
            ¿Necesitas pagar? Haz clic aquí
          </Link>
        )}
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