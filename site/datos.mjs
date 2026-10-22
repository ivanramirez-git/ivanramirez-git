// Contenido de ivanrene.com: una sola fuente para las páginas, los datos estructurados,
// el sitemap, el RSS y los archivos para IA (llms.txt). Solo datos reales de la hoja de
// vida, LinkedIn y los proyectos publicados; nada de cifras inventadas.

export const SITIO = {
  url: 'https://ivanrene.com',
  nombre: 'Iván René Ramírez Castro',
  corto: 'Iván Ramírez',
  correo: 'ivanrene10@gmail.com',
  telefono: '+57 312 276 0392',
  telefonoE164: '+573122760392',
  whatsapp: 'https://wa.me/573122760392',
  linkedin: 'https://www.linkedin.com/in/ivanramirez-in',
  github: 'https://github.com/ivanramirez-git',
  freeloz: 'https://freeloz.com',
  matricula: '091122-0797186 CNDC',
  geo: { lat: 6.4625, lon: -71.7303, ciudad: 'Tame', region: 'Arauca', regionCodigo: 'CO-ARA', pais: 'CO', paisNombre: 'Colombia' },
  idiomas: ['es', 'en'],
};

export const PERFIL = {
  es: {
    rol: 'Ingeniero de Software · Full Stack · SRE',
    resumen: 'Ingeniero de Sistemas de la Pontificia Universidad Javeriana con matrícula profesional COPNIA vigente. Más de seis años construyendo y operando software en producción: pagos, crédito digital, IoT, IA aplicada y nube. Trabajo en remoto desde Tame, Arauca, para empresas de Colombia y Estados Unidos.',
  },
  en: {
    rol: 'Software Engineer · Full Stack · SRE',
    resumen: 'Systems Engineer from Pontificia Universidad Javeriana with an active COPNIA professional license. Six-plus years building and running software in production: payments, digital lending, IoT, applied AI and cloud. I work remotely from Tame, Arauca (Colombia) for companies in Colombia and the United States.',
  },
};

export const STACK = {
  Web: ['Angular', 'React', 'Vue', 'Next.js', 'Astro'],
  Móvil: ['Flutter'],
  Backend: ['TypeScript', 'Node.js', 'NestJS', '.NET', 'LoopBack 4', 'Hasura', 'FastAPI'],
  Datos: ['PostgreSQL', 'Supabase', 'MySQL', 'SQL Server', 'MongoDB', 'Elasticsearch'],
  Nube: ['AWS', 'Azure', 'Cloudflare', 'Docker', 'Kubernetes', 'Terraform', 'GitLab CI/CD'],
  IA: ['OpenAI', 'Anthropic', 'Amazon Bedrock', 'n8n'],
};
export const STACK_EN = { Móvil: 'Mobile', Datos: 'Data', Nube: 'Cloud', IA: 'AI' };

