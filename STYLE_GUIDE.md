# 📋 Guía de Estilos - Alternative Website

## 🎨 Paleta de Colores

### Colores Principales

| Color | HEX | Clase Tailwind | Uso |
|-------|-----|----------------|-----|
| **Azul Marino** | `#132d54` | `bg-azul-marino` / `text-azul-marino` | Fondos oscuros, textos principales, header, footer |
| **Turquesa** | `#6cc4d4` | `bg-turquesa` / `text-turquesa` | CTAs primarios, acentos, iconos, highlights |
| **Menta** | `#cbe6b1` | `bg-menta` / `text-menta` | Hover de CTAs, acentos secundarios |
| **Violeta** | `#7a69e0` | `bg-violeta` / `text-violeta` | Secciones destacadas (CTA final), variedad visual |
| **Blanco Hueso** | `#fcf7f3` | `bg-blanco-hueso` | Fondos claros alternativos |

### Colores Secundarios

| Color | HEX | Clase Tailwind | Uso |
|-------|-----|----------------|-----|
| **Beige** | `#f0ebe0` | `bg-beige` | Fondos sutiles, hovers |
| **Oliva** | `#718f4e` | `bg-oliva` | Acentos naturales (poco usado) |
| **Lavanda** | `#aaa7f5` | `bg-lavanda` | Acentos suaves |
| **Gris Arena** | `#c5c0aa` | `bg-gris-arena` | Bordes, elementos neutros |
| **Negro** | `#232323` | `bg-negro` | Textos cuando se requiere máximo contraste |

---

## 📐 Uso de Colores por Sección

```
HERO:            bg-azul-marino + text-white + turquesa (acentos)
SECCIONES PAR:   bg-blanco-hueso o bg-white
SECCIONES IMPAR: bg-white o bg-card
TESTIMONIOS:     bg-azul-marino
CTA FINAL:       bg-violeta (con elementos decorativos)
MEGA MENUS:      bg-azul-marino
FOOTER:          bg-azul-marino
```

---

## 🔤 Tipografía

### Familia de Fuentes
- **Principal**: Inter (sans-serif)
- **Monospace**: JetBrains Mono (para código)

### Pesos
| Peso | Valor | Clase Tailwind |
|------|-------|----------------|
| Regular | 400 | `font-normal` |
| Medium | 500 | `font-medium` |
| Semibold | 600 | `font-semibold` |
| Bold | 700 | `font-bold` |

### Tamaños de Texto

| Tipo | Tamaño | Clase | Uso |
|------|--------|-------|-----|
| Display XL | 5rem (80px) | `text-display-xl` | Hero principal |
| Display | 4rem (64px) | `text-display` | Títulos grandes |
| Display SM | 3rem (48px) | `text-display-sm` | Subtítulos hero |
| Heading | 2.25rem (36px) | `text-heading` | Títulos de sección (H2) |
| Subheading | 1.5rem (24px) | `text-subheading` | Subtítulos (H3) |
| Body LG | 1.125rem (18px) | `text-body-lg` | Párrafos destacados |
| Body | 1rem (16px) | `text-body` | Texto general |
| Body SM | 0.875rem (14px) | `text-body-sm` | Textos secundarios, badges |

---

## 🎭 Sombras

| Clase | Uso |
|-------|-----|
| `shadow-brand-sm` | Elementos sutiles, header al scroll |
| `shadow-brand` | Cards estándar |
| `shadow-brand-md` | Cards destacadas |
| `shadow-brand-lg` | Modals, elementos elevados |
| `shadow-brand-xl` | Elementos muy destacados |
| `shadow-2xl` | Formularios, elementos flotantes |

### Sombras con Glow
| Clase | Color |
|-------|-------|
| `shadow-glow-turquesa` | Glow turquesa para CTAs |
| `shadow-glow-violeta` | Glow violeta |
| `shadow-glow-menta` | Glow menta |

---

## ✨ Animaciones

### Animaciones CSS (Tailwind)

| Clase | Efecto | Duración |
|-------|--------|----------|
| `animate-float` | Flotación vertical | 4s loop |
| `animate-float-slow` | Flotación lenta con rotación | 6s loop |
| `animate-pulse` | Pulso sutil | 2s loop |
| `animate-fade-in` | Aparición | 0.6s |
| `animate-fade-in-up` | Aparición desde abajo | 0.7s |
| `animate-scale-in` | Aparición con escala | 0.5s |
| `animate-spin-slow` | Rotación lenta | 8s loop |

