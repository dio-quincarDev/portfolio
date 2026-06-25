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
            rel="noopener noreferrer"
            class="github-btn"
            :aria-label="$t('projects.viewSource')"
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
            rel="noopener noreferrer"
            class="youtube-btn"
            :aria-label="$t('projects.viewVideo')"
          >
            <q-tooltip>{{ $t('projects.viewVideo') }}</q-tooltip>
          </q-btn>
        </div>
        <q-badge :color="healthStatus === 'UP' || !healthStatus ? 'positive' : 'negative'" rounded>
          {{ healthStatus || $t('projects.down') }}
        </q-badge>
      </div>
      <p class="text-body2 q-mt-sm">{{ projectDescription }}</p>

      <!-- Case Study: Problem / Solution / Decisions -->
      <div v-if="projectProblem" class="case-study q-mt-md">
        <div class="case-study-block">
          <div class="case-study-label text-accent text-caption text-weight-bold text-mono">
            <q-icon name="warning" size="xs" class="q-mr-xs" />
            {{ $t('projects.theProblem') }}
          </div>
          <p class="text-body2 text-grey-8 q-mb-none">{{ projectProblem }}</p>
        </div>
        <div class="case-study-block">
          <div class="case-study-label text-secondary text-caption text-weight-bold text-mono">
            <q-icon name="lightbulb" size="xs" class="q-mr-xs" />
            {{ $t('projects.theSolution') }}
          </div>
          <p class="text-body2 text-grey-8 q-mb-none">{{ projectSolution }}</p>
        </div>
        <div v-if="projectDecisions && projectDecisions.length" class="case-study-block">
          <div class="case-study-label text-secondary text-caption text-weight-bold text-mono">
            <q-icon name="architecture" size="xs" class="q-mr-xs" />
            {{ $t('projects.keyDecisions') }}
          </div>
          <ul class="decisions-list text-body2 text-grey-8">
            <li v-for="(decision, i) in projectDecisions" :key="i">{{ decision }}</li>
          </ul>
        </div>
      </div>

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

    <q-card-section class="card-section-responsive">
      <div class="row q-gutter-sm btn-responsive">
        <q-btn
          color="accent"
          :label="$t('projects.tryApi')"
          icon="api"
          @click="showSwagger = true"
          class="col"
        />
        <q-btn
          v-if="project.repoUrl"
          color="secondary"
          :label="$t('projects.viewSource')"
          icon="code"
          :href="project.repoUrl"
          target="_blank"
          rel="noopener noreferrer"
          flat
          class="col"
        />
      </div>

      <!-- SWAGGER FULLSCREEN DIALOG -->
      <q-dialog v-model="showSwagger" maximized transition-show="slide-up" transition-hide="slide-down">
        <q-card class="bg-dark text-white overflow-hidden">
          <q-bar class="bg-secondary q-py-lg">
            <div class="row items-center no-wrap full-width">
              <div class="col">
                <div class="text-h6 text-mono">{{ projectName }} — API Explorer</div>
                <div class="text-caption text-grey-5">{{ $t('projects.swaggerDesc') }}</div>
              </div>
              <q-btn dense flat icon="close" v-close-popup aria-label="Close Swagger">
                <q-tooltip>{{ $t('projects.hideSwagger') }}</q-tooltip>
              </q-btn>
            </div>
          </q-bar>

          <q-card-section class="q-pa-none" style="height: calc(100vh - 56px)">
            <iframe
              :src="swaggerUrl"
              class="full-width full-height no-border"
              frameborder="0"
              :title="$t('projects.swaggerIframeTitle')"
            ></iframe>
          </q-card-section>
        </q-card>
      </q-dialog>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { api } from 'boot/axios.js'
import { mdiGithub, mdiYoutube } from '@quasar/extras/mdi-v7'
import { useI18n } from 'vue-i18n'
import { useInterval } from 'quasar'

const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
})

const { t } = useI18n()
const { registerInterval } = useInterval()

const projectName = computed(() => {
  return props.project.i18nKey ? t(props.project.i18nKey + '.name') : props.project.name || ''
})

const projectDescription = computed(() => {
  return props.project.i18nKey ? t(props.project.i18nKey + '.description') : props.project.description || ''
})

const projectProblem = computed(() => {
  return props.project.i18nKey ? t(props.project.i18nKey + '.problem') : ''
})

const projectSolution = computed(() => {
  return props.project.i18nKey ? t(props.project.i18nKey + '.solution') : ''
})

const projectDecisions = computed(() => {
  if (!props.project.i18nKey) return []
  const decisions = t(props.project.i18nKey + '.decisions')
  return Array.isArray(decisions) ? decisions : []
})

const healthStatus = ref(null)
const memoryUsedBytes = ref(0)
const memoryMaxBytes = ref(0)
const uptimeSeconds = ref(0)
const showSwagger = ref(false)

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
  const elapsedInPeriod = uptimeSeconds.value % 1800
  const remaining = 1800 - elapsedInPeriod
  const m = Math.floor(remaining / 60)
  const s = remaining % 60
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
  registerInterval(() => {
    fetchHealth()
    fetchMetrics()
  }, 5000)
}

onMounted(() => {
  startPolling()
})
</script>

<style lang="scss" scoped>
.project-card {
  border-left: 4px solid $accent;
}

.case-study {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.case-study-block {
  padding: 10px 14px;
  background: rgba(7, 59, 76, 0.03);
  border-left: 3px solid $secondary;

  :global(.body--dark) & {
    background: rgba(242, 239, 233, 0.05);
  }
}

.case-study-label {
  margin-bottom: 4px;
}

.decisions-list {
  margin: 4px 0 0 0;
  padding-left: 18px;

  li {
    margin-bottom: 2px;
    line-height: 1.4;
  }
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
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: scale(1.15);
    box-shadow: 0 0 12px rgba(239, 71, 111, 0.3);
  }
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

.card-section-responsive {
  padding: 8px;
  @media (min-width: 600px) {
    padding: 16px;
  }
}

.btn-responsive {
  @media (max-width: 599px) {
    width: 100%;
  }
}
</style>
