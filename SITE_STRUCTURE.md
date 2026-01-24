# 📁 ESTRUCTURA COMPLETA DEL SITIO - Alternative
**Fecha:** Enero 2025  
**Base URL:** https://grupoalternative.com  
**Framework i18n:** next-intl  
**Locales:** `es` (default), `en`

---

## 🌐 SISTEMA DE INTERNACIONALIZACIÓN

### Configuración
- **Librería:** next-intl
- **Archivo de configuración:** `/i18n.ts`
- **Mensajes:** `/messages/es.json`, `/messages/en.json`
- **Middleware:** `/middleware.ts`

### Estructura de URLs
- **Español:** `https://grupoalternative.com/es/...`
- **Inglés:** `https://grupoalternative.com/en/...`
- **Raíz `/`:** Redirige automáticamente a `/es`

---

## 🏠 PÁGINAS PRINCIPALES

### ✅ **Homepage**
| Idioma | URL | Archivo |
|--------|-----|---------|
| ES | `/es` | `app/[locale]/page.tsx` |
| EN | `/en` | `app/[locale]/page.tsx` |

**Estado:** ✅ Completo - Contenido extenso, optimizado para SEO

---

## 🛠️ SERVICIOS

### **Página Principal de Servicios**
| Idioma | URL | Archivo |
|--------|-----|---------|
| ES | `/es/servicios` | `app/[locale]/servicios/page.tsx` |
| EN | `/en/servicios` | `app/[locale]/servicios/page.tsx` |

### **Servicios Principales (6 categorías)**

#### 1. Optimización de Procesos
| URL ES | URL EN (redirige) | Archivo |
|--------|-------------------|---------|
| `/es/servicios/optimizacion-procesos` | `/en/servicios/optimizacion-procesos` | `app/[locale]/servicios/optimizacion-procesos/page.tsx` |

**Sub-servicios:**
- `/[locale]/servicios/optimizacion-procesos/bpm-empresarial`
- `/[locale]/servicios/optimizacion-procesos/lean-six-sigma`
- `/[locale]/servicios/optimizacion-procesos/diseno-procesos`
- `/[locale]/servicios/optimizacion-procesos/automatizacion-procesos`

#### 2. Sistemas de Calidad
| URL | Archivo |
|-----|---------|
| `/[locale]/servicios/sistemas-calidad` | `app/[locale]/servicios/sistemas-calidad/page.tsx` |

**Sub-servicios:**
- `/[locale]/servicios/sistemas-calidad/implementacion-iso-9001`
- `/[locale]/servicios/sistemas-calidad/auditoria-calidad`
- `/[locale]/servicios/sistemas-calidad/certificacion-iso`
- `/[locale]/servicios/sistemas-calidad/gestion-calidad`

#### 3. Gestión de Proyectos
| URL | Archivo |
|-----|---------|
| `/[locale]/servicios/gestion-proyectos` | `app/[locale]/servicios/gestion-proyectos/page.tsx` |

**Sub-servicios:**
- `/[locale]/servicios/gestion-proyectos/pmp-project-management`
- `/[locale]/servicios/gestion-proyectos/metodologias-agiles`
- `/[locale]/servicios/gestion-proyectos/pmo-office`
- `/[locale]/servicios/gestion-proyectos/casos-negocio`

#### 4. Transformación Digital
| URL | Archivo |
|-----|---------|
| `/[locale]/servicios/transformacion-digital` | `app/[locale]/servicios/transformacion-digital/page.tsx` |

**Sub-servicios:**
- `/[locale]/servicios/transformacion-digital/estrategia-digital`
- `/[locale]/servicios/transformacion-digital/automatizacion-inteligente`
- `/[locale]/servicios/transformacion-digital/desarrollo-software`
- `/[locale]/servicios/transformacion-digital/infraestructura-it`

#### 5. Consultoría Estratégica
| URL | Archivo |
|-----|---------|
| `/[locale]/servicios/consultoria-estrategica` | `app/[locale]/servicios/consultoria-estrategica/page.tsx` |

**Sub-servicios:**
- `/[locale]/servicios/consultoria-estrategica/diagnostico-organizacional`
- `/[locale]/servicios/consultoria-estrategica/estudios-viabilidad`
- `/[locale]/servicios/consultoria-estrategica/desarrollo-rfp`

#### 6. Desarrollo Tecnología
| URL | Archivo |
|-----|---------|
| `/[locale]/servicios/desarrollo-tecnologia` | `app/[locale]/servicios/desarrollo-tecnologia/page.tsx` |

**Sub-servicios:**
- `/[locale]/servicios/desarrollo-tecnologia/aplicaciones-medida`
- `/[locale]/servicios/desarrollo-tecnologia/portales-corporativos`
- `/[locale]/servicios/desarrollo-tecnologia/integraciones-api`
- `/[locale]/servicios/desarrollo-tecnologia/soporte-infraestructura`

**Total Sub-servicios:** 23 páginas

---

## 🏭 INDUSTRIAS

### **Página Principal de Industrias**
| URL | Archivo |
|-----|---------|
| `/[locale]/industrias` | `app/[locale]/industrias/page.tsx` |

### **Industrias (8 categorías)**

| Industria | URL |
|-----------|-----|
| Banca y Servicios Financieros | `/[locale]/industrias/banca-servicios-financieros` |
| Manufactura y Logística | `/[locale]/industrias/manufactura-logistica` |
| Retail y Comercio | `/[locale]/industrias/retail-comercio` |
| Tecnología y Telecomunicaciones | `/[locale]/industrias/tecnologia-telecomunicaciones` |
| Servicios Profesionales | `/[locale]/industrias/servicios-profesionales` |
| Gobierno y Sector Público | `/[locale]/industrias/gobierno-sector-publico` |
| Salud y Farmacéutica | `/[locale]/industrias/salud-farmaceutica` |
| Energía y Utilities | `/[locale]/industrias/energia-utilities` |

