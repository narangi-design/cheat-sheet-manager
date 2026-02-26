<script setup lang="ts">
import { ref } from 'vue'
import CreateNoteButton from './components/controls/CreateNoteButton.vue'
import EditNoteForm from './components/forms/EditNoteForm.vue'
import Note from './components/notes/Note.vue'
import { NOTE_TYPES, type NoteType, type NoteData } from './types'
import { useNotesStore } from './stores/notes'
import createNote from './createNote'

const store = useNotesStore()
const formNote = ref<NoteData | null>(null)

function openCreateForm(noteType: NoteType) {
  formNote.value = createNote(noteType)
}

function openEditForm(id: string) {
  const note = store.notes.find(n => n.id === id)
  if (note) {
    formNote.value = note
  }
}

function closeForm() {
  formNote.value = null
}
</script>

<template>
  <div class="all-notes">
    <Note
      v-for="note in store.notes"
      :key="note.id"
      v-bind="note"
      @edit="openEditForm"
      @delete="store.deleteNote"
    />
  </div>
  <EditNoteForm v-if="formNote" :note="formNote" @close="closeForm" />
  <nav class="add-note-buttons">
    <CreateNoteButton :noteType="NOTE_TYPES.TEXT" @createNote="openCreateForm" />
    <CreateNoteButton :noteType="NOTE_TYPES.TABLE" @createNote="openCreateForm" />
    <CreateNoteButton :noteType="NOTE_TYPES.IMAGE" @createNote="openCreateForm" />
  </nav>
</template>

<style scoped>
.add-note-buttons {
  position: fixed;
  bottom: var(--space-lg);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: var(--space-sm);
}
</style>