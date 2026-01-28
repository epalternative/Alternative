# Sanity Studio — App aparte

Este es el **Sanity Studio** del blog de Alternative. Es una **aplicación separada** del sitio Next.js: tiene su propio `package.json`, sus propias dependencias (incluido React 19) y no está embebida en la web.

## Por qué está aparte

- El sitio Next.js usa **React 18** y no lo queremos cambiar.
- Sanity Studio v3+ usa **React 19**. Embeberlo en Next.js con React 18 daba pantalla en blanco.
- Mantener el Studio como app aparte evita tocar la estructura ni las dependencias del sitio.

## Cómo usarlo

1. Entra en esta carpeta: `cd studio-app`
2. Instala dependencias: `npm install`
3. Crea `.env` con el mismo `projectId` y `dataset` que el sitio (copia de `.env.example`).
4. Arranca el Studio: `npm run dev`
5. Abre en el navegador: **http://localhost:3333**

El contenido que edites aquí es el mismo que consume el sitio Next.js (mismo proyecto y dataset en Sanity).

## Mover fuera del repo

Si quieres que el Studio viva fuera del proyecto (por ejemplo en la raíz del repo o en otro repositorio):

- Copia la carpeta `studio-app` donde quieras.
- Mantén el mismo `projectId` y `dataset` en `.env` que en el sitio.
- El sitio seguirá leyendo el contenido desde la API de Sanity; no depende de que el Studio esté dentro de `nextjs_space`.

## Scripts

- `npm run dev` — Studio en local (puerto 3333)
- `npm run build` — Build del Studio
- `npm run deploy` — Despliegue a sanity.studio (opcional)
