import type { TextNoteDef } from "../../types";

export default function TextNoteEditor({ note }: { note: TextNoteDef }) {
    return (
        <span>
            {note.content}
        </span>
    )
}