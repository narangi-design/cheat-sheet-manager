import type { ImageNoteDef } from "../../types";

export default function ImageNoteEditor({ note }: { note: ImageNoteDef }) {
    return (
        <img src={note.imageUrl}/>
    )
}