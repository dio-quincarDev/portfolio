<template>
  <q-page class="page-about q-pa-lg">
    <!-- HEADER TERMINAL -->
    <div class="tech-card q-pa-lg q-mb-xl border-glow-primary">
      <div class="row items-center q-mb-sm border-bottom q-pb-xs">
        <div class="terminal-dots q-mr-md">
          <span class="dot primary-dot"></span>
          <span class="dot primary-dot"></span>
          <span class="dot accent-dot"></span>
        </div>
        <div class="text-caption text-mono text-grey-7">about_me.exe — v3.4.1</div>
      </div>
      <div class="text-center q-mt-lg">
        <div class="text-secondary text-h3 q-mb-xs">{{ $t('about.title') }}</div>
        <div class="text-accent text-subtitle1 q-mb-lg">{{ $t('about.subtitle') }}</div>
        <p class="text-body1 text-grey-8" style="max-width: 800px; margin: 0 auto;">
          {{ $t('about.bio') }}
        </p>
      </div>
    </div>

    <!-- SKILL CARDS -->
    <div class="row q-col-gutter-lg q-mb-xl">
      <div class="col-12 col-md-6">
        <div class="tech-card q-pa-lg skill-card">
          <div class="row items-center q-mb-md">
            <q-icon name="mdi-memory" size="40px" color="accent" class="q-mr-md" />
            <div class="text-h6 text-secondary">{{ $t('about.card1Title') }}</div>
          </div>
          <p class="text-body2 text-grey-7">{{ $t('about.card1Text') }}</p>
        </div>
      </div>

      <div class="col-12 col-md-6">
        <div class="tech-card q-pa-lg skill-card">
          <div class="row items-center q-mb-md">
            <q-icon name="mdi-rocket-launch" size="40px" color="accent" class="q-mr-md" />
            <div class="text-h6 text-secondary">{{ $t('about.card2Title') }}</div>
          </div>
          <p class="text-body2 text-grey-7">{{ $t('about.card2Text') }}</p>
        </div>
      </div>

      <div class="col-12 col-md-6">
        <div class="tech-card q-pa-lg skill-card">
          <div class="row items-center q-mb-md">
            <q-icon name="mdi-cube-outline" size="40px" color="accent" class="q-mr-md" />
            <div class="text-h6 text-secondary">{{ $t('about.card3Title') }}</div>
          </div>
          <p class="text-body2 text-grey-7">{{ $t('about.card3Text') }}</p>
        </div>
      </div>

      <div class="col-12 col-md-6">
        <div class="tech-card q-pa-lg skill-card">
          <div class="row items-center q-mb-md">
            <q-icon name="mdi-shield-check" size="40px" color="accent" class="q-mr-md" />
            <div class="text-h6 text-secondary">{{ $t('about.card4Title') }}</div>
          </div>
          <p class="text-body2 text-grey-7">{{ $t('about.card4Text') }}</p>
        </div>
      </div>
    </div>

    <!-- ENGINEERING BANNER -->
    <div class="tech-card q-pa-xl q-mb-xl text-center border-glow-accent">
      <q-icon name="mdi-cog" size="50px" color="accent" class="q-mb-md" />
      <div class="text-h5 text-secondary">{{ $t('about.engineering') }}</div>
      <div class="text-h6 text-accent">{{ $t('about.engineeringSub') }}</div>
    </div>

    <!-- DOWNLOAD CV -->
    <div class="text-center q-pb-xl">
      <div class="text-subtitle1 text-mono text-secondary q-mb-md">{{ $t('about.downloadCv') }}</div>
      <div class="row justify-center q-gutter-md">
        <q-btn
          color="accent"
          :label="$t('about.downloadCvEs')"
          href="/cv/Diógenes Quintero.CV.BACKEND.ES.pdf"
          download
          class="border-glow-accent cv-btn"
          flat
        />
        <q-btn
          color="secondary"
          :label="$t('about.downloadCvEn')"
          href="/cv/Diógenes Quintero.CV.BACKEND.EN.pdf"
          download
          class="border-glow-primary cv-btn"
          flat
        />
      </div>
    </div>
  </q-page>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.page-about {
  min-height: 100vh;
}

.border-bottom {
  border-bottom: 1px solid rgba(7, 59, 76, 0.1);
}

.terminal-dots {
  display: flex;
  gap: 6px;
  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    &.primary-dot {
      background: $primary;
    }
    &.accent-dot {
      background: $accent;
    }
  }
}

.skill-card {
  height: 100%;
  transition: transform 0.3s ease;
  &:hover {
    transform: translateY(-5px);
  }
}

.cv-btn {
  min-width: 200px;
  border: 1px solid currentColor;
}

:global(.body--dark) {
  .border-bottom {
    border-bottom-color: rgba(242, 239, 233, 0.1);
  }

  .text-grey-7, .text-grey-8 {
    color: var(--text-secondary) !important;
  }

  .text-secondary {
    color: var(--text-primary) !important;
  }
}
</style>