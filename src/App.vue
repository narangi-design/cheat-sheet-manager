<script setup lang="ts">
import { ref } from 'vue'
import CreateNoteButton from './components/controls/CreateNoteButton.vue'
import EditNoteForm from './components/forms/EditNoteForm.vue'
import Note from './components/notes/Note.vue'
import { NOTE_TYPES, type NoteType } from './types'

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
      title="Text Note"
      content="First note!"
      :id="1"
      :tags="new Set(['tag1', 'tag2'])"
      :isPinned="true"
      :createdAt="20250126"
      :type="NOTE_TYPES.TEXT"
    />
  </div>
  <EditNoteForm v-if="activeForm" :noteType="activeForm" @close="closeForm" />
  <nav class="add-note-buttons">
    <CreateNoteButton :noteType="NOTE_TYPES.TEXT" @createNote="createTextNoteHandler" />
    <CreateNoteButton :noteType="NOTE_TYPES.TABLE" @createNote="createTableNoteHandler" />
    <CreateNoteButton :noteType="NOTE_TYPES.IMAGE" @createNote="createImageNoteHandler" />
  </nav>
</template>
