import type { jsPDF } from 'jspdf';
import type { RoiResults, RoiInputs, RoiRecommendationLevel } from '@/lib/calculators/roi-optimization';
import { formatCurrency, formatNumber } from '@/lib/calculators/roi-optimization';

interface PdfData {
  email: string;
  results: RoiResults;
  formState: RoiInputs | null;
  recommendation: {
    level: RoiRecommendationLevel;
    title: string;
    body: string;
  };
  translations: {
    title: string;
    subtitle: string;
    processName: string;
    currentSituation: string;
    optimizedScenario: string;
    benefits: string;
    recommendation: string;
    currentCost: string;
    optimizedCost: string;
    annualSavings: string;
    payback: string;
    months: string;
    roi: string;
    volume: string;
    timeSpent: string;
    people: string;
    hourCost: string;
    improvement: string;
    projectCost: string;
    reduction: string;
    benefit1Year: string;
    benefit3Years: string;
    nextSteps: string;
    generatedFor: string;
    date: string;
    executionsPerYear: string;
    hours: string;
  };
}

// Colores de la marca
const COLORS = {
  azulMarino: [19, 45, 84] as [number, number, number],
  verdeOliva: [113, 143, 78] as [number, number, number],
  turquesa: [108, 196, 212] as [number, number, number],
  violeta: [122, 105, 224] as [number, number, number],
  beige: [252, 247, 243] as [number, number, number],
  beigeOscuro: [197, 192, 170] as [number, number, number],
  white: [255, 255, 255] as [number, number, number],
  lightGray: [240, 240, 240] as [number, number, number],
  success: [40, 167, 69] as [number, number, number],
  warning: [255, 193, 7] as [number, number, number],
  danger: [220, 53, 69] as [number, number, number],
};

// Variable para almacenar el logo cargado
let cachedLogoBase64: string | null = null;

// Función para cargar el logo como base64
async function loadLogoAsBase64(): Promise<string | null> {
  if (cachedLogoBase64) return cachedLogoBase64;
  
  try {
    if (typeof window !== 'undefined') {
      const response = await fetch('/images/logoreporte.webp');
      const blob = await response.blob();
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          cachedLogoBase64 = reader.result as string;
          resolve(cachedLogoBase64);
        };
        reader.onerror = () => resolve(null);
        reader.readAsDataURL(blob);
      });
    }
    return null;
  } catch {
    return null;
  }
}

function drawHeader(doc: jsPDF, title: string, subtitle: string, logoBase64?: string | null) {
  const pageWidth = doc.internal.pageSize.width;
  
  // Fondo azul marino en el header
  doc.setFillColor(...COLORS.azulMarino);
  doc.rect(0, 0, pageWidth, 42, 'F');
  
  // Logo desde imagen
  if (logoBase64) {
    try {
      const logoWidth = 55;
      const logoHeight = 12;
      const logoX = (pageWidth - logoWidth) / 2;
      doc.addImage(logoBase64, 'WEBP', logoX, 5, logoWidth, logoHeight);
    } catch {
      // Fallback a texto
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      doc.text('Alternative', pageWidth / 2, 14, { align: 'center' });
    }
  } else {
    // Fallback a texto
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Alternative', pageWidth / 2, 14, { align: 'center' });
  }
  
  // Título del reporte
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text(title, pageWidth / 2, 26, { align: 'center' });
  
  // Subtítulo
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(subtitle, pageWidth / 2, 34, { align: 'center' });
}

function drawFooter(doc: jsPDF, pageNumber: number) {
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  
  // Línea superior
  doc.setDrawColor(...COLORS.beigeOscuro);
  doc.setLineWidth(0.5);
  doc.line(20, pageHeight - 18, pageWidth - 20, pageHeight - 18);
  
  // Texto del footer
  doc.setTextColor(...COLORS.azulMarino);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('grupoalternative.com | info@grupoalternative.com', pageWidth / 2, pageHeight - 10, { align: 'center' });
  
  // Número de página
  doc.setTextColor(...COLORS.beigeOscuro);
  doc.text(`Página ${pageNumber}`, pageWidth - 20, pageHeight - 10, { align: 'right' });
}

function drawSectionTitle(doc: jsPDF, x: number, y: number, title: string) {
  doc.setFillColor(...COLORS.verdeOliva);
  doc.rect(x, y, 3, 7, 'F');
  
  doc.setTextColor(...COLORS.azulMarino);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text(title, x + 6, y + 5);
}

