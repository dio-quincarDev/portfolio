<template>
  <q-page class="q-pa-sm q-pa-lg-md">
    <div class="tech-card border-glow-primary q-pa-md q-pa-lg-lg">
      <div class="row items-center q-mb-md border-bottom q-pb-md">
        <TerminalDots size="md" class="q-mr-md gt-xs" />
        <div class="text-h6 text-mono text-secondary">{{ $t('swagger.title') }}</div>
      </div>
      <iframe :src="swaggerUrl" class="swagger-iframe-full"></iframe>
    </div>
  </q-page>
</template>

<script setup>
import { computed } from 'vue'
import { useMeta } from 'quasar'
import { useI18n } from 'vue-i18n'
import TerminalDots from 'components/TerminalDots.vue'

const { t } = useI18n()

const swaggerUrl = computed(() => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'
  return `${baseUrl}/swagger-ui.html`
})

useMeta({
  title: () => t('swagger.metaTitle'),
  meta: {
    description: {
      name: 'description',
      content: 'Interactive Swagger UI documentation for the Feature Flag API. Explore all endpoints live.',
    },
  },
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
</style>
