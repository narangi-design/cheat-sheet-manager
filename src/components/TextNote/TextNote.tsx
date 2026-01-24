import type { TextNoteDef } from "../../types";

export default function TextNote({ note }: { note: TextNoteDef }) {
    return (
        <span>
            {note.content}
        </span>
    )
}