export const SERVICIOS = [
  { id: 'web-movil', es: ['Desarrollo web y móvil a medida', 'Aplicaciones web con Angular, React, Vue, Next.js o Astro, y apps móviles con Flutter publicadas en Google Play y App Store.'],
    en: ['Custom web and mobile development', 'Web apps with Angular, React, Vue, Next.js or Astro, and Flutter mobile apps shipped to Google Play and the App Store.'] },
  { id: 'backend', es: ['Backend, APIs e integraciones', 'APIs REST y GraphQL con NestJS, .NET, LoopBack 4 o Hasura; integración con bancos, pasarelas de pago y servicios externos.'],
    en: ['Backend, APIs and integrations', 'REST and GraphQL APIs with NestJS, .NET, LoopBack 4 or Hasura; integrations with banks, payment gateways and third-party services.'] },
  { id: 'fintech', es: ['Pagos y fintech', 'Integración de pagos en punto de venta, plataformas de originación y gestión de crédito, verificación de identidad (KYC y biometría) y firma electrónica.'],
    en: ['Payments and fintech', 'Point-of-sale payment integrations, lending origination and management platforms, identity verification (KYC and biometrics) and e-signature.'] },
  { id: 'nube-sre', es: ['Nube, DevOps y SRE', 'Infraestructura en AWS, Azure y Cloudflare con Docker, Kubernetes y Terraform; pipelines de CI/CD, monitoreo y operación 24/7 en producción.'],
    en: ['Cloud, DevOps and SRE', 'Infrastructure on AWS, Azure and Cloudflare with Docker, Kubernetes and Terraform; CI/CD pipelines, monitoring and 24/7 production operations.'] },
  { id: 'ia', es: ['IA aplicada y automatización', 'Análisis de documentos con IA, búsqueda con Elasticsearch, integraciones con OpenAI, Anthropic y Amazon Bedrock, y automatización con n8n.'],
    en: ['Applied AI and automation', 'AI document analysis, Elasticsearch-powered search, integrations with OpenAI, Anthropic and Amazon Bedrock, and n8n automation.'] },
  { id: 'iot', es: ['IoT y control de acceso', 'Software que opera en el mundo físico, como control de acceso IoT en aeropuertos y el sistema de un hotel inteligente que funciona 24/7.'],
    en: ['IoT and access control', 'Software that runs in the physical world, such as IoT access control at airports and the system of a smart hotel that runs 24/7.'] },
];

export const PROYECTOS = [
  { slug: 'wycredito', n: 'WyCrédito', url: 'https://wycredito.com', img: 'wycredito-home.webp', t: 'cliente', c: ['Fintech', 'KYC', 'IA'], cat: 'FinanceApplication',
    es: 'Crédito empresarial 100 % digital con IA para empresas colombianas.', en: '100% digital business lending with AI for Colombian companies.' },
  { slug: 'wytransfer', n: 'WyTransfer', url: 'https://wytransfer.com', img: 'wytransfer-home.webp', t: 'cliente', c: ['Pagos', 'Bancos', 'Nube'], cat: 'FinanceApplication',
    es: 'Pagos y cobros locales e internacionales en una sola plataforma.', en: 'Local and international payments and collections in one platform.' },
  { slug: 'micro', n: 'Micro · Freeloz', url: 'https://micro.freeloz.com', img: 'micro-freeloz-home.webp', t: 'producto', c: ['Vue 3', 'LoopBack 4', 'MongoDB', 'MinIO', 'Terraform', 'AWS'], cat: 'SportsApplication',
    repos: ['torneo-de-micro-web', 'torneo-de-micro-api'],
    es: 'Torneos de microfútbol: landing y panel para gestionar equipos, fases, grupos y partidos, con goles, tarjetas y faltas. API documentada con Swagger, copias de MongoDB a almacenamiento S3 y despliegue con Terraform en AWS.',
    en: 'Futsal tournaments: a landing page and an admin panel for teams, stages, groups and matches, with goals, cards and fouls. Swagger-documented API, MongoDB backups to S3-compatible storage and Terraform deployment on AWS.' },
  { slug: 'vinculaform', n: 'VinculaForm', url: 'https://vinculaform.com', img: 'vinculaform-home.webp', t: 'cliente', c: ['Formularios', 'Multi-tenant', 'Compliance'], cat: 'BusinessApplication',
    es: 'Vinculación digital multipaso para cumplimiento financiero, con formularios configurables y arquitectura multi-tenant.', en: 'Multi-step digital onboarding for financial compliance, with configurable forms and a multi-tenant architecture.' },
  { slug: 'platanocontrol', n: 'PlátanoControl', url: 'https://platanocontrol.com', img: 'platanocontrol-home.webp', t: 'producto', c: ['PWA', 'Android', 'Agro'], cat: 'BusinessApplication',
    es: 'Gestión agrícola para productores de plátano: gastos, labores de campo y operación de la finca. PWA y app Android.', en: 'Farm management for plantain growers: expenses, field work and farm operations. PWA and Android app.' },
  { slug: 'tesorteo', n: 'TeSorteo', url: 'https://tesorteo.com', img: 'tesorteo-home.webp', t: 'producto', c: ['Wompi', 'GA4', 'Multi-tenant'], cat: 'EntertainmentApplication',
    es: 'Plataforma de rifas en línea con pagos Wompi, analítica GA4 y arquitectura multi-tenant.', en: 'Online raffle platform with Wompi payments, GA4 analytics and a multi-tenant architecture.' },
  { slug: 'celularesbaratos', n: 'CelularesBaratos', url: 'https://celularesbaratos.ivanrene.com', img: 'celularesbaratos-home.webp', t: 'producto', c: ['PayPal', 'Automatización'], cat: 'ShoppingApplication',
    es: 'Catálogo de e-commerce generado a partir de un PDF mayorista, con carrito, pago con PayPal y actualización diaria automática.', en: 'E-commerce catalog generated from a wholesale PDF, with a cart, PayPal checkout and automatic daily updates.' },
  { slug: 'paypay', n: 'PayPay', url: '', img: 'paypay-home.webp', t: 'interno', c: ['FastAPI', 'Wompi'], cat: 'FinanceApplication',
    es: 'Microservicio central de pagos con Wompi que usan varias plataformas. FastAPI, autenticación con API keys y ambientes de producción y desarrollo.', en: 'Central Wompi payments microservice used by several platforms. FastAPI, API-key authentication and production and development environments.' },
  { slug: 'freeloz', n: 'Freeloz', url: 'https://freeloz.com', img: 'freeloz-home.webp', t: 'producto', c: ['Web'], cat: 'BusinessApplication',
    es: 'Sitio corporativo y plataforma de servicios de Freeloz S.A.S., la empresa de software a medida de la que soy socio.', en: 'Corporate site and services platform of Freeloz S.A.S., the custom-software company I co-own.' },
  { slug: 'timer', n: 'Timer · Freeloz', url: 'https://timer.freeloz.com', img: 'timer-freeloz.webp', t: 'producto', c: ['Productividad'], cat: 'UtilitiesApplication',
    es: 'App web de productividad de Freeloz.', en: 'Freeloz productivity web app.' },
];

