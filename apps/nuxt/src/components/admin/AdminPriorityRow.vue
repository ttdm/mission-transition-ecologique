<template>
  <tr draggable="true" class="priority-row"
    :class="{ 'priority-row--dragging': isDragging, 'priority-row--target': isDropTarget }"
    @dragstart="$emit('dragstart')" @dragover.prevent="$emit('dragover')" @dragleave="$emit('dragleave')"
    @drop.prevent="$emit('drop')" @dragend="$emit('dragend')">
    <td class="priority-drag-col">
      <div class="priority-drag-handle"><span></span><span></span><span></span></div>
    </td>
    <td style="position: relative">
      <input v-model.number="localValue" type="number" class="fr-input priority-input" step="0.01" min="0"
        @focus="isFocused = true" @blur="isFocused = false; $emit('update', String(localValue))"
        @keydown.enter="($event.target as HTMLInputElement).blur()" />
      <span v-if="isDropTarget && prospectiveScore !== null"
        class="fr-badge fr-badge--info priority-score-preview">→ {{ prospectiveScore }}</span>
    </td>
    <td class="fr-text--bold">{{ project.Titre || project.title || project.slug }}</td>
    <td><span class="fr-badge fr-badge--sm fr-badge--purple-glycine">{{ project.theme }}</span></td>
    <td class="fr-text--sm">{{ fmt(project['Prio']) }}</td>
  </tr>
</template>

<script setup lang="ts">
import type { ProjectRow } from '~/types/baserow'
const props = defineProps<{ project: ProjectRow; isDragging: boolean; isDropTarget: boolean; prospectiveScore: number | null }>()
defineEmits<{ (e: 'update', v: string): void; (e: 'dragstart'): void; (e: 'dragover'): void; (e: 'dragleave'): void; (e: 'drop'): void; (e: 'dragend'): void }>()
const localValue = ref(props.project.currentPriority)
const isFocused = ref(false)
watch(() => props.project.currentPriority, (val) => { if (!isFocused.value) localValue.value = val })
const fmt = (s: unknown) => { const v = parseFloat(s as string); return isNaN(v) ? 'N/A' : v.toFixed(2) }
</script>

<style scoped>
.priority-row:hover {
  background-color: var(--grey-950-100);
}

.priority-row--dragging {
  opacity: 0.3;
  background-color: var(--grey-925-125);
}

.priority-row--target {
  border-top: 3px solid var(--blue-france-sun-113-625);
  background-color: var(--blue-france-950-100);
}

td.priority-drag-col {
  width: 2rem;
  padding: 0;
  vertical-align: middle;
}

.priority-drag-handle {
  display: flex;
  flex-direction: column;
  gap: 3px;
  cursor: grab;
  padding: 1.2rem 0.5rem;
  align-items: center;
}

.priority-drag-handle:active {
  cursor: grabbing;
}

.priority-drag-handle span {
  display: block;
  width: 14px;
  height: 2px;
  background-color: var(--blue-france-sun-113-625);
  border-radius: 1px;
}

.priority-input {
  text-align: center;
  border-radius: 0;
  border: none;
  border-bottom: 2px solid var(--blue-france-sun-113-625);
  font-weight: 600;
  width: 7rem;
}

.priority-input:focus {
  outline: none;
  border-bottom-color: var(--blue-france-113-625);
}

.priority-score-preview {
  position: absolute;
  top: 50%;
  left: 8.5rem;
  transform: translateY(-50%);
  pointer-events: none;
  white-space: nowrap;
}
</style>