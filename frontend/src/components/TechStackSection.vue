<template>
  <section class="tech-stack reveal">
    <SectionHeader :eyebrow="$t('about.stackEyebrow')" :title="$t('about.stackTitle')" />
    <ul class="tech-stack__list">
      <li v-for="(line, i) in lines" :key="i" class="tech-stack__row reveal" :class="`stagger-${Math.min(i + 1, 8)}`">
        <span class="tech-stack__dot" aria-hidden="true"></span>
        <span class="tech-stack__text">{{ line }}</span>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import SectionHeader from 'components/SectionHeader.vue'

const { t } = useI18n()

const lines = computed(() => [
  t('about.stack.languages'),
  t('about.stack.framework'),
  t('about.stack.gateway'),
  t('about.stack.database'),
  t('about.stack.cache'),
  t('about.stack.devops'),
  t('about.stack.testing'),
  t('about.stack.build'),
  t('about.stack.security'),
  t('about.stack.documentation'),
])
</script>

<style scoped>
.tech-stack__list {
  list-style: none;
  margin: 0;
  padding: 0;
  border-top: 1px solid var(--border);
}

.tech-stack__row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 4px;
  border-bottom: 1px solid var(--border);
}

.tech-stack__dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--accent);
  flex-shrink: 0;
}

.tech-stack__text {
  font-family: 'Sora', sans-serif;
  font-size: 14px;
  color: var(--text);
}
</style>