export const AREA_EN = { Pagos: 'Payments', Bancos: 'Banks', Nube: 'Cloud', Formularios: 'Forms', IA: 'AI', Agro: 'Agri', Automatización: 'Automation', Productividad: 'Productivity' };
export const AREA_COLOR = { Fintech: '#3E3BD6', KYC: '#7C3AED', IA: '#F59E0B', Pagos: '#16A34A', Bancos: '#0EA5E9', Nube: '#64748B', 'Multi-tenant': '#DB2777', Formularios: '#0891B2', Compliance: '#7C3AED', 'Vue 3': '#41B883', 'LoopBack 4': '#3F5DFF', MongoDB: '#47A248', MinIO: '#C72E49', Terraform: '#7B42BC', AWS: '#FF9900', PWA: '#5A0FC8', Android: '#3DDC84', Agro: '#65A30D', Wompi: '#2E3192', GA4: '#E37400', PayPal: '#003087', Automatización: '#0EA5E9', FastAPI: '#009688', Web: '#3E3BD6', Productividad: '#F59E0B' };

export const CARRERA = [
  { y: 2025, desde: '2025-04', tipo: 'feat', org: "Wait N' Rest", es: "Full Stack + SRE en Wait N' Rest", en: "Full Stack + SRE at Wait N' Rest",
    mes: { es: 'abr 2025 – hoy · Miami, FL (remoto)', en: 'Apr 2025 – now · Miami, FL (remote)' },
    b: { es: ['Operación 24/7 del sistema de un hotel inteligente.', 'Monitoreo, incidentes en producción y rendimiento.', 'Pipelines de CI/CD para desplegar sin romper.'],
         en: ["24/7 operation of a smart hotel's system.", 'Monitoring, production incidents and performance.', 'CI/CD pipelines to ship without breaking things.'] },
    tags: [['SRE', ''], ['CI/CD', ''], ['24/7', 'verde']] },
  { y: 2025, desde: '2025-10-14', tipo: 'chore', es: 'Matrícula COPNIA vigente', en: 'COPNIA professional license',
    mes: { es: '14 oct 2025', en: 'Oct 14, 2025' },
    b: { es: ['Matrícula profesional 091122-0797186 CNDC, Ingeniería de Sistemas.'], en: ['Professional license 091122-0797186 CNDC, Systems Engineering.'] },
    tags: [['credencial', 'verde']] },
  { y: 2024, desde: '2024-09', tipo: 'feat', org: 'CCSolutions', es: 'Full Stack & DevOps en CCSolutions', en: 'Full Stack & DevOps at CCSolutions',
    mes: { es: 'sep 2024 – jul 2025 · Bogotá (remoto)', en: 'Sep 2024 – Jul 2025 · Bogotá (remote)' },
    b: { es: ['Astro, Vue y Flutter; CI/CD con GitLab hacia .NET en Azure.', 'Infraestructura multi-nube: EC2 en AWS, VPS, DNS en Cloudflare y Route 53.', 'Contenedores con CapRover y GitLab CE autogestionado.'],
         en: ['Astro, Vue and Flutter; GitLab CI/CD to .NET on Azure.', 'Multi-cloud infrastructure: AWS EC2, VPS, DNS on Cloudflare and Route 53.', 'Containers with CapRover and self-hosted GitLab CE.'] },
    tags: [['devops', ''], ['multi-nube', '']] },
  { y: 2024, desde: '2024-09-05', tipo: 'release', es: 'Ingeniero de Sistemas · Javeriana', en: 'Systems Engineer · Javeriana',
    mes: { es: '5 sep 2024', en: 'Sep 5, 2024' },
    b: { es: ['Grado en la Pontificia Universidad Javeriana, Bogotá.'], en: ['Graduated from Pontificia Universidad Javeriana, Bogotá.'] },
    tags: [['educación', 'verde']] },
  { y: 2024, desde: '2024-01', tipo: 'feat', org: 'TechD', es: 'Apps web con IA en TechD', en: 'AI web apps at TechD',
    mes: { es: 'ene – sep 2024 · Miami, FL (remoto)', en: 'Jan – Sep 2024 · Miami, FL (remote)' },
    b: { es: ['Apps en Next.js que procesan audio, PDF, imágenes y texto.', 'NeuralSeek con OpenAI, Anthropic y Amazon Bedrock; Elasticsearch para búsqueda.'],
         en: ['Next.js apps that process audio, PDFs, images and text.', 'NeuralSeek with OpenAI, Anthropic and Amazon Bedrock; Elasticsearch for search.'] },
    tags: [['ia', 'ambar']] },
  { y: 2023, desde: '2023-03', tipo: 'feat', org: 'Double V Partners', es: 'Full Stack en Double V Partners', en: 'Full Stack at Double V Partners',
    mes: { es: 'mar 2023 – sep 2024 · Bogotá (remoto)', en: 'Mar 2023 – Sep 2024 · Bogotá (remote)' },
    b: { es: ['Angular con Clean Architecture y Redux; Flutter con Bloc y GetX.', 'CQRS en .NET y APIs REST y GraphQL con NestJS y Hasura.', 'Ambientes en AWS con Docker; publicación en Google Play y App Store.'],
         en: ['Angular with Clean Architecture and Redux; Flutter with Bloc and GetX.', 'CQRS in .NET and REST/GraphQL APIs with NestJS and Hasura.', 'AWS environments with Docker; Google Play and App Store releases.'] },
    tags: [['web', ''], ['móvil', '']] },
  { y: 2022, desde: '2022-11', tipo: 'feat', org: 'EY', es: 'Full Stack en EY', en: 'Full Stack at EY',
    mes: { es: 'nov 2022 – mar 2023 · Bogotá (híbrido)', en: 'Nov 2022 – Mar 2023 · Bogotá (hybrid)' },
    b: { es: ['Migración de bases de datos, informes y backend.', 'Pipelines en Azure DevOps con SQL, Python y Azure.'], en: ['Database migration, reporting and backend.', 'Azure DevOps pipelines with SQL, Python and Azure.'] },
    tags: [['datos', '']] },
  { y: 2020, desde: '2020-10', tipo: 'init', org: 'Kloustr Labs', es: 'Primeros MVPs en Kloustr Labs', en: 'First MVPs at Kloustr Labs',
    mes: { es: 'oct 2020 – mar 2023 · Bogotá', en: 'Oct 2020 – Mar 2023 · Bogotá' },
    b: { es: ['MVPs para startups: pantallas, frontend, backend y soporte.', 'Flutter, Angular, Node.js, MongoDB y GitLab.'], en: ['MVPs for startups: screens, frontend, backend and support.', 'Flutter, Angular, Node.js, MongoDB and GitLab.'] },
    tags: [['startups', 'ambar']] },
  { y: 2017, desde: '2017-01', tipo: 'init', es: 'Ingeniería de Sistemas en la Javeriana', en: 'Systems Engineering at Javeriana',
    mes: { es: '2017 – 2021 · Bogotá', en: '2017 – 2021 · Bogotá' },
    b: { es: ['Énfasis en Desarrollo Avanzado de Software: calidad y AWS.', 'Proyecto de grado: web y app para una fundación con Flutter, LoopBack 4 y AWS.'],
         en: ['Advanced Software Development track: quality and AWS.', 'Capstone: website and app for a nonprofit with Flutter, LoopBack 4 and AWS.'] },
    tags: [['educación', 'verde']] },
];

