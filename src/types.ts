type BaseNoteDef = {
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
type ValueOf<T> = T[keyof T]
export type NoteType = ValueOf<typeof NOTE_TYPES>

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

export type TextNoteDef = BaseNoteDef & TextContent
export type TableNoteDef = BaseNoteDef & TableContent
export type ImageNoteDef = BaseNoteDef & ImageContent
export type NoteDef = TextNoteDef | TableNoteDef | ImageNoteDef