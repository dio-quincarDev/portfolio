<template>
  <section id="contacto-section" class="contact reveal">
    <div class="contact__inner card">
      <SectionHeader :eyebrow="$t('contact.eyebrow')" :title="$t('contact.title')" />
      <div class="contact__body">
        <p class="contact__subtitle">{{ $t('contact.subtitle') }}</p>
        <a class="btn btn--primary contact__cta" href="mailto:dio-quincar@outlook.com">
          {{ $t('contact.cta') }}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-left: 4px;">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import SectionHeader from 'components/SectionHeader.vue'
</script>

<style scoped>
.contact {
  position: relative;
}

.contact__inner {
  padding: 40px 32px;
  text-align: center;
  border-left: 4px solid var(--accent);
}

.contact__body {
  padding: 8px 0 0;
}

.contact__subtitle {
  font-family: 'Sora', sans-serif;
  font-size: 15px;
  line-height: 1.6;
  color: var(--muted);
  max-width: 480px;
  margin: 0 auto 28px;
}

.contact__cta {
  display: inline-flex;
  align-items: center;
  padding: 14px 32px;
  font-size: 13px;
  letter-spacing: 0.5px;
}
</style>