export const MODELOS = [
  { es: ['Empresas en Colombia', 'Outsourcing gestionado por prestación de servicios con persona jurídica en Colombia, con alcance y entregas claras.'],
    en: ['Companies in Colombia', 'Managed outsourcing through a services agreement with a Colombian legal entity, with clear scope and deliveries.'] },
  { es: ['Empresas del exterior', 'Contratista internacional directo, en inglés o español, con horario solapado con EE. UU.'],
    en: ['Companies abroad', 'Direct international contractor, in English or Spanish, with hours overlapping the US.'] },
  { es: ['Con equipo, vía Freeloz', 'Si el proyecto necesita más manos, lo armamos con Freeloz: presupuesto cerrado por fase y demo cada 1–2 semanas.'],
    en: ['With a team, through Freeloz', 'If the project needs more hands, we build it with Freeloz: fixed budget per phase and a demo every 1–2 weeks.'] },
];

export const FAQ = [
  { es: ['¿Quién es Iván René Ramírez Castro?', 'Es un Ingeniero de Software colombiano, Full Stack y SRE, graduado como Ingeniero de Sistemas de la Pontificia Universidad Javeriana (2024) y con matrícula profesional COPNIA 091122-0797186 CNDC vigente. Lleva más de seis años construyendo y operando software en producción y trabaja en remoto desde Tame, Arauca. Es socio de Freeloz S.A.S.'],
    en: ['Who is Iván René Ramírez Castro?', 'He is a Colombian Software Engineer, Full Stack and SRE, who graduated as a Systems Engineer from Pontificia Universidad Javeriana (2024) and holds an active COPNIA professional license (091122-0797186 CNDC). He has spent six-plus years building and running software in production and works remotely from Tame, Arauca. He co-owns Freeloz S.A.S.'] },
  { es: ['¿Qué tipo de proyectos desarrolla?', 'Plataformas de pagos y crédito digital, vinculación digital con KYC y biometría, firma electrónica, integraciones con bancos, control de acceso IoT, aplicaciones web y móviles, IA aplicada al análisis de documentos, e infraestructura en la nube con operación 24/7.'],
    en: ['What kind of projects does he build?', 'Payment and digital-lending platforms, digital onboarding with KYC and biometrics, e-signature, bank integrations, IoT access control, web and mobile apps, AI for document analysis, and cloud infrastructure with 24/7 operations.'] },
  { es: ['¿Con qué tecnologías trabaja?', 'TypeScript y Node.js, Angular, React, Vue, Next.js, Flutter, NestJS, .NET, PostgreSQL, Supabase, MongoDB, AWS, Azure, Cloudflare, Docker, Kubernetes, Terraform, GitLab CI/CD, y modelos de OpenAI, Anthropic y Amazon Bedrock.'],
    en: ['Which technologies does he use?', 'TypeScript and Node.js, Angular, React, Vue, Next.js, Flutter, NestJS, .NET, PostgreSQL, Supabase, MongoDB, AWS, Azure, Cloudflare, Docker, Kubernetes, Terraform, GitLab CI/CD, and models from OpenAI, Anthropic and Amazon Bedrock.'] },
  { es: ['¿Trabaja con empresas fuera de Colombia?', 'Sí. Trabaja en remoto, en inglés o en español, con horario solapado con Estados Unidos. Ha trabajado para empresas con sede en Miami, como Wait N\' Rest y TechD.'],
    en: ['Does he work with companies outside Colombia?', "Yes. He works remotely, in English or Spanish, with hours that overlap the US. He has worked for Miami-based companies such as Wait N' Rest and TechD."] },
  { es: ['¿Cómo se le puede contratar?', 'Hay tres formas: outsourcing gestionado con persona jurídica en Colombia, contratista internacional directo para empresas del exterior, o con un equipo a través de Freeloz, con presupuesto cerrado por fase y demo cada 1–2 semanas.'],
    en: ['How can I hire him?', 'There are three ways: managed outsourcing with a Colombian legal entity, a direct international contractor agreement for companies abroad, or with a team through Freeloz, with a fixed budget per phase and a demo every 1–2 weeks.'] },
  { es: ['¿Cuánto cuesta un proyecto?', 'Depende del alcance. Lo más rápido es escribirle por WhatsApp con dos líneas sobre lo que necesitas; para proyectos con equipo, Freeloz entrega un estimado con alcance y presupuesto cerrado por fase.'],
    en: ['How much does a project cost?', 'It depends on scope. The fastest route is a two-line WhatsApp message about what you need; for team projects, Freeloz provides an estimate with scope and a fixed budget per phase.'] },
  { es: ['¿Da soporte después del lanzamiento?', 'Sí. Su perfil es SRE: monitoreo, atención de incidentes, pipelines de CI/CD y operación continua del sistema en producción. El código, la nube y la documentación quedan a nombre del cliente desde el primer día.'],
    en: ['Does he provide support after launch?', "Yes. He is an SRE: monitoring, incident response, CI/CD pipelines and ongoing production operations. Code, cloud accounts and documentation belong to the client from day one."] },
  { es: ['¿Dónde está ubicado y cómo lo contacto?', 'Vive en Tame, Arauca, Colombia (UTC−5) y trabaja en remoto. Puedes escribirle por WhatsApp al +57 312 276 0392, al correo ivanrene10@gmail.com o por LinkedIn (in/ivanramirez-in).'],
    en: ['Where is he based and how do I contact him?', 'He lives in Tame, Arauca, Colombia (UTC−5) and works remotely. Message him on WhatsApp at +57 312 276 0392, email ivanrene10@gmail.com or reach him on LinkedIn (in/ivanramirez-in).'] },
];

