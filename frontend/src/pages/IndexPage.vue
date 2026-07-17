<template>
  <q-page class="q-pa-md q-pa-lg-md">
    <!-- DASHBOARD GRID -->
    <div class="row q-col-gutter-md q-col-gutter-lg-md">
      <!-- HERO & TERMINAL SECTION (8 Cols) -->
      <div class="col-12 col-lg-8">
        <HeroSection
          :current-uptime="currentUptime"
          :response-time="responseTime"
          @scroll-to-philosophy="scrollToPhilosophy"
          @scroll-to-projects="scrollToProjects"
          @scroll-to-contact="scrollToContact"
        />
      </div>

      <!-- SYSTEM STATUS TILE (4 Cols) -->
      <div class="col-12 col-lg-4">
        <div class="tech-card ecosystem-card q-pa-sm q-pa-md-md col-auto full-height flex flex-center">
          <div class="full-width">
            <div class="row items-center justify-between q-mb-md">
              <div class="row items-center q-gutter-xs">
                <div class="text-caption text-subtitle2-md text-mono">{{ $t('health.ecosystem') }}</div>
                <q-icon name="help_outline" size="14px" class="text-grey-6 cursor-help">
                  <q-tooltip anchor="top middle" self="bottom middle" :offset="[0, 4]">
                    {{ $t('health.ecosystemTooltip') }}
                  </q-tooltip>
                </q-icon>
              </div>
              <q-badge :color="healthStatus === 'UP' ? 'positive' : 'negative'" class="q-px-sm" :class="{ 'status-glow': healthStatus === 'UP' }">
                {{ healthStatus === 'UP' ? $t('health.operational') : $t('health.offline') }}
              </q-badge>
            </div>
            <div class="text-caption text-grey-7 q-mb-sm text-italic" style="line-height: 1.3">
              {{ $t('health.ecosystemSub') }}
            </div>

            <div class="row q-col-gutter-sm q-mb-md">
              <div class="col-6">
                <div class="text-caption text-grey-8">{{ $t('health.uptime') }}</div>
                <div class="text-h6 text-mono">{{ currentUptime }}</div>
              </div>
              <div class="col-6">
                <div class="text-caption text-grey-8">{{ $t('health.responseTime') }}</div>
                <div class="text-h6 text-mono">{{ responseTime }}ms</div>
              </div>
            </div>

            <div class="q-mb-md text-caption text-mono text-secondary">
              <q-icon name="sync" size="xs" class="q-mr-xs" />
              {{ $t('health.protocol') }}
            </div>

            <div class="row items-center q-gutter-sm">
              <q-icon name="mdi-language-java" size="sm" color="secondary">
                <q-tooltip>{{ $t('health.techJava') }}</q-tooltip>
              </q-icon>
              <q-icon name="mdi-leaf" size="sm" color="secondary">
                <q-tooltip>{{ $t('health.techSpring') }}</q-tooltip>
              </q-icon>
              <q-icon name="mdi-database" size="sm" color="secondary">
                <q-tooltip>{{ $t('health.techPostgres') }}</q-tooltip>
              </q-icon>
              <span class="text-caption text-grey-7">{{ $t('health.stackLabel') }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ENGINEERING PHILOSOPHY -->
      <PhilosophySection />

      <!-- PROJECTS GRID -->
      <ProjectsSection :projects="projects" />

      <!-- OBSERVABILITY DASHBOARD (collapsible) -->
      <div class="col-12">
        <q-expansion-item
          :label="$t('dashboard.title')"
          header-class="text-mono text-secondary expansion-header tech-card q-pa-sm q-pa-md-sm"
          expand-icon-class="text-secondary"
          dense
        >
          <MetricsDashboard />
        </q-expansion-item>
      </div>

      <!-- CONTACT SECTION -->
      <div id="contacto-section" class="col-12 q-mt-lg q-mt-xl-md animate-on-scroll">
        <div class="text-center q-mb-md">
          <q-btn
            unelevated
            :color="contactExpanded ? 'negative' : 'secondary'"
            :label="contactExpanded ? $t('contact.close') : $t('contact.openLabel')"
            :icon="contactExpanded ? 'close' : 'mail'"
            @click="toggleContact"
            class="contact-toggle cyber-button text-mono q-px-xl"
            size="lg"
            :class="{ 'accent-border': !contactExpanded }"
          />
        </div>

        <transition name="slide-expand">
          <div v-show="contactExpanded" class="tech-card border-glow-accent overflow-hidden">
            <div class="terminal-header-form q-pa-sm row items-center">
              <div class="terminal-dots q-mr-md">
                <span class="dot primary-dot"></span>
                <span class="dot primary-dot"></span>
                <span class="dot accent-dot"></span>
              </div>
              <div class="text-caption text-mono text-secondary text-weight-bold">
                {{ $t('contact.title') }}
              </div>
            </div>

            <div class="q-pa-md q-pa-lg-xl">
              <q-form @submit="sendContact" class="row q-col-gutter-lg">
                <div class="col-12 col-md-6">
                  <q-input
                    outlined
                    v-model="form.name"
                    :label="$t('contact.name')"
                    class="text-mono"
                    color="secondary"
                    :rules="[(val) => !!val || $t('contact.nameRequired')]"
                  />
                </div>
                <div class="col-12 col-md-6">
                  <q-input
                    outlined
                    v-model="form.email"
                    :label="$t('contact.email')"
                    type="email"
                    class="text-mono"
                    color="secondary"
                    :rules="[
                      (val) => !!val || $t('contact.emailRequired'),
                      (val) => /.+@.+\..+/.test(val) || $t('contact.emailInvalid'),
                    ]"
                  />
                </div>

                <div class="col-12" style="display: none" aria-hidden="true">
                  <input v-model="form.honeypot" tabindex="-1" autocomplete="off" />
                </div>

                <div class="col-12">
                  <q-input
                    outlined
                    v-model="form.message"
                    :label="$t('contact.message')"
                    type="textarea"
                    class="text-mono"
                    color="secondary"
                    :rules="[(val) => !!val || $t('contact.messageRequired')]"
                  />
                </div>
                <div class="col-12 text-center">
                  <q-btn
                    type="submit"
                    color="secondary"
                    :label="$t('contact.submit')"
                    icon="send"
                    class="q-px-xl cyber-button"
                    flat
                    :loading="sending"
                    :disable="sending || !!form.honeypot"
                  />
                </div>
              </q-form>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useMeta } from 'quasar'
