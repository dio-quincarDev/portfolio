<template>
  <div
    class="project-card"
    :class="{ 'project-card--coming': project.comingSoon }"
    role="button"
    tabindex="0"
    :aria-label="cardLabel"
    @click="$emit('select', project.id)"
    @keydown.enter="$emit('select', project.id)"
    @keydown.space.prevent="$emit('select', project.id)"
  >
    <div class="project-card__head">
      <h3 class="project-card__name">{{ cardTitle }}</h3>
      <div v-if="!project.comingSoon" class="project-card__links" @click.stop>
        <a
          v-if="project.repoUrl"
          class="project-card__icon-link"
          :href="project.repoUrl"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="$t('projects.viewSource')"
        >
          <q-icon :name="mdiGithub" size="18px" />
        </a>
        <a
          v-if="project.youtubeUrl"
          class="project-card__icon-link"
          :href="project.youtubeUrl"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="$t('projects.viewVideo')"
        >
          <q-icon :name="mdiYoutube" size="18px" />
        </a>
      </div>
    </div>

    <p class="project-card__desc">{{ cardDescription }}</p>

    <template v-if="!project.comingSoon">
      <div class="project-card__tech">
        <span
          v-for="tech in project.tech.slice(0, 4)"
          :key="tech.name"
          class="tech-chip"
          :aria-label="tech.name"
        >
          <span class="tech-chip__dot" aria-hidden="true"></span>
          {{ tech.name }}
        </span>
        <span v-if="project.tech.length > 4" class="tech-chip tech-chip--more">
          +{{ project.tech.length - 4 }}
        </span>
      </div>
    </template>

    <div v-if="project.comingSoon" class="project-card__badge">Coming Soon</div>
    <div v-else-if="project.status === 'in-progress'" class="project-card__badge project-card__badge--wip">In Progress</div>

    <div class="project-card__arrow" aria-hidden="true">
      <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
        <path d="M14 1L19 6L14 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M19 6H1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { mdiGithub, mdiYoutube } from '@quasar/extras/mdi-v7'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  project: { type: Object, required: true },
})

defineEmits(['select'])

const { t } = useI18n()

const cardTitle = computed(() => {
  if (props.project.comingSoon) return t('projects.comingSoon.name')
  return props.project.i18nKey ? t(`${props.project.i18nKey}.name`) : props.project.name || ''
})

const cardDescription = computed(() => {
  if (props.project.comingSoon) return t('projects.comingSoon.description')
  return props.project.i18nKey ? t(`${props.project.i18nKey}.description`) : props.project.description || ''
})

const cardLabel = computed(() => {
  if (props.project.comingSoon) return `Coming Soon — ${cardDescription.value}`
  return cardTitle.value
})
</script>

<style scoped>
.project-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px;
  position: relative;
  overflow: hidden;
  text-decoration: none;
  cursor: pointer;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: var(--surface);
  transition: transform var(--dur-base) var(--ease),
    box-shadow var(--dur-base) var(--ease),
    border-color var(--dur-base) var(--ease);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(7, 59, 76, 0.09);

    .project-card__arrow {
      opacity: 1;
      transform: translateX(0);
    }
  }

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
}

.project-card--coming {
  border-style: dashed;
  border-color: var(--subtle);
  cursor: pointer;

  &:hover {
    border-color: var(--muted);
    transform: none;
    box-shadow: none;
  }

  .project-card__name {
    color: var(--muted);
  }

  .project-card__desc {
    color: var(--subtle);
  }

  .project-card__arrow {
    opacity: 0.4;
  }
}

.project-card__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.project-card__name {
  font-family: 'DM Serif Display', serif;
  font-size: 20px;
  font-weight: 400;
  color: var(--text);
  margin: 0;
}

.project-card__links {
  display: flex;
  gap: 6px;
  flex-shrink: 0;
}

.project-card__icon-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  color: var(--muted);
  border-radius: var(--radius-sm);
  transition: color var(--dur-fast) var(--ease),
    background var(--dur-fast) var(--ease);

  &:hover {
    color: var(--accent);
    background: rgba(239, 71, 111, 0.06);
  }
}

.project-card__desc {
  font-family: 'Sora', sans-serif;
  font-size: 14px;
  line-height: 1.6;
  color: var(--muted);
  margin: 0;
}

.project-card__tech {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: auto;
}

.tech-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: var(--muted);
  padding: 4px 10px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 9999px;
}

.tech-chip--more {
  color: var(--accent);
  border-color: var(--accent);
}

.tech-chip__dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--accent);
  flex-shrink: 0;
}

.project-card__badge {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: var(--subtle);
  border: 1px solid var(--subtle);
  border-radius: 9999px;
  padding: 3px 10px;
  width: fit-content;
}

.project-card__badge--wip {
  color: var(--accent);
  border-color: var(--accent);
}

.project-card__arrow {
  position: absolute;
  right: 24px;
  bottom: 24px;
  opacity: 0;
  transform: translateX(-8px);
  color: var(--accent);
  transition: opacity var(--dur-fast) var(--ease),
    transform var(--dur-fast) var(--ease);
  pointer-events: none;
}
</style>
