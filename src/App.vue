<script setup lang="ts">
import { ref } from 'vue'
import CreateNoteButton from './components/CreateNoteButton.vue'
import Note from './components/Note.vue'
import { NOTE_TYPES } from './types'

const isFormOpen = ref(false)

function createTextNoteHandler() {
  isFormOpen.value = true
}

function createTableNoteHandler() {
  isFormOpen.value = true
}

function createImageNoteHandler() {
  isFormOpen.value = true
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
  <nav class="add-note-buttons">
    <CreateNoteButton :noteType="NOTE_TYPES.TEXT" @createNote="createTextNoteHandler" />
    <CreateNoteButton :noteType="NOTE_TYPES.TABLE" @createNote="createTableNoteHandler" />
    <CreateNoteButton :noteType="NOTE_TYPES.IMAGE" @createNote="createImageNoteHandler" />
  </nav>
</template>
