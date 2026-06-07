'use client';
import { useEffect } from 'react';

export default function Gracias() {
  useEffect(() => {
    // Esto dispara la señal a Meta de que hubo una compra
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
      <p style={{ fontSize: '1.2rem', color: '#555' }}>
        Hemos recibido tus datos correctamente. En breve nos comunicaremos contigo para confirmar el envío.
      </p>
      <a href="/" style={{ marginTop: '2rem', textDecoration: 'underline', color: 'blue' }}>
        Volver al inicio
      </a>
    </main>
  );
}