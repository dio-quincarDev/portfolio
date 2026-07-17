<template>
  <section class="hero" aria-labelledby="hero-name">
    <div class="hero__layout">
      <div class="hero__main">
        <p class="hero__eyebrow reveal-left stagger-1">{{ $t('hero.title') }}</p>
        <h1 id="hero-name" class="hero__name display reveal stagger-2">{{ $t('hero.name') }}</h1>
        <hr class="accent-bar reveal stagger-3" aria-hidden="true" />
        <p class="hero__tagline reveal stagger-4">{{ $t('hero.tagline') }}</p>

        <div class="hero__actions reveal stagger-5">
          <button class="btn btn--primary" type="button" @click="$emit('scrollToProjects')">
            {{ $t('hero.cta.projects') }}
          </button>
          <button class="btn btn--outline" type="button" @click="$emit('scrollToPhilosophy')">
            {{ $t('hero.cta.philosophy') }}
          </button>
          <button class="btn btn--accent-outline" type="button" @click="$emit('scrollToContact')">
            {{ $t('hero.cta.contact') }}
          </button>
        </div>
      </div>

      <div class="hero__stats reveal stagger-6">
        <div class="hero__stat">
          <span class="hero__stat-value display">3+</span>
          <span class="hero__stat-label">{{ $t('hero.stat.systems') }}</span>
        </div>
        <div class="hero__stat-divider" aria-hidden="true"></div>
        <div class="hero__stat">
          <span class="hero__stat-value display">$0</span>
          <span class="hero__stat-label">{{ $t('hero.stat.freeTier') }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineEmits(['scrollToPhilosophy', 'scrollToProjects', 'scrollToContact'])
</script>

<style scoped>
.hero {
  padding: 48px 0 32px;
  position: relative;

  @media (min-width: 1024px) {
    padding: 80px 0 48px;
  }
}

.hero__layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  align-items: center;

  @media (min-width: 1024px) {
    grid-template-columns: 1.6fr 1fr;
    gap: 48px;
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
  margin: 20px 0 32px;
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

.hero__stats {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px 0;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);

  @media (min-width: 1024px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    border-top: none;
    border-bottom: none;
    border-left: 1px solid var(--border);
    padding: 0 0 0 32px;
  }
}

.hero__stat {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;

  @media (min-width: 1024px) {
    padding: 20px 0;

    &:first-child {
      padding-top: 0;
    }
  }
}

.hero__stat-value {
  font-size: 28px;
  line-height: 1.1;
  color: var(--accent);

  @media (min-width: 768px) {
    font-size: 32px;
  }
}

.hero__stat-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: var(--muted);
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.hero__stat-divider {
  width: 1px;
  height: 32px;
  background: var(--border);

  @media (min-width: 1024px) {
    width: auto;
    height: 1px;
  }
}
</style>
