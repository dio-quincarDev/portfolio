<template>
  <div id="projects-section" class="col-12 animate-on-scroll">
    <div class="row items-center q-mb-sm q-mb-md-md">
      <q-icon name="layers" color="secondary" size="sm" class="q-mr-sm" />
      <h2 class="text-subtitle1 text-h6-sm text-mono" style="margin: 0">{{ $t('projects.title') }}</h2>
    </div>
    <div class="row q-col-gutter-md q-col-gutter-lg-md">
      <div v-for="project in projects" :key="project.id" class="col-12">
        <ProjectCard :project="project" />
      </div>
    </div>
  </div>
</template>

<script setup>
import ProjectCard from 'components/ProjectCard.vue'

defineProps({
  projects: { type: Array, required: true },
})
</script>
