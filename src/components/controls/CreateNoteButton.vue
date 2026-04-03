<script setup lang="ts">
import { NOTE_TYPES, type NoteType } from '../../types'
import textIcon from '../../assets/icons/text.svg?raw'
import tableIcon from '../../assets/icons/table.svg?raw'
import imageIcon from '../../assets/icons/image.svg?raw'

const props = defineProps<{ noteType: NoteType }>()
const emit = defineEmits<{ createNote: [noteType: NoteType] }>()

const noteTypeConfig: Record<NoteType, { icon: string; label: string }> = {
  [NOTE_TYPES.TEXT]: { icon: textIcon, label: 'Create text note' },
  [NOTE_TYPES.TABLE]: { icon: tableIcon, label: 'Create table note' },
  [NOTE_TYPES.IMAGE]: { icon: imageIcon, label: 'Create image note' },
}

const config = noteTypeConfig[props.noteType]
</script>

<template>
  <button
    class="create-note-button"
    :aria-label="config.label"
    :title="config.label"
    @click="emit('createNote', props.noteType)"
  >
    <span class="icon" v-html="config.icon" />
  </button>
</template>

<style scoped>
.create-note-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  padding: 0;
  border: none;
  border-radius: var(--radius-full);
  background-color: var(--color-primary);
  color: var(--color-surface);
  box-shadow: var(--shadow-md);
  cursor: pointer;
  transition: color var(--transition-base),
              background-color var(--transition-base),
              border-color var(--transition-base),
              box-shadow var(--transition-base);
}

.create-note-button:hover {
  background-color: var(--color-primary-hover);
  box-shadow: var(--shadow-lg);
}

.create-note-button:active {
  box-shadow: var(--shadow-sm);
  opacity: 0.85;
}

.icon {
  display: flex;
  width: 1.25rem;
  height: 1.25rem;
  transition: transform var(--transition-fast);
}

.create-note-button:hover .icon {
  transform: scale(1.1);
}

.icon :deep(svg) {
  width: 100%;
  height: 100%;
}
</style>
