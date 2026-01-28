# Blog y Studio en producción

Guía para subir los cambios a Git, desplegar el sitio y que otra persona pueda editar los blogs desde el Studio en producción.

---

## 1. Subir cambios a Git

Desde la raíz del proyecto (`nextjs_space`):

```bash
git add .
git status   # revisa qué se sube
git commit -m "Blog: Sanity body (Portable Text), autor con imagen, prompt Claude, doc producción"
git push origin main
```

(Usa la rama que corresponda: `main`, `master`, etc.)

---

## 2. Sitio Next.js en producción

El sitio (Vercel, Netlify, etc.) ya está preparado para leer el blog desde Sanity. Solo hace falta configurar las **variables de entorno** en el panel de tu hosting:

| Variable | Valor | Obligatorio |
|----------|--------|-------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Tu project ID (ej. `5s1f6jl3`) | Sí, para que el blog use Sanity |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` (o el dataset que uses) | Sí |

Sin estas variables, el blog seguirá mostrando solo los posts estáticos (BPM, Banco Regional). Con ellas, el sitio en producción consumirá el mismo proyecto y dataset de Sanity que usas en local.

---

## 3. Studio en producción: cómo trabaja “la otra persona”

El Studio es la app donde se escriben y editan los blogs. En producción hay **dos formas** de que alguien lo use.

### Opción A (recomendada): Studio en Sanity (sanity.studio)

Despliegas el Studio **una vez** en los servidores de Sanity. Quien quieras que edite entra a una URL tipo `https://tu-proyecto.sanity.studio` y trabaja desde el navegador.

**Pasos:**

1. Entra en la carpeta del Studio:
   ```bash
   cd studio-app
   ```

2. Instala dependencias si no lo has hecho:
   ```bash
   npm install
   ```

3. Crea `.env` con el mismo proyecto y dataset que el sitio (mismo que en `.env` del Next.js):
   ```env
   SANITY_STUDIO_PROJECT_ID=5s1f6jl3
   SANITY_STUDIO_DATASET=production
   ```

4. Despliega el Studio a Sanity:
   ```bash
   npx sanity deploy
   ```
   - Te pedirá nombre para el Studio (ej. `alternative-blog`) y te dará una URL tipo `https://alternative-blog.sanity.studio`.

5. **Dar acceso a la otra persona:**
   - Entra en [sanity.io/manage](https://sanity.io/manage).
   - Elige el proyecto (mismo `projectId` que usas en el sitio).
   - Ve a **Members** (o **People**) → **Invite**.
   - Añade el email de la persona y el rol (p. ej. **Editor** para que pueda crear/editar contenido).
   - Ella recibe un correo, crea cuenta en Sanity (o inicia sesión) y ya puede abrir la URL del Studio (ej. `https://alternative-blog.sanity.studio`) y escribir/editar blogs.

**Ventajas:** No tienes que desplegar el Studio en tu propio servidor; Sanity lo aloja. Cualquier persona con acceso al proyecto puede usar el mismo enlace.

---

### Opción B: Studio en tu propio hosting

Si prefieres que el Studio viva en tu dominio (ej. `https://grupoalternative.com/studio` o `https://studio.grupoalternative.com`):

- Tienes que desplegar la carpeta **`studio-app`** como una app aparte (otro proyecto en Vercel/Netlify, o un subdominio).
- En el despliegue, configuras las mismas variables: `SANITY_STUDIO_PROJECT_ID` y `SANITY_STUDIO_DATASET` (o las que use `studio-app`).
- En [sanity.io/manage](https://sanity.io/manage) → **API** → **CORS origins** añades la URL de ese Studio (ej. `https://studio.grupoalternative.com`) para que no haya errores de CORS al cargar.

La otra persona entraría a esa URL que tú les des; el flujo de “invitar usuario” sigue siendo el mismo en Sanity (Members del proyecto).

---

## 4. Resumen del flujo en producción

1. **Tú (o tu equipo):**
   - Subís cambios a Git y desplegáis el sitio Next.js (Vercel, etc.) con `NEXT_PUBLIC_SANITY_PROJECT_ID` y `NEXT_PUBLIC_SANITY_DATASET`.
   - Desplegáis el Studio una vez (Opción A: `npx sanity deploy` desde `studio-app`) y compartís el enlace del Studio.

2. **La otra persona (redactor/a):**
   - Recibe la invitación de Sanity (email) y acepta.
   - Abre la URL del Studio (ej. `https://alternative-blog.sanity.studio`).
   - Inicia sesión y edita/crea posts, autores, categorías.
   - Los cambios se guardan en el mismo proyecto/dataset que usa el sitio.

3. **Visitantes del sitio:**
   - Ven el blog en tu dominio (ej. `https://grupoalternative.com/es/blog`). El sitio lee desde la API de Sanity; lo que se publique en el Studio aparece ahí sin volver a desplegar el Next.js.

---

## 5. Checklist antes de producción

- [ ] Variables de entorno del **sitio** en el hosting: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`.
- [ ] Studio desplegado (Opción A: `npx sanity deploy` desde `studio-app`) y URL del Studio anotada.
- [ ] Usuario invitado en [sanity.io/manage](https://sanity.io/manage) → proyecto → Members.
- [ ] CORS en Sanity: si el sitio está en `https://grupoalternative.com`, asegúrate de tener ese origen (y si usas Opción B, la URL del Studio) en **API → CORS origins** (para las peticiones del front, no para el Studio en sanity.studio).

Con esto, al subir los cambios a Git y desplegar el sitio y el Studio, la otra persona puede trabajar escribiendo blogs en producción sin tocar código ni repositorio.
