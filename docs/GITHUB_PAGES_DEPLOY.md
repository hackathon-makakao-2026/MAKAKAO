# Despliegue en GitHub Pages

## Estado actual

El proyecto esta listo para GitHub Pages porque es una web estatica:

- `index.html`
- `styles.css`
- `script.js`
- `data-store.js`
- `assets/`
- `.nojekyll`

## Opcion 1: GitHub Pages desde la interfaz web

1. Entra al repositorio en GitHub.
2. Sube o reemplaza los archivos de esta carpeta.
3. Ve a `Settings` > `Pages`.
4. En `Build and deployment`, elige:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/root`
5. Guarda.
6. GitHub Pages publicara la web en una URL parecida a:
   `https://hackathon-makakao-2026.github.io/MAKAKAO/`

## Opcion 2: con Git local

En esta maquina no esta disponible el comando `git`, por eso no se pudo hacer push automaticamente desde Codex.

Cuando tengas Git instalado:

```bash
git clone https://github.com/hackathon-makakao-2026/MAKAKAO.git
cd MAKAKAO
copy /actual/files .
git add .
git commit -m "Improve Makakao web app and architecture"
git push origin main
```

Despues activa Pages desde `Settings` > `Pages`.

## Base de datos en GitHub Pages

GitHub Pages no permite ejecutar un backend propio. La app ya incluye una base local funcional con IndexedDB, pero para datos compartidos entre usuarios se necesita un servicio externo:

- Firebase Firestore
- Supabase
- Appwrite Cloud

## Recomendacion

Para hackathon, usar:

1. GitHub Pages para frontend.
2. Firebase Firestore para escaneos, chat y carrito.
3. Reglas de seguridad que limiten escritura anonima abusiva.
4. Un backend serverless si se integran APIs de IA con claves secretas.
