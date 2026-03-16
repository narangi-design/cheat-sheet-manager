import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { NoteData } from '../types'
import { supabase, userUuid } from '../utils/supabase'

export const useNotesStore = defineStore('notes', () => {
    const notes = ref<NoteData[]>([])

    const allTags = computed(() => [...new Set(notes.value.flatMap(n => n.tags))])

    async function loadNotes() {
        const { data } = await supabase
            .from('notes')
            .select('data')
            .eq('user_uuid', userUuid)

        if (data && data.length > 0) {
            notes.value = data.map(row => row.data as NoteData)
            return
        }

        const raw = localStorage.getItem('notes')
        if (raw) {
            const parsed = JSON.parse(raw) as { notes: NoteData[] }
            if (parsed.notes?.length) {
                notes.value = parsed.notes
                await Promise.all(
                    parsed.notes.map(note =>
                        supabase.from('notes').insert({ id: note.id, user_uuid: userUuid, data: note })
                    )
                )
                localStorage.removeItem('notes')
            }
        }
    }

    async function addNote(note: NoteData) {
        notes.value.push(note)
        await supabase
            .from('notes')
            .insert({ id: note.id, user_uuid: userUuid, data: note })
    }

    async function deleteNote(id: string) {
        notes.value = notes.value.filter(n => n.id !== id)
        await supabase
            .from('notes')
            .delete()
            .eq('id', id)
    }

    async function updateNote(id: string, patch: Partial<NoteData>) {
        const index = notes.value.findIndex(n => n.id === id)
        if (index !== -1) {
            notes.value[index] = { ...notes.value[index], ...patch } as NoteData
            await supabase
                .from('notes')
                .update({ data: notes.value[index], updated_at: new Date().toISOString() })
                .eq('id', id)
        }
    }

    return { notes, allTags, userUuid, loadNotes, addNote, deleteNote, updateNote }
})
