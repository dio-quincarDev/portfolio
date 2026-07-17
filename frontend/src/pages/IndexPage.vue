<template>
  <q-page class="index-page q-pa-md q-pa-lg-lg">
    <div class="index-page__inner">
      <HeroSection
        @scroll-to-contact="scrollTo('contacto-section')"
      />

      <ServicesSection class="index-page__section" />

      <BadgeStack class="index-page__section" />

      <ContactSection class="index-page__section" />
    </div>
  </q-page>
</template>

<script setup>
import { useMeta } from 'quasar'
import HeroSection from 'components/HeroSection.vue'
import ServicesSection from 'components/ServicesSection.vue'
import BadgeStack from 'components/BadgeStack.vue'
import ContactSection from 'components/ContactSection.vue'
import { useScrollAnimation } from 'src/composables/useScrollAnimation'

useMeta({
  title: 'Diogenes Quintero — Backend Java Developer',
  meta: {
    description: {
      name: 'description',
      content:
        'Backend Java Developer. Building reliable systems with Java 21, Spring Boot, and Docker.',
    },
  },
})

const scrollTo = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

useScrollAnimation()
</script>

<style scoped>
.index-page__inner {
  max-width: 1100px;
  margin: 0 auto;
}

.index-page__section {
  margin-top: 80px;
}
</style>
