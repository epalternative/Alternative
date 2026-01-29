import type { jsPDF } from 'jspdf';
import type { MadurezScores, PreliminaryAnswers } from '@/lib/calculators/madurez-digital';

interface PdfData {
  name: string;
  company: string;
  email: string;
  phone: string;
  scores: MadurezScores;
  preliminary: PreliminaryAnswers;
  translations: {
    title: string;
    score: string;
    level: string;
    dimensions: string;
    levelText: string;
    industryLabel: string;
    roleLabel: string;
    companySizeLabel: string;
    dimensionStrategy: string;
    dimensionChannels: string;
    dimensionData: string;
    dimensionTech: string;
    strengthsTitle: string;
    opportunitiesTitle: string;
    industryBenchmark: string;
    generatedFor: string;
    date: string;
  };
}

// Colores de la marca
const COLORS = {
  azulMarino: [19, 45, 84] as [number, number, number],      // #132d54
  verdeOliva: [113, 143, 78] as [number, number, number],    // #718f4e
  beige: [252, 247, 243] as [number, number, number],        // #fcf7f3
  beigeOscuro: [197, 192, 170] as [number, number, number],  // #c5c0aa
  white: [255, 255, 255] as [number, number, number],
  lightGray: [240, 240, 240] as [number, number, number],
};

function drawHeader(doc: jsPDF, title: string) {
  const pageWidth = doc.internal.pageSize.width;
  
  // Fondo azul marino en el header
  doc.setFillColor(...COLORS.azulMarino);
  doc.rect(0, 0, pageWidth, 40, 'F');
  
  // Logo/Nombre de la empresa
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('ALTERNATIVE', pageWidth / 2, 18, { align: 'center' });
  
  // Título del reporte
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.text(title, pageWidth / 2, 30, { align: 'center' });
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
  doc.text('www.grupoalternative.com', pageWidth / 2, pageHeight - 12, { align: 'center' });
  
  // Número de página
  doc.setFontSize(8);
  doc.setTextColor(...COLORS.beigeOscuro);
  doc.text(`Página ${pageNumber}`, pageWidth - 20, pageHeight - 12, { align: 'right' });
}

function drawScoreGauge(doc: jsPDF, x: number, y: number, score: number, size: number = 40) {
  const centerX = x + size / 2;
  const centerY = y + size / 2;
  const radius = size / 2 - 2;
  
  // Fondo del círculo
  doc.setFillColor(...COLORS.lightGray);
  doc.circle(centerX, centerY, radius, 'F');
  
  // Círculo de progreso
  const angle = (score / 100) * 360;
  let color: [number, number, number];
  
  if (score < 25) color = [220, 53, 69];      // Rojo
  else if (score < 50) color = [255, 193, 7]; // Amarillo
  else if (score < 75) color = [13, 202, 240]; // Azul claro
  else color = COLORS.verdeOliva;              // Verde oliva
  
  doc.setFillColor(...color);
  
  // Dibujar arco de progreso
  if (score > 0) {
    const startAngle = -90;
    const endAngle = startAngle + angle;
    
    // Aproximación del arco con líneas
    const segments = Math.max(20, Math.floor(angle / 5));
    for (let i = 0; i <= segments; i++) {
      const currentAngle = startAngle + (angle * i / segments);
      const rad = (currentAngle * Math.PI) / 180;
      const x1 = centerX + (radius - 3) * Math.cos(rad);
      const y1 = centerY + (radius - 3) * Math.sin(rad);
      doc.circle(x1, y1, 2, 'F');
    }
  }
  
  // Círculo blanco interior
  doc.setFillColor(...COLORS.white);
  doc.circle(centerX, centerY, radius - 6, 'F');
  
  // Texto del score
  doc.setTextColor(...COLORS.azulMarino);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text(score.toString(), centerX, centerY - 2, { align: 'center' });
  
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('/100', centerX, centerY + 5, { align: 'center' });
}

function drawInfoBox(doc: jsPDF, x: number, y: number, width: number, label: string, value: string) {
  // Fondo beige
  doc.setFillColor(...COLORS.beige);
  doc.roundedRect(x, y, width, 12, 2, 2, 'F');
  
  // Label
  doc.setTextColor(...COLORS.verdeOliva);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text(label, x + 3, y + 5);
  
  // Value
  doc.setTextColor(...COLORS.azulMarino);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(value, x + 3, y + 9.5);
}

