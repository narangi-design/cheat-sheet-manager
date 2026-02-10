<script setup lang="ts">
import { ref } from 'vue'
import CreateNoteButton from './components/controls/CreateNoteButton.vue'
import EditNoteForm from './components/forms/EditNoteForm.vue'
import Note from './components/notes/Note.vue'
import { NOTE_TYPES, type NoteType } from './types'
import { useNotesStore } from './stores/notes'

const store = useNotesStore()
const activeForm = ref<NoteType | null>(null)

function createTextNoteHandler() {
  activeForm.value = NOTE_TYPES.TEXT
}

function createTableNoteHandler() {
  activeForm.value = NOTE_TYPES.TABLE
}

function createImageNoteHandler() {
  activeForm.value = NOTE_TYPES.IMAGE
}

function closeForm() {
  activeForm.value = null
}
</script>

<template>
  <div class="all-notes">
    <Note
      v-for="note in store.notes"
      :key="note.id"
      v-bind="note"
    />
  </div>
  <EditNoteForm v-if="activeForm" :noteType="activeForm" @close="closeForm" />
  <nav class="add-note-buttons">
    <CreateNoteButton :noteType="NOTE_TYPES.TEXT" @createNote="createTextNoteHandler" />
    <CreateNoteButton :noteType="NOTE_TYPES.TABLE" @createNote="createTableNoteHandler" />
    <CreateNoteButton :noteType="NOTE_TYPES.IMAGE" @createNote="createImageNoteHandler" />
  </nav>
</template>

<style>
</style>