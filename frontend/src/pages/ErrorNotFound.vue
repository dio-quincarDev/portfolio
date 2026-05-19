<template>
  <q-page class="flex flex-center">
    <div class="tech-card q-pa-xl text-center border-glow-accent">
      <div class="text-h1 text-mono text-secondary q-mb-lg">404</div>
      <div class="text-h5 text-mono text-grey-7 q-mb-xl">{{ $t('errors.notFound') }}</div>
      <q-btn
        color="accent"
        :label="$t('errors.goHome')"
        icon="home"
        to="/"
        class="border-glow-accent"
        flat
      />
    </div>
  </q-page>
</template>

<script setup>
</script>