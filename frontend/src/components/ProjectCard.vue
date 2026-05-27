<template>
  <q-card class="project-card tech-card" :class="{ 'status-down': healthStatus === 'DOWN' }">
    <q-card-section>
      <div class="row items-center justify-between">
        <div class="row items-center q-gutter-sm">
          <div class="text-h6">{{ projectName }}</div>
          <q-btn
            v-if="project.repoUrl"
            flat
            round
            dense
            size="sm"
            :icon="mdiGithub"
            :href="project.repoUrl"
            target="_blank"
            class="github-btn"
          >
            <q-tooltip>{{ $t('projects.viewSource') }}</q-tooltip>
          </q-btn>
          <q-btn
            v-if="project.youtubeUrl"
            flat
            round
            dense
            size="sm"
            :icon="mdiYoutube"
            :href="project.youtubeUrl"
            target="_blank"
            class="youtube-btn"
          >
            <q-tooltip>{{ $t('projects.viewVideo') }}</q-tooltip>
          </q-btn>
        </div>
        <q-badge :color="healthStatus === 'UP' || !healthStatus ? 'positive' : 'negative'" rounded>
          {{ healthStatus || $t('projects.down') }}
        </q-badge>
      </div>
      <p class="text-body2 q-mt-sm">{{ projectDescription }}</p>

      <div class="tech-badges q-mt-md">
        <div v-for="tech in project.tech" :key="tech.name" class="tech-badge-item">
          <q-icon :name="tech.icon" size="20px" color="accent">
            <q-tooltip>{{ tech.name }}</q-tooltip>
          </q-icon>
        </div>
      </div>
    </q-card-section>

    <q-card-section v-if="healthStatus === 'UP'" class="tech-card q-pa-sm q-pa-md-md q-mt-sm">
      <div class="row q-col-gutter-md">
        <div class="col-12 col-sm-6">
          <div class="text-caption text-secondary">
            {{ $t('projects.memory') }}
            <q-icon name="help" size="xs" class="q-ml-xs cursor-help text-secondary">
              <q-tooltip>{{ $t('projects.memoryTooltip') }}</q-tooltip>
            </q-icon>
          </div>
          <q-linear-progress
            size="24px"
            :value="memoryUsage"
            color="accent"
            track-color="rgba(7,59,76,0.1)"
            class="q-mt-sm rounded-borders shadow-1"
          >
            <div class="absolute-full flex flex-center">
              <div 
                class="text-mono text-weight-bold text-no-wrap" 
                :class="$q.dark.isActive ? 'text-white' : 'text-secondary'"
                style="font-size: 11px; line-height: 1;"
              >
                {{ memoryUsedMB.toFixed(0) }}MB / {{ memoryMaxMB.toFixed(0) }}MB
              </div>
            </div>
          </q-linear-progress>
        </div>
        <div class="col-12 col-sm-6">
          <div class="text-caption text-secondary">
            {{ $t('projects.uptime') }}
            <q-icon name="help" size="xs" class="q-ml-xs cursor-help text-secondary">
              <q-tooltip>{{ $t('projects.uptimeTooltip') }}</q-tooltip>
            </q-icon>
          </div>
          <div class="text-h6 text-mono text-accent">{{ uptimeFormatted }}</div>
        </div>
      </div>
      <div class="q-mt-md text-center">
        <q-badge color="warning" text-color="dark" class="text-mono">
          {{ $t('projects.resetIn') + resetCountdown }}
          <q-icon name="help" size="12px" class="q-ml-xs" style="vertical-align: middle;">
            <q-tooltip>{{ $t('projects.resetTooltip') }}</q-tooltip>
          </q-icon>
        </q-badge>
      </div>
    </q-card-section>

    <q-card-section :class="$q.screen.lt.sm ? 'q-pa-sm' : 'q-pa-md'">
      <q-btn
        color="accent"
        :label="$t('projects.tryApi')"
        @click="showSwagger = true"
        :class="{ 'full-width': $q.screen.lt.sm }"
      />

      <!-- SWAGGER FULLSCREEN DIALOG -->
      <q-dialog v-model="showSwagger" maximized transition-show="slide-up" transition-hide="slide-down">
        <q-card class="bg-dark text-white overflow-hidden">
          <q-bar class="bg-secondary q-py-lg">
            <div class="text-h6 text-mono">{{ projectName }} - API Explorer</div>
            <q-space />
            <q-btn dense flat icon="close" v-close-popup>
              <q-tooltip>Cerrar</q-tooltip>
            </q-btn>
          </q-bar>

          <q-card-section class="q-pa-none" style="height: calc(100vh - 48px)">
            <iframe
              :src="swaggerUrl"
              class="full-width full-height no-border"
              frameborder="0"
            ></iframe>
          </q-card-section>
        </q-card>
      </q-dialog>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { api } from 'boot/axios.js'
