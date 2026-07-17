<template>
  <q-page class="page-about q-pa-md q-pa-lg-lg">
    <div class="page-about__inner">
      <section class="about-header reveal">
        <SectionHeader :eyebrow="$t('about.eyebrow')" :title="$t('about.title')" :rule="false" />
        <div class="about-header__body">
          <div class="about-header__subtitle">{{ $t('about.subtitle') }}</div>
          <p class="about-header__bio">{{ $t('about.bio') }}</p>
        </div>
      </section>

      <section class="reveal">
        <SectionHeader :eyebrow="$t('about.skillsEyebrow')" :title="$t('about.whatIBring')" />
        <div class="skills">
          <article
            v-for="(key, i) in skillKeys"
            :key="key"
            class="skill-card card reveal"
            :class="`stagger-${i + 1}`"
          >
            <h3 class="skill-card__title">{{ $t(`about.skills.${key}.title`) }}</h3>
            <p class="skill-card__text">{{ $t(`about.skills.${key}.text`) }}</p>
          </article>
        </div>
      </section>

      <TechStackSection />

      <section class="reveal">
        <SectionHeader :eyebrow="$t('about.connectEyebrow')" :title="$t('about.connectTitle')" />
        <div class="connect">
          <a class="btn btn--outline connect__btn" href="/cv/Diógenes Quintero.CV.BACKEND.ES.pdf" download>
            {{ $t('about.downloadCvEs') }}
          </a>
          <a class="btn btn--outline connect__btn" href="/cv/Diógenes Quintero.CV.BACKEND.EN.pdf" download>
            {{ $t('about.downloadCvEn') }}
          </a>
          <a
            class="btn btn--accent-outline connect__btn"
            href="https://linkedin.com/in/dio-quincar"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            class="btn btn--accent-outline connect__btn"
            href="https://github.com/dio-quincarDev"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </section>
    </div>
  </q-page>
</template>

<script setup>
import { useMeta } from 'quasar'
import { useI18n } from 'vue-i18n'
import SectionHeader from 'components/SectionHeader.vue'
import TechStackSection from 'components/TechStackSection.vue'
import { useScrollAnimation } from 'src/composables/useScrollAnimation'

const { t } = useI18n()

useMeta({
  title: () => t('about.metaTitle'),
  meta: {
    description: {
      name: 'description',
      content: t('about.bio'),
    },
  },
})

const skillKeys = ['resilient', 'economical', 'maintainable', 'learner']

useScrollAnimation()
</script>

<style scoped>
.page-about__inner {
  max-width: 1100px;
  margin: 0 auto;
}

section {
  margin-top: 64px;
}

.about-header__body {
  padding: 16px 0;
}

.about-header__subtitle {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 16px;
}

.about-header__bio {
  font-family: 'Sora', sans-serif;
  font-size: 16px;
  line-height: 1.7;
  color: var(--text);
  max-width: 700px;
}

.skills {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

@media (min-width: 768px) {
  .skills {
    grid-template-columns: 1fr 1fr;
  }
}

.skill-card {
  padding: 24px;
  border-left: 4px solid transparent;
  transition: transform var(--dur-base) var(--ease),
    box-shadow var(--dur-base) var(--ease),
    border-color var(--dur-base) var(--ease);

  &:hover {
    border-left-color: var(--accent);
  }
}

.skill-card__title {
  font-family: 'DM Serif Display', serif;
  font-size: 17px;
  font-weight: 400;
  color: var(--text);
  margin: 0 0 8px;
}

.skill-card__text {
  font-family: 'Sora', sans-serif;
  font-size: 14px;
  line-height: 1.6;
  color: var(--muted);
  margin: 0;
}

.connect {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
}

.connect__btn {
  min-width: 160px;
  text-align: center;
}
</style>
