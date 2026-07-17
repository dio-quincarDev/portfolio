<template>
  <div class="terminal-dots" :class="size">
    <span class="dot primary-dot"></span>
    <span class="dot primary-dot"></span>
    <span class="dot accent-dot"></span>
  </div>
</template>

<script setup>
defineProps({
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg'].includes(v),
  },
})
</script>

<style lang="scss" scoped>
.terminal-dots {
  display: flex;
  gap: 6px;
  .dot {
    border-radius: 50%;
    &.primary-dot {
      background: $secondary;
    }
    &.accent-dot {
      background: $accent;
    }
  }
  &.sm .dot {
    width: 8px;
    height: 8px;
  }
  &.md .dot {
    width: 10px;
    height: 10px;
  }
  &.lg .dot {
    width: 12px;
    height: 12px;
  }
}
</style>
