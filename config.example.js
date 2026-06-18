// Copia este archivo como config.js si vas a conectar una base remota.
// No pongas claves secretas aqui. GitHub Pages expone todo el JavaScript al navegador.

export const remoteDatabaseConfig = {
  provider: "local", // "local", "firebase" o "supabase"
  firebase: {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
  },
  supabase: {
    url: "",
    anonKey: "",
  },
};

// Para pagos sin backend en GitHub Pages, usa un enlace de pago del proveedor.
// Ejemplos: Stripe Payment Link, Mercado Pago Link de pago, PayPal.me o WhatsApp Business.
export const paymentConfig = {
  provider: "link", // "link" o "whatsapp"
  paymentUrl: "", // Ej: https://buy.stripe.com/xxxx o https://mpago.la/xxxx
  whatsappNumber: "", // Ej: 593999999999, sin +
  currency: "USD",
};
