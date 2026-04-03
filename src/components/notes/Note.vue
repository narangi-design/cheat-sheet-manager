<script setup lang="ts">
import Tag from '../Tag.vue'
import NoteActionButton from '../controls/NoteActionButton.vue'
import penIcon from '../../assets/icons/pen.svg?raw'
import trashIcon from '../../assets/icons/trash.svg?raw'
import TextNote from './TextNote.vue'
import TableNote from './TableNote.vue'
import ImageNote from './ImageNote.vue'
import type { NoteData } from '../../types'

const props = defineProps<NoteData>()

const emit = defineEmits<{
  edit: [id: string]
  delete: [id: string]
}>()
</script>

<template>
  <div class="note">
    <div class="note-header">
      <h3 v-if="props.title">{{ props.title }}</h3>
      <div class="note-actions">
        <NoteActionButton label="Edit" :icon="penIcon" @click="emit('edit', props.id)" />
        <NoteActionButton label="Delete" :icon="trashIcon" @click="emit('delete', props.id)" />
      </div>
    </div>
    <TextNote v-if="props.type === 'text'" :note="props" />
    <TableNote v-else-if="props.type === 'table'" :note="props" />
    <ImageNote v-else-if="props.type === 'image'" :note="props" />
    <div v-if="props.tags.length" class="note-tags">
      <Tag v-for="tag in props.tags" :key="tag" :label="tag" />
    </div>
  </div>
</template>

<style scoped>
@keyframes note-appear {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}

.note {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  padding: var(--space-md);
  width: 100%;
  margin-bottom: var(--space-sm);
  break-inside: avoid;
  font-size: var(--note-font-size, 1rem);
  background-color: var(--color-surface);
  color: var(--color-text);
  box-shadow: var(--shadow-sm);
  border-left: 3px solid var(--color-sage-200);
  animation: note-appear var(--transition-base) ease;
}

.note-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: var(--space-xs);
  border-bottom: var(--border-default);
}

.note-actions {
  display: flex;
  gap: var(--space-xs);
  flex-shrink: 0;
  margin-left: auto;
  opacity: 0;
  transition: opacity var(--transition-fast);
}

.note:hover .note-actions {
  opacity: 1;
}

.note-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
  padding-top: var(--space-sm);
}
</style>