**Archivo:** `app/[locale]/industrias/[slug]/page.tsx`

---

## 📄 PÁGINAS CORPORATIVAS

| Página | URL ES | URL EN | Archivo |
|--------|--------|--------|---------|
| Casos de Éxito | `/es/casos-exito` | `/en/casos-exito` | `app/[locale]/casos-exito/page.tsx` |
| Nosotros | `/es/nosotros` | `/en/nosotros` | `app/[locale]/nosotros/page.tsx` |
| Recursos | `/es/recursos` | `/en/recursos` | `app/[locale]/recursos/page.tsx` |
| Blog | `/es/blog` | `/en/blog` | `app/[locale]/blog/page.tsx` |
| Contacto | `/es/contacto` | `/en/contacto` | `app/[locale]/contacto/page.tsx` |

---

## 🔌 API ENDPOINTS

| Endpoint | Método | Archivo |
|----------|--------|---------|
| `/api/contact` | POST | `app/api/contact/route.ts` |

---

## 🔄 REDIRECTS (vercel.json)

### WordPress → Next.js (301 Permanent)

| URL Antigua | Nueva URL |
|-------------|-----------|
| `/` | `/es` |
| `/inicio` | `/es` |
| `/servicios` | `/es/servicios` |
| `/service/consultoria-de-procesos` | `/es/servicios/optimizacion-procesos` |
| `/service/consultoria-de-proyectos` | `/es/servicios/gestion-proyectos` |
| `/service/consultoria-de-calidad` | `/es/servicios/sistemas-calidad` |
| `/service/consultoria-de-tecnologia-informacion` | `/es/servicios/transformacion-digital` |
| `/service/desarrollo-software` | `/es/servicios/desarrollo-tecnologia/aplicaciones-medida` |
| `/consultoria-de-gestion-de-proyectos-pmi-panama` | `/es/servicios/gestion-proyectos/pmp-project-management` |
| `/consultores-de-empresas` | `/es/nosotros` |
| `/contact` | `/es/contacto` |
| `/proyectos-exitosos` | `/es/casos-exito` |
| `/blog-grupo-alternative` | `/es/blog` |
| `/profile` | `/es/nosotros` |
| `/profilekg` | `/es/nosotros` |
| `/ia-en-gestion-de-proyectos` | `/es/blog/ia-gestion-proyectos` |
| `/services/*` | `/en/servicios/*` |

---

## 🗺️ SITEMAP DINÁMICO

**Archivo:** `app/sitemap.ts`

Genera automáticamente URLs para:
- Homepage (ES/EN)
- Páginas principales (ES/EN)
- Servicios principales
- Sub-servicios
- Industrias

**Incluye hreflang** para alternativas de idioma.

---

## 🤖 ROBOTS.TXT

**Archivo:** `app/robots.ts`

```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/
Disallow: /admin/
Sitemap: https://grupoalternative.com/sitemap.xml
```

---

## 📊 RESUMEN

| Categoría | Cantidad |
|-----------|----------|
| Homepage | 2 (ES/EN) |
| Servicios Principales | 6 × 2 = 12 |
| Sub-servicios | 23 × 2 = 46 |
| Industrias | 8 × 2 = 16 |
| Páginas Corporativas | 5 × 2 = 10 |
| API Endpoints | 1 |

**Total páginas únicas:** ~43  
**Total URLs (con i18n):** ~86+

---

## 🗂️ ESTRUCTURA DE ARCHIVOS

```
app/
├── [locale]/
│   ├── layout.tsx              ← Layout con metadata dinámica
│   ├── page.tsx               ← Homepage
│   ├── servicios/
│   │   ├── page.tsx
│   │   ├── optimizacion-procesos/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── sistemas-calidad/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── gestion-proyectos/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── transformacion-digital/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── consultoria-estrategica/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   └── desarrollo-tecnologia/
│   │       ├── page.tsx
│   │       └── [slug]/page.tsx
│   ├── industrias/
│   │   ├── page.tsx
│   │   ├── [slug]/page.tsx
│   │   └── banca-servicios-financieros/
│   │       └── [subslug]/page.tsx
│   ├── casos-exito/page.tsx
│   ├── nosotros/page.tsx
│   ├── recursos/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── blog/page.tsx
│   └── contacto/page.tsx
├── api/
│   └── contact/route.ts
├── layout.tsx                  ← Root layout (minimal)
├── globals.css
├── sitemap.ts
└── robots.ts

messages/
├── es.json                     ← Traducciones español
└── en.json                     ← Traducciones inglés

i18n.ts                         ← Configuración next-intl
middleware.ts                   ← Middleware de routing i18n
vercel.json                     ← Redirects WordPress → Next.js
```

---

## ✅ CHECKLIST DE MIGRACIÓN

- [x] Instalar next-intl
- [x] Crear i18n.ts y messages/*.json
- [x] Actualizar next.config.js
- [x] Crear middleware.ts
- [x] Mover páginas a app/[locale]/
- [x] Actualizar layout con metadata dinámica
- [x] Crear vercel.json con redirects
- [x] Crear sitemap.ts dinámico
- [x] Crear robots.ts
- [x] Actualizar Header/Footer con useLocale()
- [x] Eliminar archivos duplicados
- [ ] Probar localmente
- [ ] Deploy a Vercel
- [ ] Verificar redirects en producción
- [ ] Verificar sitemap.xml
- [ ] Monitorear 404s

---

**Documento actualizado:** Enero 2025
