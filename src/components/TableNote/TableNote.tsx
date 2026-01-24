import type { TableNoteDef } from "../../types";

export default function TableNote({ note }: { note: TableNoteDef }) {
    return (
        <table>
            <tbody>
            {note.rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                {row.map((cell, cellIndex) => 
                    cellIndex < note.cols && <td key={cellIndex}>{cell}</td>
                )}
                </tr>
            ))}
            </tbody>
        </table>
    )
}