type BaseNoteDef = {
    id: number
    title: string | null
    tags: Set<string>
    isPinned: boolean
    createdAt: number
}

type TextContent = {
    type: 'text'
    content: string
}

type TableContent = {
    type: 'table'
    cols: number
    rows: string[][]
}

type ImageContent = {
    type: 'image'
    imageUrl: string
}

export type TextNoteDef = BaseNoteDef & TextContent
export type TableNoteDef = BaseNoteDef & TableContent
export type ImageNoteDef = BaseNoteDef & ImageContent
export type NoteDef = TextNoteDef | TableNoteDef | ImageNoteDef