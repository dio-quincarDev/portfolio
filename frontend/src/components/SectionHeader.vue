<template>
  <div class="section-header reveal-left">
    <p v-if="eyebrow" class="section-header__eyebrow" aria-hidden="true">{{ eyebrow }}</p>
    <h2 v-if="title" class="section-header__title">{{ title }}</h2>
    <hr v-if="rule" class="section-header__rule reveal" aria-hidden="true" />
  </div>
</template>

<script setup>
defineProps({
  eyebrow: { type: String, default: '' },
  title: { type: String, default: '' },
  rule: { type: Boolean, default: true },
})
</script>