function drawMetricBox(
  doc: jsPDF,
  x: number,
  y: number,
  width: number,
  height: number,
  label: string,
  value: string,
  color: [number, number, number] = COLORS.beige
) {
  // Fondo
  doc.setFillColor(...color);
  doc.roundedRect(x, y, width, height, 3, 3, 'F');
  
  // Label
  doc.setTextColor(...COLORS.verdeOliva);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text(label, x + width / 2, y + 7, { align: 'center' });
  
  // Value
  doc.setTextColor(...COLORS.azulMarino);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text(value, x + width / 2, y + 16, { align: 'center' });
}

function drawRoiGauge(doc: jsPDF, x: number, y: number, roi: number, size: number = 45) {
  const centerX = x + size / 2;
  const centerY = y + size / 2;
  const radius = size / 2 - 2;
  
  // Determinar color según ROI
  let color: [number, number, number];
  let bgColor: [number, number, number];
  
  if (roi > 200) {
    color = COLORS.success;
    bgColor = [232, 245, 233];
  } else if (roi >= 100) {
    color = COLORS.verdeOliva;
    bgColor = [240, 244, 233];
  } else if (roi >= 50) {
    color = COLORS.warning;
    bgColor = [255, 248, 225];
  } else {
    color = COLORS.danger;
    bgColor = [255, 235, 238];
  }
  
  // Fondo del círculo
  doc.setFillColor(...bgColor);
  doc.circle(centerX, centerY, radius, 'F');
  
  // Borde
  doc.setDrawColor(...color);
  doc.setLineWidth(2.5);
  doc.circle(centerX, centerY, radius - 2, 'S');
  
  // Texto del ROI
  doc.setTextColor(...color);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  const roiText = roi > 999 ? '999+' : Math.round(roi).toString();
  doc.text(roiText, centerX, centerY - 1, { align: 'center' });
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('%', centerX, centerY + 5, { align: 'center' });
  
  doc.setFontSize(7);
  doc.text('ROI', centerX, centerY + 11, { align: 'center' });
}

