<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import CreateNoteButton from '../components/controls/CreateNoteButton.vue'
import EditNoteForm from '../components/forms/EditNoteForm.vue'
import AuthModal from '../components/auth/AuthModal.vue'
import AccountModal from '../components/auth/AccountModal.vue'
import Note from '../components/notes/Note.vue'
import { NOTE_TYPES, type NoteType, type NoteData } from '../types'
import { useNotesStore } from '../stores/notes'
import { useAuthStore } from '../stores/auth'
import createNote from '../createNote'

const store = useNotesStore()
const auth = useAuthStore()

onMounted(async () => {
    await auth.initialize()
    if (auth.user) {
        store.loadNotes()
    }
})

watch(() => auth.user, (user) => {
    if (user && store.notes.length === 0) {
        store.loadNotes()
    }
})

const formNote = ref<NoteData | null>(null)
const showAuth = ref(false)
const showAccount = ref(false)

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

function handleAuthClose() {
    showAuth.value = false
}
</script>

<template>
    <template v-if="auth.loading"></template>

    <template v-else>
        <header class="header">
            <h1 class="app-title">Criblet</h1>
            <template v-if="auth.user">
                <span class="user-email">{{ auth.user.email }}</span>
                <button class="logout-button" @click="showAccount = true">Account</button>
                <button class="logout-button" @click="auth.signOut">Log out</button>
            </template>
            <button v-else class="sign-in-button" @click="showAuth = true">Sign in</button>
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
        <AuthModal v-if="showAuth" @close="handleAuthClose" />
        <AccountModal v-if="showAccount" @close="showAccount = false" />
        <EditNoteForm v-if="formNote" :note="formNote" @close="closeForm" />
        <nav class="add-note-buttons">
            <CreateNoteButton :noteType="NOTE_TYPES.TEXT" @createNote="openCreateForm" />
            <CreateNoteButton :noteType="NOTE_TYPES.TABLE" @createNote="openCreateForm" />
            <CreateNoteButton :noteType="NOTE_TYPES.IMAGE" @createNote="openCreateForm" />
        </nav>
        <footer class="footer">
            <RouterLink to="/privacy">Privacy Policy</RouterLink>
        </footer>
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

.header {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    padding-bottom: var(--space-md);
}

.app-title {
    font-size: var(--font-size-xl);
    margin-right: auto;
}

.user-email {
    font-size: var(--font-size-sm);
    color: var(--color-text-muted);
}

.logout-button,
.sign-in-button {
    font-size: var(--font-size-sm);
    padding: var(--space-xs) var(--space-sm);
    border-radius: var(--radius-md);
}

.footer {
    position: fixed;
    bottom: var(--space-lg);
    left: var(--space-lg);
}

.footer a {
    font-size: var(--font-size-sm);
    color: var(--color-text-muted);
    text-decoration: underline;
}
</style>
