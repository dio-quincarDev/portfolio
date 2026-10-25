<template>
  <section class="home-projects" aria-labelledby="home-projects-title">
    <SectionHeader
      id="home-projects-title"
      :eyebrow="$t('projects.home.eyebrow')"
      :title="$t('projects.home.title')"
    />

    <article v-if="featured" class="featured reveal">
      <div class="featured__intro">
        <p class="featured__label">{{ $t('projects.home.featured') }}</p>
        <h3 class="featured__name">{{ featuredName }}</h3>
        <p class="featured__desc">{{ featuredDescription }}</p>
      </div>

      <div class="featured__body">
        <div class="featured__details">
          <ul class="featured__list">
            <li v-for="(item, index) in featuredDecisions" :key="index">{{ item }}</li>
          </ul>

          <div class="featured__tech">
            <span v-for="tech in featured.tech.slice(0, 6)" :key="tech.name" class="tech-chip">
              {{ tech.name }}
            </span>
          </div>

          <div class="featured__actions">
            <a
              class="btn btn--outline"
              :href="featured.repoUrl"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ $t('projects.viewSource') }}
            </a>
            <button class="btn btn--primary" type="button" @click="openProject(featured.id)">
              {{ $t('projects.home.viewCase') }}
            </button>
          </div>
        </div>

        <figure v-if="featured.diagramUrl" class="featured__figure">
          <a
            :href="featured.diagramUrl"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="`${featuredName} — ${$t('projects.diagram')}`"
          >
            <img
              :src="featured.diagramUrl"
              :alt="`${featuredName} — ${$t('projects.diagram')}`"
              class="featured__diagram"
              loading="lazy"
            />
          </a>
        </figure>
      </div>
    </article>

    <div class="home-projects__grid">
      <ProjectCard
        v-for="project in selected"
        :key="project.id"
        :project="project"
        class="home-projects__item reveal"
        @select="openProject"
      />
    </div>

    <div class="home-projects__footer">
      <RouterLink class="home-projects__all" to="/projects">
        {{ $t('projects.home.viewAll') }}
      </RouterLink>
    </div>

    <q-dialog v-model="dialogOpen" @before-hide="selectedId = null">
      <q-card class="home-projects__dialog">
        <q-card-section class="home-projects__dialog-body">
          <q-btn
            class="home-projects__close"
            flat
            round
            dense
            icon="close"
            :aria-label="$t('contact.close')"
            @click="dialogOpen = false"
          />
          <ProjectDetail :project="selectedProject" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useProjects } from 'src/composables/useProjects'
import SectionHeader from 'components/SectionHeader.vue'
import ProjectCard from 'components/ProjectCard.vue'
import ProjectDetail from 'components/ProjectDetail.vue'

const { t, tm, rt } = useI18n()
const { projects, getProjectById } = useProjects()

const featured = computed(() => projects.value.find((project) => project.featured))
const selected = computed(() =>
  projects.value
    .filter((project) => project.category === 'personal-project' && !project.featured)
    .slice(0, 3),
)

const featuredName = computed(() =>
  featured.value ? t(`${featured.value.i18nKey}.name`) : '',
)
const featuredDescription = computed(() =>
  featured.value ? t(`${featured.value.i18nKey}.description`) : '',
)
const featuredDecisions = computed(() => {
  const items = featured.value ? tm(`${featured.value.i18nKey}.decisions`) : []
  return Array.isArray(items) ? items.map((item) => rt(item)) : []
})

const dialogOpen = ref(false)
const selectedId = ref(null)

const selectedProject = computed(() =>
  selectedId.value ? getProjectById(selectedId.value) : null,
)

const openProject = (id) => {
  selectedId.value = id
  dialogOpen.value = true
}
</script>

<style scoped>
.featured {
  margin-top: 24px;
  padding: 28px;
  border: 1px solid var(--border);
  border-top: 3px solid var(--accent);
  border-radius: var(--radius-lg);
  background: var(--surface);
}

.featured__label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1.2px;
  color: var(--accent);
  margin: 0 0 8px;
}

.featured__name {
  font-family: 'DM Serif Display', serif;
  font-size: 26px;
  font-weight: 400;
  color: var(--text);
  margin: 0 0 10px;
  text-wrap: balance;
}

.featured__desc {
  font-family: 'Sora', sans-serif;
  font-size: 15px;
  line-height: 1.7;
  color: var(--muted);
  margin: 0;
  max-width: 720px;
}

.featured__body {
  display: grid;
  grid-template-columns: 1fr;
  gap: 28px;
  margin-top: 24px;
}

.featured__list {
  margin: 0 0 20px;
  padding-left: 18px;

  li {
    font-family: 'Sora', sans-serif;
    font-size: 14px;
    line-height: 1.6;
    color: var(--text);
    margin-bottom: 6px;
  }
}

.featured__tech {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tech-chip {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: var(--muted);
  padding: 4px 10px;
  border: 1px solid var(--border);
  border-radius: 9999px;
}

.featured__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 24px;
}

.featured__figure {
  margin: 0;
  display: flex;
  align-items: center;
}

.featured__diagram {
  display: block;
  width: 100%;
  height: auto;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background: #fff;
}

.home-projects__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  margin-top: 16px;
}

.home-projects__footer {
  margin-top: 24px;
}

.home-projects__all {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  letter-spacing: 0.5px;
  color: var(--accent);
  text-decoration: none;
  border-bottom: 1px solid currentColor;
}

.home-projects__all:hover {
  color: var(--text);
}

.home-projects__dialog {
  max-width: 800px;
  width: 90vw;
  border-radius: 12px;
  background: var(--surface);
  max-height: 90vh;
}

.home-projects__dialog-body {
  padding: 32px;
  position: relative;
  overflow-y: auto;
  max-height: 80vh;
}

.home-projects__close {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 1;
  color: var(--muted);
}

.home-projects__close:hover {
  color: var(--text);
}

@media (min-width: 768px) {
  .home-projects__grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (min-width: 960px) {
  .featured {
    padding: 36px;
  }

  .featured__body {
    grid-template-columns: 1.1fr 1fr;
    align-items: center;
    gap: 40px;
  }

  .home-projects__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
