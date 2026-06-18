# Configurar base de datos remota

La app ya guarda datos localmente con IndexedDB. Para datos compartidos entre usuarios, usa Supabase o Firebase.

## Opcion recomendada: Supabase

Supabase funciona muy bien para GitHub Pages porque puedes usar una `publishable key`/`anon key` desde el navegador con politicas RLS.

### 1. Crear proyecto

1. Entra a https://supabase.com.
2. Crea un proyecto.
3. Ve a `Project Settings` > `API`.
4. Copia:
   - Project URL
   - Publishable key o anon public key

No uses `service_role` en frontend.

### 2. Crear tablas

En `SQL Editor`, ejecuta:

```sql
create table if not exists scans (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  detected_type text,
  confidence numeric,
  hydration numeric,
  sensitivity numeric,
  balance numeric,
  pores numeric,
  texture numeric,
  shine numeric,
  uniformity numeric,
  preferences jsonb
);

create table if not exists chat_messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  question text not null,
  answer text not null
);

create table if not exists formulas (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  base text,
  name text,
  intensity integer,
  aroma integer,
  softness integer
);

create table if not exists cart_items (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  product_name text,
  price numeric,
  quantity integer
);
```

### 3. Activar RLS con politicas de demo

Para hackathon puedes permitir inserts anonimos controlados:

```sql
alter table scans enable row level security;
alter table chat_messages enable row level security;
alter table formulas enable row level security;
alter table cart_items enable row level security;

create policy "anon insert scans" on scans for insert to anon with check (true);
create policy "anon read scans" on scans for select to anon using (true);

create policy "anon insert chat" on chat_messages for insert to anon with check (true);
create policy "anon read chat" on chat_messages for select to anon using (true);

create policy "anon insert formulas" on formulas for insert to anon with check (true);
create policy "anon read formulas" on formulas for select to anon using (true);

create policy "anon insert cart" on cart_items for insert to anon with check (true);
create policy "anon read cart" on cart_items for select to anon using (true);
```

Para produccion se debe agregar autenticacion y filtrar por `user_id`.

### 4. Configurar la web

1. Copia `config.example.js` como `config.js`.
2. Cambia:

```js
export const remoteDatabaseConfig = {
  provider: "supabase",
  supabase: {
    url: "https://TU-PROYECTO.supabase.co",
    anonKey: "TU_PUBLISHABLE_O_ANON_KEY",
  },
};
```

### 5. Integracion pendiente

La app ya tiene capa local. Para activar escritura remota, agrega `@supabase/supabase-js` por CDN ESM en `data-store.js` o crea `remote-store.js`.

## Alternativa: Firebase Firestore

### 1. Crear proyecto

1. Entra a https://firebase.google.com.
2. Crea un proyecto.
3. Agrega una app Web.
4. Copia el objeto `firebaseConfig`.
5. Activa Firestore Database.

### 2. Reglas de demo

Para pruebas temporales:

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

No uses esas reglas en produccion.

### 3. Configurar la web

```js
export const remoteDatabaseConfig = {
  provider: "firebase",
  firebase: {
    apiKey: "TU_API_KEY",
    authDomain: "tu-proyecto.firebaseapp.com",
    projectId: "tu-proyecto",
    storageBucket: "tu-proyecto.appspot.com",
    messagingSenderId: "000000000000",
    appId: "TU_APP_ID",
  },
};
```

En esta app, pega esos datos en `config.js`. Cuando `provider` sea `"firebase"`, `data-store.js` guarda y lee desde Firestore. Si Firebase falla por reglas o conexion, IndexedDB queda como respaldo local.

### 4. Colecciones usadas por MAKAKAO

- `scans`
- `chat`
- `cart`
- `formulas`
- `activity`
- `orders`

### 5. Reglas minimas para demo

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{collection}/{document} {
      allow read, write: if collection in [
        'scans', 'chat', 'cart', 'formulas', 'activity', 'orders'
      ];
    }
  }
}
```

No uses estas reglas en produccion sin autenticacion.

## Configurar boton de pago

GitHub Pages no puede crear pagos seguros por si solo porque no tiene backend. Para demo funcional, usa un link de pago de Stripe, Mercado Pago, PayPal o WhatsApp.

En `config.js` con link de pago:

```js
export const paymentConfig = {
  provider: "link",
  paymentUrl: "https://TU-LINK-DE-PAGO",
  whatsappNumber: "",
  currency: "USD",
};
```

Con WhatsApp en `config.js`:

```js
export const paymentConfig = {
  provider: "whatsapp",
  paymentUrl: "",
  whatsappNumber: "593999999999",
  currency: "USD",
};
```

Al presionar `Pagar pedido`, la app crea un pedido en `orders` y redirige al link configurado.

## Recomendacion para MAKAKAO

Usa Supabase si quieres tablas claras para escaneos, chat, formulas y carrito.
Usa Firebase si quieres crecer rapido con autenticacion Google y analitica del ecosistema Google.
