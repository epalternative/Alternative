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
  azulMarino: [19, 45, 84] as [number, number, number],
  verdeOliva: [113, 143, 78] as [number, number, number],
  turquesa: [108, 196, 212] as [number, number, number],
  violeta: [122, 105, 224] as [number, number, number],
  beige: [252, 247, 243] as [number, number, number],
  beigeOscuro: [197, 192, 170] as [number, number, number],
  white: [255, 255, 255] as [number, number, number],
  lightGray: [240, 240, 240] as [number, number, number],
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

function drawHeader(doc: jsPDF, title: string, logoBase64?: string | null) {
  const pageWidth = doc.internal.pageSize.width;
  
  // Fondo azul marino en el header
  doc.setFillColor(...COLORS.azulMarino);
  doc.rect(0, 0, pageWidth, 38, 'F');
  
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
  doc.setFont('helvetica', 'normal');
  doc.text(title, pageWidth / 2, 30, { align: 'center' });
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

function drawScoreGauge(doc: jsPDF, x: number, y: number, score: number, size: number = 40) {
  const centerX = x + size / 2;
  const centerY = y + size / 2;
  const radius = size / 2 - 2;
  
  // Fondo del círculo
  doc.setFillColor(...COLORS.lightGray);
  doc.circle(centerX, centerY, radius, 'F');
  
  // Color según score
  let color: [number, number, number];
  if (score < 25) color = [220, 53, 69];
  else if (score < 50) color = [255, 193, 7];
  else if (score < 75) color = [13, 202, 240];
  else color = COLORS.verdeOliva;
  
  // Borde de progreso
  doc.setDrawColor(...color);
  doc.setLineWidth(3);
  doc.circle(centerX, centerY, radius - 3, 'S');
  
  // Círculo blanco interior
  doc.setFillColor(...COLORS.white);
  doc.circle(centerX, centerY, radius - 6, 'F');
  
  // Texto del score
  doc.setTextColor(...COLORS.azulMarino);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(score.toString(), centerX, centerY - 1, { align: 'center' });
  
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.text('/100', centerX, centerY + 5, { align: 'center' });
}

function drawInfoBox(doc: jsPDF, x: number, y: number, width: number, label: string, value: string) {
  // Fondo beige
  doc.setFillColor(...COLORS.beige);
  doc.roundedRect(x, y, width, 11, 2, 2, 'F');
  
  // Label
  doc.setTextColor(...COLORS.verdeOliva);
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.text(label, x + 3, y + 4);
  
  // Value
  doc.setTextColor(...COLORS.azulMarino);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text(value, x + 3, y + 9);
}

function drawDimensionBar(
  doc: jsPDF,
  x: number,
  y: number,
  width: number,
  label: string,
  score: number
) {
  const barHeight = 7;
  const maxBarWidth = width - 55;
  const barWidth = (score / 100) * maxBarWidth;
  
  // Label
  doc.setTextColor(...COLORS.azulMarino);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(label, x, y + 5);
  
  // Barra de fondo
  doc.setFillColor(...COLORS.lightGray);
  doc.roundedRect(x + 50, y, maxBarWidth, barHeight, 2, 2, 'F');
  
  // Barra de progreso
  if (score > 0) {
    let color: [number, number, number];
    if (score < 25) color = [220, 53, 69];
    else if (score < 50) color = [255, 193, 7];
    else if (score < 75) color = [13, 202, 240];
    else color = COLORS.verdeOliva;
    
    doc.setFillColor(...color);
    doc.roundedRect(x + 50, y, barWidth, barHeight, 2, 2, 'F');
  }
  
  // Score text
  doc.setTextColor(...COLORS.azulMarino);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text(`${score}`, x + width - 10, y + 5);
}

function drawSectionTitle(doc: jsPDF, x: number, y: number, title: string) {
  doc.setFillColor(...COLORS.verdeOliva);
  doc.rect(x, y, 3, 7, 'F');
  
  doc.setTextColor(...COLORS.azulMarino);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text(title, x + 6, y + 5);
}

export async function generateMadurezDigitalPdf(doc: jsPDF, data: PdfData): Promise<void> {
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  const margin = 20;
  const contentWidth = pageWidth - 2 * margin;
  
  // Cargar logo
  const logoBase64 = await loadLogoAsBase64();
  
  // ===== PÁGINA 1: Resumen Ejecutivo =====
  drawHeader(doc, data.translations.title, logoBase64);
  
  let y = 46;
  
  // Información del cliente
  drawSectionTitle(doc, margin, y, data.translations.generatedFor);
  y += 12;
  
  const colWidth = contentWidth / 2 - 4;
  drawInfoBox(doc, margin, y, colWidth, 'Nombre', data.name);
  drawInfoBox(doc, margin + colWidth + 8, y, colWidth, 'Empresa', data.company);
  y += 14;
  
  drawInfoBox(doc, margin, y, colWidth, 'Email', data.email);
  drawInfoBox(doc, margin + colWidth + 8, y, colWidth, 'Teléfono', data.phone || 'N/A');
  y += 14;
  
  drawInfoBox(doc, margin, y, colWidth, data.translations.industryLabel, data.preliminary.industry);
  drawInfoBox(doc, margin + colWidth + 8, y, colWidth, data.translations.roleLabel, data.preliminary.role);
  y += 14;
  
  drawInfoBox(doc, margin, y, colWidth, data.translations.companySizeLabel, data.preliminary.companySize);
  drawInfoBox(doc, margin + colWidth + 8, y, colWidth, data.translations.date, new Date().toLocaleDateString('es-ES'));
  y += 20;
  
  // Score principal
  drawSectionTitle(doc, margin, y, 'Score de Madurez Digital');
  y += 12;
  
  // Gauge principal centrado
  const gaugeSize = 50;
  const gaugeX = pageWidth / 2 - gaugeSize / 2;
  drawScoreGauge(doc, gaugeX, y, data.scores.total, gaugeSize);
  
  // Nivel debajo del gauge
  y += gaugeSize + 8;
  doc.setFillColor(...COLORS.verdeOliva);
  const levelBoxWidth = 90;
  const levelBoxX = pageWidth / 2 - levelBoxWidth / 2;
  doc.roundedRect(levelBoxX, y, levelBoxWidth, 12, 2, 2, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text(data.translations.levelText, pageWidth / 2, y + 8, { align: 'center' });
  
  y += 18;
  
  // Benchmark
  if (data.scores.benchmark > 0) {
    doc.setFillColor(...COLORS.beige);
    doc.roundedRect(margin, y, contentWidth, 22, 3, 3, 'F');
    
    doc.setTextColor(...COLORS.azulMarino);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    
    const benchmarkText = `${data.translations.industryBenchmark}: ${data.scores.benchmark}/100`;
    const diffText = data.scores.benchmarkDiff >= 0 
      ? `(+${data.scores.benchmarkDiff} puntos sobre el promedio)` 
      : `(${data.scores.benchmarkDiff} puntos bajo el promedio)`;
    
    doc.text(benchmarkText, pageWidth / 2, y + 8, { align: 'center' });
    
    doc.setFontSize(8);
    doc.setTextColor(...COLORS.verdeOliva);
    doc.text(diffText, pageWidth / 2, y + 16, { align: 'center' });
    
    y += 28;
  } else {
    y += 5;
  }
  
  // Dimensiones
  drawSectionTitle(doc, margin, y, data.translations.dimensions);
  y += 12;
  
  drawDimensionBar(doc, margin, y, contentWidth, data.translations.dimensionStrategy, data.scores.dimensions.strategy);
  y += 12;
  
  drawDimensionBar(doc, margin, y, contentWidth, data.translations.dimensionChannels, data.scores.dimensions.channels);
  y += 12;
  
  drawDimensionBar(doc, margin, y, contentWidth, data.translations.dimensionData, data.scores.dimensions.data);
  y += 12;
  
  drawDimensionBar(doc, margin, y, contentWidth, data.translations.dimensionTech, data.scores.dimensions.tech);
  
  drawFooter(doc, 1);
  
  // ===== PÁGINA 2: Fortalezas y Oportunidades =====
  doc.addPage();
  drawHeader(doc, data.translations.title, logoBase64);
  
  y = 46;
  
  // Fortalezas
  drawSectionTitle(doc, margin, y, data.translations.strengthsTitle);
  y += 10;
  
  if (data.scores.strongest.length > 0) {
    doc.setFillColor(...COLORS.beige);
    doc.roundedRect(margin, y, contentWidth, 35, 3, 3, 'F');
    
    doc.setFontSize(9);
    let strengthY = y + 8;
    
    for (const strength of data.scores.strongest.slice(0, 3)) {
      const dimensionName = 
        strength.id === 'strategy' ? data.translations.dimensionStrategy :
        strength.id === 'channels' ? data.translations.dimensionChannels :
        strength.id === 'data' ? data.translations.dimensionData :
        data.translations.dimensionTech;
      
      doc.setTextColor(...COLORS.azulMarino);
      doc.setFont('helvetica', 'bold');
      doc.text(`• ${dimensionName}:`, margin + 5, strengthY);
      
      doc.setFont('helvetica', 'normal');
      doc.text(`${strength.score}/100`, margin + 65, strengthY);
      
      strengthY += 9;
    }
    
    y += 42;
  } else {
    y += 10;
  }
  
  // Oportunidades
  drawSectionTitle(doc, margin, y, data.translations.opportunitiesTitle);
  y += 10;
  
  if (data.scores.weakest.length > 0) {
    doc.setFillColor(255, 243, 224);
    doc.roundedRect(margin, y, contentWidth, 35, 3, 3, 'F');
    
    doc.setFontSize(9);
    let weakY = y + 8;
    
    for (const weak of data.scores.weakest.slice(0, 3)) {
      const dimensionName = 
        weak.id === 'strategy' ? data.translations.dimensionStrategy :
        weak.id === 'channels' ? data.translations.dimensionChannels :
        weak.id === 'data' ? data.translations.dimensionData :
        data.translations.dimensionTech;
      
      doc.setTextColor(...COLORS.azulMarino);
      doc.setFont('helvetica', 'bold');
      doc.text(`• ${dimensionName}:`, margin + 5, weakY);
      
      doc.setFont('helvetica', 'normal');
      doc.text(`${weak.score}/100`, margin + 65, weakY);
      
      weakY += 9;
    }
    
    y += 42;
  } else {
    y += 10;
  }
  
  // Recomendaciones
  drawSectionTitle(doc, margin, y, 'Próximos Pasos Recomendados');
  y += 10;
  
  doc.setFillColor(...COLORS.verdeOliva);
  doc.roundedRect(margin, y, contentWidth, 50, 3, 3, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  
  const recommendations = [
    '1. Priorizar las áreas de oportunidad identificadas',
    '2. Desarrollar un roadmap de transformación digital',
    '3. Asignar recursos y presupuesto a iniciativas clave',
    '4. Establecer KPIs para medir el progreso',
    '5. Considerar consultoría estratégica para acelerar resultados'
  ];
  
  let recY = y + 9;
  for (const rec of recommendations) {
    doc.text(rec, margin + 5, recY);
    recY += 8;
  }
  
  y += 58;
  
  // Call to action
  const ctaY = Math.max(y, pageHeight - 50);
  doc.setFillColor(...COLORS.azulMarino);
  doc.roundedRect(margin, ctaY, contentWidth, 26, 3, 3, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('¿Listo para acelerar tu transformación digital?', pageWidth / 2, ctaY + 10, { align: 'center' });
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('Contáctanos para una consultoría estratégica gratuita', pageWidth / 2, ctaY + 19, { align: 'center' });
  
  drawFooter(doc, 2);
}
