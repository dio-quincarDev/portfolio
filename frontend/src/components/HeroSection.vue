<template>
  <section class="hero" aria-labelledby="hero-name">
    <p class="hero__eyebrow">{{ $t('hero.title') }}</p>
    <h1 id="hero-name" class="hero__name display">{{ $t('hero.name') }}</h1>
    <p class="hero__tagline">{{ $t('hero.tagline') }}</p>
    <p class="hero__capabilities">{{ $t('hero.capabilities') }}</p>

    <div class="hero__actions">
      <button class="btn btn--primary" type="button" @click="goProjects">
        {{ $t('hero.cta.projects') }}
      </button>
      <button class="btn btn--outline" type="button" @click="$emit('scrollToContact')">
        {{ $t('hero.cta.contact') }}
      </button>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

defineEmits(['scrollToContact'])

const goProjects = () => router.push('/projects')
</script>

<style scoped>
.hero {
  padding: 48px 0 32px;
  position: relative;

  @media (min-width: 1024px) {
    padding: 80px 0 48px;
  }
}

.hero__eyebrow {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--muted);
  margin: 0 0 12px;
}

.hero__name {
  font-size: 36px;
  line-height: 1.1;
  margin: 0 0 8px;
  color: var(--text);

  @media (min-width: 768px) {
    font-size: 48px;
  }

  @media (min-width: 1024px) {
    font-size: 56px;
  }
}

.hero__tagline {
  font-family: 'Sora', sans-serif;
  font-size: 16px;
  line-height: 1.7;
  color: var(--muted);
  max-width: 540px;
  margin: 20px 0 8px;
}

.hero__capabilities {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  color: var(--accent);
  margin: 0 0 32px;
  letter-spacing: 0.5px;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

@media (max-width: 599px) {
  .hero__actions .btn {
    flex: 1 1 100%;
  }
}
</style>
