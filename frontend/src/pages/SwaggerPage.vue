<template>
  <q-page :class="$q.screen.lt.md ? 'q-pa-sm' : 'q-pa-lg'">
    <div class="tech-card border-glow-primary" :class="$q.screen.lt.md ? 'q-pa-md' : 'q-pa-lg'">
      <div class="row items-center q-mb-md border-bottom q-pb-md">
        <div class="terminal-dots q-mr-md gt-xs">
          <span class="dot primary-dot"></span>
          <span class="dot primary-dot"></span>
          <span class="dot accent-dot"></span>
        </div>
        <div class="text-h6 text-mono text-secondary">{{ $t('swagger.title') }}</div>
      </div>
      <iframe :src="swaggerUrl" class="swagger-iframe-full"></iframe>
    </div>
  </q-page>
</template>

<script setup>
import { computed } from 'vue'

const swaggerUrl = computed(() => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'
  return `${baseUrl}/webjars/swagger-ui/index.html`
})
</script>

<style lang="scss" scoped>
.border-bottom {
  border-bottom: 1px solid rgba(7, 59, 76, 0.1);
}

.swagger-iframe-full {
  width: 100%;
  height: calc(100vh - 220px);
  border: none;

  @media (max-width: 599px) {
    height: calc(100vh - 180px);
  }
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
}
</style>
