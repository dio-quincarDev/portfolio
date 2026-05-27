<template>
  <q-page class="q-pa-md q-pa-lg-md">
    <!-- DASHBOARD GRID -->
    <div class="row q-col-gutter-md q-col-gutter-lg-md">
      <!-- HERO & TERMINAL SECTION (8 Cols) -->
      <div class="col-12 col-lg-8">
        <div class="terminal-container tech-card q-pa-sm q-pa-md-md border-glow-primary full-height">
          <div class="row items-center q-mb-sm border-bottom q-pb-xs">
            <div class="terminal-dots q-mr-md">
              <span class="dot primary-dot"></span>
              <span class="dot primary-dot"></span>
              <span class="dot accent-dot"></span>
            </div>
            <div class="text-caption text-mono text-grey-7">{{ $t('hero.console') }}</div>
          </div>

          <div class="terminal-content text-mono q-mt-sm q-mt-md-md">
            <div class="text-secondary text-h4 text-h3-sm text-h2-md q-mb-xs text-weight-bold">
              {{ $t('hero.name') }}
            </div>
            <div
              class="text-subtitle1 text-h6-sm text-grey-9 q-mb-md q-mb-lg-md text-weight-medium text-uppercase"
              style="letter-spacing: 2px"
            >
              {{ $t('hero.seniority') }}
            </div>

            <div class="typed-text">
              <p class="q-ma-none text-grey-8 text-caption text-body2-md">{{ $t('hero.systemStatus') }}</p>
              <p class="q-ma-none text-primary text-weight-bold text-caption text-body2-md">{{ $t('hero.activeDev') }}</p>
              <p class="q-ma-none text-secondary text-weight-bold text-caption text-body2-md">{{ $t('hero.stack') }}</p>
              <p class="q-ma-none text-grey-9 text-caption text-body2-md">{{ $t('hero.philosophy') }}</p>
              <p class="q-ma-none text-grey-8 text-italic q-mt-xs text-caption text-body2-md" style="opacity: 0.8">
                {{ $t('hero.uiInterface') }}
              </p>
            </div>
          </div>

          <div class="q-mt-lg q-mt-xl-md row q-gutter-sm full-width">
            <q-btn
              flat
              color="secondary"
              :label="$t('hero.coreProjects')"
              icon="account_tree"
              @click="scrollToProjects"
              class="cyber-button"
              :class="{ 'full-width': $q.screen.lt.sm }"
            />
            <q-btn
              flat
              color="accent"
              :label="$t('hero.contactProtocol')"
              icon="terminal"
              @click="scrollToContact"
              class="cyber-button accent-border"
              :class="{ 'full-width': $q.screen.lt.sm }"
            />
          </div>
        </div>
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
              <q-badge :color="healthStatus === 'UP' ? 'positive' : 'negative'" class="q-px-sm">
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

      <!-- PROJECTS GRID (right after hero) -->
      <div id="projects-section" class="col-12">
        <div class="row items-center q-mb-sm q-mb-md-md">
          <q-icon name="layers" color="secondary" size="sm" class="q-mr-sm" />
          <div class="text-subtitle1 text-h6-sm text-mono">{{ $t('projects.title') }}</div>
        </div>
        <div class="row q-col-gutter-md q-col-gutter-lg-md">
          <div v-for="project in projects" :key="project.id" class="col-12">
            <ProjectCard :project="project" />
          </div>
        </div>
      </div>

      <!-- OBSERVABILITY DASHBOARD (after projects) -->
      <div class="col-12">
        <MetricsDashboard />
      </div>

      <!-- CONTACT SECTION -->
      <div id="contacto-section" class="col-12 q-mt-lg q-mt-xl-md">
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
import { reactive, ref, onMounted } from 'vue'
import { api } from 'boot/axios'
import ProjectCard from 'components/ProjectCard.vue'
import MetricsDashboard from 'components/MetricsDashboard.vue'
import { useQuasar } from 'quasar'
import { useI18n } from 'vue-i18n'
import emailjs from '@emailjs/browser'

