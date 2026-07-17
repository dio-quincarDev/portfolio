<template>
  <q-page class="projects-page q-pa-md q-pa-lg-lg">
    <div class="projects-page__inner">
      <template v-if="categories.length">
        <section
          v-for="group in categories"
          :key="group.category"
          class="projects-page__section"
          :aria-labelledby="`cat-${group.category}`"
        >
          <SectionHeader
            :id="`cat-${group.category}`"
            :eyebrow="$t(`projects.categories.${group.category}.eyebrow`)"
            :title="$t(`projects.categories.${group.category}.title`)"
          />
          <div class="projects-page__grid">
            <ProjectCard
              v-for="project in group.items"
              :key="project.id"
              :project="project"
              class="projects-page__item reveal"
              @select="openProject"
            />
          </div>
        </section>
      </template>

      <div v-else class="projects-page__empty">
        <p>{{ $t('projects.empty') }}</p>
      </div>

      <q-dialog v-model="dialogOpen" @before-hide="selectedId = null">
        <q-card class="projects-page__dialog">
          <q-card-section class="projects-page__dialog-body">
            <q-btn
              class="projects-page__close"
              flat
              round
              dense
              icon="close"
              aria-label="Close"
              @click="dialogOpen = false"
            />
            <ProjectDetail :project="selectedProject" />
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useMeta } from 'quasar'
import { useProjects } from 'src/composables/useProjects'
import SectionHeader from 'components/SectionHeader.vue'
import ProjectCard from 'components/ProjectCard.vue'
import ProjectDetail from 'components/ProjectDetail.vue'
import { useScrollAnimation } from 'src/composables/useScrollAnimation'

useMeta({
  title: 'Projects — Diogenes Quintero',
  meta: {
    description: {
      name: 'description',
      content: 'Backend Java projects built with Spring Boot, Docker, PostgreSQL, and clean architecture.',
    },
  },
})

const { getProjectById, getProjectsByCategory } = useProjects()

const categories = computed(() => getProjectsByCategory())

const dialogOpen = ref(false)
const selectedId = ref(null)

const selectedProject = computed(() =>
  selectedId.value ? getProjectById(selectedId.value) : null,
)

const openProject = (id) => {
  selectedId.value = id
  dialogOpen.value = true
}

useScrollAnimation()
</script>

<style scoped>
.projects-page__inner {
  max-width: 1100px;
  margin: 0 auto;
}

.projects-page__section {
  margin-top: 64px;
}

.projects-page__section:first-child {
  margin-top: 0;
}

.projects-page__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

@media (min-width: 768px) {
  .projects-page__grid {
    grid-template-columns: 1fr 1fr;
  }
}

.projects-page__empty {
  text-align: center;
  padding: 80px 0;

  p {
    font-family: 'Sora', sans-serif;
    font-size: 16px;
    color: var(--muted);
  }
}

.projects-page__dialog {
  max-width: 800px;
  width: 90vw;
  border-radius: 12px;
  background: var(--surface);
  max-height: 90vh;
}

.projects-page__dialog-body {
  padding: 32px;
  position: relative;
  overflow-y: auto;
  max-height: 80vh;
}

.projects-page__close {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 1;
  color: var(--muted);
}

.projects-page__close:hover {
  color: var(--text);
}
</style>
