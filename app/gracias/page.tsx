'use client';
import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function GraciasContent() {
  const searchParams = useSearchParams();
  const metodo = searchParams.get('metodo'); // Detecta si es 'online' o 'contraentrega'

  useEffect(() => {
    // Esto dispara la señal de "Compra" a Meta al cargar la página
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Purchase', {
        value: 59900,
        currency: 'COP',
        content_name: 'Mascarilla Exfoliante Capilar',
      });
    }
  }, []);

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>¡Gracias por tu pedido! 🎉</h1>
      
      {metodo === 'online' ? (
        <div style={{ background: '#f0f9ff', padding: '2rem', borderRadius: '15px', border: '1px solid #0070f3' }}>
          <p style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>Tu pedido ha sido registrado. <b>Ahora realiza el pago seguro:</b></p>
          <a href="https://mpago.li/1ZF4qDN" target="_blank" style={{ display: 'inline-block', padding: '1.2rem 2.5rem', background: '#0070f3', color: 'white', borderRadius: '8px', textDecoration: 'none', fontSize: '1.1rem', fontWeight: 'bold' }}>
            Pagar con Mercado Pago
          </a>
        </div>
      ) : (
        <p style={{ fontSize: '1.2rem', color: '#555', maxWidth: '600px' }}>
          Hemos recibido tu solicitud bajo la modalidad de <b>pago contraentrega</b>. Nuestro equipo te contactará pronto por WhatsApp para confirmar los detalles de tu envío.
        </p>
      )}

      <a href="/" style={{ marginTop: '3rem', color: '#666', textDecoration: 'underline' }}>Volver al inicio</a>
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