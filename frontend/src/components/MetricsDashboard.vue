<template>
  <div class="tech-card q-pa-sm q-pa-md-md q-mb-lg border-glow-primary overflow-hidden">
    <div class="row items-center q-mb-md q-mb-lg-md justify-between wrap q-gutter-sm">
      <div class="row items-center q-gutter-sm wrap">
        <q-icon name="monitoring" color="secondary" size="sm" class="q-mr-sm" />
        <div class="text-subtitle1 text-h6-sm text-mono">{{ $t('dashboard.title') }}</div>
        <q-badge color="positive" class="pulse-badge" :label="liveLabel" />
      </div>
      <q-btn
        flat
        dense
        color="accent"
        icon="bolt"
        :label="$q.screen.lt.sm ? '' : $t('dashboard.stressTest')"
        @click="simulateStress"
        :loading="isStressing"
        class="border-glow-accent text-mono text-caption"
      >
        <q-tooltip>{{ $t('dashboard.stressTest') }}</q-tooltip>
      </q-btn>
    </div>

    <div class="row q-col-gutter-md q-col-gutter-lg-md">
      <!-- Traffic Chart -->
      <div class="col-12 col-md-6">
        <div class="row items-center q-mb-sm">
          <div class="text-subtitle2 text-mono">{{ $t('dashboard.traffic') }}</div>
          <q-icon name="help_outline" size="14px" class="q-ml-xs text-grey-6 cursor-help">
            <q-tooltip anchor="top middle" self="bottom middle" :offset="[0, 4]">
              {{ $t('dashboard.trafficTooltip') }}
            </q-tooltip>
          </q-icon>
        </div>
        <div class="text-caption text-grey-7 q-mb-sm text-italic" style="line-height: 1.3">
          {{ $t('dashboard.trafficSub') }}
        </div>
        <apexchart
          type="area"
          :height="chartHeight"
          :options="trafficChartOptions"
          :series="trafficSeries"
        />
      </div>

      <!-- Circuit Breaker Status -->
      <div class="col-12 col-md-6">
        <div class="row items-center q-mb-sm">
          <div class="text-subtitle2 text-mono">{{ $t('dashboard.circuitBreaker') }}</div>
          <q-icon name="help_outline" size="14px" class="q-ml-xs text-grey-6 cursor-help">
            <q-tooltip anchor="top middle" self="bottom middle" :offset="[0, 4]">
              {{ $t('dashboard.circuitBreakerTooltip') }}
            </q-tooltip>
          </q-icon>
        </div>
        <div class="text-caption text-grey-7 q-mb-sm text-italic" style="line-height: 1.3">
          {{ $t('dashboard.circuitBreakerSub') }}
        </div>
        <div class="circuit-card q-pa-sm q-pa-md-md full-height">
          <div class="row items-center justify-between">
            <div class="text-caption text-mono">{{ $t('dashboard.state') }}: {{ status }}</div>
            <q-badge
              :color="status === 'HEALTHY' ? 'positive' : 'negative'"
              :label="status === 'HEALTHY' ? $t('dashboard.protected') : $t('dashboard.tripped')"
              class="state-badge"
            />
          </div>
          <div class="row q-col-gutter-x-xs q-col-gutter-md-md q-mt-md">
            <div class="col-4 text-center">
              <div class="text-h6 text-mono">{{ circuitMetrics.totalCalls }}</div>
              <div class="text-caption text-grey-7">{{ $t('dashboard.totalCalls') }}</div>
            </div>
            <div class="col-4 text-center">
              <div class="text-h6 text-mono">{{ circuitMetrics.successRate }}%</div>
              <div class="text-caption text-grey-7">{{ $t('dashboard.successRate') }}</div>
            </div>
            <div class="col-4 text-center">
              <div class="text-h6 text-mono">{{ circuitMetrics.errorRate }}%</div>
              <div class="text-caption text-grey-7">{{ $t('dashboard.errorRate') }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- JVM Resources -->
      <div class="col-12 col-md-4">
        <div class="row items-center q-mb-sm">
          <div class="text-subtitle2 text-mono">{{ $t('dashboard.heapUsage') }}</div>
          <q-icon name="help_outline" size="14px" class="q-ml-xs text-grey-6 cursor-help">
            <q-tooltip anchor="top middle" self="bottom middle" :offset="[0, 4]">
              {{ $t('dashboard.heapTooltip') }}
            </q-tooltip>
          </q-icon>
        </div>
        <div class="text-caption text-grey-7 q-mb-sm text-italic" style="line-height: 1.3">
          {{ $t('dashboard.heapSub') }}
        </div>
        <div class="circuit-card q-pa-sm q-pa-md-md">
          <div class="row items-center justify-between q-mb-xs">
            <div class="text-caption text-mono">{{ heapData.used }}MB / {{ heapData.max }}MB</div>
            <div class="text-caption text-mono text-secondary">{{ heapData.percent }}%</div>
          </div>
          <q-linear-progress
            :value="heapData.percent / 100"
            color="secondary"
            track-color="grey-3"
            class="q-mt-sm"
            size="10px"
          />
        </div>
      </div>

      <!-- Event Terminal -->
      <div class="col-12 col-md-8">
        <div class="row items-center q-mb-sm">
          <div class="text-subtitle2 text-mono">{{ $t('dashboard.eventLog') }}</div>
          <q-icon name="help_outline" size="14px" class="q-ml-xs text-grey-6 cursor-help">
            <q-tooltip anchor="top middle" self="bottom middle" :offset="[0, 4]">
              {{ $t('dashboard.eventTooltip') }}
            </q-tooltip>
          </q-icon>
        </div>
        <div class="text-caption text-grey-7 q-mb-sm text-italic" style="line-height: 1.3">
          {{ $t('dashboard.eventSub') }}
        </div>
        <div class="terminal-box q-pa-sm text-mono">
          <div v-for="(log, index) in eventLogs" :key="index" class="log-line" :class="log.type">
            <span class="text-grey-7">[{{ log.time }}]</span>
            <span class="q-ml-sm">{{ log.message }}</span>
          </div>
          <div v-if="eventLogs.length === 0" class="text-grey-7">Listening for system events...</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, reactive } from 'vue'
