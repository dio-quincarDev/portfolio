import { ref, onMounted } from 'vue'
import { useInterval } from 'quasar'
import { api } from 'boot/axios'

export function useHealthCheck() {
  const healthStatus = ref('DOWN')
  const currentUptime = ref('--')
  const responseTime = ref(0)
  const startTime = ref(0)

  const { registerInterval } = useInterval()

  const updateUptime = () => {
    if (!startTime.value) return
    const diff = Date.now() - startTime.value
    const days = Math.floor(diff / 86400000)
    const hours = Math.floor((diff % 86400000) / 3600000)
    const mins = Math.floor((diff % 3600000) / 60000)
    if (days > 0) {
      currentUptime.value = `${days}d ${hours}h`
    } else if (hours > 0) {
      currentUptime.value = `${hours}h ${mins}m`
    } else {
      currentUptime.value = `${mins}m`
    }
  }

  const checkHealth = async () => {
    const fetchStart = performance.now()
    try {
      const [healthRes, uptimeRes] = await Promise.all([
        api.get('/actuator/health'),
        api.get('/actuator/metrics/process.uptime').catch(() => null),
      ])
      healthStatus.value = healthRes.data.status
      responseTime.value = Math.round(performance.now() - fetchStart)
      if (uptimeRes?.data?.measurements?.[0]?.value) {
        const uptimeSeconds = uptimeRes.data.measurements[0].value
        startTime.value = Date.now() - uptimeSeconds * 1000
      } else if (!startTime.value) {
        startTime.value = Date.now()
      }
      updateUptime()
    } catch {
      healthStatus.value = 'DOWN'
    }
  }

  onMounted(() => {
    updateUptime()
    checkHealth()
    registerInterval(checkHealth, 30000)
    registerInterval(updateUptime, 60000)
  })

  return {
    healthStatus,
    currentUptime,
    responseTime,
  }
}
