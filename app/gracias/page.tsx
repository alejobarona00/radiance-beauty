'use client';
import { useEffect, Suspense } from 'react';

function GraciasContent() {
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
      
      <div style={{ background: '#f9f9f9', padding: '2rem', borderRadius: '15px', border: '1px solid #ddd', maxWidth: '600px' }}>
        <p style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>
          Hemos recibido tu solicitud correctamente. 
        </p>
        <p style={{ fontSize: '1.1rem', color: '#555', marginBottom: '1.5rem' }}>
          Si elegiste <b>pago online</b>, asegúrate de haber finalizado el proceso en Mercado Pago. Si elegiste <b>pago contraentrega</b>, nos comunicaremos contigo vía WhatsApp en breve para coordinar el envío.
        </p>
        <a href="https://mpago.li/1ZF4qDN" target="_blank" style={{ display: 'inline-block', padding: '1rem 2rem', background: '#00a8e8', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>
          ¿Necesitas pagar? Haz clic aquí
        </a>
      </div>

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