import { ref } from 'vue'

const projectsData = [
  {
    id: 'auth-service',
    i18nKey: 'projects.authService',
    category: 'personal-project',
    comingSoon: false,
    tech: [
      { name: 'Java 21', icon: 'mdi-language-java' },
      { name: 'Spring Boot', icon: 'mdi-leaf' },
      { name: 'Spring Security', icon: 'mdi-shield-lock' },
      { name: 'PostgreSQL', icon: 'mdi-database' },
      { name: 'JWT', icon: 'mdi-key-variant' },
      { name: 'MapStruct', icon: 'mdi-swap-horizontal' },
      { name: 'Swagger/OpenAPI', icon: 'mdi-book-open-variant' },
      { name: 'JUnit 5', icon: 'mdi-test-tube' },
    ],
    repoUrl: 'https://github.com/dio-quincarDev/springsecurity-basics.git',
    youtubeUrl: null,
    diagramUrl: null,
    demoUrl: null,
  },
  {
    id: 'employee-management',
    i18nKey: 'projects.employeeManagement',
    category: 'personal-project',
    comingSoon: false,
    tech: [
      { name: 'Java 17', icon: 'mdi-language-java' },
      { name: 'Spring Boot 3', icon: 'mdi-leaf' },
      { name: 'MySQL', icon: 'mdi-database' },
      { name: 'Vue.js 3', icon: 'mdi-vuejs' },
      { name: 'Quasar 2', icon: 'mdi-vuejs' },
      { name: 'Flyway', icon: 'mdi-database-refresh' },
      { name: 'JWT', icon: 'mdi-shield-key' },
      { name: 'Thymeleaf', icon: 'mdi-file-document' },
      { name: 'H2', icon: 'mdi-database-outline' },
    ],
    repoUrl: 'https://github.com/dio-quincarDev/gestion-de-empleados.git',
    youtubeUrl: null,
    diagramUrl: null,
    demoUrl: null,
  },
  {
    id: 'carrent',
    i18nKey: 'projects.carRent',
    category: 'personal-project',
    comingSoon: false,
    tech: [
      { name: 'Java 21', icon: 'mdi-language-java' },
      { name: 'Spring Boot 3', icon: 'mdi-leaf' },
      { name: 'MySQL', icon: 'mdi-database' },
      { name: 'Spring Security', icon: 'mdi-shield-lock' },
      { name: 'JWT', icon: 'mdi-key-variant' },
      { name: 'Flyway', icon: 'mdi-database-refresh' },
      { name: 'MapStruct', icon: 'mdi-swap-horizontal' },
      { name: 'WebSocket', icon: 'mdi-chat' },
      { name: 'Swagger/OpenAPI', icon: 'mdi-book-open-variant' },
      { name: 'Apache POI', icon: 'mdi-file-excel' },
      { name: 'iText', icon: 'mdi-file-pdf-box' },
    ],
    repoUrl: 'https://github.com/dio-quincarDev/backend-arrendadora.git',
    youtubeUrl: null,
    diagramUrl: null,
    demoUrl: null,
  },
  {
    id: 'pymes-admin',
    i18nKey: 'projects.pymesAdmin',
    category: 'personal-project',
    comingSoon: false,
    status: 'in-progress',
    tech: [
      { name: 'Java 21', icon: 'mdi-language-java' },
      { name: 'Spring Boot 3', icon: 'mdi-leaf' },
      { name: 'PostgreSQL', icon: 'mdi-database' },
      { name: 'Redis', icon: 'mdi-database' },
      { name: 'Spring Security', icon: 'mdi-shield-lock' },
      { name: 'OAuth2', icon: 'mdi-shield-key' },
      { name: 'JWT', icon: 'mdi-key-variant' },
      { name: 'Vue.js 3', icon: 'mdi-vuejs' },
      { name: 'Quasar 2', icon: 'mdi-cellphone' },
      { name: 'Docker', icon: 'mdi-docker' },
      { name: 'GitHub Actions', icon: 'mdi-github' },
      { name: 'Oracle Cloud', icon: 'mdi-cloud' },
    ],
    repoUrl: 'https://github.com/dio-quincarDev/pymes-admin.git',
    youtubeUrl: null,
    diagramUrl: null,
    demoUrl: null,
  },
  {
    id: 'feature-flag-api',
    i18nKey: 'projects.featureFlagApi',
    category: 'community',
    comingSoon: false,
    tech: [
      { name: 'Java 21', icon: 'mdi-language-java' },
      { name: 'Spring Boot 3', icon: 'mdi-leaf' },
      { name: 'PostgreSQL', icon: 'mdi-database' },
      { name: 'JWT Security', icon: 'mdi-shield-key' },
      { name: 'Actuator Metrics', icon: 'mdi-chart-line' },
      { name: 'Swagger/OpenAPI', icon: 'mdi-book-open-variant' },
    ],
    repoUrl: 'https://github.com/dio-quincarDev/feat-flag-api-bytes-colabs',
    youtubeUrl: 'https://youtu.be/cwE23zuhj8Q',
    diagramUrl: null,
    demoUrl: null,
  },
  {
    id: 'skilllink',
    i18nKey: 'projects.skillLink',
    category: 'challenge',
    comingSoon: false,
    tech: [
      { name: 'Java 21', icon: 'mdi-language-java' },
      { name: 'Spring Boot 3', icon: 'mdi-leaf' },
      { name: 'PostgreSQL', icon: 'mdi-database' },
      { name: 'WebSocket', icon: 'mdi-chat' },
      { name: 'JWT', icon: 'mdi-shield-key' },
      { name: 'OpenAPI', icon: 'mdi-book-open-variant' },
      { name: 'Render', icon: 'mdi-cloud' },
    ],
    repoUrl: 'https://github.com/R-Mutt22/alumnithon-bad-batch-backend.git',
    youtubeUrl: null,
    diagramUrl: null,
    demoUrl: 'https://alumnithon-bad-batch-backend.onrender.com',
  },
  {
    id: 'sportpulse',
    i18nKey: 'projects.sportPulse',
    category: 'community',
    comingSoon: false,
    tech: [
      { name: 'Java 17', icon: 'mdi-language-java' },
      { name: 'Spring Boot 3', icon: 'mdi-leaf' },
      { name: 'PostgreSQL', icon: 'mdi-database' },
      { name: 'Spring Security', icon: 'mdi-shield-lock' },
      { name: 'JWT', icon: 'mdi-key-variant' },
      { name: 'OpenFeign', icon: 'mdi-swap-horizontal' },
      { name: 'Resilience4J', icon: 'mdi-lightning-bolt' },
      { name: 'MapStruct', icon: 'mdi-code-tags' },
      { name: 'Docker', icon: 'mdi-docker' },
      { name: 'Swagger/OpenAPI', icon: 'mdi-book-open-variant' },
    ],
    repoUrl: 'https://github.com/daniepusb/Equipo09-SportPulseMS.git',
    youtubeUrl: null,
    diagramUrl: null,
    demoUrl: null,
  },
  {
    id: 'swissroute',
    i18nKey: 'projects.swissRoute',
    category: 'community',
    comingSoon: false,
    tech: [
      { name: 'Java 17', icon: 'mdi-language-java' },
      { name: 'Spring Boot 3', icon: 'mdi-leaf' },
      { name: 'PostgreSQL', icon: 'mdi-database' },
      { name: 'Spring Data JPA', icon: 'mdi-database-search' },
      { name: 'WebClient', icon: 'mdi-api' },
      { name: 'Swagger/OpenAPI', icon: 'mdi-book-open-variant' },
      { name: 'Flyway', icon: 'mdi-database-refresh' },
    ],
    repoUrl: 'https://github.com/swissroute-group-03/swissroute-backend.git',
    youtubeUrl: null,
    diagramUrl: null,
    demoUrl: null,
  },
]

const categoryOrder = ['personal-project', 'challenge', 'community']

export function useProjects() {
  const projects = ref(projectsData)

  const getProjectById = (id) => {
    return projects.value.find((p) => p.id === id) || null
  }

  const getProjectsByCategory = () => {
    return categoryOrder
      .map((cat) => ({
        category: cat,
        items: projects.value.filter((p) => p.category === cat),
      }))
      .filter((group) => group.items.length > 0)
  }

  return {
    projects,
    getProjectById,
    getProjectsByCategory,
  }
}