import { api } from 'boot/axios'
import { useI18n } from 'vue-i18n'

import { useQuasar } from 'quasar'

const { t } = useI18n()
const $q = useQuasar()

const metrics = ref([])
const status = ref('CLOSED')
const circuitMetrics = ref({ totalCalls: 0, successRate: 100, errorRate: 0 })
const liveLabel = computed(() => t('dashboard.live'))

const heapData = reactive({ used: 0, max: 0, percent: 0 })
const eventLogs = ref([])
const isStressing = ref(false)
const lastBlockedCount = ref(0)

const trafficSeries = computed(() => [
  {
    name: 'Traffic',
    data: metrics.value.map((m) => [m.timestamp, m.requestsPerSecond || 0]),
  },
])

const chartHeight = computed(() => $q.screen.lt.sm ? 150 : 180)

const trafficChartOptions = computed(() => {
  const isDark = $q.dark.isActive
  const textColor = isDark ? '#f2efe9' : '#073b4c'
  const gridColor = isDark ? 'rgba(242, 239, 233, 0.1)' : 'rgba(7, 59, 76, 0.1)'

  return {
    chart: {
      type: 'area',
      background: 'transparent',
      toolbar: { show: false },
      animations: { enabled: true, easing: 'linear', dynamicAnimation: { speed: 500 } },
    },
    colors: ['#ef476f'],
    fill: {
      type: 'gradient',
      gradient: { shadeIntensity: 1, opacityFrom: 0.7, opacityTo: 0.1 },
    },
    stroke: { curve: 'smooth', width: 2 },
    xaxis: {
      type: 'datetime',
      labels: { style: { colors: textColor, fontSize: '10px' } },
      axisBorder: { show: false },
    },
    yaxis: {
      labels: {
        style: { colors: textColor, fontSize: '10px' },
        formatter: (val) => `${val.toFixed(1)} req/s`,
      },
    },
    grid: { borderColor: gridColor, strokeDashArray: 4 },
    theme: { mode: isDark ? 'dark' : 'light' },
    tooltip: {
      theme: isDark ? 'dark' : 'light',
      x: { format: 'HH:mm:ss' },
      y: { formatter: (val) => `${val.toFixed(2)} req/s` },
    },
  }
})

let intervalId = null

async function fetchMetrics() {
  try {
    const [trafficRes, healthRes] = await Promise.all([
      api.get('/api/v1/feature-flags/actuator/prometheus', { headers: { Accept: 'text/plain' } }).catch(() => ({ data: '' })),
      api.get('/api/v1/feature-flags/actuator/health').catch(() => ({ data: { status: 'DOWN', components: { circuitBreakers: { details: { featureFlagCircuitBreaker: { status: 'UNKNOWN' } } } } } })),
    ])

    // Update CB Status from Health
    const cbData = healthRes.data?.components?.circuitBreakers?.details?.featureFlagCircuitBreaker
    if (cbData) {
      const apiStatus = cbData.status === 'UP' ? 'CLOSED' : cbData.status
      const displayStatus = apiStatus === 'CLOSED' ? 'HEALTHY' : (apiStatus === 'OPEN' ? 'PROTECTING' : apiStatus)
      
      if (status.value !== displayStatus) {
        addLog(`System Status: ${displayStatus}`, apiStatus === 'CLOSED' ? 'info' : 'warn')
        status.value = displayStatus
      }
    }

    const prometheusData = parsePrometheus(trafficRes.data || '')
    updateTrafficData(prometheusData)
    updateCircuitMetrics(prometheusData)
    updateHeapData(prometheusData)
    updateSecurityEvents(prometheusData)
  } catch {
    // silent
  }
}

