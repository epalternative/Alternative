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
  beige: [252, 247, 243] as [number, number, number],
  beigeOscuro: [197, 192, 170] as [number, number, number],
  white: [255, 255, 255] as [number, number, number],
  lightGray: [240, 240, 240] as [number, number, number],
  success: [40, 167, 69] as [number, number, number],
  warning: [255, 193, 7] as [number, number, number],
  danger: [220, 53, 69] as [number, number, number],
};

function drawHeader(doc: jsPDF, title: string, subtitle: string) {
  const pageWidth = doc.internal.pageSize.width;
  
  // Fondo azul marino en el header
  doc.setFillColor(...COLORS.azulMarino);
  doc.rect(0, 0, pageWidth, 45, 'F');
  
  // Logo/Nombre de la empresa
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('ALTERNATIVE', pageWidth / 2, 18, { align: 'center' });
  
  // Título del reporte
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(title, pageWidth / 2, 30, { align: 'center' });
  
  // Subtítulo
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(subtitle, pageWidth / 2, 38, { align: 'center' });
}

function drawFooter(doc: jsPDF, pageNumber: number) {
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  
  // Línea superior
  doc.setDrawColor(...COLORS.beigeOscuro);
  doc.setLineWidth(0.5);
  doc.line(20, pageHeight - 20, pageWidth - 20, pageHeight - 20);
  
  // Texto del footer
  doc.setTextColor(...COLORS.azulMarino);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('www.grupoalternative.com | info@grupoalternative.com', pageWidth / 2, pageHeight - 12, { align: 'center' });
  
  // Número de página
  doc.setFontSize(8);
  doc.setTextColor(...COLORS.beigeOscuro);
  doc.text(`Página ${pageNumber}`, pageWidth - 20, pageHeight - 12, { align: 'right' });
}

function drawSectionTitle(doc: jsPDF, x: number, y: number, title: string) {
  doc.setFillColor(...COLORS.verdeOliva);
  doc.rect(x, y, 3, 8, 'F');
  
  doc.setTextColor(...COLORS.azulMarino);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text(title, x + 6, y + 6);
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
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text(label, x + width / 2, y + 8, { align: 'center' });
  
  // Value
  doc.setTextColor(...COLORS.azulMarino);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(value, x + width / 2, y + 18, { align: 'center' });
}

function drawRoiGauge(doc: jsPDF, x: number, y: number, roi: number, size: number = 50) {
  const centerX = x + size / 2;
  const centerY = y + size / 2;
  const radius = size / 2 - 2;
  
  // Determinar color según ROI
  let color: [number, number, number];
  let bgColor: [number, number, number];
  
  if (roi > 200) {
    color = COLORS.success;
    bgColor = [232, 245, 233]; // Verde claro
  } else if (roi >= 100) {
    color = COLORS.verdeOliva;
    bgColor = [240, 244, 233]; // Verde oliva claro
  } else if (roi >= 50) {
    color = COLORS.warning;
    bgColor = [255, 248, 225]; // Amarillo claro
  } else {
    color = COLORS.danger;
    bgColor = [255, 235, 238]; // Rojo claro
  }
  
  // Fondo del círculo
  doc.setFillColor(...bgColor);
  doc.circle(centerX, centerY, radius, 'F');
  
  // Borde
  doc.setDrawColor(...color);
  doc.setLineWidth(3);
  doc.circle(centerX, centerY, radius - 2, 'S');
  
  // Texto del ROI
  doc.setTextColor(...color);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  const roiText = roi > 999 ? '999+' : Math.round(roi).toString();
  doc.text(roiText, centerX, centerY - 2, { align: 'center' });
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('%', centerX, centerY + 6, { align: 'center' });
  
  doc.setFontSize(8);
  doc.text('ROI', centerX, centerY + 13, { align: 'center' });
}

