<script setup lang="ts">
import { ref } from 'vue'
import EditTextNoteForm from './EditTextNoteForm.vue'
import EditTableNoteForm from './EditTableNoteForm.vue'
import EditImageNoteForm from './EditImageNoteForm.vue'
import { NOTE_TYPES, type NoteType } from '../../types'

defineProps<{
  noteType: NoteType
}>()

const emit = defineEmits<{
  close: []
}>()

const editedTitle = ref('')

function handleSave() {
  emit('close')
}
</script>

<template>
  <input :value="editedTitle" @input="(event) => (editedTitle = (event.target as HTMLInputElement).value)" />
  <EditTextNoteForm
    v-if="noteType === NOTE_TYPES.TEXT"
    content=""
  />
  <EditTableNoteForm
    v-if="noteType === NOTE_TYPES.TABLE"
    :cols="2"
    :rows="[[]]"
  />
  <EditImageNoteForm
    v-if="noteType === NOTE_TYPES.IMAGE"
    imageUrl=""
  />
  <button @click="handleSave">Save</button>
</template>