# Generación de PDFs

Este directorio contiene funciones para generar PDFs profesionales con diseño de marca.

## Índice
- [Madurez Digital PDF](#madurez-digital-pdf)
- [ROI Optimización de Procesos PDF](#roi-optimización-de-procesos-pdf)
- [Extensión](#extensión)

## Madurez Digital PDF

El PDF de Madurez Digital (`madurez-digital-pdf.ts`) genera un reporte de 2 páginas con:

### Página 1: Resumen Ejecutivo
- **Header con branding**: Logo y título de Alternative
- **Información del cliente**: Nombre, empresa, email, teléfono, industria, rol, tamaño de empresa
- **Score principal**: Gauge circular con el score total (0-100)
- **Nivel de madurez**: Badge con el nivel alcanzado (Inicial, Emergente, Avanzado, Líder)
- **Benchmark de industria**: Comparación con el promedio de la industria
- **Dimensiones**: Barras de progreso para cada dimensión:
  - 🎯 Estrategia Digital
  - 📱 Canales Digitales
  - 📊 Datos y Analytics
  - 💻 Capacidades Tecnológicas

### Página 2: Análisis y Recomendaciones
- **Fortalezas**: Top 3 dimensiones con mejor puntuación
- **Oportunidades**: Top 3 dimensiones con menor puntuación (áreas de mejora)
- **Próximos pasos recomendados**: Lista de 5 acciones sugeridas
- **Call to action**: Invitación a consultoría estratégica

### Diseño
- **Colores de marca**:
  - Azul Marino (#132d54): Headers, títulos principales
  - Verde Oliva (#718f4e): Acentos, badges, barras de progreso altas
  - Beige (#fcf7f3): Fondos de cajas informativas
  - Beige Oscuro (#c5c0aa): Líneas divisorias

- **Tipografía**: Helvetica (incluida por defecto en jsPDF)
- **Elementos visuales**:
  - Gauges circulares para scores
  - Barras de progreso con código de colores
  - Cajas redondeadas para información
  - Iconos emoji para dimensiones

### Uso

```typescript
import { jsPDF } from 'jspdf';
import { generateMadurezDigitalPdf } from '@/lib/pdf/madurez-digital-pdf';

const doc = new jsPDF();

generateMadurezDigitalPdf(doc, {
  name: 'Juan Pérez',
  company: 'Empresa ABC',
  email: 'juan@empresa.com',
  phone: '+1234567890',
  scores: madurezScores,
  preliminary: preliminaryAnswers,
  translations: {
    // Objeto con todas las traducciones necesarias
  }
});

doc.save('Madurez_Digital_Empresa_ABC.pdf');
```

---

## ROI Optimización de Procesos PDF

El PDF de ROI (`roi-optimization-pdf.ts`) genera un reporte de 2 páginas con:

### Página 1: Resumen Ejecutivo
- **Header con branding**: Logo y título de Alternative con subtítulo
- **Información del proceso**: Nombre del proceso analizado (si se proporcionó)
- **ROI Principal**: Gauge circular con código de colores:
  - 🟢 Verde: ROI > 200% (Altamente recomendado)
  - 🟡 Verde Oliva: ROI 100-200% (Justificado)
  - 🟠 Amarillo: ROI 50-100% (Analizar)
  - 🔴 Rojo: ROI < 50% (Reevaluar)
- **Métricas clave en cajas**: 
  - Ahorro anual
  - Período de recuperación (payback)
  - Porcentaje de reducción
- **Comparación visual**: Barras comparativas entre situación actual vs optimizada
  - Costo anual actual (rojo)
  - Costo anual optimizado (verde)
  - Ahorro calculado con porcentaje
- **Tabla de parámetros**: Todos los inputs del análisis en formato tabla

### Página 2: Análisis Detallado
- **Beneficios proyectados**: Caja con métricas detalladas:
  - Ejecuciones por año
  - Tiempo total actual vs optimizado
  - Beneficio neto año 1
  - Beneficio acumulado 3 años
- **Recomendación**: Badge con color según nivel + descripción detallada
- **Próximos pasos**: Lista de 5 acciones recomendadas
- **Call to action**: Banner invitando a consultoría

### Diseño
- **Colores de marca**: Mismos que Madurez Digital
- **Elementos visuales**:
  - Gauge circular para ROI con código de colores
  - Barras comparativas horizontales
  - Cajas de métricas con valores destacados
  - Tablas informativas con filas alternadas
  - Badges de recomendación con colores semánticos

### Uso

```typescript
import { jsPDF } from 'jspdf';
import { generateRoiOptimizationPdf } from '@/lib/pdf/roi-optimization-pdf';

const doc = new jsPDF();

generateRoiOptimizationPdf(doc, {
  email: 'usuario@empresa.com',
  results: roiResults,
  formState: roiInputs,
  recommendation: {
    level: 'high',
    title: 'Altamente Recomendado',
    body: 'Descripción de la recomendación...'
  },
  translations: {
    // Objeto con todas las traducciones necesarias
  }
});

doc.save('ROI_Optimizacion_Procesos.pdf');
```

---

## Extensión

Para crear nuevos PDFs con el mismo estilo:

1. Usar las funciones helper existentes:
   - `drawHeader()`: Header con branding
   - `drawFooter()`: Footer con URL y número de página
   - `drawScoreGauge()`: Gauge circular para scores
   - `drawInfoBox()`: Caja informativa con label y valor
   - `drawDimensionBar()`: Barra de progreso horizontal
   - `drawSectionTitle()`: Título de sección con barra lateral

2. Mantener los colores de marca definidos en `COLORS`

3. Usar márgenes consistentes (20 unidades por defecto)

4. Agregar páginas con `doc.addPage()` cuando sea necesario