const $q = useQuasar()
const { t } = useI18n()

const form = reactive({
  name: '',
  email: '',
  message: '',
  honeypot: '',
})

const sending = ref(false)
const contactExpanded = ref(false)
const cooldownUntil = ref(0)

emailjs.init({
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
})

const healthStatus = ref('DOWN')
const currentUptime = ref('--')
const responseTime = ref(0)
const uptimeSeconds = ref(0)

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

const checkHealth = async () => {
  const fetchStart = performance.now()
  try {
    const [healthRes, uptimeRes] = await Promise.all([
      api.get('/api/v1/feature-flags/actuator/health'),
      api.get('/api/v1/feature-flags/actuator/metrics/process.uptime').catch(() => null)
    ])
    
    healthStatus.value = healthRes.data.status
    responseTime.value = Math.round(performance.now() - fetchStart)
    
    if (uptimeRes && uptimeRes.data && uptimeRes.data.measurements) {
      uptimeSeconds.value = uptimeRes.data.measurements[0].value
      updateUptimeDisplay()
    }
  } catch {
    healthStatus.value = 'DOWN'
  }
}

const updateUptimeDisplay = () => {
  const totalSeconds = uptimeSeconds.value
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const mins = Math.floor((totalSeconds % 3600) / 60)
  
  if (days > 0) {
    currentUptime.value = `${days}d ${hours}h`
  } else if (hours > 0) {
    currentUptime.value = `${hours}h ${mins}m`
  } else {
    currentUptime.value = `${mins}m`
  }
}

const updateUptime = () => {
  if (healthStatus.value === 'UP') {
    uptimeSeconds.value += 60
    updateUptimeDisplay()
  }
}

const scrollToContact = () => {
  const el = document.getElementById('contacto-section')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
    setTimeout(() => {
      contactExpanded.value = true
    }, 500)
  }
}

const scrollToProjects = () => {
  const el = document.getElementById('projects-section')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

const toggleContact = () => {
  contactExpanded.value = !contactExpanded.value
}

onMounted(() => {
  updateUptime()
  checkHealth()
  setInterval(checkHealth, 30000)
  setInterval(updateUptime, 60000)
})

const sendContact = async () => {
  if (form.honeypot) {
    console.warn('Bot detected via honeypot')
    return
  }

  if (Date.now() < cooldownUntil.value) {
    $q.notify({
      message: t('contact.cooldown'),
      color: 'warning',
      icon: 'timer',
    })
    return
  }

  if (!form.name || !form.email || !form.message) {
    $q.notify({
      message: t('contact.required'),
      color: 'negative',
      icon: 'warning',
    })
    return
  }

  sending.value = true

  try {
    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        name: form.name,
        from_email: form.email,
        message: form.message,
      },
    )

    $q.notify({
      message: t('contact.sent'),
      color: 'positive',
      icon: 'done',
    })

    form.name = ''
    form.email = ''
    form.message = ''

    cooldownUntil.value = Date.now() + 60000
  } catch (error) {
    $q.notify({
      message: t('contact.error'),
      color: 'negative',
      icon: 'error',
    })
    console.error('EmailJS error:', error)
  } finally {
    sending.value = false
  }
}
</script>

<style lang="scss" scoped>
.terminal-container {
  min-height: 280px;
  @media (min-width: 600px) {
    min-height: 350px;
  }
}
.border-bottom {
  border-bottom: 1px solid rgba(7, 59, 76, 0.1);
}
.terminal-dots {
  display: flex;
  gap: 6px;
  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    &.primary-dot {
      background: $primary;
    }
    &.accent-dot {
      background: $accent;
    }
  }
  .text-secondary {
    color: $secondary;
  }
}
.terminal-content {
  line-height: 1.7;
  font-size: 0.95rem;
  @media (min-width: 600px) {
    line-height: 1.8;
    font-size: 1.1rem;
  }
}
.ecosystem-card {
  min-height: 120px;
  @media (min-width: 600px) {
    min-height: 150px;
  }
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
