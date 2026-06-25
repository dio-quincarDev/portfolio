<template>
  <div class="terminal-container tech-card q-pa-sm q-pa-md-md border-glow-primary full-height">
    <div class="row items-center q-mb-sm border-bottom q-pb-xs">
      <TerminalDots size="md" class="q-mr-md" />
      <div class="text-caption text-mono text-grey-7">{{ $t('hero.console') }}</div>
    </div>

    <div class="terminal-content text-mono q-mt-sm q-mt-md-md">
      <h1 class="text-secondary text-h4 text-h3-sm text-h2-md q-mb-xs text-weight-bold" style="margin: 0; line-height: 1.2;">
        {{ $t('hero.name') }}
      </h1>
      <div
        class="text-subtitle1 text-h6-sm text-accent q-mb-md q-mb-lg-md text-weight-medium text-uppercase"
        style="letter-spacing: 2px"
      >
        {{ $t('hero.seniority') }}
      </div>

      <p class="tagline text-grey-8 text-body1 text-body2-md text-h6-md q-mb-lg q-mb-xl-md" style="max-width: 580px; line-height: 1.6; min-height: 3em;">
        {{ displayedTagline }}<span v-if="!taglineComplete" class="typing-cursor">|</span>
      </p>

      <div class="row q-col-gutter-md q-mb-lg">
        <div class="col-6">
          <div class="stat-value text-secondary text-h5 text-h4-md">{{ currentUptime }}</div>
          <div class="stat-label text-grey-7 text-caption">{{ $t('health.uptime') }}</div>
        </div>
        <div class="col-6">
          <div class="stat-value text-secondary text-h5 text-h4-md">{{ responseTime }}ms</div>
          <div class="stat-label text-grey-7 text-caption">{{ $t('health.responseTime') }}</div>
        </div>
      </div>
    </div>

    <div class="row q-gutter-sm full-width">
      <q-btn
        flat
        color="secondary"
        :label="$t('hero.howIWork')"
        icon="psychology"
        @click="$emit('scrollToPhilosophy')"
        class="cyber-button btn-responsive"
      />
      <q-btn
        flat
        color="secondary"
        :label="$t('hero.coreProjects')"
        icon="account_tree"
        @click="$emit('scrollToProjects')"
        class="cyber-button btn-responsive"
      />
      <q-btn
        flat
        color="accent"
        :label="$t('hero.contactProtocol')"
        icon="terminal"
        @click="$emit('scrollToContact')"
        class="cyber-button accent-border btn-responsive"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import TerminalDots from 'components/TerminalDots.vue'

defineProps({
  currentUptime: { type: String, default: '--' },
  responseTime: { type: Number, default: 0 },
})

defineEmits(['scrollToPhilosophy', 'scrollToProjects', 'scrollToContact'])

const { t } = useI18n()

const taglineText = t('hero.tagline')
const displayedTagline = ref('')
const taglineComplete = ref(false)

async function typeTagline() {
  for (let i = 0; i <= taglineText.length; i++) {
    displayedTagline.value = taglineText.slice(0, i)
    await new Promise((r) => setTimeout(r, 18))
  }
  taglineComplete.value = true
}

onMounted(() => {
  typeTagline()
})
</script>

<style lang="scss" scoped>
.terminal-container {
  min-height: 320px;
  @media (min-width: 600px) {
    min-height: 380px;
  }
}
.border-bottom {
  border-bottom: 1px solid rgba(7, 59, 76, 0.1);
}
.terminal-content {
  line-height: 1.7;
  font-size: 0.95rem;
  @media (min-width: 600px) {
    line-height: 1.8;
    font-size: 1.1rem;
  }
}
.tagline {
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  letter-spacing: 0.3px;
}
.typing-cursor {
  display: inline-block;
  color: $accent;
  font-weight: 700;
  animation: blink 0.8s step-end infinite;
}
@keyframes blink {
  50% { opacity: 0; }
}
.stat-value {
  font-family: 'JetBrains Mono', monospace;
  font-weight: 700;
  line-height: 1.2;
}
.stat-label {
  font-family: 'JetBrains Mono', monospace;
  letter-spacing: 0.5px;
  margin-top: 2px;
}

.btn-responsive {
  @media (max-width: 599px) {
    width: 100%;
  }
}

:global(.body--dark) {
  .border-bottom {
    border-bottom-color: rgba(242, 239, 233, 0.1);
  }
}
</style>
