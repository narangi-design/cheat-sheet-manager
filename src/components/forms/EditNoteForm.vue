<script setup lang="ts">
import { ref } from 'vue'
import EditTextNoteForm from './EditTextNoteForm.vue'
import EditTableNoteForm from './EditTableNoteForm.vue'
import EditImageNoteForm from './EditImageNoteForm.vue'
import { NOTE_TYPES, type NoteType } from '../../types'
import { useNotesStore } from '../../stores/notes'
import createNote from '../../createNote'

const props = defineProps<{
  noteType: NoteType
}>()

const emit = defineEmits<{
  close: []
}>()

const store = useNotesStore()
const editedTitle = ref('')
const textFormRef = ref<InstanceType<typeof EditTextNoteForm> | null>(null)
const tableFormRef = ref<InstanceType<typeof EditTableNoteForm> | null>(null)
const imageFormRef = ref<InstanceType<typeof EditImageNoteForm> | null>(null)

function handleSave() {
  const note = createNote(props.noteType)
  note.title = editedTitle.value || null

  if (note.type === NOTE_TYPES.TEXT && textFormRef.value) {
    note.content = textFormRef.value.editedContent
  } else if (note.type === NOTE_TYPES.TABLE && tableFormRef.value) {
    note.cols = tableFormRef.value.editedCols
    note.rows = tableFormRef.value.editedRows
  } else if (note.type === NOTE_TYPES.IMAGE && imageFormRef.value) {
    note.imageUrl = imageFormRef.value.editedImageUrl
  }

  store.addNote(note)
  emit('close')
}
</script>

<template>
  <div :class="$style.overlay" @click.self="emit('close')">
    <div :class="$style.modal">
      <input
        :value="editedTitle"
        @input="(event) => (editedTitle = (event.target as HTMLInputElement).value)"
        placeholder="Name your note"
      />
      <EditTextNoteForm v-if="noteType === NOTE_TYPES.TEXT" ref="textFormRef" content="" />
      <EditTableNoteForm v-if="noteType === NOTE_TYPES.TABLE" ref="tableFormRef" :cols="2" :rows="[[]]" />
      <EditImageNoteForm v-if="noteType === NOTE_TYPES.IMAGE" ref="imageFormRef" imageUrl="" />
      <button @click="handleSave">Save</button>
    </div>
  </div>
</template>

<style module>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(79, 84, 88, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.modal {
  background-color: var(--color-surface);
  border: var(--border-default);
  border-radius: var(--radius-lg);
  padding: var(--space-xl);
  min-width: 400px;
  max-width: 90vw;
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  box-shadow: var(--shadow-xl);
}
</style>