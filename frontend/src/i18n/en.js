export default {
  nav: {
    home: 'HOME',
    projects: 'PROJECTS',
    about: 'ABOUT',
    switchLang: 'Switch language',
    toggleDark: 'Toggle dark mode',
    toggleMenu: 'Toggle navigation menu',
  },
  approach: {
    eyebrow: 'APPROACH',
    title: 'How I Work',
    items: {
      optimize: {
        title: 'I Optimize Before I Scale',
        text: 'I focus on efficient resource usage before adding capacity. JVM tuning, clean code, and thoughtful architecture over throwing hardware at problems.',
      },
      stability: {
        title: 'I Design for Stability',
        text: 'Health checks, graceful degradation, and fault isolation built in from the start. Systems that self-protect and stay predictable under load.',
      },
      compatibility: {
        title: 'I Build for Compatibility',
        text: 'Multi-architecture containers and portable configurations. No lock-in, no surprises when moving between environments.',
      },
      documentation: {
        title: 'I Document Decisions',
        text: 'Every architectural choice has a rationale. I document trade-offs and alternatives so the team understands not just what, but why.',
      },
    },
  },
  hero: {
    name: 'DIOGENES QUINTERO',
    title: 'BACKEND JAVA DEVELOPER',
    capabilities: 'Backend · API · Architecture · Security',
    tagline: 'I build secure, reliable backend systems that scale.',
    cta: {
      projects: 'Explore Projects',
      approach: 'How I Work',
      contact: 'Contact',
    },
  },
  services: {
    eyebrow: 'SERVICES',
    title: 'What I Do',
    items: [
      {
        key: 'api',
        title: 'API Design & Development',
        text: 'RESTful APIs with Spring Boot, focused on clear contracts, proper error handling, and comprehensive documentation.',
      },
      {
        key: 'architecture',
        title: 'Backend Architecture',
        text: 'Modular, hexagonal architectures that separate concerns and keep the domain clean. Resilience built in from day one.',
      },
      {
        key: 'production',
        title: 'Production Systems',
        text: 'CI/CD pipelines, monitoring, and observability. Systems that are deployable, maintainable, and observable in production.',
      },
    ],
  },
  projects: {
    title: 'PROJECTS',
    eyebrow: 'REAL CASES',
    viewSource: 'View source code',
    viewVideo: 'View explanatory video',
    theProblem: 'THE PROBLEM',
    theSolution: 'THE SOLUTION',
    keyDecisions: 'KEY DECISIONS',
    empty: 'No projects yet.',
    diagram: 'Architecture',
    video: 'Walkthrough',
    tryDemo: 'Try Live Demo',
    tryApi: 'Explore API',
    hideSwagger: 'Close',
    inProgress: 'In Progress',
    categories: {
      'personal-project': { eyebrow: 'PORTFOLIO', title: 'Projects' },
      challenge: { eyebrow: 'CHALLENGES', title: 'Coding Challenges' },
      community: { eyebrow: 'COMMUNITY', title: 'Open Source & Community' },
    },
    comingSoon: {
      name: 'Coming Soon',
      description: 'A new project is in progress. Check back soon for updates.',
    },
    authService: {
      name: 'Auth Service',
      description:
        'Stateless JWT-based authentication and authorization system with Spring Security. Implements RBAC, BCrypt password hashing, and 46 tests across unit, integration, and slice layers.',
      problem:
        'Microservices need centralized authentication without HTTP sessions. Each service should validate tokens independently.',
      solution:
        'Stateless JWT auth with HMAC-SHA256, OncePerRequestFilter, and RBAC via PreAuthorize. 46 tests covering security, validation, and edge cases.',
      decisions: [
        'JWT over sessions: stateless, no Redis needed for token storage',
        'HMAC-SHA256 over RSA: simpler key management for internal services',
        'BCrypt with configurable strength for password hashing',
        'MapStruct for clean DTO mapping without reflection overhead',
      ],
    },
    featureFlagApi: {
      name: 'Feature Flag API',
      description:
        'Dynamic feature control system (Feature Toggles) for distributed architectures. Allows activating/deactivating modules in real-time per environment or client without additional deployments.',
      problem:
        'Deploying config changes requires full redeployment. Each deploy = downtime risk + 2-5 min cold start.',
      solution:
        'Feature toggles with Redis Pub/Sub for real-time propagation. Circuit breaker for fault isolation.',
      decisions: [
        'Redis Pub/Sub over Kafka: 500MB less memory per instance',
        'SQLite for dev, PostgreSQL for prod',
        'Resilience4j circuit breaker for self-protection',
      ],
    },
    skillLink: {
      name: 'SkillLink',
      description:
        'Platform connecting developers through mentorships and technical challenges. Built for Alumnithon (2025 Hackathon) of Alura Latam.',
      problem:
        'Junior developers struggle to find mentors and real-world projects. Existing platforms lack structured mentorship combined with technical challenges.',
      solution:
        'Full-stack platform with JWT authentication, real-time WebSocket chat, mentorship scheduling, technical challenges, and profile management. Deployed on Render.',
      decisions: [
        'Monolithic architecture for MVP speed — designed for future microservices extraction',
        'WebSocket over polling for real-time chat — lower latency, built-in Spring support',
        'Single Table Inheritance for Content hierarchy — simpler queries at MVP stage',
        'HikariCP connection pooling — production-grade out of the box',
        'Table-per-collection for profile technologies — normalized and searchable',
      ],
    },
    sportPulse: {
      name: 'SportPulse',
      description:
        'Real-time football analytics platform with a microservices architecture. Built by a 5-person team consuming data from API-Football (RapidAPI).',
      problem:
        'Football data from external APIs needs to be consumed efficiently and distributed across services without duplicating requests or exceeding rate limits (100 req/day).',
      solution:
        '7 microservices behind a gateway with Bucket4j rate limiting, Caffeine caching (5-min TTL), Resilience4J circuit breakers, and PostgreSQL-per-service for schema independence.',
      decisions: [
        'Microservices over monolith — notifications needs independent scaling',
        'Synchronous Feign over async messaging — initial simplicity, low need for eventual consistency',
        'PostgreSQL per service — schema independence, avoids single-DB bottleneck',
        'Caffeine in-memory cache over Redis — simpler ops, each service owns its data',
        'Bucket4j at gateway — single control point for rate limiting',
        'Resilience4J circuit breakers — prevents cascading failures between services',
      ],
    },
    swissRoute: {
      name: 'SwissRoute',
      description:
        'Backend for public transport trip planning and tracking. Integrates the Swiss Public Transport API (opendata.ch) with a PostgreSQL persistence layer.',
      problem:
        'Users need a unified backend to search Swiss public transport connections, save favorite routes, and track search history consuming an external API without overfetching.',
      solution:
        'Spring Boot REST API with WebClient for external API consumption, PostgreSQL for user data persistence (favorites, history), Flyway migrations, and Swagger documentation.',
      decisions: [
        'WebClient over RestTemplate — reactive, non-blocking HTTP calls to external API',
        'External API data returned in real-time — not cached, as transport data changes constantly',
        'PostgreSQL for persistence — structured relational data with Flyway migrations',
        'DTO mapping layer to decouple external API responses from internal models',
        'Search history auto-logged on every connection query — no extra user action needed',
      ],
    },
    carRent: {
      name: 'CarRent',
      description:
        'Full-featured vehicle rental management system with JWT security, SMS notifications, real-time alerts via WebSockets, and dynamic report generation (PDF/Excel).',
      problem:
        'Vehicle rental businesses lack an integrated system to manage fleet, customers, contracts, and generate operational reports — relying on spreadsheets and manual tracking.',
      solution:
        'REST API with Spring Security + JWT for role-based access (ADMIN/USER), Flyway migrations, MapStruct DTO mapping, SMS multi-provider (Twilio/Vonage), WebSocket alerts, and iText/Apache POI reports.',
      decisions: [
        'Strategy pattern for SMS providers — swap Twilio/Vonage via config without code changes',
        'WebSocket push over polling — instant admin alerts for expiring rentals',
        'Flyway over JPA ddl-auto — versioned, auditable schema migrations',
        'DTO layer with MapStruct — decouples API contracts from JPA entities',
        'iText + Apache POI for reports — generates PDF and Excel without vendor lock-in',
      ],
    },
    employeeManagement: {
      name: 'Employee Management',
      description:
        'Full-stack employee management system for a bar — tracking attendance, schedules, consumptions, payroll, and automated weekly reports with email delivery.',
      problem:
        'Small bars lack an affordable system to manage employees, track attendance, control consumptions, and generate payroll reports relying on pen and paper.',
      solution:
        'Spring Boot REST API with JWT auth, Flyway migrations, automated weekly PDF reports via Thymeleaf + email, plus a Vue.js/Quasar frontend for real-time management.',
      decisions: [
        'Full-stack (Spring + Vue/Quasar) over monolithic — clear API contract, frontend independence',
        'Thymeleaf for email templates — server-side rendering for PDF reports',
        'Flyway migrations over ddl-auto — versioned schema for production',
        'H2 in-memory for dev, MySQL for prod — zero-config local development',
        'Weekly automated reports via scheduled tasks — no manual report generation needed',
      ],
    },
    pymesAdmin: {
      name: 'PymeQ',
      description:
        'Multi-tenant SaaS financial management platform with AI-powered forensic accounting toolkit for LATAM SMEs. 310 tests across 3 backend services.',
      problem:
        'LATAM SMEs lack affordable financial management tools with proper multi-tenant isolation, AI-powered anomaly detection, and LATAM-specific accounting rules.',
      solution:
        '3-service microservices architecture (Auth + Gateway + Core) with OAuth2/JWT, PostgreSQL multi-schema, Redis caching, Vue.js/Quasar PWA frontend, and CI/CD on Oracle Cloud.',
      decisions: [
        'Multi-schema PostgreSQL over separate DBs — simpler backup/sharing across tenants',
        'WebFlux gateway over MVC — non-blocking routing, better throughput under concurrent tenants',
        'OAuth2 + JWT over session auth — stateless, refresh tokens, Google OAuth2 login',
        'Redis for blacklist + cache — JWT invalidation and permission caching in one service',
        'GitHub Actions + Docker multi-arch — single CI/CD for both x86 and ARM64 (Oracle Free Tier)',
        'PWA over native app — instant deployment, no app store, works offline for receipts',
      ],
    },
  },
  contact: {
    title: 'CONTACT',
    eyebrow: "LET'S TALK",
    name: 'Name',
    email: 'Email',
    message: 'Message',
    submit: 'Send Message',
    sent: "Message sent. I'll get back to you soon.",
    error: 'Something went wrong. Please try again.',
    open: 'Send me a message',
    close: 'Close',
    cooldown: 'Please wait a moment before sending another message.',
    nameRequired: 'Name is required.',
    emailRequired: 'Email is required.',
    emailInvalid: 'Please enter a valid email.',
    messageRequired: 'Message is required.',
  },
  about: {
    metaTitle: 'About — Diogenes Quintero',
    metaDescription:
      'Backend Java Developer specialized in Spring Boot, robust APIs, and clean architecture. Java 21, Docker, PostgreSQL, Redis.',
    title: 'Diogenes Quintero',
    subtitle: 'Backend Java Developer',
    bio: 'I build software focused on security and reliability. With experience across APIs, infrastructure, and the full backend landscape, I deliver systems that are maintainable, performant, and production-ready.',
    whatIBring: 'What I Bring to a Team',
    skillsEyebrow: 'SKILLS',
    connectEyebrow: 'CONNECT',
    connectTitle: "Let's Connect",
    skills: {
      robust: {
        title: "Systems that don't crash",
        text: 'Health checks, graceful degradation, and fault isolation built into every service. I build systems that anticipate failure and handle it without breaking.',
      },
      economical: {
        title: 'Efficient infrastructure',
        text: 'Optimized resource usage through JVM tuning, smart caching strategies, and minimal overhead. Performance through engineering, not over-provisioning.',
      },
      maintainable: {
        title: 'Code that lasts',
        text: 'Hexagonal, modular, clean architecture. Code that others can understand, test, and modify with confidence.',
      },
      learner: {
        title: 'Continuous learner',
        text: 'Every project teaches something new. I stay current with the ecosystem through hands-on work, open source, and ongoing study.',
      },
    },
    downloadCvEs: 'Download CV (ES)',
    downloadCvEn: 'Download CV (EN)',
  },
  stackSection: {
    eyebrow: 'TECH STACK',
    title: 'Technologies',
    languages: 'LANGUAGES',
    frameworks: 'FRAMEWORKS',
    databases: 'DATABASES',
    devops: 'DEVOPS',
    testing: 'TESTING / BUILD',
    security: 'SECURITY / DOCS',
  },
  errors: {
    notFound: 'Oops. Nothing here...',
    goHome: 'Go Home',
  },
}
