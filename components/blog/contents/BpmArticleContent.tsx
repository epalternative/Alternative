import React from 'react';
import Link from 'next/link';
import { ChevronRight, Map, Pencil, Play, BarChart3 } from 'lucide-react';
import type { TocItem } from '../BlogPostLayout';

export const BPM_TOC: TocItem[] = [
  { id: 'introduccion', label: 'Introducción', labelEn: 'Introduction', level: 2 },
  { id: 'que-es-bpm', label: '¿Qué es BPM (Business Process Management)?', labelEn: 'What is BPM?', level: 2 },
  { id: 'por-que-necesitas-bpm', label: '¿Por qué necesitas BPM?', labelEn: 'Why You Need BPM', level: 2 },
  { id: 'como-funciona-bpm', label: 'Cómo funciona BPM: Las 4 Fases', labelEn: 'How BPM Works: The 4 Phases', level: 2 },
  { id: 'ejemplos-reales', label: 'Ejemplos reales de BPM en acción', labelEn: 'Real BPM Examples', level: 2 },
  { id: 'como-empezar', label: 'Cómo empezar con BPM en tu empresa', labelEn: 'How to Get Started with BPM', level: 2 },
  { id: 'herramientas-software', label: 'Herramientas y Software BPM', labelEn: 'BPM Tools and Software', level: 2 },
  { id: 'errores-comunes', label: 'Errores comunes al implementar BPM', labelEn: 'Common BPM Implementation Mistakes', level: 2 },
  { id: 'preguntas-frecuentes', label: 'Preguntas frecuentes sobre BPM', labelEn: 'BPM FAQs', level: 2 },
  { id: 'conclusion', label: 'Conclusión: Tu próximo paso', labelEn: 'Conclusion: Your Next Step', level: 2 },
  { id: 'recursos-ctas', label: 'Recursos adicionales', labelEn: 'Additional Resources', level: 2 },
];

interface BpmArticleContentProps {
  locale: 'es' | 'en';
}