import HeroSection from 'components/HeroSection.vue'
import PhilosophySection from 'components/PhilosophySection.vue'
import ProjectsSection from 'components/ProjectsSection.vue'
import MetricsDashboard from 'components/MetricsDashboard.vue'
import { useHealthCheck } from 'src/composables/useHealthCheck'
import { useContactForm } from 'src/composables/useContactForm'
import { useScrollAnimation } from 'src/composables/useScrollAnimation'

useMeta({
  title: 'Diógenes Quintero — Backend Java Developer & API Architect',
  meta: {
    description: {
      name: 'description',
      content: 'Backend Java Developer & API Architect. Designing enterprise-grade systems on free-tier infrastructure with Java 21, Spring Boot, and Docker.',
    },
  },
})

const { healthStatus, currentUptime, responseTime } = useHealthCheck()
const { form, sending, contactExpanded, toggleContact, scrollToContact, sendContact } = useContactForm()

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
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
    swaggerPath: '/swagger-ui.html',
    serviceUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
    repoUrl: 'https://github.com/dio-quincarDev/feat-flag-api-bytes-colabs',
    youtubeUrl: 'https://youtu.be/cwE23zuhj8Q',
  },
])

const scrollToProjects = () => {
  const el = document.getElementById('projects-section')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

const scrollToPhilosophy = () => {
  const el = document.getElementById('philosophy-section')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

useScrollAnimation()
</script>

<style lang="scss" scoped>
.ecosystem-card {
  min-height: 120px;
  @media (min-width: 600px) {
    min-height: 150px;
  }
}

.expansion-header {
  border-left: 4px solid $accent;
  cursor: pointer;
  &:hover {
    background: rgba(239, 71, 111, 0.03);
  }
}

.status-glow {
  animation: statusPulse 2s ease-in-out infinite;
}

@keyframes statusPulse {
  0%, 100% { box-shadow: 0 0 4px rgba(33, 186, 69, 0.4); }
  50% { box-shadow: 0 0 12px rgba(33, 186, 69, 0.7); }
}

.slide-expand-enter-active,
.slide-expand-leave-active {
  transition: all 0.4s ease;
  overflow: hidden;
}

.slide-expand-enter-from,
.slide-expand-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.contact-toggle {
  &.bg-negative {
    background: $negative !important;
  }
  &.bg-secondary {
    background: $secondary !important;
  }
}
</style>
