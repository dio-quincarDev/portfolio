<template>
  <section id="philosophy-section" class="approach">
    <SectionHeader :eyebrow="$t('approach.eyebrow')" :title="$t('approach.title')" />

    <div class="approach__list">
      <article
        v-for="(item, index) in items"
        :key="item.key"
        class="approach-card card reveal"
        :class="[`stagger-${index + 1}`, { 'approach-card--reverse': index % 2 === 1 }]"
      >
        <div class="approach-card__icon">
          <q-icon :name="item.icon" size="24px" color="accent" />
        </div>
        <div class="approach-card__body">
          <h3 class="approach-card__title">{{ $t(`approach.items.${item.key}.title`) }}</h3>
          <p class="approach-card__text">{{ $t(`approach.items.${item.key}.text`) }}</p>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
import SectionHeader from 'components/SectionHeader.vue'

const items = [
  { key: 'optimize', icon: 'speed' },
  { key: 'failure', icon: 'shield' },
  { key: 'multiarch', icon: 'devices' },
  { key: 'document', icon: 'description' },
]
</script>

<style scoped>
.approach__list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.approach-card {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  align-items: start;
  padding: 24px;
  border-left: 4px solid transparent;
  transition: transform var(--dur-base) var(--ease),
    box-shadow var(--dur-base) var(--ease),
    border-color var(--dur-base) var(--ease);

  &:hover {
    border-left-color: var(--accent);
  }
}

@media (min-width: 768px) {
  .approach-card {
    grid-template-columns: 40px 1fr;
    gap: 20px;
  }

  .approach-card--reverse {
    grid-template-columns: 1fr 40px;

    .approach-card__icon {
      order: 2;
      justify-content: flex-end;
    }
  }
}

.approach-card__title {
  font-family: 'DM Serif Display', serif;
  font-size: 17px;
  font-weight: 400;
  color: var(--text);
  margin: 0 0 8px;
}

.approach-card__text {
  font-family: 'Sora', sans-serif;
  font-size: 14px;
  line-height: 1.6;
  color: var(--muted);
  margin: 0;
}
</style>
