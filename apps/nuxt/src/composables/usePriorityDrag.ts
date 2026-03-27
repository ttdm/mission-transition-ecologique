import type { ProjectRow } from '~/types/baserow'

export const usePriorityDrag = (projects: Ref<ProjectRow[]>, onUpdate: (id: number, value: string) => void) => {
  const draggingId = ref<number | null>(null)
  const dropTargetId = ref<number | null>(null)
  const prospectiveScore = ref<number | null>(null)

  const computeScore = (targetId: number): number | null => {
    if (!draggingId.value) return null
    const without = projects.value.filter((p) => p.id !== draggingId.value)
    const idx = without.findIndex((p) => p.id === targetId)
    if (idx === -1) return null
    const avant = idx > 0 ? without[idx - 1].currentPriority : null
    const après = without[idx].currentPriority
    return avant === null
      ? parseFloat((après - 1).toFixed(2))
      : parseFloat(((avant + après) / 2).toFixed(2))
  }

  const reset = () => { draggingId.value = null; dropTargetId.value = null; prospectiveScore.value = null }

  const handleDragStart = (id: number) => { draggingId.value = id; dropTargetId.value = null; prospectiveScore.value = null }
  const handleDragOver = (targetId: number) => {
    if (!draggingId.value || draggingId.value === targetId) return
    dropTargetId.value = targetId
    prospectiveScore.value = computeScore(targetId)
  }
  const handleDragLeave = (targetId: number) => {
    if (dropTargetId.value === targetId) { dropTargetId.value = null; prospectiveScore.value = null }
  }
  const handleDrop = () => {
    if (draggingId.value && prospectiveScore.value !== null) onUpdate(draggingId.value, String(prospectiveScore.value))
    reset()
  }

  return { draggingId, dropTargetId, prospectiveScore, handleDragStart, handleDragOver, handleDragLeave, handleDrop, handleDragEnd: reset }
}