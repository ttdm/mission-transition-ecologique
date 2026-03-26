<template>
  <tr
    draggable="true"
    class="project-row"
    :class="{ 'is-dragging': isDragging, 'is-drop-target': isDropTarget }"
    @dragstart="$emit('dragstart')"
    @dragover.prevent="$emit('dragover')"
    @dragleave="$emit('dragleave')"
    @drop.prevent="$emit('drop')"
    @dragend="$emit('dragend')"
  >
    <td class="col-drag">
      <div class="drag-bar">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </td>

    <td class="td-prio">
      <input
        v-model.number="localValue"
        type="number"
        class="fr-input fr-input--sm"
        step="0.01"
        min="0"
        @focus="isFocused = true"
        @blur="isFocused = false; $emit('update', String(localValue))"
        @keydown.enter="($event.target as HTMLInputElement).blur()"
      />
      <span v-if="isDropTarget && prospectiveScore !== null" class="score-preview">
        → {{ prospectiveScore }}
      </span>
    </td>

    <td class="fr-text--bold">
      {{ project.Titre || project.title || project.slug }}
    </td>

    <td>
      <span class="fr-badge fr-badge--sm fr-badge--purple-glycine">
        {{ project.theme }}
      </span>
    </td>

    <td class="fr-text--sm">
      {{ fmt(project['Prio']) }}
    </td>
  </tr>
</template>

<script setup lang="ts">
import type { ProjectRow } from '~/types/baserow'

const props = defineProps<{
  project: ProjectRow
  isDragging: boolean
  isDropTarget: boolean
  prospectiveScore: number | null
}>()

defineEmits<{
  (e: 'update', v: string): void
  (e: 'dragstart'): void
  (e: 'dragover'): void
  (e: 'dragleave'): void
  (e: 'drop'): void
  (e: 'dragend'): void
}>()

const localValue = ref(props.project.currentPriority)
const isFocused = ref(false)

watch(() => props.project.currentPriority, (val) => {
  if (!isFocused.value) localValue.value = val
})

const fmt = (s: unknown) => {
  const v = parseFloat(s as string)
  return isNaN(v) ? 'N/A' : v.toFixed(2)
}
</script>

<style scoped>
.project-row {
  background-color: white;
}

.project-row:hover {
  background-color: #f6f6f6;
}

.is-dragging {
  opacity: 0.3;
  background-color: #eeeeee !important;
}

.is-drop-target {
  border-top: 3px solid #000091 !important;
  background-color: #eeeeff !important;
}

.td-prio {
  position: relative;
}

.score-preview {
  position: absolute;
  top: 50%;
  left: 8.5rem;
  transform: translateY(-50%);
  background: #000091;
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.15rem 0.5rem;
  border-radius: 0.25rem;
  pointer-events: none;
  white-space: nowrap;
}

.col-drag {
  width: 2rem;
  padding: 0 !important;
  vertical-align: middle;
}

.drag-bar {
  display: flex;
  flex-direction: column;
  gap: 3px;
  cursor: grab;
  padding: 1.2rem 0.5rem;
  align-items: center;
}

.drag-bar:active {
  cursor: grabbing;
}

.drag-bar span {
  display: block;
  width: 14px;
  height: 2px;
  background-color: #000091;
  border-radius: 1px;
}

.fr-input--sm {
  text-align: center;
  border-radius: 0;
  border: none;
  border-bottom: 2px solid #000091;
  font-weight: 600;
  width: 7rem;
}

.fr-input--sm:focus {
  outline: none;
  border-bottom-color: #0063cb;
}
</style>