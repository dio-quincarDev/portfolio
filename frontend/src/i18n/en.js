export default {
  nav: {
    home: 'HOME',
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
        text: 'I don\'t throw money at servers. I optimize. 99.9% uptime on OCI Free Tier with 1GB RAM. JVM Tuning, not more hardware.',
      },
      failure: {
        title: 'I Design for Failure',
        text: 'Circuit breakers, rate limiting, health checks. They\'re not features, they\'re the foundation. My systems self-protect before problems cascade.',
      },
      multiarch: {
        title: 'I Ship Multi-Arch',
        text: 'Docker Buildx for ARM64/AMD64. I don\'t lock users into their hardware. One pipeline, every platform.',
      },
      document: {
        title: 'I Document Decisions',
        text: 'Every architectural decision has a reason. I don\'t use Redis for popularity. I use it because Pub/Sub saves 500MB of memory per instance.',
      },
    },
  },
  hero: {
    name: 'DIOGENES QUINTERO',
    title: 'BACKEND JAVA DEVELOPER',
    tagline:
      'I build software focused on security and resilience. Free tier, open source, pushed to the limit.',
    cta: {
      projects: 'Explore Projects',
      philosophy: 'How I Work',
      contact: 'Contact',
    },
    stat: {
      systems: 'Systems built',
      freeTier: 'Free tier',
    },
  },
  philosophy: {
    title: 'HOW I WORK',
    items: {
      optimize: {
        title: 'I Optimize Before I Scale',
        text: 'I don\'t throw money at servers. I optimize. 99.9% uptime on OCI Free Tier with 1GB RAM. JVM Tuning, not more hardware.',
      },
      failure: {
        title: 'I Design for Failure',
        text: 'Circuit breakers, rate limiting, health checks. They\'re not features, they\'re the foundation. My systems self-protect before problems cascade.',
      },
      multiarch: {
        title: 'I Ship Multi-Arch',
        text: 'Docker Buildx for ARM64/AMD64. I don\'t lock users into their hardware. One pipeline, every platform.',
      },
      document: {
        title: 'I Document Decisions',
        text: 'Every architectural decision has a reason. I don\'t use Redis for popularity. I use it because Pub/Sub saves 500MB of memory per instance.',
      },
    },
  },
  projects: {
    title: 'PROJECTS',
    eyebrow: 'REAL CASES',
    viewSource: 'View source code',
    viewVideo: 'View explanatory video',
    theProblem: 'THE PROBLEM',
    theSolution: 'THE SOLUTION',
    keyDecisions: 'KEY DECISIONS',
    tryApi: 'Explore API',
    hideSwagger: 'Close',
    featureFlagApi: {
      name: 'Feature Flag API',
      description:
        'Dynamic feature control system (Feature Toggles) for distributed architectures. Allows activating/deactivating modules in real-time per environment or client without additional deployments.',
      problem: 'Deploying config changes requires full redeployment. Each deploy = downtime risk + 2-5 min cold start.',
      solution: 'Feature toggles with Redis Pub/Sub for real-time propagation. Circuit breaker for fault isolation.',
      decisions: [
        'Redis Pub/Sub over Kafka: 500MB less memory per instance',
        'SQLite for dev, PostgreSQL for prod',
        'Resilience4j circuit breaker for self-protection',
      ],
    },
  },
  contact: {
    title: 'CONTACT',
    eyebrow: 'LET\'S TALK',
    subtitle: 'If you need a backend that works, not one that costs, let\'s talk.',
    cta: 'Send email',
  },
  about: {
    metaTitle: 'About — Diogenes Quintero',
    title: 'Diogenes Quintero',
    eyebrow: 'ABOUT',
    subtitle: 'Backend Java Developer',
    bio: 'I build software focused on security and resilience. My way of learning has been navigating the open source and free tier world, pushing those environments to their limits. If you need a solution on a limited budget, I can guide you there safely. At my age I decided to reinvent myself. I believe building software would help me do it.',
    whatIBring: 'What I Bring to a Team',
    skillsEyebrow: 'SKILLS',
    stackEyebrow: 'STACK',
    connectEyebrow: 'CONNECT',
    connectTitle: 'Let\'s Connect',
    stackTitle: 'Stack',
    skills: {
      resilient: {
        title: 'Systems that don\'t crash',
        text: 'Circuit breakers, rate limiting, health checks. They\'re not features, they\'re the foundation. My systems self-protect before problems cascade.',
      },
      economical: {
        title: 'Infrastructure that doesn\'t cost',
        text: 'I don\'t throw money at servers. I optimize. 99.9% uptime on OCI Free Tier with 1GB RAM. JVM Tuning, not more hardware.',
      },
      maintainable: {
        title: 'Code that lasts',
        text: 'Hexagonal, modular, clean architecture. I don\'t write code that just works. I write code others can understand and modify without breaking everything.',
      },
      learner: {
        title: 'Permanent student',
        text: 'At my age I decided to reinvent myself. Every day I learn something new. Being self-taught taught me that limits are set by your imagination, not your budget.',
      },
    },
    downloadCv: 'Download CV',
    downloadCvEs: 'Download CV (ES)',
    downloadCvEn: 'Download CV (EN)',
    stack: {
      languages: 'Languages: Java',
      framework: 'Framework: Spring Boot',
      gateway: 'API Gateway: Spring Cloud Gateway',
      database: 'Database: PostgreSQL, MySQL',
      cache: 'Cache: Redis',
      devops: 'DevOps: Docker, Docker Compose, GitHub Actions',
      testing: 'Testing: JUnit 5',
      build: 'Build: Maven',
      security: 'Security: Resilience4j, JWT',
      documentation: 'Documentation: Swagger / OpenAPI',
    },
  },
  errors: {
    notFound: 'Oops. Nothing here...',
    goHome: 'Go Home',
  },
}
