export type BaseNoteData = {
    id: number
    title: string | null
    tags: Set<string>
    isPinned: boolean
    createdAt: number
}

export const NOTE_TYPES = {
    TEXT: 'text',
    TABLE: 'table',
    IMAGE: 'image'
} as const

type TextContent = {
    type: typeof NOTE_TYPES.TEXT
    content: string
}

type TableContent = {
    type: typeof NOTE_TYPES.TABLE
    cols: number
    rows: string[][]
}

type ImageContent = {
    type: typeof NOTE_TYPES.IMAGE
    imageUrl: string
}

export type NoteType = typeof NOTE_TYPES[keyof typeof NOTE_TYPES]
export type TextNoteData = BaseNoteData & TextContent
export type TableNoteData = BaseNoteData & TableContent
export type ImageNoteData = BaseNoteData & ImageContent
export type NoteData = TextNoteData | TableNoteData | ImageNoteData