import type { ImageNoteData } from "../../types";

export default function ImageNote ({ note }: { note: ImageNoteData }) {
    return (
        <img src={note.imageUrl}/>
    )
}