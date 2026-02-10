import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { NoteData } from '../types'

export const useNotesStore = defineStore('notes', () => {
    const notes = ref<NoteData[]>([])

    function addNote(note: NoteData) {
        notes.value.push(note)
    }

    function deleteNote(id: string) {
        notes.value = notes.value.filter(n => n.id !== id)
    }

    function updateNote(id: string, patch: Partial<NoteData>) {
        const index = notes.value.findIndex(n => n.id === id)
        if (index !== -1) {
            notes.value[index] = { ...notes.value[index], ...patch } as NoteData
        }
    }

    return { notes, addNote, deleteNote, updateNote }
}, {
    persist: true
})