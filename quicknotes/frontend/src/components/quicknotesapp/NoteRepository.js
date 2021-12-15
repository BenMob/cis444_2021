import React, {useState, useEffect} from 'react'
import PrimaryButton from '../buttons/PrimaryButton'
import PlusButton from '../buttons/PlusButton'
import NoteModel from '../../models/NoteModel'
import Note from "./Note"

function NoteRepository({user, folder, folderNotes, addNoteFromRoot, deleteNoteFromRoot, goBack}) {

    /** Handles note label grammar */
    const [noteLabel, setNoteLabel] = useState("note");
    const [notes, setNotes] = useState(folderNotes);

    useEffect(() => {
        if(notes.length > 0){
            setNoteLabel("notes")
        }else{
            setNoteLabel("note")
        }
    }, [notes])

    /** Adds Note from Note Repository and from Root */
    const handleAddNote = () => {

        const note = new NoteModel(folder.id, user.id).literal()
        setNotes([note, ...notes])
        addNoteFromRoot(note)
    }


    /** Deletes Note from Note Repository and from Root */
    const handleDeleteNote = (note) => {
        const updatedNotes = notes.filter(presentNote => {
            return presentNote.id !== note.id
        })
        setNotes(updatedNotes)
        deleteNoteFromRoot(note)
    }

    const renderNotes = () => {
        return notes.map(note => {
            return <Note key={note.id} note={note} onDelete={handleDeleteNote} className={"w3-animate-top"} style={{}}/>
        })
    }

    const noteListContainer = {
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
    }

    const menuBarContainer = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    }

    return (
        <div className='w3-animate-top'>
            <div style={menuBarContainer} className=''>
                <PlusButton onClick={handleAddNote} style={{}} className={""}/>
                <strong>{folder.name} : {notes.length} {noteLabel}</strong>
                <PrimaryButton label={"Back"} onClick={goBack} />
            </div>
            <div style={noteListContainer} className='w3-round'>
                {notes.length !== 0 && renderNotes()}
            </div>
        </div>
    )
}

export default NoteRepository

