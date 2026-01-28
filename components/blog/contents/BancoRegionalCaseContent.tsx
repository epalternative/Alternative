import React from 'react';
import Link from 'next/link';
import { ChevronRight, CheckCircle2 } from 'lucide-react';
import type { TocItem } from '../BlogPostLayout';

export const BANCO_REGIONAL_TOC: TocItem[] = [
  { id: 'resumen-ejecutivo', label: 'Resumen ejecutivo', labelEn: 'Executive summary', level: 2 },
  { id: 'el-desafio', label: 'El desafío: procesos lentos en era digital', labelEn: 'The challenge: slow processes in the digital era', level: 2 },
  { id: 'la-solucion', label: 'La solución: metodología BPM en 4 fases', labelEn: 'The solution: BPM methodology in 4 phases', level: 2 },
  { id: 'resultados-medibles', label: 'Resultados medibles', labelEn: 'Measurable results', level: 2 },
  { id: 'lecciones-aprendidas', label: 'Lecciones aprendidas', labelEn: 'Lessons learned', level: 2 },
  { id: 'cta', label: '¿Tu banco enfrenta desafíos similares?', labelEn: 'Does your bank face similar challenges?', level: 2 },
];

interface BancoRegionalCaseContentProps {
  locale: 'es' | 'en';
}

