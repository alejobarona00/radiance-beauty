import { NextRequest, NextResponse } from "next/server";
import { ANTICIPADO_PRICE_BY_UNIDADES, type OptionKey } from "@/app/lib/pricing";
import { SITE_URL } from "@/app/lib/site";

const MP_PREFERENCE_URL = "https://api.mercadopago.com/checkout/preferences";

const isUnidades = (v: unknown): v is 1 | 2 => v === 1 || v === 2;

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Cuerpo de la solicitud inválido." }, { status: 400 });
  }

  const unidades = (body as { unidades?: unknown } | null)?.unidades;
  if (!isUnidades(unidades)) {
    return NextResponse.json({ error: "unidades debe ser 1 o 2." }, { status: 400 });
  }

  // El precio SIEMPRE se deriva en el servidor a partir de "unidades" — nunca
  // se confía en un monto enviado por el cliente. Este endpoint solo lo usa la
  // rama "anticipado", así que cobra el precio YA con el 5% de descuento
  // (contraentrega no pasa por aquí y sigue cobrando el precio de lista).
  const optionKey: OptionKey = String(unidades) as OptionKey;
  const unitPrice = ANTICIPADO_PRICE_BY_UNIDADES[optionKey];

  const accessToken = process.env.MP_ACCESS_TOKEN;
  if (!accessToken) {
    console.error("MP_ACCESS_TOKEN no está configurado en el entorno del servidor.");
    return NextResponse.json(
      { error: "El pago en línea no está disponible en este momento." },
      { status: 500 }
    );
  }

  const pixelId = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

  const preferenceBody = {
    items: [
      {
        title: `Mascarilla Exfoliante Capilar - Radiance Beauty (${unidades} unidad${unidades === 2 ? "es" : ""})`,
        quantity: 1,
        unit_price: unitPrice,
        currency_id: "COP",
      },
    ],
    back_urls: {
      success: `${SITE_URL}/gracias?metodo=anticipado&unidades=${unidades}`,
      pending: `${SITE_URL}/gracias?estado=pendiente`,
      failure: `${SITE_URL}/?pago=fallido`,
    },
    auto_return: "approved",
    // Deja que Mercado Pago dispare Purchase al pixel de Meta cuando el pago
    // se apruebe (servidor a servidor) — evita el doble conteo del front.
    ...(pixelId
      ? {
          tracks: [
            {
              type: "facebook_ad",
              values: { pixel_id: pixelId },
            },
          ],
        }
      : {}),
  };

  let mpResponse: Response;
  try {
    mpResponse = await fetch(MP_PREFERENCE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(preferenceBody),
    });
  } catch (err) {
    console.error("Error de red creando la preferencia de Mercado Pago:", err);
    return NextResponse.json(
      { error: "No pudimos conectar con Mercado Pago. Intenta de nuevo." },
      { status: 502 }
    );
  }

  if (!mpResponse.ok) {
    const errorBody = await mpResponse.text().catch(() => "");
    console.error("Mercado Pago rechazó la solicitud:", mpResponse.status, errorBody);
    return NextResponse.json(
      { error: "Mercado Pago no pudo procesar la solicitud." },
      { status: 502 }
    );
  }

  const data = (await mpResponse.json()) as { init_point?: string };
  if (!data.init_point) {
    console.error("La respuesta de Mercado Pago no incluyó init_point.");
    return NextResponse.json(
      { error: "Respuesta inesperada de Mercado Pago." },
      { status: 502 }
    );
  }

  return NextResponse.json({ init_point: data.init_point });
}
