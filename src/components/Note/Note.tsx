import type { ReactElement } from 'react'
import styles from './Note.module.css'
import { Tag } from '../Tag'
import { TextNote } from '../TextNote/index.ts'
import { TableNote } from '../TableNote/index.ts'
import { ImageNote } from '../ImageNote/index.ts'
import type { NoteData } from '../../types.ts'


function insertNote({ note }: { note: NoteData }): ReactElement {
    switch (note.type) {
        case 'text':
            return <TextNote note={note} />
        case 'table':
            return <TableNote note={note} />
        case 'image':
            return <ImageNote note={note} />
        default:
            return <></>
    }
}

export default function Note(note: NoteData) {
    return (
        <div className={styles.note}>
            <h3>{note.title || ''}</h3>
            {insertNote({ note })}
            <Tag />
        </div>
    )
}