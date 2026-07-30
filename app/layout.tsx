import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Script from "next/script"; // Importamos el componente Script
import { SITE_URL } from "@/app/lib/site";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const META_PIXEL_ID = "666994759187050";
// El pixel real solo debe recibir tráfico de producción. NODE_ENV es "production"
// únicamente en `next build` (lo que corre Vercel al desplegar); en `next dev`
// (incluyendo las pruebas de Playwright contra localhost) queda deshabilitado.
const PIXEL_ENABLED = process.env.NODE_ENV === "production";

const SITE_TITLE = "Radiance Beauty — Mascarilla Exfoliante Capilar";
const SITE_DESCRIPTION =
  "Purificación profunda con Semillas de Macadamia, Proteína de Trigo y Aceite de Jojoba. Rompe el ciclo del lavado diario.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
    siteName: "Radiance Beauty",
    locale: "es_CO",
    type: "website",
    images: [
      {
        url: "/radiancelife-opt.jpg",
        width: 1080,
        height: 1080,
        alt: SITE_TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/radiancelife-opt.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        {/* Adelanta la descarga del fondo del Hero (primer elemento visual de la página) */}
        <link rel="preload" as="image" href="/radiancelife-opt.jpg" fetchPriority="high" />

        {/* Adelanta la conexión con el dominio del Píxel de Meta */}
        {PIXEL_ENABLED && (
          <>
            <link rel="preconnect" href="https://connect.facebook.net" crossOrigin="anonymous" />
            <link rel="dns-prefetch" href="https://connect.facebook.net" />
          </>
        )}

        {/* Aquí insertamos el Píxel de Meta correctamente. Solo en producción: en
            local/dev (npm run dev, pruebas de Playwright, etc.) NO debe disparar
            hacia el pixel real — contaminaba los datos del embudo con tráfico de prueba. */}
        {PIXEL_ENABLED && (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${META_PIXEL_ID}');
              fbq('track', 'PageView');
            `}
          </Script>
        )}
      </head>
      <body className="min-h-full flex flex-col bg-ivory">
        {children}
        {/* En caso de que Meta necesite validar el Pixel sin JS (solo producción, ver arriba) */}
        {PIXEL_ENABLED && (
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
              alt="pixel"
            />
          </noscript>
        )}
      </body>
    </html>
  );
}