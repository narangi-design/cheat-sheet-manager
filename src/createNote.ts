import {
    type NoteType,
    NOTE_TYPES,
    type BaseNoteData,
    type NoteData,
} from "./types";

export default function createNote(noteType: NoteType): NoteData {
    const note: BaseNoteData = {
        id: Date.now(),
        title: '',
        tags: new Set<string>(),
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