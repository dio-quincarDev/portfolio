<template>
  <article class="project-card card" :aria-label="projectName">
    <div class="project-card__head">
      <h3 class="project-card__name">{{ projectName }}</h3>
      <div class="project-card__links">
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

    <p class="project-card__desc">{{ projectDescription }}</p>

    <div v-if="projectProblem" class="project-card__case">
      <div class="case-block">
        <div class="case-block__label case-block__label--problem">
          {{ $t('projects.theProblem') }}
        </div>
        <p class="case-block__text">{{ projectProblem }}</p>
      </div>
      <div class="case-block">
        <div class="case-block__label case-block__label--solution">
          {{ $t('projects.theSolution') }}
        </div>
        <p class="case-block__text">{{ projectSolution }}</p>
      </div>
      <div v-if="projectDecisions.length" class="case-block">
        <div class="case-block__label case-block__label--decisions">
          {{ $t('projects.keyDecisions') }}
        </div>
        <ul class="case-block__list">
          <li v-for="(decision, i) in projectDecisions" :key="i">{{ decision }}</li>
        </ul>
      </div>
    </div>

    <div class="project-card__tech">
      <span
        v-for="tech in project.tech"
        :key="tech.name"
        class="tech-chip"
        :aria-label="tech.name"
      >
        <span class="tech-chip__dot" aria-hidden="true"></span>
        {{ tech.name }}
      </span>
    </div>

    <div class="project-card__arrow" aria-hidden="true">
      <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
        <path d="M14 1L19 6L14 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M19 6H1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'
import { mdiGithub, mdiYoutube } from '@quasar/extras/mdi-v7'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  project: { type: Object, required: true },
})

const { t } = useI18n()

const projectName = computed(() =>
  props.project.i18nKey ? t(`${props.project.i18nKey}.name`) : props.project.name || '',
)
const projectDescription = computed(() =>
  props.project.i18nKey ? t(`${props.project.i18nKey}.description`) : props.project.description || '',
)
const projectProblem = computed(() =>
  props.project.i18nKey ? t(`${props.project.i18nKey}.problem`) : '',
)
const projectSolution = computed(() =>
  props.project.i18nKey ? t(`${props.project.i18nKey}.solution`) : '',
)
const projectDecisions = computed(() => {
  if (!props.project.i18nKey) return []
  const decisions = t(`${props.project.i18nKey}.decisions`)
  return Array.isArray(decisions) ? decisions : []
})
</script>

<style scoped>
.project-card {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 28px;
  position: relative;
  overflow: hidden;
  transition: transform var(--dur-base) var(--ease),
    box-shadow var(--dur-base) var(--ease),
    border-color var(--dur-base) var(--ease);

  &:hover {
    .project-card__arrow {
      opacity: 1;
      transform: translateX(0);
    }
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

.project-card__case {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding-top: 6px;
  border-top: 1px solid var(--border);
}

.case-block__label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 4px;
}

.case-block__label--problem {
  color: var(--accent);
}

.case-block__label--solution,
.case-block__label--decisions {
  color: var(--muted);
}

.case-block__text {
  font-family: 'Sora', sans-serif;
  font-size: 13px;
  line-height: 1.5;
  color: var(--muted);
  margin: 0;
}

.case-block__list {
  margin: 4px 0 0;
  padding-left: 16px;

  li {
    font-family: 'Sora', sans-serif;
    font-size: 13px;
    line-height: 1.4;
    color: var(--muted);
    margin-bottom: 3px;
  }
}

.project-card__tech {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tech-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: var(--muted);
  padding: 5px 12px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 9999px;
  transition: border-color var(--dur-fast) var(--ease),
    color var(--dur-fast) var(--ease);

  &:hover {
    border-color: var(--accent);
    color: var(--accent);
  }
}

.tech-chip__dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--accent);
  flex-shrink: 0;
}

.project-card__arrow {
  position: absolute;
  right: 24px;
  bottom: 28px;
  opacity: 0;
  transform: translateX(-8px);
  color: var(--accent);
  transition: opacity var(--dur-fast) var(--ease),
    transform var(--dur-fast) var(--ease);
  pointer-events: none;
}
</style>
