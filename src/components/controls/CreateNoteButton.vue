<script setup lang="ts">
import { NOTE_TYPES, type NoteType } from '../../types'

interface CreateNoteButtonProps {
  noteType: NoteType
}

type NoteTypeContent = {
  icon: string
  label: string
}

const createNoteButtonContent: Record<NoteType, NoteTypeContent> = {
  [NOTE_TYPES.TEXT]: {
    icon: '',
    label: 'Create text note'
  },
  [NOTE_TYPES.TABLE]: {
    icon: '',
    label: 'Create table note'
  },
  [NOTE_TYPES.IMAGE]: {
    icon: '',
    label: 'Create image note'
  }
}

const props = defineProps<CreateNoteButtonProps>()
const emit = defineEmits<{ createNote: [noteType: NoteType] }>()

const buttonContent = createNoteButtonContent[props.noteType]
</script>

<template>
  <button
    class="create-note-button"
    @click="emit('createNote', props.noteType)"
  >
    <span>{{ buttonContent.icon }}</span>
    <label>{{ buttonContent.label }}</label>
  </button>
</template>