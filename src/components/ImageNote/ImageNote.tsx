import type { ImageNoteDef } from "../../types";

export default function TableNote({ note }: { note: ImageNoteDef }) {
    return (
        <img src={note.imageUrl}/>
    )
}