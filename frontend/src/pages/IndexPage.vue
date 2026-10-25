<template>
  <q-page class="index-page q-pa-md q-pa-lg-lg">
    <div class="index-page__inner">
      <HeroSection @scroll-to-contact="scrollTo('contacto-section')" />

      <HomeProjects class="index-page__section" />

      <BadgeStack class="index-page__section" />

      <ContactSection class="index-page__section" />
    </div>
  </q-page>
</template>

<script setup>
import { useMeta } from 'quasar'
import { useI18n } from 'vue-i18n'
import HeroSection from 'components/HeroSection.vue'
import HomeProjects from 'components/HomeProjects.vue'
import BadgeStack from 'components/BadgeStack.vue'
import ContactSection from 'components/ContactSection.vue'
import { useScrollAnimation } from 'src/composables/useScrollAnimation'

const { t } = useI18n()

useMeta(() => ({
  title: t('home.metaTitle'),
  meta: {
    description: {
      name: 'description',
      content: t('home.metaDescription'),
    },
  },
}))

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
