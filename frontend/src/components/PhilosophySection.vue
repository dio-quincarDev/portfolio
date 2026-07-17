<template>
  <div id="philosophy-section" class="col-12 animate-on-scroll">
    <div class="row items-center q-mb-sm q-mb-md-md">
      <q-icon name="psychology" color="secondary" size="sm" class="q-mr-sm" />
      <h2 class="text-subtitle1 text-h6-sm text-mono" style="margin: 0">{{ $t('philosophy.title') }}</h2>
    </div>
    <div class="row q-col-gutter-md q-col-gutter-lg-md">
      <div v-for="(item, index) in philosophyItems" :key="index" class="col-12 col-sm-6">
        <div class="tech-card q-pa-md q-pa-lg-md philosophy-card">
          <div class="row items-center q-mb-sm">
            <q-icon :name="item.icon" size="28px" color="accent" class="q-mr-sm" />
            <div class="text-subtitle1 text-secondary text-weight-bold">{{ $t(`philosophy.items.${item.key}.title`) }}</div>
          </div>
          <p class="text-body2 text-grey-8 q-mb-none" style="line-height: 1.5;">
            {{ $t(`philosophy.items.${item.key}.text`) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const philosophyItems = [
  { key: 'optimize', icon: 'speed' },
  { key: 'failure', icon: 'shield' },
  { key: 'multiarch', icon: 'devices' },
  { key: 'document', icon: 'description' },
]
</script>

<style lang="scss" scoped>
.philosophy-card {
  border-left: 4px solid $accent;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(239, 71, 111, 0.15);
  }
}

:global(.body--dark) {
  .philosophy-card:hover {
    transform: translateY(-3px);
  }
}
</style>
