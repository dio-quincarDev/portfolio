export default {
  nav: {
    home: 'INICIO',
    projects: 'PROYECTOS',
    about: 'SOBRE MÍ',
    switchLang: 'Cambiar idioma',
    toggleDark: 'Cambiar modo oscuro',
    toggleMenu: 'Abrir/cerrar menú de navegación',
  },
  approach: {
    eyebrow: 'ENFOQUE',
    title: 'Cómo trabajo',
    items: {
      optimize: {
        title: 'Optimizo antes de escalar',
        text: 'Optimizo el uso de recursos antes de agregar capacidad. JVM tuning, código limpio y arquitectura cuidadosa, no más hardware.',
      },
      stability: {
        title: 'Diseño para la Estabilidad',
        text: 'Health checks, degradación gradual y aislamiento de fallos desde el inicio. Sistemas que se autoprotegen y se mantienen predecibles bajo carga.',
      },
      compatibility: {
        title: 'Construyo para compatibilidad',
        text: 'Contenedores multi-arquitectura y configuraciones portables. Sin vendor lock-in, sin sorpresas al cambiar de entorno.',
      },
      documentation: {
        title: 'Documento decisiones',
        text: 'Cada decisión de arquitectura tiene un porqué. Documento trade-offs y alternativas para que el equipo entienda no solo el qué, sino el porqué.',
      },
    },
  },
  hero: {
    name: 'DIÓGENES QUINTERO',
    title: 'BACKEND JAVA DEVELOPER',
    capabilities: 'Backend · API · Arquitectura · Seguridad',
    tagline: 'Construyo sistemas backend seguros y robustos que escalan.',
    cta: {
      projects: 'Explorar Proyectos',
      approach: 'Cómo Trabajo',
      contact: 'Contacto',
    },
  },
  services: {
    eyebrow: 'SERVICIOS',
    title: 'Qué Hago',
    items: [
      {
        key: 'api',
        title: 'Diseño y Desarrollo de APIs',
        text: 'APIs RESTful con Spring Boot, con contratos claros, manejo de errores adecuado y documentación completa.',
      },
      {
        key: 'architecture',
        title: 'Arquitectura Backend',
        text: 'Arquitecturas modulares y hexagonales que separan responsabilidades y mantienen el dominio limpio. Resiliencia desde el día uno.',
      },
      {
        key: 'production',
        title: 'Sistemas en Producción',
        text: 'Pipelines de CI/CD, monitoreo y observabilidad. Sistemas desplegables, mantenibles y observables en producción.',
      },
    ],
  },
  projects: {
    title: 'PROYECTOS',
    eyebrow: 'CASOS REALES',
    viewSource: 'Ver código fuente',
    viewVideo: 'Ver video explicativo',
    theProblem: 'EL PROBLEMA',
    theSolution: 'LA SOLUCIÓN',
    keyDecisions: 'DECISIONES CLAVE',
    empty: 'No hay proyectos aún.',
    diagram: 'Arquitectura',
    video: 'Video',
    tryDemo: 'Probar Demo',
    tryApi: 'Explorar API',
    hideSwagger: 'Cerrar',
    inProgress: 'En Proceso',
    categories: {
      'personal-project': { eyebrow: 'PORTAFOLIO', title: 'Proyectos' },
      challenge: { eyebrow: 'RETOS', title: 'Retos de Código' },
      community: { eyebrow: 'COMUNIDAD', title: 'Open Source y Comunidad' },
    },
    comingSoon: {
      name: 'Próximamente',
      description: 'Un nuevo proyecto está en progreso. Vuelve pronto para novedades.',
    },
    authService: {
      name: 'Auth Service',
      description:
        'Sistema de autenticación y autorización stateless basado en JWT con Spring Security. Implementa RBAC, hashing BCrypt y 46 tests entre unit, integration y slice.',
      problem:
        'Los microservicios necesitan autenticación centralizada sin sesiones HTTP. Cada servicio debe validar tokens de forma independiente.',
      solution:
        'Auth stateless con JWT HMAC-SHA256, OncePerRequestFilter y RBAC vía PreAuthorize. 46 tests cubriendo seguridad, validación y casos borde.',
      decisions: [
        'JWT sobre sesiones: stateless, sin Redis para almacenar tokens',
        'HMAC-SHA256 sobre RSA: gestión de llaves más simple para servicios internos',
        'BCrypt con fuerza configurable para hashing de passwords',
        'MapStruct para mapeo DTO limpio sin overhead de reflection',
      ],
    },
    featureFlagApi: {
      name: 'Feature Flag API',
      description:
        'Sistema de control dinámico de funcionalidades (Feature Toggles) para arquitecturas distribuidas. Permite activar/desactivar módulos en tiempo real por entorno o cliente sin despliegues adicionales.',
      problem:
        'Deployar cambios de config requiere redeploy completo. Cada deploy = riesgo de downtime + 2-5 min de cold start.',
      solution:
        'Feature toggles con Redis Pub/Sub para propagación en tiempo real. Circuit breaker para aislamiento de fallos.',
      decisions: [
        'Redis Pub/Sub vs Kafka: 500MB menos de memoria por instancia',
        'SQLite para dev, PostgreSQL para prod',
        'Resilience4j circuit breaker para auto-protección',
      ],
    },
    skillLink: {
      name: 'SkillLink',
      description:
        'Plataforma que conecta desarrolladores a través de mentorías y desafíos técnicos. Construida para Alumnithon (2025 Hackathon) de Alura Latam.',
      problem:
        'Los desarrolladores junior enfrentan dificultades para encontrar mentores y proyectos reales. Las plataformas existentes carecen de mentoría estructurada combinada con desafíos técnicos.',
      solution:
        'Plataforma full-stack con autenticación JWT, chat WebSocket en tiempo real, programación de mentorías, desafíos técnicos y gestión de perfiles. Desplegada en Render.',
      decisions: [
        'Arquitectura monolítica para velocidad del MVP — diseñada para futura extracción a microservicios',
        'WebSocket sobre polling para chat en tiempo real — menor latencia, soporte nativo de Spring',
        'Single Table Inheritance para la jerarquía de Content — consultas más simples en MVP',
        'HikariCP connection pooling — listo para producción sin configuración extra',
        'Tabla por colección para tecnologías de perfil — normalizado y buscable',
      ],
    },
    sportPulse: {
      name: 'SportPulse',
      description:
        'Plataforma de analítica de fútbol en tiempo real con arquitectura de microservicios. Construida por un equipo de 5 personas consumiendo datos de API-Football (RapidAPI).',
      problem:
        'Los datos de fútbol de APIs externas deben consumirse eficientemente y distribuirse entre servicios sin duplicar solicitudes ni exceder límites de tasa (100 req/día).',
      solution:
        '7 microservicios detrás de un gateway con rate limiting Bucket4j, cache Caffeine (TTL 5 min), circuit breakers Resilience4J y PostgreSQL por servicio para independencia de esquemas.',
      decisions: [
        'Microservicios sobre monolite — notificaciones requiere escalado independiente',
        'Feign síncrono sobre mensajería asíncrona — simplicidad inicial, baja necesidad de consistencia eventual',
        'PostgreSQL por servicio — independencia de esquemas, evita cuello de botella de BD única',
        'Cache Caffeine en memoria sobre Redis — operaciones más simples, cada servicio gestiona sus datos',
        'Bucket4j en gateway — punto de control único para rate limiting',
        'Resilience4J circuit breakers — evita cascadas de fallos entre servicios',
      ],
    },
    swissRoute: {
      name: 'SwissRoute',
      description:
        'Backend para planificación y seguimiento de viajes en transporte público. Integra la Swiss Public Transport API (opendata.ch) con capa de persistencia PostgreSQL.',
      problem:
        'Los usuarios necesitan un backend unificado para buscar conexiones de transporte público suizo, guardar rutas favoritas y rastrear historial de búsquedas consumiendo una API externa sin sobrecargar.',
      solution:
        'API REST con Spring Boot y WebClient para consumo de API externa, PostgreSQL para datos de usuario (favoritos, historial), migraciones Flyway y documentación Swagger.',
      decisions: [
        'WebClient sobre RestTemplate — llamadas HTTP reactivas y no bloqueantes a la API externa',
        'Datos de API externa devueltos en tiempo real — no se cachean, los datos de transporte cambian constantemente',
        'PostgreSQL para persistencia — datos relacionales estructurados con migraciones Flyway',
        'Capa de mapeo DTO para desacoplar respuestas de API externa de los modelos internos',
        'Historial de búsquedas registrado automáticamente en cada consulta de conexiones — sin acción extra del usuario',
      ],
    },
    carRent: {
      name: 'CarRent',
      description:
        'Sistema integral de gestión de alquiler de vehículos con seguridad JWT, notificaciones SMS, alertas en tiempo real vía WebSocket y generación de reportes dinámicos (PDF/Excel).',
      problem:
        'Los negocios de alquiler de vehículos carecen de un sistema integrado para gestionar flota, clientes, contratos y generar reportes operativos — dependiendo de hojas de cálculo y seguimiento manual.',
      solution:
        'API REST con Spring Security + JWT para acceso por roles (ADMIN/USER), migraciones Flyway, mapeo DTO con MapStruct, SMS multi-proveedor (Twilio/Vonage), alertas WebSocket y reportes con iText/Apache POI.',
      decisions: [
        'Patrón Strategy para proveedores SMS — intercambiar Twilio/Vonage vía config sin cambiar código',
        'WebSocket push sobre polling — alertas instantáneas a administradores por alquileres por vencer',
        'Flyway sobre ddl-auto de JPA — migraciones versionadas y auditables de esquema',
        'Capa DTO con MapStruct — desacopla contratos API de entidades JPA',
        'iText + Apache POI para reportes — genera PDF y Excel sin vendor lock-in',
      ],
    },
    employeeManagement: {
      name: 'Employee Management',
      description:
        'Sistema full-stack de gestión de empleados para un bar control de asistencia, horarios, consumos, nóminas y reportes semanales automatizados con envío por email.',
      problem:
        'Los bares pequeños carecen de un sistema accesible para gestionar empleados, rastrear asistencia, controlar consumos y generar reportes de nómina dependiendo de papel y lápiz.',
      solution:
        'API REST con Spring Boot y JWT, migraciones Flyway, reportes PDF semanales automatizados vía Thymeleaf + email, y frontend Vue.js/Quasar para gestión en tiempo real.',
      decisions: [
        'Full-stack (Spring + Vue/Quasar) sobre monolitico — contrato API claro, independencia del frontend',
        'Thymeleaf para plantillas de email — renderizado del lado del servidor para reportes PDF',
        'Migraciones Flyway sobre ddl-auto — esquema versionado para producción',
        'H2 en memoria para dev, MySQL para prod — desarrollo local sin configuración',
        'Reportes semanales automatizados vía tareas programadas — sin generación manual de reportes',
      ],
    },
    pymesAdmin: {
      name: 'PymeQ',
      description:
        'Plataforma SaaS multi-tenant de gestión financiera con toolkit de contabilidad forense impulsado por IA para PYMEs LATAM. 310 tests en 3 servicios backend.',
      problem:
        'Las PYMEs LATAM carecen de herramientas de gestión financiera accesibles con aislamiento multi-tenant adecuado, detección de anomalías por IA y reglas contables LATAM.',
      solution:
        'Arquitectura de 3 microservicios (Auth + Gateway + Core) con OAuth2/JWT, PostgreSQL multi-schema, Redis caching, frontend Vue.js/Quasar PWA y CI/CD en Oracle Cloud.',
      decisions: [
        'PostgreSQL multi-schema sobre BD separadas — backups más simples y compartición entre tenants',
        'Gateway WebFlux sobre MVC — enrutamiento no bloqueante, mejora bajo tenants concurrentes',
        'OAuth2 + JWT sobre sesiones — stateless, refresh tokens, login con Google OAuth2',
        'Redis para blacklist + cache — invalidación JWT y cache de permisos en un solo servicio',
        'GitHub Actions + Docker multi-arch — un solo CI/CD para x86 y ARM64 (Oracle Free Tier)',
        'PWA sobre app nativa — deploy instantáneo, sin app store, funciona offline para facturas',
      ],
    },
  },
  contact: {
    title: 'CONTACTO',
    eyebrow: 'HABLEMOS',
    name: 'Nombre',
    email: 'Correo',
    message: 'Mensaje',
    submit: 'Enviar Mensaje',
    sent: 'Mensaje enviado. Te responderé pronto.',
    error: 'Algo salió mal. Intenta de nuevo.',
    open: 'Envíame un mensaje',
    close: 'Cerrar',
    cooldown: 'Espera un momento antes de enviar otro mensaje.',
    nameRequired: 'El nombre es obligatorio.',
    emailRequired: 'El correo es obligatorio.',
    emailInvalid: 'Ingresa un correo válido.',
    messageRequired: 'El mensaje es obligatorio.',
  },
  about: {
    metaTitle: 'Sobre Mí — Diógenes Quintero',
    metaDescription:
      'Backend Java Developer especializado en Spring Boot, APIs robustas y arquitectura limpia. Java 21, Docker, PostgreSQL, Redis.',
    title: 'Diógenes Quintero',
    subtitle: 'Backend Java Developer',
    bio: 'Construyo software enfocado en seguridad y robustez. Con experiencia en APIs, infraestructura y todo el ecosistema backend, entrego sistemas mantenibles, performantes y listos para producción.',
    whatIBring: 'Lo Que Llevo al Equipo',
    skillsEyebrow: 'HABILIDADES',
    connectEyebrow: 'CONECTEMOS',
    connectTitle: 'Conectemos',
    skills: {
      robust: {
        title: 'Sistemas que no fallan',
        text: 'Health checks, degradación gradual y aislamiento de fallos en cada servicio. Construyo sistemas que anticipan fallos y los manejan sin romperse.',
      },
      economical: {
        title: 'Infraestructura eficiente',
        text: 'Uso optimizado de recursos mediante JVM tuning, caching inteligente y mínima sobrecarga. Rendimiento a través de ingeniería, no de sobre-aprovisionamiento.',
      },
      maintainable: {
        title: 'Código que se mantiene',
        text: 'Arquitectura hexagonal, modular y limpia. Código que otros pueden entender, probar y modificar con confianza.',
      },
      learner: {
        title: 'Aprendiz continuo',
        text: 'Cada proyecto enseña algo nuevo. Me mantengo al día con el ecosistema a través de trabajo práctico, open source y estudio continuo.',
      },
    },
    downloadCvEs: 'Descargar CV (ES)',
    downloadCvEn: 'Descargar CV (EN)',
  },
  stackSection: {
    eyebrow: 'STACK',
    title: 'Tecnologías',
    languages: 'LENGUAJES',
    frameworks: 'FRAMEWORKS',
    databases: 'BASES DE DATOS',
    devops: 'DEVOPS',
    testing: 'TESTING / BUILD',
    security: 'SEGURIDAD / DOCS',
  },
  errors: {
    notFound: 'Oops. No hay nada aquí...',
    goHome: 'Ir al Inicio',
  },
}