### Animaciones Framer Motion

```tsx
// Entrada con fade y movimiento
initial={{ opacity: 0, y: 40 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}

// Flotación continua
animate={{ y: [0, -10, 0] }}
transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}

// Stagger children
variants={{
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
}}
```

### Transiciones Hover

```css
hover:-translate-y-1      /* Elevación sutil */
hover:shadow-lg           /* Sombra aumentada */
hover:bg-menta            /* Cambio de color en CTAs */
transition-all duration-300
```

---

## 📦 Componentes Clave

### Botones

```tsx
// Primario
className="bg-turquesa text-azul-marino font-semibold px-5 py-3 rounded-lg hover:bg-menta transition-all"

// Secundario
className="bg-white/10 border border-white/20 text-white font-medium px-5 py-3 rounded-lg hover:bg-white/20 transition-all"

// Outline
className="border border-turquesa text-turquesa font-medium px-5 py-3 rounded-lg hover:bg-turquesa hover:text-azul-marino transition-all"
```

### Cards

```tsx
// Card estándar
className="bg-white dark:bg-card rounded-2xl p-6 shadow-brand border border-gris-arena/20"

// Card con hover
className="bg-white rounded-2xl p-6 shadow-brand hover:shadow-brand-lg transition-all duration-300 hover:-translate-y-1"

// Card con fondo de color
className="bg-turquesa/10 rounded-2xl p-6 border border-gris-arena/20"
```

### Badges

```tsx
// Badge de sección
className="inline-block px-4 py-2 bg-turquesa/10 text-turquesa rounded-full text-sm font-medium"

// Badge en cards
className="px-2 py-1 bg-turquesa/20 text-turquesa text-xs rounded-full"
```

### Iconos

```tsx
// Tamaños estándar
className="w-4 h-4 text-turquesa"   // Pequeño (badges, inline)
className="w-5 h-5 text-turquesa"   // Mediano (botones)
className="w-7 h-7 text-turquesa"   // Grande (cards)
className="w-14 h-14"               // Container de icono

// Container de icono
className="w-14 h-14 bg-turquesa/20 rounded-xl flex items-center justify-center"
```

---

## 📱 Breakpoints

| Breakpoint | Ancho | Uso |
|------------|-------|-----|
| `sm:` | 640px | Móvil grande |
| `md:` | 768px | Tablet |
| `lg:` | 1024px | Desktop |
| `xl:` | 1280px | Desktop grande |
| `2xl:` | 1536px | Pantallas extra grandes |

### Ejemplo de uso responsive

```tsx
className="text-2xl md:text-3xl lg:text-4xl"
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
className="px-4 md:px-6 lg:px-8"
```

---

## 🧩 Patrones de Layout

### Container

```tsx
className="container-custom"  // Max-width con padding responsive
```

### Secciones

```tsx
className="py-20 lg:py-32"  // Padding vertical estándar
```

### Grids

```tsx
// 2 columnas
className="grid lg:grid-cols-2 gap-12"

// 3 columnas
className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"

// 4 columnas
className="grid grid-cols-2 lg:grid-cols-4 gap-4"
```

---

## 🌙 Dark Mode

El proyecto soporta dark mode usando la clase `dark:`. Ejemplos:

```tsx
className="bg-white dark:bg-card"
className="text-azul-marino dark:text-white"
className="border-gris-arena/20 dark:border-white/10"
```

---

## 📁 Estructura de Archivos de Estilos

```
├── tailwind.config.ts    # Configuración de Tailwind con colores y animaciones
├── app/globals.css       # Variables CSS y estilos globales
└── components/           # Componentes con estilos inline (Tailwind)
```

---

## ✅ Mejores Prácticas

1. **Usar colores de marca**: Preferir `azul-marino`, `turquesa`, `menta` sobre colores genéricos
2. **Consistencia en spacing**: Usar múltiplos de 4 (p-4, p-6, p-8, gap-4, gap-6)
3. **Transiciones suaves**: Siempre incluir `transition-all duration-300`
4. **Accesibilidad**: Mantener contraste adecuado (texto blanco sobre fondos oscuros)
5. **Responsive first**: Diseñar mobile-first, agregar breakpoints para desktop
