<template>
  <article v-if="project" class="project-detail">
    <template v-if="project.comingSoon">
      <div class="project-detail__coming">
        <h2 class="project-detail__coming-title">{{ projectName }}</h2>
        <p class="project-detail__coming-text">{{ projectDescription }}</p>
      </div>
    </template>

    <template v-else>
      <div v-if="project.status === 'in-progress'" class="project-detail__wip">
        <span class="project-detail__wip-dot" aria-hidden="true"></span>
        {{ $t('projects.inProgress') }}
      </div>
      <div class="project-detail__head">
        <h2 class="project-detail__name">{{ projectName }}</h2>
        <div class="project-detail__links">
          <a
            v-if="project.repoUrl"
            class="project-detail__icon-link"
            :href="project.repoUrl"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="$t('projects.viewSource')"
          >
            <q-icon :name="mdiGithub" size="20px" />
          </a>
          <a
            v-if="project.youtubeUrl"
            class="project-detail__icon-link"
            :href="project.youtubeUrl"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="$t('projects.viewVideo')"
          >
            <q-icon :name="mdiYoutube" size="20px" />
          </a>
        </div>
      </div>

      <p class="project-detail__desc">{{ projectDescription }}</p>

      <div v-if="projectProblem" class="project-detail__case">
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

      <div class="project-detail__tech">
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

      <div v-if="hasMedia" class="project-detail__media">
        <div v-if="project.diagramUrl" class="media-block">
          <div class="media-block__label">{{ $t('projects.diagram') }}</div>
          <img
            :src="project.diagramUrl"
            :alt="`${projectName} — ${$t('projects.diagram')}`"
            class="media-block__img"
            loading="lazy"
          />
        </div>
        <div v-if="project.demoUrl" class="media-block">
          <a
            :href="project.demoUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn--outline media-block__btn"
          >
            {{ $t('projects.tryDemo') }}
          </a>
        </div>
        <div v-if="project.youtubeUrl" class="media-block">
          <div class="media-block__label">{{ $t('projects.video') }}</div>
          <div class="media-block__embed">
            <iframe
              :src="youtubeEmbedUrl"
              :title="`${projectName} — ${$t('projects.video')}`"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </template>
  </article>

  <div v-else class="project-detail__empty">
    <p>{{ $t('errors.notFound') }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { mdiGithub, mdiYoutube } from '@quasar/extras/mdi-v7'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  project: { type: Object, default: null },
})

const { t } = useI18n()

const projectName = computed(() =>
  props.project?.i18nKey ? t(`${props.project.i18nKey}.name`) : '',
)
const projectDescription = computed(() =>
  props.project?.i18nKey ? t(`${props.project.i18nKey}.description`) : '',
)
const projectProblem = computed(() =>
  props.project?.i18nKey ? t(`${props.project.i18nKey}.problem`) : '',
)
const projectSolution = computed(() =>
  props.project?.i18nKey ? t(`${props.project.i18nKey}.solution`) : '',
)
const projectDecisions = computed(() => {
  if (!props.project?.i18nKey) return []
  const decisions = t(`${props.project.i18nKey}.decisions`)
  return Array.isArray(decisions) ? decisions : []
})

const youtubeEmbedUrl = computed(() => {
  if (!props.project?.youtubeUrl) return ''
  const match = props.project.youtubeUrl.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/,
  )
  return match ? `https://www.youtube.com/embed/${match[1]}` : ''
})

const hasMedia = computed(() =>
  props.project?.diagramUrl || props.project?.demoUrl || props.project?.youtubeUrl,
)
</script>

<style scoped>
.project-detail__coming {
  text-align: center;
  padding: 48px 24px;
}

.project-detail__coming-title {
  font-family: 'DM Serif Display', serif;
  font-size: 24px;
  font-weight: 400;
  color: var(--muted);
  margin: 0 0 12px;
}

.project-detail__coming-text {
  font-family: 'Sora', sans-serif;
  font-size: 15px;
  line-height: 1.7;
  color: var(--subtle);
  margin: 0;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

.project-detail__wip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: var(--accent);
  border: 1px solid var(--accent);
  border-radius: 9999px;
  padding: 4px 12px;
  margin-bottom: 16px;
  width: fit-content;
}

.project-detail__wip-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
  animation: pulse-dot 2s ease-in-out infinite;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

.project-detail__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
}

.project-detail__name {
  font-family: 'DM Serif Display', serif;
  font-size: 24px;
  font-weight: 400;
  color: var(--text);
  margin: 0;
  text-wrap: balance;
}

.project-detail__links {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
}

.project-detail__icon-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  color: var(--muted);
  border-radius: var(--radius-sm);
  transition: color var(--dur-fast) var(--ease),
    background var(--dur-fast) var(--ease);
}

.project-detail__icon-link:hover {
  color: var(--accent);
  background: rgba(239, 71, 111, 0.06);
}

.project-detail__desc {
  font-family: 'Sora', sans-serif;
  font-size: 15px;
  line-height: 1.7;
  color: var(--text);
  margin: 0 0 24px;
  max-width: 650px;
}

.project-detail__case {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 24px;
  border-top: 1px solid var(--border);
  margin-bottom: 24px;
}

.case-block__label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 6px;
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
  font-size: 14px;
  line-height: 1.6;
  color: var(--text);
  margin: 0;
  max-width: 650px;
}

.case-block__list {
  margin: 4px 0 0;
  padding-left: 16px;

  li {
    font-family: 'Sora', sans-serif;
    font-size: 14px;
    line-height: 1.5;
    color: var(--text);
    margin-bottom: 4px;
  }
}

.project-detail__tech {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
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
}

.tech-chip__dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--accent);
  flex-shrink: 0;
}

.project-detail__media {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-top: 24px;
  border-top: 1px solid var(--border);
}

.media-block__label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 8px;
}

.media-block__img {
  max-width: 100%;
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
}

.media-block__embed {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%;
  border-radius: var(--radius-md);
  overflow: hidden;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: var(--radius-md);
  }
}

.media-block__btn {
  display: inline-flex;
}

.project-detail__empty {
  text-align: center;
  padding: 40px 0;

  p {
    font-family: 'Sora', sans-serif;
    font-size: 16px;
    color: var(--muted);
  }
}
</style>
