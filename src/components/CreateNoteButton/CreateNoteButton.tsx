import { NOTE_TYPES, type NoteType } from "../../types"
import styles from './CreateNoteButton.module.css'

interface CreateNoteButtonProps {
    noteType: NoteType
    onAddNote: (noteType: NoteType) => void
}

type NoteTypeContent = {
    icon: string
    label: string
}

const createNoteButtonContent: Record<NoteType, NoteTypeContent> = {
    [NOTE_TYPES.TEXT]: {
        icon: '',
        label: 'Create text note'
    },
    [NOTE_TYPES.TABLE]: {
        icon: '',
        label: 'Create table note'
    },
    [NOTE_TYPES.IMAGE]: {
        icon: '',
        label: 'Create image note'
    }
}

export default function CreateNoteButton(props: CreateNoteButtonProps) {
    const buttonContent = createNoteButtonContent[props.noteType]
    return (
        <button 
            className={styles.createNoteButton}
            onClick={() => props.onAddNote(props.noteType)}
        >
            <span>{buttonContent.icon}</span>
            <label>{buttonContent.label}</label>
        </button>
    )
}