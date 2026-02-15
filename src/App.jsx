import { useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  Briefcase,
  Building2,
  CheckCircle2,
  Cloud,
  Cpu,
  Globe2,
  Handshake,
  Mail,
  ServerCog,
  ShieldCheck,
} from 'lucide-react'

const content = {
  en: {
    nav: {
      value: 'Value',
      services: 'Services',
      proof: 'Proof',
      outsourcing: 'Outsourcing',
      contact: 'Contact',
    },
    hero: {
      badge: 'AVAILABLE FOR HIRING AND MANAGED OUTSOURCING',
      title: 'Ivan Rene Ramirez Castro',
      subtitle: 'Full Stack Engineer | DevOps | AI Integrations',
      pitch:
        'I help companies ship production-ready software with architecture discipline, cloud efficiency, and fast execution.',
      ctaHire: 'Hire Ivan',
      ctaOutsourcing: 'Request outsourcing proposal',
      trust: 'Remote-ready · English/Spanish · Enterprise mindset',
    },
    value: {
      title: 'Why companies hire me',
      items: [
        'I design systems, not only features: architecture, delivery, and operations in one flow.',
        'I reduce risk with CI/CD automation, observability, rollback strategy, and secure defaults.',
        'I optimize cloud spend while improving reliability and release speed.',
      ],
    },
    services: {
      title: 'Core services',
      cards: [
        {
          title: 'Software Engineering Leadership',
          text: 'Product-oriented execution from architecture to production release.',
        },
        {
          title: 'Cloud and DevOps',
          text: 'AWS, Azure, Cloudflare, Linux servers, IaC, CI/CD, monitoring, and recovery.',
        },
        {
          title: 'Data and AI Integrations',
          text: 'LLM workflows, search optimization, and practical AI features in production.',
        },
      ],
      stackTitle: 'Stack and infrastructure depth',
      stack: [
        'AWS, Azure, Cloudflare, DNS management',
        'Firebase, Supabase, PostgreSQL, MongoDB',
        'Docker, Terraform, CapRover, CI/CD pipelines',
        'Linux servers, performance tuning, incident response',
      ],
    },
    proof: {
      title: 'Proof of execution',
      metrics: [
        { label: 'Years of experience', value: '5+' },
        { label: 'Production deployments', value: '20+' },
        { label: 'Cloud environments', value: 'Multi-cloud' },
        { label: 'Delivery style', value: 'Automation-first' },
      ],
      casesTitle: 'Selected products and clients',
      cases: [
        {
          name: 'Micro Freeloz',
          text: 'Tournament ecosystem with full stack architecture and production deployment.',
          image: '/images/projects/micro-freeloz-home.webp',
          alt: 'Micro Freeloz home screenshot',
          link: 'https://micro.freeloz.com',
        },
        {
          name: 'Timer Freeloz',
          text: 'Productivity app with clean UX and fast performance.',
          image: '/images/projects/timer-freeloz.webp',
          alt: 'Timer Freeloz screenshot',
          link: 'https://timer.freeloz.com',
        },
        {
          name: 'Freeloz (Client)',
          text: 'Corporate site and service platform delivered for a technology client.',
          image: '/images/projects/freeloz-home.webp',
          alt: 'Freeloz client website screenshot',
          link: 'https://freeloz.com',
        },
        {
          name: 'WyTransfer (Client)',
          text: 'Unified financial platform for local and international payments and collections.',
          image: '/images/projects/wytransfer-home.webp',
          alt: 'WyTransfer home screenshot',
          link: 'https://wytransfer.com',
        },
        {
          name: 'WyCrédito (Client)',
          text: 'AI-powered business credit platform with 100% digital process for Colombian companies.',
          image: '/images/projects/wycredito-home.webp',
          alt: 'WyCrédito home screenshot',
          link: 'https://wycredito.com',
        },
      ],
    },
    outsourcing: {
      title: 'Managed outsourcing model',
      subtitle:
        'For external companies that need reliable delivery without hiring friction.',
      cards: [
        {
          title: 'Colombia legal-entity model',
          text: 'Managed outsourcing through service agreement (prestacion de servicios) with legal entity in Colombia.',
          icon: 'building',
        },
        {
          title: 'International contractor model',
          text: 'Direct contractor setup for foreign companies, with clear scope and execution ownership.',
          icon: 'globe',
        },
      ],
      bullets: [
        'Weekly reporting and technical visibility',
        'Architecture guidance + hands-on implementation',
        'Scalable team collaboration under Ivan leadership',
      ],
    },
    principles: {
      title: 'Production-ready principles',
      list: [
        'Automation over manual work',
        'Infrastructure as Code by default',
        'Security-first decisions',
        'Cost-aware cloud architecture',
        'Monitoring, logs, backups, and rollback strategy',
      ],
    },
    cta: {
      title: 'Need a senior engineer or managed outsourcing partner?',
      subtitle:
        'If you need faster delivery, safer cloud operations, and architecture ownership, we should talk.',
      hire: 'Book a technical call',
      proposal: 'Get outsourcing proposal',
    },
    footer: 'Engineered for business outcomes.',
  },
  es: {
    nav: {
      value: 'Valor',
      services: 'Servicios',
      proof: 'Resultados',
      outsourcing: 'Outsourcing',
      contact: 'Contacto',
    },
    hero: {
      badge: 'DISPONIBLE PARA CONTRATACION Y OUTSOURCING GESTIONADO',
      title: 'Ivan Rene Ramirez Castro',
      subtitle: 'Ingeniero Full Stack | DevOps | Integración de IA',
      pitch:
        'Ayudo a empresas a lanzar software listo para producción con disciplina de arquitectura, eficiencia cloud y ejecución rápida.',
      ctaHire: 'Contratar a Ivan',
      ctaOutsourcing: 'Solicitar propuesta de outsourcing',
      trust: 'Trabajo remoto · Inglés/Español · Enfoque enterprise',
    },
    value: {
      title: 'Por qué las empresas me contratan',
      items: [
        'Diseño sistemas, no solo funcionalidades: arquitectura, delivery y operación en un solo flujo.',
        'Reduzco riesgo con automatización CI/CD, observabilidad, rollback y seguridad por defecto.',
        'Optimizo costos cloud mientras mejoro confiabilidad y velocidad de entrega.',
      ],
    },
    services: {
      title: 'Servicios principales',
      cards: [
        {
          title: 'Liderazgo de ingeniería',
          text: 'Ejecución orientada a producto desde arquitectura hasta producción.',
        },
        {
          title: 'Cloud y DevOps',
          text: 'AWS, Azure, Cloudflare, servidores Linux, IaC, CI/CD, monitoreo y recuperación.',
        },
        {
          title: 'Datos e IA',
          text: 'Workflows con LLM, optimización de búsqueda y funcionalidades de IA en producción.',
        },
      ],
      stackTitle: 'Profundidad técnica en stack e infraestructura',
      stack: [
        'AWS, Azure, Cloudflare, gestión DNS',
        'Firebase, Supabase, PostgreSQL, MongoDB',
        'Docker, Terraform, CapRover, pipelines CI/CD',
        'Servidores Linux, performance e incident response',
      ],
    },
    proof: {
      title: 'Prueba de ejecución',
      metrics: [
        { label: 'Años de experiencia', value: '5+' },
        { label: 'Deploys en producción', value: '20+' },
        { label: 'Entornos cloud', value: 'Multi-cloud' },
        { label: 'Estilo de entrega', value: 'Automation-first' },
      ],
      casesTitle: 'Productos y clientes destacados',
      cases: [
        {
          name: 'Micro Freeloz',
          text: 'Ecosistema de torneos con arquitectura full stack y despliegue en producción.',
          image: '/images/projects/micro-freeloz-home.webp',
          alt: 'Captura home Micro Freeloz',
          link: 'https://micro.freeloz.com',
        },
        {
          name: 'Timer Freeloz',
          text: 'Aplicación de productividad con UX limpia y alto rendimiento.',
          image: '/images/projects/timer-freeloz.webp',
          alt: 'Captura Timer Freeloz',
          link: 'https://timer.freeloz.com',
        },
        {
          name: 'Freeloz (Cliente)',
          text: 'Sitio corporativo y plataforma de servicios para cliente tecnológico.',
          image: '/images/projects/freeloz-home.webp',
          alt: 'Captura sitio cliente Freeloz',
          link: 'https://freeloz.com',
        },
        {
          name: 'WyTransfer (Cliente)',
          text: 'Plataforma financiera unificada de pagos y recaudos locales e internacionales.',
          image: '/images/projects/wytransfer-home.webp',
          alt: 'Captura home WyTransfer',
          link: 'https://wytransfer.com',
        },
        {
          name: 'WyCrédito (Cliente)',
          text: 'Plataforma de crédito empresarial impulsada por IA con proceso 100% digital para empresas colombianas.',
          image: '/images/projects/wycredito-home.webp',
          alt: 'Captura home WyCrédito',
          link: 'https://wycredito.com',
        },
      ],
    },
    outsourcing: {
      title: 'Modelo de outsourcing gestionado',
      subtitle:
        'Para empresas externas que necesitan entrega confiable sin fricción de contratación.',
      cards: [
        {
          title: 'Modelo con persona jurídica en Colombia',
          text: 'Outsourcing gestionado vía contrato de prestación de servicios con persona jurídica en Colombia.',
          icon: 'building',
        },
        {
          title: 'Modelo contractor internacional',
          text: 'Esquema contractor para empresas extranjeras con alcance claro y ownership técnico.',
          icon: 'globe',
        },
      ],
      bullets: [
        'Reporte semanal y visibilidad técnica',
        'Guía de arquitectura + implementación hands-on',
        'Colaboración escalable con equipo liderado por Ivan',
      ],
    },
    principles: {
      title: 'Principios production-ready',
      list: [
        'Automatización sobre trabajo manual',
        'Infraestructura como código por defecto',
        'Decisiones con seguridad primero',
        'Arquitectura cloud orientada a costo',
        'Monitoreo, logs, backups y rollback',
      ],
    },
    cta: {
      title: '¿Necesitas un ingeniero senior o partner de outsourcing?',
      subtitle:
        'Si necesitas entregar más rápido, operar cloud con menos riesgo y tener ownership de arquitectura, conversemos.',
      hire: 'Agendar llamada técnica',
      proposal: 'Recibir propuesta de outsourcing',
    },
    footer: 'Ingeniería enfocada en resultados de negocio.',
  },
}

