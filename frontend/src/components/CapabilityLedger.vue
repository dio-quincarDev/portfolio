<template>
  <section class="ledger" aria-label="Engineering capability evidence">
    <dl class="ledger__grid">
      <div
        v-for="(item, i) in items"
        :key="item.label"
        class="ledger__cell reveal"
        :class="[`stagger-${i + 1}`]"
      >
        <dt class="ledger__figure display">{{ item.figure }}</dt>
        <dd class="ledger__label">{{ item.label }}</dd>
      </div>
    </dl>
  </section>
</template>

<script setup>
const items = [
  { figure: '1 GB', label: 'RAM' },
  { figure: '99.9%', label: 'uptime' },
  { figure: '$0', label: 'per month' },
  { figure: 'ARM64 + AMD64', label: 'multi-arch' },
]
</script>

<style scoped>
.ledger {
  border-top: 4px solid var(--accent);
  border-bottom: 1px solid var(--subtle);
  padding: 0;
}

.ledger__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  margin: 0;

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
}

.ledger__cell {
  padding: 20px 16px;
  text-align: center;
  border-bottom: 1px solid var(--border);

  &:nth-child(-n+2) {
    border-bottom: 1px solid var(--border);

    @media (min-width: 768px) {
      border-bottom: none;
    }
  }

  @media (min-width: 768px) {
    padding: 16px 24px;
    border-bottom: none;

    &:not(:last-child) {
      border-right: 1px solid var(--border);
    }
  }
}

.ledger__figure {
  font-size: 22px;
  line-height: 1.2;
  color: var(--accent);
  margin: 0 0 4px;

  @media (min-width: 768px) {
    font-size: 24px;
  }
}

.ledger__label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: var(--muted);
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin: 0;
}
</style>
