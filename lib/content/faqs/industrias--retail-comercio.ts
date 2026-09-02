import type { FaqEntry } from '../faqs';

/** FAQs de /industrias/retail-comercio — extraídas de su PageClient.tsx. */
export const faqs: FaqEntry[] = [
  {
    question: {
      es: "¿Build vs buy para e-commerce: desarrollar custom o usar Shopify/WooCommerce?",
      en: "¿Build vs buy para e-commerce: desarrollar custom o usar Shopify/WooCommerce?",
    },
    answer: {
      es: "Plataforma comercial (Shopify, WooCommerce, Magento) cuando: Catálogo estándar (<10K SKUs), funcionalidades estándar, presupuesto moderado, lanzamiento rápido (3-6 meses). Desarrollo custom cuando: Procesos muy específicos, catálogo masivo con complejidad (50K+ SKUs con variantes complejas), integraciones complejas con sistemas legacy, presupuesto permite. Recomendación Alternative: 80% casos Shopify Plus o similar es suficiente y más rápido.",
      en: "Plataforma comercial (Shopify, WooCommerce, Magento) cuando: Catálogo estándar (<10K SKUs), funcionalidades estándar, presupuesto moderado, lanzamiento rápido (3-6 meses). Desarrollo custom cuando: Procesos muy específicos, catálogo masivo con complejidad (50K+ SKUs con variantes complejas), integraciones complejas con sistemas legacy, presupuesto permite. Recomendación Alternative: 80% casos Shopify Plus o similar es suficiente y más rápido.",
    },
  },
  {
    question: {
      es: "¿Cómo manejan integración con inventario de tiendas físicas?",
      en: "¿Cómo manejan integración con inventario de tiendas físicas?",
    },
    answer: {
      es: "Integración crítica para omnicanalidad. Opciones: (1) API directa entre e-commerce y ERP/sistema inventario (tiempo real), (2) Sincronización periódica cada 15-30 min (near real-time, suficiente para mayoría). Desafío: Reservas de inventario (cliente agrega a carrito pero no compra por 15 min). Implementamos lógica de reserva temporal + liberación automática. Testing exhaustivo para evitar overselling (vender producto sin stock).",
      en: "Integración crítica para omnicanalidad. Opciones: (1) API directa entre e-commerce y ERP/sistema inventario (tiempo real), (2) Sincronización periódica cada 15-30 min (near real-time, suficiente para mayoría). Desafío: Reservas de inventario (cliente agrega a carrito pero no compra por 15 min). Implementamos lógica de reserva temporal + liberación automática. Testing exhaustivo para evitar overselling (vender producto sin stock).",
    },
  },
  {
    question: {
      es: "¿Alternative solo gestiona proyecto o también desarrolla e-commerce?",
      en: "¿Alternative solo gestiona proyecto o también desarrolla e-commerce?",
    },
    answer: {
      es: "Ambos modelos: (1) Solo PM: Gestionamos proyecto, cliente/vendor desarrolla plataforma. Coordinamos entre stakeholders, vendors, equipos internos. (2) PM + desarrollo: Alternative gestiona Y desarrolla plataforma completa (más común). Ventaja: un solo proveedor responsable (no coordinación entre PM externo y developer externo). Cliente decide según capacidades internas.",
      en: "Ambos modelos: (1) Solo PM: Gestionamos proyecto, cliente/vendor desarrolla plataforma. Coordinamos entre stakeholders, vendors, equipos internos. (2) PM + desarrollo: Alternative gestiona Y desarrolla plataforma completa (más común). Ventaja: un solo proveedor responsable (no coordinación entre PM externo y developer externo). Cliente decide según capacidades internas.",
    },
  },
  {
    question: {
      es: "¿Qué hacer con tiendas físicas al lanzar e-commerce? ¿Canibalizan ventas?",
      en: "¿Qué hacer con tiendas físicas al lanzar e-commerce? ¿Canibalizan ventas?",
    },
    answer: {
      es: "Preocupación común de retailers tradicionales. Realidad: E-commerce expande mercado (alcanza clientes que no visitan tienda física por distancia/tiempo) + captura ventas que irían a competencia online. Canibalización: Existe (10-20% ventas online son de clientes que hubieran comprado en tienda) pero crecimiento total compensa con creces. Estrategia omnicanal mitiga: click & collect incentiva visita a tienda (cross-selling adicional), tiendas como showrooms, personal tienda comisiona por ventas online generadas.",
      en: "Preocupación común de retailers tradicionales. Realidad: E-commerce expande mercado (alcanza clientes que no visitan tienda física por distancia/tiempo) + captura ventas que irían a competencia online. Canibalización: Existe (10-20% ventas online son de clientes que hubieran comprado en tienda) pero crecimiento total compensa con creces. Estrategia omnicanal mitiga: click & collect incentiva visita a tienda (cross-selling adicional), tiendas como showrooms, personal tienda comisiona por ventas online generadas.",
    },
  },
];
