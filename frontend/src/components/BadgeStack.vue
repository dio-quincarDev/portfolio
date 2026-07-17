<template>
  <section class="badge-stack reveal">
    <SectionHeader :eyebrow="$t('stackSection.eyebrow')" :title="$t('stackSection.title')" />

    <div
      v-for="group in groups"
      :key="group.label"
      class="badge-stack__group"
    >
      <div class="badge-stack__header" :style="{ '--group-color': group.color }">
        <span class="badge-stack__label">{{ t('stackSection.' + group.i18nKey) }}</span>
      </div>
      <div class="badge-stack__grid">
        <span
          v-for="badge in group.items"
          :key="badge.name"
          class="badge-stack__chip"
          :aria-label="badge.name"
          :style="{ '--chip-color': group.color }"
        >
          {{ badge.name }}
        </span>
      </div>
    </div>
  </section>
</template>

<script setup>
import SectionHeader from 'components/SectionHeader.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const groups = [
  {
    i18nKey: 'languages',
    color: '#ED8B00',
    items: [{ name: 'Java' }],
  },
  {
    i18nKey: 'frameworks',
    color: '#6DB33F',
    items: [
      { name: 'Spring Boot' },
      { name: 'Spring Cloud Gateway' },
    ],
  },
  {
    i18nKey: 'databases',
    color: '#336791',
    items: [
      { name: 'PostgreSQL' },
      { name: 'MySQL' },
      { name: 'Redis' },
    ],
  },
  {
    i18nKey: 'devops',
    color: '#2496ED',
    items: [
      { name: 'Docker' },
      { name: 'CI/CD' },
      { name: 'GitHub Actions' },
    ],
  },
  {
    i18nKey: 'testing',
    color: '#25A162',
    items: [
      { name: 'JUnit 5' },
      { name: 'Maven' },
    ],
  },
  {
    i18nKey: 'security',
    color: '#D4A84B',
    items: [
      { name: 'Resilience4j' },
      { name: 'Spring Security' },
      { name: 'OAuth2' },
      { name: 'JWT' },
      { name: 'Swagger/OpenAPI' },
    ],
  },
]
</script>

<style scoped>
.badge-stack__group {
  margin-bottom: 20px;
}

.badge-stack__group:last-child {
  margin-bottom: 0;
}

.badge-stack__header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.badge-stack__header::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--group-color);
  opacity: 0.4;
}

.badge-stack__label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--group-color);
  white-space: nowrap;
}

.badge-stack__grid {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.badge-stack__chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border: 1px solid var(--chip-color);
  color: var(--text);
  font-family: 'Sora', sans-serif;
  font-size: 12px;
  border-radius: 9999px;
  transition: background var(--dur-base) var(--ease),
    color var(--dur-base) var(--ease);
}

.badge-stack__chip:hover {
  background: color-mix(in srgb, var(--chip-color) 10%, transparent);
  border-color: var(--chip-color);
}

.badge-stack__chip:focus-visible {
  outline: 2px solid var(--chip-color);
  outline-offset: 2px;
}
</style>