function parsePrometheus(text) {
  const lines = text.split('\n')
  
  // Sum all memory areas (Eden, Survivor, Old Gen) that belong to "heap"
  const heapUsed = lines
    .filter(l => l.includes('jvm_memory_used_bytes') && l.includes('area="heap"'))
    .reduce((sum, l) => sum + (parseFloat(l.split(' ')[1]) || 0), 0)

  const heapMax = lines
    .filter(l => l.includes('jvm_memory_max_bytes') && l.includes('area="heap"'))
    .reduce((sum, l) => sum + (parseFloat(l.split(' ')[1]) || 0), 0)

  // Sum all denied requests from rate limiter
  const blocked = lines
    .filter(l => l.includes('resilience4j_ratelimiter_requests_total') && l.includes('kind="denied"'))
    .reduce((sum, l) => sum + (parseFloat(l.split(' ')[1]) || 0), 0)

  return {
    requests: lines.filter(l => l.startsWith('portfolio_gateway_http_requests_total')).map(l => ({
      calls: parseFloat(l.split(' ')[1]) || 0,
      status: l.includes('status="2"') ? 'success' : (l.includes('status="429"') ? 'blocked' : 'error')
    })),
    heapUsed,
    heapMax: heapMax > 0 ? heapMax : 384 * 1024 * 1024, // Fallback to 384MB if max is -1 or 0
    blocked
  }
}

function updateTrafficData(parsed) {
  const now = Date.now()
  const totalRequests = parsed.requests.reduce((sum, p) => sum + p.calls, 0)

  // Use a simpler moving average for the chart
  const lastVal = metrics.value.length > 0 ? metrics.value[metrics.value.length - 1].total : totalRequests
  const diff = Math.max(0, totalRequests - lastVal)
  const rps = diff / 5 // interval is 5s

  if (metrics.value.length > 20) metrics.value.shift()
  metrics.value.push({ timestamp: now, requestsPerSecond: rps, total: totalRequests })
}

function updateCircuitMetrics(parsed) {
  const total = parsed.requests.reduce((sum, p) => sum + p.calls, 0) || 1
  const success = parsed.requests.filter(p => p.status === 'success').reduce((sum, p) => sum + p.calls, 0)
  circuitMetrics.value = {
    totalCalls: Math.round(total),
    successRate: Math.round((success / total) * 100),
    errorRate: Math.round(((total - success) / total) * 100),
  }
}

function updateHeapData(parsed) {
  heapData.used = Math.round(parsed.heapUsed / 1024 / 1024)
  heapData.max = Math.round(parsed.heapMax / 1024 / 1024) || 384
  heapData.percent = Math.min(100, Math.round((heapData.used / heapData.max) * 100))
}

function updateSecurityEvents(parsed) {
  if (parsed.blocked > lastBlockedCount.value) {
    const diff = parsed.blocked - lastBlockedCount.value
    addLog(`[RATE_LIMITER] Blocked ${diff} unauthorized/excessive requests`, 'warn')
    lastBlockedCount.value = parsed.blocked
  }
}

function addLog(message, type = 'info') {
  const time = new Date().toLocaleTimeString([], { hour12: false })
  eventLogs.value.unshift({ time, message, type })
  if (eventLogs.value.length > 15) eventLogs.value.pop()
}

async function simulateStress() {
  if (isStressing.value) return
  isStressing.value = true
  addLog('STRESS_TEST initiated: Firing 30 concurrent requests', 'info')

  const requests = Array.from({ length: 30 }).map(() =>
    api.get('/api/v1/feature-flags/check?name=demo&environment=PROD').catch(() => ({}))
  )

  await Promise.all(requests)
  setTimeout(() => {
    isStressing.value = false
    addLog('STRESS_TEST completed', 'info')
    fetchMetrics()
  }, 2000)
}

onMounted(() => {
  fetchMetrics()
  intervalId = setInterval(fetchMetrics, 5000)
  addLog('Observability System Online', 'info')
})

onBeforeUnmount(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>

<style lang="scss" scoped>
.circuit-card {
  background: rgba(7, 59, 76, 0.03);
  border: 1px solid rgba(7, 59, 76, 0.1);
  border-radius: 4px;
  transition: all 0.3s ease;
}

.state-badge {
  padding: 4px 10px;
  font-weight: bold;
  letter-spacing: 0.5px;
}

.terminal-box {
  background: #0d1117;
  color: #c9d1d9;
  border-radius: 4px;
  height: 100px;
  overflow-y: auto;
  font-size: 11px;
  line-height: 1.4;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);

  @media (min-width: 600px) {
    height: 140px;
  }

  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.2); }

  .log-line {
    padding: 2px 6px;
    border-left: 2px solid transparent;
    &.warn { 
      color: #ef476f; 
      background: rgba(239, 71, 111, 0.08);
      border-left-color: #ef476f;
    }
    &.info { 
      color: #31ccec; 
      border-left-color: #31ccec;
    }
  }
}

:global(.body--dark) {
  .circuit-card {
    background: rgba(242, 239, 233, 0.05);
    border-color: rgba(242, 239, 233, 0.2);
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  }
  .terminal-box {
    background: #05070a;
    border-color: rgba(242, 239, 233, 0.15);
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.6), inset 0 0 10px rgba(0, 0, 0, 0.8);
  }
  .cursor-help {
    color: rgba(242, 239, 233, 0.5);
  }
}

.pulse-badge {
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
}
</style>