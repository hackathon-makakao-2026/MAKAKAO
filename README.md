# MAKAKAO

MAKAKAO es una experiencia web de skincare personalizado con inteligencia artificial, productos naturales y cacao ecuatoriano.

La propuesta combina bienestar, sostenibilidad y tecnologia para ayudar a las personas a entender mejor su piel, personalizar rutinas y explorar productos naturales.

## Funcionalidades

- Scanner facial con camara o carga de foto.
- Analisis local de brillo, textura, poros visibles, sensibilidad, balance e hidratacion estimada.
- Recomendaciones dinamicas de rutina.
- Laboratorio digital para formulas personalizadas.
- Tienda demo con carrito.
- Chatbot contextual sobre piel, productos y posibles reacciones.
- Historial persistente en IndexedDB.
- Preparado para GitHub Pages.

## Estructura

```text
.
├── index.html
├── styles.css
├── script.js
├── data-store.js
├── config.example.js
├── assets/
├── docs/
│   ├── ARCHITECTURE.md
│   └── GITHUB_PAGES_DEPLOY.md
└── server.cjs
```

## Ejecucion local

```bash
node server.cjs
```

Luego abre:

```text
http://127.0.0.1:4173/
```

## Base de datos

La app incluye una base local funcional:

- IndexedDB como almacenamiento principal.
- localStorage como fallback.

Guarda:

- resultados de scanner
- interacciones del chat
- carrito
- formulas personalizadas
- historial de actividad

Para una base remota compartida se recomienda Firebase Firestore o Supabase. Ver `docs/ARCHITECTURE.md`.

## Despliegue

El proyecto puede desplegarse en GitHub Pages desde la raiz del repositorio. Ver:

```text
docs/GITHUB_PAGES_DEPLOY.md
```

## Nota sobre el scanner

El scanner actual es un MVP funcional de analisis visual local. Calcula metricas a partir de pixeles de una foto o camara, pero no reemplaza un diagnostico dermatologico ni un modelo medico entrenado.

Para analisis profundo real de piel se recomienda integrar una API de vision o un modelo especializado mediante backend seguro.
