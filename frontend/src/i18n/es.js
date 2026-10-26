export default {
  nav: {
    home: 'INICIO',
    projects: 'PROYECTOS',
    about: 'SOBRE MÍ',
    switchLang: 'Cambiar idioma',
    toggleDark: 'Cambiar modo oscuro',
    toggleMenu: 'Abrir/cerrar menú de navegación',
    skipToContent: 'Ir al contenido principal',
    cv: 'CV',
    mainNavigation: 'Navegación principal',
    socialLinks: 'Enlaces sociales',
    menu: 'Menú de navegación',
  },
  approach: {
    eyebrow: 'ENFOQUE',
    title: 'Cómo trabajo',
    items: {
      optimize: {
        title: 'Mido antes de optimizar',
        text: 'Prefiero medir el consumo y la latencia antes de cambiar la arquitectura. Optimizo donde hay evidencia, no por intuición.',
      },
      stability: {
        title: 'Diseño para fallar de forma controlada',
        text: 'Validación en los límites del sistema, manejo explícito de errores y pruebas de integración contra dependencias reales.',
      },
      compatibility: {
        title: 'Mantengo la portabilidad',
        text: 'Contenedores, configuración por entorno y despliegues reproducibles. Menos dependencia de una máquina concreta.',
      },
      documentation: {
        title: 'Documento las decisiones',
        text: 'Los contratos, las migraciones y las decisiones de arquitectura quedan escritos para que otra persona pueda continuar el trabajo.',
      },
    },
  },
  home: {
    metaTitle: 'Diógenes Quintero — Desarrollador Backend Java',
    metaDescription:
      'Desarrollador backend Java. APIs y servicios con Spring Boot, autenticación OAuth2/JWT, PostgreSQL y despliegue con Docker.',
  },
  hero: {
    name: 'DIÓGENES QUINTERO',
    title: 'DESARROLLADOR BACKEND JAVA',
    capabilities: 'Java · Spring Boot · PostgreSQL · Docker',
    tagline:
      'Desarrollo APIs y servicios con Java y Spring Boot, con foco en autenticación, seguridad y despliegue.',
    cta: {
      projects: 'Ver proyectos',
      contact: 'Contacto',
    },
  },
  projects: {
    title: 'PROYECTOS',
    eyebrow: 'TRABAJO',
    metaTitle: 'Proyectos — Diógenes Quintero',
    metaDescription:
      'Proyectos de backend Java: autenticación, microservicios, PostgreSQL y despliegue con Docker.',
    viewSource: 'Ver código fuente',
    viewVideo: 'Ver video explicativo',
    openProject: 'Abrir detalle del proyecto',
    theProblem: 'CONTEXTO',
    theSolution: 'SOLUCIÓN',
    context: 'CONTEXTO DEL EQUIPO',
    contribution: 'MI APORTE',
    components: 'COMPONENTES',
    keyDecisions: 'DECISIONES CLAVE',
    empty: 'No hay proyectos aún.',
    diagram: 'Flujo de autenticación',
    video: 'Video',
    tryDemo: 'Probar demo',
    tryApi: 'Explorar API',
    home: {
      eyebrow: 'SELECCIÓN',
      title: 'Proyectos',
      featured: 'DESTACADO',
      viewCase: 'Ver caso completo',
      viewAll: 'Ver todos los proyectos',
    },
    categories: {
      'personal-project': { eyebrow: 'TRABAJO', title: 'Proyectos' },
      community: { eyebrow: 'EQUIPO', title: 'Colaboraciones' },
    },
    pymesAdmin: {
      name: 'Pymeq — Forensic Accounting',
      description:
        'SaaS multi-tenant de contabilidad forense. Servicio de autenticación con OAuth2 y JWT, gateway que valida la identidad y aislamiento por esquemas en PostgreSQL.',
      problem:
        'La aplicación necesitaba autenticación centralizada, aislamiento entre organizaciones y un punto de entrada único para los servicios internos.',
      solution:
        'Implementé autenticación con OAuth2 (Google), JWT y rotación de refresh tokens, validación en el gateway y multi-tenancy con esquemas auth/core. Redis cubre rate limiting, blacklist y registros pendientes.',
      decisions: [
        'Rotación de refresh tokens con detección de reuso y revocación de la familia completa.',
        'Validación JWT en el gateway (WebFlux): los servicios internos reciben la identidad ya resuelta.',
        '206 pruebas automatizadas: 150 unitarias y 56 de integración con Testcontainers.',
        'CI/CD con imágenes multi-arquitectura y despliegue continuo en Oracle Cloud.',
      ],
    },
    fleetControl: {
      name: 'Fleet Control',
      description:
        'Backend de gestión de flotas compuesto por 9 microservicios autónomos, con datos de demostración generados por un seeder de semilla fija.',
      problem:
        'El proyecto requería servicios independientes capaces de arrancar y generar datos reproducibles sin depender de una base compartida.',
      solution:
        'Desarrollé los microservicios con Spring Boot, los empaqueté con Docker y automaticé sus pipelines con GitHub Actions.',
      decisions: [
        '9 servicios autónomos con responsabilidades separadas.',
        'Seeder de semilla fija para datos de demostración reproducibles.',
        'Docker y GitHub Actions por servicio.',
      ],
    },
    carRent: {
      name: 'Car Rental API',
      description:
        'API REST de alquiler de vehículos con autenticación JWT, autorización por roles, notificaciones y reportes operativos.',
      problem:
        'El negocio necesitaba centralizar flota, clientes y contratos, además de generar reportes sin depender de hojas de cálculo.',
      solution:
        'Construí la API con Java, Spring Boot y MySQL. Incluye JWT, roles ADMIN/USER, OpenAPI, reportes PDF/Excel, alertas por WebSocket y SMS con proveedores intercambiables.',
      decisions: [
        'Patrón Strategy para alternar entre Twilio y Vonage mediante configuración.',
        'WebSocket para alertas de alquileres próximos a vencer.',
        'Flyway para migraciones versionadas del esquema.',
        'iText y Apache POI para generar reportes PDF y Excel.',
      ],
    },
    employeeManagement: {
      name: 'Employee Management System',
      description:
        'Sistema full-stack para gestionar asistencia, horarios, consumos y nóminas de un bar, con reportes semanales enviados por correo.',
      problem:
        'El negocio necesitaba reemplazar el registro manual de asistencia y nómina por un flujo centralizado.',
      solution:
        'Apliqué arquitectura hexagonal con Spring Boot, migraciones Flyway sobre MySQL, seguridad JWT y reportes PDF con Thymeleaf enviados por email. El frontend usa Vue.js y Quasar.',
      decisions: [
        'Separación application/domain/infrastructure para aislar las reglas del negocio.',
        'Flyway para mantener el esquema versionado.',
        'Thymeleaf para generar los reportes semanales.',
      ],
    },
    skillLink: {
      name: 'SkillLink',
      description:
        'Colaboración en el backend de una plataforma de mentorías y desafíos técnicos para Alumnithon 2025.',
      problem:
        'El equipo necesitaba autenticación JWT y una API de perfiles para conectar desarrolladores con mentores.',
      solution:
        'Mi aporte: autenticación con Spring Security y JWT, API de perfiles técnicos, búsqueda filtrada, validaciones y documentación OpenAPI.',
      decisions: [
        'Registro y login con Spring Security, filtro JWT y configuración stateless.',
        'Creación y actualización de perfiles con validación de tecnologías e intereses.',
        'Búsqueda filtrada y control de visibilidad de perfiles.',
        'Documentación de endpoints con OpenAPI/Swagger.',
      ],
    },
    sportPulse: {
      name: 'SportPulse',
      description:
        'Colaboración en una plataforma de analítica de fútbol con microservicios que consume datos de API-Football.',
      problem:
        'El equipo necesitaba autenticación centralizada, un gateway y servicios que consumieran la API externa sin duplicar lógica.',
      solution:
        'Mi aporte: servicio de autenticación con JWT, gateway con propagación de identidad y rate limiting, y microservicios de fixtures, standings, equipos y ligas.',
      decisions: [
        'Servicio de autenticación con registro, login, JWT y pruebas.',
        'Gateway con enrutamiento, propagación de JWT y rate limiting con Redis.',
        'Fixtures y standings integrados con API-Football mediante OpenFeign.',
        'Caché Redis, Dockerfiles, Compose y documentación de red.',
      ],
    },
    swissRoute: {
      name: 'SwissRoute',
      description:
        'Colaboración en el backend de planificación de viajes en transporte público suizo, integrado con transport.opendata.ch.',
      problem:
        'El equipo necesitaba persistencia versionada, autenticación y endpoints para buscar estaciones y conexiones sin acoplar la API externa al dominio.',
      solution:
        'Mi aporte: persistencia con PostgreSQL y Flyway, autenticación JWT y endpoints de estaciones y conexiones, con pruebas unitarias e integración.',
      decisions: [
        'Búsqueda de estaciones por texto y por coordenadas GPS.',
        'Conexiones con hasta cinco paradas intermedias validadas en el borde.',
        'WebClient con timeouts y manejo explícito de errores de la API externa.',
        'Migraciones Flyway, pruebas con PostgreSQL y documentación Swagger.',
      ],
    },
  },
  contact: {
    title: 'CONTACTO',
    eyebrow: 'HABLEMOS',
    emailLabel: 'Escribir email',
    copy: 'Copiar email',
    copied: 'Email copiado',
    close: 'Cerrar',
  },
  about: {
    metaTitle: 'Sobre mí — Diógenes Quintero',
    metaDescription:
      'Desarrollador backend Java con experiencia en Spring Boot, autenticación, PostgreSQL y despliegue de servicios.',
    title: 'Diógenes Quintero',
    subtitle: 'Desarrollador Backend Java',
    bio: 'Desarrollo APIs y servicios con Java y Spring Boot. Mi trabajo reciente se centra en autenticación, validación de identidad en el gateway y despliegue continuo. Documento las decisiones y mantengo pruebas sobre los flujos críticos.',
    whatIBring: 'Cómo aporto a un equipo',
    skillsEyebrow: 'HABILIDADES',
    connectEyebrow: 'CONECTEMOS',
    connectTitle: 'Conectemos',
    skills: {
      robust: {
        title: 'Autenticación y seguridad',
        text: 'OAuth2, JWT, rotación de refresh tokens, RBAC y validación de identidad en el borde de la API.',
      },
      economical: {
        title: 'Operación y despliegue',
        text: 'Docker, CI/CD con GitHub Actions, imágenes multi-arquitectura y configuración por entorno.',
      },
      maintainable: {
        title: 'Código mantenible',
        text: 'Separación de responsabilidades, migraciones versionadas y pruebas de integración contra dependencias reales.',
      },
      learner: {
        title: 'Aprendizaje continuo',
        text: 'Practico con proyectos propios y colaboraciones, y reviso lo que cambia en el ecosistema Java y en las herramientas de despliegue.',
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
    notFound: 'No hay nada aquí.',
    goHome: 'Ir al inicio',
  },
}
