/**
 * Registro de FAQs por ruta.
 *
 * Importa los 37 ficheros de datos, asi que **solo debe usarse desde el
 * servidor** (`lib/seo/jsonld.ts`). Importarlo desde un componente cliente
 * arrastraria todas las FAQs del sitio a su bundle.
 */

import type { FaqEntry } from './faqs';
import { faqs as industrias__banca_servicios_financieros } from './faqs/industrias--banca-servicios-financieros';
import { faqs as industrias__energia_utilities } from './faqs/industrias--energia-utilities';
import { faqs as industrias__gobierno_sector_publico } from './faqs/industrias--gobierno-sector-publico';
import { faqs as industrias__manufactura_logistica } from './faqs/industrias--manufactura-logistica';
import { faqs as industrias__retail_comercio } from './faqs/industrias--retail-comercio';
import { faqs as industrias__salud_farmaceutica } from './faqs/industrias--salud-farmaceutica';
import { faqs as industrias__servicios_profesionales } from './faqs/industrias--servicios-profesionales';
import { faqs as industrias__tecnologia_telecomunicaciones } from './faqs/industrias--tecnologia-telecomunicaciones';
import { faqs as servicios__consultoria_estrategica } from './faqs/servicios--consultoria-estrategica';
import { faqs as servicios__consultoria_estrategica__diagnostico_organizacional } from './faqs/servicios--consultoria-estrategica--diagnostico-organizacional';
import { faqs as servicios__consultoria_estrategica__diseno_organizacional } from './faqs/servicios--consultoria-estrategica--diseno-organizacional';
import { faqs as servicios__consultoria_estrategica__planificacion_estrategica } from './faqs/servicios--consultoria-estrategica--planificacion-estrategica';
import { faqs as servicios__desarrollo_tecnologia } from './faqs/servicios--desarrollo-tecnologia';
import { faqs as servicios__desarrollo_tecnologia__aplicaciones_web_moviles } from './faqs/servicios--desarrollo-tecnologia--aplicaciones-web-moviles';
import { faqs as servicios__desarrollo_tecnologia__consultoria_tecnologica } from './faqs/servicios--desarrollo-tecnologia--consultoria-tecnologica';
import { faqs as servicios__desarrollo_tecnologia__desarrollo_software } from './faqs/servicios--desarrollo-tecnologia--desarrollo-software';
import { faqs as servicios__desarrollo_tecnologia__integracion_sistemas } from './faqs/servicios--desarrollo-tecnologia--integracion-sistemas';
import { faqs as servicios__gestion_proyectos } from './faqs/servicios--gestion-proyectos';
import { faqs as servicios__gestion_proyectos__casos_negocio } from './faqs/servicios--gestion-proyectos--casos-negocio';
import { faqs as servicios__gestion_proyectos__metodologias_agiles } from './faqs/servicios--gestion-proyectos--metodologias-agiles';
import { faqs as servicios__gestion_proyectos__pmo_office } from './faqs/servicios--gestion-proyectos--pmo-office';
import { faqs as servicios__gestion_proyectos__pmp_project_management } from './faqs/servicios--gestion-proyectos--pmp-project-management';
import { faqs as servicios__optimizacion_procesos } from './faqs/servicios--optimizacion-procesos';
import { faqs as servicios__optimizacion_procesos__automatizacion_procesos } from './faqs/servicios--optimizacion-procesos--automatizacion-procesos';
import { faqs as servicios__optimizacion_procesos__bpm_empresarial } from './faqs/servicios--optimizacion-procesos--bpm-empresarial';
import { faqs as servicios__optimizacion_procesos__diseno_procesos } from './faqs/servicios--optimizacion-procesos--diseno-procesos';
import { faqs as servicios__optimizacion_procesos__lean_six_sigma } from './faqs/servicios--optimizacion-procesos--lean-six-sigma';
import { faqs as servicios__sistemas_calidad } from './faqs/servicios--sistemas-calidad';
import { faqs as servicios__sistemas_calidad__auditoria_calidad } from './faqs/servicios--sistemas-calidad--auditoria-calidad';
import { faqs as servicios__sistemas_calidad__certificacion_iso } from './faqs/servicios--sistemas-calidad--certificacion-iso';
import { faqs as servicios__sistemas_calidad__gestion_calidad } from './faqs/servicios--sistemas-calidad--gestion-calidad';
import { faqs as servicios__sistemas_calidad__implementacion_iso_9001 } from './faqs/servicios--sistemas-calidad--implementacion-iso-9001';
import { faqs as servicios__transformacion_digital } from './faqs/servicios--transformacion-digital';
import { faqs as servicios__transformacion_digital__analisis_datos } from './faqs/servicios--transformacion-digital--analisis-datos';
import { faqs as servicios__transformacion_digital__change_management } from './faqs/servicios--transformacion-digital--change-management';
import { faqs as servicios__transformacion_digital__digitalizacion_procesos } from './faqs/servicios--transformacion-digital--digitalizacion-procesos';
import { faqs as servicios__transformacion_digital__estrategia_digital } from './faqs/servicios--transformacion-digital--estrategia-digital';

