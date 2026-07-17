<template>
  <section id="projects-section" class="projects reveal">
    <SectionHeader :eyebrow="$t('projects.eyebrow')" :title="$t('projects.title')" />

    <div class="projects__grid">
      <ProjectCard
        v-for="(project, i) in projects"
        :key="project.id"
        :project="project"
        class="projects__item reveal"
        :class="[
          `stagger-${i + 1}`,
          { 'projects__item--wide': i === 0 },
        ]"
      />
    </div>
  </section>
</template>

<script setup>
import SectionHeader from 'components/SectionHeader.vue'
import ProjectCard from 'components/ProjectCard.vue'

defineProps({
  projects: { type: Array, required: true },
})
</script>

<style scoped>
.projects__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

@media (min-width: 1024px) {
  .projects__grid {
    grid-template-columns: repeat(6, 1fr);
  }

  .projects__item--wide {
    grid-column: span 6;
  }

  .projects__item:not(.projects__item--wide) {
    grid-column: span 3;
  }
}
</style>
