<template>
  <q-page class="page-about q-pa-md q-pa-lg-lg">
    <!-- HEADER TERMINAL -->
    <div class="tech-card q-pa-lg q-mb-xl border-glow-primary">
      <div class="row items-center q-mb-sm border-bottom q-pb-xs">
        <TerminalDots size="md" class="q-mr-md" />
        <div class="text-caption text-mono text-grey-7">about_me.exe — v3.4.1</div>
      </div>
      <div class="text-center q-mt-lg">
        <h1 class="text-secondary text-h3 q-mb-xs" style="margin: 0">{{ $t('about.title') }}</h1>
        <div class="text-accent text-subtitle1 q-mb-lg">{{ $t('about.subtitle') }}</div>
        <p
          class="text-body1 text-grey-8"
          style="max-width: 700px; margin: 0 auto; line-height: 1.7"
        >
          {{ $t('about.bio') }}
        </p>
      </div>
    </div>

    <!-- WHAT I BRING -->
    <div class="row q-col-gutter-lg q-mb-xl">
      <div class="col-12">
        <div class="row items-center q-mb-md">
          <q-icon name="emoji_objects" color="secondary" size="sm" class="q-mr-sm" />
          <h2 class="text-subtitle1 text-h6-sm text-mono" style="margin: 0">{{ $t('about.whatIBring') }}</h2>
        </div>
      </div>
      <div class="col-12 col-md-4">
        <div class="tech-card q-pa-lg skill-card">
          <q-icon name="mdi-memory" size="36px" color="accent" class="q-mb-md" />
          <div class="text-h6 text-secondary q-mb-sm">{{ $t('about.card1Title') }}</div>
          <p class="text-body2 text-grey-7">{{ $t('about.card1Text') }}</p>
        </div>
      </div>
      <div class="col-12 col-md-4">
        <div class="tech-card q-pa-lg skill-card">
          <q-icon name="mdi-rocket-launch" size="36px" color="accent" class="q-mb-md" />
          <div class="text-h6 text-secondary q-mb-sm">{{ $t('about.card2Title') }}</div>
          <p class="text-body2 text-grey-7">{{ $t('about.card2Text') }}</p>
        </div>
      </div>
      <div class="col-12 col-md-4">
        <div class="tech-card q-pa-lg skill-card">
          <q-icon name="mdi-cube-outline" size="36px" color="accent" class="q-mb-md" />
          <div class="text-h6 text-secondary q-mb-sm">{{ $t('about.card3Title') }}</div>
          <p class="text-body2 text-grey-7">{{ $t('about.card3Text') }}</p>
        </div>
      </div>
    </div>

    <!-- TECH STACK -->
    <div class="tech-stack-card q-mb-xl">
      <div class="stack-header row items-center q-pa-md">
        <TerminalDots size="md" class="q-mr-md" />
        <h2 class="text-caption text-mono stack-header-label" style="margin: 0">{{ $t('about.stackTitle') }}</h2>
      </div>
      <div class="stack-body q-px-md q-pb-md">
        <div v-for="(item, i) in stackLines" :key="i" class="stack-line">
          <span class="stack-prompt">&gt;</span>
          <span class="stack-label">{{ item.cat }}</span>
          <span class="stack-value">{{ item.tech }}</span>
        </div>
      </div>
    </div>

    <!-- CONNECT -->
    <div class="text-center q-pb-xl">
      <div class="text-subtitle1 text-mono text-secondary q-mb-md">
        {{ $t('about.connectTitle') }}
      </div>
      <div class="row justify-center q-gutter-md">
        <q-btn
          color="accent"
          :label="$t('about.downloadCvEs')"
          href="/cv/Diógenes Quintero.CV.BACKEND.ES.pdf"
          download
          icon="description"
          class="cv-btn"
          flat
        />
        <q-btn
          color="secondary"
          :label="$t('about.downloadCvEn')"
          href="/cv/Diógenes Quintero.CV.BACKEND.EN.pdf"
          download
          icon="description"
          class="cv-btn"
          flat
        />
        <q-btn
          color="secondary"
          label="LinkedIn"
          icon="mdi-linkedin"
          href="https://linkedin.com/in/dio-quincar"
          target="_blank"
          rel="noopener noreferrer"
          class="cv-btn"
          flat
        />
        <q-btn
          color="secondary"
          label="GitHub"
          icon="mdi-github"
          href="https://github.com/dio-quincarDev"
          target="_blank"
          rel="noopener noreferrer"
          class="cv-btn"
          flat
        />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { computed } from 'vue'
import { useMeta } from 'quasar'
import { useI18n } from 'vue-i18n'
import TerminalDots from 'components/TerminalDots.vue'

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

const stackLines = computed(() => [
  t('about.stack.languages'),
  t('about.stack.framework'),
  t('about.stack.gateway'),
  t('about.stack.database'),
  t('about.stack.cache'),
  t('about.stack.devops'),
  t('about.stack.testing'),
  t('about.stack.build'),
  t('about.stack.security'),
  t('about.stack.documentation'),
])
</script>

<style lang="scss" scoped>
.page-about {
  min-height: 100vh;
}

.border-bottom {
  border-bottom: 1px solid rgba(7, 59, 76, 0.1);
}

.skill-card {
  height: 100%;
  transition: transform 0.3s ease;
  border-top: 3px solid $accent;
  &:hover {
    transform: translateY(-5px);
  }
}

.tech-stack-card {
  border: 2px solid var(--stack-border);
  border-left: 4px solid var(--stack-accent-bar);
  background: transparent;
}

.stack-header {
  border-bottom: 1px solid var(--stack-border);
}

.stack-header-label {
  color: var(--stack-label-text);
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-size: 11px;
}

.stack-body {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.stack-line {
  display: flex;
  align-items: baseline;
  gap: 12px;
  padding: 7px 0;
  border-bottom: 1px solid var(--stack-border);
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;

  &:last-child {
    border-bottom: none;
  }

  @media (min-width: 600px) {
    font-size: 14px;
    gap: 16px;
  }
}

.stack-prompt {
  color: var(--stack-prompt);
  font-weight: 700;
  flex-shrink: 0;
}

.stack-label {
  display: inline-block;
  background: var(--stack-label-bg);
  color: var(--stack-label-text);
  padding: 2px 8px;
  font-size: 11px;
  letter-spacing: 0.5px;
  min-width: 110px;
  text-align: center;
  flex-shrink: 0;

  @media (min-width: 600px) {
    min-width: 140px;
  }
}

.stack-value {
  color: var(--stack-value);
  font-weight: 700;
}

.cv-btn {
  min-width: 160px;
  border: 1px solid currentColor;
}
</style>