function drawComparisonBars(
  doc: jsPDF,
  x: number,
  y: number,
  width: number,
  label1: string,
  value1: number,
  label2: string,
  value2: number
) {
  const barHeight = 10;
  const maxValue = Math.max(value1, value2);
  const maxBarWidth = width - 85;
  
  // Barra 1 (actual)
  doc.setTextColor(...COLORS.azulMarino);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text(label1, x, y + 6);
  
  const bar1Width = Math.max(10, (value1 / maxValue) * maxBarWidth);
  doc.setFillColor(220, 53, 69);
  doc.roundedRect(x + 55, y, bar1Width, barHeight, 2, 2, 'F');
  
  doc.setFont('helvetica', 'bold');
  doc.text(formatCurrency(value1), x + width - 5, y + 6, { align: 'right' });
  
  // Barra 2 (optimizado)
  y += 14;
  doc.setFont('helvetica', 'normal');
  doc.text(label2, x, y + 6);
  
  const bar2Width = Math.max(10, (value2 / maxValue) * maxBarWidth);
  doc.setFillColor(...COLORS.success);
  doc.roundedRect(x + 55, y, bar2Width, barHeight, 2, 2, 'F');
  
  doc.setFont('helvetica', 'bold');
  doc.text(formatCurrency(value2), x + width - 5, y + 6, { align: 'right' });
  
  // Badge de ahorro
  y += 14;
  const savings = value1 - value2;
  const savingsPct = ((savings / value1) * 100).toFixed(0);
  
  doc.setFillColor(...COLORS.success);
  doc.roundedRect(x, y, width, 10, 2, 2, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text(`AHORRO: ${formatCurrency(savings)} (-${savingsPct}%)`, x + width / 2, y + 6.5, { align: 'center' });
}

function drawInfoTable(
  doc: jsPDF,
  x: number,
  y: number,
  width: number,
  rows: Array<{ label: string; value: string }>
) {
  const rowHeight = 9;
  
  rows.forEach((row, index) => {
    const currentY = y + index * rowHeight;
    
    // Fondo alternado
    if (index % 2 === 0) {
      doc.setFillColor(...COLORS.beige);
      doc.rect(x, currentY, width, rowHeight, 'F');
    }
    
    // Label
    doc.setTextColor(...COLORS.verdeOliva);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.text(row.label, x + 3, currentY + 6);
    
    // Value
    doc.setTextColor(...COLORS.azulMarino);
    doc.setFont('helvetica', 'normal');
    doc.text(row.value, x + width / 2 + 5, currentY + 6);
  });
  
  // Borde de la tabla
  doc.setDrawColor(...COLORS.beigeOscuro);
  doc.setLineWidth(0.3);
  doc.rect(x, y, width, rows.length * rowHeight, 'S');
}

function wrapText(doc: jsPDF, text: string, maxWidth: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';
  
  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const width = doc.getTextWidth(testLine);
    
    if (width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  
  if (currentLine) {
    lines.push(currentLine);
  }
  
  return lines;
}

export async function generateRoiOptimizationPdf(doc: jsPDF, data: PdfData): Promise<void> {
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  const margin = 20;
  const contentWidth = pageWidth - 2 * margin;
  
  // Cargar logo
  const logoBase64 = await loadLogoAsBase64();
  
  // ===== PÁGINA 1: Resumen Ejecutivo =====
  drawHeader(doc, data.translations.title, data.translations.subtitle, logoBase64);
  
  let y = 50;
  
  // Información del proceso
  if (data.formState?.processName) {
    doc.setFillColor(...COLORS.beige);
    doc.roundedRect(margin, y, contentWidth, 10, 2, 2, 'F');
    
    doc.setTextColor(...COLORS.azulMarino);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text(`${data.translations.processName}: `, margin + 4, y + 6.5);
    
    doc.setFont('helvetica', 'normal');
    doc.text(data.formState.processName, margin + 45, y + 6.5);
    
    y += 14;
  }
  
  // ROI Principal y métricas clave
  drawSectionTitle(doc, margin, y, 'Resultados del Análisis');
  y += 12;
  
  // ROI Gauge centrado
  const gaugeSize = 45;
  const gaugeX = pageWidth / 2 - gaugeSize / 2;
  drawRoiGauge(doc, gaugeX, y, data.results.roi, gaugeSize);
  
  y += gaugeSize + 10;
  
  // Métricas en cajas
  const boxWidth = (contentWidth - 8) / 3;
  
  drawMetricBox(
    doc,
    margin,
    y,
    boxWidth,
    22,
    data.translations.annualSavings,
    formatCurrency(data.results.ahorroAnual)
  );
  
  drawMetricBox(
    doc,
    margin + boxWidth + 4,
    y,
    boxWidth,
    22,
    data.translations.payback,
    `${formatNumber(data.results.paybackMeses, 1)} ${data.translations.months}`
  );
  
  drawMetricBox(
    doc,
    margin + 2 * (boxWidth + 4),
    y,
    boxWidth,
    22,
    data.translations.reduction,
    `${formatNumber(data.results.reduccionPct, 0)}%`
  );
  
  y += 28;
  
  // Comparación de costos
  drawSectionTitle(doc, margin, y, `${data.translations.currentSituation} vs ${data.translations.optimizedScenario}`);
  y += 12;
  
  drawComparisonBars(
    doc,
    margin,
    y,
    contentWidth,
    data.translations.currentCost,
    data.results.costoAnual,
    data.translations.optimizedCost,
    data.results.costoOptimizado
  );
  
  y += 45;
  
  // Parámetros de entrada
  if (data.formState) {
    drawSectionTitle(doc, margin, y, 'Parámetros del Análisis');
    y += 10;
    
    const frecuenciaMap: Record<string, string> = {
      hora: 'por hora',
      dia: 'por día',
      semana: 'por semana',
      mes: 'por mes',
      trimestre: 'por trimestre',
    };
    
    // Usar labels en español directamente ya que las traducciones pueden fallar
    drawInfoTable(doc, margin, y, contentWidth, [
      { label: 'Volumen', value: `${data.formState.volumen} ${frecuenciaMap[data.formState.frecuencia] || 'por mes'}` },
      { label: 'Tiempo por ejecución', value: `${data.formState.tiempoMinutos} min` },
      { label: 'Personas involucradas', value: `${data.formState.personas}` },
      { label: 'Costo por hora', value: formatCurrency(data.formState.costoHora) },
      { label: 'Mejora esperada', value: `${data.formState.mejoraPct}%` },
      { label: 'Costo del proyecto', value: formatCurrency(data.formState.costoProyecto) },
    ]);
  }
  
  drawFooter(doc, 1);
  
  // ===== PÁGINA 2: Recomendaciones =====
  doc.addPage();
  drawHeader(doc, data.translations.title, data.translations.subtitle, logoBase64);
  
  y = 50;
  
  // Beneficios proyectados
  drawSectionTitle(doc, margin, y, data.translations.benefits);
  y += 12;
  
  doc.setFillColor(...COLORS.beige);
  doc.roundedRect(margin, y, contentWidth, 48, 3, 3, 'F');
  
  doc.setFontSize(9);
  let benefitY = y + 9;
  const labelX = margin + 5;
  const valueX = margin + 85;
  
  const benefitItems = [
    { label: 'Ejecuciones por año:', value: formatNumber(data.results.volumenAnual, 0) },
    { label: 'Tiempo total actual:', value: `${formatNumber(data.results.tiempoTotalHoras, 0)} horas` },
    { label: 'Tiempo optimizado:', value: `${formatNumber(data.results.tiempoOptimizadoHoras, 0)} horas` },
    { label: 'Beneficio año 1:', value: formatCurrency(data.results.beneficioAno1), isGreen: true },
    { label: 'Beneficio 3 años:', value: formatCurrency(data.results.beneficio3Anos), isGreen: true },
  ];
  
  for (const item of benefitItems) {
    doc.setTextColor(...COLORS.azulMarino);
    doc.setFont('helvetica', 'bold');
    doc.text(item.label, labelX, benefitY);
    
    if (item.isGreen) {
      doc.setTextColor(...COLORS.success);
    }
    doc.setFont('helvetica', 'normal');
    doc.text(item.value, valueX, benefitY);
    benefitY += 8;
  }
  
  y += 55;
  
  // Recomendación
  drawSectionTitle(doc, margin, y, 'Recomendación');
  y += 12;
  
  // Color según nivel de recomendación
  let recColor: [number, number, number];
  switch (data.recommendation.level) {
    case 'high':
      recColor = COLORS.success;
      break;
    case 'justified':
      recColor = COLORS.verdeOliva;
      break;
    case 'analyze':
      recColor = COLORS.warning;
      break;
    default:
      recColor = COLORS.danger;
  }
  
  // Título de recomendación
  doc.setFillColor(...recColor);
  doc.roundedRect(margin, y, contentWidth, 12, 2, 2, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text(data.recommendation.title, pageWidth / 2, y + 8, { align: 'center' });
  
  y += 16;
  
  // Cuerpo de la recomendación
  doc.setFontSize(8);
  const wrappedBody = wrapText(doc, data.recommendation.body, contentWidth - 8);
  const bodyHeight = Math.min(35, wrappedBody.length * 5 + 8);
  
  doc.setFillColor(...COLORS.white);
  doc.setDrawColor(...COLORS.beigeOscuro);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, y, contentWidth, bodyHeight, 2, 2, 'FD');
  
  doc.setTextColor(...COLORS.azulMarino);
  doc.setFont('helvetica', 'normal');
  
  let bodyY = y + 6;
  const maxLines = Math.floor((bodyHeight - 6) / 5);
  for (let i = 0; i < Math.min(wrappedBody.length, maxLines); i++) {
    doc.text(wrappedBody[i], margin + 4, bodyY);
    bodyY += 5;
  }
  
  y += bodyHeight + 8;
  
  // Próximos pasos
  drawSectionTitle(doc, margin, y, 'Próximos Pasos');
  y += 10;
  
  doc.setFillColor(...COLORS.verdeOliva);
  doc.roundedRect(margin, y, contentWidth, 42, 3, 3, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  
  const steps = [
    '1. Validar los supuestos y parámetros del análisis',
    '2. Identificar procesos candidatos para optimización',
    '3. Evaluar soluciones tecnológicas disponibles',
    '4. Desarrollar un plan de implementación detallado',
    '5. Contactar a Alternative para una consultoría gratuita'
  ];
  
  let stepY = y + 7;
  for (const step of steps) {
    doc.text(step, margin + 5, stepY);
    stepY += 7;
  }
  
  y += 50;
  
  // Call to action - posición fija cerca del final pero sin superponerse
  const ctaY = Math.max(y, pageHeight - 55);
  doc.setFillColor(...COLORS.azulMarino);
  doc.roundedRect(margin, ctaY, contentWidth, 26, 3, 3, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('¿Listo para optimizar tus procesos?', pageWidth / 2, ctaY + 10, { align: 'center' });
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('Contáctanos para una consultoría gratuita y comienza a ahorrar', pageWidth / 2, ctaY + 19, { align: 'center' });
  
  drawFooter(doc, 2);
}
