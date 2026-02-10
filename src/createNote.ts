import {
    type NoteType,
    NOTE_TYPES,
    type BaseNoteData,
    type NoteData,
} from "./types";

function generateId(): string {
    const now = new Date()
    const y = now.getFullYear()
    const m = String(now.getMonth() + 1).padStart(2, '0')
    const d = String(now.getDate()).padStart(2, '0')
    const h = String(now.getHours()).padStart(2, '0')
    const min = String(now.getMinutes()).padStart(2, '0')
    const s = String(now.getSeconds()).padStart(2, '0')
    return `${y}${m}${d}${h}${min}${s}`
}

export default function createNote(noteType: NoteType): NoteData {
    const note: BaseNoteData = {
        id: generateId(),
        title: '',
        tags: [],
        isPinned: false,
        createdAt: Date.now()
    }

    switch (noteType) {
        case NOTE_TYPES.TEXT:
            return {
                ...note,
                type: NOTE_TYPES.TEXT,
                content: ''
            }
        case NOTE_TYPES.TABLE:
            return {
                ...note,
                type: NOTE_TYPES.TABLE,
                cols: 2,
                rows: [['', '']]
            }
        case NOTE_TYPES.IMAGE:
            return {
                ...note,
                type: NOTE_TYPES.IMAGE,
                imageUrl: ''
            }
    }
}