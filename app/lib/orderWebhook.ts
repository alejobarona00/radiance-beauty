// Webhook de Google Sheets que dispara la notificación de "Nuevo Pedido".
// Compartido por PricingSection (contraentrega, notifica al enviar el
// formulario) y /gracias (anticipado, notifica solo si Mercado Pago
// confirmó el pago — ver PEDIDO_ANTICIPADO_STORAGE_KEY).
export const SHEETS_WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycbw8UurWxlDaKbow4QU-hqv5vE67tNLbqUMXqoCyTZi9p57Zgi5Bu-tVR5buBiweSWamWA/exec";

// Clave de sessionStorage donde PricingSection guarda los datos del pedido
// "anticipado" justo antes de redirigir a Mercado Pago. /gracias los lee (y
// borra) al volver, para notificar solo si el pago quedó aprobado.
export const PEDIDO_ANTICIPADO_STORAGE_KEY = "radiance_pedido_anticipado";
