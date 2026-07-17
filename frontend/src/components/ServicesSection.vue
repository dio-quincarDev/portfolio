<template>
  <section class="services">
    <SectionHeader :eyebrow="$t('services.eyebrow')" :title="$t('services.title')" />

    <div class="services__list">
      <article
        v-for="(item, i) in items"
        :key="item.key"
        class="services__item reveal"
        :class="`stagger-${i + 1}`"
      >
        <h3 class="services__title">{{ $t(`services.items[${i}].title`) }}</h3>
        <p class="services__text">{{ $t(`services.items[${i}].text`) }}</p>
      </article>
    </div>
  </section>
</template>

<script setup>
import SectionHeader from 'components/SectionHeader.vue'
import { useScrollAnimation } from 'src/composables/useScrollAnimation'

const items = [
  { key: 'api' },
  { key: 'architecture' },
  { key: 'production' },
]

useScrollAnimation()
</script>

<style scoped>
.services__list {
  display: flex;
  flex-direction: column;
  gap: 48px;
}

.services__title {
  font-family: 'DM Serif Display', serif;
  font-size: 20px;
  font-weight: 400;
  color: var(--text);
  margin: 0 0 8px;
}

.services__text {
  font-family: 'Sora', sans-serif;
  font-size: 14px;
  line-height: 1.6;
  color: var(--muted);
  max-width: 600px;
  margin: 0;
}
</style>
