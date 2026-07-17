export default {
  nav: {
    home: 'INICIO',
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
        text: 'No tiro dinero al servidor. Optimizo. 99.9% uptime en OCI Free Tier con 1GB RAM. JVM Tuning, no mas hardware.',
      },
      failure: {
        title: 'Diseno para el fracaso',
        text: 'Circuit breakers, rate limiting, health checks. No son features, son la base. Mis sistemas se auto-protegen antes de que el problema se cascade.',
      },
      multiarch: {
        title: 'Despliego multi-arquitectura',
        text: 'Docker Buildx para ARM64/AMD64. No bloqueo a usuarios por su hardware. Un pipeline, todas las plataformas.',
      },
      document: {
        title: 'Documento decisiones',
        text: 'Cada decision de arquitectura tiene un por que. No uso Redis por popularidad. Lo uso porque Pub/Sub ahorra 500MB de memoria por instancia.',
      },
    },
  },
  hero: {
    name: 'DIOGENES QUINTERO',
    title: 'BACKEND JAVA DEVELOPER',
    tagline:
      'Programo software enfocado a la seguridad y robustez. Free tier, open source, al limite.',
    cta: {
      projects: 'Explorar Proyectos',
      philosophy: 'Como Trabajo',
      contact: 'Contacto',
    },
    stat: {
      systems: 'Sistemas construidos',
      freeTier: 'Free tier',
    },
  },
  philosophy: {
    title: 'COMO TRABAJO',
    items: {
      optimize: {
        title: 'Optimizo Antes de Escalar',
        text: 'No tiro dinero al servidor. Optimizo. 99.9% uptime en OCI Free Tier con 1GB RAM. JVM Tuning, no mas hardware.',
      },
      failure: {
        title: 'Diseño para el Fracaso',
        text: 'Circuit breakers, rate limiting, health checks. No son features, son la base. Mis sistemas se auto-protegen antes de que el problema se cascade.',
      },
      multiarch: {
        title: 'Despliego Multi-Arquitectura',
        text: 'Docker Buildx para ARM64/AMD64. No bloqueo a usuarios por su hardware. Un pipeline, todas las plataformas.',
      },
      document: {
        title: 'Document Decisiones',
        text: 'Cada decision de arquitectura tiene un por que. No uso Redis por popularidad. Lo uso porque Pub/Sub ahorra 500MB de memoria por instancia.',
      },
    },
  },
  projects: {
    title: 'PROYECTOS',
    eyebrow: 'CASOS REALES',
    viewSource: 'Ver codigo fuente',
    viewVideo: 'Ver video explicativo',
    theProblem: 'EL PROBLEMA',
    theSolution: 'LA SOLUCION',
    keyDecisions: 'DECISIONES CLAVE',
    tryApi: 'Explorar API',
    hideSwagger: 'Cerrar',
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
  },
  contact: {
    title: 'CONTACTO',
    eyebrow: 'HABLEMOS',
    subtitle: 'Si necesitas un backend que funcione, no que cueste, hablemos.',
    cta: 'Enviar email',
  },
  about: {
    metaTitle: 'Sobre Mi — Diogenes Quintero',
    title: 'Diogenes Quintero',
    eyebrow: 'SOBRE MI',
    subtitle: 'Backend Java Developer',
    bio: 'Programo software enfocado a la seguridad y robustez. Mi forma de aprender ha sido desenvolverme en el mundo open source y free tier, empujando esos entornos al limite de lo que pueden dar. Si necesitas una solucion con presupuesto limitado, te puedo guiar de forma segura para lograrla. A mi edad decidi reinventarme. Creo que hacer software me ayudaria a hacerlo.',
    whatIBring: 'Lo Que Llevo al Equipo',
    skillsEyebrow: 'HABILIDADES',
    stackEyebrow: 'STACK',
    connectEyebrow: 'CONECTEMOS',
    connectTitle: 'Conectemos',
    stackTitle: 'Stack',
    skills: {
      resilient: {
        title: 'Sistemas que no se caen',
        text: 'Circuit breakers, rate limiting, health checks. No son features, son la base. Mis sistemas se auto-protegen antes de que el problema se cascade.',
      },
      economical: {
        title: 'Infraestructura que no cuesta',
        text: 'No tiro dinero al servidor. Optimizo. 99.9% uptime en OCI Free Tier con 1GB RAM. JVM Tuning, no mas hardware.',
      },
      maintainable: {
        title: 'Codigo que se mantiene',
        text: 'Arquitectura hexagonal, modular, limpia. No hago codigo que solo funcione, hago codigo que otro pueda entender y modificar sin romper todo.',
      },
      learner: {
        title: 'Aprendiz permanente',
        text: 'A mi edad decidi reinventarme. Cada dia aprendo algo nuevo. Ser autodidacta me enseno que los limites los pone tu imaginacion, no tu presupuesto.',
      },
    },
    downloadCv: 'Descargar CV',
    downloadCvEs: 'Descargar CV (ES)',
    downloadCvEn: 'Descargar CV (EN)',
    stack: {
      languages: 'Lenguajes: Java',
      framework: 'Framework: Spring Boot',
      gateway: 'API Gateway: Spring Cloud Gateway',
      database: 'Base de datos: PostgreSQL, MySQL',
      cache: 'Cache: Redis',
      devops: 'DevOps: Docker, Docker Compose, GitHub Actions',
      testing: 'Testing: JUnit 5',
      build: 'Build: Maven',
      security: 'Seguridad: Resilience4j, JWT',
      documentation: 'Documentacion: Swagger / OpenAPI',
    },
  },
  errors: {
    notFound: 'Oops. Nothing here...',
    goHome: 'Go Home',
  },
}