function drawDimensionBar(
  doc: jsPDF,
  x: number,
  y: number,
  width: number,
  label: string,
  score: number
) {
  const barHeight = 8;
  const maxBarWidth = width - 60;
  const barWidth = (score / 100) * maxBarWidth;
  
  // Label
  doc.setTextColor(...COLORS.azulMarino);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(label, x, y + 5);
  
  // Barra de fondo
  doc.setFillColor(...COLORS.lightGray);
  doc.roundedRect(x + 60, y, maxBarWidth, barHeight, 2, 2, 'F');
  
  // Barra de progreso
  if (score > 0) {
    let color: [number, number, number];
    if (score < 25) color = [220, 53, 69];
    else if (score < 50) color = [255, 193, 7];
    else if (score < 75) color = [13, 202, 240];
    else color = COLORS.verdeOliva;
    
    doc.setFillColor(...color);
    doc.roundedRect(x + 60, y, barWidth, barHeight, 2, 2, 'F');
  }
  
  // Score text
  doc.setTextColor(...COLORS.azulMarino);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text(`${score}`, x + width - 15, y + 5.5);
}

function drawSectionTitle(doc: jsPDF, x: number, y: number, title: string) {
  doc.setFillColor(...COLORS.verdeOliva);
  doc.rect(x, y, 3, 8, 'F');
  
  doc.setTextColor(...COLORS.azulMarino);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text(title, x + 6, y + 6);
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

export function generateMadurezDigitalPdf(doc: jsPDF, data: PdfData): void {
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  const margin = 20;
  const contentWidth = pageWidth - 2 * margin;
  
  // ===== PÁGINA 1: Resumen Ejecutivo =====
  drawHeader(doc, data.translations.title);
  
  let y = 50;
  
  // Información del cliente
  drawSectionTitle(doc, margin, y, data.translations.generatedFor);
  y += 15;
  
  const colWidth = contentWidth / 2 - 5;
  drawInfoBox(doc, margin, y, colWidth, 'Nombre', data.name);
  drawInfoBox(doc, margin + colWidth + 10, y, colWidth, 'Empresa', data.company);
  y += 15;
  
  drawInfoBox(doc, margin, y, colWidth, 'Email', data.email);
  drawInfoBox(doc, margin + colWidth + 10, y, colWidth, 'Teléfono', data.phone || 'N/A');
  y += 15;
  
  drawInfoBox(doc, margin, y, colWidth, data.translations.industryLabel, data.preliminary.industry);
  drawInfoBox(doc, margin + colWidth + 10, y, colWidth, data.translations.roleLabel, data.preliminary.role);
  y += 15;
  
  drawInfoBox(doc, margin, y, colWidth, data.translations.companySizeLabel, data.preliminary.companySize);
  drawInfoBox(doc, margin + colWidth + 10, y, colWidth, data.translations.date, new Date().toLocaleDateString('es-ES'));
  y += 25;
  
  // Score principal
  drawSectionTitle(doc, margin, y, 'Score de Madurez Digital');
  y += 15;
  
  // Gauge principal centrado
  const gaugeSize = 60;
  const gaugeX = pageWidth / 2 - gaugeSize / 2;
  drawScoreGauge(doc, gaugeX, y, data.scores.total, gaugeSize);
  
  // Nivel debajo del gauge
  y += gaugeSize + 10;
  doc.setFillColor(...COLORS.verdeOliva);
  const levelBoxWidth = 100;
  const levelBoxX = pageWidth / 2 - levelBoxWidth / 2;
  doc.roundedRect(levelBoxX, y, levelBoxWidth, 15, 3, 3, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(data.translations.levelText, pageWidth / 2, y + 10, { align: 'center' });
  
  y += 25;
  
  // Benchmark
  if (data.scores.benchmark > 0) {
    doc.setFillColor(...COLORS.beige);
    doc.roundedRect(margin, y, contentWidth, 26, 3, 3, 'F');
    
    doc.setTextColor(...COLORS.azulMarino);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    
    const benchmarkText = `${data.translations.industryBenchmark}: ${data.scores.benchmark}/100`;
    const diffText = data.scores.benchmarkDiff >= 0 
      ? `(+${data.scores.benchmarkDiff} puntos sobre el promedio)` 
      : `(${data.scores.benchmarkDiff} puntos bajo el promedio)`;
    
    doc.text(benchmarkText, pageWidth / 2, y + 10, { align: 'center' });
    
    doc.setFontSize(9);
    doc.setTextColor(...COLORS.verdeOliva);
    doc.text(diffText, pageWidth / 2, y + 19, { align: 'center' });
  }
  
  y += 35;
  
  // Dimensiones
  drawSectionTitle(doc, margin, y, data.translations.dimensions);
  y += 15;
  
  drawDimensionBar(doc, margin, y, contentWidth, data.translations.dimensionStrategy, data.scores.dimensions.strategy);
  y += 15;
  
  drawDimensionBar(doc, margin, y, contentWidth, data.translations.dimensionChannels, data.scores.dimensions.channels);
  y += 15;
  
  drawDimensionBar(doc, margin, y, contentWidth, data.translations.dimensionData, data.scores.dimensions.data);
  y += 15;
  
  drawDimensionBar(doc, margin, y, contentWidth, data.translations.dimensionTech, data.scores.dimensions.tech);
  
  drawFooter(doc, 1);
  
  // ===== PÁGINA 2: Fortalezas y Oportunidades =====
  doc.addPage();
  drawHeader(doc, data.translations.title);
  
  y = 50;
  
  // Fortalezas
  drawSectionTitle(doc, margin, y, data.translations.strengthsTitle);
  y += 12;
  
  if (data.scores.strongest.length > 0) {
    doc.setFillColor(...COLORS.beige);
    doc.roundedRect(margin, y, contentWidth, 40, 3, 3, 'F');
    
    doc.setTextColor(...COLORS.azulMarino);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    
    let strengthY = y + 8;
    for (const strength of data.scores.strongest.slice(0, 3)) {
      const dimensionName = 
        strength.id === 'strategy' ? data.translations.dimensionStrategy :
        strength.id === 'channels' ? data.translations.dimensionChannels :
        strength.id === 'data' ? data.translations.dimensionData :
        data.translations.dimensionTech;
      
      doc.setFont('helvetica', 'bold');
      doc.text(`• ${dimensionName}:`, margin + 5, strengthY);
      
      doc.setFont('helvetica', 'normal');
      doc.text(`${strength.score}/100`, margin + 70, strengthY);
      
      strengthY += 10;
    }
  }
  
  y += 50;
  
  // Oportunidades
  drawSectionTitle(doc, margin, y, data.translations.opportunitiesTitle);
  y += 12;
  
  if (data.scores.weakest.length > 0) {
    doc.setFillColor(255, 243, 224); // Naranja claro
    doc.roundedRect(margin, y, contentWidth, 40, 3, 3, 'F');
    
    doc.setTextColor(...COLORS.azulMarino);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    
    let weakY = y + 8;
    for (const weak of data.scores.weakest.slice(0, 3)) {
      const dimensionName = 
        weak.id === 'strategy' ? data.translations.dimensionStrategy :
        weak.id === 'channels' ? data.translations.dimensionChannels :
        weak.id === 'data' ? data.translations.dimensionData :
        data.translations.dimensionTech;
      
      doc.setFont('helvetica', 'bold');
      doc.text(`• ${dimensionName}:`, margin + 5, weakY);
      
      doc.setFont('helvetica', 'normal');
      doc.text(`${weak.score}/100`, margin + 70, weakY);
      
      weakY += 10;
    }
  }
  
  y += 55;
  
  // Recomendaciones
  drawSectionTitle(doc, margin, y, 'Próximos Pasos Recomendados');
  y += 12;
  
  doc.setFillColor(...COLORS.verdeOliva);
  doc.roundedRect(margin, y, contentWidth, 60, 3, 3, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  
  const recommendations = [
    '1. Priorizar las áreas de oportunidad identificadas',
    '2. Desarrollar un roadmap de transformación digital',
    '3. Asignar recursos y presupuesto a iniciativas clave',
    '4. Establecer KPIs para medir el progreso',
    '5. Considerar consultoría estratégica para acelerar resultados'
  ];
  
  let recY = y + 10;
  for (const rec of recommendations) {
    doc.text(rec, margin + 5, recY);
    recY += 10;
  }
  
  // Call to action
  y = pageHeight - 60;
  doc.setFillColor(...COLORS.azulMarino);
  doc.roundedRect(margin, y, contentWidth, 30, 3, 3, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('¿Listo para acelerar tu transformación digital?', pageWidth / 2, y + 12, { align: 'center' });
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Contáctanos para una consultoría estratégica gratuita', pageWidth / 2, y + 22, { align: 'center' });
  
  drawFooter(doc, 2);
}
