export default {
  nav: {
    home: 'INICIO',
    projects: 'PROYECTOS',
    about: 'SOBRE MI',
    switchLang: 'Cambiar idioma',
    toggleDark: 'Cambiar modo oscuro',
    toggleMenu: 'Abrir/cerrar menu de navegacion',
  },
  approach: {
    eyebrow: 'ENFOQUE',
    title: 'Como trabajo',
    items: {
      optimize: {
        title: 'Optimizo antes de escalar',
        text: 'Optimizo el uso de recursos antes de agregar capacidad. JVM tuning, codigo limpio y arquitectura cuidadosa, no mas hardware.',
      },
      stability: {
        title: 'Diseno para la Estabilidad',
        text: 'Health checks, degradacion gradual y aislamiento de fallos desde el inicio. Sistemas que se autoprotegen y se mantienen predecibles bajo carga.',
      },
      compatibility: {
        title: 'Construyo para compatibilidad',
        text: 'Contenedores multi-arquitectura y configuraciones portables. Sin vendor lock-in, sin sorpresas al cambiar de entorno.',
      },
      documentation: {
        title: 'Documento decisiones',
        text: 'Cada decision de arquitectura tiene un por que. Documento trade-offs y alternativas para que el equipo entienda no solo el que, sino el porque.',
      },
    },
  },
  hero: {
    name: 'DIOGENES QUINTERO',
    title: 'BACKEND JAVA DEVELOPER',
    capabilities: 'Backend · API · Arquitectura · Seguridad',
    tagline: 'Construyo sistemas backend seguros y robustos que escalan.',
    cta: {
      projects: 'Explorar Proyectos',
      approach: 'Como Trabajo',
      contact: 'Contacto',
    },
  },
  services: {
    eyebrow: 'SERVICIOS',
    title: 'Que Hago',
    items: [
      {
        key: 'api',
        title: 'Diseno y Desarrollo de APIs',
        text: 'APIs RESTful con Spring Boot, con contratos claros, manejo de errores adecuado y documentacion completa.',
      },
      {
        key: 'architecture',
        title: 'Arquitectura Backend',
        text: 'Arquitecturas modulares y hexagonales que separan responsabilidades y mantienen el dominio limpio. Resiliencia desde el dia uno.',
      },
      {
        key: 'production',
        title: 'Sistemas en Produccion',
        text: 'Pipelines de CI/CD, monitoreo y observabilidad. Sistemas desplegables, mantenibles y observables en produccion.',
      },
    ],
  },
  projects: {
    title: 'PROYECTOS',
    eyebrow: 'CASOS REALES',
    viewSource: 'Ver codigo fuente',
    viewVideo: 'Ver video explicativo',
    theProblem: 'EL PROBLEMA',
    theSolution: 'LA SOLUCION',
    keyDecisions: 'DECISIONES CLAVE',
    empty: 'No hay proyectos aun.',
    diagram: 'Arquitectura',
    video: 'Video',
    tryDemo: 'Probar Demo',
    tryApi: 'Explorar API',
    hideSwagger: 'Cerrar',
    inProgress: 'En Proceso',
    categories: {
      'personal-project': { eyebrow: 'PORTAFOLIO', title: 'Proyectos' },
      challenge: { eyebrow: 'RETOS', title: 'Retos de Codigo' },
      community: { eyebrow: 'COMUNIDAD', title: 'Open Source y Comunidad' },
    },
    comingSoon: {
      name: 'Proximamente',
      description: 'Un nuevo proyecto esta en progreso. Vuelve pronto para novedades.',
    },
    authService: {
      name: 'Auth Service',
      description:
        'Sistema de autenticacion y autorizacion stateless basado en JWT con Spring Security. Implementa RBAC, hashing BCrypt y 46 tests entre unit, integration y slice.',
      problem: 'Los microservicios necesitan autenticacion centralizada sin sesiones HTTP. Cada servicio debe validar tokens de forma independiente.',
      solution: 'Auth stateless con JWT HMAC-SHA256, OncePerRequestFilter y RBAC via PreAuthorize. 46 tests cubriendo seguridad, validacion y casos borde.',
      decisions: [
        'JWT sobre sesiones: stateless, sin Redis para almacenar tokens',
        'HMAC-SHA256 sobre RSA: gestion de llaves mas simple para servicios internos',
        'BCrypt con fuerza configurable para hashing de passwords',
        'MapStruct para mapeo DTO limpio sin overhead de reflection',
      ],
    },
    featureFlagApi: {
      name: 'Feature Flag API',
      description:
        'Sistema de control dinamico de funcionalidades (Feature Toggles) para arquitecturas distribuidas. Permite activar/desactivar modulos en tiempo real por entorno o cliente sin despliegues adicionales.',
      problem: 'Deployar cambios de config requiere redeploy completo. Cada deploy = riesgo de downtime + 2-5 min de cold start.',
      solution: 'Feature toggles con Redis Pub/Sub para propagacion en tiempo real. Circuit breaker para aislamiento de fallos.',
      decisions: [
        'Redis Pub/Sub vs Kafka: 500MB menos de memoria por instancia',
        'SQLite para dev, PostgreSQL para prod',
        'Resilience4j circuit breaker para auto-proteccion',
      ],
    },
    skillLink: {
      name: 'SkillLink',
      description:
        'Plataforma que conecta desarrolladores a traves de mentorias y desafios tecnicos. Construida para Alumnithon 2025 — hackathon de Alura Latam.',
      problem: 'Los desarrolladores junior enfrentan dificultades para encontrar mentores y proyectos reales. Las plataformas existentes carecen de mentoría estructurada combinada con desafíos técnicos.',
      solution: 'Plataforma full-stack con autenticacion JWT, chat WebSocket en tiempo real, programacion de mentorias, desafios tecnicos y gestion de perfiles. Desplegada en Render.',
      decisions: [
        'Arquitectura monolitica para velocidad del MVP — disenada para futura extraccion a microservicios',
        'WebSocket sobre polling para chat en tiempo real — menor latencia, soporte nativo de Spring',
        'Single Table Inheritance para la jerarquia de Content — consultas mas simples en MVP',
        'HikariCP connection pooling — listo para produccion sin configuracion extra',
        'Tabla por coleccion para tecnologias de perfil — normalizado y buscable',
      ],
    },
    sportPulse: {
      name: 'SportPulse',
      description:
        'Plataforma de analitica de futbol en tiempo real con arquitectura de microservicios. Construida por un equipo de 5 personas consumiendo datos de API-Football (RapidAPI).',
      problem: 'Los datos de futbol de APIs externas deben consumirse eficientemente y distribuirse entre servicios sin duplicar solicitudes ni exceder limites de tasa (100 req/dia).',
      solution: '7 microservicios detras de un gateway con rate limiting Bucket4j, cache Caffeine (TTL 5 min), circuit breakers Resilience4J y PostgreSQL por servicio para independencia de esquemas.',
      decisions: [
        'Microservicios sobre monolite — notificaciones requiere escalado independiente',
        'Feign sincrono sobre mensajeria asincrona — simplicidad inicial, baja necesidad de consistencia eventual',
        'PostgreSQL por servicio — independencia de esquemas, evita cuello de botella de BD unica',
        'Cache Caffeine en memoria sobre Redis — operaciones mas simples, cada servicio gestiona sus datos',
        'Bucket4j en gateway — punto de control unico para rate limiting',
        'Resilience4J circuit breakers — evita cascadas de fallos entre servicios',
      ],
    },
    swissRoute: {
      name: 'SwissRoute',
      description:
        'Backend para planificacion y seguimiento de viajes en transporte publico. Integra la Swiss Public Transport API (opendata.ch) con capa de persistencia PostgreSQL.',
      problem: 'Los usuarios necesitan un backend unificado para buscar conexiones de transporte publico suizo, guardar rutas favoritas y rastrear historial de busquedas — consumiendo una API externa sin sobrecargar.',
      solution: 'API REST con Spring Boot y WebClient para consumo de API externa, PostgreSQL para datos de usuario (favoritos, historial), migraciones Flyway y documentacion Swagger.',
      decisions: [
        'WebClient sobre RestTemplate — llamadas HTTP reactivas y no bloqueantes a la API externa',
        'Datos de API externa devueltos en tiempo real — no se cachean, los datos de transporte cambian constantemente',
        'PostgreSQL para persistencia — datos relacionales estructurados con migraciones Flyway',
        'Capa de mapeo DTO para desacoplar respuestas de API externa de los modelos internos',
        'Historial de busquedas registrado automaticamente en cada consulta de conexiones — sin accion extra del usuario',
      ],
    },
    carRent: {
      name: 'CarRent',
      description:
        'Sistema integral de gestion de alquiler de vehiculos con seguridad JWT, notificaciones SMS, alertas en tiempo real via WebSocket y generacion de reportes dinamicos (PDF/Excel).',
      problem: 'Los negocios de alquiler de vehiculos carecen de un sistema integrado para gestionar flota, clientes, contratos y generar reportes operativos — dependiendo de hojas de calculo y seguimiento manual.',
      solution: 'API REST con Spring Security + JWT para acceso por roles (ADMIN/USER), migraciones Flyway, mapeo DTO con MapStruct, SMS multi-proveedor (Twilio/Vonage), alertas WebSocket y reportes con iText/Apache POI.',
      decisions: [
        'Patron Strategy para proveedores SMS — intercambiar Twilio/Vonage via config sin cambiar codigo',
        'WebSocket push sobre polling — alertas instantaneas a administradores por alquileres por vencer',
        'Flyway sobre ddl-auto de JPA — migraciones versionadas y auditables de esquema',
        'Capa DTO con MapStruct — desacopla contratos API de entidades JPA',
        'iText + Apache POI para reportes — genera PDF y Excel sin vendor lock-in',
      ],
    },
    employeeManagement: {
      name: 'Employee Management',
      description:
        'Sistema full-stack de gestion de empleados para un bar — control de asistencia, horarios, consumos, nominas y reportes semanales automatizados con envio por email.',
      problem: 'Los bares pequenos carecen de un sistema accesible para gestionar empleados, rastrear asistencia, controlar consumos y generar reportes de nomina — dependiendo de papel y lapiz.',
      solution: 'API REST con Spring Boot y JWT, migraciones Flyway, reportes PDF semanales automatizados via Thymeleaf + email, y frontend Vue.js/Quasar para gestion en tiempo real.',
      decisions: [
        'Full-stack (Spring + Vue/Quasar) sobre monolitico — contrato API claro, independencia del frontend',
        'Thymeleaf para plantillas de email — renderizado del lado del servidor para reportes PDF',
        'Migraciones Flyway sobre ddl-auto — esquema versionado para produccion',
        'H2 en memoria para dev, MySQL para prod — desarrollo local sin configuracion',
        'Reportes semanales automatizados via tareas programadas — sin generacion manual de reportes',
      ],
    },
    pymesAdmin: {
      name: 'Pymeq',
      description:
        'Plataforma SaaS multi-tenant de gestion financiera con toolkit de contabilidad forense impulsado por IA para PYMEs LATAM. 310 tests en 3 servicios backend.',
      problem: 'Las PYMEs LATAM carecen de herramientas de gestion financiera accesibles con aislamiento multi-tenant adecuado, deteccion de anomalias por IA y reglas contables LATAM.',
      solution: 'Arquitectura de 3 microservicios (Auth + Gateway + Core) con OAuth2/JWT, PostgreSQL multi-schema, Redis caching, frontend Vue.js/Quasar PWA y CI/CD en Oracle Cloud.',
      decisions: [
        'PostgreSQL multi-schema sobre BD separadas — backups mas simples y comparticion entre tenants',
        'Gateway WebFlux sobre MVC — enrutamiento no bloqueante, mejor吞吐 bajo tenants concurrentes',
        'OAuth2 + JWT sobre sesiones — stateless, refresh tokens, login con Google OAuth2',
        'Redis para blacklist + cache — invalidacion JWT y cache de permisos en un solo servicio',
        'GitHub Actions + Docker multi-arch — un solo CI/CD para x86 y ARM64 (Oracle Free Tier)',
        'PWA sobre app nativa — deploy instantaneo, sin app store, funciona offline para facturas',
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
    sent: 'Mensaje enviado. Te respondere pronto.',
    error: 'Algo salio mal. Intenta de nuevo.',
    open: 'Enviame un mensaje',
    close: 'Cerrar',
    cooldown: 'Espera un momento antes de enviar otro mensaje.',
    nameRequired: 'El nombre es obligatorio.',
    emailRequired: 'El correo es obligatorio.',
    emailInvalid: 'Ingresa un correo valido.',
    messageRequired: 'El mensaje es obligatorio.',
  },
  about: {
    metaTitle: 'Sobre Mi — Diogenes Quintero',
    metaDescription: 'Backend Java Developer especializado en Spring Boot, APIs robustas y arquitectura limpia. Java 21, Docker, PostgreSQL, Redis.',
    title: 'Diogenes Quintero',
    subtitle: 'Backend Java Developer',
    bio: 'Construyo software enfocado en seguridad y robustez. Con experiencia en APIs, infraestructura y todo el ecosistema backend, entrego sistemas mantenibles, performantes y listos para produccion.',
    whatIBring: 'Lo Que Llevo al Equipo',
    skillsEyebrow: 'HABILIDADES',
    connectEyebrow: 'CONECTEMOS',
    connectTitle: 'Conectemos',
    skills: {
      robust: {
        title: 'Sistemas que no fallan',
        text: 'Health checks, degradacion gradual y aislamiento de fallos en cada servicio. Construyo sistemas que anticipan fallos y los manejan sin romperse.',
      },
      economical: {
        title: 'Infraestructura eficiente',
        text: 'Uso optimizado de recursos mediante JVM tuning, caching inteligente y minima sobrecarga. Rendimiento a traves de ingenieria, no de sobre-aprovisionamiento.',
      },
      maintainable: {
        title: 'Codigo que se mantiene',
        text: 'Arquitectura hexagonal, modular y limpia. Codigo que otros pueden entender, probar y modificar con confianza.',
      },
      learner: {
        title: 'Aprendiz continuo',
        text: 'Cada proyecto ensena algo nuevo. Me mantengo al dia con el ecosistema a traves de trabajo practico, open source y estudio continuo.',
      },
    },
    downloadCvEs: 'Descargar CV (ES)',
    downloadCvEn: 'Descargar CV (EN)',
  },
  stackSection: {
    eyebrow: 'STACK',
    title: 'Tecnologias',
    languages: 'LENGUAJES',
    frameworks: 'FRAMEWORKS',
    databases: 'BASES DE DATOS',
    devops: 'DEVOPS',
    testing: 'TESTING / BUILD',
    security: 'SEGURIDAD / DOCS',
  },
  errors: {
    notFound: 'Oops. No hay nada aqui...',
    goHome: 'Ir al Inicio',
  },
}