export const FAQS_BY_PATH: Record<string, FaqEntry[]> = {
  "/industrias/banca-servicios-financieros": industrias__banca_servicios_financieros,
  "/industrias/energia-utilities": industrias__energia_utilities,
  "/industrias/gobierno-sector-publico": industrias__gobierno_sector_publico,
  "/industrias/manufactura-logistica": industrias__manufactura_logistica,
  "/industrias/retail-comercio": industrias__retail_comercio,
  "/industrias/salud-farmaceutica": industrias__salud_farmaceutica,
  "/industrias/servicios-profesionales": industrias__servicios_profesionales,
  "/industrias/tecnologia-telecomunicaciones": industrias__tecnologia_telecomunicaciones,
  "/servicios/consultoria-estrategica": servicios__consultoria_estrategica,
  "/servicios/consultoria-estrategica/diagnostico-organizacional": servicios__consultoria_estrategica__diagnostico_organizacional,
  "/servicios/consultoria-estrategica/diseno-organizacional": servicios__consultoria_estrategica__diseno_organizacional,
  "/servicios/consultoria-estrategica/planificacion-estrategica": servicios__consultoria_estrategica__planificacion_estrategica,
  "/servicios/desarrollo-tecnologia": servicios__desarrollo_tecnologia,
  "/servicios/desarrollo-tecnologia/aplicaciones-web-moviles": servicios__desarrollo_tecnologia__aplicaciones_web_moviles,
  "/servicios/desarrollo-tecnologia/consultoria-tecnologica": servicios__desarrollo_tecnologia__consultoria_tecnologica,
  "/servicios/desarrollo-tecnologia/desarrollo-software": servicios__desarrollo_tecnologia__desarrollo_software,
  "/servicios/desarrollo-tecnologia/integracion-sistemas": servicios__desarrollo_tecnologia__integracion_sistemas,
  "/servicios/gestion-proyectos": servicios__gestion_proyectos,
  "/servicios/gestion-proyectos/casos-negocio": servicios__gestion_proyectos__casos_negocio,
  "/servicios/gestion-proyectos/metodologias-agiles": servicios__gestion_proyectos__metodologias_agiles,
  "/servicios/gestion-proyectos/pmo-office": servicios__gestion_proyectos__pmo_office,
  "/servicios/gestion-proyectos/pmp-project-management": servicios__gestion_proyectos__pmp_project_management,
  "/servicios/optimizacion-procesos": servicios__optimizacion_procesos,
  "/servicios/optimizacion-procesos/automatizacion-procesos": servicios__optimizacion_procesos__automatizacion_procesos,
  "/servicios/optimizacion-procesos/bpm-empresarial": servicios__optimizacion_procesos__bpm_empresarial,
  "/servicios/optimizacion-procesos/diseno-procesos": servicios__optimizacion_procesos__diseno_procesos,
  "/servicios/optimizacion-procesos/lean-six-sigma": servicios__optimizacion_procesos__lean_six_sigma,
  "/servicios/sistemas-calidad": servicios__sistemas_calidad,
  "/servicios/sistemas-calidad/auditoria-calidad": servicios__sistemas_calidad__auditoria_calidad,
  "/servicios/sistemas-calidad/certificacion-iso": servicios__sistemas_calidad__certificacion_iso,
  "/servicios/sistemas-calidad/gestion-calidad": servicios__sistemas_calidad__gestion_calidad,
  "/servicios/sistemas-calidad/implementacion-iso-9001": servicios__sistemas_calidad__implementacion_iso_9001,
  "/servicios/transformacion-digital": servicios__transformacion_digital,
  "/servicios/transformacion-digital/analisis-datos": servicios__transformacion_digital__analisis_datos,
  "/servicios/transformacion-digital/change-management": servicios__transformacion_digital__change_management,
  "/servicios/transformacion-digital/digitalizacion-procesos": servicios__transformacion_digital__digitalizacion_procesos,
  "/servicios/transformacion-digital/estrategia-digital": servicios__transformacion_digital__estrategia_digital,
};

/** FAQs de una ruta, o `undefined` si no tiene. */
export function getFaqsForPath(routePath: string): FaqEntry[] | undefined {
  return FAQS_BY_PATH[routePath];
}
