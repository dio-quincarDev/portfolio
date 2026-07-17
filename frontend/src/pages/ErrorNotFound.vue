<template>
  <q-page class="flex flex-center">
    <div class="error-card text-center">
      <div class="error-card__code display">404</div>
      <div class="error-card__msg">{{ $t('errors.notFound') }}</div>
      <q-btn class="btn btn--primary" :label="$t('errors.goHome')" icon="home" to="/" />
    </div>
  </q-page>
</template>

<script setup>
import { useMeta } from 'quasar'

useMeta({
  title: '404 — Page Not Found',
})
</script>

<style scoped>
.error-card {
  padding: 48px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-default);
  border-left: 4px solid var(--accent);
}

.error-card__code {
  font-size: 56px;
  line-height: 1;
  color: var(--accent);
  margin-bottom: 16px;
}

.error-card__msg {
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  color: var(--muted);
  margin-bottom: 28px;
}
</style>
