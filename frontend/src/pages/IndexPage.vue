<template>
  <q-page class="index-page q-pa-md q-pa-lg-lg">
    <div class="index-page__inner">
      <HeroSection
        @scroll-to-philosophy="scrollTo('philosophy-section')"
        @scroll-to-projects="scrollTo('projects-section')"
        @scroll-to-contact="scrollTo('contacto-section')"
      />

      <CapabilityLedger class="index-page__ledger" />

      <ApproachSection class="index-page__section" />

      <ProjectsSection :projects="projects" class="index-page__section" />

      <ContactSection class="index-page__section" />
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useMeta } from 'quasar'
import HeroSection from 'components/HeroSection.vue'
import CapabilityLedger from 'components/CapabilityLedger.vue'
import ApproachSection from 'components/ApproachSection.vue'
import ProjectsSection from 'components/ProjectsSection.vue'
import ContactSection from 'components/ContactSection.vue'
import { useScrollAnimation } from 'src/composables/useScrollAnimation'

useMeta({
  title: 'Diogenes Quintero — Backend Java Developer',
  meta: {
    description: {
      name: 'description',
      content:
        'Backend Java Developer. Building resilient systems on free-tier infrastructure with Java 21, Spring Boot, and Docker.',
    },
  },
})

const projects = ref([
  {
    id: 'feature-flag-api',
    i18nKey: 'projects.featureFlagApi',
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
  },
])

const scrollTo = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

useScrollAnimation()
</script>

<style scoped>
.index-page__inner {
  max-width: 1100px;
  margin: 0 auto;
}

.index-page__ledger {
  margin-top: 8px;
}

.index-page__section {
  margin-top: 80px;
}
</style>