import { mdiGithub, mdiYoutube } from '@quasar/extras/mdi-v7'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
})

const { t } = useI18n()

const projectName = computed(() => {
  return props.project.i18nKey ? t(props.project.i18nKey + '.name') : props.project.name || ''
})

const projectDescription = computed(() => {
  return props.project.i18nKey ? t(props.project.i18nKey + '.description') : props.project.description || ''
})

const healthStatus = ref(null)
const memoryUsedBytes = ref(0)
const memoryMaxBytes = ref(0)
const uptimeSeconds = ref(0)
const showSwagger = ref(false)
let intervalId = null

const swaggerUrl = computed(() => `${props.project.baseUrl}${props.project.swaggerPath}`)
const serviceUrl = computed(() => props.project.serviceUrl || props.project.baseUrl)
const actuatorUrl = computed(() => `${serviceUrl.value}/api/v1/feature-flags/actuator`)

const memoryUsedMB = computed(() => memoryUsedBytes.value / (1024 * 1024))
const memoryMaxMB = computed(() => memoryMaxBytes.value / (1024 * 1024))
const memoryUsage = computed(() =>
  memoryMaxBytes.value ? memoryUsedBytes.value / memoryMaxBytes.value : 0,
)

const uptimeFormatted = computed(() => {
  const h = Math.floor(uptimeSeconds.value / 3600)
  const m = Math.floor((uptimeSeconds.value % 3600) / 60)
  const s = Math.floor(uptimeSeconds.value % 60)
  return `${h}h ${m}m ${s}s`
})

const resetCountdown = computed(() => {
  // We use uptimeSeconds just as a trigger to re-calculate every poll
  // but we base the calculation on the absolute wall clock
  void uptimeSeconds.value
  const now = new Date()
  const mins = now.getMinutes()
  const secs = now.getSeconds()
  
  const totalSecondsIn30Min = 1800
  const secondsPassedInPeriod = (mins % 30) * 60 + secs
  const remaining = totalSecondsIn30Min - secondsPassedInPeriod
  
  const m = Math.floor(remaining / 60)
  const s = remaining % 60
  
  // If it just hit 0, show 30:00 for the next cycle
  if (remaining <= 0) return '30:00'
  
  return `${m}:${s.toString().padStart(2, '0')}`
})

async function fetchHealth() {
  try {
    const { data } = await api.get(`${actuatorUrl.value}/health`)
    healthStatus.value = data.status
  } catch {
    healthStatus.value = 'DOWN'
  }
}

async function fetchMetrics() {
  try {
    const [memUsed, memMax, uptimeRes] = await Promise.all([
      api.get(`${actuatorUrl.value}/metrics/jvm.memory.used`),
      api.get(`${actuatorUrl.value}/metrics/jvm.memory.max`),
      api.get(`${actuatorUrl.value}/metrics/process.uptime`),
    ])
    memoryUsedBytes.value = memUsed.data.measurements[0].value
    memoryMaxBytes.value = memMax.data.measurements[0].value
    uptimeSeconds.value = uptimeRes.data.measurements[0].value
  } catch {
    // silent
  }
}

function startPolling() {
  fetchHealth()
  fetchMetrics()
  intervalId = setInterval(() => {
    fetchHealth()
    fetchMetrics()
  }, 5000)
}

onMounted(() => {
  startPolling()
})

onBeforeUnmount(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>

<style lang="scss" scoped>
.project-card {
  border-left: 4px solid $accent;
}

.text-caption {
  color: $secondary;
}
.tech-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
.tech-badge-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(239, 71, 111, 0.1);
  border: 1px solid rgba(239, 71, 111, 0.3);
}

.github-btn, .youtube-btn {
  color: $secondary;
  transition: color 0.2s ease;

  :global(.body--dark) & {
    color: $dark-text;
    &:hover {
      color: $accent;
    }
  }

  &:hover {
    color: $accent;
  }
}

:global(.body--dark) {
  .tech-badge-item {
    background: rgba(239, 71, 111, 0.15);
    border-color: rgba(239, 71, 111, 0.4);
  }
}
</style>