const iconMap = {
  building: Building2,
  globe: Globe2,
}

function App() {
  const [lang, setLang] = useState('en')
  const t = useMemo(() => content[lang], [lang])

  useEffect(() => {
    const stored = localStorage.getItem('lang')
    const browser = (navigator.language || '').toLowerCase().startsWith('es') ? 'es' : 'en'
    const resolved = stored || browser || 'en'
    setLang(resolved)
  }, [])

  useEffect(() => {
    localStorage.setItem('lang', lang)
    document.documentElement.lang = lang
  }, [lang])

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-blue-500/30">
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full" />
      </div>

      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#020617]/80 backdrop-blur-md px-6 py-4" aria-label="Primary">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <a href="#top" className="text-xl font-bold tracking-tighter flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg overflow-hidden border border-blue-500/40">
              <img src="/favicon.svg" alt="IR logo" className="w-full h-full" />
            </div>
            <span className="hidden sm:inline">ivanrene.com</span>
          </a>

          <div className="flex items-center gap-7 text-sm font-medium text-slate-300">
            <a href="#value" className="hover:text-white transition-colors">{t.nav.value}</a>
            <a href="#services" className="hover:text-white transition-colors">{t.nav.services}</a>
            <a href="#proof" className="hover:text-white transition-colors">{t.nav.proof}</a>
            <a href="#outsourcing" className="hover:text-white transition-colors">{t.nav.outsourcing}</a>
            <a href="#contact" className="hover:text-white transition-colors">{t.nav.contact}</a>
            <button
              onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
              className="flex items-center gap-1 px-3 py-1 rounded-full border border-slate-800 bg-slate-900/50 hover:border-slate-600 transition-all text-blue-400"
              aria-label={`Language ${lang.toUpperCase()}`}
            >
              <Globe2 size={14} />
              {lang.toUpperCase()}
            </button>
          </div>
        </div>
      </nav>

      <main id="top" className="relative z-10">
        <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-20 text-center">
          <span className="px-3 py-1 text-[10px] font-mono tracking-widest text-blue-400 border border-blue-400/30 rounded-full bg-blue-400/5">
            {t.hero.badge}
          </span>
          <h1 className="mt-6 text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent">
            {t.hero.title}
          </h1>
          <p className="mt-4 text-xl md:text-2xl font-medium text-slate-300">{t.hero.subtitle}</p>
          <p className="mt-6 text-base md:text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">{t.hero.pitch}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a href="mailto:ivanrene10@gmail.com?subject=Hiring%20Ivan" className="group bg-blue-600 text-white px-8 py-4 rounded-xl font-medium hover:bg-blue-500 transition-all duration-300 flex items-center gap-2">
              <Briefcase size={18} /> {t.hero.ctaHire}
            </a>
            <a href="mailto:ivanrene10@gmail.com?subject=Managed%20Outsourcing%20Proposal" className="bg-slate-900 border border-slate-800 px-8 py-4 rounded-xl font-medium hover:border-slate-600 transition-all flex items-center gap-2">
              <Handshake size={18} /> {t.hero.ctaOutsourcing}
            </a>
          </div>
          <p className="mt-6 text-slate-500 text-sm font-mono">{t.hero.trust}</p>
        </section>

        <section id="value" className="max-w-7xl mx-auto px-6 py-20 border-t border-white/5">
          <h2 className="text-3xl font-bold mb-8">{t.value.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.value.items.map((item) => (
              <article key={item} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
                <CheckCircle2 className="text-blue-400 mb-4" size={20} />
                <p className="text-slate-300 text-sm leading-relaxed">{item}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="services" className="max-w-7xl mx-auto px-6 py-20 border-t border-white/5">
          <h2 className="text-3xl font-bold mb-8">{t.services.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <article className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
              <ServerCog className="text-blue-400 mb-4" size={20} />
              <h3 className="font-bold mb-2">{t.services.cards[0].title}</h3>
              <p className="text-slate-400 text-sm">{t.services.cards[0].text}</p>
            </article>
            <article className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
              <Cloud className="text-blue-400 mb-4" size={20} />
              <h3 className="font-bold mb-2">{t.services.cards[1].title}</h3>
              <p className="text-slate-400 text-sm">{t.services.cards[1].text}</p>
            </article>
            <article className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
              <Cpu className="text-blue-400 mb-4" size={20} />
              <h3 className="font-bold mb-2">{t.services.cards[2].title}</h3>
              <p className="text-slate-400 text-sm">{t.services.cards[2].text}</p>
            </article>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
            <h3 className="text-xl font-bold mb-4">{t.services.stackTitle}</h3>
            <ul className="list">
              {t.services.stack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section id="proof" className="max-w-7xl mx-auto px-6 py-20 border-t border-white/5">
          <h2 className="text-3xl font-bold mb-8">{t.proof.title}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {t.proof.metrics.map((metric) => (
              <div key={metric.label} className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
                <div className="text-2xl font-bold text-blue-300">{metric.value}</div>
                <div className="text-xs text-slate-400 mt-1">{metric.label}</div>
              </div>
            ))}
          </div>

          <h3 className="text-xl font-bold mb-4">{t.proof.casesTitle}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.proof.cases.map((item) => (
              <article key={item.name} className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden">
                <img src={item.image} alt={item.alt} className="w-full h-52 object-cover" loading="lazy" />
                <div className="p-5">
                  <h4 className="font-bold mb-2">{item.name}</h4>
                  <p className="text-slate-400 text-sm mb-4">{item.text}</p>
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-blue-400 text-sm">
                    {lang === 'es' ? 'Ver proyecto' : 'View project'} <ArrowRight size={14} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="outsourcing" className="max-w-7xl mx-auto px-6 py-20 border-t border-white/5">
          <h2 className="text-3xl font-bold mb-3">{t.outsourcing.title}</h2>
          <p className="text-slate-400 mb-8">{t.outsourcing.subtitle}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {t.outsourcing.cards.map((card) => {
              const Icon = iconMap[card.icon]
              return (
                <article key={card.title} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
                  <Icon className="text-blue-400 mb-4" size={20} />
                  <h3 className="font-bold mb-2">{card.title}</h3>
                  <p className="text-slate-400 text-sm">{card.text}</p>
                </article>
              )
            })}
          </div>

          <ul className="list">
            {t.outsourcing.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-20 border-t border-white/5 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-4">{t.principles.title}</h3>
            <ul className="list">
              {t.principles.list.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div id="contact" className="bg-blue-600 rounded-2xl p-8">
            <ShieldCheck className="text-white mb-4" size={22} />
            <h3 className="text-2xl font-bold text-white mb-3">{t.cta.title}</h3>
            <p className="text-blue-50/90 text-sm mb-6">{t.cta.subtitle}</p>
            <div className="flex flex-wrap gap-3">
              <a href="mailto:ivanrene10@gmail.com?subject=Technical%20Call" className="bg-white text-blue-700 px-5 py-3 rounded-xl font-semibold inline-flex items-center gap-2">
                <Mail size={16} /> {t.cta.hire}
              </a>
              <a href="mailto:ivanrene10@gmail.com?subject=Outsourcing%20Proposal" className="bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold inline-flex items-center gap-2 border border-blue-400/30">
                <Handshake size={16} /> {t.cta.proposal}
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
        <div className="text-slate-400 text-sm">© {new Date().getFullYear()} Ivan Rene Ramirez Castro. {t.footer}</div>
        <div className="flex gap-8 text-slate-400 text-sm font-mono uppercase tracking-widest">
          <span className="text-blue-300">AWS</span>
          <span className="text-blue-300">DevOps</span>
          <span className="text-blue-300">AI</span>
        </div>
        <a href="/rss.xml" className="text-xs text-slate-400 hover:text-slate-200 transition-colors" aria-label="RSS feed">RSS</a>
      </footer>
    </div>
  )
}

export default App
