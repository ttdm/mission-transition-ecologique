<template>
  <div class="fr-table fr-table--bordered fr-table--no-caption">
    <table>
      <thead>
        <tr>
          <th scope="col" class="col-drag"></th>
          <th scope="col" style="width: 7rem">Priorité</th>
          <th scope="col">Nom du projet</th>
          <th scope="col">Thématique</th>
          <th scope="col" style="width: 8rem">Prio globale</th>
        </tr>
      </thead>
      <TransitionGroup v-if="!loading" tag="tbody" name="row">
        <AdminPriorityRow v-for="project in projects" :key="project.id" :project="project"
          :is-dragging="draggingId === project.id" :is-drop-target="dropTargetId === project.id"
          :prospective-score="dropTargetId === project.id ? prospectiveScore : null"
          @update="emit('update-priority', project.id, $event)" @dragstart="handleDragStart(project.id)"
          @dragover="handleDragOver(project.id)" @dragleave="handleDragLeave(project.id)" @drop="handleDrop"
          @dragend="handleDragEnd" />
      </TransitionGroup>
      <tbody v-else>
        <tr>
          <td colspan="5" class="fr-text--center fr-py-4w">Chargement des projets...</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { ProjectRow } from '../../types/baserow'

const props = defineProps<{ projects: ProjectRow[]; loading: boolean }>()
const emit = defineEmits<{ (e: 'update-priority', id: number, value: string): void }>()

const { draggingId, dropTargetId, prospectiveScore, handleDragStart, handleDragOver, handleDragLeave, handleDrop, handleDragEnd } =
  usePriorityDrag(computed(() => props.projects), (id, val) => emit('update-priority', id, val))
</script>

<style scoped>
.col-drag {
  width: 2rem;
}

.row-move {
  transition: transform 0.3s ease;
}

.row-enter-active,
.row-leave-active {
  transition: opacity 0.2s ease;
}

.row-enter-from,
.row-leave-to {
  opacity: 0;
}
</style>