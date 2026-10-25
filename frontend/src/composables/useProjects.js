import { ref } from 'vue'

const projectsData = [
  {
    id: 'pymes-admin',
    i18nKey: 'projects.pymesAdmin',
    category: 'personal-project',
    featured: true,
    tech: [
      { name: 'Java', icon: 'mdi-language-java' },
      { name: 'Spring Boot', icon: 'mdi-leaf' },
      { name: 'Spring Security', icon: 'mdi-shield-lock' },
      { name: 'Spring Cloud Gateway', icon: 'mdi-gateway' },
      { name: 'PostgreSQL', icon: 'mdi-database' },
      { name: 'Redis', icon: 'mdi-database' },
      { name: 'OAuth2', icon: 'mdi-shield-key' },
      { name: 'JWT', icon: 'mdi-key-variant' },
      { name: 'Docker', icon: 'mdi-docker' },
      { name: 'GitHub Actions', icon: 'mdi-github' },
      { name: 'Oracle Cloud', icon: 'mdi-cloud' },
    ],
    repoUrl: 'https://github.com/dio-quincarDev/pymes-admin',
    youtubeUrl: null,
    diagramUrl: '/images/pymes-auth-flow.png',
    demoUrl: null,
  },
  {
    id: 'fleet-control',
    i18nKey: 'projects.fleetControl',
    category: 'personal-project',
    tech: [
      { name: 'Java', icon: 'mdi-language-java' },
      { name: 'Spring Boot', icon: 'mdi-leaf' },
      { name: 'Docker', icon: 'mdi-docker' },
      { name: 'GitHub Actions', icon: 'mdi-github' },
    ],
    repoUrl: 'https://github.com/dio-quincarDev/fleet-control',
    youtubeUrl: null,
    diagramUrl: null,
    demoUrl: null,
  },
  {
    id: 'carrent',
    i18nKey: 'projects.carRent',
    category: 'personal-project',
    tech: [
      { name: 'Java', icon: 'mdi-language-java' },
      { name: 'Spring Boot', icon: 'mdi-leaf' },
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
    repoUrl: 'https://github.com/dio-quincarDev/backend-arrendadora',
    youtubeUrl: null,
    diagramUrl: null,
    demoUrl: null,
  },
  {
    id: 'employee-management',
    i18nKey: 'projects.employeeManagement',
    category: 'personal-project',
    tech: [
      { name: 'Java', icon: 'mdi-language-java' },
      { name: 'Spring Boot', icon: 'mdi-leaf' },
      { name: 'MySQL', icon: 'mdi-database' },
      { name: 'Flyway', icon: 'mdi-database-refresh' },
      { name: 'JWT', icon: 'mdi-shield-key' },
      { name: 'Thymeleaf', icon: 'mdi-file-document' },
      { name: 'Vue.js', icon: 'mdi-vuejs' },
      { name: 'Quasar', icon: 'mdi-vuejs' },
    ],
    repoUrl: 'https://github.com/dio-quincarDev/gestion-de-empleados',
    youtubeUrl: null,
    diagramUrl: null,
    demoUrl: null,
  },
  {
    id: 'skilllink',
    i18nKey: 'projects.skillLink',
    category: 'community',
    contribution: true,
    tech: [
      { name: 'Java', icon: 'mdi-language-java' },
      { name: 'Spring Boot', icon: 'mdi-leaf' },
      { name: 'Spring Security', icon: 'mdi-shield-lock' },
      { name: 'PostgreSQL', icon: 'mdi-database' },
      { name: 'JWT', icon: 'mdi-key-variant' },
      { name: 'OpenAPI', icon: 'mdi-book-open-variant' },
    ],
    repoUrl: 'https://github.com/R-Mutt22/alumnithon-bad-batch-backend',
    youtubeUrl: null,
    diagramUrl: null,
    demoUrl: 'https://alumnithon-bad-batch-backend.onrender.com',
  },
  {
    id: 'sportpulse',
    i18nKey: 'projects.sportPulse',
    category: 'community',
    contribution: true,
    tech: [
      { name: 'Java', icon: 'mdi-language-java' },
      { name: 'Spring Boot', icon: 'mdi-leaf' },
      { name: 'Spring Cloud Gateway', icon: 'mdi-gateway' },
      { name: 'PostgreSQL', icon: 'mdi-database' },
      { name: 'Redis', icon: 'mdi-database' },
      { name: 'OpenFeign', icon: 'mdi-swap-horizontal' },
      { name: 'Docker', icon: 'mdi-docker' },
    ],
    repoUrl: 'https://github.com/daniepusb/Equipo09-SportPulseMS',
    youtubeUrl: null,
    diagramUrl: null,
    demoUrl: null,
  },
  {
    id: 'swissroute',
    i18nKey: 'projects.swissRoute',
    category: 'community',
    contribution: true,
    tech: [
      { name: 'Java', icon: 'mdi-language-java' },
      { name: 'Spring Boot', icon: 'mdi-leaf' },
      { name: 'PostgreSQL', icon: 'mdi-database' },
      { name: 'Flyway', icon: 'mdi-database-refresh' },
      { name: 'WebClient', icon: 'mdi-api' },
      { name: 'JUnit', icon: 'mdi-test-tube' },
      { name: 'Swagger/OpenAPI', icon: 'mdi-book-open-variant' },
    ],
    repoUrl: 'https://github.com/swissroute-group-03/swissroute-backend',
    youtubeUrl: null,
    diagramUrl: null,
    demoUrl: null,
  },
]

const categoryOrder = ['personal-project', 'community']

export function useProjects() {
  const projects = ref(projectsData)

  const getProjectById = (id) => {
    return projects.value.find((project) => project.id === id) || null
  }

  const getProjectsByCategory = () => {
    return categoryOrder
      .map((category) => ({
        category,
        items: projects.value.filter((project) => project.category === category),
      }))
      .filter((group) => group.items.length > 0)
  }

  return {
    projects,
    getProjectById,
    getProjectsByCategory,
  }
}
