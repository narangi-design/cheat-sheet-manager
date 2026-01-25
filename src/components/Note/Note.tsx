import type { ReactElement } from 'react'
import { Tag } from '../Tag'
import { TextNoteEditor } from '../TextNoteEditor'
import { TableNoteEditor } from '../TableNoteEditor'
import { ImageNoteEditor } from '../ImageNoteEditor'
import type { NoteDef } from '../../types.ts'


function insertNote({ note }: { note: NoteDef }): ReactElement {
    switch (note.type) {
        case 'text':
            return <TextNoteEditor note={note} />
        case 'table':
            return <TableNoteEditor note={note} />
        case 'image':
            return <ImageNoteEditor note={note} />
        default:
            return <></>
    }
}

export default function Note(note: NoteDef) {
    return (
        <>
            <h3>{note.title || ''}</h3>
            {insertNote({ note })}
            <Tag />
        </>
    )
}