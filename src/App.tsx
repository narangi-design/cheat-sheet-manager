import { useState } from 'react'
import './App.css'
import { CreateNoteButton } from './components/CreateNoteButton'
import { Note } from './components/Note'
import { NOTE_TYPES } from './types'

function App() {

  const[isFormOpen, setIsFormOpen] = useState(false)

  function createTextNoteHandler() {
    setIsFormOpen(true)
  }

  return (
    <>
      <div className='all-notes'>
        <Note
          id={1}
          title='Text Note'
          tags={new Set<string>().add('tag1').add('tag2')}
          isPinned={true}
          createdAt={20250126}
          type={NOTE_TYPES.TEXT}
          content='First note!'
        />
      </div>
      <nav className='add-note-buttons'>
        <CreateNoteButton
          noteType={NOTE_TYPES.TEXT}
          onCreateNote={createTextNoteHandler} />
        <CreateNoteButton
          noteType={NOTE_TYPES.TABLE}
          onCreateNote={a => a + 1} />
        <CreateNoteButton
          noteType={NOTE_TYPES.IMAGE}
          onCreateNote={a => a + 1} />
      </nav>
      
    </>
  )
}

export default App