function drawComparisonBars(
  doc: jsPDF,
  x: number,
  y: number,
  width: number,
  label1: string,
  value1: number,
  label2: string,
  value2: number,
  unit: string
) {
  const barHeight = 12;
  const maxValue = Math.max(value1, value2);
  const maxBarWidth = width - 80;
  
  // Barra 1 (actual)
  doc.setTextColor(...COLORS.azulMarino);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(label1, x, y + 7);
  
  const bar1Width = (value1 / maxValue) * maxBarWidth;
  doc.setFillColor(220, 53, 69); // Rojo
  doc.roundedRect(x + 70, y, bar1Width, barHeight, 2, 2, 'F');
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text(`${formatCurrency(value1)} ${unit}`, x + width - 5, y + 7, { align: 'right' });
  
  // Barra 2 (optimizado)
  y += 18;
  doc.setFont('helvetica', 'normal');
  doc.text(label2, x, y + 7);
  
  const bar2Width = (value2 / maxValue) * maxBarWidth;
  doc.setFillColor(...COLORS.success);
  doc.roundedRect(x + 70, y, bar2Width, barHeight, 2, 2, 'F');
  
  doc.setFont('helvetica', 'bold');
  doc.text(`${formatCurrency(value2)} ${unit}`, x + width - 5, y + 7, { align: 'right' });
  
  // Flecha de ahorro
  y += 18;
  const savings = value1 - value2;
  const savingsPct = ((savings / value1) * 100).toFixed(0);
  
  doc.setFillColor(...COLORS.success);
  doc.roundedRect(x, y, width, 10, 2, 2, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text(`AHORRO: ${formatCurrency(savings)} ${unit} (-${savingsPct}%)`, x + width / 2, y + 7, { align: 'center' });
}

function drawInfoTable(
  doc: jsPDF,
  x: number,
  y: number,
  width: number,
  rows: Array<{ label: string; value: string }>
) {
  const rowHeight = 10;
  const colWidth = width / 2;
  
  rows.forEach((row, index) => {
    const currentY = y + index * rowHeight;
    
    // Fondo alternado
    if (index % 2 === 0) {
      doc.setFillColor(...COLORS.beige);
      doc.rect(x, currentY, width, rowHeight, 'F');
    }
    
    // Label
    doc.setTextColor(...COLORS.verdeOliva);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text(row.label, x + 3, currentY + 6.5);
    
    // Value
    doc.setTextColor(...COLORS.azulMarino);
    doc.setFont('helvetica', 'normal');
    doc.text(row.value, x + colWidth + 3, currentY + 6.5);
  });
  
  // Borde de la tabla
  doc.setDrawColor(...COLORS.beigeOscuro);
  doc.setLineWidth(0.5);
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

export function generateRoiOptimizationPdf(doc: jsPDF, data: PdfData): void {
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  const margin = 20;
  const contentWidth = pageWidth - 2 * margin;
  
  // ===== PÁGINA 1: Resumen Ejecutivo =====
  drawHeader(doc, data.translations.title, data.translations.subtitle);
  
  let y = 55;
  
  // Información del proceso
  if (data.formState?.processName) {
    doc.setFillColor(...COLORS.beige);
    doc.roundedRect(margin, y, contentWidth, 12, 3, 3, 'F');
    
    doc.setTextColor(...COLORS.azulMarino);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(`${data.translations.processName}: `, margin + 5, y + 8);
    
    doc.setFont('helvetica', 'normal');
    doc.text(data.formState.processName, margin + 50, y + 8);
    
    y += 18;
  }
  
  // ROI Principal y métricas clave
  drawSectionTitle(doc, margin, y, 'Resultados del Analisis');
  y += 15;
  
  // ROI Gauge centrado
  const gaugeSize = 50;
  const gaugeX = pageWidth / 2 - gaugeSize / 2;
  drawRoiGauge(doc, gaugeX, y, data.results.roi, gaugeSize);
  
  y += gaugeSize + 15;
  
  // Métricas en cajas
  const boxWidth = (contentWidth - 10) / 3;
  
  drawMetricBox(
    doc,
    margin,
    y,
    boxWidth,
    25,
    data.translations.annualSavings,
    formatCurrency(data.results.ahorroAnual)
  );
  
  drawMetricBox(
    doc,
    margin + boxWidth + 5,
    y,
    boxWidth,
    25,
    data.translations.payback,
    `${formatNumber(data.results.paybackMeses, 1)} ${data.translations.months}`
  );
  
  drawMetricBox(
    doc,
    margin + 2 * (boxWidth + 5),
    y,
    boxWidth,
    25,
    data.translations.reduction,
    `${formatNumber(data.results.reduccionPct, 0)}%`
  );
  
  y += 35;
  
  // Comparación de costos
  drawSectionTitle(doc, margin, y, data.translations.currentSituation + ' vs ' + data.translations.optimizedScenario);
  y += 15;
  
  drawComparisonBars(
    doc,
    margin,
    y,
    contentWidth,
    data.translations.currentCost,
    data.results.costoAnual,
    data.translations.optimizedCost,
    data.results.costoOptimizado,
    ''
  );
  
  y += 55;
  
  // Parámetros de entrada
  if (data.formState) {
    drawSectionTitle(doc, margin, y, 'Parametros del Analisis');
    y += 12;
    
    const frecuenciaMap: Record<string, string> = {
      hora: 'por hora',
      dia: 'por día',
      semana: 'por semana',
      mes: 'por mes',
      trimestre: 'por trimestre',
    };
    
    drawInfoTable(doc, margin, y, contentWidth, [
      { label: data.translations.volume, value: `${data.formState.volumen} ${frecuenciaMap[data.formState.frecuencia]}` },
      { label: data.translations.timeSpent, value: `${data.formState.tiempoMinutos} min` },
      { label: data.translations.people, value: `${data.formState.personas}` },
      { label: data.translations.hourCost, value: formatCurrency(data.formState.costoHora) },
      { label: data.translations.improvement, value: `${data.formState.mejoraPct}%` },
      { label: data.translations.projectCost, value: formatCurrency(data.formState.costoProyecto) },
    ]);
  }
  
  drawFooter(doc, 1);
  
  // ===== PÁGINA 2: Análisis Detallado y Recomendaciones =====
  doc.addPage();
  drawHeader(doc, data.translations.title, data.translations.subtitle);
  
  y = 55;
  
  // Beneficios proyectados
  drawSectionTitle(doc, margin, y, data.translations.benefits);
  y += 12;
  
  doc.setFillColor(...COLORS.beige);
  doc.roundedRect(margin, y, contentWidth, 50, 3, 3, 'F');
  
  doc.setTextColor(...COLORS.azulMarino);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  
  let benefitY = y + 10;
  
  // Volumen anual
  doc.setFont('helvetica', 'bold');
  doc.text(`${data.translations.executionsPerYear}:`, margin + 5, benefitY);
  doc.setFont('helvetica', 'normal');
  doc.text(formatNumber(data.results.volumenAnual, 0), margin + 80, benefitY);
  benefitY += 8;
  
  // Tiempo total actual
  doc.setFont('helvetica', 'bold');
  doc.text('Tiempo total actual:', margin + 5, benefitY);
  doc.setFont('helvetica', 'normal');
  doc.text(`${formatNumber(data.results.tiempoTotalHoras, 0)} ${data.translations.hours}`, margin + 80, benefitY);
  benefitY += 8;
  
  // Tiempo optimizado
  doc.setFont('helvetica', 'bold');
  doc.text('Tiempo optimizado:', margin + 5, benefitY);
  doc.setFont('helvetica', 'normal');
  doc.text(`${formatNumber(data.results.tiempoOptimizadoHoras, 0)} ${data.translations.hours}`, margin + 80, benefitY);
  benefitY += 8;
  
  // Beneficio año 1
  doc.setFont('helvetica', 'bold');
  doc.text(`${data.translations.benefit1Year}:`, margin + 5, benefitY);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...COLORS.success);
  doc.text(formatCurrency(data.results.beneficioAno1), margin + 80, benefitY);
  benefitY += 8;
  
  // Beneficio 3 años
  doc.setTextColor(...COLORS.azulMarino);
  doc.setFont('helvetica', 'bold');
  doc.text(`${data.translations.benefit3Years}:`, margin + 5, benefitY);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...COLORS.success);
  doc.text(formatCurrency(data.results.beneficio3Anos), margin + 80, benefitY);
  
  y += 60;
  
  // Recomendación
  drawSectionTitle(doc, margin, y, data.translations.recommendation);
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
  
  doc.setFillColor(...recColor);
  doc.roundedRect(margin, y, contentWidth, 15, 3, 3, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text(data.recommendation.title, pageWidth / 2, y + 10, { align: 'center' });
  
  y += 20;
  
  // Cuerpo de la recomendación
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(...COLORS.beigeOscuro);
  doc.setLineWidth(0.5);
  doc.roundedRect(margin, y, contentWidth, 45, 3, 3, 'FD');
  
  doc.setTextColor(...COLORS.azulMarino);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  
  const wrappedBody = wrapText(doc, data.recommendation.body, contentWidth - 10);
  let bodyY = y + 8;
  for (const line of wrappedBody.slice(0, 5)) {
    doc.text(line, margin + 5, bodyY);
    bodyY += 6;
  }
  
  y += 55;
  
  // Próximos pasos
  drawSectionTitle(doc, margin, y, data.translations.nextSteps);
  y += 12;
  
  doc.setFillColor(...COLORS.verdeOliva);
  doc.roundedRect(margin, y, contentWidth, 50, 3, 3, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  
  const steps = [
    '1. Validar los supuestos y parámetros del análisis',
    '2. Identificar procesos candidatos para optimización',
    '3. Evaluar soluciones tecnológicas disponibles',
    '4. Desarrollar un plan de implementación detallado',
    '5. Contactar a Alternative para una consultoría gratuita'
  ];
  
  let stepY = y + 8;
  for (const step of steps) {
    doc.text(step, margin + 5, stepY);
    stepY += 9;
  }
  
  // Call to action
  y = pageHeight - 60;
  doc.setFillColor(...COLORS.azulMarino);
  doc.roundedRect(margin, y, contentWidth, 30, 3, 3, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('¿Listo para optimizar tus procesos?', pageWidth / 2, y + 12, { align: 'center' });
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Contáctanos para una consultoría gratuita y comienza a ahorrar', pageWidth / 2, y + 22, { align: 'center' });
  
  drawFooter(doc, 2);
}