export const COMPROMISOS = {
  es: ['<b>Hablas con quien programa.</b> Sin intermediarios.', '<b>Tu código, tu nube, tu documentación.</b> A tu nombre desde el primer día.', '<b>Demo funcional</b> cada 1–2 semanas.', '<b>No desaparezco al lanzar.</b> Monitoreo y operación después.'],
  en: ['<b>You talk to the person who codes.</b> No middlemen.', '<b>Your code, your cloud, your docs.</b> In your name from day one.', '<b>Working demo</b> every 1–2 weeks.', "<b>I don't vanish after launch.</b> Monitoring and operation afterwards."],
};

// Páginas: ruta en español, ruta en inglés, título y descripción (≤ 160) por idioma.
export const PAGINAS = {
  resumen: { es: '/', en: '/en/',
    titulo: { es: 'Iván René Ramírez Castro · Ingeniero de Software Full Stack y SRE', en: 'Iván René Ramírez Castro · Full Stack Software Engineer & SRE' },
    desc: { es: 'Ingeniero de Software Full Stack y SRE en Colombia. Construyo y opero plataformas de pagos, crédito digital, IoT e IA en producción, en remoto.',
            en: 'Full Stack Software Engineer and SRE in Colombia. I build and run payments, digital lending, IoT and AI platforms in production, remotely.' } },
  proyectos: { es: '/proyectos/', en: '/en/projects/',
    titulo: { es: 'Proyectos en producción · Iván Ramírez', en: 'Projects in production · Iván Ramírez' },
    desc: { es: 'Productos que construí u opero: WyCrédito, WyTransfer, VinculaForm, Micro, PlátanoControl, TeSorteo y más, con su stack y enlaces.',
            en: 'Products I built or run: WyCrédito, WyTransfer, VinculaForm, Micro, PlátanoControl, TeSorteo and more, with their stack and links.' } },
  servicios: { es: '/servicios/', en: '/en/services/',
    titulo: { es: 'Servicios de desarrollo de software · Iván Ramírez', en: 'Software development services · Iván Ramírez' },
    desc: { es: 'Desarrollo web y móvil a medida, APIs, pagos y fintech, nube, DevOps y SRE, IA aplicada e IoT. Remoto desde Colombia para empresas de todo el mundo.',
            en: 'Custom web and mobile development, APIs, payments and fintech, cloud, DevOps and SRE, applied AI and IoT. Remote from Colombia for companies worldwide.' } },
  trayectoria: { es: '/trayectoria/', en: '/en/career/',
    titulo: { es: 'Trayectoria profesional · Iván Ramírez', en: 'Career · Iván Ramírez' },
    desc: { es: "Experiencia en Wait N' Rest, CCSolutions, TechD, Double V Partners, EY y Kloustr Labs. Ingeniero de Sistemas de la Javeriana con matrícula COPNIA.",
            en: "Experience at Wait N' Rest, CCSolutions, TechD, Double V Partners, EY and Kloustr Labs. Systems Engineer from Javeriana with a COPNIA license." } },
  preguntas: { es: '/preguntas/', en: '/en/faq/',
    titulo: { es: 'Preguntas frecuentes · Contratar a Iván Ramírez', en: 'FAQ · Hiring Iván Ramírez' },
    desc: { es: 'Quién es, qué proyectos desarrolla, con qué tecnologías, cómo se contrata, cuánto cuesta y cómo contactarlo.',
            en: 'Who he is, what he builds, which technologies he uses, how to hire him, what it costs and how to get in touch.' } },
  contacto: { es: '/contacto/', en: '/en/contact/',
    titulo: { es: 'Contacto · Iván Ramírez, Ingeniero de Software', en: 'Contact · Iván Ramírez, Software Engineer' },
    desc: { es: 'Escríbeme por WhatsApp o correo. Respondo yo, sin intermediarios, en horario de Colombia (UTC−5). Tres formas de trabajar juntos.',
            en: 'Message me on WhatsApp or email. I answer myself, no middlemen, on Colombia time (UTC−5). Three ways to work together.' } },
};
export const ORDEN_TABS = ['resumen', 'proyectos', 'servicios', 'trayectoria', 'preguntas', 'contacto'];
export const TAB_NOMBRE = {
  resumen: { es: 'Resumen', en: 'Overview' }, proyectos: { es: 'Proyectos', en: 'Projects' }, servicios: { es: 'Servicios', en: 'Services' },
  trayectoria: { es: 'Trayectoria', en: 'Career' }, preguntas: { es: 'Preguntas', en: 'FAQ' }, contacto: { es: 'Contacto', en: 'Contact' },
};
export const RUTA_PROYECTO = { es: (s) => `/proyectos/${s}/`, en: (s) => `/en/projects/${s}/` };
