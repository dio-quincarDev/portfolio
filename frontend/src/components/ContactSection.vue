<template>
  <section id="contacto-section" class="contact reveal">
    <SectionHeader :eyebrow="$t('contact.eyebrow')" :title="$t('contact.title')" />

    <div class="contact__row">
      <a :href="`mailto:${email}`" class="btn btn--primary">
        {{ $t('contact.emailLabel') }}
      </a>
      <button class="btn btn--outline" type="button" @click="copyEmail">
        {{ copied ? $t('contact.copied') : $t('contact.copy') }}
      </button>
    </div>

    <nav :aria-label="$t('nav.socialLinks')" class="contact__social">
      <q-btn
        flat round
        icon="mdi-github"
        href="https://github.com/dio-quincarDev"
        target="_blank" rel="noopener noreferrer"
        color="secondary"
        aria-label="GitHub"
      />
      <q-btn
        flat round
        href="https://x.com/DioQuincar"
        target="_blank" rel="noopener noreferrer"
        color="secondary"
        aria-label="X (Twitter)"
      >
        <q-icon size="18px">
          <svg viewBox="0 0 24 24" aria-hidden="true" style="fill: currentColor; width: 18px; height: 18px">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
          </svg>
        </q-icon>
      </q-btn>
      <q-btn
        flat round
        icon="mdi-linkedin"
        href="https://linkedin.com/in/dio-quincar"
        target="_blank" rel="noopener noreferrer"
        color="secondary"
        aria-label="LinkedIn"
      />
    </nav>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import SectionHeader from 'components/SectionHeader.vue'

// Email público en el CV; directo y sin intermediarios.
const email = 'dio-quincar@outlook.com'

const copied = ref(false)
let resetTimer

const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText(email)
    copied.value = true
    clearTimeout(resetTimer)
    resetTimer = setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch {
    // Clipboard bloqueado: el botón de email sigue siendo el camino.
  }
}
</script>

<style scoped>
.contact__row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
}

.contact__social {
  display: flex;
  justify-content: center;
  gap: 4px;
  margin-top: 20px;
}
</style>
