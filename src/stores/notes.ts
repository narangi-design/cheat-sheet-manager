import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { NoteData } from '../types'
import { supabase } from '../utils/supabase'
import { useAuthStore } from './auth'

export const useNotesStore = defineStore('notes', () => {
    const auth = useAuthStore()
    const notes = ref<NoteData[]>([])

    const allTags = computed(() => [...new Set(notes.value.flatMap(n => n.tags))])

    async function loadNotes() {
        const { data } = await supabase
            .from('notes')
            .select('data')

        if (data) {
            notes.value = data.map(row => row.data as NoteData)
        }
    }

    async function addNote(note: NoteData) {
        notes.value.push(note)
        if (!auth.user) return
        await supabase
            .from('notes')
            .insert({ id: note.id, data: note })
    }

    async function deleteNote(id: string) {
        notes.value = notes.value.filter(n => n.id !== id)
        if (!auth.user) return
        await supabase
            .from('notes')
            .delete()
            .eq('id', id)
    }

    async function updateNote(id: string, patch: Partial<NoteData>) {
        const index = notes.value.findIndex(n => n.id === id)
        if (index !== -1) {
            notes.value[index] = { ...notes.value[index], ...patch } as NoteData
            if (!auth.user) return
            await supabase
                .from('notes')
                .update({ data: notes.value[index], updated_at: new Date().toISOString() })
                .eq('id', id)
        }
    }

    return { notes, allTags, loadNotes, addNote, deleteNote, updateNote }
})