export function BpmArticleContent({ locale }: BpmArticleContentProps) {
  const isEs = locale === 'es';

  return (
    <div className="blog-prose">
      {/* Introducción */}
      <section id="introduccion">
        <p>
          {isEs
            ? 'El 70% de las empresas tienen procesos ineficientes que drenan recursos sin saberlo. La diferencia entre empresas que crecen sostenidamente y las que se estancan no está en su producto o servicio—está en cómo gestionan sus procesos internos.'
            : '70% of companies have inefficient processes that drain resources without knowing it. The difference between companies that grow sustainably and those that stagnate is not in their product or service—it is in how they manage their internal processes.'}
        </p>
        <p>
          {isEs
            ? 'Business Process Management (BPM) es la metodología que empresas líderes usan para optimizar operaciones, reducir costos hasta 35%, y acelerar su crecimiento.'
            : 'Business Process Management (BPM) is the methodology that leading companies use to optimize operations, reduce costs by up to 35%, and accelerate their growth.'}
        </p>
        <p>
          {isEs ? 'En esta guía descubrirás:' : 'In this guide you will discover:'}
        </p>
        <ul>
          <li>{isEs ? 'Qué es BPM exactamente (más allá de la definición técnica)' : 'What BPM is exactly (beyond the technical definition)'}</li>
          <li>{isEs ? 'Cómo BPM puede transformar tu empresa' : 'How BPM can transform your company'}</li>
          <li>{isEs ? 'Paso a paso para implementar BPM' : 'Step-by-step to implement BPM'}</li>
          <li>{isEs ? 'Casos reales con resultados medibles' : 'Real cases with measurable results'}</li>
          <li>{isEs ? 'Herramientas y recursos gratuitos' : 'Tools and free resources'}</li>
        </ul>
        <p className="text-body-sm text-azul-marino/70 dark:text-white/70 font-medium">
          {isEs ? 'Tiempo de lectura: 15 minutos' : 'Reading time: 15 minutes'}
        </p>
        <hr />
      </section>

      {/* 1. ¿Qué es BPM? */}
      <section id="que-es-bpm">
        <h2>{isEs ? '1. ¿Qué es BPM (Business Process Management)?' : '1. What is BPM (Business Process Management)?'}</h2>
        <h3>{isEs ? 'Definición simple' : 'Simple definition'}</h3>
        <p>
          {isEs
            ? 'BPM (Business Process Management) es una metodología sistemática para identificar, diseñar, ejecutar, documentar, medir, monitorear y controlar procesos empresariales para lograr resultados consistentes alineados con objetivos estratégicos.'
            : 'BPM (Business Process Management) is a systematic methodology to identify, design, execute, document, measure, monitor and control business processes to achieve consistent results aligned with strategic objectives.'}
        </p>
        <p>
          {isEs
            ? 'En español simple: BPM es hacer que tu empresa funcione como una máquina bien aceitada, donde cada proceso está optimizado para máxima eficiencia y mínimo desperdicio.'
            : 'In simple terms: BPM is making your company work like a well-oiled machine, where every process is optimized for maximum efficiency and minimum waste.'}
        </p>

        <h3>{isEs ? 'BPM vs Gestión tradicional de procesos' : 'BPM vs Traditional process management'}</h3>
        <div className="overflow-x-auto my-6">
          <table>
            <thead>
              <tr>
                <th>{isEs ? 'Gestión tradicional' : 'Traditional'}</th>
                <th>BPM</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>{isEs ? 'Reactiva' : 'Reactive'}</td><td>{isEs ? 'Proactiva' : 'Proactive'}</td></tr>
              <tr><td>{isEs ? 'Silos departamentales' : 'Departmental silos'}</td><td>End-to-end</td></tr>
              <tr><td>{isEs ? 'Manual, estático' : 'Manual, static'}</td><td>{isEs ? 'Automatizado, dinámico' : 'Automated, dynamic'}</td></tr>
              <tr><td>{isEs ? 'Sin métricas' : 'No metrics'}</td><td>{isEs ? 'KPIs continuos' : 'Continuous KPIs'}</td></tr>
              <tr><td>{isEs ? 'Mejora ocasional' : 'Occasional improvement'}</td><td>{isEs ? 'Mejora continua' : 'Continuous improvement'}</td></tr>
            </tbody>
          </table>
        </div>

        <h3>{isEs ? 'Los 5 componentes clave de BPM' : 'The 5 key components of BPM'}</h3>
        <ol>
          <li><strong>{isEs ? 'Modelado de procesos' : 'Process modeling'}</strong> — {isEs ? 'Visualización flujos actuales ("as-is") y diseño flujos optimizados ("to-be"). Notación BPMN 2.0 estándar.' : 'Visualization of current flows ("as-is") and design of optimized flows ("to-be"). Standard BPMN 2.0 notation.'}</li>
          <li><strong>{isEs ? 'Automatización' : 'Automation'}</strong> — {isEs ? 'Tareas repetitivas → robots. Aprobaciones → workflows automáticos. Integraciones entre sistemas.' : 'Repetitive tasks → robots. Approvals → automatic workflows. System integrations.'}</li>
          <li><strong>{isEs ? 'Ejecución' : 'Execution'}</strong> — {isEs ? 'Implementación de cambios, capacitación de equipos, rollout controlado.' : 'Implementation of changes, team training, controlled rollout.'}</li>
          <li><strong>{isEs ? 'Monitoreo' : 'Monitoring'}</strong> — {isEs ? 'KPIs en tiempo real, dashboards ejecutivos, alertas automáticas.' : 'Real-time KPIs, executive dashboards, automatic alerts.'}</li>
          <li><strong>{isEs ? 'Optimización continua' : 'Continuous optimization'}</strong> — {isEs ? 'Análisis de datos, identificación de cuellos de botella, iteraciones de mejora.' : 'Data analysis, bottleneck identification, improvement iterations.'}</li>
        </ol>
        <hr />
      </section>

      {/* 2. ¿Por qué necesitas BPM? */}
      <section id="por-que-necesitas-bpm">
        <h2>{isEs ? '2. ¿Por qué necesitas BPM? (El costo real de procesos ineficientes)' : '2. Why You Need BPM (The Real Cost of Inefficient Processes)'}</h2>
        <h3>{isEs ? '5 problemas que BPM resuelve' : '5 problems BPM solves'}</h3>
        <p><strong>{isEs ? 'Problema #1: Procesos sin documentar' : 'Problem #1: Undocumented processes'}</strong></p>
        <p>
          {isEs
            ? 'Síntoma: Empleados nuevos tardan 3+ meses en ser productivos porque "dependen del conocimiento de María." Consecuencia: riesgo operacional, variabilidad en resultados, imposible escalar. Solución BPM: documentación estandarizada, mapas de proceso accesibles, reducción 60% tiempo onboarding.'
            : 'Symptom: New employees take 3+ months to be productive because "they depend on María\'s knowledge." Consequence: operational risk, variability in results, impossible to scale. BPM solution: standardized documentation, accessible process maps, 60% reduction in onboarding time.'}
        </p>
        <p><strong>{isEs ? 'Problema #2–5' : 'Problems #2–5'}</strong> — {isEs ? 'Cuellos de botella ocultos, aprobaciones redundantes, falta de visibilidad y variabilidad en la calidad son otros dolores que BPM aborda con métricas y mejora continua.' : 'Hidden bottlenecks, redundant approvals, lack of visibility and quality variability are other pains BPM addresses with metrics and continuous improvement.'}</p>

        <h3>{isEs ? 'ROI típico de BPM (con datos reales)' : 'Typical BPM ROI (with real data)'}</h3>
        <p>{isEs ? 'Según estudios de Gartner y nuestra experiencia con 50+ clientes:' : 'According to Gartner studies and our experience with 50+ clients:'}</p>
        <ul>
          <li><strong>{isEs ? 'Reducción costos operacionales:' : 'Operational cost reduction:'}</strong> 20–35%</li>
          <li><strong>{isEs ? 'Reducción tiempos de ciclo:' : 'Cycle time reduction:'}</strong> 30–50%</li>
          <li><strong>{isEs ? 'Incremento productividad:' : 'Productivity increase:'}</strong> 25–40%</li>
          <li><strong>{isEs ? 'Mejora satisfacción cliente:' : 'Customer satisfaction improvement:'}</strong> 30–45%</li>
          <li><strong>{isEs ? 'ROI implementación:' : 'Implementation ROI:'}</strong> 200–380% en 12 meses</li>
        </ul>
        <hr />
      </section>

      {/* 3. Cómo funciona BPM: 4 fases - con diseño visual */}
      <section id="como-funciona-bpm">
        <h2>{isEs ? '3. Cómo funciona BPM: Las 4 fases' : '3. How BPM Works: The 4 Phases'}</h2>

        {/* Visual: 4 fases - timeline vertical a la izquierda */}
        <div className="not-prose my-10 rounded-2xl border border-turquesa/20 bg-gradient-to-br from-turquesa/5 to-menta/5 dark:from-turquesa/10 dark:to-menta/10 p-6 md:p-8">
          <div className="grid md:grid-cols-[auto_1fr] gap-8 md:gap-10">
            {/* Timeline izquierdo */}
            <div className="flex md:flex-col gap-4 md:gap-0">
              {[
                { num: 1, icon: Map, label: isEs ? 'Mapeo' : 'Mapping', labelFull: isEs ? 'Mapeo de procesos' : 'Process mapping', weeks: '2–4' },
                { num: 2, icon: Pencil, label: isEs ? 'Análisis y diseño' : 'Analysis & design', labelFull: isEs ? 'Análisis y diseño' : 'Analysis and design', weeks: '2–3' },
                { num: 3, icon: Play, label: isEs ? 'Ejecución' : 'Execution', labelFull: isEs ? 'Ejecución' : 'Execution', weeks: '' },
                { num: 4, icon: BarChart3, label: isEs ? 'Monitoreo' : 'Monitoring', labelFull: isEs ? 'Monitoreo y optimización' : 'Monitoring & optimization', weeks: '' },
              ].map((phase, i) => {
                const Icon = phase.icon;
                return (
                  <div key={phase.num} className="flex md:flex-col items-center md:items-stretch gap-3 md:gap-0">
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className="w-12 h-12 rounded-xl bg-turquesa/20 flex items-center justify-center shrink-0">
                        <Icon className="w-6 h-6 text-turquesa" />
                      </div>
                      <div className="md:hidden">
                        <span className="text-azul-marino dark:text-white font-semibold">Fase {phase.num}</span>
                        <p className="text-body-sm text-azul-marino/70 dark:text-white/70">{phase.labelFull}</p>
                        {phase.weeks && <span className="text-xs text-turquesa">{phase.weeks} {isEs ? 'semanas' : 'weeks'}</span>}
                      </div>
                    </div>
                    {i < 3 && <div className="hidden md:block w-0.5 h-6 bg-turquesa/30 ml-6" />}
                  </div>
                );
              })}
            </div>
            {/* Descripciones a la derecha (desktop) */}
            <div className="space-y-6 md:space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-azul-marino dark:text-white flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-turquesa/20 text-turquesa flex items-center justify-center text-sm font-bold">1</span>
                  {isEs ? 'Fase 1: Mapeo de procesos (2–4 semanas)' : 'Phase 1: Process mapping (2–4 weeks)'}
                </h3>
                <p className="mt-2 text-azul-marino/80 dark:text-white/80">{isEs ? 'Objetivo: entender estado actual. Entrevistas a stakeholders, observación directa, documentación de flujos "as-is", identificación de pain points, medición de tiempos y costos actuales.' : 'Goal: understand current state. Stakeholder interviews, direct observation, "as-is" flow documentation, pain point identification, current time and cost measurement.'}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-azul-marino dark:text-white flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-turquesa/20 text-turquesa flex items-center justify-center text-sm font-bold">2</span>
                  {isEs ? 'Fase 2: Análisis y diseño (2–3 semanas)' : 'Phase 2: Analysis and design (2–3 weeks)'}
                </h3>
                <p className="mt-2 text-azul-marino/80 dark:text-white/80">{isEs ? 'Diseño de flujos "to-be", eliminación de pasos redundantes, definición de KPIs y automatizaciones.' : 'Design of "to-be" flows, elimination of redundant steps, KPI and automation definition.'}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-azul-marino dark:text-white flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-turquesa/20 text-turquesa flex items-center justify-center text-sm font-bold">3</span>
                  {isEs ? 'Fase 3: Ejecución' : 'Phase 3: Execution'}
                </h3>
                <p className="mt-2 text-azul-marino/80 dark:text-white/80">{isEs ? 'Implementación controlada, capacitación y rollout por fases.' : 'Controlled implementation, training and phased rollout.'}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-azul-marino dark:text-white flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-turquesa/20 text-turquesa flex items-center justify-center text-sm font-bold">4</span>
                  {isEs ? 'Fase 4: Monitoreo y optimización' : 'Phase 4: Monitoring and optimization'}
                </h3>
                <p className="mt-2 text-azul-marino/80 dark:text-white/80">{isEs ? 'Dashboards, alertas y ciclos de mejora continua.' : 'Dashboards, alerts and continuous improvement cycles.'}</p>
              </div>
            </div>
          </div>
        </div>

        <hr />
      </section>

      {/* 4. Ejemplos reales */}
      <section id="ejemplos-reales">
        <h2>{isEs ? '4. Ejemplos reales de BPM en acción' : '4. Real BPM Examples'}</h2>
        <h3>{isEs ? 'Caso #1: Banco regional — Reducción 40% tiempos de crédito' : 'Case #1: Regional bank — 40% credit time reduction'}</h3>
        <p>{isEs ? 'Situación inicial: proceso de aprobación de créditos 12 días promedio, 8 aprobaciones manuales, 45% quejas por tiempos.' : 'Initial situation: credit approval process 12 days average, 8 manual approvals, 45% complaints about timing.'}</p>
        <p>{isEs ? 'Implementación BPM: mapeo completo (173 pasos), eliminación de 5 aprobaciones redundantes, automatización de verificaciones, paralelización de tareas.' : 'BPM implementation: full mapping (173 steps), removal of 5 redundant approvals, automation of verifications, parallelization of tasks.'}</p>
        <p><strong>{isEs ? 'Resultados (6 meses):' : 'Results (6 months):'}</strong></p>
        <ul>
          <li>{isEs ? 'Proceso: 7 días (↓42%)' : 'Process: 7 days (↓42%)'}</li>
          <li>{isEs ? 'Quejas: 18% (↓60%)' : 'Complaints: 18% (↓60%)'}</li>
          <li>{isEs ? 'Costos: ↓35%' : 'Costs: ↓35%'}</li>
          <li>ROI: 380% en 12 meses</li>
        </ul>
        <p><Link href={isEs ? '/es/casos-exito' : '/en/success-stories'} className="text-turquesa font-medium hover:underline">{isEs ? 'Ver caso completo →' : 'See full case →'}</Link></p>
        <hr />
      </section>

      {/* 5. Cómo empezar */}
      <section id="como-empezar">
        <h2>{isEs ? '5. Cómo empezar con BPM en tu empresa (paso a paso)' : '5. How to Get Started with BPM (Step by Step)'}</h2>
        <h3>{isEs ? 'Paso 1: Identifica procesos críticos (Día 1)' : 'Step 1: Identify critical processes (Day 1)'}</h3>
        <p>{isEs ? 'Pregunta clave: ¿Qué proceso, si se optimiza, generaría mayor impacto? Prioriza por frecuencia, costo, dolor e impacto en el cliente.' : 'Key question: What process, if optimized, would generate the greatest impact? Prioritize by frequency, cost, pain and customer impact.'}</p>
        <h3>{isEs ? 'Paso 2: Mapea estado actual (Semana 1–2)' : 'Step 2: Map current state (Week 1–2)'}</h3>
        <p>{isEs ? 'Entrevistas, observación y documentación con notación BPMN o diagramas simples.' : 'Interviews, observation and documentation with BPMN notation or simple diagrams.'}</p>
        <h3>{isEs ? 'Pasos 3–5' : 'Steps 3–5'}</h3>
        <p>{isEs ? 'Diseña el "to-be", implementa con pilotos y monitorea con KPIs para iterar.' : 'Design the "to-be", implement with pilots and monitor with KPIs to iterate.'}</p>
        <hr />
      </section>

      {/* 6. Herramientas BPM */}
      <section id="herramientas-software">
        <h2>{isEs ? '6. Herramientas y software BPM' : '6. BPM Tools and Software'}</h2>
        <p><strong>{isEs ? 'Gratuitas:' : 'Free:'}</strong> Draw.io, Bizagi Modeler, Camunda Community. <strong>{isEs ? 'De pago:' : 'Paid:'}</strong> Appian, Pega (enterprise), Kissflow (mid-market).</p>
        <p>{isEs ? 'Regla de oro: empieza simple (Excel + Draw.io). Evoluciona cuando duele.' : 'Golden rule: start simple (Excel + Draw.io). Evolve when it hurts.'}</p>
        <hr />
      </section>

      {/* 7. Errores comunes */}
      <section id="errores-comunes">
        <h2>{isEs ? '7. Errores comunes al implementar BPM (y cómo evitarlos)' : '7. Common BPM Implementation Mistakes (and How to Avoid Them)'}</h2>
        <p><strong>{isEs ? 'Error #1: "Vamos a optimizar TODO"' : 'Mistake #1: "Let\'s optimize EVERYTHING"'}</strong></p>
        <p>{isEs ? 'Parálisis por análisis. Solución: empieza con 1 proceso crítico, demuestra valor en 2–3 meses y luego escala.' : 'Analysis paralysis. Solution: start with 1 critical process, demonstrate value in 2–3 months, then scale.'}</p>
        <p><strong>{isEs ? 'Error #2: No involucrar a quienes ejecutan' : 'Mistake #2: Not involving those who execute'}</strong></p>
        <p>{isEs ? 'Los que hacen el proceso conocen los dolores; involúcralos desde el diseño.' : 'Those who run the process know the pains; involve them from the design phase.'}</p>
        <hr />
      </section>

      {/* 8. FAQs - diseño con fondo violeta */}
      <section id="preguntas-frecuentes" className="!max-w-none">
        <div className="rounded-2xl bg-violeta p-8 md:p-10 -mx-4 md:-mx-0 mt-8 mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-2">
            {isEs ? '8. Preguntas frecuentes sobre BPM' : '8. BPM FAQs'}
          </h2>
          <p className="text-white/85 text-body mb-8">
            {isEs ? 'Resolvemos las dudas más comunes sobre implementación, costos y plazos.' : 'We answer the most common questions about implementation, costs and timelines.'}
          </p>
          <div className="space-y-8">
            <div className="border-b border-white/20 pb-6 last:border-0 last:pb-0">
              <h3 className="text-lg font-semibold text-white mb-3">
                {isEs ? '¿Cuánto cuesta implementar BPM?' : 'How much does it cost to implement BPM?'}
              </h3>
              <p className="text-white/90 leading-relaxed">
                {isEs ? 'DIY: $0–5K. Con consultor: $15K–50K. Enterprise: $100K–500K+. ROI típico 200–380% en 12 meses.' : 'DIY: $0–5K. With consultant: $15K–50K. Enterprise: $100K–500K+. Typical ROI 200–380% in 12 months.'}
              </p>
            </div>
            <div className="border-b border-white/20 pb-6 last:border-0 last:pb-0">
              <h3 className="text-lg font-semibold text-white mb-3">
                {isEs ? '¿Cuánto tiempo toma ver resultados?' : 'How long until you see results?'}
              </h3>
              <p className="text-white/90 leading-relaxed">
                {isEs ? 'Quick wins: 2–4 semanas. Resultados medibles: 2–3 meses. Transformación completa: 6–12 meses.' : 'Quick wins: 2–4 weeks. Measurable results: 2–3 months. Full transformation: 6–12 months.'}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">
                {isEs ? '¿BPM funciona en empresas pequeñas?' : 'Does BPM work for small companies?'}
              </h3>
              <p className="text-white/90 leading-relaxed">
                {isEs ? 'Sí. BPM es especialmente valioso para empresas medianas (50–500 empleados): suficientes procesos para optimizar y tamaño ágil para implementar.' : 'Yes. BPM is especially valuable for mid-size companies (50–500 employees): enough processes to optimize and agile size to implement.'}
              </p>
            </div>
          </div>
        </div>
        <hr />
      </section>

      {/* 9. Conclusión */}
      <section id="conclusion">
        <h2>{isEs ? '9. Conclusión: Tu próximo paso' : '9. Conclusion: Your Next Step'}</h2>
        <p>{isEs ? 'BPM no es un lujo—es una necesidad competitiva. Empresas que optimizan procesos crecen 2–3X más rápido y tienen márgenes 20–30% superiores.' : 'BPM is not a luxury—it is a competitive necessity. Companies that optimize processes grow 2–3X faster and have 20–30% higher margins.'}</p>
        <p><strong>{isEs ? 'Tu próximo paso (elige uno):' : 'Your next step (choose one):'}</strong></p>
        <ol>
          <li>{isEs ? 'Acción inmediata: identifica tu proceso más doloroso y mapéalo en 30 minutos.' : 'Immediate action: identify your most painful process and map it in 30 minutes.'}</li>
          <li>{isEs ? 'Aprendizaje: lee casos de éxito BPM y webinars.' : 'Learning: read BPM success cases and webinars.'}</li>
          <li>{isEs ? 'Implementación: agenda diagnóstico gratuito (30 min) y obtén un roadmap personalizado.' : 'Implementation: schedule a free diagnosis (30 min) and get a personalized roadmap.'}</li>
        </ol>
        <hr />
      </section>

      {/* Recursos / CTAs */}
      <section id="recursos-ctas">
        <h2>{isEs ? 'Recursos adicionales (CTAs)' : 'Additional resources (CTAs)'}</h2>
        <p>{isEs ? 'Descargas gratuitas: plantilla de mapeo de procesos, checklist de implementación, calculadora de ROI BPM.' : 'Free downloads: process mapping template, implementation checklist, BPM ROI calculator.'}</p>
        <p>
          <Link
            href={isEs ? '/es/contacto' : '/en/contact'}
            className="inline-flex items-center gap-2 bg-turquesa text-azul-marino font-semibold px-6 py-3 rounded-lg hover:bg-menta transition-all duration-300 shadow-brand"
          >
            {isEs ? 'Solicita diagnóstico gratuito' : 'Request free diagnosis'}
            <ChevronRight className="w-4 h-4" />
          </Link>
        </p>
      </section>

      {/* Meta footer */}
      <footer className="mt-16 pt-8 border-t border-gris-arena/20 dark:border-white/10 text-body-sm text-azul-marino/60 dark:text-white/60">
        <p>{isEs ? 'Publicado:' : 'Published:'} 15 enero 2026 · {isEs ? 'Categoría:' : 'Category:'} {isEs ? 'Optimización de Procesos' : 'Process Optimization'} · 15 {isEs ? 'min lectura' : 'min read'}</p>
      </footer>
    </div>
  );
}
