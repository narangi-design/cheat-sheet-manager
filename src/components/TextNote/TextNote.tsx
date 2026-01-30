import type { TextNoteData } from "../../types";

export default function TextNote({ note }: { note: TextNoteData }) {
    return (
        <span>
            {note.content}
        </span>
    )
}