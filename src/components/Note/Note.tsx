import type { ReactElement } from 'react'
import { Tag } from '../Tag'
import { TextNote } from '../TextNote'
import { TableNote } from '../TableNote'
import { ImageNote } from '../ImageNote'
import type { NoteDef } from '../../types.ts'


function insertNote({ note }: { note: NoteDef }): ReactElement {
    switch (note.type) {
        case 'text':
            return <TextNote note={note}/>
        case 'table':
            return <TableNote note={note}/>
        case 'image':
            return <ImageNote note={note}/>
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