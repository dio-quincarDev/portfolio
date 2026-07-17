<template>
  <section id="approach-section" class="approach">
    <SectionHeader :eyebrow="$t('approach.eyebrow')" :title="$t('approach.title')" />

    <div class="approach__list">
      <article
        v-for="(item, i) in items"
        :key="item.key"
        class="approach__item reveal"
        :class="`stagger-${i + 1}`"
      >
        <h3 class="approach__title">{{ $t(`approach.items.${item.key}.title`) }}</h3>
        <p class="approach__text">{{ $t(`approach.items.${item.key}.text`) }}</p>
      </article>
    </div>
  </section>
</template>

<script setup>
import SectionHeader from 'components/SectionHeader.vue'
import { useScrollAnimation } from 'src/composables/useScrollAnimation'

const items = [
  { key: 'optimize' },
  { key: 'stability' },
  { key: 'compatibility' },
  { key: 'documentation' },
]

useScrollAnimation()
</script>

<style scoped>
.approach__list {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.approach__title {
  font-family: 'DM Serif Display', serif;
  font-size: 17px;
  font-weight: 400;
  color: var(--text);
  margin: 0 0 8px;
}

.approach__text {
  font-family: 'Sora', sans-serif;
  font-size: 14px;
  line-height: 1.6;
  color: var(--muted);
  margin: 0;
  max-width: 600px;
}
</style>