export function BancoRegionalCaseContent({ locale }: BancoRegionalCaseContentProps) {
  const isEs = locale === 'es';

  return (
    <div className="blog-prose">
      {/* Resumen ejecutivo - box destacado */}
      <section id="resumen-ejecutivo">
        <h2>{isEs ? 'Resumen ejecutivo' : 'Executive summary'}</h2>
        <div className="not-prose my-8 rounded-2xl border border-turquesa/30 bg-gradient-to-br from-turquesa/10 to-menta/10 dark:from-turquesa/15 dark:to-menta/15 p-6 md:p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-body-sm font-semibold text-turquesa mb-2">{isEs ? 'Cliente' : 'Client'}</p>
              <p className="text-azul-marino dark:text-white font-medium">Banco Regional (Panamá)</p>
              <p className="text-body-sm text-azul-marino/70 dark:text-white/70 mt-4">{isEs ? 'Industria:' : 'Industry:'} {isEs ? 'Banca y Servicios Financieros' : 'Banking and Financial Services'}</p>
              <p className="text-body-sm text-azul-marino/70 dark:text-white/70">{isEs ? 'Activos:' : 'Assets:'} $500M+</p>
              <p className="text-body-sm text-azul-marino/70 dark:text-white/70">{isEs ? 'Empleados:' : 'Employees:'} 250</p>
            </div>
            <div>
              <p className="text-body-sm font-semibold text-turquesa mb-2">{isEs ? 'Desafío' : 'Challenge'}</p>
              <p className="text-azul-marino dark:text-white">{isEs ? 'Tiempos de procesamiento de créditos excesivos (12 días promedio) generando pérdida de clientes a competencia digital.' : 'Excessive credit processing times (12 days average) causing customer loss to digital competitors.'}</p>
              <p className="text-body-sm font-semibold text-turquesa mt-4 mb-2">{isEs ? 'Solución' : 'Solution'}</p>
              <p className="text-azul-marino dark:text-white">{isEs ? 'Implementación BPM + automatización de procesos core.' : 'BPM implementation + core process automation.'}</p>
              <p className="text-body-sm text-azul-marino/70 dark:text-white/70 mt-2">{isEs ? 'Plazo: 6 meses (Oct 2023 - Mar 2024)' : 'Timeframe: 6 months (Oct 2023 - Mar 2024)'}</p>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-turquesa/20">
            <p className="text-body-sm font-semibold text-turquesa mb-4">{isEs ? 'Resultados' : 'Results'}</p>
            <ul className="space-y-2">
              {[
                isEs ? 'Reducción 40% tiempos procesamiento (12 días → 7 días)' : '40% reduction in processing times (12 days → 7 days)',
                isEs ? 'Reducción 35% costos operacionales área créditos' : '35% reduction in credit area operational costs',
                isEs ? 'Incremento 60% satisfacción clientes (NPS 42 → 68)' : '60% increase in customer satisfaction (NPS 42 → 68)',
                isEs ? 'Reducción 45% errores de proceso' : '45% reduction in process errors',
                isEs ? 'ROI 380% en 12 meses' : '380% ROI in 12 months',
              ].map((text, i) => (
                <li key={i} className="flex items-center gap-2 text-azul-marino dark:text-white">
                  <CheckCircle2 className="w-5 h-5 text-turquesa shrink-0" />
                  {text}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6 flex flex-wrap gap-6 text-body-sm">
            <span><strong className="text-turquesa">{isEs ? 'Inversión:' : 'Investment:'}</strong> $45,000</span>
            <span><strong className="text-turquesa">{isEs ? 'Ahorros anuales:' : 'Annual savings:'}</strong> $168,000</span>
          </div>
        </div>
        <hr />
      </section>

      {/* 1. El desafío */}
      <section id="el-desafio">
        <h2>{isEs ? '1. El desafío: procesos lentos en era digital' : '1. The challenge: slow processes in the digital era'}</h2>
        <h3>{isEs ? 'Situación inicial (septiembre 2023)' : 'Initial situation (September 2023)'}</h3>
        <p>
          {isEs
            ? 'Banco Regional, institución financiera panameña con 30 años en el mercado, enfrentaba un problema crítico: clientes se iban a bancos digitales porque tardar 12 días en aprobar un crédito era inaceptable en 2023.'
            : 'Banco Regional, a Panamanian financial institution with 30 years in the market, faced a critical problem: customers were leaving for digital banks because waiting 12 days for credit approval was unacceptable in 2023.'}
        </p>

        <h3>{isEs ? 'Síntomas del problema' : 'Symptoms of the problem'}</h3>
        <p><strong>{isEs ? 'Operacionales:' : 'Operational:'}</strong></p>
        <ul>
          <li>{isEs ? 'Proceso aprobación créditos personales: 12 días promedio' : 'Personal credit approval process: 12 days average'}</li>
          <li>{isEs ? '8 aprobaciones manuales (6 redundantes)' : '8 manual approvals (6 redundant)'}</li>
          <li>{isEs ? 'Verificación de ingresos: 3-4 días (manual)' : 'Income verification: 3-4 days (manual)'}</li>
          <li>{isEs ? 'Evaluación de riesgo: proceso batch 1x/día' : 'Risk assessment: batch process 1x/day'}</li>
          <li>{isEs ? '35% de solicitudes "atoradas" en algún paso' : '35% of applications "stuck" at some step'}</li>
        </ul>
        <p><strong>{isEs ? 'Financieros:' : 'Financial:'}</strong></p>
        <ul>
          <li>{isEs ? 'Costos área créditos: $480,000/año' : 'Credit area costs: $480,000/year'}</li>
          <li>{isEs ? '15 empleados dedicados tiempo completo' : '15 employees full-time'}</li>
          <li>{isEs ? 'Overtime frecuente (20% sobre salario base)' : 'Frequent overtime (20% over base salary)'}</li>
        </ul>
        <p><strong>{isEs ? 'Cliente:' : 'Customer:'}</strong></p>
        <ul>
          <li>{isEs ? '45% de quejas relacionadas con tiempos' : '45% of complaints related to timing'}</li>
          <li>{isEs ? 'NPS área créditos: 42 (vs 68 promedio banco)' : 'Credit area NPS: 42 (vs 68 bank average)'}</li>
          <li>{isEs ? '25% de clientes aprobados ya habían contratado con competencia' : '25% of approved customers had already signed with competitors'}</li>
        </ul>
        <p><strong>{isEs ? 'Competitivos:' : 'Competitive:'}</strong></p>
        <p>{isEs ? 'Bancos digitales aprobando en 24-48 horas. Pérdida 18% market share créditos personales en 2 años.' : 'Digital banks approving in 24-48 hours. 18% loss in personal credit market share in 2 years.'}</p>

        <h3>{isEs ? 'La llamada que cambió todo' : 'The call that changed everything'}</h3>
        <blockquote>
          {isEs
            ? '"En últimos 6 meses perdimos $2.3M en créditos que aprobamos tarde. Clientes ya tenían financiamiento de otro banco."'
            : '"In the last 6 months we lost $2.3M in credits we approved too late. Customers had already secured financing from another bank."'}
        </blockquote>
        <p><strong>{isEs ? 'Decisión:' : 'Decision:'}</strong> {isEs ? '"Optimizamos el proceso de créditos o perdemos el negocio."' : '"We optimize the credit process or we lose the business."'}</p>
        <hr />
      </section>

      {/* 2. La solución - 4 fases */}
      <section id="la-solucion">
        <h2>{isEs ? '2. La solución: metodología BPM en 4 fases' : '2. The solution: BPM methodology in 4 phases'}</h2>
        <h3>{isEs ? 'Fase 1: Diagnóstico y mapeo (semanas 1-3)' : 'Phase 1: Diagnosis and mapping (weeks 1-3)'}</h3>
        <p>
          {isEs
            ? 'Entrevistas a stakeholders, observación directa del flujo de créditos, documentación de los 173 pasos identificados y medición de tiempos por etapa. Se detectaron 6 aprobaciones redundantes y cuellos de botella en verificación de ingresos.'
            : 'Stakeholder interviews, direct observation of credit flow, documentation of 173 identified steps and time measurement per stage. Six redundant approvals and bottlenecks in income verification were detected.'}
        </p>
        <h3>{isEs ? 'Fase 2: Análisis y diseño (semanas 4-6)' : 'Phase 2: Analysis and design (weeks 4-6)'}</h3>
        <p>
          {isEs
            ? 'Diseño del flujo "to-be" con 3 aprobaciones estratégicas, automatización de scoring y verificación de ingresos mediante integraciones, y paralelización de tareas independientes.'
            : 'Design of "to-be" flow with 3 strategic approvals, automation of scoring and income verification through integrations, and parallelization of independent tasks.'}
        </p>
        <h3>{isEs ? 'Fase 3: Ejecución (semanas 7-20)' : 'Phase 3: Execution (weeks 7-20)'}</h3>
        <p>
          {isEs
            ? 'Piloto en sucursal pequeña (2 semanas), capacitación del equipo, rollout gradual al resto de sucursales y ajustes según feedback.'
            : 'Pilot in small branch (2 weeks), team training, gradual rollout to rest of branches and adjustments based on feedback.'}
        </p>
        <h3>{isEs ? 'Fase 4: Monitoreo y optimización (continuo)' : 'Phase 4: Monitoring and optimization (ongoing)'}</h3>
        <p>
          {isEs
            ? 'Dashboards en tiempo real, alertas por desvíos y ciclos de mejora mensuales.'
            : 'Real-time dashboards, alerts for deviations and monthly improvement cycles.'}
        </p>
        <hr />
      </section>

      {/* 3. Resultados medibles - tabla */}
      <section id="resultados-medibles">
        <h2>{isEs ? '3. Resultados medibles (los números)' : '3. Measurable results (the numbers)'}</h2>
        <div className="overflow-x-auto my-6">
          <table>
            <thead>
              <tr>
                <th>{isEs ? 'Métrica' : 'Metric'}</th>
                <th>{isEs ? 'Antes (Sep 2023)' : 'Before (Sep 2023)'}</th>
                <th>{isEs ? 'Después (Mar 2024)' : 'After (Mar 2024)'}</th>
                <th>{isEs ? 'Mejora' : 'Improvement'}</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>{isEs ? 'Tiempo promedio' : 'Average time'}</td><td>12 {isEs ? 'días' : 'days'}</td><td>7 {isEs ? 'días' : 'days'}</td><td>↓42%</td></tr>
              <tr><td>{isEs ? 'Costos área' : 'Area costs'}</td><td>$480K/{isEs ? 'año' : 'yr'}</td><td>$312K/{isEs ? 'año' : 'yr'}</td><td>↓35%</td></tr>
              <tr><td>NPS</td><td>42</td><td>68</td><td>+26 pts</td></tr>
              <tr><td>{isEs ? 'Errores proceso' : 'Process errors'}</td><td>12%</td><td>7%</td><td>↓42%</td></tr>
              <tr><td>{isEs ? 'Quejas' : 'Complaints'}</td><td>45%</td><td>18%</td><td>↓60%</td></tr>
              <tr><td>{isEs ? 'Aprobaciones' : 'Approvals'}</td><td>8</td><td>3</td><td>↓63%</td></tr>
              <tr><td>Overtime</td><td>20%</td><td>5%</td><td>↓75%</td></tr>
            </tbody>
          </table>
        </div>
        <h3>{isEs ? 'ROI desglosado' : 'ROI breakdown'}</h3>
        <p>
          {isEs
            ? 'Inversión total: $45,000 (consultoría + herramientas + capacitación). Ahorros anuales: $168,000 (costos operativos + reducción overtime + menor reproceso). ROI 380% en 12 meses.'
            : 'Total investment: $45,000 (consulting + tools + training). Annual savings: $168,000 (operational costs + overtime reduction + less rework). 380% ROI in 12 months.'}
        </p>
        <hr />
      </section>

      {/* 4. Lecciones aprendidas */}
      <section id="lecciones-aprendidas">
        <h2>{isEs ? '4. Lecciones aprendidas' : '4. Lessons learned'}</h2>
        <h3>{isEs ? 'Lo que funcionó bien' : 'What worked well'}</h3>
        <ol>
          <li><strong>{isEs ? 'Involucrar ejecutores desde día 1' : 'Involving executors from day 1'}</strong> — {isEs ? 'El equipo de créditos participó en el mapeo; las mejoras fueron adoptadas con mayor rapidez.' : 'The credit team participated in mapping; improvements were adopted faster.'}</li>
          <li><strong>{isEs ? 'Pilotar en sucursal pequeña primero' : 'Piloting in a small branch first'}</strong> — {isEs ? 'Permitió ajustar el flujo antes del rollout masivo.' : 'Allowed flow adjustment before mass rollout.'}</li>
          <li><strong>{isEs ? 'Celebrar quick wins públicamente' : 'Celebrating quick wins publicly'}</strong> — {isEs ? 'Reconocimiento al equipo y comunicación interna reforzaron el cambio.' : 'Team recognition and internal communication reinforced the change.'}</li>
        </ol>
        <h3>{isEs ? 'Desafíos superados' : 'Challenges overcome'}</h3>
        <ol>
          <li><strong>{isEs ? 'Resistencia al cambio (gerentes medios)' : 'Resistance to change (middle managers)'}</strong> — {isEs ? 'Sesiones de alineación y métricas claras demostraron el valor.' : 'Alignment sessions and clear metrics demonstrated value.'}</li>
          <li><strong>{isEs ? 'Integración sistemas legacy' : 'Legacy system integration'}</strong> — {isEs ? 'APIs y procesos híbridos temporales hasta la migración completa.' : 'APIs and temporary hybrid processes until full migration.'}</li>
          <li><strong>{isEs ? 'Mantener momentum durante 6 meses' : 'Maintaining momentum over 6 months'}</strong> — {isEs ? 'Check-ins quincenales y hitos intermedios mantuvieron el compromiso.' : 'Biweekly check-ins and intermediate milestones maintained commitment.'}</li>
        </ol>
        <h3>{isEs ? 'Recomendaciones para otros bancos' : 'Recommendations for other banks'}</h3>
        <ul>
          <li>{isEs ? 'Empieza por el proceso que más duele (en este caso, créditos personales).' : 'Start with the process that hurts most (in this case, personal credits).'}</li>
          <li>{isEs ? 'Mide antes y después con las mismas métricas para demostrar ROI.' : 'Measure before and after with the same metrics to demonstrate ROI.'}</li>
          <li>{isEs ? 'Involucra a compliance desde el diseño para no frenar después.' : 'Involve compliance from the design phase to avoid blocking later.'}</li>
        </ul>
        <hr />
      </section>

      {/* 5. CTA */}
      <section id="cta" className="!max-w-none">
        <div className="rounded-2xl bg-violeta p-8 md:p-10 -mx-4 md:-mx-0 mt-8 mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-2">
            {isEs ? '5. ¿Tu banco enfrenta desafíos similares?' : '5. Does your bank face similar challenges?'}
          </h2>
          <p className="text-white/85 text-body mb-6">
            {isEs
              ? 'Si tiempos de procesamiento, costos operativos o satisfacción del cliente son un dolor, podemos ayudarte con un diagnóstico sin compromiso.'
              : 'If processing times, operational costs or customer satisfaction are a pain point, we can help with a no-commitment diagnosis.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={isEs ? '/es/contacto' : '/en/contact'}
              className="inline-flex items-center justify-center gap-2 bg-white text-violeta font-semibold px-6 py-3 rounded-lg hover:bg-white/90 transition-all duration-300"
            >
              {isEs ? 'Solicitar diagnóstico gratuito' : 'Request free diagnosis'}
              <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              href={isEs ? '/es/casos-exito' : '/en/success-stories'}
              className="inline-flex items-center justify-center gap-2 bg-white/15 border border-white/30 text-white font-medium px-6 py-3 rounded-lg hover:bg-white/25 transition-all duration-300"
            >
              {isEs ? 'Ver más casos de éxito' : 'View more success cases'}
            </Link>
          </div>
        </div>
      </section>

      <footer className="mt-16 pt-8 border-t border-gris-arena/20 dark:border-white/10 text-body-sm text-azul-marino/60 dark:text-white/60">
        <p>{isEs ? 'Publicado:' : 'Published:'} 20 enero 2026 · {isEs ? 'Categoría:' : 'Category:'} {isEs ? 'Optimización de Procesos' : 'Process Optimization'} · 10 {isEs ? 'min lectura' : 'min read'}</p>
      </footer>
    </div>
  );
}
