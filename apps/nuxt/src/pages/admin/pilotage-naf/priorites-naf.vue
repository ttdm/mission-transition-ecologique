<script setup lang="ts">
import { ref, computed } from 'vue'
import { sortProjectsByPriority, ProjectStatus } from '@tee/data'
import type { DataProject } from '@tee/data'
import FiltreNaf from './filtre-naf.vue'
import ListeProjets from './liste-projets.vue'

const selectedNaf = ref('')
const projects = ref<DataProject[]>([
  {
    id: 1,
    Nom: 'Projet A',
    priorite: 10,
    code_naf: ['85.59A'],
    status: ProjectStatus.InProd,
    themes: [],
    mainTheme: '',
    linkedProjects: [],
    programs: []
  } as unknown as DataProject,
  {
    id: 2,
    Nom: 'Projet B',
    priorite: 5,
    code_naf: ['70.22Z'],
    status: ProjectStatus.InProd,
    themes: [],
    mainTheme: '',
    linkedProjects: [],
    programs: []
  } as unknown as DataProject
])

const projetsFiltres = computed(() => {
  let filtered = [...projects.value]
  if (selectedNaf.value) {
    filtered = filtered.filter((p) => p.code_naf?.includes(selectedNaf.value))
  }
  return sortProjectsByPriority(filtered)
})
</script>

<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-6 text-gray-800">Administration : Priorités NAF</h1>
    <FiltreNaf @change="(val: string) => (selectedNaf = val)" />
    <div class="mt-8">
      <ListeProjets :projets="projetsFiltres" />
    </div>
  </div>
</template>
