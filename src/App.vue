<script setup lang="ts">
import { ref, onMounted } from 'vue'
import CreateNoteButton from './components/controls/CreateNoteButton.vue'
import EditNoteForm from './components/forms/EditNoteForm.vue'
import AuthModal from './components/auth/AuthModal.vue'
import Note from './components/notes/Note.vue'
import { NOTE_TYPES, type NoteType, type NoteData } from './types'
import { useNotesStore } from './stores/notes'
import { useAuthStore } from './stores/auth'
import createNote from './createNote'

const store = useNotesStore()
const auth = useAuthStore()

onMounted(async () => {
  await auth.initialize()
  if (auth.user) {
    store.loadNotes()
  }
})

const formNote = ref<NoteData | null>(null)
const showAuth = ref(false)

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

async function handleAuthClose() {
  showAuth.value = false
  if (auth.user) {
    await store.loadNotes()
  }
}
</script>

<template>
  <template v-if="auth.loading">
  </template>

  <template v-else-if="!auth.user">
    <div class="auth-screen">
      <button @click="showAuth = true">Sign in</button>
    </div>
    <AuthModal v-if="showAuth" @close="handleAuthClose" />
  </template>

  <template v-else>
    <header class="header">
      <span class="user-email">{{ auth.user?.email }}</span>
      <button class="logout-button" @click="auth.signOut">Log out</button>
    </header>
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
</template>

<style scoped>
.all-notes {
  --col-count: 1;
  --note-font-size: 1rem;
  columns: var(--col-count);
  column-gap: var(--space-sm);
}

@media (min-width: 300px)  { .all-notes { --col-count: 2; --note-font-size: 0.8125rem; } }
@media (min-width: 768px)  { .all-notes { --col-count: 3; --note-font-size: 0.875rem;  } }
@media (min-width: 1200px) { .all-notes { --col-count: 4; --note-font-size: 0.9375rem; } }

.add-note-buttons {
  position: fixed;
  bottom: var(--space-lg);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: var(--space-sm);
}

.auth-screen {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: var(--space-sm);
  padding-bottom: var(--space-md);
}

.user-email {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

.logout-button {
  font-size: var(--font-size-sm);
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--radius-md);
}
</style>
